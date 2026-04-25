import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GraduationCap, Lightbulb } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function FlashCard({ card, color }) {
  const [open, setOpen] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const c = card.color || color;

  const toggleQuiz = (e) => {
    e.stopPropagation();
    setQuiz(!quiz);
    setRevealed(false);
    setOpen(true);
  };

  return (
    <div className="rounded-xl overflow-hidden mb-3" style={{ border: `1px solid ${c}25` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between px-5 py-4 text-left transition-colors"
        style={{ background: open ? `${c}15` : '#0f0f0f' }}
        onMouseEnter={(e) => !open && (e.currentTarget.style.background = '#121212')}
        onMouseLeave={(e) => !open && (e.currentTarget.style.background = '#0f0f0f')}
      >
        <div className="text-left">
          <div className="text-base font-extrabold mb-1" style={{ color: c }}>
            {card.term}
          </div>
          <div className="text-[13px] text-[#777]">{card.oneliner}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <button
            onClick={toggleQuiz}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors border"
            style={{
              background: quiz ? `${c}25` : '#1a1a1a',
              borderColor: quiz ? `${c}60` : '#333',
              color: quiz ? c : '#666',
            }}
          >
            {quiz ? <GraduationCap size={11} /> : <Lightbulb size={11} />}
            {quiz ? '✓ Quiz' : 'Quiz'}
          </button>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: c }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 py-5 space-y-5" style={{ background: '#080808', borderTop: `1px solid ${c}20` }}>
              {/* How it works */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: c }}>
                  ⚙️ How it works
                </div>
                <div className="text-[13px] text-[#ccc] leading-relaxed whitespace-pre-line">
                  {card.how}
                </div>
              </div>

              {/* Visual Flow */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: c }}>
                  🔀 Visual Flow
                </div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {card.flow.map((step, i) => {
                    const isArrow = step.startsWith('→') || step.startsWith('↔') || step.startsWith('↓');
                    return (
                      <div
                        key={i}
                        className="rounded-md px-2 py-1 text-xs"
                        style={{
                          background: isArrow ? 'transparent' : `${c}18`,
                          border: isArrow ? 'none' : `1px solid ${c}45`,
                          color: isArrow ? c : '#ddd',
                          fontWeight: isArrow ? 700 : 400,
                          padding: isArrow ? '0 3px' : '4px 8px',
                        }}
                      >
                        {step}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Details */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest mb-2.5" style={{ color: c }}>
                  📋 Key Details
                </div>
                <div className="space-y-1.5">
                  {card.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 shrink-0 text-xs" style={{ color: c }}>▸</span>
                      <span className="text-[13px] text-[#b0b0b0] leading-snug">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code */}
              <CodeBlock code={card.code} color={c} />

              {/* Interview / Quiz */}
              {!quiz ? (
                <div
                  className="rounded-lg px-4 py-3 text-[13px] leading-relaxed"
                  style={{ background: `${c}12`, border: `1px solid ${c}40` }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c }}>
                    💬 Interview:{' '}
                  </span>
                  <span className="text-[#ccc]">{card.interview}</span>
                </div>
              ) : (
                <div className="rounded-lg p-4 border border-[#333]" style={{ background: '#0a0a0a' }}>
                  <div className="text-sm font-bold text-white mb-3">
                    ❓ Explain <span style={{ color: c }}>{card.term}</span> in your own words:
                  </div>
                  {!revealed ? (
                    <button
                      onClick={() => setRevealed(true)}
                      className="px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors"
                      style={{ background: `${c}22`, border: `1px solid ${c}`, color: c }}
                    >
                      Reveal Model Answer →
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg px-4 py-3"
                      style={{ background: `${c}12`, border: `1px solid ${c}40` }}
                    >
                      <span className="text-[13px] text-[#ccc] leading-relaxed">{card.interview}</span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
