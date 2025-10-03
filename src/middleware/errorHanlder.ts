import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import envVars from "../config/env";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server error.";

  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }
  if (err instanceof AppError) {
    (statusCode = err.statusCode), (message = err.message);
  }

  res.status(statusCode).send({
    statusCode,
    success: false,
    message,
    data: null,
  });
};
