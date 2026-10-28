import { Sh, ShLines, ShBox, Loading } from "../Shimmer.jsx";
import SectionHeading from "../SectionHeading.jsx";

// Home ka loading skeleton — asli page ke wahi classes, taaki data aate hi layout hile nahi.
export default function HomeSkeleton() {
  return (
    <Loading>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="sh-lines" style={{ gap: 16 }} aria-hidden="true">
              <Sh w={200} h={12} />
              <Sh w="min(520px, 100%)" h={54} r={10} />
              <Sh w="min(380px, 80%)" h={54} r={10} />
              <ShLines n={3} h={14} w="min(480px, 100%)" last="55%" />
            </div>
            <div className="hero-btns" aria-hidden="true">
              <Sh w={160} h={48} r={12} />
              <Sh w={130} h={48} r={12} />
            </div>
            <dl className="stats" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div key={i}><dt><Sh w={70} h={28} /></dt><dd><Sh w={90} h={12} style={{ marginTop: 8 }} /></dd></div>
              ))}
            </dl>
          </div>
          <div className="hero-art">
            <div className="arch" style={{ position: "relative" }}><Sh className="fill" /></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="band">
        <div className="container">
          <SectionHeading loading />
          <div className="grid-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="card" aria-hidden="true" style={{ display: "grid", gap: 14 }}>
                <Sh w={46} h={46} r="50%" />
                <Sh w="70%" h={26} />
                <ShLines n={3} h={12} />
                <Sh w={110} h={12} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLIMPSE */}
      <section className="section">
        <div className="container">
          <SectionHeading center loading />
          <div className="glimpse">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`glimpse-card ${i === 1 ? "drop" : ""}`} aria-hidden="true">
                <ShBox ratio="3 / 4" r={0} />
                <div className="glimpse-cap"><Sh w="55%" h={12} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-band">
        <div className="container">
          <div className="on-dark"><SectionHeading loading /></div>
          <div className="grid-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="sk-card sk-pad" aria-hidden="true" style={{ background: "#fffdfa" }}>
                <Sh w={26} h={26} r="50%" style={{ opacity: 0.8 }} />
                <ShLines n={4} h={15} last="50%" />
                <Sh w="45%" h={12} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section tight">
        <div className="container">
          <div className="values" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="value" style={{ display: "grid", gap: 10 }}>
                <Sh w={44} h={44} r="50%" />
                <Sh w="70%" h={22} />
                <ShLines n={2} h={12} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Loading>
  );
}
