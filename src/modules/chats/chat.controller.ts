import { Request, Response } from "express";
import AppError from "../../utils/AppError";
import {
  GoogleGenAI,
  HarmCategory,
  Chat as ChatSession,
  Chats,
  HarmBlockThreshold,
} from "@google/genai";
import envVars from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";
import { Chat } from "./chat.model";
import { data } from "./training-data";

const ai = new GoogleGenAI({ apiKey: envVars.GEMINI_API_KEY });

const chat = async (req: Request, res: Response) => {
  const { question, context } = req.body;

  if (!question) {
    throw new AppError("Question is required", 400);
  }

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
  });

  const testResponse = chat.sendMessage({
    message: `${data}\n\n . ${
      context.length > 1 ? "Use this context for your answer." + context : ""
    } Now answer this question: ${question}`,
  });

  const testChunk = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: `${data}\n\n . Now answer this question: ${question}`,
  });

  await Chat.create({ text: question, sender: "user" });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${data}\n\n . 
    
    Now answer this question: ${question}`,
  });
  const text = response.text;
  await Chat.create({ text, sender: "bot" });
  sendResponse(res, {
    success: true,
    message: "Question answered.",
    statusCode: 200,
    data: { text, sender: "bot" },
  });
};

const createContext = async (req: Request, res: Response) => {};

const useContext = async (req: Request, res: Response) => {};

export const ChatControllers = { chat, createContext, useContext };
