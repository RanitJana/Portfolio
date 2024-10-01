import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    sender: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

export default Message;
