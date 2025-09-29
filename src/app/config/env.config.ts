import dotenv from 'dotenv'
dotenv.config()

interface EnvConfig {
    PORT: string,
    NODE_ENV: string,
    DATABASE_URL: string,
    SALT_ROUND: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string,
    NEXT_AUTH_SESSION_TOKEN: string,
    ADMIN_EMAIL: string,
    ADMIN_PASSWORD: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ['PORT', 'NODE_ENV', 'DATABASE_URL', 'SALT_ROUND', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES', 'JWT_REFRESH_SECRET', 'JWT_REFRESH_EXPIRES', 'NEXT_AUTH_SESSION_TOKEN', 'ADMIN_EMAIL', 'ADMIN_PASSWORD']

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        SALT_ROUND: process.env.SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        NEXT_AUTH_SESSION_TOKEN: process.env.NEXT_AUTH_SESSION_TOKEN as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string
    }
}

export const envVars = loadEnvVariables()