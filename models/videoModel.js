import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.video || mongoose.model("video", videoSchema);
export default Dataset;
