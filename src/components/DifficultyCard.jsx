import {
  Leaf,
  Footprints,
  Mountain,
  Flame,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const icons = {
  Beginner: Leaf,
  Intermediate: Footprints,
  Advanced: Mountain,
  Extreme: Flame,
};

function DifficultyCard({ level, description }) {
  const Icon = icons[level];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/?difficulty=${encodeURIComponent(level)}`);
  };

  return (
    <button
      type="button"
      className="difficulty-card"
      onClick={handleClick}
      aria-label={`Explore ${level} adventures`}
    >
      <div className="difficulty-icon">
        <Icon size={21} />
      </div>

      <strong>{level}</strong>

      <span>{description}</span>
    </button>
  );
}

export default DifficultyCard;