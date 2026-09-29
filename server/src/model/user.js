import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Имя обязательно"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email обязателен"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Пожалуйста, введите корректный email"],
    },
    password: {
      type: String,
      required: [true, "Пароль обязателен"],
      minlength: [6, "Минимальная длина пароля — 6 символов"],
    },
  },
  {
    timestamps: true, // Автоматически создаст поля createdAt и updatedAt
  }
);

// Хеширование пароля перед сохранением (опционально, если не делаете это в контроллере)
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("User", userSchema);

export default User;
