import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { StoryResolutionSlide as StoryResolutionSlideData } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { DrMayaAvatar } from '../characters/DrMayaAvatar';

export interface StoryResolutionSlideProps {
  slide: StoryResolutionSlideData;
  themeColor: PresentationThemeKey;
  challengesState?: Record<string, boolean>;
  onNext?: () => void;
}

export const StoryResolutionSlide: React.FC<StoryResolutionSlideProps> = ({
  slide,
  themeColor,
  onNext,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const isLabTheme =
    themeColor === 'teal' ||
    slide.reportTitle?.toLowerCase().includes('maya') ||
    slide.resolutionStory?.toLowerCase().includes('forensik');

  return (
    <div className="w-full h-full flex flex-col items-center justify-between max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 my-auto animate-in fade-in duration-300 overflow-hidden">
      {/* Hero Header with Dr. Maya & Trophy */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0">
        {isLabTheme ? (
          <DrMayaAvatar size="sm" mood="happy" />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-amber-200 border-4 border-white ring-4 ring-amber-100 shrink-0">
            {slide.celebrationEmoji || '🏆'}
          </div>
        )}
        <div className="text-left space-y-0.5">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-100/80 px-2.5 py-0.5 rounded-full border border-teal-200">
            Misi Utama Terselesaikan!
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-xl">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Narrative Debrief Card */}
      <div
        className={`w-full max-w-2xl bg-gradient-to-br ${theme.bgLight} to-slate-50 p-4 sm:p-5 rounded-3xl border-2 ${theme.borderLight} text-left shadow-md flex-1 min-h-0 flex flex-col justify-between overflow-hidden`}
      >
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200/60 shrink-0">
          <CheckCircle2 className="text-emerald-700 shrink-0" size={18} />
          <span className="font-extrabold text-xs sm:text-sm text-slate-900">
            {slide.reportTitle || 'Laporan Keberhasilan Misi:'}
          </span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium overflow-y-auto pr-1">
          &ldquo;{slide.resolutionStory}&rdquo;
        </p>

        {/* Dynamic Mission Achievement Badges */}
        {slide.achievementBadges && slide.achievementBadges.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-center gap-2 shrink-0">
            {slide.achievementBadges.map((badge, idx) => (
              <div
                key={`badge-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-b from-amber-50 to-yellow-100/90 border-2 border-b-4 border-amber-300 text-amber-950 font-black text-xs shadow-xs"
              >
                <span className="text-sm select-none">🏅</span>
                <span className="truncate max-w-[240px]">{badge.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action CTA Button */}
      {onNext && (
        <button
          type="button"
          onClick={() => {
            sound.playCelebration();
            onNext();
          }}
          className="py-2.5 sm:py-3 px-6 sm:px-8 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm border-2 border-b-4 border-teal-800 active:translate-y-0.5 active:border-b-2 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          <span>{slide.actionButtonText || 'Lanjut ke Diskusi Guru & Refleksi'}</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};
