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
exports.auth = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const user_model_1 = require("../modules/user/user.model");
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw new AppError_1.default("Access token not found.", 401);
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, env_1.default.JWT_ACCESS_SECRET);
            const user = yield user_model_1.User.findOne({ email: decoded.email });
            req.user = user;
            next();
        }
        catch (err) {
            throw new AppError_1.default(err.message || "Unauthorized", 401);
        }
    });
};
exports.auth = auth;
