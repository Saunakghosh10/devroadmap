import { BookOpen } from 'lucide-react';

export default function DocsSection({ data, color }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((doc, i) => (
        <div key={i} className="p-6 rounded-2xl border bg-[#0a0a0a] transition-all hover:border-white/[0.1] group" style={{ borderColor: '#1a1a1a' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
              <BookOpen size={18} style={{ color }} />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">{doc.title}</h3>
          </div>
          <p className="text-[13px] text-[#666] leading-relaxed group-hover:text-[#aaa] transition-colors">
            {doc.content}
          </p>
        </div>
      ))}
    </div>
  );
}
