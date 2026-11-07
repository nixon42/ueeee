import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { SequenceItem, SequenceTheme } from './CanvaSequenceGame';

export interface TgcSequenceCardProps {
  item: SequenceItem;
  index?: number;
  isDragging?: boolean;
  isSelected?: boolean;
  isCorrectPosition?: boolean;
  isWrongPosition?: boolean;
  theme?: SequenceTheme;
  className?: string;
  style?: React.CSSProperties;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * TCG Card Artwork Renderer
 * Provides custom high-res SVG scenes for science & history concepts,
 * with a high-end elemental procedurally generated artwork fallback.
 */
export const TgcCardArtwork: React.FC<{ item: SequenceItem; theme?: SequenceTheme }> = ({ item, theme = 'emerald' }) => {
  const id = item.id.toLowerCase();
  const label = item.label.toLowerCase();

  // 1. Daur Air - Evaporasi
  if (id.includes('evaporasi') || label.includes('evaporasi')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="evapSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="130" fill="url(#evapSky)" />
        {/* Blazing Sun */}
        <circle cx="100" cy="40" r="32" fill="url(#sunGlow)" />
        <circle cx="100" cy="40" r="18" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
        {/* Sun Beams */}
        <g stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8">
          <line x1="100" y1="14" x2="100" y2="6" />
          <line x1="100" y1="66" x2="100" y2="74" />
          <line x1="74" y1="40" x2="66" y2="40" />
          <line x1="126" y1="40" x2="134" y2="40" />
          <line x1="82" y1="22" x2="76" y2="16" />
          <line x1="118" y1="58" x2="124" y2="64" />
          <line x1="82" y1="58" x2="76" y2="64" />
          <line x1="118" y1="22" x2="124" y2="16" />
        </g>
        {/* River Water Surface */}
        <path d="M0 95 Q50 90 100 95 T200 95 L200 130 L0 130 Z" fill="#0284c7" opacity="0.9" />
        <path d="M0 105 Q50 100 100 105 T200 105 L200 130 L0 130 Z" fill="#0369a1" />
        {/* Ascending Water Vapor Curves */}
        <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" strokeDasharray="4 2">
          <path d="M50 95 Q45 80 55 65 T50 45" />
          <path d="M100 90 Q95 75 105 60 T100 40" />
          <path d="M150 95 Q145 80 155 65 T150 45" />
        </g>
        {/* Floating Vapor Droplets */}
        <circle cx="56" cy="52" r="2.5" fill="#e0f2fe" opacity="0.9" />
        <circle cx="106" cy="46" r="2.5" fill="#e0f2fe" opacity="0.9" />
        <circle cx="144" cy="54" r="2.5" fill="#e0f2fe" opacity="0.9" />
      </svg>
    );
  }

  // 2. Daur Air - Kondensasi
  if (id.includes('kondensasi') || label.includes('kondensasi')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="kondSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect width="200" height="130" fill="url(#kondSky)" />
        {/* Mountain Silhouette in Cold Altitude */}
        <path d="M20 130 L90 70 L150 110 L180 85 L220 130 Z" fill="#0f172a" opacity="0.7" />
        {/* Giant Fluffy Cumulus Cloud */}
        <g transform="translate(25, 25)">
          <path
            d="M35 55 Q20 55 15 42 Q10 28 25 20 Q35 8 55 12 Q70 2 95 10 Q115 2 130 16 Q145 28 138 45 Q145 55 125 55 Z"
            fill="url(#cloudGrad)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          {/* Condensation Vapor Droplets forming within cloud */}
          <circle cx="50" cy="30" r="3" fill="#38bdf8" opacity="0.8" />
          <circle cx="75" cy="24" r="3.5" fill="#38bdf8" opacity="0.9" />
          <circle cx="105" cy="32" r="3" fill="#38bdf8" opacity="0.8" />
          <circle cx="85" cy="42" r="2.5" fill="#38bdf8" opacity="0.85" />
        </g>
      </svg>
    );
  }

  // 3. Daur Air - Presipitasi
  if (id.includes('presipitasi') || label.includes('presipitasi')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="presipSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
        </defs>
        <rect width="200" height="130" fill="url(#presipSky)" />
        {/* Dark Heavy Rain Cloud */}
        <path
          d="M45 45 Q30 45 25 35 Q20 22 35 15 Q45 5 65 9 Q80 0 105 7 Q125 0 140 12 Q155 22 148 37 Q155 45 135 45 Z"
          fill="#475569"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* Diagonal Crystalline Rain Streaks */}
        <g stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" opacity="0.85">
          <line x1="45" y1="55" x2="35" y2="85" />
          <line x1="65" y1="52" x2="55" y2="82" />
          <line x1="85" y1="56" x2="75" y2="86" />
          <line x1="105" y1="53" x2="95" y2="83" />
          <line x1="125" y1="55" x2="115" y2="85" />
          <line x1="145" y1="52" x2="135" y2="82" />

          <line x1="55" y1="90" x2="45" y2="120" />
          <line x1="75" y1="88" x2="65" y2="118" />
          <line x1="95" y1="92" x2="85" y2="122" />
          <line x1="115" y1="89" x2="105" y2="119" />
          <line x1="135" y1="91" x2="125" y2="121" />
        </g>
        {/* Mountain Ridge Soaked in Rain */}
        <path d="M0 130 L70 95 L140 120 L200 90 L200 130 Z" fill="#047857" opacity="0.8" />
      </svg>
    );
  }

  // 4. Daur Air - Infiltrasi
  if (id.includes('infiltrasi') || label.includes('infiltrasi')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="infiltSoil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="25%" stopColor="#78350f" />
            <stop offset="70%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <rect width="200" height="130" fill="url(#infiltSoil)" />
        {/* Surface Sprouting Plant */}
        <g transform="translate(100, 22)">
          {/* Stem */}
          <path d="M0 12 L0 0" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M0 0 Q-10 -10 -15 0 Q-10 6 0 2" fill="#22c55e" />
          <path d="M0 0 Q10 -10 15 0 Q10 6 0 2" fill="#4ade80" />
        </g>
        {/* Underground Deep Root Network */}
        <g stroke="#fef3c7" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
          <path d="M100 35 L90 55 L80 75 L75 95" />
          <path d="M100 35 L110 55 L120 75 L125 95" />
          <path d="M90 55 L105 70 L100 90" />
          <path d="M80 75 L68 88" />
          <path d="M120 75 L132 88" />
        </g>
        {/* Filtered Blue Aquifer / Ground Water Table at Bottom */}
        <path d="M0 105 Q50 98 100 105 T200 105 L200 130 L0 130 Z" fill="#38bdf8" opacity="0.75" />
        {/* Percolating Water Droplets */}
        <circle cx="78" cy="62" r="2.5" fill="#38bdf8" />
        <circle cx="122" cy="66" r="2.5" fill="#38bdf8" />
        <circle cx="98" cy="82" r="3" fill="#38bdf8" />
      </svg>
    );
  }

  // 5. Metode Ilmiah - 1. Observasi Fenomena
  if (id.includes('m1') || id.includes('observasi') || label.includes('observasi')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="obsBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#042f2e" />
            <stop offset="60%" stopColor="#115e59" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="130" fill="url(#obsBg)" />
        {/* Holographic Tactical Grid */}
        <path d="M0 65 L200 65 M100 0 L100 130" stroke="#14b8a6" strokeWidth="0.6" strokeDasharray="4 2" opacity="0.3" />
        <circle cx="100" cy="65" r="45" stroke="#14b8a6" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        {/* Glowing Conical Flask in Background */}
        <path d="M92 40 L92 50 L75 85 C73 90 77 94 82 94 L118 94 C123 94 127 90 125 85 L108 50 L108 40 Z" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" opacity="0.6" />
        <path d="M78 82 L122 82 L118 94 L82 94 Z" fill="#2dd4bf" opacity="0.7" />
        {/* Forensic Magnifying Lens Reticle */}
        <circle cx="95" cy="62" r="34" fill="url(#lensGlow)" stroke="#5eead4" strokeWidth="2.5" />
        <circle cx="95" cy="62" r="28" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
        {/* Reticle Crosshairs */}
        <line x1="95" y1="32" x2="95" y2="40" stroke="#5eead4" strokeWidth="2" />
        <line x1="95" y1="84" x2="95" y2="92" stroke="#5eead4" strokeWidth="2" />
        <line x1="65" y1="62" x2="73" y2="62" stroke="#5eead4" strokeWidth="2" />
        <line x1="117" y1="62" x2="125" y2="62" stroke="#5eead4" strokeWidth="2" />
        {/* Magnifier Handle */}
        <line x1="120" y1="86" x2="152" y2="116" stroke="#94a3b8" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="120" y1="86" x2="152" y2="116" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sparkle Data Points */}
        <circle cx="90" cy="55" r="2" fill="#ffffff" />
        <circle cx="105" cy="68" r="2.5" fill="#fef08a" />
      </svg>
    );
  }

  // 6. Metode Ilmiah - 2. Perumusan Masalah
  if (id.includes('m2') || id.includes('masalah') || label.includes('masalah')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="probBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="60%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="probPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="130" fill="url(#probBg)" />
        {/* Hexagonal Molecular Node Network */}
        <polygon points="100,25 130,42 130,78 100,95 70,78 70,42" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
        <circle cx="100" cy="60" r="38" fill="url(#probPulse)" />
        {/* Glowing Tactical Question Symbol */}
        <text x="100" y="78" textAnchor="middle" fill="#c7d2fe" fontSize="56" fontWeight="900" fontFamily="sans-serif" filter="drop-shadow(0 0 10px #818cf8)">
          ?
        </text>
        {/* Warning Indicator Radar Nodes */}
        <circle cx="70" cy="42" r="3" fill="#a5b4fc" />
        <circle cx="130" cy="42" r="3" fill="#a5b4fc" />
        <circle cx="100" cy="95" r="3" fill="#a5b4fc" />
        {/* Digital Hazard Alert Chevron */}
        <path d="M30 105 L45 80 L60 105 Z" stroke="#fbbf24" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.3" />
        <text x="45" y="101" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="900">!</text>
      </svg>
    );
  }

  // 7. Metode Ilmiah - 3. Pengajuan Hipotesis
  if (id.includes('m3') || id.includes('hipotesis') || label.includes('hipotesis')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="hypoBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="60%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <radialGradient id="bulbGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="130" fill="url(#hypoBg)" />
        {/* Big Bright Filament Aura */}
        <circle cx="100" cy="52" r="42" fill="url(#bulbGlow)" />
        {/* Incandescent Bulb Silhouette */}
        <path
          d="M82 62 C78 52 80 38 90 30 C100 22 112 25 118 34 C124 43 120 54 116 62 L112 75 L88 75 Z"
          fill="#fef9c3"
          stroke="#facc15"
          strokeWidth="2"
        />
        {/* Glowing Tungsten Filament */}
        <path d="M94 58 L98 42 L102 46 L106 42 L110 58" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Bulb Screw Base */}
        <path d="M89 75 L111 75 L108 85 L92 85 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1.2" />
        <rect x="94" y="85" width="12" height="4" rx="2" fill="#475569" />
        {/* Orbital Atom Electrons */}
        <ellipse cx="100" cy="50" rx="46" ry="16" stroke="#fde047" strokeWidth="1" strokeDasharray="3 2" transform="rotate(-20 100 50)" opacity="0.6" />
        <ellipse cx="100" cy="50" rx="46" ry="16" stroke="#fde047" strokeWidth="1" strokeDasharray="3 2" transform="rotate(35 100 50)" opacity="0.6" />
        <circle cx="62" cy="40" r="3" fill="#facc15" />
        <circle cx="138" cy="62" r="3" fill="#facc15" />
      </svg>
    );
  }

  // 8. Metode Ilmiah - 4. Eksperimen Terkontrol
  if (id.includes('m4') || id.includes('eksperimen') || label.includes('eksperimen')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="expBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#083344" />
            <stop offset="60%" stopColor="#155e75" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="200" height="130" fill="url(#expBg)" />
        {/* Lab Stand & Clamp Bar */}
        <line x1="50" y1="15" x2="50" y2="120" stroke="#94a3b8" strokeWidth="3" />
        <line x1="30" y1="120" x2="70" y2="120" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <line x1="50" y1="35" x2="98" y2="35" stroke="#cbd5e1" strokeWidth="2.5" />
        {/* Precision Titration Burette Tube */}
        <rect x="94" y="10" width="10" height="55" rx="2" fill="#ffffff" fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="97" y1="20" x2="101" y2="20" stroke="#f43f5e" strokeWidth="1" />
        <line x1="97" y1="30" x2="101" y2="30" stroke="#f43f5e" strokeWidth="1" />
        <line x1="97" y1="40" x2="101" y2="40" stroke="#f43f5e" strokeWidth="1" />
        {/* Titration Stopcock Valve & Droplet */}
        <circle cx="99" cy="65" r="3" fill="#f43f5e" />
        <path d="M99 72 Q97 76 99 79 Q101 76 99 72 Z" fill="#ec4899" />
        {/* Erlenmeyer Titration Flask */}
        <path d="M93 82 L93 88 L70 115 C68 118 72 122 76 122 L122 122 C126 122 130 118 128 115 L105 88 L105 82 Z" fill="#ffffff" fillOpacity="0.3" stroke="#e0f2fe" strokeWidth="1.5" />
        {/* Reactive Liquid Meniscus with Color Neutralization */}
        <path d="M72 113 L126 113 L122 122 L76 122 Z" fill="url(#liquidGrad)" opacity="0.85" />
        {/* Rising Effervescence Bubbles */}
        <circle cx="88" cy="116" r="2" fill="#ffffff" opacity="0.9" />
        <circle cx="106" cy="114" r="2.5" fill="#ffffff" opacity="0.9" />
        <circle cx="98" cy="108" r="1.8" fill="#ffffff" opacity="0.9" />
      </svg>
    );
  }

  // 9. Metode Ilmiah - 5. Analisis & Kesimpulan
  if (id.includes('m5') || id.includes('kesimpulan') || label.includes('kesimpulan') || label.includes('analisis')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <defs>
          <linearGradient id="anaBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="60%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
        </defs>
        <rect width="200" height="130" fill="url(#anaBg)" />
        {/* Holographic Tablet Screen Frame */}
        <rect x="25" y="18" width="150" height="94" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" opacity="0.8" />
        {/* Analytical Data Grid Lines */}
        <line x1="40" y1="92" x2="160" y2="92" stroke="#334155" strokeWidth="1" />
        <line x1="40" y1="72" x2="160" y2="72" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="40" y1="52" x2="160" y2="52" stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3" />
        {/* Glowing Green Bar Graph Columns */}
        <rect x="52" y="70" width="14" height="22" rx="2" fill="#34d399" opacity="0.75" />
        <rect x="74" y="55" width="14" height="37" rx="2" fill="#10b981" opacity="0.85" />
        <rect x="96" y="42" width="14" height="50" rx="2" fill="#059669" opacity="0.9" />
        <rect x="118" y="32" width="14" height="60" rx="2" fill="#34d399" />
        {/* Connecting Precision Trendline */}
        <path d="M59 70 L81 55 L103 42 L125 32" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="125" cy="32" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        {/* Holographic Approved Stamp */}
        <g transform="translate(142, 38)">
          <circle cx="0" cy="0" r="14" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          <path d="M-6 0 L-2 4 L6 -4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    );
  }

  // 10. Universal Elemental TCG Artwork Fallback for Other Decks
  const themeGradients: Record<string, string> = {
    emerald: 'from-emerald-700 via-teal-800 to-slate-900',
    amber: 'from-amber-600 via-orange-700 to-stone-900',
    purple: 'from-purple-700 via-indigo-800 to-slate-900',
    blue: 'from-blue-600 via-sky-700 to-slate-900',
    indigo: 'from-indigo-700 via-violet-800 to-slate-900',
    rose: 'from-rose-600 via-pink-700 to-stone-900',
    teal: 'from-teal-600 via-emerald-700 to-slate-900',
    orange: 'from-orange-600 via-amber-700 to-stone-900',
  };

  const bgGrad = themeGradients[theme] || themeGradients.emerald;

  return (
    <div className={`w-full h-full bg-gradient-to-br ${bgGrad} relative flex items-center justify-center overflow-hidden`}>
      {/* Decorative Radial Grid & Rune Rings */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 130">
        <circle cx="100" cy="65" r="50" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <circle cx="100" cy="65" r="30" stroke="#ffffff" strokeWidth="1" fill="none" />
        <line x1="0" y1="65" x2="200" y2="65" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 2" />
        <line x1="100" y1="0" x2="100" y2="130" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="4 2" />
      </svg>
      {/* Center 3D Emoji Hero */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-4xl sm:text-5xl filter drop-shadow-lg select-none transform hover:scale-110 transition-transform">
          {item.iconEmoji || '✨'}
        </span>
      </div>
    </div>
  );
};

/**
 * Authentic Collectible TCG Sequence Card
 * Designed specifically for classroom smartboards and tablet touchscreens:
 * - Rounded gold-foil framed border
 * - Full card artwork window (no header numbers, no grip dots, no arrow buttons)
 * - Clear embossed title banner
 * - Frosted scientific lore/explanation plate
 * - 60 FPS hardware accelerated pointer dragging
 */
export const TgcSequenceCard: React.FC<TgcSequenceCardProps> = ({
  item,
  isDragging = false,
  isSelected = false,
  isCorrectPosition,
  isWrongPosition,
  theme = 'emerald',
  className = '',
  style = {},
  onPointerDown,
  onClick,
}) => {
  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      style={style}
      className={`group relative flex flex-col justify-between w-full h-full rounded-3xl bg-white border-2 select-none overflow-hidden transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'shadow-2xl ring-4 ring-emerald-400/80 scale-105 rotate-1 z-40 opacity-95'
          : isSelected
          ? 'shadow-xl ring-4 ring-amber-400 -translate-y-1 z-20 border-amber-400'
          : isCorrectPosition
          ? 'border-emerald-500 shadow-lg shadow-emerald-200/50 ring-2 ring-emerald-400'
          : isWrongPosition
          ? 'border-rose-400 shadow-md shadow-rose-200/50 ring-2 ring-rose-300'
          : 'border-slate-200/90 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1'
      } ${className}`}
    >
      {/* Metallic Card Border Inset / Foil Line */}
      <div className="absolute inset-1 rounded-[20px] border border-amber-300/30 pointer-events-none z-10" />

      {/* Top Foil Banner: Subject Badge & Status Icon */}
      <div className="relative z-20 flex items-center justify-between px-3 pt-2.5 pb-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/20 text-white shadow-2xs">
          <Sparkles size={11} className="text-amber-300" />
          <span className="text-[10px] font-black uppercase tracking-wider">
            {item.label}
          </span>
        </div>

        {/* Validation Result Stamp */}
        {isCorrectPosition && (
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-scaleUp">
            <CheckCircle2 size={16} />
          </div>
        )}
        {isWrongPosition && (
          <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md animate-scaleUp">
            <AlertCircle size={16} />
          </div>
        )}
      </div>

      {/* Main Full-Card Artwork Window (50% Card Height) */}
      <div className="relative flex-1 min-h-[110px] sm:min-h-[140px] w-full mx-auto overflow-hidden rounded-2xl mx-1.5 border border-slate-200/60 shadow-inner">
        <TgcCardArtwork item={item} theme={theme} />
        {/* Card Holographic Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 pointer-events-none" />
      </div>

      {/* Card Lore / Explanation Box (Frosted Card Plate) */}
      <div className="relative z-20 p-2.5 sm:p-3 mt-1.5 bg-slate-50/95 backdrop-blur-xs border-t border-slate-100 flex flex-col justify-between rounded-b-[22px]">
        <h4 className="font-black text-xs sm:text-sm text-slate-900 leading-snug tracking-tight mb-1">
          {item.label}
        </h4>
        {item.description ? (
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
            {item.description}
          </p>
        ) : (
          <p className="text-[11px] text-slate-400 italic">
            Tahapan proses ilmiah dalam rangkaian materi.
          </p>
        )}
      </div>
    </div>
  );
};
