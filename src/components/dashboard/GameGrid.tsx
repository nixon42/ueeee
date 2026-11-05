import React from 'react';
import { GameItem } from '@/types/game';
import { GameCard } from './GameCard';
import { Gamepad2, RotateCcw, History } from 'lucide-react';

interface Props {
  games: GameItem[];
  title?: string;
  onPlayGame: (game: GameItem) => void;
  onResetFilter?: () => void;
  favorites: string[];
  onToggleFavorite: (gameId: string) => void;
  recentGames?: GameItem[];
}

export const GameGrid: React.FC<Props> = ({
  games,
  title = 'Koleksi Game Interaktif',
  onPlayGame,
  onResetFilter,
  favorites,
  onToggleFavorite,
  recentGames = [],
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-6">
      {/* Shelf: Terakhir Dimainkan (jika ada riwayat) */}
      {recentGames.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <History size={16} />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
                Lanjutkan Bermain
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Riwayat Lokalmu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentGames.map(game => (
              <GameCard
                key={`recent-${game.id}`}
                game={game}
                onPlay={onPlayGame}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Grid: Koleksi Game */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pilih dan mainkan tanpa batasan akun, paywall, atau login
            </p>
          </div>

          <span className="text-xs font-extrabold px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
            {games.length} Materi Tersedia
          </span>
        </div>

        {games.length === 0 ? (
          <div className="w-full py-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center p-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Gamepad2 size={28} />
            </div>
            <h3 className="font-extrabold text-base text-slate-800">
              Tidak ada materi game yang cocok
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
              Coba cari dengan kata kunci lain (misal: 'Sains', 'Matematika', 'Sejarah') atau ubah filter jenjang kelas.
            </p>
            {onResetFilter && (
              <button
                onClick={onResetFilter}
                className="mt-4 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl transition flex items-center gap-1.5 shadow"
              >
                <RotateCcw size={14} />
                <span>Reset Pencarian & Filter</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={onPlayGame}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
