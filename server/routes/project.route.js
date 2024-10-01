import express from "express";
import {
  handleAddproject,
  handleDeleteProject,
  handleUpdateProject,
  handleGetProject,
  handleGetSingleProject,
} from "../controllers/project.controller.js";
import verifyUser from "../middlewares/verifyUser.middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/:adminId", handleGetProject);
router.get("/single/:id", handleGetSingleProject);
router.post("/", verifyUser, upload.single("thumbnail"), handleAddproject);
router.put("/", verifyUser, handleUpdateProject);
router.delete("/", verifyUser, handleDeleteProject);

export default router;
