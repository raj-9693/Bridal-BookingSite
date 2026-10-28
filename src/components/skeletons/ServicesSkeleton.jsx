import { Sh, ShLines, Loading } from "../Shimmer.jsx";
import SectionHeading from "../SectionHeading.jsx";

// Services: package cards + comparison table + FAQ ka loading
export function PackagesSkeleton() {
  return (
    <Loading>
      <div className="pkg-grid">
        {[0, 1, 2, 3].map((i) => (
          <article key={i} className="pkg" aria-hidden="true">
            <div className="pkg-img" style={{ position: "relative" }}><Sh className="fill" /></div>
            <div className="pkg-body" style={{ display: "grid", gap: 12 }}>
              <Sh w="60%" h={11} />
              <Sh w="75%" h={28} />
              <Sh w="45%" h={26} />
              <ShLines n={4} h={12} last="70%" />
              <Sh h={46} r={12} />
            </div>
          </article>
        ))}
      </div>
    </Loading>
  );
}

export function CompareSkeleton() {
  return (
    <section className="band">
      <div className="container">
        <SectionHeading loading />
        <div className="sk-card sk-pad" aria-hidden="true" style={{ gap: 18 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 16, alignItems: "center" }}>
              <Sh w="70%" h={14} /><Sh w={18} h={18} r="50%" /><Sh w={18} h={18} r="50%" /><Sh w={18} h={18} r="50%" /><Sh w={18} h={18} r="50%" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSkeleton() {
  return (
    <section className="section">
      <div className="container faq-layout">
        <div className="sh-lines" style={{ gap: 14 }} aria-hidden="true">
          <Sh w={130} h={12} />
          <Sh w="80%" h={42} r={10} />
          <Sh w="60%" h={42} r={10} />
          <ShLines n={3} h={13} />
          <Sh w={170} h={42} r={12} />
        </div>
        <div className="sk-card sk-pad" aria-hidden="true" style={{ gap: 26 }}>
          {[0, 1, 2, 3].map((i) => <Sh key={i} w={`${70 - i * 6}%`} h={20} />)}
        </div>
      </div>
    </section>
  );
}
