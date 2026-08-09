import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validNicknames, secretPhotos } from "../../data/cinemaMemories";

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
}
function isCorrect(raw) {
  return raw.split(",").map(normalize).filter(Boolean)
    .some(c => validNicknames.includes(c));
}

/* ── Bundled letters illustration (like the image) ── */
function BundledLetters() {
  return (
    <svg viewBox="0 0 120 48" className="w-28 sm:w-32 h-auto" style={{ filter:"drop-shadow(0 4px 10px rgba(0,0,0,0.35))" }}>
      {/* shadow */}
      <ellipse cx="60" cy="46" rx="50" ry="4" fill="rgba(0,0,0,0.15)"/>
      {/* paper stack — slightly fanned */}
      {[0,1,2,3,4].map(i => (
        <rect key={i}
          x={5 + i*1.5} y={4 + i*1.2}
          width="108" height="34" rx="3"
          fill={["#F5ECD5","#F0E4C8","#EDE0C0","#F5ECD5","#F0E4C8"][i]}
          stroke="rgba(180,140,80,0.3)" strokeWidth="0.5"
        />
      ))}
      {/* top paper (main) */}
      <rect x="5" y="4" width="108" height="34" rx="3" fill="#FAEFD8" stroke="rgba(180,140,80,0.4)" strokeWidth="0.7"/>
      {/* worn lines on the paper */}
      <line x1="18" y1="13" x2="100" y2="13" stroke="rgba(150,110,60,0.2)" strokeWidth="1"/>
      <line x1="18" y1="19" x2="90"  y2="19" stroke="rgba(150,110,60,0.2)" strokeWidth="1"/>
      <line x1="18" y1="25" x2="95"  y2="25" stroke="rgba(150,110,60,0.2)" strokeWidth="1"/>
      <line x1="18" y1="31" x2="80"  y2="31" stroke="rgba(150,110,60,0.2)" strokeWidth="1"/>
      {/* golden string horizontal */}
      <path d="M5 22 Q60 18 115 22" stroke="#C8922A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* golden string vertical */}
      <line x1="60" y1="4" x2="60" y2="38" stroke="#C8922A" strokeWidth="2.5" strokeLinecap="round"/>
      {/* knot in center */}
      <circle cx="60" cy="22" r="4.5" fill="#C8922A"/>
      <circle cx="60" cy="22" r="2.5" fill="#E8B84B"/>
      {/* small bow loops */}
      <path d="M56 18 Q52 14 55 17" stroke="#C8922A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M64 18 Q68 14 65 17" stroke="#C8922A" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Sparkle burst on correct answer ── */
function SparkleBurst() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({length:16},(_,i)=>({
        id:i, angle:(360/16)*i,
        icon: i%3===0?"❤":"✦",
      })).map(s=>(
        <motion.span key={s.id}
          className="absolute top-1/2 left-1/2 text-cinema-sunset text-lg"
          initial={{x:0,y:0,opacity:1,scale:0.4}}
          animate={{
            x:Math.cos((s.angle*Math.PI)/180)*130,
            y:Math.sin((s.angle*Math.PI)/180)*130,
            opacity:0, scale:1.1,
          }}
          transition={{duration:1.1,ease:"easeOut"}}>
          {s.icon}
        </motion.span>
      ))}
    </div>
  );
}

/* ── Secret photo slideshow ── */
function SecretSlideshow() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const go = (d) => { setDir(d); setIdx(i=>(i+d+secretPhotos.length)%secretPhotos.length); };
  const photo = secretPhotos[idx];
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={photo.id} custom={dir}
          initial={{opacity:0, x:dir>0?60:-60}}
          animate={{opacity:1, x:0}}
          exit={{opacity:0, x:dir>0?-60:60}}
          transition={{duration:0.45}}
          className="bg-white p-2.5 pb-8 shadow-[0_12px_30px_rgba(0,0,0,0.25)] rounded-sm"
          style={{rotate:"-1.5deg"}}>
          <div className="w-52 h-60 sm:w-60 sm:h-72 overflow-hidden rounded-[2px] bg-gradient-to-br from-blush-light to-lavender-light flex items-center justify-center">
            {photo.src
              ? <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover"/>
              : <span className="text-5xl opacity-40">💌</span>}
          </div>
        </motion.div>
      </AnimatePresence>
      <motion.p key={photo.id+"c"} initial={{opacity:0}} animate={{opacity:1}}
        transition={{delay:0.2}} className="font-hand text-lg text-cinema-cream mt-3 text-center max-w-xs">
        {photo.caption}
      </motion.p>
      <div className="flex items-center gap-4 mt-3">
        <button onClick={()=>go(-1)} disabled={idx===0}
          className="w-9 h-9 rounded-full bg-white/15 text-cinema-cream disabled:opacity-25 hover:bg-white/25 transition-colors">←</button>
        <span className="font-body text-xs text-cinema-cream/60">{idx+1} / {secretPhotos.length}</span>
        <button onClick={()=>go(1)} disabled={idx===secretPhotos.length-1}
          className="w-9 h-9 rounded-full bg-white/15 text-cinema-cream disabled:opacity-25 hover:bg-white/25 transition-colors">→</button>
      </div>
    </div>
  );
}

