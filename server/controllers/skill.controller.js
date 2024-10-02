import mongoose from "mongoose";
import skillSchema from "../models/skill.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const handleAddSkill = AsyncHandler(async (req, res, _) => {
  const { name, efficiency } = req.body;

  if (!name || !efficiency) {
    return res.status(400).json({
      success: false,
      message: "Please fill the necessary details",
    });
  }

  let owner = new mongoose.Types.ObjectId(req.admin._id);

  await skillSchema.create({ owner, name, efficiency });

  return res.status(200).json({
    success: true,
    message: "Skill added successfully!",
  });
});

const handleDeleteSkill = AsyncHandler(async (req, res, _) => {
  let skillId = req.headers?._id;

  if (!skillId) {
    return res.status(400).json({
      success: false,
      message: "Please choose a valid skill",
    });
  }

  await skillSchema.findByIdAndDelete(skillId);

  return res.status(200).json({
    success: true,
    message: "Skill deleted successfully!",
  });
});

const handleUpdateSkill = AsyncHandler(async (req, res, _) => {
  let skillId = req.headers?._id;
  const { efficiency } = req.body;

  if (!efficiency) {
    return res.status(400).json({
      success: false,
      message: 'Please add efficiency'
    })
  }

  if (!skillId) {
    return res.status(400).json({
      success: false,
      message: "Please choose a valid skill",
    });
  }

  let skill = await skillSchema.findById(skillId);

  skill.efficiency = efficiency;

  skill.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Skill updated successfully!",
  });
})

const handleGetSkill = AsyncHandler(async (req, res, _) => {
  let adminId = req.params?.adminId;

  if (!adminId) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid user",
    });
  }

  let skills = await skillSchema
    .find({ owner: adminId })
    .select("image name efficiency createdAt");

  return res.status(200).json({
    success: true,
    message: "Skills fetched successfully",
    data: skills,
  });
});

export { handleAddSkill, handleDeleteSkill, handleGetSkill, handleUpdateSkill };
