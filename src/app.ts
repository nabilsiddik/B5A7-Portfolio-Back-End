import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import router from "./app/routes";

dotenv.config()
const app = express()

// middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.send('App is running')
})

app.use('/api/v1', router)

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.'
    })
})

export default app