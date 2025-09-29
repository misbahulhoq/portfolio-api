import mongoose from "mongoose";
import envVars from "./env";

export async function connectDB() {
  mongoose
    .connect(envVars.MONGO_URI)
    .then(() => console.log("Connected to mongoDB."))
    .catch((error) => console.log(error));
}
