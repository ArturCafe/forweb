import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "../components/Pagination";
import postsService from "../services/post/post.service";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const postsPerPage = 6;

  // 1. РЕАКТИВНЫЕ ПОДПИСКИ (Слушаем глобальное состояние)
  useEffect(() => {
    const subPosts = postsService.posts$.subscribe(setPosts);
    const subPag = postsService.pagination$.subscribe(setPagination);
    const subLoad = postsService.loading$.subscribe(setLoading);

    return () => {
      subPosts.unsubscribe();
      subPag.unsubscribe();
      subLoad.unsubscribe();
    };
  }, []);

  // 2. ДЕЙСТВИЕ: Запрашиваем данные у сервиса при смене страницы
  useEffect(() => {
    // Нам не нужно обрабатывать .subscribe(next, error) прямо здесь!
    // Сервер ответит, сработает .tap() внутри сервиса, и наши подписки выше сами изменят стейт.
    const sub = postsService
      .getPosts({ page: currentPage, limit: postsPerPage })
      .subscribe();
    return () => sub.unsubscribe();
  }, [currentPage]);

  // 3. СМУТ-СКРОЛЛ
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">THE JOURNAL</span>
          <h1>Sectie in proces tehnic.</h1>
        </div>
      </section>

      <section aria-label="Blog">
        <div className="container">
          {loading && <p style={{ textAlign: "center" }}>Se încarcă...</p>}
          <div className="blog-grid">
            {posts.map(({ _id, processedAt, originalName, currentPath }) => (
              <article className="post-card" key={_id}>
                <Link to={`/blog/${_id}`} tabIndex="-1" aria-hidden="true">
                  <img
                    src={`http://localhost:5000/videos/${currentPath}`}
                    alt={originalName}
                    loading="lazy"
                  />
                </Link>
                <div className="post-content">
                  <time dateTime={processedAt}>
                    <h3>creat</h3>
                    {processedAt}
                  </time>
                  <h3>
                    <Link to={`/blog/${_id}`}>{originalName}</Link>
                  </h3>
                  <Link className="text-link" to={`/blog/${_id}`}>
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {pagination.totalPages > 1 && (
            <div
              className="pagination-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "40px",
                gap: "15px",
              }}
            >
              {/* Цифровая пагинация из скриншота */}
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.totalPages}
                  hasPrevPage={pagination.hasPrevPage}
                  hasNextPage={pagination.hasNextPage}
                  loading={loading}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </div>
          )}{" "}
          {/* <-- Скобки закрывают условие логического "И" (&&) */}
        </div>
      </section>
    </>
  );
}
