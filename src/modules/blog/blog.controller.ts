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

const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  sendResponse(res, {
    success: true,
    message: "Blogs found",
    statusCode: 200,
    data: blogs,
  });
};

const getBlogById = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  sendResponse(res, {
    success: true,
    message: "Blog found",
    statusCode: 200,
    data: blog,
  });
};

const updateBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  sendResponse(res, {
    success: true,
    message: "Blog updated",
    statusCode: 200,
    data: blog,
  });
};

const deleteBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  sendResponse(res, {
    success: true,
    message: "Blog deleted",
    statusCode: 200,
    data: blog,
  });
};

export const BlogController = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
