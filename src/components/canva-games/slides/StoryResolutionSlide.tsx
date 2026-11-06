import React from 'react';
import { CheckCircle2, Trophy } from 'lucide-react';
import { StoryResolutionSlide as StoryResolutionSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';

export interface StoryResolutionSlideProps {
  slide: StoryResolutionSlideData;
  themeColor: PresentationThemeKey;
  challengesState?: Record<string, boolean>;
  onNext?: () => void;
}

export const StoryResolutionSlide: React.FC<StoryResolutionSlideProps> = ({
  slide,
  challengesState = {},
}) => {
  const badges = slide.achievementBadges ?? [];
  const earnedCount = badges.filter((b) =>
    challengesState[slugify(b.label)] ?? true
  ).length;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-3xl border-4 border-amber-700/40 shadow-[0_18px_40px_-12px_rgba(69,26,3,0.55)] animate-in fade-in duration-300">
      {/* ── RESOLUTION HUD BAR ───────────────────────── */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-2.5 sm:px-4 pt-2.5 sm:pt-3 shrink-0">
        <div className="inline-flex items-center gap-2 rounded-xl bg-amber-950/80 border-2 border-amber-400/70 backdrop-blur-sm pl-1.5 pr-3 py-1 shadow-lg">
          <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-[10px] sm:text-[11px] tracking-widest uppercase">
            Misi Tuntas
          </span>
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-amber-100">
            {slide.chapterBadge || 'BABAK: DAMPAK SOLUSI SISWA'}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl bg-amber-950/80 border-2 border-amber-400/50 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
          <Trophy size={12} className="text-amber-300" />
          <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-200">
            {earnedCount} Prestasi Diraih
          </span>
        </div>
      </div>

      {/* ── SUCCESS TITLE PLAQUE ─────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2 sm:pt-3 shrink-0">
        <div className="inline-block max-w-[94%] sm:max-w-[84%] rounded-2xl bg-gradient-to-r from-amber-950/92 via-amber-900/88 to-amber-900/55 border-l-[6px] border-amber-400 backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-2.5 shadow-xl">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight drop-shadow">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-[11px] sm:text-sm font-bold text-amber-300/95 leading-snug mt-0.5">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── STAGE ────────────────────────────────────── */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-3 sm:px-5 py-2 sm:py-3">
        {/* Celebration emblem */}
        <div className="relative shrink-0 flex items-center justify-center select-none">
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-[28px] bg-gradient-to-br from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-2xl border-4 border-amber-200/90 ring-4 ring-amber-950/40">
            {slide.celebrationEmoji || '🏆'}
          </div>
        </div>

        {/* Debrief card */}
        <div className="flex-1 min-w-0 max-w-2xl rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-900/95 via-amber-950/95 to-slate-950/95 border-2 border-amber-300/70 shadow-[0_12px_30px_rgba(69,26,3,0.55)] backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-5">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-400/30">
            <CheckCircle2 className="text-amber-300 shrink-0" size={18} />
            <span className="font-extrabold text-xs sm:text-sm text-amber-50">
              {slide.reportTitle || 'Laporan Keberhasilan Misi:'}
            </span>
          </div>
          <p className="text-[12px] sm:text-sm md:text-[15px] font-semibold leading-relaxed text-amber-50/95 tracking-tight">
            &ldquo;{slide.resolutionStory}&rdquo;
          </p>

          {/* Achievement badges */}
          {badges.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((badge, idx) => (
                <span
                  key={`badge-${idx}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400/15 border border-amber-300/60 px-2.5 py-1 text-[10px] sm:text-[11px] font-extrabold text-amber-100"
                >
                  <span className="text-amber-300">{badge.icon || '🏅'}</span>
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
