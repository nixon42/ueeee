import React from 'react';
import { CheckCircle2, Trophy, MessageSquare, Sparkles } from 'lucide-react';
import { StoryResolutionSlide as StoryResolutionSlideData, DiscussionSparkCard } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { KakGalihAvatar } from '../characters/KakGalihAvatar';
import { KaptenDirgantaraAvatar } from '../characters/KaptenDirgantaraAvatar';
import { DrMayaAvatar } from '../characters/DrMayaAvatar';

export interface StoryResolutionSlideProps {
  slide: StoryResolutionSlideData;
  themeColor?: PresentationThemeKey;
  challengesState?: Record<string, boolean>;
  onNext?: () => void;
  onVictory?: () => void;
}

const DEFAULT_SPARK_CARDS: DiscussionSparkCard[] = [
  {
    number: 1,
    badgeColor: 'blue',
    title: 'Dampak Penggundulan Hutan',
    question:
      'Bagaimana penebangan pohon di lereng bukit mengganggu proses infiltrasi air tanah dan memicu bencana banjir bandang di hilir sungai?',
  },
  {
    number: 2,
    badgeColor: 'amber',
    title: 'Peran Energi Surya di Rantai Pangan',
    question:
      'Jika awan abu vulkanik menutupi sinar matahari selama berbulan-bulan, bagaimana dampaknya terhadap produsen dan konsumen puncak ekosistem?',
  },
  {
    number: 3,
    badgeColor: 'emerald',
    title: 'Aksi Konservasi Air Sekolah',
    question:
      'Langkah praktis apa (seperti membuat lubang biopori atau memanen air hujan) yang bisa kita terapkan di lingkungan sekolah untuk menjaga siklus air?',
  },
];

