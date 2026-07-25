import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { secretObjects } from "../../data/birthdayRoom";

function HeartBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-cinema-rose text-sm"
          style={{ left: "50%", top: "50%" }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{
            x: Math.cos((i / 10) * Math.PI * 2) * 60,
            y: Math.sin((i / 10) * Math.PI * 2) * 60,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

/** Nearly-invisible easter eggs scattered around the room. */
export default function SecretObjects({ onInteract }) {
  const [activeMessage, setActiveMessage] = useState(null);
  const [burstId, setBurstId] = useState(null);

  const handleClick = (obj) => {
    onInteract?.();
    if (obj.effect === "hearts") {
      setBurstId(obj.id);
      setTimeout(() => setBurstId(null), 1000);
    } else {
      setActiveMessage(obj.message);
      setTimeout(() => setActiveMessage(null), 2200);
    }
  };

  return (
    <div className="hidden lg:block">
      {secretObjects.map((obj) => (
        <motion.button
          key={obj.id}
          onClick={() => handleClick(obj)}
          className="fixed z-20 text-lg opacity-25 hover:opacity-90 transition-opacity focus:outline-none"
          style={{ top: `${obj.top}%`, left: `${obj.left}%` }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + (obj.top % 3), repeat: Infinity }}
          aria-label="secret"
        >
          {obj.icon}
          {burstId === obj.id && <HeartBurst />}
        </motion.button>
      ))}

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 bg-cinema-cream px-5 py-2.5 rounded-full shadow-cinemaGlow"
          >
            <p className="font-hand text-base text-blush-deep">{activeMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
