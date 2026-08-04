import MadeWithLove from "../components/MadeWithLove";
import { motion } from "framer-motion";
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
  const photos = [
    { src: "/photos/us-1.jpg",  label: "us 🌻" },
    { src: "/photos/us-3.jpg",  label: "25 Feb ❤️" },
    { src: "/photos/us-6.jpg",  label: "together 💕" },
    { src: "/photos/us-8.jpg",  label: "mirror 😂" },
    { src: "/photos/us-10.jpg", label: "always 🦋" },
  ];

  return (
    <div className="relative z-10 w-full overflow-hidden mt-6 mb-2 px-2">
      <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
            className="flex-shrink-0"
            style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (2 + i % 3)}deg)` }}
          >
            {/* Polaroid frame */}
            <div className="bg-white p-1.5 pb-5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] rounded-sm w-20 sm:w-24">
              <div className="w-full aspect-square overflow-hidden bg-blush-light">
                <img
                  src={p.src}
                  alt={p.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="font-hand text-[9px] sm:text-[10px] text-ink/60 text-center mt-1 truncate px-0.5">
                {p.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
          <MadeWithLove />
    </div>
  );
}

export default function HomePage({ onRideAway }) {
  const birthday = isBirthday();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

      {/* ─── HER PHOTO — true fixed full-page background ─── */}
      <div className="fixed inset-0 z-0">
        <img
          src="/photos/selva-jar-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center 30%",
            filter: "brightness(0.72) saturate(1.15)",
          }}
        />
        {/* subtle edge vignette only — center stays bright */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 45%, rgba(40,15,25,0.55) 100%)",
          }}
        />
        {/* very thin top/bottom page-blending fades */}
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(255,248,240,0.18), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(40,15,25,0.6), transparent)" }} />
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
