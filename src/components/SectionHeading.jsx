import { Sh } from "./Shimmer.jsx";

// loading=true -> heading ki jagah shimmer
export default function SectionHeading({ eyebrow, title, center = false, loading = false, children }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      <div>
        {loading ? (
          <div className="sh-lines" style={{ gap: 14, justifyItems: center ? "center" : "start" }} aria-hidden="true">
            <Sh w={150} h={12} />
            <Sh w="min(420px, 80vw)" h={40} r={10} />
          </div>
        ) : (
          <>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="h2">{title}</h2>
          </>
        )}
      </div>
      {!loading && children}
    </div>
  );
}
