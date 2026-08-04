import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Page map: view key → cute name + emoji ──────────────────
const PAGES = [
  { key: "home",     emoji: "🏠", name: "Home",              sub: "our little beginning" },
  { key: "memories", emoji: "📖", name: "Our Scrapbook",     sub: "pages we filled together" },
  { key: "cinema",   emoji: "🎬", name: "Cinema Memories",   sub: "every frame, us" },
  { key: "corner",   emoji: "🌻", name: "Our Little Corner", sub: "calls, quiz & stickers" },
  { key: "birthday", emoji: "🎂", name: "Birthday Room",     sub: "made just for you ❤️" },
];

// Views that should NOT show the nav (loading, transitions)
const HIDDEN_VIEWS = ["loading", "riding"];

export default function HeartNav({ currentView, onNavigate }) {
  const [open, setOpen]     = useState(false);
  const [pulse, setPulse]   = useState(false);
  const menuRef             = useRef(null);

  // Pulse the heart once whenever page changes
  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [currentView]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  // Hide during loading / transition screens
  if (HIDDEN_VIEWS.includes(currentView)) return null;

  const currentPage = PAGES.find(p => p.key === currentView);

  const handleNavigate = (key) => {
    if (key === currentView) { setOpen(false); return; }
    setOpen(false);
    onNavigate(key);
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-3"
      aria-label="Page navigation"
    >
      {/* ── menu items — appear above the heart ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-2 items-end"
          >
            {PAGES.map((page, i) => {
              const isActive = page.key === currentView;
              return (
                <motion.button
                  key={page.key}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => handleNavigate(page.key)}
                  className={`
                    flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-2xl
                    text-right transition-all
                    ${isActive
                      ? "shadow-[0_4px_20px_rgba(225,116,151,0.5)]"
                      : "hover:scale-105 active:scale-95"}
                  `}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg,#E17497,#A98DD1)"
                      : "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.4)"
                      : "1px solid rgba(225,116,151,0.25)",
                    boxShadow: isActive
                      ? "0 4px 20px rgba(225,116,151,0.45)"
                      : "0 2px 12px rgba(107,81,80,0.15)",
                  }}
                  aria-label={`Go to ${page.name}`}
                >
                  <span className="text-base leading-none">{page.emoji}</span>
                  <div className="text-left">
                    <p className={`font-hand text-sm leading-tight ${isActive ? "text-white" : "text-blush-deep"}`}>
                      {page.name}
                    </p>
                    <p className={`font-body text-[9px] leading-tight ${isActive ? "text-white/70" : "text-ink/45"}`}>
                      {page.sub}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-xs ml-1 text-white/80">✦</span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── the heart button itself ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        animate={pulse
          ? { scale: [1, 1.35, 1], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }
          : open
          ? { scale: 1.08 }
          : { scale: 1 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-deep"
        style={{
          background: open
            ? "linear-gradient(135deg,#A98DD1,#E17497)"
            : "linear-gradient(135deg,#E17497,#F4B8CE)",
          boxShadow: open
            ? "0 0 0 4px rgba(169,141,209,0.3), 0 8px 24px rgba(225,116,151,0.5)"
            : "0 0 0 3px rgba(244,184,206,0.45), 0 6px 20px rgba(225,116,151,0.4)",
        }}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white text-lg font-bold leading-none select-none"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="heart"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xl leading-none select-none"
            >
              ❤️
            </motion.span>
          )}
        </AnimatePresence>

        {/* current page dot indicator below the button */}
        {!open && currentPage && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-body text-[9px] whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
          >
            {currentPage.emoji} {currentPage.name.split(" ")[0]}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
