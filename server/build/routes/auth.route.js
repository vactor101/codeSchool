"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../utils/redis");
const axios_1 = __importDefault(require("axios"));
const authRouter = express_1.default.Router();
// Session endpoint - check if user is authenticated
authRouter.get("/session", async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            return res.status(200).json({
                success: true,
                authenticated: false,
                user: null,
                message: "No active session",
            });
        }
        // Verify JWT token
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (jwtError) {
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
        const user = await redis_1.redis.get(decoded.id);
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
        }
        catch (parseError) {
            await redis_1.redis.del(decoded.id);
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
    }
    catch (error) {
        console.error("Session check error:", error);
        res.clearCookie("access_token");
        res.status(200).json({
            success: true,
            authenticated: false,
            user: null,
            message: "Session check failed",
        });
    }
});
// Logout endpoint - clear session and cookies
authRouter.post("/logout", async (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (access_token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
                if (decoded && decoded.id) {
                    await redis_1.redis.del(decoded.id);
                }
            }
            catch (error) {
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
    }
    catch (error) {
        console.error("Logout error:", error);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
});
// Auth error endpoint - handle OAuth errors
authRouter.get("/error", (req, res, next) => {
    const { error, error_description, error_code } = req.query;
    res.status(400).json({
        success: false,
        message: "Authentication error",
        error: error || "Authentication failed",
        error_description: error_description || "An error occurred during authentication",
        error_code: error_code || "AUTH_ERROR",
        timestamp: new Date().toISOString(),
    });
});
// Auth callback endpoint - handle Google OAuth callback
authRouter.get("/callback", async (req, res, next) => {
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
        const tokenResponse = await axios_1.default.post("https://oauth2.googleapis.com/token", {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback",
            grant_type: "authorization_code",
        });
        const { access_token } = tokenResponse.data;
        // Fetch user info from Google
        const userInfoResponse = await axios_1.default.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userInfo = userInfoResponse.data;
        // Prepare data for socialAuth endpoint
        const socialAuthData = {
            email: userInfo.email,
            name: userInfo.name,
            avatar: userInfo.picture || null,
        };
        // Call socialAuth endpoint
        const socialAuthResponse = await axios_1.default.post(`${process.env.NEXTAUTH_URL}/api/social-auth`, socialAuthData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { accessToken, user } = socialAuthResponse.data;
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        // Store user in Redis
        await redis_1.redis.setex(user.id, 3600, JSON.stringify(user));
        // Set access token cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000,
        });
        // Redirect to frontend (e.g., dashboard)
        res.redirect("/dashboard");
    }
    catch (error) {
        console.error("Callback error:", error);
        res.redirect(`/api/auth/error?error=Callback_failed`);
    }
});
// Social auth endpoint - handle social login data
authRouter.post("/social-auth", async (req, res, next) => {
    try {
        const { email, name, avatar } = req.body;
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }
        // Simulate user lookup or creation (replace with actual database logic)
        let user = await redis_1.redis.get(`user:${email}`);
        if (!user) {
            // Create new user
            const newUser = {
                id: `user_${Date.now()}`, // Replace with actual DB ID
                email,
                name,
                avatar: avatar ? { url: avatar } : undefined,
            };
            await redis_1.redis.setex(`user:${email}`, 3600, JSON.stringify(newUser));
            user = JSON.stringify(newUser);
        }
        const parsedUser = JSON.parse(user);
        // Generate access token
        const accessToken = jsonwebtoken_1.default.sign({ id: parsedUser.id, email: parsedUser.email, name: parsedUser.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            success: true,
            accessToken,
            user: parsedUser,
        });
    }
    catch (error) {
        console.error("Social auth error:", error);
        res.status(500).json({
            success: false,
            message: "Social authentication failed",
        });
    }
});
exports.default = authRouter;
