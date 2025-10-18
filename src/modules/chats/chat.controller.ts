import { Request, Response } from "express";
import AppError from "../../utils/AppError";
import { GoogleGenAI } from "@google/genai";
import envVars from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";
import { Chat } from "./chat.model";
import { data } from "./training-data";

const ai = new GoogleGenAI({ apiKey: envVars.GEMINI_API_KEY });

const chat = async (req: Request, res: Response) => {
  const { question, history } = req.body;

  if (!question) {
    throw new AppError("Question is required", 400);
  }

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history,
    config: {
      systemInstruction: `${data}`,
    },
  });

  const response = await chat.sendMessage({ message: question });
  const text = response.text;

  // await Chat.create({ text: question, sender: "user" });

  sendResponse(res, {
    success: true,
    message: "Question answered.",
    statusCode: 200,
    data: { parts: [{ text }], role: "model" },
  });
};

const createContext = async (req: Request, res: Response) => {};

const useContext = async (req: Request, res: Response) => {};

export const ChatControllers = { chat, createContext, useContext };
