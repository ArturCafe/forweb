export default function Section({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        {eyebrow && <span className="eyebrow dark">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
