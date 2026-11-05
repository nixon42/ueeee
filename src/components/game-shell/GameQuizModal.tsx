import React from 'react';
import { HelpCircle, Check, AlertCircle, X } from 'lucide-react';

export type QuizBadgeVariant = 'emerald' | 'rose' | 'amber' | 'purple' | 'teal';

export interface GameQuizModalProps {
  isOpen: boolean;
  title?: string;
  badgeText?: string;
  badgeVariant?: QuizBadgeVariant;
  topic?: string;
  question: string;
  options: string[];
  onSelectOption: (index: number) => void;
  feedback?: {
    isCorrect: boolean;
    text: string;
  } | null;
  onClose?: () => void;
}

const BADGE_STYLES: Record<QuizBadgeVariant, string> = {
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  rose: 'bg-rose-50 border-rose-200 text-rose-800',
  amber: 'bg-amber-50 border-amber-200 text-amber-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  teal: 'bg-teal-50 border-teal-200 text-teal-800',
};

export const GameQuizModal: React.FC<GameQuizModalProps> = ({
  isOpen,
  badgeText,
  badgeVariant = 'purple',
  topic,
  question,
  options,
  onSelectOption,
  feedback,
  onClose,
}) => {
  if (!isOpen) return null;

  const badgeClass = BADGE_STYLES[badgeVariant] || BADGE_STYLES.purple;

  return (
    <div className="absolute inset-0 z-40 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white max-w-lg w-full p-6 sm:p-7 rounded-3xl shadow-2xl border border-purple-100 space-y-4 animate-scaleUp">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2">
          {badgeText ? (
            <span
              className={`text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl border flex items-center gap-1.5 ${badgeClass}`}
            >
              <HelpCircle size={14} />
              {badgeText}
            </span>
          ) : (
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
              Kuis Evaluasi Pembelajaran
            </span>
          )}

          <div className="flex items-center gap-2">
            {topic && (
              <span className="text-xs font-bold text-slate-400 capitalize">
                Topik: {topic}
              </span>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Soal / Pertanyaan */}
        <h4 className="font-extrabold text-base sm:text-lg text-slate-800 leading-snug">
          {question}
        </h4>

        {/* Feedback Alert Box */}
        {feedback && (
          <div
            className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-2.5 animate-fadeIn ${
              feedback.isCorrect
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                : 'bg-rose-100 text-rose-900 border border-rose-200'
            }`}
          >
            {feedback.isCorrect ? (
              <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
            )}
            <p className="leading-relaxed">{feedback.text}</p>
          </div>
        )}

        {/* Pilihan Jawaban */}
        <div className="space-y-2.5 pt-1">
          {options.map((opt, idx) => (
            <button
              key={idx}
              disabled={!!feedback}
              onClick={() => onSelectOption(idx)}
              className="w-full text-left p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/70 text-xs sm:text-sm font-semibold text-slate-700 transition disabled:opacity-60 flex items-center justify-between group cursor-pointer active:scale-98"
            >
              <div className="flex items-center">
                <span className="font-black text-purple-600 mr-3 w-5">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="font-medium text-slate-800">{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
