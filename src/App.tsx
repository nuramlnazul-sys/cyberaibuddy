/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeHero } from './components/WelcomeHero';
import { ChatWindow } from './components/ChatWindow';
import { CyberQuizModal } from './components/CyberQuizModal';
import { CyberGlossaryModal } from './components/CyberGlossaryModal';
import { ChatMessage } from './types/chat';
import { getCikguAmalKnowledgeAnswer } from './data/cyberKnowledge';

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'msg_welcome',
  sender: 'bot',
  text: `Salam sejahtera dan selamat datang! Saya **Cikgu Amal**, rakan digital anda di **CYBER AI BUDDY**! 🤖✨

Peranan Cikgu adalah untuk membimbing anda memahami dan mengamalkan:
- 🛡️ **Keselamatan & Kerahsiaan Data Digital**
- 🎣 **Mengenal Pasti Ancaman Phishing & Scam Siber**
- 🔐 **Penciptaan Kata Laluan Kuat & Pengesahan Dua Faktor (2FA)**
- 📱 **Privasi Media Sosial & Pengawalan Jejak Digital**
- 🤖 **Etika Selamat Menggunakan Kecerdasan Buatan (AI)**

Ada sebarang topik yang ingin anda pelajari hari ini? Sila pilih mana-mana soalan pantas di bawah atau taip soalan anda sendiri!`,
  timestamp: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'chat' | 'quiz' | 'glossary'>('home');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_buddy_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [INITIAL_BOT_MESSAGE];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save messages to local storage
  useEffect(() => {
    try {
      localStorage.setItem('cyber_buddy_messages', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  // Gentle audio chime for AI response
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.18); // G5
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio playback fails silently if user has not interacted
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let botReplyText = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) {
          botReplyText = data.reply;
        }
      } else {
        // Pelayan mengembalikan ralat (contoh: 404 pada hos statik seperti GitHub Pages di mana tiada pelayan backend Express)
        console.warn(`Pelayan mengembalikan status ${res.status}. Mengaktifkan enjin pengetahuan siber sandaran Cikgu Amal.`);
      }
    } catch (networkError) {
      // Rangkaian gagal atau hos statik tanpa endpoint /api/chat
      console.warn('Pelayan backend tidak dapat dihubungi secara langsung. Mengaktifkan enjin pengetahuan siber sandaran Cikgu Amal.');
    }

    // Jika jawapan daripada pelayan backend tidak diperolehi (cth: diakses di GitHub Pages):
    if (!botReplyText) {
      const offlineAnswer = getCikguAmalKnowledgeAnswer(text);
      const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
      const footnote = isGitHubPages
        ? '\n\n*(Nota: Aplikasi ini sedang dilayari melalui hos statik GitHub Pages tanpa pelayan backend. Cikgu Amal menjawab secara selamat menggunakan pangkalan pengetahuan siber terbina.)*'
        : '';
      botReplyText = `${offlineAnswer}${footnote}`;
    }

    const botMsg: ChatMessage = {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: botReplyText,
      timestamp: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, botMsg]);
    playChime();
    setIsLoading(false);
  };

  const handleClearChat = () => {
    const fresh: ChatMessage[] = [
      {
        ...INITIAL_BOT_MESSAGE,
        id: `msg_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(fresh);
    setError(null);
  };

  const handleNewChat = () => {
    handleClearChat();
    setCurrentTab('chat');
  };

  const handleStartChatFromHome = (initialQuestion?: string) => {
    setCurrentTab('chat');
    if (initialQuestion) {
      setTimeout(() => {
        handleSendMessage(initialQuestion);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-200 selection:text-blue-900">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNewChat={handleNewChat}
        isChatActive={messages.length > 1}
      />

      <main className="flex-1">
        {currentTab === 'home' && (
          <WelcomeHero
            onStartChat={handleStartChatFromHome}
            onOpenQuiz={() => setCurrentTab('quiz')}
            onOpenGlossary={() => setCurrentTab('glossary')}
          />
        )}

        {currentTab === 'chat' && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            onNewChat={handleNewChat}
            isLoading={isLoading}
            error={error}
          />
        )}

        {currentTab === 'quiz' && (
          <CyberQuizModal
            onAskCikguAmal={(q) => handleStartChatFromHome(q)}
            onClose={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'glossary' && (
          <CyberGlossaryModal
            onAskTerm={(q) => handleStartChatFromHome(q)}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} <strong>CYBER AI BUDDY</strong> · Rakan Pembelajaran Keselamatan & Kerahsiaan Data Digital
          </p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Dibimbing oleh <strong>Cikgu Amal</strong></span>
            <span>·</span>
            <span>Bahasa Melayu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
