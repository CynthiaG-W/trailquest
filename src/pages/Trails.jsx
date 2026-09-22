import { ArrowLeft, ArrowRight, MapPin, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

import { trails } from "../data/trails";

function Trails() {
  return (
    <main className="trails-page">
      <div className="trails-container">

        <Link
          to="/"
          className="trail-back-link"
        >
          <ArrowLeft size={15} />
          Back to Discover
        </Link>

        <section className="trails-header">
          <div>
            <p className="section-label">
              EXPLORE TRAILS
            </p>

            <h1>
              Find your next
              <br />
              adventure.
            </h1>

            <p>
              Explore trails by difficulty, distance,
              location and the kind of experience
              you're looking for.
            </p>
          </div>

          <div className="trails-count">
            <strong>{trails.length}</strong>
            <span>TRAILS</span>
          </div>
        </section>

        <section className="trails-grid">
          {trails.map((trail) => (
            <article
              key={trail.id}
              className="trail-list-card"
            >
              <div className="trail-list-image">
                <img
                  src={trail.image}
                  alt={trail.name}
                />

                <span className="trail-list-difficulty">
                  {trail.difficulty}
                </span>
              </div>

              <div className="trail-list-content">
                <p className="trail-list-location">
                  <MapPin size={13} />
                  {trail.location}
                </p>

                <h2>{trail.name}</h2>

                <p className="trail-list-description">
                  {trail.description}
                </p>

                <div className="trail-list-meta">
                  <span>
                    <Mountain size={14} />
                    {trail.distance}
                  </span>

                  <span>
                    {trail.duration}
                  </span>
                </div>

                <Link
                  to={`/trails/${trail.id}`}
                  className="trail-list-link"
                >
                  Explore Trail
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {trails.length === 0 && (
          <div className="trails-empty">
            <p>No trails available yet.</p>
          </div>
        )}

      </div>
    </main>
  );
}

export default Trails;