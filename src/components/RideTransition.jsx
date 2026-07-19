import { motion } from "framer-motion";
import { useEffect } from "react";

export default function RideTransition({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-warm-gradient"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* scrolling ground / scenery to sell the feeling of motion */}
      <motion.div
        className="absolute bottom-16 left-0 w-[220%] h-2 bg-beige-deep/50 rounded-full"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 1.9, ease: "easeIn" }}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-16 text-2xl"
          style={{ left: `${i * 14}%` }}
          initial={{ x: 0 }}
          animate={{ x: "-140vw" }}
          transition={{ duration: 1.9, ease: "easeIn", delay: i * 0.02 }}
        >
          {i % 2 === 0 ? "🌷" : "🌿"}
        </motion.span>
      ))}

      {/* the bike riding off to the right */}
      <motion.div
        className="absolute bottom-14 text-6xl"
        initial={{ left: "35%" }}
        animate={{ left: "120%" }}
        transition={{ duration: 1.9, ease: "easeIn" }}
      >
        🚲
      </motion.div>

      <motion.p
        className="absolute inset-x-0 top-1/3 text-center font-hand text-2xl sm:text-3xl text-blush-deep"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.9, times: [0, 0.3, 0.7, 1] }}
      >
        riding into our memories...
      </motion.p>
    </motion.div>
  );
}
