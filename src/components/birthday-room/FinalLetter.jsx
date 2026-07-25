import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  finalEnvelopeLabel,
  finalLetterPlaceholder,
  finalLetterSignature,
} from "../../data/birthdayRoom";

export default function FinalLetter({ visible }) {
  const [open, setOpen] = useState(false);

  if (!visible) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mt-10"
      >
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ y: { duration: 3, repeat: Infinity } }}
          className="flex flex-col items-center focus:outline-none"
          aria-label="Open the final letter"
        >
          <svg viewBox="0 0 80 56" className="w-20 sm:w-24 h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
            <rect x="2" y="2" width="76" height="52" rx="4" fill="#FBEAD9" />
            <path d="M2 4 L40 34 L78 4" fill="none" stroke="#E17497" strokeWidth="2.5" />
            <rect x="2" y="2" width="76" height="52" rx="4" fill="none" stroke="#D9A857" strokeWidth="1.5" />
          </svg>
          <p className="font-hand text-lg text-cinema-cream mt-2">{finalEnvelopeLabel}</p>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/95 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 130, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-cinema-cream rounded-2xl px-7 py-9 sm:px-10 max-w-md w-full text-center shadow-cinemaGlow max-h-[85vh] overflow-y-auto"
            >
              <p className="font-display text-xl text-cinema-plum mb-4">{finalEnvelopeLabel}</p>

              <p className="font-hand text-lg text-ink/70 leading-relaxed whitespace-pre-line mb-6">
                {finalLetterPlaceholder}
              </p>

              {/* optional placeholders for final photo / voice / signature */}
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-blush-light to-lavender-light flex items-center justify-center mb-4">
                <span className="text-3xl opacity-40">📷</span>
              </div>
              <div className="mb-4 text-2xl opacity-50">🎙️</div>

              <p className="font-hand text-xl text-blush-deep whitespace-pre-line">
                {finalLetterSignature}
              </p>

              <button
                onClick={() => setOpen(false)}
                className="mt-7 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors"
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
