import { motion } from "framer-motion";
import { sweetMessages, birthdayMessage } from "../data/messages";
import { getTimeGreeting, isBirthday, pickForToday, formatDay, formatDate } from "../hooks/dateUtils";

export default function GreetingCard() {
  const today   = new Date();
  const bday    = isBirthday(today);
  const { text: greetingText, emoji } = getTimeGreeting(today);
  const message = bday ? birthdayMessage : pickForToday(sweetMessages, today);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative z-10 px-4 py-3 sm:px-6 sm:py-5 max-w-xl w-full mx-auto text-center select-none"
      style={{
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        border: "none",
        boxShadow: "none",
      }}
    >
      {bday ? (
        <>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="font-display text-4xl sm:text-5xl text-white mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          >
            🎂 Happy Birthday ❤️
          </motion.p>
          <p className="font-hand text-2xl sm:text-3xl text-white/95 mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {formatDay(today)}, {formatDate(today)}
          </p>
        </>
      ) : (
        <>
          <p className="font-hand text-2xl sm:text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-0.5">
            {formatDay(today)}
          </p>
          <p className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-white/80 mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] font-medium">
            {formatDate(today)}
          </p>
          <h1 className="font-display text-2xl sm:text-4xl text-white mb-2 sm:mb-3 drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
            {greetingText} {emoji}
          </h1>
        </>
      )}

      <motion.p
        key={message}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-body text-base sm:text-lg text-white font-normal leading-relaxed max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
