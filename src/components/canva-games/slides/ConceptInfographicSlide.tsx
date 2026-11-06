import React, { useState, useEffect } from 'react';
import { Lightbulb, Maximize2, ZoomIn, ZoomOut, RotateCcw, X, Sparkles, Layers } from 'lucide-react';
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
  const isDedicatedInfographic = slide.id === 'uts-slide-2' || (slide as any).renderFullIllustration === true;

  const [viewMode, setViewMode] = useState<'infographic' | 'cards'>(() =>
    isDedicatedInfographic && IllustrationComponent ? 'infographic' : 'cards'
  );
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Close lightbox on Escape key & zoom shortcuts (+ / -)
  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
      } else if (e.key === '-') {
        setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  const handleOpenZoom = () => {
    sound.playClick();
    setZoomLevel(1);
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    sound.playClick();
    setIsZoomed(false);
    setZoomLevel(1);
  };

  const activeHotspotInfo = WATER_CYCLE_HOTSPOTS.find((h) => h.id === selectedHotspot);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-3 sm:space-y-4 animate-in fade-in duration-300 relative z-10">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-slate-200 shadow-2xs">
          <Sparkles size={12} className={theme.textPrimary} />
          <span className={`text-[11px] sm:text-xs font-black uppercase tracking-widest ${theme.textPrimary}`}>
            {slide.chapterBadge || 'BABAK 2: KONSEP DASAR PEMBELAJARAN'}
          </span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-2xl mx-auto">
            {slide.subtitle}
          </p>
        )}

        {/* View Mode Switcher when Illustration is Available */}
        {IllustrationComponent && (
          <div className="pt-1.5 flex items-center justify-center gap-2">
            <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 inline-flex items-center">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode('infographic');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'infographic'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles size={12} />
                <span>Bagan Animasi Loop</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setViewMode('cards');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers size={12} />
                <span>Kartu Konsep Ringkas</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleOpenZoom}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 transition flex items-center gap-1 cursor-pointer shadow-2xs"
              title="Perbesar Layar Penuh (Zoom)"
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline">Perbesar</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {viewMode === 'infographic' && IllustrationComponent ? (
        <div className="flex-1 w-full flex flex-col justify-center my-auto space-y-2.5">
          {/* Framed Interactive High-Res Looping SVG Infographic */}
          <div className="w-full max-h-[46vh] sm:max-h-[50vh] aspect-[16/10] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-300/80 shadow-lg bg-emerald-950/5 relative flex items-center justify-center">
            <IllustrationComponent className="w-full h-full object-contain" />
          </div>

          {/* Interactive Phase Badges Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {WATER_CYCLE_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedHotspot(isSelected ? null : hotspot.id);
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs scale-105'
                      : 'bg-white/90 hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span>{hotspot.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Active Hotspot Callout Box */}
          {activeHotspotInfo && (
            <div className="bg-emerald-50/90 border border-emerald-200 p-2.5 sm:p-3 rounded-2xl text-left animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-xs text-emerald-900">{activeHotspotInfo.label}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {activeHotspotInfo.sub}
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">{activeHotspotInfo.desc}</p>
            </div>
          )}
        </div>
      ) : (
        /* Direct Concept Cards Grid */
        <div
          className={`grid ${
            isFourCards
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'
              : 'grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'
          } my-auto w-full`}
        >
          {slide.cards.map((card, idx) => {
            const cardColor =
              card.badgeColor && CARD_THEME_COLORS[card.badgeColor]
                ? CARD_THEME_COLORS[card.badgeColor]
                : CARD_THEME_COLORS.emerald;

            return (
              <div
                key={card.id || `card-${idx}`}
                className={`p-4 sm:p-5 rounded-3xl ${cardColor.bg} border-2 ${cardColor.border} shadow-sm flex flex-col space-y-2 hover:shadow-md transition bg-white/90 backdrop-blur-xs`}
              >
                <span className="text-3xl sm:text-4xl filter drop-shadow-sm select-none">
                  {card.iconEmoji || '📘'}
                </span>
                {card.levelBadge && (
                  <span className={`text-[11px] font-black uppercase tracking-wider ${cardColor.badge}`}>
                    {card.levelBadge}
                  </span>
                )}
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium flex-1">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Teacher Speaker Prompt Banner */}
      <div className="bg-white/90 backdrop-blur-xs p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 flex items-center gap-3 text-xs sm:text-sm text-slate-700 shrink-0 shadow-2xs">
        <Lightbulb className="text-amber-500 shrink-0" size={18} />
        <span>
          <strong>Panduan Guru di Kelas:</strong>{' '}
          {slide.teacherNotes ||
            'Ajak siswa mengamati animasi loop pergerakan molekul air: dari penguapan sungai oleh energi surya, pembentukan awan dingin di pegunungan, hingga turunnya hujan yang diserap oleh akar pohon.'}
        </span>
      </div>

      {/* FULLSCREEN LIGHTBOX & ZOOM MODAL */}
      {isZoomed && IllustrationComponent && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-fadeIn"
          onClick={handleCloseZoom}
        >
          {/* Header Bar Controls */}
          <div
            className="w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 text-white z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">{slide.title}</h3>
              <p className="text-xs text-slate-400 font-medium">Infografis Resolusi Tinggi (Vektor SVG Interaktif)</p>
            </div>

            {/* Zoom Controls & Close Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Perkecil (-)"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-slate-300 hover:text-white transition cursor-pointer"
                  title="Reset Zoom (100%)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Perbesar (+)"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Reset Ukuran"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleCloseZoom}
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-700 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="Tutup (Esc)"
              >
                <X size={18} />
                <span className="hidden sm:inline">Tutup</span>
              </button>
            </div>
          </div>

          {/* Zoomable Infographic Viewport */}
          <div
            className="flex-1 w-full overflow-auto flex items-center justify-center p-2 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseZoom();
            }}
          >
            <div
              className="transition-transform duration-200 ease-out select-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-[88vw] max-w-6xl aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex items-center justify-center">
                <IllustrationComponent className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Footer Tip */}
          <div className="text-center pt-2 text-[11px] text-slate-500 font-medium z-10 shrink-0">
            💡 Tip: Gunakan tombol zoom atau keyboard (+ / -) untuk memperbesar detail planet, orbit, dan label sains. Tekan Esc untuk keluar.
          </div>
        </div>
      )}
    </div>
  );
};
