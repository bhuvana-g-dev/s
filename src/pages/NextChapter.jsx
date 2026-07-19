import { motion } from "framer-motion";

export default function NextChapter() {
  return (
    <motion.div
      className="relative min-h-screen w-full flex items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(180deg, #1A1025 0%, #2B1A2E 60%, #0F0A16 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="film-grain" />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-hand text-3xl sm:text-4xl text-cinema-cream relative z-10"
      >
        Our next adventure is waiting...
      </motion.p>
    </motion.div>
  );
}
