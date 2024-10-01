import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { _envValue as env } from "./constants.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

const WHITELISTED_URI = env.WHITELISTED_URI?.split(",");

app.use(
  cors({
    origin: WHITELISTED_URI,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    messgae: "Home route hit!",
  });
});

import login from "./routes/login.route.js";
import logout from "./routes/logout.route.js";
import signup from "./routes/signup.route.js";
import profile from "./routes/profile.route.js";
import password from "./routes/password.route.js";
import message from "./routes/message.route.js";
import project from "./routes/project.route.js";
import skill from "./routes/skill.route.js";
import timeline from "./routes/timeline.route.js";
import verify from "./routes/verify.route.js";

app.use("/api/v1/login", login);
app.use("/api/v1/logout", logout);
app.use("/api/v1/signup", signup);
app.use("/api/v1/profile", profile);
app.use("/api/v1/password", password);
app.use("/api/v1/message", message);
app.use("/api/v1/project", project);
app.use("/api/v1/skill", skill);
app.use("/api/v1/timeline", timeline);
app.use("/api/v1/verify", verify);

export default app;
