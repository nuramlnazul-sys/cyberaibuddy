import React from 'react';
import { Bot, MessageSquare, Award, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { BackgroundMusicPlayer } from './BackgroundMusicPlayer';

interface HeaderProps {
  currentTab: 'chat' | 'home' | 'quiz' | 'glossary';
  onSelectTab: (tab: 'chat' | 'home' | 'quiz' | 'glossary') => void;
  onNewChat: () => void;
  isChatActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onNewChat,
  isChatActive,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
              <img
                src="/src/assets/images/mascot_robot_cikgu_amal_1793877055796.jpg"
                alt="Maskot Cikgu Amal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
            </span>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent block leading-tight">
              CYBER AI BUDDY
            </span>
            <span className="text-xs font-semibold text-slate-700 hidden sm:block">
              Bersama Cikgu Amal 🤖
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => onSelectTab('chat')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              currentTab === 'chat'
                ? 'bg-blue-50 text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Ruang Chat
          </button>

          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              currentTab === 'quiz'
                ? 'bg-purple-50 text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4" />
            Kuiz Kilat Siber
          </button>

          <button
            onClick={() => onSelectTab('glossary')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              currentTab === 'glossary'
                ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Kamus Istilah
          </button>
        </nav>

        {/* Zone 3: Primary Action & Background Music Controller */}
        <div className="flex items-center gap-2.5 shrink-0">
          <BackgroundMusicPlayer />

          {currentTab === 'chat' && isChatActive ? (
            <button
              onClick={onNewChat}
              className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-sm shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Mulakan sesi perbualan baharu bersama Cikgu Amal"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Perbualan Baharu</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('chat')}
              className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg hover:opacity-95 shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Bot className="w-4 h-4" />
              <span>Mula Sembang</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
