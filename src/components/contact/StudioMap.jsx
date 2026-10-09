import { MapPin } from "lucide-react";

// Simple illustrated map (koi external map library nahi). Asli map "Open map" link se khulta hai.
export default function StudioMap({ name = "Saanjh Studio", place }) {
  return (
    <div className="map" role="img" aria-label={`Map showing ${name}, ${place}`}>
      <span className="road r1" />
      <span className="road r2" />
      <span className="pin"><MapPin size={26} strokeWidth={1.6} /></span>
      <div className="map-chip">
        <small>{name}</small>
        <b>{place}</b>
      </div>
    </div>
  );
}
