import { useState } from "react";
import MadeWithLove from "../components/MadeWithLove";
import { motion, AnimatePresence } from "framer-motion";
import AmbientAnimations from "../components/AmbientAnimations";
import MemoryCalendar from "../components/corner/MemoryCalendar";
import Quiz from "../components/corner/Quiz";
import CallLog from "../components/corner/CallLog";
import StickerWall from "../components/corner/StickerWall";
import SwingTransition from "../components/corner/SwingTransition";
import { secretSwingSticker } from "../data/stickers";

/** A little tilted polaroid used as background decor. */
function DecorPolaroid({ className, rotate }) {
  return (
    <div
      className={`hidden lg:block absolute w-16 h-20 bg-white p-1.5 pb-3 shadow-soft ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-full h-full bg-gradient-to-br from-blush-light to-lavender-light" />
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
            <StickerWall />
          </div>
        </div>

        {/* next page — sits after all boxes, not inside any of them */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <span className="font-hand text-sm text-ink/35 mb-3">psst… there's more ✨</span>
          <motion.button
            onClick={() => setSwinging(true)}
            className="group relative flex flex-col items-center gap-2 rounded-3xl px-8 py-5 bg-white/70 border border-beige-deep/30 shadow-soft focus:outline-none"
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.94 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Go to next page"
          >
            <motion.span
              className="text-4xl drop-shadow-sm"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {secretSwingSticker.icon}
            </motion.span>
            <span className="font-hand text-base text-lavender-deep">
              {secretSwingSticker.hoverText}
            </span>
            <span className="font-body text-[11px] uppercase tracking-widest text-ink/30 group-hover:text-lavender-deep transition-colors">
              tap to continue →
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {swinging && <SwingTransition onComplete={onSwingAway} />}
      </AnimatePresence>
      <MadeWithLove />
    </motion.div>
  );
}
