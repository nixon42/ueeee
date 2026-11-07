import React from 'react';
import { CheckCircle2, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { StoryResolutionSlide as StoryResolutionSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';

export interface StoryResolutionSlideProps {
  slide: StoryResolutionSlideData;
  themeColor?: PresentationThemeKey;
  challengesState?: Record<string, boolean>;
  onNext?: () => void;
}

export const StoryResolutionSlide: React.FC<StoryResolutionSlideProps> = ({
  slide,
  themeColor = 'emerald',
  challengesState = {},
  onNext,
}) => {
  const isPurple = themeColor === 'purple';
  const isTeal = themeColor === 'teal';
  const badges = slide.achievementBadges ?? [];
  const earnedCount = badges.filter((b) =>
    challengesState[slugify(b.label)] ?? true
  ).length;

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border-4 ${
        isPurple
          ? 'border-purple-900/50 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.65)]'
          : isTeal
          ? 'border-teal-900/50 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(13,148,136,0.65)]'
          : 'border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)]'
      } select-none animate-in fade-in duration-300`}
    >
      {/* ── COCKPIT HUD TOP BAR (UNIFIED SINGLE PLAQUE) ──── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
        <div
          className={`inline-block max-w-[75%] sm:max-w-[80%] rounded-2xl ${
            isPurple
              ? 'bg-gradient-to-r from-purple-950/95 via-indigo-900/90 to-slate-950/55 border-l-[6px] border-cyan-400'
              : isTeal
              ? 'bg-gradient-to-r from-teal-950/95 via-cyan-900/90 to-slate-950/55 border-l-[6px] border-teal-400'
              : 'bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-900/55 border-l-[6px] border-amber-400'
          } backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-1.5 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase ${
                isPurple
                  ? 'bg-cyan-400 text-slate-950'
                  : isTeal
                  ? 'bg-teal-400 text-slate-950'
                  : 'bg-amber-400 text-emerald-950'
              }`}
            >
              MISI TUNTAS
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
              {slide.title}
            </h2>
          </div>
          {slide.subtitle && (
            <p
              className={`text-[10.5px] sm:text-xs font-bold leading-snug mt-0.5 truncate hidden sm:block ${
                isPurple ? 'text-cyan-300/95' : isTeal ? 'text-teal-300/95' : 'text-amber-300/95'
              }`}
            >
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Right Trophy Badge */}
        <div className="shrink-0 flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl border backdrop-blur-sm text-xs font-black flex items-center gap-1.5 shadow-md ${
              isPurple
                ? 'bg-purple-900/60 border-purple-500/40 text-cyan-200'
                : isTeal
                ? 'bg-teal-900/60 border-teal-500/40 text-teal-200'
                : 'bg-emerald-900/60 border-emerald-500/40 text-amber-200'
            }`}
          >
            <Trophy
              size={13}
              className={isPurple ? 'text-cyan-300' : isTeal ? 'text-teal-300' : 'text-amber-300'}
            />
            <span>{earnedCount} Prestasi Diraih</span>
          </div>
        </div>
      </div>

      {/* ── STAGE VICTORY & DEBRIEF ARENA ─────────────────── */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 px-3 sm:px-6 py-2 sm:py-3 my-auto">
        {/* Celebration Emblem with Radiant Aura */}
        <div className="relative shrink-0 flex items-center justify-center select-none">
          <div
            className={`absolute inset-0 rounded-full ${
              isPurple ? 'bg-cyan-400/25' : isTeal ? 'bg-teal-400/25' : 'bg-amber-400/25'
            } blur-3xl animate-pulse`}
          />
          <div
            className={`w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-3xl ${
              isPurple
                ? 'bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-800 text-white border-2 border-cyan-300/80 shadow-[0_0_30px_rgba(6,182,212,0.5)]'
                : isTeal
                ? 'bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-800 text-white border-2 border-teal-300/80 shadow-[0_0_30px_rgba(45,212,191,0.5)]'
                : 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-2 border-amber-200/90 shadow-[0_0_30px_rgba(251,191,36,0.5)]'
            } flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform`}
          >
            {slide.celebrationEmoji || '🏆'}
          </div>
        </div>

        {/* Victory Debrief Card */}
        <div
          className={`flex-1 min-w-0 max-w-2xl rounded-2xl sm:rounded-3xl ${
            isPurple
              ? 'bg-gradient-to-br from-purple-950/95 via-indigo-950/95 to-slate-950/95 border-2 border-cyan-400/40 shadow-[0_12px_30px_rgba(30,27,75,0.7)] text-cyan-50/95'
              : isTeal
              ? 'bg-gradient-to-br from-teal-950/95 via-cyan-950/95 to-slate-950/95 border-2 border-teal-400/40 shadow-[0_12px_30px_rgba(13,148,136,0.7)] text-teal-50/95'
              : 'bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-slate-950/95 border-2 border-amber-400/40 shadow-[0_12px_30px_rgba(2,44,34,0.7)] text-amber-50/95'
          } backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col justify-between`}
        >
          <div>
            <div
              className={`flex items-center gap-2 mb-2 pb-2 border-b ${
                isPurple
                  ? 'border-cyan-400/30'
                  : isTeal
                  ? 'border-teal-400/30'
                  : 'border-amber-400/30'
              }`}
            >
              <CheckCircle2
                className={
                  isPurple
                    ? 'text-cyan-300 shrink-0'
                    : isTeal
                    ? 'text-teal-300 shrink-0'
                    : 'text-amber-300 shrink-0'
                }
                size={18}
              />
              <span
                className={`font-black text-xs sm:text-sm uppercase tracking-wider ${
                  isPurple ? 'text-cyan-200' : isTeal ? 'text-teal-200' : 'text-amber-300'
                }`}
              >
                {slide.reportTitle || 'Laporan Keberhasilan Misi:'}
              </span>
            </div>
            <p className="text-[12px] sm:text-sm md:text-[14.5px] font-medium leading-relaxed tracking-tight text-white/95">
              &ldquo;{slide.resolutionStory}&rdquo;
            </p>
          </div>

          {/* Achievement Medals Dock */}
          {badges.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
              {badges.map((badge, idx) => (
                <span
                  key={`badge-${idx}`}
                  className={`inline-flex items-center gap-1.5 rounded-xl ${
                    isPurple
                      ? 'bg-purple-950/80 border border-cyan-400/40 text-cyan-200'
                      : isTeal
                      ? 'bg-teal-950/80 border border-teal-400/40 text-teal-200'
                      : 'bg-emerald-950/80 border border-amber-400/40 text-amber-200'
                  } px-3 py-1 text-[11px] sm:text-xs font-black shadow-sm`}
                >
                  <Sparkles
                    size={13}
                    className={
                      isPurple ? 'text-cyan-300' : isTeal ? 'text-teal-300' : 'text-amber-300'
                    }
                  />
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ACTION CONTROLS HUD DOCK (TACTILE NEXT BUTTON) ── */}
      <div className="relative z-20 px-3 sm:px-5 py-2 shrink-0 flex items-center justify-between border-t border-emerald-800/40">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-200/80">
          <span>🌟 <em>Misi pemahaman sains berhasil diselesaikan secara sempurna!</em></span>
        </div>

        {onNext && (
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className={`min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 rounded-xl sm:rounded-2xl ml-auto ${
              isPurple
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 border-2 border-cyan-200 shadow-[0_4px_0_#0891b2] hover:shadow-[0_4px_16px_rgba(6,182,212,0.6)]'
                : isTeal
                ? 'bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 border-2 border-teal-200 shadow-[0_4px_0_#0f766e] hover:shadow-[0_4px_16px_rgba(45,212,191,0.6)]'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-2 border-amber-300 shadow-[0_4px_0_#b45309] hover:shadow-[0_4px_16px_rgba(251,191,36,0.6)]'
            } active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all`}
          >
            <span>
              {slide.actionButtonText && !slide.actionButtonText.includes('Diskusi Guru')
                ? slide.actionButtonText
                : 'Lanjut ke Refleksi HOTS'}
            </span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
