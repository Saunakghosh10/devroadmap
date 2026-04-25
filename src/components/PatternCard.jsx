import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function PatternCard({ p, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden mb-3" style={{ border: `1px solid ${color}22` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ background: `${color}0a` }}
        onMouseEnter={(e) => e.currentTarget.style.background = `${color}15`}
        onMouseLeave={(e) => e.currentTarget.style.background = `${color}0a`}
      >
        <div className="text-left">
          <div className="text-[15px] font-bold text-white">{p.name}</div>
          <div className="text-xs text-[#666] mt-0.5">{p.why}</div>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color }}
        >
          <Plus size={18} />
        </motion.span>
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
            <div className="px-5 py-4 space-y-4" style={{ background: '#080808' }}>
              <p className="text-[13px] text-[#bbb] leading-relaxed">{p.what}</p>
              <CodeBlock code={p.code} color={color} />
              <div
                className="rounded-lg px-4 py-3 text-[13px] leading-relaxed"
                style={{ background: `${color}12`, border: `1px solid ${color}35` }}
              >
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
                  💬 Interview:{' '}
                </span>
                <span className="text-[#ccc]">{p.interview}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
