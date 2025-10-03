import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { userLoginZodSchema } from "./auth.validations";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest(userLoginZodSchema),
  AuthControllers.userLogin
);

export default authRouter;
