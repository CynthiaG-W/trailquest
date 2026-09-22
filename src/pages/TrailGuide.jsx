import {
  ArrowRight,
  Backpack,
  Compass,
  Mountain,
  Search,
  ShieldCheck,
  Route,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useMemo,
  useState,
} from "react";

const guideCards = [
  {
    slug: "hiking-basics",
    title: "Hiking Basics",
    label: "START HERE",
    description:
      "Everything you need to know before stepping onto your first trail.",
    icon: Compass,
  },
  {
    slug: "what-to-pack",
    title: "What to Pack",
    label: "PREPARE",
    description:
      "Build a practical hiking kit without carrying more than you need.",
    icon: Backpack,
  },
  {
    slug: "difficulty",
    title: "Understanding Difficulty",
    label: "CHOOSE WELL",
    description:
      "Learn what Beginner, Intermediate, Advanced and Extreme really mean.",
    icon: Mountain,
  },
  {
    slug: "trail-safety",
    title: "Trail Safety",
    label: "STAY SAFE",
    description:
      "Simple habits that help you stay prepared and confident outdoors.",
    icon: ShieldCheck,
  },
  {
    slug: "plan-your-hike",
    title: "Plan Your Hike",
    label: "PLAN AHEAD",
    description:
      "Know what to check before you leave, from weather to route details.",
    icon: Route,
  },
];

const difficultyLevels = [
  {
    level: "Beginner",
    description:
      "Easy paths, gentle terrain and shorter distances.",
    slug: "beginner",
  },
  {
    level: "Intermediate",
    description:
      "Longer routes, elevation and more varied terrain.",
    slug: "intermediate",
  },
  {
    level: "Advanced",
    description:
      "Technical terrain, longer distances and demanding climbs.",
    slug: "advanced",
  },
  {
    level: "Extreme",
    description:
      "Serious mountain challenges requiring strong preparation.",
    slug: "extreme",
  },
];

const checklistItems = [
  "Check the weather",
  "Know your route",
  "Carry enough water",
  "Wear suitable footwear",
  "Tell someone your plans",
  "Charge your phone",
  "Carry basic first aid",
  "Start with the right difficulty",
];

