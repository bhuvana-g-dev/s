import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Play a cute synthesized pop sound using Web Audio API on click.
 */
function playPopSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    // Quick frequency sweep downward mimics a crisp balloon pop
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.32, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // silent fallback
  }
}

/**
 * Play a gentle rising whoosh/air puff sound on balloon re-inflation.
 */
function playInflateSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    // Soft pitch rise mimics air puffing inside rubber
    osc.frequency.setValueAtTime(130, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
    // silent fallback
  }
}

/**
 * Shower of glowing hearts and sparkles falling down when popped.
 */
const BURST_HEARTS = [
  { emoji: "💖", size: 24, x: -26, yBurst: -20, fall: 140, sway: 16, delay: 0 },
  { emoji: "💛", size: 20, x: 24,  yBurst: -26, fall: 150, sway: -18, delay: 0.04 },
  { emoji: "✨", size: 18, x: -14, yBurst: -32, fall: 125, sway: 14, delay: 0.08 },
  { emoji: "💕", size: 22, x: 18,  yBurst: -16, fall: 160, sway: -14, delay: 0.06 },
  { emoji: "💗", size: 26, x: 0,   yBurst: -30, fall: 175, sway: 20, delay: 0.02 },
  { emoji: "🌸", size: 19, x: -30, yBurst: -12, fall: 135, sway: -12, delay: 0.1 },
  { emoji: "✦",  size: 16, x: 32,  yBurst: -22, fall: 145, sway: 15, delay: 0.12 },
  { emoji: "💓", size: 22, x: -8,  yBurst: -24, fall: 168, sway: -16, delay: 0.05 },
];

