"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const env_1 = __importDefault(require("../config/env"));
const mongoose_1 = require("mongoose");
const sendResponse_1 = require("../utils/sendResponse");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server error.";
    if (env_1.default.NODE_ENV === "development") {
        // console.log(err);
    }
    if (err instanceof AppError_1.default) {
        (statusCode = err.statusCode), (message = err.message);
    }
    if (err instanceof mongoose_1.Error.ValidationError) {
        console.log("Mongoose error");
        message = err.message;
        statusCode = 400;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode,
        success: false,
        message,
        data: null,
    });
};
exports.errorHandler = errorHandler;
