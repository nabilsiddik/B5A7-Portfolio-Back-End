import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

// User credential login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.userLogin(res, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User login successfull",
    data: result,
  });
});

export const AuthControllers = {
  userLogin,
};
