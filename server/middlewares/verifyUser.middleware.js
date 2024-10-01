import AsyncHandler from "../utils/AsyncHandler.js";
import adminSchema from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { _envValue as env } from "../constants.js";

const verifyUser = AsyncHandler(async (req, res, next) => {
  let accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  let adminId = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)?._id;

  if (!adminId) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  let admin = await adminSchema.findById(adminId);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Please Signup first",
    });
  }

  req.admin = admin;

  return next();
});

export default verifyUser;
