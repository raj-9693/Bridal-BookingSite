export default function PageHero({ eyebrow, title, text, center = false, children }) {
  return (
    <section className={`page-hero ${center ? "center" : ""}`}>
      <div className="container">
        <p className="eyebrow line">{eyebrow}</p>
        <h1 className="h1">{title}</h1>
        {text && <p className="lead">{text}</p>}
        {children}
      </div>
    </section>
  );
}
