import mongoose from "mongoose";

interface IChat extends Document {
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

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
