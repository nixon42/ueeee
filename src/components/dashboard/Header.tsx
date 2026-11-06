import React, { useState } from 'react';
import { 
  Search, Volume2, VolumeX, Dices, X, User 
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { GradeLevel } from '@/types/game';
import { Logo } from '@/components/common/Logo';
import { useSuperadmin } from '@/business';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onTabChange?: (tab: string) => void;
  selectedGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  onSurpriseMe: () => void;
  onOpenSuperadmin?: () => void;
  onOpenSuperadminDashboard?: () => void;
}

const GRADE_LEVELS: GradeLevel[] = [
  'Semua Kelas',
  'SD Kelas 1-3',
  'SD Kelas 4-6',
  'SMP',
  'SMA',
];

export const Header: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  onTabChange,
  selectedGrade,
  onGradeChange,
  onSurpriseMe,
  onOpenSuperadmin,
  onOpenSuperadminDashboard,
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const { user, isSuperadmin } = useSuperadmin();

  const handleToggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  return (
    <header className="relative w-full">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo 
          onClick={() => {
            sound.playClick();
            if (onTabChange) onTabChange('all');
            onSearchChange('');
            onGradeChange('Semua Kelas');
          }}
          className="group"
        />

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Main Acak (Surprise Me) */}
          <button
            onClick={() => {
              sound.playClick();
              onSurpriseMe();
            }}
            className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-900 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            title="Pilihkan game secara acak!"
          >
            <Dices size={15} />
            <span className="hidden sm:inline">Main Acak</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-600 transition shadow-sm cursor-pointer"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Aktifkan Suara Efek'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Avatar Profil / Superadmin di Pojok Kanan Atas */}
          {isSuperadmin && user ? (
            <button
              onClick={() => {
                sound.playClick();
                if (onOpenSuperadminDashboard) {
                  onOpenSuperadminDashboard();
                } else if (onOpenSuperadmin) {
                  onOpenSuperadmin();
                }
              }}
              className="relative p-0.5 rounded-full ring-2 ring-purple-500 hover:ring-purple-600 hover:scale-105 active:scale-95 transition shadow-sm cursor-pointer group"
              title={`Dashboard Superadmin (${user.name || 'Pengelola'})`}
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || 'Superadmin'}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  {(user.name || 'A').charAt(0).toUpperCase()}
                </div>
              )}
              {/* Online / Verified Admin Dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                if (onOpenSuperadmin) onOpenSuperadmin();
              }}
              className="w-8 h-8 rounded-full bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-500 hover:text-purple-700 hover:scale-105 active:scale-95 transition flex items-center justify-center shadow-xs cursor-pointer group"
              title="Superadmin Login"
            >
              <User size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Canva-Style Aurora Hero Banner */}
      <div className="relative mx-3 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden bg-gradient-to-r from-sky-100 via-purple-100/90 to-pink-100 border border-purple-200/50 shadow-sm px-6 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Soft Background Accents */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Rounded Pills Grade Switcher (Canva Home / Templates style) */}
        <div className="inline-flex items-center p-1 rounded-full bg-white/85 backdrop-blur-sm border border-purple-200/80 shadow-sm mb-5 overflow-x-auto max-w-full no-scrollbar">
          {GRADE_LEVELS.map((grade) => {
            const isSelected = selectedGrade === grade;
            return (
              <button
                key={grade}
                onClick={() => {
                  sound.playClick();
                  onGradeChange(grade);
                }}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-700 hover:bg-white/60'
                }`}
              >
                {grade}
              </button>
            );
          })}
        </div>

        {/* Canva Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight max-w-2xl mb-5 leading-tight">
          Mau belajar apa hari ini?
        </h1>

        {/* Canva Wide Pill Search Bar */}
        <div className="relative w-full max-w-2xl">
          <div className="relative flex items-center">
            <Search
              size={20}
              className="absolute left-[22px] top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari game, materi, atau topik (misal: Sains, Pecahan, Borobudur)..."
              className="w-full pl-[56px] pr-20 py-3.5 sm:py-4 rounded-full bg-white border-2 border-purple-200/80 hover:border-purple-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200/50 shadow-md text-slate-800 text-sm sm:text-base font-medium transition placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  sound.playClick();
                  onSearchChange('');
                }}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 z-10 text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Hapus pencarian"
              >
                <X size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
