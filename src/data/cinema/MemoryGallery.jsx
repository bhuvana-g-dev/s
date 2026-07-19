import { motion } from "framer-motion";
import { cinemaMemories } from "../../data/cinemaMemories";

/** One gallery card — styled as a polaroid for photos, a film frame for videos. */
function MemoryCard({ memory, index, onOpen }) {
  const isVideo = memory.type === "video";
  const floatDelay = (index % 4) * 0.6;

  return (
    <motion.button
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
      whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
      className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-cinema-sunset rounded-sm text-left"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className={`relative p-2.5 pb-8 rounded-sm shadow-[0_14px_30px_rgba(0,0,0,0.4)] ${
          isVideo ? "bg-cinema-night border border-cinema-sunset/30" : "bg-cinema-cream"
        }`}
      >
        <div className="w-40 h-48 sm:w-48 sm:h-56 bg-gradient-to-br from-cinema-plum via-cinema-dusk to-cinema-night flex items-center justify-center overflow-hidden rounded-[2px] relative">
          {memory.src ? (
            isVideo ? (
              <video src={memory.src} className="w-full h-full object-cover" muted />
            ) : (
              <img src={memory.src} alt={memory.caption} className="w-full h-full object-cover" />
            )
          ) : (
            <span className="text-4xl opacity-60">{isVideo ? "🎬" : "🌇"}</span>
          )}

          {isVideo && (
            <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-cinema-ember/90 flex items-center justify-center text-cinema-cream text-sm">
              ▶
            </span>
          )}

          {/* subtle vignette on the card itself */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <p
          className={`font-hand text-lg mt-2 text-center truncate px-1 ${
            isVideo ? "text-cinema-cream/80" : "text-ink/70"
          }`}
        >
          {memory.date}
        </p>
      </motion.div>
    </motion.button>
  );
}

export default function MemoryGallery({ onOpen }) {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-10">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {cinemaMemories.map((memory, i) => (
          <MemoryCard key={memory.id} memory={memory} index={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
