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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const db_config_1 = require("../../config/db.config");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// user credential login
const userLogin = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    if (!email || !password) {
        throw new appError_1.default(404, "Invalid credential");
    }
    const existingUser = yield db_config_1.prisma.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        throw new appError_1.default(400, "User does not exist with this email.");
    }
    const isPasswordMatchd = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!isPasswordMatchd) {
        throw new appError_1.default(400, "Password is not valid");
    }
    const { password: pas } = existingUser, restUser = __rest(existingUser, ["password"]);
    return restUser;
});
exports.AuthServices = {
    userLogin,
};
