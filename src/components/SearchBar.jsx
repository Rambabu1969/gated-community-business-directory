export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search businesses, services, or tags…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search businesses"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
