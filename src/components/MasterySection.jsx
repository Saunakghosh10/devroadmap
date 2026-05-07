import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, Zap, Target, BookOpen } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function MasterySection({ plan, color }) {
  const [activeDay, setActiveDay] = useState(0);
  const current = plan.days[activeDay];

  return (
    <div className="space-y-10">
      {/* Day Selector */}
      <div className="relative">
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 scroll-smooth px-2">
          {plan.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className="flex-shrink-0 w-14 h-14 rounded-2xl border flex flex-col items-center justify-center transition-all"
              style={{
                borderColor: activeDay === i ? color : '#1a1a1a',
                background: activeDay === i ? `${color}15` : '#080808',
                color: activeDay === i ? color : '#444'
              }}
            >
              <div className="text-[10px] font-black uppercase leading-none mb-1">Day</div>
              <div className="text-lg font-black leading-none">{d.day}</div>
            </button>
          ))}
        </div>
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>

      {/* Main Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="p-8 rounded-3xl border border-[#1a1a1a] bg-gradient-to-br from-[#080808] to-black space-y-8"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-[3px] text-[#444]">{current.tech} Masterclass</div>
              <h3 className="text-2xl font-black text-white">{current.topic}</h3>
            </div>
            <div className="flex gap-2">
              <button 
                disabled={activeDay === 0}
                onClick={() => setActiveDay(s => s - 1)}
                className="p-2 rounded-xl border border-[#1a1a1a] text-[#444] hover:text-white disabled:opacity-20"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                disabled={activeDay === plan.days.length - 1}
                onClick={() => setActiveDay(s => s + 1)}
                className="p-2 rounded-xl border border-[#1a1a1a] text-[#444] hover:text-white disabled:opacity-20"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#444] tracking-widest">
                  <Zap size={12} className="text-yellow-500" /> Key Snippet
                </div>
                <CodeBlock code={current.snippet} color={color} />
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#444] tracking-widest">
                  <BookOpen size={12} style={{ color }} /> The Takeaway
                </div>
                <p className="text-sm text-[#888] leading-relaxed">{current.takeaway}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-green-500/10 bg-green-500/[0.02] space-y-4">
                <div className="flex items-center gap-2 text-green-500">
                  <Target size={18} />
                  <h4 className="text-base font-bold">Practice Challenge</h4>
                </div>
                <p className="text-sm text-green-500/70 leading-relaxed font-medium">
                  {current.challenge}
                </p>
                <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-green-500/50 hover:text-green-500 transition-colors">
                  <CheckCircle2 size={12} /> Mark as Completed
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.02] space-y-4">
                <div className="text-[10px] font-black uppercase text-blue-500/50 tracking-widest">Daily Progress</div>
                <div className="h-1.5 w-full bg-blue-500/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeDay + 1) / plan.days.length) * 100}%` }}
                    className="h-full bg-blue-500" 
                  />
                </div>
                <p className="text-[11px] text-blue-500/60 font-bold">
                  {activeDay + 1} of {plan.days.length} Days Complete
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
