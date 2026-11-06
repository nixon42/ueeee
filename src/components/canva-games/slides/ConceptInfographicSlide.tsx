import React, { useState } from 'react';
import { Lightbulb, Target } from 'lucide-react';
import { ConceptInfographicSlide as ConceptSlideData } from '@/types/presentation';
import { PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { getDeckIllustration } from '@/components/visuals';

export interface ConceptInfographicSlideProps {
  slide: ConceptSlideData;
  themeColor: PresentationThemeKey;
  gameId?: string;
  onNext?: () => void;
}

const CARD_THEME_COLORS: Record<
  string,
  { bg: string; border: string; text: string; badge: string; solid: string; ring: string }
> = {
  emerald: { bg: 'bg-emerald-50/70', border: 'border-emerald-300', text: 'text-emerald-900', badge: 'bg-emerald-600 text-white', solid: 'bg-emerald-600 border-emerald-700', ring: 'ring-emerald-300/70' },
  amber: { bg: 'bg-amber-50/70', border: 'border-amber-300', text: 'text-amber-900', badge: 'bg-amber-500 text-white', solid: 'bg-amber-500 border-amber-600', ring: 'ring-amber-300/70' },
  blue: { bg: 'bg-blue-50/70', border: 'border-blue-300', text: 'text-blue-900', badge: 'bg-blue-600 text-white', solid: 'bg-blue-600 border-blue-700', ring: 'ring-blue-300/70' },
  indigo: { bg: 'bg-indigo-50/70', border: 'border-indigo-300', text: 'text-indigo-900', badge: 'bg-indigo-600 text-white', solid: 'bg-indigo-600 border-indigo-700', ring: 'ring-indigo-300/70' },
  teal: { bg: 'bg-teal-50/70', border: 'border-teal-300', text: 'text-teal-900', badge: 'bg-teal-600 text-white', solid: 'bg-teal-600 border-teal-700', ring: 'ring-teal-300/70' },
  rose: { bg: 'bg-rose-50/70', border: 'border-rose-300', text: 'text-rose-900', badge: 'bg-rose-600 text-white', solid: 'bg-rose-600 border-rose-700', ring: 'ring-rose-300/70' },
  orange: { bg: 'bg-orange-50/70', border: 'border-orange-300', text: 'text-orange-900', badge: 'bg-orange-600 text-white', solid: 'bg-orange-600 border-orange-700', ring: 'ring-orange-300/70' },
  purple: { bg: 'bg-purple-50/70', border: 'border-purple-300', text: 'text-purple-900', badge: 'bg-purple-600 text-white', solid: 'bg-purple-600 border-purple-700', ring: 'ring-purple-300/70' },
};

/** Fallback phase callouts when a deck carries no dedicated illustration. */
const FALLBACK_HOTSPOTS = [
  { id: 'p1', emoji: '🧩', label: 'Konsep 1', sub: 'Pilar Pertama', desc: 'Pilih kartu konsep di bawah untuk membaca penjelasannya secara detail.' },
  { id: 'p2', emoji: '🧩', label: 'Konsep 2', sub: 'Pilar Kedua', desc: 'Pilih kartu konsep di bawah untuk membaca penjelasannya secara detail.' },
  { id: 'p3', emoji: '🧩', label: 'Konsep 3', sub: 'Pilar Ketiga', desc: 'Pilih kartu konsep di bawah untuk membaca penjelasannya secara detail.' },
  { id: 'p4', emoji: '🧩', label: 'Konsep 4', sub: 'Pilar Keempat', desc: 'Pilih kartu konsep di bawah untuk membaca penjelasannya secara detail.' },
];

export const ConceptInfographicSlide: React.FC<ConceptInfographicSlideProps> = ({
  slide,
  gameId,
}) => {
  const IllustrationComponent = gameId ? getDeckIllustration(gameId) : null;
  const cards = slide.cards ?? [];

  // Phase callouts follow the slide's own concept cards (1:1), falling back to generic labels.
  const hotspots = cards.map((card, idx) => ({
    id: card.id || `phase-${idx}`,
    emoji: card.iconEmoji || '🧩',
    label: card.title,
    sub: card.levelBadge || `Konsep ${idx + 1}`,
    desc: card.description,
  }));
  const resolvedHotspots = hotspots.length > 0 ? hotspots : FALLBACK_HOTSPOTS;

  // Tablet-first UX: default selected hotspot is the first one for instant context and zero layout jumping.
  const [selectedHotspot, setSelectedHotspot] = useState<string>(resolvedHotspots[0]?.id ?? '');

  const activeIndex = Math.max(0, resolvedHotspots.findIndex((h) => h.id === selectedHotspot));
  const activeHotspot = resolvedHotspots[activeIndex] ?? resolvedHotspots[0];

  const gridCols =
    cards.length >= 5
      ? 'grid-cols-2 sm:grid-cols-5'
      : cards.length === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : cards.length === 3
      ? 'grid-cols-3'
      : cards.length === 2
      ? 'grid-cols-2'
      : 'grid-cols-1';

  const colorFor = (badgeColor?: string) =>
    (badgeColor && CARD_THEME_COLORS[badgeColor]) || CARD_THEME_COLORS.emerald;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-3xl border-4 border-emerald-950/40 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)] animate-in fade-in duration-300">
      {/* ── CONCEPT HUD BAR ──────────────────────────── */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-2.5 sm:px-4 pt-2.5 sm:pt-3 shrink-0">
        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-950/80 border-2 border-amber-400/70 backdrop-blur-sm pl-1.5 pr-3 py-1 shadow-lg">
          <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-emerald-950 font-black text-[10px] sm:text-[11px] tracking-widest uppercase">
            Materi
          </span>
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-amber-100">
            {slide.chapterBadge || 'BABAK 2: MATERI INTI'}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/50 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
          <Target size={12} className="text-emerald-300" />
          <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-200">
            {cards.length} Tahapan Konsep
          </span>
        </div>
      </div>

      {/* ── SCENE TITLE PLAQUE ───────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2 sm:pt-3 shrink-0">
        <div className="inline-block max-w-[94%] sm:max-w-[82%] rounded-2xl bg-gradient-to-r from-emerald-950/92 via-emerald-900/88 to-emerald-900/55 border-l-[6px] border-amber-400 backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-2.5 shadow-xl">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight drop-shadow">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-[11px] sm:text-sm font-bold text-amber-300/95 leading-snug mt-0.5">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── STAGE: ILLUSTRATION + PHASE DETAIL ────────── */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col sm:flex-row gap-2 sm:gap-3 px-2 sm:px-4 pt-2 sm:pt-3 pb-2 sm:pb-3">
        {/* Hero illustration panel */}
        {IllustrationComponent && (
          <div className="relative flex-1 min-w-0 min-h-0 rounded-2xl overflow-hidden border-2 border-emerald-400/50 bg-slate-950/10 shadow-xl flex items-center justify-center">
            <IllustrationComponent className="w-full h-full object-contain" />
            {/* phase locator badge */}
            <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/80 border border-amber-300/60 px-2 py-1 backdrop-blur-sm">
              <span className="text-base leading-none">{activeHotspot?.emoji}</span>
              <span className="font-black text-[10px] uppercase tracking-wider text-amber-100">
                Tahap {activeIndex + 1}/{resolvedHotspots.length}
              </span>
            </div>
          </div>
        )}

        {/* Phase detail callout */}
        {activeHotspot && (
          <div
            className={`shrink-0 sm:w-[300px] md:w-[340px] rounded-2xl border-2 ${colorFor(
              cards[activeIndex]?.badgeColor
            ).border} bg-slate-950/85 backdrop-blur-sm shadow-xl px-3.5 py-3 flex flex-col justify-center`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl select-none">{activeHotspot.emoji}</span>
              <span className="font-black text-white text-sm sm:text-base leading-tight">
                {activeHotspot.label}
              </span>
            </div>
            <div className="mt-1.5 inline-flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-emerald-950 font-black text-[9px] sm:text-[10px] uppercase tracking-widest">
                {activeHotspot.sub}
              </span>
            </div>
            <p className="mt-2 text-[11px] sm:text-xs text-emerald-50/90 font-medium leading-relaxed">
              {activeHotspot.desc}
            </p>
          </div>
        )}
      </div>

      {/* ── PHASE SELECTION DOCK ─────────────────────── */}
      <div className="relative z-20 shrink-0 px-2 sm:px-4 pb-2 sm:pb-3">
        <div className="bg-slate-950/70 backdrop-blur-sm p-1.5 sm:p-2 rounded-2xl border border-emerald-400/30 shadow-lg w-full">
          <div className={`grid ${gridCols} gap-1.5 sm:gap-2`}>
            {resolvedHotspots.map((hotspot, idx) => {
              const isSelected = selectedHotspot === hotspot.id;
              const c = colorFor(cards[idx]?.badgeColor);
              const isLastOnMobile = idx === resolvedHotspots.length - 1;

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedHotspot(hotspot.id);
                  }}
                  className={`min-h-[46px] sm:min-h-[52px] px-2.5 sm:px-3 py-2 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm font-black transition-all duration-150 cursor-pointer border-2 flex items-center justify-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? `${c.solid} text-white shadow-md ring-2 ${c.ring} -translate-y-0.5`
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-100 border-slate-600/70 hover:border-emerald-400'
                  } ${isLastOnMobile && resolvedHotspots.length % 2 === 1 ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <span className="text-base sm:text-lg select-none shrink-0">{hotspot.emoji}</span>
                  <span className="truncate text-left">{idx + 1}. {hotspot.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TEACHER PROMPT ───────────────────────────── */}
      <div className="relative z-20 shrink-0 px-2 sm:px-4 pb-2.5 sm:pb-3">
        <div className="bg-amber-400/95 border-2 border-amber-500/80 px-3 py-1.5 sm:py-2 rounded-xl flex items-center gap-2 text-[11px] sm:text-xs text-emerald-950 shadow-lg">
          <Lightbulb className="text-emerald-950 shrink-0" size={15} />
          <span className="line-clamp-1 sm:line-clamp-2 font-semibold">
            <strong>Panduan Guru:</strong>{' '}
            {slide.teacherNotes ||
              'Ajak siswa mengamati animasi loop pergerakan molekul air: dari penguapan sungai oleh energi surya, pembentukan awan dingin di pegunungan, hingga turunnya hujan yang diserap oleh akar pohon.'}
          </span>
        </div>
      </div>
    </div>
  );
};
