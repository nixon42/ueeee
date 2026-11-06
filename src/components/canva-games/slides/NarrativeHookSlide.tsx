import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { NarrativeIntroSlide, PresentationMentor } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';
import { KakGalihAvatar } from '../characters/KakGalihAvatar';

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
  onNext,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const activeMentor = { ...mentor, ...slide.mentorOverride };
  const isKakGalih = activeMentor.name.toLowerCase().includes('galih');

  return (
    <div className="w-full h-full flex flex-col items-center justify-between max-w-4xl mx-auto my-auto py-2 sm:py-4 space-y-4 sm:space-y-6 animate-in fade-in duration-300 relative z-10">
      {/* Chapter Tag & Mission Title */}
      <div className="text-center space-y-1 sm:space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-emerald-200/80 shadow-2xs">
          <Sparkles size={12} className={theme.textPrimary} />
          <span className={`text-[11px] sm:text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}>
            {slide.chapterBadge || 'BABAK 1: PANGGILAN PENJELAJAH ALAM'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-xl mx-auto">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main Mentor Interaction Area */}
      {isKakGalih ? (
        <div className="w-full my-auto flex justify-center">
          <KakGalihAvatar
            size="lg"
            mood="speaking"
            showSpeechBubble={true}
            speechText={slide.dialogue}
            dialogueTitle={`${activeMentor.name} • ${activeMentor.role}`}
            missionObjective={slide.missionObjective}
            onCtaClick={onNext}
            ctaText={slide.actionButtonText || 'Mulai Ekspedisi Sains →'}
            className="w-full max-w-3xl"
          />
        </div>
      ) : (
        <div className="w-full my-auto flex flex-col md:flex-row items-center gap-4 sm:gap-6 max-w-3xl justify-center">
          {/* Fallback Animated Generic Mentor Avatar */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr ${theme.gradient} text-white flex items-center justify-center text-5xl shadow-xl ${theme.shadowColor} border-4 border-white ring-4 ring-slate-100 animate-bounce-subtle`}
            >
              {activeMentor.avatarEmoji || '🧑‍🏫'}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-md border-2 border-white flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping absolute" />
              <Compass size={12} />
            </div>
          </div>

          {/* Dialogue Speech Balloon */}
          <div className="relative flex-1 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xl text-left ring-1 ring-slate-100">
            <div className="hidden md:block absolute -left-3 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-12 border-r-white drop-shadow-xs" />
            <div className="md:hidden absolute -top-3 left-10 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-12 border-b-white drop-shadow-xs" />

            <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-100">
              <Compass className={theme.textPrimary} size={16} />
              <span className={`font-extrabold text-xs sm:text-sm ${theme.textPrimary}`}>
                {activeMentor.name} ({activeMentor.role}):
              </span>
            </div>

            <p className="text-xs sm:text-base leading-relaxed text-slate-700 font-medium">
              &ldquo;{slide.dialogue}&rdquo;
            </p>

            {slide.missionObjective && (
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-600">
                <span className="text-amber-600">🎯 Target:</span>
                <span>{slide.missionObjective}</span>
              </div>
            )}

            {slide.actionButtonText && onNext && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onNext}
                  className={`px-4 py-2 rounded-xl bg-gradient-to-r ${theme.gradient} text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md active:scale-95 transition cursor-pointer`}
                >
                  <span>{slide.actionButtonText}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
