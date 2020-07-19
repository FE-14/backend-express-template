import { Router } from "express";

/**
 * import router from every file
 */
import Users from "./users.router";
import Projects from "./project.router";

const router = Router();

/**
 * Define and map all router from all files
 */
router.use("/users", Users);
router.use("/projects", Projects);

export default router;
