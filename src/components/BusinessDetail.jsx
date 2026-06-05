import { CATEGORIES } from "../data/businesses";
import StarRating from "./StarRating";

const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export default function BusinessDetail({ business, onClose }) {
  if (!business) return null;
  const cat = categoryById[business.category];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${business.name} details`}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="detail__header">
          <span className="detail__avatar" aria-hidden="true">
            {cat?.icon || "🏢"}
          </span>
          <div>
            <div className="detail__title-row">
              <h2 className="detail__name">{business.name}</h2>
              {business.featured && <span className="badge">Featured</span>}
            </div>
            <p className="detail__tagline">{business.tagline}</p>
            <div className="detail__meta">
              <span className="card__category">
                {cat?.icon} {cat?.label || "Other"}
              </span>
              <StarRating rating={business.rating} />
            </div>
          </div>
        </div>

        <p className="detail__description">{business.description}</p>

        <div className="detail__tags">
          {business.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>

        <dl className="detail__info">
          <div className="detail__info-row">
            <dt>🕒 Hours</dt>
            <dd>{business.hours}</dd>
          </div>
          <div className="detail__info-row">
            <dt>📍 Address</dt>
            <dd>{business.address}</dd>
          </div>
          {business.owner && (
            <div className="detail__info-row">
              <dt>👤 Owner</dt>
              <dd>{business.owner}</dd>
            </div>
          )}
          <div className="detail__info-row">
            <dt>📞 Phone</dt>
            <dd>
              <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
                {business.phone}
              </a>
            </dd>
          </div>
          {business.email && (
            <div className="detail__info-row">
              <dt>✉️ Email</dt>
              <dd>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </dd>
            </div>
          )}
          {business.website && (
            <div className="detail__info-row">
              <dt>🌐 Website</dt>
              <dd>
                <a href={business.website} target="_blank" rel="noreferrer">
                  {business.website.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div className="detail__actions">
          <a
            className="btn btn--primary"
            href={`tel:${business.phone.replace(/\s/g, "")}`}
          >
            📞 Call now
          </a>
          {business.email && (
            <a className="btn btn--ghost" href={`mailto:${business.email}`}>
              ✉️ Email
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
