import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function SwingScene() {
  return (
    <svg viewBox="0 0 220 220" className="w-56 sm:w-72 h-auto">
      {/* tree branch */}
      <line x1="10" y1="20" x2="210" y2="20" stroke="#7a4b3a" strokeWidth="8" strokeLinecap="round" />
      {/* ropes */}
      <line x1="90" y1="20" x2="90" y2="110" stroke="#B98A63" strokeWidth="3" />
      <line x1="130" y1="20" x2="130" y2="110" stroke="#B98A63" strokeWidth="3" />
      {/* seat */}
      <rect x="82" y="108" width="56" height="10" rx="3" fill="#D9A857" />

      {/* girl 1 */}
      <circle cx="98" cy="92" r="10" fill="#F2A65A" />
      <rect x="90" y="100" width="18" height="20" rx="6" fill="#E17497" />
      {/* girl 2 */}
      <circle cx="122" cy="92" r="10" fill="#E8628C" />
      <rect x="114" y="100" width="18" height="20" rx="6" fill="#CBB6EA" />

      {/* scarves */}
      <motion.path
        d="M108 105 Q130 100 145 108"
        stroke="#FBEAD9"
        strokeWidth="4"
        fill="none"
        animate={{ d: ["M108 105 Q128 98 142 104", "M108 105 Q132 108 148 116", "M108 105 Q128 98 142 104"] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
    </svg>
  );
}

export default function SwingTransition({ onComplete }) {
  const [phase, setPhase] = useState("swinging"); // swinging -> clouds -> done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("clouds"), 2600);
    const t2 = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FBE1EB 0%, #EDE4F8 60%, #FFF8F0 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* leaves & petals swept by the wind */}
      {Array.from({ length: 12 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-xl"
          style={{ left: `${(i * 8 + 4) % 100}%`, top: `${(i * 13) % 60}%` }}
          initial={{ opacity: 0 }}
          animate={{ x: [0, 40, 90], y: [0, -10, 20], opacity: [0, 1, 0], rotate: 180 }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
        >
          {i % 2 === 0 ? "🍃" : "🌸"}
        </motion.span>
      ))}

      {phase === "swinging" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.3, y: 40 }}
          animate={{ scale: [0.3, 1, 1.05, 1], y: [40, 0, -260, -520] }}
          transition={{ duration: 2.6, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
        >
          <motion.div animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 1.2, repeat: 3 }}>
            <SwingScene />
          </motion.div>
        </motion.div>
      )}

      {phase === "clouds" && (
        <motion.div
          className="absolute inset-0 bg-white flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {Array.from({ length: 6 }, (_, i) => i).map((i) => (
            <motion.span
              key={i}
              className="absolute text-6xl opacity-70"
              style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
            >
              ☁️
            </motion.span>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative font-hand text-2xl sm:text-3xl text-blush-deep text-center px-6"
          >
            higher... and higher...
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}
