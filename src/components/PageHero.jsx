import { Sh, ShLines } from "./Shimmer.jsx";

// loading=true -> eyebrow / title / text ki jagah shimmer (server se data aane tak)
export default function PageHero({ eyebrow, title, text, center = false, loading = false, children }) {
  return (
    <section className={`page-hero ${center ? "center" : ""}`}>
      <div className="container">
        {loading ? (
          <div className={`sh-lines ${center ? "center" : ""}`} style={{ gap: 16 }} aria-hidden="true">
            <Sh w={190} h={12} />
            <Sh w="min(620px, 92%)" h={48} r={10} />
            <Sh w="min(440px, 70%)" h={48} r={10} />
            <ShLines n={2} h={14} w="min(560px, 90%)" last="70%" center={center} />
          </div>
        ) : (
          <>
            <p className="eyebrow line">{eyebrow}</p>
            <h1 className="h1">{title}</h1>
            {text && <p className="lead">{text}</p>}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
