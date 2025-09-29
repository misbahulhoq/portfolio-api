import dotenv from "dotenv";
dotenv.config();

// Define the shape of required environment variables
interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_EXPIRES: string;
  ADMIN_EMAIL: string;
  ADMIN_PASS: string;
  SALT_ROUND: number;
}

// List of required environment variables
const requiredVars: (keyof EnvVars)[] = [
  "NODE_ENV",
  "PORT",
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_EXPIRES",
  "ADMIN_EMAIL",
  "ADMIN_PASS",
  "SALT_ROUND",
];

// Check if all required environment variables are set
for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Export with proper typing
const envVars: EnvVars = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASS: process.env.ADMIN_PASS as string,
  SALT_ROUND: Number(process.env.SALT_ROUND),
};

export default envVars;
