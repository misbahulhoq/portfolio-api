"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const generateAccessToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.default.JWT_ACCESS_SECRET, {
    expiresIn: env_1.default.JWT_ACCESS_EXPIRES,
});
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => jsonwebtoken_1.default.sign(payload, env_1.default.JWT_REFRESH_SECRET, {
    expiresIn: env_1.default.JWT_REFRESH_EXPIRES,
});
exports.generateRefreshToken = generateRefreshToken;
