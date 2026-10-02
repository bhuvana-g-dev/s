import { motion } from "framer-motion";

/**
 * 3D Metallic Balloon with specular highlight reflection and curly golden ribbon.
 */
function MetallicBalloon({
  colorGradId,
  highlightColor = "#FFFFFF",
  x = 0,
  y = 0,
  scale = 1,
  tilt = 0,
  delay = 0,
}) {
  return (
    <motion.g
      transform={`translate(${x}, ${y}) rotate(${tilt}) scale(${scale})`}
      animate={{
        y: [y, y - 8, y],
        rotate: [tilt, tilt + 2.5, tilt],
      }}
      transition={{
        duration: 3.6 + delay * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* ── Curly golden ribbon trailing down ── */}
      <motion.path
        d="M 50 114 Q 44 135 56 150 Q 64 165 48 180 Q 38 195 52 210 Q 62 225 46 245"
        stroke="url(#goldenRibbonGrad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        animate={{
          d: [
            "M 50 114 Q 44 135 56 150 Q 64 165 48 180 Q 38 195 52 210 Q 62 225 46 245",
            "M 50 114 Q 48 135 42 152 Q 36 168 54 182 Q 66 195 44 212 Q 38 226 52 245",
            "M 50 114 Q 44 135 56 150 Q 64 165 48 180 Q 38 195 52 210 Q 62 225 46 245",
          ],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay }}
      />

      {/* ── Balloon tie knot ── */}
      <polygon points="46,112 54,112 50,118" fill="#A86E78" />
      <ellipse cx="50" cy="112" rx="4.5" ry="2.5" fill="#8E5460" />

      {/* ── Main 3D Balloon Body ── */}
      <path
        d="M 50 112 C 20 112 10 75 10 50 C 10 22 28 8 50 8 C 72 8 90 22 90 50 C 90 75 80 112 50 112 Z"
        fill={`url(#${colorGradId})`}
        filter="drop-shadow(0 10px 20px rgba(0, 0, 0, 0.45))"
      />

      {/* ── Primary Soft Top-Left Glossy Crescent Reflection ── */}
      <path
        d="M 28 20 C 35 15 45 14 55 14 C 42 18 32 28 30 42 C 28 50 28 62 30 70 C 24 62 22 45 23 35 C 24 28 26 23 28 20 Z"
        fill={highlightColor}
        opacity="0.45"
      />

      {/* ── Crisp White Specular Glint ── */}
      <ellipse
        cx="34"
        cy="28"
        rx="6"
        ry="10"
        transform="rotate(-24, 34, 28)"
        fill="#FFFFFF"
        opacity="0.75"
      />

      {/* ── Subtle secondary rim bounce light on bottom-right ── */}
      <path
        d="M 72 80 C 78 70 80 55 78 45 C 80 58 78 72 70 85 Z"
        fill="#FFFFFF"
        opacity="0.2"
      />
    </motion.g>
  );
}

export default function CornerBalloons() {
  return (
    <div className="absolute inset-x-0 top-16 sm:top-20 pointer-events-none z-10 overflow-hidden">
      {/* ─── SHARED BALLOON COLOR GRADIENTS ─── */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Balloon 1: Metallic Rose Gold / Dusty Mauve */}
          <radialGradient id="balloonRoseGold" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF0F2" />
            <stop offset="25%" stopColor="#F4ACB7" />
            <stop offset="65%" stopColor="#D97A8C" />
            <stop offset="90%" stopColor="#A84C60" />
            <stop offset="100%" stopColor="#6C2838" />
          </radialGradient>

          {/* Balloon 2: Metallic Golden Champagne */}
          <radialGradient id="balloonChampagne" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF9E6" />
            <stop offset="25%" stopColor="#F6D385" />
            <stop offset="65%" stopColor="#E2A64E" />
            <stop offset="90%" stopColor="#B37424" />
            <stop offset="100%" stopColor="#70440E" />
          </radialGradient>

          {/* Balloon 3: Soft Blush Pink */}
          <radialGradient id="balloonBlushPink" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFF5F7" />
            <stop offset="30%" stopColor="#FFCCD5" />
            <stop offset="70%" stopColor="#E08398" />
            <stop offset="95%" stopColor="#B05067" />
            <stop offset="100%" stopColor="#752B3E" />
          </radialGradient>

          {/* Ribbon metallic gold gradient */}
          <linearGradient id="goldenRibbonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE599" />
            <stop offset="40%" stopColor="#F6C15C" />
            <stop offset="80%" stopColor="#D9882E" />
            <stop offset="100%" stopColor="#9C5A14" />
          </linearGradient>
        </defs>
      </svg>

      {/* ─── LEFT CORNER BALLOON CLUSTER ─── */}
      <div className="absolute left-[-15px] sm:left-4 md:left-8 top-8 sm:top-14 w-36 sm:w-56 md:w-64 h-80 sm:h-96">
        <svg viewBox="0 0 160 260" className="w-full h-full overflow-visible" fill="none">
          {/* Back Champagne Balloon */}
          <MetallicBalloon
            colorGradId="balloonChampagne"
            x={-10}
            y={28}
            scale={0.88}
            tilt={-10}
            delay={0.6}
          />
          {/* Front Main Rose Gold Balloon */}
          <MetallicBalloon
            colorGradId="balloonRoseGold"
            x={22}
            y={0}
            scale={1.06}
            tilt={-4}
            delay={0}
          />
          {/* Lower Blush Pink Balloon */}
          <MetallicBalloon
            colorGradId="balloonBlushPink"
            x={48}
            y={55}
            scale={0.92}
            tilt={8}
            delay={1.2}
          />
        </svg>
      </div>

      {/* ─── RIGHT CORNER BALLOON CLUSTER (Mirrored) ─── */}
      <div className="absolute right-[-15px] sm:right-4 md:right-8 top-8 sm:top-14 w-36 sm:w-56 md:w-64 h-80 sm:h-96 scale-x-[-1]">
        <svg viewBox="0 0 160 260" className="w-full h-full overflow-visible" fill="none">
          {/* Back Champagne Balloon */}
          <MetallicBalloon
            colorGradId="balloonChampagne"
            x={-10}
            y={28}
            scale={0.88}
            tilt={-10}
            delay={0.8}
          />
          {/* Front Main Rose Gold Balloon */}
          <MetallicBalloon
            colorGradId="balloonRoseGold"
            x={22}
            y={0}
            scale={1.06}
            tilt={-4}
            delay={0.2}
          />
          {/* Lower Blush Pink Balloon */}
          <MetallicBalloon
            colorGradId="balloonBlushPink"
            x={48}
            y={55}
            scale={0.92}
            tilt={8}
            delay={1.4}
          />
        </svg>
      </div>
    </div>
  );
}
