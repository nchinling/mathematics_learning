/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { cn } from '../lib/utils';
import { InlineMath } from 'react-katex';

interface PracticePanelProps {
  questions: Question[];
  onComplete?: () => void;
}

export function PracticePanel({ questions, onComplete }: PracticePanelProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Practice Complete!</h3>
        <p className="text-slate-500 mb-6">Great job. You got {score} out of {questions.length} questions correct.</p>
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Question {currentIdx + 1} of {questions.length}</span>
          <div className="flex gap-1">
             {questions.map((_, i) => (
               <div key={i} className={cn(
                 "w-4 h-1 rounded-full transition-all duration-300",
                 i === currentIdx ? "bg-blue-500 w-8" : i < currentIdx ? "bg-emerald-400" : "bg-slate-200"
               )} />
             ))}
          </div>
        </div>
        <div className="text-xl font-bold text-slate-800 leading-relaxed pt-2">
          <MathInText text={currentQuestion.text} />
        </div>
      </div>

      <div className="grid gap-4">
        {currentQuestion.options?.map((option, i) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = selectedOption === option;
          
          let variantClass = "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5";
          if (isSubmitted) {
            if (isCorrect) variantClass = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-500/20";
            else if (isSelected && !isCorrect) variantClass = "border-red-500 bg-red-50 text-red-700 shadow-sm ring-1 ring-red-500/20";
            else variantClass = "opacity-50 border-slate-200 bg-white";
          } else if (isSelected) {
            variantClass = "border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/10 shadow-sm";
          }

          return (
            <button
              key={i}
              disabled={isSubmitted}
              onClick={() => setSelectedOption(option)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group",
                variantClass
              )}
            >
              <div className="flex items-center gap-5">
                <span className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 border",
                  isSelected ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200" : "bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100"
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-semibold text-base tracking-tight"><InlineMath math={option.replace(/\$/g, '')} /></span>
              </div>
              {isSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-2" />}
              {isSubmitted && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 mr-2" />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-10 min-h-[120px]">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 mr-6"
            >
              <div className={cn(
                "p-5 rounded-2xl border overflow-hidden relative",
                selectedOption === currentQuestion.correctAnswer ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-red-50 border-red-100 text-red-800"
              )}>
                <div className="flex items-start gap-3">
                   <div className={cn(
                     "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                     selectedOption === currentQuestion.correctAnswer ? "bg-emerald-200 text-emerald-700" : "bg-red-200 text-red-700"
                   )}>
                     {selectedOption === currentQuestion.correctAnswer ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                   </div>
                   <div>
                      <p className="font-bold text-sm mb-1">
                        {selectedOption === currentQuestion.correctAnswer ? "Correct Strategy!" : "Common Misconception Detected"}
                      </p>
                      <div className="text-sm opacity-90 font-medium">
                        <MathInText text={currentQuestion.explanation} />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : <div className="flex-1" />}
        </AnimatePresence>

        <div className="flex gap-4 shrink-0">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all font-bold shadow-lg shadow-blue-200 active:scale-95"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-bold shadow-lg shadow-slate-200 active:scale-95"
            >
              {currentIdx < questions.length - 1 ? 'Next Problem' : 'Complete Set'}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MathInText({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <InlineMath key={i} math={part.slice(1, -1)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
