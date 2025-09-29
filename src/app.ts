import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import envVars from "./config/env";
import { seedAdmin } from "./utils/seedAdmin";
import appRoutes from "./routes";
import { errorHandler } from "./middleware/errorHanlder";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();
seedAdmin();

export const server = app.listen(envVars.PORT, () => {
  console.log(`server started at http://localhost:${envVars.PORT}`);
});

app.get("/", (_, res) => {
  res.send({ message: "Portfolio Server is running", success: true });
});

app.use("/api/v1", appRoutes);
app.use(errorHandler);

export default app;
