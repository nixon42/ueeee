import React, { useState, useEffect } from 'react';
import { Compass, Target, Rocket } from 'lucide-react';
import { NarrativeIntroSlide, PresentationMentor } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';
import { KakGalihAvatar } from '../characters/KakGalihAvatar';
import { DrMayaAvatar } from '../characters/DrMayaAvatar';
import { KaptenDirgantaraAvatar } from '../characters/KaptenDirgantaraAvatar';

export interface NarrativeHookSlideProps {
  slide: NarrativeIntroSlide;
  mentor: PresentationMentor;
  themeColor: PresentationThemeKey;
  onNext?: () => void;
}

/**
 * Forest adventure scene backdrop for Kak Galih (Daur Air & Ekosistem Rimba):
 * Layered sky, ridgelines, forest silhouettes, mist bands, and ground plane.
 */
const ForestSceneBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
    <style>{`
      @keyframes sceneCloudDrift {
        0% { transform: translateX(-18px); }
        100% { transform: translateX(1120px); }
      }
      @keyframes sceneSunBreathe {
        0%, 100% { opacity: 0.72; }
        50% { opacity: 1; }
      }
      @keyframes sceneRimFlicker {
        0%, 100% { opacity: 0.45; }
        50% { opacity: 0.75; }
      }
      @keyframes sceneFirefly {
        0% { transform: translateY(0) scale(0.8); opacity: 0; }
        25% { opacity: 0.9; }
        100% { transform: translateY(-90px) scale(1.15); opacity: 0; }
      }
      .scene-cloud { animation: sceneCloudDrift 64s linear infinite; }
      .scene-cloud-slow { animation: sceneCloudDrift 104s linear infinite; }
      .scene-sun { animation: sceneSunBreathe 6.5s ease-in-out infinite; }
      .scene-rim { animation: sceneRimFlicker 4.5s ease-in-out infinite; }
      .scene-fly-1 { animation: sceneFirefly 7s ease-out infinite; }
      .scene-fly-2 { animation: sceneFirefly 9s ease-out infinite 2.4s; }
    `}</style>

    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="narrSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="26%" stopColor="#0369a1" />
          <stop offset="52%" stopColor="#38bdf8" />
          <stop offset="76%" stopColor="#a7f3d0" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        <radialGradient id="narrSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="38%" stopColor="#fde047" />
          <stop offset="72%" stopColor="#f59e0b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="narrRidgeFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#155e75" />
        </linearGradient>
        <linearGradient id="narrRidgeMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="narrGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#022c22" />
          <stop offset="100%" stopColor="#01241c" />
        </linearGradient>
        <linearGradient id="narrFog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecfeff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ecfeff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="narrWaterfall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1200" height="640" fill="url(#narrSky)" />

      {/* sun */}
      <g className="scene-sun">
        <circle cx="965" cy="118" r="168" fill="url(#narrSun)" />
        <circle cx="965" cy="118" r="54" fill="#fde047" />
      </g>
      <g stroke="#fde68a" strokeWidth="3" strokeDasharray="10 9" opacity="0.55" className="scene-rim">
        <path d="M965 30 V62" />
        <path d="M1053 118 H1085" />
        <path d="M877 118 H845" />
        <path d="M1027 56 L1049 34" />
        <path d="M903 56 L881 34" />
      </g>

      {/* drifting clouds */}
      <g className="scene-cloud" opacity="0.5">
        <path d="M-90 150 Q-120 150 -130 130 Q-140 110 -115 95 Q-100 70 -65 75 Q-35 60 -5 75 Q15 65 35 85 Q55 100 45 125 Q50 150 20 150 Z" fill="#e0f2fe" />
      </g>
      <g className="scene-cloud-slow" opacity="0.32">
        <path d="M540 96 Q510 96 500 76 Q490 56 515 41 Q530 16 565 21 Q595 6 625 21 Q645 11 665 31 Q685 46 675 71 Q680 96 650 96 Z" fill="#f0f9ff" />
      </g>

      {/* far ridgelines */}
      <path d="M0 372 L150 240 L286 350 L400 226 L540 366 L700 214 L860 356 L1010 250 L1200 378 V640 H0 Z" fill="url(#narrRidgeFar)" opacity="0.85" />

      {/* waterfall into the valley */}
      <path d="M700 214 L692 360 L710 360 Z" fill="url(#narrWaterfall)" />
      <ellipse cx="701" cy="362" rx="26" ry="6" fill="#bae6fd" opacity="0.35" />

      {/* mist band over the valley floor */}
      <path d="M0 352 Q300 330 600 356 Q900 382 1200 352 V430 H0 Z" fill="url(#narrFog)" />

      {/* mid canopy */}
      <path d="M0 432 Q90 392 190 428 Q300 384 410 426 Q520 388 640 430 Q760 392 880 428 Q1000 388 1100 430 Q1160 412 1200 428 V640 H0 Z" fill="url(#narrRidgeMid)" />

      {/* foreground trunks */}
      <g stroke="#022c22" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M58 640 C70 540 66 470 92 404" strokeWidth="20" />
        <path d="M1158 640 C1146 550 1150 476 1126 414" strokeWidth="17" />
      </g>
      <g fill="#022c22" opacity="0.85">
        <path d="M92 404 Q150 372 214 396 Q156 408 92 404" />
        <path d="M92 404 Q124 348 176 340 Q140 376 92 404" />
        <path d="M1126 414 Q1070 386 1008 410 Q1066 420 1126 414" />
        <path d="M1126 414 Q1100 356 1052 350 Q1084 386 1126 414" />
      </g>

      {/* ground plane the character stands on */}
      <path d="M0 566 Q300 542 640 560 Q960 578 1200 556 V640 H0 Z" fill="url(#narrGround)" />
      <path d="M0 566 Q300 542 640 560 Q960 578 1200 556" stroke="#10b981" strokeWidth="2" opacity="0.28" fill="none" />

      {/* fireflies */}
      <g className="scene-fly-1" fill="#fde68a">
        <circle cx="322" cy="530" r="3" />
        <circle cx="596" cy="512" r="2.5" />
      </g>
      <g className="scene-fly-2" fill="#a7f3d0">
        <circle cx="452" cy="544" r="2.5" />
        <circle cx="742" cy="520" r="2" />
      </g>

      {/* readable scrim behind the lower third */}
      <rect y="384" width="1200" height="256" fill="url(#narrFog)" opacity="0.35" />
    </svg>
  </div>
);

