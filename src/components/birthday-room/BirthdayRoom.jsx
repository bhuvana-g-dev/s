import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloudsIntro from "./CloudsIntro";
import BirthdayWall from "./BirthdayWall";
import BirthdayCake from "./BirthdayCake";
import GiftCorner from "./GiftCorner";
import FoodTable from "./FoodTable";
import ChocolateHeaven from "./ChocolateHeaven";
import PolaroidWall from "./PolaroidWall";
import FinalLetter from "./FinalLetter";
import SecretObjects from "./SecretObjects";
import { endingText } from "../../data/birthdayRoom";

const LETTER_UNLOCK_THRESHOLD = 3;

function FairyAmbient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <motion.span
          key={`b${i}`}
          className="absolute text-2xl"
          style={{ left: `${(i * 11 + 3) % 100}%`, bottom: "-10%" }}
          animate={{ y: "-120vh", opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 16 + (i % 5), delay: i * 1.3, repeat: Infinity, ease: "easeInOut" }}
        >
          🎈
        </motion.span>
      ))}
      {Array.from({ length: 12 }, (_, i) => i).map((i) => (
        <motion.span
          key={`c${i}`}
          className="absolute text-sm"
          style={{ left: `${(i * 8 + 5) % 100}%`, top: "-5%" }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: 10 + (i % 4), delay: i * 0.8, repeat: Infinity, ease: "linear" }}
        >
          🎊
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdayRoom() {
  const [introDone, setIntroDone] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const registerInteraction = () => setInteractionCount((c) => c + 1);
  const letterUnlocked = interactionCount >= LETTER_UNLOCK_THRESHOLD;

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
      <AnimatePresence>
        {!introDone && <CloudsIntro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <div className="film-grain" />
      <FairyAmbient />
      <SecretObjects onInteract={registerInteraction} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-14 sm:py-20"
      >
        {/* ===== Mobile: strict vertical order. Desktop: two columns. ===== */}
        <div className="flex flex-col lg:hidden gap-10">
          <BirthdayWall />
          <BirthdayCake onInteract={registerInteraction} />
          <GiftCorner onInteract={registerInteraction} />
          <FoodTable onInteract={registerInteraction} />
          <ChocolateHeaven onInteract={registerInteraction} />
          <PolaroidWall onInteract={registerInteraction} />
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <BirthdayWall />
            <BirthdayCake onInteract={registerInteraction} />
            <GiftCorner onInteract={registerInteraction} />
            <PolaroidWall onInteract={registerInteraction} />
          </div>
          <div className="flex flex-col">
            <FoodTable onInteract={registerInteraction} />
            <ChocolateHeaven onInteract={registerInteraction} />
          </div>
        </div>

        <div className="flex justify-center">
          <FinalLetter visible={letterUnlocked} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="font-hand text-base sm:text-lg text-cinema-cream/50 text-center mt-14 whitespace-pre-line"
        >
          {endingText}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
