import express from "express";

const router = express.Router();
import { handleVerify } from "../controllers/auth.controller.js";

router.get("/", handleVerify);

export default router;
