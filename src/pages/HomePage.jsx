import MadeWithLove from "../components/MadeWithLove";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AmbientAnimations from "../components/AmbientAnimations";
import GreetingCard from "../components/GreetingCard";
import MemoryJar from "../components/MemoryJar";
import BikeRide from "../components/BikeRide";
import Celebration from "../components/Celebration";
import { isBirthday } from "../hooks/dateUtils";

/* ── Animated heart ripples drawn on a canvas behind everything ── */
function HeartRipples() {
  const ref = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#E17497","#F4B8CE","#CBB6EA","#D9A857","#E8628C"];
    const spawn = (x, y, n = 1) => {
      for (let i = 0; i < n; i++) {
        ripples.current.push({
          x: x + (Math.random()-.5)*30,
          y: y + (Math.random()-.5)*30,
          r: 0,
          alpha: 0.6,
          color: COLORS[Math.floor(Math.random()*COLORS.length)],
        });
      }
    };

    // auto-spawn gently across whole screen
    const auto = setInterval(() => spawn(Math.random()*window.innerWidth, Math.random()*window.innerHeight), 800);

    const heart = (ctx, x, y, s) => {
      ctx.beginPath();
      ctx.moveTo(x, y - s*.25);
      ctx.bezierCurveTo(x, y-s*.6, x-s*.55, y-s*.6, x-s*.55, y-s*.25);
      ctx.bezierCurveTo(x-s*.55, y+s*.1, x, y+s*.45, x, y+s*.6);
      ctx.bezierCurveTo(x, y+s*.45, x+s*.55, y+s*.1, x+s*.55, y-s*.25);
      ctx.bezierCurveTo(x+s*.55, y-s*.6, x, y-s*.6, x, y-s*.25);
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.current = ripples.current.filter(r => r.alpha > 0.01);
      ripples.current.forEach(r => {
        ctx.save();
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = r.color;
        ctx.lineWidth   = 1.6;
        heart(ctx, r.x, r.y, r.r);
        ctx.stroke();
        ctx.restore();
        r.r     += 1.5;
        r.alpha -= 0.007;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e) => {
      const x = e.touches?.[0]?.clientX ?? e.clientX;
      const y = e.touches?.[0]?.clientY ?? e.clientY;
      if (Math.random() < .3) spawn(x, y, 2);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(auto);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <canvas ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2, mixBlendMode: "screen" }}
    />
  );
}

/* ── Heart-shaped photo wall ──
 * HEART_MASK: "X" = a photo tile, "." = empty. Edit it to reshape the heart.
 * HEART_PHOTOS: photos are cycled through the tiles in order, so add more
 * entries here and fewer photos will repeat. `thumb` is a 256px square crop
 * (public/photos/heart/) used in the grid; `src` is the full photo for the lightbox. */
const HEART_MASK = [
  ".XXX.XXX.",
  "XXXXXXXXX",
  "XXXXXXXXX",
  ".XXXXXXX.",
  "..XXXXX..",
  "...XXX...",
  "....X....",
];

const SOFT_MEMORY = "Another little piece of our story";
const HEART_PHOTOS = [
  { id: "us-1",  label: "us 🌻",       memory: "Every moment with you is precious" },
  { id: "selva-1", label: "you 🌸",    memory: SOFT_MEMORY },
  { id: "us-3",  label: "25 Feb ❤️",   memory: "A day etched in my heart forever" },
  { id: "us-6",  label: "together 💕", memory: "Wherever you are, that's where I belong" },
  { id: "selva-2", label: "you 🌸",    memory: SOFT_MEMORY },
  { id: "us-8",  label: "mirror 😂",   memory: "Our silliest, most authentic laughs" },
  { id: "us-10", label: "always 🦋",   memory: "You and me, across every chapter" },
  { id: "selva-3", label: "you 🌸",    memory: SOFT_MEMORY },
  { id: "us-2",  label: "us 💕",       memory: SOFT_MEMORY },
  { id: "us-4",  label: "us 💕",       memory: SOFT_MEMORY },
  { id: "selva-4", label: "you 🌸",    memory: SOFT_MEMORY },
  { id: "us-5",  label: "us 💕",       memory: SOFT_MEMORY },
  { id: "us-7",  label: "us 💕",       memory: SOFT_MEMORY },
  { id: "selva-solo-2", label: "you 🌸", memory: SOFT_MEMORY },
  { id: "us-9",  label: "us 💕",       memory: SOFT_MEMORY },
].map((p) => ({ ...p, src: `/photos/${p.id}.jpg`, thumb: `/photos/heart/${p.id}.jpg` }));

