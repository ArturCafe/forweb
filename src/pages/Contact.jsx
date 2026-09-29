import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setLoading(true);
    setSent(false);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          project: formData.get("project"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send message");
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">CONTACT</span>
          <h1>Let's create something meaningful.</h1>
          <p>Tell us about your project, idea or space.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Start the conversation.</h2>
            <p className="lead">
              We work with private clients, brands and collaborators on projects
              of different scales.
            </p>
            <div>
              <MapPin /> Chisinau, Moldova
            </div>
            <div>
              <Mail /> hello@artcore.studio
            </div>
            <div>
              <Phone /> +373 00 000 000
            </div>
          </div>
          <form onSubmit={submit}>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" required type="email" placeholder="you@email.com" />
            </label>
            <label>
              Project
              <textarea
                name="project"
                required
                rows="6"
                placeholder="Tell us a little about your project"
              />
            </label>
            <button className="btn" disabled={loading}>{loading ? "Sending..." : "Send message"}</button>
            {sent && <p className="success">Thank you! Your message was sent successfully.</p>}
            {error && <p className="success">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
