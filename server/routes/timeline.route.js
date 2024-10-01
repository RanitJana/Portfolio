import express from "express";
import {
  handleDeleteTimeline,
  handleGetTimeline,
  handleAddTimeline,
  handleUpdateTimeline,
} from "../controllers/timeline.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.get("/:adminId", handleGetTimeline);
router.post("/", verifyUser, handleAddTimeline);
router.put("/", verifyUser, handleUpdateTimeline);
router.delete("/", verifyUser, handleDeleteTimeline);

export default router;
