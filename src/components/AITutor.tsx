/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getTutorFeedback } from '../services/geminiService';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface AITutorProps {
  context: string;
}

export function AITutor({ context }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm your Merlion Math Tutor. How can I help you with your math today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const feedback = await getTutorFeedback(userMsg, context);
    setMessages(prev => [...prev, { role: 'bot', content: feedback }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">AI Study Assistant</h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Expert Mode Active</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
              msg.role === 'user' ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-blue-600 shadow-sm"
            )}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={cn(
              "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
            )}>
              <div className="markdown-body prose-sm !text-inherit">
                 <Markdown components={{
                   code({node, inline, className, children, ...props}: any) {
                     const match = /language-(\w+)/.exec(className || '');
                     const content = String(children).replace(/\n$/, '');
                     if (content.startsWith('$') && content.endsWith('$')) {
                       const math = content.slice(1, -1);
                       return inline ? <InlineMath math={math} /> : <BlockMath math={math} />;
                     }
                     return <code className={className} {...props}>{children}</code>;
                   }
                 }}>
                   {msg.content.replace(/\$([^$]+)\$/g, (match, p1) => `\`$${p1}$\``)}
                 </Markdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask a clarifying question..."
            className="flex-1 px-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-blue-500 transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
