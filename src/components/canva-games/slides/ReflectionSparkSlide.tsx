import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { ReflectionSparkSlide as ReflectionSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { DrMayaAvatar } from '../characters/DrMayaAvatar';

export interface ReflectionSparkSlideProps {
  slide: ReflectionSlideData;
  themeColor?: PresentationThemeKey;
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
  themeColor = 'teal',
  onVictory,
}) => {
  const [discussedCards, setDiscussedCards] = useState<Record<number, boolean>>({});
  const isLabTheme = themeColor === 'teal' || slide.title?.toLowerCase().includes('lab');

  const toggleCard = (idx: number) => {
    const isNowChecked = !discussedCards[idx];
    setDiscussedCards((prev) => ({ ...prev, [idx]: isNowChecked }));
    if (isNowChecked) {
      sound.playCorrect();
    } else {
      sound.playClick();
    }
  };

  const totalCards = slide.sparkCards.length;
  const discussedCount = Object.values(discussedCards).filter(Boolean).length;
  const isAllDiscussed = totalCards > 0 && discussedCount === totalCards;

  const handleCelebrate = () => {
    sound.playCelebration();
    if (onVictory) {
      onVictory();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-2 sm:space-y-3 animate-in fade-in duration-300 overflow-hidden">
      {/* Header with Dr. Maya Mentor Badge */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div className="text-left space-y-0.5">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-100/80 px-2.5 py-0.5 rounded-full border border-teal-200">
            Diskusi Kritis & Refleksi Kelas
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-xl">
              {slide.subtitle}
            </p>
          )}
        </div>

        {isLabTheme && (
          <div className="hidden sm:flex shrink-0">
            <DrMayaAvatar size="sm" mood="explaining" />
          </div>
        )}
      </div>

      {/* 3 HOTS Question Cards with Interactive Discussion Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-auto flex-1 min-h-0 items-stretch">
        {slide.sparkCards.map((card, idx) => {
          const isDone = !!discussedCards[idx];
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
              onClick={() => toggleCard(idx)}
              className={`p-3.5 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border-3 transition-all duration-150 flex flex-col justify-between cursor-pointer select-none active:translate-y-1 ${
                isDone
                  ? 'border-emerald-400 border-b-6 border-b-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-300/60'
                  : 'border-slate-200/90 border-b-6 border-b-slate-300 hover:border-teal-400 hover:border-b-teal-500 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl ${badgeStyle.bg} ${badgeStyle.text} border-2 ${badgeStyle.border} font-black text-xs sm:text-sm flex items-center justify-center shadow-2xs`}
                  >
                    #{card.number || idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border transition-colors ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {isDone ? '✓ Dibahas' : 'Ketuk jika Tuntas'}
                  </span>
                </div>
                <h4 className="font-black text-xs sm:text-base text-slate-900 leading-snug">
                  {card.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold mt-2 pt-2 border-t border-slate-100">
                {card.question}
              </p>
              <div className="pt-2 text-[10px] font-bold flex items-center justify-between text-slate-400">
                <span>HOTS LEVEL 4</span>
                <span className={isDone ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                  {isDone ? 'SELESAI DIDISKUSIKAN' : 'KETUK UNTUK CENTANG'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion & Victory Celebration Dock */}
      <div className="bg-white/90 backdrop-blur-xs p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-3 shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <CheckCircle2
            className={isAllDiscussed ? 'text-emerald-500' : 'text-slate-400'}
            size={18}
          />
          <span className="font-bold">
            Status Diskusi:{' '}
            <strong className={isAllDiscussed ? 'text-emerald-600 font-black' : 'text-slate-700'}>
              {discussedCount} dari {totalCards} Pertanyaan Selesai
            </strong>
          </span>
        </div>

        {onVictory && (
          <button
            type="button"
            onClick={handleCelebrate}
            className={`py-2 px-4 sm:px-6 rounded-xl font-black text-xs sm:text-sm border-2 border-b-4 flex items-center gap-1.5 shadow-md active:translate-y-0.5 active:border-b-2 cursor-pointer transition-all ${
              isAllDiscussed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-800 animate-bounce'
                : 'bg-teal-600 hover:bg-teal-700 text-white border-teal-800'
            }`}
          >
            <Sparkles size={15} />
            <span>Rayakan Misi Tuntas!</span>
          </button>
        )}
      </div>
    </div>
  );
};
