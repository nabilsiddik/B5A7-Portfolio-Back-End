import { Response } from "express";
import { prisma } from "../../config/db.config";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { IUser } from "../user/user.interfaces";
import bcrypt from 'bcrypt'

// user credential login
const userLogin = async (res: Response, payload: Partial<IUser>) => {
  const { email, password } = payload

  if (!email || !password) {
    throw new AppError(404, "Invalid credential");
  }

  const existingUser = await prisma.user.findUnique({
    where: {email}
  })

  if (!existingUser) {
    throw new AppError(400, "User does not exist with this email.");
  }

  const isPasswordMatchd = await bcrypt.compare(
    password as string,
    existingUser.password as string
  )

  if (!isPasswordMatchd) {
    throw new AppError(400, "Password is not valid")
  }

  const userTokens = createUserTokens(existingUser as Partial<IUser>)

  setAuthCookie(res, userTokens)

  const {password: pas, ...restUser} = existingUser

  return restUser
};



// get new access token using refresh token
const getNewAccessToken = async (refreshToken: string) => {
  const getNewAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
  return {
    accessToken: getNewAccessToken
  }
}



export const AuthServices = {
    userLogin,
    getNewAccessToken
}
