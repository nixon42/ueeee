import React, { useState } from 'react';
import { Search, Sparkles, Volume2, VolumeX, ShieldCheck, Gamepad2 } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleToggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  return (
    <header className="relative w-full">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#00c4cc] flex items-center justify-center text-white shadow-sm font-black text-xl tracking-tight">
            u
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              ueeee
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              ueeee.my.id
            </span>
          </div>
        </div>

        {/* Right Action & Zero-Login Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>Akses Terbuka • Tanpa Perlu Login</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-600 transition shadow-sm"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Aktifkan Suara Efek'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>

      {/* Canva-Style Aurora Hero Banner */}
      <div className="relative mx-3 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden bg-gradient-to-r from-sky-100 via-purple-100/90 to-pink-100 border border-purple-200/50 shadow-sm px-6 py-10 sm:py-14 flex flex-col items-center justify-center text-center">
        {/* Soft Background Accents */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Rounded Pills Nav Tab (like Canva's Home / Templates) */}
        <div className="inline-flex items-center p-1 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200/70 shadow-sm mb-6">
          <button
            onClick={() => onTabChange('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Sparkles size={13} />
            <span>Semua Permainan</span>
          </button>

          <button
            onClick={() => onTabChange('ular-tangga')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'ular-tangga'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Gamepad2 size={13} />
            <span>Papan Ular Tangga</span>
          </button>
        </div>

        {/* Canva Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight max-w-2xl mb-6">
          Mau belajar apa hari ini?
        </h1>

        {/* Canva Wide Pill Search Bar */}
        <div className="relative w-full max-w-2xl">
          <div className="relative flex items-center">
            <Search
              size={20}
              className="absolute left-5 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari materi, kuis, atau game (misal: Ular Tangga, Sains, Lab)..."
              className="w-full pl-13 pr-12 py-4 rounded-full bg-white border-2 border-purple-200/80 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200/50 shadow-md text-slate-800 text-sm sm:text-base font-medium transition placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-full bg-slate-100"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
