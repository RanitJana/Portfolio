import crypto from "crypto";
import AsyncHandler from "../utils/AsyncHandler.js";
import otpSchema from "../models/otp.model.js";
import adminSchema from "../models/admin.model.js";
import sendMail from "../utils/Mail.js";

const handleSendOTP = AsyncHandler(async (req, res, _) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email",
    });
  }

  let admin = await adminSchema.findOne({ email });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "No user is found with this email",
    });
  }

  let newOtp = crypto.randomInt(100000, 999999);

  let otpDoc = await otpSchema.create({ email, otp: newOtp });

  await sendMail(email, newOtp);

  return res.status(200).cookie("pid", otpDoc._id).json({
    success: true,
    message: "Otp has been sent successfully",
  });
});

const handleVerifyOTP = AsyncHandler(async (req, res, _) => {
  let pid = req.cookies?.pid;
  let { otp } = req.body;

  if (!pid) {
    return res.status(401).json({
      success: false,
      message: "Please try again",
    });
  }

  if (!otp) {
    return res.status(401).json({
      success: false,
      message: "Please Enter your OTP",
    });
  }

  let otpDoc = await otpSchema.findById(pid);

  if (!otpDoc) {
    return res.status(401).json({
      success: false,
      message: "Please try again",
    });
  }

  if (otpDoc.otp != otp) {
    return res.status(400).json({
      success: false,
      message: "Incorrect OTP",
    });
  }

  await otpDoc.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Verified",
  });
});

export { handleSendOTP, handleVerifyOTP };
