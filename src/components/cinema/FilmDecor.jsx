import { motion } from "framer-motion";

/** A vintage film-strip ribbon with sprocket holes, gently swaying. */
function FilmStrip({ className, rotate = 0, width = 90 }) {
  const holes = Array.from({ length: 6 });
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ rotate: `${rotate}deg` }}
      animate={{ rotate: [rotate - 2, rotate + 2, rotate - 2] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={width} height={width * 2.4} viewBox="0 0 60 160">
        <rect x="0" y="0" width="60" height="160" rx="6" fill="#1A1025" opacity="0.55" />
        {holes.map((_, i) => (
          <g key={i}>
            <rect x="4" y={10 + i * 25} width="8" height="8" rx="2" fill="#FBEAD9" opacity="0.4" />
            <rect x="48" y={10 + i * 25} width="8" height="8" rx="2" fill="#FBEAD9" opacity="0.4" />
          </g>
        ))}
        <rect x="16" y="18" width="28" height="124" rx="3" fill="#F2A65A" opacity="0.15" />
      </svg>
    </motion.div>
  );
}

function TinyCamera({ className, delay = 0 }) {
  return (
    <motion.span
      className={`absolute pointer-events-none text-2xl select-none ${className}`}
      animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      🎥
    </motion.span>
  );
}

function TinyStar({ className, delay = 0 }) {
  return (
    <motion.span
      className={`absolute pointer-events-none text-cinema-sunset select-none ${className}`}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      ✦
    </motion.span>
  );
}

/** Scattered vintage decor: film strips, camera icons, and twinkling stars. */
export default function FilmDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <FilmStrip className="-left-6 top-24 hidden sm:block" rotate={-8} width={70} />
      <FilmStrip className="-right-8 top-1/3 hidden sm:block" rotate={10} width={80} />
      <TinyCamera className="top-16 right-10" delay={0} />
      <TinyCamera className="bottom-40 left-8" delay={2} />
      {Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: (i * 17 + 5) % 90,
        left: (i * 23 + 3) % 95,
        delay: i * 0.6,
      })).map((s) => (
        <div key={s.id} className="absolute" style={{ top: `${s.top}%`, left: `${s.left}%` }}>
          <TinyStar delay={s.delay} />
        </div>
      ))}
    </div>
  );
}
