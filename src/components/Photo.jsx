import { useEffect, useState } from "react";

// Image na mile to soft placeholder dikhata hai. hue = placeholder ka rang (0-360)
export default function Photo({ src, alt, className = "", hue = 18 }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed || !src) return <div className={`photo-ph ${className}`} style={{ "--h": hue }} role="img" aria-label={alt} />;
  return <img src={src} alt={alt} className={className} loading="lazy" draggable="false" onError={() => setFailed(true)} />;
}
