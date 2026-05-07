import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRACKS } from './data/tracks';
import { JS_DATA } from './data/js-data';
import { TS_DATA } from './data/ts-data';
import { REACT_DATA } from './data/react-data';
import { NEXTJS_DATA } from './data/nextjs-data';
import { BACKEND_DATA } from './data/backend-data';
import { WEB_CARDS } from './data/web-cards';
import { AI_ML_DATA } from './data/ai-ml-data';
import { INTERVIEW_DATA } from './data/interview-data';
import { LABS } from './data/labs-data';
import { MCQ_DATA } from './data/mcq-data';
import { TECH_DOCS } from './data/docs-data';
import { SYNTAX_DATA } from './data/syntax-data';

import RoadmapPhase from './components/RoadmapPhase';
import PatternCard from './components/PatternCard';
import QuestionCard from './components/QuestionCard';
import FlashCard from './components/FlashCard';
import ConnectionMap from './components/ConnectionMap';
import WebTrack from './components/WebTrack';
import InterviewSection from './components/InterviewSection';
import LabSection from './components/LabCard';
import MCQSection from './components/MCQCard';
import DocsSection from './components/DocsSection';
import SyntaxSection from './components/SyntaxSection';

import { MASTER_GUIDE } from './data/master-interview-guide';
import { DB_DATA, DB_COMPARISONS } from './data/db-data';
import { DESIGNER_DATA } from './data/designer-data';
import { FRONTEND_ARCHITECT_DATA } from './data/frontend-architect-data';
import { BACKEND_SENIOR_DATA } from './data/backend-senior-data';
import { FAANG_DATA, FAANG_QUICK_FIRE } from './data/faang-data';
import { MASTERY_PLAN } from './data/mastery-data';
import MasterGuideSection from './components/MasterGuideSection';
import ComparisonSection from './components/ComparisonSection';
import DesignerSection from './components/DesignerSection';
import MasterySection from './components/MasterySection';
import { Link, Map, BrainCircuit, Target, GraduationCap, Sparkles, Briefcase, Beaker, ClipboardCheck, BookOpen, Code2, Database, Shield, Palette, Cpu, Server, Star, Zap } from 'lucide-react';

const DATA = {
  js: JS_DATA,
  ts: TS_DATA,
  react: REACT_DATA,
  nextjs: NEXTJS_DATA,
  backend: BACKEND_DATA,
  aiml: AI_ML_DATA,
  master: MASTER_GUIDE,
  designer: DESIGNER_DATA,
  architect: FRONTEND_ARCHITECT_DATA,
  seniorBackend: BACKEND_SENIOR_DATA,
  faang: FAANG_DATA,
  mastery: MASTERY_PLAN,
};

const TAB_CONFIG = {
  roadmap: { icon: Map, label: 'Roadmap' },
  patterns: { icon: BrainCircuit, label: 'Patterns' },
  questions: { icon: Target, label: 'Interview Qs' },
  flashcards: { icon: GraduationCap, label: 'Flashcards' },
  interview: { icon: Briefcase, label: 'Resume Q&A' },
  labs: { icon: Beaker, label: 'Interactive Labs' },
  mcq: { icon: ClipboardCheck, label: 'Practice MCQs' },
  docs: { icon: BookOpen, label: 'Tech Docs' },
  syntax: { icon: Code2, label: 'Syntax' },
  guide: { icon: Shield, label: 'Master Prep' },
  comparisons: { icon: Database, label: 'DB Deep-Dive' },
  designer: { icon: Palette, label: 'Designer Prep' },
  architect: { icon: Cpu, label: 'Architect Prep' },
  seniorBackend: { icon: Server, label: 'Senior Backend' },
  faang: { icon: Star, label: 'FAANG Master' },
  mastery: { icon: Zap, label: 'Mastery Sprint' },
};

