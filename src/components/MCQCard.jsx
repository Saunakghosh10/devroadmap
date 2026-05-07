import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function MCQSection({ data, color }) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const topic = data[topicIdx];
  const q = topic.questions[currentQ];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setIsCorrect(idx === q.correct);
  };

  const next = () => {
    if (currentQ < topic.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      // Reset or next topic
      setTopicIdx((topicIdx + 1) % data.length);
      setCurrentQ(0);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[11px] font-extrabold uppercase text-[#444] mb-1 tracking-widest">Topic</div>
          <h3 className="text-xl font-bold text-white">{topic.topic}</h3>
        </div>
        <div className="text-[11px] font-bold text-[#444]">
          Question {currentQ + 1} / {topic.questions.length}
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-lg font-medium text-white leading-relaxed">
          {q.q}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((option, i) => {
            let state = "default";
            if (selected !== null) {
              if (i === q.correct) state = "correct";
              else if (i === selected) state = "wrong";
              else state = "dimmed";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="group relative flex items-center justify-between p-4 rounded-xl border transition-all text-left"
                style={{
                  background: state === "correct" ? `${color}15` : state === "wrong" ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.03)",
                  borderColor: state === "correct" ? color : state === "wrong" ? "#ef4444" : "#1a1a1a",
                  opacity: state === "dimmed" ? 0.4 : 1
                }}
              >
                <span className={state === "correct" ? "text-white font-bold" : "text-[#888] group-hover:text-white"}>
                  {option}
                </span>
                <div className="shrink-0">
                  {state === "correct" && <Check size={18} style={{ color }} />}
                  {state === "wrong" && <X size={18} className="text-[#ef4444]" />}
                  {state === "default" && <div className="h-5 w-5 rounded-full border border-[#222] group-hover:border-[#444]" />}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: isCorrect ? color : '#ef4444' }}>
                <HelpCircle size={14} />
                {isCorrect ? "Correct!" : "Incorrect"}
              </div>
              <p className="text-sm text-[#777] leading-relaxed">
                {q.explanation}
              </p>
              <button
                onClick={next}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all mt-4"
                style={{ background: color, color: '#000' }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