export default function SecretCorner() {
  const [stage, setStage] = useState("hidden"); // hidden → question → success
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showBurst, setShowBurst] = useState(false);

  const closeAll = () => { setStage("hidden"); setAnswer(""); setFeedback(null); setShowBurst(false); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    if (isCorrect(answer)) {
      setFeedback(null);
      setShowBurst(true);
      setTimeout(() => setStage("success"), 600);
    } else {
      setFeedback("wrong");
    }
  };

  return (
    <>
      {/* ── bundled letters tab — bottom-right, visible but charming ── */}
      {stage === "hidden" && (
        <motion.button
          onClick={() => setStage("question")}
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:1.5, duration:0.8, ease:"easeOut" }}
          whileHover={{ x:-6, scale:1.04 }}
          whileTap={{ scale:0.96 }}
          className="fixed bottom-4 right-0 z-30 focus:outline-none flex flex-col items-center pr-2 pb-1"
          aria-label="A secret bundle"
        >
          <BundledLetters />
          <motion.span
            animate={{ opacity:[0.5,1,0.5] }}
            transition={{ duration:2, repeat:Infinity }}
            className="font-hand text-[11px] text-white/70 mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          >
            Secret...
          </motion.span>
        </motion.button>
      )}

      <AnimatePresence>
        {/* ── Question modal ── */}
        {stage === "question" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/85 backdrop-blur-sm px-4"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={closeAll}
          >
            <motion.div
              initial={{scale:0.3,opacity:0,rotate:-6}}
              animate={{scale:1,opacity:1,rotate:0}}
              exit={{scale:0.5,opacity:0}}
              transition={{type:"spring",stiffness:150,damping:16}}
              onClick={e=>e.stopPropagation()}
              className="relative bg-cinema-cream rounded-2xl px-7 py-9 sm:px-10 max-w-sm w-full text-center shadow-cinemaGlow"
            >
              {showBurst && <SparkleBurst/>}

              {/* mini bundled letters at top of modal */}
              <div className="flex justify-center mb-4">
                <div className="scale-75 origin-top"><BundledLetters/></div>
              </div>

              <p className="font-display text-xl sm:text-2xl text-cinema-plum mb-2">
                Only someone special would know... ❤️
              </p>
              <p className="font-body text-ink/70 mb-5 text-sm sm:text-base">
                In what ways does Bhuvana call you?
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                <input type="text" value={answer}
                  onChange={e=>{setAnswer(e.target.value);setFeedback(null);}}
                  placeholder="type a nickname..."
                  className="w-full rounded-full px-4 py-2.5 bg-white border border-cinema-plum/20 text-ink font-body text-sm focus:outline-none focus:ring-2 focus:ring-cinema-ember"
                  autoFocus/>
                <button type="submit"
                  className="font-body font-semibold text-sm px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-cinema-ember to-cinema-rose hover:opacity-90 transition-opacity">
                  Reveal
                </button>
              </form>
              <AnimatePresence>
                {feedback === "wrong" && (
                  <motion.p initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                    className="font-hand text-lg text-cinema-ember mt-4">
                    Almost... try remembering a little more. ❤️
                  </motion.p>
                )}
              </AnimatePresence>
              <button onClick={closeAll} className="mt-6 font-body text-xs text-ink/40 hover:text-ink/70 transition-colors">close</button>
            </motion.div>
          </motion.div>
        )}

        {/* ── Success: photo slideshow ── */}
        {stage === "success" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-night/92 backdrop-blur-sm px-4"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={closeAll}
          >
            {Array.from({length:10},(_,i)=>i).map(i=>(
              <motion.span key={i} className="absolute text-cinema-rose text-xl pointer-events-none"
                style={{top:`${15+(i%4)*18}%`,left:`${5+i*9}%`}}
                animate={{y:[-4,-20,-4],opacity:[0.3,0.9,0.3]}}
                transition={{duration:3+(i%3),repeat:Infinity,delay:i*0.3}}>❤</motion.span>
            ))}
            <motion.div
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              exit={{opacity:0,y:20}} transition={{duration:0.7}}
              onClick={e=>e.stopPropagation()}
              className="flex flex-col items-center">
              <SecretSlideshow/>
              <button onClick={closeAll}
                className="mt-6 font-body text-sm px-5 py-2 rounded-full bg-white/10 text-cinema-cream hover:bg-white/20 transition-colors">
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
