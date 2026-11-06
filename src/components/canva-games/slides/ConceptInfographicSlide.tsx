import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight, Maximize2, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { ConceptInfographicSlide as ConceptSlideData } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { getDeckIllustration } from '@/components/visuals';

export interface ConceptInfographicSlideProps {
  slide: ConceptSlideData;
  themeColor: PresentationThemeKey;
  gameId?: string;
  onNext?: () => void;
}

const CARD_THEME_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50/70', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'text-emerald-700' },
  amber: { bg: 'bg-amber-50/70', border: 'border-amber-200', text: 'text-amber-800', badge: 'text-amber-700' },
  purple: { bg: 'bg-purple-50/70', border: 'border-purple-200', text: 'text-purple-800', badge: 'text-purple-700' },
  blue: { bg: 'bg-blue-50/70', border: 'border-blue-200', text: 'text-blue-800', badge: 'text-blue-700' },
  teal: { bg: 'bg-teal-50/70', border: 'border-teal-200', text: 'text-teal-800', badge: 'text-teal-700' },
  rose: { bg: 'bg-rose-50/70', border: 'border-rose-200', text: 'text-rose-800', badge: 'text-rose-700' },
  orange: { bg: 'bg-orange-50/70', border: 'border-orange-200', text: 'text-orange-800', badge: 'text-orange-700' },
  indigo: { bg: 'bg-indigo-50/70', border: 'border-indigo-200', text: 'text-indigo-800', badge: 'text-indigo-700' },
};

export const ConceptInfographicSlide: React.FC<ConceptInfographicSlideProps> = ({
  slide,
  themeColor,
  gameId,
  onNext,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const isFourCards = slide.cards.length === 4;
  const IllustrationComponent = gameId ? getDeckIllustration(gameId) : null;
  const [viewMode, setViewMode] = useState<'cards' | 'infographic'>(
    IllustrationComponent ? 'infographic' : 'cards'
  );
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Close lightbox on Escape key & zoom shortcuts (+ / -)
  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  const handleOpenZoom = () => {
    sound.playClick();
    setZoomLevel(1);
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    sound.playClick();
    setIsZoomed(false);
    setZoomLevel(1);
  };

  const handleNextClick = () => {
    sound.playClick();
    if (onNext) onNext();
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-4 sm:space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-1">
        <span
          className={`text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}
        >
          {slide.chapterBadge || 'BABAK 2: KONSEP DASAR PEMBELAJARAN'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {slide.subtitle}
          </p>
        )}

        {/* View Mode Switcher for Classroom Projector Display */}
        {IllustrationComponent && (
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode('infographic');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'infographic'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>📊 Bagan Infografis Visual</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode('cards');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>📋 Kartu Konsep & Ringkasan</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area: Infographic SVG or Dynamic Cards Grid */}
      {viewMode === 'infographic' && IllustrationComponent ? (
        <div className="relative group w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-slate-800 shadow-xl bg-slate-950 aspect-[16/10] max-h-[460px] my-auto flex items-center justify-center transition-all">
          <div
            onClick={handleOpenZoom}
            className="w-full h-full flex items-center justify-center cursor-zoom-in relative"
            title="Klik untuk memperbesar infografis ke layar penuh"
          >
            <IllustrationComponent className="w-full h-full object-contain" />

            {/* Subtle Hover Overlay with Enlarge Prompt */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-4 py-2 rounded-2xl bg-black/80 text-white font-extrabold text-xs sm:text-sm backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Maximize2 size={16} className="text-amber-300" />
                <span>Klik untuk Memperbesar Detail Infografis</span>
              </span>
            </div>
          </div>

          {/* Quick Enlarge Button (Always Visible in top right corner) */}
          <div className="absolute top-3 right-3 z-10">
            <button
              type="button"
              onClick={handleOpenZoom}
              className="px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-1.5 transition cursor-pointer hover:scale-105 active:scale-95"
              title="Perbesar ke Layar Penuh (Zoom & Detail)"
            >
              <Maximize2 size={13} className="text-amber-300" />
              <span>Perbesar</span>
            </button>
          </div>
        </div>
      ) : (
      <div
        className={`grid ${
          isFourCards
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'
            : 'grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'
        } my-auto`}
      >
        {slide.cards.map((card, idx) => {
          const cardColor =
            card.badgeColor && CARD_THEME_COLORS[card.badgeColor]
              ? CARD_THEME_COLORS[card.badgeColor]
              : CARD_THEME_COLORS.emerald;

          return (
            <div
              key={card.id || `card-${idx}`}
              className={`p-4 sm:p-5 rounded-3xl ${cardColor.bg} border-2 ${cardColor.border} shadow-sm flex flex-col space-y-2.5 hover:shadow-md transition`}
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow-sm select-none">
                {card.iconEmoji || '📘'}
              </span>
              {card.levelBadge && (
                <span className={`text-[11px] font-black uppercase tracking-wider ${cardColor.badge}`}>
                  {card.levelBadge}
                </span>
              )}
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium flex-1">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
      )}

      {/* Teacher Speaker Prompt Banner (Classroom Proyektor Cue) */}
      <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-600 shrink-0">
        <div className="flex items-center gap-3">
          <Lightbulb className="text-amber-500 shrink-0" size={20} />
          <span>
            <strong>Panduan Guru di Kelas:</strong>{' '}
            {slide.teacherNotes ||
              'Ajak siswa mengulas kartu materi di atas dan memberikan contoh konkret dalam kehidupan sehari-hari sebelum melangkah ke tantangan mini-game!'}
          </span>
        </div>

        {onNext && (
          <button
            type="button"
            onClick={handleNextClick}
            className={`hidden sm:flex items-center gap-1 text-xs font-black ${theme.textPrimary} hover:underline shrink-0 cursor-pointer`}
          >
            <span>Tantangan Berikutnya</span>
            <ChevronRight size={15} />
          </button>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX & ZOOM MODAL */}
      {isZoomed && IllustrationComponent && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-fadeIn"
          onClick={handleCloseZoom}
        >
          {/* Header Bar Controls */}
          <div
            className="w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 text-white z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">{slide.title}</h3>
              <p className="text-xs text-slate-400 font-medium">Infografis Resolusi Tinggi (Vektor SVG Interaktif)</p>
            </div>

            {/* Zoom Controls & Close Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Perkecil (-)"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-slate-300 hover:text-white transition cursor-pointer"
                  title="Reset Zoom (100%)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Perbesar (+)"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Reset Ukuran"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleCloseZoom}
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-700 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="Tutup (Esc)"
              >
                <X size={18} />
                <span className="hidden sm:inline">Tutup</span>
              </button>
            </div>
          </div>

          {/* Zoomable Infographic Viewport */}
          <div
            className="flex-1 w-full overflow-auto flex items-center justify-center p-2 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseZoom();
            }}
          >
            <div
              className="transition-transform duration-200 ease-out select-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-[88vw] max-w-6xl aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center">
                <IllustrationComponent className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Footer Tip */}
          <div className="text-center pt-2 text-[11px] text-slate-500 font-medium z-10 shrink-0">
            💡 Tip: Gunakan tombol zoom atau keyboard (+ / -) untuk memperbesar detail planet, orbit, dan label sains. Tekan Esc untuk keluar.
          </div>
        </div>
      )}
    </div>
  );
};
