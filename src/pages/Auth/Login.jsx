import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, LogIn } from "lucide-react";
import useAuth from "../../hooks/useAuth";
//import { login } from "../../services/auth/auth.service";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { login, loading, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();

    login(form).subscribe({
      next: () => {
        navigate("/");
      },

      error: () => {
        // Eroarea este deja transmisă prin useAuth()
      },
    });
  };

  /*
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "admin@artcore.studio",
    password: "password123",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("artcore_token", data.token);
      localStorage.setItem("artcore_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
*/
  return (
    <section className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginIcon}>
          <LockKeyhole size={28} />
        </div>

        <p className={styles.eyebrow}>MEMBERS AREA</p>

        <h1 className={styles.title}>Welcome back</h1>

        <p className={styles.subtitle}>
          Sign in to access your ArtCore account.
        </p>

        <form onSubmit={submit} className={styles.loginForm}>
          <label className={styles.label}>
            Email
            <div className={styles.inputWithIcon}>
              <Mail size={18} />

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
          </label>

          <label className={styles.label}>
            Password
            <div className={styles.inputWithIcon}>
              <LockKeyhole size={18} />

              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
          </label>

          {error && <p className={styles.loginError}>{error}</p>}

          <button className={styles.loginSubmit} disabled={loading}>
            <LogIn size={18} />

            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className={styles.registerLink}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </section>
  );
}
