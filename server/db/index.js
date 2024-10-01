import mongoose from "mongoose";
import { DB_NAME, _envValue as env } from "../constants.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const connectDB = AsyncHandler(async () => {
  await mongoose.connect(`${env.MONGODB_URI}/${DB_NAME}`);
});

export default connectDB;
