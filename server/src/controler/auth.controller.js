import bcrypt from "bcryptjs";
import User from "../model/user.js";
import { createToken } from "../utils/auth.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 1. Поиск пользователя в MongoDB по email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 2. Проверка хеша пароля
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Создание токена
    const token = createToken(user);

    // 4. Успешный ответ (используем user._id вместо user.id)
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const ALLOWED_REGISTER_NAMES = ["admin", "operator", "camera", "artcore"];

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }
    if (!ALLOWED_REGISTER_NAMES.includes(name.trim().toLowerCase())) {
      return res.status(400).json({
        message: "Error",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Проверка существования пользователя в базе данных
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // 2. Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Создание и сохранение нового документа в MongoDB
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // 4. Создание токена
    const token = createToken(newUser);

    // 5. Успешный ответ
    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
