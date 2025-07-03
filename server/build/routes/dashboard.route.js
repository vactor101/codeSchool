"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const dashboardRouter = express_1.default.Router();
// Main dashboard endpoint
dashboardRouter.get("/", auth_1.isAutheticated, dashboard_controller_1.getCourseDashboard);
// Course-specific analytics (admin only)
dashboardRouter.get("/analytics/:courseId", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), dashboard_controller_1.getCourseAnalytics);
// User learning path
dashboardRouter.get("/learning-path", auth_1.isAutheticated, dashboard_controller_1.getUserLearningPath);
// Progress tracking endpoints
dashboardRouter.get("/progress/:courseId", auth_1.isAutheticated, dashboard_controller_1.getCourseProgress);
dashboardRouter.put("/progress/:courseId", auth_1.isAutheticated, dashboard_controller_1.updateCourseProgress);
// Dashboard overview for different user types
dashboardRouter.get("/overview", auth_1.isAutheticated, async (req, res, next) => {
    try {
        const userRole = req.user?.role;
        const overview = {
            success: true,
            userRole,
            features: {
                availableRoutes: [
                    "/api/v1/dashboard/ - Main dashboard",
                    "/api/v1/dashboard/learning-path - Learning recommendations",
                    userRole === "admin"
                        ? "/api/v1/dashboard/analytics/:courseId - Course analytics"
                        : null,
                ].filter(Boolean),
                permissions: {
                    canViewAnalytics: userRole === "admin",
                    canManageCourses: userRole === "admin",
                    canViewLearningPath: true,
                },
            },
            timestamp: new Date().toISOString(),
        };
        res.status(200).json(overview);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load dashboard overview",
            error: error.message,
        });
    }
});
// Quick stats endpoint
dashboardRouter.get("/quick-stats", auth_1.isAutheticated, async (req, res, next) => {
    try {
        const CourseModel = require("../models/course.model").default;
        const userModel = require("../models/user.model").default;
        const OrderModel = require("../models/order.Model").default;
        const userId = req.user?._id;
        const userRole = req.user?.role;
        let stats = {
            success: true,
            userRole,
            timestamp: new Date().toISOString(),
        };
        if (userRole === "admin") {
            const [totalCourses, totalUsers, totalOrders] = await Promise.all([
                CourseModel.countDocuments(),
                userModel.countDocuments(),
                OrderModel.countDocuments(),
            ]);
            stats.adminStats = {
                totalCourses,
                totalUsers,
                totalOrders,
            };
        }
        else {
            const user = await userModel.findById(userId);
            const enrolledCount = user?.courses?.length || 0;
            const orderCount = await OrderModel.countDocuments({ userId });
            stats.studentStats = {
                enrolledCourses: enrolledCount,
                totalOrders: orderCount,
            };
        }
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load quick stats",
            error: error.message,
        });
    }
});
exports.default = dashboardRouter;
