import { useState } from "react";
import MadeWithLove from "../components/MadeWithLove";
import { motion, AnimatePresence } from "framer-motion";
import AmbientAnimations from "../components/AmbientAnimations";
import MemoryCalendar from "../components/corner/MemoryCalendar";
import Quiz from "../components/corner/Quiz";
import CallLog from "../components/corner/CallLog";
import StickerWall from "../components/corner/StickerWall";
import SwingTransition from "../components/corner/SwingTransition";

/** A little tilted polaroid used as background decor. */
function DecorPolaroid({ className, rotate }) {
  return (
    <div
      className={`hidden lg:block absolute w-16 h-20 bg-white p-1.5 pb-3 shadow-soft ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-full h-full bg-gradient-to-br from-blush-light to-lavender-light" />
          <MadeWithLove />
    </div>
  );
}

export default function OurLittleCorner({ onSwingAway }) {
  const [swinging, setSwinging] = useState(false);

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FBEFE1 0%, #FFF8F0 50%, #FBE1EB 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.9 }}
    >
      <AmbientAnimations density="light" />

      {/* scrapbook-y background decor */}
      <DecorPolaroid className="top-24 left-6" rotate={-8} />
      <DecorPolaroid className="bottom-32 right-8" rotate={10} />
      <span className="hidden sm:block absolute top-6 left-1/3 text-2xl opacity-50 rotate-[-6deg]">
        ✏️
      </span>
      <span className="hidden sm:block absolute bottom-10 left-1/4 text-2xl opacity-40 rotate-[8deg]">
        🌿
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display text-3xl sm:text-4xl text-center text-blush-deep mb-2"
        >
          Our Little Corner ❤️🌻
        </motion.h1>
        <p className="font-hand text-lg text-ink/50 text-center mb-10 sm:mb-14">
          a cozy room built from calls, quizzes, and little surprises
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <MemoryCalendar />
            <Quiz />
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <CallLog />
            <StickerWall onSwingClick={() => setSwinging(true)} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {swinging && <SwingTransition onComplete={onSwingAway} />}
      </AnimatePresence>
    </motion.div>
  );
}
