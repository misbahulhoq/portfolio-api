import mongoose from "mongoose";

export async function connectDB() {
  mongoose
    .connect("")
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));
}
