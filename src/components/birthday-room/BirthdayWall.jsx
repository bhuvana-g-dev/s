import { motion } from "framer-motion";
import { wallBannerLines, wallSubtitle } from "../../data/birthdayRoom";

function FairyLightRow() {
  return (
    <div className="flex justify-between px-2">
      {Array.from({ length: 14 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="text-sm sm:text-base"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }}
        >
          💡
        </motion.span>
      ))}
    </div>
  );
}

function BalloonArch() {
  const colors = ["#E17497", "#F4B8CE", "#CBB6EA", "#F2A65A", "#E8628C"];
  return (
    <div className="flex justify-center gap-1.5 flex-wrap px-2 mt-2">
      {Array.from({ length: 16 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="inline-block w-4 h-5 sm:w-5 sm:h-6 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: (i % 5) * 0.15 }}
        />
      ))}
    </div>
  );
}

function HangingStars() {
  return (
    <div className="absolute top-2 left-0 right-0 flex justify-around px-6 pointer-events-none">
      {["⭐", "✨", "⭐", "✨", "⭐"].map((s, i) => (
        <motion.span
          key={i}
          className="text-lg"
          animate={{ rotate: [-8, 8, -8], y: [0, 4, 0] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdayWall() {
  return (
    <div className="relative rounded-3xl bg-white/25 backdrop-blur-md border border-white/40 p-5 sm:p-8 pt-8 overflow-hidden">
      <HangingStars />
      <FairyLightRow />
      <BalloonArch />

      {/* ribbons + flowers framing the banner */}
      <div className="flex justify-center gap-2 mt-3 text-lg opacity-80">
        <span>🎀</span>
        <span>🌻</span>
        <span>🌸</span>
        <span>🌻</span>
        <span>🎀</span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-display text-2xl sm:text-4xl text-center text-cinema-cream mt-4 leading-tight drop-shadow-[0_0_16px_rgba(242,166,90,0.55)]"
      >
        {wallBannerLines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="font-hand text-lg sm:text-xl text-cinema-cream/75 text-center mt-3"
      >
        {wallSubtitle}
      </motion.p>
    </div>
  );
}
