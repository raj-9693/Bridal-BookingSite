import { Sh, ShLines, ShBox, Loading } from "../Shimmer.jsx";
import SectionHeading from "../SectionHeading.jsx";

export default function AboutSkeleton() {
  return (
    <Loading>
      {/* founder */}
      <section className="section founder-sec">
        <div className="container founder">
          <div className="f-art">
            <div className="arch" style={{ position: "relative" }}><Sh className="fill" /></div>
          </div>
          <div className="sh-lines" style={{ gap: 16 }} aria-hidden="true">
            <Sh w={150} h={12} />
            <Sh w="min(440px, 90%)" h={46} r={10} />
            <ShLines n={4} h={14} last="70%" />
            <ShLines n={3} h={14} last="45%" />
            <div style={{ display: "flex", gap: 40, margin: "10px 0" }}><Sh w={120} h={44} /><Sh w={150} h={44} /></div>
            <Sh w={190} h={48} r={12} />
          </div>
        </div>
      </section>

      {/* maroon stats band */}
      <section className="bstats on-dark">
        <div className="container bstats-in" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bs" style={{ display: "grid", justifyItems: "center", gap: 8 }}><Sh w={90} h={30} /><Sh w={110} h={11} /></div>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="section">
        <div className="container">
          <SectionHeading center loading />
          <div className="pcs">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="pc" aria-hidden="true" style={{ display: "grid", gap: 12 }}>
                <Sh w={44} h={44} r="50%" /><Sh w="65%" h={24} /><ShLines n={3} h={12} last="70%" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="section team">
        <div className="container">
          <SectionHeading loading />
          <div className="team-grid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="sk-card" aria-hidden="true">
                <ShBox ratio="4 / 5" r={0} />
                <div className="sk-pad"><Sh w="55%" h={11} /><Sh w="70%" h={26} /><ShLines n={3} h={12} last="60%" />
                  <div className="sh-row"><Sh w={80} h={26} r={99} /><Sh w={90} h={26} r={99} /></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* travel + kit */}
      <section className="band travel">
        <div className="container travel-grid">
          <div className="sh-lines" style={{ gap: 14 }} aria-hidden="true">
            <Sh w={150} h={12} /><Sh w="85%" h={42} r={10} /><Sh w="60%" h={42} r={10} />
            <ShLines n={3} h={13} />
            <div className="sh-row">{[0, 1, 2, 3, 4].map((i) => <Sh key={i} w={86} h={36} r={99} />)}</div>
          </div>
          <div className="sk-card sk-pad" aria-hidden="true" style={{ gap: 14 }}>
            <Sh w={130} h={12} /><Sh w="85%" h={30} /><ShLines n={2} h={13} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{[0, 1, 2, 3, 4, 5].map((i) => <Sh key={i} h={40} r={8} />)}</div>
          </div>
        </div>
      </section>
    </Loading>
  );
}
