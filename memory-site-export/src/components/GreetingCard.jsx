import { motion } from "framer-motion";
import { sweetMessages, birthdayMessage } from "../data/messages";
import { getTimeGreeting, isBirthday, pickForToday, formatDay, formatDate } from "../hooks/dateUtils";

export default function GreetingCard() {
  const today = new Date();
  const birthday = isBirthday(today);
  const { text: greetingText, emoji: greetingEmoji } = getTimeGreeting(today);
  const message = birthday ? birthdayMessage : pickForToday(sweetMessages, today);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative z-10 glass-card rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14 max-w-xl w-full mx-4 text-center"
    >
      {/* corner sparkle accents */}
      <span className="absolute -top-3 -left-3 text-2xl animate-sparkle">✨</span>
      <span className="absolute -bottom-3 -right-3 text-2xl animate-sparkle" style={{ animationDelay: "1s" }}>
        ✨
      </span>

      {birthday ? (
        <>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="font-display text-4xl sm:text-5xl text-blush-deep mb-3"
          >
            🎂 Happy Birthday ❤️
          </motion.p>
          <p className="font-hand text-2xl sm:text-3xl text-lavender-deep mb-5">
            {formatDay(today)}, {formatDate(today)}
          </p>
        </>
      ) : (
        <>
          <p className="font-hand text-2xl sm:text-3xl text-lavender-deep mb-1">
            {formatDay(today)}
          </p>
          <p className="font-body text-sm sm:text-base tracking-widest uppercase text-ink/50 mb-6">
            {formatDate(today)}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-blush-deep mb-6">
            {greetingText} {greetingEmoji}
          </h1>
        </>
      )}

      <motion.p
        key={message}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-body text-base sm:text-lg text-ink/80 leading-relaxed max-w-md mx-auto"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
