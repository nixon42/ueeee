import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface GameVictoryModalProps {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  score?: number | string;
  onPlayAgain: () => void;
  onClose: () => void;
  playAgainText?: string;
  closeText?: string;
  themeColor?: 'orange' | 'teal' | 'purple' | 'emerald';
  triggerConfetti?: boolean;
}

const BUTTON_THEMES: Record<string, string> = {
  orange: 'bg-orange-600 hover:bg-orange-700 text-white',
  teal: 'bg-teal-600 hover:bg-teal-700 text-white',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white',
  emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
};

export const GameVictoryModal: React.FC<GameVictoryModalProps> = ({
  isOpen,
  title,
  description,
  score,
  onPlayAgain,
  onClose,
  playAgainText = 'Main Lagi',
  closeText = 'Kembali ke Beranda',
  themeColor = 'orange',
  triggerConfetti = true,
}) => {
  useEffect(() => {
    if (isOpen && triggerConfetti) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen, triggerConfetti]);

  if (!isOpen) return null;

  const btnClass = BUTTON_THEMES[themeColor] || BUTTON_THEMES.orange;

  return (
    <div className="absolute inset-0 z-40 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white max-w-sm sm:max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl text-center space-y-4 border border-amber-300 animate-scaleUp">
        {/* Trophy Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-inner">
          <Trophy size={40} />
        </div>

        {/* Title */}
        <h3 className="font-black text-xl sm:text-2xl text-slate-800 leading-tight">
          {title}
        </h3>

        {/* Description / Feedback */}
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </div>

        {/* Score Badge (if provided) */}
        {score !== undefined && (
          <div className="inline-block px-4 py-1.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 font-extrabold text-sm sm:text-base">
            Total Skor: {score} Poin
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 pt-3">
          <button
            onClick={onPlayAgain}
            className={`flex-1 py-3.5 ${btnClass} font-extrabold rounded-2xl text-xs sm:text-sm transition shadow cursor-pointer active:scale-95`}
          >
            {playAgainText}
          </button>
          <button
            onClick={onClose}
            className="px-5 sm:px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl text-xs sm:text-sm transition cursor-pointer active:scale-95"
          >
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
};
