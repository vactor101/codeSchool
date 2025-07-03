"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserLearningPath = exports.getCourseProgress = exports.updateCourseProgress = exports.getCourseAnalytics = exports.getCourseDashboard = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const course_model_1 = __importDefault(require("../models/course.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const order_Model_1 = __importDefault(require("../models/order.Model"));
const progress_model_1 = __importDefault(require("../models/progress.model"));
const redis_1 = require("../utils/redis");
// Get course dashboard data
exports.getCourseDashboard = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const userRole = req.user?.role;
        if (!userId) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        // Get user data
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        let dashboardData = {
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            timestamp: new Date().toISOString(),
        };
        if (userRole === "admin") {
            // Admin dashboard data
            const totalCourses = await course_model_1.default.countDocuments();
            const totalUsers = await user_model_1.default.countDocuments();
            const totalOrders = await order_Model_1.default.countDocuments();
            const recentCourses = await course_model_1.default.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("name description price ratings purchased createdAt");
            const recentUsers = await user_model_1.default
                .find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("name email role createdAt");
            const recentOrders = await order_Model_1.default.find()
                .populate("courseId", "name price")
                .populate("userId", "name email")
                .sort({ createdAt: -1 })
                .limit(5);
            // Monthly statistics
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const startOfMonth = new Date(currentYear, currentMonth, 1);
            const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
            const monthlyStats = {
                newCoursesThisMonth: await course_model_1.default.countDocuments({
                    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
                }),
                newUsersThisMonth: await user_model_1.default.countDocuments({
                    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
                }),
                ordersThisMonth: await order_Model_1.default.countDocuments({
                    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
                }),
            };
            dashboardData.adminData = {
                overview: {
                    totalCourses,
                    totalUsers,
                    totalOrders,
                    monthlyStats,
                },
                recent: {
                    courses: recentCourses,
                    users: recentUsers,
                    orders: recentOrders,
                },
            };
        }
        else {
            // Student dashboard data
            const enrolledCourseIds = user.courses.map((course) => course.courseId);
            const enrolledCourses = await course_model_1.default.find({
                _id: { $in: enrolledCourseIds },
            }).select("name description price level courseData ratings");
            const userOrders = await order_Model_1.default.find({ userId })
                .populate("courseId", "name description price level")
                .sort({ createdAt: -1 });
            // Get progress data for enrolled courses
            const progressData = await progress_model_1.default.find({
                userId,
                courseId: { $in: enrolledCourseIds },
            });
            // Calculate progress for each course
            const coursesWithProgress = enrolledCourses.map((course) => {
                // Fix: Type assertion to ensure course has the expected structure
                const courseDocument = course;
                const progress = progressData.find((p) => p.courseId === courseDocument._id.toString()) ||
                    null;
                const courseProgress = progress
                    ? {
                        totalLessons: courseDocument.courseData?.length || 0,
                        completedLessons: progress.lessons.filter((l) => l.completed)
                            .length,
                        completionPercentage: progress.completionPercentage,
                        lastAccessed: progress.lastAccessedAt,
                        timeSpent: progress.totalTimeSpent,
                        isCompleted: progress.isCompleted,
                        enrolledAt: progress.enrolledAt,
                    }
                    : calculateCourseProgress(courseDocument, userId.toString());
                return {
                    ...courseDocument.toObject(),
                    progress: courseProgress,
                };
            });
            const completedCourses = coursesWithProgress.filter((course) => course.progress.completionPercentage === 100);
            const inProgressCourses = coursesWithProgress.filter((course) => course.progress.completionPercentage > 0 &&
                course.progress.completionPercentage < 100);
            const notStartedCourses = coursesWithProgress.filter((course) => course.progress.completionPercentage === 0);
            // Recent activity (last 7 days)
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const recentActivity = await order_Model_1.default.find({
                userId,
                createdAt: { $gte: sevenDaysAgo },
            })
                .populate("courseId", "name")
                .sort({ createdAt: -1 })
                .limit(10);
            dashboardData.studentData = {
                overview: {
                    totalEnrolledCourses: enrolledCourses.length,
                    completedCourses: completedCourses.length,
                    inProgressCourses: inProgressCourses.length,
                    notStartedCourses: notStartedCourses.length,
                },
                courses: {
                    enrolled: coursesWithProgress,
                    completed: completedCourses,
                    inProgress: inProgressCourses,
                    notStarted: notStartedCourses,
                },
                recentActivity,
                orders: userOrders,
            };
        }
        // Cache the dashboard data for 5 minutes
        await redis_1.redis.set(`dashboard:${userId}`, JSON.stringify(dashboardData), "EX", 300);
        res.status(200).json(dashboardData);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Get course analytics for instructors/admin
