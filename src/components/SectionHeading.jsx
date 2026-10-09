export default function SectionHeading({ eyebrow, title, center = false, children }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h2">{title}</h2>
      </div>
      {children}
    </div>
  );
}
