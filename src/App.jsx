import { useMemo, useState } from "react";
import "./App.css";
import { CATEGORIES, SEED_BUSINESSES } from "./data/businesses";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import BusinessCard from "./components/BusinessCard";
import BusinessDetail from "./components/BusinessDetail";
import AddBusinessForm from "./components/AddBusinessForm";

export default function App() {
  const [userBusinesses, setUserBusinesses] = useLocalStorage(
    "pg-user-businesses",
    []
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const allBusinesses = useMemo(
    () => [...userBusinesses, ...SEED_BUSINESSES],
    [userBusinesses]
  );

  const counts = useMemo(() => {
    const c = {};
    for (const b of allBusinesses) c[b.category] = (c[b.category] || 0) + 1;
    return c;
  }, [allBusinesses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allBusinesses.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (!q) return true;
      const haystack = [b.name, b.tagline, b.description, ...(b.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allBusinesses, query, category]);

  const featured = useMemo(
    () => filtered.filter((b) => b.featured),
    [filtered]
  );

  function handleAdd(business) {
    setUserBusinesses((prev) => [business, ...prev]);
    setShowAddForm(false);
    setCategory("all");
    setQuery("");
    setSelected(business);
  }

  const activeCategoryLabel =
    category === "all"
      ? "All businesses"
      : CATEGORIES.find((c) => c.id === category)?.label || "Businesses";

  return (
    <div className="app">
      <Header
        onAddClick={() => setShowAddForm(true)}
        totalCount={allBusinesses.length}
      />

      <section className="hero">
        <div className="container">
          <h2 className="hero__title">Everything you need, close to home</h2>
          <p className="hero__text">
            Discover trusted businesses and services right inside Palm Grove
            Residency — from groceries and clinics to tutors and home repairs.
          </p>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>

      <main className="container main">
        <CategoryFilter
          active={category}
          counts={counts}
          onChange={setCategory}
        />

        {featured.length > 0 && category === "all" && !query && (
          <section className="section">
            <h3 className="section__title">⭐ Featured</h3>
            <div className="grid">
              {featured.map((b) => (
                <BusinessCard key={b.id} business={b} onSelect={setSelected} />
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <div className="section__head">
            <h3 className="section__title">{activeCategoryLabel}</h3>
            <span className="section__count">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <span className="empty__icon" aria-hidden="true">
                🔍
              </span>
              <p>No businesses match your search.</p>
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid">
              {filtered.map((b) => (
                <BusinessCard key={b.id} business={b} onSelect={setSelected} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            🏘️ Palm Grove Residency Business Directory — a community resource for
            residents.
          </p>
          <p className="footer__muted">
            Listings are provided by residents and local business owners.
          </p>
        </div>
      </footer>

      {selected && (
        <BusinessDetail business={selected} onClose={() => setSelected(null)} />
      )}
      {showAddForm && (
        <AddBusinessForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
