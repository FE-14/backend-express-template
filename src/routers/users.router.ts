import { Router } from "express";
import { checkSchema } from "express-validator";
import {
	get,
	createUser,
	getUser,
	newUserValidatorSchema,
} from "../controllers/user.controller";

const router = Router();

/**
 * Register all route here
 */
router.get("/", get);
router.post("/", checkSchema(newUserValidatorSchema), createUser);
router.get("/:id", getUser);

export default router;
