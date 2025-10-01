import { Router } from "express";
import { ProjectControllers } from "./project.controllers";

const projectRouter = Router();

projectRouter.post("/", ProjectControllers.createProject);
projectRouter.get("/", ProjectControllers.getAllProjects);
projectRouter.get("/:id", ProjectControllers.getSingleProject);
projectRouter.patch("/:id", ProjectControllers.updateProject);
projectRouter.delete("/:id", ProjectControllers.deleteProject);

export default projectRouter;
