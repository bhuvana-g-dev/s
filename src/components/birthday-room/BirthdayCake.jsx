import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wishMessage, wishLockedMessage } from "../../data/birthdayRoom";

const CANDLE_X = [30, 50, 70, 90];

function CakeSVG({ litCandles }) {
  return (
    <svg viewBox="0 0 120 100" className="w-32 sm:w-40 h-auto">
      {CANDLE_X.map((x, i) => (
        <g key={i}>
          <rect x={x - 2} y="4" width="4" height="16" fill="#F4B8CE" />
          {litCandles && (
            <motion.circle
              cx={x}
              cy="2"
              r="3"
              fill="#F2A65A"
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1 + i * 0.1, repeat: Infinity }}
            />
          )}
        </g>
      ))}
      <rect x="25" y="20" width="70" height="24" rx="4" fill="#FBE1EB" stroke="#E17497" strokeWidth="1.5" />
      <rect x="10" y="44" width="100" height="34" rx="5" fill="#FFF8F0" stroke="#D9A857" strokeWidth="1.5" />
      {[20, 40, 60, 80, 100].map((x, i) => (
        <circle key={i} cx={x} cy="44" r="3" fill="#E8628C" opacity="0.8" />
      ))}
      <rect x="5" y="78" width="110" height="8" rx="3" fill="#D9A857" />
    </svg>
  );
}

function SmokeAndHearts() {
  return (
    <div className="absolute inset-x-0 -top-4 pointer-events-none flex justify-center">
      {CANDLE_X.map((x, i) => (
        <motion.span
          key={i}
          className="absolute text-lg"
          style={{ left: `${20 + x / 1.5}px` }}
          initial={{ opacity: 0.7, y: 0 }}
          animate={{ opacity: 0, y: -30 }}
          transition={{ duration: 1.6, delay: i * 0.1 }}
        >
          💨
        </motion.span>
      ))}
      {Array.from({ length: 8 }, (_, i) => i).map((i) => (
        <motion.span
          key={`h${i}`}
          className="absolute text-base text-cinema-rose"
          style={{ left: `${10 + i * 12}%` }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -80, opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, delay: 0.3 + i * 0.15 }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

function ConfettiBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 18 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-sm"
          style={{ left: `${(i * 11 + 4) % 100}%`, top: "30%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -40, 60], opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 1.8, delay: (i % 6) * 0.08 }}
        >
          {["🎊", "✨", "🎉"][i % 3]}
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdayCake({ onInteract }) {
  const [stage, setStage] = useState("idle"); // idle -> wishing -> blown
  const [showBurst, setShowBurst] = useState(false);

  const handleTapCake = () => {
    if (stage !== "idle") return;
    setStage("wishing");
    onInteract?.();
  };

  const handleBlow = () => {
    setStage("blown");
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 1800);
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={handleTapCake}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative focus:outline-none"
        aria-label="Tap the birthday cake"
      >
        {showBurst && <ConfettiBurst />}
        {stage === "blown" && <SmokeAndHearts />}
        <CakeSVG litCandles={stage !== "blown"} />
      </motion.button>

      <AnimatePresence mode="wait">
        {stage === "wishing" && (
          <motion.div
            key="wishing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-center"
          >
            <p className="font-hand text-xl text-cinema-cream">{wishMessage}</p>
            <button
              onClick={handleBlow}
              className="mt-3 font-body text-xs sm:text-sm px-4 py-2 rounded-full bg-gradient-to-r from-cinema-ember to-cinema-rose text-white hover:opacity-90 transition-opacity"
            >
              🕯️ Blow the Candles
            </button>
          </motion.div>
        )}
        {stage === "blown" && (
          <motion.p
            key="blown"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-hand text-xl text-cinema-cream text-center"
          >
            {wishLockedMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
