import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionCard({ item, i, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden mb-2" style={{ border: '1px solid #1f1f1f' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#0e0e0e]"
        style={{ background: '#0d0d0d' }}
      >
        <span className="text-[13px] font-bold shrink-0 mt-0.5" style={{ color }}>
          Q{i + 1}
        </span>
        <span className="text-sm font-medium text-[#ddd]">{item.q}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 flex gap-3" style={{ background: '#070707', borderTop: '1px solid #1a1a1a' }}>
              <span className="text-[13px] font-bold shrink-0" style={{ color: '#444' }}>ANS</span>
              <p className="text-[13px] text-[#bbb] leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
