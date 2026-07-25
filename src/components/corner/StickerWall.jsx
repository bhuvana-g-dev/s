import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stickers, secretSwingSticker } from "../../data/stickers";

/** Generic popup used for simple text/envelope/letter/qr actions. */
function SimplePopup({ title, text, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-2xl px-7 py-8 max-w-xs w-full text-center shadow-glass"
      >
        {title && <h4 className="font-display text-lg text-blush-deep mb-2">{title}</h4>}
        {text && <p className="font-hand text-lg text-ink/70">{text}</p>}
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

/** Vintage vinyl player for the 🎧 sticker, with a spinning record + play/pause. */
function VinylPlayer({ sticker, onClose }) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-2xl px-7 py-8 max-w-xs w-full text-center shadow-glass"
      >
        <h4 className="font-display text-lg text-blush-deep mb-4">{sticker.title}</h4>
        <motion.div
          className="w-32 h-32 mx-auto rounded-full bg-cinema-night flex items-center justify-center relative"
          animate={playing ? { rotate: 360 } : {}}
          transition={{ duration: 3, repeat: playing ? Infinity : 0, ease: "linear" }}
        >
          <div className="w-10 h-10 rounded-full bg-cream" />
          <div className="absolute inset-2 rounded-full border border-cinema-sunset/30" />
        </motion.div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="mt-5 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors mr-2"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        {sticker.spotifyUrl && (
          <a
            href={sticker.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 font-body text-xs text-lavender-deep underline"
          >
            open in Spotify
          </a>
        )}
        <div>
          <button
            onClick={onClose}
            className="mt-4 font-body text-xs text-ink/40 hover:text-ink/70 transition-colors"
          >
            close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Full-screen transient effects for hug / petals / butterflies / polaroid. */
function EffectOverlay({ type, onDone }) {
  const items = {
    petals: { icon: "🌸", count: 16 },
    butterflies: { icon: "🦋", count: 8 },
    polaroid: { icon: "📷", count: 1 },
  }[type];

  if (type === "hug") {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDone}
      >
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.5, 1.15, 1] }}
          transition={{ duration: 0.6 }}
          className="text-6xl"
        >
          🤗
        </motion.p>
      </motion.div>
    );
  }

  if (type === "polaroid") {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={onDone}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden" onAnimationEnd={onDone}>
      {Array.from({ length: items.count }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{ left: `${(i * 17 + 5) % 100}%`, top: "-5%" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 180 }}
          transition={{ duration: 4, delay: i * 0.1 }}
          onAnimationComplete={i === items.count - 1 ? onDone : undefined}
        >
          {items.icon}
        </motion.span>
      ))}
    </div>
  );
}

function StickerButton({ sticker, index, onActivate }) {
  return (
    <motion.button
      onClick={() => onActivate(sticker)}
      animate={{ rotate: [0, -6, 6, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay: (index % 6) * 0.3, ease: "easeInOut" }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className="text-2xl sm:text-3xl select-none"
      aria-label={sticker.title || sticker.action}
    >
      {sticker.icon}
    </motion.button>
  );
}

export default function StickerWall({ onSwingClick }) {
  const [modal, setModal] = useState(null); // { type: 'simple'|'player', sticker }
  const [effect, setEffect] = useState(null);

  const handleActivate = (sticker) => {
    switch (sticker.action) {
      case "hug":
        setEffect("hug");
        break;
      case "petals":
        setEffect("petals");
        break;
      case "butterflies":
        setEffect("butterflies");
        break;
      case "polaroid":
        setEffect("polaroid");
        break;
      case "player":
        setModal({ type: "player", sticker });
        break;
      default:
        setModal({ type: "simple", sticker });
    }
  };

  return (
    <div className="relative bg-[#FFFCF6] rounded-2xl p-4 sm:p-5 shadow-soft border border-beige-deep/30 overflow-hidden">
      {/* washi tape */}
      <div className="absolute -top-2 left-6 w-14 h-5 bg-lavender/60 rotate-[8deg]" />
      <div className="absolute -top-2 right-6 w-14 h-5 bg-blush/60 rotate-[-8deg]" />

      <h3 className="font-display text-lg text-blush-deep text-center mb-1">
        Sticker Surprise Wall
      </h3>
      <p className="font-hand text-sm text-ink/50 text-center mb-4">tap a sticker ✨</p>

      <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 sm:gap-4 place-items-center">
        {stickers.map((s, i) => (
          <StickerButton key={s.id} sticker={s} index={i} onActivate={handleActivate} />
        ))}
      </div>

      {/* the secret swing sticker — subtle, but actually visible this time */}
      <div className="flex justify-center mt-4">
        <motion.button
          onClick={onSwingClick}
          className="relative flex flex-col items-center focus:outline-none group"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          aria-label="Secret"
        >
          <span className="text-2xl opacity-90 group-hover:opacity-100">{secretSwingSticker.icon}</span>
          <span className="h-4 mt-0.5 font-hand text-xs text-lavender-deep opacity-0 group-hover:opacity-100 transition-opacity">
            {secretSwingSticker.hoverText}
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {modal?.type === "simple" && (
          <SimplePopup
            title={modal.sticker.title}
            text={modal.sticker.text}
            onClose={() => setModal(null)}
          />
        )}
        {modal?.type === "player" && (
          <VinylPlayer sticker={modal.sticker} onClose={() => setModal(null)} />
        )}
        {effect && <EffectOverlay type={effect} onDone={() => setEffect(null)} />}
      </AnimatePresence>
    </div>
  );
}
