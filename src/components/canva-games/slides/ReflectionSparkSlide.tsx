import React from 'react';
import { MessageCircle, Flag, Trophy } from 'lucide-react';
import { ReflectionSparkSlide as ReflectionSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';

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
  themeColor = 'emerald',
  onVictory,
}) => {
  const isPurple = themeColor === 'purple';
  const cards = slide.sparkCards ?? [];

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border-4 ${
        isPurple
          ? 'border-purple-900/50 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.65)]'
          : 'border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)]'
      } select-none animate-in fade-in duration-300`}
    >
      {/* ── COCKPIT HUD TOP BAR (UNIFIED SINGLE PLAQUE) ──── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
        <div
          className={`inline-block max-w-[75%] sm:max-w-[80%] rounded-2xl ${
            isPurple
              ? 'bg-gradient-to-r from-purple-950/95 via-indigo-900/90 to-slate-950/55 border-l-[6px] border-cyan-400'
              : 'bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-900/55 border-l-[6px] border-amber-400'
          } backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-1.5 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase ${
                isPurple ? 'bg-cyan-400 text-slate-950' : 'bg-amber-400 text-emerald-950'
              }`}
            >
              REFLEKSI &amp; HOTS
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
              {slide.title}
            </h2>
          </div>
          {slide.subtitle && (
            <p
              className={`text-[10.5px] sm:text-xs font-bold leading-snug mt-0.5 truncate hidden sm:block ${
                isPurple ? 'text-cyan-300/95' : 'text-amber-300/95'
              }`}
            >
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Right Discussion Counter Badge */}
        <div className="shrink-0 flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl border backdrop-blur-sm text-xs font-black flex items-center gap-1.5 shadow-md ${
              isPurple
                ? 'bg-purple-900/60 border-purple-500/40 text-cyan-200'
                : 'bg-emerald-900/60 border-emerald-500/40 text-amber-200'
            }`}
          >
            <MessageCircle size={13} className={isPurple ? 'text-cyan-300' : 'text-amber-300'} />
            <span>{cards.length} Pemantik Diskusi</span>
          </div>
        </div>
      </div>

      {/* ── STAGE: HOTS DISCUSSION CARDS ARENA ───────────── */}
      <div className="relative z-20 flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3.5 px-3 sm:px-6 py-2 sm:py-3 content-center my-auto">
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
              className={`relative rounded-2xl sm:rounded-3xl ${
                isPurple
                  ? 'bg-gradient-to-br from-slate-900/95 via-purple-950/90 to-slate-950/95 border-2 border-purple-500/50 hover:border-cyan-400 shadow-[0_10px_26px_rgba(46,16,101,0.5)]'
                  : 'bg-gradient-to-br from-slate-900/95 via-emerald-950/90 to-slate-950/95 border-2 border-emerald-500/40 hover:border-amber-400 shadow-[0_10px_26px_rgba(2,44,34,0.5)]'
              } backdrop-blur-md px-3.5 sm:px-4 py-3 sm:py-4 flex flex-col justify-between gap-2 sm:gap-3 transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div>
                {/* Header: Card Number & Title */}
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800/80">
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${badgeStyle.bg} ${badgeStyle.text} ring-2 ${badgeStyle.ring} font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    #{card.number || idx + 1}
                  </span>
                  <h4 className="font-black text-xs sm:text-sm text-white leading-tight">
                    {card.title}
                  </h4>
                </div>

                {/* HOTS Question Body */}
                <p
                  className={`text-[11.5px] sm:text-[12.5px] ${
                    isPurple ? 'text-purple-100/90' : 'text-amber-50/90'
                  } font-medium leading-relaxed mt-2`}
                >
                  {card.question}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div
                className={`pt-2 border-t border-slate-800/60 inline-flex items-center gap-1.5 ${
                  isPurple ? 'text-cyan-300/80' : 'text-amber-300/80'
                }`}
              >
                <Flag size={12} />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                  Diskusi Kelas &amp; Analisis Kritis
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ACTION CONTROLS HUD DOCK (VICTORY TROPHY TRIGGER) ── */}
      <div className="relative z-20 px-3 sm:px-5 py-2 shrink-0 flex items-center justify-between border-t border-emerald-800/40">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-200/80">
          <span>💬 <em>Diskusikan argumen terbaik bersama kelompok belajarmu.</em></span>
        </div>

        {onVictory && (
          <button
            type="button"
            onClick={() => {
              sound.playFanfare();
              onVictory();
            }}
            className={`min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 rounded-xl sm:rounded-2xl ml-auto ${
              isPurple
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 border-2 border-cyan-200 shadow-[0_4px_0_#0891b2] hover:shadow-[0_4px_16px_rgba(6,182,212,0.6)]'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-2 border-amber-300 shadow-[0_4px_0_#b45309] hover:shadow-[0_4px_16px_rgba(251,191,36,0.6)]'
            } active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all animate-pulse`}
          >
            <Trophy size={16} />
            <span>{slide.victoryButtonText || 'Selesaikan Ekspedisi & Buka Piala'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
