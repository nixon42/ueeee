import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, CheckCircle2, Compass, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';
import { KakGalihAvatar } from './characters/KakGalihAvatar';
import { DrMayaAvatar } from './characters/DrMayaAvatar';
import { TgcSequenceCard } from './TgcSequenceCard';

export interface SequenceItem {
  id: string;
  order: number; // Correct 1-based order
  label: string;
  iconEmoji: string;
  description?: string;
}

export type SequenceTheme = 'amber' | 'emerald' | 'purple' | 'blue' | 'indigo' | 'rose' | 'teal' | 'orange';

export interface CanvaSequenceGameProps {
  title?: string;
  subtitle?: string; // Backward compatibility alias for instructions
  instructions?: string;
  chapterBadge?: string;
  gameId?: string;
  items: SequenceItem[];
  onComplete?: (isAllCorrect: boolean) => void;
  theme?: SequenceTheme;
  className?: string;
}

/**
 * Komponen Game Interaktif Canva Education: "Sequence / Put the steps in order"
 * Disempurnakan dengan standar Chess.com Engine:
 * 1. Pointer Events asli (setPointerCapture) untuk mouse & touchscreen tanpa ghosting native.
 * 2. Strict Boundary Clamping: Kartu mustahil diseret keluar batas arena canvas.
 * 3. Animasi Merapat & Preview Gap: Kartu lain bergeser dinamis membuka slot preview kosong.
 * 4. Desain Kartu TCG Mewah: Tanpa header angka, tanpa grip dots, tanpa tombol panah geser.
 * 5. Tap-to-Swap Mode: Klik kartu A lalu klik kartu B untuk bertukar posisi secara instan.
 */
