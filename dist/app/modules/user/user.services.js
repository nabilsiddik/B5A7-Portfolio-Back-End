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
exports.UserServices = void 0;
const db_config_1 = require("../../config/db.config");
const env_config_1 = require("../../config/env.config");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create user
const createUser = (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userPayload) {
        throw new appError_1.default(404, 'User payload not found');
    }
    const { email, password } = userPayload;
    if (!email) {
        throw new appError_1.default(404, 'email not found');
    }
    const isUserExist = yield db_config_1.prisma.user.findUnique({
        where: { email }
    });
    if (isUserExist) {
        throw new appError_1.default(400, 'User already exist with this email.');
    }
    // Hash the password
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(env_config_1.envVars.SALT_ROUND));
    const modifiedUser = {
        fullName: userPayload.fullName,
        email: userPayload.email,
        password: hashedPassword,
    };
    const createdUser = yield db_config_1.prisma.user.create({
        data: modifiedUser
    });
    return createdUser;
});
exports.UserServices = {
    createUser
};
