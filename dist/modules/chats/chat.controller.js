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
exports.ChatControllers = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const genai_1 = require("@google/genai");
const env_1 = __importDefault(require("../../config/env"));
const sendResponse_1 = require("../../utils/sendResponse");
const chat_model_1 = require("./chat.model");
const training_data_1 = require("./training-data");
const ai = new genai_1.GoogleGenAI({ apiKey: env_1.default.GEMINI_API_KEY });
const chat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    if (!question) {
        throw new AppError_1.default("Question is required", 400);
    }
    yield chat_model_1.Chat.create({ text: question, sender: "user" });
    const response = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${training_data_1.data}\n\n . Now answer this question: ${question}`,
    });
    const text = response.text;
    yield chat_model_1.Chat.create({ text, sender: "bot" });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Question answered.",
        statusCode: 200,
        data: { text, sender: "bot" },
    });
});
exports.ChatControllers = { chat };
