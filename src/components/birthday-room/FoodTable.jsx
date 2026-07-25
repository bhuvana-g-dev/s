import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainDishes } from "../../data/foods";

function DishPlate({ dish, onTap }) {
  return (
    <motion.button
      onClick={() => onTap(dish)}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className="flex flex-col items-center focus:outline-none"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cinema-cream shadow-soft flex items-center justify-center text-2xl border border-beige-deep/30">
        {dish.icon}
      </div>
      <span className="font-hand text-sm text-cinema-cream/80 mt-1 text-center">{dish.label}</span>
    </motion.button>
  );
}

export default function FoodTable({ onInteract }) {
  const [active, setActive] = useState(null);

  const handleTap = (dish) => {
    setActive(dish);
    onInteract?.();
    setTimeout(() => setActive((cur) => (cur?.id === dish.id ? null : cur)), 2200);
  };

  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8">
      <p className="font-display text-lg sm:text-xl text-cinema-cream text-center mb-6">
        Selva's Favorite Table 🍽️
      </p>

      {/* wooden table surface */}
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{ background: "linear-gradient(180deg, #7a4b3a 0%, #5b3628 100%)" }}
      >
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {mainDishes.map((d) => (
            <DishPlate key={d.id} dish={d} onTap={handleTap} />
          ))}
        </div>
      </div>

      <div className="h-6 flex items-center justify-center mt-3">
        <AnimatePresence mode="wait">
          {active && (
            <motion.p
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-hand text-base text-cinema-sunset text-center"
            >
              {active.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
