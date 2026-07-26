import BirthdayCake from "../components/birthday-room/BirthdayCake";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  selvaSoloPhotos,
  togetherPhotos,
  wallBannerLines,
  wishMessage,
  wishLockedMsg,
  endingText,
  finalEnvelopeLabel,
  finalLetterPlaceholder,
  finalLetterSignature,
} from "../data/birthdayRoom";

// ─── Fairy lights row ────────────────────────────────────────
function FairyLights({ count = 16 }) {
  return (
    <div className="flex justify-between px-1 w-full">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="text-base sm:text-lg"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.4 + (i % 3) * 0.3, repeat: Infinity, delay: i * 0.1 }}
        >
          💡
        </motion.span>
      ))}
    </div>
  );
}

// ─── Ambient balloons + confetti ─────────────────────────────
function AmbientParty() {
  const balloonColors = ["#E17497","#F4B8CE","#CBB6EA","#F2A65A","#E8628C","#D9A857"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 12 }, (_, i) => (
        <motion.span
          key={`b${i}`}
          className="absolute text-3xl"
          style={{ left: `${(i * 9 + 2) % 100}%`, bottom: "-10%" }}
          animate={{ y: "-120vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 14 + (i % 5), delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          🎈
        </motion.span>
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <motion.span
          key={`c${i}`}
          className="absolute text-sm"
          style={{ left: `${(i * 7 + 3) % 100}%`, top: "-5%" }}
          animate={{ y: "110vh", opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 8 + (i % 4), delay: i * 0.7, repeat: Infinity, ease: "linear" }}
        >
          {["🎊","✨","🎉","🌸"][i % 4]}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Clouds intro ─────────────────────────────────────────────
function CloudsIntro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);
  const clouds = Array.from({ length: 8 }, (_, i) => i);
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white overflow-hidden pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
    >
      {clouds.map((i) => (
        <motion.span key={`cl${i}`} className="absolute text-7xl opacity-90"
          style={{ top: `${(i*13+4)%90}%`, left: `${(i*12+5)%85}%` }}
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: i % 2 === 0 ? "-70vw" : "70vw", opacity: [1,1,0] }}
          transition={{ duration: 2.4, delay: 0.5 + i*0.1, ease: "easeInOut" }}
        >☁️</motion.span>
      ))}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: [0,1,1,0] }}
        transition={{ duration: 2.8, times: [0, 0.3, 0.7, 1] }}
        className="relative z-10 font-hand text-3xl text-blush-deep text-center px-8"
      >
        the swing lands somewhere magical... ✨
      </motion.p>
    </motion.div>
  );
}

// ─── Centre solo photo carousel ──────────────────────────────
function SelvaSpotlight() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIdx(i => (i+1) % selvaSoloPhotos.length); }, 3500);
    return () => clearInterval(t);
  }, []);
  const go = (d) => { setDir(d); setIdx(i => (i + d + selvaSoloPhotos.length) % selvaSoloPhotos.length); };
  const photo = selvaSoloPhotos[idx];
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={photo.src}
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -80 : 80 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-3 pb-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-sm"
            style={{ rotate: "-1.5deg" }}
          >
            <div className="w-52 h-64 sm:w-64 sm:h-80 overflow-hidden rounded-[2px]">
              <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
            </div>
            <p className="font-hand text-center text-ink/70 text-base mt-2 px-2">{photo.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button onClick={() => go(-1)} className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/35 transition-colors">←</button>
        <div className="flex gap-1.5">
          {selvaSoloPhotos.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-blush-deep w-5" : "bg-white/40"}`} />
          ))}
        </div>
        <button onClick={() => go(1)} className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-white/35 transition-colors">→</button>
      </div>
    </div>
  );
}

