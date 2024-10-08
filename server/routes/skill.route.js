import express from "express";
import {
  handleAddSkill,
  handleDeleteSkill,
  handleGetSkill,
  handleUpdateSkill,
} from "../controllers/skill.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.get("/:adminId", handleGetSkill);
router.post("/", verifyUser, handleAddSkill);
router.put("/", verifyUser, handleUpdateSkill);
router.delete("/", verifyUser, handleDeleteSkill);

export default router;
