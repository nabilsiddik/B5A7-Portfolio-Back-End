import { Router } from "express";
import userRouter from "../modules/user/user.routes";
import authRouter from "../modules/auth/auth.routes";
import blogRouter from "../modules/blog/blog.routes";
import projectRouter from "../modules/project/project.routes";

const router = Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/blog",
    route: blogRouter,
  },
  {
    path: "/project",
    route: projectRouter,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
