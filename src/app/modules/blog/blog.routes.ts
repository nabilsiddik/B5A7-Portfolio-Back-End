import { Router } from "express";
import { BlogControllers } from "./blog.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { blogSchema } from "./blog.validations";

const blogRouter = Router();

blogRouter.post("/", BlogControllers.createBlog);
blogRouter.get("/", BlogControllers.getAllBlogs);
blogRouter.get("/:id", BlogControllers.getSingleBlog);
blogRouter.patch("/:id", BlogControllers.updateBlog);
blogRouter.delete("/:id", BlogControllers.deleteBlog);

export default blogRouter;
