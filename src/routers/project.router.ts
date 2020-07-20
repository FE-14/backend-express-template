import { Router } from "express";
import { getProject, postProject } from "../controllers/project.controller";

const router = Router();

/**
 * Register all route here
 */
router.get("/", getProject);
router.post("/", postProject);

export default router;
