import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Photo from "../Photo.jsx";
import { formatPrice } from "../../utils/format.js";

export default function PackageCard({ pkg, index }) {
  return (
   <article className="pkg" style={{ "--i": index }}>
      <div className="pkg-img">
        <Photo src={pkg.image} alt={pkg.name} hue={10 + index * 14} />
        {pkg.popular && <span className="pkg-badge">Most popular</span>}
      </div>
      <div className="pkg-body">
        <p className="pkg-tag">{pkg.tagline}</p>
        <h3 className="h3 pkg-name">{pkg.name}</h3>
        <p className="pkg-price"><b>{formatPrice(pkg.price)}</b> <small>{pkg.priceNote || "onwards"}</small></p>
        <ul className="pkg-list">
          {pkg.features.map((f) => (
            <li key={f}><Check size={14} strokeWidth={2} />{f}</li>
          ))}
        </ul>
        <Link to="/booking" state={{ service: pkg.name }} className="btn btn-outline pkg-btn">
          Book This
        </Link>
      </div>
    </article>
  );
}
