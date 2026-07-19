import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import RideTransition from "./components/RideTransition";
import HomePage from "./pages/HomePage";
import MemoriesBegin from "./pages/MemoriesBegin";

// Simple view states: "loading" -> "home" -> "riding" -> "memories"
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
        {view === "memories" && <MemoriesBegin key="memories" />}
      </AnimatePresence>
    </div>
  );
}
