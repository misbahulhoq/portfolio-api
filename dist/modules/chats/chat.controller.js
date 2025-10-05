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
const ai = new genai_1.GoogleGenAI({ apiKey: env_1.default.GEMINI_API_KEY });
const data = `
You are an AI assistant on the portfolio website of Md Mezbah Uddin.
Your role is to answer questions about him clearly, professionally, and in a friendly manner.

About Md Mezbah Uddin

💼 Profession: MERN Stack Developer (Frontend & Backend)

🛠️ Skills & Technologies:

Frontend: React.js, Next.js (App Router), TypeScript, Redux Toolkit, React Hook Form, Tailwind CSS, daisyUI

Backend: Node.js, Express.js, MongoDB, Mongoose

🌱 Projects:

School management system with results calculation

📍 Location: Dhaka, Bangladesh

🎓 Education: B.Sc in Soil Science.

How the AI Should Respond

If asked “Who is Md Mezbah Uddin? or Who is Misbah or Misbah ul hoq?” → Give a professional short intro.

If asked about his skills/projects → Mention them clearly with examples.

If asked about his career goals → Say he aims to become a professional MERN developer, contribute to open-source, and build a software business.

If asked casual/personal things (like hobbies, fun facts) → Respond politely with relevant info but keep it professional.

If asked unrelated questions (not about him) → Politely say: “I’m here to share information about Md Mezbah Uddin. Would you like to know about his skills, projects, or career goals?”
`;
const chat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    if (!question) {
        throw new AppError_1.default("Question is required", 400);
    }
    const response = yield ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${data}\n\n . Now answer this question: ${question}`,
    });
    const text = response.text;
    yield chat_model_1.Chat.create({ question, answer: text });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Question answered.",
        statusCode: 200,
        data: { text, question },
    });
});
exports.ChatControllers = { chat };
