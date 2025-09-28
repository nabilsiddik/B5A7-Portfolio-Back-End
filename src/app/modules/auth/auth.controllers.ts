import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";

// User credential login
const userLogin = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthServices.userLogin(res, req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User login successfull",
            data: result
        })

    })


// get new access token using refresh token
const getNewAccessToken = catchAsync(
    async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError(
                400,
                "No refresh token received from cookies."
            );
        }

        const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

        setAuthCookie(res, tokenInfo);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "New Access token created successfull",
            data: tokenInfo,
        })
    }
);

export const AuthControllers = {
    userLogin,
    getNewAccessToken
}