import adminSchema from "../models/admin.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const handleUpdatePassword = AsyncHandler(async (req, res, _) => {
  const { currentPassword, password, confirmPassword } = req.body;

  if (!currentPassword || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All input fields must be filled",
    });
  }

  if (password != confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password did not match",
    });
  }

  let admin = req.admin;

  if (!(await admin.matchPassword(currentPassword))) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password",
    });
  }

  admin.password = password;
  admin.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

const handleForgetPassword = AsyncHandler(async (req, res, _) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields must be filled",
    });
  }

  if (password != confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password did not match",
    });
  }

  let email = req.cookies?.eid;

  if (!email) {
    return res.status(401).json({
      success: false,
      message: "Please try again",
    });
  }

  let admin = await adminSchema.findOne({ email });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "User does not exist with this email",
    });
  }

  admin.password = password;

  await admin.save({ validateBeforeSave: false });

  return res.status(200).clearCookie("eid").json({
    success: true,
    message: "Password changed successfully",
  });
});

export { handleUpdatePassword, handleForgetPassword };
