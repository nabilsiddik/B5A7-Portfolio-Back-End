import dotenv from 'dotenv'
dotenv.config()

interface EnvConfig {
    PORT: string,
    NODE_ENV: string,
    DATABASE_URL: string,
    SALT_ROUND: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ['PORT', 'NODE_ENV', 'DATABASE_URL', 'SALT_ROUND']

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        SALT_ROUND: process.env.SALT_ROUND as string
    }
}

export const envVars = loadEnvVariables()