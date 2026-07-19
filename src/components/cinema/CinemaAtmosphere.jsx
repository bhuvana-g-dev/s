import { motion } from "framer-motion";

/** A single slow-drifting dust mote, lit warm by the "projector" light. */
function DustMote({ left, top, delay, size }) {
  return (
    <motion.span
      className="absolute rounded-full bg-cinema-sunset/70 pointer-events-none"
      style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
      animate={{
        y: [0, -22, 0, 18, 0],
        x: [0, 12, -8, 6, 0],
        opacity: [0.15, 0.6, 0.35, 0.6, 0.15],
      }}
      transition={{ duration: 14 + (size % 5), delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/**
 * Layered atmosphere for the cinema page: light rays, drifting dust, and a
 * subtle animated film-grain texture over everything. Purely decorative.
 */
export default function CinemaAtmosphere() {
  const motes = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: (i * 13 + 4) % 100,
    top: (i * 19 + 7) % 100,
    delay: (i % 7) * 0.8,
    size: 2 + (i % 3),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="light-rays" />
      {motes.map((m) => (
        <DustMote key={m.id} {...m} />
      ))}
      <div className="film-grain" />
    </div>
  );
}
