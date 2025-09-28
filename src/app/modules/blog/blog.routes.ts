import { Router } from "express";
import { BlogControllers } from "./blog.controllers";
import { checkAuth } from "../../middlewares/checkAuth";

const blogRouter = Router()

blogRouter.post('/', BlogControllers.createBlog)

export default blogRouter