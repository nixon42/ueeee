import React from 'react';
import { Compass } from 'lucide-react';
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
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const activeMentor = { ...mentor, ...slide.mentorOverride };
  const isKakGalih = activeMentor.name.toLowerCase().includes('galih');

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-5xl mx-auto py-1 sm:py-2 md:py-3 space-y-2 sm:space-y-3 animate-in fade-in duration-300 relative z-10 overflow-hidden">
      {/* Stage Mission Header without curriculum babak pills */}
      <div className="text-center space-y-1 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-emerald-800/80 font-bold max-w-xl mx-auto truncate sm:whitespace-normal">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Game Stage Narrative Scene (Character Bust + RPG Dialogue Box) */}
      <div className="w-full flex-1 min-h-0 flex flex-col md:flex-row items-center md:items-end justify-center gap-4 sm:gap-6 md:gap-8 my-auto relative">
        {isKakGalih ? (
          <>
            {/* Large Prominent Character Avatar */}
            <div className="shrink-0 flex items-end justify-center select-none relative z-10">
              <KakGalihAvatar
                size="hero"
                mood="speaking"
                showSpeechBubble={false}
                className="drop-shadow-2xl"
              />
            </div>

            {/* RPG Adventure Dialogue Box */}
            <div className="relative flex-1 w-full bg-white/95 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-3xl border-3 sm:border-4 border-emerald-400/90 shadow-2xl shadow-emerald-950/15 ring-4 ring-emerald-500/10 text-left flex flex-col justify-between max-w-3xl">
              {/* Comic Speech Pointer pointing to Kak Galih */}
              <div className="hidden md:block absolute -left-3.5 bottom-12 sm:bottom-16 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-white drop-shadow-sm" />
              <div className="md:hidden absolute -top-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-white drop-shadow-sm" />

              {/* RPG Character Nameplate Tag */}
              <div className="absolute -top-4 sm:-top-5 left-6 sm:left-8 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg border-2 border-white select-none">
                <span className="text-sm sm:text-base">🧭</span>
                <span className="font-black text-xs sm:text-sm tracking-wide">
                  {activeMentor.name}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-100 bg-black/20 px-2 py-0.5 rounded-lg border border-white/20">
                  {activeMentor.role}
                </span>
              </div>

              {/* Spoken Dialogue Text - Enlarged & Tactile */}
              <div className="pt-2 sm:pt-3">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed sm:leading-relaxed md:leading-loose text-slate-800 tracking-tight">
                  &ldquo;{slide.dialogue}&rdquo;
                </p>
              </div>

              {/* Mission Target Quest Pill */}
              {slide.missionObjective && (
                <div className="mt-4 sm:mt-5 p-2.5 sm:p-3 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/50 flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-emerald-950 shadow-2xs">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-[10px] sm:text-xs tracking-wider uppercase shrink-0 shadow-xs">
                    🎯 Target Misi
                  </span>
                  <span className="font-bold text-slate-800 leading-snug">
                    {slide.missionObjective}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Fallback Animated Generic Mentor Avatar (Enlarged) */}
            <div className="relative shrink-0 flex items-center justify-center select-none z-10">
              <div
                className={`w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-3xl bg-gradient-to-tr ${theme.gradient} text-white flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-2xl ${theme.shadowColor} border-4 border-white ring-4 ring-slate-100 animate-bounce-subtle`}
              >
                {activeMentor.avatarEmoji || '🧑‍🏫'}
              </div>
            </div>

            {/* RPG Adventure Dialogue Box for Fallback Mentor */}
            <div
              className={`relative flex-1 w-full bg-white/95 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-3xl border-3 sm:border-4 ${theme.borderLight} shadow-2xl shadow-slate-950/10 ring-4 ring-slate-500/10 text-left flex flex-col justify-between max-w-3xl`}
            >
              {/* Comic Speech Pointer */}
              <div className="hidden md:block absolute -left-3.5 bottom-12 sm:bottom-16 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-white drop-shadow-sm" />
              <div className="md:hidden absolute -top-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-white drop-shadow-sm" />

              {/* RPG Character Nameplate Tag */}
              <div
                className={`absolute -top-4 sm:-top-5 left-6 sm:left-8 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-2xl bg-gradient-to-r ${theme.gradient} text-white shadow-lg border-2 border-white select-none`}
              >
                <Compass size={16} />
                <span className="font-black text-xs sm:text-sm tracking-wide">
                  {activeMentor.name}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-lg border border-white/20">
                  {activeMentor.role}
                </span>
              </div>

              {/* Spoken Dialogue Text - Enlarged & Tactile */}
              <div className="pt-2 sm:pt-3">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed sm:leading-relaxed md:leading-loose text-slate-800 tracking-tight">
                  &ldquo;{slide.dialogue}&rdquo;
                </p>
              </div>

              {/* Mission Target Quest Pill */}
              {slide.missionObjective && (
                <div
                  className={`mt-4 sm:mt-5 p-2.5 sm:p-3 rounded-2xl ${theme.bgLight} border-2 ${theme.borderLight} flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-extrabold ${theme.textPrimary} shadow-2xs`}
                >
                  <span
                    className={`px-2.5 py-1 rounded-xl ${theme.btnPrimary} font-black text-[10px] sm:text-xs tracking-wider uppercase shrink-0 shadow-xs`}
                  >
                    🎯 Target Misi
                  </span>
                  <span className="font-bold text-slate-800 leading-snug">
                    {slide.missionObjective}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
