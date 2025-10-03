"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, "title is required"),
    description: zod_1.default.string().min(10, "description is required"),
    thumbnail: zod_1.default.url("Thumbnail url is required."),
    features: zod_1.default.string().optional(),
    liveSiteUrl: zod_1.default.url("Live Site url is required."),
    githubClient: zod_1.default.url("Github client url is required."),
    githubServer: zod_1.default.url("Github server url is required."),
});
