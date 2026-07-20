import { motion } from "framer-motion";
import BirthdayLeftSetup from "../components/birthday-room/BirthdayLeftSetup";
import DiningTable from "../components/birthday-room/DiningTable";
import { wallBanner } from "../data/birthdayRoom";

function FairyLightsBorder() {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between px-4 pt-2 pointer-events-none z-10">
      {Array.from({ length: 16 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="text-sm"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1 }}
        >
          💡
        </motion.span>
      ))}
    </div>
  );
}

function FloatingBalloonsAndConfetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <motion.span
          key={`b${i}`}
          className="absolute text-3xl"
          style={{ left: `${(i * 11 + 3) % 100}%`, bottom: "-10%" }}
          animate={{ y: "-120vh", opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 14 + (i % 5), delay: i * 1.1, repeat: Infinity, ease: "easeInOut" }}
        >
          🎈
        </motion.span>
      ))}
      {Array.from({ length: 14 }, (_, i) => i).map((i) => (
        <motion.span
          key={`c${i}`}
          className="absolute text-lg"
          style={{ left: `${(i * 8 + 5) % 100}%`, top: "-5%" }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: 8 + (i % 4), delay: i * 0.6, repeat: Infinity, ease: "linear" }}
        >
          🎊
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdaySurpriseRoom() {
  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(242,166,90,0.35) 0%, rgba(61,33,64,0.9) 45%, rgba(26,16,37,1) 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="film-grain" />
      <FairyLightsBorder />
      <FloatingBalloonsAndConfetti />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <motion.h1
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-2xl sm:text-4xl text-center text-cinema-cream mb-10 sm:mb-14 drop-shadow-[0_0_18px_rgba(242,166,90,0.6)]"
        >
          {wallBanner}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          <BirthdayLeftSetup />
          <DiningTable />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="font-hand text-lg sm:text-xl text-cinema-cream/70 text-center mt-12"
        >
          every corner of this room was decorated with you in mind ❤️🌻
        </motion.p>
      </div>
    </motion.div>
  );
}
