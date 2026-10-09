import Reveal from "../Reveal.jsx";
import Stars from "./Stars.jsx";

export default function RatingSummary({ summary: s }) {
  const dist = s.distribution || {};
  const sum = Object.values(dist).reduce((a, b) => a + b, 0) || 1;
  return (
    <Reveal className="rate">
      <div className="rate-left">
        <Stars count={5} size={20} />
        <p className="rate-num">{Number(s.average).toFixed(1)}</p>
        <p className="rate-title">Loved by {s.total}+ Saanjh brides</p>
        <p className="rate-text">{s.text}</p>
      </div>
      <div className="rate-right">
        <ul className="bars">
          {[5, 4, 3, 2, 1].map((n) => {
            const c = dist[n] ?? 0;
            return (
              <li key={n}>
                <span className="bar-n">{n}</span>
                <span className="bar-track"><span className="bar-fill" style={{ "--w": `${(c / sum) * 100}%` }} /></span>
                <span className="bar-c">{c}</span>
              </li>
            );
          })}
        </ul>
        <p className="rate-note">{s.note}</p>
      </div>
    </Reveal>
  );
}
