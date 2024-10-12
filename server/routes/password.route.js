import express from "express";
import {
  handleUpdatePassword,
  handleForgetPassword,
} from "../controllers/password.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.put("/", verifyUser, handleUpdatePassword);
router.put("/change", handleForgetPassword);

export default router;
