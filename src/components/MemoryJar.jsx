import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes, birthdayJarNote } from "../data/messages";
import { isBirthday, pickForToday } from "../hooks/dateUtils";

// ── Heart ripple canvas ───────────────────────────────────────
function HeartRipples() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // auto-spawn ripples at random spots
    const spawn = () => {
      ripples.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0,
        maxR: 60 + Math.random() * 80,
        alpha: 0.6,
        color: ["#E17497","#F4B8CE","#CBB6EA","#D9A857"][Math.floor(Math.random()*4)],
      });
    };
    const spawnTimer = setInterval(spawn, 900);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.current = ripples.current.filter(r => r.alpha > 0.01);
      ripples.current.forEach(r => {
        // draw heart shape scaled by r
        ctx.save();
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const s = r.r / 30;
        ctx.translate(r.x, r.y);
        ctx.scale(s, s);
        // heart path (unit ~30px)
        ctx.moveTo(0, -8);
        ctx.bezierCurveTo(0, -14, -10, -14, -10, -6);
        ctx.bezierCurveTo(-10, 2, 0, 10, 0, 16);
        ctx.bezierCurveTo(0, 10, 10, 2, 10, -6);
        ctx.bezierCurveTo(10, -14, 0, -14, 0, -8);
        ctx.stroke();
        ctx.restore();
        r.r   += 1.2;
        r.alpha -= 0.008;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(spawnTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // also spawn on click/touch
  const addRipple = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    for (let i = 0; i < 3; i++) {
      ripples.current.push({
        x: x + (Math.random()-0.5)*30,
        y: y + (Math.random()-0.5)*30,
        r: 0,
        maxR: 80 + Math.random() * 60,
        alpha: 0.75,
        color: ["#E17497","#F4B8CE","#CBB6EA","#D9A857"][Math.floor(Math.random()*4)],
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={addRipple}
      onTouchMove={addRipple}
      onClick={addRipple}
      className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ── Glass jar SVG ─────────────────────────────────────────────
function JarSVG({ notesInside }) {
  return (
    <svg viewBox="0 0 200 250" className="w-36 sm:w-44 h-auto drop-shadow-[0_16px_40px_rgba(225,116,151,0.5)]">
      <defs>
        <linearGradient id="jarGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)"/>
          <stop offset="100%" stopColor="rgba(237,228,248,0.2)"/>
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="62" y="16" width="76" height="20" rx="6" fill="#D9A857" opacity="0.95"/>
      <rect x="58" y="8" width="84" height="14" rx="7" fill="#E8C07E"/>
      <rect x="66" y="10" width="20" height="4" rx="2" fill="white" opacity="0.5"/>
      {/* jar body glass */}
      <path d="M48 38 L152 38 L142 228 Q142 244 126 244 L74 244 Q58 244 58 228 Z"
        fill="url(#jarGlass)" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
      {/* shine */}
      <path d="M66 50 L72 220" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.4"/>
      <path d="M130 55 L134 180" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.2"/>
      {/* heart glow inside */}
      <text x="100" y="155" fontSize="30" textAnchor="middle" opacity="0.6">❤️</text>
      {/* notes */}
      {notesInside.map((_, i) => (
        <g key={i} transform={`translate(${68+(i%4)*18},${200-Math.floor(i/4)*18}) rotate(${(i%5)*10-20})`}>
          <rect width="18" height="13" rx="2"
            fill={i%3===0?"rgba(251,225,235,0.9)":i%3===1?"rgba(237,228,248,0.9)":"rgba(255,248,240,0.9)"}
            stroke="#D9A857" strokeWidth="0.5"/>
          <line x1="3" y1="4" x2="15" y2="4" stroke="#CBB6EA" strokeWidth="1" opacity="0.5"/>
        </g>
      ))}
    </svg>
  );
}

// ── Note popup ────────────────────────────────────────────────
function NotePopup({ text, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{ background:"rgba(107,81,80,0.35)", backdropFilter:"blur(10px)" }}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale:0.3, rotate:-12, opacity:0 }}
        animate={{ scale:1, rotate:0, opacity:1 }}
        exit={{ scale:0.4, opacity:0 }}
        transition={{ type:"spring", stiffness:160, damping:14 }}
        onClick={e=>e.stopPropagation()}
        className="relative max-w-sm w-full"
      >
        <div className="relative bg-[#FFFCF6] rounded-2xl px-7 py-10 text-center"
          style={{
            boxShadow:"0 20px 60px rgba(107,81,80,0.35), 0 2px 8px rgba(107,81,80,0.1)",
            backgroundImage:"repeating-linear-gradient(transparent,transparent 27px,rgba(203,182,234,0.2) 27px,rgba(203,182,234,0.2) 28px)",
          }}
        >
          {/* fold corner */}
          <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-0 h-0"
              style={{borderLeft:"40px solid transparent",borderTop:"40px solid #CBB6EA",opacity:0.5}}/>
          </div>
          {/* washi tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-blush/50 rotate-[-2deg] rounded-sm"/>

          <motion.span animate={{rotate:[0,10,-10,0]}} transition={{duration:3,repeat:Infinity}}
            className="text-3xl block mb-4">💌</motion.span>
          <p className="font-hand text-xs text-ink/40 mb-2 tracking-widest uppercase">a little note for you</p>
          <p className="font-display text-xl sm:text-2xl text-blush-deep leading-relaxed">{text}</p>

          {["❤","🌸","✨"].map((h,i)=>(
            <motion.span key={i} className="absolute text-base text-blush/60"
              style={{top:`${20+i*22}%`,left:i%2===0?"6%":"90%"}}
              animate={{y:[0,-6,0],opacity:[0.4,0.8,0.4]}}
              transition={{duration:2.5+i,repeat:Infinity,delay:i*0.4}}>
              {h}
            </motion.span>
          ))}

          <button onClick={onClose}
            className="mt-8 font-body text-sm px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
            style={{background:"linear-gradient(135deg,#E17497 0%,#A98DD1 100%)"}}>
            keep it close 💌
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Floating petals ───────────────────────────────────────────
function Petals() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {Array.from({length:10},(_,i)=>(
        <motion.span key={i} className="absolute text-xl select-none"
          style={{left:`${(i*13+5)%95}%`,top:"-5%"}}
          initial={{y:-20,opacity:0,rotate:0}}
          animate={{y:"110%",opacity:[0,0.9,0.9,0],rotate:360,x:[0,15,-10,0]}}
          transition={{duration:12+(i%4)*2,delay:i*1.5,repeat:Infinity,ease:"easeInOut"}}>
          {["🌸","🌺","✨","🌼","💮"][i%5]}
        </motion.span>
      ))}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function MemoryJar() {
  const [open, setOpen] = useState(false);
  const today    = new Date();
  const birthday = isBirthday(today);
  const note     = birthday ? birthdayJarNote : pickForToday(jarNotes, today);

  return (
    <div className="relative z-10 w-full mt-10 sm:mt-16">

      {/* ── FULL-WIDTH full-height photo section ── */}
      <div className="relative w-full overflow-hidden" style={{minHeight:"100svh"}}>

        {/* HER PHOTO — full screen, bright and clear */}
        <img
          src="/photos/selva-jar-bg.jpg"
          alt="Selva"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition:"center top",
            filter:"brightness(0.88) saturate(1.15)",
          }}
        />

        {/* very subtle warm vignette at very edges only — not blocking her */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background:"radial-gradient(ellipse at center, transparent 55%, rgba(107,81,80,0.35) 100%)",
          }}
        />

        {/* top fade into page */}
        <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{background:"linear-gradient(to bottom,#FFF8F0,transparent)"}}/>
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{background:"linear-gradient(to top,#FFF8F0,transparent)"}}/>

        {/* heart ripples canvas */}
        <HeartRipples />

        {/* floating petals */}
        <Petals />

        {/* ── overlay content: jar + text — fully visible above photo ── */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full py-16 px-6"
          style={{minHeight:"100svh"}}>

          {/* title with legible glass pill */}
          <motion.div
            initial={{opacity:0,y:-14}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
            className="text-center mb-8"
          >
            <div className="inline-block px-6 py-3 rounded-2xl mb-2"
              style={{background:"rgba(255,255,255,0.25)",backdropFilter:"blur(12px)",
                border:"1px solid rgba(255,255,255,0.45)",
                boxShadow:"0 4px 20px rgba(225,116,151,0.2)"}}>
              <h2 className="font-display text-2xl sm:text-3xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                🌸 A Jar Full of Little Moments
              </h2>
            </div>
            <p className="font-hand text-base text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] mt-1">
              tap the jar — one memory floats out every day ✨
            </p>
          </motion.div>

          {/* jar button */}
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{scale:1.07}} whileTap={{scale:0.95}}
            animate={{y:[0,-12,0]}}
            transition={{y:{duration:4,repeat:Infinity,ease:"easeInOut"}}}
            className="relative focus:outline-none"
            aria-label="Open memory jar"
          >
            {/* glow behind jar */}
            <motion.div className="absolute inset-0 rounded-full -z-10"
              style={{background:"radial-gradient(circle,rgba(244,184,206,0.55) 0%,transparent 70%)"}}
              animate={{scale:[1,1.25,1],opacity:[0.5,0.85,0.5]}}
              transition={{duration:3,repeat:Infinity}}/>

            <JarSVG notesInside={jarNotes.slice(0,12)}/>

            {/* peeking note */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-5 rounded-sm border border-gold/70 shadow-sm"
              style={{background:"rgba(251,225,235,0.9)"}}
              animate={{y:[0,-5,0],rotate:[-5,5,-5]}}
              transition={{duration:3,repeat:Infinity}}/>
          </motion.button>

          {/* pulse hint */}
          <motion.p
            animate={{opacity:[0.5,1,0.5]}} transition={{duration:2.5,repeat:Infinity}}
            className="font-hand text-sm text-white mt-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            ✨ tap to open ✨
          </motion.p>

          {/* move mouse hint */}
          <p className="font-body text-xs text-white/60 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            move your mouse to make hearts bloom 💕
          </p>
        </div>
      </div>

      <AnimatePresence>
        {open && <NotePopup text={note} onClose={()=>setOpen(false)}/>}
      </AnimatePresence>
    </div>
  );
}
