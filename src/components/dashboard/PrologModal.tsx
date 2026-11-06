import React, { useState } from 'react';
import { 
  X, BookOpen, Target, Gamepad2, Scale, Star, Clock, 
  CheckCircle2, Sparkles
} from 'lucide-react';
import { GameItem } from '@/types/game';
import { sound } from '@/lib/sound';

interface Props {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (game: GameItem) => void;
  onPlayClassic?: (game: GameItem) => void;
}

type TabType = 'overview' | 'curriculum' | 'how-to-play' | 'rules';

export const PrologModal: React.FC<Props> = ({
  game,
  isOpen,
  onClose,
  onPlay,
  onPlayClassic,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!isOpen || !game) return null;

  const handleStartGame = () => {
    sound.playClick();
    onPlay(game);
    onClose();
  };

  const prolog = game.prolog || {
    story: game.description,
    learningGoals: [
      `Materi pembelajaran komprehensif terkait ${game.subjectDetail}.`,
      'Melatih pemahaman konsep dan daya analisis berbasis permainan edukatif.',
      'Sesuai dengan capaian pembelajaran Kurikulum Merdeka.'
    ],
    howToPlay: [
      'Pilih mode permainan yang tersedia di dalam arena.',
      'Ikuti petunjuk langkah demi langkah pada layar.',
      'Selesaikan tantangan kuis untuk meraih skor tertinggi.'
    ],
    rules: [
      'Jawab pertanyaan dengan cermat sebelum melanjutkan langkah.',
      'Setiap capaian yang benar akan membuka poin dan artefak edukatif.',
      'Tuntaskan seluruh level permainan untuk mencapai kemenangan.'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-purple-100 flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cover Banner */}
        <div className={`relative px-6 py-5 bg-gradient-to-r ${game.gradient} text-white flex flex-col justify-between overflow-hidden shrink-0`}>
          {/* Subtle soft backdrop shape */}
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-3 relative z-10">
            <span className="text-xs font-semibold text-white/80">
              {game.gradeLevel}
            </span>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition cursor-pointer"
              title="Tutup Prolog"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-2.5 relative z-10">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug drop-shadow-sm">
              {game.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-white/90 font-medium leading-relaxed max-w-xl">
              {game.subtitle}
            </p>
          </div>

          {/* Clean Editorial Metadata Line (No Pill Slop) */}
          <div className="mt-3.5 pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/85 relative z-10">
            {game.mentorName && (
              <>
                <span className="font-semibold text-white">🧑‍🏫 {game.mentorName}</span>
                <span className="text-white/40">•</span>
              </>
            )}
            {game.slideCount && (
              <>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} className="opacity-80" /> {game.slideCount} Slide
                </span>
                <span className="text-white/40">•</span>
              </>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} className="opacity-80" /> {game.playTimeMinutes} mnt
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1 text-white">
              <Star size={12} className="fill-amber-300 text-amber-300" /> {game.rating.toFixed(1)}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/75">{game.subjectDetail}</span>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="px-5 pt-3 pb-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('overview');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-white'
            }`}
          >
            <BookOpen size={14} />
            <span>Kisah & Prolog</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('curriculum');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-white'
            }`}
          >
            <Target size={14} />
            <span>Materi Pembelajaran</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('how-to-play');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'how-to-play'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-white'
            }`}
          >
            <Gamepad2 size={14} />
            <span>Cara Bermain</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('rules');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'rules'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-purple-700 hover:bg-white'
            }`}
          >
            <Scale size={14} />
            <span>Aturan Main</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* 1. Kisah & Prolog */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm text-lg">
                  📖
                </div>
                <div>
                  <h4 className="text-sm font-bold text-purple-950 uppercase tracking-wider mb-1">
                    Latar Belakang & Premis Cerita
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {prolog.story}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  Keunggulan Pembelajaran Ini
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {game.description}
                </p>
              </div>
            </div>
          )}

          {/* 2. Materi Pembelajaran Kurikulum */}
          {activeTab === 'curriculum' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target Capaian Pembelajaran Siswa
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                  Kurikulum Merdeka
                </span>
              </div>

              <div className="space-y-2.5">
                {prolog.learningGoals.map((goal, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 text-xs sm:text-sm flex items-start gap-3 text-slate-800"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Cara Bermain */}
          {activeTab === 'how-to-play' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Panduan Kontrol & Interaksi Bermain
                </span>
              </div>

              <div className="space-y-2.5">
                {prolog.howToPlay.map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex items-start gap-3 text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="font-medium leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Aturan Main */}
          {activeTab === 'rules' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Aturan Permainan & Sistem Skor
                </span>
              </div>

              <div className="space-y-2.5">
                {prolog.rules.map((rule, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs sm:text-sm flex items-start gap-3 text-slate-800"
                  >
                    <Scale size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition cursor-pointer"
            >
              Tutup
            </button>
            {onPlayClassic && (
              <button
                onClick={() => {
                  sound.playClick();
                  onPlayClassic(game);
                  onClose();
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-purple-700 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1.5"
                title="Mainkan mode klasik (board / arcade)"
              >
                <span>🕹️ Mode Klasik (Arcade)</span>
              </button>
            )}
          </div>

          <button
            onClick={handleStartGame}
            className={`px-5 py-2.5 rounded-2xl bg-gradient-to-r ${game.gradient} text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition flex items-center gap-2 cursor-pointer`}
          >
            <Sparkles size={16} className="text-amber-300" />
            <span>Buka Presentasi Cerita ({game.slideCount || 7} Slide) →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