/**
 * Cosmic space adventure scene backdrop for Kapten Dirgantara:
 * Deep cosmic void, solar corona beacon, orbit trajectory rings, Saturn & distant planets,
 * Garuda Orbital research probe, starfields, and lunar/orbital deck horizon.
 */
const SpaceSceneBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
    <style>{`
      @keyframes spaceTwinkle {
        0%, 100% { opacity: 0.3; transform: scale(0.9); }
        50% { opacity: 0.95; transform: scale(1.15); }
      }
      @keyframes spaceNebulaPulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 0.6; }
      }
      @keyframes probeDrift {
        0% { transform: translate(-20px, 10px) rotate(-1deg); }
        50% { transform: translate(20px, -8px) rotate(1.5deg); }
        100% { transform: translate(-20px, 10px) rotate(-1deg); }
      }
      @keyframes solarGlow {
        0%, 100% { opacity: 0.55; }
        50% { opacity: 0.85; }
      }
      .anim-space-twinkle { animation: spaceTwinkle 3.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      .anim-space-twinkle-fast { animation: spaceTwinkle 2.2s ease-in-out infinite 1.2s; transform-box: fill-box; transform-origin: center; }
      .anim-nebula-pulse { animation: spaceNebulaPulse 9s ease-in-out infinite; }
      .anim-probe { animation: probeDrift 20s ease-in-out infinite; }
      .anim-sun-pulse { animation: solarGlow 6s ease-in-out infinite; }
    `}</style>

    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spaceSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030712" />
          <stop offset="30%" stopColor="#0f172a" />
          <stop offset="65%" stopColor="#1e1b4b" />
          <stop offset="90%" stopColor="#2e1065" />
          <stop offset="100%" stopColor="#090514" />
        </linearGradient>

        <radialGradient id="spaceNebulaViolet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="spaceNebulaCyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="spaceSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#fde047" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="lunarGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="40%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>
      </defs>

      {/* Cosmic void base */}
      <rect width="1200" height="640" fill="url(#spaceSky)" />

      {/* Glowing cosmic nebulae */}
      <g className="anim-nebula-pulse">
        <ellipse cx="320" cy="180" rx="280" ry="160" fill="url(#spaceNebulaViolet)" />
        <ellipse cx="880" cy="240" rx="260" ry="180" fill="url(#spaceNebulaCyan)" />
      </g>

      {/* Solar corona beacon in top-left */}
      <g className="anim-sun-pulse">
        <circle cx="160" cy="100" r="130" fill="url(#spaceSun)" />
        <circle cx="160" cy="100" r="42" fill="#fef08a" />
        <circle cx="160" cy="100" r="34" fill="#ffffff" />
        <g stroke="#fef08a" strokeWidth="1.2" strokeDasharray="6 8" opacity="0.35">
          <line x1="160" y1="100" x2="310" y2="150" />
          <line x1="160" y1="100" x2="250" y2="220" />
          <line x1="160" y1="100" x2="190" y2="250" />
        </g>
      </g>

      {/* Multi-layer twinkling starfield */}
      <g fill="#ffffff" opacity="0.6">
        <circle cx="90" cy="80" r="1" />
        <circle cx="280" cy="60" r="1.2" />
        <circle cx="440" cy="120" r="0.9" />
        <circle cx="580" cy="70" r="1.1" />
        <circle cx="690" cy="150" r="0.8" />
        <circle cx="790" cy="90" r="1.2" />
        <circle cx="1020" cy="60" r="1" />
        <circle cx="1140" cy="140" r="1.1" />
      </g>

      {/* Diamond flare stars */}
      <g className="anim-space-twinkle">
        <g transform="translate(420, 95)">
          <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
        </g>
        <g transform="translate(820, 110)">
          <circle cx="0" cy="0" r="2.4" fill="#ffffff" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#facc15" strokeWidth="1" opacity="0.8" />
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#facc15" strokeWidth="1" opacity="0.8" />
        </g>
      </g>

      {/* Southern Cross (Bintang Pari) Navigation Constellation */}
      <g stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3">
        <line x1="940" y1="90" x2="940" y2="160" />
        <line x1="915" y1="125" x2="965" y2="120" />
        <circle cx="940" cy="90" r="2" fill="#e0f2fe" />
        <circle cx="940" cy="160" r="2" fill="#e0f2fe" />
        <circle cx="915" cy="125" r="1.8" fill="#e0f2fe" />
        <circle cx="965" cy="120" r="1.8" fill="#e0f2fe" />
      </g>

      {/* Concentric orbit lines of solar system */}
      <g stroke="#a78bfa" strokeWidth="1" strokeDasharray="6 8" opacity="0.25" fill="none">
        <ellipse cx="160" cy="100" rx="340" ry="210" transform="rotate(-12 160 100)" />
        <ellipse cx="160" cy="100" rx="520" ry="320" transform="rotate(-12 160 100)" />
        <ellipse cx="160" cy="100" rx="720" ry="440" stroke="#c084fc" strokeWidth="1.2" transform="rotate(-12 160 100)" />
      </g>

      {/* Saturn with tilted ring in midground */}
      <g transform="translate(740, 160) rotate(-16)">
        <ellipse cx="0" cy="0" rx="38" ry="12" fill="none" stroke="#fde047" strokeWidth="4" strokeOpacity="0.4" />
        <circle cx="0" cy="0" r="18" fill="#f59e0b" />
        <line x1="-17" y1="-3" x2="17" y2="-3" stroke="#b45309" strokeWidth="1.5" opacity="0.6" />
        <line x1="-18" y1="3" x2="18" y2="3" stroke="#fef08a" strokeWidth="1.2" opacity="0.7" />
        <path d="M-38 0 C-38 7 38 7 38 0" stroke="#fde047" strokeWidth="4" strokeOpacity="0.85" fill="none" />
      </g>

      {/* Distant Mars reddish sphere */}
      <g transform="translate(490, 220)">
        <circle cx="0" cy="0" r="8" fill="#ef4444" />
        <circle cx="0" cy="0" r="10" fill="none" stroke="#f87171" strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* Wahana Garuda Orbital research satellite in smooth orbital transit */}
      <g className="anim-probe">
        <g transform="translate(560, 130) rotate(12)">
          <path d="M-45 0 C-30 1.5 -18 1 -10 0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" opacity="0.75" />
          <circle cx="-10" cy="0" r="3.5" fill="#38bdf8" opacity="0.8" />
          <rect x="-8" y="-5" width="18" height="10" rx="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
          <rect x="-5" y="-3" width="12" height="6" rx="1" fill="#7c3aed" />
          <rect x="-24" y="-7" width="14" height="14" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="12" y="-7" width="14" height="14" rx="1.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
          <path d="M3 -11 Q8 -13 9 -7" stroke="#facc15" strokeWidth="2" fill="none" />
          <rect x="-2" y="-2" width="6" height="2" fill="#ef4444" />
          <rect x="-2" y="0" width="6" height="2" fill="#ffffff" />
        </g>
      </g>

      {/* Lunar / Orbital Outpost Ground Horizon */}
      <path d="M0 540 Q320 515 640 532 Q960 550 1200 530 V640 H0 Z" fill="url(#lunarGround)" />
      <path d="M0 540 Q320 515 640 532 Q960 550 1200 530" stroke="#a855f7" strokeWidth="2.5" opacity="0.45" fill="none" />
      <path d="M0 541 Q320 516 640 533 Q960 551 1200 531" stroke="#38bdf8" strokeWidth="1" opacity="0.3" fill="none" />

      {/* Orbital runway grid marks */}
      <g stroke="#7c3aed" strokeWidth="1.2" opacity="0.25">
        <line x1="140" y1="565" x2="160" y2="640" />
        <line x1="380" y1="550" x2="410" y2="640" />
        <line x1="680" y1="545" x2="700" y2="640" />
        <line x1="960" y1="555" x2="970" y2="640" />
      </g>

      {/* Readable gradient scrim behind dialogue card */}
      <rect y="380" width="1200" height="260" fill="url(#spaceSky)" opacity="0.55" />
    </svg>
  </div>
);

