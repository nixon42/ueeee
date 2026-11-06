import React from 'react';
import { HumanitiesSvgProps } from '@/types/presentation';

/**
 * 5. Aksara & Sastra Indonesia Illustration (800x500)
 * Designed for teka-teki-kata presentation deck:
 * Displays vintage manuscript scroll, Balai Pustaka seal, Pantun 4-seuntai structure,
 * and EYD V morphology & word origin taxonomy.
 */
export const AksaraSastraBahasaIllustration: React.FC<HumanitiesSvgProps> = ({
  className = '',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className={`w-full overflow-hidden bg-slate-950 rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 800 500"
        width={width}
        height={height}
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sastraBgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="manuscriptPaper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <linearGradient id="sealGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="inkWellGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Ambient Cosmic/Academic Background */}
        <rect width="800" height="500" fill="url(#sastraBgGrad)" />

        {/* TOP HEADER */}
        <g transform="translate(30, 25)">
          <rect width="740" height="42" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="1.2" opacity="0.9" />
          <circle cx="24" cy="21" r="10" fill="#6366f1" />
          <text x="24" y="25" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">📖</text>
          <text x="44" y="26" fill="#e0e7ff" fontSize="13" fontWeight="900" letterSpacing="0.5">
            BAHASA &amp; KHAZANAH SASTRA NUSANTARA • AKAR KATA, PANTUN &amp; EYD V
          </text>
          <rect x="635" y="10" width="95" height="22" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="0.8" />
          <text x="682" y="24" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold">KBBI / PUEBI</text>
        </g>

        {/* LEFT PANEL: VINTAGE MANUSCRIPT SCROLL & AKSARA */}
        <g transform="translate(30, 80)">
          {/* Scroll Outer Drop Shadow */}
          <rect x="4" y="4" width="365" height="360" rx="18" fill="#020617" opacity="0.6" />
          {/* Scroll Parchment Body */}
          <rect width="365" height="360" rx="16" fill="url(#manuscriptPaper)" stroke="#d97706" strokeWidth="2" />
          
          {/* Scroll Header Trim */}
          <path d="M 0 35 Q 182 15 365 35 L 365 0 L 0 0 Z" fill="#b45309" opacity="0.25" />
          <text x="182" y="28" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="black" letterSpacing="1">
            📜 MANUSKRIP SASTRA NUSANTARA
          </text>

          {/* Decorative Calligraphy / Aksara Motif */}
          <g transform="translate(25, 45)">
            <rect width="315" height="45" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
            <text x="157" y="28" textAnchor="middle" fill="#92400e" fontSize="16" fontFamily="serif" fontWeight="bold">
              ꦲꦤꦕꦫꦏ • ᮃᮊ᮪ᮞᮛ • ᨕᨀᨔᨑ
            </text>
            <text x="157" y="40" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold">
              Kekayaan Aksara Tradisional Nusantara (Jawa, Sunda, Lontara)
            </text>
          </g>

          {/* Classic Pantun Display on Scroll */}
          <g transform="translate(25, 105)">
            <rect width="315" height="150" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="0" y="0" width="315" height="24" rx="8" fill="#fef3c7" />
            <text x="12" y="16" fill="#92400e" fontSize="10" fontWeight="bold">
              Bait Pantun Klasik (Rima Silang a-b-a-b):
            </text>

            {/* Line 1 (Sampiran a) */}
            <circle cx="20" cy="45" r="7" fill="#6366f1" />
            <text x="20" y="48.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">1</text>
            <text x="35" y="48" fill="#1e293b" fontSize="10.5" fontFamily="serif" fontStyle="italic">
              Pohon kelapa tumbuh berjajar, <tspan fill="#6366f1" fontWeight="bold">(...-jar / a)</tspan>
            </text>

            {/* Line 2 (Sampiran b) */}
            <circle cx="20" cy="72" r="7" fill="#ec4899" />
            <text x="20" y="75.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">2</text>
            <text x="35" y="75" fill="#1e293b" fontSize="10.5" fontFamily="serif" fontStyle="italic">
              Tempat berteduh burung merpati; <tspan fill="#ec4899" fontWeight="bold">(...-ti / b)</tspan>
            </text>

            {/* Line 3 (Isi a) */}
            <circle cx="20" cy="99" r="7" fill="#6366f1" />
            <text x="20" y="102.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">3</text>
            <text x="35" y="102" fill="#0f172a" fontSize="10.5" fontFamily="serif" fontWeight="bold">
              Sejak kecil rajin belajar, <tspan fill="#6366f1" fontWeight="bold">(...-jar / a)</tspan>
            </text>

            {/* Line 4 (Isi b) */}
            <circle cx="20" cy="126" r="7" fill="#ec4899" />
            <text x="20" y="129.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">4</text>
            <text x="35" y="129" fill="#0f172a" fontSize="10.5" fontFamily="serif" fontWeight="bold">
              Sudah besar senanglah hati. <tspan fill="#ec4899" fontWeight="bold">(...-ti / b)</tspan>
            </text>
          </g>

          {/* Balai Pustaka Seal & Merah-Putih Ribbon */}
          <g transform="translate(30, 275)">
            {/* Merah Putih Ribbon */}
            <rect x="0" y="20" width="80" height="10" fill="#dc2626" rx="2" />
            <rect x="0" y="30" width="80" height="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" rx="2" />
            
            {/* Gold Seal Medallion */}
            <circle cx="115" cy="35" r="28" fill="url(#sealGold)" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="115" cy="35" r="23" fill="none" stroke="#fef3c7" strokeWidth="1" strokeDasharray="3,2" />
            <text x="115" y="32" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="black">BALAI</text>
            <text x="115" y="42" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="black">PUSTAKA</text>

            {/* Feather Quill & Inkwell */}
            <g transform="translate(170, 10)">
              {/* Inkwell */}
              <rect x="95" y="25" width="30" height="25" rx="5" fill="url(#inkWellGrad)" stroke="#475569" strokeWidth="1" />
              <rect x="100" y="20" width="20" height="5" rx="2" fill="#94a3b8" />
              <circle cx="110" cy="22" r="3" fill="#020617" />
              {/* Feather Quill */}
              <path d="M 110 22 C 80 -10, 40 5, 20 -15 C 35 15, 65 15, 110 22 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <line x1="20" y1="-15" x2="110" y2="22" stroke="#64748b" strokeWidth="1" />
            </g>
          </g>
        </g>

        {/* RIGHT PANEL: ANATOMI STRUKTUR & MORFOLOGI EYD V */}
        <g transform="translate(420, 80)">
          {/* Top Card: Kaidah & Struktur Pantun */}
          <g>
            <rect width="350" height="165" rx="14" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" opacity="0.95" />
            <rect x="0" y="0" width="350" height="32" rx="14" fill="#312e81" />
            <text x="16" y="21" fill="#c7d2fe" fontSize="11" fontWeight="bold">
              ANATOMI CIRI-CIRI PANTUN RESMI
            </text>

            <g transform="translate(16, 42)">
              <rect x="0" y="0" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#38bdf8" fontSize="9" fontWeight="bold">1. Jumlah Baris:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold">Tepat 4 Baris / Bait</text>

              <rect x="165" y="0" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#a7f3d0" fontSize="9" fontWeight="bold" transform="translate(165,0)">2. Suku Kata:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold" transform="translate(165,0)">8 – 12 Suku Kata</text>

              <rect x="0" y="58" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#f472b6" fontSize="9" fontWeight="bold">3. Skema Rima:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold">Bersajak a-b-a-b</text>

              <rect x="165" y="58" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#fbbf24" fontSize="9" fontWeight="bold" transform="translate(165,0)">4. Pembagian Isi:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold" transform="translate(165,0)">Baris 1-2 Sampiran, 3-4 Isi</text>
            </g>
          </g>

          {/* Bottom Card: Morfologi & Kosakata Serapan EYD V */}
          <g transform="translate(0, 180)">
            <rect width="350" height="180" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" opacity="0.95" />
            <rect x="0" y="0" width="350" height="32" rx="14" fill="#064e3b" />
            <text x="16" y="21" fill="#a7f3d0" fontSize="11" fontWeight="bold">
              MORFOLOGI &amp; KATA SERAPAN BAKU (EYD V)
            </text>

            <g transform="translate(16, 42)">
              {/* Category 1: Imbuhan / Afiksasi */}
              <rect x="0" y="0" width="318" height="36" rx="6" fill="#134e4a" stroke="#2dd4bf" strokeWidth="0.8" />
              <text x="10" y="16" fill="#5eead4" fontSize="8.5" fontWeight="bold">Imbuhan Pembentuk Nomina/Verba:</text>
              <text x="10" y="28" fill="#ffffff" fontSize="9" fontFamily="monospace">
                meN- + tulis → menulis • peN- + didik → pendidik
              </text>

              {/* Category 2: Serapan Sanskerta & Arab */}
              <rect x="0" y="44" width="318" height="36" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              <text x="10" y="16" fill="#fde047" fontSize="8.5" fontWeight="bold">Serapan Sanskerta &amp; Arab:</text>
              <text x="10" y="28" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                Baskara (Surya), Pancasila • Ikhlas, Musyawarah, Takzim
              </text>

              {/* Category 3: Serapan Belanda & Inggris (Sains Modern) */}
              <rect x="0" y="88" width="318" height="36" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              <text x="10" y="16" fill="#93c5fd" fontSize="8.5" fontWeight="bold">Serapan Eropa / Sains Baku:</text>
              <text x="10" y="28" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                Klorofil (Chlorophyll) • Hipotesis (Hypothesis) • Ekosistem
              </text>
            </g>
          </g>
        </g>

        {/* BOTTOM FOOTER HUD */}
        <g transform="translate(30, 455)">
          <rect width="740" height="28" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#a5b4fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
            LITERASI SASTRA • KOSAKATA BAKU, RIMBA PANTUN KLASIK, &amp; TATA BAHASA INDONESIA BAKU
          </text>
        </g>
      </svg>
    </div>
  );
};

export { AksaraSastraBahasaIllustration as SastraPantunKataIllustration };
