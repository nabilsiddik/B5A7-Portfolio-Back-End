import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogServices } from "./blog.services";
import { sendResponse } from "../../utils/sendResponse";

const createBlog = catchAsync(async(req: Request, res: Response)=> {
  const user = await BlogServices.createBlog(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Blog created successfully.',
      data: user
    })
})

export const BlogControllers = {
    createBlog
}