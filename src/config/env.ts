import dotenv from "dotenv";
dotenv.config();

// Define the shape of required environment variables

interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
}

// List of required environment variables

const requiredVars: (keyof EnvVars)[] = [
  "NODE_ENV",
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
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
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export default envVars;
