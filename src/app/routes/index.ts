import { Router } from "express";
import userRouter from "../modules/user/user.routes";
import authRouter from "../modules/auth/auth.routes";
import blogRouter from "../modules/blog/blog.routes";

const router = Router()

const moduleRouter = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/blog',
        route: blogRouter
    }
]

moduleRouter.forEach((route) => {
    router.use(route.path, route.route)
})

export default router