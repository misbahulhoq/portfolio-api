import jwt from "jsonwebtoken";
import envVars from "../config/env";

interface Payload {
  email: string;
  _id: unknown;
}
export const generateAccessToken = (payload: Payload) =>
  jwt.sign(payload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: envVars.JWT_ACCESS_EXPIRES as any,
  });

export const generateRefreshToken = (payload: Payload) =>
  jwt.sign(payload, envVars.JWT_REFRESH_SECRET, {
    expiresIn: envVars.JWT_REFRESH_EXPIRES as any,
  });
