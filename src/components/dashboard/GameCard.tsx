import React from 'react';
import { Play, Clock, Sparkles, Star, Bookmark } from 'lucide-react';
import { GameItem } from '@/types/game';
import { sound } from '@/lib/sound';

interface Props {
  game: GameItem;
  onPlay: (game: GameItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (gameId: string) => void;
}

export const GameCard: React.FC<Props> = ({
  game,
  onPlay,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleClick = () => {
    sound.playClick();
    onPlay(game);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (onToggleFavorite) onToggleFavorite(game.id);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Card Header Cover / Thumbnail */}
      <div className={`relative h-44 w-full bg-gradient-to-tr ${game.gradient} p-4 flex flex-col justify-between overflow-hidden`}>
        {/* Soft background shape */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

        <div className="flex items-center justify-between z-10">
          {game.badge ? (
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm ${game.badgeColor || 'bg-white/20 text-white border-white/30 backdrop-blur-sm'}`}>
              {game.badge}
            </span>
          ) : (
            <span></span>
          )}

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-full transition ${
                isFavorite
                  ? 'bg-amber-400 text-slate-900 shadow'
                  : 'bg-black/20 text-white/80 hover:bg-black/40 hover:text-white backdrop-blur-sm'
              }`}
              title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
            >
              <Bookmark size={13} className={isFavorite ? 'fill-slate-900' : ''} />
            </button>

            {/* Play time */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full">
              <Clock size={12} />
              <span>{game.playTimeMinutes} mnt</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Center Representation */}
        <div className="z-10 flex items-center justify-between">
          <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl shadow">
            {game.type === 'ular-tangga' ? '🎲' : game.type === 'point-and-click' ? '🔍' : '🧩'}
          </div>

          <div className="w-11 h-11 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <Play size={18} className="fill-slate-800 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
              {game.gradeLevel}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star size={12} className="fill-amber-500 text-amber-500" />
              <span>{game.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-slate-800 group-hover:text-slate-950 transition-colors line-clamp-1">
            {game.title}
          </h3>

          <p className="mt-1 text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition flex items-center gap-1">
            <Sparkles size={13} />
            Gratis • Tanpa Login
          </span>

          <span className="text-xs font-extrabold text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-xl group-hover:bg-indigo-900 group-hover:text-white transition shadow-sm">
            Main Sekarang →
          </span>
        </div>
      </div>
    </div>
  );
};
