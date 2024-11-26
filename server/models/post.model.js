import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    media: {
      type: String,
    },
    public_id: {
      type: String,
    },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
