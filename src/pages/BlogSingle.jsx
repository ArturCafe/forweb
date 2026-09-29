import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { posts } from "../data/content";

import postsService from "../services/post/post.service";

export default function BlogSingle() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const subscription = postsService.posts$.subscribe((posts) => {
      const foundPost = posts.find((item) => item._id === id);

      if (foundPost) {
        setPost(foundPost);
      }
    });

    return () => subscription.unsubscribe();
  }, [id]);

  console.log("ID:", id);
  console.log("Post:", post);

  return (
    <article className="article">
      <header>
        <span className="eyebrow dark">JOURNAL · </span>
        <h1></h1>
        <p className="lead">
          Good design does not need to shout. It can guide the way we move, rest
          and experience the world around us.
        </p>
      </header>
      <img
        className="article-image"
        src={`http://localhost:5000/videos/${post?.currentPath}`}
        alt={post?.originalName}
      />
      <div className="article-body">
        <p>
          That principle applies equally to a small interior and a large public
          building. Good design is ultimately a framework for experience.
        </p>
        <Link className="text-link" to="/blog">
          <ArrowLeft size={17} /> Back to journal
        </Link>
      </div>
    </article>
  );
}
