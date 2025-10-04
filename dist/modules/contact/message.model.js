"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
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
exports.message = (0, mongoose_1.model)("Message", messageSchema);
