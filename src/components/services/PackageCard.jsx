import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Photo from "../Photo.jsx";
import { formatPrice } from "../../utils/format.js";

// pkg = { name, tagline, price, priceNote, image, popular, button, features[] }   badge = "Most popular" ka text
export default function PackageCard({ pkg, badge = "Most popular", index }) {
  const price = typeof pkg.price === "number" ? formatPrice(pkg.price) : pkg.price;

  return (
    <article className="pkg" style={{ "--i": index }}>
      <div className="pkg-img">
        <Photo src={pkg.image} alt={pkg.name} hue={10 + index * 14} />
        {pkg.popular && badge && <span className="pkg-badge">{badge}</span>}
      </div>
      <div className="pkg-body">
        <p className="pkg-tag">{pkg.tagline}</p>
        <h3 className="h3 pkg-name">{pkg.name}</h3>
        <p className="pkg-price"><b>{price}</b> <small>{pkg.priceNote || "onwards"}</small></p>
        <ul className="pkg-list">
          {pkg.features.map((f) => (
            <li key={f}><Check size={14} strokeWidth={2} />{f}</li>
          ))}
        </ul>
        {pkg.button && (
          <Link to="/booking" state={{ service: pkg.name }} className="btn btn-outline pkg-btn">
            {pkg.button}
          </Link>
        )}
      </div>
    </article>
  );
}
