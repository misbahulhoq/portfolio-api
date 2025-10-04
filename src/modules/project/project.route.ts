import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/", auth(), ProjectController.createProject);
router.get("/", auth(), ProjectController.getProjects);
router.get("/:id", auth(), ProjectController.getProjectById);
export const ProjectRoutes = router;
