import {
  ArrowRight,
  Heart,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  isEventSaved,
  toggleSavedEvent,
} from "../utils/storage";

function EventCard({ event }) {
  const [saved, setSaved] = useState(
    isEventSaved(event.id)
  );

  const eventDate = new Date(event.date);

  const startingPrice =
    event.prices && event.prices.length > 0
      ? Math.min(
          ...event.prices.map((price) =>
            Number(price.amount)
          )
        )
      : null;

  const formattedMonth = eventDate.toLocaleString(
    "en-US",
    {
      month: "short",
    }
  );

  const eventDay = eventDate.getDate();

  const handleSave = () => {
    const isNowSaved = toggleSavedEvent(event);
    setSaved(isNowSaved);
  };

  return (
    <article className="event-card">
      <div className="event-date">
        <span>{formattedMonth}</span>
        <strong>{eventDay}</strong>
      </div>

      <div className="event-info">
        <div className="event-top">
          <span className="event-type">
            {event.difficulty}
          </span>

          {event.verificationStatus ===
            "Source Confirmed" && (
            <span className="verified">
              <ShieldCheck size={12} />
              Source Confirmed
            </span>
          )}
        </div>

        <h3>{event.name}</h3>

        <div className="event-meta">
          <span>
            <MapPin size={11} />
            {event.location}
          </span>

          <span>
            <strong>
              {startingPrice !== null
                ? `From KES ${startingPrice.toLocaleString()}`
                : "Price unavailable"}
            </strong>
          </span>
        </div>
      </div>

      <div className="event-actions">
        <button
          type="button"
          className={`event-save-button ${
            saved ? "saved" : ""
          }`}
          onClick={handleSave}
          aria-label={
            saved
              ? `Remove ${event.name} from saved events`
              : `Save ${event.name}`
          }
        >
          <Heart
            size={17}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <Link
          to={`/events/${event.id}`}
          className="event-arrow"
          aria-label={`View ${event.name}`}
        >
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default EventCard;