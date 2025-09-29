import mongoose from "mongoose";
import envVars from "./env";

export async function connectDB() {
  mongoose
    .connect(envVars.MONGO_URI)
    .then(() => console.log("Connected to mongoDB."))
    .catch((error) => console.log(error));
}

// only used for testing.
export async function disconnectDB() {
  mongoose
    .disconnect()
    .then(() => console.log("Disconnected from mongoDB."))
    .catch((error) => console.log(error));
}
