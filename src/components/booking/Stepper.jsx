import { Check } from "lucide-react";

const steps = ["Your service", "Event details", "About you"];

export default function Stepper({ active, onGo }) {
  return (
    <div className="stepper">
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
