import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogServices } from "./blog.services";
import { sendResponse } from "../../utils/sendResponse";

// Create blog
const createBlog = catchAsync(async(req: Request, res: Response)=> {
  const result = await BlogServices.createBlog(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Blog created successfully.',
      data: result
    })
})

// get all blog
const getAllBlogs = catchAsync(async(req: Request, res: Response)=> {
  const result = await BlogServices.getAllBlogs();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All blogs retrived successfully.',
      data: result
    })
})


// Get single blog
const getSingleBlog = catchAsync(async(req: Request, res: Response)=> {
  const {id} = req.params
  const result = await BlogServices.getSingleBlog(Number(id));

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Blog retrived successfully.',
      data: result
    })
})


// Create blog
const updateBlog = catchAsync(async(req: Request, res: Response)=> {
  const {id} = req.params
  const result = await BlogServices.updateBlog(Number(id), req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Blog updated successfully.',
      data: result
    })
})


// Create blog
const deleteBlog = catchAsync(async(req: Request, res: Response)=> {
  const {id} = req.params
  const result = await BlogServices.deleteBlog(Number(id));

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Blog deleted successfully.',
      data: result
    })
})

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
}