import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  post: {
    type: String,
    ref: "Post",
  },
  parentComment: { type: String, ref: "Comment" },
  createdAt: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
