import express from "express";
import { handleLogOut } from "../controllers/auth.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.post("/", verifyUser, handleLogOut);

export default router;
