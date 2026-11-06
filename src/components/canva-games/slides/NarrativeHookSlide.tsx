import React from 'react';
import { Compass } from 'lucide-react';
import { NarrativeIntroSlide, PresentationMentor } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';

export interface NarrativeHookSlideProps {
  slide: NarrativeIntroSlide;
  mentor: PresentationMentor;
  themeColor: PresentationThemeKey;
  onNext?: () => void;
}

export const NarrativeHookSlide: React.FC<NarrativeHookSlideProps> = ({
  slide,
  mentor,
  themeColor,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const activeMentor = { ...mentor, ...slide.mentorOverride };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 my-auto animate-in fade-in duration-300">
      {/* Visual Avatar Mentor */}
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${theme.gradient} text-white flex items-center justify-center text-4xl sm:text-5xl shadow-xl ${theme.shadowColor} border-4 border-white ring-4 ring-slate-100`}
      >
        {activeMentor.avatarEmoji || '🧑‍🏫'}
      </div>

      {/* Chapter Tag & Mission Title */}
      <div className="space-y-2">
        <span
          className={`text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}
        >
          {slide.chapterBadge || 'BABAK 1: PANGGILAN PETUALANGAN'}
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

      {/* Mentor Dialogue Bubble */}
      <div
        className={`max-w-2xl bg-gradient-to-br ${theme.bgLight} to-slate-50 p-5 sm:p-6 rounded-3xl border ${theme.borderLight} text-left shadow-sm relative`}
      >
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200/60">
          <Compass className={theme.textPrimary} size={18} />
          <span className={`font-extrabold text-xs sm:text-sm ${theme.textPrimary}`}>
            {activeMentor.name} ({activeMentor.role}):
          </span>
        </div>
        <p className="text-xs sm:text-base leading-relaxed text-slate-700 font-medium">
          &ldquo;{slide.dialogue}&rdquo;
        </p>
        {slide.missionObjective && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="text-amber-600">🎯 Target:</span>
            <span>{slide.missionObjective}</span>
          </div>
        )}
      </div>
    </div>
  );
};
