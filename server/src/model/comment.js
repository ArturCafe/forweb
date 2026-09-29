import mongoose from "mongoose";

// Схема для ответов на комментарии (Reply)
const replySchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true },
    // ИСПРАВЛЕНО: Добавлен корректный URL-заглушка с размерами
    authorAvatar: { type: String, default: "https://placehold.co" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Главная схема комментария
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Связь с моделью постов блога
      required: true,
    },
    authorName: { type: String, required: true },
    // ИСПРАВЛЕНО: Добавлен корректный URL-заглушка с размерами
    authorAvatar: { type: String, default: "https://placehold.co" },
    content: { type: String, required: true },
    replies: [replySchema], // Массив вложенных ответов на этот комментарий
  },
  { timestamps: true } // Автоматически создаст поля createdAt и updatedAt для даты
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
