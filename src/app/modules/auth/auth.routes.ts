import { Router } from "express"
import { AuthControllers } from "./auth.controllers"
import { validateRequest } from "../../middlewares/validateRequest"
import { userLoginZodSchema } from "./auth.validations"


const authRouter = Router()

authRouter.post('/login', validateRequest(userLoginZodSchema), AuthControllers.userLogin)

authRouter.post('/refresh-token', AuthControllers.getNewAccessToken)


export default authRouter 