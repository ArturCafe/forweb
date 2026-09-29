import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ArrowLeft,
  ArrowRight,
  Instagram,
  Facebook,
  Rss,
  User,
  LogOut,
} from "lucide-react";
import useAuth from "../hooks/useAuth"; // Подключите ваш хук (укажите правильный путь)

const links = [
  ["/", "Principala"],

  ["/blog", "Blog"],

  ["/archives", "Archives"],
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  // Получаем реактивные данные и метод выхода прямо из хука useAuth
  const { user, logout } = useAuth();

  return (
    <>
      <header className="header">
        <div className="top">
          <Link className="brand" to="/">
            <strong>
              <i>Art</i>Jurnal
            </strong>
            <span>Regiunea Start</span>
          </Link>
          <div className="social">
            {/* Авторизационный блок стал чище */}
            <div className="auth-nav">
              {user ? (
                <>
                  <button className="logout-btn" onClick={logout}>
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <Link className="login-link" to="/login">
                  <User size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="nav">
          <button
            className="icon-btn"
            onClick={() => setSearch(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <div className="arrows">
            <button>
              <ArrowLeft size={18} />
            </button>
            <button>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Авторизационный блок стал чище */}
          <div className="auth-nav">
            {user ? (
              <>
                <span className="user-name">
                  <User size={16} /> {user.name}
                </span>
              </>
            ) : (
              <Link className="login-link" to="/login">
                <User size={16} /> Login
              </Link>
            )}
          </div>

          <button className="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
          <nav className={open ? "open" : ""}>
            {links.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {search && (
        <div className="search-overlay">
          <button onClick={() => setSearch(false)}>
            <X />
          </button>
          <div>
            <p>SEARCH THE STUDIO</p>
            <input
              autoFocus
              placeholder="Type keywords and press Enter"
              onKeyDown={(e) => e.key === "Enter" && setSearch(false)}
            />
          </div>
        </div>
      )}

      <main>{children}</main>

      <footer>
        <div>
          <Link className="brand footer-brand" to="/">
            <strong>
              <i>Art</i>Core
            </strong>
            <span>Architecture & creative studio</span>
          </Link>
          <p>
            Creating spaces with character, clarity and a lasting connection to
            people and place.
          </p>
        </div>
        <div>
          <h4>Navigate</h4>
          {links.slice(0, 5).map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            hello@artcore.studio
            <br />
            +373 00 000 000
            <br />
            Chisinau, Moldova
          </p>
        </div>
      </footer>
      <div className="copyright">
        © {new Date().getFullYear()} ArtCore. Modern React edition.
      </div>
    </>
  );
}
