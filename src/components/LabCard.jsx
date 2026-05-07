import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, CheckCircle2, Play, Terminal } from 'lucide-react';
import CodeBlock from './CodeBlock';

export default function LabSection({ labs, color }) {
  const [activeLab, setActiveLab] = useState(0);

  return (
    <div className="space-y-8">
      {labs.map((lab, i) => (
        <LabCard key={i} lab={lab} color={color} />
      ))}
    </div>
  );
}

function LabCard({ lab, color }) {
  const [step, setStep] = useState(0);
  const currentStep = lab.steps[step];

  return (
    <div className="rounded-2xl border bg-[#0a0a0a] overflow-hidden" style={{ borderColor: '#1a1a1a' }}>
      <div className="p-6 border-b border-[#1a1a1a] flex items-center justify-between bg-gradient-to-r from-black to-[#0d0d0d]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
            <Beaker size={20} style={{ color }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{lab.title}</h3>
            <p className="text-[11px] text-[#555] uppercase font-bold tracking-widest">{lab.difficulty} Lab</p>
          </div>
        </div>
        <div className="flex gap-1">
          {lab.steps.map((_, i) => (
            <div 
              key={i} 
              className="h-1 w-6 rounded-full transition-all"
              style={{ background: i <= step ? color : '#222' }}
            />
          ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="text-[11px] font-extrabold uppercase text-[#444] mb-2 tracking-widest">Step {step + 1} of {lab.steps.length}</div>
            <h4 className="text-xl font-bold text-white mb-3">{currentStep.title}</h4>
            <p className="text-sm text-[#888] leading-relaxed">{currentStep.description}</p>
          </div>

          <div className="space-y-3">
            {currentStep.tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <CheckCircle2 size={16} className="mt-0.5 text-[#333]" />
                <span className="text-sm text-[#aaa]">{task}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              disabled={step === 0}
              onClick={() => setStep(s => s - 1)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold border border-[#222] text-[#666] disabled:opacity-30"
            >
              Back
            </button>
            <button
              onClick={() => setStep(s => (s + 1) % lab.steps.length)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{ background: color, color: '#000' }}
            >
              {step === lab.steps.length - 1 ? 'Restart Lab' : 'Next Step'}
              <Play size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-[#444] tracking-widest">
            <Terminal size={12} /> Environment / Code
          </div>
          <CodeBlock code={currentStep.code} color={color} />
        </div>
      </div>
    </div>
  );
}
