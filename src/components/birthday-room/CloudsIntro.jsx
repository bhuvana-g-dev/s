import { motion } from "framer-motion";
import { useEffect } from "react";

/**
 * Cinematic entry: the screen starts covered in soft clouds (continuing the
 * swing-into-clouds moment from Page 4), then the clouds slowly part to
 * reveal the birthday room underneath. Calls onDone when the reveal finishes.
 */
export default function CloudsIntro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3400);
    return () => clearTimeout(t);
  }, [onDone]);

  const clouds = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    top: (i * 13 + 4) % 90,
    delay: i * 0.15,
    size: 70 + (i % 4) * 30,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* left half of clouds drifts left, right half drifts right, "parting" */}
      {clouds.map((c) => (
        <motion.span
          key={`l${c.id}`}
          className="absolute text-6xl sm:text-7xl opacity-90"
          style={{ top: `${c.top}%`, left: `${10 + (c.id % 3) * 10}%`, fontSize: c.size }}
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: "-60vw", opacity: [1, 1, 0] }}
          transition={{ duration: 2.6, delay: 0.6 + c.delay, ease: "easeInOut" }}
        >
          ☁️
        </motion.span>
      ))}
      {clouds.map((c) => (
        <motion.span
          key={`r${c.id}`}
          className="absolute text-6xl sm:text-7xl opacity-90"
          style={{ top: `${c.top}%`, right: `${10 + (c.id % 3) * 10}%`, fontSize: c.size }}
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: "60vw", opacity: [1, 1, 0] }}
          transition={{ duration: 2.6, delay: 0.6 + c.delay, ease: "easeInOut" }}
        >
          ☁️
        </motion.span>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0 flex items-center justify-center font-hand text-2xl sm:text-3xl text-blush-deep text-center px-6"
      >
        the swing lands somewhere magical...
      </motion.p>
    </motion.div>
  );
}
