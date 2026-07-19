import { motion } from "framer-motion";

function BikeIllustration() {
  return (
    <svg viewBox="0 0 300 160" className="w-56 sm:w-72 h-auto">
      {/* ground shadow */}
      <ellipse cx="150" cy="150" rx="110" ry="8" fill="#D9C4AE" opacity="0.4" />

      {/* rear wheel */}
      <circle cx="70" cy="120" r="32" fill="none" stroke="#A98DD1" strokeWidth="5" />
      <circle cx="70" cy="120" r="4" fill="#A98DD1" />
      {/* front wheel */}
      <circle cx="220" cy="120" r="32" fill="none" stroke="#A98DD1" strokeWidth="5" />
      <circle cx="220" cy="120" r="4" fill="#A98DD1" />

      {/* frame */}
      <path d="M70 120 L130 70 L165 120 M130 70 L150 70 L220 120 M150 70 L145 50" stroke="#E17497" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M70 120 L165 120" stroke="#E17497" strokeWidth="5" strokeLinecap="round" />
      {/* seat + handlebar */}
      <rect x="122" y="46" width="18" height="6" rx="3" fill="#D9A857" />
      <path d="M145 50 L160 44" stroke="#D9A857" strokeWidth="5" strokeLinecap="round" />

      {/* basket with flowers on front */}
      <rect x="195" y="82" width="26" height="18" rx="3" fill="#EDE0D4" stroke="#D9A857" strokeWidth="2" />
      <text x="200" y="86" fontSize="12">🌸</text>

      {/* girl 1 - pedaling, front */}
      <circle cx="130" cy="34" r="10" fill="#F4B8CE" />
      <path d="M130 44 Q120 60 122 78" stroke="#E17497" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M122 78 L110 100" stroke="#6B5150" strokeWidth="5" strokeLinecap="round" />
      <path d="M122 78 L140 95" stroke="#6B5150" strokeWidth="5" strokeLinecap="round" />

      {/* girl 2 - sitting behind, on rear rack */}
      <circle cx="95" cy="40" r="9" fill="#CBB6EA" />
      <path d="M95 49 Q88 62 92 78" stroke="#A98DD1" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M92 78 L80 92" stroke="#6B5150" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 78 L100 92" stroke="#6B5150" strokeWidth="5" strokeLinecap="round" />
      {/* arms of girl 2 around girl 1's waist */}
      <path d="M95 55 Q112 62 122 68" stroke="#A98DD1" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function BikeRide({ onRideAway }) {
  return (
    <div className="relative z-10 mt-20 sm:mt-28 flex flex-col items-center pb-16 px-4">
      <p className="font-hand text-2xl sm:text-3xl text-lavender-deep mb-2 text-center">
        ready for a little ride?
      </p>
      <p className="font-body text-sm text-ink/50 mb-6 text-center">
        tap the bike to go further into our story
      </p>

      <motion.button
        onClick={onRideAway}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-deep rounded-2xl"
        aria-label="Start the bike ride to the next page"
        animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <BikeIllustration />
      </motion.button>

      {/* little path/road hint under the bike */}
      <div className="w-64 sm:w-80 h-1 mt-2 rounded-full bg-gradient-to-r from-transparent via-beige-deep to-transparent" />
    </div>
  );
}
