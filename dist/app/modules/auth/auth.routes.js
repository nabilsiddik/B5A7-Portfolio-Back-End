"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validations_1 = require("./auth.validations");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (0, validateRequest_1.validateRequest)(auth_validations_1.userLoginZodSchema), auth_controllers_1.AuthControllers.userLogin);
exports.default = authRouter;
