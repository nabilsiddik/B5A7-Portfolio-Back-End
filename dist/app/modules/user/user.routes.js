"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validations_1 = require("./user.validations");
const userRouter = (0, express_1.Router)();
userRouter.post('/', (0, validateRequest_1.validateRequest)(user_validations_1.createUserZodSchema), user_controllers_1.UserControllers.createUser);
exports.default = userRouter;
