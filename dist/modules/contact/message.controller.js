"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageControllers = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const message_model_1 = require("./message.model");
const sendResponse_1 = require("../../utils/sendResponse");
const emailSender_1 = require("../../utils/emailSender");
// This function will save the message in the database and also send an email.
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, subject, message: userMessage } = req.body;
    if (!email || !userMessage || !name || !subject) {
        throw new AppError_1.default("All fields are required.", 400);
    }
    yield message_model_1.message.create(req.body);
    (0, emailSender_1.sendEmail)({
        email: "extraordinarymisbah@gmail.com",
        subject: `New message from ${name}`,
        message: `
      <body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:40px 20px;">
        <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 30px;text-align:center;position:relative;">
            <div style="width:80px;height:80px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);border:3px solid rgba(255,255,255,0.3);">
              <div style="width:40px;height:40px;border:4px solid #fff;border-radius:50%;border-top-color:transparent;animation:spin 1s linear infinite;"></div>
            </div>
            <h1 style="margin:0;color:#fff;font-size:32px;font-weight:700;text-shadow:0 2px 10px rgba(0,0,0,0.2);">New Contact Message</h1>
            <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:16px;">You've received a new inquiry</p>
          </div>
          <!-- Content -->
          <div style="padding:40px 30px;">
            <!-- From Section -->
            <div style="margin-bottom:30px;padding:25px;background:linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%);border-radius:15px;border-left:5px solid #667eea;">
              <div style="margin-bottom:20px;">
                <p style="margin:0 0 8px;color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">From</p>
                <p style="margin:0;color:#2d3748;font-size:20px;font-weight:700;">${name}</p>
              </div>
              <div>
                <p style="margin:0 0 8px;color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</p>
                <a href="mailto:${email}" style="margin:0;color:#764ba2;font-size:16px;text-decoration:none;font-weight:500;">${email}</a>
              </div>
            </div>
            <!-- Subject Section -->
            <div style="margin-bottom:30px;padding:25px;background:linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%);border-radius:15px;border-left:5px solid #ff6b6b;">
              <p style="margin:0 0 8px;color:#c23030;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Subject</p>
              <p style="margin:0;color:#2d3748;font-size:22px;font-weight:700;line-height:1.4;">${subject}</p>
            </div>
            <!-- Message Section -->
            <div style="margin-bottom:30px;padding:25px;background:#f8f9fa;border-radius:15px;border:2px dashed #dee2e6;">
              <p style="margin:0 0 15px;color:#667eea;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Message</p>
              <p style="margin:0;color:#2d3748;font-size:16px;line-height:1.8;white-space:pre-wrap;">${userMessage}</p>
            </div>
            <!-- Reply Button -->
            <div style="text-align:center;margin-top:35px;">
              <a href="mailto:extraordinarymisbah@gmail.com" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;text-decoration:none;border-radius:50px;font-weight:600;font-size:16px;box-shadow:0 10px 30px rgba(102,126,234,0.4);transition:transform 0.2s;">Reply to Message</a>
            </div>
          </div>
          <!-- Footer -->
          <div style="background:#f8f9fa;padding:25px 30px;text-align:center;border-top:1px solid #e9ecef;">
            <p style="margin:0;color:#6c757d;font-size:14px;">This message was sent via your contact form</p>
            <p style="margin:10px 0 0;color:#adb5bd;font-size:12px;">© 2025 All rights reserved</p>
          </div>
        </div>
      </body>
    `,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Message sent successfully.",
        data: null,
    });
});
exports.MessageControllers = { sendMessage };