/**
 * Cleanroom Chemistry Forensic Lab Scene Backdrop for Dr. Maya Arisandi:
 * Cleanroom procedural grid, digital holographic chemical hazard overlays,
 * and reactor conduit perspective lines.
 */
const LabSceneBackdrop: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
    <svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMax slice" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="labNarrBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#042f2e" />
          <stop offset="35%" stopColor="#0f172a" />
          <stop offset="75%" stopColor="#115e59" />
          <stop offset="100%" stopColor="#021c1a" />
        </linearGradient>
      </defs>
      <rect width="1200" height="640" fill="url(#labNarrBg)" />
      {/* Tactical Lab Grid */}
      <path
        d="M0 160 L1200 160 M0 320 L1200 320 M0 480 L1200 480 M200 0 L200 640 M500 0 L500 640 M800 0 L800 640 M1100 0 L1100 640"
        stroke="#14b8a6"
        strokeWidth="0.8"
        strokeDasharray="6 8"
        opacity="0.18"
      />
      {/* Chemical Glow Orb */}
      <circle cx="950" cy="200" r="180" fill="#2dd4bf" opacity="0.1" filter="blur(40px)" />
      <circle cx="250" cy="180" r="120" fill="#06b6d4" opacity="0.08" filter="blur(30px)" />
      {/* Lab Horizon Floor */}
      <path d="M0 530 L1200 530" stroke="#2dd4bf" strokeWidth="2" opacity="0.35" />
      <rect y="530" width="1200" height="110" fill="#021c1a" opacity="0.8" />
      {/* Floor reflection grid */}
      <line x1="200" y1="530" x2="100" y2="640" stroke="#0d9488" strokeWidth="1" opacity="0.3" />
      <line x1="500" y1="530" x2="450" y2="640" stroke="#0d9488" strokeWidth="1" opacity="0.3" />
      <line x1="800" y1="530" x2="850" y2="640" stroke="#0d9488" strokeWidth="1" opacity="0.3" />
      <line x1="1100" y1="530" x2="1200" y2="640" stroke="#0d9488" strokeWidth="1" opacity="0.3" />
      {/* Scrim behind dialogue band */}
      <rect y="380" width="1200" height="260" fill="#042f2e" opacity="0.6" />
    </svg>
  </div>
);

