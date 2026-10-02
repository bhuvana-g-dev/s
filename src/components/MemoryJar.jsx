import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes, birthdayJarNote } from "../data/messages";
import { isBirthday, pickForToday } from "../hooks/dateUtils";

/**
 * Heart path centered at (0, 0) for easy scaling and rotation.
 */
function HeartShape({ size = 20, fill = "#FF8FAB", stroke = null, strokeWidth = 1.5, opacity = 1 }) {
  const s = size / 20;
  return (
    <path
      d="M 0 9.2 C -6.5 3.3 -10 0.2 -10 -3.6 C -10 -6.6 -7.5 -9 -4.5 -9 C -2.7 -9 -1 -8.1 0 -6.8 C 1 -8.1 2.7 -9 4.5 -9 C 7.5 -9 10 -6.6 10 -3.6 C 10 0.2 6.5 3.3 0 9.2 Z"
      transform={`scale(${s})`}
      fill={fill}
      stroke={stroke || "none"}
      strokeWidth={stroke ? strokeWidth / s : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

/**
 * 4-Point Sparkling Star Glint centered at (0, 0)
 */
function StarSparkle({ cx, cy, size = 18, delay = 0 }) {
  const r = size / 2;
  return (
    <motion.g
      transform={`translate(${cx}, ${cy})`}
      animate={{
        scale: [0.85, 1.3, 0.85],
        opacity: [0.75, 1, 0.75],
      }}
      transition={{
        duration: 2.2 + (delay % 2) * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {/* Radiant golden halo */}
      <circle r={r * 1.8} fill="url(#starHalo)" />
      {/* 4-point diamond star */}
      <path
        d={`M 0 ${-r} Q 0 0 ${-r} 0 Q 0 0 0 ${r} Q 0 0 ${r} 0 Q 0 0 0 ${-r} Z`}
        fill="#FFFFFF"
      />
      {/* Center glint */}
      <circle r={r * 0.3} fill="#FFEAA7" />
    </motion.g>
  );
}

/**
 * Warm glowing fairy light bulb
 */
function FairyBulb({ cx, cy, delay = 0, size = 3.2 }) {
  return (
    <motion.g
      transform={`translate(${cx}, ${cy})`}
      animate={{
        scale: [0.9, 1.18, 0.9],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <circle r={size * 2.6} fill="url(#bulbGlow)" />
      <circle r={size} fill="#FFF9E6" />
      <circle r={size * 0.45} fill="#FFFFFF" />
    </motion.g>
  );
}

/**
 * A romantic, fairy-light glass wishing jar matching the user's reference:
 * - Tall cylindrical glass bottle with rounded base corners
 * - Cork stopper at top with pastel pink ribbon & bow
 * - Dangling white gift tag with pink heart
 * - Spiraling golden fairy light wire with bright sparkling star glints (✦)
 * - Pastel pink & peach hearts floating gracefully inside
 * - Whimsical sketch/doodle hearts floating in the air outside
 * - Stacked pastel folded origami love notes at the bottom
 */
function JarIllustration() {
  // Folded love notes nestled at the bottom
  const notes = [
    { x: 82,  y: 304, rot: -14, color: "#FFAEC0", stroke: "#E08398", type: "env", w: 32, h: 22 },
    { x: 114, y: 310, rot: 6,   color: "#FFFDF8", stroke: "#E8C8BE", type: "note", w: 30, h: 20 },
    { x: 148, y: 302, rot: 18,  color: "#FFE2D1", stroke: "#DFA88E", type: "env", w: 32, h: 22 },
    { x: 92,  y: 284, rot: 12,  color: "#FFF9F4", stroke: "#E2BCAE", type: "note", w: 28, h: 18 },
    { x: 126, y: 288, rot: -10, color: "#FFCCD5", stroke: "#E5879E", type: "env", w: 34, h: 22 },
    { x: 156, y: 286, rot: 8,   color: "#FFDFCE", stroke: "#D89A80", type: "note", w: 30, h: 20 },
    { x: 104, y: 266, rot: -6,  color: "#FFB6C6", stroke: "#E07A94", type: "env", w: 32, h: 22 },
    { x: 138, y: 268, rot: 15,  color: "#FFFDF6", stroke: "#DEC2BA", type: "note", w: 28, h: 19 },
    { x: 122, y: 250, rot: -4,  color: "#FFE4D6", stroke: "#DDA490", type: "env", w: 30, h: 20 },
  ];

  // Floating pastel hearts inside the jar
  const floatingHearts = [
    { cx: 140, cy: 118, size: 16, color: "#FF8FAB", rot: -8, delay: 0 },
    { cx: 172, cy: 162, size: 21, color: "#FFBE98", rot: 10, delay: 0.6 },
    { cx: 130, cy: 194, size: 13, color: "#FF9FB2", rot: -5, delay: 1.2 },
    { cx: 164, cy: 238, size: 17, color: "#FFAEC0", rot: 8, delay: 0.4 },
    { cx: 146, cy: 254, size: 14, color: "#FFB4A2", rot: -12, delay: 0.9 },
  ];

  return (
    <div className="relative flex justify-center items-center select-none">
      {/* ── Warm ambient backlight behind jar ── */}
      <div
        className="absolute w-72 sm:w-88 h-88 sm:h-104 rounded-full pointer-events-none -z-10 blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(254, 215, 170, 0.5) 0%, rgba(255, 174, 192, 0.3) 45%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 240 360"
        className="w-60 sm:w-72 md:w-80 h-auto overflow-visible filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
        fill="none"
      >
        <defs>
          {/* Glass body subtle luminous gradient */}
          <linearGradient id="jarGlassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="8%" stopColor="#F5EDFA" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="92%" stopColor="#EAE0F5" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.32" />
          </linearGradient>

          {/* Glass edge stroke */}
          <linearGradient id="glassEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#E8D5F5" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#C4A8E0" stopOpacity="0.8" />
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

          {/* Golden fairy lights wire */}
          <linearGradient id="goldWire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="50%" stopColor="#F6C15C" />
            <stop offset="100%" stopColor="#E29E38" />
          </linearGradient>

          {/* Star sparkle radiant glow */}
          <radialGradient id="starHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFF2B2" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#F6C15C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F6C15C" stopOpacity="0" />
          </radialGradient>

          {/* Fairy bulb glow */}
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFE082" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFA000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Floor shadow beneath jar ── */}
        <ellipse cx="120" cy="344" rx="76" ry="12" fill="#200B15" opacity="0.38" />

        {/* ── OUTSIDE DOODLE SKETCH HEARTS (MATCHING REFERENCE IMAGE) ── */}
        {/* Top-left chalk outline doodle heart */}
        <motion.g
          transform="translate(24, 76) rotate(-14)"
          animate={{ y: [0, -5, 0], rotate: [-14, -10, -14] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartShape size={20} fill="none" stroke="#FFAEC0" strokeWidth={2.4} opacity={0.88} />
        </motion.g>

        {/* Mid-left filled soft pink doodle heart */}
        <motion.g
          transform="translate(28, 150) rotate(8)"
          animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <HeartShape size={17} fill="#FFAEC0" opacity={0.82} />
        </motion.g>

        {/* Right white doodle outline heart */}
        <motion.g
          transform="translate(220, 240) rotate(12)"
          animate={{ y: [0, -5, 0], rotate: [12, 16, 12] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        >
          <HeartShape size={18} fill="none" stroke="#FFFFFF" strokeWidth={2} opacity={0.78} />
        </motion.g>

        {/* Bottom-right soft pink doodle heart */}
        <motion.g
          transform="translate(224, 298) rotate(-8)"
          animate={{ y: [0, -6, 0], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <HeartShape size={16} fill="#FFB3C6" opacity={0.8} />
        </motion.g>

        {/* Ambient doodle sparkles floating in air */}
        <motion.text
          x="34" y="120" fontSize="13" fill="#FFE082"
          animate={{ opacity: [0.4, 1, 0.4], y: [120, 114, 120] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.text>
        <motion.text
          x="212" y="180" fontSize="12" fill="#FFAEC0"
          animate={{ opacity: [0.3, 0.9, 0.3], y: [180, 174, 180] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >✦</motion.text>

        {/* ── CORK STOPPER ── */}
        {/* Cork bevel top */}
        <ellipse cx="120" cy="38" rx="46" ry="9" fill="#ECC391" stroke="#B37D4A" strokeWidth="0.8" />
        {/* Cork body */}
        <path
          d="M 74 38 L 78 64 C 78 66 94 68 120 68 C 146 68 162 66 162 64 L 166 38 Z"
          fill="url(#corkGrad)"
          stroke="#9C6B3A"
          strokeWidth="1"
        />
        {/* Cork natural texture notches */}
        <line x1="88" y1="45" x2="98" y2="46" stroke="#9C6B3A" strokeWidth="1" opacity="0.45" />
        <line x1="136" y1="50" x2="148" y2="51" stroke="#9C6B3A" strokeWidth="1" opacity="0.45" />
        <line x1="106" y1="56" x2="120" y2="57" stroke="#9C6B3A" strokeWidth="1" opacity="0.4" />

        {/* ── GLASS JAR INNER VOLUME ── */}
        <path
          d="M 75 76 
             C 65 76 56 84 50 102
             L 50 312
             C 50 330 68 340 120 340
             C 172 340 190 330 190 312
             L 190 102
             C 184 84 175 76 165 76
             Z"
          fill="url(#jarGlassBody)"
          stroke="url(#glassEdge)"
          strokeWidth="2.4"
        />

        {/* Thick curved glass base */}
        <path
          d="M 58 316 C 58 332 78 338 120 338 C 162 338 182 332 182 316 C 168 326 144 330 120 330 C 96 330 72 326 58 316 Z"
          fill="#FFFFFF"
          opacity="0.32"
        />

        {/* ── FOLDED LOVE NOTES PILED AT THE BOTTOM ── */}
        <g>
          {notes.map((n, i) => (
            <motion.g
              key={`note-${i}`}
              transform={`translate(${n.x}, ${n.y}) rotate(${n.rot})`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              {/* Folded paper note */}
              <rect
                x={-n.w / 2}
                y={-n.h / 2}
                width={n.w}
                height={n.h}
                rx="3"
                fill={n.color}
                stroke={n.stroke}
                strokeWidth="1.1"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))"
              />
              {/* Envelope flap or paper crease lines */}
              {n.type === "env" ? (
                <>
                  <path
                    d={`M ${-n.w / 2} ${-n.h / 2} L 0 2 L ${n.w / 2} ${-n.h / 2}`}
                    stroke={n.stroke}
                    strokeWidth="0.9"
                    fill="none"
                    opacity="0.85"
                  />
                  {/* Tiny heart sticker seal on envelope */}
                  <circle cx="0" cy="2" r="2.2" fill="#E17497" />
                </>
              ) : (
                <>
                  <line x1={-n.w / 2 + 5} y1="-3" x2={n.w / 2 - 5} y2="-3" stroke={n.stroke} strokeWidth="0.9" opacity="0.6" />
                  <line x1={-n.w / 2 + 5} y1="3" x2={n.w / 2 - 8} y2="3" stroke={n.stroke} strokeWidth="0.9" opacity="0.6" />
                </>
              )}
            </motion.g>
          ))}
        </g>

        {/* ── DELICATE GOLDEN FAIRY LIGHT WIRE (SPIRALING DOWN) ── */}
        <path
          d="M 115 88 Q 80 106 86 132 Q 94 158 152 142 Q 185 130 172 170 Q 160 205 106 200 Q 68 198 82 245 Q 96 280 148 268 Q 182 258 162 298 Q 146 322 108 325"
          stroke="url(#goldWire)"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* ── BRIGHT SPARKLING 4-POINT STAR GLINTS (✦) ── */}
        <StarSparkle cx={86}  cy={132} size={17} delay={0} />
        <StarSparkle cx={172} cy={170} size={20} delay={0.6} />
        <StarSparkle cx={106} cy={200} size={16} delay={1.2} />
        <StarSparkle cx={148} cy={268} size={18} delay={0.3} />
        <StarSparkle cx={162} cy={298} size={19} delay={0.9} />

        {/* ── WARM GLOWING FAIRY BULBS ── */}
        <FairyBulb cx={115} cy={88}  delay={0.2} size={3} />
        <FairyBulb cx={124} cy={146} delay={0.8} size={3.2} />
        <FairyBulb cx={178} cy={140} delay={1.4} size={2.8} />
        <FairyBulb cx={140} cy={186} delay={0.5} size={3} />
        <FairyBulb cx={76}  cy={224} delay={1.0} size={3.2} />
        <FairyBulb cx={114} cy={256} delay={0.7} size={3.4} />
        <FairyBulb cx={94}  cy={310} delay={1.3} size={3.2} />
        <FairyBulb cx={138} cy={322} delay={0.4} size={3.5} />

        {/* ── FLOATING PASTEL HEARTS INSIDE THE JAR ── */}
        {floatingHearts.map((h, i) => (
          <motion.g
            key={`fh-${i}`}
            transform={`translate(${h.cx}, ${h.cy}) rotate(${h.rot})`}
            animate={{
              y: [0, -7, 0],
              rotate: [h.rot - 3, h.rot + 3, h.rot - 3],
              scale: [1, 1.07, 1],
            }}
            transition={{
              duration: 3.2 + (i % 3) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: h.delay,
            }}
          >
            <g filter="drop-shadow(0 2px 6px rgba(255,140,170,0.45))">
              <HeartShape size={h.size} fill={h.color} />
            </g>
          </motion.g>
        ))}

        {/* ── GLASS HIGHLIGHTS (GLOSSY REFLECTIONS) ── */}
        {/* Left bright vertical highlight streak */}
        <path
          d="M 57 106 L 57 312 C 57 322 66 328 82 332"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Left thin secondary reflection streak */}
        <path
          d="M 64 115 L 64 295"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Right rim highlight streak */}
        <path
          d="M 183 108 L 183 310"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Curved bottom glass base shine */}
        <path
          d="M 75 334 Q 120 338 165 334"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* ── GLASS RIM & LIP DETAIL ── */}
        <ellipse
          cx="120"
          cy="74"
          rx="44"
          ry="7"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          opacity="0.9"
        />
        <ellipse
          cx="120"
          cy="76"
          rx="42"
          ry="6"
          fill="#D8C2EE"
          opacity="0.2"
        />

        {/* ── PASTEL PINK SATIN RIBBON AROUND NECK ── */}
        <rect
          x="75"
          y="64"
          width="90"
          height="12"
          rx="2"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.75"
          filter="drop-shadow(0 2px 4px rgba(255,100,140,0.3))"
        />
        {/* Ribbon shine highlight */}
        <line x1="77" y1="67" x2="163" y2="67" stroke="#FFF0F4" strokeWidth="1.2" opacity="0.7" />

        {/* ── PASTEL PINK RIBBON BOW (ON RIGHT SIDE) ── */}
        {/* Left loop of bow */}
        <path
          d="M 166 70 C 158 64 150 56 156 52 C 162 48 168 58 166 70 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.8"
        />
        {/* Right loop of bow */}
        <path
          d="M 166 70 C 174 62 184 56 188 62 C 192 68 180 74 166 70 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.8"
        />
        {/* Bow knot */}
        <ellipse cx="166" cy="70" rx="4.5" ry="5" fill="#FF7096" stroke="#E0577D" strokeWidth="0.8" />
        <ellipse cx="165" cy="68" rx="2" ry="1.5" fill="#FFF0F5" opacity="0.6" />

        {/* Fluttering ribbon tails */}
        <path
          d="M 165 74 Q 170 88 175 106 L 179 104 Q 172 88 167 74 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.6"
        />
        <path
          d="M 167 74 Q 176 86 186 100 L 190 98 Q 178 85 169 74 Z"
          fill="url(#pinkRibbonGrad)"
          stroke="#FF7597"
          strokeWidth="0.6"
        />

        {/* ── DANGLING GIFT TAG WITH PINK HEART ── */}
        {/* Tag hanging thread */}
        <path
          d="M 168 73 Q 175 82 186 90"
          stroke="#FF7597"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Tag paper body */}
        <g transform="translate(182, 88) rotate(16)">
          <path
            d="M 5 0 L 17 0 L 22 6 L 22 32 C 22 34 20 36 18 36 L 4 36 C 2 36 0 34 0 32 L 0 6 Z"
            fill="#FFFDF9"
            stroke="#F0D5DD"
            strokeWidth="0.8"
            filter="drop-shadow(0 3px 8px rgba(0,0,0,0.35))"
          />
          {/* Tag hole */}
          <circle cx="11" cy="5" r="1.8" fill="#F0C2CF" />
          <circle cx="11" cy="5" r="1.2" fill="#E08B9E" />
          {/* Sweet pink heart in center */}
          <g transform="translate(11, 20)">
            <HeartShape size={11} fill="#FF6B8B" />
          </g>
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
