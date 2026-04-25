import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRACKS } from './data/tracks';
import { JS_DATA } from './data/js-data';
import { TS_DATA } from './data/ts-data';
import { REACT_DATA } from './data/react-data';
import { NEXTJS_DATA } from './data/nextjs-data';
import { BACKEND_DATA } from './data/backend-data';
import { WEB_CARDS } from './data/web-cards';
import RoadmapPhase from './components/RoadmapPhase';
import PatternCard from './components/PatternCard';
import QuestionCard from './components/QuestionCard';
import FlashCard from './components/FlashCard';
import ConnectionMap from './components/ConnectionMap';
import { Link, Map, BrainCircuit, Target, GraduationCap } from 'lucide-react';

const DATA = {
  js: JS_DATA,
  ts: TS_DATA,
  react: REACT_DATA,
  nextjs: NEXTJS_DATA,
  backend: BACKEND_DATA,
};

const TAB_CONFIG = {
  roadmap: { icon: Map, label: 'Roadmap' },
  patterns: { icon: BrainCircuit, label: 'Patterns' },
  questions: { icon: Target, label: 'Interview Qs' },
  flashcards: { icon: GraduationCap, label: 'Flashcards' },
};

export default function App() {
  const [activeTrack, setActiveTrack] = useState('js');
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showConn, setShowConn] = useState(false);

  const track = TRACKS.find((t) => t.id === activeTrack);
  const data = DATA[activeTrack];
  const color = track.color;
  const isWeb = activeTrack === 'web';
  const tabs = isWeb ? ['flashcards'] : ['roadmap', 'patterns', 'questions'];

  const handleTrackChange = (trackId) => {
    setActiveTrack(trackId);
    setActiveTab(trackId === 'web' ? 'flashcards' : 'roadmap');
    setShowConn(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowConn(false);
  };

  return (
    <div className="min-h-screen dot-grid" style={{ background: '#050505' }}>
      {/* Header */}
      <header className="border-b border-[#111] px-5 pt-7 pb-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] font-medium uppercase tracking-[3px] text-[#555] mb-1.5">
            Full Stack Developer
          </div>
          <h1
            className="text-[26px] md:text-[32px] font-extrabold font-display mb-1"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Complete Roadmap
          </h1>
          <p className="text-xs text-[#555] mb-4">
            Roadmap · Patterns · Interview Questions · Web Essentials · Everything
          </p>

          {/* DSA Promo Banner */}
          <motion.a
            href="https://dsaroadmap-mu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 mb-5 px-6 py-3 rounded-xl border text-sm font-bold transition-all group relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,107,0.15) 0%, rgba(255,140,66,0.15) 100%)',
              borderColor: 'rgba(255,107,107,0.5)',
              color: '#FF8C42',
              boxShadow: '0 0 30px rgba(255,107,107,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <span className="absolute inset-0 rounded-xl" style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              animation: 'shimmer 2.5s infinite',
            }} />
            <span className="text-lg relative z-10">🚀</span>
            <span className="relative z-10">Best DSA Prep?</span>
            <span className="underline underline-offset-2 decoration-[#FF6B6B]/60 group-hover:decoration-[#FF6B6B] relative z-10">
              Go here →
            </span>
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B6B]/25 text-[#FF6B6B] font-extrabold uppercase tracking-wider border border-[#FF6B6B]/30 relative z-10">
              Free
            </span>
            <span className="relative z-10 text-xs">✨</span>
          </motion.a>

          {/* Track Selector */}
          <div className="flex flex-wrap justify-center gap-2">
            {TRACKS.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleTrackChange(t.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  borderColor: activeTrack === t.id ? t.color : '#222',
                  background: activeTrack === t.id ? `${t.color}18` : 'transparent',
                  color: activeTrack === t.id ? t.color : '#666',
                }}
              >
                <span className="mr-1">{t.icon}</span>
                {t.label}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Tab Bar */}
      <nav className="border-b border-[#111] px-5">
        <div className="max-w-3xl mx-auto flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const TabIcon = TAB_CONFIG[tab].icon;
            const isActive = activeTab === tab && !showConn;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="flex items-center gap-1.5 px-4 py-3 text-[13px] whitespace-nowrap transition-all border-b-2"
                style={{
                  color: isActive ? color : '#555',
                  borderColor: isActive ? color : 'transparent',
                  fontWeight: isActive ? 700 : 400,
                  marginBottom: '-1px',
                }}
              >
                <TabIcon size={14} />
                {TAB_CONFIG[tab].label}
              </button>
            );
          })}
          <button
            onClick={() => setShowConn(!showConn)}
            className="flex items-center gap-1.5 px-4 py-3 text-[13px] whitespace-nowrap transition-all border-b-2 ml-auto"
            style={{
              color: showConn ? '#FF6B6B' : '#555',
              borderColor: showConn ? '#FF6B6B' : 'transparent',
              fontWeight: showConn ? 700 : 400,
              marginBottom: '-1px',
            }}
          >
            <Link size={14} />
            Connections
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="px-5 py-6">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {showConn && (
              <motion.div
                key="connections"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-base font-bold mb-3" style={{ color: '#FF6B6B' }}>
                  🔗 How Everything Connects
                </h2>
                <ConnectionMap color="#FF6B6B" />
              </motion.div>
            )}

            {!showConn && isWeb && (
              <motion.div
                key="web"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  🌐 Web Essentials
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  HTTP, REST, GraphQL, Webhooks, WebSockets, Auth, DNS, CDN, Docker, CI/CD — the entire modern web.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {WEB_CARDS.map((c, i) => (
                    <button
                      key={i}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border"
                      style={{ borderColor: '#222', color: '#666' }}
                    >
                      {c.category}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#555] mb-3.5">
                  Tap any card to expand the full explanation.
                </p>
                {WEB_CARDS.map((cat) =>
                  cat.cards.map((card, i) => (
                    <FlashCard key={`${cat.category}-${i}`} card={card} color={color} />
                  ))
                )}
              </motion.div>
            )}

            {!showConn && !isWeb && activeTab === 'roadmap' && data && (
              <motion.div
                key={`${activeTrack}-roadmap`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-5" style={{ color }}>
                  <span className="mr-2">{track.icon}</span>
                  {track.label} Learning Path
                </h2>
                {data.roadmap.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <RoadmapPhase phase={r.phase} topics={r.topics} color={color} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!showConn && !isWeb && activeTab === 'patterns' && data && (
              <motion.div
                key={`${activeTrack}-patterns`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  Key Patterns — {track.label}
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  Tap any pattern to see concept, code, and interview explanation.
                </p>
                {data.patterns.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <PatternCard p={p} color={color} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!showConn && !isWeb && activeTab === 'questions' && data && (
              <motion.div
                key={`${activeTrack}-questions`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-extrabold" style={{ color }}>
                    Interview Qs — {track.label}
                  </h2>
                  <span
                    className="text-[11px] px-2.5 py-1 rounded-full font-bold"
                    style={{ background: `${color}18`, color }}
                  >
                    {data.questions.length} Qs
                  </span>
                </div>
                <p className="text-xs text-[#555] mb-4">
                  Try answering out loud first, then reveal.
                </p>
                {data.questions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <QuestionCard item={item} i={i} color={color} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#0f0f0f] text-center py-5 text-[11px] tracking-wider text-[#2a2a2a] font-medium">
        JS · TS · React · Next.js · Backend · Web Essentials
      </footer>
    </div>
  );
}
