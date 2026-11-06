import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { ConceptInfographicSlide as ConceptSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { getDeckIllustration } from '@/components/visuals';

export interface ConceptInfographicSlideProps {
  slide: ConceptSlideData;
  themeColor: PresentationThemeKey;
  gameId?: string;
  onNext?: () => void;
}

const CARD_THEME_COLORS: Record<
  string,
  { solid: string; soft: string; text: string; ring: string }
> = {
  emerald: { solid: 'bg-emerald-600 border-emerald-700', soft: 'bg-emerald-50 border-emerald-300', text: 'text-emerald-800', ring: 'ring-emerald-300/70' },
  amber: { solid: 'bg-amber-500 border-amber-600', soft: 'bg-amber-50 border-amber-300', text: 'text-amber-800', ring: 'ring-amber-300/70' },
  blue: { solid: 'bg-blue-600 border-blue-700', soft: 'bg-blue-50 border-blue-300', text: 'text-blue-800', ring: 'ring-blue-300/70' },
  indigo: { solid: 'bg-indigo-600 border-indigo-700', soft: 'bg-indigo-50 border-indigo-300', text: 'text-indigo-800', ring: 'ring-indigo-300/70' },
  teal: { solid: 'bg-teal-600 border-teal-700', soft: 'bg-teal-50 border-teal-300', text: 'text-teal-800', ring: 'ring-teal-300/70' },
  rose: { solid: 'bg-rose-600 border-rose-700', soft: 'bg-rose-50 border-rose-300', text: 'text-rose-800', ring: 'ring-rose-300/70' },
  orange: { solid: 'bg-orange-600 border-orange-700', soft: 'bg-orange-50 border-orange-300', text: 'text-orange-800', ring: 'ring-orange-300/70' },
  purple: { solid: 'bg-purple-600 border-purple-700', soft: 'bg-purple-50 border-purple-300', text: 'text-purple-800', ring: 'ring-purple-300/70' },
};

export const ConceptInfographicSlide: React.FC<ConceptInfographicSlideProps> = ({
  slide,
  gameId,
}) => {
  const IllustrationComponent = gameId ? getDeckIllustration(gameId) : null;
  const cards = slide.cards ?? [];

  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeCard = cards[selectedIdx] ?? cards[0];
  const activeColor = CARD_THEME_COLORS[activeCard?.badgeColor ?? 'emerald'] ?? CARD_THEME_COLORS.emerald;

  const gridCols =
    cards.length >= 5 ? 'sm:grid-cols-5' : cards.length === 4 ? 'sm:grid-cols-4' : cards.length === 3 ? 'sm:grid-cols-3' : cards.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1';

  return (
    <div className="w-full h-full flex flex-col max-w-6xl mx-auto my-auto space-y-2.5 sm:space-y-3 animate-in fade-in duration-300 relative z-10 overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-0.5 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-2xl mx-auto">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Full-width illustration hero */}
      {IllustrationComponent && (
        <div className="relative flex-1 min-h-0 w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-sm flex items-center justify-center">
          <IllustrationComponent className="w-full h-full object-contain" />
        </div>
      )}

      {/* Selected phase detail — slim bright bar */}
      {activeCard && (
        <div className={`shrink-0 rounded-2xl ${activeColor.soft} border-2 px-4 py-2.5 sm:py-3 flex items-center gap-3 text-left shadow-sm`}>
          <span className="text-3xl sm:text-4xl select-none shrink-0">{activeCard.iconEmoji || '📘'}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-black text-sm sm:text-base ${activeColor.text} leading-tight`}>
                {activeCard.title}
              </h3>
              {activeCard.levelBadge && (
                <span className="px-2 py-0.5 rounded-full bg-white/80 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-slate-600 border border-slate-200">
                  {activeCard.levelBadge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug mt-0.5">
              {activeCard.description}
            </p>
          </div>
        </div>
      )}

      {/* Chunky phase selector dock */}
      <div className="shrink-0 bg-slate-100/80 p-1.5 sm:p-2 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className={`grid grid-cols-1 ${gridCols} gap-1.5 sm:gap-2`}>
          {cards.map((card, idx) => {
            const isSelected = selectedIdx === idx;
            const c = CARD_THEME_COLORS[card.badgeColor ?? 'emerald'] ?? CARD_THEME_COLORS.emerald;
            return (
              <button
                key={card.id || `card-${idx}`}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedIdx(idx);
                }}
                className={`min-h-[48px] sm:min-h-[54px] px-3 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all duration-150 cursor-pointer border-2 flex items-center justify-center gap-2 active:scale-95 ${
                  isSelected
                    ? `${c.solid} text-white shadow-md ring-2 ${c.ring} -translate-y-0.5`
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <span className="text-lg sm:text-xl select-none shrink-0">{card.iconEmoji || '📘'}</span>
                <span className="truncate text-left leading-tight">{card.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Teacher prompt */}
      <div className="shrink-0 bg-amber-50/90 border border-amber-200/80 px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 shadow-sm">
        <Lightbulb className="text-amber-500 shrink-0" size={16} />
        <span className="line-clamp-2 font-medium">
          <strong>Panduan Guru:</strong>{' '}
          {slide.teacherNotes ||
            'Ajak siswa mengamati animasi loop pergerakan molekul air: dari penguapan sungai oleh energi surya, pembentukan awan dingin di pegunungan, hingga turunnya hujan yang diserap oleh akar pohon.'}
        </span>
      </div>
    </div>
  );
};
