import { Star } from "lucide-react";

export default function Stars({ count = 5, size = 14, total = 5 }) {
  return (
    <span className="rstars" role="img" aria-label={`${count} out of ${total} stars`}>
      {Array.from({ length: total }, (_, i) => (
        <Star key={i} size={size} strokeWidth={1.5} className={i < count ? "on" : "off"} />
      ))}
    </span>
  );
}
