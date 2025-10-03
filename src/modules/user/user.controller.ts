import { CookieOptions, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { User } from "./user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import envVars from "../../config/env";

const login = async (req: Request, res: Response) => {
  const { email, password, isRememberMe } = req.body;
  if (!email || !password) {
    throw new AppError("Email and password is required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
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

  const accessTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  };
  if (isRememberMe) {
    accessTokenCookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
  }
  res.cookie("accessToken", accessToken, accessTokenCookieOptions);
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

const me = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new AppError("Access token is required", 401);
  }

  try {
    const validToken = jwt.verify(
      accessToken,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;
    const user = await User.findOne({ email: validToken.email });
    sendResponse(res, {
      success: true,
      message: "User found",
      statusCode: 200,
      data: user,
    });
  } catch (error: any) {
    throw new AppError(error.message || "Invalid access token", 401);
  }
};

export const UserControllers = { login, me };
