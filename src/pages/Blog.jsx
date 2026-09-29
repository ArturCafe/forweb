import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { posts as localPosts } from "../data/content";
import postsService from "../services/post/post.service";

export default function Blog() {
  const [serverPosts, setServerPosts] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = postsService.posts$.subscribe((posts) => {
      setServerPosts(posts);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    postsService
      .getPosts({
        page: currentPage,
        limit: 5,
      })
      .subscribe({
        next: (data) => {
          console.log("Posts primite:", data);

          /*
          Presupunem că backend-ul returnează:

          {
            posts: [...],
            pagination: {
              currentPage,
              totalPages,
              hasNextPage,
              hasPrevPage
            }
          }
        */

          setPagination(/*data.*/ pagination);
          setLoading(false);
        },

        error: (error) => {
          console.log("Server picat, se vor folosi datele locale", error);

          setServerPosts(null);
          setPagination(null);
          setLoading(false);
        },
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const postsToShow =
    serverPosts && serverPosts.length > 0 ? serverPosts : localPosts;

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
          {loading && <p>Se încarcă...</p>}

          <div className="blog-grid">
            {postsToShow.map(
              ({
                _id,
                processedAt,
                originalName,
                sourceFolder,
                currentPath,
              }) => (
                <article className="post-card" key={_id || originalName}>
                  <Link
                    to={`/blog/${_id || ""}`}
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <img
                      src={`http://localhost:5000/videos/${currentPath}`}
                      alt={originalName || ""}
                      loading="lazy"
                    />
                  </Link>

                  <div className="post-content">
                    <time dateTime={processedAt || ""}>
                      <h3>creat</h3>
                      {processedAt || ""}
                    </time>

                    <h3>
                      <Link to={`/blog/${_id || ""}`}>{originalName}</Link>
                    </h3>

                    <Link className="text-link" to={`/blog/${_id || ""}`}>
                      Read more{" "}
                      <span className="sr-only">about {originalName}</span>
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>

          {pagination && (
            <div
              className="pagination-controls"
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                alignItems: "center",
              }}
            >
              <button
                onClick={handlePrevPage}
                disabled={!pagination.hasPrevPage || loading}
                className="pag-btn"
              >
                <ChevronLeft size={16} />
                Înapoi
              </button>

              <span>
                Pagina {pagination.currentPage} din {pagination.totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={!pagination.hasNextPage || loading}
                className="pag-btn"
              >
                Înainte
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
