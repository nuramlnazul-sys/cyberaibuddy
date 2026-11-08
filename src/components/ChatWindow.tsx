import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, RotateCcw, Sparkles, Mic, MicOff, AlertCircle, Bot, Lightbulb, ChevronUp, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../types/chat';
import { ChatMessageBubble } from './ChatMessageBubble';
import { QuickQuestions } from './QuickQuestions';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  onClearChat: () => void;
  onNewChat: () => void;
  isLoading: boolean;
  error: string | null;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  onNewChat,
  isLoading,
  error,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showQuestions, setShowQuestions] = useState<boolean>(() => {
    // If messages length > 2, default to collapsed so it doesn't distract the chat, or keep user preference
    const saved = localStorage.getItem('cyber_buddy_show_questions');
    return saved !== null ? saved === 'true' : true;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const toggleQuestions = () => {
    setShowQuestions((prev) => {
      const next = !prev;
      localStorage.setItem('cyber_buddy_show_questions', String(next));
      return next;
    });
  };

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showQuestions]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Web Speech Recognition for voice dictation
  const handleToggleVoice = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Pengecaman suara tidak disokong oleh pelayar web anda.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ms-MY';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    setInputText('');
    await onSendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 flex flex-col h-[calc(100vh-4.5rem)]">
      {/* Modern 3D Cartoon AI Header Strip */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl border border-blue-200/80 p-3 sm:p-4 mb-3 shadow-md shadow-blue-500/5 flex items-center justify-between gap-3 shrink-0 overflow-hidden">
        {/* Ambient subtle tech background light */}
        <div className="absolute top-0 right-1/4 w-60 h-20 bg-gradient-to-r from-blue-300/30 to-purple-300/20 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3">
          {/* 3D Mascot Avatar */}
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-md shadow-blue-500/20 shrink-0">
            <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center">
              <img
                src="/src/assets/images/mascot_robot_cikgu_amal_1793877055796.jpg"
                alt="Maskot Cikgu Amal 3D"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                Cikgu Amal
              </h2>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xs">
                3D AI Buddy
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Pakar Pembelajaran Keselamatan & Kerahsiaan Data Digital
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Toggle Suggested Questions button */}
          <button
            type="button"
            onClick={toggleQuestions}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              showQuestions
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title={showQuestions ? 'Sembunyikan Cadangan Soalan' : 'Tunjukkan Cadangan Soalan'}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">
              {showQuestions ? 'Sembunyikan Cadangan' : 'Cadangan Soalan'}
            </span>
            {showQuestions ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onNewChat}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm shadow-blue-500/20 active:scale-95 cursor-pointer"
            title="Mulakan topik perbualan baharu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Perbualan Baharu</span>
          </button>

          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
            title="Padam semua perbualan"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Padam</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Clearing Chat */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Padam Semua Perbualan?
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Semua mesej bersama Cikgu Amal akan dipadamkan dari skrin. Tindakan ini tidak boleh diundur.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearChat();
                  setShowClearConfirm(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Ya, Padamkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Chat Messages Scroll View with subtle cyber pattern */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 sm:px-2 pb-4 scroll-smooth rounded-2xl bg-gradient-to-b from-blue-50/20 via-white to-purple-50/20 border border-blue-100/50 p-2 sm:p-4">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}

        {/* 3D Cartoon AI Thinking State */}
        {isLoading && (
          <div className="flex justify-start gap-3 items-center animate-in fade-in duration-200">
            {/* 3D Cartoon Thinking Mascot Image */}
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-purple-300 shadow-lg shadow-purple-500/20 shrink-0 bg-white">
              <img
                src="/src/assets/images/cikgu_amal_cartoon_thinking_1793879268235.jpg"
                alt="Cikgu Amal Sedang Berfikir"
                className="w-full h-full object-cover animate-pulse"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-2xl rounded-tl-xs px-4 py-3 border border-purple-200 shadow-sm flex items-center gap-2.5 text-xs font-bold text-purple-900">
              <span className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span>Cikgu Amal sedang menganalisis soalan & menyusun penerangan... 🤖✨</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Area: Collapsible Quick Questions & 3D Capsule Chat Input */}
      <div className="pt-2 shrink-0 space-y-2">
        {/* Quick Questions component with Hide/Show capability */}
        <QuickQuestions
          onSelectQuestion={(q) => onSendMessage(q)}
          disabled={isLoading}
          isOpen={showQuestions}
          onToggle={toggleQuestions}
        />

        {/* Modern 3D Floating Capsule Input Bar */}
        <form
          onSubmit={handleSend}
          className="relative bg-white/95 backdrop-blur-md rounded-3xl border-2 border-blue-300 hover:border-blue-500 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100 transition-all shadow-lg shadow-blue-500/5 p-2 flex items-end gap-2"
        >
          {/* Quick toggle icon for suggestions inside input bar */}
          <button
            type="button"
            onClick={toggleQuestions}
            className={`p-2 rounded-2xl transition-all cursor-pointer shrink-0 ${
              showQuestions
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 hover:bg-blue-50 text-slate-500 hover:text-blue-600'
            }`}
            title={showQuestions ? 'Sembunyikan Cadangan Soalan' : 'Buka Cadangan Soalan'}
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </button>

          {/* Text input area */}
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanya Cikgu Amal tentang keselamatan data, phishing, atau kata laluan..."
              disabled={isLoading}
              className="w-full resize-none max-h-32 bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none px-2 py-1 leading-relaxed"
            />
          </div>

          {/* Controls: Voice & Send */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Voice Dictation */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={isListening ? 'Hentikan pengecaman suara' : 'Bercakap melalui mikrofon'}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4 text-blue-600" />
              )}
            </button>

            {/* 3D Gradient Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:opacity-95 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-500/25 cursor-pointer"
            >
              <span>Hantar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-2">
          <span>Tekan <strong>Enter</strong> untuk hantar · <strong>Shift + Enter</strong> untuk baris baru</span>
          <span className="font-bold text-blue-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-600" />
            CYBER AI BUDDY 3D
          </span>
        </div>
      </div>
    </div>
  );
};
