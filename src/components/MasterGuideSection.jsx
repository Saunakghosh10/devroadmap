import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lightbulb, Code2, GraduationCap, ChevronDown } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function MasterGuideSection({ guide, color }) {
  return (
    <div className="space-y-12">
      {/* Role Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#111] to-black border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <GraduationCap size={120} style={{ color }} />
        </div>
        <div className="relative z-10">
          <div className="text-[11px] font-extrabold uppercase tracking-[4px] text-[#555] mb-2">Target Role</div>
          <h2 className="text-3xl font-extrabold text-white mb-4">{guide.role}</h2>
          <div className="flex flex-wrap gap-3">
            {['System Design', 'Technical Depth', 'Leadership', 'AI/ML'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold border border-white/10 text-[#666]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      {guide.sections.map((section, idx) => (
        <div key={idx} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <h3 className="text-xs font-black uppercase tracking-[3px] text-[#333] whitespace-nowrap">{section.title}</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="space-y-4">
            {section.questions && section.questions.map((q, qIdx) => (
              <MasterQuestionCard key={qIdx} q={q} color={color} />
            ))}
            
            {section.challenge && (
              <div className="p-8 rounded-3xl border border-[#1a1a1a] bg-[#080808] space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <Code2 size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Coding Challenge</h4>
                </div>
                <p className="text-sm text-[#888] leading-relaxed">{section.challenge.statement}</p>
                <div className="space-y-3">
                  <div className="text-[10px] font-bold uppercase text-[#444] tracking-widest">Expected Approach ({section.challenge.language})</div>
                  <CodeBlock code={section.challenge.solution} color="#3b82f6" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* General Advice */}
      <div className="p-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/[0.02] space-y-4">
        <div className="flex items-center gap-3 text-yellow-500">
          <Lightbulb size={20} />
          <h4 className="text-lg font-bold">Career Coach Advice</h4>
        </div>
        <p className="text-sm text-yellow-500/80 leading-relaxed font-medium">
          {guide.advice}
        </p>
      </div>
    </div>
  );
}

function MasterQuestionCard({ q, color }) {
  const [showRubric, setShowRubric] = useState(false);

  return (
    <div className="rounded-2xl border border-[#1a1a1a] bg-black overflow-hidden transition-all hover:border-white/10">
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="mt-1 p-1.5 rounded-md bg-white/5 text-[#444]">
            <ShieldCheck size={16} />
          </div>
          <h4 className="text-[15px] font-bold text-white leading-snug">{q.q}</h4>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowRubric(!showRubric)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors"
            style={{ color: showRubric ? color : '#444' }}
          >
            {showRubric ? 'Hide Rubric' : 'Show Evaluation Rubric'}
            <ChevronDown size={12} className={`transition-transform ${showRubric ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showRubric && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#111]"
          >
            <div className="p-6 bg-[#050505] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase text-[#444] tracking-widest">Key Concepts</div>
                  <div className="flex flex-wrap gap-2">
                    {q.rubric.mention.map(m => (
                      <span key={m} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-[#888] border border-white/5">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase text-red-500/50 tracking-widest">Common Pitfalls</div>
                  <p className="text-[12px] text-red-500/70">{q.rubric.pitfalls}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] font-black uppercase text-green-500/50 tracking-widest mb-1">Strong Answer Indicator</div>
                <p className="text-[12px] text-[#777]">{q.rubric.strong}</p>
              </div>
              {q.followup && (
                <div className="pt-4 border-t border-white/5">
                  <div className="text-[10px] font-black uppercase text-blue-500/50 tracking-widest mb-1">Follow-up Probe</div>
                  <p className="text-[13px] text-blue-500 italic">" {q.followup} "</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
