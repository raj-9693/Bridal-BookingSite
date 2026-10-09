import { Sparkles, Flower2, Heart, Users, HeartHandshake, Palette, Clock, MapPin, Star } from "lucide-react";

const map = { sparkles: Sparkles, flower: Flower2, heart: Heart, users: Users, heartHandshake: HeartHandshake, palette: Palette, clock: Clock, pin: MapPin, star: Star };

export default function Icon({ name, size = 18 }) {
  const Cmp = map[name] || Sparkles;
  return (
    <span className="icon-badge">
      <Cmp size={size} strokeWidth={1.6} />
    </span>
  );
}
