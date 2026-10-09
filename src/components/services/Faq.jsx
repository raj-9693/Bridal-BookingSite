import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(items[0]?.id ?? null);
  return (
    <div className="faq">
      {items.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className={`faq-item ${isOpen ? "open" : ""}`}>
            <h3>
              <button className="faq-q" aria-expanded={isOpen} aria-controls={`faq-${f.id}`} onClick={() => setOpen(isOpen ? null : f.id)}>
                <span>{f.question}</span>
                {isOpen ? <Minus size={18} strokeWidth={1.6} /> : <Plus size={18} strokeWidth={1.6} />}
              </button>
            </h3>
            <div id={`faq-${f.id}`} className="faq-a" role="region">
              <div><p>{f.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
