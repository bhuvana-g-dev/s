import { motion } from "framer-motion";

const confettiColors = ["#F4B8CE", "#CBB6EA", "#D9A857", "#E17497", "#FBEFE1"];

function ConfettiPiece({ left, delay, color, rotate }) {
  return (
    <motion.div
      className="absolute top-[-5%] pointer-events-none rounded-sm"
      style={{ left: `${left}%`, width: 8, height: 14, backgroundColor: color }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ y: "105vh", opacity: [0, 1, 1, 0], rotate }}
      transition={{ duration: 6 + (left % 4), delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function Balloon({ left, delay, color }) {
  return (
    <motion.div
      className="absolute bottom-[-15%] pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: "-120vh", opacity: [0, 1, 1, 0.9] }}
      transition={{ duration: 13 + (left % 5), delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="34" height="44" viewBox="0 0 34 44" fill="none">
        <ellipse cx="17" cy="17" rx="17" ry="20" fill={color} opacity="0.85" />
        <path d="M17 37L15 44H19L17 37Z" fill={color} opacity="0.85" />
        <line x1="17" y1="37" x2="17" y2="60" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/** Elegant, restrained birthday celebration: soft confetti + balloons + sparkle burst. */
export default function Celebration() {
  const confetti = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: (i * 13 + 3) % 100,
    delay: i * 0.35,
    color: confettiColors[i % confettiColors.length],
    rotate: i % 2 === 0 ? 360 : -360,
  }));
  const balloons = [
    { left: 8, delay: 0, color: "#F4B8CE" },
    { left: 22, delay: 2, color: "#CBB6EA" },
    { left: 78, delay: 4, color: "#D9A857" },
    { left: 90, delay: 1, color: "#E17497" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {confetti.map((c) => (
        <ConfettiPiece key={c.id} {...c} />
      ))}
      {balloons.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}
    </div>
  );
}
