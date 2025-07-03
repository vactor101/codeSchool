import express from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redis } from "../utils/redis";
import axios from "axios";

const authRouter = express.Router();

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  exp?: number;
  iat?: number;
}

// Session endpoint - check if user is authenticated
authRouter.get(
  "/session",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies.access_token as string;

      if (!access_token) {
        return res.status(200).json({
          success: true,
          authenticated: false,
          user: null,
          message: "No active session",
        });
      }

      // Verify JWT token
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          access_token,
          process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload;
      } catch (jwtError) {
        res.clearCookie("access_token");
        return res.status(200).json({
          success: true,
          authenticated: false,
          user: null,
          message: "Invalid or expired token",
        });
      }

      if (!decoded || !decoded.id) {
        res.clearCookie("access_token");
        return res.status(200).json({
          success: true,
          authenticated: false,
          user: null,
          message: "Invalid session data",
        });
      }

      // Check token expiration
      if (decoded.exp && decoded.exp <= Date.now() / 1000) {
        res.clearCookie("access_token");
        return res.status(200).json({
          success: true,
          authenticated: false,
          user: null,
          message: "Token expired",
        });
      }

      // Retrieve user from Redis
      const user = await redis.get(decoded.id);

      if (!user) {
        res.clearCookie("access_token");
        return res.status(200).json({
          success: true,
          authenticated: false,
          user: null,
          message: "Session expired",
        });
      }

      let parsedUser;
      try {
        parsedUser = JSON.parse(user);
      } catch (parseError) {
        await redis.del(decoded.id);
        res.clearCookie("access_token");
        return res.status(200).json({
          success: true,
          authenticated: false,
          user: null,
          message: "Corrupted session data",
        });
      }

      res.status(200).json({
        success: true,
        authenticated: true,
        user: parsedUser,
        message: "Active session found",
      });
    } catch (error: any) {
      console.error("Session check error:", error);
      res.clearCookie("access_token");
      res.status(200).json({
        success: true,
        authenticated: false,
        user: null,
        message: "Session check failed",
      });
    }
  }
);

// Logout endpoint - clear session and cookies
authRouter.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies.access_token as string;

      if (access_token) {
        try {
          const decoded = jwt.verify(
            access_token,
            process.env.ACCESS_TOKEN_SECRET as string
          ) as JwtPayload;

          if (decoded && decoded.id) {
            await redis.del(decoded.id);
          }
        } catch (error) {
          console.log("Invalid token during logout:", error);
        }
      }

      // Clear cookies
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }
  }
);

// Auth error endpoint - handle OAuth errors
authRouter.get("/error", (req: Request, res: Response, next: NextFunction) => {
  const { error, error_description, error_code } = req.query;

  res.status(400).json({
    success: false,
    message: "Authentication error",
    error: error || "Authentication failed",
    error_description:
      error_description || "An error occurred during authentication",
    error_code: error_code || "AUTH_ERROR",
    timestamp: new Date().toISOString(),
  });
});

// Auth callback endpoint - handle Google OAuth callback
authRouter.get(
  "/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code, state, error } = req.query;

    if (error) {
      return res.redirect(`/api/auth/error?error=${error}`);
    }

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Missing authorization code",
      });
    }

    try {
      // Exchange code for tokens and user info
      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback",
          grant_type: "authorization_code",
        }
      );

      const { access_token } = tokenResponse.data;

      // Fetch user info from Google
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userInfo = userInfoResponse.data;

      // Prepare data for socialAuth endpoint
      const socialAuthData = {
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture || null,
      };

      // Call socialAuth endpoint
      const socialAuthResponse = await axios.post(
        `${process.env.NEXTAUTH_URL}/api/social-auth`,
        socialAuthData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken, user } = socialAuthResponse.data;

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1h" }
      );

      // Store user in Redis
      await redis.setex(user.id, 3600, JSON.stringify(user));

      // Set access token cookie
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 1000,
      });

      // Redirect to frontend (e.g., dashboard)
      res.redirect("/dashboard");
    } catch (error: any) {
      console.error("Callback error:", error);
      res.redirect(`/api/auth/error?error=Callback_failed`);
    }
  }
);

// Social auth endpoint - handle social login data
authRouter.post(
  "/social-auth",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body;

      if (!email || !name) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Simulate user lookup or creation (replace with actual database logic)
      let user = await redis.get(`user:${email}`);

      if (!user) {
        // Create new user
        const newUser = {
          id: `user_${Date.now()}`, // Replace with actual DB ID
          email,
          name,
          avatar: avatar ? { url: avatar } : undefined,
        };

        await redis.setex(`user:${email}`, 3600, JSON.stringify(newUser));
        user = JSON.stringify(newUser);
      }

      const parsedUser = JSON.parse(user);

      // Generate access token
      const accessToken = jwt.sign(
        { id: parsedUser.id, email: parsedUser.email, name: parsedUser.name },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        accessToken,
        user: parsedUser,
      });
    } catch (error: any) {
      console.error("Social auth error:", error);
      res.status(500).json({
        success: false,
        message: "Social authentication failed",
      });
    }
  }
);

export default authRouter;
