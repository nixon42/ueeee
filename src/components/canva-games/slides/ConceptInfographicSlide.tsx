import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
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

const CARD_THEME_COLORS: Record<string, { bg: string; border: string; text: string; badge: string; ring: string; iconBg: string }> = {
  emerald: {
    bg: 'bg-gradient-to-b from-white/95 to-emerald-50/90',
    border: 'border-emerald-300/90 hover:border-emerald-400',
    text: 'text-emerald-950',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ring: 'ring-emerald-400',
    iconBg: 'from-emerald-100 to-teal-50',
  },
  teal: {
    bg: 'bg-gradient-to-b from-white/95 to-teal-50/90',
    border: 'border-teal-300/90 hover:border-teal-400',
    text: 'text-teal-950',
    badge: 'bg-teal-100 text-teal-800 border-teal-300',
    ring: 'ring-teal-400',
    iconBg: 'from-teal-100 to-cyan-50',
  },
  rose: {
    bg: 'bg-gradient-to-b from-white/95 to-rose-50/90',
    border: 'border-rose-300/90 hover:border-rose-400',
    text: 'text-rose-950',
    badge: 'bg-rose-100 text-rose-800 border-rose-300',
    ring: 'ring-rose-400',
    iconBg: 'from-rose-100 to-red-50',
  },
  purple: {
    bg: 'bg-gradient-to-b from-white/95 to-purple-50/90',
    border: 'border-purple-300/90 hover:border-purple-400',
    text: 'text-purple-950',
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
    ring: 'ring-purple-400',
    iconBg: 'from-purple-100 to-indigo-50',
  },
  amber: {
    bg: 'bg-gradient-to-b from-white/95 to-amber-50/90',
    border: 'border-amber-300/90 hover:border-amber-400',
    text: 'text-amber-950',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    ring: 'ring-amber-400',
    iconBg: 'from-amber-100 to-yellow-50',
  },
  blue: {
    bg: 'bg-gradient-to-b from-white/95 to-blue-50/90',
    border: 'border-blue-300/90 hover:border-blue-400',
    text: 'text-blue-950',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    ring: 'ring-blue-400',
    iconBg: 'from-blue-100 to-sky-50',
  },
  indigo: {
    bg: 'bg-gradient-to-b from-white/95 to-indigo-50/90',
    border: 'border-indigo-300/90 hover:border-indigo-400',
    text: 'text-indigo-950',
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    ring: 'ring-indigo-400',
    iconBg: 'from-indigo-100 to-blue-50',
  },
  orange: {
    bg: 'bg-gradient-to-b from-white/95 to-orange-50/90',
    border: 'border-orange-300/90 hover:border-orange-400',
    text: 'text-orange-950',
    badge: 'bg-orange-100 text-orange-800 border-orange-300',
    ring: 'ring-orange-400',
    iconBg: 'from-orange-100 to-amber-50',
  },
};

const WATER_CYCLE_HOTSPOTS = [
  {
    id: 'evaporasi',
    emoji: '☀️',
    label: '1. Evaporasi',
    sub: 'Penguapan H2O',
    desc: 'Panas surya memanaskan air permukaan laut, sungai, dan danau sehingga molekul air menguap membubung ke atmosfer (termasuk transpirasi dari daun tumbuhan).',
  },
  {
    id: 'kondensasi',
    emoji: '☁️',
    label: '2. Kondensasi',
    sub: 'Pembentukan Awan',
    desc: 'Uap air di atmosfer dingin mendingin dan mengembun menjadi miliaran titik-titik air mikro yang saling berkumpul membentuk awan mendung tebal.',
  },
  {
    id: 'presipitasi',
    emoji: '🌧️',
    label: '3. Presipitasi',
    sub: 'Curah Hujan',
    desc: 'Awan jenuh tidak mampu lagi menahan berat air, sehingga gravitasi bumi menarik butiran air jatuh ke tanah sebagai hujan membasahi pegunungan.',
  },
  {
    id: 'infiltrasi',
    emoji: '🌱',
    label: '4. Infiltrasi',
    sub: 'Mata Air Tanah',
    desc: 'Air hujan meresap ke dalam pori-pori tanah berkat jalinan akar pohon hutan, tersaring alami menjadi cadangan mata air pegunungan yang jernih.',
  },
  {
    id: 'fotosintesis',
    emoji: '🌿',
    label: '5. Fotosintesis',
    sub: 'Pertukaran Gas O2',
    desc: 'Stomata daun menyerap CO2 dan energi foton surya untuk memproduksi glukosa serta melepaskan oksigen segar bagi seluruh makhluk hidup.',
  },
];