function TrailGuide() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const searchResults = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return [];
    }

    const guideResults = guideCards
      .filter((guide) => {
        const searchableText = [
          guide.title,
          guide.label,
          guide.description,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .map((guide) => ({
        type: "guide",
        title: guide.title,
        description: guide.description,
        path: `/guide/${guide.slug}`,
        icon: guide.icon,
      }));

    const difficultyResults =
      difficultyLevels
        .filter((difficulty) => {
          const searchableText = [
            difficulty.level,
            difficulty.description,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(query);
        })
        .map((difficulty) => ({
          type: "difficulty",
          title: difficulty.level,
          description: difficulty.description,
          path: `/guide/difficulty/${difficulty.slug}`,
          icon: Mountain,
        }));

    return [
      ...guideResults,
      ...difficultyResults,
    ];
  }, [searchTerm]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const firstResult =
      searchResults[0];

    if (firstResult) {
      navigate(firstResult.path);
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
  };

  return (
    <main className="trail-guide-page">

      {/* hero */}

      <section className="trail-guide-hero">

        <div className="trail-guide-hero-content">

          <p className="section-label">
            THE TRAIL GUIDE
          </p>

          <h1>
            Hike smarter.
            <br />
            Go <span>further.</span>
          </h1>

          <p className="trail-guide-intro">
            Practical knowledge for choosing
            the right trail, preparing properly
            and enjoying every adventure with
            confidence.
          </p>

          {/* search */}

          <div className="trail-guide-search-wrapper">

            <form
              className="trail-guide-search"
              onSubmit={handleSearchSubmit}
            >

              <div className="trail-guide-search-icon">
                <Search size={18} />
              </div>

              <div className="trail-guide-search-input">

                <span className="trail-guide-search-label">
                  SEARCH THE GUIDE
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search hiking tips, gear, safety..."
                  aria-label="Search the Trail Guide"
                />

              </div>

              <button
                type="submit"
                className="trail-guide-search-button"
                aria-label="Search the Trail Guide"
              >
                <ArrowRight size={18} />
              </button>

            </form>

            {/* search results */}

            {searchTerm.trim() && (
              <div className="trail-guide-search-results">

                {searchResults.length > 0 ? (
                  searchResults.map(
                    (result) => {
                      const Icon =
                        result.icon;

                      return (
                        <Link
                          key={`${result.type}-${result.path}`}
                          to={result.path}
                          className="trail-guide-search-result"
                          onClick={
                            handleResultClick
                          }
                        >

                          <div className="trail-guide-search-result-icon">
                            <Icon size={17} />
                          </div>

                          <div className="trail-guide-search-result-content">

                            <span>
                              {result.type ===
                              "difficulty"
                                ? "DIFFICULTY"
                                : "GUIDE"}
                            </span>

                            <strong>
                              {result.title}
                            </strong>

                            <p>
                              {result.description}
                            </p>

                          </div>

                          <ArrowRight size={16} />

                        </Link>
                      );
                    }
                  )
                ) : (
                  <div className="trail-guide-search-empty">

                    <Search size={18} />

                    <div>

                      <strong>
                        No guide found
                      </strong>

                      <p>
                        Try searching for
                        hiking, safety,
                        packing, planning
                        or difficulty.
                      </p>

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* start here */}

      <section className="trail-guide-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              START HERE
            </p>

            <h2>
              New to hiking?
              Start with the essentials.
            </h2>
          </div>

        </div>

        <div className="trail-guide-feature">

          <div className="trail-guide-feature-content">

            <p className="section-label">
              YOUR FIRST ADVENTURE
            </p>

            <h2>
              Hiking Basics
            </h2>

            <p>
              Learn how to choose a trail,
              understand what you're getting
              yourself into and prepare for
              your first adventure.
            </p>

            <Link
              to="/guide/hiking-basics"
              className="text-button"
            >
              Read the guide
              <ArrowRight size={15} />
            </Link>

          </div>

          <div className="trail-guide-feature-mark">
            <span>
              01
            </span>
          </div>

        </div>

      </section>

      {/* guide cards */}

      <section className="trail-guide-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              KNOW BEFORE YOU GO
            </p>

            <h2>
              Everything you need
              before hitting the trail.
            </h2>
          </div>

        </div>

        <div className="trail-guide-grid">

          {guideCards.map(
            (guide) => {
              const Icon =
                guide.icon;

              return (
                <Link
                  key={guide.slug}
                  to={`/guide/${guide.slug}`}
                  className="trail-guide-card"
                >

                  <div className="trail-guide-card-icon">
                    <Icon size={20} />
                  </div>

                  <p className="trail-guide-card-label">
                    {guide.label}
                  </p>

                  <h3>
                    {guide.title}
                  </h3>

                  <p>
                    {guide.description}
                  </p>

                  <span className="trail-guide-card-link">
                    Read guide
                    <ArrowRight size={14} />
                  </span>

                </Link>
              );
            }
          )}

        </div>

      </section>

      {/* difficulty */}

      <section className="trail-guide-section difficulty-guide-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              CHOOSE YOUR CHALLENGE
            </p>

            <h2>
              What does trail difficulty
              actually mean?
            </h2>
          </div>

        </div>

        <div className="difficulty-guide-list">

          {difficultyLevels.map(
            (difficulty, index) => (
              <Link
                key={difficulty.level}
                to={`/guide/difficulty/${difficulty.slug}`}
                className="difficulty-guide-item"
              >

                <span className="difficulty-guide-number">
                  0{index + 1}
                </span>

                <div>

                  <h3>
                    {difficulty.level}
                  </h3>

                  <p>
                    {difficulty.description}
                  </p>

                </div>

                <ArrowRight size={17} />

              </Link>
            )
          )}

        </div>

      </section>

      {/* checklist */}

      <section className="trail-guide-section">

        <div className="trail-guide-checklist">

          <div className="trail-guide-checklist-heading">

            <p className="section-label">
              BEFORE YOU LEAVE
            </p>

            <h2>
              Your quick
              trail checklist.
            </h2>

            <p>
              A few simple checks can make
              the difference between feeling
              prepared and feeling caught out.
            </p>

          </div>

          <div className="trail-guide-checklist-items">

            {checklistItems.map(
              (item) => (
                <div
                  className="trail-guide-check-item"
                  key={item}
                >

                  <span>
                    ✓
                  </span>

                  <p>
                    {item}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* call to action */}

      <section className="trail-guide-cta">

        <p className="section-label">
          READY WHEN YOU ARE
        </p>

        <h2>
          Find your
          next adventure.
        </h2>

        <p>
          Now that you know what to look
          for, discover trails that match
          your experience and start planning
          your next adventure.
        </p>

        <Link
          to="/"
          className="primary-button"
        >
          Explore trails
          <ArrowRight size={17} />
        </Link>

      </section>

    </main>
  );
}

export default TrailGuide;