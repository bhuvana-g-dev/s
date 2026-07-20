import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  quizQuestions,
  correctFeedback,
  wrongFeedback,
  hintIntro,
  perfectScorePopup,
} from "../../data/quizQuestions";

const randomOf = (list) => list[Math.floor(Math.random() * list.length)];

function normalize(s) {
  return s.trim().toLowerCase();
}

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'correct'|'wrong'|'always', text }
  const [answered, setAnswered] = useState(false);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[index];

  const goNext = () => {
    setFeedback(null);
    setAnswered(false);
    setShowHint(false);
    setWrongCount(0);
    if (index + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleSelect = (option) => {
    if (answered) return;

    if (q.alwaysCorrect) {
      setAnswered(true);
      setCorrectTotal((c) => c + 1);
      setFeedback({ type: "always", text: q.popup });
      return;
    }

    if (normalize(option) === normalize(q.correct)) {
      setAnswered(true);
      setCorrectTotal((c) => c + 1);
      setFeedback({ type: "correct", text: randomOf(correctFeedback) });
    } else {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      setFeedback({ type: "wrong", text: randomOf(wrongFeedback) });
      if (nextWrong >= 3) setShowHint(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setWrongCount(0);
    setShowHint(false);
    setFeedback(null);
    setAnswered(false);
    setCorrectTotal(0);
    setFinished(false);
  };

  return (
    <div className="relative bg-cream rounded-2xl p-4 sm:p-6 shadow-soft border border-beige-deep/30 overflow-hidden">
      {/* floating hearts ambience */}
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
        <motion.span
          key={i}
          className="absolute text-blush/40 text-sm pointer-events-none"
          style={{ left: `${15 + i * 18}%`, top: `${10 + (i % 2) * 60}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        >
          ❤
        </motion.span>
      ))}

      <h3 className="font-display text-lg sm:text-xl text-blush-deep text-center mb-1 relative z-10">
        🌸 How Well Do You Know Our Little World?
      </h3>

      {!finished ? (
        <>
          <p className="font-body text-xs text-ink/50 text-center mb-1 relative z-10">
            Question {index + 1} / {quizQuestions.length}
          </p>
          <div className="text-center mb-4 relative z-10 leading-none">
            {quizQuestions.map((_, i) => (
              <span key={i} className={`text-sm ${i <= index ? "opacity-100" : "opacity-20"}`}>
                ❤️
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              <p className="text-center text-2xl mb-1">{q.icon}</p>
              <p className="font-body text-sm sm:text-base text-ink/80 text-center mb-4 px-1">
                {q.question}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={answered}
                    className="font-body text-xs sm:text-sm px-3 py-2.5 rounded-xl bg-white border border-lavender/40 text-ink/80 hover:border-blush-deep disabled:opacity-70 transition-colors"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              {showHint && !answered && (
                <p className="font-hand text-sm text-lavender-deep text-center mt-3 whitespace-pre-line">
                  {hintIntro}
                  {"\n"}(hint: think about who says it first 💭)
                </p>
              )}

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mt-4 text-center"
                  >
                    <p
                      className={`font-hand text-lg whitespace-pre-line ${
                        feedback.type === "wrong" ? "text-cinema-ember" : "text-blush-deep"
                      }`}
                    >
                      {feedback.text}
                    </p>
                    {feedback.type !== "wrong" && (
                      <button
                        onClick={goNext}
                        className="mt-3 font-body text-xs px-4 py-2 rounded-full bg-blush-deep/90 text-white hover:bg-blush-deep transition-colors"
                      >
                        next →
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center py-4"
        >
          {correctTotal === quizQuestions.length && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 14 }, (_, i) => i).map((i) => (
                <motion.span
                  key={i}
                  className="absolute text-lg"
                  style={{ left: `${(i * 13 + 5) % 100}%`, top: "-5%" }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: "120%", opacity: [0, 1, 1, 0], rotate: 180 }}
                  transition={{ duration: 3 + (i % 3), delay: i * 0.1, repeat: Infinity }}
                >
                  🌻
                </motion.span>
              ))}
            </div>
          )}
          <p className="font-hand text-xl text-blush-deep whitespace-pre-line">
            {correctTotal === quizQuestions.length
              ? perfectScorePopup
              : `You got ${correctTotal} / ${quizQuestions.length} ❤️`}
          </p>
          {correctTotal === quizQuestions.length && (
            <p className="font-body text-xs text-ink/50 mt-3">
              🔓 Secret Letter · Voice Note · Hidden Polaroid unlocked on the sticker wall
            </p>
          )}
          <button
            onClick={restart}
            className="mt-5 font-body text-xs px-4 py-2 rounded-full bg-white border border-blush-deep/40 text-blush-deep hover:bg-blush-light transition-colors"
          >
            play again
          </button>
        </motion.div>
      )}
    </div>
  );
}
