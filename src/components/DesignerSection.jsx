import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Layers, Users, Zap, ExternalLink, ChevronDown, CheckCircle } from 'lucide-react';

export default function DesignerSection({ data, color }) {
  return (
    <div className="space-y-12">
      {/* Company Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0f0f0f] to-black border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                Emergent Hiring
              </span>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                $100M ARR
              </span>
            </div>
            <h2 className="text-3xl font-black text-white">{data.role}</h2>
            <p className="text-[#666] text-sm leading-relaxed max-w-xl">
              Emergent builds autonomous coding agents. The design challenge is translating complex AI logic into intuitive human workflows.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 w-full md:w-auto min-w-[200px]">
            <div className="text-[10px] font-bold text-[#444] uppercase tracking-widest">Key Focus Areas</div>
            <ul className="space-y-2">
              {['AI UX Patterns', 'Workflow Complexity', 'Speed & Execution', 'Visual Fidelity'].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#888]">
                  <CheckCircle size={12} className="text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sections */}
      {data.sections.map((section, idx) => (
        <div key={idx} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <h3 className="text-xs font-black uppercase tracking-[3px] text-[#333]">{section.title}</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="space-y-4">
            {section.questions.map((q, qIdx) => (
              <DesignQuestionCard key={qIdx} q={q} color={color} />
            ))}
          </div>
        </div>
      ))}

      {/* Advice */}
      <div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-600/20 space-y-4">
        <div className="flex items-center gap-2 text-blue-500">
          <Zap size={20} fill="currentColor" />
          <h4 className="text-lg font-bold">Designer Prep Advice</h4>
        </div>
        <p className="text-sm text-blue-400/80 leading-relaxed italic">
          {data.advice}
        </p>
      </div>
    </div>
  );
}

function DesignQuestionCard({ q, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[#1a1a1a] bg-black overflow-hidden transition-all hover:border-white/10">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left space-y-4 group"
      >
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-[16px] font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">{q.q}</h4>
          <ChevronDown size={18} className={`text-[#444] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
        <div className="text-[10px] font-bold text-[#444] uppercase tracking-widest flex items-center gap-2">
          <Palette size={12} /> Interview Question
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-[#111] bg-[#050505]"
          >
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase text-[#444] tracking-widest flex items-center gap-2">
                    <CheckCircle size={10} className="text-green-500" /> What to Cover
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.rubric.mention.map(m => (
                      <span key={m} className="px-2 py-1 rounded bg-white/5 text-[11px] text-[#888] border border-white/5">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-red-500/[0.03] border border-red-500/10 space-y-2">
                  <div className="text-[10px] font-black uppercase text-red-500/50 tracking-widest">Common Pitfalls</div>
                  <p className="text-[12px] text-red-500/70">{q.rubric.pitfalls}</p>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-blue-500/[0.03] border border-blue-500/10">
                <div className="text-[10px] font-black uppercase text-blue-500/50 tracking-widest mb-2">High Impact Answer Indicator</div>
                <p className="text-[13px] text-[#777] leading-relaxed">{q.rubric.strong}</p>
              </div>
              {q.followup && (
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-[#555] italic">Follow-up: "{q.followup}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
