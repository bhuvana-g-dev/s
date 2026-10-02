import { motion } from "framer-motion";

/**
 * Elegant Golden Filigree Divider Line with centered heart ornament.
 */
function GoldenFiligreeLine() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-xl sm:max-w-2xl mx-auto my-2 sm:my-3 px-4">
      {/* Left tapered golden line */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#E2B165]/50 to-[#FCECC3]" />

      {/* Center diamond & heart cluster */}
      <div className="flex items-center gap-1.5 px-3 select-none">
        <span className="w-1.5 h-1.5 rotate-45 bg-[#E8B868] opacity-80" />
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs sm:text-sm select-none filter drop-shadow-[0_0_8px_rgba(246,193,92,0.7)]"
        >
          💛
        </motion.span>
        <span className="w-1.5 h-1.5 rotate-45 bg-[#E8B868] opacity-80" />
      </div>

      {/* Right tapered golden line */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-[#FCECC3] via-[#E2B165]/50 to-transparent" />
    </div>
  );
}

/**
 * Outlined Golden Wire Heart (♡) flanking "HAPPY BIRTHDAY".
 */
function WireHeart({ className = "w-3.5 h-3.5 sm:w-4 sm:h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} inline-block select-none filter drop-shadow-[0_0_6px_rgba(246,193,92,0.8)]`}
      fill="none"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        stroke="url(#wireGoldGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="wireGoldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8E0" />
          <stop offset="50%" stopColor="#F6C15C" />
          <stop offset="100%" stopColor="#D9882E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Graceful curved golden flourish swoosh that underlines the name
 * and loops smoothly towards the sunflower.
 */
function NameFlourish() {
  return (
    <svg
      viewBox="0 0 540 38"
      className="w-full max-w-sm sm:max-w-lg md:max-w-xl h-auto -mt-1 sm:-mt-2 pointer-events-none"
      fill="none"
    >
      <defs>
        <linearGradient id="flourishLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2B165" stopOpacity="0.05" />
          <stop offset="15%" stopColor="#F6C15C" stopOpacity="0.75" />
          <stop offset="65%" stopColor="#FFF1CB" stopOpacity="0.95" />
          <stop offset="88%" stopColor="#F6C15C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8B868" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* S-curve sweeping underline ending in an upward decorative loop */}
      <motion.path
        d="M 20 18 Q 160 25 340 20 Q 420 18 458 14 Q 486 10 496 18 Q 504 24 492 26 Q 478 26 482 17 Q 486 10 508 11"
        stroke="url(#flourishLineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
      />
      {/* Shimmering sparkle at the flourish tip */}
      <motion.circle
        cx="508"
        cy="11"
        r="2"
        fill="#FFF9E6"
        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function BirthdayBanner({
  name = "SELVA MEENAKSHI",
  subtitle = "Welcome to your little birthday world...",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 1, ease: "easeOut" }}
      className="relative flex flex-col items-center text-center mt-3 mb-6 sm:mb-8 px-2 select-none"
    >
      {/* Ambient warm radial glow behind the banner */}
      <div
        className="absolute inset-0 max-w-2xl mx-auto rounded-full pointer-events-none -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(246, 193, 92, 0.35) 0%, rgba(225, 116, 151, 0.15) 50%, transparent 75%)",
        }}
      />

      {/* ─── TOP DIVIDER: Golden line + Heart ─── */}
      <GoldenFiligreeLine />

      {/* ─── ROW 1: ♡  HAPPY BIRTHDAY  ♡ ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="flex items-center justify-center gap-3 sm:gap-4 my-1"
      >
        <WireHeart />
        <span
          className="font-cinzel text-xs sm:text-base md:text-lg font-bold uppercase tracking-[0.24em] sm:tracking-[0.34em]"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF 0%, #FDF4E1 40%, #F1CE8D 80%, #D8A555 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 8px rgba(246, 193, 92, 0.4))",
          }}
        >
          HAPPY BIRTHDAY
        </span>
        <WireHeart />
      </motion.div>

      {/* ─── ROW 2: SELVA MEENAKSHI 💖🌻 + Underline Flourish ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="flex flex-col items-center mt-1"
      >
        <div className="flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-3.5">
          {/* Hero Name */}
          <h1
            className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.05em] sm:tracking-[0.08em] leading-tight"
            style={{
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FFF5EB 35%, #FAD9B5 70%, #E7B079 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 0 20px rgba(246, 193, 92, 0.55)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45))",
            }}
          >
            {name}
          </h1>

          {/* Emblems: Glossy Pink Heart + Radiant Sunflower */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.span
              animate={{
                scale: [1, 1.14, 1],
                filter: [
                  "drop-shadow(0 0 10px rgba(232, 98, 140, 0.6))",
                  "drop-shadow(0 0 22px rgba(232, 98, 140, 0.95))",
                  "drop-shadow(0 0 10px rgba(232, 98, 140, 0.6))",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl sm:text-4xl md:text-5xl select-none inline-block"
            >
              💖
            </motion.span>
            <motion.span
              animate={{
                rotate: [0, 8, 0, -8, 0],
                filter: [
                  "drop-shadow(0 0 10px rgba(246, 193, 92, 0.6))",
                  "drop-shadow(0 0 22px rgba(246, 193, 92, 0.95))",
                  "drop-shadow(0 0 10px rgba(246, 193, 92, 0.6))",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl sm:text-4xl md:text-5xl select-none inline-block"
            >
              🌻
            </motion.span>
          </div>
        </div>

        {/* Golden underline swoop looping to the sunflower */}
        <NameFlourish />
      </motion.div>

      {/* ─── ROW 3: Welcome to your little birthday world... ─── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 1 }}
        className="font-body text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.22em] text-[#FDEBD2]/85 mt-1 sm:mt-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] font-light"
      >
        {subtitle}
      </motion.p>

      {/* ─── BOTTOM DIVIDER: Golden line + Heart ─── */}
      <GoldenFiligreeLine />
    </motion.div>
  );
}
