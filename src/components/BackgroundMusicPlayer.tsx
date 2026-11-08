import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sliders } from 'lucide-react';
import { cyberMusic } from '../utils/cyberSynthAudio';

export const BackgroundMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<'chill' | 'focus' | 'upbeat'>('chill');

  useEffect(() => {
    setIsPlaying(cyberMusic.getIsPlaying());
    setVolume(cyberMusic.getVolume());
  }, []);

  const handleTogglePlay = () => {
    const active = cyberMusic.toggle();
    setIsPlaying(active);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    cyberMusic.setVolume(newVol);
  };

  const handleTrackChange = (track: 'chill' | 'focus' | 'upbeat') => {
    setCurrentTrack(track);
    cyberMusic.setTrack(track);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-1 shadow-2xs">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50'
          }`}
          title={isPlaying ? 'Jeda Lagu Background' : 'Mainkan Lagu Background (Cyber Ambient)'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 shrink-0" />
              {/* Animated Sound Equalizer Bars */}
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-white rounded-full animate-bounce h-3" style={{ animationDuration: '600ms' }} />
                <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDuration: '400ms' }} />
                <span className="w-0.5 bg-white rounded-full animate-bounce h-3.5" style={{ animationDuration: '700ms' }} />
              </span>
              <span className="hidden sm:inline text-[11px]">Muzik Aktif</span>
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="hidden sm:inline text-[11px]">Lagu Latar</span>
            </>
          )}
        </button>

        {/* Settings Toggle */}
        <button
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-white hover:text-blue-600 transition-colors cursor-pointer"
          title="Tetapan Bunyi & Nada"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Settings Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-blue-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-blue-600" />
              Lagu Latar Cikgu Amal
            </span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Cyber Synth
            </span>
          </div>

          {/* Track selector */}
          <div className="space-y-1.5 mb-3">
            <label className="text-[11px] font-bold text-slate-600 block">
              Pilihan Suasana Muzik:
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'chill', label: 'Chill' },
                { id: 'focus', label: 'Fokus' },
                { id: 'upbeat', label: 'Ceria' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTrackChange(t.id as any)}
                  className={`py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                    currentTrack === t.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold">
              <span className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
                Kelantangan:
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setShowMenu(false)}
              className="text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Tutup Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
