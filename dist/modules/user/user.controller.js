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
exports.UserControllers = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("./user.model");
const jwt_1 = require("../../utils/jwt");
const sendResponse_1 = require("../../utils/sendResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../config/env"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, isRememberMe } = req.body;
    if (!email || !password) {
        throw new AppError_1.default("Email and password is required", 400);
    }
    const user = yield user_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError_1.default("Invalid Credentials", 401);
    }
    const passwordValid = yield user.comparePassword(password);
    if (!passwordValid) {
        throw new AppError_1.default("Invalid Credentials", 401);
    }
    const accessToken = (0, jwt_1.generateAccessToken)({
        _id: user._id,
        email: user.email,
    });
    const refreshToken = (0, jwt_1.generateRefreshToken)({
        _id: user._id,
        email: user.email,
    });
    const accessTokenCookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 50000,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Log in successful",
        statusCode: 200,
        data: null,
    });
});
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw new AppError_1.default("Access token is required", 401);
    }
    try {
        const validToken = jsonwebtoken_1.default.verify(accessToken, env_1.default.JWT_ACCESS_SECRET);
        const user = yield user_model_1.User.findOne({ email: validToken.email });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "User found",
            statusCode: 200,
            data: user,
        });
    }
    catch (error) {
        throw new AppError_1.default(error.message || "Invalid access token", 401);
    }
});
exports.UserControllers = { login, me };
