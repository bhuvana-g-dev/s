import { motion } from "framer-motion";

function Cloud({ top, delay, scale = 1 }) {
  return (
    <motion.svg
      viewBox="0 0 60 30"
      className="absolute"
      style={{ top: `${top}%`, width: 60 * scale, opacity: 0.8 }}
      initial={{ left: "-15%" }}
      animate={{ left: "110%" }}
      transition={{ duration: 26, delay, repeat: Infinity, ease: "linear" }}
    >
      <ellipse cx="15" cy="18" rx="15" ry="10" fill="white" />
      <ellipse cx="32" cy="14" rx="18" ry="12" fill="white" />
      <ellipse cx="48" cy="19" rx="12" ry="9" fill="white" />
    </motion.svg>
  );
}

function CoasterScene({ riding }) {
  return (
    <svg viewBox="0 0 260 220" className="w-full h-auto">
      {/* sky handled by parent background */}
      {/* track — a gentle loop-ish hill shape */}
      <path
        id="track"
        d="M20 190 C 60 60, 110 60, 130 130 C 150 190, 200 190, 240 90"
        stroke="#CBB6EA"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M20 196 C 60 66, 110 66, 130 136 C 150 196, 200 196, 240 96"
        stroke="#A98DD1"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* support poles */}
      {[40, 90, 130, 170, 220].map((x, i) => (
        <line key={i} x1={x} y1="190" x2={x} y2="215" stroke="#D9C4AE" strokeWidth="4" />
      ))}

      {/* little trees */}
      <g transform="translate(10,190)">
        <rect x="-2" y="10" width="4" height="14" fill="#B98A63" />
        <circle cx="0" cy="6" r="10" fill="#B7CDA0" />
      </g>
      <g transform="translate(250,190)">
        <rect x="-2" y="10" width="4" height="14" fill="#B98A63" />
        <circle cx="0" cy="6" r="9" fill="#B7CDA0" />
      </g>

      {/* flowers along the ground */}
      {[55, 100, 160, 205].map((x, i) => (
        <text key={i} x={x} y="215" fontSize="10">🌼</text>
      ))}

      {/* the cart with two girls, animated along the track */}
      <motion.g
        animate={
          riding
            ? { offsetDistance: "100%" }
            : { offsetDistance: ["0%", "6%", "0%"] }
        }
        transition={
          riding
            ? { duration: 2.2, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          offsetPath: "path('M20 190 C 60 60, 110 60, 130 130 C 150 190, 200 190, 240 90')",
          offsetRotate: "auto",
        }}
      >
        <g transform="translate(-10,-14)">
          <rect x="0" y="8" width="22" height="10" rx="3" fill="#E17497" />
          <circle cx="4" cy="20" r="3" fill="#6B5150" />
          <circle cx="18" cy="20" r="3" fill="#6B5150" />
          <circle cx="7" cy="4" r="4" fill="#F4B8CE" />
          <circle cx="15" cy="4" r="4" fill="#CBB6EA" />
        </g>
      </motion.g>
    </svg>
  );
}

export default function RollerCoaster({ onStartRide, riding }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden glass-card p-4 sm:p-6">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(180deg, #EDE4F8 0%, #FBE1EB 60%, #EDE0D4 100%)" }}
        >
          <Cloud top={8} delay={0} scale={1} />
          <Cloud top={18} delay={9} scale={0.7} />
          <Cloud top={4} delay={17} scale={0.85} />
          <CoasterScene riding={riding} />
        </div>

        <p className="font-hand text-xl sm:text-2xl text-lavender-deep text-center mt-4">
          Ready to relive our memories?
        </p>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={onStartRide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-body font-semibold text-sm sm:text-base px-6 py-3 rounded-full text-white shadow-soft"
            style={{
              background: "linear-gradient(135deg, #E17497 0%, #A98DD1 100%)",
              boxShadow: "0 0 20px rgba(225,116,151,0.5)",
            }}
          >
            ✨ Start the Ride
          </motion.button>
        </div>
      </div>
    </div>
  );
}