export const CanvaSequenceGame: React.FC<CanvaSequenceGameProps> = ({
  title = 'Urutkan Langkah-Langkah Berikut',
  subtitle,
  instructions,
  chapterBadge,
  gameId,
  items: initialItems,
  onComplete,
  theme = 'amber',
  className = '',
}) => {
  const displayInstructions = instructions || subtitle || 'Seret kartu ke posisi yang tepat atau ketuk dua kartu untuk bertukar posisi.';
  const isPurple = theme === 'purple' || gameId === 'ular-tangga-tatasurya';

  // Acak urutan awal saat pertama kali dimuat atau saat initialItems berganti
  const [currentOrder, setCurrentOrder] = useState<SequenceItem[]>(() => {
    return [...initialItems].sort(() => Math.random() - 0.5);
  });
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Chess.com-style Pointer Drag Engine States
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [hoverSlotIndex, setHoverSlotIndex] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // For tap-to-swap

  // DOM Refs for strict bounding clamping and slot alignment
  const arenaRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragPointerOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardSizeRef = useRef<{ width: number; height: number }>({ width: 200, height: 300 });

  const isWaterCycle = initialItems?.some(item =>
    item.label?.toLowerCase().includes('evaporasi') ||
    item.id?.toLowerCase().includes('evaporasi')
  );

  const isScientificMethod = initialItems?.some(item =>
    item.label?.toLowerCase().includes('observasi') ||
    item.id?.toLowerCase().includes('observasi') ||
    item.label?.toLowerCase().includes('hipotesis') ||
    item.id?.toLowerCase().includes('metode')
  );

  // Sinkronisasi bila props items berganti dinamis dari slide deck
  useEffect(() => {
    setCurrentOrder([...initialItems].sort(() => Math.random() - 0.5));
    setCheckedState(false);
    setIsSuccess(false);
    setShowExplanation(false);
    setSelectedIdx(null);
  }, [initialItems]);

  // Pointer Down Handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    if (e.button !== 0) return; // Only primary button
    if (!arenaRef.current) return;

    // Tap-to-Swap Mode check: if clicked without dragging far
    dragStartPointerPosRef.current = { x: e.clientX, y: e.clientY };

    const arenaRect = arenaRef.current.getBoundingClientRect();
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      const cardRect = cardEl.getBoundingClientRect();
      cardSizeRef.current = { width: cardRect.width, height: cardRect.height };
      dragPointerOffsetRef.current = {
        x: e.clientX - cardRect.left,
        y: e.clientY - cardRect.top,
      };

      setDragPos({
        x: cardRect.left - arenaRect.left,
        y: cardRect.top - arenaRect.top,
      });
    }

    setDraggingIdx(index);
    setHoverSlotIndex(index);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    sound.playClick();
  };

  // Pointer Move Handler (Strict Clamping Inside Arena)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingIdx === null || !arenaRef.current) return;

    const arenaRect = arenaRef.current.getBoundingClientRect();
    const cardWidth = cardSizeRef.current.width;
    const cardHeight = cardSizeRef.current.height;

    // Strict boundary clamping
    const rawX = e.clientX - arenaRect.left - dragPointerOffsetRef.current.x;
    const rawY = e.clientY - arenaRect.top - dragPointerOffsetRef.current.y;
    const clampedX = Math.max(0, Math.min(arenaRect.width - cardWidth, rawX));
    const clampedY = Math.max(0, Math.min(arenaRect.height - cardHeight, rawY));

    setDragPos({ x: clampedX, y: clampedY });

    // Hitung slot hover berdasarkan koordinat kursor pointer
    let closestIndex = draggingIdx;
    let minDistance = Infinity;

    slotRefs.current.forEach((slotEl, idx) => {
      if (!slotEl) return;
      const slotRect = slotEl.getBoundingClientRect();
      const slotCenterX = slotRect.left + slotRect.width / 2;
      const slotCenterY = slotRect.top + slotRect.height / 2;

      const dist = Math.hypot(e.clientX - slotCenterX, e.clientY - slotCenterY);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== hoverSlotIndex) {
      setHoverSlotIndex(closestIndex);
      sound.playStep();
    }
  };

  // Pointer Up Handler (Snap to slot with sound)
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingIdx === null) return;

    const movedDist = Math.hypot(
      e.clientX - dragStartPointerPosRef.current.x,
      e.clientY - dragStartPointerPosRef.current.y
    );

    // If barely moved (< 8px), treat as a Tap-to-Swap selection
    if (movedDist < 8) {
      if (selectedIdx === null) {
        setSelectedIdx(draggingIdx);
        sound.playClick();
      } else if (selectedIdx === draggingIdx) {
        setSelectedIdx(null); // Deselect
        sound.playClick();
      } else {
        // Swap selectedIdx and draggingIdx
        const updated = [...currentOrder];
        const temp = updated[selectedIdx];
        updated[selectedIdx] = updated[draggingIdx];
        updated[draggingIdx] = temp;
        setCurrentOrder(updated);
        setSelectedIdx(null);
        setCheckedState(false);
        sound.playChessSuccess();
      }
      setDraggingIdx(null);
      setHoverSlotIndex(null);
      return;
    }

    // Drag release to reorder
    if (hoverSlotIndex !== null && hoverSlotIndex !== draggingIdx) {
      const updated = [...currentOrder];
      const [removed] = updated.splice(draggingIdx, 1);
      updated.splice(hoverSlotIndex, 0, removed);
      setCurrentOrder(updated);
      setCheckedState(false);
      sound.playChessSuccess();
    } else {
      sound.playChessMove();
    }

    setDraggingIdx(null);
    setHoverSlotIndex(null);
  };

  // Hitung perkiraan jarak antar slot untuk animasi pergeseran merapat
  const getSlotStep = () => {
    if (slotRefs.current[0] && slotRefs.current[1]) {
      const rect0 = slotRefs.current[0].getBoundingClientRect();
      const rect1 = slotRefs.current[1].getBoundingClientRect();
      return Math.abs(rect1.left - rect0.left);
    }
    return 210;
  };

  // Tombol acak ulang (Shuffle)
  const handleShuffle = () => {
    sound.playClick();
    setCurrentOrder([...currentOrder].sort(() => Math.random() - 0.5));
    setCheckedState(false);
    setIsSuccess(false);
    setShowExplanation(false);
    setSelectedIdx(null);
  };

  // Periksa urutan (Check my order)
  const handleCheckOrder = () => {
    let allCorrect = true;
    currentOrder.forEach((item, idx) => {
      if (item.order !== idx + 1) {
        allCorrect = false;
      }
    });

    setCheckedState(true);
    setIsSuccess(allCorrect);

    if (allCorrect) {
      sound.playCorrect();
      setShowExplanation(true);
    } else {
      sound.playWrong();
    }

    if (onComplete) {
      onComplete(allCorrect);
    }
  };

  const stepDistance = getSlotStep();

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border-4 ${
        isPurple
          ? 'border-purple-900/40 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.55)]'
          : 'border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)]'
      } select-none animate-in fade-in duration-300 ${className}`}
    >
      {/* ── COCKPIT HUD TOP BAR ───────────────────────────── */}
      <div className="relative z-20 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
        <div
          className={`inline-block max-w-[75%] sm:max-w-[80%] rounded-2xl ${
            isPurple
              ? 'bg-gradient-to-r from-purple-950/95 via-indigo-900/90 to-slate-950/55 border-l-[6px] border-cyan-400'
              : 'bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-900/55 border-l-[6px] border-amber-400'
          } backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-1.5 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase ${
                isPurple ? 'bg-cyan-400 text-slate-950' : 'bg-amber-400 text-emerald-950'
              }`}
            >
              {chapterBadge || 'TANTANGAN URUTAN'}
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
              {title}
            </h2>
          </div>
          {displayInstructions && (
            <p
              className={`text-[10.5px] sm:text-xs font-bold leading-snug mt-0.5 truncate hidden sm:block ${
                isPurple ? 'text-cyan-300/95' : 'text-amber-300/95'
              }`}
            >
              {displayInstructions}
            </p>
          )}
        </div>

        {/* Status Badge Counter on Right */}
        <div className="shrink-0 flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl border backdrop-blur-sm text-xs font-black flex items-center gap-1.5 shadow-md ${
              checkedState
                ? isSuccess
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : isPurple
                ? 'bg-purple-900/60 border-purple-500/40 text-cyan-200'
                : 'bg-emerald-900/60 border-emerald-500/40 text-amber-200'
            }`}
          >
            <Sparkles size={13} className={isSuccess ? 'text-emerald-400' : isPurple ? 'text-cyan-400' : 'text-amber-400'} />
            <span>
              {checkedState
                ? isSuccess
                  ? 'Urutan 100% Sempurna!'
                  : 'Perlu Penyesuaian'
                : `${currentOrder.length} Tahap Siklus`}
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN DRAG ARENA (STRICT BOUNDARY CLAMPING) ─────── */}
      <div
        ref={arenaRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative z-10 w-full flex-1 min-h-0 px-3 sm:px-5 py-2 flex items-center justify-center select-none touch-none overflow-hidden my-auto"
      >
        {/* Horizontal Card Slots Grid */}
        <div
          className={`grid ${
            currentOrder.length <= 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : currentOrder.length <= 6
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'
              : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
          } gap-2.5 sm:gap-3.5 w-full max-w-5xl h-full items-stretch relative`}
        >
          {currentOrder.map((item, index) => {
            const isBeingDragged = draggingIdx === index;
            const isCorrectPosition = checkedState && item.order === index + 1;
            const isWrongPosition = checkedState && item.order !== index + 1;

            // Merapat Shift Calculation:
            let shiftX = 0;
            if (draggingIdx !== null && hoverSlotIndex !== null) {
              if (hoverSlotIndex > draggingIdx) {
                // Dragged card moved right; items in between slide LEFT
                if (index > draggingIdx && index <= hoverSlotIndex) {
                  shiftX = -stepDistance;
                }
              } else if (hoverSlotIndex < draggingIdx) {
                // Dragged card moved left; items in between slide RIGHT
                if (index >= hoverSlotIndex && index < draggingIdx) {
                  shiftX = stepDistance;
                }
              }
            }

            return (
              <div
                key={`slot-${index}`}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                className="relative w-full h-full flex flex-col items-center justify-between min-h-0"
              >
                {/* Target Slot Plaque Header */}
                <div className="w-full flex items-center justify-between px-2 py-0.5 mb-1 pointer-events-none shrink-0">
                  <span
                    className={`text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider ${
                      isPurple ? 'text-cyan-300/80' : 'text-amber-300/80'
                    }`}
                  >
                    Tahap {index + 1}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPurple ? 'bg-cyan-400/60' : 'bg-amber-400/60'
                    }`}
                  />
                </div>

                {/* Preview Ghost Slot: Appears at hover target slot showing where card will land */}
                {draggingIdx !== null && hoverSlotIndex === index && (
                  <div
                    className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-dashed ${
                      isPurple
                        ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200'
                        : 'border-amber-400 bg-amber-400/15 text-amber-200'
                    } flex flex-col items-center justify-center p-3 animate-pulse pointer-events-none z-10 shadow-inner`}
                  >
                    <Sparkles size={24} className="mb-1 animate-spin text-amber-300" style={{ animationDuration: '4s' }} />
                    <span className="text-xs font-black tracking-wider text-center uppercase">
                      Letakkan di Sini
                    </span>
                  </div>
                )}

                {/* Non-dragged Card with smooth shift merapat animation */}
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  style={{
                    transform: `translate3d(${shiftX}px, 0, 0)`,
                    transition: isBeingDragged ? 'none' : 'transform 220ms cubic-bezier(0.2, 0, 0, 1)',
                    willChange: 'transform',
                    visibility: isBeingDragged ? 'hidden' : 'visible',
                    width: '100%',
                    height: '100%',
                  }}
                  className="w-full h-full flex-1 min-h-0"
                >
                  <TgcSequenceCard
                    item={item}
                    index={index}
                    isSelected={selectedIdx === index}
                    isCorrectPosition={isCorrectPosition}
                    isWrongPosition={isWrongPosition}
                    theme={theme}
                    onPointerDown={(e) => handlePointerDown(e, index)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated 60 FPS Elevated Dragged Card Floating in Real-time (Clamped to Arena) */}
        {draggingIdx !== null && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: cardSizeRef.current.width,
              height: cardSizeRef.current.height,
              transform: `translate3d(${dragPos.x}px, ${dragPos.y}px, 0) scale(1.06) rotate(1.5deg)`,
              zIndex: 50,
              pointerEvents: 'none',
              willChange: 'transform',
              transition: 'none',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
            }}
          >
            <TgcSequenceCard
              item={currentOrder[draggingIdx]}
              index={draggingIdx}
              isDragging={true}
              theme={theme}
            />
          </div>
        )}
      </div>

      {/* ── ACTION CONTROLS & HUD DOCK (MIN 48PX FAT BUTTONS) ─── */}
      <div className="relative z-20 px-3 sm:px-5 py-2 shrink-0 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-800/40">
        {/* Left: Optional brief status prompt or hint */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-200/80">
          <span>💡 <em>Tips: Geser atau ketuk dua kartu untuk menukar urutan.</em></span>
        </div>

        {/* Center / Right: Arcade Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto w-full sm:w-auto justify-end">
          {/* Tombol Shuffle */}
          <button
            type="button"
            onClick={handleShuffle}
            className="min-h-[46px] sm:min-h-[48px] px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-200 border-2 border-amber-400/40 shadow-[0_3px_0_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw size={15} />
            <span>Acak Ulang</span>
          </button>

          {/* Tombol Check Order */}
          <button
            type="button"
            onClick={handleCheckOrder}
            className={`min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 rounded-xl sm:rounded-2xl ${
              isPurple
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 border-2 border-cyan-200 shadow-[0_4px_0_#0891b2] hover:shadow-[0_4px_16px_rgba(6,182,212,0.6)]'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-2 border-amber-300 shadow-[0_4px_0_#b45309] hover:shadow-[0_4px_16px_rgba(251,191,36,0.6)]'
            } active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all`}
          >
            <CheckCircle2 size={16} />
            <span>Periksa Urutan</span>
          </button>

          {/* Tombol Toggle Penjelasan Kak Galih / Dr. Maya */}
          {(isWaterCycle || isScientificMethod) && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowExplanation((prev) => !prev);
              }}
              className="min-h-[46px] sm:min-h-[48px] px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 border-2 border-emerald-400/50 shadow-[0_3px_0_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Compass size={15} className="text-amber-300" />
              <span className="hidden sm:inline">
                {showExplanation
                  ? 'Tutup Catatan'
                  : isScientificMethod
                  ? 'Protokol Dr. Maya'
                  : 'Catatan Kak Galih'}
              </span>
              <span className="sm:hidden">Catatan</span>
              {showExplanation ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          )}
        </div>
      </div>

      {/* ── PANEL PENJELASAN DR. MAYA: 5 LANGKAH METODE ILMIAH ─── */}
      {showExplanation && isScientificMethod && (
        <div className="absolute inset-2 sm:inset-3 z-50 bg-slate-950/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-teal-400/60 p-3.5 sm:p-5 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
          {/* Header Penjelasan dengan Avatar Dr. Maya & Tombol Tutup */}
          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-teal-400/30 shrink-0">
            <div className="flex items-center gap-3">
              <DrMayaAvatar size="sm" mood="explaining" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-400">
                    Protokol Investigasi Forensik
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-200 border border-teal-400/40 text-[9.5px] font-extrabold">
                    Arahan Dr. Maya Arisandi
                  </span>
                </div>
                <h4 className="text-xs sm:text-base font-black text-white mt-0.5">
                  5 Siklus Baku Metode Ilmiah Pemecahan Kasus Reaktor
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="py-1 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-200 border border-teal-400/40 font-bold text-xs flex items-center gap-1 cursor-pointer transition shrink-0 active:scale-95 shadow-sm"
            >
              <span>✕ Tutup</span>
            </button>
          </div>

          {/* 5 Kolom Ringkas Metode Ilmiah */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-1 min-h-0 py-2 my-auto overflow-hidden">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-teal-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">🔍</span>
                <h5 className="font-extrabold text-xs text-teal-300">1. Observasi</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-teal-50/90 leading-relaxed font-medium">
                Mencatat fakta empiris anomali reaktor: perubahan warna, bau uap, dan suhu cairan.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-amber-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">❓</span>
                <h5 className="font-extrabold text-xs text-amber-300">2. Masalah</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-amber-50/90 leading-relaxed font-medium">
                Merumuskan pertanyaan spesifik: apa zat pemicu lonjakan asam drastis pada Unit 04?
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-purple-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">💡</span>
                <h5 className="font-extrabold text-xs text-purple-300">3. Hipotesis</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-purple-50/90 leading-relaxed font-medium">
                Dugaan ilmiah sementara yang dapat diuji: kebocoran katalis asam memicu reaksi eksotermik.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-rose-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">🧪</span>
                <h5 className="font-extrabold text-xs text-rose-300">4. Eksperimen</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-rose-50/90 leading-relaxed font-medium">
                Menguji hipotesis dengan variabel terkontrol, lakmus, dan titrasi penetralan terukur.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-sky-400/30 flex flex-col justify-between overflow-hidden col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">📊</span>
                <h5 className="font-extrabold text-xs text-sky-300">5. Kesimpulan</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-sky-50/90 leading-relaxed font-medium">
                Menarik konklusi objektif: hipotesis terbukti benar, data siap dilaporkan ke dewan lab.
              </p>
            </div>
          </div>

          {/* Catatan Forensik Dr. Maya */}
          <div className="p-2 bg-teal-950/80 border border-teal-400/40 rounded-xl flex items-center gap-2 text-[10.5px] sm:text-xs text-teal-200 font-semibold shrink-0">
            <span className="text-base shrink-0">🔬</span>
            <div className="truncate">
              <strong>Pesan Dr. Maya:</strong> Jangan pernah menarik kesimpulan hanya dari asumsi! Setiap temuan wajib didukung data eksperimental terverifikasi.
            </div>
          </div>
        </div>
      )}

      {/* ── PANEL PENJELASAN KAK GALIH (DARK RPG CODEX OVERLAY) ─── */}
      {showExplanation && isWaterCycle && (
        <div className="absolute inset-2 sm:inset-3 z-50 bg-slate-950/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-amber-400/60 p-3.5 sm:p-5 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
          {/* Header Penjelasan dengan Avatar Kak Galih & Tombol Tutup */}
          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-amber-400/30 shrink-0">
            <div className="flex items-center gap-3">
              <KakGalihAvatar size="sm" mood="explaining" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-400">
                    CODEX KUNCI SAINS
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 text-[9.5px] font-extrabold">
                    Catatan Ekspedisi
                  </span>
                </div>
                <h4 className="text-xs sm:text-base font-black text-white mt-0.5">
                  Misteri Daur Air Lembah Cendrawasih Terpecahkan!
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="py-1 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-200 border border-amber-400/40 font-bold text-xs flex items-center gap-1 cursor-pointer transition shrink-0 active:scale-95 shadow-sm"
            >
              <span>✕ Tutup</span>
            </button>
          </div>

          {/* 4 Kolom Penjelasan Detail: Evaporasi, Kondensasi, Presipitasi, Infiltrasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0 py-2 overflow-hidden content-center">
            {/* 1. EVAPORASI */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-amber-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">☀️</span>
                <h5 className="font-extrabold text-xs text-amber-300">1. Evaporasi (Penguapan)</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-amber-50/90 leading-relaxed font-medium">
                <strong>Mekanisme:</strong> Kalor surya menguapkan air laut, danau, dan sungai ke atmosfer. Tumbuhan juga melepas uap air lewat stomata (<em>transpirasi</em>).
              </p>
            </div>

            {/* 2. KONDENSASI */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-sky-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">☁️</span>
                <h5 className="font-extrabold text-xs text-sky-300">2. Kondensasi (Pengembunan)</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-amber-50/90 leading-relaxed font-medium">
                <strong>Mekanisme:</strong> Uap air naik ke atmosfer dingin, suhunya turun hingga memadat menjadi kristal cair pembentuk awan tebal.
              </p>
            </div>

            {/* 3. PRESIPITASI */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-blue-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">🌧️</span>
                <h5 className="font-extrabold text-xs text-blue-300">3. Presipitasi (Hujan)</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-amber-50/90 leading-relaxed font-medium">
                <strong>Mekanisme:</strong> Massa air di awan melampaui daya apung udara. Gravitasi menarik butiran air jatuh membasahi daratan.
              </p>
            </div>

            {/* 4. INFILTRASI */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-emerald-400/30 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base select-none">🌱</span>
                <h5 className="font-extrabold text-xs text-emerald-300">4. Infiltrasi (Resapan)</h5>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] text-amber-50/90 leading-relaxed font-medium">
                <strong>Mekanisme:</strong> Air hujan diserap pori-pori tanah berkat akar hutan tropis, tersaring alami mengisi cadangan akuifer air tanah.
              </p>
            </div>
          </div>

          {/* Catatan Konservasi Kak Galih */}
          <div className="p-2 bg-emerald-950/80 border border-emerald-400/40 rounded-xl flex items-center gap-2 text-[10.5px] sm:text-xs text-emerald-200 font-semibold shrink-0">
            <span className="text-base shrink-0">💡</span>
            <div className="truncate">
              <strong>Prinsip Lapangan:</strong> Hutan bertindak sebagai spons raksasa alami penahan banjir dan penyedia air bersih abadi.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
