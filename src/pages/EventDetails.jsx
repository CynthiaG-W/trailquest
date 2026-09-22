import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Mountain,
  ShieldCheck,
  Clock3,
} from "lucide-react";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/events/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Event not found");
        }

        return response.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("We couldn't load this adventure.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="page-placeholder">
        <p className="section-label">TRAILQUEST</p>

        <h1>Loading adventure...</h1>

        <p>
          We're getting the latest event information.
        </p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="page-placeholder">
        <p className="section-label">
          ADVENTURE NOT FOUND
        </p>

        <h1>
          We couldn't find this adventure.
        </h1>

        <Link
          to="/events"
          className="primary-button"
        >
          Back to events
        </Link>
      </main>
    );
  }

  const eventDate = new Date(event.date);

  const formattedDate = eventDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const prices = event.prices || [];

  return (
    <main className="event-details-page">

      <Link
        to="/events"
        className="back-link"
      >
        <ArrowLeft size={16} />
        Back to events
      </Link>

      <section className="event-details-hero">

        <div className="event-details-image">

          <div className="event-details-date">
            <span>
              {eventDate.toLocaleDateString(
                "en-US",
                {
                  month: "short",
                }
              )}
            </span>

            <strong>
              {eventDate.getDate()}
            </strong>
          </div>

        </div>

        <div className="event-details-content">

          <div className="event-details-tags">

            <span className="event-difficulty">
              {event.difficulty}
            </span>

            {event.verificationStatus ===
              "Source Confirmed" && (
              <span className="event-verified">
                <ShieldCheck size={14} />
                Source Confirmed
              </span>
            )}

          </div>

          <p className="section-label">
            UPCOMING ADVENTURE
          </p>

          <h1>
            {event.name}
          </h1>

          <p className="event-details-organiser">
            Organised by{" "}
            <strong>
              {event.organiser}
            </strong>
          </p>

          <p className="event-details-description">
            {event.description}
          </p>

          <div className="event-detail-grid">

            <div>
              <CalendarDays size={18} />

              <span>
                <small>DATE</small>
                {formattedDate}
              </span>
            </div>

            <div>
              <MapPin size={18} />

              <span>
                <small>LOCATION</small>
                {event.location}
              </span>
            </div>

            <div>
              <Mountain size={18} />

              <span>
                <small>DISTANCE</small>
                {event.distance || "Not specified"}
              </span>
            </div>

            <div>
              <Clock3 size={18} />

              <span>
                <small>TIME</small>
                {event.time || "Not specified"}
              </span>
            </div>

          </div>

          <div className="event-details-booking">

            <div className="event-pricing-section">

              <small>
                EVENT PRICING
              </small>

              {prices.length > 0 ? (
                <div className="event-price-list">

                  {prices.map((price) => (
                    <div
                      className="event-price-option"
                      key={price.id}
                    >

                      <div className="event-price-info">

                        <span className="event-price-category">
                          {price.category}
                        </span>

                        {price.option && (
                          <span className="event-price-option-name">
                            {price.option}
                          </span>
                        )}

                      </div>

                      <strong className="event-price-amount">
                        {price.currency}{" "}
                        {Number(
                          price.amount
                        ).toLocaleString()}
                      </strong>

                    </div>
                  ))}

                </div>
              ) : (
                <strong>
                  Price unavailable
                </strong>
              )}

            </div>

            <div className="event-registration">

              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                >
                  Register with{" "}
                  {event.organiser} ↗
                </a>
              ) : (
                <button
                  className="primary-button"
                  disabled
                >
                  Registration unavailable
                </button>
              )}

              <p className="registration-note">
                You'll be redirected to the
                organiser's website to complete
                registration.
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="event-trust-note">

        <ShieldCheck size={20} />

        <div>

          <strong>
            Event information
          </strong>

          <p>
            TrailQuest displays event information
            from the organiser's source. Always
            confirm the latest details before
            booking.
          </p>

        </div>

      </section>

    </main>
  );
}

export default EventDetails;