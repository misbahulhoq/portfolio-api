import mongoose from "mongoose";

interface IChat extends Document {
  text: string;
  sender: "bot" | "user";
}
interface IContext extends Document {
  chatId: string;
  text: string;
  sender: "bot" | "user";
}

const chatSchema = new mongoose.Schema<IChat>({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  sender: {
    type: String,
    enum: ["bot", "user"],
    required: [true, "Sender is required"],
  },
});

const chatContextSchema = new mongoose.Schema<IContext>({
  chatId: {
    type: String,
    required: [true, "Chat ID is required"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  sender: {
    type: String,
    enum: ["bot", "user"],
    required: [true, "Sender is required"],
  },
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
export const ChatContext = mongoose.model<IContext>(
  "ChatContext",
  chatContextSchema
);
