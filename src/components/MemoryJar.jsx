import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes, birthdayJarNote } from "../data/messages";
import { isBirthday, pickForToday } from "../hooks/dateUtils";

// ── Floating petals around the section ──────────────────────
function FloatingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute text-lg sm:text-xl select-none"
          style={{ left: `${(i * 13 + 5) % 95}%`, top: "-5%" }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: "110%", opacity: [0, 0.8, 0.8, 0], rotate: 360, x: [0, 15, -10, 0] }}
          transition={{ duration: 10 + (i % 4) * 2, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {["🌸", "🌺", "✨", "🌼", "💮"][i % 5]}
        </motion.span>
      ))}
    </div>
  );
}

// ── Glass jar SVG with notes inside ─────────────────────────
function JarSVG({ notesInside }) {
  return (
    <svg viewBox="0 0 200 250" className="w-36 sm:w-44 h-auto drop-shadow-[0_12px_30px_rgba(169,141,209,0.4)]">
      {/* lid */}
      <rect x="62" y="16" width="76" height="20" rx="6" fill="#D9A857" opacity="0.9" />
      <rect x="58" y="8" width="84" height="14" rx="7" fill="#E8C07E" />
      {/* lid shine */}
      <rect x="66" y="10" width="20" height="4" rx="2" fill="white" opacity="0.4" />
      {/* jar body */}
      <path
        d="M48 38 L152 38 L142 228 Q142 244 126 244 L74 244 Q58 244 58 228 Z"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
      />
      {/* glass shine left */}
      <path d="M66 50 L72 220" stroke="white" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      {/* glass shine right */}
      <path d="M130 55 L134 180" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
      {/* heart inside jar */}
      <text x="100" y="160" fontSize="28" textAnchor="middle" opacity="0.5">❤️</text>
      {/* folded notes */}
      {notesInside.map((_, i) => (
        <g key={i} transform={`translate(${68 + (i % 4) * 18}, ${200 - Math.floor(i / 4) * 18}) rotate(${(i % 5) * 10 - 20})`}>
          <rect width="18" height="13" rx="2"
            fill={i % 3 === 0 ? "#FBE1EB" : i % 3 === 1 ? "#EDE4F8" : "#FFF8F0"}
            stroke="#D9A857" strokeWidth="0.5" opacity="0.9" />
          <line x1="3" y1="4" x2="15" y2="4" stroke="#CBB6EA" strokeWidth="1" opacity="0.6" />
          <line x1="3" y1="7" x2="13" y2="7" stroke="#CBB6EA" strokeWidth="1" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

// ── Unfolded note popup ───────────────────────────────────────
function NotePopup({ text, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(107,81,80,0.25)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.3, rotate: -12, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-sm w-full"
      >
        {/* paper note design */}
        <div
          className="relative bg-[#FFFCF6] rounded-2xl px-7 py-10 text-center"
          style={{
            boxShadow: "0 20px 60px rgba(107,81,80,0.3), 0 2px 8px rgba(107,81,80,0.1)",
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(203,182,234,0.2) 27px, rgba(203,182,234,0.2) 28px)",
          }}
        >
          {/* paper fold corner */}
          <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-0 h-0"
              style={{ borderLeft: "40px solid transparent", borderTop: "40px solid #CBB6EA", opacity: 0.5 }} />
          </div>

          {/* washi tape top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-blush/50 rotate-[-2deg] rounded-sm" />

          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl block mb-4"
          >
            💌
          </motion.span>

          <p className="font-hand text-xs text-ink/40 mb-2 tracking-widest uppercase">
            a little note for you
          </p>

          <p className="font-display text-xl sm:text-2xl text-blush-deep leading-relaxed">
            {text}
          </p>

          {/* floating tiny hearts */}
          {["❤", "🌸", "✨"].map((h, i) => (
            <motion.span key={i}
              className="absolute text-base text-blush/60"
              style={{ top: `${20 + i * 22}%`, left: i % 2 === 0 ? "6%" : "90%" }}
              animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.4 }}
            >{h}</motion.span>
          ))}

          <button
            onClick={onClose}
            className="mt-8 font-body text-sm px-6 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #E17497 0%, #A98DD1 100%)" }}
          >
            keep it close 💌
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Memory Jar component ─────────────────────────────────
export default function MemoryJar() {
  const [open, setOpen] = useState(false);
  const today    = new Date();
  const birthday = isBirthday(today);
  const note     = birthday ? birthdayJarNote : pickForToday(jarNotes, today);
  const notesInside = jarNotes.slice(0, 12);

  return (
    <div className="relative z-10 w-full mt-10 sm:mt-16">
      {/* ── full-width photo background section ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "420px" }}>

        {/* her photo — full bleed, soft blur at edges */}
        <div className="absolute inset-0">
          <img
            src="/photos/selva-jar-bg.jpg"
            alt=""
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.75) saturate(1.1)" }}
          />
          {/* top fade into page background */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #FFF8F0 0%, transparent 20%, transparent 70%, #FFF8F0 100%)" }} />
          {/* subtle pink/lavender color overlay for warmth */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(251,225,235,0.35) 0%, rgba(237,228,248,0.3) 100%)" }} />
        </div>

        <FloatingPetals />

        {/* content on top of the photo */}
        <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6">

          {/* section title */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              🌸 A Jar Full of Little Moments
            </h2>
            <p className="font-hand text-base text-white/80 mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
              tap the jar — one memory floats out every day
            </p>
          </motion.div>

          {/* glass jar + tap */}
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="relative focus:outline-none"
            aria-label="Open memory jar"
          >
            {/* glow ring behind jar */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(244,184,206,0.5) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <JarSVG notesInside={notesInside} />

            {/* peeking note */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-5 bg-blush-light rounded-sm border border-gold/60 shadow-sm"
              animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.button>

          {/* "tap to open" hint */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="font-hand text-sm text-white/70 mt-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          >
            ✨ tap to open ✨
          </motion.p>

        </div>
      </div>

      <AnimatePresence>
        {open && <NotePopup text={note} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
