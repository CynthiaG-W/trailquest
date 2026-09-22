import { useEffect, useState } from "react";

import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Footprints,
  Mountain,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getExploredTrails,
  getSavedEvents,
  getSavedTrails,
  toggleSavedEvent,
  toggleSavedTrail,
} from "../utils/storage";

function Profile() {
  const [savedTrails, setSavedTrails] = useState(
    getSavedTrails()
  );

  const [savedEvents, setSavedEvents] = useState(
    getSavedEvents()
  );

  const [exploredTrails, setExploredTrails] =
    useState([]);

  // refresh profile data whenever the page becomes active
  useEffect(() => {
    const loadProfileData = () => {
      setExploredTrails(
        getExploredTrails()
      );

      setSavedTrails(
        getSavedTrails()
      );

      setSavedEvents(
        getSavedEvents()
      );
    };

    loadProfileData();

    window.addEventListener(
      "focus",
      loadProfileData
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadProfileData
      );
    };
  }, []);

  const totalDistance =
    exploredTrails.reduce(
      (total, trail) => {
        const distanceMatch =
          String(trail.distance).match(
            /[\d.]+/
          );

        if (!distanceMatch) {
          return total;
        }

        return (
          total +
          Number(distanceMatch[0])
        );
      },
      0
    );

  return (
    <main className="profile-page">
      <section className="profile-hero">
        <div className="profile-avatar">
          <UserRound
            size={34}
            strokeWidth={1.5}
          />
        </div>

        <div className="profile-intro">
          <p className="section-label">
            YOUR TRAILQUEST
          </p>

          <h1>
            Your adventure starts here.
          </h1>

          <p>
            Keep track of your favourite trails,
            discover new adventures, and build
            your hiking journey one step at a time.
          </p>
        </div>

        <div className="profile-level">
          <span>EXPERIENCE LEVEL</span>
          <strong>Beginner</strong>
        </div>
      </section>

      <section className="profile-stats">
        <div className="profile-stat">
          <Footprints size={19} />

          <div>
            <strong>
              {exploredTrails.length}
            </strong>

            <span>Trails explored</span>
          </div>
        </div>

        <div className="profile-stat">
          <CalendarDays size={19} />

          <div>
            <strong>0</strong>

            <span>Events joined</span>
          </div>
        </div>

        <div className="profile-stat">
          <Mountain size={19} />

          <div>
            <strong>
              {totalDistance % 1 === 0
                ? totalDistance
                : totalDistance.toFixed(1)}{" "}
              km
            </strong>

            <span>Distance covered</span>
          </div>
        </div>
      </section>

      <section className="profile-content">
        <div className="profile-main">

          {/* saved trails */}

          <section className="profile-section">
            <div className="profile-section-heading">
              <div>
                <p className="section-label">
                  YOUR ADVENTURES
                </p>

                <h2>
                  Saved for later.
                </h2>
              </div>

              <Bookmark size={22} />
            </div>

            {savedTrails.length === 0 ? (
              <div className="profile-empty">
                <div className="profile-empty-icon">
                  <Bookmark size={22} />
                </div>

                <h3>
                  No saved trails yet.
                </h3>

                <p>
                  When you find a trail you love,
                  save it here so you can come back
                  to it.
                </p>

                <Link
                  to="/"
                  className="text-button"
                >
                  Explore trails
                  <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div className="saved-trails-list">
                {savedTrails.map((trail) => (
                  <article
                    className="saved-trail-item"
                    key={trail.id}
                  >
                    <div>
                      <p className="saved-trail-label">
                        {trail.difficulty}
                      </p>

                      <h3>
                        {trail.name}
                      </h3>

                      <p className="saved-trail-location">
                        {trail.location} ·{" "}
                        {trail.distance}
                      </p>
                    </div>

                    <div className="saved-trail-actions">
                      <Link
                        to={`/trails/${trail.id}`}
                        className="text-button"
                      >
                        View trail
                        <ArrowRight size={15} />
                      </Link>

                      <button
                        type="button"
                        className="saved-trail-remove"
                        onClick={() => {
                          toggleSavedTrail(
                            trail
                          );

                          setSavedTrails(
                            getSavedTrails()
                          );
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* saved events */}

          <section className="profile-section">
            <div className="profile-section-heading">
              <div>
                <p className="section-label">
                  UPCOMING
                </p>

                <h2>
                  Saved events.
                </h2>
              </div>

              <CalendarDays size={22} />
            </div>

            {savedEvents.length === 0 ? (
              <div className="profile-empty">
                <div className="profile-empty-icon">
                  <CalendarDays size={22} />
                </div>

                <h3>
                  No saved events yet.
                </h3>

                <p>
                  Save an organised hike and it
                  will appear here so you can easily
                  find it again.
                </p>

                <Link
                  to="/events"
                  className="text-button"
                >
                  Explore events
                  <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div className="saved-trails-list">
                {savedEvents.map((event) => {
                  const eventDate =
                    new Date(event.date);

                  return (
                    <article
                      className="saved-trail-item"
                      key={event.id}
                    >
                      <div>
                        <p className="saved-trail-label">
                          {event.difficulty}
                        </p>

                        <h3>
                          {event.name}
                        </h3>

                        <p className="saved-trail-location">
                          {event.location} ·{" "}
                          {eventDate.toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <div className="saved-trail-actions">
                        <Link
                          to={`/events/${event.id}`}
                          className="text-button"
                        >
                          View event
                          <ArrowRight size={15} />
                        </Link>

                        <button
                          type="button"
                          className="saved-trail-remove"
                          onClick={() => {
                            toggleSavedEvent(
                              event
                            );

                            setSavedEvents(
                              getSavedEvents()
                            );
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* explored trails */}

          <section className="profile-section">
            <div className="profile-section-heading">
              <div>
                <p className="section-label">
                  YOUR JOURNEY
                </p>

                <h2>
                  Trails you've explored.
                </h2>
              </div>

              <Footprints size={22} />
            </div>

            {exploredTrails.length === 0 ? (
              <div className="profile-empty">
                <div className="profile-empty-icon">
                  <Footprints size={22} />
                </div>

                <h3>
                  No explored trails yet.
                </h3>

                <p>
                  Once you've completed a trail,
                  mark it as explored and your
                  adventure history will appear here.
                </p>

                <Link
                  to="/"
                  className="text-button"
                >
                  Find a trail
                  <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div className="saved-trails-list">
                {exploredTrails.map((trail) => (
                  <article
                    className="saved-trail-item"
                    key={trail.id}
                  >
                    <div>
                      <p className="saved-trail-label">
                        {trail.difficulty}
                      </p>

                      <h3>
                        {trail.name}
                      </h3>

                      <p className="saved-trail-location">
                        {trail.location} ·{" "}
                        {trail.distance}
                      </p>
                    </div>

                    <div className="saved-trail-actions">
                      <Link
                        to={`/trails/${trail.id}`}
                        className="text-button"
                      >
                        View trail
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

        </div>

        <aside className="profile-side">

          <div className="profile-side-card">
            <p className="section-label">
              KEEP EXPLORING
            </p>

            <h3>
              Not sure where to start?
            </h3>

            <p>
              Learn the basics, understand trail
              difficulty, and prepare for your
              next hike.
            </p>

            <Link
              to="/guide"
              className="text-button"
            >
              Open Trail Guide
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="profile-side-card profile-side-card-dark">
            <p className="section-label">
              NEXT ADVENTURE
            </p>

            <h3>
              Find an organised hike.
            </h3>

            <p>
              Discover upcoming events and find an
              adventure that matches your experience.
            </p>

            <Link
              to="/events"
              className="profile-light-button"
            >
              Browse events
              <ArrowRight size={15} />
            </Link>
          </div>

        </aside>
      </section>
    </main>
  );
}

export default Profile;