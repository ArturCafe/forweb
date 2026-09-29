import mongoose from "mongoose";
// ИСПРАВЛЕНО: Импортируем схему комментариев, чтобы Mongoose знал её структуру
import { commentSchema } from "./comment.js";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    comments: [commentSchema], // Теперь это работает без ошибок!
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
