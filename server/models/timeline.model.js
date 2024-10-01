import { Schema, model } from "mongoose";

const timelineShema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Timeline = model("Timeline", timelineShema);

export default Timeline;
