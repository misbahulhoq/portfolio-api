import { Request, Response } from "express";
import Project from "./project.model";
import { sendResponse } from "../../utils/sendResponse";

const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  await project.save();
  sendResponse(res, {
    success: true,
    message: "Project created",
    statusCode: 201,
    data: null,
  });
};

export const ProjectController = { createProject };
