import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/", auth(), ProjectController.createProject);
router.get("/", ProjectController.getProjects);
router.get("/:id", ProjectController.getProjectById);
export const ProjectRoutes = router;
