import React from 'react';
import { Home, Dices, Bookmark, Presentation, Search } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSurpriseMe: () => void;
  favoritesCount: number;
  onOpenTeacherModal: () => void;
  onFocusSearch: () => void;
}

export const MobileBottomNav: React.FC<Props> = ({
  activeTab,
  onTabChange,
  onSurpriseMe,
  favoritesCount,
  onOpenTeacherModal,
  onFocusSearch,
}) => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg safe-bottom">
      <div className="flex items-center justify-around">
        {/* Beranda */}
        <button
          onClick={() => {
            sound.playClick();
            onTabChange('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition cursor-pointer ${
            activeTab === 'all' ? 'text-purple-700 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home size={20} />
          <span className="text-[10px]">Beranda</span>
        </button>

        {/* Cari */}
        <button
          onClick={() => {
            sound.playClick();
            onFocusSearch();
          }}
          className="flex flex-col items-center gap-1 p-1.5 rounded-xl text-slate-500 hover:text-purple-700 transition cursor-pointer"
        >
          <Search size={20} />
          <span className="text-[10px]">Cari</span>
        </button>

        {/* Main Acak (Floating Hero Button) */}
        <button
          onClick={() => {
            sound.playClick();
            onSurpriseMe();
          }}
          className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-900 shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
          title="Main Game Acak"
        >
          <Dices size={24} className="stroke-[2.2]" />
        </button>

        {/* Favorit */}
        <button
          onClick={() => {
            sound.playClick();
            onTabChange('favorites');
          }}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition cursor-pointer relative ${
            activeTab === 'favorites' ? 'text-purple-700 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bookmark size={20} />
          <span className="text-[10px]">Favorit</span>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500"></span>
          )}
        </button>

        {/* Mode Guru */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenTeacherModal();
          }}
          className="flex flex-col items-center gap-1 p-1.5 rounded-xl text-slate-500 hover:text-purple-700 transition cursor-pointer"
        >
          <Presentation size={20} />
          <span className="text-[10px]">Guru</span>
        </button>
      </div>
    </nav>
  );
};
