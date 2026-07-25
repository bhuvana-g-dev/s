import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayPhotos } from "../../data/birthdayPhotos";

function HangingPolaroid({ photo, index, onOpen }) {
  const rotate = (index % 2 === 0 ? -1 : 1) * (4 + (index % 3) * 2);
  return (
    <div className="flex flex-col items-center">
      {/* string + clip */}
      <div className="w-px h-5 bg-cinema-cream/30" />
      <span className="text-xs -mt-1 mb-0.5">📌</span>
      <motion.button
        onClick={() => onOpen(photo)}
        animate={{ rotate: [rotate - 3, rotate + 3, rotate - 3] }}
        transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        className="bg-white p-1.5 pb-4 shadow-soft focus:outline-none"
        style={{ transformOrigin: "top center" }}
      >
        <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-br from-blush-light to-lavender-light overflow-hidden">
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg opacity-40">📷</div>
          )}
        </div>
      </motion.button>
    </div>
  );
}

function EnlargedPhoto({ photo, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/90 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-3 pb-8 shadow-cinemaGlow"
      >
        <div className="w-64 h-80 sm:w-72 sm:h-88 bg-gradient-to-br from-blush-light to-lavender-light overflow-hidden">
          {photo.src ? (
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">📷</div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PolaroidWall({ onInteract }) {
  const [openPhoto, setOpenPhoto] = useState(null);

  const handleOpen = (photo) => {
    setOpenPhoto(photo);
    onInteract?.();
  };

  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6 mt-6">
      <p className="font-hand text-lg text-cinema-cream/80 text-center mb-3">a little wall of us</p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {birthdayPhotos.map((p, i) => (
          <HangingPolaroid key={p.id} photo={p} index={i} onOpen={handleOpen} />
        ))}
      </div>

      <AnimatePresence>
        {openPhoto && <EnlargedPhoto photo={openPhoto} onClose={() => setOpenPhoto(null)} />}
      </AnimatePresence>
    </div>
  );
}
