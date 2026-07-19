import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { cinemaMemories } from "../../data/cinemaMemories";

export default function MemoryViewer({ index, onClose, onNavigate }) {
  const memory = cinemaMemories[index];
  const isVideo = memory.type === "video";

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNavigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/95 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
      <div className="film-grain" />

      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-white/10 text-cinema-cream flex items-center justify-center hover:bg-white/20 transition-colors z-10"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Previous memory"
        className="absolute left-2 sm:left-8 w-11 h-11 rounded-full bg-white/10 text-cinema-cream flex items-center justify-center hover:bg-white/20 transition-colors z-10"
      >
        ←
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Next memory"
        className="absolute right-2 sm:right-8 w-11 h-11 rounded-full bg-white/10 text-cinema-cream flex items-center justify-center hover:bg-white/20 transition-colors z-10"
      >
        →
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={memory.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full flex flex-col items-center"
        >
          <div className="w-full aspect-video sm:aspect-[16/10] bg-gradient-to-br from-cinema-plum via-cinema-dusk to-cinema-night rounded-lg overflow-hidden flex items-center justify-center shadow-cinemaGlow">
            {memory.src ? (
              isVideo ? (
                <video src={memory.src} controls className="w-full h-full object-contain" />
              ) : (
                <img src={memory.src} alt={memory.caption} className="w-full h-full object-contain" />
              )
            ) : (
              <span className="text-6xl opacity-50">{isVideo ? "🎬" : "🌇"}</span>
            )}
          </div>

          <div className="mt-6 text-center px-4">
            <p className="font-hand text-2xl sm:text-3xl text-cinema-cream">{memory.caption}</p>
            <p className="font-body text-sm text-cinema-cream/60 mt-2 tracking-wide">
              {memory.date}
              {memory.location ? ` · ${memory.location}` : ""}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
