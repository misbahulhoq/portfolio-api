import { Request, Response } from "express";
import AppError from "../../utils/AppError";
import { GoogleGenAI } from "@google/genai";
import envVars from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";
import { Chat } from "./chat.model";

const ai = new GoogleGenAI({ apiKey: envVars.GEMINI_API_KEY });

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
const chat = async (req: Request, res: Response) => {
  const { question } = req.body;
  if (!question) {
    throw new AppError("Question is required", 400);
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${data}\n\n . Now answer this question: ${question}`,
  });
  const text = response.text;

  await Chat.create({ question, answer: text });
  sendResponse(res, {
    success: true,
    message: "Question answered.",
    statusCode: 200,
    data: { text, question },
  });
};

export const ChatControllers = { chat };
