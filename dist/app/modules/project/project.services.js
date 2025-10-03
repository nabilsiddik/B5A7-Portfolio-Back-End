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
exports.ProjectServices = void 0;
const db_config_1 = require("../../config/db.config");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
// Create project
const createProject = (projectPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, thumbnail, liveSite, githubClient, features, githubServer, userId, } = projectPayload;
    if (!title ||
        !description ||
        !thumbnail ||
        !liveSite ||
        !githubClient ||
        !features ||
        !githubServer ||
        !userId) {
        throw new appError_1.default(400, "Invalid credentials");
    }
    const project = {
        title,
        description,
        thumbnail,
        liveSite,
        githubClient,
        githubServer,
        features,
        userId,
    };
    const projectRes = yield db_config_1.prisma.project.create({
        data: project,
    });
    return projectRes;
});
// get all projects
const getAllProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const allProjects = yield db_config_1.prisma.project.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
        },
    });
    return allProjects;
});
// get single project
const getSingleProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!projectId) {
        throw new appError_1.default(404, "project id not found");
    }
    const project = yield db_config_1.prisma.project.findUnique({
        where: { id: projectId },
    });
    if (!project) {
        throw new appError_1.default(404, "Project not found");
    }
    return project;
});
// update project
const updateProject = (projectId, updatedPayload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!projectId) {
        throw new appError_1.default(404, "Project id not found");
    }
    const project = yield db_config_1.prisma.project.findUnique({
        where: { id: projectId },
    });
    if (!project) {
        throw new appError_1.default(404, "Project not found");
    }
    const updatedProject = yield db_config_1.prisma.project.update({
        where: { id: projectId },
        data: updatedPayload,
    });
    return updatedProject;
});
// delete project
const deleteProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!projectId) {
        throw new appError_1.default(404, "Project id not found");
    }
    const project = yield db_config_1.prisma.project.findUnique({
        where: { id: projectId },
    });
    if (!project) {
        throw new appError_1.default(404, "Project not found");
    }
    const deletedProject = yield db_config_1.prisma.project.delete({
        where: { id: projectId },
    });
    return deletedProject;
});
exports.ProjectServices = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
