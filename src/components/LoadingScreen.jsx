import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadingMessages } from "../data/messages";

export default function LoadingScreen({ onDone }) {
  const [index, setIndex] = useState(0);

  // Preload critical home images in the background while loading
  useEffect(() => {
    const preloadList = [
      "/photos/selva-jar-bg.jpg",
      "/photos/heart/us-1.jpg",
      "/photos/heart/selva-1.jpg",
      "/photos/heart/us-3.jpg",
      "/photos/heart/selva-5.jpg",
      "/photos/heart/selva-6.jpg",
    ];
    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Snappy message sequence — previously 6+ seconds, now smooth ~2 seconds
  useEffect(() => {
    const isReturning = Boolean(sessionStorage.getItem("app_has_visited"));
    const stepDuration = isReturning ? 220 : 380;
    const finalDuration = isReturning ? 350 : 550;

    if (index >= loadingMessages.length - 1) {
      sessionStorage.setItem("app_has_visited", "true");
      const finish = setTimeout(() => onDone(), finalDuration);
      return () => clearTimeout(finish);
    }
    const step = setTimeout(() => setIndex((i) => i + 1), stepDuration);
    return () => clearTimeout(step);
  }, [index, onDone]);

  const handleEnterNow = () => {
    sessionStorage.setItem("app_has_visited", "true");
    onDone();
  };

  return (
    <motion.div
      onClick={handleEnterNow}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-warm-gradient overflow-hidden cursor-pointer select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* floating sparkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${(i * 17 + 9) % 100}%`,
            left: `${(i * 29 + 4) % 100}%`,
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.2, 0.7] }}
          transition={{ duration: 2.4 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
        >
          {i % 3 === 0 ? (
            <span className="text-blush-deep text-lg">❤</span>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill="#D9A857" opacity="0.8" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* central breathing glass orb */}
      <motion.div
        className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-full glass-card animate-breathe"
        aria-hidden="true"
      >
        <span className="text-4xl sm:text-5xl">💌</span>
      </motion.div>

      <div className="h-16 mt-8 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className={
              index === loadingMessages.length - 1
                ? "font-hand text-3xl sm:text-4xl text-blush-deep"
                : "font-body text-lg sm:text-xl text-ink/80"
            }
          >
            {loadingMessages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* progress dots */}
      <div className="flex gap-2 mt-4">
        {loadingMessages.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= index ? "w-6 bg-blush-deep" : "w-1.5 bg-blush-deep/30"
            }`}
          />
        ))}
      </div>

      {/* Quick skip / tap hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        className="mt-6 text-xs sm:text-sm font-hand tracking-wider text-ink/60 hover:text-blush-deep px-3 py-1 rounded-full bg-white/40 border border-white/60 shadow-xs backdrop-blur-xs transition-all"
      >
        tap anywhere to enter ✨
      </motion.p>
    </motion.div>
  );
}
