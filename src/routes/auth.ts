import express from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

router.use("/auth", UserRoutes);

export const AuthRoutes = router;
