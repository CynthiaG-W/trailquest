import { Mountain, UserRound } from "lucide-react";

function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <Mountain size={20} strokeWidth={2.4} />
        </div>

        <span>TrailQuest</span>
      </div>

      <button className="profile-button" aria-label="Open profile">
        <UserRound size={19} />
      </button>
    </header>
  );
}

export default Header;