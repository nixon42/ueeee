import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { StoryResolutionSlide as StoryResolutionSlideData } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';

export interface StoryResolutionSlideProps {
  slide: StoryResolutionSlideData;
  themeColor: PresentationThemeKey;
  challengesState?: Record<string, boolean>;
  onNext?: () => void;
}

export const StoryResolutionSlide: React.FC<StoryResolutionSlideProps> = ({
  slide,
  themeColor,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 my-auto animate-in fade-in duration-300">
      {/* Hero Trophy Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-amber-200 border-4 border-white ring-4 ring-amber-100">
        {slide.celebrationEmoji || '🏆'}
      </div>

      {/* Chapter Tag & Success Title */}
      <div className="space-y-2">
        <span
          className={`text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}
        >
          {slide.chapterBadge || 'BABAK 5: KELANJUTAN CERITA'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Narrative Debrief Card */}
      <div
        className={`max-w-2xl bg-gradient-to-br ${theme.bgLight} to-slate-50 p-5 sm:p-6 rounded-3xl border ${theme.borderLight} text-left shadow-sm`}
      >
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200/60">
          <CheckCircle2 className="text-emerald-700" size={18} />
          <span className="font-extrabold text-xs sm:text-sm text-slate-900">
            {slide.reportTitle || 'Laporan Keberhasilan Misi:'}
          </span>
        </div>
        <p className="text-xs sm:text-base leading-relaxed text-slate-700 font-medium">
          &ldquo;{slide.resolutionStory}&rdquo;
        </p>
      </div>
    </div>
  );
};
