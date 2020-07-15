import { Router } from "express";
import { get, createUser } from "../controllers/user.controller";

const router = Router();

router.get("/", get);
router.post("/", createUser);

export default router;
