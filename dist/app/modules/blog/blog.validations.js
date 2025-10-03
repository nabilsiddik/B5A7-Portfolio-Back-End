"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.blogSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, "Title must be at least 3 characters"),
    content: zod_1.default.string().min(10, "Content must be at least 10 characters"),
    featuredImage: zod_1.default.string().url("Featured image must be a valid URL"),
    isFeatured: zod_1.default.boolean(),
    tags: zod_1.default.string(),
});
