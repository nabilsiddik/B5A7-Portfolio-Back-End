import { prisma } from "../../config/db.config";
import AppError from "../../errorHelpers/appError";
import { IProject } from "./project.interfaces";

// Create project
const createProject = async (projectPayload: Partial<IProject>) => {
  const {
    title,
    description,
    thumbnail,
    liveSite,
    githubClient,
    features,
    githubServer,
    userId,
  } = projectPayload;

  if (
    !title ||
    !description ||
    !thumbnail ||
    !liveSite ||
    !githubClient ||
    !features ||
    !githubServer ||
    !userId
  ) {
    throw new AppError(400, "Invalid credentials");
  }

  const project = {
    title,
    description,
    thumbnail,
    liveSite,
    githubClient,
    githubServer,
    features,
    userId,
  };

  const projectRes = await prisma.project.create({
    data: project,
  });

  return projectRes;
};

// get all projects
const getAllProjects = async () => {
  const allProjects = await prisma.project.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
  return allProjects;
};

// get single project
const getSingleProject = async (projectId: number) => {
  if (!projectId) {
    throw new AppError(404, "project id not found");
  }
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  return project;
};

// update project
const updateProject = async (
  projectId: number,
  updatedPayload: Partial<IProject>
) => {
  if (!projectId) {
    throw new AppError(404, "Project id not found");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: updatedPayload,
  });

  return updatedProject;
};

// delete project
const deleteProject = async (projectId: number) => {
  if (!projectId) {
    throw new AppError(404, "Project id not found");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new AppError(404, "Project not found");
  }

  const deletedProject = await prisma.project.delete({
    where: { id: projectId },
  });

  return deletedProject;
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
