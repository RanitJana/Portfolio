import express from "express";
import { handleUpdatePassword } from "../controllers/password.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.put("/", verifyUser, handleUpdatePassword);

export default router;
