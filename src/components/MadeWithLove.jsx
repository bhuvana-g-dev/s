import { motion } from "framer-motion";

export default function MadeWithLove() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full flex justify-center pb-6 pt-4"
    >
      <p
        className="font-hand text-sm sm:text-base text-center px-4"
        style={{ color: "rgba(255,255,255,0.45)", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
      >
        made with love by Bhuvana ❤️
      </p>
    </motion.div>
  );
}
