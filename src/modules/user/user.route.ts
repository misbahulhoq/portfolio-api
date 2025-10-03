import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/login", UserControllers.login);
router.post("/me", UserControllers.me);
export const UserRoutes = router;
