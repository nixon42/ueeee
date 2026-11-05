import React from 'react';
import { GameItem } from '@/types/game';
import { GameCard } from './GameCard';
import { Gamepad2, RotateCcw } from 'lucide-react';

interface Props {
  games: GameItem[];
  title?: string;
  onPlayGame: (game: GameItem) => void;
  onResetFilter?: () => void;
}

export const GameGrid: React.FC<Props> = ({
  games,
  title = 'Koleksi Game Interaktif',
  onPlayGame,
  onResetFilter,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Pilih dan mainkan tanpa hambatan akun atau pembayaran
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
          {games.length} Materi Tersedia
        </span>
      </div>

      {games.length === 0 ? (
        <div className="w-full py-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center p-6">
          <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Gamepad2 size={28} />
          </div>
          <h3 className="font-extrabold text-base text-slate-700">
            Tidak ada game yang cocok dengan pencarian
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Coba gunakan kata kunci lain seperti 'Ular Tangga', 'Sains', atau pilih kategori 'Semua'.
          </p>
          {onResetFilter && (
            <button
              onClick={onResetFilter}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow"
            >
              <RotateCcw size={14} />
              Reset Pencarian
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onPlay={onPlayGame} />
          ))}
        </div>
      )}
    </section>
  );
};
