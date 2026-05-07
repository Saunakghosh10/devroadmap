import { Scale, Check, Trophy } from 'lucide-react';

export default function ComparisonSection({ comparisons, color }) {
  return (
    <div className="space-y-8">
      {comparisons.map((c, i) => (
        <div key={i} className="p-8 rounded-3xl border border-[#1a1a1a] bg-[#050505] space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <Scale size={20} />
            </div>
            <h4 className="text-lg font-bold text-white">{c.topic}</h4>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase text-[#444] tracking-widest">The Core Question</div>
              <p className="text-base text-white font-medium">{c.q}</p>
            </div>
            
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase text-[#444] tracking-widest">The Expert Take</div>
              <p className="text-sm text-[#888] leading-relaxed">{c.a}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="p-1.5 rounded-full bg-green-500/20 text-green-500">
                <Trophy size={14} />
              </div>
              <p className="text-[12px] font-bold text-green-500/80">Recommendation: {c.winner}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
