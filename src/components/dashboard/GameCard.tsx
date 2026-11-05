import React from 'react';
import { Play, Clock, Sparkles } from 'lucide-react';
import { GameItem } from '@/types/game';
import { sound } from '@/lib/sound';

interface Props {
  game: GameItem;
  onPlay: (game: GameItem) => void;
}

export const GameCard: React.FC<Props> = ({ game, onPlay }) => {
  const handleClick = () => {
    sound.playClick();
    onPlay(game);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Card Header Cover / Thumbnail */}
      <div className={`relative h-40 w-full bg-gradient-to-tr ${game.gradient} p-4 flex flex-col justify-between overflow-hidden`}>
        {/* Soft background shape */}
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

        <div className="flex items-center justify-between z-10">
          {game.badge ? (
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${game.badgeColor || 'bg-white/20 text-white border-white/30 backdrop-blur-sm'}`}>
              {game.badge}
            </span>
          ) : (
            <span></span>
          )}

          <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full">
            <Clock size={12} />
            <span>{game.playTimeMinutes} mnt</span>
          </div>
        </div>

        {/* Thumbnail Title Icon Graphic */}
        <div className="z-10 flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl shadow">
            {game.type === 'ular-tangga' ? '🎲' : game.type === 'point-and-click' ? '🔍' : '💡'}
          </div>

          <div className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <Play size={16} className="fill-slate-800 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
              {game.gradeLevel}
            </span>
          </div>

          <h3 className="font-extrabold text-base text-slate-800 group-hover:text-purple-600 transition-colors line-clamp-1">
            {game.title}
          </h3>

          <p className="mt-1 text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Action Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 group-hover:text-purple-600 transition flex items-center gap-1">
            <Sparkles size={13} />
            Gratis • Main Langsung
          </span>

          <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition">
            Main Sekarang →
          </span>
        </div>
      </div>
    </div>
  );
};
