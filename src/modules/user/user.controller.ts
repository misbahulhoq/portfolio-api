import { Request, Response } from "express";
import AppError from "../../utils/AppError";
import { User } from "./user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Email and password is required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid Credentials", 401);
  }

  const passwordValid = await user.comparePassword(password);
  if (!passwordValid) {
    throw new AppError("Invalid Credentials", 401);
  }

  const accessToken = generateAccessToken({
    _id: user._id,
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    _id: user._id,
    email: user.email,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 50000,
  });
  sendResponse(res, {
    success: true,
    message: "Log in successful",
    statusCode: 200,
    data: null,
  });
};

export const UserControllers = { login };
