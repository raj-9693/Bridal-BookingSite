import { Sh, ShLines, Loading } from "../Shimmer.jsx";

// Booking: stepper + step 1 ke 4 option cards + summary card
export default function BookingSkeleton() {
  return (
    <Loading>
      <div className="book-grid">
        <div className="book-col">
          <div style={{ display: "flex", gap: 24, margin: "0 0 22px" }} aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                <Sh w={32} h={32} r="50%" /><Sh w={90} h={13} />
              </div>
            ))}
          </div>
          <section className="step-card" aria-hidden="true">
            <div className="sh-lines" style={{ gap: 14, marginBottom: 24 }}>
              <Sh w={90} h={11} /><Sh w="min(420px, 90%)" h={36} r={10} /><Sh w="min(520px, 100%)" h={13} />
            </div>
            <div className="opts">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="sk-card sk-flat sk-pad" style={{ gap: 14 }}>
                  <Sh w={42} h={42} r="50%" /><Sh w="60%" h={24} /><ShLines n={2} h={12} /><Sh w={90} h={13} />
                </div>
              ))}
            </div>
            <div className="step-actions"><Sh w={210} h={48} r={12} /></div>
          </section>
        </div>

        <aside className="sum" aria-hidden="true">
          <div className="sum-head"><Sh w="55%" h={28} /><Sh w={80} h={24} r={99} /></div>
          <div style={{ display: "grid", gap: 22, margin: "24px 0" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}><Sh w={22} h={22} r="50%" /><div style={{ display: "grid", gap: 8, flex: 1 }}><Sh w={110} h={11} /><Sh w="65%" h={15} /></div></div>
            ))}
          </div>
          <ShLines n={2} h={12} />
          <Sh h={50} r={12} style={{ marginTop: 20 }} />
        </aside>
      </div>
    </Loading>
  );
}
