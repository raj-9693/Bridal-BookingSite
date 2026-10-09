export default function FilterChips({ items, value, onChange }) {
  return (
    <div className="chips center" role="tablist" aria-label="Filter looks">
      {items.map((c) => (
        <button key={c} role="tab" aria-selected={c === value} className={`chip ${c === value ? "on" : ""}`} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
