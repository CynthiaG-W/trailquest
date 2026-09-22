import { Search, SlidersHorizontal, X } from "lucide-react";

function Hero({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit();
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">
          DISCOVER · PREPARE · ADVENTURE
        </p>

        <h1>
          Ready for your next <em>quest?</em>
        </h1>

        <p className="hero-description">
          Discover trails that match your experience,
          real hiking events, and everything you need
          before you hit the trail.
        </p>

        <form
          className="search-box"
          onSubmit={handleSubmit}
        >
          <Search size={20} />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search trails, places or adventures..."
            aria-label="Search trails, places or adventures"
          />

          {searchTerm && (
            <button
              type="button"
              className="search-clear"
              onClick={onClearSearch}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            className="filter-button"
            aria-label="Search adventures"
          >
            <SlidersHorizontal size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;