import { Router } from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validations";

const userRouter = Router();

userRouter.post(
  "/",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);
userRouter.get("/:userId", UserControllers.getCurrentUser);

export default userRouter;
