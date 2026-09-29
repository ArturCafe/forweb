import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Section from "../components/Section";

import { posts as localPosts } from "../data/content";
import postsService from "../services/post/post.service";

export default function Folder() {
  const [serverPosts, setServerPosts] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const subscription = postsService.getPostsid(id).subscribe({
      next: (data) => {
        console.log("POSTS:", data.posts);

        setServerPosts(data.posts);
      },

      error: (error) => {
        console.error("Eroare:", error);
        setServerPosts([]);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

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

      <section aria-label="Блог">
        <div className="container">
          <div className="blog-grid">
            {postsToShow.map(
              ({
                _id,
                currentPath,
                processedAt,
                originalName,
                sourceFolder,
              }) => {
                return (
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
                );
              },
            )}
          </div>
        </div>
      </section>
    </>
  );
}
