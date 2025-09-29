import { NextFunction, Request, Response, Errback } from "express";
import AppError from "../utils/AppError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server error.";

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
