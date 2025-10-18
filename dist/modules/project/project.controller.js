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
exports.ProjectController = void 0;
const project_model_1 = __importDefault(require("./project.model"));
const sendResponse_1 = require("../../utils/sendResponse");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = new project_model_1.default(req.body);
    yield project.save();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Project created",
        statusCode: 201,
        data: null,
    });
});
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_model_1.default.find();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Projects found",
        statusCode: 200,
        data: projects,
    });
});
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Project found",
        statusCode: 200,
        data: project,
    });
});
const editProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Project updated",
        statusCode: 200,
        data: project,
    });
});
exports.ProjectController = { createProject, getProjects, getProjectById };
