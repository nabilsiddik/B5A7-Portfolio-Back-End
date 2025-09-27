import { Router } from "express";
import userRouter from "../modules/user/user.routes";

const router = Router()

const moduleRouter = [
    {
        path: '/user',
        route: userRouter
    }
]

moduleRouter.forEach((route) => {
    router.use(route.path, route.route)
})

export default router