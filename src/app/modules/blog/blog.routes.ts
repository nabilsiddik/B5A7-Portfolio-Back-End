import { Router } from "express";
import { BlogControllers } from "./blog.controllers";
import { checkAuth } from "../../middlewares/checkAuth";

const blogRouter = Router()

blogRouter.post('/', BlogControllers.createBlog)
blogRouter.get('/', BlogControllers.getAllBlogs)
blogRouter.get('/:id', BlogControllers.getSingleBlog)
blogRouter.patch('/:id', BlogControllers.updateBlog)
blogRouter.delete('/:id', BlogControllers.deleteBlog)

export default blogRouter