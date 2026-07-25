import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  chocolateHeavenTitle,
  chocolateHeavenWarning,
  chocolateFountainMessage,
  dessertItems,
} from "../../data/foods";

function ChocolateSplash() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-sm"
          style={{ left: `${40 + (i % 6) * 4}%`, top: "40%" }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ y: [-10, -40, 10], opacity: [0, 1, 0], scale: [0.5, 1, 0.7] }}
          transition={{ duration: 1.2, delay: i * 0.05 }}
        >
          🍫
        </motion.span>
      ))}
    </div>
  );
}

function Fountain({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="relative focus:outline-none"
      aria-label="Chocolate fountain"
    >
      <svg viewBox="0 0 80 90" className="w-20 sm:w-24 h-auto">
        <ellipse cx="40" cy="82" rx="34" ry="6" fill="#5b3628" />
        <rect x="30" y="40" width="20" height="40" fill="#7a4b3a" />
        <ellipse cx="40" cy="40" rx="22" ry="6" fill="#5b3628" />
        <ellipse cx="40" cy="26" rx="15" ry="5" fill="#7a4b3a" />
        <ellipse cx="40" cy="14" rx="9" ry="4" fill="#5b3628" />
        <motion.path
          d="M40 10 Q44 24 40 26 Q36 38 40 40"
          stroke="#3D2140"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </svg>
    </motion.button>
  );
}

export default function ChocolateHeaven({ onInteract }) {
  const [splash, setSplash] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFountainClick = () => {
    setSplash(true);
    setMessage(chocolateFountainMessage);
    onInteract?.();
    setTimeout(() => setSplash(false), 1300);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 mt-6 overflow-hidden">
      <p className="font-display text-lg sm:text-xl text-cinema-ember text-center mb-1">
        {chocolateHeavenTitle}
      </p>
      <p className="font-hand text-xs text-cinema-cream/50 text-center mb-5 whitespace-pre-line">
        {chocolateHeavenWarning}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {dessertItems.map((d) => (
          <div key={d.id} className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cinema-cream shadow-soft flex items-center justify-center text-xl">
              {d.icon}
            </div>
            <span className="font-hand text-[11px] text-cinema-cream/70 mt-1 text-center max-w-[70px]">
              {d.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center">
        {splash && <ChocolateSplash />}
        <Fountain onClick={handleFountainClick} />
      </div>

      <div className="h-6 flex items-center justify-center mt-2">
        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-hand text-base text-cinema-sunset text-center"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
