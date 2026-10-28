import { useCallback, useEffect, useState } from "react";
import "../styles/shimmer.css";

// Image na mile to soft placeholder dikhata hai. hue = placeholder ka rang (0-360)
// Image download hone tak (img.photo-loading) shimmer chalta hai.
export default function Photo({ src, alt, className = "", hue = 18 }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  // image cache se pehle hi aa chuki ho to onLoad nahi chalta, isliye yahan check
  const ref = useCallback((img) => {
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (failed || !src) return <div className={`photo-ph ${className}`} style={{ "--h": hue }} role="img" aria-label={alt} />;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`${className} ${loaded ? "" : "photo-loading"}`.trim()}
      loading="lazy"
      draggable="false"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}
