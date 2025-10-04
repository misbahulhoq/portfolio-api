import { Router } from "express";
import { auth } from "../../middleware/auth";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/", auth(), BlogController.createBlog);
export const BlogRoutes = router;
