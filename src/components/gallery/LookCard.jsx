import Photo from "../Photo.jsx";

export default function LookCard({ look, index, active, onSelect }) {
  return (
    <button
      className={`look-card ${active ? "is-active" : ""}`}
      style={{ "--i": index }}
      onClick={() => onSelect(look.id)}
      aria-label={`View ${look.title}`}
    >
      <Photo src={look.image} alt={look.title} hue={10 + ((index * 23) % 40)} />
      <span className="look-cap">
        <small>{look.label}</small>
        <b>{look.title}</b>
      </span>
    </button>
  );
}
