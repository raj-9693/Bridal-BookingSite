import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ymd, todayYmd, parseYmd } from "../../utils/dates.js";

const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

// value = "YYYY-MM-DD" ya "". unavailable = held dates. Past dates band rehti hain.
export default function Calendar({ value, onChange, unavailable = [], note }) {
  const today = todayYmd();
  const start = value ? parseYmd(value) : new Date();
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });
  const held = useMemo(() => new Set(unavailable), [unavailable]);

  const lead = new Date(view.y, view.m, 1).getDay();
  const count = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  const title = new Date(view.y, view.m, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const now = new Date();
  const atCurrent = view.y === now.getFullYear() && view.m === now.getMonth();
  const shift = (n) => setView(({ y, m }) => { const d = new Date(y, m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" onClick={() => shift(-1)} disabled={atCurrent} aria-label="Previous month"><ChevronLeft size={18} /></button>
        <b>{title}</b>
        <button type="button" onClick={() => shift(1)} aria-label="Next month"><ChevronRight size={18} /></button>
      </div>
      <div className="cal-grid">
        {WEEK.map((w, i) => <span key={i} className="cal-w">{w}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={`b${i}`} />;
          const key = ymd(view.y, view.m, d);
          const past = key < today;
          const isHeld = held.has(key);
          const cls = ["cal-d", key === value && "sel", isHeld && "held", past && "past", key === today && "today"].filter(Boolean).join(" ");
          return (
            <button key={key} type="button" className={cls} disabled={past || isHeld} aria-pressed={key === value}
              aria-label={`${d} ${title}${isHeld ? ", unavailable" : ""}`} onClick={() => onChange(key)}>
              {d}
            </button>
          );
        })}
      </div>
      {note && <p className="cal-note"><i />{note}</p>}
    </div>
  );
}
