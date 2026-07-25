import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gifts } from "../../data/gifts";

function GiftBox({ gift, opened, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(gift)}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className="relative focus:outline-none"
      aria-label={`Gift ${gift.id}`}
    >
      <motion.div
        animate={opened ? { rotateY: 180, opacity: 0.35 } : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox="0 0 50 50" className="w-12 sm:w-14 h-auto">
          <rect x="5" y="18" width="40" height="27" rx="2" fill={gift.color} />
          <rect x="5" y="18" width="40" height="7" fill="#FBEAD9" opacity="0.5" />
          <rect x="21" y="18" width="8" height="27" fill="#FBEAD9" opacity="0.7" />
          <path d="M15 18 Q25 0 25 18 Q25 0 35 18" fill="none" stroke="#FBEAD9" strokeWidth="2.5" />
        </svg>
      </motion.div>
      {opened && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 text-sm"
        >
          ✨
        </motion.span>
      )}
    </motion.button>
  );
}

function GiftReveal({ gift, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/85 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cinema-cream rounded-2xl px-7 py-8 max-w-xs w-full text-center shadow-cinemaGlow"
      >
        {gift.type === "photo" && (
          <div className="w-full h-40 rounded-lg bg-gradient-to-br from-blush-light to-lavender-light flex items-center justify-center mb-4 overflow-hidden">
            {gift.photoSrc ? (
              <img src={gift.photoSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl opacity-40">📷</span>
            )}
          </div>
        )}
        {gift.type === "note" && <p className="text-4xl mb-3">💌</p>}
        {gift.type === "voice" && (
          <div className="mb-3">
            <p className="text-4xl mb-2">🎙️</p>
            {gift.audioSrc && <audio controls src={gift.audioSrc} className="mx-auto" />}
          </div>
        )}
        {gift.type === "loading" && <p className="text-4xl mb-3">🎁</p>}

        <p className="font-hand text-lg text-ink/70 whitespace-pre-line">{gift.message}</p>

        <button
          onClick={onClose}
          className="mt-6 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors"
        >
          close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function GiftCorner({ onInteract }) {
  const [opened, setOpened] = useState({});
  const [active, setActive] = useState(null);

  const handleOpen = (gift) => {
    if (!opened[gift.id]) {
      setOpened((o) => ({ ...o, [gift.id]: true }));
      onInteract?.();
    }
    setActive(gift);
  };

  return (
    <div className="flex justify-center gap-4 sm:gap-6 mt-6">
      {gifts.map((g) => (
        <GiftBox key={g.id} gift={g} opened={opened[g.id]} onOpen={handleOpen} />
      ))}

      <AnimatePresence>
        {active && <GiftReveal gift={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
