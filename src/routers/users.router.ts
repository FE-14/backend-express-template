import { Router } from "express";
import { get, createUser, getUser } from "../controllers/user.controller";

const router = Router();

router.get("/", get);
router.post("/", createUser);
router.get("/:id", getUser);

export default router;
