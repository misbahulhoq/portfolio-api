import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env";
import { User } from "../modules/user/user.model";
export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new AppError("Access token not found.", 401);
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;
      const user = await User.findOne({ email: decoded.email });
      (req as any).user = user;
      next();
    } catch (err: any) {
      throw new AppError(err.message || "Unauthorized", 401);
    }
  };
};
