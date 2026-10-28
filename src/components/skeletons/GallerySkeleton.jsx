import { Sh, ShLines, Loading } from "../Shimmer.jsx";
import SectionHeading from "../SectionHeading.jsx";

// Filter chips (hero ke neeche)
export function ChipsSkeleton() {
  return (
    <div className="sh-row" style={{ justifyContent: "center", marginTop: 26 }} aria-hidden="true">
      {[110, 130, 130, 160, 120].map((w, i) => <Sh key={i} w={w} h={38} r={99} />)}
    </div>
  );
}

// "In focus" viewer ka loading
export function ViewerSkeleton() {
  return (
    <section className="band focus">
      <div className="container">
        <Loading>
          <SectionHeading center loading />
          <div className="viewer" aria-hidden="true">
            <div className="stage" style={{ position: "relative" }}><Sh className="fill" /></div>
            <div className="v-panel">
              <div className="sh-lines" style={{ gap: 16 }}>
                <Sh w={130} h={11} /><Sh w="75%" h={34} r={10} />
                <ShLines n={4} h={13} last="55%" />
                <Sh w="60%" h={13} style={{ marginTop: 10 }} />
                <Sh w={170} h={46} r={12} style={{ marginTop: 14 }} />
              </div>
            </div>
          </div>
        </Loading>
      </div>
    </section>
  );
}
