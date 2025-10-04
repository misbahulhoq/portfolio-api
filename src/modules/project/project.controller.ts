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

const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find();
  sendResponse(res, {
    success: true,
    message: "Projects found",
    statusCode: 200,
    data: projects,
  });
};

const getProjectById = async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);
  sendResponse(res, {
    success: true,
    message: "Project found",
    statusCode: 200,
    data: project,
  });
};

export const ProjectController = { createProject, getProjects, getProjectById };
