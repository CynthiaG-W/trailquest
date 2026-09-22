import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const gearShops = [
  {
    name: "Wild Springs",
    location: "Parklands, Nairobi",
    description:
      "Outdoor gear for hiking, mountaineering, camping and trekking.",
    categories: ["Hiking", "Camping", "Mountaineering"],
    website:
      "https://www.wildsprings.co.ke/shop/nairobi-hiking-gear-store",
  },
  {
    name: "Outdoorer",
    location: "Thika Road, Nairobi",
    description:
      "Hiking gear and outdoor wear for getting ready for the trail.",
    categories: ["Hiking", "Outdoor Wear", "Equipment"],
    website: "https://www.outdoorer.co/",
  },
  {
    name: "Going Outdoor",
    location: "Galleria, Nairobi",
    description:
      "Outdoor equipment, hiking footwear and clothing for outdoor adventures.",
    categories: ["Footwear", "Clothing", "Outdoor Equipment"],
    website: "https://www.goingoutdoor.co.ke/",
  },
  {
    name: "Zana Outdoors",
    location: "Nairobi",
    description:
      "Hiking, camping and outdoor gear, with options to shop online.",
    categories: ["Hiking", "Camping", "Footwear"],
    website: "https://zanaoutdoors.com/",
  },
];

function Gear() {
  return (
    <main className="gear-page">
      <section className="gear-hero">
        <div className="gear-hero-content">
          <p className="section-label">TRAILQUEST GEAR GUIDE</p>

          <h1>
            Gear up for your
            <br />
            next adventure.
          </h1>

          <p>
            Find outdoor shops in Kenya that can help
            you get trail-ready, from hiking footwear
            to camping essentials.
          </p>
        </div>

        <div className="gear-hero-icon">
          <ShoppingBag size={52} strokeWidth={1.3} />
        </div>
      </section>

      <section className="gear-content">
        <div className="gear-section-heading">
          <div>
            <p className="section-label">CURATED FOR YOU</p>
            <h2> Shops to visit.</h2>
          </div>

          <p>
            A starting point for finding hiking and
            outdoor gear in Kenya.
          </p>
        </div>

        <div className="gear-shop-list">
          {gearShops.map((shop, index) => (
            <article className="gear-shop" key={shop.name}>
              <div className="gear-shop-number">
                0{index + 1}
              </div>

              <div className="gear-shop-main">
                <div className="gear-shop-heading">
                  <div>
                    <h3>{shop.name}</h3>

                    <p className="gear-shop-location">
                      <MapPin size={14} />
                      {shop.location}
                    </p>
                  </div>
                </div>

                <p className="gear-shop-description">
                  {shop.description}
                </p>

                <div className="gear-shop-categories">
                  {shop.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
              </div>

              <div className="gear-shop-action">
                <a
                  href={shop.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit shop
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gear-note">
        <div className="gear-note-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <p className="section-label">A NOTE FROM TRAILQUEST</p>

          <h2>Start with the essentials.</h2>

          <p>
            You don't need everything at once. The right
            footwear, comfortable clothing, water and a
            few trail essentials can make a big difference
            when you're starting out.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Gear;