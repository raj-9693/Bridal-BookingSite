import { Sh, ShLines, ShBox, Loading } from "../Shimmer.jsx";
import SectionHeading from "../SectionHeading.jsx";

export default function ReviewsSkeleton() {
  return (
    <Loading>
      {/* rating summary */}
      <section className="band rate-band">
        <div className="container" aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "center" }}>
          <div className="sh-lines center" style={{ gap: 14 }}>
            <Sh w={150} h={20} />
            <Sh w={110} h={60} r={12} />
            <Sh w={210} h={14} />
            <ShLines n={2} h={12} w="85%" center />
          </div>
          <div className="sh-lines" style={{ gap: 14 }}>
            {[0, 1, 2, 3, 4].map((i) => <Sh key={i} h={10} r={99} w={`${100 - i * 4}%`} />)}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="section">
        <div className="container">
          <SectionHeading loading />
          <div className="tcards">
            {[0, 1, 2].map((i) => (
              <div key={i} className="sk-card" aria-hidden="true">
                {i === 0 && <ShBox ratio="4 / 3" r={0} />}
                <div className="sk-pad">
                  <Sh w={90} h={14} />
                  <ShLines n={i === 0 ? 3 : 5} h={16} last="55%" />
                  <Sh w="40%" h={12} style={{ marginTop: 8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* whatsapp style messages */}
      <section className="band proof">
        <div className="container">
          <div className="section-head center">
            <div className="sh-lines center" style={{ gap: 14 }} aria-hidden="true">
              <Sh w={170} h={12} />
              <Sh w="min(360px, 80vw)" h={40} r={10} />
              <ShLines n={2} h={13} w="min(520px, 90vw)" center />
            </div>
          </div>
          <div className="chat-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="sk-card sk-pad" aria-hidden="true">
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Sh w={34} h={34} r="50%" /><Sh w="40%" h={13} /></div>
                <ShLines n={3} h={13} last="60%" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section tight">
        <div className="container">
          <div className="values light" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="value" style={{ display: "grid", gap: 10 }}>
                <Sh w={44} h={44} r="50%" /><Sh w="65%" h={22} /><ShLines n={2} h={12} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Loading>
  );
}
