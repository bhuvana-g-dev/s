import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes, birthdayJarNote } from "../data/messages";
import { isBirthday, pickForToday } from "../hooks/dateUtils";

/**
 * Luminous Golden Butterfly with fluttering wings and radiant aura.
 * Matches the glowing butterflies in the user's reference mockup.
 */
function GlowingButterfly({ cx, cy, size = 18, rot = 0, delay = 0 }) {
  const s = size / 20;
  return (
    <motion.g
      transform={`translate(${cx}, ${cy}) rotate(${rot})`}
      animate={{
        y: [0, -6, 0],
        rotate: [rot - 4, rot + 4, rot - 4],
        scale: [s * 0.94, s * 1.08, s * 0.94],
      }}
      transition={{
        duration: 2.6 + (delay % 2) * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {/* Outer warm golden aura */}
      <circle r={size * 0.9} fill="url(#butterflyAura)" opacity="0.8" />

      {/* Radiant golden wings */}
      <g filter="drop-shadow(0 0 6px rgba(255, 215, 64, 0.95))">
        {/* Left upper wing */}
        <path
          d="M 0 0 C -4 -8 -11 -7 -10 -2 C -9 2 -2 2 0 0 Z"
          fill="#FFF9C4"
        />
        {/* Left lower wing */}
        <path
          d="M 0 0 C -3 3 -8 4 -7 1 C -6 -1 -1 -1 0 0 Z"
          fill="#FFE082"
        />
        {/* Right upper wing */}
        <path
          d="M 0 0 C 4 -8 11 -7 10 -2 C 9 2 2 2 0 0 Z"
          fill="#FFF9C4"
        />
        {/* Right lower wing */}
        <path
          d="M 0 0 C 3 3 8 4 7 1 C 6 -1 1 -1 0 0 Z"
          fill="#FFE082"
        />
        {/* White-hot center body */}
        <ellipse cx="0" cy="0" rx="1.2" ry="3.5" fill="#FFFFFF" />
      </g>
    </motion.g>
  );
}

/**
 * Radiant Golden Heart Mote glowing brightly inside the jar.
 */
function GlowingHeartMote({ cx, cy, size = 16, rot = 0, delay = 0 }) {
  const s = size / 20;
  return (
    <motion.g
      transform={`translate(${cx}, ${cy}) rotate(${rot})`}
      animate={{
        y: [0, -5, 0],
        scale: [s * 0.92, s * 1.08, s * 0.92],
        rotate: [rot - 3, rot + 3, rot - 3],
      }}
      transition={{
        duration: 2.4 + (delay % 2) * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {/* Soft warm aura */}
      <circle r={size * 0.9} fill="url(#heartAura)" opacity="0.85" />

      {/* Radiant golden heart */}
      <g filter="drop-shadow(0 0 8px rgba(255, 215, 64, 0.9))">
        <path
          d="M 0 8 C -5.5 3 -9 0.5 -9 -3 C -9 -5.8 -6.8 -8 -4 -8 C -2.3 -8 -0.8 -7.2 0 -6 C 0.8 -7.2 2.3 -8 4 -8 C 6.8 -8 9 -5.8 9 -3 C 9 0.5 5.5 3 0 8 Z"
          fill="#FFF59D"
        />
        {/* Center glint */}
        <circle cx="-1.5" cy="-3.5" r="1.5" fill="#FFFFFF" opacity="0.9" />
      </g>
    </motion.g>
  );
}

/**
 * 4-Point Sparkling Star Glint centered at (0, 0)
 */
function StarSparkle({ cx, cy, size = 14, delay = 0 }) {
  const r = size / 2;
  return (
    <motion.g
      transform={`translate(${cx}, ${cy})`}
      animate={{
        scale: [0.85, 1.25, 0.85],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 2.2 + (delay % 2) * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <circle r={r * 1.6} fill="url(#starHalo)" />
      <path
        d={`M 0 ${-r} Q 0 0 ${-r} 0 Q 0 0 0 ${r} Q 0 0 ${r} 0 Q 0 0 0 ${-r} Z`}
        fill="#FFFFFF"
      />
      <circle r={r * 0.3} fill="#FFEAA7" />
    </motion.g>
  );
}

/**
 * A petite, chubby glass mason jar with radiant glowing butterflies & golden hearts:
 * - Proportional compact mason jar silhouette
 * - Warm golden floodlight & inner glow
 * - Glowing golden butterflies swirling in the air and inside
 * - Cluster of radiant golden hearts nestled within the glass
 * - Cork stopper at top with pastel pink ribbon & bow
 * - Dangling white gift tag with pink heart
 * - Scaled down to fit harmoniously into the page layout without crowding the portrait
 */
function JarIllustration() {
  // Outside swirling glowing butterflies matching reference photo
  const outsideButterflies = [
    { cx: 120, cy: 16,  size: 19, rot: 0,   delay: 0 },   // hovering right above the cork
    { cx: 28,  cy: 76,  size: 17, rot: -18, delay: 0.5 }, // upper left
    { cx: 16,  cy: 136, size: 18, rot: 14,  delay: 1.0 }, // mid left
    { cx: 32,  cy: 194, size: 16, rot: -22, delay: 0.3 }, // lower left
    { cx: 212, cy: 74,  size: 17, rot: 22,  delay: 0.8 }, // upper right (near bow)
    { cx: 224, cy: 134, size: 18, rot: -15, delay: 0.2 }, // mid right
    { cx: 208, cy: 190, size: 16, rot: 18,  delay: 1.1 }, // lower right
  ];

  // Inside radiant golden hearts & butterfly motes
  const insideHearts = [
    { cx: 120, cy: 142, size: 21, rot: 0,   delay: 0 },
    { cx: 98,  cy: 162, size: 18, rot: -10, delay: 0.4 },
    { cx: 142, cy: 166, size: 19, rot: 12,  delay: 0.8 },
    { cx: 114, cy: 186, size: 17, rot: -6,  delay: 0.2 },
    { cx: 134, cy: 196, size: 16, rot: 8,   delay: 1.0 },
    { cx: 88,  cy: 180, size: 15, rot: -14, delay: 0.6 },
    { cx: 152, cy: 182, size: 15, rot: 16,  delay: 0.3 },
  ];

  return (
    <div className="relative flex justify-center items-center select-none">
      {/* ── Warm ambient backlight behind jar ── */}
      <div
        className="absolute w-56 sm:w-64 h-56 sm:h-64 rounded-full pointer-events-none -z-10 blur-3xl opacity-85"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 215, 64, 0.6) 0%, rgba(255, 160, 50, 0.28) 45%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 240 260"
        className="w-40 sm:w-48 md:w-52 h-auto overflow-visible filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
        fill="none"
      >
        <defs>
          {/* Glass body subtle luminous gradient */}
          <linearGradient id="jarGlassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="10%" stopColor="#FFF7E6" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="90%" stopColor="#FFF2D6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.38" />
          </linearGradient>

          {/* Glass edge stroke */}
          <linearGradient id="glassEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFE082" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFCA28" stopOpacity="0.85" />
          </linearGradient>

          {/* Cork stopper texture gradient */}
          <linearGradient id="corkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8BE88" />
            <stop offset="35%" stopColor="#D8A56E" />
            <stop offset="100%" stopColor="#B37C46" />
          </linearGradient>

          {/* Pastel Pink Ribbon gradient */}
          <linearGradient id="pinkRibbonGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB8C9" />
            <stop offset="50%" stopColor="#FF9FB2" />
            <stop offset="100%" stopColor="#FF7A97" />
          </linearGradient>

          {/* Golden wire gradient */}
          <linearGradient id="goldWire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="50%" stopColor="#F6C15C" />
            <stop offset="100%" stopColor="#E29E38" />
          </linearGradient>

          {/* Intense golden inner jar glow */}
          <radialGradient id="jarInnerWarmGlow" cx="50%" cy="65%" r="60%">
            <stop offset="0%" stopColor="#FFF2A6" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FFD15C" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#FF9F43" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
          </radialGradient>

          {/* Butterfly golden aura */}
          <radialGradient id="butterflyAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFE082" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFB300" stopOpacity="0" />
          </radialGradient>

          {/* Heart golden aura */}
          <radialGradient id="heartAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FFD54F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFA000" stopOpacity="0" />
          </radialGradient>

          {/* Star sparkle radiant halo */}
          <radialGradient id="starHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFF2B2" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#F6C15C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F6C15C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Floor shadow beneath jar ── */}
        <ellipse cx="120" cy="242" rx="72" ry="10" fill="#200B15" opacity="0.36" />

        {/* ── OUTSIDE SWIRLING GLOWING BUTTERFLIES ── */}
        {outsideButterflies.map((b, i) => (
          <GlowingButterfly
            key={`ob-${i}`}
            cx={b.cx}
            cy={b.cy}
            size={b.size}
            rot={b.rot}
            delay={b.delay}
          />
        ))}

        {/* Floating golden sparkle crosses in air */}
        <motion.text
          x="36" y="112" fontSize="12" fill="#FFE082"
          animate={{ opacity: [0.35, 1, 0.35], y: [112, 106, 112] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.text>
        <motion.text
          x="204" y="160" fontSize="11" fill="#FFD54F"
          animate={{ opacity: [0.3, 0.95, 0.3], y: [160, 154, 160] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >✦</motion.text>
        <motion.text
          x="100" y="24" fontSize="11" fill="#FFE082"
          animate={{ opacity: [0.3, 0.9, 0.3], y: [24, 20, 24] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >✦</motion.text>

        {/* ── CORK STOPPER (TOP) ── */}
        {/* Cork bevel top */}
        <ellipse cx="120" cy="38" rx="44" ry="8" fill="#ECC391" stroke="#B37D4A" strokeWidth="0.8" />
        {/* Cork body */}
        <path
          d="M 76 38 L 80 60 C 80 62 96 64 120 64 C 144 64 160 62 160 60 L 164 38 Z"
          fill="url(#corkGrad)"
          stroke="#9C6B3A"
          strokeWidth="1"
        />
        {/* Cork texture notches */}
        <line x1="90" y1="44" x2="100" y2="45" stroke="#9C6B3A" strokeWidth="1" opacity="0.45" />
        <line x1="134" y1="49" x2="146" y2="50" stroke="#9C6B3A" strokeWidth="1" opacity="0.45" />
        <line x1="108" y1="54" x2="122" y2="55" stroke="#9C6B3A" strokeWidth="1" opacity="0.4" />

        {/* ── CHUBBY MASON JAR GLASS VOLUME ── */}
        <path
          d="M 72 70 
             C 58 72 42 86 38 106
             L 38 198
             C 38 224 64 238 120 238
             C 176 238 202 224 202 198
             L 202 106
             C 198 86 182 72 168 70
             Z"
          fill="url(#jarGlassBody)"
          stroke="url(#glassEdge)"
          strokeWidth="2.4"
        />

        {/* ── INNER INTENSE GOLDEN RADIANT GLOW ── */}
        <ellipse cx="120" cy="165" rx="66" ry="56" fill="url(#jarInnerWarmGlow)" />

        {/* ── INSIDE RADIANT GOLDEN HEARTS ── */}
        {insideHearts.map((h, i) => (
          <GlowingHeartMote
            key={`ih-${i}`}
            cx={h.cx}
            cy={h.cy}
            size={h.size}
            rot={h.rot}
            delay={h.delay}
          />
        ))}

        {/* Center glowing butterfly floating inside jar */}
        <GlowingButterfly cx={120} cy={162} size={17} rot={-4} delay={0.3} />

        {/* ── DELICATE GOLDEN WIRE WITH STAR GLINTS ── */}
        <path
          d="M 105 84 Q 72 98 78 122 Q 86 146 138 132 Q 170 120 158 155 Q 146 186 96 182 Q 62 180 74 215 Q 86 230 125 224"
          stroke="url(#goldWire)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <StarSparkle cx={78}  cy={122} size={15} delay={0} />
        <StarSparkle cx={158} cy={155} size={17} delay={0.6} />
        <StarSparkle cx={96}  cy={182} size={14} delay={1.1} />

        {/* ── GLASS HIGHLIGHTS (GLOSSY SPECULAR SHINE) ── */}
        {/* Left main vertical highlight streak */}
        <path
          d="M 46 108 L 46 198 C 46 210 55 218 72 224"
          stroke="#FFFFFF"
          strokeWidth="3.6"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Left inner fine reflection streak */}
        <path
          d="M 54 116 L 54 192"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Right rim highlight streak */}
        <path
          d="M 194 110 L 194 196"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Curved bottom glass base shine */}
        <path
          d="M 68 232 Q 120 236 172 232"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* ── GLASS RIM & LIP DETAIL ── */}
        <ellipse
          cx="120"
          cy="68"
          rx="44"
          ry="6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity="0.85"
        />

        {/* ── PASTEL PINK SATIN RIBBON AROUND NECK ── */}
        <rect
          x="76"
          y="60"
          width="88"
          height="11"
          rx="2"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.75"
          filter="drop-shadow(0 2px 4px rgba(255,100,140,0.3))"
        />
        {/* Ribbon shine highlight */}
        <line x1="78" y1="63" x2="162" y2="63" stroke="#FFF0F4" strokeWidth="1.1" opacity="0.7" />

        {/* ── PASTEL PINK RIBBON BOW (ON RIGHT SIDE) ── */}
        {/* Left loop of bow */}
        <path
          d="M 166 65 C 158 60 152 52 158 48 C 164 44 168 54 166 65 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.8"
        />
        {/* Right loop of bow */}
        <path
          d="M 166 65 C 174 58 182 52 186 58 C 190 64 178 69 166 65 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.8"
        />
        {/* Bow knot */}
        <ellipse cx="166" cy="65" rx="4.2" ry="4.8" fill="#FF7096" stroke="#E0577D" strokeWidth="0.8" />
        <ellipse cx="165" cy="63" rx="1.8" ry="1.4" fill="#FFF0F5" opacity="0.6" />

        {/* Fluttering ribbon tails */}
        <path
          d="M 165 69 Q 170 82 174 96 L 178 94 Q 172 81 167 69 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.6"
        />
        <path
          d="M 167 69 Q 175 80 183 92 L 187 90 Q 177 79 169 69 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.6"
        />

        {/* ── DANGLING GIFT TAG WITH PINK HEART ── */}
        {/* Tag hanging thread */}
        <path
          d="M 168 68 Q 174 76 182 82"
          stroke="#FF7597"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Tag paper body */}
        <g transform="translate(178, 80) rotate(14)">
          <path
            d="M 4 0 L 15 0 L 19 5 L 19 28 C 19 30 17 31 15 31 L 4 31 C 2 31 0 30 0 28 L 0 5 Z"
            fill="#FFFDF9"
            stroke="#F0D5DD"
            strokeWidth="0.8"
            filter="drop-shadow(0 3px 8px rgba(0,0,0,0.35))"
          />
          {/* Tag hole */}
          <circle cx="9.5" cy="4.5" r="1.6" fill="#F0C2CF" />
          <circle cx="9.5" cy="4.5" r="1" fill="#E08B9E" />
          {/* Sweet pink heart in center */}
          <path
            d="M 9.5 21 C 5.5 17 3 15 3 12.5 C 3 10.5 4.5 9 6.5 9 C 7.6 9 8.7 9.6 9.5 10.4 C 10.3 9.6 11.4 9 12.5 9 C 14.5 9 16 10.5 16 12.5 C 16 15 13.5 17 9.5 21 Z"
            fill="#FF6B8B"
          />
        </g>
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
    <div className="relative z-10 flex flex-col items-center mt-8 sm:mt-12 px-4">
      {/* ── Section Title & Hint ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-2 sm:mb-3"
      >
        <h2
          className="font-cinzel text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.06em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF2DE 50%, #F6C88D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Little Jar of Moments
        </h2>
        <p className="font-hand text-sm sm:text-lg text-white/85 mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          Folded safe inside. Tap the jar to reveal today's note... 💌✨
        </p>
      </motion.div>

      {/* ── Interactive Memory Jar Button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" } }}
        className="relative cursor-pointer focus:outline-none rounded-3xl group flex flex-col items-center"
        aria-label="Open the memory jar"
      >
        <JarIllustration />

        {/* Interactive floating invitation pill matching reference screenshot */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-3 px-5 sm:px-6 py-2 rounded-full bg-[#1F0E17]/85 backdrop-blur-md border border-[#F6C15C]/60 shadow-[0_4px_18px_rgba(0,0,0,0.55)] flex items-center gap-2 group-hover:bg-[#2B1422] transition-colors whitespace-nowrap"
        >
          <span className="text-[#FFD54F] text-xs sm:text-sm">✨</span>
          <span className="font-hand text-base sm:text-lg font-semibold text-[#FFF3DE]">
            tap to open today's note
          </span>
          <span className="text-xs sm:text-sm">💌</span>
        </motion.div>
      </motion.button>

      {/* ── Unfolded Note Modal ── */}
      <AnimatePresence>
        {open && <FloatingNote text={todaysNote} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
