require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import kidRouter from "./routes/kidProfile.route";
import portfolioRouter from "./routes/portfolio.route";
import authRouter from "./routes/auth.route";
import dashboardRouter from "./routes/dashboard.route";
import { rateLimit } from "express-rate-limit";

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://localhost:3000",
      "https://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// routes
app.use(
  "/api/v1",
  userRouter,
  orderRouter,
  courseRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter,
  kidRouter,
  portfolioRouter,
);

// dashboard routes
app.use("/api/v1/dashboard", dashboardRouter);

// auth routes (separate from v1 API for OAuth compatibility)
app.use("/api/auth", authRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: "API is working",
  });
});

// root route handler
app.get("/", (req: Request, res: Response, next: NextFunction) => {
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
  app.get(route, (req: Request, res: Response) => {
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
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(limiter);
app.use(ErrorMiddleware);
