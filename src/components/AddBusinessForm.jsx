import { useState } from "react";
import { CATEGORIES } from "../data/businesses";

const EMPTY = {
  name: "",
  category: CATEGORIES[0].id,
  tagline: "",
  description: "",
  phone: "",
  email: "",
  website: "",
  address: "",
  hours: "",
  owner: "",
  tags: "",
};

export default function AddBusinessForm({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Business name is required";
    if (!form.tagline.trim()) next.tagline = "A short tagline is required";
    if (!form.phone.trim()) next.phone = "A contact phone is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (form.website && !/^https?:\/\/.+/.test(form.website))
      next.website = "Website must start with http:// or https://";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const business = {
      id: `user-${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      tagline: form.tagline.trim(),
      description: form.description.trim() || form.tagline.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      address: form.address.trim() || "Palm Grove Residency",
      hours: form.hours.trim() || "Hours not specified",
      owner: form.owner.trim(),
      rating: 0,
      tags: form.tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      featured: false,
      userAdded: true,
    };
    onAdd(business);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="List your business"
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="form__title">List your business</h2>
        <p className="form__subtitle">
          Share your service with everyone in Palm Grove Residency.
        </p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className="field field--full">
            <span>Business name *</span>
            <input value={form.name} onChange={update("name")} />
            {errors.name && <em className="field__error">{errors.name}</em>}
          </label>

          <label className="field">
            <span>Category *</span>
            <select value={form.category} onChange={update("category")}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Owner / Contact name</span>
            <input value={form.owner} onChange={update("owner")} />
          </label>

          <label className="field field--full">
            <span>Tagline *</span>
            <input
              value={form.tagline}
              onChange={update("tagline")}
              placeholder="One line about what you offer"
            />
            {errors.tagline && (
              <em className="field__error">{errors.tagline}</em>
            )}
          </label>

          <label className="field field--full">
            <span>Description</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={update("description")}
            />
          </label>

          <label className="field">
            <span>Phone *</span>
            <input value={form.phone} onChange={update("phone")} />
            {errors.phone && <em className="field__error">{errors.phone}</em>}
          </label>

          <label className="field">
            <span>Email</span>
            <input value={form.email} onChange={update("email")} />
            {errors.email && <em className="field__error">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Website</span>
            <input
              value={form.website}
              onChange={update("website")}
              placeholder="https://"
            />
            {errors.website && (
              <em className="field__error">{errors.website}</em>
            )}
          </label>

          <label className="field">
            <span>Hours</span>
            <input
              value={form.hours}
              onChange={update("hours")}
              placeholder="9:00 AM – 8:00 PM"
            />
          </label>

          <label className="field field--full">
            <span>Address</span>
            <input value={form.address} onChange={update("address")} />
          </label>

          <label className="field field--full">
            <span>Tags (comma separated)</span>
            <input
              value={form.tags}
              onChange={update("tags")}
              placeholder="delivery, vegetarian, 24x7"
            />
          </label>

          <div className="form__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Add business
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
