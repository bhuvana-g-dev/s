import { useState } from "react";
import MadeWithLove from "../components/MadeWithLove";
import { motion } from "framer-motion";
import AmbientAnimations from "../components/AmbientAnimations";
import Scrapbook from "../components/Scrapbook";
import RollerCoaster from "../components/RollerCoaster";

export default function MemoriesBegin({ onRideComplete }) {
  const [riding, setRiding] = useState(false);

  const handleStartRide = () => {
    if (riding) return;
    setRiding(true);
    setTimeout(() => onRideComplete && onRideComplete(), 2300);
  };

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #FBEFE1 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.9 }}
    >
      <AmbientAnimations density="light" />

      {/* subtle floral corner decorations */}
      <span className="absolute top-4 left-4 text-3xl opacity-60 select-none">🌸</span>
      <span className="absolute top-4 right-4 text-3xl opacity-60 select-none">🌷</span>
      <span className="absolute bottom-4 left-4 text-3xl opacity-50 select-none">🍃</span>
      <span className="absolute bottom-4 right-4 text-3xl opacity-50 select-none">🍃</span>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl text-center text-blush-deep mb-10 sm:mb-14"
        >
          Memories Begin
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-start">
          <div className="w-full lg:w-[60%]">
            <Scrapbook />
          </div>
          <div className="w-full lg:w-[40%]">
            <RollerCoaster onStartRide={handleStartRide} riding={riding} />
          </div>
        </div>
      </div>

      {/* ride-away transition into the cinema page */}
      {riding && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-warm-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1], y: [10, 0, 0] }}
            transition={{ duration: 2, times: [0, 0.4, 1] }}
            className="font-hand text-3xl text-blush-deep text-center px-6"
          >
            stepping into our cinema of memories... 🎬❤️
          </motion.p>
        </motion.div>
      )}
          <MadeWithLove />
    </motion.div>
  );
}
