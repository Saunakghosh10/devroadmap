import { motion } from 'framer-motion';
import { CONNECTIONS } from '../data/connections';
import { ArrowRight } from 'lucide-react';

export default function ConnectionMap({ color }) {
  return (
    <div>
      <p className="text-xs text-[#555] mb-4">
        The conceptual links between everything. Understanding these is what separates good developers from great ones.
      </p>
      <div className="space-y-2">
        {CONNECTIONS.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-stretch"
          >
            <div
              className="flex items-center rounded-l-lg px-3.5 py-2.5 min-w-[140px]"
              style={{ background: '#141414', border: `1px solid ${color}30`, borderRight: 'none' }}
            >
              <span className="text-xs font-bold" style={{ color }}>{l.from}</span>
            </div>
            <div
              className="flex items-center px-1.5"
              style={{ background: `${color}18` }}
            >
              <ArrowRight size={14} style={{ color }} />
            </div>
            <div
              className="flex-1 rounded-r-lg px-3.5 py-2.5"
              style={{ background: '#141414', border: `1px solid ${color}30`, borderLeft: 'none' }}
            >
              <div className="text-xs font-bold text-[#e0e0e0] mb-0.5">{l.to}</div>
              <div className="text-[11px] text-[#555]">{l.note}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
