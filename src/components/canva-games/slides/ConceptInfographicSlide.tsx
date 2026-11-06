import React, { useState } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { ConceptInfographicSlide as ConceptSlideData } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';
import { sound } from '@/lib/sound';
import { getDeckIllustration } from '@/components/visuals';

export interface ConceptInfographicSlideProps {
  slide: ConceptSlideData;
  themeColor: PresentationThemeKey;
  gameId?: string;
  onNext?: () => void;
}

const CARD_THEME_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50/70', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'text-emerald-700' },
  amber: { bg: 'bg-amber-50/70', border: 'border-amber-200', text: 'text-amber-800', badge: 'text-amber-700' },
  purple: { bg: 'bg-purple-50/70', border: 'border-purple-200', text: 'text-purple-800', badge: 'text-purple-700' },
  blue: { bg: 'bg-blue-50/70', border: 'border-blue-200', text: 'text-blue-800', badge: 'text-blue-700' },
  teal: { bg: 'bg-teal-50/70', border: 'border-teal-200', text: 'text-teal-800', badge: 'text-teal-700' },
  rose: { bg: 'bg-rose-50/70', border: 'border-rose-200', text: 'text-rose-800', badge: 'text-rose-700' },
  orange: { bg: 'bg-orange-50/70', border: 'border-orange-200', text: 'text-orange-800', badge: 'text-orange-700' },
  indigo: { bg: 'bg-indigo-50/70', border: 'border-indigo-200', text: 'text-indigo-800', badge: 'text-indigo-700' },
};

const WATER_CYCLE_HOTSPOTS = [
  {
    id: 'evaporasi',
    label: '☀️ 1. Evaporasi',
    sub: 'Penguapan H2O',
    desc: 'Panas surya memanaskan air permukaan laut, sungai, dan danau sehingga molekul air menguap membubung ke atmosfer (termasuk transpirasi dari daun tumbuhan).',
  },
  {
    id: 'kondensasi',
    label: '☁️ 2. Kondensasi',
    sub: 'Pembentukan Awan',
    desc: 'Uap air di atmosfer dingin mendingin dan mengembun menjadi miliaran titik-titik air mikro yang saling berkumpul membentuk awan mendung tebal.',
  },
  {
    id: 'presipitasi',
    label: '🌧️ 3. Presipitasi',
    sub: 'Curah Hujan',
    desc: 'Awan jenuh tidak mampu lagi menahan berat air, sehingga gravitasi bumi menarik butiran air jatuh ke tanah sebagai hujan membasahi pegunungan.',
  },
  {
    id: 'infiltrasi',
    label: '🌱 4. Infiltrasi',
    sub: 'Mata Air Tanah',
    desc: 'Air hujan meresap ke dalam pori-pori tanah berkat jalinan akar pohon hutan, tersaring alami menjadi cadangan mata air pegunungan yang jernih.',
  },
  {
    id: 'fotosintesis',
    label: '🌿 5. Fotosintesis',
    sub: 'Pertukaran Gas O2',
    desc: 'Stomata daun menyerap CO2 dan energi foton surya untuk memproduksi glukosa serta melepaskan oksigen segar bagi seluruh makhluk hidup.',
  },
];

