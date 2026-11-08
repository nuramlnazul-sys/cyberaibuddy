import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Volume2, VolumeX, User, Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types/chat';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = message.text
      .replace(/[#*_`~>-]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ms-MY';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const malayVoice = voices.find(
      (v) => v.lang.startsWith('ms') || v.lang.startsWith('id')
    );
    if (malayVoice) {
      utterance.voice = malayVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3 items-end pl-8 animate-in fade-in slide-in-from-bottom-1 duration-200">
        <div className="flex flex-col items-end max-w-xl">
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl rounded-br-xs px-5 py-3.5 shadow-lg shadow-indigo-500/20 text-sm sm:text-base leading-relaxed border border-white/20">
            <p className="whitespace-pre-wrap font-medium">{message.text}</p>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 px-1 font-medium">
            {message.timestamp}
          </span>
        </div>
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-300 border-2 border-white flex items-center justify-center text-slate-700 shrink-0 shadow-md mb-4">
          <User className="w-4 h-4 text-slate-700" />
        </div>
      </div>
    );
  }

  const isGreetingMessage = message.id === 'msg_welcome' || message.id.startsWith('msg_welcome');

  return (
    <div className="flex justify-start gap-3 items-start pr-2 sm:pr-8 animate-in fade-in slide-in-from-bottom-1 duration-200">
      {/* 3D Cartoon AI Avatar */}
      <div className="relative group shrink-0 mt-0.5">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center">
            <img
              src="/src/assets/images/mascot_robot_cikgu_amal_1793877055796.jpg"
              alt="Cikgu Amal 3D Cartoon Robot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs" />
      </div>

      {/* Modern 3D Chat Bubble */}
      <div className="flex-1 max-w-3xl">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
            Cikgu Amal
            <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold">
              3D AI
            </span>
          </span>
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-full">
            Pakar Keselamatan Digital
          </span>
          <span className="text-[11px] text-slate-500 ml-auto">
            {message.timestamp}
          </span>
        </div>

        {/* Bubble Body with Modern Glassmorphism & Cyber Accents */}
        <div className="relative bg-white/95 backdrop-blur-md rounded-3xl rounded-tl-xs p-5 sm:p-6 border border-blue-100 shadow-md shadow-blue-500/5 text-slate-800 text-sm sm:text-base leading-relaxed space-y-3">
          {/* Decorative 3D Cartoon AI Sticker on Welcome Message */}
          {isGreetingMessage && (
            <div className="mb-3 p-3 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/70 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-white">
                <img
                  src="/src/assets/images/cikgu_amal_cartoon_thumbsup_1793879269218.jpg"
                  alt="Cikgu Amal Thumbs Up 3D Mascot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-900 block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Rakan Pembelajaran Pintar Anda
                </span>
                <p className="text-[11px] text-slate-600">
                  Cikgu Amal sedia memberi jawapan interaktif, contoh nyata dan tip keselamatan data!
                </p>
              </div>
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-headings:tracking-tight prose-h3:text-base sm:prose-h3:text-lg prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-strong:text-indigo-900 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/70 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>

          {/* Action Toolbar on response */}
          <div className="pt-3 mt-3 border-t border-slate-100/90 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
              <Bot className="w-3.5 h-3.5 text-blue-600" />
              <span>CYBER AI BUDDY</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Text-to-Speech button with audio animation */}
              <button
                type="button"
                onClick={handleSpeak}
                className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSpeaking
                    ? 'bg-blue-100 text-blue-700 border-blue-300 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title={isSpeaking ? 'Hentikan Suara' : 'Dengar Cikgu Amal membaca jawapan ini'}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] font-bold text-blue-700">Berhenti</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline text-[11px] font-bold">Dengar Jawapan</span>
                  </>
                )}
              </button>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Salin teks jawapan"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px] font-bold">Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
