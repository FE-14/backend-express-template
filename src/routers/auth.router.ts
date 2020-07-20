import { Router } from "express";
import { loginHandler, loginValidator } from "../controllers/auth.controller";
import { checkSchema } from "express-validator";

const router = Router();

/**
 * Register all route here
 */
router.post("/login", checkSchema(loginValidator), loginHandler);

export default router;
