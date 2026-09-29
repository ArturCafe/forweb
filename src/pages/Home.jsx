import { Link } from "react-router-dom";
import { ArrowRight, Compass, PenTool, Building2 } from "lucide-react";
import Hero from "../components/Hero";
import Section from "../components/Section";
import { projects, posts } from "../data/content";
export default function Home() {
  return (
    <>
      <Hero />
      <Section
        eyebrow="WHAT WE DO"
        title="Architecture with a clear point of view"
      >
        <div className="intro-grid">
          <p className="lead">
            We design places that feel considered from every angle. Our work
            moves between architecture, interiors and visual concepts.
          </p>
          <p>
            ArtCore combines strong ideas with practical thinking. Every project
            starts with context and ends with a space made for real life.
          </p>
          <Link className="text-link" to="/services">
            Explore our services <ArrowRight size={17} />
          </Link>
        </div>
      </Section>
      <section className="feature-strip">
        <div>
          <Compass />
          <h3>Research</h3>
          <p>Understanding place before drawing.</p>
        </div>
        <div>
          <PenTool />
          <h3>Design</h3>
          <p>Ideas translated into strong forms.</p>
        </div>
        <div>
          <Building2 />
          <h3>Build</h3>
          <p>Detail and execution through every stage.</p>
        </div>
      </section>
      <Section eyebrow="SELECTED WORK" title="Recent projects">
        <div className="project-grid home-grid">
          {projects.slice(0, 6).map((p) => (
            <Link to={`/projects/${p.id}`} className="project-card" key={p.id}>
              <img src={p.image} />
              <div>
                <span>{p.category}</span>
                <h3>{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="center">
          <Link className="btn" to="/projects">
            All projects
          </Link>
        </div>
      </Section>
      <Section
        eyebrow="FROM THE JOURNAL"
        title="Ideas, materials and places"
        className="muted"
      >
        <div className="post-grid">
          {posts.slice(0, 3).map((p) => (
            <article className="post-card" key={p.id}>
              <img src={p.image} />
              <div>
                <small>{p.date}</small>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <Link className="text-link" to={`/blog/${p.id}`}>
                  Read article <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
