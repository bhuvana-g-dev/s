import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Beautiful 3-tier decorated birthday cake ── */
function CakeSVG({ lit }) {
  const candleColors = ["#E17497","#CBB6EA","#F2A65A","#A98DD1","#E8628C"];
  const candleX = [76, 90, 104, 118, 132];

  return (
    <svg viewBox="0 0 210 230" className="w-52 sm:w-64 h-auto" style={{ filter:"drop-shadow(0 16px 32px rgba(225,116,151,0.45))" }}>
      <defs>
        <linearGradient id="t1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0F5"/><stop offset="100%" stopColor="#F4B8CE"/>
        </linearGradient>
        <linearGradient id="t2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0EAFF"/><stop offset="100%" stopColor="#CBB6EA"/>
        </linearGradient>
        <linearGradient id="t3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF0"/><stop offset="100%" stopColor="#FBE1EB"/>
        </linearGradient>
        <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2EBD9"/><stop offset="100%" stopColor="#E0D0B8"/>
        </linearGradient>
        <radialGradient id="flameGlow" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#FFF5C0" stopOpacity="1"/>
          <stop offset="100%" stopColor="#F2A65A" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* ── Plate ── */}
      <ellipse cx="105" cy="205" rx="80" ry="10" fill="url(#plate)" stroke="#D9A857" strokeWidth="1.5"/>
      <ellipse cx="105" cy="203" rx="80" ry="5" fill="#F2EBD9" opacity="0.7"/>

      {/* ── Bottom tier ── */}
      <rect x="15" y="158" width="180" height="44" rx="7" fill="url(#t3)" stroke="#E17497" strokeWidth="1.5"/>
      {/* cream border top */}
      <rect x="15" y="155" width="180" height="10" rx="5" fill="white" opacity="0.75"/>
      {/* decorative scallop edge */}
      {[28,46,64,82,100,118,136,154,172,190].map((x,i)=>(
        <circle key={i} cx={x} cy="157" r="4" fill={i%2===0?"#E17497":"#CBB6EA"}/>
      ))}
      {/* roses on bottom tier */}
      {[45, 105, 165].map((x,i)=>(
        <text key={i} x={x} y="185" fontSize="16" textAnchor="middle">🌹</text>
      ))}
      {/* bottom base stripe */}
      <rect x="15" y="196" width="180" height="7" rx="3.5" fill="#E17497" opacity="0.55"/>

      {/* ── Middle tier ── */}
      <rect x="38" y="108" width="134" height="50" rx="7" fill="url(#t2)" stroke="#A98DD1" strokeWidth="1.5"/>
      <rect x="38" y="105" width="134" height="10" rx="5" fill="white" opacity="0.75"/>
      {[50,70,90,110,130,150,162].map((x,i)=>(
        <circle key={i} cx={x} cy="107" r="3.5" fill={i%2===0?"#A98DD1":"#F4B8CE"}/>
      ))}
      {/* "Happy Birthday Selva" text */}
      <text x="105" y="130" fontSize="9.5" textAnchor="middle" fill="#7B5EA7"
        fontFamily="Georgia,serif" fontStyle="italic" fontWeight="600">
        Happy Birthday
      </text>
      <text x="105" y="144" fontSize="8.5" textAnchor="middle" fill="#E17497"
        fontFamily="Georgia,serif" fontStyle="italic">
        Selva Meenakshi 🌻
      </text>
      <rect x="38" y="152" width="134" height="7" rx="3.5" fill="#A98DD1" opacity="0.55"/>

      {/* ── Top tier ── */}
      <rect x="64" y="62" width="82" height="48" rx="7" fill="url(#t1)" stroke="#E8628C" strokeWidth="1.5"/>
      <rect x="64" y="59" width="82" height="10" rx="5" fill="white" opacity="0.75"/>
      {[72,86,100,114,128,142].map((x,i)=>(
        <circle key={i} cx={x} cy="62" r="3" fill={i%2===0?"#E8628C":"#D9A857"}/>
      ))}
      {/* sunflower in center */}
      <text x="105" y="100" fontSize="24" textAnchor="middle">🌻</text>
      <rect x="64" y="104" width="82" height="7" rx="3.5" fill="#E8628C" opacity="0.55"/>

      {/* ── Candles ── */}
      {candleX.map((x,i)=>(
        <g key={i}>
          {/* candle body */}
          <rect x={x-4} y="30" width="8" height="30" rx="4" fill={candleColors[i]}/>
          {/* shine */}
          <rect x={x-1} y="33" width="2" height="18" rx="1" fill="white" opacity="0.45"/>
          {/* wax drip */}
          <ellipse cx={x} cy="61" rx="5" ry="4" fill={candleColors[i]}/>
          {/* flame or smoke */}
          {lit ? (
            <motion.g
              animate={{ scaleY:[1,1.18,0.9,1.12,1], scaleX:[1,0.88,1.06,0.92,1], y:[0,-1.5,1,-1,0] }}
              transition={{ duration:0.75+i*0.08, repeat:Infinity, ease:"easeInOut" }}
              style={{ transformOrigin:`${x}px 22px` }}
            >
              {/* glow */}
              <ellipse cx={x} cy="20" rx="9" ry="13" fill="url(#flameGlow)" opacity="0.6"/>
              {/* outer flame */}
              <ellipse cx={x} cy="19" rx="5.5" ry="9" fill="#F2A65A" opacity="0.92"/>
              {/* inner flame */}
              <ellipse cx={x} cy="21" rx="3" ry="5.5" fill="#FFF5C0" opacity="0.97"/>
              {/* tip */}
              <ellipse cx={x} cy="13" rx="1.5" ry="2.5" fill="white" opacity="0.8"/>
            </motion.g>
          ) : (
            <motion.g initial={{opacity:0}} animate={{opacity:[0,0.7,0]}}
              transition={{duration:2.5, delay:i*0.12}}>
              <circle cx={x}   cy="22" r="3" fill="#ccc" opacity="0.45"/>
              <circle cx={x+2} cy="15" r="2.5" fill="#ccc" opacity="0.35"/>
              <circle cx={x-1} cy="8"  r="2" fill="#ccc" opacity="0.25"/>
            </motion.g>
          )}
        </g>
      ))}

      {/* ── Star topper ── */}
      <text x="105" y="27" fontSize="18" textAnchor="middle">⭐</text>

      {/* ── Side decorations ── */}
      <text x="20" y="168" fontSize="11">✨</text>
      <text x="182" y="168" fontSize="11">✨</text>
      <text x="22" y="125" fontSize="11">🎀</text>
      <text x="176" y="125" fontSize="11">🎀</text>
      <text x="18"  y="148" fontSize="9">💕</text>
      <text x="182" y="148" fontSize="9">💕</text>
    </svg>
  );
}

