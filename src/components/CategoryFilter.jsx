import { CATEGORIES } from "../data/businesses";

export default function CategoryFilter({ active, counts, onChange }) {
  const allCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <nav className="category-filter" aria-label="Business categories">
      <button
        className={`chip ${active === "all" ? "chip--active" : ""}`}
        onClick={() => onChange("all")}
      >
        <span aria-hidden="true">🏘️</span> All
        <span className="chip__count">{allCount}</span>
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`chip ${active === cat.id ? "chip--active" : ""}`}
          onClick={() => onChange(cat.id)}
        >
          <span aria-hidden="true">{cat.icon}</span> {cat.label}
          <span className="chip__count">{counts[cat.id] || 0}</span>
        </button>
      ))}
    </nav>
  );
}
