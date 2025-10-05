import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import Blog from "./blog.interface";
import AppError from "../../utils/AppError";

const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    sendResponse(res, {
      success: true,
      message: "Blog created",
      statusCode: 201,
      data: blog,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      throw new AppError("Same title already exists", 409);
    } else {
      throw new AppError(err.message || "Something went wrong", 500);
    }
  }
};

export const BlogController = { createBlog };
