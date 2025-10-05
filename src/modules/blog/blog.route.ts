import { Router } from "express";
import { auth } from "../../middleware/auth";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/", auth(), BlogController.createBlog);
router.get("/", auth(), BlogController.getBlogs);
router.get("/:id", auth(), BlogController.getBlogById);
router.put("/:id", auth(), BlogController.updateBlog);
router.delete("/:id", auth(), BlogController.deleteBlog);

export const BlogRoutes = router;
