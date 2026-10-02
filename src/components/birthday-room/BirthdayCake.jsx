import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 5 Candle coordinates matching the chocolate cake image (1024 x 883).
 * x% is center of wick/flame, flameY% is flame center, wickY% is top of candle wick.
 */
const CANDLES = [
  { id: 1, x: 34.4, flameY: 10.5, wickY: 15.3 },
  { id: 2, x: 42.0, flameY: 12.0, wickY: 16.1 },
  { id: 3, x: 49.8, flameY: 8.5,  wickY: 13.8 }, // center / tallest
  { id: 4, x: 57.6, flameY: 11.5, wickY: 16.1 },
  { id: 5, x: 65.4, flameY: 10.8, wickY: 15.6 },
];

const CONFETTI_COLORS = [
  "#E17497", "#F2A65A", "#F6C15C", "#CBB6EA",
  "#E8628C", "#48BB78", "#4299E1", "#F687B3",
  "#FED7D7", "#FEFCBF", "#C6F6D5", "#EBF8FF",
];

const CONFETTI_EMOJIS = ["🎉", "✨", "💖", "🎂", "🌸", "🌻", "⭐", "🎊"];

// Deterministic confetti particles for left cannon
const LEFT_PIECES = Array.from({ length: 48 }, (_, i) => ({
  targetX: 100 + ((i * 37) % 320),
  launchY: -220 - ((i * 47) % 240),
  fallY: 480 + ((i * 53) % 280),
  dur: 2.3 + ((i * 13) % 15) * 0.1,
  delay: (i % 8) * 0.04,
  rot: 360 + ((i * 97) % 720),
  isEmoji: i % 5 === 0,
  emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  w: i % 2 === 0 ? "8px" : "12px",
  h: i % 3 === 0 ? "14px" : "8px",
  radius: i % 4 === 0 ? "50%" : "2px",
}));

// Deterministic confetti particles for right cannon
const RIGHT_PIECES = Array.from({ length: 48 }, (_, i) => ({
  targetX: -100 - ((i * 41) % 320),
  launchY: -220 - ((i * 43) % 240),
  fallY: 480 + ((i * 59) % 280),
  dur: 2.3 + ((i * 17) % 15) * 0.1,
  delay: (i % 8) * 0.04,
  rot: -360 - ((i * 89) % 720),
  isEmoji: i % 5 === 0,
  emoji: CONFETTI_EMOJIS[(i + 2) % CONFETTI_EMOJIS.length],
  color: CONFETTI_COLORS[(i + 3) % CONFETTI_COLORS.length],
  w: i % 2 === 0 ? "8px" : "12px",
  h: i % 3 === 0 ? "14px" : "8px",
  radius: i % 4 === 0 ? "50%" : "2px",
}));

// Deterministic top rain pieces
const TOP_RAIN_PIECES = Array.from({ length: 24 }, (_, i) => {
  const isLeft = i % 2 === 0;
  return {
    startX: isLeft ? 5 + (i * 3.5) : 95 - (i * 3.5),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    dur: 3.8 + (i % 4) * 0.5,
    delay: 0.15 + (i * 0.08),
    shiftX: (isLeft ? 30 : -30) + (i % 3) * 15,
  };
});

/**
 * Confetti cannon dropping from BOTH sides (left & right) across the screen.
 */
