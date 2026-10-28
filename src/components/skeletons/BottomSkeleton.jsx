import { Sh, ShLines } from "../Shimmer.jsx";

// CTA box + Footer ka loading (Layout me, jab tak Bottom data nahi aata)
export function CtaSkeleton({ tone = "light" }) {
  const dark = tone === "dark";
  return (
    <section className="cta-wrap">
      <div className="container">
        <div className={`cta ${dark ? "cta-dark on-dark" : ""}`} aria-hidden="true">
          <div className="sh-lines center" style={{ gap: 16 }}>
            <Sh w={170} h={12} />
            <Sh w="min(560px, 90%)" h={46} r={10} />
            <Sh w="min(400px, 70%)" h={46} r={10} />
            <ShLines n={2} h={14} w="min(520px, 90%)" center />
            <Sh w={200} h={48} r={12} style={{ marginTop: 8 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="footer" aria-hidden="true">
      <div className="container footer-grid">
        <div style={{ display: "grid", gap: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Sh w={38} h={38} r="50%" /><Sh w={90} h={24} /></div>
          <ShLines n={2} h={12} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "grid", gap: 12, alignContent: "start" }}>
            <Sh w={110} h={12} />
            <Sh w="75%" h={13} /><Sh w="60%" h={13} /><Sh w="70%" h={13} />
          </div>
        ))}
      </div>
      <div className="footer-bar">
        <div className="container footer-bar-inner"><Sh w={230} h={11} /><Sh w={200} h={11} /></div>
      </div>
    </footer>
  );
}
