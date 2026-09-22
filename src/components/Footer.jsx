import { Mountain } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link
            to="/"
            className="footer-logo"
            aria-label="TrailQuest home"
          >
            <Mountain size={23} strokeWidth={1.8} />
          </Link>

          <div>
            <h2>TrailQuest</h2>
            <p>
              Find the right adventure for you.
              Discover trails, prepare with confidence,
              and explore more.
            </p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <Link to="/">Discover</Link>
            <Link to="/events">Events</Link>
            <Link to="/gear">Gear</Link>
          </div>

          <div>
            <span>TRAIL GUIDE</span>
            <Link to="/guide">Hiking Basics</Link>
            <Link to="/guide/what-to-pack">What to Pack</Link>
            <Link to="/guide/trail-safety">Trail Safety</Link>
          </div>

          <div>
            <span>ACCOUNT</span>
            <Link to="/profile">Profile</Link>
            <Link to="/guide/plan-your-hike">Plan Your Hike</Link>
            <a href="mailto:cindydetec@gmail.com">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 TrailQuest. Discover. Prepare. Adventure.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
