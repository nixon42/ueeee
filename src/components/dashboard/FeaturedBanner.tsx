import React from 'react';
import { Play, Sparkles, Compass } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Props {
  onPlayUlarTangga: () => void;
  onPlayPointAndClick: () => void;
}

export const FeaturedBanner: React.FC<Props> = ({
  onPlayUlarTangga,
  onPlayPointAndClick,
}) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Game Unggulan Hari Ini
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Materi pembelajaran interaktif favorit yang siap kamu mainkan langsung
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Canva Magic Layers Style (Vibrant Magenta/Purple Gradient) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase mb-3">
                <Sparkles size={13} className="text-yellow-300" />
                <span>Paling Seru</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Ular Tangga: Petualangan Sains
              </h3>
              <p className="mt-2 text-sm text-purple-100 max-w-md font-medium leading-relaxed">
                Tantang dirimu dengan papan 100 petak! Panjat tangga dengan menjawab kuis sains dan hindari ular licik.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onPlayUlarTangga();
                }}
                className="px-5 py-3 rounded-2xl bg-white text-purple-800 font-extrabold text-sm shadow-md hover:bg-purple-50 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <Play size={16} className="fill-purple-800" />
                <span>Mainkan Ular Tangga</span>
              </button>
              <span className="text-xs text-purple-200 font-medium">
                Papan 100 Petak • Kuis Sains
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Canva Magic Eraser Style (Warm Orange/Coral Gradient) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600 p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wide uppercase mb-3">
                <Compass size={13} className="text-yellow-200" />
                <span>Eksplorasi Misteri</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Point & Click: Lab Sains Maya
              </h3>
              <p className="mt-2 text-sm text-rose-100 max-w-md font-medium leading-relaxed">
                Jelajahi sudut laboratorium virtual, periksa mikroskop, dan kombinasikan tabung reaksi untuk menyelesaikan misi!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onPlayPointAndClick();
                }}
                className="px-5 py-3 rounded-2xl bg-white text-rose-700 font-extrabold text-sm shadow-md hover:bg-rose-50 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <Compass size={16} />
                <span>Jelajahi Lab Sains</span>
              </button>
              <span className="text-xs text-rose-200 font-medium">
                4 Objek Misteri • Audio Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
