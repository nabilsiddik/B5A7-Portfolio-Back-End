import dotenv from 'dotenv'
import app from './app'
import { prisma } from './app/config/db.config'
import { seedAdmin } from './app/utils/seedAdmin'

dotenv.config()

const port = process.env.PORT || 5000

const dbConnect = async() => {
    try{
        await prisma.$connect()
        console.log('DB Connected Successfully')
    }catch(error: unknown){
        console.log('DB connection failed', error)
        process.exit(1)
    }
}

const startServer = async () => {
    await dbConnect()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}


(async() => {
    await startServer()
    await seedAdmin()
})()



