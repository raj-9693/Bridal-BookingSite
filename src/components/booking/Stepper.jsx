import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

// labels = 3 step ke naam (admin: Booking → Steps)
export default function Stepper({ labels = ["Your service", "Event details", "About you"], active, onGo }) {
  const steps = labels;
  const stepperRef = useRef(null);

  useEffect(() => {
    const container = stepperRef.current;
    const current = container?.querySelector(".now");
    if (!container || !current || container.scrollWidth <= container.clientWidth) return;

    const containerBounds = container.getBoundingClientRect();
    const currentBounds = current.getBoundingClientRect();
    const left = currentBounds.left - containerBounds.left + container.scrollLeft;
    const right = currentBounds.right - containerBounds.left + container.scrollLeft;

    if (right > container.scrollLeft + container.clientWidth) {
      container.scrollTo({ left: right - container.clientWidth, behavior: "smooth" });
    } else if (left < container.scrollLeft) {
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div
      className="stepper"
      ref={stepperRef}
      role="region"
      aria-label="Booking progress; scroll horizontally to see all steps"
      tabIndex={0}
    >
      <ol>
        {steps.map((label, i) => {
          const n = i + 1;
          const state = n < active ? "done" : n === active ? "now" : "next";
          return (
            <li key={label} className={state}>
              <button type="button" onClick={() => onGo(n)} aria-current={n === active ? "step" : undefined}>
                <span className="dot">{state === "done" ? <Check size={14} strokeWidth={2.6} /> : n}</span>
                <span className="lbl">{label}</span>
              </button>
              {n < steps.length && <span className="ln" />}
            </li>
          );
        })}
      </ol>
      <div className="track"><span style={{ width: `${(active / steps.length) * 100}%` }} /></div>
    </div>
  );
}
