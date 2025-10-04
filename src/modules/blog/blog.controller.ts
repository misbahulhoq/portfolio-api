import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import Blog from "./blog.interface";

const createBlog = async (req: Request, res: Response) => {
  const blog = new Blog(req.body);
  await blog.save();
  sendResponse(res, {
    success: true,
    message: "Blog created",
    statusCode: 201,
    data: blog,
  });
};
export const BlogController = { createBlog };
