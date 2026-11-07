import React from 'react';
import { GameType } from '@/types/game';

interface Props {
  gameId: string;
  gameType: GameType;
  className?: string;
}

const GameIllustrationComponent: React.FC<Props> = ({ gameId, className = '' }) => {
  // Render specific rich illustration based on gameId
  switch (gameId) {
    // 1. Ekspedisi Satwa Endemik (Hutan Hujan & Fauna)
    case 'point-click-hutan':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          {/* Deep jungle foliage background */}
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="jungleGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="60%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <radialGradient id="mistGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Backdrop */}
            <rect width="400" height="200" fill="url(#jungleGrad)" />
            <circle cx="280" cy="90" r="120" fill="url(#mistGlow)" />

            {/* Background Trees & Canopy Silhouette */}
            <path d="M-20 200 L-10 110 Q30 70 80 110 Q140 60 190 120 Q250 80 310 115 Q360 70 420 120 L420 200 Z" fill="#04382c" opacity="0.7" />
            <path d="M20 200 Q70 130 130 150 Q190 120 250 160 Q320 130 390 170 L400 200 Z" fill="#022c22" opacity="0.9" />

            {/* Tree Branch on Right */}
            <path d="M260 200 C270 150 310 125 400 120 L400 145 C340 148 300 165 290 200 Z" fill="#292524" />
            {/* Hanging Liana / Vines */}
            <path d="M30 0 Q60 60 40 130 Q80 80 110 0" stroke="#059669" strokeWidth="2.5" fill="none" opacity="0.6" strokeDasharray="4 2" />
            <path d="M120 0 Q140 70 170 120" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" />

            {/* Tropical Monstera / Fern Leaves */}
            <g transform="translate(15, 120) scale(0.65)" fill="#10b981" opacity="0.85">
              <path d="M0 80 C-30 40 -10 0 30 -20 C25 5 45 10 40 30 C35 20 20 40 15 50 C30 50 25 70 0 80 Z" />
            </g>
            <g transform="translate(320, 100) scale(0.7) rotate(-20)" fill="#34d399" opacity="0.8">
              <path d="M0 60 C-20 30 -5 0 25 -15 C20 5 35 10 30 25 C15 35 0 60 0 60 Z" />
            </g>

            {/* Orangutan Cartoon Silhouette on Branch */}
            <g transform="translate(320, 75) scale(0.95)">
              {/* Body */}
              <ellipse cx="25" cy="35" rx="16" ry="19" fill="#c2410c" />
              {/* Head */}
              <circle cx="25" cy="16" r="12" fill="#9a3412" />
              <circle cx="21" cy="15" r="2" fill="#fed7aa" />
              <circle cx="29" cy="15" r="2" fill="#fed7aa" />
              <ellipse cx="25" cy="20" rx="4" ry="2.5" fill="#fed7aa" opacity="0.9" />
              {/* Cheeks pads */}
              <ellipse cx="14" cy="16" rx="3.5" ry="5.5" fill="#7c2d12" />
              <ellipse cx="36" cy="16" rx="3.5" ry="5.5" fill="#7c2d12" />
              {/* Arms reaching branch */}
              <path d="M14 26 C5 15 0 5 5 -4 C8 -4 14 10 18 24 Z" fill="#9a3412" />
              <path d="M35 28 C45 20 55 18 60 22 C55 28 45 32 36 34 Z" fill="#c2410c" />
            </g>

            {/* Exotic Bird (Cendrawasih) in Flight / Perched */}
            <g transform="translate(90, 60) scale(0.7)">
              <ellipse cx="20" cy="18" rx="8" ry="5" fill="#eab308" />
              <circle cx="26" cy="15" r="4" fill="#ca8a04" />
              {/* Long Golden Feather Tail */}
              <path d="M12 18 C-10 25 -25 50 -35 80 C-20 60 0 35 14 22 Z" fill="#facc15" opacity="0.9" />
              <path d="M13 19 C-5 35 -15 65 -20 95 C-8 70 5 40 15 22 Z" fill="#f59e0b" opacity="0.8" />
              {/* Emerald Wings */}
              <path d="M18 14 C25 2 38 -5 45 -2 C36 8 28 15 18 16 Z" fill="#10b981" />
            </g>

            {/* Camera Viewfinder & Interactive Pins (Screenshot Feel) */}
            {/* Corner brackets */}
            <path d="M25 45 L15 45 L15 55" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M375 45 L385 45 L385 55" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M25 185 L15 185 L15 175" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M375 185 L385 185 L385 175" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

            {/* Reticle Focus Target Center */}
            <g transform="translate(195, 105)" opacity="0.7">
              <circle cx="0" cy="0" r="18" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <circle cx="0" cy="0" r="3" fill="#34d399" />
              <line x1="-24" y1="0" x2="-8" y2="0" stroke="#34d399" strokeWidth="1.5" />
              <line x1="8" y1="0" x2="24" y2="0" stroke="#34d399" strokeWidth="1.5" />
              <line x1="0" y1="-24" x2="0" y2="-8" stroke="#34d399" strokeWidth="1.5" />
              <line x1="0" y1="8" x2="0" y2="24" stroke="#34d399" strokeWidth="1.5" />
            </g>

            {/* Interactive Target Label Floating Pin */}
            <g transform="translate(190, 68)">
              <rect x="-6" y="-12" width="94" height="20" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
              <circle cx="4" cy="-2" r="3" fill="#facc15" />
              <text x="12" y="2" fill="#ecfdf5" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                Orangutan 98%
              </text>
            </g>

            {/* Mini HUD Badge */}
            <text x="24" y="186" fill="#a7f3d0" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.8">
              ● OBSERVE • HABITAT WALLACEA
            </text>
          </svg>
        </div>
      );

    // 2. Petualangan Sains: Investigasi Forensik Lab Kimia
    case 'point-click-lab':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="labForensicBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#042f2e" />
                <stop offset="45%" stopColor="#0b192c" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <linearGradient id="titrationLiquid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="35%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <linearGradient id="phScaleCard" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="25%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <radialGradient id="reactorCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#042f2e" stopOpacity="0" />
              </radialGradient>
              <filter id="neonLabGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Cleanroom Dark Tech Backdrop */}
            <rect width="400" height="200" fill="url(#labForensicBg)" />
            <circle cx="150" cy="110" r="130" fill="url(#reactorCoreGlow)" />

            {/* High-Tech Cleanroom Hexagonal Molecular Matrix */}
            <g stroke="#14b8a6" strokeWidth="1" opacity="0.16" fill="none">
              <polygon points="40,30 55,22 70,30 70,48 55,56 40,48" />
              <polygon points="70,30 85,22 100,30 100,48 85,56 70,48" />
              <polygon points="55,56 70,48 70,66 55,74 40,66 40,48" />
              <circle cx="55" cy="22" r="2.5" fill="#2dd4bf" />
              <circle cx="85" cy="56" r="2.5" fill="#2dd4bf" />
              {/* Additional benzene cluster right */}
              <polygon points="340,35 355,27 370,35 370,53 355,61 340,53" />
              <polygon points="355,61 370,53 370,71 355,79 340,71 340,53" />
              <circle cx="355" cy="27" r="2" fill="#5eead4" />
            </g>

            {/* Tactical Viewfinder Corners */}
            <path d="M20 30 L20 18 L32 18" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M380 30 L380 18 L368 18" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M20 170 L20 182 L32 182" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M380 170 L380 182 L368 182" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

            {/* Top HUD Status Pill */}
            <g transform="translate(230, 16)">
              <rect x="0" y="0" width="148" height="20" rx="10" fill="#042f2e" stroke="#14b8a6" strokeWidth="1.2" opacity="0.95" />
              <circle cx="10" cy="10" r="3.5" fill="#22c55e" />
              <text x="20" y="14" fill="#a7f3d0" fontSize="8" fontWeight="bold" fontFamily="monospace">
                REAKTOR 04: MONITORING
              </text>
            </g>

            {/* Titration Burette Tip Dropping Reagent */}
            <g transform="translate(136, 12)">
              <rect x="0" y="0" width="6" height="50" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" opacity="0.9" />
              <line x1="1" y1="15" x2="5" y2="15" stroke="#0d9488" strokeWidth="1" />
              <line x1="1" y1="25" x2="5" y2="25" stroke="#0d9488" strokeWidth="1" />
              <line x1="1" y1="35" x2="5" y2="35" stroke="#0d9488" strokeWidth="1" />
              {/* Dropper Nozzle */}
              <polygon points="0,50 6,50 3,58" fill="#94a3b8" />
              {/* Falling Neutralizer Titration Droplet */}
              <circle cx="3" cy="67" r="2.5" fill="#38bdf8" filter="url(#neonLabGlow)" />
            </g>

            {/* Centerpiece: Glowing Volumetric Erlenmeyer Flask */}
            <g transform="translate(90, 68) scale(1.05)">
              {/* Borosilicate Glass Flask Liquid */}
              <path
                d="M36 34 L12 88 C9 94 13 100 20 100 L76 100 C83 100 87 94 84 88 L60 34 Z"
                fill="url(#titrationLiquid)"
                opacity="0.9"
              />
              {/* Liquid Meniscus Surface */}
              <ellipse cx="48" cy="34" rx="12" ry="3.5" fill="#99f6e4" />

              {/* Glass Outline Body */}
              <path
                d="M38 12 L38 28 L12 88 C9 94 13 100 20 100 L76 100 C83 100 87 94 84 88 L58 28 L58 12 Z"
                stroke="#ccfbf1"
                strokeWidth="2.5"
                fill="none"
                opacity="0.95"
              />
              {/* Neck Lip Rim */}
              <ellipse cx="48" cy="12" rx="11" ry="3" stroke="#ccfbf1" strokeWidth="2.2" fill="none" />

              {/* Volumetric Graduations (ml) */}
              <line x1="28" y1="80" x2="42" y2="80" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
              <text x="44" y="82" fill="#e6fffa" fontSize="6.5" fontWeight="bold" fontFamily="monospace">200ml</text>

              <line x1="32" y1="65" x2="44" y2="65" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
              <text x="46" y="67" fill="#e6fffa" fontSize="6.5" fontWeight="bold" fontFamily="monospace">150ml</text>

              <line x1="36" y1="50" x2="46" y2="50" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
              <text x="48" y="52" fill="#e6fffa" fontSize="6.5" fontWeight="bold" fontFamily="monospace">100ml</text>

              {/* Effervescent Chemical Bubbles */}
              <circle cx="36" cy="85" r="2.5" fill="#ffffff" opacity="0.85" />
              <circle cx="58" cy="78" r="3" fill="#ffffff" opacity="0.8" />
              <circle cx="45" cy="62" r="2.2" fill="#ffffff" opacity="0.95" />
              <circle cx="52" cy="46" r="1.8" fill="#99f6e4" opacity="0.9" />
              <circle cx="42" cy="30" r="1.5" fill="#5eead4" opacity="0.75" />
            </g>

            {/* pH Meter Digital Display with Litmus Scale (0 - 14) */}
            <g transform="translate(200, 48)">
              {/* Frame Card */}
              <rect x="0" y="0" width="180" height="66" rx="10" fill="#042023" stroke="#14b8a6" strokeWidth="1.5" opacity="0.9" />

              <text x="10" y="16" fill="#f8fafc" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">
                INDIKATOR SKALA pH (0 - 14)
              </text>

              {/* Litmus pH Gradient Bar */}
              <rect x="10" y="22" width="160" height="14" rx="4" fill="url(#phScaleCard)" stroke="#334155" strokeWidth="1" />

              {/* pH 7.00 Netral Target Cursor Pin */}
              <polygon points="90,18 86,13 94,13" fill="#38bdf8" />
              <line x1="90" y1="21" x2="90" y2="37" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 1" />
              <polygon points="90,41 86,46 94,46" fill="#38bdf8" />

              {/* Labels */}
              <text x="12" y="47" fill="#f87171" fontSize="7" fontWeight="bold">0 Asam</text>
              <text x="90" y="54" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="black">pH 7.00 NETRAL</text>
              <text x="168" y="47" textAnchor="end" fill="#c084fc" fontSize="7" fontWeight="bold">14 Basa</text>
            </g>

            {/* K3 Laboratorium Hazard Badges Card */}
            <g transform="translate(200, 122)">
              <rect x="0" y="0" width="180" height="56" rx="10" fill="#042023" stroke="#14b8a6" strokeWidth="1.5" opacity="0.9" />

              <text x="10" y="14" fill="#cbd5e1" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">
                PROTOKOL K3 GHS LABORATORIUM
              </text>

              {/* 3 Red Diamonds for GHS Symbols */}
              {/* 1. Korosif */}
              <g transform="translate(18, 22)">
                <polygon points="12,0 24,12 12,24 0,12" fill="#ffffff" stroke="#dc2626" strokeWidth="1.8" />
                <text x="12" y="16" textAnchor="middle" fontSize="10">⚠️</text>
                <text x="12" y="32" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="bold">Korosif</text>
              </g>

              {/* 2. Toksik */}
              <g transform="translate(68, 22)">
                <polygon points="12,0 24,12 12,24 0,12" fill="#ffffff" stroke="#dc2626" strokeWidth="1.8" />
                <text x="12" y="16" textAnchor="middle" fontSize="10">☠️</text>
                <text x="12" y="32" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="bold">Toksik</text>
              </g>

              {/* 3. Menyala */}
              <g transform="translate(118, 22)">
                <polygon points="12,0 24,12 12,24 0,12" fill="#ffffff" stroke="#dc2626" strokeWidth="1.8" />
                <text x="12" y="16" textAnchor="middle" fontSize="10">🔥</text>
                <text x="12" y="32" textAnchor="middle" fill="#94a3b8" fontSize="6" fontWeight="bold">Menyala</text>
              </g>
            </g>

            {/* Interactive Target Reticle on Erlenmeyer Flask */}
            <g transform="translate(56, 125)">
              <circle cx="0" cy="0" r="14" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
              <circle cx="0" cy="0" r="3" fill="#2dd4bf" />
              <line x1="-18" y1="0" x2="-6" y2="0" stroke="#2dd4bf" strokeWidth="1.2" />
              <line x1="6" y1="0" x2="18" y2="0" stroke="#2dd4bf" strokeWidth="1.2" />
              <line x1="0" y1="-18" x2="0" y2="-6" stroke="#2dd4bf" strokeWidth="1.2" />
              <line x1="0" y1="6" x2="0" y2="18" stroke="#2dd4bf" strokeWidth="1.2" />
            </g>

            {/* Bottom Status Ticker */}
            <g transform="translate(20, 184)">
              <circle cx="4" cy="4" r="2.5" fill="#14b8a6" />
              <text x="12" y="7" fill="#5eead4" fontSize="7.5" fontWeight="bold" fontFamily="monospace" opacity="0.9">
                UNIT 04 FORENSIK • TITRASI NETRALISASI • METODE ILMIAH
              </text>
            </g>
          </svg>
        </div>
      );

    // 3. Candi Borobudur & Relief Nusantara
    case 'point-click-candi':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="candiDawn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="45%" stopColor="#78350f" />
                <stop offset="85%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#1c1917" />
              </linearGradient>
              <radialGradient id="sunGlow" cx="65%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#451a03" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="400" height="200" fill="url(#candiDawn)" />
            <circle cx="270" cy="65" r="75" fill="url(#sunGlow)" />

            {/* Distant Mountain Silhouette (Gunung Merapi) */}
            <path d="M120 120 L210 50 L300 120 Z" fill="#292524" opacity="0.4" />
            <path d="M240 120 L330 65 L420 120 Z" fill="#1c1917" opacity="0.3" />

            {/* Borobudur Stupa Tier 1 (Background Silhouettes) */}
            <g fill="#292524" opacity="0.85">
              {/* Left Stupa */}
              <path d="M80 120 C80 95 90 80 100 70 L100 58 L104 58 L104 70 C114 80 124 95 124 120 Z" />
              {/* Right Stupa */}
              <path d="M260 120 C260 95 270 80 280 70 L280 58 L284 58 L284 70 C294 80 304 95 304 120 Z" />
            </g>

            {/* Main Center Stupa Borobudur (Foreground Large) */}
            <g transform="translate(170, 40)" fill="#1c1917">
              {/* Spire Pinnacle (Chattra) */}
              <rect x="28" y="0" width="4" height="28" fill="#d97706" />
              <circle cx="30" cy="0" r="3" fill="#f59e0b" />
              <polygon points="26,10 34,10 30,5" fill="#f59e0b" />
              {/* Stupa Bell Body */}
              <path d="M0 80 C2 52 14 30 30 25 C46 30 58 52 60 80 Z" fill="#292524" />
              {/* Perforated Diamond Grid Cutouts on Stupa */}
              <g fill="#d97706" opacity="0.75">
                <polygon points="30,35 34,40 30,45 26,40" />
                <polygon points="18,48 22,53 18,58 14,53" />
                <polygon points="30,48 34,53 30,58 26,53" />
                <polygon points="42,48 46,53 42,58 38,53" />
                <polygon points="24,62 28,67 24,72 20,67" />
                <polygon points="36,62 40,67 36,72 32,67" />
              </g>
              {/* Base Pedestal */}
              <rect x="-8" y="80" width="76" height="12" rx="2" fill="#1c1917" />
            </g>

            {/* Ancient Ship Carving (Perahu Bercadik Borobudur) on Stone Base */}
            <g transform="translate(20, 130) scale(0.85)" opacity="0.9">
              {/* Stone Panel Border */}
              <rect x="0" y="0" width="130" height="55" rx="4" fill="#292524" stroke="#78350f" strokeWidth="1.5" />
              {/* Hull of Outrigger Ship */}
              <path d="M15 42 Q65 48 115 35 Q90 48 20 48 Z" fill="#d97706" />
              {/* Double Masts & Sails */}
              <line x1="45" y1="42" x2="45" y2="12" stroke="#f59e0b" strokeWidth="2" />
              <line x1="75" y1="40" x2="75" y2="15" stroke="#f59e0b" strokeWidth="2" />
              {/* Tanja Sails */}
              <path d="M45 14 L65 18 L60 38 L45 35 Z" fill="#fbbf24" opacity="0.8" />
              <path d="M75 16 L92 20 L88 36 L75 34 Z" fill="#fbbf24" opacity="0.8" />
              {/* Outrigger (Cadik) */}
              <line x1="20" y1="45" x2="105" y2="45" stroke="#f59e0b" strokeWidth="1.5" />
            </g>

            {/* Discovery Reticle Pin */}
            <g transform="translate(275, 125)">
              <circle cx="0" cy="0" r="10" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
              <circle cx="0" cy="0" r="2.5" fill="#f59e0b" />
              <rect x="12" y="-10" width="88" height="20" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="20" y="4" fill="#fef3c7" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                🗿 Stupa Utama
              </text>
            </g>

            <text x="25" y="186" fill="#fde68a" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.75">
              RELIEF BOROBUDUR • BATU ANDESIT 800 M
            </text>
          </svg>
        </div>
      );

    // 4. Petualangan Sains: Ekspedisi Daur Air (Lembah Cendrawasih)
    case 'ular-tangga-sains':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="daurAirSkyBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="45%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
              <linearGradient id="daurAirRiver" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <radialGradient id="daurAirSun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="leafCardGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>

            {/* Atmosphere Base */}
            <rect width="400" height="200" fill="url(#daurAirSkyBg)" />

            {/* Radiant Golden Sun & Beams (Energi Surya) */}
            <circle cx="80" cy="50" r="42" fill="url(#daurAirSun)" />
            <circle cx="80" cy="50" r="22" fill="#facc15" stroke="#f59e0b" strokeWidth="2.5" />
            <g stroke="#fef08a" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8">
              <line x1="80" y1="18" x2="80" y2="6" />
              <line x1="80" y1="82" x2="80" y2="94" />
              <line x1="48" y1="50" x2="36" y2="50" />
              <line x1="112" y1="50" x2="124" y2="50" />
              <line x1="57" y1="27" x2="48" y2="18" />
              <line x1="103" y1="73" x2="112" y2="82" />
              <line x1="57" y1="73" x2="48" y2="82" />
              <line x1="103" y1="27" x2="112" y2="18" />
            </g>

            {/* Mountain Peaks & Misty Ridges of Lembah Cendrawasih */}
            <path d="M0 130 L90 75 L180 125 L270 60 L360 120 L400 95 L400 200 L0 200 Z" fill="#047857" opacity="0.6" />
            <path d="M60 145 L150 90 L240 140 L320 85 L400 130 L400 200 L0 200 L0 155 Z" fill="#065f46" opacity="0.85" />

            {/* Cascading Mountain Waterfall */}
            <path d="M270 60 L266 115 L274 115 Z" fill="#e0f2fe" opacity="0.7" />

            {/* Cumulus Rain Cloud & Raindrops (Kondensasi & Presipitasi) */}
            <g transform="translate(190, 20)">
              <path
                d="M35 55 Q20 55 12 45 Q5 32 18 25 Q25 12 45 15 Q60 5 80 15 Q95 8 108 22 Q120 32 115 45 Q118 55 100 55 Z"
                fill="#cbd5e1"
                stroke="#94a3b8"
                strokeWidth="2"
                opacity="0.9"
              />
              {/* Rain Streaks */}
              <g stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8">
                <line x1="30" y1="64" x2="24" y2="82" />
                <line x1="50" y1="64" x2="44" y2="82" />
                <line x1="70" y1="64" x2="64" y2="82" />
                <line x1="90" y1="64" x2="84" y2="82" />
              </g>
            </g>

            {/* Winding Crystal River (Aliran Permukaan & Infiltrasi) */}
            <path
              d="M268 115 C250 140 290 160 260 185 C240 200 200 200 170 200 L230 200 C270 195 320 170 300 145 C285 130 285 120 274 115 Z"
              fill="url(#daurAirRiver)"
            />
            {/* Rising Water Vapor (Evaporasi) */}
            <g stroke="#bae6fd" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.85">
              <path d="M320 170 Q315 150 325 130" fill="none" />
              <path d="M340 180 Q335 160 345 140" fill="none" />
            </g>
            <circle cx="324" cy="148" r="2" fill="#e0f2fe" />
            <circle cx="344" cy="158" r="2.5" fill="#e0f2fe" />

            {/* Giant Rainforest Leaf with Dew Drop in Foreground Left */}
            <g transform="translate(10, 105)">
              <path
                d="M10 80 C30 20 90 10 130 25 C110 60 80 90 20 90 Z"
                fill="url(#leafCardGrad)"
                stroke="#14532d"
                strokeWidth="2.5"
              />
              <path d="M10 80 C40 65 80 50 128 26" stroke="#fef08a" strokeWidth="2.5" fill="none" />
              <path d="M40 65 Q60 50 75 30" stroke="#fef08a" strokeWidth="1.5" fill="none" />
              <path d="M70 52 Q90 45 105 35" stroke="#fef08a" strokeWidth="1.5" fill="none" />
              {/* Dew Drop */}
              <circle cx="85" cy="40" r="5" fill="#e0f2fe" opacity="0.8" />
              <circle cx="83.5" cy="38.5" r="1.5" fill="#ffffff" />
            </g>

            {/* Vintage Explorer Compass Badge on Right Side */}
            <g transform="translate(345, 130)">
              <circle cx="20" cy="20" r="24" fill="#1e293b" opacity="0.3" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))" />
              <circle cx="20" cy="20" r="22" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              <circle cx="20" cy="20" r="18" fill="#fffbeb" />
              {/* Cardinal ticks */}
              <line x1="20" y1="4" x2="20" y2="8" stroke="#78350f" strokeWidth="1.5" />
              <line x1="20" y1="36" x2="20" y2="32" stroke="#78350f" strokeWidth="1.5" />
              <line x1="4" y1="20" x2="8" y2="20" stroke="#78350f" strokeWidth="1.5" />
              <line x1="36" y1="20" x2="32" y2="20" stroke="#78350f" strokeWidth="1.5" />
              {/* Compass Needle */}
              <polygon points="20,7 23,20 20,18 17,20" fill="#dc2626" />
              <polygon points="20,33 23,20 20,22 17,20" fill="#2563eb" />
              <circle cx="20" cy="20" r="2.5" fill="#78350f" />
            </g>

            {/* HUD Footer Tag */}
            <text x="20" y="188" fill="#a7f3d0" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.9">
              🌿 LEMBAH CENDRAWASIH • EKSPEDISI DAUR AIR &amp; FOTOSINTESIS
            </text>
          </svg>
        </div>
      );

    // 5. Ular Tangga: Master Berhitung Cepat (Matematika)
    case 'ular-tangga-matematika':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="mathBoardBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="50%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            <rect width="400" height="200" fill="url(#mathBoardBg)" />

            {/* Floating Math Symbols */}
            <g fill="#93c5fd" opacity="0.25" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
              <text x="40" y="45">π</text>
              <text x="120" y="35">×</text>
              <text x="340" y="55">÷</text>
              <text x="270" y="40">∑</text>
              <text x="360" y="160">√</text>
              <text x="45" y="165">%</text>
            </g>

            {/* Isometric Math Board Grid */}
            <g transform="translate(180, 115) rotate(-12) skewX(-18) scale(0.9)">
              {[0, 1, 2, 3].map(col =>
                [0, 1, 2].map(row => {
                  const num = 12 + row * 4 + col;
                  const isMathChallenge = num === 14 || num === 18 || num === 22;
                  return (
                    <g key={`${col}-${row}`} transform={`translate(${col * 46}, ${row * 44})`}>
                      <rect
                        width="42"
                        height="40"
                        rx="6"
                        fill={isMathChallenge ? '#38bdf8' : (col + row) % 2 === 0 ? '#ffffff' : '#dbeafe'}
                        stroke="#2563eb"
                        strokeWidth="1.5"
                      />
                      <text x="6" y="13" fill="#1e40af" fontSize="9" fontWeight="bold">
                        {num}
                      </text>
                      {isMathChallenge && (
                        <text x="10" y="29" fill="#0369a1" fontSize="9" fontWeight="bold">
                          {num === 14 ? '4×7' : num === 18 ? '½+¼' : '9²'}
                        </text>
                      )}
                    </g>
                  );
                })
              )}

              {/* Ladder from 13 to 22 */}
              <g stroke="#f59e0b" strokeWidth="2.5">
                <line x1="18" y1="95" x2="58" y2="15" />
                <line x1="28" y1="91" x2="68" y2="11" />
                <line x1="22" y1="75" x2="32" y2="71" strokeWidth="2" stroke="#d97706" />
                <line x1="32" y1="55" x2="42" y2="51" strokeWidth="2" stroke="#d97706" />
                <line x1="42" y1="35" x2="52" y2="31" strokeWidth="2" stroke="#d97706" />
              </g>

              {/* Red-Orange Snake */}
              <path
                d="M140 18 Q120 50 140 75 Q150 100 100 115"
                stroke="#f43f5e"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="140" cy="16" r="5" fill="#be123c" />
            </g>

            {/* Geometry Compass & Floating 3D Dice on Left */}
            <g transform="translate(65, 95) scale(1.1)">
              <rect x="0" y="0" width="34" height="34" rx="7" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
              {/* 6 Dots */}
              <circle cx="10" cy="9" r="2.8" fill="#2563eb" />
              <circle cx="10" cy="17" r="2.8" fill="#2563eb" />
              <circle cx="10" cy="25" r="2.8" fill="#2563eb" />
              <circle cx="24" cy="9" r="2.8" fill="#2563eb" />
              <circle cx="24" cy="17" r="2.8" fill="#2563eb" />
              <circle cx="24" cy="25" r="2.8" fill="#2563eb" />
            </g>

            <text x="25" y="186" fill="#bfdbfe" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.8">
              PAPAN MATEMATIKA • PECAHAN & ARITMATIKA
            </text>
          </svg>
        </div>
      );

    // 6. Ular Tangga: Orbit Tata Surya
    case 'ular-tangga-tatasurya':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="spaceBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#3b0764" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
              <radialGradient id="sunPlanet" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="80%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </radialGradient>
            </defs>

            <rect width="400" height="200" fill="url(#spaceBg)" />

            {/* Stars Scatter */}
            <g fill="#ffffff" opacity="0.6">
              <circle cx="30" cy="40" r="1.5" />
              <circle cx="85" cy="25" r="1" />
              <circle cx="150" cy="45" r="1.5" />
              <circle cx="220" cy="30" r="1" />
              <circle cx="320" cy="20" r="2" />
              <circle cx="370" cy="60" r="1.5" />
              <circle cx="60" cy="160" r="1" />
              <circle cx="130" cy="170" r="1.5" />
              <circle cx="270" cy="175" r="1" />
              <circle cx="350" cy="150" r="1.5" />
            </g>

            {/* Orbital Path Curves with Tiles */}
            <path
              d="M30 150 Q160 50 360 110"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.6"
            />

            {/* Planet Saturn with Glorious Ring */}
            <g transform="translate(290, 80)">
              {/* Back Ring */}
              <ellipse cx="20" cy="20" rx="34" ry="10" stroke="#fde047" strokeWidth="4" fill="none" transform="rotate(-20 20 20)" opacity="0.7" />
              {/* Planet Body */}
              <circle cx="20" cy="20" r="18" fill="#eab308" />
              {/* Atmosphere bands */}
              <ellipse cx="20" cy="20" rx="18" ry="4" fill="#ca8a04" opacity="0.4" />
              {/* Front Ring */}
              <path d="M-10 28 C2 28 35 15 50 12" stroke="#fde047" strokeWidth="4" fill="none" opacity="0.9" />
            </g>

            {/* Planet Mars */}
            <g transform="translate(150, 85)">
              <circle cx="15" cy="15" r="13" fill="#ef4444" />
              <circle cx="11" cy="12" r="3" fill="#b91c1c" />
              <circle cx="19" cy="18" r="2" fill="#b91c1c" />
            </g>

            {/* Glowing Retro Rocket Climbing Orbital Ladder */}
            <g transform="translate(70, 75) rotate(35) scale(0.95)">
              {/* Exhaust Flames */}
              <polygon points="12,40 18,58 24,40" fill="#f97316" />
              <polygon points="14,40 18,52 22,40" fill="#fde047" />
              {/* Rocket Body */}
              <ellipse cx="18" cy="22" rx="10" ry="18" fill="#f8fafc" />
              {/* Rocket Nose Cone */}
              <path d="M8 15 C8 4 18 -2 18 -2 C18 -2 28 4 28 15 Z" fill="#ef4444" />
              {/* Fins */}
              <path d="M8 28 L0 38 L8 35 Z" fill="#dc2626" />
              <path d="M28 28 L36 38 L28 35 Z" fill="#dc2626" />
              {/* Porthole Window */}
              <circle cx="18" cy="20" r="4.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            </g>

            <text x="25" y="186" fill="#e9d5ff" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.8">
              ORBIT ANTARIKSA • TATA SURYA & GRAVITASI
            </text>
          </svg>
        </div>
      );

    // 7. Teka-Teki: Susun Kata & Rumus Sains
    case 'teka-teki-kata':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="puzzleBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="50%" stopColor="#0e7490" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>

            <rect width="400" height="200" fill="url(#puzzleBg)" />

            {/* Crossword Grid Matrix Snippet in Background */}
            <g transform="translate(200, 35)" opacity="0.25" stroke="#ffffff" strokeWidth="1.5">
              {[0, 1, 2, 3].map(col =>
                [0, 1, 2].map(row => (
                  <rect key={`${col}-${row}`} x={col * 32} y={row * 32} width="30" height="30" rx="3" fill="#ffffff" opacity="0.1" />
                ))
              )}
            </g>

            {/* Floating 3D Word Tiles (S - A - I - N - S) */}
            <g transform="translate(130, 85)">
              {[
                { letter: 'S', pt: '1', x: 0, rot: -6 },
                { letter: 'A', pt: '1', x: 42, rot: 3 },
                { letter: 'I', pt: '1', x: 84, rot: -4 },
                { letter: 'N', pt: '2', x: 126, rot: 5 },
                { letter: 'S', pt: '1', x: 168, rot: -2 },
              ].map(tile => (
                <g key={tile.letter + tile.x} transform={`translate(${tile.x}, 0) rotate(${tile.rot})`}>
                  {/* Drop Shadow */}
                  <rect x="0" y="4" width="36" height="38" rx="7" fill="#042f2e" opacity="0.4" />
                  {/* Tile Surface */}
                  <rect x="0" y="0" width="36" height="38" rx="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                  {/* Letter */}
                  <text x="18" y="25" textAnchor="middle" fill="#78350f" fontSize="18" fontWeight="900" fontFamily="sans-serif">
                    {tile.letter}
                  </text>
                  {/* Scrabble point value */}
                  <text x="30" y="33" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold">
                    {tile.pt}
                  </text>
                </g>
              ))}
            </g>

            {/* Glowing Lightbulb of Ideas on Left */}
            <g transform="translate(60, 70) scale(0.95)">
              <circle cx="20" cy="20" r="16" fill="#fde047" opacity="0.9" />
              {/* Bulb Base */}
              <rect x="15" y="34" width="10" height="6" rx="2" fill="#94a3b8" />
              <rect x="17" y="40" width="6" height="3" rx="1" fill="#64748b" />
              {/* Filament */}
              <path d="M15 20 Q20 12 25 20" stroke="#b45309" strokeWidth="2" fill="none" />
              {/* Idea Sparks */}
              <line x1="20" y1="-2" x2="20" y2="4" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="38" y1="6" x2="33" y2="10" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="2" y1="6" x2="7" y2="10" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            <text x="25" y="186" fill="#ccfbf1" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.8">
              TEKA-TEKI KATA • LOGIKA & KOSAKATA ILMIAH
            </text>
          </svg>
        </div>
      );

    // 8. Ular Tangga: Lintasan Sejarah Indonesia
    case 'ular-tangga-sejarah':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="historyBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="50%" stopColor="#c2410c" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>

            <rect width="400" height="200" fill="url(#historyBg)" />

            {/* Nusantara Map Subtle Silhouette */}
            <path
              d="M40 70 Q90 55 120 75 Q180 80 230 65 Q300 70 360 60"
              stroke="#fed7aa"
              strokeWidth="2"
              strokeDasharray="4 3"
              fill="none"
              opacity="0.3"
            />

            {/* Monas National Monument Silhouette on Right */}
            <g transform="translate(320, 45) scale(0.85)" fill="#ffffff" opacity="0.85">
              {/* Flame (Api Kemerdekaan Emas) */}
              <polygon points="15,0 20,8 15,16 10,8" fill="#facc15" />
              {/* Obelisk Tower */}
              <polygon points="13,16 17,16 19,85 11,85" fill="#f8fafc" />
              {/* Cawan Base */}
              <polygon points="4,85 26,85 32,95 -2,95" fill="#e2e8f0" />
              <rect x="-6" y="95" width="42" height="15" fill="#cbd5e1" />
            </g>

            {/* Historical Timeline Board with Tiles */}
            <g transform="translate(140, 110) rotate(-10) skewX(-15) scale(0.88)">
              {[
                { num: '45', text: '1945' },
                { num: '46', text: 'Sumpah Pemuda' },
                { num: '47', text: 'Majapahit' },
                { num: '48', text: 'Sriwijaya' },
              ].map((item, idx) => (
                <g key={item.num} transform={`translate(${idx * 48}, 0)`}>
                  <rect width="44" height="42" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
                  <text x="6" y="14" fill="#9a3412" fontSize="9" fontWeight="bold">
                    {item.num}
                  </text>
                  <text x="22" y="28" textAnchor="middle" fill="#c2410c" fontSize="7" fontWeight="bold">
                    {item.text}
                  </text>
                </g>
              ))}

              {/* Red-White Ribbon Ladder */}
              <line x1="20" y1="60" x2="70" y2="-10" stroke="#dc2626" strokeWidth="3" />
              <line x1="28" y1="56" x2="78" y2="-14" stroke="#ffffff" strokeWidth="3" />
            </g>

            {/* Ancient Feather Quill & Scroll on Left */}
            <g transform="translate(55, 75) scale(0.95)">
              <path d="M0 25 L45 5 C35 15 25 35 15 45 Z" fill="#fde047" />
              <path d="M45 5 L35 0 C20 15 10 35 0 25" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="40" r="4" fill="#dc2626" />
            </g>

            <text x="25" y="186" fill="#ffedd5" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.8">
              LINTASAN SEJARAH • DARI KERAJAAN HINGGA KEMERDEKAAN
            </text>
          </svg>
        </div>
      );

    // 9. Presentasi Interaktif: Ekspedisi Hutan Tropis (Canva Slides + Sequence & Match Pairs)
    case 'presentasi-ekosistem-hutan':
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="slideDeckGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="50%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="400" height="200" fill="url(#slideDeckGrad)" />

            {/* Floating Presentation Slide Frame */}
            <g transform="translate(140, 35) scale(0.95)">
              {/* Slide Card Shadow & Border */}
              <rect width="240" height="135" rx="14" fill="#ffffff" stroke="#34d399" strokeWidth="2" opacity="0.95" />
              {/* Top Slide Header Bar */}
              <rect width="240" height="24" rx="14" fill="#f0fdf4" />
              <circle cx="15" cy="12" r="3.5" fill="#f87171" />
              <circle cx="26" cy="12" r="3.5" fill="#fbbf24" />
              <circle cx="37" cy="12" r="3.5" fill="#34d399" />
              <text x="50" y="15" fill="#065f46" fontSize="8" fontWeight="bold">
                SLIDE 3: TANTANGAN URUTAN FOTOSINTESIS
              </text>

              {/* 3 Interactive Sequence Step Cards inside the Slide */}
              {[
                { label: '1. Sinar Surya', emoji: '☀️', x: 12 },
                { label: '2. Klorofil H2O', emoji: '🌱', x: 88 },
                { label: '3. Glukosa O2', emoji: '🍎', x: 164 },
              ].map((step, idx) => (
                <g key={`step-${idx}`} transform={`translate(${step.x}, 40)`}>
                  <rect width="64" height="68" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
                  <text x="32" y="32" textAnchor="middle" fontSize="20">
                    {step.emoji}
                  </text>
                  <text x="32" y="52" textAnchor="middle" fill="#047857" fontSize="7" fontWeight="bold">
                    {step.label}
                  </text>
                  <rect x="8" y="58" width="48" height="3" rx="1.5" fill="#34d399" />
                </g>
              ))}

              {/* Connecting Arrows between Cards */}
              <path d="M 80 74 L 84 74" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
              <path d="M 156 74 L 160 74" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Character Silhouette / Explorer on Left */}
            <g transform="translate(30, 45)">
              <circle cx="35" cy="35" r="24" fill="#10b981" opacity="0.3" />
              <circle cx="35" cy="35" r="18" fill="#ffffff" />
              <text x="35" y="42" textAnchor="middle" fontSize="20">
                🌿
              </text>
              <rect x="8" y="70" width="54" height="18" rx="9" fill="#022c22" stroke="#34d399" strokeWidth="1" />
              <text x="35" y="82" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="bold">
                PROF. MAYA
              </text>
            </g>

            {/* Bottom Tag */}
            <g transform="translate(25, 165)">
              <rect width="210" height="22" rx="11" fill="#022c22" stroke="#34d399" strokeWidth="1" opacity="0.95" />
              <circle cx="12" cy="11" r="4" fill="#f59e0b" />
              <text x="22" y="14" fill="#a7f3d0" fontSize="8" fontWeight="bold">
                PRESENTASI CERITA • MINI-GAME CANVA
              </text>
            </g>
          </svg>
        </div>
      );

    // 8. Teka-Teki Catur & Taktik Logika (Chess.com-Style Board & Tactical Arrow)
    case 'catur-taktik-logika':
    default:
      return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
          <svg className="w-full h-full object-cover" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="chessBgGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="60%" stopColor="#047857" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <marker id="arrowHead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#fbbf24" />
              </marker>
            </defs>

            {/* Background */}
            <rect width="400" height="200" fill="url(#chessBgGrad)" />

            {/* Chessboard Grid in 3D Perspective */}
            <g transform="translate(195, 105) rotate(-12) skewX(-20) scale(0.95)">
              {/* 4x4 Sample Mini Chessboard in Isometric View */}
              {Array.from({ length: 16 }, (_, i) => {
                const c = i % 4;
                const r = Math.floor(i / 4);
                const isLight = (c + r) % 2 === 0;
                return (
                  <rect
                    key={`sq-${c}-${r}`}
                    x={c * 28 - 56}
                    y={r * 28 - 56}
                    width="28"
                    height="28"
                    fill={isLight ? '#edeed1' : '#779956'}
                    stroke="#5b783d"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Highlight Origin & Destination (Yellow Tint) */}
              <rect x="-28" y="0" width="28" height="28" fill="#facc15" fillOpacity="0.5" />
              <rect x="0" y="-56" width="28" height="28" fill="#facc15" fillOpacity="0.5" />

              {/* Tactical Arrow from d2 to d4 */}
              <line
                x1="-14"
                y1="14"
                x2="14"
                y2="-42"
                stroke="#fbbf24"
                strokeWidth="4"
                strokeLinecap="round"
                markerEnd="url(#arrowHead)"
              />
            </g>

            {/* Big Silhouette Chess Pieces on Left & Right */}
            {/* White Queen Silhouette on Left */}
            <g transform="translate(45, 65) scale(0.9)" opacity="0.95">
              <path
                d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-4-15-4.5 15-7-11 2.5 12zm0 13h27v-3H9v3zm3-3v-3h21v3H12zm-3-6h27v-3H9v3z"
                fill="#ffffff"
                stroke="#064e3b"
                strokeWidth="1.5"
              />
              <circle cx="6" cy="12" r="2" fill="#ffffff" stroke="#064e3b" strokeWidth="1" />
              <circle cx="14" cy="9" r="2" fill="#ffffff" stroke="#064e3b" strokeWidth="1" />
              <circle cx="22.5" cy="8" r="2" fill="#ffffff" stroke="#064e3b" strokeWidth="1" />
              <circle cx="31" cy="9" r="2" fill="#ffffff" stroke="#064e3b" strokeWidth="1" />
              <circle cx="39" cy="12" r="2" fill="#ffffff" stroke="#064e3b" strokeWidth="1" />
            </g>

            {/* White Knight Silhouette on Right */}
            <g transform="translate(325, 70) scale(0.95)" opacity="0.95">
              <g fill="#ffffff" stroke="#064e3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
                <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-4.04 2-6 2.1-7 6.5-10 11-10 2 0 4.5.5 5 1.5 0 0 .5-1.5 2-2 1.5-.5 3 .5 3 1.5s-1.5 2-2 2z" />
                <circle cx="9.5" cy="25.5" r="1.5" fill="#064e3b" stroke="none" />
              </g>
            </g>

            {/* Green Badge Tag */}
            <g transform="translate(25, 160)">
              <rect width="180" height="24" rx="12" fill="#022c22" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
              <circle cx="14" cy="12" r="5" fill="#10b981" />
              <text x="26" y="16" fill="#a7f3d0" fontSize="9" fontWeight="bold">
                ENGINE 60 FPS • TAKTIK CATUR
              </text>
            </g>

            <text x="25" y="195" fill="#d1fae5" fontSize="8" fontWeight="bold" fontFamily="monospace" opacity="0.75">
              LOGIKA SPASIAL & PEMECAHAN MASALAH
            </text>
          </svg>
        </div>
      );
  }
};

export const GameIllustration = React.memo(GameIllustrationComponent);
