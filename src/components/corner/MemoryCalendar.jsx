import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calendarDates, monthNames, daysInMonth, YEAR } from "../../data/calendarDates";

// ── Get day-of-week offset for first day of a month (2026) ──
// Jan 1 2026 = Thursday (4)
const JAN1_DOW = 4;
function firstDayOfMonth(month) {
  let days = 0;
  for (let m = 1; m < month; m++) days += daysInMonth[m];
  return (JAN1_DOW + days) % 7;
}

const DOW_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const TAMIL_DOW  = ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"];

// ── Find special date data for a given month/day ──
function getSpecialDate(month, day) {
  return calendarDates.find(d => d.month === month && d.day === day) || null;
}

// ── Sticker popup ─────────────────────────────────────────────
function StickerPopup({ date, onClose }) {
  const stickerSrc = `/photos/sticker-${date.sticker}.jpg`;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {date.birthday && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.span key={i} className="absolute text-xl"
              style={{ left: `${(i * 11 + 3) % 100}%`, top: "-5%" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration: 4 + (i % 3), delay: i * 0.15, repeat: Infinity }}
            >
              {["🎈","🎉","🌻","✨"][i % 4]}
            </motion.span>
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#FFFCF6] rounded-2xl p-5 max-w-xs w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden"
      >
        {/* washi tape top */}
        <div className="absolute -top-2 left-8 w-16 h-5 bg-blush/60 rotate-[-12deg]" />
        <div className="absolute -top-2 right-8 w-16 h-5 bg-lavender/60 rotate-[12deg]" />

        <p className="font-hand text-2xl text-blush-deep mb-1">{date.icon} {date.label}</p>
        <p className="font-body text-xs text-lavender-deep mb-3">
          {monthNames[date.month]} {date.day}, {YEAR}
        </p>

        {/* cute sticker photo */}
        <motion.div
          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="relative mx-auto w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-soft"
          style={{ transform: "rotate(-2deg)" }}
        >
          <img src={stickerSrc} alt="our memory"
            className="w-full h-full object-cover object-top" />
          {/* cute sticker overlays */}
          <span className="absolute top-1 right-1 text-lg">✨</span>
          <span className="absolute bottom-1 left-1 text-lg">🌸</span>
        </motion.div>

        {/* floating hearts around the sticker */}
        {["❤","💕","🌻"].map((h, i) => (
          <motion.span key={i}
            className="absolute text-base text-blush-deep"
            style={{ top: `${30 + i * 18}%`, left: i % 2 === 0 ? "6%" : "88%" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.3 }}
          >{h}</motion.span>
        ))}

        <p className="font-hand text-base text-ink/70 mt-4 px-2 whitespace-pre-line leading-relaxed">
          {date.text}
        </p>

        <button onClick={onClose}
          className="mt-5 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors">
          close 💌
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Single month calendar grid ────────────────────────────────
function MonthGrid({ month, onDayClick }) {
  const offset = firstDayOfMonth(month);
  const total  = daysInMonth[month];
  const cells  = [];

  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);

  return (
    <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
      {DOW_LABELS.map((d, i) => (
        <div key={d} className="text-center py-1">
          <p className={`font-body text-[9px] sm:text-[10px] font-bold
            ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-ink/50"}`}>
            {d}
          </p>
          <p className="font-body text-[8px] text-ink/30 hidden sm:block">{TAMIL_DOW[i]}</p>
        </div>
      ))}
      {cells.map((day, idx) => {
        if (!day) return <div key={`e${idx}`} />;
        const special = getSpecialDate(month, day);
        const dow = (idx) % 7;
        const isSun = dow === 0;
        const isSat = dow === 6;
        return (
          <motion.button
            key={day}
            onClick={() => special && onDayClick(special)}
            whileHover={special ? { scale: 1.12 } : {}}
            whileTap={special ? { scale: 0.95 } : {}}
            className={`relative flex flex-col items-center justify-center rounded-lg py-1 px-0.5 min-h-[36px] sm:min-h-[42px]
              ${special ? "cursor-pointer" : "cursor-default"}
              ${special ? "bg-gradient-to-b from-yellow-50 to-yellow-100 border border-yellow-300 shadow-sm" : "bg-transparent"}
            `}
          >
            {special && (
              <motion.span
                className="absolute -top-1.5 -right-1.5 text-sm"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: day * 0.08 }}
              >💛</motion.span>
            )}
            <span className={`font-display text-sm sm:text-base font-bold leading-none
              ${special ? "text-blush-deep" : isSun ? "text-red-400" : isSat ? "text-blue-400" : "text-ink/80"}`}>
              {day}
            </span>
            {special && (
              <span className="text-[10px] leading-none mt-0.5">{special.icon}</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Main flip calendar ────────────────────────────────────────
export default function MemoryCalendar() {
  const [month, setMonth] = useState(7); // start on July (birthday month!)
  const [dir, setDir]     = useState(1);
  const [popup, setPopup] = useState(null);

  const go = (d) => {
    const next = month + d;
    if (next < 1 || next > 12) return;
    setDir(d); setMonth(next);
  };

  return (
    <div className="relative">
      {/* ── outer frame: brown like a real calendar ── */}
      <div className="rounded-2xl p-3 sm:p-4"
        style={{ background: "linear-gradient(155deg, #8B5E3C 0%, #6B3F25 100%)",
          boxShadow: "0 16px 40px rgba(107,63,37,0.4)" }}>

        {/* spiral binding holes */}
        <div className="flex justify-around mb-1 px-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#4a2a10] border border-[#D9A857]/60" />
          ))}
        </div>

        {/* calendar face */}
        <div className="bg-white rounded-xl overflow-hidden">
          {/* red header like Tamil calendar */}
          <div className="bg-red-600 px-3 py-2 flex items-center justify-between">
            <button onClick={() => go(-1)} disabled={month === 1}
              className="w-7 h-7 rounded-full bg-white/20 text-white disabled:opacity-30 hover:bg-white/35 transition-colors flex items-center justify-center text-sm">
              ←
            </button>
            <div className="text-center">
              <p className="text-white font-display text-lg sm:text-xl font-bold tracking-wide">
                {monthNames[month].toUpperCase()}
              </p>
              <p className="text-white/80 text-xs font-body">{YEAR} — 🌻 Memory Calendar</p>
            </div>
            <button onClick={() => go(1)} disabled={month === 12}
              className="w-7 h-7 rounded-full bg-white/20 text-white disabled:opacity-30 hover:bg-white/35 transition-colors flex items-center justify-center text-sm">
              →
            </button>
          </div>

          {/* page flip animation */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={month} custom={dir}
              initial={{ rotateY: dir > 0 ? 60 : -60, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: dir > 0 ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.45, 0, 0.2, 1] }}
              style={{ transformOrigin: dir > 0 ? "left center" : "right center" }}
              className="p-3 sm:p-4"
            >
              <MonthGrid month={month} onDayClick={setPopup} />
            </motion.div>
          </AnimatePresence>

          {/* footer */}
          <div className="bg-red-50 px-3 py-2 flex items-center justify-between border-t border-red-100">
            <p className="font-hand text-xs text-blush-deep">💛 yellow = our special days</p>
            <p className="font-body text-[10px] text-ink/40">{month} / 12</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {popup && <StickerPopup date={popup} onClose={() => setPopup(null)} />}
      </AnimatePresence>
    </div>
  );
}
