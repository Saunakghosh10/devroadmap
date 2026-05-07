import CodeBlock from './CodeBlock';

export default function SyntaxSection({ data, color }) {
  if (!data) return <div className="text-[#444] text-center py-10">No syntax guides available for this track.</div>;

  return (
    <div className="space-y-8">
      {data.map((item, i) => (
        <div key={i} className="space-y-3">
          <div className="text-[11px] font-extrabold uppercase text-[#444] tracking-widest">{item.title}</div>
          <CodeBlock code={item.code} color={color} />
        </div>
      ))}
    </div>
  );
}
