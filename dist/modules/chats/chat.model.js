"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatContext = exports.Chat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
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
const chatContextSchema = new mongoose_1.default.Schema({
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
exports.Chat = mongoose_1.default.model("Chat", chatSchema);
exports.ChatContext = mongoose_1.default.model("ChatContext", chatContextSchema);
