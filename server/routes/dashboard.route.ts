import express from "express";
import { Request, Response, NextFunction } from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getCourseDashboard,
  getCourseAnalytics,
  getUserLearningPath,
  updateCourseProgress,
  getCourseProgress,
} from "../controllers/dashboard.controller";

const dashboardRouter = express.Router();

// Main dashboard endpoint
dashboardRouter.get("/", isAutheticated, getCourseDashboard);

// Course-specific analytics (admin only)
dashboardRouter.get(
  "/analytics/:courseId",
  isAutheticated,
  authorizeRoles("admin"),
  getCourseAnalytics,
);

// User learning path
dashboardRouter.get("/learning-path", isAutheticated, getUserLearningPath);

// Progress tracking endpoints
dashboardRouter.get("/progress/:courseId", isAutheticated, getCourseProgress);
dashboardRouter.put(
  "/progress/:courseId",
  isAutheticated,
  updateCourseProgress,
);

// Dashboard overview for different user types
dashboardRouter.get(
  "/overview",
  isAutheticated,
  async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to load dashboard overview",
        error: error.message,
      });
    }
  },
);

// Quick stats endpoint
dashboardRouter.get(
  "/quick-stats",
  isAutheticated,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CourseModel = require("../models/course.model").default;
      const userModel = require("../models/user.model").default;
      const OrderModel = require("../models/order.Model").default;

      const userId = req.user?._id;
      const userRole = req.user?.role;

      let stats: any = {
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
      } else {
        const user = await userModel.findById(userId);
        const enrolledCount = user?.courses?.length || 0;
        const orderCount = await OrderModel.countDocuments({ userId });

        stats.studentStats = {
          enrolledCourses: enrolledCount,
          totalOrders: orderCount,
        };
      }

      res.status(200).json(stats);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to load quick stats",
        error: error.message,
      });
    }
  },
);

export default dashboardRouter;
