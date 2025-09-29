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
exports.createNewAccessTokenWithRefreshToken = exports.createUserTokens = void 0;
const env_config_1 = require("../config/env.config");
const user_interfaces_1 = require("../modules/user/user.interfaces");
const jwt_1 = require("./jwt");
const db_config_1 = require("../config/db.config");
const appError_1 = __importDefault(require("../errorHelpers/appError"));
const createUserTokens = (user) => {
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    // Generate access token
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_config_1.envVars.JWT_ACCESS_SECRET, env_config_1.envVars.JWT_ACCESS_EXPIRES);
    // Generate refresh token
    const refreshToken = (0, jwt_1.generateToken)(jwtPayload, env_config_1.envVars.JWT_REFRESH_SECRET, env_config_1.envVars.JWT_REFRESH_EXPIRES);
    return {
        accessToken,
        refreshToken
    };
};
exports.createUserTokens = createUserTokens;
// Generate new access token with refresh token
const createNewAccessTokenWithRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, env_config_1.envVars.JWT_REFRESH_SECRET);
    const existingUser = yield db_config_1.prisma.user.findUnique({
        where: { email: verifiedRefreshToken.email }
    });
    if (!existingUser) {
        throw new appError_1.default(400, "User does not exist");
    }
    if (existingUser.status === user_interfaces_1.UserStatus.BLOCKED ||
        existingUser.status === user_interfaces_1.UserStatus.DEACTIVATED) {
        throw new appError_1.default(400, `User is ${existingUser.status}`);
    }
    const jwtPayload = {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
    };
    const accessToken = (0, jwt_1.generateToken)(jwtPayload, env_config_1.envVars.JWT_ACCESS_SECRET, env_config_1.envVars.JWT_ACCESS_EXPIRES);
    return accessToken;
});
exports.createNewAccessTokenWithRefreshToken = createNewAccessTokenWithRefreshToken;
