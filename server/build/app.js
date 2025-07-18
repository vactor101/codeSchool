"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
const kidProfile_route_1 = __importDefault(require("./routes/kidProfile.route"));
const portfolio_route_1 = __importDefault(require("./routes/portfolio.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const express_rate_limit_1 = require("express-rate-limit");
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// cors => cross origin resource sharing
exports.app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://localhost:3000",
        "https://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));
// api requests limit
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});
// routes
exports.app.use("/api/v1", user_route_1.default, order_route_1.default, course_route_1.default, notification_route_1.default, analytics_route_1.default, layout_route_1.default, kidProfile_route_1.default, portfolio_route_1.default);
// dashboard routes
exports.app.use("/api/v1/dashboard", dashboard_route_1.default);
// auth routes (separate from v1 API for OAuth compatibility)
exports.app.use("/api/auth", auth_route_1.default);
// testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        succcess: true,
        message: "API is working",
    });
});
// root route handler
exports.app.get("/", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
// Frontend route handlers (for SPA routing)
const frontendRoutes = [
    "/course-dashboard",
    "/dashboard",
    "/courses",
    "/profile",
    "/admin",
];
frontendRoutes.forEach((route) => {
    exports.app.get(route, (req, res) => {
        // If you have a frontend build, serve index.html
        // For now, return a JSON response indicating this is a frontend route
        res.status(200).json({
            success: true,
            message: `Frontend route: ${route}`,
            route: req.originalUrl,
            query: req.query,
            note: "This should be handled by your frontend application",
            timestamp: new Date().toISOString(),
        });
    });
});
// unknown route
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// middleware calls
exports.app.use(limiter);
exports.app.use(error_1.ErrorMiddleware);
