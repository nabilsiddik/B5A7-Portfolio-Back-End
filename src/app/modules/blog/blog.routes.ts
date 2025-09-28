import { Router } from "express";
import { BlogControllers } from "./blog.controllers";
import { checkAuth } from "../../middlewares/checkAuth";

const blogRouter = Router()

blogRouter.post('/', checkAuth(), BlogControllers.createBlog)

export default blogRouter