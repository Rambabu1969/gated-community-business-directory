import { CATEGORIES } from "../data/businesses";
import StarRating from "./StarRating";

const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export default function BusinessCard({ business, onSelect }) {
  const cat = categoryById[business.category];

  return (
    <article
      className="card"
      onClick={() => onSelect(business)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(business);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="card__top">
        <span className="card__avatar" aria-hidden="true">
          {cat?.icon || "🏢"}
        </span>
        {business.featured && <span className="badge">Featured</span>}
      </div>
      <h3 className="card__name">{business.name}</h3>
      <p className="card__tagline">{business.tagline}</p>
      <div className="card__meta">
        <span className="card__category">
          {cat?.icon} {cat?.label || "Other"}
        </span>
        <StarRating rating={business.rating} />
      </div>
      <div className="card__tags">
        {business.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="card__footer">
        <span className="card__hours">🕒 {business.hours}</span>
        <span className="card__cta">View details →</span>
      </div>
    </article>
  );
}
