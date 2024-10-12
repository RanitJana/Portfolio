import express from "express";

const router = express.Router();
import { handleVerify } from "../controllers/auth.controller.js";
import {
  handleSendOTP,
  handleVerifyOTP,
} from "../controllers/otp.controller.js";

router.get("/", handleVerify);
router.post("/otp", handleSendOTP);
router.post("/otp/verify", handleVerifyOTP);

export default router;