export default function App() {
  const [activeTrack, setActiveTrack] = useState('js');
  const [activeTab, setActiveTab] = useState('roadmap');
  const [showConn, setShowConn] = useState(false);

  const track = TRACKS.find((t) => t.id === activeTrack);
  const data = DATA[activeTrack];
  const color = track.color;
  
  const isWeb = activeTrack === 'web';
  const isInterview = activeTrack === 'interview';
  const isLabs = activeTrack === 'labs';
  const isPractice = activeTrack === 'practice';
  const isDocs = activeTrack === 'docs';
  const isMaster = activeTrack === 'master';
  const isDB = activeTrack === 'db';
  const isDesigner = activeTrack === 'designer';
  const isArchitect = activeTrack === 'architect';
  const isSeniorBackend = activeTrack === 'seniorBackend';
  const isFAANG = activeTrack === 'faang';
  const isMastery = activeTrack === 'mastery';

  const getTabs = () => {
    if (isWeb) return ['flashcards'];
    if (isInterview) return ['interview'];
    if (isLabs) return ['labs'];
    if (isPractice) return ['mcq'];
    if (isDocs) return ['docs'];
    if (isMaster) return ['guide'];
    if (isDB) return ['comparisons', 'docs'];
    if (isDesigner) return ['designer'];
    if (isArchitect) return ['architect'];
    if (isSeniorBackend) return ['seniorBackend'];
    if (isFAANG) return ['guide', 'questions'];
    if (isMastery) return ['mastery'];
    return ['roadmap', 'patterns', 'questions', 'syntax'];
  };

  const tabs = getTabs();

  const handleTrackChange = (trackId) => {
    setActiveTrack(trackId);
    if (trackId === 'web') setActiveTab('flashcards');
    else if (trackId === 'interview') setActiveTab('interview');
    else if (trackId === 'labs') setActiveTab('labs');
    else if (trackId === 'practice') setActiveTab('mcq');
    else if (trackId === 'docs') setActiveTab('docs');
    else if (trackId === 'master') setActiveTab('guide');
    else if (trackId === 'db') setActiveTab('comparisons');
    else if (trackId === 'designer') setActiveTab('designer');
    else if (trackId === 'architect') setActiveTab('architect');
    else if (trackId === 'seniorBackend') setActiveTab('seniorBackend');
    else if (trackId === 'faang') setActiveTab('guide');
    else if (trackId === 'mastery') setActiveTab('mastery');
    else setActiveTab('roadmap');
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
            Full Stack Developer Interview Hub
          </div>
          <h1
            className="text-[26px] md:text-[32px] font-extrabold font-display mb-1"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Ultimate Guide
          </h1>
          <p className="text-xs text-[#555] mb-4">
            Labs · Patterns · Interview Q&A · Syntax · MCQs · Real Experience
          </p>

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
                <WebTrack color={color} />
              </motion.div>
            )}

             {!showConn && isInterview && (
              <motion.div
                key="interview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  💼 Resume-Based Interview Prep
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  Deep-dive questions based on your specific projects at Takkada, HCLTech, and Adaapt.ai.
                </p>
                <InterviewSection data={INTERVIEW_DATA} color={color} />
              </motion.div>
            )}

            {!showConn && isLabs && (
              <motion.div
                key="labs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  🧪 Interactive Technology Labs
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  Hands-on walkthroughs for the most critical technologies in your stack.
                </p>
                <LabSection labs={LABS} color={color} />
              </motion.div>
            )}

            {!showConn && isPractice && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  🎯 Practice MCQs
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  Test your knowledge with these real-world interview style multiple choice questions.
                </p>
                <MCQSection data={MCQ_DATA} color={color} />
              </motion.div>
            )}

            {!showConn && isDocs && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  📚 Tech Reading Room
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  Quick high-level summaries of the core concepts you'll need for any interview.
                </p>
                <DocsSection data={TECH_DOCS} color={color} />
              </motion.div>
            )}

            {!showConn && isMaster && (
              <motion.div
                key="master"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MasterGuideSection guide={MASTER_GUIDE} color={color} />
              </motion.div>
            )}

            {!showConn && isDB && (
              <motion.div
                key="db"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'comparisons' ? (
                  <>
                    <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                      🗄️ Database Deep-Dive
                    </h2>
                    <p className="text-xs text-[#555] mb-5">
                      Expert analysis of the trade-offs between SQL, NoSQL, and Reactive backends.
                    </p>
                    <ComparisonSection comparisons={DB_COMPARISONS} color={color} />
                  </>
                ) : (
                  <DocsSection data={TECH_DOCS.filter(d => ['PostgreSQL', 'MongoDB', 'Supabase', 'Convex', 'Redis'].includes(d.title))} color={color} />
                )}
              </motion.div>
            )}

            {!showConn && isDesigner && (
              <motion.div
                key="designer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DesignerSection data={DESIGNER_DATA} color={color} />
              </motion.div>
            )}

            {!showConn && isArchitect && (
              <motion.div
                key="architect"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MasterGuideSection guide={FRONTEND_ARCHITECT_DATA} color={color} />
              </motion.div>
            )}

            {!showConn && isSeniorBackend && (
              <motion.div
                key="seniorBackend"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MasterGuideSection guide={BACKEND_SENIOR_DATA} color={color} />
              </motion.div>
            )}

            {!showConn && isFAANG && (
              <motion.div
                key="faang"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'guide' ? (
                  <MasterGuideSection guide={FAANG_DATA} color={color} />
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                      🌟 FAANG Quick-Fire Q&A
                    </h2>
                    <p className="text-xs text-[#555] mb-5">
                      50+ essential questions covering System Design, Algorithms, and Core CS.
                    </p>
                    {FAANG_QUICK_FIRE.map((item, i) => (
                      <QuestionCard key={i} item={item} i={i} color={color} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {!showConn && isMastery && (
              <motion.div
                key="mastery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MasterySection plan={MASTERY_PLAN} color={color} />
              </motion.div>
            )}

            {!showConn && !isWeb && !isInterview && !isLabs && !isPractice && !isDocs && !isMaster && !isDB && !isDesigner && !isArchitect && !isSeniorBackend && !isFAANG && !isMastery && activeTab === 'roadmap' && data && (
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

            {!showConn && !isWeb && !isInterview && !isLabs && !isPractice && !isDocs && !isMaster && !isDB && !isDesigner && !isArchitect && !isSeniorBackend && !isFAANG && !isMastery && activeTab === 'patterns' && data && (
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

            {!showConn && !isWeb && !isInterview && !isLabs && !isPractice && !isDocs && !isMaster && !isDB && !isDesigner && !isArchitect && !isSeniorBackend && !isFAANG && !isMastery && activeTab === 'questions' && data && (
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

            {!showConn && activeTab === 'syntax' && (
              <motion.div
                key={`${activeTrack}-syntax`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-extrabold mb-1" style={{ color }}>
                  {track.icon} Syntax Cheat Sheet
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  Quick reference for the most important {track.label} syntax.
                </p>
                <SyntaxSection data={SYNTAX_DATA[activeTrack]} color={color} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#0f0f0f] text-center py-5 text-[11px] tracking-wider text-[#2a2a2a] font-medium">
        JS · TS · React · Next.js · Backend · AI/ML · Web Essentials
      </footer>
    </div>
  );
}
