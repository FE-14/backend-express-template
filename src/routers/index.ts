import { Router } from "express";

/**
 * import router from every file
 */
import Users from "./users.router";
import Projects from "./project.router";
import Auth from "./auth.router";

const router = Router();

/**
 * Define and map all router from all files
 */
router.use("/users", Users);
router.use("/projects", Projects);
router.use("/auths", Auth);

export default router;
