import React from 'react';
import { Compass, Target, Radio } from 'lucide-react';
import { NarrativeIntroSlide, PresentationMentor } from '@/types/presentation';
import { PRESENTATION_THEMES, PresentationThemeKey } from '@/lib/presentation-themes';
import { KakGalihAvatar } from '../characters/KakGalihAvatar';

export interface NarrativeHookSlideProps {
  slide: NarrativeIntroSlide;
  mentor: PresentationMentor;
  themeColor: PresentationThemeKey;
  onNext?: () => void;
}

/**
 * Diegetic adventure scene backdrop: layered sky, ridgelines, forest silhouettes,
 * mist bands and a ground plane. Drawn behind the character so the slide reads as a
 * stage/cutscene instead of a text page.
 */
const SceneBackdrop: React.FC<{ accent: string }> = () => (
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

export const NarrativeHookSlide: React.FC<NarrativeHookSlideProps> = ({
  slide,
  mentor,
  themeColor,
}) => {
  const theme = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const activeMentor = { ...mentor, ...slide.mentorOverride };
  const isKakGalih = activeMentor.name.toLowerCase().includes('galih');

  const speakerName = activeMentor.name;
  const speakerRole = activeMentor.role;

  /** RPG-style nameplate tab pinned to the top-left of the dialogue band. */
  const nameplate = (withEmoji: boolean) => (
    <div className="absolute -top-5 sm:-top-6 left-3 sm:left-5 z-20 inline-flex items-center gap-2 sm:gap-2.5 pl-2.5 sm:pl-3 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 border-2 border-amber-300/90 shadow-[0_6px_0_rgba(2,44,34,0.55)] select-none">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-300 text-emerald-950 flex items-center justify-center shrink-0 border border-emerald-900/30">
        {withEmoji ? <span className="text-xs sm:text-sm">🧭</span> : <Compass size={14} className="text-emerald-900" />}
      </span>
      <span className="font-black text-[11px] sm:text-sm text-white tracking-wide whitespace-nowrap">{speakerName}</span>
      <span className="hidden sm:inline text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 bg-amber-300/90 px-2 py-0.5 rounded-md whitespace-nowrap">
        {speakerRole}
      </span>
    </div>
  );

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-3xl border-4 border-emerald-950/40 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)] animate-in fade-in duration-300">
      <SceneBackdrop accent={theme.textPrimary} />

      {/* ── MISSION HUD BAR ─────────────────────────────── */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-2.5 sm:px-4 pt-2.5 sm:pt-3 shrink-0">
        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-950/80 border-2 border-amber-400/70 backdrop-blur-sm pl-1.5 pr-3 py-1 shadow-lg">
          <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-emerald-950 font-black text-[10px] sm:text-[11px] tracking-widest uppercase">
            Misi
          </span>
          <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider text-amber-100">
            {slide.chapterBadge || 'BABAK 1: PANGGILAN PENJELAJAH ALAM'}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/50 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
          <Radio size={12} className="text-emerald-300 animate-pulse" />
          <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-200">
            Ekspedisi Aktif
          </span>
        </div>
      </div>

      {/* ── SCENE TITLE PLAQUE ──────────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2 sm:pt-3 shrink-0">
        <div className="inline-block max-w-[94%] sm:max-w-[78%] rounded-2xl bg-gradient-to-r from-emerald-950/92 via-emerald-900/88 to-emerald-900/55 border-l-[6px] border-amber-400 backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-2.5 shadow-xl">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight drop-shadow">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-[11px] sm:text-sm font-bold text-amber-300/95 leading-snug mt-0.5">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── STAGE ───────────────────────────────────────── */}
      <div className="relative z-20 flex-1 min-h-0 flex items-end gap-0 sm:gap-2 px-2 sm:px-4 pb-2 sm:pb-4">
        {/* Character anchored to the ground plane */}
        <div className="relative shrink-0 flex items-end justify-center select-none">
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-3 sm:h-4 rounded-[100%] bg-emerald-950/70 blur-[3px]" />
          {isKakGalih ? (
            <KakGalihAvatar
              size="hero"
              mood="speaking"
              showSpeechBubble={false}
              className="drop-shadow-[0_14px_18px_rgba(2,44,34,0.6)]"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-[28px] bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-4xl sm:text-5xl md:text-6xl shadow-2xl border-4 border-amber-300/90 ring-4 ring-emerald-950/40 mb-1">
              {activeMentor.avatarEmoji || '🧑‍🏫'}
            </div>
          )}
        </div>

        {/* Dialogue band */}
        <div className="relative flex-1 min-w-0 mb-6 sm:mb-9 ml-[-10px] sm:ml-0 max-w-3xl">
          {nameplate(isKakGalih)}

          {/* pointer triangle aimed at the speaker */}
          <div className="hidden sm:block absolute -left-[13px] bottom-9 w-0 h-0 border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-r-[14px] border-r-emerald-900/95" />

          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-slate-950/95 border-2 sm:border-[3px] border-amber-300/80 shadow-[0_12px_30px_rgba(2,44,34,0.6)] backdrop-blur-md px-3.5 sm:px-5 md:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4">
            <p className="text-[12.5px] sm:text-sm md:text-[15px] lg:text-base font-semibold leading-snug sm:leading-relaxed text-amber-50/95 tracking-tight">
              &ldquo;{slide.dialogue}&rdquo;
            </p>

            {/* Quest objective card */}
            {slide.missionObjective && (
              <div className="mt-2.5 sm:mt-3.5 rounded-xl sm:rounded-2xl bg-amber-400/15 border-2 border-amber-300/70 border-dashed px-2.5 sm:px-3 py-2 flex items-start sm:items-center gap-2 sm:gap-2.5">
                <Target size={16} className="text-amber-300 shrink-0 mt-0.5 sm:mt-0" />
                <div className="min-w-0">
                  <div className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-amber-300/90 leading-none">
                    Target Misi Utama
                  </div>
                  <div className="font-bold text-[11px] sm:text-[13px] text-amber-50 leading-snug mt-0.5">
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