// Build the tile list once: each "X" gets the next photo, a tiny tilt, and an
// entrance delay that ripples outward from the middle of the heart.
const HEART_CELLS = (() => {
  const rows = HEART_MASK.length;
  const cols = HEART_MASK[0].length;
  let n = 0;
  return HEART_MASK.flatMap((row, r) =>
    [...row].map((ch, c) => {
      const key = `${r}-${c}`;
      if (ch !== "X") return { key, empty: true };
      const photo = HEART_PHOTOS[n % HEART_PHOTOS.length];
      const dist = Math.hypot(r - rows / 2.6, c - (cols - 1) / 2);
      const cell = { key, photo, rot: ((n * 37) % 7) - 3, delay: 0.3 + dist * 0.07 };
      n += 1;
      return cell;
    })
  );
})();

/* ── Floating photo strip along the bottom — our together photos ── */
function FloatingPhotoStrip() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="relative z-10 w-full overflow-hidden mt-12 sm:mt-16 mb-4 px-4">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h3
          className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.08em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF2DE 50%, #F6C88D 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Moments We'll Never Forget
        </h3>
        <p className="font-hand text-base sm:text-lg text-white/75 mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
          tap any photo to take a closer look... 📸✨
        </p>
      </div>

      {/* ── Heart-shaped photo wall ── */}
      <div className="relative mx-auto py-3" style={{ width: "min(92vw, 640px)" }}>
        {/* soft rosy glow behind the heart */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none blur-3xl opacity-70"
          style={{ background: "radial-gradient(circle at 50% 42%, rgba(244,120,160,0.55), transparent 65%)" }}
        />
        {/* gentle heartbeat */}
        <motion.div
          animate={{ scale: [1, 1.018, 1, 1.012, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="grid grid-cols-9 gap-1 sm:gap-1.5"
        >
          {HEART_CELLS.map((cell) =>
            cell.empty ? (
              <div key={cell.key} />
            ) : (
              <motion.button
                key={cell.key}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: cell.delay, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.35, rotate: 0, zIndex: 30 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(cell.photo)}
                aria-label={cell.photo.label}
                className="relative aspect-square cursor-pointer select-none overflow-hidden rounded-[3px] border-[1.5px] sm:border-2 border-[#FFFDF9] shadow-[0_3px_10px_rgba(0,0,0,0.4)] bg-blush-light/50"
                style={{ rotate: cell.rot }}
              >
                <img
                  src={cell.photo.thumb}
                  alt={cell.photo.label}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = cell.photo.src; }}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            )
          )}
        </motion.div>
      </div>

      {/* ── Photo Lightbox Modal on Click ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-3 sm:p-5 pb-8 sm:pb-10 rounded-2xl max-w-sm sm:max-w-md w-full shadow-2xl text-center border border-white/30"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-ink text-base transition-colors"
                aria-label="Close photo"
              >
                ✕
              </button>
              <div className="w-full aspect-square overflow-hidden rounded-xl bg-blush-light mb-4 shadow-sm">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.label}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="font-hand text-2xl sm:text-3xl text-ink font-bold">
                {selectedPhoto.label}
              </p>
              <p className="font-body text-xs sm:text-sm text-ink/65 mt-1.5 px-2">
                {selectedPhoto.memory}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MadeWithLove />
    </div>
  );
}

export default function HomePage({ onRideAway }) {
  const birthday = isBirthday();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* ─── HER PHOTO — enhanced fixed full-page background ─── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          src="/photos/selva-jar-bg.jpg"
          alt="Selva"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "32% 34%",
            filter: "brightness(0.85) saturate(1.06) contrast(1.02)",
          }}
        />
        {/* Soft luxury romantic vignette — softens harsh bricks while keeping her portrait radiant and clear */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 35% 36%, transparent 0%, rgba(35, 12, 22, 0.32) 60%, rgba(16, 5, 10, 0.75) 100%)",
          }}
        />
        {/* Warm ambient spotlight behind main content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(246, 193, 140, 0.14) 0%, rgba(225, 116, 151, 0.06) 45%, transparent 75%)",
          }}
        />
        {/* Top/bottom smooth blended fades */}
        <div
          className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(20, 7, 13, 0.4), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(18, 6, 12, 0.88), transparent)",
          }}
        />
      </div>

      {/* ─── heart ripples (screen blend — don't dim photo) ─── */}
      <HeartRipples />

      {/* ─── petals / butterflies / sparkles ─── */}
      <AmbientAnimations />

      {birthday && <Celebration />}

      {/* ─── page content ─── */}
      <motion.div
        className="relative z-10 flex flex-col items-center pt-4 sm:pt-10 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <GreetingCard />
        <MemoryJar />
        <FloatingPhotoStrip />
        <BikeRide onRideAway={onRideAway} />
      </motion.div>
    </div>
  );
}
