import { Sh, ShLines, Loading } from "../Shimmer.jsx";

export default function ContactSkeleton() {
  return (
    <Loading>
      <section className="contact-main">
        <div className="container contact-grid">
          {/* left: reach cards */}
          <div>
            <div className="sh-lines" style={{ gap: 14, marginBottom: 26 }} aria-hidden="true">
              <Sh w={140} h={12} /><Sh w="min(300px, 80%)" h={40} r={10} />
            </div>
            <div className="cc-list">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="sk-card" aria-hidden="true" style={{ display: "flex", gap: 16, alignItems: "center", padding: 20 }}>
                  <Sh w={48} h={48} r="50%" />
                  <div style={{ flex: 1, display: "grid", gap: 9 }}><Sh w={110} h={11} /><Sh w="70%" h={16} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* right: map + form */}
          <div>
            <div className="sk-card" aria-hidden="true" style={{ marginBottom: 28 }}>
              <Sh h={250} r={0} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: 22 }}>
                <div style={{ display: "grid", gap: 9, flex: 1 }}><Sh w="45%" h={22} /><Sh w="65%" h={13} /></div>
                <Sh w={110} h={40} r={12} />
              </div>
            </div>
            <div className="sk-card sk-pad" aria-hidden="true" style={{ padding: 30, gap: 22 }}>
              <div style={{ display: "grid", gap: 12 }}><Sh w={120} h={12} /><Sh w="45%" h={34} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                {[0, 1, 2, 3].map((i) => <div key={i} style={{ display: "grid", gap: 9 }}><Sh w={90} h={11} /><Sh h={48} r={10} /></div>)}
              </div>
              <div style={{ display: "grid", gap: 9 }}><Sh w={110} h={11} /><Sh h={110} r={10} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <ShLines n={2} h={11} w="min(360px, 100%)" /><Sh w={150} h={48} r={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quick">
        <div className="container quick-in" aria-hidden="true">
          <div style={{ display: "grid", gap: 12 }}><Sh w={150} h={12} /><Sh w="min(420px, 80vw)" h={36} r={10} /></div>
          <Sh w={190} h={48} r={12} />
        </div>
      </section>
    </Loading>
  );
}
