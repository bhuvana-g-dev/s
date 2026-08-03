import { useState } from "react";
import MadeWithLove from "../components/MadeWithLove";
import { motion, AnimatePresence } from "framer-motion";
import CinemaAtmosphere from "../components/cinema/CinemaAtmosphere";
import FilmDecor from "../components/cinema/FilmDecor";
import MemoryGallery from "../components/cinema/MemoryGallery";
import MemoryViewer from "../components/cinema/MemoryViewer";
import SecretCorner from "../components/cinema/SecretCorner";
import ConvertibleCar from "../components/cinema/ConvertibleCar";
import CarDriveTransition from "../components/cinema/CarDriveTransition";
import MusicControl from "../components/cinema/MusicControl";
import { cinemaMemories } from "../data/cinemaMemories";

export default function CinemaOfMemories({ onContinue }) {
  const [viewerIndex, setViewerIndex] = useState(null);
  const [driving, setDriving] = useState(false);

  const openViewer = (i) => setViewerIndex(i);
  const closeViewer = () => setViewerIndex(null);
  const navigate = (delta) => {
    setViewerIndex((i) => (i + delta + cinemaMemories.length) % cinemaMemories.length);
  };

  return (
    <motion.div
      className="relative min-h-screen w-full bg-cinema-gradient overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-cinema-radial pointer-events-none" />
      <CinemaAtmosphere />
      <FilmDecor />
      <MusicControl />

      {/* Hero */}
      <div className="relative z-10 pt-24 sm:pt-32 pb-6 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="font-display text-3xl sm:text-5xl text-cinema-cream mb-4"
        >
          Every Memory Has a Story...
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.4 }}
          className="font-hand text-xl sm:text-2xl text-cinema-cream/70 max-w-lg mx-auto"
        >
          Some moments are too beautiful to stay only in our hearts.
        </motion.p>
      </div>

      {/* Gallery */}
      <MemoryGallery onOpen={openViewer} />

      {/* Convertible car → next chapter */}
      <ConvertibleCar onDriveAway={() => setDriving(true)} />

      {/* Secret corner, always present on this page */}
      <SecretCorner />

      <AnimatePresence>
        {viewerIndex !== null && (
          <MemoryViewer index={viewerIndex} onClose={closeViewer} onNavigate={navigate} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {driving && <CarDriveTransition onComplete={onContinue} />}
      </AnimatePresence>
          <MadeWithLove />
    </motion.div>
  );
}
