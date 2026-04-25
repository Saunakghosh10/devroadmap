import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function RoadmapPhase({ phase, topics, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden mb-2" style={{ border: `1px solid ${color}18` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors"
        style={{ background: `${color}0d` }}
        onMouseEnter={(e) => e.currentTarget.style.background = `${color}18`}
        onMouseLeave={(e) => e.currentTarget.style.background = `${color}0d`}
      >
        <span className="text-sm font-semibold text-[#e8e8e8]">{phase}</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color }}
        >
          <ChevronRight size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 py-3 space-y-2" style={{ background: '#0d0d0d' }}>
              {topics.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="flex items-start gap-2.5 text-[13px] text-[#b0b0b0]"
                >
                  <span className="mt-0.5 shrink-0" style={{ color }}>▸</span>
                  <span>{t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
