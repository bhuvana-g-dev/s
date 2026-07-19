import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validNicknames, secretMemory } from "../../data/cinemaMemories";

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Checks a raw input (possibly comma-separated) against the valid nickname list. */
function isCorrectAnswer(raw) {
  const candidates = raw
    .split(",")
    .map((s) => normalize(s))
    .filter(Boolean);
  return candidates.some((c) => validNicknames.includes(c));
}

function SparkleBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => ({
        id: i,
        angle: (360 / 16) * i,
        icon: i % 3 === 0 ? "❤" : "✦",
      })).map((s) => (
        <motion.span
          key={s.id}
          className="absolute top-1/2 left-1/2 text-cinema-sunset text-lg"
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{
            x: Math.cos((s.angle * Math.PI) / 180) * 140,
            y: Math.sin((s.angle * Math.PI) / 180) * 140,
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          {s.icon}
        </motion.span>
      ))}
    </div>
  );
}

export default function SecretCorner() {
  const [stage, setStage] = useState("hidden"); // hidden -> open -> question -> success
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null); // null | "wrong"
  const [showBurst, setShowBurst] = useState(false);

  const closeAll = () => {
    setStage("hidden");
    setAnswer("");
    setFeedback(null);
    setShowBurst(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    if (isCorrectAnswer(answer)) {
      setFeedback(null);
      setShowBurst(true);
      setTimeout(() => setStage("success"), 500);
    } else {
      setFeedback("wrong");
    }
  };

  return (
    <>
      {/* the tiny, almost-hidden folded paper */}
      {stage === "hidden" && (
        <motion.button
          onClick={() => setStage("question")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          whileHover={{ x: -6 }}
          className="fixed bottom-4 right-0 z-30 focus:outline-none group"
          aria-label="A secret note"
        >
          <div
            className="bg-cinema-cream text-cinema-night font-hand text-sm px-3 py-2 rounded-l-md shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
            style={{ clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)" }}
          >
            Secret...
          </div>
        </motion.button>
      )}

      <AnimatePresence>
        {stage === "question" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/85 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cinema-cream rounded-2xl px-7 py-9 sm:px-10 sm:py-10 max-w-sm w-full text-center shadow-cinemaGlow"
            >
              {showBurst && <SparkleBurst />}
              <p className="font-display text-xl sm:text-2xl text-cinema-plum mb-2">
                Only someone special would know...❤️
              </p>
              <p className="font-body text-ink/70 mb-5 text-sm sm:text-base">
                In what ways does Bhuvana call you?
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    if (feedback) setFeedback(null);
                  }}
                  placeholder="type a nickname..."
                  className="w-full rounded-full px-4 py-2.5 bg-white border border-cinema-plum/20 text-ink font-body text-sm focus:outline-none focus:ring-2 focus:ring-cinema-ember"
                  autoFocus
                />
                <button
                  type="submit"
                  className="font-body font-semibold text-sm px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-cinema-ember to-cinema-rose hover:opacity-90 transition-opacity"
                >
                  Reveal
                </button>
              </form>

              <AnimatePresence>
                {feedback === "wrong" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-hand text-lg text-cinema-ember mt-4"
                  >
                    Almost... try remembering a little more. ❤️
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={closeAll}
                className="mt-6 font-body text-xs text-ink/40 hover:text-ink/70 transition-colors"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/90 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center"
            >
              {/* floating hearts around the reveal */}
              {Array.from({ length: 8 }, (_, i) => i).map((i) => (
                <motion.span
                  key={i}
                  className="absolute text-cinema-rose text-lg pointer-events-none"
                  style={{ top: `${20 + (i % 4) * 15}%`, left: `${10 + i * 10}%` }}
                  animate={{ y: [-4, -18, -4], opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                >
                  ❤
                </motion.span>
              ))}

              <motion.div
                initial={{ scale: 0.7, rotate: -4, opacity: 0 }}
                animate={{ scale: 1, rotate: -2, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="bg-cinema-cream p-3 pb-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="w-56 h-64 sm:w-64 sm:h-72 bg-gradient-to-br from-cinema-plum via-cinema-dusk to-cinema-night flex items-center justify-center rounded-[2px]">
                  {secretMemory.src ? (
                    <img src={secretMemory.src} alt="Hidden memory" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl opacity-60">💌</span>
                  )}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="font-hand text-2xl text-cinema-cream mt-6 text-center max-w-xs"
              >
                {secretMemory.caption}
              </motion.p>

              <button
                onClick={closeAll}
                className="mt-6 font-body text-sm px-5 py-2 rounded-full bg-white/10 text-cinema-cream hover:bg-white/20 transition-colors"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
