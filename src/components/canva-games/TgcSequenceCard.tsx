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

  // ── ASTRONOMI & TATA SURYA: 8 PLANET CARD ARTWORK ───────────

  // Merkurius (p1)
  if (id === 'p1' || label.includes('merkurius')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#070a14" />
        <defs>
          <radialGradient id="sunCoronaMerk" cx="30%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mercuryGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
        </defs>
        {/* Blazing Sun Corona on left edge */}
        <circle cx="-30" cy="65" r="70" fill="url(#sunCoronaMerk)" opacity="0.8" />
        {/* Mercury Globe */}
        <circle cx="115" cy="65" r="32" fill="url(#mercuryGrad)" stroke="#cbd5e1" strokeWidth="1" />
        {/* Craters */}
        <circle cx="105" cy="55" r="5" fill="#334155" opacity="0.6" />
        <circle cx="125" cy="72" r="7" fill="#334155" opacity="0.7" />
        <circle cx="110" cy="80" r="3.5" fill="#334155" opacity="0.5" />
        <circle cx="130" cy="50" r="4" fill="#334155" opacity="0.5" />
      </svg>
    );
  }

  // Venus (p2)
  if (id === 'p2' || label.includes('venus')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#090614" />
        <defs>
          <radialGradient id="venusGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
        </defs>
        {/* Venus Globe */}
        <circle cx="100" cy="65" r="36" fill="url(#venusGrad)" stroke="#fef08a" strokeWidth="1" />
        {/* Dense Swirling Clouds */}
        <path d="M68 55 Q100 48 132 58" stroke="#fde047" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
        <path d="M66 70 Q100 78 134 68" stroke="#d97706" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
        <path d="M72 82 Q100 86 128 80" stroke="#92400e" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Bumi (p3)
  if (id === 'p3' || label.includes('bumi')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#030712" />
        <defs>
          <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="90%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>
        </defs>
        {/* Atmospheric Glow */}
        <circle cx="100" cy="65" r="41" fill="#38bdf8" opacity="0.2" />
        {/* Ocean Globe */}
        <circle cx="100" cy="65" r="37" fill="url(#earthGrad)" stroke="#7dd3fc" strokeWidth="1.2" />
        {/* Continents */}
        <path d="M80 50 Q92 46 98 56 Q94 66 84 64 Z" fill="#22c55e" opacity="0.85" />
        <path d="M102 58 Q118 52 126 62 Q120 74 106 72 Z" fill="#16a34a" opacity="0.85" />
        <path d="M92 78 Q106 72 110 84 Q100 92 88 86 Z" fill="#15803d" opacity="0.85" />
        {/* Cloud Streaks */}
        <path d="M72 58 Q95 64 128 54" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
        <path d="M80 72 Q105 66 124 76" stroke="#ffffff" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      </svg>
    );
  }

  // Mars (p4)
  if (id === 'p4' || label.includes('mars')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#0a0508" />
        <defs>
          <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="85%" stopColor="#9f1239" />
            <stop offset="100%" stopColor="#4c0519" />
          </radialGradient>
        </defs>
        {/* Red Globe */}
        <circle cx="100" cy="65" r="33" fill="url(#marsGrad)" stroke="#f43f5e" strokeWidth="1" />
        {/* Polar Ice Cap */}
        <ellipse cx="100" cy="36" rx="9" ry="3.5" fill="#f8fafc" opacity="0.85" />
        {/* Iron Dust Canyons & Dark Mare */}
        <path d="M80 62 Q100 58 120 64" stroke="#881337" strokeWidth="3" opacity="0.8" strokeLinecap="round" />
        <circle cx="95" cy="52" r="5" fill="#881337" opacity="0.7" />
        <path d="M85 75 Q105 82 115 72" stroke="#881337" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Jupiter (p5)
  if (id === 'p5' || label.includes('jupiter')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#080712" />
        <defs>
          <radialGradient id="jupGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="85%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </radialGradient>
        </defs>
        {/* Huge Globe */}
        <circle cx="100" cy="65" r="44" fill="url(#jupGrad)" stroke="#fdba74" strokeWidth="1.2" />
        {/* Gas Band Stripes */}
        <path d="M58 48 Q100 44 142 48" stroke="#9a3412" strokeWidth="3.5" opacity="0.75" />
        <path d="M56 58 Q100 62 144 58" stroke="#ffedd5" strokeWidth="2.5" opacity="0.7" />
        <path d="M57 72 Q100 68 143 72" stroke="#7c2d12" strokeWidth="4" opacity="0.8" />
        <path d="M60 84 Q100 80 140 84" stroke="#c2410c" strokeWidth="3" opacity="0.7" />
        {/* Great Red Spot */}
        <ellipse cx="120" cy="74" rx="7" ry="4.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
      </svg>
    );
  }

  // Saturnus (p6)
  if (id === 'p6' || label.includes('saturnus')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#060611" />
        <defs>
          <radialGradient id="satGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="60%" stopColor="#fcd34d" />
            <stop offset="90%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
        </defs>
        {/* Back Ring Half */}
        <ellipse
          cx="100"
          cy="65"
          rx="68"
          ry="20"
          stroke="#fef08a"
          strokeWidth="7"
          opacity="0.45"
          transform="rotate(-18 100 65)"
        />
        <ellipse
          cx="100"
          cy="65"
          rx="58"
          ry="16"
          stroke="#ca8a04"
          strokeWidth="4"
          opacity="0.65"
          transform="rotate(-18 100 65)"
        />
        {/* Gas Planet Body */}
        <circle cx="100" cy="65" r="32" fill="url(#satGrad)" stroke="#fef08a" strokeWidth="1" />
        {/* Front Ring Half */}
        <g transform="rotate(-18 100 65)">
          <path d="M32 65 A68 20 0 0 0 168 65" stroke="#fef08a" strokeWidth="7" fill="none" opacity="0.9" />
          <path d="M42 65 A58 16 0 0 0 158 65" stroke="#ca8a04" strokeWidth="4" fill="none" opacity="0.8" />
        </g>
      </svg>
    );
  }

  // Uranus (p7)
  if (id === 'p7' || label.includes('uranus')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#050a12" />
        <defs>
          <radialGradient id="uraGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="85%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#164e63" />
          </radialGradient>
        </defs>
        {/* Vertical Tilted Ring */}
        <ellipse cx="100" cy="65" rx="14" ry="48" stroke="#67e8f9" strokeWidth="2.5" opacity="0.5" fill="none" />
        {/* Ice Giant Body */}
        <circle cx="100" cy="65" r="34" fill="url(#uraGrad)" stroke="#cffafe" strokeWidth="1" />
        <ellipse cx="100" cy="65" rx="14" ry="48" stroke="#cffafe" strokeWidth="1.5" opacity="0.75" fill="none" strokeDasharray="30 40" />
      </svg>
    );
  }

  // Neptunus (p8)
  if (id === 'p8' || label.includes('neptunus')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#040614" />
        <defs>
          <radialGradient id="nepGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="85%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#172554" />
          </radialGradient>
        </defs>
        {/* Blue Deep Ice Giant */}
        <circle cx="100" cy="65" r="34" fill="url(#nepGrad)" stroke="#93c5fd" strokeWidth="1" />
        {/* Supersonic White Cloud Streaks */}
        <path d="M74 54 Q100 48 126 56" stroke="#ffffff" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
        <path d="M78 72 Q102 78 124 70" stroke="#bae6fd" strokeWidth="1.8" opacity="0.7" strokeLinecap="round" />
        {/* Great Dark Spot */}
        <ellipse cx="88" cy="62" rx="5" ry="3.5" fill="#0f172a" opacity="0.8" />
      </svg>
    );
  }

  // ── GERHANA MATAHARI SEQUENCE ARTWORK ───────────────────────

  // Matahari (gm1)
  if (id === 'gm1' || label.includes('matahari')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#080310" />
        <defs>
          <radialGradient id="solCorona" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Outer Radiant Flare Corona */}
        <circle cx="100" cy="65" r="54" fill="url(#solCorona)" opacity="0.9" />
        {/* Blazing Center Sphere */}
        <circle cx="100" cy="65" r="28" fill="#fef08a" stroke="#ffffff" strokeWidth="2" />
        {/* Solar Flare Rays */}
        <g stroke="#fde047" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <line x1="100" y1="20" x2="100" y2="8" />
          <line x1="100" y1="110" x2="100" y2="122" />
          <line x1="55" y1="65" x2="43" y2="65" />
          <line x1="145" y1="65" x2="157" y2="65" />
          <line x1="68" y1="33" x2="60" y2="25" />
          <line x1="132" y1="97" x2="140" y2="105" />
          <line x1="68" y1="97" x2="60" y2="105" />
          <line x1="132" y1="33" x2="140" y2="25" />
        </g>
      </svg>
    );
  }

  // Bulan (gm2)
  if (id === 'gm2' || label.includes('bulan')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#04040d" />
        <defs>
          <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
        </defs>
        {/* Moon Globe with Craters */}
        <circle cx="100" cy="65" r="32" fill="url(#moonGrad)" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="92" cy="56" r="6" fill="#475569" opacity="0.5" />
        <circle cx="112" cy="70" r="7" fill="#475569" opacity="0.6" />
        <circle cx="96" cy="76" r="4" fill="#475569" opacity="0.5" />
        <circle cx="110" cy="52" r="3.5" fill="#475569" opacity="0.4" />
        {/* Projecting Shadow Cone */}
        <polygon points="132,65 200,45 200,85" fill="#0f172a" opacity="0.75" />
      </svg>
    );
  }

  // Bumi / Umbra (gm3)
  if (id === 'gm3' || label.includes('umbra') || label.includes('bumi (daerah umbra)')) {
    return (
      <svg viewBox="0 0 200 130" className="w-full h-full object-cover" fill="none">
        <rect width="200" height="130" fill="#020308" />
        <defs>
          <radialGradient id="diamondRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Solar Corona Glowing Behind Moon */}
        <circle cx="100" cy="65" r="48" fill="url(#diamondRing)" />
        {/* Pitch Black Moon Disk Covering Sun */}
        <circle cx="100" cy="65" r="32" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Diamond Ring Flare Flash */}
        <circle cx="124" cy="46" r="7" fill="#ffffff" />
        <path d="M124 34 L124 58 M112 46 L136 46" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 5. Universal Elemental TCG Artwork Fallback for Other Decks
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
  const isPurple = theme === 'purple';

  return (
    <div
      onPointerDown={onPointerDown}
      onClick={onClick}
      style={style}
      className={`group relative flex flex-col justify-between w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 border-2 select-none overflow-hidden transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'shadow-[0_24px_50px_rgba(0,0,0,0.85)] ring-4 ring-amber-400 scale-105 rotate-1 z-50 border-amber-300 opacity-98'
          : isSelected
          ? 'shadow-[0_0_24px_rgba(251,191,36,0.6)] ring-4 ring-amber-400 -translate-y-1 z-20 border-amber-300'
          : isCorrectPosition
          ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/80'
          : isWrongPosition
          ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)] ring-2 ring-rose-400/80'
          : isPurple
          ? 'border-purple-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:-translate-y-1'
          : 'border-emerald-500/40 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:-translate-y-1'
      } ${className}`}
    >
      {/* Metallic Card Border Inset / Foil Line */}
      <div className="absolute inset-1 rounded-[18px] sm:rounded-[22px] border border-amber-300/30 pointer-events-none z-10" />

      {/* Top Foil Banner: Subject Badge & Status Icon */}
      <div className="relative z-20 flex items-center justify-between px-2.5 sm:px-3 pt-2 sm:pt-2.5 pb-1">
        <div
          className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full ${
            isPurple
              ? 'bg-purple-950/85 border border-cyan-400/50 text-cyan-200'
              : 'bg-slate-950/85 border border-amber-400/50 text-amber-200'
          } backdrop-blur-md shadow-sm`}
        >
          <Sparkles size={11} className={isPurple ? 'text-cyan-300' : 'text-amber-300'} />
          <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider truncate max-w-[110px]">
            {item.label}
          </span>
        </div>

        {/* Validation Result Stamp */}
        {isCorrectPosition && (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md animate-scaleUp">
            <CheckCircle2 size={15} />
          </div>
        )}
        {isWrongPosition && (
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md animate-scaleUp">
            <AlertCircle size={15} />
          </div>
        )}
      </div>

      {/* Main Full-Card Artwork Window */}
      <div className="relative flex-1 min-h-[90px] sm:min-h-[120px] w-[calc(100%-12px)] mx-auto overflow-hidden rounded-xl sm:rounded-2xl border border-slate-700/60 shadow-inner bg-slate-950">
        <TgcCardArtwork item={item} theme={theme} />
        {/* Card Holographic Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
      </div>

      {/* Card Lore / Explanation Box (Frosted Dark Card Plate) */}
      <div className="relative z-20 p-2 sm:p-2.5 mt-1 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-900/90 border-t border-amber-400/20 flex flex-col justify-between rounded-b-[18px] sm:rounded-b-[22px]">
        <h4 className="font-black text-xs sm:text-[13px] text-amber-200 leading-snug tracking-tight mb-0.5 truncate">
          {item.label}
        </h4>
        {item.description ? (
          <p className="text-[10px] sm:text-[11.5px] text-amber-50/90 leading-tight sm:leading-relaxed font-medium line-clamp-2 sm:line-clamp-3">
            {item.description}
          </p>
        ) : (
          <p className="text-[10px] text-amber-200/50 italic">
            Tahapan proses ilmiah dalam rangkaian materi.
          </p>
        )}
      </div>
    </div>
  );
};
