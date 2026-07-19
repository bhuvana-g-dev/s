import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** A single softly-drifting petal. */
function Petal({ delay, left, size, hue }) {
  return (
    <motion.div
      className="absolute top-[-5%] pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 0.9, 0.9, 0],
        rotate: 360,
        x: [0, 30, -20, 0],
      }}
      transition={{
        duration: 16 + (size % 5),
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C14 6 18 8 22 10C18 12 14 14 12 18C10 14 6 12 2 10C6 8 10 6 12 2Z"
          fill={hue}
          opacity="0.75"
        />
      </svg>
    </motion.div>
  );
}

/** A tiny butterfly that flutters in a loose figure-eight path. */
function Butterfly({ delay, top, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${top}%`, left: "-5%" }}
      initial={{ x: 0, opacity: 0 }}
      animate={{
        x: ["0vw", "30vw", "60vw", "90vw", "110vw"],
        y: [0, -30, 20, -20, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: 22,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        animate={{ scaleX: [1, 0.6, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 12C10 6 4 4 3 8C2 12 8 13 12 12Z" fill="#CBB6EA" opacity="0.85" />
        <path d="M12 12C14 6 20 4 21 8C22 12 16 13 12 12Z" fill="#F4B8CE" opacity="0.85" />
        <path d="M12 12C10 18 4 20 3 16C2 12 8 11 12 12Z" fill="#F4B8CE" opacity="0.7" />
        <path d="M12 12C14 18 20 20 21 16C22 12 16 11 12 12Z" fill="#CBB6EA" opacity="0.7" />
        <line x1="12" y1="9" x2="12" y2="15" stroke="#A98DD1" strokeWidth="1" />
      </motion.svg>
    </motion.div>
  );
}

/** Small twinkling sparkle. */
function Sparkle({ top, left, size, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none animate-sparkle"
      style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill="#D9A857" opacity="0.8" />
      </svg>
    </motion.div>
  );
}

/** Small floating heart drifting upward. */
function Heart({ delay, left, size }) {
  return (
    <motion.div
      className="absolute bottom-[-5%] pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y: "-110vh",
        opacity: [0, 0.8, 0.8, 0],
        x: [0, 15, -15, 0],
        scale: [0.6, 1, 1, 0.8],
      }}
      transition={{
        duration: 14,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-7.5-4.9-10.1-9.3C.4 8.9 1.6 5.3 4.9 4.3 7 3.6 9.4 4.4 12 7.3c2.6-2.9 5-3.7 7.1-3C22.4 5.3 23.6 8.9 22.1 11.7 19.5 16.1 12 21 12 21z"
          fill="#E17497"
          opacity="0.75"
        />
      </svg>
    </motion.div>
  );
}

/** Glow that gently follows the cursor (desktop only, ignored on touch). */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const handleMove = (e) => {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

/**
 * Full ambient layer: petals, butterflies, sparkles, hearts, cursor glow.
 * Positioned fixed & behind content (z-0), pointer-events disabled throughout.
 */
export default function AmbientAnimations({ density = "normal" }) {
  const [items] = useState(() => {
    const count = density === "light" ? 0.6 : 1;
    return {
      petals: Array.from({ length: Math.round(6 * count) }, (_, i) => ({
        id: `p${i}`,
        delay: i * 2.3,
        left: (i * 17 + 5) % 100,
        size: 14 + (i % 4) * 4,
        hue: i % 2 === 0 ? "#F4B8CE" : "#CBB6EA",
      })),
      butterflies: Array.from({ length: Math.round(2 * count) }, (_, i) => ({
        id: `b${i}`,
        delay: i * 9,
        top: 15 + i * 25,
        size: 22,
      })),
      sparkles: Array.from({ length: Math.round(10 * count) }, (_, i) => ({
        id: `s${i}`,
        top: (i * 13 + 7) % 100,
        left: (i * 23 + 11) % 100,
        size: 8 + (i % 3) * 4,
        delay: i * 0.4,
      })),
      hearts: Array.from({ length: Math.round(4 * count) }, (_, i) => ({
        id: `h${i}`,
        delay: i * 4.5,
        left: (i * 27 + 8) % 100,
        size: 12 + (i % 3) * 5,
      })),
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {items.petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
      {items.butterflies.map((b) => (
        <Butterfly key={b.id} {...b} />
      ))}
      {items.sparkles.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}
      {items.hearts.map((h) => (
        <Heart key={h.id} {...h} />
      ))}
      <CursorGlow />
    </div>
  );
}
