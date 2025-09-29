"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server error.";
    if (err instanceof AppError_1.default) {
        (statusCode = err.statusCode), (message = err.message);
    }
    res.status(statusCode).send({
        statusCode,
        success: false,
        message,
        data: null,
    });
};
exports.errorHandler = errorHandler;
