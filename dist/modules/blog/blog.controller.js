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
exports.BlogController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const blog_interface_1 = __importDefault(require("./blog.interface"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = new blog_interface_1.default(req.body);
        yield blog.save();
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Blog created",
            statusCode: 201,
            data: blog,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            throw new AppError_1.default("Same title already exists", 409);
        }
        else {
            throw new AppError_1.default(err.message || "Something went wrong", 500);
        }
    }
});
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_interface_1.default.find();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Blogs found",
        statusCode: 200,
        data: blogs,
    });
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_interface_1.default.findById(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Blog found",
        statusCode: 200,
        data: blog,
    });
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_interface_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Blog updated",
        statusCode: 200,
        data: blog,
    });
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_interface_1.default.findByIdAndDelete(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Blog deleted",
        statusCode: 200,
        data: blog,
    });
});
exports.BlogController = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
