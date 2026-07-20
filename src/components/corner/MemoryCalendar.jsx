import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calendarDates } from "../../data/calendarDates";

function DatePopup({ date, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {date.special && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }, (_, i) => i).map((i) => (
            <motion.span
              key={i}
              className="absolute text-xl"
              style={{ left: `${(i * 11 + 3) % 100}%`, top: "-5%" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration: 4 + (i % 4), delay: i * 0.15, repeat: Infinity }}
            >
              {["🎈", "🎉", "✨"][i % 3]}
            </motion.span>
          ))}
        </div>
      )}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-cream rounded-2xl px-7 py-8 max-w-sm w-full text-center shadow-glass"
      >
        <span className="text-4xl">{date.icon}</span>
        <h3 className="font-display text-xl text-blush-deep mt-2 mb-3">{date.label}</h3>

        <div className="w-full h-32 rounded-lg bg-gradient-to-br from-blush-light via-cream to-lavender-light flex items-center justify-center mb-4 overflow-hidden">
          {date.image ? (
            <img src={date.image} alt={date.label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl opacity-40">📷</span>
          )}
        </div>

        <p className="font-hand text-lg text-ink/70 whitespace-pre-line">{date.popup}</p>

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

export default function MemoryCalendar() {
  const [openDate, setOpenDate] = useState(null);

  return (
    <div className="relative bg-[#B98A63] rounded-2xl p-4 sm:p-6 shadow-soft">
      {/* fairy lights along the top */}
      <div className="flex justify-between px-2 -mt-8 mb-2">
        {Array.from({ length: 9 }, (_, i) => i).map((i) => (
          <motion.span
            key={i}
            className="text-lg"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
          >
            💡
          </motion.span>
        ))}
      </div>

      <div className="bg-[#FFFCF6] rounded-xl p-4 sm:p-5 relative overflow-hidden">
        {/* washi tape corners */}
        <div className="absolute -top-2 -left-3 w-12 h-5 bg-blush/70 rotate-[-15deg]" />
        <div className="absolute -top-2 -right-3 w-12 h-5 bg-lavender/70 rotate-[15deg]" />

        <h3 className="font-display text-lg sm:text-xl text-blush-deep text-center mb-1">
          🌻 Memory Calendar
        </h3>
        <p className="font-hand text-sm text-ink/50 text-center mb-4">
          little dates that mean everything
        </p>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {calendarDates.map((d) => (
            <motion.button
              key={d.id}
              onClick={() => setOpenDate(d)}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex flex-col items-center justify-center bg-cream rounded-lg py-3 px-2 shadow-sm border border-beige-deep/40"
            >
              <span className="text-xl">{d.icon}</span>
              <span className="font-body text-[11px] text-ink/60 mt-1 text-center leading-tight">
                {d.label}
              </span>
              <span className="font-hand text-xs text-lavender-deep mt-0.5">
                {d.month}/{d.day}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openDate && <DatePopup date={openDate} onClose={() => setOpenDate(null)} />}
      </AnimatePresence>
    </div>
  );
}
