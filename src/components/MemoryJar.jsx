import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes, birthdayJarNote } from "../data/messages";
import { isBirthday, pickForToday } from "../hooks/dateUtils";

/**
 * A beautiful, hand-crafted 3D glass apothecary/memory jar
 * with curved shoulders, cork stopper, golden twine with a heart tag,
 * colorful folded love notes, and glowing fireflies inside.
 */
function JarIllustration() {
  // Folded notes piled gracefully at the bottom
  const notes = [
    { x: 72,  y: 248, rot: -14, color: "#F7CAD0", stroke: "#E08398", type: "env" },
    { x: 104, y: 252, rot: 6,   color: "#D8B4E2", stroke: "#A98DD1", type: "note" },
    { x: 136, y: 246, rot: 18,  color: "#FFF1B8", stroke: "#E2A64E", type: "env" },
    { x: 86,  y: 228, rot: 12,  color: "#EDE4F8", stroke: "#CBB6EA", type: "note" },
    { x: 118, y: 232, rot: -10, color: "#FDE2E4", stroke: "#E17497", type: "env" },
    { x: 148, y: 234, rot: 8,   color: "#FFE5D9", stroke: "#E07A5F", type: "note" },
    { x: 96,  y: 210, rot: -6,  color: "#FFF5EB", stroke: "#D4A373", type: "env" },
    { x: 128, y: 212, rot: 15,  color: "#F8B4C8", stroke: "#E8628C", type: "note" },
    { x: 112, y: 192, rot: -4,  color: "#E2ECE9", stroke: "#81B29A", type: "env" },
  ];

  // Floating magic fireflies inside the jar
  const fireflies = [
    { cx: 80,  cy: 160, r: 2.8, dur: 2.4, delay: 0 },
    { cx: 145, cy: 150, r: 2.4, dur: 2.8, delay: 0.6 },
    { cx: 115, cy: 175, r: 3.2, dur: 2.2, delay: 1.2 },
    { cx: 95,  cy: 135, r: 2.2, dur: 3.0, delay: 0.3 },
    { cx: 135, cy: 120, r: 2.6, dur: 2.6, delay: 0.9 },
  ];

  return (
    <div className="relative flex justify-center items-center">
      {/* ── Warm ambient backlight behind jar ── */}
      <div
        className="absolute w-64 sm:w-80 h-80 sm:h-96 rounded-full pointer-events-none -z-10 blur-2xl opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(254, 215, 170, 0.45) 0%, rgba(225, 116, 151, 0.22) 45%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 240 310"
        className="w-56 sm:w-64 md:w-72 h-auto overflow-visible filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
        fill="none"
      >
        <defs>
          {/* Glass body gradient */}
          <linearGradient id="jarGlassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="12%" stopColor="#F5EDFA" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="88%" stopColor="#EAE0F5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>

          {/* Glass edge stroke */}
          <linearGradient id="glassEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D8C2EE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B699D8" stopOpacity="0.75" />
          </linearGradient>

          {/* Cork stopper texture gradient */}
          <linearGradient id="corkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2B47D" />
            <stop offset="40%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#B37D4A" />
          </linearGradient>

          {/* Gold tag ribbon */}
          <linearGradient id="tagGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE89E" />
            <stop offset="50%" stopColor="#F6C15C" />
            <stop offset="100%" stopColor="#D9882E" />
          </linearGradient>

          {/* Firefly glow */}
          <radialGradient id="fireflyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFF1B8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F6C15C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Base floor shadow ── */}
        <ellipse cx="120" cy="292" rx="72" ry="12" fill="#200B15" opacity="0.35" />

        {/* ── CORK STOPPER ── */}
        {/* Cork bevel top */}
        <ellipse cx="120" cy="22" rx="36" ry="6" fill="#ECC391" stroke="#B37D4A" strokeWidth="0.8" />
        {/* Cork body */}
        <path
          d="M 84 22 L 87 48 C 87 50 95 53 120 53 C 145 53 153 50 153 48 L 156 22 Z"
          fill="url(#corkGrad)"
          stroke="#9C6B3A"
          strokeWidth="1"
        />
        {/* Cork texture notches */}
        <line x1="96" y1="28" x2="104" y2="29" stroke="#9C6B3A" strokeWidth="1" opacity="0.5" />
        <line x1="134" y1="33" x2="144" y2="34" stroke="#9C6B3A" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="41" x2="122" y2="42" stroke="#9C6B3A" strokeWidth="1" opacity="0.4" />

        {/* ── GLASS JAR INNER VOLUME ── */}
        {/* Main curved apothecary silhouette */}
        <path
          d="M 82 52 
             C 74 52 70 56 68 64
             C 66 72 70 82 66 94
             C 58 112 36 122 36 148
             L 36 254
             C 36 280 62 288 120 288
             C 178 288 204 280 204 254
             L 204 148
             C 204 122 182 112 174 94
             C 170 82 174 72 172 64
             C 170 56 166 52 158 52
             Z"
          fill="url(#jarGlassBody)"
          stroke="url(#glassEdge)"
          strokeWidth="2.2"
        />

        {/* Thick curved glass base */}
        <path
          d="M 44 256 C 44 278 72 284 120 284 C 168 284 196 278 196 256 C 180 268 150 274 120 274 C 90 274 60 268 44 256 Z"
          fill="#FFFFFF"
          opacity="0.28"
        />

        {/* ── FOLDED NOTES & ORIGAMI INSIDE THE JAR ── */}
        <g>
          {notes.map((n, i) => (
            <motion.g
              key={i}
              transform={`translate(${n.x}, ${n.y}) rotate(${n.rot})`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Folded paper rectangle */}
              <rect
                x="-14"
                y="-9"
                width="28"
                height="18"
                rx="3"
                fill={n.color}
                stroke={n.stroke}
                strokeWidth="1.2"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
              />
              {/* Envelope flap / folded lines */}
              {n.type === "env" ? (
                <>
                  <path
                    d="M -14 -9 L 0 2 L 14 -9"
                    stroke={n.stroke}
                    strokeWidth="1"
                    fill="none"
                    opacity="0.8"
                  />
                  {/* Tiny heart sticker seal on envelope */}
                  <circle cx="0" cy="2" r="2.2" fill="#E17497" />
                </>
              ) : (
                <>
                  <line x1="-9" y1="-3" x2="9" y2="-3" stroke={n.stroke} strokeWidth="1" opacity="0.6" />
                  <line x1="-9" y1="2" x2="6" y2="2" stroke={n.stroke} strokeWidth="1" opacity="0.6" />
                </>
              )}
            </motion.g>
          ))}
        </g>

        {/* ── MAGIC GLOWING FIREFLIES / SPARKLES INSIDE GLASS ── */}
        {fireflies.map((f, i) => (
          <motion.g
            key={`ff-${i}`}
            animate={{
              y: [0, -8, 0],
              x: [0, i % 2 === 0 ? 4 : -4, 0],
            }}
            transition={{
              duration: f.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: f.delay,
            }}
          >
            {/* Halo */}
            <circle cx={f.cx} cy={f.cy} r={f.r * 2.8} fill="url(#fireflyGlow)" opacity="0.75" />
            {/* Core */}
            <circle cx={f.cx} cy={f.cy} r={f.r} fill="#FFFFFF" />
          </motion.g>
        ))}

        {/* ── GLASS RIM & LIP DETAIL ── */}
        <ellipse
          cx="120"
          cy="52"
          rx="40"
          ry="7"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          opacity="0.9"
        />
        <ellipse
          cx="120"
          cy="54"
          rx="38"
          ry="6"
          fill="#D8C2EE"
          opacity="0.25"
        />

        {/* ── TWINE & HANGING TAG TIED AROUND NECK ── */}
        <path
          d="M 72 68 Q 120 74 168 68"
          stroke="#8C6239"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 74 71 Q 120 77 166 71"
          stroke="#B3804D"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Tag string dropping from neck to tag */}
        <path
          d="M 142 70 Q 150 82 148 94"
          stroke="#8C6239"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Little heart parchment tag */}
        <g transform="translate(136, 94) rotate(12)">
          <rect
            x="0"
            y="0"
            width="26"
            height="18"
            rx="4"
            fill="#FFF7E6"
            stroke="#D4A373"
            strokeWidth="1"
            filter="drop-shadow(0 2px 6px rgba(0,0,0,0.3))"
          />
          <circle cx="4" cy="4" r="1.5" fill="#8C6239" />
          <text x="13" y="12" fontSize="8" textAnchor="middle" fill="#E17497" fontWeight="bold">
            ♡ for u
          </text>
        </g>

        {/* ── GLASS LIGHT REFLECTIONS (Realistic curve highlights) ── */}
        {/* Left long highlight curve */}
        <path
          d="M 46 145 L 46 245 C 46 258 54 268 70 274"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Left thin secondary reflection */}
        <path
          d="M 54 150 L 54 235"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Right shoulder glint */}
        <path
          d="M 194 145 L 194 245"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Top shoulder curve highlight */}
        <path
          d="M 74 94 Q 100 86 120 86"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/**
 * The folded note that pops out and unfolds to reveal today's message.
 */