function ConfettiBothSides() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* ─── LEFT CANNON: Bursts upward and rightward ─── */}
      <motion.div
        className="absolute left-2 sm:left-8 bottom-1/4 sm:bottom-1/3 text-4xl sm:text-5xl select-none"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: [0, 1.4, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 0.4 }}
      >
        🎉
        {/* Shockwave ring */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-amber-300"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {LEFT_PIECES.map((p, i) => (
        <motion.div
          key={`left-${i}`}
          className="absolute left-4 sm:left-10 bottom-1/4 sm:bottom-1/3"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, p.targetX * 0.45, p.targetX],
            y: [0, p.launchY, p.fallY],
            rotate: [0, p.rot],
            scale: [0.6, 1.1, 0.9, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            times: [0, 0.25, 0.75, 1],
            ease: "easeOut",
          }}
        >
          {p.isEmoji ? (
            <span className="text-base sm:text-lg select-none">{p.emoji}</span>
          ) : (
            <div
              className="shadow-sm"
              style={{
                backgroundColor: p.color,
                width: p.w,
                height: p.h,
                borderRadius: p.radius,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* ─── RIGHT CANNON: Bursts upward and leftward ─── */}
      <motion.div
        className="absolute right-2 sm:right-8 bottom-1/4 sm:bottom-1/3 text-4xl sm:text-5xl select-none"
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: [0, 1.4, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 0.4 }}
      >
        🎉
        {/* Shockwave ring */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-pink-300"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {RIGHT_PIECES.map((p, i) => (
        <motion.div
          key={`right-${i}`}
          className="absolute right-4 sm:right-10 bottom-1/4 sm:bottom-1/3"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, p.targetX * 0.45, p.targetX],
            y: [0, p.launchY, p.fallY],
            rotate: [0, p.rot],
            scale: [0.6, 1.1, 0.9, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            times: [0, 0.25, 0.75, 1],
            ease: "easeOut",
          }}
        >
          {p.isEmoji ? (
            <span className="text-base sm:text-lg select-none">{p.emoji}</span>
          ) : (
            <div
              className="shadow-sm"
              style={{
                backgroundColor: p.color,
                width: p.w,
                height: p.h,
                borderRadius: p.radius,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* ─── Top gentle confetti rain cascading downwards from both sides ─── */}
      {TOP_RAIN_PIECES.map((p, i) => (
        <motion.div
          key={`top-rain-${i}`}
          className="absolute -top-6"
          style={{ left: `${p.startX}%` }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.shiftX, p.shiftX * 0.5],
            rotate: [0, 540],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: 1,
            ease: "linear",
          }}
        >
          <div
            className="rounded-xs shadow-sm"
            style={{
              backgroundColor: p.color,
              width: "9px",
              height: "12px",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Animated candle flame halo overlay for realistic flickering on the cake image.
 */
function FlameGlow({ candle, index }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${candle.x}%`,
        top: `${candle.flameY}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer ambient golden aura */}
      <motion.div
        className="w-12 h-14 sm:w-16 sm:h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 230, 130, 0.45) 0%, rgba(242, 166, 90, 0.25) 45%, rgba(232, 121, 74, 0) 75%)",
          filter: "blur(4px)",
        }}
        animate={{
          scale: [0.92, 1.14, 0.96, 1.08, 0.92],
          opacity: [0.65, 0.95, 0.7, 0.9, 0.65],
          y: [0, -2, 1, -1, 0],
        }}
        transition={{
          duration: 0.75 + index * 0.08,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner flame core shimmer */}
      <motion.div
        className="absolute inset-0 m-auto w-4 h-6 sm:w-5 sm:h-8 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 225, 110, 0.8) 50%, rgba(242, 166, 90, 0) 80%)",
          filter: "blur(1.5px)",
        }}
        animate={{
          scaleY: [1, 1.25, 0.95, 1.18, 1],
          scaleX: [1, 0.88, 1.05, 0.92, 1],
          y: [0, -3, 0, -2, 0],
        }}
        transition={{
          duration: 0.55 + index * 0.07,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/**
 * Animated rising smoke wisps that appear after blowing out candles.
 */
function SmokeWisp({ candle, index }) {
  return (
    <motion.div
      className="absolute pointer-events-none flex flex-col items-center"
      style={{
        left: `${candle.x}%`,
        top: `${candle.wickY}%`,
        transform: "translate(-50%, -100%)",
      }}
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.85, 0.5, 0],
        y: [0, -20, -42, -68],
        x: [0, index % 2 === 0 ? 8 : -8, index % 2 === 0 ? -6 : 6],
        scale: [0.5, 1, 1.4, 1.9],
      }}
      transition={{
        duration: 2.2,
        delay: index * 0.07,
        ease: "easeOut",
      }}
    >
      <span className="text-sm sm:text-base opacity-75 select-none filter drop-shadow-sm">
        💨
      </span>
      {/* Tiny ember glow that quickly fades */}
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.6, delay: index * 0.06 }}
      />
    </motion.div>
  );
}

export default function BirthdayCake({
  onInteract,
  wishMsg = "Make a wish, Sunflower... 🌻",
  wishLockedText = "Wish locked safely with me. ❤️",
}) {
  const [stage, setStage] = useState("idle"); // idle → wishing → blown
  const [confettiActive, setConfettiActive] = useState(false);

  const handleCakeClick = () => {
    if (stage === "idle") {
      setStage("wishing");
    } else if (stage === "wishing") {
      handleBlow();
    }
    if (onInteract) onInteract();
  };

  const handleBlow = () => {
    if (stage === "blown") return;
    setStage("blown");
    setConfettiActive(true);
    if (onInteract) onInteract();

    // Confetti drops vigorously for 4.5 seconds
    setTimeout(() => {
      setConfettiActive(false);
    }, 4500);
  };

  const handleRelight = (e) => {
    e.stopPropagation();
    setStage("idle");
    setConfettiActive(false);
  };

  return (
    <div className="relative flex flex-col items-center mt-4 sm:mt-6 select-none">
      {/* ─── Full-screen confetti blast from both sides ─── */}
      <AnimatePresence>
        {confettiActive && <ConfettiBothSides key="confetti" />}
      </AnimatePresence>

      {/* ─── Cake Container & Interactive Canvas ─── */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer group focus:outline-none"
        onClick={handleCakeClick}
        role="button"
        tabIndex={0}
        aria-label={
          stage === "blown"
            ? "Birthday cake with candles blown out"
            : "Birthday cake with glowing candles — tap to blow out"
        }
      >
        {/* Soft magical background aura behind cake */}
        <div
          className="absolute inset-0 -inset-x-8 rounded-full pointer-events-none opacity-50 blur-2xl"
          style={{
            background:
              stage === "blown"
                ? "radial-gradient(circle, rgba(169, 141, 209, 0.25) 0%, rgba(0,0,0,0) 70%)"
                : "radial-gradient(circle, rgba(242, 166, 90, 0.4) 0%, rgba(225, 116, 151, 0.2) 50%, rgba(0,0,0,0) 75%)",
          }}
        />

        {/* ─── CAKE IMAGE ─── */}
        <div className="relative w-72 sm:w-96 max-w-[90vw]">
          <img
            src={
              stage === "blown"
                ? "/photos/chocolate-birthday-cake-unlit.png"
                : "/photos/chocolate-birthday-cake.png"
            }
            alt="Decadent Chocolate Birthday Cake"
            className="w-full h-auto object-contain filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.55)] transition-opacity duration-300"
            loading="eager"
            decoding="async"
          />

          {/* ─── 5 Candle Flames / Smoke Wisps ─── */}
          {stage !== "blown" ? (
            CANDLES.map((candle, i) => (
              <FlameGlow key={`flame-${candle.id}`} candle={candle} index={i} />
            ))
          ) : (
            CANDLES.map((candle, i) => (
              <SmokeWisp key={`smoke-${candle.id}`} candle={candle} index={i} />
            ))
          )}

          {/* Ambient Sparkles around lit cake */}
          {stage !== "blown" && (
            <>
              <motion.span
                className="absolute text-base sm:text-lg select-none pointer-events-none"
                style={{ top: "18%", left: "14%" }}
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8], y: [0, -6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✨
              </motion.span>
              <motion.span
                className="absolute text-base sm:text-lg select-none pointer-events-none"
                style={{ top: "16%", right: "12%" }}
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8], y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                ✨
              </motion.span>
              <motion.span
                className="absolute text-sm select-none pointer-events-none"
                style={{ bottom: "24%", left: "8%" }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.1, 0.7] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                ⭐
              </motion.span>
              <motion.span
                className="absolute text-sm select-none pointer-events-none"
                style={{ bottom: "22%", right: "8%" }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.7, 1.1, 0.7] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                ⭐
              </motion.span>
            </>
          )}
        </div>

        {/* Floating tooltip hint on hover when idle */}
        {stage === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-2 inset-x-0 flex justify-center pointer-events-none"
          >
            <span className="font-hand text-sm sm:text-base text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
              ✨ Tap to make a wish & blow candles ✨
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* ─── Wish & Blow Controls ─── */}
      <AnimatePresence mode="wait">
        {stage === "wishing" && (
          <motion.div
            key="wishing"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-6 flex flex-col items-center text-center px-4"
          >
            <p className="font-hand text-2xl sm:text-3xl text-white drop-shadow-[0_2px_10px_rgba(242,166,90,0.8)]">
              {wishMsg}
            </p>
            <p className="font-body text-xs sm:text-sm text-white/70 mt-1 max-w-xs">
              Close your eyes, hold your wish in your heart, then blow... 💭✨
            </p>

            <motion.button
              onClick={handleBlow}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(242,166,90,0.5)",
                  "0 0 35px rgba(225,116,151,0.8)",
                  "0 0 20px rgba(242,166,90,0.5)",
                ],
              }}
              transition={{
                boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              }}
              className="mt-4 flex items-center gap-2 font-body font-bold text-sm sm:text-base px-8 py-3.5 rounded-full text-white bg-gradient-to-r from-amber-500 via-blush-deep to-lavender-deep border border-white/30 shadow-lg cursor-pointer"
            >
              <span>🕯️</span>
              <span>Blow the Candles</span>
              <span>💨</span>
            </motion.button>
          </motion.div>
        )}

        {stage === "blown" && (
          <motion.div
            key="blown"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-col items-center text-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/40 backdrop-blur-md px-5 py-1.5 rounded-full mb-3"
            >
              <span className="text-xl">🎉</span>
              <span className="font-display font-semibold text-lg text-white">
                Happy Birthday Selva!
              </span>
              <span className="text-xl">🎉</span>
            </motion.div>

            <p className="font-hand text-2xl sm:text-3xl text-white text-center drop-shadow-[0_2px_12px_rgba(225,116,151,0.9)] max-w-md">
              {wishLockedText}
            </p>

            <div className="flex gap-3 mt-4">
              <motion.button
                onClick={handleRelight}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-body text-xs sm:text-sm px-4 py-2 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-1.5"
              >
                <span>🕯️</span>
                <span>Light Candles Again</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
