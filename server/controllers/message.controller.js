import mongoose from "mongoose";
import messageSchema from "../models/message.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const handleSendMessage = AsyncHandler(async (req, res, _) => {
  const { sender, content } = req.body;

  if (!sender || !content) {
    return res.status(400).json({
      success: false,
      message: "Please fill in the fields",
    });
  }

  let receiver = req.params?.adminId;

  if (!receiver) {
    return res.status(403).json({
      success: false,
      message: "Please visit a valid portfolio!",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(receiver)) {
    return res.status(400).json({
      success: false,
      message: "Invalid receiver ID",
    });
  }

  receiver = new mongoose.Types.ObjectId(receiver);

  await messageSchema.create({ receiver, sender, content });

  return res.status(200).json({
    success: true,
    message: "Message sent successfully!",
  });
});

const handleGetMessage = AsyncHandler(async (req, res, _) => {
  let messages = await messageSchema
    .find({ receiver: req.admin._id })
    .sort({ createdAt: -1 })
    .select("sender content createdAt"); //new method for me

  return res.status(200).json({
    success: true,
    message: "Message received successfully!",
    data: messages,
  });
});

const handleDeleteMessage = AsyncHandler(async (req, res, _) => {
  //id must be add into header as key _id
  let messageId = req.headers?._id;

  if (!messageId) {
    return res.status(401).json({
      success: false,
      message: "Please select a valid message",
    });
  }

  await messageSchema.findOneAndDelete({ _id: messageId });

  return res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});

export { handleSendMessage, handleGetMessage, handleDeleteMessage };
