import { Schema, model } from "mongoose";
import { _envValue as env } from "../constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: "",
    },
    resume: {
      type: String,
      trim: true,
      default: "",
    },
    roles: {
      type: Array,
      default: ["Coding My Future", "Unlocking My Potential"],
    },
    headline: {
      type: String,
      default:
        "Starting my coding journey can be both exciting and overwhelming, but I don't need to worry—every great developer began where I am now. The key is to take one step at a time, learning the fundamentals and building a strong foundation. Whether I'm writing my first 'Hello, World!' or exploring new languages, I know that persistence and curiosity will be my greatest allies. Each new line of code brings me closer to creating something amazing, and with dedication, I'll be surprised at how quickly I can grow.",
    },
    aboutMe: {
      type: String,
      default:
        "I prefer to remain unknown, just another face in the crowd. It’s not that I have secrets to hide, but I find comfort in my anonymity. My name doesn't matter, and I’m fine with that—it allows me to move through life quietly, without the weight of expectations. People often look for labels, for ways to define others, but I'd rather let my actions speak for themselves. You don’t need to know who I am to understand what I stand for.",
    },
    portfolio: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    github: {
      type: String,
      trim: true,
      default: "",
    },
    instagram: {
      type: String,
      trim: true,
      default: "",
    },
    twitter: {
      type: String,
      trim: true,
      default: "",
    },
    youtube: {
      type: String,
      trim: true,
      default: "",
    },
    facebook: {
      type: String,
      trim: true,
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXP,
    }
  );
};

adminSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      phoneNumber: this.phoneNumber,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXP,
    }
  );
};

adminSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

const Admin = model("Admin", adminSchema);

export default Admin;
