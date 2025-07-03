import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

// authenticated user
export const isAutheticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies.access_token as string;

      if (!access_token) {
        return next(
          new ErrorHandler("Please login to access this resource", 401),
        );
      }

      const decoded = jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN as string,
      ) as JwtPayload;

      if (!decoded || !decoded.id) {
        return next(new ErrorHandler("Access token is not valid", 401));
      }

      // check if the access token is expired
      if (decoded.exp && decoded.exp <= Date.now() / 1000) {
        try {
          await updateAccessToken(req, res, next);
        } catch (error) {
          return next(
            new ErrorHandler("Token refresh failed, please login again", 401),
          );
        }
      } else {
        const user = await redis.get(decoded.id);

        if (!user) {
          return next(
            new ErrorHandler("Session expired, please login again", 401),
          );
        }

        req.user = JSON.parse(user);
        next();
      }
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        return next(new ErrorHandler("Invalid access token", 401));
      } else if (error.name === "TokenExpiredError") {
        try {
          await updateAccessToken(req, res, next);
        } catch (refreshError) {
          return next(
            new ErrorHandler("Token expired, please login again", 401),
          );
        }
      } else {
        return next(new ErrorHandler("Authentication failed", 401));
      }
    }
  },
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403,
        ),
      );
    }
    next();
  };
};
