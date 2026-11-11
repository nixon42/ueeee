import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { LinguisticQuestion } from './types';
import { marioAudio } from './audio';

interface Props {
  question: LinguisticQuestion;
  onAnswer: (correct: boolean, points: number) => void;
}

export const LinguisticQuizPopup: React.FC<Props> = ({ question, onAnswer }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return;
    setSelectedIndex(index);
    setHasSubmitted(true);

    const isCorrect = index === question.correctIndex;
    if (isCorrect) {
      marioAudio.playPowerUp();
    } else {
      marioAudio.playHurt();
    }
  };

  const handleContinue = () => {
    const isCorrect = selectedIndex === question.correctIndex;
    onAnswer(isCorrect, isCorrect ? 150 : 25);
  };

  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-100 border-4 border-amber-400 p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-3 overflow-hidden select-none">
        {/* Mario Mystery Box Decorative Top Edge */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-amber-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
              ?
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-black text-[10px] uppercase tracking-wider">
                {question.categoryLabel}
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                Tantangan Balok Misteri Deskripsi!
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-lg border border-amber-300">
            Bonus +150 Poin
          </span>
        </div>

        {/* Snippet / Passage Box */}
        {question.passageSnippet && (
          <div className="rounded-2xl bg-amber-100/70 border border-amber-300 p-3 shadow-inner">
            <div className="flex items-center gap-1.5 text-amber-900 text-[10.5px] font-black uppercase tracking-wider mb-1">
              <BookOpen size={12} className="text-amber-700" />
              <span>Kutipan Kalimat Objek:</span>
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-slate-800 italic leading-relaxed">
              {question.passageSnippet}
            </p>
          </div>
        )}

        {/* Prompt Question */}
        <div className="px-1">
          <p className="text-xs sm:text-sm md:text-[14.5px] font-black text-slate-900 leading-snug">
            {question.prompt}
          </p>
        </div>

        {/* Multiple Choice Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-1">
          {question.options.map((opt, idx) => {
            let btnStyle =
              'bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-slate-800 shadow-sm';

            if (hasSubmitted) {
              if (idx === question.correctIndex) {
                btnStyle =
                  'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 shadow-[0_0_12px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400 font-black';
              } else if (idx === selectedIndex) {
                btnStyle =
                  'bg-rose-50 border-2 border-rose-500 text-rose-950 shadow-[0_0_12px_rgba(244,63,94,0.3)] line-through';
              } else {
                btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-[44px] p-2.5 rounded-xl text-left text-xs sm:text-[12.5px] font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-900 text-[10px] font-black flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </div>
                {hasSubmitted && idx === question.correctIndex && (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                )}
                {hasSubmitted && idx === selectedIndex && idx !== question.correctIndex && (
                  <XCircle size={16} className="text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Feedback Card */}
        {hasSubmitted && (
          <div
            className={`rounded-2xl p-3 border-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
              isCorrect
                ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                : 'bg-rose-100 border-rose-400 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-xs sm:text-sm mb-1">
              <Sparkles size={16} className={isCorrect ? 'text-emerald-700' : 'text-rose-700'} />
              <span>{isCorrect ? 'Luar Biasa! Jawabanmu Benar! (+150 Poin)' : 'Kurang Tepat, Mari Pelajari!'}</span>
            </div>
            <p className="text-[11px] sm:text-xs font-medium leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Continue Button */}
        {hasSubmitted && (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full min-h-[46px] rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm border-2 border-amber-200 shadow-[0_4px_0_#b45309] hover:shadow-[0_4px_16px_rgba(251,191,36,0.5)] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition-all mt-1"
          >
            <span>Lanjut Berlari!</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
