"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAutheticated = void 0;
const catchAsyncErrors_1 = require("./catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
const user_controller_1 = require("../controllers/user.controller");
// authenticated user
exports.isAutheticated = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            return next(new ErrorHandler_1.default("Please login to access this resource", 401));
        }
        const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
        if (!decoded || !decoded.id) {
            return next(new ErrorHandler_1.default("Access token is not valid", 401));
        }
        // check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            try {
                await (0, user_controller_1.updateAccessToken)(req, res, next);
            }
            catch (error) {
                return next(new ErrorHandler_1.default("Token refresh failed, please login again", 401));
            }
        }
        else {
            const user = await redis_1.redis.get(decoded.id);
            if (!user) {
                return next(new ErrorHandler_1.default("Session expired, please login again", 401));
            }
            req.user = JSON.parse(user);
            next();
        }
    }
    catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(new ErrorHandler_1.default("Invalid access token", 401));
        }
        else if (error.name === "TokenExpiredError") {
            try {
                await (0, user_controller_1.updateAccessToken)(req, res, next);
            }
            catch (refreshError) {
                return next(new ErrorHandler_1.default("Token expired, please login again", 401));
            }
        }
        else {
            return next(new ErrorHandler_1.default("Authentication failed", 401));
        }
    }
});
// validate user role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler_1.default(`Role: ${req.user?.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
