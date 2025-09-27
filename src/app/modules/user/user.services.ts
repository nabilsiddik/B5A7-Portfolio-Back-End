import { prisma } from "../../config/db.config";
import { envVars } from "../../config/env.config";
import AppError from "../../errorHelpers/appError";
import { IUser, UserRole, UserStatus } from "./user.interfaces";
import bcrypt from 'bcrypt'

// Create user
const createUser = async(userPayload: IUser) => {
    if(!userPayload){
        throw new AppError(404, 'User payload not found')
    }

    const {email, password} = userPayload

    if(!email){
        throw new AppError(404, 'email not found')
    }

    const isUserExist = await prisma.user.findUnique({
        where: {email}
    })

    if(isUserExist){
        throw new AppError(400, 'User already exist with this email.')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password as string, Number(envVars.SALT_ROUND))

    const modifiedUser = {
        ...userPayload,
        password: hashedPassword,
        role: UserRole.USER,
        status: UserStatus.ACTIVE
    }

    const createdUser = await prisma.user.create({
        data: modifiedUser
    })

    return createdUser

}

export const UserServices = {
    createUser
}