export const ConceptInfographicSlide: React.FC<ConceptInfographicSlideProps> = ({
  slide,
  themeColor,
  gameId,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const isFourCards = slide.cards.length === 4;
  const IllustrationComponent = gameId ? getDeckIllustration(gameId) : null;

  // Tablet-first UX: default selected hotspot is the first one for instant context and zero layout jumping
  const [selectedHotspot, setSelectedHotspot] = useState<string>('evaporasi');

  const activeHotspotInfo = WATER_CYCLE_HOTSPOTS.find((h) => h.id === selectedHotspot);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-2 sm:space-y-3 animate-in fade-in duration-300 relative z-10 overflow-hidden">
      {/* Header: Title & Subtitle without tiny switchers */}
      <div className="text-center space-y-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-slate-200 shadow-2xs">
          <Sparkles size={12} className={theme.textPrimary} />
          <span className={`text-[11px] sm:text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}>
            {slide.chapterBadge || 'BABAK 2: KONSEP DASAR PEMBELAJARAN'}
          </span>
        </div>
        <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs text-slate-500 font-semibold max-w-2xl mx-auto truncate sm:whitespace-normal">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main Content Area: Deterministic Rendering (Infographic or Concept Cards) */}
      {IllustrationComponent ? (
        <div className="flex-1 min-h-0 w-full flex flex-col justify-between space-y-2 overflow-hidden my-auto">
          {/* Framed Interactive High-Res Looping SVG Infographic */}
          <div className="flex-1 min-h-0 w-full max-h-[38vh] sm:max-h-[44vh] aspect-[16/10] mx-auto rounded-3xl overflow-hidden border-2 border-emerald-400/50 shadow-md bg-emerald-950/5 relative flex items-center justify-center">
            <IllustrationComponent className="w-full h-full object-contain" />
          </div>

          {/* Chunky Tablet Touch Target Buttons for Water Cycle Phases (Min 44px height, high contrast, tactile) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 shrink-0 w-full max-w-3xl mx-auto">
            {WATER_CYCLE_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedHotspot(hotspot.id);
                  }}
                  className={`h-10 sm:h-11 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-black transition-all duration-150 cursor-pointer border-2 flex items-center gap-1.5 shadow-xs active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-300/60 scale-[1.02]'
                      : 'bg-white/95 hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span>{hotspot.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Tablet Callout Info Box */}
          {activeHotspotInfo && (
            <div className="bg-emerald-50/95 border-2 border-emerald-300/80 px-4 py-2 sm:py-2.5 rounded-2xl text-left animate-in fade-in duration-150 shrink-0 shadow-2xs">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-black text-xs sm:text-sm text-emerald-950">{activeHotspotInfo.label}</span>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold">
                  {activeHotspotInfo.sub}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-snug">{activeHotspotInfo.desc}</p>
            </div>
          )}
        </div>
      ) : (
        /* Direct Concept Cards Grid for Decks without Dedicated SVG Illustration */
        <div
          className={`grid ${
            isFourCards
              ? 'grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3'
              : 'grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4'
          } flex-1 min-h-0 items-stretch my-auto w-full overflow-hidden`}
        >
          {slide.cards.map((card, idx) => {
            const cardColor =
              card.badgeColor && CARD_THEME_COLORS[card.badgeColor]
                ? CARD_THEME_COLORS[card.badgeColor]
                : CARD_THEME_COLORS.emerald;

            return (
              <div
                key={card.id || `card-${idx}`}
                className={`p-3.5 sm:p-4 rounded-2xl ${cardColor.bg} border-2 ${cardColor.border} shadow-xs flex flex-col justify-between hover:shadow-sm transition bg-white/95 backdrop-blur-xs overflow-hidden`}
              >
                <div className="space-y-1.5">
                  <span className="text-2xl sm:text-3xl filter drop-shadow-xs select-none">
                    {card.iconEmoji || '📘'}
                  </span>
                  {card.levelBadge && (
                    <div className={`text-[10px] font-black uppercase tracking-wider ${cardColor.badge}`}>
                      {card.levelBadge}
                    </div>
                  )}
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium mt-1">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Teacher Speaker Prompt Banner */}
      <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 sm:py-2 rounded-2xl border border-slate-200/90 flex items-center gap-2.5 text-xs text-slate-700 shrink-0 shadow-2xs">
        <Lightbulb className="text-amber-500 shrink-0" size={16} />
        <span className="line-clamp-2">
          <strong>Panduan Guru di Kelas:</strong>{' '}
          {slide.teacherNotes ||
            'Ajak siswa mengamati animasi loop pergerakan molekul air: dari penguapan sungai oleh energi surya, pembentukan awan dingin di pegunungan, hingga turunnya hujan yang diserap oleh akar pohon.'}
        </span>
      </div>
    </div>
  );
};
