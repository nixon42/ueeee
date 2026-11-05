import React from 'react';
import { Play, Sparkles, Compass, Puzzle } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Props {
  onPlayUlarTangga: () => void;
  onPlayPointAndClick: () => void;
  onPlayPuzzle: () => void;
}

export const FeaturedBanner: React.FC<Props> = ({
  onPlayUlarTangga,
  onPlayPointAndClick,
  onPlayPuzzle,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Pilihan Game Edukasi Terbaik
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Materi pembelajaran interaktif favorit yang siap kamu mainkan langsung
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Canva Magic Layers Style (Vibrant Magenta/Purple Gradient) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-700 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-black tracking-wide uppercase">
              <Sparkles size={12} className="text-yellow-300" />
              <span>Papan 100 Petak</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Ular Tangga: Sains & Matematika
            </h3>
            <p className="text-xs text-purple-100 font-medium leading-relaxed">
              Panjat tangga dengan menjawab kuis sains dan hindari ular! Dilengkapi mode Solo vs Bot dan 2 Pemain lokal.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => {
                sound.playClick();
                onPlayUlarTangga();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white text-purple-900 font-extrabold text-xs shadow-md hover:bg-purple-50 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play size={14} className="fill-purple-900" />
              <span>Mainkan Ular Tangga</span>
            </button>
          </div>
        </div>

        {/* Card 2: Canva Magic Eraser Style (Warm Orange/Coral Gradient) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-black tracking-wide uppercase">
              <Compass size={12} className="text-yellow-200" />
              <span>Eksplorasi Maya</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Point & Click: Lab & Sejarah
            </h3>
            <p className="text-xs text-rose-100 font-medium leading-relaxed">
              Jelajahi laboratorium sains maya, relief candi Borobudur, dan kanopi hutan hujan tropis bersama mentor interaktif.
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => {
                sound.playClick();
                onPlayPointAndClick();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white text-rose-800 font-extrabold text-xs shadow-md hover:bg-rose-50 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Compass size={14} />
              <span>Jelajahi Point & Click</span>
            </button>
          </div>
        </div>

        {/* Card 3: Teka-Teki & Formula Kata (Teal / Emerald Gradient) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-white/10 blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-black tracking-wide uppercase">
              <Puzzle size={12} className="text-yellow-300" />
              <span>Asah Otak & Kata</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Teka-Teki: Susun Kata & Rumus
            </h3>
            <p className="text-xs text-teal-100 font-medium leading-relaxed">
              Susun huruf acak menjadi istilah sains, matematika, dan sejarah. Dilengkapi petunjuk cerdas dan skor streak!
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => {
                sound.playClick();
                onPlayPuzzle();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white text-teal-900 font-extrabold text-xs shadow-md hover:bg-teal-50 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Puzzle size={14} />
              <span>Mulai Teka-Teki</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
