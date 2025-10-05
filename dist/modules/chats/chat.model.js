"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
    },
});
exports.Chat = mongoose_1.default.model("Chat", chatSchema);
