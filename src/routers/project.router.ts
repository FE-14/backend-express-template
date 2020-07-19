import { Router } from "express";
import { getProject, postProject } from "../controllers/project.controller";

const router = Router();

router.get("/", getProject);
router.post("/", postProject);

export default router;
