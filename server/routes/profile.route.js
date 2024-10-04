import express from "express";
import {
  handleUpdateProfile,
  handleGetProfile,
} from "../controllers/profile.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.put(
  "/",
  verifyUser,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  handleUpdateProfile
);
router.get("/:adminId", handleGetProfile);

export default router;
