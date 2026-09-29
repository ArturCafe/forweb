import Folder from "../model/folder.js";
import Veb from "../model/veb.js"; // Importă schema Mongoose pentru Postări

export const getVeb = async (req, res) => {
  try {
    // Preluăm parametrii din query URL (ex: /api/posts?page=2&limit=6)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    // Calculăm indexul de unde începem extragerea
    const startIndex = (page - 1) * limit;

    // Numărăm totalul de documente din bază pentru a ști câte pagini vor fi în total
    const totalPosts = await Veb.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit) || 1;

    // Extragem doar postările destinate paginii curente
    const posts = await Veb.find()
      .sort({ processedAt: -1 }) // Cele mai recente primele
      .skip(startIndex)
      .limit(limit);

    // Returnăm structura completă pe care o va citi Frontend-ul
    return res.status(200).json({
      status: "ok",
      posts: posts,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        totalPosts: totalPosts,
      },
    });
  } catch (error) {
    console.error("Eroare în controller-ul getPosts:", error);
    return res.status(500).json({
      success: false,
      message: "Eroare internă de server la încărcarea postărilor.",
    });
  }
};

export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find().sort({ processedAt: -1 }).limit(15);

    return res.status(200).json({
      status: "ok",
      folders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Eroare internă de server la încărcarea folderelor.",
    });
  }
};

export const getFoldersposts = async (req, res) => {
  const { id } = req.params;

  const posts = await Veb.find({ folderId: id });

  res.json({
    status: "ok",
    posts,
  });
};
//////////////////////////////////////////////////////////////////////
export const getPostsPaginate = async (req, res) => {
  try {
    // 1. Получаем номер страницы из query параметров (например: /api/posts?page=1)
    // По умолчанию ставим 1 страницу, если параметр не передан
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // Выдаем строго по 20 постов

    // Вычисляем, сколько постов нужно пропустить (отступ)
    // Страница 1: (1 - 1) * 20 = 0 пропустить
    // Страница 2: (2 - 1) * 20 = 20 пропустить
    const skip = (page - 1) * limit;

    // 2. Считаем ВСЕ посты, которые есть в базе данных
    const totalPosts = await Post.countDocuments();

    // 3. Загружаем нужную порцию (20 штук) с сортировкой от новых к старым
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Вычисляем общее количество страниц, чтобы фронтенд знал, когда остановиться
    const totalPages = Math.ceil(totalPosts / limit);

    // 4. Возвращаем объект со всеми метаданными для RxJS
    return res.status(200).json({
      success: true,
      data: posts, // Сами 20 постов
      pagination: {
        totalItems: totalPosts, // Сколько всего постов в базе
        currentPage: page, // Текущая страница
        totalPages: totalPages, // Всего страниц по 20 штук
        hasNextPage: page < totalPages, // Есть ли следующая страница (флаг +)
        hasPrevPage: page > 1, // Есть ли предыдущая страница (флаг -)
      },
    });
  } catch (error) {
    console.error("Eroare în controller-ul getPosts:", error);
    return res.status(500).json({
      success: false,
      message: "Eroare internă de server la încărcarea postărilor.",
    });
  }
};
