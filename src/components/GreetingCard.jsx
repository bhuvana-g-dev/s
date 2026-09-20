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
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative z-10 rounded-[2rem] px-5 py-7 sm:px-12 sm:py-14 max-w-xl w-full mx-4 text-center"
           style={{
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        border: "none",
        boxShadow: "none",
      }}
    >
      <span className="absolute -top-3 -left-3 text-2xl animate-sparkle">✨</span>
      <span className="absolute -bottom-3 -right-3 text-2xl animate-sparkle" style={{ animationDelay:"1s" }}>✨</span>

      {bday ? (
        <>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="font-display text-4xl sm:text-5xl text-white mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            🎂 Happy Birthday ❤️
          </motion.p>
          <p className="font-hand text-2xl sm:text-3xl text-white/90 mb-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            {formatDay(today)}, {formatDate(today)}
          </p>
        </>
      ) : (
        <>
          <p className="font-hand text-2xl sm:text-3xl text-white/90 mb-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            {formatDay(today)}
          </p>
          <p className="font-body text-sm sm:text-base tracking-widest uppercase text-white/55 mb-6">
            {formatDate(today)}
          </p>
          <h1 className="font-display text-2xl sm:text-4xl text-white mb-4 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            {greetingText} {emoji}
          </h1>
        </>
      )}

      <motion.p
        key={message}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-body text-base sm:text-lg text-white/90 leading-relaxed max-w-md mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
