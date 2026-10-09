import { Check } from "lucide-react";
import Icon from "../Icon.jsx";
import { formatPrice } from "../../utils/format.js";

export default function ServiceOption({ s, selected, onSelect }) {
  return (
    <button type="button" role="radio" aria-checked={selected} className={`opt ${selected ? "sel" : ""}`} onClick={() => onSelect(s.id)}>
      <Icon name={s.icon} />
      {selected && <span className="opt-check"><Check size={13} strokeWidth={2.8} /></span>}
      <h3 className="h3">{s.name}</h3>
      <p>{s.summary}</p>
      <b>From {formatPrice(s.price)}</b>
    </button>
  );
}
