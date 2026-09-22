import { useMemo, useState, useEffect } from "react";

import {
  ArrowRight,
  SearchX,
  X,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Hero from "../components/Hero";
import DifficultyCard from "../components/DifficultyCard";
import TrailCard from "../components/TrailCard";
import EventCard from "../components/EventCard";

import { trails } from "../data/trails";

const difficultyLevels = [
  {
    level: "Beginner",
    description: "Easy paths & gentle terrain",
  },
  {
    level: "Intermediate",
    description: "Longer routes & elevation",
  },
  {
    level: "Advanced",
    description: "Technical & demanding",
  },
  {
    level: "Extreme",
    description: "Serious mountain challenges",
  },
];

function Discover() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] =
    useState(true);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const searchFromUrl =
    searchParams.get("q") || "";

  const difficultyFromUrl =
    searchParams.get("difficulty") || "";

  const [searchTerm, setSearchTerm] =
    useState(searchFromUrl);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch events"
          );
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoadingEvents(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingEvents(false);
      });
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    const trimmedSearch =
      searchTerm.trim();

    const nextParams = {};

    if (trimmedSearch) {
      nextParams.q = trimmedSearch;
    }

    if (difficultyFromUrl) {
      nextParams.difficulty =
        difficultyFromUrl;
    }

    setSearchParams(nextParams);
  };

  const handleClearSearch = () => {
    setSearchTerm("");

    const nextParams = {};

    if (difficultyFromUrl) {
      nextParams.difficulty =
        difficultyFromUrl;
    }

    setSearchParams(nextParams);
  };

  const handleClearDifficulty = () => {
    const nextParams = {};

    if (searchFromUrl) {
      nextParams.q = searchFromUrl;
    }

    setSearchParams(nextParams);
  };

  const searchResults = useMemo(() => {
    const query =
      searchFromUrl.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const trailResults = trails
      .filter((trail) => {
        const searchableText = [
          trail.name,
          trail.location,
          trail.difficulty,
          trail.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .map((trail) => ({
        type: "trail",
        id: trail.id,
        name: trail.name,
        location: trail.location,
        difficulty: trail.difficulty,
        description: trail.description,
        trail,
      }));

    const eventResults = events
      .filter((event) => {
        const searchableText = [
          event.name,
          event.organiser,
          event.location,
          event.difficulty,
          event.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .map((event) => ({
        type: "event",
        id: event.id,
        name: event.name,
        location: event.location,
        difficulty: event.difficulty,
        description: event.description,
        event,
      }));

    return [
      ...trailResults,
      ...eventResults,
    ];
  }, [searchFromUrl, events]);

  const difficultyResults = useMemo(() => {
    if (!difficultyFromUrl) {
      return {
        trails: [],
        events: [],
      };
    }

    const normalizedDifficulty =
      difficultyFromUrl
        .trim()
        .toLowerCase();

    const matchingTrails =
      trails.filter(
        (trail) =>
          trail.difficulty?.toLowerCase() ===
          normalizedDifficulty
      );

    const matchingEvents =
      events.filter(
        (event) =>
          event.difficulty?.toLowerCase() ===
          normalizedDifficulty
      );

    return {
      trails: matchingTrails,
      events: matchingEvents,
    };
  }, [difficultyFromUrl, events]);

  const isSearching = Boolean(
    searchFromUrl.trim()
  );

  const isFilteringByDifficulty =
    Boolean(difficultyFromUrl);

  const hasDifficultyResults =
    difficultyResults.trails.length > 0 ||
    difficultyResults.events.length > 0;

  return (
    <main>
      <Hero
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
      />

      {/* search results */}

      {isSearching && (
        <section className="section search-results-section">
          <div className="section-heading">
            <div>
              <p className="section-label">
                SEARCH RESULTS
              </p>

              <h2>
                Results for "{searchFromUrl}"
              </h2>
            </div>

            <button
              className="text-button"
              onClick={handleClearSearch}
            >
              Clear search
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="search-results-list">
              {searchResults.map((result) => {
                if (
                  result.type === "event"
                ) {
                  return (
                    <EventCard
                      key={`event-${result.id}`}
                      event={result.event}
                    />
                  );
                }

                return (
                  <article
                    className="search-trail-result"
                    key={`trail-${result.id}`}
                  >
                    <div className="search-trail-result-content">
                      <p className="section-label">
                        TRAIL
                      </p>

                      <h3>
                        {result.name}
                      </h3>

                      <p>
                        {result.location} ·{" "}
                        {result.difficulty}
                      </p>

                      <span>
                        {result.description}
                      </span>
                    </div>

                    <Link
                      to={`/trails/${result.id}`}
                      className="search-result-arrow"
                      aria-label={`View ${result.name}`}
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="search-empty-state">
              <SearchX size={28} />

              <h3>
                We couldn't find that adventure.
              </h3>

              <p>
                Try searching for a trail,
                location, organiser or adventure
                name.
              </p>

              <button
                className="primary-button"
                onClick={handleClearSearch}
              >
                Explore all adventures
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
      )}

      {/* difficulty results */}

      {isFilteringByDifficulty &&
        !isSearching && (
          <section className="section difficulty-results-section">
            <div className="section-heading">
              <div>
                <p className="section-label">
                  YOUR LEVEL
                </p>

                <h2>
                  {difficultyFromUrl} adventures
                </h2>
              </div>

              <button
                className="text-button"
                onClick={handleClearDifficulty}
              >
                Clear filter
                <X size={15} />
              </button>
            </div>

            {loadingEvents ? (
              <p className="event-description">
                Finding{" "}
                {difficultyFromUrl.toLowerCase()}{" "}
                adventures...
              </p>
            ) : hasDifficultyResults ? (
              <>
                {difficultyResults.trails.length >
                  0 && (
                  <div className="difficulty-results-group">
                    <div className="section-heading">
                      <div>
                        <p className="section-label">
                          TRAILS
                        </p>

                        <h2>
                          Trails for you
                        </h2>
                      </div>
                    </div>

                    {difficultyResults.trails.map(
                      (trail) => (
                        <TrailCard
                          key={trail.id}
                          trail={trail}
                        />
                      )
                    )}
                  </div>
                )}

                {difficultyResults.events.length >
                  0 && (
                  <div className="difficulty-results-group">
                    <div className="section-heading">
                      <div>
                        <p className="section-label">
                          UPCOMING EVENTS
                        </p>

                        <h2>
                          Organised adventures
                        </h2>
                      </div>
                    </div>

                    <div className="events-section">
                      {difficultyResults.events.map(
                        (event) => (
                          <EventCard
                            key={event.id}
                            event={event}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="search-empty-state">
                <SearchX size={28} />

                <h3>
                  No{" "}
                  {difficultyFromUrl.toLowerCase()}{" "}
                  adventures yet.
                </h3>

                <p>
                  Try another difficulty level or
                  explore all available adventures.
                </p>

                <button
                  className="primary-button"
                  onClick={handleClearDifficulty}
                >
                  Explore all adventures
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </section>
        )}

      {/* normal discover */}

      {!isSearching &&
        !isFilteringByDifficulty && (
          <>
            <section className="section">
              <div className="section-heading">
                <div>
                  <p className="section-label">
                    CHOOSE YOUR CHALLENGE
                  </p>

                  <h2>
                    What's your level?
                  </h2>
                </div>
              </div>

              <div className="difficulty-grid">
                {difficultyLevels.map(
                  (item) => (
                    <DifficultyCard
                      key={item.level}
                      level={item.level}
                      description={
                        item.description
                      }
                    />
                  )
                )}
              </div>
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <p className="section-label">
                    FOR YOU
                  </p>

                  <h2>
                    Your next adventure
                  </h2>
                </div>

                <Link
                  to="/"
                  className="text-button"
                >
                  View all
                  <ArrowRight size={15} />
                </Link>
              </div>

              <TrailCard
                trail={trails[0]}
              />
            </section>

            <section className="section events-section">
              <div className="section-heading">
                <div>
                  <p className="section-label">
                    HAPPENING SOON
                  </p>

                  <h2>
                    Upcoming adventures
                  </h2>
                </div>

                <Link
                  to="/events"
                  className="text-button"
                >
                  All events
                  <ArrowRight size={15} />
                </Link>
              </div>

              {loadingEvents ? (
                <p className="event-description">
                  Finding upcoming adventures...
                </p>
              ) : events.length > 0 ? (
                events
                  .slice(0, 6)
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                    />
                  ))
              ) : (
                <p className="event-description">
                  No upcoming adventures
                  available right now.
                </p>
              )}
            </section>
          </>
        )}
    </main>
  );
}

export default Discover;