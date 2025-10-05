import mongoose from "mongoose";

interface IChat extends Document {
  question: string;
  answer: string;
}

const chatSchema = new mongoose.Schema<IChat>({
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
});

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
