import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  Mountain,
  ArrowRight,
} from "lucide-react";

const filters = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Extreme",
];

function Events() {
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/events/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "We couldn't load the latest adventures. Please try again."
        );
        setLoading(false);
      });
  }, []);

  const getStartingPrice = (event) => {
    if (!event.prices || event.prices.length === 0) {
      return null;
    }

    return Math.min(
      ...event.prices.map((price) => Number(price.amount))
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesDifficulty =
      activeFilter === "All" ||
      event.difficulty === activeFilter;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      event.name.toLowerCase().includes(search) ||
      event.location.toLowerCase().includes(search) ||
      event.organiser.toLowerCase().includes(search);

    return matchesDifficulty && matchesSearch;
  });

  return (
    <main className="events-page">
      <section className="events-hero">
        <p className="section-label">
          FIND YOUR NEXT ADVENTURE
        </p>

        <h1>
          Hikes worth
          <em> showing up for.</em>
        </h1>

        <p className="events-intro">
          Discover upcoming hiking adventures,
          organised by communities and outdoor
          groups.
        </p>
      </section>

      <section className="events-controls">
        <div className="events-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search events, places or organisers..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="event-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "event-filter active"
                  : "event-filter"
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="events-results">
        <div className="events-results-heading">
          <div>
            <p className="section-label">
              UPCOMING
            </p>

            <h2>
              {loading
                ? "Loading adventures..."
                : `${filteredEvents.length} adventures`}
            </h2>
          </div>

          {!loading && !error && (
            <div className="event-status">
              <span className="status-dot" />
              Upcoming only
            </div>
          )}
        </div>

        {loading && (
          <div className="events-empty">
            <Clock3 size={30} />

            <h3>Finding your next adventure...</h3>

            <p>
              We're loading the latest events.
            </p>
          </div>
        )}

        {error && (
          <div className="events-empty">
            <Clock3 size={30} />

            <h3>Something went wrong</h3>

            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const startingPrice =
                  getStartingPrice(event);

                return (
                  <article
                    className="event-card-large"
                    key={event.id}
                  >
                    <div className="event-date-large">
                      <span>
                        {new Date(
                          event.date
                        ).toLocaleString("en-US", {
                          month: "short",
                        })}
                      </span>

                      <strong>
                        {new Date(
                          event.date
                        ).getDate()}
                      </strong>
                    </div>

                    <div className="event-card-main">
                      <div className="event-card-top">
                        <span
                          className={`event-difficulty ${event.difficulty.toLowerCase()}`}
                        >
                          {event.difficulty}
                        </span>

                        {event.verificationStatus ===
                          "Source Confirmed" && (
                          <span className="event-verified">
                            <CheckCircle2 size={13} />
                            Source Confirmed
                          </span>
                        )}
                      </div>

                      <h3>{event.name}</h3>

                      <p className="event-organiser">
                        by {event.organiser}
                      </p>

                      <p className="event-description">
                        {event.description}
                      </p>

                      <div className="event-details">
                        <span>
                          <MapPin size={14} />
                          {event.location}
                        </span>

                        <span>
                          <Mountain size={14} />
                          {event.distance}
                        </span>

                        <span>
                          <CalendarDays size={14} />
                          {new Date(
                            event.date
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      <div className="event-card-bottom">
                        <div>
                          <small>FROM</small>

                          <strong>
                            {startingPrice !== null
                              ? `KES ${startingPrice.toLocaleString()}`
                              : "Price unavailable"}
                          </strong>
                        </div>

                        <Link
                          to={`/events/${event.id}`}
                          className="event-view-button"
                        >
                          View adventure
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="events-empty">
                <Clock3 size={30} />

                <h3>No adventures found</h3>

                <p>
                  Try another location or difficulty
                  level.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Events;