export const StoryResolutionSlide: React.FC<StoryResolutionSlideProps> = ({
  slide,
  themeColor = 'emerald',
  onNext,
  onVictory,
}) => {
  const isPurple = themeColor === 'purple';
  const isTeal = themeColor === 'teal';
  const isWaterCycle = !isPurple && !isTeal;
  const hasSparks = Boolean(slide.sparkCards && slide.sparkCards.length > 0) || !isPurple;
  const sparkCards = slide.sparkCards || (!isPurple ? DEFAULT_SPARK_CARDS : []);

  const handleFinish = () => {
    sound.playFanfare();
    if (onVictory) {
      onVictory();
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border-4 ${
        isPurple
          ? 'border-purple-900/50 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.65)]'
          : isTeal
          ? 'border-teal-900/50 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(13,148,136,0.65)]'
          : 'border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)]'
      } select-none animate-in fade-in duration-300`}
    >
      {/* ── COCKPIT HUD TOP BAR ───────────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
        <div
          className={`inline-block max-w-[85%] rounded-2xl ${
            isPurple
              ? 'bg-gradient-to-r from-purple-950/95 via-indigo-900/90 to-slate-950/55 border-l-[6px] border-cyan-400'
              : isTeal
              ? 'bg-gradient-to-r from-teal-950/95 via-cyan-900/90 to-slate-950/55 border-l-[6px] border-teal-400'
              : 'bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-900/55 border-l-[6px] border-amber-400'
          } backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl`}
        >
          <div className="flex items-center gap-2">
            {!isPurple && !isWaterCycle && (
              <span
                className={`px-1.5 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase ${
                  isTeal ? 'bg-teal-400 text-slate-950' : 'bg-amber-400 text-emerald-950'
                }`}
              >
                MISI TUNTAS
              </span>
            )}
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
              {slide.title}
            </h2>
          </div>
          {slide.subtitle && (
            <p
              className={`text-[10.5px] sm:text-xs font-bold leading-snug mt-0.5 truncate hidden sm:block ${
                isPurple ? 'text-cyan-300/95' : isTeal ? 'text-teal-300/95' : 'text-amber-300/95'
              }`}
            >
              {slide.subtitle}
            </p>
          )}
        </div>
        {/* Right Trophy Badge */}
        {!isPurple && !isWaterCycle && (
          <div className="shrink-0 flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-xl border backdrop-blur-sm text-xs font-black flex items-center gap-1.5 shadow-md ${
                isTeal
                  ? 'bg-teal-900/60 border-teal-500/40 text-teal-200'
                  : 'bg-emerald-900/60 border-emerald-500/40 text-amber-200'
              }`}
            >
              <Trophy
                size={13}
                className={isTeal ? 'text-teal-300' : 'text-amber-300'}
              />
              <span>Prestasi Diraih</span>
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN ARENA: UNIFIED RESOLUTION & HOTS DEBRIEF COCKPIT ── */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col md:flex-row gap-3 sm:gap-4 px-3 sm:px-5 py-2 sm:py-3 overflow-hidden my-auto">
        {/* LEFT COLUMN: Narrative Resolution & 3 HOTS Questions */}
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2.5 overflow-hidden">
          {/* Victory Narrative Report Box */}
          <div
            className={`rounded-2xl ${
              isPurple
                ? 'bg-gradient-to-br from-purple-950/90 via-indigo-950/90 to-slate-950/90 border border-cyan-400/35 text-cyan-50/95'
                : isTeal
                ? 'bg-gradient-to-br from-teal-950/90 via-cyan-950/90 to-slate-950/90 border border-teal-400/35 text-teal-50/95'
                : 'bg-gradient-to-br from-emerald-900/90 via-emerald-950/90 to-slate-950/90 border border-amber-400/35 text-amber-50/95'
            } backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-md flex items-start gap-2.5 shrink-0`}
          >
            <span className="text-2xl sm:text-3xl select-none shrink-0 mt-0.5">
              {slide.celebrationEmoji || '🌊'}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 pb-1 border-b border-white/10 mb-1">
                <CheckCircle2
                  size={14}
                  className={
                    isPurple
                      ? 'text-cyan-300 shrink-0'
                      : isTeal
                      ? 'text-teal-300 shrink-0'
                      : 'text-amber-300 shrink-0'
                  }
                />
                <span
                  className={`font-black text-[11px] sm:text-xs uppercase tracking-wider ${
                    isPurple ? 'text-cyan-200' : isTeal ? 'text-teal-200' : 'text-amber-300'
                  }`}
                >
                  {slide.reportTitle || 'Laporan Keberhasilan Misi:'}
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] md:text-[12.5px] font-medium leading-relaxed text-white/95 line-clamp-3">
                &ldquo;{slide.resolutionStory}&rdquo;
              </p>
            </div>
          </div>

          {/* 3 HOTS Reflection Question Cards */}
          {hasSparks && (
            <div className="flex-1 min-h-0 flex flex-col justify-between gap-2">
              <div className="flex items-center gap-1.5 px-1">
                <MessageSquare size={13} className="text-amber-300" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300">
                  Pertanyaan Nalar Kritis (HOTS) Bersama Rekan Sekelas:
                </span>
              </div>

              <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {sparkCards.map((card, idx) => {
                  const borderClass = isPurple
                    ? idx === 0
                      ? 'border-indigo-400/50 hover:border-indigo-300 shadow-[0_4px_14px_rgba(99,102,241,0.2)] bg-slate-900/90'
                      : idx === 1
                      ? 'border-amber-400/50 hover:border-amber-300 shadow-[0_4px_14px_rgba(245,158,11,0.2)] bg-slate-900/90'
                      : 'border-cyan-400/50 hover:border-cyan-300 shadow-[0_4px_14px_rgba(6,182,212,0.2)] bg-slate-900/90'
                    : idx === 0
                    ? 'border-blue-400/50 hover:border-blue-300 shadow-[0_4px_14px_rgba(59,130,246,0.15)] bg-slate-900/90'
                    : idx === 1
                    ? 'border-amber-400/50 hover:border-amber-300 shadow-[0_4px_14px_rgba(245,158,11,0.15)] bg-slate-900/90'
                    : 'border-emerald-400/50 hover:border-emerald-300 shadow-[0_4px_14px_rgba(16,185,129,0.15)] bg-slate-900/90';

                  const badgeClass = isPurple
                    ? idx === 0
                      ? 'bg-indigo-500 text-white'
                      : idx === 1
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-cyan-400 text-slate-950 font-black'
                    : idx === 0
                    ? 'bg-blue-500 text-white'
                    : idx === 1
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-emerald-500 text-white';

                  return (
                    <div
                      key={`spark-${idx}`}
                      className={`relative rounded-xl sm:rounded-2xl border-2 ${borderClass} backdrop-blur-md p-2.5 sm:p-3 flex flex-col justify-between gap-1.5 transition-all duration-200 hover:-translate-y-0.5`}
                    >
                      <div>
                        {/* Header: Badge & Title */}
                        <div className="flex items-center gap-1.5 pb-1 border-b border-white/10 mb-1.5">
                          <span
                            className={`w-5 h-5 rounded-md ${badgeClass} text-[10px] font-black flex items-center justify-center shrink-0 shadow-sm`}
                          >
                            #{card.number || idx + 1}
                          </span>
                          <h4 className="font-black text-[11px] sm:text-xs text-white leading-tight truncate">
                            {card.title}
                          </h4>
                        </div>

                        {/* Question Text */}
                        <p
                          className={`text-[10px] sm:text-[11px] font-medium leading-relaxed ${
                            isPurple ? 'text-cyan-50/90' : isTeal ? 'text-teal-50/90' : 'text-amber-50/90'
                          }`}
                        >
                          {card.question}
                        </p>
                      </div>

                      {/* Micro Tag */}
                      <div
                        className={`pt-1 border-t border-slate-800/60 text-[8.5px] font-extrabold uppercase tracking-wider ${
                          isPurple ? 'text-cyan-300/80' : isTeal ? 'text-teal-300/80' : 'text-amber-300/70'
                        }`}
                      >
                        Diskusi Kritis Kelompok
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Kak Galih / Kapten Dirgantara Avatar Pod (Positioned on the RIGHT, different from Slide 1) */}
        <div
          className={`w-full md:w-[280px] lg:w-[320px] shrink-0 flex flex-col justify-between items-center gap-2 p-3 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-xl overflow-hidden ${
            isPurple
              ? 'bg-slate-950/85 border-2 border-cyan-400/40 shadow-[0_10px_30px_rgba(6,182,212,0.15)]'
              : isTeal
              ? 'bg-slate-950/80 border-2 border-teal-500/35'
              : 'bg-slate-950/80 border-2 border-emerald-500/35'
          }`}
        >
          {/* Avatar anchored at the top of the debrief console */}
          <div className="relative shrink-0 flex flex-col items-center justify-center select-none pt-1">
            <div
              className={`absolute inset-0 rounded-full blur-2xl animate-pulse ${
                isPurple ? 'bg-cyan-400/20' : isTeal ? 'bg-teal-400/15' : 'bg-emerald-400/15'
              }`}
            />
            {isPurple ? (
              <KaptenDirgantaraAvatar
                size="md"
                mood="thinking"
                showSpeechBubble={false}
                className="drop-shadow-[0_10px_20px_rgba(6,182,212,0.4)]"
              />
            ) : isTeal ? (
              <DrMayaAvatar
                size="md"
                mood="happy"
                showSpeechBubble={false}
                className="drop-shadow-[0_10px_20px_rgba(45,212,191,0.4)]"
              />
            ) : (
              <KakGalihAvatar
                size="lg"
                mood="speaking"
                showSpeechBubble={false}
                className="drop-shadow-[0_10px_20px_rgba(52,211,153,0.4)]"
              />
            )}
          </div>

          {/* Conversational Question Prompt from Kak Galih / Dr. Maya / Kapten Dirgantara */}
          <div
            className={`w-full rounded-xl p-2.5 text-center border ${
              isPurple
                ? 'bg-gradient-to-r from-purple-950/90 to-slate-900/90 border-cyan-400/30'
                : isTeal
                ? 'bg-gradient-to-r from-teal-950/90 to-slate-900/90 border-teal-400/30'
                : 'bg-gradient-to-r from-emerald-950/90 to-slate-900/90 border-amber-400/30'
            }`}
          >
            <div
              className={`flex items-center justify-center gap-1.5 text-[10px] sm:text-[10.5px] font-black uppercase tracking-wider mb-1 ${
                isPurple ? 'text-cyan-300' : isTeal ? 'text-teal-300' : 'text-amber-300'
              }`}
            >
              <Sparkles
                size={12}
                className={`shrink-0 ${
                  isPurple ? 'text-cyan-300' : isTeal ? 'text-teal-300' : 'text-amber-300'
                }`}
              />
              <span>
                {isPurple
                  ? 'Kapten Dirgantara Menantang:'
                  : isTeal
                  ? 'Dr. Maya Bertanya:'
                  : 'Kak Galih Bertanya:'}
              </span>
            </div>
            <p
              className={`text-[10px] sm:text-[11px] font-medium leading-relaxed ${
                isPurple ? 'text-cyan-50' : isTeal ? 'text-teal-50' : 'text-amber-50'
              }`}
            >
              &ldquo;
              {slide.mentorPrompt ||
                'Petualang cilik, hutan dan air telah selamat! Sekarang, mari asah nalar kritis kalian: bagaimana pendapat kelompokmu tentang 3 pertanyaan di samping?'}
              &rdquo;
            </p>
          </div>

          {/* FAT ARCADE VICTORY BUTTON - HIDDEN FOR TATASURYA AS REQUESTED ("tombol selesaikan ekpekdisi haspu aja") */}
          {!isPurple && (
            <button
              type="button"
              onClick={handleFinish}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl sm:rounded-2xl ${
                isTeal
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 border-2 border-teal-200 shadow-[0_4px_0_#0f766e] hover:shadow-[0_4px_16px_rgba(45,212,191,0.6)]'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 border-2 border-amber-200 shadow-[0_4px_0_#b45309] hover:shadow-[0_4px_20px_rgba(251,191,36,0.6)]'
              } active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg`}
            >
              <Trophy size={16} />
              <span>{slide.victoryButtonText || 'Selesaikan Ekspedisi & Rayakan! 🏆'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
