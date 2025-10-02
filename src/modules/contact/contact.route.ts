import express from "express";
import { MessageControllers } from "./message.controller";

const router = express.Router();

router.post("/", MessageControllers.sendMessage);

export const ContactRoutes = router;
