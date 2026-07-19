import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import RideTransition from "./components/RideTransition";
import HomePage from "./pages/HomePage";
import MemoriesBegin from "./pages/MemoriesBegin";
import CinemaOfMemories from "./pages/CinemaOfMemories";
import NextChapter from "./pages/NextChapter";

// View flow: loading -> home -> riding -> memories -> cinema -> next
export default function App() {
  const [view, setView] = useState("loading");

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
          <CinemaOfMemories key="cinema" onContinue={() => setView("next")} />
        )}
        {view === "next" && <NextChapter key="next" />}
      </AnimatePresence>
    </div>
  );
}
