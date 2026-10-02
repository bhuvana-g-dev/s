import MadeWithLove from "../components/MadeWithLove";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
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

/* ── Floating photo strip along the bottom — our together photos ── */
function FloatingPhotoStrip() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { src: "/photos/us-1.jpg",  label: "us 🌻", memory: "Every moment with you is precious" },
    { src: "/photos/us-3.jpg",  label: "25 Feb ❤️", memory: "A day etched in my heart forever" },
    { src: "/photos/us-6.jpg",  label: "together 💕", memory: "Wherever you are, that's where I belong" },
    { src: "/photos/us-8.jpg",  label: "mirror 😂", memory: "Our silliest, most authentic laughs" },
    { src: "/photos/us-10.jpg", label: "always 🦋", memory: "You and me, across every chapter" },
  ];

  const rotations = [-3.5, 2.5, -1.8, 3.2, -2.8];
  const yOffsets = [6, -8, 10, -5, 8];
  const tapeColors = [
    "rgba(244, 184, 206, 0.75)",
    "rgba(254, 215, 170, 0.75)",
    "rgba(203, 182, 234, 0.75)",
    "rgba(254, 240, 138, 0.75)",
    "rgba(251, 207, 232, 0.75)",
  ];

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
          tap any polaroid to take a closer look... 📸✨
        </p>
      </div>

      {/* Responsive, staggered organic gallery */}
      <div className="flex gap-4 sm:gap-6 justify-center flex-wrap items-center max-w-6xl mx-auto py-2">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.1, duration: 0.65, ease: "easeOut" }}
            whileHover={{ scale: 1.08, y: -12, rotate: 0, zIndex: 30 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedPhoto(p)}
            className="flex-shrink-0 cursor-pointer select-none"
            style={{
              transform: `rotate(${rotations[i]}deg) translateY(${yOffsets[i]}px)`,
            }}
          >
            {/* Polaroid frame */}
            <div className="relative bg-[#FFFDF9] p-2.5 sm:p-3 pb-7 sm:pb-9 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.5)] transition-shadow rounded-sm w-36 sm:w-44 md:w-48 border border-white/40">
              {/* Decorative washi tape at top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-11 sm:w-14 h-4 sm:h-5 rounded-xs shadow-xs pointer-events-none"
                style={{
                  backgroundColor: tapeColors[i % tapeColors.length],
                  transform: `translateX(-50%) rotate(${i % 2 === 0 ? -2.5 : 2.5}deg)`,
                }}
              />

              {/* Photo Image */}
              <div className="w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-blush-light/50 rounded-xs shadow-inner">
                <img
                  src={p.src}
                  alt={p.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Handwritten caption */}
              <p className="font-hand text-base sm:text-lg text-ink/80 text-center mt-2.5 font-bold truncate px-1">
                {p.label}
              </p>
            </div>
          </motion.div>
        ))}
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
            filter: "brightness(0.66) saturate(1.08) contrast(1.04)",
          }}
        />
        {/* Soft luxury romantic vignette — softens harsh bricks while keeping her portrait glowing */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 35% 38%, rgba(255, 235, 220, 0.12) 0%, rgba(42, 16, 26, 0.58) 55%, rgba(18, 6, 12, 0.88) 100%)",
          }}
        />
        {/* Warm ambient spotlight behind main content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(246, 193, 140, 0.18) 0%, rgba(225, 116, 151, 0.08) 45%, transparent 75%)",
          }}
        />
        {/* Top/bottom smooth blended fades */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(20, 7, 13, 0.65), transparent)",
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
        className="relative z-10 flex flex-col items-center pt-8 sm:pt-24 pb-10"
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
