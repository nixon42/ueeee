import React, { useState } from 'react';
import { Sparkles, Zap, Feather, Compass, Play, Volume2, VolumeX, Music } from 'lucide-react';
import { CharacterId } from './types';
import { CHARACTERS, CHARACTER_LIST } from './characters';
import { marioAudio } from './audio';

interface Props {
  selectedId: CharacterId;
  onSelect: (charId: CharacterId) => void;
  onStartGame: () => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<Props> = ({
  selectedId,
  onSelect,
  onStartGame,
  onClose,
}) => {
  const [currentId, setCurrentId] = useState<CharacterId>(selectedId);
  const [soundOn, setSoundOn] = useState<boolean>(!marioAudio.isMuted());
  const [musicOn, setMusicOn] = useState<boolean>(marioAudio.isMusicOn());

  const selectedChar = CHARACTERS[currentId];

  const handleSelectChar = (id: CharacterId) => {
    setCurrentId(id);
    onSelect(id);
    marioAudio.playCoin();
  };

  const handleStart = () => {
    marioAudio.playPowerUp();
    if (musicOn) {
      marioAudio.startBgm();
    }
    onStartGame();
  };

  const toggleSound = () => {
    const s = marioAudio.toggleSound();
    setSoundOn(s);
  };

  const toggleMusic = () => {
    const m = marioAudio.toggleMusic();
    setMusicOn(m);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100 p-4 sm:p-6 select-none animate-in fade-in duration-300">
      {/* Background Floating Decorative Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-8 left-12 w-32 h-14 bg-white/80 rounded-full blur-[1px] shadow-sm animate-pulse" />
        <div className="absolute top-16 right-20 w-44 h-16 bg-white/70 rounded-full blur-[1px] shadow-sm" />
        <div className="absolute top-36 left-1/3 w-36 h-14 bg-white/60 rounded-full blur-[1px] shadow-sm" />
      </div>

      {/* ── HEADER TITLE BAR ──────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between gap-3 bg-white/85 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-4 border-amber-300 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-white flex items-center justify-center text-white shadow-md">
            <Sparkles size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-sm">
                Bahasa Indonesia SMP Kelas 7
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                Materi Teks Deskripsi
              </span>
            </div>
            <h1 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-sm">
              Pilih Tokoh Petualang Kebahasaan 🍄
            </h1>
          </div>
        </div>

        {/* Audio Toggles & Close Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMusic}
            title={musicOn ? 'Matikan Musik' : 'Nyalakan Musik'}
            className={`p-2 rounded-xl border-2 transition-all cursor-pointer ${
              musicOn
                ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md'
                : 'bg-white/80 border-slate-300 text-slate-400'
            }`}
          >
            <Music size={16} />
          </button>
          <button
            type="button"
            onClick={toggleSound}
            title={soundOn ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
            className={`p-2 rounded-xl border-2 transition-all cursor-pointer ${
              soundOn
                ? 'bg-emerald-400 border-emerald-500 text-slate-950 shadow-md'
                : 'bg-white/80 border-slate-300 text-slate-400'
            }`}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-black shadow-md transition-all cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>

      {/* ── 3 CHARACTER SELECTION CARDS ───────────────────── */}
      <div className="relative z-10 flex-1 min-h-0 my-3 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 overflow-y-auto p-1">
        {CHARACTER_LIST.map((char) => {
          const isSelected = char.id === currentId;
          const icon =
            char.id === 'rian' ? (
              <Zap size={16} />
            ) : char.id === 'maya' ? (
              <Feather size={16} />
            ) : (
              <Compass size={16} />
            );

          return (
            <div
              key={char.id}
              onClick={() => handleSelectChar(char.id)}
              className={`relative rounded-3xl border-4 p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-white border-amber-400 shadow-[0_12px_28px_rgba(245,158,11,0.35)] scale-[1.02] ring-4 ring-amber-300/60'
                  : 'bg-white/85 border-white hover:bg-white hover:border-slate-300 shadow-md opacity-90 hover:opacity-100 hover:scale-[1.01]'
              }`}
            >
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${char.badgeColor}`}
                >
                  {icon}
                  <span>{char.badge}</span>
                </span>
                {isSelected && (
                  <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest border border-amber-500 animate-bounce">
                    Dipilih ⭐
                  </span>
                )}
              </div>

              {/* Character Avatar Stage Graphic */}
              <div className="my-2 flex flex-col items-center justify-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-slate-100 to-sky-100 border-2 border-slate-200 flex items-center justify-center shadow-inner overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at center, ' + char.themeColor + ' 2px, transparent 2px)',
                      backgroundSize: '12px 12px',
                    }}
                  />
                  {/* Custom Character Sprite Vector */}
                  {char.id === 'rian' ? (
                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
                      {/* Red Cap */}
                      <ellipse cx="50" cy="28" rx="26" ry="14" fill="#e11d48" />
                      <path d="M42 22 Q58 20 74 25" stroke="#ffffff" strokeWidth="3" fill="none" />
                      <ellipse cx="68" cy="32" rx="14" ry="4" fill="#be123c" />
                      {/* Face */}
                      <circle cx="50" cy="45" r="19" fill="#fed7aa" />
                      {/* Magnifying Monocle on Forehead */}
                      <circle cx="42" cy="34" r="7" fill="#38bdf8" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1.5" />
                      <line x1="47" y1="39" x2="52" y2="44" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                      {/* Eyes */}
                      <circle cx="44" cy="44" r="2.5" fill="#1e293b" />
                      <circle cx="56" cy="44" r="2.5" fill="#1e293b" />
                      {/* Smile */}
                      <path d="M46 53 Q50 57 54 53" stroke="#9a3412" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      {/* Red Explorer Vest */}
                      <path d="M30 64 L70 64 L74 95 L26 95 Z" fill="#e11d48" />
                      <rect x="44" y="64" width="12" height="31" fill="#f8fafc" />
                      {/* Adventure Badge */}
                      <circle cx="38" cy="74" r="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                    </svg>
                  ) : char.id === 'maya' ? (
                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
                      {/* Purple Beret */}
                      <ellipse cx="50" cy="26" rx="26" ry="12" fill="#9333ea" />
                      <circle cx="50" cy="14" r="3" fill="#7e22ce" />
                      {/* Hair Braids */}
                      <path d="M28 35 Q22 55 24 75" stroke="#451a03" strokeWidth="5" fill="none" strokeLinecap="round" />
                      <path d="M72 35 Q78 55 76 75" stroke="#451a03" strokeWidth="5" fill="none" strokeLinecap="round" />
                      {/* Face */}
                      <circle cx="50" cy="45" r="19" fill="#fde68a" />
                      {/* Eyes */}
                      <circle cx="44" cy="44" r="2.5" fill="#1e293b" />
                      <circle cx="56" cy="44" r="2.5" fill="#1e293b" />
                      <path d="M42 40 Q45 38 48 40" stroke="#78350f" strokeWidth="1.2" fill="none" />
                      <path d="M52 40 Q55 38 58 40" stroke="#78350f" strokeWidth="1.2" fill="none" />
                      {/* Smile */}
                      <path d="M46 54 Q50 58 54 54" stroke="#9a3412" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                      {/* Cyan Scarf */}
                      <path d="M32 62 Q50 68 68 62 L64 74 L36 74 Z" fill="#06b6d4" />
                      <path d="M60 68 Q68 76 65 92" stroke="#0891b2" strokeWidth="4" fill="none" strokeLinecap="round" />
                      {/* Purple Robe */}
                      <path d="M30 72 L70 72 L74 95 L26 95 Z" fill="#7e22ce" />
                      {/* Golden Feather Quill in hand */}
                      <path d="M72 75 Q85 62 88 52 Q82 65 72 75" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-md">
                      {/* Yellow Explorer Helmet */}
                      <path d="M26 34 Q50 16 74 34 L78 40 L22 40 Z" fill="#eab308" />
                      <ellipse cx="50" cy="39" rx="28" ry="5" fill="#ca8a04" />
                      <circle cx="50" cy="26" r="4" fill="#a16207" />
                      {/* Face */}
                      <circle cx="50" cy="47" r="19" fill="#fed7aa" />
                      {/* Eyes */}
                      <circle cx="43" cy="46" r="2.5" fill="#1e293b" />
                      <circle cx="57" cy="46" r="2.5" fill="#1e293b" />
                      {/* Smile */}
                      <path d="M45 56 Q50 61 55 56" stroke="#9a3412" strokeWidth="2" fill="none" strokeLinecap="round" />
                      {/* Emerald Safari Jacket */}
                      <path d="M28 66 L72 66 L76 95 L24 95 Z" fill="#059669" />
                      <rect x="45" y="66" width="10" height="29" fill="#d97706" />
                      {/* Utility Pockets */}
                      <rect x="32" y="74" width="10" height="10" rx="2" fill="#047857" />
                      <rect x="58" y="74" width="10" height="10" rx="2" fill="#047857" />
                    </svg>
                  )}
                </div>

                {/* Name & Nickname */}
                <h3 className="font-black text-sm sm:text-base text-slate-900 mt-2 text-center leading-tight">
                  {char.name}
                </h3>
                <span className="text-[11px] font-bold text-slate-500">
                  &ldquo;{char.nickname}&rdquo;
                </span>
              </div>

              {/* Special Ability Pill */}
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-2.5 shadow-sm my-1.5">
                <div className="flex items-center gap-1.5 text-amber-900 font-black text-[11px] mb-0.5">
                  <Sparkles size={12} className="text-amber-500 shrink-0" />
                  <span>Keahlian Khusus:</span>
                </div>
                <p className="text-[10.5px] sm:text-[11px] font-semibold text-slate-700 leading-snug">
                  {char.specialAbility}
                </p>
                <p className="text-[9.5px] text-slate-500 leading-tight mt-1">
                  {char.abilityDetail}
                </p>
              </div>

              {/* Mini Stat Bars */}
              <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span>Kecepatan Lari</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-3.5 h-1.5 rounded-full ${
                          s <= char.stats.speed ? 'bg-rose-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span>Daya Lompat</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-3.5 h-1.5 rounded-full ${
                          s <= char.stats.jump ? 'bg-purple-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                  <span>Teknik Bahasa</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-3.5 h-1.5 rounded-full ${
                          s <= char.stats.technique ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FOOTER CONTROLS & START BUTTON ────────────────── */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl border-4 border-amber-300 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm font-black text-slate-800">
            Karakter Aktif: <span className="text-rose-600">{selectedChar.name}</span> ({selectedChar.title})
          </p>
          <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
            Tekan [A] [D] / Tombol Panah untuk lari, [W] / [Spasi] untuk melompat, seruduk balok [?] dari bawah!
          </p>
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base border-2 border-emerald-200 shadow-[0_6px_0_#065f46] hover:shadow-[0_6px_16px_rgba(16,185,129,0.5)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2.5 cursor-pointer transition-all"
        >
          <Play size={20} className="fill-slate-950" />
          <span>Mulai Petualangan Mario!</span>
        </button>
      </div>
    </div>
  );
};
