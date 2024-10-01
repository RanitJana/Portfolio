import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
      required: true,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
      default: "",
    },
    link: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

export default Project;
