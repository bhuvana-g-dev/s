import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { callHistory, callReplies } from "../../data/callLog";

const randomOf = (list) => list[Math.floor(Math.random() * list.length)];

/** Animated counter that counts up to a number, then settles on ∞. */
function InfinityStat({ icon, label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = 40 + Math.floor(Math.random() * 30);
    const step = Math.max(1, Math.floor(target / 24));
    const id = setInterval(() => {
      setCount((c) => {
        if (c + step >= target) {
          clearInterval(id);
          return target;
        }
        return c + step;
      });
    }, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg">{icon}</span>
      <span className="font-display text-lg text-blush-deep">
        {count}
        <span className="text-lavender-deep">∞</span>
      </span>
      <span className="font-body text-[10px] text-ink/50 text-center">{label}</span>
    </div>
  );
}

/** Chat bubble with a typing animation, auto-closes after a few seconds. */
function ReplyBubble({ text, onDone }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setTimeout(onDone, 1800);
      }
    }, 28);
    return () => clearInterval(id);
  }, [text, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="self-end max-w-[75%] bg-blush-deep text-white text-xs sm:text-sm rounded-2xl rounded-br-sm px-3 py-2 mt-2"
    >
      {shown}
      <span className="opacity-50">|</span>
    </motion.div>
  );
}

export default function CallLog() {
  const [activeReply, setActiveReply] = useState(null); // { id, text }

  const handleTap = (id) => {
    setActiveReply({ id, text: randomOf(callReplies) });
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl bg-white/40 border border-white/60 shadow-glass">
      <h3 className="font-display text-lg text-blush-deep text-center">📞 Our Call Log</h3>
      <p className="font-hand text-sm text-ink/50 text-center mb-4">
        Some calls ended... but our conversations never did.
      </p>

      <div className="flex justify-around bg-white/50 rounded-xl py-3 mb-4">
        <InfinityStat icon="🌻" label="Countless Calls" />
        <InfinityStat icon="⏰" label="Endless Hours" />
        <InfinityStat icon="💬" label="Infinite Talks" />
      </div>

      <div className="space-y-2">
        {callHistory.map((c) => (
          <motion.button
            key={c.id}
            onClick={() => handleTap(c.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between bg-white/60 hover:bg-white/80 rounded-xl px-3 py-2.5 transition-colors"
          >
            <span className="font-body text-sm text-ink/80 flex items-center gap-2">
              🌻 {c.name}
            </span>
            <span className="font-body text-xs text-ink/50">{c.duration}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeReply && (
          <div className="flex flex-col mt-1">
            <ReplyBubble
              key={activeReply.id + activeReply.text}
              text={activeReply.text}
              onDone={() => setActiveReply(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
