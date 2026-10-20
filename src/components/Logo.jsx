import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Saanjh home">
      <span className="logo-mark">S</span>
      <span className="logo-text">Saanjh</span>
    </Link>
  );
}