function FallingHeartsShower() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
      {/* Expanding shockwave ring */}
      <motion.div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FFCAD4] shadow-[0_0_15px_rgba(255,182,193,0.9)]"
        initial={{ width: 10, height: 10, opacity: 1 }}
        animate={{ width: 90, height: 90, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* Floating & falling glowing hearts */}
      {BURST_HEARTS.map((h, i) => (
        <motion.span
          key={`burst-heart-${i}`}
          className="absolute select-none pointer-events-none filter drop-shadow-[0_0_10px_rgba(255,105,180,0.9)]"
          style={{
            left: `calc(50% + ${h.x}px)`,
            top: "35%",
            fontSize: `${h.size}px`,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0.3,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: [0, h.x * 1.3, h.x + h.sway, h.x],
            y: [0, h.yBurst, h.fall * 0.45, h.fall],
            scale: [0.3, 1.35, 1, 0.4],
            opacity: [1, 1, 0.85, 0],
            rotate: [0, i % 2 === 0 ? 55 : -55, i % 2 === 0 ? -35 : 35, i % 2 === 0 ? 90 : -90],
          }}
          transition={{
            duration: 1.65,
            ease: "easeOut",
            delay: h.delay,
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Concentric air puff rings when inflating with air.
 */
function AirPuffEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
      <motion.div
        className="absolute rounded-full border border-white/80"
        initial={{ width: 8, height: 8, opacity: 0.9 }}
        animate={{ width: 80, height: 80, opacity: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      />
      <motion.div
        className="absolute rounded-full border border-[#FFE082]/70"
        initial={{ width: 6, height: 6, opacity: 0.95 }}
        animate={{ width: 55, height: 55, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      />
    </div>
  );
}

/**
 * Single 3D metallic balloon with high-gloss highlights,
 * tied knot, and curling golden ribbon streamer.
 * Interactive: Clicking bursts the balloon with falling glowing hearts,
 * then inflates again with a bouncy air animation!
 */
function SingleBalloon({
  id = "balloon",
  type = "rose", // "rose" | "gold" | "blush"
  width = 90,
  height = 200,
  className = "",
  animDelay = 0,
}) {
  const [status, setStatus] = useState("idle"); // "idle" | "popped" | "inflating"
  const [isHovered, setIsHovered] = useState(false);

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

  const handlePop = (e) => {
    e.stopPropagation();
    if (status !== "idle") return;

    playPopSound();
    setStatus("popped");

    // After falling hearts shower (1.8s), inflate balloon again with air animation
    setTimeout(() => {
      playInflateSound();
      setStatus("inflating");

      // Inflation completes in 0.9s, return to normal idle sway
      setTimeout(() => {
        setStatus("idle");
      }, 920);
    }, 1800);
  };

  return (
    <div
      className={`absolute pointer-events-auto cursor-pointer select-none group ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handlePop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Click to burst balloon"
    >
      {/* Gentle playful hover hint */}
      <AnimatePresence>
        {isHovered && status === "idle" && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/65 text-[#FFE082] text-[11px] font-hand whitespace-nowrap backdrop-blur-xs border border-[#F6C15C]/40 shadow-md pointer-events-none z-40"
          >
            pop me! 🎈
          </motion.span>
        )}
      </AnimatePresence>

      {/* ── BURST HEARTS SHOWER ── */}
      <AnimatePresence>
        {status === "popped" && <FallingHeartsShower />}
      </AnimatePresence>

      {/* ── AIR INFLATION PUFF EFFECT ── */}
      <AnimatePresence>
        {status === "inflating" && <AirPuffEffect />}
      </AnimatePresence>

      {/* ── BALLOON BODY & RIBBON ── */}
      {status !== "popped" && (
        <motion.div
          className="w-full h-full"
          initial={
            status === "inflating"
              ? { scale: 0, scaleY: 0.1, opacity: 0 }
              : false
          }
          animate={
            status === "inflating"
              ? {
                  scale: [0, 0.35, 0.75, 1.15, 0.94, 1.04, 1],
                  scaleY: [0.1, 0.45, 0.85, 1.2, 0.95, 1.03, 1],
                  opacity: [0, 0.9, 1, 1, 1, 1, 1],
                }
              : {
                  y: [0, -10, 0],
                  rotate: [0, isGold ? -2.5 : 2.5, 0],
                }
          }
          transition={
            status === "inflating"
              ? {
                  duration: 0.9,
                  ease: "easeOut",
                  times: [0, 0.15, 0.4, 0.65, 0.8, 0.9, 1],
                }
              : {
                  duration: 3.8 + animDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: animDelay,
                }
          }
          style={{ transformOrigin: "50% 88%" }}
          whileHover={status === "idle" ? { scale: 1.08, y: -4 } : {}}
          whileTap={status === "idle" ? { scale: 0.92 } : {}}
        >
          <svg
            viewBox="0 0 100 240"
            className="w-full h-full overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
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
      )}
    </div>
  );
}

export default function CornerBalloons() {
  return (
    <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-25 overflow-visible">
      {/* ─── LEFT CORNER CLUSTER (Shifted down below the hanging fairy lights) ─── */}
      <div className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-40 sm:top-48 md:top-56 lg:top-60 w-36 sm:w-48 md:w-56 h-72 sm:h-96 pointer-events-auto">
        {/* Back Champagne Balloon */}
        <SingleBalloon
          id="left-gold"
          type="gold"
          width={76}
          height={180}
          className="left-0 top-0"
          animDelay={0.6}
        />
        {/* Main Rose Gold Balloon (Front & Largest) */}
        <SingleBalloon
          id="left-rose"
          type="rose"
          width={94}
          height={215}
          className="left-6 sm:left-10 top-8 sm:top-6 z-10"
          animDelay={0}
        />
        {/* Lower Blush Pink Balloon */}
        <SingleBalloon
          id="left-blush"
          type="blush"
          width={80}
          height={188}
          className="left-14 sm:left-22 top-22 sm:top-26"
          animDelay={1.1}
        />
      </div>

      {/* ─── RIGHT CORNER CLUSTER (Shifted down below the hanging fairy lights, symmetric bouquet) ─── */}
      <div className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-40 sm:top-48 md:top-56 lg:top-60 w-36 sm:w-48 md:w-56 h-72 sm:h-96 pointer-events-auto">
        {/* Back Champagne Balloon */}
        <SingleBalloon
          id="right-gold"
          type="gold"
          width={76}
          height={180}
          className="right-0 top-0"
          animDelay={0.8}
        />
        {/* Main Rose Gold Balloon (Front & Largest) */}
        <SingleBalloon
          id="right-rose"
          type="rose"
          width={94}
          height={215}
          className="right-6 sm:right-10 top-8 sm:top-6 z-10"
          animDelay={0.2}
        />
        {/* Lower Blush Pink Balloon */}
        <SingleBalloon
          id="right-blush"
          type="blush"
          width={80}
          height={188}
          className="right-14 sm:right-22 top-22 sm:top-26"
          animDelay={1.3}
        />
      </div>
    </div>
  );
}
