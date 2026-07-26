import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Beautiful 3-tier decorated birthday cake SVG
function CakeSVG({ lit }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 sm:w-56 h-auto drop-shadow-[0_12px_30px_rgba(225,116,151,0.4)]">
      <defs>
        <linearGradient id="tier1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE1EB"/>
          <stop offset="100%" stopColor="#F4B8CE"/>
        </linearGradient>
        <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDE4F8"/>
          <stop offset="100%" stopColor="#CBB6EA"/>
        </linearGradient>
        <linearGradient id="tier3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF8F0"/>
          <stop offset="100%" stopColor="#FBE1EB"/>
        </linearGradient>
        <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2EBD9"/>
          <stop offset="100%" stopColor="#E0D0B8"/>
        </linearGradient>
      </defs>

      {/* ── plate ── */}
      <ellipse cx="100" cy="185" rx="75" ry="9" fill="url(#plate)" stroke="#D9A857" strokeWidth="1.5"/>

      {/* ── bottom tier ── */}
      <rect x="20" y="140" width="160" height="44" rx="6" fill="url(#tier3)" stroke="#E17497" strokeWidth="1.5"/>
      {/* bottom tier cream border top */}
      <rect x="20" y="138" width="160" height="8" rx="4" fill="white" opacity="0.7"/>
      {/* bottom tier decorative dots */}
      {[35,55,75,95,115,135,155,175].map((x,i) => (
        <circle key={i} cx={x} cy="142" r="3" fill={i%2===0?"#E17497":"#CBB6EA"}/>
      ))}
      {/* bottom tier hearts */}
      {[50,100,150].map((x,i) => (
        <text key={i} x={x} y="168" fontSize="14" textAnchor="middle">🌸</text>
      ))}
      {/* bottom tier bottom border */}
      <rect x="20" y="178" width="160" height="6" rx="3" fill="#E17497" opacity="0.6"/>

      {/* ── middle tier ── */}
      <rect x="42" y="96" width="116" height="46" rx="6" fill="url(#tier2)" stroke="#A98DD1" strokeWidth="1.5"/>
      <rect x="42" y="94" width="116" height="8" rx="4" fill="white" opacity="0.7"/>
      {[55,80,105,130,155].map((x,i) => (
        <circle key={i} cx={x} cy="98" r="3" fill={i%2===0?"#A98DD1":"#F4B8CE"}/>
      ))}
      {/* "Happy Birthday" text */}
      <text x="100" y="122" fontSize="9" textAnchor="middle" fill="#7B5EA7" fontFamily="Georgia, serif" fontStyle="italic">
        Happy Birthday
      </text>
      <text x="100" y="134" fontSize="8" textAnchor="middle" fill="#E17497" fontFamily="Georgia, serif" fontStyle="italic">
        Selva Meenakshi 🌻
      </text>
      <rect x="42" y="136" width="116" height="6" rx="3" fill="#A98DD1" opacity="0.6"/>

      {/* ── top tier ── */}
      <rect x="66" y="56" width="68" height="42" rx="6" fill="url(#tier1)" stroke="#E8628C" strokeWidth="1.5"/>
      <rect x="66" y="54" width="68" height="8" rx="4" fill="white" opacity="0.7"/>
      {[72,88,104,120,136].map((x,i) => (
        <circle key={i} cx={x} cy="58" r="2.5" fill={i%2===0?"#E8628C":"#D9A857"}/>
      ))}
      {/* sunflower on top tier */}
      <text x="100" y="88" fontSize="18" textAnchor="middle">🌻</text>
      <rect x="66" y="92" width="68" height="6" rx="3" fill="#E8628C" opacity="0.6"/>

      {/* ── candles ── */}
      {[80,92,104,116,128].map((x,i) => (
        <g key={i}>
          {/* candle stick */}
          <rect x={x-3} y="30" width="6" height="26" rx="3"
            fill={["#F4B8CE","#CBB6EA","#F2A65A","#E17497","#D9A857"][i]}/>
          {/* candle shine */}
          <rect x={x-1} y="32" width="2" height="16" rx="1" fill="white" opacity="0.4"/>
          {/* wax drip */}
          <circle cx={x} cy="56" r="4"
            fill={["#F4B8CE","#CBB6EA","#F2A65A","#E17497","#D9A857"][i]}/>
          {/* flame */}
          {lit ? (
            <motion.g
              animate={{ scaleY:[1,1.15,0.9,1.1,1], scaleX:[1,0.9,1.05,0.95,1], y:[0,-1,1,0,-1,0] }}
              transition={{ duration:0.8+i*0.1, repeat:Infinity, ease:"easeInOut" }}
              style={{ transformOrigin:`${x}px 26px` }}
            >
              {/* outer flame */}
              <ellipse cx={x} cy="24" rx="5" ry="8" fill="#F2A65A" opacity="0.9"/>
              {/* inner flame */}
              <ellipse cx={x} cy="25" rx="3" ry="5" fill="#FBEAD9" opacity="0.95"/>
              {/* glow */}
              <ellipse cx={x} cy="24" rx="7" ry="10" fill="#F2A65A" opacity="0.2"/>
            </motion.g>
          ) : (
            /* smoke after blowing */
            <motion.g initial={{ opacity:0 }} animate={{ opacity:[0,0.8,0] }}
              transition={{ duration:2, delay:i*0.1 }}>
              <circle cx={x} cy="22" r="3" fill="#ccc" opacity="0.5"/>
              <circle cx={x+2} cy="16" r="2.5" fill="#ccc" opacity="0.4"/>
              <circle cx={x-1} cy="10" r="2" fill="#ccc" opacity="0.3"/>
            </motion.g>
          )}
        </g>
      ))}

      {/* ── star topper ── */}
      <text x="100" y="26" fontSize="20" textAnchor="middle">⭐</text>

      {/* ── scattered decorations ── */}
      <text x="22" y="148" fontSize="10">✨</text>
      <text x="170" y="148" fontSize="10">✨</text>
      <text x="28" y="110" fontSize="9">🎀</text>
      <text x="163" y="110" fontSize="9">🎀</text>
    </svg>
  );
}

function ConfettiBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-lg"
          style={{ left: `${(i * 11 + 4) % 100}%`, top: "20%" }}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ y: [0, -60, 80], opacity: [0, 1, 0], rotate: 360, scale: [0.5, 1, 0.7] }}
          transition={{ duration: 2, delay: (i % 8) * 0.06 }}
        >
          {["🎊", "✨", "🎉", "💕", "🌸", "🌻"][i % 6]}
        </motion.span>
      ))}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-pink-400"
          style={{ left: `${10 + i * 9}%`, bottom: "30%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -120, opacity: [0, 1, 0] }}
          transition={{ duration: 2, delay: 0.3 + i * 0.1 }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}

export default function BirthdayCake() {
  const [stage, setStage] = useState("idle"); // idle → wishing → blown
  const [showEffects, setShowEffects] = useState(false);

  const handleTap = () => {
    if (stage === "idle") setStage("wishing");
  };

  const handleBlow = () => {
    setStage("blown");
    setShowEffects(true);
    setTimeout(() => setShowEffects(false), 2200);
  };

  return (
    <div className="relative flex flex-col items-center mt-6">
      <motion.button
        onClick={handleTap}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative focus:outline-none"
        aria-label="Tap the birthday cake"
      >
        {showEffects && <ConfettiBurst />}
        {showEffects && <FloatingHearts />}
        <CakeSVG lit={stage !== "blown"} />
      </motion.button>

      <AnimatePresence mode="wait">
        {stage === "wishing" && (
          <motion.div key="wishing"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 text-center">
            <p className="font-hand text-xl sm:text-2xl text-white">
              Make a wish, Sunflower... 🌻
            </p>
            <motion.button
              onClick={handleBlow}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="mt-4 font-body font-semibold text-sm sm:text-base px-6 py-3 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #E17497 0%, #A98DD1 100%)", boxShadow: "0 0 20px rgba(225,116,151,0.5)" }}
            >
              🕯️ Blow the Candles
            </motion.button>
          </motion.div>
        )}
        {stage === "blown" && (
          <motion.p key="blown"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-hand text-xl text-white text-center">
            Wish locked safely with me. ❤️
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