/* ── Confetti + hearts burst ── */
function CelebrationBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({length:22},(_,i)=>i).map(i=>(
        <motion.span key={i} className="absolute text-lg"
          style={{left:`${(i*10+8)%100}%`, top:"15%"}}
          initial={{y:0, opacity:0, scale:0.4}}
          animate={{y:[0,-55,60], opacity:[0,1,0], rotate:360, scale:[0.4,1.1,0.6]}}
          transition={{duration:2, delay:(i%7)*0.07}}>
          {["🎊","✨","🎉","💕","🌸","🌻","❤️"][i%7]}
        </motion.span>
      ))}
      {Array.from({length:10},(_,i)=>i).map(i=>(
        <motion.span key={`h${i}`}
          className="absolute text-pink-400 text-lg"
          style={{left:`${12+i*8}%`, bottom:"35%"}}
          initial={{y:0, opacity:0}}
          animate={{y:-100, opacity:[0,1,0]}}
          transition={{duration:2, delay:0.2+i*0.12}}>
          ❤
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdayCake() {
  const [stage, setStage] = useState("idle"); // idle → wishing → blown
  const [burst, setBurst]   = useState(false);

  const handleTap = () => { if (stage === "idle") setStage("wishing"); };
  const handleBlow = () => {
    setStage("blown");
    setBurst(true);
    setTimeout(() => setBurst(false), 2200);
  };

  return (
    <div className="relative flex flex-col items-center mt-4">
      <motion.button
        onClick={handleTap}
        whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        className="relative focus:outline-none"
        aria-label="Tap the birthday cake"
      >
        {burst && <CelebrationBurst />}
        <CakeSVG lit={stage !== "blown"}/>
      </motion.button>

      <AnimatePresence mode="wait">
        {stage === "wishing" && (
          <motion.div key="w"
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
            className="mt-5 text-center">
            <p className="font-hand text-xl sm:text-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              Make a wish, Sunflower... 🌻
            </p>
            <motion.button
              onClick={handleBlow}
              whileHover={{scale:1.06}} whileTap={{scale:0.95}}
              className="mt-4 font-body font-semibold text-sm sm:text-base px-7 py-3 rounded-full text-white"
              style={{
                background:"linear-gradient(135deg,#E17497 0%,#A98DD1 100%)",
                boxShadow:"0 0 24px rgba(225,116,151,0.55)",
              }}>
              🕯️ Blow the Candles
            </motion.button>
          </motion.div>
        )}
        {stage === "blown" && (
          <motion.p key="bl"
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            className="mt-5 font-hand text-xl sm:text-2xl text-white text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Wish locked safely with me. ❤️
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
