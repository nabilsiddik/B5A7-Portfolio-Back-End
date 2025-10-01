import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectServices } from "./project.services";
import { sendResponse } from "../../utils/sendResponse";

// Create project
const createProject = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectServices.createProject(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project Created Successfully",
    data: project,
  });
});

// get all project
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjects();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Projects retrived successfully.",
    data: result,
  });
});

// Get single project
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.getSingleProject(Number(id));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrived successfully.",
    data: result,
  });
});

// update project
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.updateProject(Number(id), req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project updated successfully.",
    data: result,
  });
});

// Delete project
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectServices.deleteProject(Number(id));

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project deleted successfully.",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
