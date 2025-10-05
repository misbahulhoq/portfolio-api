import dotenv from "dotenv";
dotenv.config();

// Define the shape of required environment variables
interface EnvVars {
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_EXPIRES: string;
  GEMINI_API_KEY: string;
  ADMIN_EMAIL: string;
  ADMIN_PASS: string;
  SALT_ROUND: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
}

// List of required environment variables
const requiredVars: (keyof EnvVars)[] = [
  "NODE_ENV",
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_EXPIRES",
  "GEMINI_API_KEY",
  "ADMIN_EMAIL",
  "ADMIN_PASS",
  "SALT_ROUND",
  "EMAIL_USER",
  "EMAIL_PASS",
];

// Check if all required environment variables are set
for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Export with proper typing
const envVars: EnvVars & { PORT: number } = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASS: process.env.ADMIN_PASS as string,
  SALT_ROUND: Number(process.env.SALT_ROUND),
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASS: process.env.EMAIL_PASS as string,
};

export default envVars;
