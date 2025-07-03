import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";
import portfolioModel from "../models/portfolio.model";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  let portfolioExist = false;
  const portfolio = await portfolioModel.findOne({ userId: id });
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

// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
