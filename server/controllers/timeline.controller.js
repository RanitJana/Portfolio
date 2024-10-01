import timelineSchema from "../models/timeline.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const handleAddTimeline = AsyncHandler(async (req, res, _) => {
  const { title, description, from, to } = req.body;

  if (!title || !description || !from || !to) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the details",
    });
  }

  await timelineSchema.create({
    owner: req.admin._id,
    title,
    description,
    from,
    to,
  });

  return res.status(200).json({
    success: true,
    message: "Timeline added successfully!",
  });
});

const handleUpdateTimeline = AsyncHandler(async (req, res, _) => {
  //_id is in headers
  let timelineId = req.headers?._id;

  if (!timelineId) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid timeline",
    });
  }

  const { title, description, from, to } = req.body;

  if (!title || !description || !from || !to) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the details",
    });
  }

  await timelineSchema.findByIdAndUpdate(timelineId, {
    title,
    description,
    from,
    to,
  });

  return res.status(200).json({
    success: false,
    message: "Timeline updated successfully!",
  });
});
const handleDeleteTimeline = AsyncHandler(async (req, res, _) => {
  let timelineId = req.headers?._id;

  if (!timelineId) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid timeline",
    });
  }

  await timelineSchema.findByIdAndDelete(timelineId);

  return res.status(200).json({
    success: true,
    message: "Timeline deleted successfully!",
  });
});

const handleGetTimeline = AsyncHandler(async (req, res, _) => {
  let adminId = req.params.adminId;

  if (!adminId) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid uesr",
    });
  }

  let timelines = await timelineSchema
    .find({ owner: adminId })
    .select("title description from to");

  return res.status(200).json({
    success: true,
    message: "Timeline fetched successfully",
    data: timelines,
  });
});

export {
  handleAddTimeline,
  handleDeleteTimeline,
  handleGetTimeline,
  handleUpdateTimeline,
};
