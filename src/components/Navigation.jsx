import {
  CalendarDays,
  Compass,
  Mountain,
  ShoppingBag,
  UserRound,
  BookOpen,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <nav className="bottom-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Compass size={20} />
          <span>Discover</span>
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <CalendarDays size={20} />
          <span>Events</span>
        </NavLink>

        <NavLink
          to="/guide"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <BookOpen size={20} />
          <span>Guide</span>
        </NavLink>

        <NavLink
          to="/gear"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <ShoppingBag size={20} />
          <span>Gear</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <UserRound size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <nav className="desktop-nav">
        <Link
          to="/"
          className="desktop-brand"
          aria-label="TrailQuest home"
        >
          <span className="brand-mark">
            <Mountain size={19} strokeWidth={1.8} />
          </span>
          <span>TrailQuest</span>
        </Link>

        <div className="desktop-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `desktop-nav-link ${isActive ? "active" : ""}`
            }
          >
            <Compass size={17} />
            <span>Discover</span>
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              `desktop-nav-link ${isActive ? "active" : ""}`
            }
          >
            <CalendarDays size={17} />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/guide"
            className={({ isActive }) =>
              `desktop-nav-link ${isActive ? "active" : ""}`
            }
          >
            <BookOpen size={17} />
            <span>Trail Guide</span>
          </NavLink>

          <NavLink
            to="/gear"
            className={({ isActive }) =>
              `desktop-nav-link ${isActive ? "active" : ""}`
            }
          >
            <ShoppingBag size={17} />
            <span>Gear Up</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `desktop-nav-link ${isActive ? "active" : ""}`
            }
          >
            <UserRound size={17} />
            <span>Profile</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
