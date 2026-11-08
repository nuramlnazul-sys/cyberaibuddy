import React, { useState } from 'react';
import { Sparkles, MessageCircleQuestion, ChevronUp, ChevronDown, EyeOff, Lightbulb } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../data/cyberKnowledge';

interface QuickQuestionsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export const QuickQuestions: React.FC<QuickQuestionsProps> = ({
  onSelectQuestion,
  disabled,
  isOpen,
  onToggle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Asas', 'Ancaman', 'Perlindungan', 'Media Sosial', 'AI & Etika'];

  const filteredQuestions =
    selectedCategory === 'Semua'
      ? SUGGESTED_QUESTIONS
      : SUGGESTED_QUESTIONS.filter((q) => q.category === selectedCategory);

  if (!isOpen) {
    return (
      <div className="flex items-center justify-between py-1 px-1">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 border border-blue-200/80 text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer group"
          title="Buka cadangan soalan siber"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
          <span>Cadangan Soalan (6 soalan)</span>
          <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
        </button>

        <span className="text-[11px] text-slate-500 hidden sm:inline">
          💡 Cadangan disembunyikan untuk ruang sembang yang lebih luas
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/95 to-blue-50/60 backdrop-blur-md rounded-2xl border border-blue-200/80 p-3 sm:p-4 shadow-sm space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Header bar with Hide button */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-blue-100/70">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-slate-800">
              Cadangan Soalan Pantas
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline ml-2">
              (Tekan soalan untuk terus hantar)
            </span>
          </div>
        </div>

        {/* Hide / Sembunyikan Button */}
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs active:scale-95"
          title="Sembunyikan bahagian ini supaya ruang perbualan lebih luas"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Sembunyikan</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs scale-102'
                : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Question Pills */}
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
        {filteredQuestions.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectQuestion(item.question)}
            className="text-left text-xs font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-blue-100 hover:border-blue-600 shadow-2xs transition-all active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 group"
          >
            <Sparkles className="w-3 h-3 text-blue-500 group-hover:text-white group-hover:scale-110 transition-transform shrink-0" />
            <span>{item.question}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
