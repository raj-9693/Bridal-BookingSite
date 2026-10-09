import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

// tone="dark" -> maroon box (Reviews page). Default "light" -> sand box.
export default function CtaSection({
  eyebrow = "Your Saanjh begins here",
  title = "Let’s make space for\nyour most beautiful day.",
  text = "Our 2025–26 bridal calendar is open. Share your celebrations and we will create a personal beauty plan.",
  button = "Enquire for your date",
  to = "/booking",
  tone = "light",
}) {
  const dark = tone === "dark";
  return (
    <section className="cta-wrap">
      <div className="container">
        <Reveal className={`cta ${dark ? "cta-dark" : ""}`}>
          <p className={`eyebrow ${dark ? "" : "dark"}`}>{eyebrow}</p>
          <h2 className="cta-title">{title}</h2>
          <p className="cta-text">{text}</p>
          <Link to={to} className={`btn ${dark ? "btn-light" : "btn-primary"}`}>
            {button} <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