export const NarrativeHookSlide: React.FC<NarrativeHookSlideProps> = ({
  slide,
  mentor,
  themeColor,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const activeMentor = { ...mentor, ...slide.mentorOverride };
  const isKakGalih = activeMentor.name.toLowerCase().includes('galih');
  const isDrMaya =
    activeMentor.name.toLowerCase().includes('maya') ||
    mentor.name.toLowerCase().includes('maya') ||
    themeColor === 'teal';
  const isDirgantara =
    activeMentor.name.toLowerCase().includes('dirgantara') ||
    mentor.name.toLowerCase().includes('dirgantara') ||
    themeColor === 'purple';

  const speakerName = activeMentor.name;
  const speakerRole = activeMentor.role;

  // Typewriter streaming effect for RPG-like narrative immersion
  const fullDialogue = slide.dialogue || '';
  const [displayedChars, setDisplayedChars] = useState<number>(0);

  useEffect(() => {
    setDisplayedChars(0);
    if (!fullDialogue) return;

    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= fullDialogue.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [fullDialogue]);

  const isTyping = displayedChars < fullDialogue.length;
  const currentDialogue = fullDialogue.slice(0, displayedChars);

  const handleSkipTyping = () => {
    if (isTyping) {
      setDisplayedChars(fullDialogue.length);
    }
  };

  /** RPG-style nameplate tab pinned to the top-left of the dialogue band. */
  const renderNameplate = () => {
    if (isDirgantara) {
      return (
        <div className="absolute -top-5 sm:-top-6 left-3 sm:left-5 z-20 inline-flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-700 to-violet-700 border-2 border-cyan-300/90 shadow-[0_6px_0_rgba(30,27,75,0.7)] select-none">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 border border-cyan-200">
            <Rocket size={14} className="fill-slate-950 text-slate-950" />
          </span>
          <span className="font-black text-[12px] sm:text-sm text-white tracking-wide whitespace-nowrap">
            {speakerName}
          </span>
        </div>
      );
    }

    if (isDrMaya) {
      return (
        <div className="absolute -top-5 sm:-top-6 left-3 sm:left-5 z-20 inline-flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-800 via-cyan-700 to-emerald-700 border-2 border-teal-300/90 shadow-[0_6px_0_rgba(15,118,110,0.7)] select-none">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-400 text-slate-950 flex items-center justify-center shrink-0 border border-teal-200">
            <span className="text-xs sm:text-sm">🔬</span>
          </span>
          <span className="font-black text-[12px] sm:text-sm text-white tracking-wide whitespace-nowrap">
            {speakerName}
          </span>
          {speakerRole && (
            <span className="hidden sm:inline text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-teal-200 bg-black/35 px-2 py-0.5 rounded-md border border-teal-400/30 whitespace-nowrap">
              {speakerRole}
            </span>
          )}
        </div>
      );
    }

    if (isKakGalih) {
      return (
        <div className="absolute -top-5 sm:-top-6 left-3 sm:left-5 z-20 inline-flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 border-2 border-amber-300/90 shadow-[0_6px_0_rgba(2,44,34,0.55)] select-none">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-300 text-emerald-950 flex items-center justify-center shrink-0 border border-emerald-900/30">
            <span className="text-xs sm:text-sm">🧭</span>
          </span>
          <span className="font-black text-[12px] sm:text-sm text-white tracking-wide whitespace-nowrap">
            {speakerName}
          </span>
        </div>
      );
    }

    return (
      <div
        className={`absolute -top-5 sm:-top-6 left-3 sm:left-5 z-20 inline-flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r ${theme.gradient} border-2 border-white/90 shadow-md select-none text-white`}
      >
        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0">
          <Compass size={14} />
        </span>
        <span className="font-black text-[12px] sm:text-sm tracking-wide whitespace-nowrap">
          {speakerName}
        </span>
      </div>
    );
  };

  // Outer frame styling based on narrative theme
  const frameClass = isDirgantara
    ? 'border-purple-900/50 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.65)] bg-slate-950'
    : isDrMaya
    ? 'border-teal-900/50 shadow-[0_18px_40px_-12px_rgba(13,148,136,0.65)] bg-slate-950'
    : 'border-emerald-950/40 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)] bg-emerald-950';

  // Title plaque styling
  const plaqueClass = isDirgantara
    ? 'bg-gradient-to-r from-purple-950/95 via-indigo-950/90 to-slate-950/60 border-l-[6px] border-cyan-400'
    : isDrMaya
    ? 'bg-gradient-to-r from-teal-950/95 via-cyan-950/90 to-slate-950/60 border-l-[6px] border-teal-400'
    : 'bg-gradient-to-r from-emerald-950/92 via-emerald-900/88 to-emerald-900/55 border-l-[6px] border-amber-400';

  const subtitleClass = isDirgantara
    ? 'text-cyan-300/95'
    : isDrMaya
    ? 'text-teal-300/95'
    : 'text-amber-300/95';

  // Dialogue box styling
  const dialogueBoxClass = isDirgantara
    ? 'bg-gradient-to-br from-purple-950/95 via-indigo-950/95 to-slate-950/95 border-2 sm:border-[3px] border-cyan-300/80 shadow-[0_12px_30px_rgba(30,27,75,0.7)] text-cyan-50/95'
    : isDrMaya
    ? 'bg-gradient-to-br from-teal-950/95 via-cyan-950/95 to-slate-950/95 border-2 sm:border-[3px] border-teal-300/80 shadow-[0_12px_30px_rgba(15,118,110,0.7)] text-teal-50/95'
    : 'bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-slate-950/95 border-2 sm:border-[3px] border-amber-300/80 shadow-[0_12px_30px_rgba(2,44,34,0.6)] text-amber-50/95';

  const pointerTriangleClass = isDirgantara
    ? 'border-r-purple-950/95'
    : isDrMaya
    ? 'border-r-teal-950/95'
    : 'border-r-emerald-900/95';

  // Quest objective card styling
  const questBoxClass = isDirgantara
    ? 'bg-cyan-400/15 border-2 border-cyan-300/70 border-dashed text-cyan-50'
    : isDrMaya
    ? 'bg-teal-400/15 border-2 border-teal-300/70 border-dashed text-teal-50'
    : 'bg-amber-400/15 border-2 border-amber-300/70 border-dashed text-amber-50';

  const questTagClass = isDirgantara ? 'text-cyan-300/95' : isDrMaya ? 'text-teal-300/95' : 'text-amber-300/90';
  const questIconClass = isDirgantara ? 'text-cyan-300' : isDrMaya ? 'text-teal-300' : 'text-amber-300';
  const cursorBlinkClass = isDirgantara ? 'bg-cyan-400' : isDrMaya ? 'bg-teal-400' : 'bg-amber-400';

  return (
    <div
      className={`relative w-full h-full flex flex-col overflow-hidden rounded-3xl border-4 ${frameClass} animate-in fade-in duration-300`}
    >
      {/* ── DIEGETIC SCENE BACKDROP ─────────────────────── */}
      {isDirgantara ? (
        <SpaceSceneBackdrop />
      ) : isDrMaya ? (
        <LabSceneBackdrop />
      ) : (
        <ForestSceneBackdrop />
      )}

      {/* ── SCENE TITLE PLAQUE ──────────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-3 sm:pt-4 shrink-0">
        <div
          className={`inline-block max-w-[94%] sm:max-w-[78%] rounded-2xl ${plaqueClass} backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-2.5 shadow-xl`}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight drop-shadow">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className={`text-[11px] sm:text-sm font-bold ${subtitleClass} leading-snug mt-0.5`}>
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── STAGE ───────────────────────────────────────── */}
      <div className="relative z-20 flex-1 min-h-0 flex items-end gap-0 sm:gap-2 px-2 sm:px-4 pb-2 sm:pb-4">
        {/* Character anchored to the ground plane */}
        <div className="relative shrink-0 flex items-end justify-center select-none">
          {/* Ground shadow beneath character bust */}
          <div
            className={`absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-3 sm:h-4 rounded-[100%] ${
              isDirgantara
                ? 'bg-purple-950/80 blur-[4px]'
                : isDrMaya
                ? 'bg-teal-950/80 blur-[4px]'
                : 'bg-emerald-950/70 blur-[3px]'
            }`}
          />

          {isDirgantara ? (
            <KaptenDirgantaraAvatar
              size="hero"
              mood="speaking"
              showSpeechBubble={false}
              className="drop-shadow-[0_14px_22px_rgba(46,16,101,0.7)]"
            />
          ) : isDrMaya ? (
            <DrMayaAvatar
              size="hero"
              mood="speaking"
              showSpeechBubble={false}
              className="drop-shadow-[0_14px_22px_rgba(15,118,110,0.7)]"
            />
          ) : isKakGalih ? (
            <KakGalihAvatar
              size="hero"
              mood="speaking"
              showSpeechBubble={false}
              className="drop-shadow-[0_14px_18px_rgba(2,44,34,0.6)]"
            />
          ) : (
            <div
              className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-[28px] bg-gradient-to-br from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-2xl border-4 border-amber-200/90 ring-4 ring-amber-950/40`}
            >
              {activeMentor.avatarEmoji || '🧑‍🏫'}
            </div>
          )}
        </div>

        {/* Diegetic Dialogue & Quest Band */}
        <div className="relative flex-1 min-w-0 max-w-2xl sm:max-w-3xl">
          {renderNameplate()}

          {/* Pointer triangle aimed at the speaker */}
          <div
            className={`hidden sm:block absolute -left-[13px] bottom-9 w-0 h-0 border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-r-[14px] ${pointerTriangleClass}`}
          />

          <div
            onClick={handleSkipTyping}
            title={isTyping ? 'Klik untuk tampilkan semua teks' : undefined}
            className={`relative cursor-pointer rounded-2xl sm:rounded-3xl ${dialogueBoxClass} backdrop-blur-md px-3.5 sm:px-5 md:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 transition-all`}
          >
            <p className="text-[12.5px] sm:text-sm md:text-[15px] lg:text-base font-semibold leading-snug sm:leading-relaxed tracking-tight min-h-[2.5rem]">
              &ldquo;{currentDialogue}&rdquo;
              {isTyping && (
                <span
                  className={`inline-block w-2 sm:w-2.5 h-4 sm:h-4.5 ml-1 ${cursorBlinkClass} animate-pulse align-middle rounded-xs`}
                />
              )}
            </p>

            {/* Quest objective card */}
            {slide.missionObjective && (
              <div
                className={`mt-2.5 sm:mt-3 rounded-xl sm:rounded-2xl ${questBoxClass} px-2.5 sm:px-3 py-2 flex items-start sm:items-center gap-2 sm:gap-2.5`}
              >
                <Target size={16} className={`${questIconClass} shrink-0 mt-0.5 sm:mt-0`} />
                <div className="min-w-0">
                  <div className={`font-black text-[9px] sm:text-[10px] uppercase tracking-[0.18em] ${questTagClass} leading-none`}>
                    Target Misi Utama
                  </div>
                  <div className="font-bold text-[11px] sm:text-[13px] leading-snug mt-0.5">
                    {slide.missionObjective}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
