import express from "express";
import {
  handleSendMessage,
  handleGetMessage,
  handleDeleteMessage,
} from "../controllers/message.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.post("/:adminId", handleSendMessage);
router.get("/", verifyUser, handleGetMessage);
router.delete("/", verifyUser, handleDeleteMessage);

export default router;
