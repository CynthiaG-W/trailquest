import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const difficultyContent = {
  beginner: {
    level: "Beginner",
    label: "START HERE",
    title: "Your first trail starts here.",
    intro:
      "Beginner hikes are a chance to build confidence, learn your pace and discover what you enjoy about being outdoors.",
    sections: [
      {
        title: "What to expect",
        text:
          "Beginner routes generally have shorter distances, gentler terrain and less demanding elevation. They are a good place to learn basic hiking habits without taking on a major physical challenge.",
      },
      {
        title: "Who is it for?",
        text:
          "This level can work well for people who are new to hiking or returning after a long break. You do not need to be an experienced hiker, but you should still be comfortable walking for several hours.",
      },
      {
        title: "Prepare for it",
        text:
          "Wear comfortable shoes with good grip, carry enough water and snacks, check the weather and make sure your phone is charged before you leave.",
      },
    ],
  },

  intermediate: {
    level: "Intermediate",
    label: "LEVEL UP",
    title: "Ready for a little more?",
    intro:
      "Intermediate hikes introduce longer distances, more elevation and varied terrain. Preparation starts to matter more.",
    sections: [
      {
        title: "What to expect",
        text:
          "You may encounter longer climbs, descents and uneven terrain. The route can require several hours of sustained walking and a reasonable level of fitness.",
      },
      {
        title: "Who is it for?",
        text:
          "This level is suited to hikers who have completed easier routes and are comfortable managing their pace over longer distances.",
      },
      {
        title: "Prepare for it",
        text:
          "Pay attention to distance and elevation gain. Carry enough water and food, wear suitable footwear and check the weather before setting out.",
      },
    ],
  },

  advanced: {
    level: "Advanced",
    label: "STEP IT UP",
    title: "This is where the challenge begins.",
    intro:
      "Advanced routes can demand significant physical preparation and may involve steep elevation, difficult terrain or changing mountain conditions.",
    sections: [
      {
        title: "What to expect",
        text:
          "Expect longer distances, substantial elevation changes and terrain that can slow your pace. Rocky sections, steep climbs, exposed areas or difficult weather may be part of the experience.",
      },
      {
        title: "Who is it for?",
        text:
          "This level is intended for hikers who already have experience with longer and more demanding routes and understand how their body responds to sustained effort.",
      },
      {
        title: "Prepare for it",
        text:
          "Study the route, elevation and expected conditions carefully. Carry appropriate clothing, sufficient food and water, navigation equipment, first aid supplies and a reliable light.",
      },
    ],
  },

  extreme: {
    level: "Extreme",
    label: "SERIOUS ADVENTURE",
    title: "For experienced adventurers.",
    intro:
      "Extreme routes can involve serious distance, elevation, technical terrain or difficult environmental conditions.",
    sections: [
      {
        title: "What to expect",
        text:
          "These adventures can place significant demands on endurance, navigation and preparation. Conditions may change quickly and the route may involve difficult or technical terrain.",
      },
      {
        title: "Who is it for?",
        text:
          "This level is intended for experienced hikers who understand the demands of the route and have prepared specifically for the conditions they may encounter.",
      },
      {
        title: "Prepare for it",
        text:
          "Research the route thoroughly, understand the weather and terrain, carry appropriate equipment and make sure your emergency and communication plans are in place.",
      },
    ],
  },
};

function DifficultyGuide() {
  const { level } = useParams();
  const content = difficultyContent[level];

  if (!content) {
    return (
      <main className="guide-article-page">
        <div className="guide-article-not-found">
          <p className="section-label">TRAIL GUIDE</p>

          <h1>Difficulty level not found.</h1>

          <Link to="/guide" className="text-button">
            <ArrowLeft size={15} />
            Back to Trail Guide
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="guide-article-page">
      <div className="guide-article-container">

        <Link to="/guide" className="guide-back-link">
          <ArrowLeft size={15} />
          Back to Trail Guide
        </Link>

        <header className="guide-article-header">
          <p className="section-label">
            {content.label}
          </p>

          <h1>{content.title}</h1>

          <p>
            {content.intro}
          </p>
        </header>

        <div className="guide-article-content">
          {content.sections.map((section, index) => (
            <section
              className="guide-article-section"
              key={section.title}
            >
              <span>
                0{index + 1}
              </span>

              <div>
                <h2>{section.title}</h2>

                <p>
                  {section.text}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="guide-article-footer">
          <Link
            to="/guide"
            className="text-button"
          >
            <ArrowLeft size={15} />
            Back to Trail Guide
          </Link>

          <Link
            to="/"
            className="primary-button"
          >
            Find an adventure
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}

export default DifficultyGuide;