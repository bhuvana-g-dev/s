import { motion } from "framer-motion";

/** A hand-drawn, fluffy little carousel horse with carousel-pole gliding motion. */
export default function CarouselHorse({ className = "w-24 h-24 sm:w-28 sm:h-28" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <defs>
        {/* Soft warm horse body gradient */}
        <linearGradient id="horseBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF2E4" />
          <stop offset="45%" stopColor="#F6D8B8" />
          <stop offset="100%" stopColor="#EBBF90" />
        </linearGradient>

        {/* Back legs shadow tone */}
        <linearGradient id="horseBackLegs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2B284" />
          <stop offset="100%" stopColor="#CE996A" />
        </linearGradient>

        {/* Golden carousel pole */}
        <linearGradient id="poleGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E89F43" />
          <stop offset="40%" stopColor="#FFE08A" />
          <stop offset="70%" stopColor="#F6C15C" />
          <stop offset="100%" stopColor="#D9882E" />
        </linearGradient>

        {/* Rose saddle gradient */}
        <linearGradient id="saddleRose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FA8FAF" />
          <stop offset="100%" stopColor="#E16089" />
        </linearGradient>
      </defs>

      {/* ── Floor / Base Shadow (breathing with the vertical ride) ── */}
      <motion.ellipse
        cx="100"
        cy="178"
        rx="54"
        ry="7"
        fill="#E8628C"
        animate={{ rx: [54, 46, 54], opacity: [0.18, 0.1, 0.18] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Fixed Carousel Brass Pole ── */}
      <rect x="97.5" y="16" width="5" height="162" rx="2.5" fill="url(#poleGold)" />
      {/* Decorative finial ball at top & bottom ring */}
      <circle cx="100" cy="15" r="7" fill="url(#poleGold)" />
      <circle cx="100" cy="13" r="2.5" fill="#FFF5D1" />
      <ellipse cx="100" cy="177" rx="9" ry="3" fill="url(#poleGold)" />

      {/* ── Gliding Horse Group (slides gently up and down the pole) ── */}
      <motion.g
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ── Back legs (slightly darker for 3D depth) ── */}
        <rect x="58" y="128" width="8" height="32" rx="4" fill="url(#horseBackLegs)" />
        <rect x="124" y="128" width="8" height="32" rx="4" fill="url(#horseBackLegs)" />
        <rect x="61" y="156" width="7" height="9" rx="2" fill="#9F6F48" />
        <rect x="127" y="156" width="7" height="9" rx="2" fill="#9F6F48" />

        {/* ── Swishing Tail ── */}
        <motion.path
          d="M55 105 Q35 115 38 140 Q40 155 55 158"
          stroke="#B98A5E"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M55 105 Q35 115 38 140 Q40 155 55 158",
              "M55 105 Q30 120 36 145 Q38 158 55 160",
              "M55 105 Q35 115 38 140 Q40 155 55 158",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Tail highlight strand */}
        <path
          d="M54 108 Q38 118 41 138"
          stroke="#DDB892"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* ── Main Torso ── */}
        <ellipse cx="102" cy="118" rx="48" ry="30" fill="url(#horseBody)" />

        {/* ── Front Legs ── */}
        <rect x="64" y="130" width="8.5" height="32" rx="4" fill="url(#horseBody)" />
        <rect x="130" y="130" width="8.5" height="32" rx="4" fill="url(#horseBody)" />
        {/* Golden/chestnut hooves */}
        <rect x="67" y="158" width="7" height="9" rx="2" fill="#B98A5E" />
        <rect x="133" y="158" width="7" height="9" rx="2" fill="#B98A5E" />
        <rect x="68" y="163" width="5" height="2" rx="1" fill="#F6C15C" />
        <rect x="134" y="163" width="5" height="2" rx="1" fill="#F6C15C" />

        {/* ── Neck & Head ── */}
        <path
          d="M128 108 Q150 100 152 78 Q153 60 138 50 Q120 40 106 54 Q98 63 108 74 Q118 84 128 108 Z"
          fill="url(#horseBody)"
        />

        {/* ── Saddle Blanket & Saddle ── */}
        {/* Scalloped lower blanket */}
        <path
          d="M72 102 Q102 92 134 104 L130 126 Q102 118 76 124 Z"
          fill="url(#saddleRose)"
        />
        {/* Golden trim & scalloped dots */}
        <path
          d="M76 123 Q102 117 130 125"
          stroke="#F6C15C"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="88" cy="115" r="1.8" fill="#FFF5D1" />
        <circle cx="102" cy="113" r="2.2" fill="#FFF5D1" />
        <circle cx="116" cy="115" r="1.8" fill="#FFF5D1" />

        {/* Little golden heart emblem on the saddle */}
        <path
          d="M102 107 C100 105 97 106 97 108 C97 110 102 113 102 114 C102 113 107 110 107 108 C107 106 104 105 102 107 Z"
          fill="#F6C15C"
        />

        {/* ── Fluffy Mane ── */}
        <motion.g
          animate={{ rotate: [0, -3, 0, 3, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "128px 55px" }}
        >
          <circle cx="128" cy="52" r="9" fill="#B98A5E" />
          <circle cx="119" cy="60" r="8" fill="#C79968" />
          <circle cx="113" cy="70" r="7" fill="#B98A5E" />
          <circle cx="134" cy="44" r="7.5" fill="#C79968" />
          <circle cx="126" cy="48" r="4" fill="#DDB892" opacity="0.6" />
          <circle cx="117" cy="58" r="3.5" fill="#DDB892" opacity="0.6" />
        </motion.g>

        {/* ── Cute Ear ── */}
        <path d="M122 46 Q117 35 128 33 Q133 42 126 50 Z" fill="#F6D8B8" stroke="#EBBF90" strokeWidth="1" />
        <path d="M123 45 Q120 38 126 36 Q128 41 125 47 Z" fill="#F8B4C8" opacity="0.5" />

        {/* Tiny sweet blossom tucked near ear */}
        <circle cx="133" cy="41" r="3" fill="#FA8FAF" />
        <circle cx="133" cy="41" r="1.2" fill="#FFF08A" />

        {/* ── Muzzle & Soft Nose ── */}
        <ellipse cx="148" cy="72" rx="10" ry="7" fill="#FFF0E0" />
        <circle cx="153" cy="72" r="1.6" fill="#7A4B3A" />

        {/* ── Cute Eye with Sparkle Glint ── */}
        <ellipse cx="138" cy="62" rx="2.4" ry="2.6" fill="#3D2140" />
        <circle cx="137.3" cy="61.2" r="0.8" fill="#FFFFFF" />

        {/* Cheerful rosy cheek blush */}
        <ellipse cx="133" cy="68" rx="4.5" ry="3.2" fill="#E8628C" opacity="0.38" />

        {/* ── Reins ── */}
        <path
          d="M136 66 Q142 74 138 82"
          stroke="#E8628C"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* Pole clamp/bracket where horse attaches to pole */}
        <rect x="96" y="98" width="8" height="6" rx="2" fill="url(#poleGold)" stroke="#B37424" strokeWidth="0.8" />
        <rect x="96" y="138" width="8" height="6" rx="2" fill="url(#poleGold)" stroke="#B37424" strokeWidth="0.8" />
      </motion.g>

      {/* ── Ambient Sparkles ── */}
      <motion.text
        x="32"
        y="58"
        fontSize="15"
        animate={{ opacity: [0, 1, 0], y: [58, 46, 58], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.text>
      <motion.text
        x="162"
        y="108"
        fontSize="12"
        animate={{ opacity: [0, 1, 0], y: [108, 98, 108], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
      >
        ✨
      </motion.text>
      <motion.text
        x="80"
        y="30"
        fontSize="11"
        animate={{ opacity: [0, 0.85, 0], y: [30, 22, 30] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🌸
      </motion.text>
    </svg>
  );
}
