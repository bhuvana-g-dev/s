import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import RideTransition from "./components/RideTransition";
import HomePage from "./pages/HomePage";
import MemoriesBegin from "./pages/MemoriesBegin";
import CinemaOfMemories from "./pages/CinemaOfMemories";
import OurLittleCorner from "./pages/OurLittleCorner";
import BirthdaySurpriseRoom from "./pages/BirthdaySurpriseRoom";
import HeartNav from "./components/HeartNav";

// Direct-jump views (skips cinematic transitions when using the heart nav)
const DIRECT_PAGES = ["home", "memories", "cinema", "corner", "birthday"];

export default function App() {
  const [view, setView] = useState("loading");

  // Called by HeartNav — jump directly without a transition screen
  const handleNavJump = (key) => {
    if (DIRECT_PAGES.includes(key)) setView(key);
  };

  return (
    <div className="font-body">
      <AnimatePresence mode="wait">
        {view === "loading" && (
          <LoadingScreen key="loading" onDone={() => setView("home")} />
        )}
        {view === "home" && (
          <HomePage key="home" onRideAway={() => setView("riding")} />
        )}
        {view === "riding" && (
          <RideTransition key="riding" onComplete={() => setView("memories")} />
        )}
        {view === "memories" && (
          <MemoriesBegin key="memories" onRideComplete={() => setView("cinema")} />
        )}
        {view === "cinema" && (
          <CinemaOfMemories key="cinema" onContinue={() => setView("corner")} />
        )}
        {view === "corner" && (
          <OurLittleCorner key="corner" onSwingAway={() => setView("birthday")} />
        )}
        {view === "birthday" && <BirthdaySurpriseRoom key="birthday" />}
      </AnimatePresence>

      {/* ── global heart navigation — always on top, never during loading/transitions ── */}
      <HeartNav currentView={view} onNavigate={handleNavJump} />
    </div>
  );
}
