import React, { useState } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
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
        <div className="w-full max-h-[360px] sm:max-h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-md my-auto flex items-center justify-center bg-slate-950 animate-in fade-in duration-200">
          <IllustrationComponent className="max-h-[360px] sm:max-h-[400px] w-auto mx-auto" />
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
    </div>
  );
};
