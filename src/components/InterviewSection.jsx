import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, MessageSquare } from 'lucide-react';

export default function InterviewSection({ data, color }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {data.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(i)}
            className="px-4 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap"
            style={{
              borderColor: activeCategory === i ? color : '#222',
              background: activeCategory === i ? `${color}20` : 'transparent',
              color: activeCategory === i ? color : '#666',
            }}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {data[activeCategory].questions.map((q, i) => (
          <QuestionItem key={i} q={q} color={color} />
        ))}
      </div>
    </div>
  );
}

function QuestionItem({ q, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#222' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
        style={{ background: '#0d0d0d' }}
      >
        <div className="mt-1 shrink-0">
          <Target size={16} style={{ color }} />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-white mb-1">{q.q}</div>
          <div className="text-[11px] text-[#555] uppercase tracking-wider font-bold">Project Experience</div>
        </div>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1"
        >
          <ChevronRight size={16} style={{ color: '#444' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ background: '#080808' }}
          >
            <div className="p-5 pt-0 border-t border-[#111]">
              <div className="flex gap-4 pt-5">
                <div className="mt-1 shrink-0">
                  <MessageSquare size={16} style={{ color: '#444' }} />
                </div>
                <div className="text-[14px] text-[#aaa] leading-relaxed">
                  <span className="text-[11px] font-extrabold uppercase text-[#444] block mb-2">Model Answer</span>
                  {q.a}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
