import { Router } from "express";

const router = Router();

/**
 * import router from every file
 */
import Users from "./users.router";

/**
 * Define and map all router from all files
 */
router.use("/users", Users);

export default router;
