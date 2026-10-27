import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Photo from "../Photo.jsx";

// "In focus" viewer: left/right arrows, keyboard (← →) aur mobile swipe teeno chalte hain.
// detailsLabel / buttonText admin se aate hain (Gallery → In-focus section)
export default function LookViewer({ look, index, total, dir, onPrev, onNext, onClose, detailsLabel = "The Saanjh edit", buttonText = "Book this look" }) {
  const [layers, setLayers] = useState({ cur: look, prev: null });
  const touchX = useRef(null);

  // Crossfade: purani image thodi der neeche rehti hai, nayi upar slide hoke aati hai
  useEffect(() => {
    setLayers((l) => (l.cur.id === look.id ? l : { cur: look, prev: l.cur }));
    const t = setTimeout(() => setLayers((l) => ({ ...l, prev: null })), 650);
    return () => clearTimeout(t);
  }, [look]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext]);

  const swipeStart = (e) => (touchX.current = e.touches[0].clientX);
  const swipeEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? onNext : onPrev)();
  };

  const n = String(index + 1).padStart(2, "0");
  const t = String(total).padStart(2, "0");

  return (
    <div className="viewer">
      <div className="stage" data-dir={dir} onTouchStart={swipeStart} onTouchEnd={swipeEnd}>
        {layers.prev && <Photo key={`p${layers.prev.id}`} className="layer out" src={layers.prev.image} alt="" hue={20} />}
        <Photo key={`c${layers.cur.id}`} className="layer in" src={layers.cur.image} alt={layers.cur.title} hue={20 + index * 17} />

        <button className="v-btn v-close" onClick={onClose} aria-label="Back to all looks"><X size={18} /></button>
        <button className="v-btn v-prev" onClick={onPrev} aria-label="Previous look"><ArrowLeft size={18} /></button>
        <button className="v-btn v-next" onClick={onNext} aria-label="Next look"><ArrowRight size={18} /></button>
      </div>

      <div className="v-panel">
        <div key={look.id} className="v-info" aria-live="polite">
          <p className="eyebrow">Look {n} of {t}</p>
          <h3 className="h3 v-title">{look.title}</h3>
          <p className="v-desc">{look.description}</p>
          <div className="v-edit">
            <small>{detailsLabel}</small>
            <p>{look.services.join(" · ")}</p>
          </div>
          <Link to="/booking" state={{ look: look.title }} className="btn btn-primary v-book">
            {buttonText} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
