import { motion } from "framer-motion";

/**
 * Single 3D metallic balloon with high-gloss highlights,
 * tied knot, and curling golden ribbon streamer.
 */
function SingleBalloon({
  id = "balloon",
  type = "rose", // "rose" | "gold" | "blush"
  width = 90,
  height = 200,
  className = "",
  animDelay = 0,
}) {
  const isGold = type === "gold";
  const isBlush = type === "blush";

  // Gradient stops based on type
  const bodyColors = isGold
    ? {
        c1: "#FFFDF0",
        c2: "#FCE09B",
        c3: "#E5A946",
        c4: "#B57622",
        c5: "#7A470C",
        knot: "#A66D24",
      }
    : isBlush
    ? {
        c1: "#FFF5F8",
        c2: "#FFCAD4",
        c3: "#E5879E",
        c4: "#B8536E",
        c5: "#752B3E",
        knot: "#9E485F",
      }
    : {
        // Rose Gold / Mauve (Hero)
        c1: "#FFF0F4",
        c2: "#F5ABB8",
        c3: "#DA778C",
        c4: "#A6485E",
        c5: "#6A2234",
        knot: "#8F3A50",
      };

  const gradId = `balloon-grad-${id}`;
  const ribbonId = `goldRibbon-${id}`;

  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, isGold ? -2 : 2.5, 0],
      }}
      transition={{
        duration: 3.8 + animDelay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: animDelay,
      }}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg
        viewBox="0 0 100 240"
        className="w-full h-full overflow-visible select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
        fill="none"
      >
        <defs>
          <radialGradient id={gradId} cx="34%" cy="30%" r="68%">
            <stop offset="0%" stopColor={bodyColors.c1} />
            <stop offset="25%" stopColor={bodyColors.c2} />
            <stop offset="65%" stopColor={bodyColors.c3} />
            <stop offset="90%" stopColor={bodyColors.c4} />
            <stop offset="100%" stopColor={bodyColors.c5} />
          </radialGradient>

          <linearGradient id={ribbonId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="40%" stopColor="#F6C15C" />
            <stop offset="80%" stopColor="#D9882E" />
            <stop offset="100%" stopColor="#8C5314" />
          </linearGradient>
        </defs>

        {/* ── Curly golden ribbon streamer ── */}
        <motion.path
          d="M 50 114 Q 42 135 56 150 Q 66 168 46 185 Q 36 202 54 218 Q 66 232 48 250"
          stroke={`url(#${ribbonId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M 50 114 Q 42 135 56 150 Q 66 168 46 185 Q 36 202 54 218 Q 66 232 48 250",
              "M 50 114 Q 48 135 40 152 Q 34 170 56 186 Q 68 200 44 220 Q 38 235 52 250",
              "M 50 114 Q 42 135 56 150 Q 66 168 46 185 Q 36 202 54 218 Q 66 232 48 250",
            ],
          }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: animDelay }}
        />

        {/* ── Balloon tie knot ── */}
        <polygon points="46,112 54,112 50,119" fill={bodyColors.knot} />
        <ellipse cx="50" cy="112" rx="4.5" ry="2.5" fill={bodyColors.c4} />

        {/* ── 3D Balloon Body ── */}
        <path
          d="M 50 112 C 18 112 8 75 8 50 C 8 20 28 6 50 6 C 72 6 92 20 92 50 C 92 75 82 112 50 112 Z"
          fill={`url(#${gradId})`}
        />

        {/* ── Soft glossy reflection crescent on top-left ── */}
        <path
          d="M 28 18 C 35 13 46 12 56 12 C 42 16 32 26 30 40 C 28 50 28 64 30 72 C 24 64 22 46 23 34 C 24 26 26 21 28 18 Z"
          fill="#FFFFFF"
          opacity="0.45"
        />

        {/* ── Specular white glint ── */}
        <ellipse
          cx="33"
          cy="26"
          rx="5"
          ry="9"
          transform="rotate(-26, 33, 26)"
          fill="#FFFFFF"
          opacity="0.75"
        />

        {/* ── Rim light bounce on bottom right ── */}
        <path
          d="M 74 78 C 80 68 82 54 80 44 C 82 56 80 70 72 82 Z"
          fill="#FFFFFF"
          opacity="0.22"
        />
      </svg>
    </motion.div>
  );
}

export default function CornerBalloons() {
  return (
    <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-20 overflow-visible">
      {/* ─── LEFT CORNER CLUSTER (Beside Banner & Spotlight) ─── */}
      <div className="absolute left-2 sm:left-6 md:left-10 lg:left-14 top-24 sm:top-28 md:top-32 w-32 sm:w-44 md:w-52 h-72 sm:h-96">
        {/* Back Champagne Balloon */}
        <SingleBalloon
          id="left-gold"
          type="gold"
          width={76}
          height={180}
          className="left-0 top-2"
          animDelay={0.6}
        />
        {/* Main Rose Gold Balloon (Front & Largest) */}
        <SingleBalloon
          id="left-rose"
          type="rose"
          width={92}
          height={210}
          className="left-6 sm:left-10 top-8 sm:top-6 z-10"
          animDelay={0}
        />
        {/* Lower Blush Pink Balloon */}
        <SingleBalloon
          id="left-blush"
          type="blush"
          width={78}
          height={185}
          className="left-14 sm:left-20 top-20 sm:top-24"
          animDelay={1.1}
        />
      </div>

      {/* ─── RIGHT CORNER CLUSTER (Beside Banner & Spotlight, Mirrored) ─── */}
      <div className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-24 sm:top-28 md:top-32 w-32 sm:w-44 md:w-52 h-72 sm:h-96 scale-x-[-1]">
        {/* Back Champagne Balloon */}
        <SingleBalloon
          id="right-gold"
          type="gold"
          width={76}
          height={180}
          className="left-0 top-2"
          animDelay={0.8}
        />
        {/* Main Rose Gold Balloon (Front & Largest) */}
        <SingleBalloon
          id="right-rose"
          type="rose"
          width={92}
          height={210}
          className="left-6 sm:left-10 top-8 sm:top-6 z-10"
          animDelay={0.2}
        />
        {/* Lower Blush Pink Balloon */}
        <SingleBalloon
          id="right-blush"
          type="blush"
          width={78}
          height={185}
          className="left-14 sm:left-20 top-20 sm:top-24"
          animDelay={1.3}
        />
      </div>
    </div>
  );
}
