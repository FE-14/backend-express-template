import { Router } from "express";

/**
 * import router from every file
 */
import Auth from "./auth.router";

const router = Router();

/**
 * Define and map all router from all files
 */
router.use("/auths", Auth);

export default router;
