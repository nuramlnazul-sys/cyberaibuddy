import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/cyberKnowledge';

interface CyberQuizModalProps {
  onAskCikguAmal: (question: string) => void;
  onClose: () => void;
}

export const CyberQuizModal: React.FC<CyberQuizModalProps> = ({
  onAskCikguAmal,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.jawapanBetul) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Quiz Card */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
        {/* Quiz Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                Cabaran Kesedaran Siber
              </span>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white/10 rounded-full border border-white/20">
              Soalan {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
            Kuiz Kilat Siber Cikgu Amal 🎯
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            Uji pengetahuan anda tentang keselamatan data, phishing, dan perlindungan privasi.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-yellow-400 h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + (isFinished ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {!isFinished ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Situasi Keselamatan Siber
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {currentQ.soalan}
                </h3>
              </div>

              {/* Option choices */}
              <div className="space-y-3">
                {currentQ.pilihan.map((pilihan, idx) => {
                  let buttonStyle = 'bg-slate-50 hover:bg-blue-50/80 border-slate-200 text-slate-800';

                  if (isAnswered) {
                    if (idx === currentQ.jawapanBetul) {
                      buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-200';
                    } else if (idx === selectedOption) {
                      buttonStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                    } else {
                      buttonStyle = 'opacity-40 bg-slate-50 border-slate-200 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 text-left rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${buttonStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base flex-1">{pilihan}</span>
                      {isAnswered && idx === currentQ.jawapanBetul && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.jawapanBetul && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Ulasan Cikgu Amal:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
                    {currentQ.penerangan}
                  </p>
                </div>
              )}

              {/* Footer navigation */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onAskCikguAmal(`Cikgu, boleh terangkan lebih lanjut tentang soalan ini: "${currentQ.soalan}"?`)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Tanya Cikgu Amal dalam Chat
                </button>

                {isAnswered && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl hover:opacity-95 shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Soalan Seterusnya' : 'Lihat Keputusan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <ShieldCheck className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Tahniah! Anda Selesai Menjawab
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Skor anda: <strong className="text-indigo-600 text-lg">{score}</strong> daripada {QUIZ_QUESTIONS.length} betul!
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {score >= 4
                    ? '🌟 Luar biasa! Anda mempunyai kesedaran keselamatan siber yang sangat mantap.'
                    : '💡 Teruskan belajar! Anda sentiasa boleh bertanya Cikgu Amal untuk memahami konsep dengan lebih mendalam.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ulang Semula Kuiz
                </button>

                <button
                  type="button"
                  onClick={() => onAskCikguAmal('Cikgu Amal, saya baru selesai kuiz siber. Boleh kongsikan 3 tip paling penting untuk mengelakkan penipuan siber hari ini?')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Bincang Bersama Cikgu Amal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
