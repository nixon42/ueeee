import React from 'react';
import { Play, Clock, Star, Bookmark, BookOpen, ChevronRight } from 'lucide-react';
import { GameItem } from '@/types/game';
import { sound } from '@/lib/sound';
import { GameIllustration } from '@/components/dashboard/GameIllustration';

interface Props {
  game: GameItem;
  onPlay: (game: GameItem) => void;
  onOpenProlog?: (game: GameItem) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (gameId: string) => void;
}

const GameCardComponent: React.FC<Props> = ({
  game,
  onPlay,
  onOpenProlog,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const handleClick = () => {
    sound.playClick();
    onPlay(game);
  };

  const handlePrologClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    if (onOpenProlog) onOpenProlog(game);
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
      {/* Card Header Cover / Thumbnail with Authentic Game Scene Illustration */}
      <div className="relative h-48 sm:h-52 w-full bg-slate-900 p-4 flex flex-col justify-between overflow-hidden">
        {/* Game Scene Illustration Mockup */}
        <GameIllustration
          gameId={game.id}
          gameType={game.type}
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top & Bottom Vignette Overlays for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 pointer-events-none"></div>

        {/* Top Controls */}
        <div className="flex items-center justify-end z-10">
          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-full transition cursor-pointer ${
                isFavorite
                  ? 'bg-amber-400 text-slate-900 shadow-md'
                  : 'bg-black/40 text-white/90 hover:bg-black/60 hover:text-white backdrop-blur-md'
              }`}
              title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
            >
              <Bookmark size={13} className={isFavorite ? 'fill-slate-900' : ''} />
            </button>

            {/* Play time */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-white/95 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
              <Clock size={12} />
              <span>{game.playTimeMinutes} mnt</span>
            </div>
          </div>
        </div>

        {/* Bottom Format Pill & Play Button Hover Animation */}
        <div className="z-10 flex items-end justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/40 backdrop-blur-md text-white text-xs font-bold border border-white/15 shadow-sm">
            <span>
              {game.hasStoryPresentation
                ? `📊 ${game.slideCount || 7} Slide Interaktif`
                : game.type === 'ular-tangga'
                ? '🎲 Ular Tangga'
                : game.type === 'point-and-click'
                ? '🔍 Point & Click'
                : '🧩 Susun Kata'}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <Play size={16} className="fill-slate-900 ml-0.5" />
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
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={handlePrologClick}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100/80 border border-purple-200/80 hover:border-purple-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Lihat sinopsis cerita, materi kurikulum, cara bermain, dan aturan main"
          >
            <BookOpen size={13} className="text-purple-600" />
            <span>Prolog & Aturan</span>
          </button>

          <button
            onClick={handleClick}
            className="text-xs font-extrabold text-indigo-900 bg-indigo-50 hover:bg-indigo-900 hover:text-white px-3 py-1.5 rounded-xl transition shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <span>Main</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const GameCard = React.memo(GameCardComponent);
