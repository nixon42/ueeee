import React from 'react';
import { ReflectionSparkSlide as ReflectionSlideData } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';

export interface ReflectionSparkSlideProps {
  slide: ReflectionSlideData;
  themeColor: PresentationThemeKey;
  onVictory?: () => void;
}

const BADGE_COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
};

export const ReflectionSparkSlide: React.FC<ReflectionSparkSlideProps> = ({
  slide,
  themeColor,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-3 sm:space-y-4 animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-1">
        <span
          className={`text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}
        >
          {slide.chapterBadge || 'BABAK 6: REFLEKSI & DISKUSI KELAS'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* 3 HOTS Question Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
        {slide.sparkCards.map((card, idx) => {
          const badgeStyle =
            card.badgeColor && BADGE_COLOR_MAP[card.badgeColor]
              ? BADGE_COLOR_MAP[card.badgeColor]
              : idx === 0
              ? BADGE_COLOR_MAP.purple
              : idx === 1
              ? BADGE_COLOR_MAP.emerald
              : BADGE_COLOR_MAP.blue;

          return (
            <div
              key={`spark-${idx}`}
              className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200/90 space-y-2 hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span
                  className={`w-8 h-8 rounded-xl ${badgeStyle.bg} ${badgeStyle.text} border ${badgeStyle.border} font-black text-sm flex items-center justify-center`}
                >
                  {card.number || idx + 1}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                  {card.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                {card.question}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
