import React from 'react';
import { MessageCircle, Flag } from 'lucide-react';
import { ReflectionSparkSlide as ReflectionSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';

export interface ReflectionSparkSlideProps {
  slide: ReflectionSlideData;
  themeColor?: PresentationThemeKey;
  onVictory?: () => void;
}

const BADGE_COLOR_MAP: Record<string, { bg: string; text: string; ring: string }> = {
  purple: { bg: 'bg-purple-500', text: 'text-white', ring: 'ring-purple-400/50' },
  emerald: { bg: 'bg-emerald-500', text: 'text-white', ring: 'ring-emerald-400/50' },
  blue: { bg: 'bg-blue-500', text: 'text-white', ring: 'ring-blue-400/50' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-950', ring: 'ring-amber-400/50' },
  rose: { bg: 'bg-rose-500', text: 'text-white', ring: 'ring-rose-400/50' },
  teal: { bg: 'bg-teal-500', text: 'text-white', ring: 'ring-teal-400/50' },
};

export const ReflectionSparkSlide: React.FC<ReflectionSparkSlideProps> = ({
  slide,
}) => {
  const cards = slide.sparkCards ?? [];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-3xl border-4 border-indigo-950/40 shadow-[0_18px_40px_-12px_rgba(30,27,75,0.55)] animate-in fade-in duration-300">
      {/* ── REFLECTION HUD BAR ───────────────────────── */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-2.5 sm:px-4 pt-2.5 sm:pt-3 shrink-0">
        <div className="inline-flex items-center gap-2 rounded-xl bg-indigo-950/80 border-2 border-amber-400/70 backdrop-blur-sm pl-1.5 pr-3 py-1 shadow-lg">
          <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-indigo-950 font-black text-[10px] sm:text-[11px] tracking-widest uppercase">
            Refleksi
          </span>
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-amber-100">
            {slide.chapterBadge || 'BABAK: REFLEKSI & DISKUSI KELAS'}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-950/80 border-2 border-indigo-400/50 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
          <MessageCircle size={12} className="text-indigo-300" />
          <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-indigo-200">
            {cards.length} Pemantik Diskusi
          </span>
        </div>
      </div>

      {/* ── REFLECTION TITLE PLAQUE ──────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2 sm:pt-3 shrink-0">
        <div className="inline-block max-w-[94%] sm:max-w-[84%] rounded-2xl bg-gradient-to-r from-indigo-950/92 via-indigo-900/88 to-indigo-900/55 border-l-[6px] border-amber-400 backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-2.5 shadow-xl">
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

      {/* ── STAGE: HOTS DISCUSSION CARDS ─────────────── */}
      <div className="relative z-20 flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 px-2.5 sm:px-4 py-2.5 sm:py-3 content-center">
        {cards.map((card, idx) => {
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
              className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900/95 via-indigo-950/95 to-slate-950/95 border-2 border-indigo-400/50 shadow-[0_10px_26px_rgba(30,27,75,0.5)] backdrop-blur-md px-3.5 sm:px-4 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${badgeStyle.bg} ${badgeStyle.text} ring-2 ${badgeStyle.ring} font-black text-sm sm:text-base flex items-center justify-center shrink-0`}
                >
                  {card.number || idx + 1}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight">
                  {card.title}
                </h4>
              </div>
              <p className="text-[11.5px] sm:text-[13px] text-indigo-100/85 font-medium leading-relaxed flex-1">
                {card.question}
              </p>
              <div className="inline-flex items-center gap-1.5 text-indigo-300/70">
                <Flag size={12} />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                  Diskusi Kelas
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
