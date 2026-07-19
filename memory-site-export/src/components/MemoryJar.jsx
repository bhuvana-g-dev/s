import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes, birthdayJarNote } from "../data/messages";
import { isBirthday, pickForToday } from "../hooks/dateUtils";

/** The glass jar illustration, drawn in SVG, filled with tiny folded-paper shapes. */
function JarIllustration({ notesInside }) {
  return (
    <svg viewBox="0 0 220 260" className="w-48 sm:w-56 mx-auto drop-shadow-[0_8px_20px_rgba(169,141,209,0.25)]">
      {/* lid */}
      <rect x="70" y="18" width="80" height="22" rx="6" fill="#D9A857" opacity="0.9" />
      <rect x="66" y="10" width="88" height="14" rx="7" fill="#E8C07E" />
      {/* jar body (glass) */}
      <path
        d="M55 42 L165 42 L155 230 Q155 246 138 246 L82 246 Q65 246 65 230 Z"
        fill="url(#glassGradient)"
        stroke="#CBB6EA"
        strokeWidth="2"
        opacity="0.55"
      />
      <defs>
        <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7F1FB" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#EDE4F8" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* glass shine */}
      <path d="M75 55 L85 220" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.4" />

      {/* folded notes inside, stacked */}
      {notesInside.map((n, i) => (
        <g key={i} transform={`translate(${75 + (i % 3) * 22}, ${205 - Math.floor(i / 3) * 20}) rotate(${(i % 5) * 12 - 24})`}>
          <rect width="20" height="14" rx="2" fill={i % 2 === 0 ? "#FBE1EB" : "#EDE4F8"} stroke="#D9A857" strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}

/** The folded note that pops out and unfolds to reveal today's message. */
function FloatingNote({ text, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/20 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.2, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.3, opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-card rounded-2xl px-8 py-10 max-w-sm w-full text-center bg-cream/90"
      >
        <span className="absolute -top-4 -left-4 text-3xl">🌷</span>
        <p className="font-hand text-xl text-ink/50 mb-3">a little note for you</p>
        <p className="font-display text-2xl text-blush-deep leading-snug">{text}</p>
        <button
          onClick={onClose}
          className="mt-8 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors"
        >
          keep it close 💌
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function MemoryJar() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const birthday = isBirthday(today);
  const todaysNote = birthday ? birthdayJarNote : pickForToday(jarNotes, today);
  const notesInside = jarNotes.slice(0, 9); // decorative stack

  return (
    <div className="relative z-10 flex flex-col items-center mt-16 sm:mt-24 px-4">
      <h2 className="font-display text-2xl sm:text-3xl text-lavender-deep mb-2 text-center">
        A Jar Full of Little Moments
      </h2>
      <p className="font-body text-ink/60 mb-6 text-center max-w-sm">
        Tap the jar — one memory floats out every day.
      </p>

      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-deep rounded-full"
        aria-label="Open the memory jar"
      >
        <JarIllustration notesInside={notesInside} />
        {/* a note peeking out, hinting at the interaction */}
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-4 bg-blush-light rounded-sm border border-gold/60"
          animate={{ y: [0, -4, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      <AnimatePresence>
        {open && <FloatingNote text={todaysNote} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
