import { Router } from "express";
import { auth } from "../../middleware/auth";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/", auth(), ProjectController.createProject);
router.get("/", auth(), ProjectController.getProjects);
export const ProjectRoutes = router;
