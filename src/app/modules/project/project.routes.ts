import { Router } from "express";
import { ProjectControllers } from "./project.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectSchema } from "./project.validations";

const projectRouter = Router();

projectRouter.post(
  "/",
  validateRequest(createProjectSchema),
  ProjectControllers.createProject
);
projectRouter.get("/", ProjectControllers.getAllProjects);
projectRouter.get("/:id", ProjectControllers.getSingleProject);
projectRouter.patch("/:id", ProjectControllers.updateProject);
projectRouter.delete("/:id", ProjectControllers.deleteProject);

export default projectRouter;
