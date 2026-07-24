import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calendarDates } from "../../data/calendarDates";

const monthNames = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Extra floating stickers shown only on pages flagged `extraStickers`. */
function BonusStickers() {
  const icons = ["🌸", "💕", "⭐", "🦋", "✨"];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-lg sm:text-xl"
          style={{ left: `${12 + i * 18}%`, top: `${10 + (i % 2) * 70}%` }}
          animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
}

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
        className="relative bg-cream rounded-2xl px-7 py-8 max-w-sm w-full text-center shadow-glass overflow-hidden"
      >
        {date.extraStickers && <BonusStickers />}
        <span className="relative text-4xl">{date.icon}</span>
        <h3 className="relative font-display text-xl text-blush-deep mt-2 mb-3">{date.label}</h3>

        <div className="relative w-full h-32 rounded-lg bg-gradient-to-br from-blush-light via-cream to-lavender-light flex items-center justify-center mb-4 overflow-hidden">
          {date.image ? (
            <img src={date.image} alt={date.label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl opacity-40">📷</span>
          )}
        </div>

        <p className="relative font-hand text-lg text-ink/70 whitespace-pre-line">{date.popup}</p>

        <button
          onClick={onClose}
          className="relative mt-6 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors"
        >
          close
        </button>
      </motion.div>
    </motion.div>
  );
}

/** A single flip-calendar page: one date, shown big, tap to read its memory. */
function CalendarPage({ date, onOpen }) {
  return (
    <button
      onClick={() => onOpen(date)}
      className="relative w-full h-full flex flex-col items-center justify-center rounded-xl bg-cream border border-beige-deep/40 px-4 py-6 text-center overflow-hidden"
    >
      {date.extraStickers && <BonusStickers />}
      <span className="relative text-4xl sm:text-5xl mb-3">{date.icon}</span>
      <p className="relative font-display text-lg sm:text-xl text-blush-deep mb-1">{date.label}</p>
      <p className="relative font-hand text-lg text-lavender-deep">
        {monthNames[date.month]} {date.day}
      </p>
      <p className="relative font-body text-[11px] text-ink/40 mt-4">tap to read this memory</p>
    </button>
  );
}

export default function MemoryCalendar() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [openDate, setOpenDate] = useState(null);

  const goTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= calendarDates.length) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const current = calendarDates[index];

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

        {/* flip-page area */}
        <div
          className="relative h-56 sm:h-64"
          style={{ perspective: "1400px" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 70 : -70, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction > 0 ? -70 : 70, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.45, 0, 0.2, 1] }}
              style={{
                transformOrigin: direction > 0 ? "left center" : "right center",
                position: "absolute",
                inset: 0,
              }}
            >
              <CalendarPage date={current} onOpen={setOpenDate} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* prev / next controls */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="font-body text-xs sm:text-sm px-3 py-1.5 rounded-full bg-blush-light text-blush-deep disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blush transition-colors"
          >
            ← prev
          </button>
          <span className="font-hand text-base text-ink/50">
            {index + 1} / {calendarDates.length}
          </span>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === calendarDates.length - 1}
            className="font-body text-xs sm:text-sm px-3 py-1.5 rounded-full bg-blush-light text-blush-deep disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blush transition-colors"
          >
            next →
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openDate && <DatePopup date={openDate} onClose={() => setOpenDate(null)} />}
      </AnimatePresence>
    </div>
  );
}
