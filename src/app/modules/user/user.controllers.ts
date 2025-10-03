import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "./user.interfaces";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Created Successfully",
    data: user,
  });
});

const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const currentUser = await UserServices.getCurrentUser(Number(userId));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Current user retrived Successfully",
    data: currentUser,
  });
});

export const UserControllers = {
  createUser,
  getCurrentUser,
};
