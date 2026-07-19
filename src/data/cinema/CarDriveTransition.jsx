import { motion } from "framer-motion";
import { useEffect } from "react";

function Mountain({ x, delay, opacity, height = 60 }) {
  return (
    <motion.svg
      className="absolute bottom-24"
      style={{ left: `${x}%` }}
      width="180"
      height={height}
      viewBox="0 0 180 60"
      initial={{ x: 0 }}
      animate={{ x: "-160%" }}
      transition={{ duration: 3.4, delay, ease: "linear" }}
    >
      <polygon points="0,60 60,10 100,40 140,5 180,60" fill="#3D2140" opacity={opacity} />
    </motion.svg>
  );
}

function TreeRow({ delay }) {
  return (
    <motion.div
      className="absolute bottom-20 left-0 flex gap-16"
      initial={{ x: "0%" }}
      animate={{ x: "-200%" }}
      transition={{ duration: 2.2, delay, ease: "linear" }}
    >
      {Array.from({ length: 14 }, (_, i) => (
        <span key={i} className="text-3xl opacity-70">
          🌳
        </span>
      ))}
    </motion.div>
  );
}

function ParallaxCloud({ top, delay, duration }) {
  return (
    <motion.span
      className="absolute text-4xl opacity-60"
      style={{ top: `${top}%` }}
      initial={{ left: "-10%" }}
      animate={{ left: "110%" }}
      transition={{ duration, delay, ease: "linear" }}
    >
      ☁️
    </motion.span>
  );
}

export default function CarDriveTransition({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ background: "linear-gradient(180deg, #E8794A 0%, #3D2140 55%, #1A1025 100%)" }}
      animate={{ background: "linear-gradient(180deg, #1A1025 0%, #2B1A2E 55%, #0F0A16 100%)" }}
      transition={{ duration: 2.6, ease: "easeInOut" }}
    >
      <div className="film-grain" />

      <ParallaxCloud top={10} delay={0} duration={2.8} />
      <ParallaxCloud top={20} delay={0.4} duration={3.2} />
      <ParallaxCloud top={6} delay={0.8} duration={2.4} />

      <Mountain x={0} delay={0} opacity={0.5} height={70} />
      <Mountain x={45} delay={0.15} opacity={0.4} height={55} />
      <Mountain x={85} delay={0.3} opacity={0.6} height={80} />

      <TreeRow delay={0.1} />

      {/* road */}
      <div className="absolute bottom-16 left-0 w-full h-2 bg-cinema-cream/10" />

      {/* the car driving across and off-screen */}
      <motion.div
        className="absolute bottom-12 text-6xl"
        initial={{ left: "38%" }}
        animate={{ left: "115%" }}
        transition={{ duration: 2.6, ease: "easeIn" }}
      >
        🚗
      </motion.div>

      <motion.p
        className="absolute inset-x-0 top-1/4 text-center font-hand text-3xl sm:text-4xl text-cinema-cream px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.6, times: [0, 0.35, 0.75, 1] }}
      >
        Our next adventure is waiting...
      </motion.p>
    </motion.div>
  );
}
