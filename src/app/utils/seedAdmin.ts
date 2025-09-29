import { prisma } from "../config/db.config"
import { envVars } from "../config/env.config"
import { IUser, UserRole } from "../modules/user/user.interfaces"
import bcrypt from 'bcrypt'

export const seedAdmin = async() => {
    try{
       const isAdminExist = await prisma.user.findUnique({
        where: {email: envVars.ADMIN_EMAIL}
       })

       if(isAdminExist){
        console.log('Admin already exist')
        return
       }

       const hashedPassword = await bcrypt.hash(envVars.ADMIN_PASSWORD, Number(envVars.SALT_ROUND))

       const adminPayload: IUser = {
        fullName: 'Admin',
        email: String(envVars.ADMIN_EMAIL),
        password: hashedPassword,
        role: UserRole.ADMIN,
        isVerified: true
       }

       await prisma.user.create({
        data: adminPayload
       })

    }catch(err: unknown){
        console.log('Errro while seed super admin', err)
    }
}