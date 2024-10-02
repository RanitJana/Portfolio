import AsyncHandler from "../utils/AsyncHandler.js";
import adminSchema from "../models/admin.model.js";
import { cookieOptions } from "../constants.js";
import jwt from "jsonwebtoken";
import { _envValue } from "../constants.js";

const handleLogin = AsyncHandler(async (req, res, _) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the required credentials.",
    });
  }

  let admin = await adminSchema.findOne({
    $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
  });

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "User does not exist with this phone number or email",
    });
  }

  if (!(await admin.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  }

  let accessToken = await admin.generateAccessToken();
  let refreshToken = await admin.generateRefreshToken();

  admin.refreshToken = refreshToken;

  admin.save();

  return (
    res
      .cookie("accessToken", accessToken, cookieOptions)
      // .cookie("id", JSON.stringify({ id: admin._id }), cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        id: admin._id,
      })
  );
});

const handleSignUp = AsyncHandler(async (req, res, _) => {
  const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

  if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All credntials must be filled",
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password did not match",
    });
  }

  let admin = await adminSchema.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (admin) {
    return res.status(400).json({
      success: false,
      message: "User already exist with this phone number or email",
    });
  }

  await adminSchema.create({ fullName, email, phoneNumber, password });

  return res.status(200).json({
    success: true,
    message: "User registered!",
  });
});

const handleVerify = AsyncHandler(async (req, res, _) => {
  let accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  let adminId = jwt.verify(accessToken, _envValue.ACCESS_TOKEN_SECRET)?._id;

  if (!adminId) {
    return res.status(401).json({
      success: false,
      message: "Please login through portal",
    });
  }

  let admin = await adminSchema.findById(adminId);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Please register yourself!",
    });
  }

  const headerId = req.headers?.id;

  if (!headerId) {
    return res.status(401).json({
      success: false,
      message: "Please login through portal",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Welcome!",
  });
});

const handleLogOut = AsyncHandler(async (req, res, _) => {
  await req.admin.updateOne({ $unset: { refreshToken: "" } });

  return res.clearCookie("accessToken", cookieOptions).status(200).json({
    success: true,
    message: "Successfully logged out!",
  });
});

export { handleLogin, handleSignUp, handleLogOut, handleVerify };