export const ConceptInfographicSlide: React.FC<ConceptInfographicSlideProps> = ({
  slide,
  gameId,
}) => {
  const isFourCards = slide.cards.length === 4;
  const IllustrationComponent = gameId ? getDeckIllustration(gameId) : null;
  const isWaterCycleGame = gameId === 'ular-tangga-sains';
  const isPhSlide =
    slide.title?.toLowerCase().includes('ph') ||
    slide.cards.some(
      (c) =>
        c.levelBadge?.toLowerCase().includes('ph') ||
        c.title?.toLowerCase().includes('ph')
    );

  // For games with illustrations other than water cycle (like point-click-lab), default to cards view
  const [activeView, setActiveView] = useState<'cards' | 'illustration'>('cards');
  const [selectedCardId, setSelectedCardId] = useState<string>(
    slide.cards.length > 0 ? slide.cards[0].id || 'card-0' : ''
  );

  // Tablet-first UX: default selected hotspot is the first one for water cycle deck
  const [selectedHotspot, setSelectedHotspot] = useState<string>('evaporasi');
  const activeHotspotInfo = WATER_CYCLE_HOTSPOTS.find((h) => h.id === selectedHotspot);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-2 sm:space-y-3 animate-in fade-in duration-300 relative z-10 overflow-hidden">
      {/* Header: Title & Subtitle */}
      <div className="text-center space-y-1 shrink-0">
        <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-2xl mx-auto truncate sm:whitespace-normal">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main Content Area */}
      {isWaterCycleGame && IllustrationComponent ? (
        /* Dedicated Water Cycle Infographic & Hotspots Dock for Ular Tangga Sains */
        <div className="flex-1 min-h-0 w-full flex flex-col justify-between space-y-2 overflow-hidden my-auto">
          {/* Framed Interactive High-Res Looping SVG Infographic */}
          <div className="flex-1 min-h-0 w-full max-h-[34vh] sm:max-h-[38vh] aspect-[16/10] mx-auto rounded-3xl overflow-hidden border-2 border-emerald-400/50 shadow-md bg-emerald-950/5 relative flex items-center justify-center">
            <IllustrationComponent className="w-full h-full object-contain" />
          </div>

          {/* Chunky Tablet Action Dock for Water Cycle Phases */}
          <div className="bg-slate-100/70 p-1.5 sm:p-2 rounded-3xl border border-slate-200/80 shadow-2xs shrink-0 w-full max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {WATER_CYCLE_HOTSPOTS.map((hotspot, idx) => {
                const isSelected = selectedHotspot === hotspot.id;
                const isLastOnMobile = idx === WATER_CYCLE_HOTSPOTS.length - 1;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedHotspot(hotspot.id);
                    }}
                    className={`min-h-[46px] sm:min-h-[50px] px-3 sm:px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all duration-150 cursor-pointer border-2 flex items-center justify-center gap-1.5 shadow-xs active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-3 ring-emerald-300/60 -translate-y-0.5'
                        : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                    } ${isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''}`}
                  >
                    <span className="text-base sm:text-lg select-none shrink-0">{hotspot.emoji}</span>
                    <span className="truncate">{hotspot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Hotspot Tablet Callout Info Box */}
          {activeHotspotInfo && (
            <div className="bg-emerald-50/95 border-2 border-emerald-300/90 px-4 py-2 sm:py-2.5 rounded-2xl text-left animate-in fade-in duration-150 shrink-0 shadow-2xs">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-base select-none">{activeHotspotInfo.emoji}</span>
                <span className="font-black text-xs sm:text-sm text-emerald-950">{activeHotspotInfo.label}</span>
                <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold uppercase tracking-wide">
                  {activeHotspotInfo.sub}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-snug">{activeHotspotInfo.desc}</p>
            </div>
          )}
        </div>
      ) : (
        /* Native Tablet Game: Collectible TCG Cards with Mode Switcher if Illustration exists */
        <div className="flex-1 min-h-0 w-full flex flex-col justify-between space-y-2 overflow-hidden my-auto">
          {/* Tablet Game View Mode Switcher for Decks with Dedicated SVG */}
          {IllustrationComponent && (
            <div className="flex items-center justify-center gap-2 shrink-0 py-0.5">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveView('cards');
                }}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer border-2 flex items-center gap-1.5 shadow-xs ${
                  activeView === 'cards'
                    ? 'bg-teal-600 text-white border-teal-700 shadow-md ring-2 ring-teal-300'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🗂️</span>
                <span>Kartu Analisis ({slide.cards.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveView('illustration');
                }}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer border-2 flex items-center gap-1.5 shadow-xs ${
                  activeView === 'illustration'
                    ? 'bg-teal-600 text-white border-teal-700 shadow-md ring-2 ring-teal-300'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>🔬</span>
                <span>Visualisasi Lab Holo-3D</span>
              </button>
            </div>
          )}

          {activeView === 'illustration' && IllustrationComponent ? (
            /* Framed High-Res Interactive SVG Infographic View */
            <div className="flex-1 min-h-0 w-full max-h-[46vh] aspect-[16/10] mx-auto rounded-3xl overflow-hidden border-2 border-teal-400/60 shadow-xl bg-teal-950/10 relative flex items-center justify-center">
              <IllustrationComponent className="w-full h-full object-contain" />
            </div>
          ) : (
            <>
              {/* Interactive pH 0-14 Universal Scale Bar for Chemistry Decks */}
              {isPhSlide && (
                <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-teal-500/40 shadow-md text-white shrink-0 select-none">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 px-1">
                    <span className="flex items-center gap-1 text-rose-400">
                      <span>🔴</span> Asam (pH &lt; 7)
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-extrabold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <span>💧</span> Netral (pH 7)
                    </span>
                    <span className="flex items-center gap-1 text-indigo-400">
                      Basa (pH &gt; 7) <span>🟣</span>
                    </span>
                  </div>

                  {/* 0 - 14 Spectrum Gradient Bar */}
                  <div className="relative w-full h-5 sm:h-6 rounded-xl overflow-hidden flex shadow-inner border border-white/20">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((phVal) => {
                      const phCardId = phVal < 7 ? 'card-p1' : phVal === 7 ? 'card-p2' : 'card-p3';
                      const isSelected = selectedCardId === phCardId;

                      const phColors = [
                        '#dc2626', '#ef4444', '#f87171', '#f97316', '#fb923c', '#facc15', '#a3e635',
                        '#22c55e',
                        '#10b981', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#7c3aed'
                      ];

                      return (
                        <button
                          key={phVal}
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            const targetCard = slide.cards.find(
                              (c) =>
                                (phVal < 7 && (c.levelBadge?.includes('< 7') || c.id === 'card-p1')) ||
                                (phVal === 7 && (c.levelBadge?.includes('= 7') || c.id === 'card-p2')) ||
                                (phVal > 7 && (c.levelBadge?.includes('> 7') || c.id === 'card-p3'))
                            );
                            if (targetCard?.id) {
                              setSelectedCardId(targetCard.id);
                            } else {
                              setSelectedCardId(phCardId);
                            }
                          }}
                          style={{ backgroundColor: phColors[phVal] }}
                          className={`flex-1 h-full flex items-center justify-center transition-all cursor-pointer relative ${
                            isSelected
                              ? 'scale-y-110 z-10 brightness-115 ring-2 ring-white shadow-md'
                              : 'opacity-85 hover:opacity-100'
                          }`}
                          title={`pH ${phVal} - Klik untuk telaah kartu terkait`}
                        >
                          <span className="text-[9px] sm:text-[10px] font-black text-white drop-shadow-md">
                            {phVal}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Chunky Tactile Collectible TCG Cards Grid */}
              <div
                className={`grid ${
                  isFourCards
                    ? 'grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5'
                    : 'grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4'
                } flex-1 min-h-0 items-stretch my-auto w-full overflow-hidden`}
              >
              {slide.cards.map((card, idx) => {
                const cardColor =
                  card.badgeColor && CARD_THEME_COLORS[card.badgeColor]
                    ? CARD_THEME_COLORS[card.badgeColor]
                    : CARD_THEME_COLORS.teal;
                const isSelected = selectedCardId === card.id || (!selectedCardId && idx === 0);

                return (
                  <div
                    key={card.id || `card-${idx}`}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCardId(card.id);
                    }}
                    className={`p-3.5 sm:p-5 rounded-3xl ${cardColor.bg} border-3 ${cardColor.border} border-b-6 shadow-md hover:shadow-lg transition-all duration-150 flex flex-col justify-between cursor-pointer active:translate-y-1 active:border-b-3 backdrop-blur-md overflow-hidden relative group ${
                      isSelected ? `ring-4 ${cardColor.ring}/60 shadow-xl -translate-y-0.5` : ''
                    }`}
                  >
                    {/* Card Header: 3D Icon Emblem + Level Badge */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr ${cardColor.iconBg} shadow-inner border border-white/80 flex items-center justify-center text-2xl sm:text-3xl select-none group-hover:scale-105 transition-transform`}
                        >
                          {card.iconEmoji || '📘'}
                        </div>
                        {card.levelBadge && (
                          <span
                            className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-xl border shadow-2xs ${cardColor.badge}`}
                          >
                            {card.levelBadge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-sm sm:text-base md:text-lg text-slate-900 leading-snug">
                        {card.title}
                      </h3>
                    </div>

                    {/* Card Body: Explanation */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold mt-2 mb-1">
                      {card.description}
                    </p>

                    {/* Card Tactical Footer */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>SPESIMEN 0{idx + 1}</span>
                      <span className="text-teal-600 font-extrabold">
                        {isSelected ? '✓ TELAAH AKTIF' : 'KETUK UNTUK TELAAH'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            </>
          )}
        </div>
      )}

      {/* Teacher Speaker Prompt Banner */}
      <div className="bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-slate-200/90 flex items-center gap-2.5 text-xs text-slate-700 shrink-0 shadow-2xs">
        <Lightbulb className="text-amber-500 shrink-0" size={16} />
        <span className="line-clamp-2">
          <strong>Panduan Guru di Kelas:</strong>{' '}
          {slide.teacherNotes ||
            'Ajak siswa mendiskusikan konsep inti pada kartu dan hubungannya dengan pemecahan anomali.'}
        </span>
      </div>
    </div>
  );
};
