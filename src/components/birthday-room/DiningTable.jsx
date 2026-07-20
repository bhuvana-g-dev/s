import { motion } from "framer-motion";
import { mainDishes, dessertCorner } from "../../data/birthdayRoom";

function DishPlate({ icon, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 140 }}
      whileHover={{ y: -3 }}
      className="flex flex-col items-center"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-soft flex items-center justify-center text-2xl border border-beige-deep/30">
        {icon}
      </div>
      <span className="font-body text-[10px] sm:text-xs text-ink/60 mt-1 text-center">{label}</span>
    </motion.div>
  );
}

function ChocolateFountain() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="flex flex-col items-center mt-4"
    >
      <svg viewBox="0 0 80 90" className="w-16 sm:w-20 h-auto">
        <ellipse cx="40" cy="82" rx="34" ry="6" fill="#5b3628" />
        <rect x="30" y="40" width="20" height="40" fill="#7a4b3a" />
        {/* tiers */}
        <ellipse cx="40" cy="40" rx="22" ry="6" fill="#5b3628" />
        <ellipse cx="40" cy="26" rx="15" ry="5" fill="#7a4b3a" />
        <ellipse cx="40" cy="14" rx="9" ry="4" fill="#5b3628" />
        {/* chocolate flowing */}
        <motion.path
          d="M40 10 Q44 24 40 26 Q36 38 40 40"
          stroke="#3D2140"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ pathLength: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </svg>
      <p className="font-hand text-sm text-cinema-ember mt-1">chocolate fountain</p>
    </motion.div>
  );
}

export default function DiningTable() {
  return (
    <div className="relative bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 p-6 sm:p-8 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-lg sm:text-xl text-cinema-ember text-center mb-6"
      >
        Selva's Favorite Table 🍽️
      </motion.p>

      <p className="font-hand text-base text-lavender-deep text-center mb-3">main dishes</p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-6">
        {mainDishes.map((d, i) => (
          <DishPlate key={d.id} icon={d.icon} label={d.label} delay={0.3 + i * 0.1} />
        ))}
      </div>

      <div className="h-px bg-beige-deep/30 my-4" />

      <p className="font-hand text-base text-lavender-deep text-center mb-3">dessert corner</p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
        {dessertCorner.map((d, i) => (
          <DishPlate key={d.id} icon={d.icon} label={d.label} delay={0.4 + i * 0.1} />
        ))}
      </div>

      <div className="flex justify-center">
        <ChocolateFountain />
      </div>
    </div>
  );
}
