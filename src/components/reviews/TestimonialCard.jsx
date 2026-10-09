import Reveal from "../Reveal.jsx";
import Photo from "../Photo.jsx";
import Stars from "./Stars.jsx";

// image ho to photo-card, nahi to alternate (plain / blush) card
export default function TestimonialCard({ t, index }) {
  const photo = Boolean(t.image);
  const tint = !photo && index % 2 === 1;
  return (
    <Reveal delay={(index % 3) * 90} className={`tcard ${photo ? "photo" : ""} ${tint ? "tint" : ""}`}>
      {photo && (
        <div className="tcard-img"><Photo src={t.image} alt={t.name} hue={14 + index * 12} /></div>
      )}
      <div className="tcard-body">
        {!photo && <span className="tmark">“</span>}
        <Stars count={t.rating ?? 5} size={15} />
        <p className="tq">{photo ? `“${t.quote}”` : t.quote}</p>
        <div className="tby"><b>{t.name}</b><small>{t.meta}</small></div>
      </div>
    </Reveal>
  );
}
