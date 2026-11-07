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

  // ── DEDICATED HIGH-LEGIBILITY FLIGHT DECK LAYOUT FOR ASTRONOMI TATA SURYA ──
  if (isPurple) {
    return (
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border-4 border-purple-900/50 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.65)] select-none animate-in fade-in duration-300">
        {/* Deep Nebula & Starfield Cosmic Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-600/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-indigo-600/10 blur-3xl" />
          <svg className="w-full h-full opacity-30" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <circle cx="150" cy="80" r="1.5" fill="#38bdf8" />
            <circle cx="850" cy="120" r="1.2" fill="#ffffff" />
            <circle cx="920" cy="450" r="1.8" fill="#a855f7" />
            <circle cx="80" cy="480" r="1.2" fill="#ffffff" />
            <circle cx="480" cy="50" r="1.5" fill="#fef08a" />
          </svg>
        </div>

        {/* ── COCKPIT HUD TOP BAR ───────────────────────────── */}
        <div className="relative z-20 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
          <div className="inline-block max-w-[85%] rounded-2xl bg-gradient-to-r from-purple-950/95 via-indigo-900/90 to-slate-950/55 border-l-[6px] border-cyan-400 backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase bg-cyan-400 text-slate-950">
                MISI TUNTAS • KUIPER STATION 🛰️
              </span>
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
                {slide.title}
              </h2>
            </div>
            {slide.subtitle && (
              <p className="text-[11px] sm:text-xs font-bold leading-snug mt-0.5 text-cyan-300/95 truncate hidden sm:block">
                {slide.subtitle}
              </p>
            )}
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl border border-cyan-400/40 bg-indigo-950/70 backdrop-blur-sm text-xs font-black text-cyan-200 flex items-center gap-1.5 shadow-md">
              <Sparkles size={14} className="text-cyan-300" />
              <span>Transmisi Telemetri 100%</span>
            </div>
          </div>
        </div>

        {/* ── MAIN ARENA: UNIFIED ASTRONOMY DEBRIEF & HOTS FLIGHT LOG ── */}
        <div className="relative z-20 flex-1 min-h-0 flex flex-col md:flex-row gap-3 sm:gap-4 px-3 sm:px-5 py-2 sm:py-3 overflow-hidden my-auto">
          {/* LEFT POD: Kapten Dirgantara & Mission Report Transmission */}
          <div className="w-full md:w-[350px] lg:w-[390px] shrink-0 rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-b from-indigo-950/90 via-slate-950/90 to-purple-950/90 backdrop-blur-md p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_10px_30px_rgba(6,182,212,0.2)] overflow-hidden">
            {/* Kapten Avatar Section with Orbital Halo */}
            <div className="relative shrink-0 flex flex-col items-center justify-center select-none pt-1">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/25 via-indigo-500/20 to-purple-600/25 blur-2xl animate-pulse" />
              <KaptenDirgantaraAvatar
                size="lg"
                mood="speaking"
                showSpeechBubble={false}
                className="drop-shadow-[0_12px_24px_rgba(6,182,212,0.45)]"
              />
              <div className="mt-2 px-3 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-[11px] sm:text-xs font-black tracking-wider text-cyan-200 shadow-sm flex items-center gap-1.5">
                <span>🚀</span>
                <span>Kapten Dirgantara</span>
              </div>
            </div>

            {/* Mission Telemetry Speech Console */}
            <div className="w-full rounded-2xl bg-slate-900/90 border border-cyan-400/35 p-3 shadow-inner flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-1.5 pb-1 border-b border-cyan-500/20">
                <CheckCircle2 size={15} className="text-cyan-300 shrink-0" />
                <span className="font-black text-xs uppercase tracking-wider text-cyan-300">
                  {slide.reportTitle || 'Transmisi Telemetri Kapten Dirgantara:'}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-cyan-50">
                &ldquo;{slide.resolutionStory}&rdquo;
              </p>
              {slide.mentorPrompt && (
                <div className="pt-2 border-t border-cyan-500/20 text-xs sm:text-[12.5px] font-bold text-amber-300 leading-snug">
                  💬 &ldquo;{slide.mentorPrompt}&rdquo;
                </div>
              )}
            </div>

            {/* Bottom Telemetry Status Pill */}
            <div className="mt-2 py-1 px-3 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-cyan-300/80">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Wahana Garuda Orbital Bersandar
              </span>
              <span className="text-amber-400 font-black">STASIUN KUIPER</span>
            </div>
          </div>

          {/* RIGHT POD: 3 HOTS Reflection Question Strips */}
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2 sm:gap-2.5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-black text-xs sm:text-sm md:text-base text-white tracking-wide">
                    Pertanyaan Pemantik Nalar Kritis (HOTS)
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-cyan-300/90">
                    Diskusikan bersama rekan sekelas untuk menguji pemahaman konsep astronomi
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-[10px] font-black text-indigo-200">
                Diskusi Kelompok
              </span>
            </div>

            {/* 3 Horizontal Cards Stack */}
            <div className="flex-1 min-h-0 flex flex-col justify-between gap-2 sm:gap-2.5">
              {sparkCards.map((card, idx) => {
                const cardConfigs = [
                  {
                    icon: '🪐',
                    badgeBg: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-300',
                    border: 'border-indigo-400/45 hover:border-indigo-300 bg-gradient-to-r from-indigo-950/75 via-slate-900/90 to-purple-950/70 shadow-[0_4px_16px_rgba(99,102,241,0.2)]',
                    tag: '🔍 Analisis Kecepatan Orbit & Gravitasi Newton',
                    tagColor: 'text-indigo-300',
                    textColor: 'text-indigo-100',
                  },
                  {
                    icon: '🌑',
                    badgeBg: 'bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black border-amber-200',
                    border: 'border-amber-400/45 hover:border-amber-300 bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-purple-950/70 shadow-[0_4px_16px_rgba(245,158,11,0.2)]',
                    tag: '📐 Analisis Bidang Ekliptika 5° & Fenomena Syzygy',
                    tagColor: 'text-amber-300',
                    textColor: 'text-amber-100',
                  },
                  {
                    icon: '🌍',
                    badgeBg: 'bg-gradient-to-br from-cyan-400 to-teal-500 text-slate-950 font-black border-cyan-200',
                    border: 'border-cyan-400/45 hover:border-cyan-300 bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-blue-950/70 shadow-[0_4px_16px_rgba(6,182,212,0.2)]',
                    tag: '🧪 Analisis Zona Goldilocks & Atmosfer Penunjang Hidup',
                    tagColor: 'text-cyan-300',
                    textColor: 'text-cyan-100',
                  },
                ];
                const cfg = cardConfigs[idx % cardConfigs.length];

                return (
                  <div
                    key={`spark-card-${idx}`}
                    className={`rounded-2xl border-2 ${cfg.border} backdrop-blur-md p-3 sm:p-3.5 flex items-start gap-3 sm:gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl`}
                  >
                    {/* Glowing Round Number & Icon Badge */}
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${cfg.badgeBg} border flex flex-col items-center justify-center shrink-0 shadow-md`}>
                      <span className="text-[11px] sm:text-xs font-black leading-none">#{card.number || idx + 1}</span>
                      <span className="text-xs sm:text-sm mt-0.5 leading-none">{cfg.icon}</span>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm sm:text-base text-white leading-tight">
                        {card.title}
                      </h4>
                      <p className={`text-xs sm:text-[13px] md:text-sm font-medium ${cfg.textColor} leading-relaxed mt-1`}>
                        {card.question}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className={`text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider ${cfg.tagColor}`}>
                          {cfg.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
