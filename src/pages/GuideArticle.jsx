import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const guideContent = {
  "hiking-basics": {
    label: "START HERE",
    title: "Hiking Basics",
    intro:
      "Everything you need to know before your first hike, from choosing a trail to knowing what to expect.",
    sections: [
      {
        title: "Choose the right trail",
        text:
          "Start with a route that matches your current experience, fitness and comfort level. Pay attention to distance, elevation gain, terrain and the expected hiking time rather than choosing a trail based only on how beautiful it looks.",
      },
      {
        title: "Know what you're getting into",
        text:
          "Before leaving, understand where the trail starts, how long it is, how difficult it is and what conditions you may encounter. A route that looks short on a map can take much longer when elevation, terrain and weather are involved.",
      },
      {
        title: "Start early",
        text:
          "For longer hikes, an early start gives you more daylight and more time to deal with unexpected delays. Always check the organiser's stated meeting and departure time when joining a group hike.",
      },
      {
        title: "Listen to your body",
        text:
          "Hiking is not a race. Take breaks, drink water regularly and pay attention to signs of exhaustion. If conditions become unsafe or you are no longer comfortable continuing, turning back is a valid decision.",
      },
    ],
  },

  "what-to-pack": {
    label: "BE PREPARED",
    title: "What to Pack",
    intro:
      "A good hiking pack is simple, practical and prepared for the conditions you may encounter.",
    sections: [
      {
        title: "The essentials",
        text:
          "Carry enough water, food or snacks, a charged phone, identification, basic first aid supplies and any medication you normally need.",
      },
      {
        title: "Dress for the conditions",
        text:
          "Wear comfortable hiking footwear with good grip. Carry an extra layer and rain protection when weather conditions may change during the hike.",
      },
      {
        title: "Navigation and light",
        text:
          "Know your route before leaving. Carry a reliable way to navigate and take a headlamp or flashlight, particularly for early starts or hikes that may finish after dark.",
      },
      {
        title: "Pack for the specific trail",
        text:
          "A short forest walk and a high-altitude mountain hike do not require exactly the same equipment. Use the trail's distance, terrain, elevation and expected weather to decide what else you need.",
      },
    ],
  },

  difficulty: {
    label: "KNOW YOUR LEVEL",
    title: "Understand Difficulty",
    intro:
      "TrailQuest uses four levels to help you understand what kind of challenge a route may involve.",
    sections: [
      {
        title: "Beginner",
        text:
          "Generally suitable for people who are new to hiking. Routes tend to be shorter, with gentler terrain and less demanding elevation.",
      },
      {
        title: "Intermediate",
        text:
          "Suitable for hikers with some experience. Expect longer distances, noticeable elevation and more varied terrain.",
      },
      {
        title: "Advanced",
        text:
          "Demanding routes that may involve significant elevation, longer distances, rocky or technical terrain and changing conditions. Good preparation and appropriate fitness are important.",
      },
      {
        title: "Extreme",
        text:
          "Serious mountain or expedition-style challenges that can involve substantial distance, elevation, technical terrain or difficult environmental conditions. These routes require significant preparation and experience.",
      },
    ],
  },

  "trail-safety": {
    label: "STAY SAFE",
    title: "Trail Safety",
    intro:
      "Good preparation helps you enjoy the trail while reducing avoidable risks.",
    sections: [
      {
        title: "Check the weather",
        text:
          "Weather can change quickly, especially in mountainous areas. Check the forecast before leaving and be prepared to adjust your plans when conditions become unsafe.",
      },
      {
        title: "Tell someone your plans",
        text:
          "Let someone you trust know where you are going, who you are going with and when you expect to return.",
      },
      {
        title: "Stay aware of your surroundings",
        text:
          "Pay attention to the terrain, weather and people around you. Stay with your group when hiking as part of an organised event and follow the organiser's safety instructions.",
      },
      {
        title: "Know when to turn back",
        text:
          "A successful hike is not necessarily reaching the summit. If weather, fatigue, injury or trail conditions make continuing unsafe, turning back is the responsible choice.",
      },
    ],
  },

  "plan-your-hike": {
    label: "PLAN AHEAD",
    title: "Plan Your Hike",
    intro:
      "A few minutes of planning before you leave can make the entire adventure smoother.",
    sections: [
      {
        title: "Before the hike",
        text:
          "Confirm the date, meeting point, transport arrangements, trail distance, difficulty and expected finish time. If the hike is organised, confirm any registration requirements with the organiser.",
      },
      {
        title: "Check your equipment",
        text:
          "Make sure your footwear is suitable, your phone is charged and you have enough water, food and weather protection for the route.",
      },
      {
        title: "Share your itinerary",
        text:
          "Tell someone who is not on the hike where you are going and when you expect to return. For longer or remote hikes, make sure your emergency arrangements are clear.",
      },
      {
        title: "On the trail",
        text:
          "Pace yourself, stay hydrated and pay attention to changing conditions. Keep your group informed if you are struggling or need to stop.",
      },
    ],
  },
};

function GuideArticle() {
  const { slug } = useParams();
  const article = guideContent[slug];

  if (!article) {
    return (
      <main className="guide-article-page">
        <div className="guide-article-not-found">
          <p className="section-label">TRAIL GUIDE</p>

          <h1>Guide not found.</h1>

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
          <p className="section-label">{article.label}</p>

          <h1>{article.title}</h1>

          <p>{article.intro}</p>
        </header>

        <div className="guide-article-content">
          {article.sections.map((section, index) => (
            <section
              className="guide-article-section"
              key={section.title}
            >
              <span>0{index + 1}</span>

              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            </section>
          ))}
        </div>

        <div className="guide-article-footer">
          <Link to="/guide" className="text-button">
            <ArrowLeft size={15} />
            Back to Trail Guide
          </Link>

          <Link to="/" className="primary-button">
            Find an adventure
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}

export default GuideArticle;