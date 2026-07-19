import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrapbookPages } from "../data/photos";

/** A single photo rendered inside a polaroid-style frame. Falls back to a soft placeholder. */
function Polaroid({ photo, rotate = 0, size = "md" }) {
  const sizes = {
    sm: "w-28 h-32 sm:w-32 sm:h-36",
    md: "w-40 h-48 sm:w-48 sm:h-56",
    lg: "w-56 h-64 sm:w-64 sm:h-72",
  };
  return (
    <div
      className={`bg-white p-2.5 pb-6 shadow-soft rounded-sm ${sizes[size]}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-full h-full bg-gradient-to-br from-blush-light via-cream to-lavender-light flex items-center justify-center overflow-hidden rounded-[2px]">
        {photo.src ? (
          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl opacity-50">🌸</span>
        )}
      </div>
    </div>
  );
}

/** Cute decorative stickers scattered on each page. */
function Stickers({ variant }) {
  const sets = {
    a: ["🌷", "⭐", "🦋"],
    b: ["💛", "🌸", "✨"],
    c: ["🌼", "💕", "⭐"],
  };
  const icons = sets[variant] || sets.a;
  const positions = ["-top-3 -left-3", "-top-2 -right-4", "-bottom-3 left-1/3"];
  return (
    <>
      {icons.map((icon, i) => (
        <span key={i} className={`absolute ${positions[i]} text-xl sm:text-2xl select-none`}>
          {icon}
        </span>
      ))}
    </>
  );
}

function PageContent({ page }) {
  const stickerVariant = ["a", "b", "c"][page.id % 3];
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 py-8">
      <Stickers variant={stickerVariant} />
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {page.layout === "single" && <Polaroid photo={page.photos[0]} size="lg" rotate={-2} />}
        {page.layout === "double" &&
          page.photos.map((p, i) => (
            <Polaroid key={i} photo={p} size="md" rotate={i === 0 ? -4 : 3} />
          ))}
        {page.layout === "triple" &&
          page.photos.map((p, i) => (
            <Polaroid key={i} photo={p} size="sm" rotate={(i - 1) * 5} />
          ))}
      </div>
      <p className="font-hand text-xl sm:text-2xl text-ink/70 mt-6 text-center">
        {page.caption}
      </p>
    </div>
  );
}

export default function Scrapbook() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const audioRef = useRef(null);

  const playFlipSound = () => {
    // Optional: drop a short flip sound at public/audio/page-flip.mp3
    // Fails silently if the file isn't present yet.
    try {
      if (!audioRef.current) audioRef.current = new Audio("/audio/page-flip.mp3");
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {});
    } catch {
      /* no-op */
    }
  };

  const goTo = (newIndex) => {
    if (newIndex < 0 || newIndex >= scrapbookPages.length) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
    playFlipSound();
  };

  const page = scrapbookPages[index];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="font-display text-2xl sm:text-3xl text-blush-deep text-center mb-6">
        A Book Filled With Your Smiles ❤️
      </h2>

      {/* Book frame: leather cover with gold corners */}
      <div
        className="relative rounded-2xl p-3 sm:p-5"
        style={{
          background: "linear-gradient(155deg, #7a4b3a 0%, #5b3628 100%)",
          boxShadow: "0 20px 40px rgba(91,54,40,0.35)",
        }}
      >
        {/* gold corner accents */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
          <span
            key={pos}
            className={`absolute ${pos} w-5 h-5 border-2 border-gold rounded-sm opacity-80`}
          />
        ))}

        {/* spiral binding */}
        <div className="absolute -left-2.5 top-6 bottom-6 flex flex-col justify-between">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-4 h-4 rounded-full bg-gold/80 border border-gold-deep shadow-sm" />
          ))}
        </div>

        {/* paper page with perspective for the flip */}
        <div
          className="relative bg-[#FFFCF6] rounded-lg overflow-hidden ml-3"
          style={{
            minHeight: "420px",
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(217,168,87,0.05), transparent 40%), radial-gradient(circle at 80% 70%, rgba(203,182,234,0.08), transparent 40%)",
            perspective: "1600px",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page.id}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 70 : -70, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: direction > 0 ? -70 : 70, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.45, 0, 0.2, 1] }}
              style={{ transformOrigin: direction > 0 ? "left center" : "right center", minHeight: "420px" }}
            >
              <PageContent page={page} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* prev / next controls */}
      <div className="flex items-center justify-between mt-5 px-1">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="font-body text-sm px-4 py-2 rounded-full bg-white/70 text-blush-deep disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors shadow-soft"
        >
          ← Previous
        </button>
        <span className="font-hand text-lg text-ink/50">
          {index + 1} / {scrapbookPages.length}
        </span>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === scrapbookPages.length - 1}
          className="font-body text-sm px-4 py-2 rounded-full bg-white/70 text-blush-deep disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors shadow-soft"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
