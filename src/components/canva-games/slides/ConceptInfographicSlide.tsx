import React, { useState, useEffect } from 'react';
import { Lightbulb, Play, Pause, Sparkles } from 'lucide-react';
import { ConceptInfographicSlide as ConceptSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { getDeckIllustration } from '@/components/visuals';
import { HydrologyCycleStage } from '../stages/HydrologyCycleStage';
import { PhotosynthesisPlantStage } from '../stages/PhotosynthesisPlantStage';

export interface ConceptInfographicSlideProps {
  slide: ConceptSlideData;
  themeColor: PresentationThemeKey;
  gameId?: string;
  onNext?: () => void;
}

const PHASE_THEMES: Record<
  string,
  { solid: string; glow: string; text: string; ring: string; badge: string }
> = {
  amber: {
    solid: 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-slate-950',
    glow: 'border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.35)]',
    text: 'text-amber-300',
    ring: 'ring-amber-400',
    badge: 'bg-amber-400 text-slate-950',
  },
  blue: {
    solid: 'bg-gradient-to-br from-sky-500 to-blue-600 border-sky-400 text-white',
    glow: 'border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.35)]',
    text: 'text-sky-300',
    ring: 'ring-sky-400',
    badge: 'bg-sky-400 text-slate-950',
  },
  indigo: {
    solid: 'bg-gradient-to-br from-indigo-500 to-blue-700 border-indigo-400 text-white',
    glow: 'border-indigo-400/80 shadow-[0_0_20px_rgba(129,140,248,0.35)]',
    text: 'text-indigo-300',
    ring: 'ring-indigo-400',
    badge: 'bg-indigo-400 text-slate-950',
  },
  emerald: {
    solid: 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 text-slate-950',
    glow: 'border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.35)]',
    text: 'text-emerald-300',
    ring: 'ring-emerald-400',
    badge: 'bg-emerald-400 text-slate-950',
  },
  teal: {
    solid: 'bg-gradient-to-br from-teal-500 to-emerald-600 border-teal-400 text-slate-950',
    glow: 'border-teal-400/80 shadow-[0_0_20px_rgba(45,212,191,0.35)]',
    text: 'text-teal-300',
    ring: 'ring-teal-400',
    badge: 'bg-teal-400 text-slate-950',
  },
};

export const ConceptInfographicSlide: React.FC<ConceptInfographicSlideProps> = ({
  slide,
  gameId,
}) => {
  const cards = slide.cards ?? [];
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Determine specialized interactive simulation stage
  const slideTitleLower = slide.title.toLowerCase();
  const isHydrologySlide =
    slide.id === 'uts-slide-2' ||
    slideTitleLower.includes('hidrologi') ||
    slideTitleLower.includes('siklus air');

  const isPhotosynthesisSlide =
    slide.id === 'uts-slide-3' ||
    slideTitleLower.includes('fotosintesis');

  const FallbackIllustration = gameId ? getDeckIllustration(gameId) : null;

  // Auto-cycle timelapse playback
  useEffect(() => {
    if (!isPlaying || cards.length <= 1) return;
    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % cards.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying, cards.length]);

  const activeCard = cards[selectedIdx] ?? cards[0];
  const activeTheme =
    PHASE_THEMES[activeCard?.badgeColor ?? 'amber'] ?? PHASE_THEMES.amber;

  const toggleAutoPlay = () => {
    sound.playClick();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-3xl border-4 border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)] animate-in fade-in duration-300 select-none">
      {/* ── COCKPIT HUD TOP BAR ───────────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
        <div className="inline-block max-w-[75%] sm:max-w-[80%] rounded-2xl bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-900/55 border-l-[6px] border-amber-400 backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-emerald-950 font-black text-[9px] sm:text-[10px] tracking-widest uppercase">
              SIMULATOR
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
              {slide.title}
            </h2>
          </div>
          {slide.subtitle && (
            <p className="text-[10.5px] sm:text-xs font-bold text-amber-300/95 leading-snug mt-0.5 truncate hidden sm:block">
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Timelapse auto-play control */}
        <button
          type="button"
          onClick={toggleAutoPlay}
          className={`shrink-0 min-h-[44px] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-md active:scale-95 ${
            isPlaying
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.6)] animate-pulse'
              : 'bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 border-amber-400/50 backdrop-blur-sm'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={15} className="text-slate-950 fill-slate-950" />
              <span>Jeda</span>
            </>
          ) : (
            <>
              <Play size={15} className="text-amber-300 fill-amber-300" />
              <span className="hidden sm:inline">Putar Siklus</span>
              <span className="sm:hidden">Putar</span>
            </>
          )}
        </button>
      </div>

      {/* ── MAIN COCKPIT BODY (LANDSCAPE GAME ARENA) ──────── */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col md:flex-row gap-2.5 sm:gap-3.5 px-3 sm:px-5 py-2 sm:py-2.5 overflow-hidden">
        {/* ── LEFT: INTERACTIVE WORLD STAGE VIEWPORT ───────── */}
        <div className="flex-1 min-h-0 relative rounded-2xl overflow-hidden border-2 border-emerald-400/40 bg-slate-950/70 shadow-inner flex items-center justify-center">
          {isHydrologySlide ? (
            <HydrologyCycleStage
              activePhase={selectedIdx}
              onSelectPhase={(idx) => {
                setIsPlaying(false);
                setSelectedIdx(idx);
              }}
            />
          ) : isPhotosynthesisSlide ? (
            <PhotosynthesisPlantStage
              activePhase={selectedIdx}
              onSelectPhase={(idx) => {
                setIsPlaying(false);
                setSelectedIdx(idx);
              }}
            />
          ) : FallbackIllustration ? (
            <div className="w-full h-full p-2 flex items-center justify-center">
              <FallbackIllustration className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-emerald-200 text-sm font-bold">
              Simulator Interaktif
            </div>
          )}
        </div>

        {/* ── RIGHT: TCG CARD & ARCADEDOCK CONSOLE ─────────── */}
        <div className="w-full md:w-[360px] lg:w-[410px] shrink-0 min-h-0 flex flex-col gap-2 justify-between overflow-hidden">
          {/* Active Phase TCG Card */}
          {activeCard && (
            <div
              className={`flex-1 min-h-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-slate-950/95 border-2 ${activeTheme.glow} p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden backdrop-blur-md transition-all duration-200`}
            >
              <div>
                {/* Header: Phase badge & Progress dots */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-800/40">
                  <span
                    className={`px-2.5 py-0.5 rounded-md font-black text-[10px] sm:text-[11px] uppercase tracking-wider ${activeTheme.badge}`}
                  >
                    {activeCard.levelBadge || `Tahap ${selectedIdx + 1}`}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {cards.map((_, i) => (
                      <span
                        key={`dot-${i}`}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          selectedIdx === i
                            ? 'bg-amber-400 w-4 ring-2 ring-amber-300/80'
                            : 'bg-emerald-950/90 border border-emerald-600/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Title & Emoji */}
                <div className="flex items-center gap-2.5 mt-2 sm:mt-2.5">
                  <span className="text-3xl sm:text-4xl filter drop-shadow select-none shrink-0">
                    {activeCard.iconEmoji || '💧'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-amber-50 leading-tight">
                    {activeCard.title}
                  </h3>
                </div>

                {/* Narrative Description */}
                <p className="text-[12px] sm:text-[13.5px] font-medium leading-relaxed text-amber-50/90 mt-2 tracking-tight">
                  {activeCard.description}
                </p>
              </div>

              {/* Scientific Mechanism Callout Inset */}
              <div className="mt-2 rounded-xl bg-amber-400/10 border border-amber-300/40 p-2 sm:p-2.5 flex items-start gap-2">
                <Sparkles size={16} className="text-amber-300 shrink-0 mt-0.5" />
                <p className="text-[10.5px] sm:text-[11.5px] text-amber-100 font-semibold leading-snug">
                  {selectedIdx === 0 && 'Molekul H2O menyerap kalor surya, berubah wujud menjadi uap tak kasat mata dan naik ke atmosfer.'}
                  {selectedIdx === 1 && 'Suhu dingin di atmosfer memaksa uap air memadat kembali menjadi kristal cair pembentuk awan tebal.'}
                  {selectedIdx === 2 && 'Massa titik air di awan melampaui daya apung udara, jatuh membasahi ekosistem lewat gravitasi.'}
                  {selectedIdx === 3 && 'Air hujan meresap memulihkan cadangan air tanah (akuifer) serta mengalir kembali ke laut lepas.'}
                  {selectedIdx >= 4 && 'Siklus terus berlanjut tanpa henti menjaga keseimbangan abadi air di planet Bumi.'}
                </p>
              </div>
            </div>
          )}

          {/* Chunky Arcade Selector Dock (48-52px fat buttons) */}
          <div className="shrink-0 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-1.5 sm:gap-2">
            {cards.map((card, idx) => {
              const isSelected = selectedIdx === idx;
              const theme =
                PHASE_THEMES[card.badgeColor ?? 'amber'] ?? PHASE_THEMES.amber;
              return (
                <button
                  key={card.id || `card-${idx}`}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsPlaying(false);
                    setSelectedIdx(idx);
                  }}
                  className={`min-h-[48px] sm:min-h-[52px] px-2.5 py-1.5 rounded-xl sm:rounded-2xl text-xs sm:text-[13px] font-black transition-all duration-150 cursor-pointer border-2 flex items-center gap-2 active:scale-95 shadow-md ${
                    isSelected
                      ? `${theme.solid} shadow-[0_4px_0_rgba(0,0,0,0.4)] ring-2 ${theme.ring} -translate-y-0.5`
                      : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 border-emerald-800/60 shadow-[0_3px_0_rgba(0,0,0,0.3)]'
                  }`}
                >
                  <span className="text-xl select-none shrink-0">{card.iconEmoji || '💧'}</span>
                  <div className="min-w-0 text-left leading-tight">
                    <div className="text-[9px] uppercase tracking-wider opacity-80">
                      {card.levelBadge || `Tahap ${idx + 1}`}
                    </div>
                    <div className="truncate font-black">{card.title.split('&')[0].trim()}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Teacher Guide Inset */}
          <div className="shrink-0 bg-emerald-950/90 border border-amber-400/30 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[10.5px] sm:text-[11.5px] text-amber-100/90 shadow-sm">
            <Lightbulb className="text-amber-400 shrink-0" size={14} />
            <span className="truncate">
              <strong>Panduan Guru:</strong>{' '}
              {slide.teacherNotes ||
                'Ajak siswa mengamati animasi pergerakan molekul air dari penguapan surya hingga infiltrasi akuifer tanah.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
