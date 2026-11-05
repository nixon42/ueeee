import React, { useEffect } from 'react';
import { ArrowLeft, Maximize2, Minimize2, Volume2, VolumeX, RotateCcw, X } from 'lucide-react';
import { useFullscreen } from '@/lib/fullscreen';

export type GameStageTheme = 'orange' | 'teal' | 'purple' | 'emerald' | 'blue' | 'indigo' | 'rose' | 'amber';

export interface GameStageShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: React.ReactNode;
  icon: string | React.ReactNode;
  themeColor?: GameStageTheme;
  soundOn?: boolean;
  onToggleSound?: () => void;
  onReset?: () => void;
  resetTooltip?: string;
  extraControls?: React.ReactNode;
  contentClassName?: string;
  children: React.ReactNode;
}

const THEME_STYLES: Record<GameStageTheme, { gradient: string; hoverBorder: string; hoverText: string }> = {
  orange: {
    gradient: 'bg-gradient-to-tr from-orange-500 to-pink-500',
    hoverBorder: 'hover:border-orange-200',
    hoverText: 'hover:text-orange-700',
  },
  teal: {
    gradient: 'bg-gradient-to-tr from-teal-500 to-cyan-500',
    hoverBorder: 'hover:border-teal-200',
    hoverText: 'hover:text-teal-700',
  },
  purple: {
    gradient: 'bg-gradient-to-tr from-purple-500 to-indigo-500',
    hoverBorder: 'hover:border-purple-200',
    hoverText: 'hover:text-purple-700',
  },
  emerald: {
    gradient: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
    hoverBorder: 'hover:border-emerald-200',
    hoverText: 'hover:text-emerald-700',
  },
  blue: {
    gradient: 'bg-gradient-to-tr from-blue-500 to-indigo-500',
    hoverBorder: 'hover:border-blue-200',
    hoverText: 'hover:text-blue-700',
  },
  indigo: {
    gradient: 'bg-gradient-to-tr from-indigo-500 to-purple-500',
    hoverBorder: 'hover:border-indigo-200',
    hoverText: 'hover:text-indigo-700',
  },
  rose: {
    gradient: 'bg-gradient-to-tr from-rose-500 to-pink-500',
    hoverBorder: 'hover:border-rose-200',
    hoverText: 'hover:text-rose-700',
  },
  amber: {
    gradient: 'bg-gradient-to-tr from-amber-500 to-yellow-500',
    hoverBorder: 'hover:border-amber-200',
    hoverText: 'hover:text-amber-700',
  },
};

export const GameStageShell: React.FC<GameStageShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  themeColor = 'purple',
  soundOn,
  onToggleSound,
  onReset,
  resetTooltip = 'Mulai Ulang Permainan',
  extraControls,
  contentClassName = 'flex-1 min-h-0 overflow-hidden flex flex-col',
  children,
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const theme = THEME_STYLES[themeColor] || THEME_STYLES.purple;

  // Global Escape key listener to close game
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#f8fafc] flex flex-col overflow-hidden select-none animate-fadeIn">
      {/* Top Fullscreen Stage Navbar */}
      <header className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-2xs">
        {/* Sisi Kiri: Tombol Kembali & Identitas Materi */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs shrink-0"
            title="Kembali ke Beranda Materi"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block shrink-0"></div>

          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-2xl ${theme.gradient} flex items-center justify-center text-white shadow-md font-black text-xl shrink-0`}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-slate-800 truncate leading-snug">
                {title}
              </h3>
              {subtitle && (
                <div className="text-xs text-slate-500 font-medium truncate leading-tight">
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Kontrol Khusus Game + Layar Penuh Proyektor + Audio + Tutup */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {extraControls}

          {/* Fullscreen Toggle (HTML5 Fullscreen API) */}
          <button
            onClick={toggleFullscreen}
            className={`px-3 py-2 rounded-xl bg-slate-100 ${theme.hoverText} text-slate-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-slate-200 ${theme.hoverBorder}`}
            title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Mode Layar Penuh (Proyektor/TV Kelas)'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden md:inline">{isFullscreen ? 'Keluar Penuh' : 'Layar Penuh (Proyektor)'}</span>
          </button>

          {/* Audio Sound Toggle */}
          {onToggleSound !== undefined && soundOn !== undefined && (
            <button
              onClick={onToggleSound}
              className={`p-2 text-slate-500 ${theme.hoverText} hover:bg-slate-100 rounded-xl transition cursor-pointer`}
              title={soundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          )}

          {/* Reset Game Action */}
          {onReset && (
            <button
              onClick={onReset}
              className={`p-2 text-slate-500 ${theme.hoverText} hover:bg-slate-100 rounded-xl transition cursor-pointer`}
              title={resetTooltip}
            >
              <RotateCcw size={18} />
            </button>
          )}

          {/* Close Game Action */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            title="Tutup Game"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Game Stage Arena */}
      <main className={contentClassName}>{children}</main>
    </div>
  );
};
