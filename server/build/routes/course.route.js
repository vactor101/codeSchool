"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_1 = require("../middleware/auth");
const courseRouter = express_1.default.Router();
courseRouter.post("/create-course", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.uploadCourse);
courseRouter.put("/edit-course/:id", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.editCourse);
courseRouter.get("/get-course/:id", course_controller_1.getSingleCourse);
courseRouter.get("/get-courses", course_controller_1.getAllCourses);
courseRouter.get("/get-admin-courses", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.getAdminAllCourses);
courseRouter.get("/get-course-content/:id", auth_1.isAutheticated, course_controller_1.getCourseByUser);
courseRouter.put("/add-question", auth_1.isAutheticated, course_controller_1.addQuestion);
courseRouter.put("/add-answer", auth_1.isAutheticated, course_controller_1.addAnwser);
courseRouter.put("/add-review/:id", auth_1.isAutheticated, course_controller_1.addReview);
courseRouter.put("/add-reply", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.addReplyToReview);
courseRouter.post("/getVdoCipherOTP", course_controller_1.generateVideoUrl);
courseRouter.delete("/delete-course/:id", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), course_controller_1.deleteCourse);
// Course dashboard endpoint
courseRouter.get("/course-dashboard", auth_1.isAutheticated, dashboard_controller_1.getCourseDashboard);
// Course analytics endpoint (admin only)
courseRouter.get("/course-analytics/:courseId", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), dashboard_controller_1.getCourseAnalytics);
// User learning path endpoint
courseRouter.get("/learning-path", auth_1.isAutheticated, dashboard_controller_1.getUserLearningPath);
exports.default = courseRouter;
