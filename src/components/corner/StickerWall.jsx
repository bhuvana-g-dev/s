import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memoryCards } from "../../data/memoryBoard";

// ── Animated waveform bars that pulse when audio is playing ──────────────────
function WaveformBars({ playing, color = "#E17497" }) {
  const NUM_BARS = 28;
  return (
    <div className="flex items-end justify-center gap-[3px] h-10 w-full px-2">
      {Array.from({ length: NUM_BARS }, (_, i) => {
        const baseH = 18 + Math.sin((i / NUM_BARS) * Math.PI) * 22;
        return (
          <motion.span
            key={i}
            className="flex-shrink-0 rounded-full"
            style={{
              width: "3px",
              height: `${baseH}px`,
              backgroundColor: color,
              opacity: 0.85,
            }}
            animate={
              playing
                ? {
                    scaleY: [1, 1.8 + Math.random() * 1.2, 0.4 + Math.random() * 0.5, 1],
                    opacity: [0.85, 1, 0.6, 0.85],
                  }
                : { scaleY: 1, opacity: 0.4 }
            }
            transition={{
              duration: 0.55 + (i % 4) * 0.12,
              repeat: playing ? Infinity : 0,
              delay: (i % 7) * 0.07,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Format seconds → mm:ss ────────────────────────────────────────────────────
function fmt(s) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// ── Custom Audio Player modal ─────────────────────────────────────────────────
function AudioPlayerModal({ card }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play().catch(() => setHasError(true));
    setPlaying((p) => !p);
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * duration;
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    const onErr = () => { setHasError(true); setPlaying(false); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
      a.pause();
    };
  }, []);

  const progress = duration ? current / duration : 0;

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Full blurred cover art as background */}
      {card.coverArt && (
        <div
          className="absolute inset-0 bg-cover scale-110"
          style={{
            backgroundImage: `url(${card.coverArt})`,
            backgroundPosition: card.facePosition ? card.facePosition.replace("center ", "") : "center top",
            filter: "blur(18px) brightness(0.35) saturate(1.4)",
          }}
        />
      )}
      {/* Color overlay if no cover art */}
      {!card.coverArt && (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(145deg, ${card.bgFrom}, ${card.bgTo})` }}
        />
      )}

      {/* Top glow blob */}
      <div
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-60"
        style={{ background: card.glowRgba }}
      />

      {/* Content */}
      <div className="relative p-6 sm:p-8">
        {/* Badge */}
        <span
          className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full text-white mb-5"
          style={{ background: card.glowColor }}
        >
          {card.badgeLabel}
        </span>

        {/* Spinning album cover / icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            {/* Vinyl disc shadow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-50 scale-90"
              style={{ background: card.glowColor }}
            />
            <motion.div
              className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 5, repeat: playing ? Infinity : 0, ease: "linear" }}
            >
              {card.coverArt ? (
                <img
                  src={card.coverArt}
                  alt="cover"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: card.facePosition || "center top" }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-5xl"
                  style={{ background: `linear-gradient(135deg, ${card.bgFrom}, ${card.bgTo})` }}
                >
                  {card.icon}
                </div>
              )}
              {/* Centre vinyl hole */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-white/90 border-2 border-white shadow-sm" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Title + artist */}
        <h3
          className="font-display text-xl sm:text-2xl text-center mb-0.5"
          style={{ color: card.coverArt ? "rgba(255,255,255,0.95)" : "#6B5150" }}
        >
          {card.title}
        </h3>
        <p
          className="font-hand text-sm text-center mb-5"
          style={{ color: card.coverArt ? "rgba(255,255,255,0.65)" : "rgba(107,81,80,0.6)" }}
        >
          {card.artistLabel}
        </p>

        {/* Waveform */}
        <div className="mb-4">
          <WaveformBars playing={playing} color={card.coverArt ? "rgba(255,255,255,0.8)" : card.glowColor} />
        </div>

        {/* Seek bar */}
        <div
          className="relative w-full h-2 rounded-full cursor-pointer mb-2 overflow-hidden"
          style={{ background: card.coverArt ? "rgba(255,255,255,0.2)" : `${card.glowColor}30` }}
          onClick={seek}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: card.coverArt ? "rgba(255,255,255,0.9)" : card.glowColor }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>

        <div
          className="flex justify-between text-xs font-body mb-6"
          style={{ color: card.coverArt ? "rgba(255,255,255,0.5)" : "rgba(107,81,80,0.5)" }}
        >
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Error state */}
        {hasError && (
          <p className="text-center font-body text-sm text-white/70 mb-4 rounded-xl p-3 bg-black/30 border border-white/20">
            Place your audio file at{" "}
            <code className="font-mono text-xs bg-black/30 px-1 rounded">{`public${card.src}`}</code>
          </p>
        )}

        {/* Play / Pause */}
        <div className="flex justify-center">
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="w-16 h-16 rounded-full text-2xl flex items-center justify-center shadow-xl border-2 border-white/30"
            style={{
              background: card.coverArt
                ? "rgba(255,255,255,0.2)"
                : card.glowColor,
              color: "white",
              backdropFilter: "blur(10px)",
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "⏸" : "▶"}
          </motion.button>
        </div>
      </div>

      <audio ref={audioRef} src={card.src} preload="metadata" />
    </div>
  );
}

// ── Animated SVG Sunflower ────────────────────────────────────────────────────
const PETAL_COUNT = 16;
const POLLEN = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 30 + Math.sin(i * 1.9) * 55,
  y: 30 + Math.cos(i * 2.3) * 55,
  r: 2 + (i % 3),
  delay: i * 0.18,
  dur: 2.5 + (i % 4) * 0.4,
}));

function AnimatedSunflower({ playing, size = 220 }) {
  const cx = size / 2, cy = size / 2;
  const outerR = size * 0.34, innerR = size * 0.24;
  const discR  = size * 0.175, innerDiscR = size * 0.115;
  const petalW = size * 0.085, outerPetalH = size * 0.21, innerPetalH = size * 0.155;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} overflow="visible">
      <defs>
        {/* outer petal */}
        <radialGradient id="sfOuter" cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#FFE44D" />
          <stop offset="60%"  stopColor="#FFBF00" />
          <stop offset="100%" stopColor="#E08800" />
        </radialGradient>
        {/* inner petal */}
        <radialGradient id="sfInner" cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#FFD700" />
          <stop offset="100%" stopColor="#CC8800" />
        </radialGradient>
        {/* disc centre */}
        <radialGradient id="sfDisc" cx="40%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#7B4A0A" />
          <stop offset="45%"  stopColor="#5C2F00" />
          <stop offset="100%" stopColor="#3A1800" />
        </radialGradient>
        <radialGradient id="sfDiscInner" cx="40%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#A0622A" />
          <stop offset="100%" stopColor="#5C2F00" />
        </radialGradient>
        {/* glow filter */}
        <filter id="sfGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sfPetalGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* seed dot pattern */}
        <pattern id="seeds" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="#7B4A0A" opacity="0.7" />
        </pattern>
      </defs>

      {/* ── Outer glow halo ── */}
      <motion.circle
        cx={cx} cy={cy}
        r={outerR + 14}
        fill="rgba(255,215,0,0.12)"
        animate={{ r: [outerR + 12, outerR + 22, outerR + 12], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Outer petals (16) ── */}
      {Array.from({ length: PETAL_COUNT }, (_, i) => {
        const angle = (i / PETAL_COUNT) * 360;
        return (
          <g key={`op-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
            <motion.ellipse
              cx={cx}
              cy={cy - outerR}
              rx={petalW}
              ry={outerPetalH}
              fill="url(#sfOuter)"
              filter="url(#sfPetalGlow)"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              animate={{
                scaleX: [1, playing ? 1.12 : 1.04, 1],
                scaleY: [1, playing ? 1.08 : 1.03, 1],
                rotate: [0, (i % 2 === 0 ? 2 : -2), 0],
              }}
              transition={{
                duration: 1.8 + (i % 5) * 0.22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * 0.11) % 1.2,
              }}
            />
          </g>
        );
      })}

      {/* ── Inner petals (8, offset 11.25°) ── */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * 360 + 11.25;
        return (
          <g key={`ip-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
            <motion.ellipse
              cx={cx}
              cy={cy - innerR}
              rx={petalW * 0.7}
              ry={innerPetalH}
              fill="url(#sfInner)"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              animate={{
                scaleY: [1, playing ? 1.1 : 1.04, 1],
                scaleX: [1, playing ? 1.07 : 1.02, 1],
              }}
              transition={{
                duration: 2.1 + (i % 3) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * 0.18) % 1.5,
              }}
            />
          </g>
        );
      })}

      {/* ── Disc (brown center) ── */}
      <motion.circle
        cx={cx} cy={cy} r={discR}
        fill="url(#sfDisc)"
        filter="url(#sfGlow)"
        animate={{ scale: playing ? [1, 1.04, 1] : [1, 1.015, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* seed pattern overlay */}
      <circle cx={cx} cy={cy} r={discR} fill="url(#seeds)" opacity="0.55" />
      {/* inner shiny disc */}
      <circle cx={cx} cy={cy} r={innerDiscR} fill="url(#sfDiscInner)" />
      <circle cx={cx} cy={cy} r={innerDiscR} fill="url(#seeds)" opacity="0.4" />
      {/* specular highlight */}
      <ellipse cx={cx - discR * 0.22} cy={cy - discR * 0.28} rx={discR * 0.22} ry={discR * 0.14}
        fill="rgba(255,220,100,0.18)" />

      {/* ── Floating pollen dots ── */}
      {POLLEN.map((p) => (
        <motion.circle
          key={p.id}
          cx={cx + p.x - size / 2}
          cy={cy + p.y - size / 2}
          r={p.r}
          fill="#FFE566"
          opacity={0.7}
          animate={{
            y: [0, -12 - p.r * 2, 0],
            x: [0, (p.id % 2 === 0 ? 5 : -5), 0],
            opacity: [0.7, 1, 0.5, 0.7],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </svg>
  );
}

// ── Mini sunflower for card tile ──────────────────────────────────────────────
function MiniSunflower() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" overflow="visible">
      <defs>
        <radialGradient id="msfOuter" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFE44D" />
          <stop offset="100%" stopColor="#E08800" />
        </radialGradient>
        <radialGradient id="msfDisc" cx="40%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#7B4A0A" />
          <stop offset="100%" stopColor="#3A1800" />
        </radialGradient>
      </defs>
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * 360;
        return (
          <g key={i} transform={`rotate(${angle}, 36, 36)`}>
            <motion.ellipse cx={36} cy={16} rx={4.5} ry={10}
              fill="url(#msfOuter)"
              style={{ transformOrigin: "36px 36px" }}
              animate={{ scaleY: [1, 1.12, 1], scaleX: [1, 1.06, 1] }}
              transition={{ duration: 2 + (i % 4) * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          </g>
        );
      })}
      <circle cx={36} cy={36} r={13} fill="url(#msfDisc)" />
      <motion.circle cx={36} cy={36} r={13}
        fill="none" stroke="#FFE044" strokeWidth={2} opacity={0.5}
        animate={{ r: [13, 17, 13], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
}

// ── Sunflower full modal ───────────────────────────────────────────────────────
function SunflowerModal({ card }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play().catch(() => setHasError(true));
    setPlaying((p) => !p);
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd  = () => setPlaying(false);
    const onErr  = () => { setHasError(true); setPlaying(false); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
      a.pause();
    };
  }, []);

  const progress = duration ? current / duration : 0;

  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fffde0 0%, #fff3a0 40%, #ffe066 100%)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* warm sun-ray background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-conic-gradient(from 0deg at 50% 100%, rgba(255,220,0,0.08) 0deg 10deg, transparent 10deg 20deg)",
        }}
      />
      {/* top shimmer strip */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{ background: "linear-gradient(90deg, #F4A900, #FFE044, #F4A900)" }}
      />

      <div className="relative p-6 sm:p-8">
        {/* badge */}
        <span className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full text-white mb-4"
          style={{ background: "#F4A900" }}>
          SUNFLOWER 🌻
        </span>

        {/* big animated sunflower — CENTREPIECE */}
        <div className="flex justify-center mb-4">
          <motion.div
            animate={playing ? { rotate: [0, 3, -3, 0] } : { rotate: 0 }}
            transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
          >
            <AnimatedSunflower playing={playing} size={200} />
          </motion.div>
        </div>

        {/* title */}
        <h3 className="font-display text-2xl text-center mb-0.5" style={{ color: "#7A4A00" }}>
          My Sunflower 🌻
        </h3>
        <p className="font-hand text-sm text-center mb-5" style={{ color: "rgba(122,74,0,0.6)" }}>
          {card.artistLabel}
        </p>

        {/* ── Audio player ── */}
        {/* waveform */}
        <div className="mb-4">
          <WaveformBars playing={playing} color="#F4A900" />
        </div>

        {/* seek bar */}
        <div
          className="relative w-full h-2 rounded-full cursor-pointer mb-2 overflow-hidden"
          style={{ background: "rgba(244,169,0,0.2)" }}
          onClick={seek}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #F4A900, #FFD700)" }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <div className="flex justify-between text-xs font-body mb-5" style={{ color: "rgba(122,74,0,0.5)" }}>
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* error */}
        {hasError && (
          <p className="text-center font-body text-sm mb-4 rounded-xl p-3 border"
            style={{ color: "#7A4A00", background: "rgba(244,169,0,0.1)", borderColor: "rgba(244,169,0,0.3)" }}>
            Drop the song at <code className="font-mono text-xs bg-yellow-100 px-1 rounded">/audio/sunflower-song.mp3</code>
          </p>
        )}

        {/* play / pause */}
        <div className="flex justify-center">
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full text-2xl flex items-center justify-center shadow-xl border-2"
            style={{
              background: "linear-gradient(135deg, #F4A900, #FFD700)",
              borderColor: "rgba(255,255,255,0.6)",
              color: "#fff",
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            <motion.span
              animate={playing ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.8, repeat: playing ? Infinity : 0 }}
            >
              {playing ? "⏸" : "▶"}
            </motion.span>
          </motion.button>
        </div>
      </div>

      <audio ref={audioRef} src={card.src} preload="metadata" />
    </div>
  );
}

// ── Spotify embed player modal ────────────────────────────────────────────────
function SpotifyModal({ card }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
      style={{ background: `linear-gradient(145deg, #e8f5e9, #f0fff4)` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(29,185,84,0.2)" }}
      />

      <span className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full text-white mb-4 bg-[#1DB954]">
        SPOTIFY
      </span>
      <h3 className="font-display text-2xl sm:text-3xl text-ink mb-1">{card.title}</h3>
      <p className="font-hand text-base text-ink/60 mb-5">{card.subtitle}</p>

      <div className="rounded-2xl overflow-hidden shadow-soft">
        <iframe
          title={card.title}
          src={`https://open.spotify.com/embed/track/${card.spotifyTrackId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ border: "none" }}
        />
      </div>

      <p className="mt-4 font-hand text-sm text-center text-ink/50">
        this song lives in my head because of you 🎵
      </p>
    </div>
  );
}

// ── Sweet letter / poem modal ─────────────────────────────────────────────────
function LetterModal({ card }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #fffde7, #fff8e1)",
        boxShadow: `0 0 40px ${card.glowRgba}`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* wax seal top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{ background: card.glowColor }}
      />

      <div className="p-7 sm:p-10">
        {/* wax seal decoration */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white shadow-lg"
            style={{ background: `radial-gradient(circle, ${card.glowColor}, ${card.glowColor}cc)` }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            💌
          </motion.div>
        </div>

        <h3 className="font-display text-xl sm:text-2xl text-center mb-1" style={{ color: card.glowColor }}>
          {card.title}
        </h3>
        <p className="font-hand text-sm text-center text-ink/50 mb-7">{card.subtitle}</p>

        {/* lined letter paper effect */}
        <div
          className="relative rounded-2xl px-6 py-7 sm:px-8 sm:py-8"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(217,168,87,0.15) 32px)",
            minHeight: "200px",
          }}
        >
          {card.poem.map((line, i) =>
            line === "" ? (
              <div key={i} className="h-5" />
            ) : (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.5 }}
                className="font-hand text-lg sm:text-xl text-ink/80 leading-8"
              >
                {line}
              </motion.p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ── The unified modal overlay ─────────────────────────────────────────────────
function MemoryModal({ card, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(107,81,80,0.45)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md"
        initial={{ scale: 0.78, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 16 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow-soft border border-white/60 flex items-center justify-center text-ink/70 hover:text-ink hover:bg-white transition-all text-sm"
        >
          ✕
        </button>

        {card.type === "sunflower" && <SunflowerModal card={card} onClose={onClose} />}

        {card.type === "spotify" && <SpotifyModal card={card} onClose={onClose} />}
        {card.type === "audio" && <AudioPlayerModal card={card} onClose={onClose} />}
        {card.type === "letter" && <LetterModal card={card} onClose={onClose} />}
      </motion.div>
    </motion.div>
  );
}

// ── Single Memory Card tile ───────────────────────────────────────────────────
function MemoryCardTile({ card, index, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(card)}
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label={card.title}
      className="group relative rounded-3xl text-left overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full"
      style={{
        background: `linear-gradient(145deg, ${card.bgFrom}, ${card.bgTo})`,
        border: `1px solid ${card.borderColor}`,
        boxShadow: `0 8px 32px ${card.glowRgba}, 0 2px 8px rgba(107,81,80,0.08)`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* hover glow intensifier */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 60% 30%, ${card.glowRgba}, transparent 70%)`,
        }}
      />

      {/* frosted glass shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none opacity-40"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative p-5 sm:p-6">
        {/* Badge top right */}
        <span
          className="absolute top-4 right-4 text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded-full text-white"
          style={{ background: card.glowColor }}
        >
          {card.badgeLabel}
        </span>

        {/* Icon */}
        {card.type === "sunflower" ? (
          <div className="mb-4">
            <MiniSunflower />
          </div>
        ) : (
          <motion.div
            className="text-5xl mb-4"
            animate={{ y: [0, -4, 0], rotate: [0, -3, 3, 0] }}
            transition={{ duration: 3.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {card.icon}
          </motion.div>
        )}

        {/* Title */}
        <h4 className="font-display text-lg sm:text-xl text-ink leading-tight mb-1">
          {card.title}
        </h4>
        <p className="font-hand text-sm text-ink/55 leading-snug mb-4">
          {card.subtitle}
        </p>

        {/* Tap hint pill */}
        <motion.div
          className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-white px-3 py-1.5 rounded-full"
          style={{ background: card.glowColor }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {card.hint}
        </motion.div>
      </div>
    </motion.button>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function StickerWall() {
  const [openCard, setOpenCard] = useState(null);

  const handleClose = useCallback(() => setOpenCard(null), []);

  return (
    <>
      <div className="relative">
        {/* Section header */}
        <div className="mb-5 text-center">
          <motion.h3
            className="font-display text-xl sm:text-2xl text-blush-deep mb-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Memory Board 💌
          </motion.h3>
          <motion.p
            className="font-hand text-sm text-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            little things I saved just for you ✨
          </motion.p>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memoryCards.map((card, i) => (
            <MemoryCardTile
              key={card.id}
              card={card}
              index={i}
              onOpen={setOpenCard}
            />
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {openCard && (
          <MemoryModal key={openCard.id} card={openCard} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}
