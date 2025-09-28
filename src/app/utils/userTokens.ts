import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env.config";
import { IUser, UserStatus } from "../modules/user/user.interfaces";
import { generateToken, verifyToken } from "./jwt";
import { prisma } from "../config/db.config";
import AppError from "../errorHelpers/appError";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  // Generate access token
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  // Generate refresh token
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken
  }
};


// Generate new access token with refresh token
export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const existingUser = await prisma.user.findUnique({
    where: {email: verifiedRefreshToken.email}
  });

  if (!existingUser) {
    throw new AppError(400, "User does not exist");
  }

  if (
    existingUser.status === UserStatus.BLOCKED ||
    existingUser.status === UserStatus.DEACTIVATED
  ) {
    throw new AppError(
      400,
      `User is ${existingUser.status}`
    );
  }

  const jwtPayload = {
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken
};