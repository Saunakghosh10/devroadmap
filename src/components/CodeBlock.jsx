import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('tsx', typescript);
SyntaxHighlighter.registerLanguage('jsx', javascript);

const customOneDark = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#111111',
    margin: 0,
    borderRadius: '0 0 8px 8px',
    fontSize: '13px',
    lineHeight: '1.6',
    padding: '16px',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
  },
};

function detectLanguage(code) {
  if (code.includes('interface ') || code.includes(': string') || code.includes(': number') || code.includes('type ')) {
    return 'typescript';
  }
  if (code.startsWith('#') || code.includes('FROM ') || code.includes('RUN ') || code.includes('npm ')) {
    return 'bash';
  }
  return 'javascript';
}

export default function CodeBlock({ code, color }) {
  const [copied, setCopied] = useState(false);
  const lang = detectLanguage(code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: `${color}22` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: '#0d0d0d', borderBottom: `1px solid ${color}22` }}>
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: `${color}88` }}>
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors hover:bg-white/5"
          style={{ color: copied ? '#4ade80' : '#666' }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter language={lang} style={customOneDark} customStyle={{ background: '#111111' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
