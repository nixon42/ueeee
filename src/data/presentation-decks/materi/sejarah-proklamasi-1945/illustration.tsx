import React from 'react';
import { HumanitiesSvgProps } from '@/types/presentation';

/**
 * 3. PROKLAMASI KEMERDEKAAN 1945 SVG
 * Historic Pegangsaan Timur 56 porch, vintage standing mic, Sang Saka Merah Putih, and dual Naskah
 */
export const Proklamasi1945Illustration: React.FC<HumanitiesSvgProps> = ({
  className = '',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="proklamasiSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="40%" stopColor="#991b1b" />
            <stop offset="80%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="flagRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <radialGradient id="sunDawn" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* HEROIC MORNING SKY (Fajar 17 Agustus 1945) */}
        <rect width="800" height="500" fill="url(#proklamasiSky)" />
        <circle cx="280" cy="140" r="160" fill="url(#sunDawn)" />

        {/* HISTORIC VERANDA OF PEGANGSAAN TIMUR 56 */}
        <g transform="translate(60, 140)">
          {/* Colonial Veranda Roof & Eaves */}
          <polygon points="0,60 380,60 360,20 20,20" fill="#475569" stroke="#64748b" strokeWidth="2" />
          {/* White Tuscan Columns */}
          <rect x="40" y="60" width="22" height="190" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="180" y="60" width="22" height="190" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="320" y="60" width="22" height="190" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Floor & Steps */}
          <rect x="0" y="240" width="380" height="18" fill="#334155" stroke="#475569" strokeWidth="2" />
          <rect x="-20" y="258" width="420" height="14" fill="#1e293b" />
        </g>

        {/* HISTORIC SHURE STANDING MICROPHONE (Mikrofon Bersejarah) */}
        <g transform="translate(240, 240)">
          {/* Tripod Stand */}
          <line x1="0" y1="120" x2="-25" y2="155" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="0" y1="120" x2="25" y2="155" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="0" y1="120" x2="0" y2="155" stroke="#cbd5e1" strokeWidth="3" />
          {/* Vertical Rod */}
          <line x1="0" y1="0" x2="0" y2="120" stroke="#cbd5e1" strokeWidth="4" />
          {/* Microphone Head (Vintage Bullet/Octagon) */}
          <circle cx="0" cy="-6" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
          <line x1="-8" y1="-6" x2="8" y2="-6" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="0" y1="-14" x2="0" y2="2" stroke="#94a3b8" strokeWidth="1.5" />
        </g>
        <text x="240" y="215" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          🎙️ Mikrofon 17 Agustus 1945
        </text>

        {/* BAMBOO FLAGPOLE & FLUTTERING SANG SAKA MERAH PUTIH */}
        <g transform="translate(370, 70)">
          {/* Bamboo Pole Segments */}
          <line x1="0" y1="0" x2="0" y2="330" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
          {[50, 110, 170, 230, 290].map((by, i) => (
            <line key={`node-${i}`} x1="-4" y1={by} x2="4" y2={by} stroke="#b45309" strokeWidth="2" />
          ))}

          {/* The Flag: Sang Saka Merah Putih (Jahitan Tangan Ibu Fatmawati) */}
          <g transform="translate(0, 20)">
            {/* Red Half with Wind Ripples */}
            <path
              d="M0 0 C40 -6 80 6 120 0 C140 -4 150 4 150 35 C110 40 70 30 0 35 Z"
              fill="url(#flagRed)"
              stroke="#b91c1c"
              strokeWidth="1.2"
            />
            {/* White Half with Wind Ripples */}
            <path
              d="M0 35 C70 30 110 40 150 35 C150 65 140 75 120 70 C80 76 40 64 0 70 Z"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
          </g>
        </g>
        <text x="450" y="80" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
          🇮🇩 SANG SAKA MERAH PUTIH
        </text>

        {/* SIDE-BY-SIDE DUAL DOCUMENTS (Naskah Klad vs Naskah Otentik) */}
        {/* Document 1: Naskah Klad (Handwritten by Soekarno) */}
        <g transform="translate(540, 60)">
          <rect width="220" height="155" rx="10" fill="#fef3c7" stroke="#b45309" strokeWidth="2" opacity="0.95" />
          <text x="14" y="22" fill="#78350f" fontSize="10" fontWeight="black" fontFamily="serif">
            NASKAH KLAD (TULISAN TANGAN)
          </text>
          <text x="14" y="34" fill="#92400e" fontSize="7" fontStyle="italic">Ditulis oleh Ir. Soekarno di Rumah Maeda</text>

          {/* Cursive Mockup Script */}
          <g stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
            <line x1="14" y1="52" x2="190" y2="52" />
            <line x1="14" y1="68" x2="200" y2="68" />
            <line x1="14" y1="84" x2="180" y2="84" />
            <line x1="14" y1="100" x2="195" y2="100" />
          </g>
          <text x="14" y="125" fill="#78350f" fontSize="8" fontFamily="serif">
            &quot;Djakarta, 17 - 8 - &apos;05&quot;
          </text>
          <text x="14" y="142" fill="#92400e" fontSize="7" fontWeight="bold">
            Diselamatkan BM Diah dari keranjang sampah
          </text>
        </g>

        {/* Document 2: Naskah Otentik (Typewritten by Sayuti Melik) */}
        <g transform="translate(540, 230)">
          <rect width="220" height="155" rx="10" fill="#ffffff" stroke="#dc2626" strokeWidth="2" opacity="0.98" />
          <text x="14" y="22" fill="#991b1b" fontSize="10" fontWeight="black" fontFamily="monospace">
            NASKAH OTENTIK (KETIKAN)
          </text>
          <text x="14" y="34" fill="#475569" fontSize="7">Diketuk oleh Sayuti Melik dengan Mesin Tik</text>

          <g fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="bold">
            <text x="14" y="55">P R O K L A M A S I</text>
            <text x="14" y="70" fontSize="7">Kami bangsa Indonesia dengan ini</text>
            <text x="14" y="82" fontSize="7">menjatakan kemerdekaan Indonesia.</text>
            <text x="14" y="96" fontSize="7">Hal² jang mengenai pemindahan</text>
            <text x="14" y="108" fontSize="7">kekoeasaan d.l.l., diselenggarakan</text>
            <text x="14" y="120" fontSize="7">dengan tjara saksama &amp; dlm tempo...</text>
          </g>
          <text x="14" y="142" fill="#dc2626" fontSize="7" fontWeight="black" fontFamily="monospace">
            &quot;Djakarta, hari 17 boelan 8 tahoen &apos;05&quot;
          </text>
        </g>

        {/* 5-STEP TIMELINE RIBBON (Bottom Left to Right) */}
        <g transform="translate(40, 395)">
          <rect width="470" height="45" rx="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" opacity="0.9" />
          <line x1="30" y1="22" x2="440" y2="22" stroke="#dc2626" strokeWidth="3" />
          {[
            { date: '14 Agt', label: 'Jepang Kalah' },
            { date: '16 Agt 04:00', label: 'Rengasdengklok' },
            { date: '16 Agt Malam', label: 'Rumah Maeda' },
            { date: '17 Agt Pagi', label: 'Sayuti Melik' },
            { date: '17 Agt 10:00', label: 'Proklamasi' },
          ].map((t, idx) => {
            const tx = 30 + idx * 102;
            return (
              <g key={`timeline-${idx}`} transform={`translate(${tx}, 22)`}>
                <circle cx="0" cy="0" r="6" fill="#facc15" stroke="#b45309" strokeWidth="2" />
                <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                  {t.date}
                </text>
                <text x="0" y="16" textAnchor="middle" fill="#cbd5e1" fontSize="6.5">
                  {t.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="520" height="28" rx="8" fill="#0f172a" stroke="#dc2626" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">
            LINIMASA REVOLUSI 1945 • DETIK-DETIK PROKLAMASI KEMERDEKAAN REPUBLIK INDONESIA
          </text>
        </g>
      </svg>
    </div>
  );
};


export { Proklamasi1945Illustration as SejarahProklamasiIllustration };
