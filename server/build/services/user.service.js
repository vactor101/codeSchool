"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleService = exports.getAllUsersService = exports.getUserById = void 0;
const redis_1 = require("../utils/redis");
const user_model_1 = __importDefault(require("../models/user.model"));
const portfolio_model_1 = __importDefault(require("../models/portfolio.model"));
// get user by id
const getUserById = async (id, res) => {
    const userJson = await redis_1.redis.get(id);
    let portfolioExist = false;
    const portfolio = await portfolio_model_1.default.findOne({ userId: id });
    if (portfolio) {
        portfolioExist = true;
    }
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(201).json({
            success: true,
            user: { ...user, portfolioExist, portfolioUserName: portfolio?.userName },
        });
    }
};
exports.getUserById = getUserById;
// Get All users
const getAllUsersService = async (res) => {
    const users = await user_model_1.default.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        users,
    });
};
exports.getAllUsersService = getAllUsersService;
// update user role
const updateUserRoleService = async (res, id, role) => {
    const user = await user_model_1.default.findByIdAndUpdate(id, { role }, { new: true });
    res.status(201).json({
        success: true,
        user,
    });
};
exports.updateUserRoleService = updateUserRoleService;
