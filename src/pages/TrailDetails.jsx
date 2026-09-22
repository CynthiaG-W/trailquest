import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  Mountain,
  ShieldCheck,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { trails } from "../data/trails";

import {
  isTrailExplored,
  isTrailSaved,
  toggleExploredTrail,
  toggleSavedTrail,
} from "../utils/storage";

function TrailDetails() {
  const { id } = useParams();

  const trail = trails.find(
    (item) => String(item.id) === String(id)
  );

  const [explored, setExplored] = useState(
    trail ? isTrailExplored(trail.id) : false
  );

  const [saved, setSaved] = useState(
    trail ? isTrailSaved(trail.id) : false
  );

  if (!trail) {
    return (
      <main className="trail-details-page">
        <div className="trail-details-not-found">
          <p className="section-label">
            TRAILQUEST
          </p>

          <h1>Trail not found.</h1>

          <Link
            to="/"
            className="text-button"
          >
            <ArrowLeft size={15} />
            Back to Discover
          </Link>
        </div>
      </main>
    );
  }

  const handleSave = () => {
    const isNowSaved =
      toggleSavedTrail(trail);

    setSaved(isNowSaved);
  };

  const handleMarkExplored = () => {
    const isNowExplored =
      toggleExploredTrail(trail);

    setExplored(isNowExplored);
  };

  return (
    <main className="trail-details-page">
      <div className="trail-details-container">

        {/* back */}

        <Link
          to="/"
          className="trail-back-link"
        >
          <ArrowLeft size={15} />
          Back to Discover
        </Link>

        {/* hero */}

        <section className="trail-details-hero">

          <div className="trail-details-image">
            <img
              src={trail.image}
              alt={trail.name}
            />

            <button
              type="button"
              className={`heart-button trail-details-save ${
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
                size={20}
                fill={
                  saved
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

            <span className="trail-details-match">
              {trail.match}% Match
            </span>
          </div>

          <div className="trail-details-intro">

            <div className="trail-details-topline">
              <p className="section-label">
                FEATURED TRAIL
              </p>

              <span className="difficulty-pill beginner-pill">
                {trail.difficulty}
              </span>
            </div>

            <h1>{trail.name}</h1>

            <p className="trail-details-location">
              <MapPin size={15} />
              {trail.location}
            </p>

            <p className="trail-details-description">
              {trail.description}
            </p>

            <div className="trail-details-stats">

              <div>
                <Mountain size={17} />

                <span>
                  <small>DISTANCE</small>
                  {trail.distance}
                </span>
              </div>

              <div>
                <Clock3 size={17} />

                <span>
                  <small>EST. TIME</small>
                  {trail.duration}
                </span>
              </div>

              <div>
                <ShieldCheck size={17} />

                <span>
                  <small>LEVEL</small>
                  {trail.difficulty}
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* information */}

        <section className="trail-details-content">

          <div className="trail-details-main">

            <p className="section-label">
              ABOUT THIS TRAIL
            </p>

            <h2>
              A gentle introduction
              to the trail.
            </h2>

            <p>
              {trail.description}
            </p>

            <p>
              Karura Forest offers a relaxed outdoor
              experience close to Nairobi, making it
              a useful option for hikers who want to
              build confidence before taking on longer
              or more demanding routes.
            </p>

          </div>

          <aside className="trail-details-side">

            <div className="trail-details-tip">

              <p className="section-label">
                BEFORE YOU GO
              </p>

              <h3>
                Prepare for your adventure.
              </h3>

              <ul>
                <li>Check the weather</li>
                <li>Carry enough water</li>
                <li>Wear comfortable footwear</li>
                <li>Keep your phone charged</li>
              </ul>

              <Link
                to="/guide/what-to-pack"
                className="text-button"
              >
                What to pack
                <ArrowRight size={15} />
              </Link>

            </div>

          </aside>

        </section>

        {/* trail activity */}

        <section className="trail-details-activity">

          <div>
            <p className="section-label">
              YOUR PROGRESS
            </p>

            <h2>
              Have you explored this trail?
            </h2>

            <p>
              Mark it as explored after your
              adventure to keep track of your
              hiking journey.
            </p>
          </div>

          <button
            type="button"
            className={`trail-explored-button ${
              explored ? "explored" : ""
            }`}
            onClick={handleMarkExplored}
          >
            <CheckCircle2 size={18} />

            {explored
              ? "Trail explored"
              : "Mark as explored"}
          </button>

        </section>

        {/* cta */}

        <section className="trail-details-cta">

          <div>
            <p className="section-label">
              READY TO EXPLORE?
            </p>

            <h2>
              Find your next adventure.
            </h2>
          </div>

          <Link
            to="/events"
            className="primary-button"
          >
            Browse events
            <ArrowRight size={16} />
          </Link>

        </section>

      </div>
    </main>
  );
}

export default TrailDetails;