exports.getCourseAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userRole = req.user?.role;
        if (userRole !== "admin") {
            return next(new ErrorHandler_1.default("Only admins can access course analytics", 403));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        // Get course enrollment data
        const enrollmentCount = await order_Model_1.default.countDocuments({ courseId });
        const enrollmentData = await order_Model_1.default.find({ courseId })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        // Calculate revenue
        const totalRevenue = enrollmentCount * course.price;
        // Get course reviews and ratings
        const avgRating = course.ratings || 0;
        const totalReviews = course.reviews.length;
        // Monthly enrollment trends (last 6 months)
        const monthlyEnrollments = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const count = await order_Model_1.default.countDocuments({
                courseId,
                createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            });
            monthlyEnrollments.push({
                month: date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                }),
                enrollments: count,
                revenue: count * course.price,
            });
        }
        const analyticsData = {
            success: true,
            course: {
                id: course._id,
                name: course.name,
                description: course.description,
                price: course.price,
                level: course.level,
            },
            analytics: {
                overview: {
                    totalEnrollments: enrollmentCount,
                    totalRevenue,
                    averageRating: avgRating,
                    totalReviews,
                },
                trends: {
                    monthlyEnrollments,
                },
                enrollments: enrollmentData,
                reviews: course.reviews,
            },
            timestamp: new Date().toISOString(),
        };
        res.status(200).json(analyticsData);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Update course progress
exports.updateCourseProgress = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { lessonId, completed, timeSpent, watchTime } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        // Find or create progress record
        let progress = await progress_model_1.default.findOne({ userId, courseId });
        if (!progress) {
            const course = await course_model_1.default.findById(courseId);
            if (!course) {
                return next(new ErrorHandler_1.default("Course not found", 404));
            }
            progress = new progress_model_1.default({
                userId,
                courseId,
                lessons: course.courseData.map((lesson) => ({
                    lessonId: lesson._id,
                    title: lesson.title,
                    completed: false,
                    timeSpent: 0,
                    watchTime: 0,
                })),
            });
        }
        // Update lesson progress
        const lessonIndex = progress.lessons.findIndex((l) => l.lessonId === lessonId);
        if (lessonIndex !== -1) {
            progress.lessons[lessonIndex].completed = completed;
            progress.lessons[lessonIndex].timeSpent += timeSpent || 0;
            progress.lessons[lessonIndex].watchTime += watchTime || 0;
            if (completed && !progress.lessons[lessonIndex].completedAt) {
                progress.lessons[lessonIndex].completedAt = new Date();
            }
        }
        // Update overall progress
        const completedLessons = progress.lessons.filter((l) => l.completed).length;
        const totalLessons = progress.lessons.length;
        progress.completionPercentage =
            totalLessons > 0
                ? Math.round((completedLessons / totalLessons) * 100)
                : 0;
        progress.totalTimeSpent = progress.lessons.reduce((total, lesson) => total + lesson.timeSpent, 0);
        progress.lastAccessedAt = new Date();
        if (progress.completionPercentage === 100 && !progress.isCompleted) {
            progress.isCompleted = true;
            progress.completedAt = new Date();
        }
        await progress.save();
        res.status(200).json({
            success: true,
            message: "Progress updated successfully",
            progress: {
                completionPercentage: progress.completionPercentage,
                completedLessons,
                totalLessons,
                isCompleted: progress.isCompleted,
            },
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Get detailed course progress
exports.getCourseProgress = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user?._id;
        if (!userId) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        const progress = await progress_model_1.default.findOne({ userId, courseId });
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        if (!progress) {
            return res.status(200).json({
                success: true,
                course: {
                    id: course._id,
                    name: course.name,
                    description: course.description,
                },
                progress: {
                    completionPercentage: 0,
                    totalLessons: course.courseData?.length || 0,
                    completedLessons: 0,
                    isCompleted: false,
                    enrolledAt: null,
                    lessons: course.courseData?.map((lesson) => ({
                        lessonId: lesson._id,
                        title: lesson.title,
                        completed: false,
                        timeSpent: 0,
                    })) || [],
                },
            });
        }
        res.status(200).json({
            success: true,
            course: {
                id: course._id,
                name: course.name,
                description: course.description,
            },
            progress: {
                completionPercentage: progress.completionPercentage,
                totalLessons: progress.lessons.length,
                completedLessons: progress.lessons.filter((l) => l.completed).length,
                isCompleted: progress.isCompleted,
                enrolledAt: progress.enrolledAt,
                lastAccessedAt: progress.lastAccessedAt,
                totalTimeSpent: progress.totalTimeSpent,
                lessons: progress.lessons,
                bookmarks: progress.bookmarks,
                notes: progress.notes,
            },
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Helper function to calculate course progress
function calculateCourseProgress(course, userId) {
    // This is a fallback for when no progress record exists
    const totalLessons = course.courseData?.length || 0;
    return {
        totalLessons,
        completedLessons: 0,
        completionPercentage: 0,
        lastAccessed: new Date(),
        timeSpent: 0,
        isCompleted: false,
        enrolledAt: new Date(),
    };
}
// Get user learning path
exports.getUserLearningPath = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        const enrolledCourseIds = user.courses.map((course) => course.courseId);
        const enrolledCourses = await course_model_1.default.find({
            _id: { $in: enrolledCourseIds },
        });
        // Recommend courses based on enrolled courses
        const enrolledCategories = [
            ...new Set(enrolledCourses.map((course) => course.categories)),
        ];
        const recommendedCourses = await course_model_1.default.find({
            categories: { $in: enrolledCategories },
            _id: { $nin: enrolledCourseIds },
        }).limit(5);
        const learningPath = {
            success: true,
            currentCourses: enrolledCourses,
            recommendedCourses,
            skillsToLearn: enrolledCategories,
            completionStats: {
                totalCourses: enrolledCourses.length,
                skillsAcquired: enrolledCategories.length,
            },
            timestamp: new Date().toISOString(),
        };
        res.status(200).json(learningPath);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
