import { motion } from "framer-motion";

function CarIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-72 sm:w-96 h-auto">
      {/* ground shadow */}
      <ellipse cx="160" cy="150" rx="130" ry="8" fill="#1A1025" opacity="0.25" />

      {/* car body - roof open */}
      <path
        d="M40 120 Q40 95 65 90 L100 60 Q115 50 150 50 L210 50 Q235 50 245 68 L270 90 Q295 92 295 118 L295 128 L40 128 Z"
        fill="#E8628C"
      />
      <path
        d="M40 120 Q40 95 65 90 L100 60 Q115 50 150 50 L210 50 Q235 50 245 68 L270 90 Q295 92 295 118 L295 128 L40 128 Z"
        fill="url(#carShine)"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="carShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2A65A" />
          <stop offset="100%" stopColor="#E8628C" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* interior (open top) */}
      <path d="M100 60 Q115 52 150 52 L210 52 Q233 52 244 68 L100 68 Z" fill="#3D2140" opacity="0.6" />

      {/* wheels */}
      <circle cx="95" cy="128" r="22" fill="#1A1025" />
      <circle cx="95" cy="128" r="9" fill="#F2A65A" opacity="0.7" />
      <circle cx="250" cy="128" r="22" fill="#1A1025" />
      <circle cx="250" cy="128" r="9" fill="#F2A65A" opacity="0.7" />

      {/* headlight */}
      <ellipse cx="288" cy="105" rx="6" ry="8" fill="#FBEAD9" opacity="0.9" />

      {/* girl 1 driving */}
      <circle cx="150" cy="45" r="12" fill="#F2A65A" />
      <motion.path
        d="M138 40 Q130 30 140 22"
        stroke="#3D2140"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M138 40 Q128 30 138 20", "M138 40 Q132 28 144 22", "M138 40 Q128 30 138 20"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="140" y="55" width="20" height="24" rx="6" fill="#E8794A" />
      {/* scarf trailing in the wind */}
      <motion.path
        d="M158 58 Q180 55 195 62"
        stroke="#FBEAD9"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
        animate={{ d: ["M158 58 Q178 52 190 58", "M158 58 Q182 60 198 68", "M158 58 Q178 52 190 58"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* girl 2 passenger */}
      <circle cx="195" cy="47" r="11" fill="#E8628C" />
      <motion.path
        d="M186 42 Q178 34 184 26"
        stroke="#3D2140"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        animate={{ d: ["M186 42 Q176 34 182 24", "M186 42 Q180 32 188 26", "M186 42 Q176 34 182 24"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <rect x="185" y="56" width="18" height="22" rx="6" fill="#CBB6EA" />
      <motion.path
        d="M203 58 Q222 53 234 60"
        stroke="#FBEAD9"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
        animate={{ d: ["M203 58 Q220 50 230 56", "M203 58 Q224 58 236 66", "M203 58 Q220 50 230 56"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
    </svg>
  );
}

export default function ConvertibleCar({ onDriveAway }) {
  return (
    <div className="relative z-10 flex flex-col items-center pb-20 pt-10 px-4">
      <p className="font-hand text-2xl sm:text-3xl text-cinema-cream mb-2 text-center">
        one more ride before the credits roll?
      </p>
      <p className="font-body text-sm text-cinema-cream/50 mb-6 text-center">
        tap the car to continue the journey
      </p>

      <motion.button
        onClick={onDriveAway}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-sunset rounded-2xl"
        aria-label="Drive to the next chapter"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <CarIllustration />
      </motion.button>

      <div className="w-72 sm:w-96 h-1 mt-2 rounded-full bg-gradient-to-r from-transparent via-cinema-sunset/50 to-transparent" />
    </div>
  );
}
