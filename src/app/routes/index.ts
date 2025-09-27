import { Router } from "express";
import userRouter from "../modules/user/user.routes";
import authRouter from "../modules/auth/auth.routes";

const router = Router()

const moduleRouter = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    }
]

moduleRouter.forEach((route) => {
    router.use(route.path, route.route)
})

export default router