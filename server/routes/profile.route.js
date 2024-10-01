import express from "express";
import {
  handleUpdateProfile,
  handleGetProfile,
} from "../controllers/profile.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.put("/", verifyUser, upload.single("avatar"), handleUpdateProfile);
router.get("/:adminId", handleGetProfile);

export default router;
