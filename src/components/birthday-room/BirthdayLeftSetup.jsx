import { motion } from "framer-motion";

function Cake() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="flex flex-col items-center"
    >
      <svg viewBox="0 0 120 100" className="w-28 sm:w-36 h-auto">
        {/* candles with flames */}
        {[30, 50, 70, 90].map((x, i) => (
          <g key={i}>
            <rect x={x - 2} y="4" width="4" height="16" fill="#F4B8CE" />
            <motion.circle
              cx={x}
              cy="2"
              r="3"
              fill="#F2A65A"
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1 + i * 0.1, repeat: Infinity }}
            />
          </g>
        ))}
        {/* top tier */}
        <rect x="25" y="20" width="70" height="24" rx="4" fill="#FBE1EB" stroke="#E17497" strokeWidth="1.5" />
        {/* bottom tier */}
        <rect x="10" y="44" width="100" height="34" rx="5" fill="#FFF8F0" stroke="#D9A857" strokeWidth="1.5" />
        {/* drips */}
        {[20, 40, 60, 80, 100].map((x, i) => (
          <circle key={i} cx={x} cy="44" r="3" fill="#E8628C" opacity="0.8" />
        ))}
        {/* base */}
        <rect x="5" y="78" width="110" height="8" rx="3" fill="#D9A857" />
      </svg>
      <p className="font-hand text-lg text-blush-deep mt-1">the cake ✨</p>
    </motion.div>
  );
}

function Gifts() {
  const colors = ["#E17497", "#A98DD1", "#F2A65A"];
  return (
    <div className="flex gap-3 justify-center mt-4">
      {colors.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.15, type: "spring", stiffness: 140 }}
          whileHover={{ y: -4 }}
        >
          <svg viewBox="0 0 40 40" className="w-10 sm:w-12 h-auto">
            <rect x="4" y="14" width="32" height="22" rx="2" fill={c} />
            <rect x="4" y="14" width="32" height="6" fill="#FBEAD9" opacity="0.5" />
            <rect x="17" y="14" width="6" height="22" fill="#FBEAD9" opacity="0.7" />
            <path d="M12 14 Q20 0 20 14 Q20 0 28 14" fill="none" stroke="#FBEAD9" strokeWidth="2" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function BalloonArch() {
  const colors = ["#E17497", "#F4B8CE", "#CBB6EA", "#F2A65A", "#E8628C"];
  return (
    <div className="absolute -top-6 left-0 right-0 flex justify-center gap-1 sm:gap-2 flex-wrap px-2">
      {Array.from({ length: 14 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="inline-block w-4 h-5 sm:w-5 sm:h-6 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: (i % 5) * 0.15 }}
        />
      ))}
    </div>
  );
}

function ConfettiCannonBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 16 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-sm"
          style={{ left: `${(i * 13 + 4) % 100}%`, top: "20%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, 120], opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 3, delay: (i % 8) * 0.3, repeat: Infinity }}
        >
          {["🎊", "✨", "🎉"][i % 3]}
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdayLeftSetup() {
  return (
    <div className="relative bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 p-6 sm:p-8 pt-12 overflow-hidden">
      <BalloonArch />
      <ConfettiCannonBurst />

      {/* hanging polaroids */}
      <div className="absolute top-4 left-4 hidden sm:flex gap-3">
        {[-8, 6].map((r, i) => (
          <div
            key={i}
            className="w-12 h-14 bg-white p-1 pb-2 shadow-soft"
            style={{ transform: `rotate(${r}deg)` }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blush-light to-lavender-light" />
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-lg sm:text-xl text-cinema-ember text-center mb-6 relative z-10"
      >
        🎉 Happy Birthday Selva Meenakshi ❤️🌻
      </motion.p>

      <div className="relative z-10 flex flex-col items-center">
        <Cake />
        <Gifts />
      </div>

      {/* ribbons along the bottom edge */}
      <div className="flex justify-center gap-2 mt-6 relative z-10">
        {["🎀", "🌸", "🎀"].map((r, i) => (
          <span key={i} className="text-lg opacity-80">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
