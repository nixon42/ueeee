import React, { useState } from 'react';
import { 
  Search, Sparkles, Volume2, VolumeX, 
  Gamepad2, Presentation, Compass, Puzzle, Dices, X 
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { GradeLevel } from '@/types/game';
import { Logo } from '@/components/common/Logo';

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  isClassroomMode: boolean;
  onToggleClassroomMode: () => void;
  onSurpriseMe: () => void;
}

const GRADE_LEVELS: GradeLevel[] = [
  'Semua Kelas',
  'SD Kelas 1-3',
  'SD Kelas 4-6',
  'SMP',
  'SMA',
];

const TRENDING_TAGS = [
  'Candi Borobudur',
  'Tata Surya',
  'Pecahan',
  'Fotosintesis',
  'Lab Sains',
  'Kerajaan Majapahit',
];

export const Header: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  selectedGrade,
  onGradeChange,
  isClassroomMode,
  onToggleClassroomMode,
  onSurpriseMe,
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleToggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  const handleTagClick = (tag: string) => {
    sound.playClick();
    const cleanWord = tag.replace('#', '');
    onSearchChange(cleanWord);
  };

  return (
    <header className="relative w-full">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo 
          onClick={() => {
            sound.playClick();
            onTabChange('all');
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

          {/* Mode Proyektor Kelas / Guru */}
          <button
            onClick={onToggleClassroomMode}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
              isClassroomMode
                ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'
            }`}
            title="Mode Kelas / Layar Proyektor"
          >
            <Presentation size={14} />
            <span className="hidden md:inline">Mode Guru</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-600 transition shadow-sm cursor-pointer"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Aktifkan Suara Efek'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Canva-Style Aurora Hero Banner */}
      <div className={`relative mx-3 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden bg-gradient-to-r from-sky-100 via-purple-100/90 to-pink-100 border border-purple-200/50 shadow-sm px-6 ${
        isClassroomMode ? 'py-12 sm:py-16' : 'py-8 sm:py-12'
      } flex flex-col items-center justify-center text-center`}>
        {/* Soft Background Accents */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Rounded Pills Nav Tab (like Canva's Home / Templates) */}
        <div className="inline-flex items-center p-1 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200/70 shadow-sm mb-5">
          <button
            onClick={() => onTabChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Sparkles size={13} />
            <span>Semua Materi</span>
          </button>

          <button
            onClick={() => onTabChange('ular-tangga')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ular-tangga'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Gamepad2 size={13} />
            <span>Ular Tangga</span>
          </button>

          <button
            onClick={() => onTabChange('point-and-click')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'point-and-click'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Compass size={13} />
            <span>Point & Click</span>
          </button>

          <button
            onClick={() => onTabChange('puzzle')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'puzzle'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Puzzle size={13} />
            <span>Teka-Teki</span>
          </button>
        </div>

        {/* Canva Hero Title */}
        <h1 className={`${
          isClassroomMode ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl'
        } font-black text-slate-800 tracking-tight max-w-2xl mb-5 leading-tight`}>
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

        {/* Trending Hashtag Chips Canva-Style */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 max-w-2xl">
          <span className="text-[11px] font-bold text-slate-500 mr-1">Populer:</span>
          {TRENDING_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/70 hover:bg-white text-slate-600 hover:text-purple-700 border border-purple-200/50 transition cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Jenjang Kelas Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4">
          <span className="text-xs font-bold text-slate-500 mr-1">Tingkat:</span>
          {GRADE_LEVELS.map(grade => (
            <button
              key={grade}
              onClick={() => onGradeChange(grade)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-purple-200/60'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
