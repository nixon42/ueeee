import React, { useState } from 'react';
import { 
  X, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, 
  Search, Trophy, Backpack, HelpCircle, Check, AlertCircle, ChevronRight, Eye 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { POINT_CLICK_SCENES } from '@/data/point-click-scenes';
import { PointAndClickHotspot, PointAndClickScene } from '@/types/game';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultSceneId?: string;
}

export const PointAndClickModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultSceneId = 'lab-sains',
}) => {
  const [selectedSceneId, setSelectedSceneId] = useState<string>(defaultSceneId);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [inventory, setInventory] = useState<{ id: string; name: string; icon: string; description: string }[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<PointAndClickHotspot | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [showDiagramModal, setShowDiagramModal] = useState<boolean>(false);
  const [activePuzzle, setActivePuzzle] = useState<{
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
    hotspotId: string;
  } | null>(null);
  const [puzzleFeedback, setPuzzleFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isSceneFinished, setIsSceneFinished] = useState<boolean>(false);

  // Find active scene
  const currentScene: PointAndClickScene = 
    POINT_CLICK_SCENES.find(s => s.id === selectedSceneId) || POINT_CLICK_SCENES[0];

  if (!isOpen) return null;

  const foundCount = currentScene.hotspots.filter(h => discoveredIds.includes(h.id)).length;

  const handleHotspotClick = (h: PointAndClickHotspot) => {
    sound.playClick();
    setActiveHotspot(h);

    // Jika ada puzzle dan belum terpecahkan
    if (h.puzzle && !discoveredIds.includes(h.id)) {
      setActivePuzzle({
        ...h.puzzle,
        hotspotId: h.id,
      });
      return;
    }

    unlockHotspot(h);
  };

  const unlockHotspot = (h: PointAndClickHotspot) => {
    if (!discoveredIds.includes(h.id)) {
      sound.playCorrect();
      const updated = [...discoveredIds, h.id];
      setDiscoveredIds(updated);

      if (h.itemReward && !inventory.some(item => item.id === h.itemReward!.id)) {
        setInventory(prev => [...prev, h.itemReward!]);
      }

      // Cek apakah semua hotspot pada scene ini sudah ditemukan
      const allFound = currentScene.hotspots.every(spot => updated.includes(spot.id));
      if (allFound) {
        setTimeout(() => {
          setIsSceneFinished(true);
          confetti({
            particleCount: 160,
            spread: 90,
            origin: { y: 0.6 },
          });
        }, 800);
      }
    }
  };

  const handleAnswerPuzzle = (optionIdx: number) => {
    if (!activePuzzle) return;
    const isCorrect = optionIdx === activePuzzle.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      setPuzzleFeedback({
        isCorrect: true,
        text: 'Luar biasa, jawabanmu tepat! Objek berhasil dianalisis.',
      });

      setTimeout(() => {
        const spot = currentScene.hotspots.find(h => h.id === activePuzzle.hotspotId);
        if (spot) unlockHotspot(spot);
        setPuzzleFeedback(null);
        setActivePuzzle(null);
      }, 1500);
    } else {
      sound.playWrong();
      setPuzzleFeedback({
        isCorrect: false,
        text: `Jawaban kurang tepat. Petunjuk: ${activePuzzle.hint}`,
      });

      setTimeout(() => {
        setPuzzleFeedback(null);
      }, 2000);
    }
  };

  const switchScene = (sceneId: string) => {
    setSelectedSceneId(sceneId);
    setActiveHotspot(null);
    setActivePuzzle(null);
    setPuzzleFeedback(null);
    setShowDiagramModal(false);
    setIsSceneFinished(false);
  };

  const resetCurrentScene = () => {
    setDiscoveredIds(prev => prev.filter(id => !currentScene.hotspots.some(h => h.id === id)));
    setActiveHotspot(null);
    setActivePuzzle(null);
    setShowDiagramModal(false);
    setIsSceneFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-teal-100 flex flex-col">
        {/* Header Modal Canva-Style */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-md font-black text-xl">
              🔍
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                {currentScene.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {currentScene.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(sound.toggleSound())}
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition"
              title="Toggle Suara"
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={resetCurrentScene}
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition"
              title="Reset Scene Ini"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scene Selection Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Pilih Lokasi:
          </span>
          {POINT_CLICK_SCENES.map(scene => (
            <button
              key={scene.id}
              onClick={() => switchScene(scene.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition shrink-0 flex items-center gap-1.5 ${
                selectedSceneId === scene.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'
              }`}
            >
              <span>{scene.theme === 'lab' ? '🧪' : scene.theme === 'candi' ? '🗿' : '🌿'}</span>
              <span>{scene.title.split(':')[1]?.trim() || scene.title}</span>
            </button>
          ))}
        </div>

        {/* Main Workspace */}
        <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
          {/* Interactive Visual Canvas */}
          <div className="flex-1 flex flex-col space-y-4">
            <div className={`relative w-full aspect-video rounded-3xl overflow-hidden border-2 shadow-inner group ${
              currentScene.theme === 'lab'
                ? 'border-teal-300 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900'
                : currentScene.theme === 'candi'
                ? 'border-amber-300 bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950'
                : 'border-emerald-300 bg-gradient-to-b from-emerald-950 via-teal-950 to-green-950'
            }`}>
              {/* Theme Decorative Atmosphere Layers */}
              {currentScene.theme === 'lab' && (
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute top-4 left-8 right-8 h-12 border-b border-teal-500/30 flex justify-between items-center px-4">
                    <span className="text-[11px] text-teal-300 font-mono tracking-wider">LAB UNIT 04 • STERILE</span>
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-800 to-transparent border-t border-teal-500/20"></div>
                </div>
              )}

              {currentScene.theme === 'candi' && (
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="absolute bottom-4 left-10 text-amber-200/40 font-mono text-xs">
                    RELIEF CANDI BOROBUDUR • BATU ANDESIT
                  </div>
                </div>
              )}

              {currentScene.theme === 'hutan' && (
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-10 text-emerald-200/40 font-mono text-xs">
                    BIODIVERSITAS TROPIS INDONESIA • GARIS WALLACE
                  </div>
                </div>
              )}

              {/* Clickable Hotspot Pins */}
              {currentScene.hotspots.map(h => {
                const isFound = discoveredIds.includes(h.id);
                return (
                  <button
                    key={h.id}
                    onClick={() => handleHotspotClick(h)}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center text-xl sm:text-2xl shadow-xl cursor-pointer ${
                      isFound
                        ? 'bg-emerald-500/30 border-2 border-emerald-400 text-white scale-95 opacity-90'
                        : 'bg-white hover:bg-white border-2 border-white/80 hover:scale-115 active:scale-95 shadow-teal-500/40 animate-soft-pulse'
                    }`}
                    title={h.name}
                  >
                    <span>{h.itemReward?.icon || '⭐'}</span>
                    {isFound && (
                      <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5 shadow">
                        <CheckCircle2 size={13} />
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Hint badge */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Search size={13} className="text-teal-400" />
                <span>Klik objek yang berkilau untuk menganalisis</span>
              </div>
            </div>

            {/* Mentor Dialogue & Fact Panel */}
            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-3xl flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 text-xl font-bold shadow-md">
                {currentScene.theme === 'lab' ? '🔬' : currentScene.theme === 'candi' ? '📜' : '🌿'}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-teal-800 uppercase tracking-wider">
                      {currentScene.mentorName} ({currentScene.mentorRole})
                    </span>
                    {activeHotspot && (
                      <span className="text-xs font-semibold text-teal-700">
                        • {activeHotspot.name}
                      </span>
                    )}
                  </div>

                  {activeHotspot && (
                    <button
                      onClick={() => setShowDiagramModal(true)}
                      className="px-2.5 py-1 bg-white hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <Eye size={13} />
                      <span>Lihat Diagram Ilmiah</span>
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeHotspot ? activeHotspot.dialogue : currentScene.missionDescription}
                </p>

                {activeHotspot && (
                  <div className="mt-2.5 pt-2 border-t border-teal-200/80 text-xs text-teal-950 font-semibold flex items-center gap-1.5">
                    <Sparkles size={14} className="text-teal-600 shrink-0" />
                    <span>Fakta Edukasi: {activeHotspot.educationalFact}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Checklist & Inventory Drawer */}
          <div className="w-full lg:w-80 flex flex-col justify-between space-y-4">
            {/* Mission Checklist */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Target Eksplorasi
                </span>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-lg">
                  {foundCount} / {currentScene.hotspots.length} Ditemukan
                </span>
              </div>

              <div className="space-y-2">
                {currentScene.hotspots.map(h => {
                  const isFound = discoveredIds.includes(h.id);
                  return (
                    <div
                      key={h.id}
                      onClick={() => handleHotspotClick(h)}
                      className={`p-2.5 rounded-2xl border text-xs flex items-center justify-between cursor-pointer transition ${
                        isFound
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{h.itemReward?.icon || '🔍'}</span>
                        <span className="font-bold">{h.name}</span>
                      </div>
                      {isFound ? (
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-teal-600 font-extrabold flex items-center gap-0.5">
                          Temukan <ChevronRight size={12} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inventory Bag */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Backpack size={14} className="text-purple-600" />
                  Tas Ekspedisi Siswa
                </span>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-lg">
                  {inventory.length} Item
                </span>
              </div>

              {inventory.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic text-center py-2">
                  Belum ada item yang dikoleksi. Eksplorasi objek untuk mendapatkan artefak!
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {inventory.map(item => (
                    <div
                      key={item.id}
                      className="p-2 bg-purple-50/70 border border-purple-200 rounded-2xl text-center flex flex-col items-center group relative cursor-pointer hover:scale-105 transition"
                      title={`${item.name}: ${item.description}`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[9px] font-bold text-slate-700 mt-1 line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Victory Scene Banner */}
            {isSceneFinished && (
              <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-white p-4 rounded-3xl shadow-lg space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-black text-sm">
                  <Trophy size={18} className="text-yellow-300" />
                  Ekspedisi Lokasi Selesai!
                </div>
                <p className="text-xs text-teal-100 leading-relaxed font-medium">
                  Selamat! Kamu telah menguasai seluruh wawasan di lokasi ini. Coba jelajahi lokasi lainnya!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Diagram Ilmiah Interaktif */}
        {showDiagramModal && activeHotspot && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm z-40 flex items-center justify-center p-4 rounded-3xl animate-fadeIn">
            <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl border border-teal-200 space-y-4 animate-scaleUp">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeHotspot.itemReward?.icon || '🔬'}</span>
                  <div>
                    <h4 className="font-black text-base text-slate-800">
                      Diagram Visual: {activeHotspot.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {activeHotspot.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDiagramModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Render Diagram Content based on Hotspot */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {activeHotspot.educationalFact}
                </p>

                <div className="p-3 bg-teal-50 text-teal-900 rounded-xl text-xs font-semibold border border-teal-200/80">
                  <span className="font-bold">Artefak Terkait: </span>
                  {activeHotspot.itemReward?.name} — {activeHotspot.itemReward?.description}
                </div>
              </div>

              <button
                onClick={() => setShowDiagramModal(false)}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl transition"
              >
                Kembali ke Eksplorasi
              </button>
            </div>
          </div>
        )}

        {/* Modal Tantangan Teka-Teki Hotspot */}
        {activePuzzle && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-30 flex items-center justify-center p-4 rounded-3xl animate-fadeIn">
            <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl border border-teal-200 space-y-4 animate-scaleUp">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-1 rounded-lg w-fit">
                <HelpCircle size={14} /> Tantangan Analisis Objek
              </div>

              <h4 className="font-extrabold text-base text-slate-800 leading-snug">
                {activePuzzle.question}
              </h4>

              {puzzleFeedback && (
                <div className={`p-3 rounded-2xl text-xs font-bold flex items-start gap-2 animate-fadeIn ${
                  puzzleFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}>
                  {puzzleFeedback.isCorrect ? (
                    <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <p>{puzzleFeedback.text}</p>
                </div>
              )}

              <div className="space-y-2">
                {activePuzzle.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={!!puzzleFeedback}
                    onClick={() => handleAnswerPuzzle(idx)}
                    className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-xs sm:text-sm font-semibold text-slate-700 transition"
                  >
                    <span className="font-bold text-teal-600 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
