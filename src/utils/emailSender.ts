import envVars from "../config/env";
import nodemailer from "nodemailer";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envVars.EMAIL_USER,
    pass: envVars.EMAIL_PASS,
  },
});

export const sendEmail = async (body: {
  email: string;
  subject: string;
  message: string;
}) => {
  const { email, subject, message } = body;

  // Send email
  mailTransporter.sendMail({
    from: envVars.EMAIL_USER,
    to: email,
    subject,
    html: message,
  });
};
