import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>This page wandered off.</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link className="btn" to="/">
        Back home
      </Link>
    </section>
  );
}
