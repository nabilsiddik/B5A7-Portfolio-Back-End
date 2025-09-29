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
exports.seedAdmin = void 0;
const db_config_1 = require("../config/db.config");
const env_config_1 = require("../config/env.config");
const user_interfaces_1 = require("../modules/user/user.interfaces");
const bcrypt_1 = __importDefault(require("bcrypt"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdminExist = yield db_config_1.prisma.user.findUnique({
            where: { email: env_config_1.envVars.ADMIN_EMAIL }
        });
        if (isAdminExist) {
            console.log('Admin already exist');
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(env_config_1.envVars.ADMIN_PASSWORD, Number(env_config_1.envVars.SALT_ROUND));
        const adminPayload = {
            fullName: 'Admin',
            email: String(env_config_1.envVars.ADMIN_EMAIL),
            password: hashedPassword,
            role: user_interfaces_1.UserRole.ADMIN,
            isVerified: true
        };
        yield db_config_1.prisma.user.create({
            data: adminPayload
        });
    }
    catch (err) {
        console.log('Errro while seed super admin', err);
    }
});
exports.seedAdmin = seedAdmin;
