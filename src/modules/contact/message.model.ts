import { model, Schema } from "mongoose";

interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}
const messageSchema = new Schema<IMessage>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
});

export const message = model<IMessage>("Message", messageSchema);
