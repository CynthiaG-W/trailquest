import {
  Heart,
  MapPin,
  Clock3,
  Mountain,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  isTrailSaved,
  toggleSavedTrail,
} from "../utils/storage";

function TrailCard({ trail }) {
  const [saved, setSaved] = useState(
    isTrailSaved(trail.id)
  );

  const handleSave = () => {
    const isNowSaved = toggleSavedTrail(trail);
    setSaved(isNowSaved);
  };

  return (
    <article className="trail-card">
      <div className="trail-image">
        <img
          src={trail.image}
          alt={trail.name}
        />

        <button
          type="button"
          className={`heart-button ${
            saved ? "saved" : ""
          }`}
          onClick={handleSave}
          aria-label={
            saved
              ? `Remove ${trail.name} from saved trails`
              : `Save ${trail.name}`
          }
        >
          <Heart
            size={19}
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        <span className="match-badge">
          {trail.match}% Match
        </span>
      </div>

      <div className="trail-content">
        <div className="trail-title-row">
          <div>
            <p className="trail-kicker">
              FEATURED TRAIL
            </p>

            <h3>{trail.name}</h3>
          </div>

          <span className="difficulty-pill beginner-pill">
            {trail.difficulty}
          </span>
        </div>

        <p className="trail-description">
          {trail.description}
        </p>

        <div className="trail-stats">
          <div>
            <MapPin size={14} />
            {trail.location}
          </div>

          <div>
            <Mountain size={14} />
            {trail.distance}
          </div>

          <div>
            <Clock3 size={14} />
            {trail.duration}
          </div>
        </div>

        <Link
          to={`/trails/${trail.id}`}
          className="primary-button"
        >
          Explore Trail
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default TrailCard;