import { Schema, model } from "mongoose";

const skillSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    efficiency: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = model("Skill", skillSchema);
export default Skill;
