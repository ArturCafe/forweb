import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, UserPlus, User } from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();

  const { register, loading, error } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();

    register(form).subscribe({
      next: () => {
        navigate("/");
      },

      error: () => {
        // Eroarea este deja transmisă prin useAuth()
      },
    });
  };

  return (
    <section className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginIcon}>
          <UserPlus size={28} />
        </div>

        <p className={styles.eyebrow}>MEMBERS AREA</p>

        <h1 className={styles.title}>Create account</h1>

        <p className={styles.subtitle}>
          Register to create your ArtCore account.
        </p>

        <form onSubmit={submit} className={styles.loginForm}>
          <label className={styles.label}>
            Name
            <div className={styles.inputWithIcon}>
              <User size={18} />

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
          </label>

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
                minLength={6}
              />
            </div>
          </label>

          {error && <p className={styles.loginError}>{error}</p>}

          <button
            type="submit"
            className={styles.loginSubmit}
            disabled={loading}
          >
            <UserPlus size={18} />

            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className={styles.registerLink}>
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
}
