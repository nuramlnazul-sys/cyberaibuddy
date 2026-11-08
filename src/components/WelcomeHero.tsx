import React from 'react';
import { ArrowRight, ShieldCheck, Lock, AlertTriangle, Key, Sparkles, MessageSquare, Award, BookOpen } from 'lucide-react';
import { SUGGESTED_QUESTIONS, SAFETY_GOLDEN_RULES } from '../data/cyberKnowledge';

interface WelcomeHeroProps {
  onStartChat: (initialQuestion?: string) => void;
  onOpenQuiz: () => void;
  onOpenGlossary: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onStartChat,
  onOpenQuiz,
  onOpenGlossary,
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] pb-12 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-14 pb-12">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10 bg-gradient-to-tr from-blue-300 via-indigo-200 to-purple-300" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Greeting and Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Pembantu Pembelajaran Digital AI</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Selamat Datang ke{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block sm:inline">
                    CYBER AI BUDDY!
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Temui <strong className="text-slate-900 font-bold">Cikgu Amal</strong>, rakan digital anda untuk memahami keselamatan dan kerahsiaan data.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onStartChat()}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>MULA BERSEMBANG</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-base rounded-2xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>Cuba Kuiz Kilat</span>
                </button>
              </div>

              {/* Trust & Topic highlights */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-blue-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold">Privasi Data</span>
                  </div>
                  <p className="text-xs text-slate-500">Perlindungan PII & Maklumat Rahsia</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-purple-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold">Anti-Phishing</span>
                  </div>
                  <p className="text-xs text-slate-500">Kesan Taktik Penipuan & Pautan Palsu</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-indigo-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-bold">Kata Laluan & 2FA</span>
                  </div>
                  <p className="text-xs text-slate-500">Kunci Keselamatan Berlapis</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-emerald-100 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                    <Key className="w-4 h-4" />
                    <span className="text-xs font-bold">Etika AI</span>
                  </div>
                  <p className="text-xs text-slate-500">Penggunaan Pintar & Berhemah</p>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Mascot Robot Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative glowing gradient ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-lg opacity-40 animate-pulse" />

                <div className="relative bg-white rounded-3xl border border-blue-100/80 shadow-2xl overflow-hidden p-6 text-center">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-gradient-to-b from-blue-50 to-indigo-50/50 border border-blue-100 flex items-center justify-center">
                    <img
                      src="/src/assets/images/mascot_robot_cikgu_amal_1793877055796.jpg"
                      alt="Maskot Cikgu Amal - CYBER AI BUDDY"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-200 text-xs font-bold text-blue-700 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>Sedia Membantu!</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xl font-extrabold text-slate-900">
                        Cikgu Amal
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800">
                        Pakar Siber AI
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      "Hai murid-murid dan rakan digital! Tanya apa sahaja tentang keselamatan data, Cikgu sedia bimbing langkah demi langkah."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Quick Questions section on Home */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Cadangan Soalan Popular
              </h2>
              <p className="text-xs text-slate-500">
                Tekan mana-mana soalan di bawah untuk terus berbual bersama Cikgu Amal
              </p>
            </div>
            <button
              onClick={() => onStartChat()}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              Lihat Semua di Ruang Chat
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUGGESTED_QUESTIONS.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => onStartChat(item.question)}
                className="p-3.5 text-left rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/80 hover:border-blue-300 transition-all group flex items-start gap-3 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-500 block mb-0.5">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {item.question}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Golden Rules Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-300 tracking-wider uppercase">
                Panduan Penting Cikgu Amal
              </span>
              <h3 className="text-xl font-bold mt-1">5 Peraturan Emas Keselamatan Data</h3>
            </div>
            <button
              onClick={onOpenGlossary}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-colors self-start md:self-auto cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-300" />
              Kamus Istilah Digital
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SAFETY_GOLDEN_RULES.map((rule) => (
              <div
                key={rule.num}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/40 transition-colors"
              >
                <span className="text-xl font-extrabold text-blue-400 font-mono block mb-1">
                  {rule.num}
                </span>
                <h4 className="text-sm font-bold text-white mb-1.5">{rule.title}</h4>
                <p className="text-xs text-blue-200/80 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
