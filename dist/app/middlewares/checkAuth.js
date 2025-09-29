"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionToken = req.headers.authorization ||
            req.cookies["authjs.session-token"] ||
            req.cookies["__Secure-authjs.session-token"];
        // console.log('my auth toke', sessionToken)
        // Throw error if access token not found
        if (!sessionToken) {
            throw new appError_1.default(403, "Session Token not found");
        }
        const verifiedToken = jsonwebtoken_1.default.verify(sessionToken, env_config_1.envVars.NEXT_AUTH_SESSION_TOKEN);
        console.log('verified token', verifiedToken);
        // const existingUser = await User.findOne({
        //   email: verifiedToken.email,
        // });
        // // Throw error if not existing user
        // if (!existingUser) {
        //   throw new AppError(statusCodes.BAD_REQUEST, "User does not exist");
        // }
        // // Throw error if user is not verified
        // if (!existingUser.isVerified) {
        //   throw new AppError(statusCodes.BAD_REQUEST, "User is not verified");
        // }
        // // Throw error if user is blocked or inactive
        // if (
        //   existingUser.isActive === IsActive.BLOCKED ||
        //   existingUser.isActive === IsActive.INACTIVE
        // ) {
        //   throw new AppError(
        //     statusCodes.BAD_REQUEST,
        //     `User is ${existingUser.isActive}`
        //   );
        // }
        // // Throw error if user is deleted
        // if (existingUser.isDeleted) {
        //   throw new AppError(statusCodes.BAD_REQUEST, "User is deleted");
        // }
        // // Throw error if user is not permited to the route
        // if (!authRoles.includes(verifiedToken.role)) {
        //   throw new AppError(403, "You are not permited to access this route.");
        // }
        // req.user = verifiedToken
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
