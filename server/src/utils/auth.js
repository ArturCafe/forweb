import jwt from "jsonwebtoken";

// Рекомендуется хранить секретный ключ и время жизни в файле .env
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key_123";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // Токен сгорит через 7 дней

/**
 * Генерирует JWT токен для пользователя
 * @param {Object} user - Объект пользователя из базы данных Mongoose
 * @returns {String} JWT токен
 */
export const createToken = (user) => {
  // В полезную нагрузку (payload) кладём только безопасные и важные данные
  const payload = {
    id: user._id || user.id,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
