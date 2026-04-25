/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  MessageSquare, 
  PenTool, 
  ChevronLeft, 
  Menu,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Shapes
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS } from './data/topics';
import { Topic, TopicId } from './types';
import { cn } from './lib/utils';
import { PracticePanel } from './components/PracticePanel';
import { AITutor } from './components/AITutor';
import { TrigWidget } from './components/TrigWidget';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';

export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic>(TOPICS[0]);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="bg-slate-900 flex flex-col z-20 border-r border-slate-800"
      >
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
          {isSidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">Σ</span>
              </div>
              <h1 className="text-white font-bold text-lg tracking-tight italic">EduPrime Math</h1>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-800 rounded-md transition-colors text-slate-500"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar">
          {/* Categories */}
          {['Algebra', 'Geometry', 'Trigonometry'].map((category) => (
            <div key={category} className="space-y-1">
              {isSidebarOpen && (
                <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  {category}
                </h3>
              )}
              {TOPICS.filter(t => t.category === category).map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-left",
                    activeTopic.id === topic.id 
                      ? "bg-blue-600/10 text-blue-400 font-medium" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <div className={cn(
                    "p-1 rounded-md transition-colors",
                    activeTopic.id === topic.id ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  )}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  {isSidebarOpen && <span className="truncate text-sm">{topic.title}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 bg-slate-800/50 m-4 rounded-xl">
           {isSidebarOpen ? (
             <>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Daily Goal</div>
                <div className="h-2 bg-slate-700 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '65%' }} />
                </div>
                <p className="text-xs text-slate-400">13 / 20 XP earned</p>
             </>
           ) : (
             <div className="flex justify-center">
               <div className="w-1.5 h-8 bg-slate-700 rounded-full overflow-hidden">
                 <div className="w-full h-2/3 bg-emerald-500 rounded-full" />
               </div>
             </div>
           )}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Secondary 3 Express Syllabus</div>
            <h2 className="text-xl font-bold text-slate-800">{mode === 'learn' ? 'Learning Module' : 'Practice Session'}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setMode('learn')}
                className={cn(
                  "px-5 py-1.5 rounded-lg text-sm font-bold transition-all duration-200",
                  mode === 'learn' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                )}
              >
                Learn
              </button>
              <button
                onClick={() => setMode('practice')}
                className={cn(
                  "px-5 py-1.5 rounded-lg text-sm font-bold transition-all duration-200",
                  mode === 'practice' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                )}
              >
                Practice
              </button>
            </div>
            
            <div className="h-8 w-px bg-slate-200" />

            <button 
               onClick={() => setIsTutorOpen(!isTutorOpen)}
               className={cn(
                 "p-2 rounded-xl border transition-all duration-200 relative group flex items-center gap-2",
                 isTutorOpen ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
               )}
            >
              <BrainCircuit className="w-5 h-5" />
              {isTutorOpen && <span className="text-sm font-bold pr-1">AI Tutor</span>}
              {!isTutorOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse" />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
          <div className="max-w-5xl mx-auto py-8 px-8">
            <AnimatePresence mode="wait">
              {mode === 'learn' ? (
                <motion.div
                  key="learn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Topic Banner */}
                  <div className="bg-indigo-600 rounded-2xl p-8 text-white flex justify-between items-center shadow-xl shadow-indigo-100/50 relative overflow-hidden">
                    <div className="max-w-lg relative z-10">
                       <div className="bg-indigo-500 text-[10px] font-bold uppercase py-1 px-2 rounded w-max mb-4 tracking-wider">Current Topic</div>
                       <h3 className="text-4xl font-bold mb-3 tracking-tight">{activeTopic.title}</h3>
                       <p className="text-indigo-100 text-lg leading-relaxed">{activeTopic.description}</p>
                    </div>
                    <div className="hidden lg:block opacity-20 transform scale-150 rotate-12 relative z-0">
                       {activeTopic.category === 'Trigonometry' ? <TrendingUp className="w-32 h-32" /> : <PenTool className="w-32 h-32" />}
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {activeTopic.concepts.map((concept, i) => (
                      <section key={concept.id} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-200">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
                            {i + 1}
                          </div>
                          <h4 className="text-xl font-bold text-slate-800">{concept.title}</h4>
                        </div>
                        <div className="markdown-body prose-slate max-w-none">
                          <Markdown components={{
                            code({node, inline, className, children, ...props}: any) {
                              const content = String(children).replace(/\n$/, '');
                              if (content.startsWith('$') && content.endsWith('$')) {
                                const math = content.slice(1, -1);
                                return inline ? <InlineMath math={math} /> : <BlockMath math={math} />;
                              }
                              return <code className={className} {...props}>{children}</code>;
                            }
                          }}>
                            {concept.content.replace(/\$([^$]+)\$/g, (match, p1) => `\`$${p1}$\``)}
                          </Markdown>
                        </div>
                        {activeTopic.id === 'trigonometry' && concept.id === 'soh-cah-toa' && (
                          <div className="mt-8 border-t border-slate-100 pt-8">
                            <TrigWidget />
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="practice"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <PracticePanel questions={activeTopic.questions} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* AI Tutor Drawer/Panel */}
      <motion.aside
        initial={false}
        animate={{ width: isTutorOpen ? 400 : 0 }}
        className="overflow-hidden border-l border-slate-200 bg-white z-30"
      >
        <div className="w-[400px] h-full">
          <AITutor context={activeTopic.title + ": " + activeTopic.description} />
        </div>
      </motion.aside>
    </div>
  );
}
