import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Music control button. No audio track is wired up yet — this simply
 * toggles a visual "playing" state so the control is ready for a real
 * <audio> source later (see README for how to add one).
 */
export default function MusicControl() {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.button
      onClick={() => setPlaying((p) => !p)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed top-5 left-5 sm:top-8 sm:left-8 z-30 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-cinema-cream flex items-center justify-center hover:bg-white/20 transition-colors"
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Pause music" : "Play music"}
    >
      <motion.span
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: "linear" }}
        className="text-lg"
      >
        {playing ? "🎵" : "🎶"}
      </motion.span>
    </motion.button>
  );
}
