import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s1 from "../assets/images/slide1.jpg";
import s2 from "../assets/images/slide2.jpg";
import s3 from "../assets/images/slide3.jpg";
const slides = [
  {
    image: s1,
    title: "Earth New House Project",
    text: "Spaces shaped by material, light and the landscape around them.",
  },
  {
    image: s2,
    title: "Hotel and Residence Concept",
    text: "Fresh ideas for contemporary hospitality and urban living.",
  },
  {
    image: s3,
    title: "Natural 3D Architecture Design",
    text: "Calm, clean architecture with a human point of view.",
  },
];
export default function Hero() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const s = slides[n];
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(22,31,35,.72),rgba(22,31,35,.28)),url(${s.image})`,
      }}
    >
      <div className="hero-content">
        <span className="eyebrow">ARTCORE STUDIO</span>
        <h1>{s.title}</h1>
        <p>{s.text}</p>
        <Link className="btn light" to="/projects">
          View Projects
        </Link>
      </div>
      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === n ? "active" : ""}
            onClick={() => setN(i)}
          />
        ))}
      </div>
    </section>
  );
}