function FloatingNote({ text, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.3, rotate: -8, y: 40, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
        exit={{ scale: 0.3, rotate: 6, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-3xl p-7 sm:p-10 max-w-md w-full text-center border border-amber-200/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{
          background:
            "linear-gradient(135deg, #FFF9F0 0%, #FFF2E2 50%, #FDE4EB 100%)",
        }}
      >
        {/* Wax seal decoration on top */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-blush-deep border-2 border-white/60 shadow-lg flex items-center justify-center text-xl select-none">
          💌
        </div>

        <p className="font-hand text-lg sm:text-xl text-ink/60 mt-2 mb-2">
          a little secret kept just for today...
        </p>

        {/* Parchment divider */}
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4" />

        <p className="font-display text-xl sm:text-2xl text-ink font-medium leading-relaxed px-2">
          "{text}"
        </p>

        <p className="font-hand text-base text-blush-deep font-semibold mt-4">
          folded with love, always. ❤️
        </p>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 font-body font-semibold text-sm px-7 py-2.5 rounded-full bg-gradient-to-r from-blush-deep to-lavender-deep text-white shadow-md hover:opacity-95 transition-opacity"
        >
          keep it close 🌻
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function MemoryJar() {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const birthday = isBirthday(today);
  const todaysNote = birthday ? birthdayJarNote : pickForToday(jarNotes, today);

  return (
    <div className="relative z-10 flex flex-col items-center mt-12 sm:mt-16 px-4">
      {/* ── Section Title & Hint ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-3 sm:mb-4"
      >
        <h2
          className="font-cinzel text-xl sm:text-3xl font-bold tracking-[0.06em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF2DE 50%, #F6C88D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Little Jar of Moments
        </h2>
        <p className="font-hand text-base sm:text-xl text-white/80 mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          Folded safe inside. Tap the jar to reveal today's note... 💌✨
        </p>
      </motion.div>

      {/* ── Interactive Memory Jar Button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
        className="relative cursor-pointer focus:outline-none rounded-3xl group"
        aria-label="Open the memory jar"
      >
        <JarIllustration />

        {/* Interactive floating invitation pill */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], y: [0, -3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#F6C15C]/60 shadow-lg flex items-center gap-1.5 whitespace-nowrap group-hover:bg-black/60 transition-colors"
        >
          <span className="text-xs">✨</span>
          <span className="font-hand text-sm sm:text-base font-semibold text-[#FFF3DE]">
            tap to open today's note
          </span>
          <span className="text-xs">💌</span>
        </motion.div>
      </motion.button>

      {/* ── Unfolded Note Modal ── */}
      <AnimatePresence>
        {open && <FloatingNote text={todaysNote} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