// ─── Birthday cake ───────────────────────────────────────────
function Cake() {
  const [stage, setStage] = useState("idle");
  return (
    <div className="flex flex-col items-center mt-6">
      <motion.button
        onClick={() => stage === "idle" && setStage("wishing")}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        className="focus:outline-none"
      >
        <svg viewBox="0 0 120 100" className="w-28 sm:w-36 h-auto">
          {[28,46,64,82].map((x,i) => (
            <g key={i}>
              <rect x={x-2} y="4" width="4" height="16" fill="#F4B8CE"/>
              {stage !== "blown" && (
                <motion.circle cx={x} cy="2" r="3" fill="#F2A65A"
                  animate={{ opacity:[0.6,1,0.6], scale:[0.9,1.1,0.9] }}
                  transition={{ duration:1+i*0.1, repeat:Infinity }} />
              )}
            </g>
          ))}
          <rect x="22" y="20" width="76" height="22" rx="4" fill="#FBE1EB" stroke="#E17497" strokeWidth="1.5"/>
          <rect x="8" y="42" width="104" height="36" rx="5" fill="#FFF8F0" stroke="#D9A857" strokeWidth="1.5"/>
          {[20,40,60,80,100].map((x,i)=><circle key={i} cx={x} cy="42" r="3" fill="#E8628C" opacity="0.8"/>)}
          <rect x="4" y="78" width="112" height="8" rx="3" fill="#D9A857"/>
          <text x="38" y="62" fontSize="12" fill="#E17497">Happy Birthday!</text>
        </svg>
      </motion.button>
      <AnimatePresence mode="wait">
        {stage === "wishing" && (
          <motion.div key="w" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="mt-3 text-center">
            <p className="font-hand text-xl text-white">{wishMessage}</p>
            <button onClick={() => setStage("blown")}
              className="mt-3 font-body text-sm px-5 py-2 rounded-full bg-gradient-to-r from-blush-deep to-lavender-deep text-white hover:opacity-90">
              🕯️ Blow the Candles
            </button>
          </motion.div>
        )}
        {stage === "blown" && (
          <motion.p key="bl" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            className="mt-3 font-hand text-xl text-white text-center">
            {wishLockedMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Together photo Polaroid wall ────────────────────────────
function TogetherWall({ onClickPhoto }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5 px-2">
      {togetherPhotos.map((photo, i) => {
        const rotate = ((i % 2 === 0 ? 1 : -1) * (2 + (i % 3) * 2.5));
        return (
          <motion.button
            key={i}
            onClick={() => onClickPhoto(i)}
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-40px" }}
            transition={{ duration:0.6, delay: i * 0.08 }}
            animate={{ y:[0, -6, 0] }}
            style={{ animationDelay:`${i*0.3}s` }}
            whileHover={{ scale:1.08, rotate: rotate > 0 ? rotate+2 : rotate-2, zIndex:10 }}
            className="focus:outline-none relative"
          >
            <div
              className="bg-white p-2 pb-7 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              style={{ transform:`rotate(${rotate}deg)` }}
            >
              <div className="w-28 h-32 sm:w-36 sm:h-44 overflow-hidden">
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
              </div>
              <p className="font-hand text-[11px] text-ink/60 text-center mt-1 px-1 truncate">{photo.caption}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Full-screen photo viewer ─────────────────────────────────
function PhotoViewer({ index, onClose, onNav }) {
  const photo = togetherPhotos[index];
  useEffect(() => {
    const fn = (e) => { if(e.key==="Escape") onClose(); if(e.key==="ArrowRight") onNav(1); if(e.key==="ArrowLeft") onNav(-1); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onNav]);
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors">✕</button>
      <button onClick={(e)=>{e.stopPropagation();onNav(-1);}} className="absolute left-3 sm:left-8 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors">←</button>
      <button onClick={(e)=>{e.stopPropagation();onNav(1);}} className="absolute right-3 sm:right-8 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors">→</button>
      <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.85, opacity:0 }}
        onClick={(e)=>e.stopPropagation()} className="bg-white p-3 pb-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-w-sm w-full">
        <div className="w-full aspect-[3/4] overflow-hidden">
          <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
        </div>
        <p className="font-hand text-center text-ink/70 text-lg mt-3">{photo.caption}</p>
        <p className="font-body text-center text-xs text-ink/40 mt-1">{index+1} / {togetherPhotos.length}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Final letter ─────────────────────────────────────────────
function FinalLetter() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button onClick={() => setOpen(true)}
        animate={{ y:[0,-6,0] }} transition={{ duration:3, repeat:Infinity }}
        whileHover={{ scale:1.06 }} className="flex flex-col items-center mt-10 focus:outline-none">
        <span className="text-5xl drop-shadow-[0_0_20px_rgba(242,166,90,0.7)]">💌</span>
        <p className="font-hand text-lg text-white/80 mt-2">{finalEnvelopeLabel}</p>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setOpen(false)}>
            <motion.div initial={{ scale:0.7, opacity:0, y:30 }} animate={{ scale:1, opacity:1, y:0 }}
              exit={{ scale:0.75, opacity:0 }} transition={{ type:"spring", stiffness:130, damping:16 }}
              onClick={(e)=>e.stopPropagation()}
              className="bg-[#FFFCF6] rounded-2xl px-7 py-9 sm:px-10 max-w-md w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] max-h-[85vh] overflow-y-auto">
              <p className="font-display text-xl text-blush-deep mb-4">{finalEnvelopeLabel}</p>
              <p className="font-hand text-lg text-ink/70 leading-relaxed whitespace-pre-line mb-6">{finalLetterPlaceholder}</p>
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-blush-light to-lavender-light flex items-center justify-center mb-4">
                <span className="text-3xl opacity-40">📷</span>
              </div>
              <p className="font-hand text-xl text-blush-deep whitespace-pre-line">{finalLetterSignature}</p>
              <button onClick={() => setOpen(false)}
                className="mt-7 font-body text-sm px-5 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors">
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── PAGE 5 ───────────────────────────────────────────────────
export default function BirthdaySurpriseRoom() {
  const [introDone, setIntroDone] = useState(false);
  const [viewerIdx, setViewerIdx] = useState(null);

  const navViewer = (d) => setViewerIdx(i => (i + d + togetherPhotos.length) % togetherPhotos.length);

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(242,166,90,0.4) 0%, rgba(61,33,64,0.95) 50%, rgba(26,16,37,1) 100%)" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1 }}
    >
      <AnimatePresence>
        {!introDone && <CloudsIntro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <div className="film-grain" />
      <AmbientParty />

      <motion.div
        initial={{ opacity:0 }} animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration:1 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16"
      >
        {/* ── fairy lights top ── */}
        <FairyLights count={18} />

        {/* ── wall banner ── */}
        <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3, duration:1 }} className="text-center mt-4 mb-8">
          {wallBannerLines.map((line, i) => (
            <h1 key={i} className="font-display text-3xl sm:text-5xl text-white leading-tight
              drop-shadow-[0_0_20px_rgba(242,166,90,0.7)]">
              {line}
            </h1>
          ))}
          <p className="font-hand text-lg text-white/60 mt-2">
            Welcome to your little birthday world... ❤️
          </p>
        </motion.div>

        {/* ── fairy lights below banner ── */}
        <FairyLights count={14} />

        {/* ── centre spotlight: her photos + cake ── */}
        <div className="flex flex-col items-center my-10 sm:my-14">
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
            className="font-hand text-xl text-white/70 mb-6">
            ✨ The Birthday Girl ✨
          </motion.p>
          <SelvaSpotlight />
          <BirthdayCake />
        </div>

        {/* ── together photos wall ── */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:0.8 }} className="mb-4">
          <p className="font-hand text-xl sm:text-2xl text-white/70 text-center mb-6">
            📸 Us, always... ❤️
          </p>
          <FairyLights count={12} />
          <div className="mt-6">
            <TogetherWall onClickPhoto={setViewerIdx} />
          </div>
          <div className="mt-4"><FairyLights count={12} /></div>
        </motion.div>

        {/* ── final letter ── */}
        <div className="flex justify-center">
          <FinalLetter />
        </div>

        {/* ── ending line ── */}
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:1 }}
          className="font-hand text-base sm:text-lg text-white/40 text-center mt-14 whitespace-pre-line pb-8">
          {endingText}
        </motion.p>
      </motion.div>

      {/* ── photo viewer ── */}
      <AnimatePresence>
        {viewerIdx !== null && (
          <PhotoViewer index={viewerIdx} onClose={() => setViewerIdx(null)} onNav={navViewer} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
