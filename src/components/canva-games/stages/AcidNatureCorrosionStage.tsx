import React, { useState, useEffect } from 'react';
import { Atom, Zap, AlertTriangle, ShieldAlert, Sparkles, RefreshCw, Flame } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface AcidNatureCorrosionStageProps {
  activePhase: number;
  onSelectPhase: (idx: number) => void;
  isPlaying?: boolean;
  className?: string;
  slideId?: string;
}

export const AcidNatureCorrosionStage: React.FC<AcidNatureCorrosionStageProps> = ({
  activePhase,
  onSelectPhase,
  isPlaying = false,
  className = '',
}) => {
  // Mode selection sync with parent cards:
  // 0 = Hakikat Asam (Ion H+)
  // 1 = Asam Kuat vs Lemah (Uji Konduktivitas Lampu)
  // 2 = Bahaya Korosi & Hujan Asam
  const currentMode = Math.min(2, Math.max(0, activePhase));

  // Sub-states for interactive demonstrations
  const [isDissociated, setIsDissociated] = useState<boolean>(true);
  const [acidStrengthType, setAcidStrengthType] = useState<'kuat' | 'lemah'>('kuat');
  const [corrosionTarget, setCorrosionTarget] = useState<'paku' | 'candi'>('paku');

  // Autoplay toggle animations when isPlaying is active
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (currentMode === 0) {
        setIsDissociated((prev) => !prev);
      } else if (currentMode === 1) {
        setAcidStrengthType((prev) => (prev === 'kuat' ? 'lemah' : 'kuat'));
      } else if (currentMode === 2) {
        setCorrosionTarget((prev) => (prev === 'paku' ? 'candi' : 'paku'));
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, currentMode]);

  // Sync mode changes with sound
  const handleSelectMode = (idx: number) => {
    sound.playClick();
    onSelectPhase(idx);
  };

  // Toggle molecular dissociation
  const handleToggleDissociation = () => {
    sound.playClick();
    setIsDissociated((prev) => !prev);
  };

  // Toggle acid strength
  const handleSelectStrength = (type: 'kuat' | 'lemah') => {
    sound.playClick();
    setAcidStrengthType(type);
  };

  // Toggle corrosion specimen
  const handleSelectCorrosion = (target: 'paku' | 'candi') => {
    sound.playClick();
    setCorrosionTarget(target);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 select-none overflow-hidden rounded-2xl border border-teal-500/30 ${className}`}
    >
      {/* ── TOP HUD HEADER: ACTIVE MODE SWITCHER ────────────── */}
      <div className="flex items-center justify-between gap-2 shrink-0 z-10 pb-1.5 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-md ${
              currentMode === 0
                ? 'bg-rose-500/20 border border-rose-500 text-rose-400'
                : currentMode === 1
                ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                : 'bg-red-500/20 border border-red-500 text-red-400'
            }`}
          >
            {currentMode === 0 ? <Atom size={16} /> : currentMode === 1 ? <Zap size={16} /> : <AlertTriangle size={16} />}
          </div>
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-black text-white truncate">
              {currentMode === 0 && 'Laboratorium Hakikat Ion H⁺'}
              {currentMode === 1 && 'Uji Konduktivitas: Kuat vs Lemah'}
              {currentMode === 2 && 'Simulasi Korosi Logam & Hujan Asam'}
            </div>
            <p className="text-[10px] text-slate-300 truncate">
              {currentMode === 0 && 'Amati pemecahan molekul asam dan pelepasan ion Hidrogen di air'}
              {currentMode === 1 && 'Bandingkan densitas ion bebas dan terang redupnya lampu sirkuit'}
              {currentMode === 2 && 'Efek pekat asam pada logam paku besi dan batu kapur candi'}
            </p>
          </div>
        </div>

        {/* 3 Interactive Mode Pill Buttons */}
        <div className="flex items-center gap-1 shrink-0 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => handleSelectMode(0)}
            className={`px-2 py-1 rounded-md text-[9.5px] font-black transition-all ${
              currentMode === 0
                ? 'bg-rose-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Ion H⁺
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode(1)}
            className={`px-2 py-1 rounded-md text-[9.5px] font-black transition-all ${
              currentMode === 1
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Kuat vs Lemah
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode(2)}
            className={`px-2 py-1 rounded-md text-[9.5px] font-black transition-all ${
              currentMode === 2
                ? 'bg-red-500 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Bahaya Korosi
          </button>
        </div>
      </div>

      {/* ── CENTER ARENA: SPECIALIZED INTERACTIVE VISUALS ────── */}
      <div className="flex-1 min-h-0 py-1.5 flex flex-col justify-center items-center z-10 overflow-hidden">
        {/* ======================================================== */}
        {/* MODE 0: MOLECULAR DISSOCIATION OF ACID IN WATER          */}
        {/* ======================================================== */}
        {currentMode === 0 && (
          <div className="w-full h-full flex flex-col justify-between gap-1.5 animate-in fade-in duration-300">
            {/* Molecular Simulation Canvas */}
            <div className="flex-1 min-h-0 bg-slate-950/80 rounded-xl border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 460 210" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-[190px]">
                <defs>
                  <style>{`
                    @keyframes floatIon {
                      0%, 100% { transform: translate(0px, 0px); }
                      50% { transform: translate(6px, -8px); }
                    }
                    @keyframes pulseHydronium {
                      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(239,68,68,0.5)); }
                      50% { transform: scale(1.06); filter: drop-shadow(0 0 14px rgba(239,68,68,0.9)); }
                    }
                    .anim-ion-float-1 { animation: floatIon 3.2s ease-in-out infinite; }
                    .anim-ion-float-2 { animation: floatIon 4.1s ease-in-out infinite 0.7s; }
                    .anim-ion-float-3 { animation: floatIon 3.6s ease-in-out infinite 1.4s; }
                    .anim-hydronium { animation: pulseHydronium 2.5s ease-in-out infinite; transform-origin: center; }
                  `}</style>

                  <linearGradient id="beakerSolGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.55" />
                  </linearGradient>

                  <radialGradient id="hIonGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="70%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </radialGradient>
                </defs>

                {/* Beaker Outline */}
                <rect x="50" y="20" width="360" height="175" rx="16" fill="url(#beakerSolGrad)" stroke="#475569" strokeWidth="2.5" />
                <path d="M 52 50 Q 230 54 408 50 L 408 180 Q 408 193 394 193 L 66 193 Q 52 193 52 180 Z" fill="#ef4444" fillOpacity="0.2" />

                {/* Water Molecules in Background */}
                <g opacity="0.35" fill="#38bdf8">
                  <circle cx="95" cy="80" r="7" />
                  <circle cx="88" cy="74" r="4.5" />
                  <circle cx="102" cy="74" r="4.5" />

                  <circle cx="370" cy="140" r="7" />
                  <circle cx="363" cy="134" r="4.5" />
                  <circle cx="377" cy="134" r="4.5" />

                  <circle cx="110" cy="160" r="7" />
                  <circle cx="103" cy="154" r="4.5" />
                  <circle cx="117" cy="154" r="4.5" />
                </g>

                {isDissociated ? (
                  /* STATE A: DISSOCIATED INTO H+ AND Cl- IONS */
                  <g>
                    {/* Free H+ Proton Ions (Glowing Red) */}
                    <g transform="translate(150, 100)" className="anim-ion-float-1 anim-hydronium">
                      <circle r="18" fill="url(#hIonGlow)" stroke="#fecaca" strokeWidth="2" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="13" fontWeight="900">
                        H⁺
                      </text>
                    </g>
                    <g transform="translate(230, 80)" className="anim-ion-float-2 anim-hydronium">
                      <circle r="16" fill="url(#hIonGlow)" stroke="#fecaca" strokeWidth="1.8" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11.5" fontWeight="900">
                        H⁺
                      </text>
                    </g>
                    <g transform="translate(310, 110)" className="anim-ion-float-3 anim-hydronium">
                      <circle r="18" fill="url(#hIonGlow)" stroke="#fecaca" strokeWidth="2" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="13" fontWeight="900">
                        H⁺
                      </text>
                    </g>
                    <g transform="translate(180, 155)" className="anim-ion-float-2 anim-hydronium">
                      <circle r="15" fill="url(#hIonGlow)" stroke="#fecaca" strokeWidth="1.8" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="900">
                        H⁺
                      </text>
                    </g>

                    {/* Companion Anions Cl- (Greenish/Cyan) */}
                    <g transform="translate(110, 115)" className="anim-ion-float-3">
                      <circle r="15" fill="#0d9488" stroke="#5eead4" strokeWidth="1.8" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="bold">
                        Cl⁻
                      </text>
                    </g>
                    <g transform="translate(270, 150)" className="anim-ion-float-1">
                      <circle r="15" fill="#0d9488" stroke="#5eead4" strokeWidth="1.8" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="bold">
                        Cl⁻
                      </text>
                    </g>
                    <g transform="translate(350, 75)" className="anim-ion-float-2">
                      <circle r="15" fill="#0d9488" stroke="#5eead4" strokeWidth="1.8" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="bold">
                        Cl⁻
                      </text>
                    </g>

                    {/* Chemical Equation Overlay */}
                    <rect x="110" y="30" width="240" height="26" rx="8" fill="#090d16" fillOpacity="0.9" stroke="#ef4444" strokeWidth="1.2" />
                    <text x="230" y="47" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      HCl + H₂O ➔ H₃O⁺ (H⁺ bebas) + Cl⁻
                    </text>
                  </g>
                ) : (
                  /* STATE B: UNDISSOCIATED GAS/MOLECULE */
                  <g>
                    <g transform="translate(230, 110)">
                      <rect x="-65" y="-22" width="130" height="44" rx="22" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="-30" cy="0" r="16" fill="#ef4444" />
                      <text x="-30" y="2" textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="bold">
                        H
                      </text>
                      <circle cx="25" cy="0" r="20" fill="#0d9488" />
                      <text x="25" y="2" textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="bold">
                        Cl
                      </text>
                    </g>
                    <rect x="100" y="30" width="260" height="26" rx="8" fill="#090d16" fillOpacity="0.9" stroke="#94a3b8" strokeWidth="1.2" />
                    <text x="230" y="47" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      Molekul HCl Belum Terionisasi (Netral)
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Badge in Beaker */}
              <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded-md bg-slate-950/85 border border-rose-500/50 text-[10px] text-rose-300 font-bold">
                {isDissociated ? '🔥 Ion H⁺ Aktif: Menimbulkan sifat masam & korosif' : '❄️ Molekul Utuh: Belum melepaskan ion H⁺'}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleToggleDissociation}
                className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] border border-rose-400 shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw size={11} className={isDissociated ? 'rotate-180 transition-transform' : ''} />
                <span>{isDissociated ? 'Gabungkan Molekul' : 'Larutkan & Uraikan H⁺'}</span>
              </button>
            </div>

            {/* Explanation Callout */}
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-2 flex items-start gap-2">
              <Atom size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div className="text-[10px] sm:text-[11px] text-rose-100 leading-snug">
                <span className="font-black text-rose-300">Hakikat Teori Arrhenius:</span> Asam adalah zat yang melepaskan{' '}
                <strong className="text-white bg-rose-600/60 px-1 rounded">ion H⁺ (proton)</strong> saat masuk ke dalam pelarut air.
                Bukan warna cairan atau wadahnya yang membuat asam, melainkan kehadiran dan densitas partikel ion H⁺ bebas ini!
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 1: STRONG ACID VS WEAK ACID CONDUCTIVITY TEST       */}
        {/* ======================================================== */}
        {currentMode === 1 && (
          <div className="w-full h-full flex flex-col justify-between gap-1.5 animate-in fade-in duration-300">
            {/* Top Selector Toggle */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectStrength('kuat')}
                className={`flex-1 py-1 px-2.5 rounded-lg font-black text-[10.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  acidStrengthType === 'kuat'
                    ? 'bg-rose-500 text-white ring-2 ring-rose-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Flame size={13} />
                <span>Asam Kuat: HCl Lambung / Aki H₂SO₄</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStrength('lemah')}
                className={`flex-1 py-1 px-2.5 rounded-lg font-black text-[10.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  acidStrengthType === 'lemah'
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Sparkles size={13} />
                <span>Asam Lemah: Cuka CH₃COOH / Jeruk</span>
              </button>
            </div>

            {/* Conductivity Apparatus Visual */}
            <div className="flex-1 min-h-0 bg-slate-950/80 rounded-xl border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 460 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-[180px]">
                <defs>
                  <style>{`
                    @keyframes bulbShine {
                      0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 16px #facc15); }
                      50% { opacity: 1; filter: drop-shadow(0 0 28px #fde047); }
                    }
                    @keyframes bulbDim {
                      0%, 100% { opacity: 0.35; filter: drop-shadow(0 0 4px #f59e0b); }
                      50% { opacity: 0.55; filter: drop-shadow(0 0 8px #f59e0b); }
                    }
                    .anim-bulb-strong { animation: bulbShine 1.8s ease-in-out infinite; }
                    .anim-bulb-weak { animation: bulbDim 2.4s ease-in-out infinite; }
                  `}</style>
                </defs>

                {/* Circuit Wires */}
                <path d="M 130 90 L 130 35 L 210 35" stroke="#94a3b8" strokeWidth="3" fill="none" />
                <path d="M 250 35 L 330 35 L 330 90" stroke="#94a3b8" strokeWidth="3" fill="none" />

                {/* Battery Unit in Center */}
                <rect x="210" y="23" width="40" height="24" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <rect x="247" y="30" width="5" height="10" rx="1" fill="#cbd5e1" />
                <text x="225" y="39" fill="#facc15" fontSize="10" fontWeight="bold">
                  9V
                </text>

                {/* Lightbulb Unit (Mounted on left wire) */}
                <g transform="translate(170, 35)">
                  {acidStrengthType === 'kuat' ? (
                    /* Bright Lightbulb for Strong Acid */
                    <g className="anim-bulb-strong">
                      <circle cx="0" cy="0" r="18" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
                      <circle cx="0" cy="0" r="28" fill="#fef08a" opacity="0.25" />
                      <path d="M -6 6 L -2 -4 L 2 4 L 6 -6" stroke="#ca8a04" strokeWidth="2" fill="none" />
                    </g>
                  ) : (
                    /* Dim Lightbulb for Weak Acid */
                    <g className="anim-bulb-weak">
                      <circle cx="0" cy="0" r="14" fill="#fbbf24" opacity="0.6" stroke="#d97706" strokeWidth="1.5" />
                      <path d="M -4 4 L -1 -3 L 1 3 L 4 -4" stroke="#78350f" strokeWidth="1.5" fill="none" />
                    </g>
                  )}
                </g>

                {/* Beaker Container */}
                <rect x="80" y="80" width="300" height="110" rx="12" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                <rect
                  x="82"
                  y="105"
                  width="296"
                  height="83"
                  rx="10"
                  fill={acidStrengthType === 'kuat' ? '#ef4444' : '#f59e0b'}
                  fillOpacity={acidStrengthType === 'kuat' ? '0.28' : '0.18'}
                />

                {/* Electrodes Dipping in Liquid */}
                <rect x="122" y="70" width="16" height="85" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />
                <rect x="322" y="70" width="16" height="85" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />

                {/* Ions in Solution */}
                {acidStrengthType === 'kuat' ? (
                  /* 100% Ionized: Dense swarm of H+ and Cl- */
                  <g>
                    {[
                      { x: 155, y: 130 },
                      { x: 190, y: 160 },
                      { x: 220, y: 125 },
                      { x: 255, y: 165 },
                      { x: 285, y: 130 },
                    ].map((pt, i) => (
                      <g key={`h-strong-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
                        <circle r="10" fill="#ef4444" stroke="#fecaca" strokeWidth="1.5" />
                        <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="8" fontWeight="bold">
                          H⁺
                        </text>
                      </g>
                    ))}
                    {[
                      { x: 170, y: 165 },
                      { x: 240, y: 145 },
                      { x: 270, y: 165 },
                      { x: 200, y: 130 },
                    ].map((pt, i) => (
                      <g key={`cl-strong-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
                        <circle r="9" fill="#0d9488" stroke="#5eead4" strokeWidth="1" />
                        <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="7.5" fontWeight="bold">
                          Cl⁻
                        </text>
                      </g>
                    ))}
                  </g>
                ) : (
                  /* ~1% Ionized: Mostly intact CH3COOH molecules, very few H+ */
                  <g>
                    {/* Rare H+ and Acetate */}
                    <g transform="translate(170, 140)">
                      <circle r="10" fill="#ef4444" stroke="#fecaca" strokeWidth="1.5" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="8" fontWeight="bold">
                        H⁺
                      </text>
                    </g>
                    <g transform="translate(290, 140)">
                      <circle r="9" fill="#0d9488" stroke="#5eead4" strokeWidth="1" />
                      <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="6" fontWeight="bold">
                        Ac⁻
                      </text>
                    </g>
                    {/* Intact Undissociated Molecules */}
                    {[
                      { x: 205, y: 135 },
                      { x: 245, y: 160 },
                      { x: 250, y: 125 },
                    ].map((pt, i) => (
                      <g key={`ch3cooh-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
                        <rect x="-24" y="-8" width="48" height="16" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                        <text textAnchor="middle" dominantBaseline="central" fill="#f1f5f9" fontSize="7" fontWeight="bold">
                          CH₃COOH
                        </text>
                      </g>
                    ))}
                  </g>
                )}
              </svg>

              {/* Status Badge in Beaker */}
              <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-slate-950/85 border border-slate-700 text-[10px] text-slate-200 font-bold">
                {acidStrengthType === 'kuat'
                  ? '💡 Terurai 100%: Banjir ion bebas ➔ Lampu MENYALA TERANG'
                  : '🕯️ Terurai ~1%: Mayoritas molekul utuh ➔ Lampu REDUP'}
              </div>
            </div>

            {/* Scientific Distinction Callout */}
            <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-2 flex items-start gap-2">
              <Zap size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[10px] sm:text-[11px] text-amber-100 leading-snug">
                {acidStrengthType === 'kuat' ? (
                  <span>
                    <strong className="text-amber-300">Asam Kuat (Derajat Ionisasi α = 1):</strong> Seluruh molekul HCl terurai
                    menjadi ion H⁺ dan Cl⁻. Menghasilkan larutan elektrolit kuat, sangat korosif, dan berbahaya jika mengenai kulit.
                  </span>
                ) : (
                  <span>
                    <strong className="text-amber-300">Asam Lemah (Derajat Ionisasi α ≪ 1):</strong> Hanya sebagian kecil (~1%) molekul
                    cuka yang melepaskan ion H⁺. Karena ion bebasnya sedikit, keasamannya stabil dan aman dikonsumsi wajar.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: CORROSION HAZARD SIMULATOR (METAL & ACID RAIN)   */}
        {/* ======================================================== */}
        {currentMode === 2 && (
          <div className="w-full h-full flex flex-col justify-between gap-1.5 animate-in fade-in duration-300">
            {/* Specimen Switcher */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectCorrosion('paku')}
                className={`flex-1 py-1 px-2.5 rounded-lg font-black text-[10.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  corrosionTarget === 'paku'
                    ? 'bg-red-500 text-white ring-2 ring-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <ShieldAlert size={13} />
                <span>Eksperimen 1: Korosi Paku Besi (Fe)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectCorrosion('candi')}
                className={`flex-1 py-1 px-2.5 rounded-lg font-black text-[10.5px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  corrosionTarget === 'candi'
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <AlertTriangle size={13} />
                <span>Eksperimen 2: Hujan Asam pada Candi (CaCO₃)</span>
              </button>
            </div>

            {/* Reaction Chamber Visual */}
            <div className="flex-1 min-h-0 bg-slate-950/80 rounded-xl border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 460 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full max-h-[180px]">
                <defs>
                  <style>{`
                    @keyframes gasBubbleRise {
                      0% { transform: translateY(0); opacity: 0; }
                      30% { opacity: 0.9; }
                      100% { transform: translateY(-75px); opacity: 0; }
                    }
                    @keyframes acidRainDrip {
                      0% { transform: translateY(-30px); opacity: 0; }
                      40% { opacity: 1; }
                      100% { transform: translateY(40px); opacity: 0; }
                    }
                    .anim-gas-rise-1 { animation: gasBubbleRise 1.8s ease-in infinite; }
                    .anim-gas-rise-2 { animation: gasBubbleRise 2.3s ease-in infinite 0.5s; }
                    .anim-gas-rise-3 { animation: gasBubbleRise 1.6s ease-in infinite 0.9s; }
                    .anim-rain-drip { animation: acidRainDrip 1.2s linear infinite; }
                  `}</style>
                </defs>

                {corrosionTarget === 'paku' ? (
                  /* EXPERIMENT 1: IRON NAIL DISSOLVING IN ACID */
                  <g>
                    {/* Beaker with Greenish-Red Acid Solution */}
                    <rect x="110" y="40" width="240" height="150" rx="14" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                    <rect x="112" y="70" width="236" height="118" rx="12" fill="#dc2626" fillOpacity="0.25" />

                    {/* Iron Nail Specimen Dipping in Liquid */}
                    <g transform="translate(230, 130) rotate(25)">
                      {/* Nail Head */}
                      <rect x="-18" y="-45" width="36" height="8" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
                      {/* Nail Body (Pitted & Corroded on lower end) */}
                      <path d="M -6 -37 L 6 -37 L 4 25 L 0 45 L -4 25 Z" fill="#64748b" stroke="#334155" strokeWidth="1" />
                      {/* Rust / Pitted Corroded Layer */}
                      <circle cx="2" cy="15" r="3.5" fill="#ea580c" opacity="0.8" />
                      <circle cx="-2" cy="28" r="3" fill="#c2410c" opacity="0.8" />
                      <circle cx="1" cy="36" r="2.5" fill="#9a3412" opacity="0.9" />
                    </g>

                    {/* Hydrogen Gas Bubbles Escaping H2 */}
                    <g transform="translate(235, 140)" className="anim-gas-rise-1">
                      <circle cx="-15" cy="0" r="4" fill="#ffffff" opacity="0.85" />
                      <circle cx="10" cy="-10" r="5" fill="#ffffff" opacity="0.85" />
                      <text x="22" y="-12" fill="#fecaca" fontSize="9" fontWeight="bold">
                        H₂ ↑
                      </text>
                    </g>
                    <g transform="translate(250, 160)" className="anim-gas-rise-2">
                      <circle cx="5" cy="0" r="3.5" fill="#ffffff" opacity="0.8" />
                      <circle cx="-10" cy="-15" r="4.5" fill="#ffffff" opacity="0.8" />
                      <text x="-25" y="-18" fill="#fecaca" fontSize="9" fontWeight="bold">
                        H₂ ↑
                      </text>
                    </g>

                    {/* Reaction Title Badge */}
                    <rect x="125" y="10" width="210" height="24" rx="6" fill="#090d16" stroke="#ef4444" strokeWidth="1" />
                    <text x="230" y="26" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      Fe (besi) + 2H⁺ ➔ Fe²⁺ + H₂ ↑ (gas)
                    </text>
                  </g>
                ) : (
                  /* EXPERIMENT 2: ACID RAIN ERODING LIMESTONE TEMPLE */
                  <g>
                    {/* Industrial Cloud with SO2 Emissions */}
                    <path
                      d="M 120 40 Q 140 20 170 25 Q 190 10 220 20 Q 240 10 260 25 Q 290 20 300 40 Q 310 60 280 65 Q 200 68 130 65 Q 110 55 120 40 Z"
                      fill="#334155"
                      stroke="#64748b"
                      strokeWidth="1.5"
                    />
                    <text x="210" y="44" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
                      Awan Polutan SO₂ / NOₓ (pH &lt; 5.6)
                    </text>

                    {/* Acid Rain Droplets */}
                    <g className="anim-rain-drip">
                      <line x1="160" y1="70" x2="155" y2="90" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="210" y1="70" x2="205" y2="90" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="260" y1="70" x2="255" y2="90" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                    </g>

                    {/* Limestone Temple Stupa / Relief (CaCO3) */}
                    <g transform="translate(210, 160)">
                      <rect x="-60" y="0" width="120" height="30" rx="3" fill="#78716c" stroke="#44403c" strokeWidth="1" />
                      <rect x="-40" y="-22" width="80" height="22" rx="2" fill="#a8a29e" stroke="#57534e" strokeWidth="1" />
                      <path d="M -20 -22 L 0 -45 L 20 -22 Z" fill="#d6d3d1" stroke="#78716c" strokeWidth="1" />

                      {/* Corroded Weathering Patches */}
                      <circle cx="-15" cy="-8" r="4.5" fill="#44403c" opacity="0.6" />
                      <circle cx="22" cy="12" r="5" fill="#44403c" opacity="0.6" />
                      <circle cx="5" cy="-28" r="3.5" fill="#44403c" opacity="0.6" />
                    </g>

                    {/* CO2 Gas Effervescence */}
                    <g transform="translate(210, 120)" className="anim-gas-rise-1">
                      <circle cx="-25" cy="0" r="3.5" fill="#ffffff" opacity="0.8" />
                      <circle cx="15" cy="-10" r="4.5" fill="#ffffff" opacity="0.8" />
                      <text x="25" y="-8" fill="#fde047" fontSize="9" fontWeight="bold">
                        CO₂ ↑
                      </text>
                    </g>

                    {/* Reaction Title Badge */}
                    <rect x="110" y="10" width="240" height="20" rx="5" fill="#090d16" stroke="#f59e0b" strokeWidth="1" />
                    <text x="230" y="24" textAnchor="middle" fill="#fde047" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      CaCO₃ (marmer) + 2H⁺ ➔ Ca²⁺ + H₂O + CO₂ ↑
                    </text>
                  </g>
                )}
              </svg>

              {/* Real Classroom Safety Notice Banner */}
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-red-950/90 border border-red-500/60 text-[10px] text-red-100 flex items-center justify-between">
                <span className="font-black text-red-300 flex items-center gap-1">
                  🚫 DILARANG MENCIPIPI CAIRAN KIMIA!
                </span>
                <span className="text-slate-300 hidden sm:inline">
                  Asam kuat merusak jaringan kulit & melarutkan logam dalam sekejap.
                </span>
              </div>
            </div>

            {/* Explanation Callout */}
            <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-2 flex items-start gap-2">
              <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
              <div className="text-[10px] sm:text-[11px] text-red-100 leading-snug">
                {corrosionTarget === 'paku' ? (
                  <span>
                    <strong className="text-red-300">Korosi Logam:</strong> Asam bereaksi aktif dengan logam menghasilkan ion garam
                    dan semburan gas hidrogen (H₂). Inilah alasan tangki asam tidak boleh disimpan dalam wadah besi biasa!
                  </span>
                ) : (
                  <span>
                    <strong className="text-amber-300">Pelapukan Candi Batu:</strong> Hujan asam bereaksi dengan kalsium karbonat
                    (CaCO₃) pada relief candi dan patung marmer, menghasilkan gas CO₂ dan mengikis keindahan cagar budaya sejarah kita.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
