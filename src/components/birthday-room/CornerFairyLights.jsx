import { motion } from "framer-motion";

/**
 * Individual hanging bulb with socket and glowing aura.
 */
function HangingBulb({ x, y, delay = 0, size = "md" }) {
  const r = size === "lg" ? 6.5 : size === "sm" ? 4.5 : 5.5;

  return (
    <g className="select-none">
      {/* Short wire drop from main cable to bulb socket */}
      <line x1={x} y1={y - 7} x2={x} y2={y} stroke="#7A5636" strokeWidth="1.2" />

      {/* Brass bulb base socket */}
      <rect
        x={x - 2.5}
        y={y - 2.5}
        width="5"
        height="3"
        rx="0.8"
        fill="#C49A45"
        stroke="#8C6623"
        strokeWidth="0.5"
      />

      {/* Glowing outer aura */}
      <motion.circle
        cx={x}
        cy={y + 5}
        r={r * 2.8}
        fill="url(#bulbGlow)"
        animate={{
          opacity: [0.55, 0.95, 0.6, 0.9, 0.55],
          scale: [0.95, 1.15, 0.98, 1.1, 0.95],
        }}
        transition={{
          duration: 2.2 + (delay % 3) * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.3,
        }}
      />

      {/* Bulb glass body */}
      <circle
        cx={x}
        cy={y + 5}
        r={r}
        fill="url(#bulbBodyGrad)"
        stroke="#FFE89E"
        strokeWidth="0.8"
      />

      {/* Bright hot filament center */}
      <circle cx={x} cy={y + 4.5} r={r * 0.4} fill="#FFFFFF" opacity="0.95" />
    </g>
  );
}

export default function CornerFairyLights() {
  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none z-20 overflow-hidden h-44 sm:h-56 md:h-64">
      {/* ─── SHARED GRADIENT DEFS ─── */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Wire gradient */}
          <linearGradient id="cableGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A301E" />
            <stop offset="50%" stopColor="#8C6239" />
            <stop offset="100%" stopColor="#4A301E" />
          </linearGradient>

          {/* Glowing amber bulb radial fill */}
          <radialGradient id="bulbBodyGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFF1B8" />
            <stop offset="70%" stopColor="#F6C15C" />
            <stop offset="100%" stopColor="#D9882E" />
          </radialGradient>

          {/* Outer soft light halo */}
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#F6C15C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D9882E" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* ─── TOP LEFT CORNER GARLAND ─── */}
      <div className="absolute top-0 left-0 w-56 sm:w-80 md:w-96 h-full">
        <svg viewBox="0 0 380 200" className="w-full h-full overflow-visible" fill="none">
          {/* Upper Swag Wire */}
          <path
            d="M -10 18 Q 110 70 260 22 Q 310 14 360 8"
            stroke="url(#cableGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Lower Swag Wire */}
          <path
            d="M -10 45 Q 80 120 220 70 Q 280 50 330 35"
            stroke="url(#cableGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Upper Wire Bulbs */}
          <HangingBulb x={22} y={34} delay={0.2} size="md" />
          <HangingBulb x={70} y={54} delay={0.7} size="lg" />
          <HangingBulb x={125} y={63} delay={0.4} size="lg" />
          <HangingBulb x={185} y={52} delay={0.9} size="md" />
          <HangingBulb x={245} y={28} delay={0.1} size="sm" />
          <HangingBulb x={305} y={16} delay={0.5} size="sm" />

          {/* Lower Wire Bulbs */}
          <HangingBulb x={35} y={75} delay={0.8} size="md" />
          <HangingBulb x={85} y={115} delay={0.3} size="lg" />
          <HangingBulb x={145} y={108} delay={0.6} size="lg" />
          <HangingBulb x={205} y={80} delay={1.1} size="md" />
          <HangingBulb x={268} y={58} delay={0.4} size="sm" />
        </svg>
      </div>

      {/* ─── TOP RIGHT CORNER GARLAND (Mirrored) ─── */}
      <div className="absolute top-0 right-0 w-56 sm:w-80 md:w-96 h-full scale-x-[-1]">
        <svg viewBox="0 0 380 200" className="w-full h-full overflow-visible" fill="none">
          {/* Upper Swag Wire */}
          <path
            d="M -10 18 Q 110 70 260 22 Q 310 14 360 8"
            stroke="url(#cableGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Lower Swag Wire */}
          <path
            d="M -10 45 Q 80 120 220 70 Q 280 50 330 35"
            stroke="url(#cableGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Upper Wire Bulbs */}
          <HangingBulb x={22} y={34} delay={0.6} size="md" />
          <HangingBulb x={70} y={54} delay={0.1} size="lg" />
          <HangingBulb x={125} y={63} delay={0.8} size="lg" />
          <HangingBulb x={185} y={52} delay={0.3} size="md" />
          <HangingBulb x={245} y={28} delay={0.9} size="sm" />
          <HangingBulb x={305} y={16} delay={0.4} size="sm" />

          {/* Lower Wire Bulbs */}
          <HangingBulb x={35} y={75} delay={0.5} size="md" />
          <HangingBulb x={85} y={115} delay={1.0} size="lg" />
          <HangingBulb x={145} y={108} delay={0.2} size="lg" />
          <HangingBulb x={205} y={80} delay={0.7} size="md" />
          <HangingBulb x={268} y={58} delay={0.3} size="sm" />
        </svg>
      </div>
    </div>
  );
}
