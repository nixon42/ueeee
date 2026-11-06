import React, { useState, useEffect } from 'react';
import { RotateCw, CheckCircle2, HelpCircle, Award, RotateCcw } from 'lucide-react';
import { sound } from '@/lib/sound';
import { FlashcardItem } from '@/types/presentation';

export type FlashcardTheme = 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'teal' | 'orange';

export interface InteractiveFlashcardsProps {
  title?: string;
  instructions?: string;
  subtitle?: string; // Backward compatibility alias
  cards: FlashcardItem[];
  onComplete?: (masteredCount: number, totalCount: number) => void;
  theme?: FlashcardTheme;
  className?: string;
}

const FLASHCARD_THEME_STYLES: Record<FlashcardTheme, {
  container: string;
  badge: string;
  tag: string;
  frontBg: string;
  frontBorder: string;
  frontCategory: string;
  frontFlipText: string;
  backBorder: string;
  backBg: string;
}> = {
  blue: {
    container: 'bg-blue-50/40 border-blue-200/80',
    badge: 'text-blue-700 bg-blue-100',
    tag: 'text-blue-700/80 bg-blue-100/60 border-blue-200/50',
    frontBg: 'from-white via-blue-50/20 to-indigo-50/30',
    frontBorder: 'border-blue-200',
    frontCategory: 'text-blue-700 bg-blue-50 border-blue-200',
    frontFlipText: 'text-blue-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  purple: {
    container: 'bg-purple-50/40 border-purple-200/80',
    badge: 'text-purple-700 bg-purple-100',
    tag: 'text-purple-700/80 bg-purple-100/60 border-purple-200/50',
    frontBg: 'from-white via-purple-50/20 to-indigo-50/30',
    frontBorder: 'border-purple-200',
    frontCategory: 'text-purple-700 bg-purple-50 border-purple-200',
    frontFlipText: 'text-purple-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  emerald: {
    container: 'bg-emerald-50/40 border-emerald-200/80',
    badge: 'text-emerald-700 bg-emerald-100',
    tag: 'text-emerald-700/80 bg-emerald-100/60 border-emerald-200/50',
    frontBg: 'from-white via-emerald-50/20 to-teal-50/30',
    frontBorder: 'border-emerald-200',
    frontCategory: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    frontFlipText: 'text-emerald-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  amber: {
    container: 'bg-amber-50/40 border-amber-200/80',
    badge: 'text-amber-700 bg-amber-100',
    tag: 'text-amber-700/80 bg-amber-100/60 border-amber-200/50',
    frontBg: 'from-white via-amber-50/20 to-yellow-50/30',
    frontBorder: 'border-amber-200',
    frontCategory: 'text-amber-700 bg-amber-50 border-amber-200',
    frontFlipText: 'text-amber-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  rose: {
    container: 'bg-rose-50/40 border-rose-200/80',
    badge: 'text-rose-700 bg-rose-100',
    tag: 'text-rose-700/80 bg-rose-100/60 border-rose-200/50',
    frontBg: 'from-white via-rose-50/20 to-pink-50/30',
    frontBorder: 'border-rose-200',
    frontCategory: 'text-rose-700 bg-rose-50 border-rose-200',
    frontFlipText: 'text-rose-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  indigo: {
    container: 'bg-indigo-50/40 border-indigo-200/80',
    badge: 'text-indigo-700 bg-indigo-100',
    tag: 'text-indigo-700/80 bg-indigo-100/60 border-indigo-200/50',
    frontBg: 'from-white via-indigo-50/20 to-purple-50/30',
    frontBorder: 'border-indigo-200',
    frontCategory: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    frontFlipText: 'text-indigo-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  teal: {
    container: 'bg-teal-50/40 border-teal-200/80',
    badge: 'text-teal-700 bg-teal-100',
    tag: 'text-teal-700/80 bg-teal-100/60 border-teal-200/50',
    frontBg: 'from-white via-teal-50/20 to-cyan-50/30',
    frontBorder: 'border-teal-200',
    frontCategory: 'text-teal-700 bg-teal-50 border-teal-200',
    frontFlipText: 'text-teal-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
  orange: {
    container: 'bg-orange-50/40 border-orange-200/80',
    badge: 'text-orange-700 bg-orange-100',
    tag: 'text-orange-700/80 bg-orange-100/60 border-orange-200/50',
    frontBg: 'from-white via-orange-50/20 to-pink-50/30',
    frontBorder: 'border-orange-200',
    frontCategory: 'text-orange-700 bg-orange-50 border-orange-200',
    frontFlipText: 'text-orange-600',
    backBorder: 'border-emerald-300',
    backBg: 'from-emerald-50/90 via-white to-teal-50/90',
  },
};

/**
 * Komponen Game Interaktif Flashcards 3D: Active Recall & Concept Mastery
 * Pure CSS 3D transform dengan perspective 1200px dan preserve-3d.
 */
export const InteractiveFlashcards: React.FC<InteractiveFlashcardsProps> = ({
  title = 'Kartu Pemahaman Konsep',
  instructions,
  subtitle,
  cards,
  onComplete,
  theme = 'blue',
  className = '',
}) => {
  const displayInstructions = instructions || subtitle || 'Uji pemahaman konsepmu! Pikirkan jawaban sebelum membalik kartu.';
  const themeStyle = FLASHCARD_THEME_STYLES[theme] || FLASHCARD_THEME_STYLES.blue;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [ratings, setRatings] = useState<Record<string, 'mastered' | 'review'>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setRatings({});
    setIsFinished(false);
  }, [cards]);

  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    sound.playCardFlip();
    setIsFlipped(prev => !prev);
  };

  const handleRate = (rating: 'mastered' | 'review') => {
    if (!currentCard) return;

    const nextRatings = { ...ratings, [currentCard.id]: rating };
    setRatings(nextRatings);

    if (rating === 'mastered') {
      sound.playCorrect();
    } else {
      sound.playClick();
    }

    if (currentIndex < cards.length - 1) {
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex(prev => prev + 1);
      }, 200);
    } else {
      setIsFinished(true);
      const masteredCount = Object.values(nextRatings).filter(r => r === 'mastered').length;
      if (onComplete) {
        onComplete(masteredCount, cards.length);
      }
    }
  };

  const handleResetCards = () => {
    sound.playClick();
    setCurrentIndex(0);
    setIsFlipped(false);
    setRatings({});
    setIsFinished(false);
  };

  const masteredCount = Object.values(ratings).filter(r => r === 'mastered').length;

  return (
    <div
      className={`w-full flex flex-col items-center justify-between p-4 sm:p-6 rounded-3xl border shadow-sm relative overflow-hidden ${themeStyle.container} ${className}`}
    >
      {/* Header Tantangan Flashcard */}
      <div className="text-center max-w-xl mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">{displayInstructions}</p>
      </div>

      {/* Progress Bar & Indikator Kartu */}
      <div className="w-full max-w-lg flex items-center justify-between mb-3 px-2">
        <span className="text-xs font-bold text-slate-500">
          Kartu {Math.min(currentIndex + 1, cards.length)} dari {cards.length}
        </span>
        <div className="flex items-center gap-1.5">
          {cards.map((c, idx) => {
            const rating = ratings[c.id];
            const isCurrent = idx === currentIndex;
            return (
              <span
                key={c.id || `dot-${idx}`}
                className={`h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'w-6 bg-slate-800'
                    : rating === 'mastered'
                    ? 'w-2 bg-emerald-500'
                    : rating === 'review'
                    ? 'w-2 bg-amber-400'
                    : 'w-2 bg-slate-300'
                }`}
                title={`Kartu ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Arena Kartu 3D Pure CSS */}
      <div className="w-full max-w-lg my-auto" style={{ perspective: '1200px' }}>
        {!isFinished && currentCard ? (
          <div
            className="relative w-full h-80 sm:h-96 transition-transform duration-500 ease-out cursor-pointer select-none"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
            onClick={handleFlip}
          >
            {/* SISI DEPAN (FRONT FACE) */}
            <div
              className={`absolute inset-0 w-full h-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${themeStyle.frontBg} border-2 ${themeStyle.frontBorder} shadow-lg flex flex-col justify-between`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl border ${themeStyle.frontCategory}`}>
                  {currentCard.category || 'Tantangan Konsep'}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {currentIndex + 1} / {cards.length}
                </span>
              </div>

              <div className="flex flex-col items-center text-center my-auto space-y-3">
                {(currentCard.frontEmoji || currentCard.iconEmoji) && (
                  <span className="text-5xl drop-shadow-sm select-none">
                    {currentCard.frontEmoji || currentCard.iconEmoji}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {currentCard.frontPrompt}
                </h3>
                {currentCard.frontHint && (
                  <p className="text-xs text-slate-500 italic bg-white/60 px-3 py-1 rounded-full border border-slate-200">
                    💡 Petunjuk: {currentCard.frontHint}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <HelpCircle size={14} /> Pikirkan jawabanmu
                </span>
                <span className={`font-bold ${themeStyle.frontFlipText} flex items-center gap-1`}>
                  <RotateCw size={14} /> Klik untuk Balik Kartu
                </span>
              </div>
            </div>

            {/* SISI BELAKANG (BACK FACE) */}
            <div
              className={`absolute inset-0 w-full h-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${themeStyle.backBg} border-2 ${themeStyle.backBorder} shadow-xl flex flex-col justify-between`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Kunci Konsep & Faktual
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFlip();
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                  title="Balik ke pertanyaan"
                >
                  <RotateCw size={14} />
                </button>
              </div>

              <div className="my-auto space-y-2.5 text-left">
                {currentCard.backTitle && (
                  <h4 className="font-black text-xs text-emerald-950 uppercase tracking-wider">
                    {currentCard.backTitle}
                  </h4>
                )}
                <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
                  {currentCard.backAnswer}
                </p>
                {currentCard.backExplanation && (
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                    {currentCard.backExplanation}
                  </p>
                )}
                {currentCard.backCurriculumFact && (
                  <p className="text-[11px] text-teal-800 font-semibold italic bg-teal-50/60 p-2 rounded-lg border border-teal-200/50">
                    📌 {currentCard.backCurriculumFact}
                  </p>
                )}
              </div>

              <div className="pt-2.5 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
                <span>Evaluasi penguasaanmu di bawah ini:</span>
              </div>
            </div>
          </div>
        ) : (
          /* RINGKASAN SETELAH SELESAI */
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-300 shadow-xl flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-inner">
              <Award size={36} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Evaluasi Flashcard Selesai!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
              Kamu telah menguasai{' '}
              <strong className="text-emerald-700 font-black">{masteredCount}</strong> dari{' '}
              <strong>{cards.length}</strong> konsep kunci.
            </p>

            <button
              type="button"
              onClick={handleResetCards}
              className="py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition shadow-sm"
            >
              <RotateCcw size={15} />
              <span>Ulas Kembali Semua Kartu</span>
            </button>
          </div>
        )}
      </div>

      {/* Rating Buttons (Muncul saat kartu terbalik untuk evaluasi aktif) */}
      {!isFinished && isFlipped && (
        <div className="flex items-center gap-3 mt-4 w-full max-w-md justify-center animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => handleRate('review')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border-2 border-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
          >
            <span>🔴 Perlu Diulas Lagi</span>
          </button>

          <button
            type="button"
            onClick={() => handleRate('mastered')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition"
          >
            <CheckCircle2 size={16} />
            <span>🟢 Sudah Paham!</span>
          </button>
        </div>
      )}

      {/* Tombol Balik Manual jika belum dibalik */}
      {!isFinished && !isFlipped && (
        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            onClick={handleFlip}
            className="py-2.5 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer transition"
          >
            <RotateCw size={15} />
            <span>Balik Kartu (Lihat Jawaban)</span>
          </button>
        </div>
      )}
    </div>
  );
};
