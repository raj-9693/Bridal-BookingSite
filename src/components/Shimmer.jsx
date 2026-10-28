import "../styles/shimmer.css";

// Loading ke chhote building blocks. Skeleton pages inhi se bante hain.
//   <Sh w={120} h={14} />            ek patti (box)
//   <ShLines n={3} />                text ki kai lines (aakhri chhoti)
//   <ShBox ratio="3 / 4" />          image jaisa box (aspect ratio se)

// w / h number ho to px, text ho ("60%") to waisa hi
const px = (v) => (typeof v === "number" ? `${v}px` : v);

export function Sh({ w = "100%", h = 16, r = 8, className = "", style }) {
  return <span className={`sh ${className}`} style={{ width: px(w), height: px(h), borderRadius: px(r), maxWidth: "100%", ...style }} aria-hidden="true" />;
}

export function ShLines({ n = 3, h = 14, last = "62%", w = "100%", center = false, className = "" }) {
  return (
    <div className={`sh-lines ${center ? "center" : ""} ${className}`} aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <Sh key={i} h={h} w={i === n - 1 && n > 1 ? last : w} />
      ))}
    </div>
  );
}

export function ShBox({ ratio = "4 / 5", r = 14, className = "", style }) {
  return <span className={`sh sh-box ${className}`} style={{ aspectRatio: ratio, borderRadius: px(r), ...style }} aria-hidden="true" />;
}

// Poore page ke skeleton ko wrap karta hai (screen reader ko batata hai ki loading chal rahi hai)
export function Loading({ children, label = "Loading" }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{label}…</span>
      {children}
    </div>
  );
}
