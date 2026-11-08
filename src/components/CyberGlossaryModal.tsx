import React, { useState } from 'react';
import { Search, BookOpen, MessageSquare, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/cyberKnowledge';

interface CyberGlossaryModalProps {
  onAskTerm: (term: string) => void;
}

export const CyberGlossaryModal: React.FC<CyberGlossaryModalProps> = ({ onAskTerm }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Ancaman', 'Perlindungan', 'Media Sosial'];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'Semua' || item.kategori === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.term.toLowerCase().includes(query) ||
      item.istilahMelayu.toLowerCase().includes(query) ||
      item.definisi.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-indigo-100 p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kamus Istilah Siber & Data</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Glosari Keselamatan & Kerahsiaan Data Digital
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Fahami istilah teknikal penting dengan padanan Bahasa Melayu yang ringkas, contoh situasi harian dan tip pencegahan daripada Cikgu Amal.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah siber (cth: Phishing, 2FA, Enkripsi, Jejak Digital)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm outline-none bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item) => (
          <div
            key={item.term}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {item.term}
                  </h3>
                  <span className="text-xs font-semibold text-indigo-700">
                    ({item.istilahMelayu})
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {item.kategori}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.definisi}
              </p>

              {/* Example block */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  Contoh Situasi:
                </span>
                <p className="text-slate-600 leading-relaxed">{item.contoh}</p>
              </div>

              {/* Tip block */}
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-1">
                <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                  Tip Cikgu Amal:
                </span>
                <p className="text-indigo-950 leading-relaxed">{item.tips}</p>
              </div>
            </div>

            {/* Bottom ask button */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() =>
                  onAskTerm(
                    `Cikgu Amal, boleh terangkan lebih lanjut tentang "${item.term} (${item.istilahMelayu})" berserta langkah perlindungan praktikal?`
                  )
                }
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Tanya Cikgu Amal
              </button>
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">
              Tiada istilah ditemui untuk "{searchQuery}"
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Cuba cari kata kunci lain atau terus tanya Cikgu Amal dalam ruang chat!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
