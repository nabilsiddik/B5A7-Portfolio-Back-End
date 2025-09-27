import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

const userLogin = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthServices.userLogin(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User login successfull",
            data: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                userInfo: result.userInfo
            },
        })

    })

export const AuthControllers = {
    userLogin
}