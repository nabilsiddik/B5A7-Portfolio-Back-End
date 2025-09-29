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
exports.BlogServices = void 0;
const db_config_1 = require("../../config/db.config");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
// Create blog
const createBlog = (blogPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, featuredImage, isFeatured, tags } = blogPayload;
    if (!title || !content || !featuredImage || !tags) {
        throw new appError_1.default(400, 'Invalid credentials');
    }
    const blog = {
        title,
        content,
        featuredImage,
        isFeatured,
        tags,
        authorId: 2,
    };
    const blogRes = yield db_config_1.prisma.blog.create({
        data: blog
    });
    return blogRes;
});
// get all blog
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield db_config_1.prisma.blog.findMany();
    return allBlogs;
});
// get single blogs
const getSingleBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!blogId) {
        throw new appError_1.default(404, 'Blog id not found');
    }
    const blog = yield db_config_1.prisma.blog.findUnique({
        where: { id: blogId }
    });
    if (!blog) {
        throw new appError_1.default(404, 'Blog not found');
    }
    // update views
    yield db_config_1.prisma.blog.update({
        where: { id: blogId },
        data: {
            view: {
                increment: 1
            }
        }
    });
    return blog;
});
// update blog
const updateBlog = (blogId, updatedPayload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!blogId) {
        throw new appError_1.default(404, 'Blog id not found');
    }
    const blog = yield db_config_1.prisma.blog.findUnique({
        where: { id: blogId }
    });
    if (!blog) {
        throw new appError_1.default(404, 'Blog not found');
    }
    const updatedBlog = yield db_config_1.prisma.blog.update({
        where: { id: blogId },
        data: updatedPayload
    });
    return updatedBlog;
});
// delete blogs
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!blogId) {
        throw new appError_1.default(404, 'Blog id not found');
    }
    const blog = yield db_config_1.prisma.blog.findUnique({
        where: { id: blogId }
    });
    if (!blog) {
        throw new appError_1.default(404, 'Blog not found');
    }
    const deletedBlog = yield db_config_1.prisma.blog.delete({
        where: { id: blogId }
    });
    return deletedBlog;
});
exports.BlogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
};
