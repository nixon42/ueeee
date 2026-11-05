import React, { useState } from 'react';
import { X, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Search, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  icon: string;
  found: boolean;
  dialogue: string;
  taskDetail: string;
}

export const PointAndClickModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeDialogue, setActiveDialogue] = useState<string>(
    'Selamat datang di Laboratorium Sains! Misi: Temukan 4 objek tersembunyi dan pecahkan formula netral.'
  );
  const [inspectedItem, setInspectedItem] = useState<string | null>(null);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      id: 'microscope',
      name: 'Mikroskop Elektron',
      x: 25,
      y: 55,
      icon: '🔬',
      found: false,
      dialogue: '🔍 Kamu mengamati preparat sel tumbuhan di mikroskop: Terlihat kloroplas hijau yang bertugas fotosintesis!',
      taskDetail: 'Catatan Kloroplas Terverifikasi',
    },
    {
      id: 'tubes',
      name: 'Rak Tabung Reaksi',
      x: 48,
      y: 48,
      icon: '🧪',
      found: false,
      dialogue: '🧪 Kamu mencampurkan larutan asam (pH rendah) dengan basa terukur. Terjadi reaksi netralisasi!',
      taskDetail: 'Larutan Netral Diformulasikan',
    },
    {
      id: 'journal',
      name: 'Buku Jurnal Peneliti',
      x: 72,
      y: 60,
      icon: '📖',
      found: false,
      dialogue: '📖 Kamu membuka jurnal penelitian: Kode rumus kimia penting tercatat di halaman 42!',
      taskDetail: 'Rumus Rahasia Terpecahkan',
    },
    {
      id: 'crystals',
      name: 'Sampel Kristal Mineral',
      x: 82,
      y: 35,
      icon: '💎',
      found: false,
      dialogue: '💎 Kristal kuarsa alami! Struktur atomnya tersusun sangat rapi dan berkilau terkena cahaya.',
      taskDetail: 'Struktur Kristal Dianalisis',
    },
  ]);

  if (!isOpen) return null;

  const foundCount = hotspots.filter(h => h.found).length;

  const handleHotspotClick = (hotspot: Hotspot) => {
    sound.playClick();
    setInspectedItem(hotspot.name);
    setActiveDialogue(hotspot.dialogue);

    if (!hotspot.found) {
      sound.playCorrect();
      const updated = hotspots.map(h =>
        h.id === hotspot.id ? { ...h, found: true } : h
      );
      setHotspots(updated);

      if (updated.filter(h => h.found).length === 4) {
        setTimeout(() => {
          setHasWon(true);
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
          });
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setHotspots(hotspots.map(h => ({ ...h, found: false })));
    setInspectedItem(null);
    setHasWon(false);
    setActiveDialogue('Misi dimulai ulang. Cari dan klik 4 objek sains di dalam ruangan!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-teal-100 flex flex-col">
        {/* Header Canva Style */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-md font-black text-xl">
              🔍
            </div>
            <div>
              <h3 className="font-extrabold text-lg md:text-xl text-slate-800">
                Point & Click: Misteri Lab Sains
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Eksplorasi Interaktif Ruang Lab • Gratis Tanpa Perlu Login
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(sound.toggleSound())}
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition"
              title="Toggle Suara"
            >
              {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={resetGame}
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition"
              title="Reset Permainan"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {/* Virtual Scene Canvas */}
          <div className="flex-1 flex flex-col">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-teal-200/80 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 shadow-inner group">
              {/* Lab Room Illustration Background (SVG Visual Scene) */}
              <div className="absolute inset-0 opacity-80 pointer-events-none">
                {/* Lab Shelves & Windows */}
                <div className="absolute top-4 left-6 right-6 h-14 border-b border-teal-500/30 flex justify-between px-4 items-center">
                  <div className="w-20 h-10 bg-teal-400/10 border border-teal-400/20 rounded flex items-center justify-center text-[11px] text-teal-300">
                    Jendela Lab
                  </div>
                  <div className="flex gap-2">
                    <span className="w-4 h-8 bg-amber-400/40 rounded-sm"></span>
                    <span className="w-4 h-8 bg-cyan-400/40 rounded-sm"></span>
                    <span className="w-4 h-8 bg-emerald-400/40 rounded-sm"></span>
                  </div>
                </div>

                {/* Lab Desk Surface */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-800 to-slate-800/60 border-t-2 border-teal-500/40"></div>
              </div>

              {/* Clickable Hotspots */}
              {hotspots.map(h => (
                <button
                  key={h.id}
                  onClick={() => handleHotspotClick(h)}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center text-2xl shadow-lg cursor-pointer ${
                    h.found
                      ? 'bg-emerald-500/20 border-2 border-emerald-400 text-white scale-95 opacity-80'
                      : 'bg-white/90 hover:bg-white border-2 border-teal-400 hover:scale-125 animate-bounce shadow-teal-500/30'
                  }`}
                  title={h.name}
                >
                  {h.icon}
                  {h.found && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5">
                      <CheckCircle2 size={12} />
                    </span>
                  )}
                </button>
              ))}

              {/* Visual Hint Indicator */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-teal-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Search size={14} />
                <span>Klik objek mencurigakan di dalam laboratorium</span>
              </div>
            </div>

            {/* Dialogue / Inspection Box */}
            <div className="mt-4 p-4 bg-teal-50/70 border border-teal-200 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow">
                💬
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-0.5">
                  {inspectedItem ? `Pemeriksaan: ${inspectedItem}` : 'Jurnal Lab Sains'}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {activeDialogue}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Jurnal & Misi */}
          <div className="w-full md:w-72 flex flex-col justify-between space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target Misi
                </span>
                <span className="text-xs font-black text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                  {foundCount} / 4 Ditemukan
                </span>
              </div>

              {/* Checklist Objek */}
              <div className="space-y-2">
                {hotspots.map(h => (
                  <div
                    key={h.id}
                    onClick={() => handleHotspotClick(h)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                      h.found
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{h.icon}</span>
                      <span className="font-semibold">{h.name}</span>
                    </div>
                    {h.found ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">Cari</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Victory Card */}
            {hasWon ? (
              <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-white p-4 rounded-2xl shadow-lg space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-sm">
                  <Trophy size={20} className="text-yellow-300" />
                  Misi Lab Selesai!
                </div>
                <p className="text-xs text-teal-100 leading-relaxed">
                  Kamu berhasil menganalisis seluruh elemen sains di laboratorium!
                </p>
                <button
                  onClick={resetGame}
                  className="w-full py-2.5 bg-white text-teal-800 font-extrabold text-xs rounded-xl hover:bg-teal-50 transition shadow"
                >
                  Eksplorasi Ulang
                </button>
              </div>
            ) : (
              <div className="p-4 bg-teal-50 border border-teal-200/80 rounded-2xl text-xs text-teal-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-teal-600" />
                  Tips Eksplorasi:
                </div>
                <p className="text-[11px] text-slate-600">
                  Arahkan kursor dan klik pada tabung reaksi, mikroskop, atau buku catatan untuk memicu dialog sains.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
