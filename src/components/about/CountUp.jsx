import { useEffect, useRef, useState } from "react";

// "650+ brides", "4.9/5", "18" ... shuru ka number scroll par ginta hua aata hai, baaki text jaisa hai waisa.
export default function CountUp({ value, duration = 1400 }) {
  const text = String(value);
  const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m) return;
    const target = parseFloat(m[1]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration]);

  if (!m) return <span ref={ref}>{text}</span>;
  const decimals = (m[1].split(".")[1] || "").length;
  return <span ref={ref}>{n.toFixed(decimals)}{m[2]}</span>;
}
