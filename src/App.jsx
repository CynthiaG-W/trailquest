import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import Discover from "./pages/Discover";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import TrailDetails from "./pages/TrailDetails";
import Gear from "./pages/Gear";
import Profile from "./pages/Profile";
import TrailGuide from "./pages/TrailGuide";
import GuideArticle from "./pages/GuideArticle";
import DifficultyGuide from "./pages/DifficultyGuide";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-shell">
          <Navigation />

          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/events/:id"
              element={<EventDetails />}
            />
            <Route
              path="/trails/:id"
              element={<TrailDetails />}
            />
            <Route path="/gear" element={<Gear />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/guide" element={<TrailGuide />} />
            <Route
              path="/guide/:slug"
              element={<GuideArticle />}
            />
            <Route
              path="/guide/difficulty/:level"
              element={<DifficultyGuide />}
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;