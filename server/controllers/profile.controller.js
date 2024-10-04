import AsyncHandler from "../utils/AsyncHandler.js";
import adminSchema from "../models/admin.model.js";
import uploadImage from "../utils/cloudinary.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import { _envValue } from "../constants.js";

const handleUpdateProfile = AsyncHandler(async (req, res, _) => {
  const {
    fullName,
    email,
    phoneNumber,
    headline,
    aboutMe,
    portfolio,
    linkedin,
    github,
    instagram,
    twitter,
    facebook,
  } = req.body;

  if (!fullName || !email || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "At least required fields must be filled!",
    });
  }

  let anotherAdmin = await adminSchema.findOne({
    _id: { $ne: req.admin._id },
    $or: [{ email }, { phoneNumber }],
  });

  if (anotherAdmin) {
    return res.status(400).json({
      success: false,
      message: "Given email or phone number already registered",
    });
  }

  let admin = req.admin;
  if (req.file) {
    let avatar = (await uploadImage(req.file.path, req.file.filename))
      .secure_url;
    admin.avatar = avatar;

    fs.unlinkSync(`${req.file.path}`);
  }

  headline = await JSON.parse(headline);

  admin.fullName = fullName;
  admin.email = email;
  admin.phoneNumber = phoneNumber;
  if (aboutMe) admin.aboutMe = aboutMe.length ? aboutMe : "This is my about!";
  if (headline) admin.headline = headline.length ? headline : ["Coding My Future", "Unlocking My Potential"];
  if (portfolio) admin.portfolio = portfolio;
  if (linkedin) admin.linkedin = linkedin;
  if (github) admin.github = github;
  if (instagram) admin.instagram = instagram;
  if (twitter) admin.twitter = twitter;
  if (facebook) admin.facebook = facebook;

  admin.save({ validateBeforeSave: false }); //for password only we have to pass the object

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully!",
  });
});

const handleGetProfile = AsyncHandler(async (req, res, _) => {
  let accessToken = req.cookies?.accessToken;
  let cookieId = null;

  if (accessToken) {
    cookieId = jwt.verify(accessToken, _envValue.ACCESS_TOKEN_SECRET)?._id;
  }

  let adminId = req.params?.adminId;

  if (!adminId && !cookieId) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid user",
    });
  }
  let id = adminId || cookieId;

  let admin = await adminSchema.findById(id);

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user.",
    });
  }

  const { password, refreshToken, createdAt, updatedAt, _id, __v, ...rest } =
    admin;

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    admin: rest._doc,
  });
});

export { handleUpdateProfile, handleGetProfile };
