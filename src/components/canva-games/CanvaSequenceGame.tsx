import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle, Compass, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
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
  items: SequenceItem[];
  onComplete?: (isAllCorrect: boolean) => void;
  theme?: SequenceTheme;
  className?: string;
}

const THEME_STYLES: Record<SequenceTheme, {
  container: string;
  badge: string;
  checkBtn: string;
  cardHover: string;
}> = {
  amber: {
    container: 'bg-amber-50/40 border-amber-200/80',
    badge: 'text-amber-700 bg-amber-100',
    checkBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200 border-amber-500',
    cardHover: 'hover:border-amber-400',
  },
  emerald: {
    container: 'bg-emerald-50/40 border-emerald-200/80',
    badge: 'text-emerald-700 bg-emerald-100',
    checkBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 border-emerald-500',
    cardHover: 'hover:border-emerald-400',
  },
  purple: {
    container: 'bg-purple-50/40 border-purple-200/80',
    badge: 'text-purple-700 bg-purple-100',
    checkBtn: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 border-purple-500',
    cardHover: 'hover:border-purple-400',
  },
  blue: {
    container: 'bg-blue-50/40 border-blue-200/80',
    badge: 'text-blue-700 bg-blue-100',
    checkBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 border-blue-500',
    cardHover: 'hover:border-blue-400',
  },
  indigo: {
    container: 'bg-indigo-50/40 border-indigo-200/80',
    badge: 'text-indigo-700 bg-indigo-100',
    checkBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 border-indigo-500',
    cardHover: 'hover:border-indigo-400',
  },
  rose: {
    container: 'bg-rose-50/40 border-rose-200/80',
    badge: 'text-rose-700 bg-rose-100',
    checkBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 border-rose-500',
    cardHover: 'hover:border-rose-400',
  },
  teal: {
    container: 'bg-teal-50/40 border-teal-200/80',
    badge: 'text-teal-700 bg-teal-100',
    checkBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200 border-teal-500',
    cardHover: 'hover:border-teal-400',
  },
  orange: {
    container: 'bg-orange-50/40 border-orange-200/80',
    badge: 'text-orange-700 bg-orange-100',
    checkBtn: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200 border-orange-500',
    cardHover: 'hover:border-orange-400',
  },
};

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
  items: initialItems,
  onComplete,
  theme = 'amber',
  className = '',
}) => {
  const displayInstructions = instructions || subtitle || 'Seret kartu ke posisi yang tepat atau ketuk dua kartu untuk bertukar posisi.';
  const themeStyle = THEME_STYLES[theme] || THEME_STYLES.amber;

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

    const targetCard = cardRefs.current[index];
    if (!targetCard) return;

    // Capture pointer on arena container so drag flows continuously even with fast sweeps
    try {
      arenaRef.current.setPointerCapture(e.pointerId);
    } catch {}

    const arenaRect = arenaRef.current.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();

    dragPointerOffsetRef.current = {
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top,
    };

    const initialX = cardRect.left - arenaRect.left;
    const initialY = cardRect.top - arenaRect.top;

    dragStartPointerPosRef.current = { x: e.clientX, y: e.clientY };
    cardSizeRef.current = { width: cardRect.width, height: cardRect.height };

    setDraggingIdx(index);
    setHoverSlotIndex(index);
    setDragPos({ x: initialX, y: initialY });
  };

  // Pointer Move Handler with STRICT CANVAS CLAMPING
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingIdx === null || !arenaRef.current) return;

    const arenaRect = arenaRef.current.getBoundingClientRect();
    const cardWidth = cardSizeRef.current.width;
    const cardHeight = cardSizeRef.current.height;

    // Unclamped new coordinates in arena space
    const rawX = e.clientX - arenaRect.left - dragPointerOffsetRef.current.x;
    const rawY = e.clientY - arenaRect.top - dragPointerOffsetRef.current.y;

    // HARD BOUNDARY CLAMPING: Card CANNOT be dragged outside arena canvas!
    const minX = 0;
    const maxX = Math.max(0, arenaRect.width - cardWidth);
    const minY = 0;
    const maxY = Math.max(0, arenaRect.height - cardHeight);

    const clampedX = Math.max(minX, Math.min(maxX, rawX));
    const clampedY = Math.max(minY, Math.min(maxY, rawY));

    setDragPos({ x: clampedX, y: clampedY });

    // Detect which slot the dragged card's horizontal center is closest to
    const draggedCenterX = clampedX + cardWidth / 2;
    let closestSlot = 0;
    let minDistance = Infinity;

    slotRefs.current.forEach((slotEl, sIdx) => {
      if (!slotEl) return;
      const slotRect = slotEl.getBoundingClientRect();
      const slotCenterX = slotRect.left - arenaRect.left + slotRect.width / 2;
      const dist = Math.abs(draggedCenterX - slotCenterX);
      if (dist < minDistance) {
        minDistance = dist;
        closestSlot = sIdx;
      }
    });

    if (closestSlot !== hoverSlotIndex) {
      sound.playClick();
      setHoverSlotIndex(closestSlot);
    }
  };

  // Pointer Up Handler: Drop & Reorder or Tap-to-Swap
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingIdx === null) return;

    try {
      if (arenaRef.current && arenaRef.current.hasPointerCapture(e.pointerId)) {
        arenaRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {}

    const dx = Math.abs(e.clientX - dragStartPointerPosRef.current.x);
    const dy = Math.abs(e.clientY - dragStartPointerPosRef.current.y);
    const isClick = dx < 6 && dy < 6;

    if (isClick) {
      // Tap-to-Swap Mode (Alternative for accessibility & smartboards)
      if (selectedIdx === null) {
        setSelectedIdx(draggingIdx);
        sound.playClick();
      } else if (selectedIdx === draggingIdx) {
        setSelectedIdx(null);
      } else {
        // Swap selectedIdx and draggingIdx
        sound.playClick();
        setCurrentOrder((prev) => {
          const next = [...prev];
          const temp = next[selectedIdx];
          next[selectedIdx] = next[draggingIdx];
          next[draggingIdx] = temp;
          return next;
        });
        setSelectedIdx(null);
        setCheckedState(false);
      }
    } else {
      // Genuine Drag-and-Drop Drop Trigger
      if (hoverSlotIndex !== null && hoverSlotIndex !== draggingIdx) {
        sound.playClick();
        setCurrentOrder((prev) => {
          const next = [...prev];
          const [moved] = next.splice(draggingIdx, 1);
          next.splice(hoverSlotIndex, 0, moved);
          return next;
        });
        setCheckedState(false);
      }
    }

    setDraggingIdx(null);
    setHoverSlotIndex(null);
  };

  // Helper to compute slot shift distance
  const getSlotStep = () => {
    if (slotRefs.current[1] && slotRefs.current[0]) {
      return slotRefs.current[1].offsetLeft - slotRefs.current[0].offsetLeft;
    }
    return (arenaRef.current?.offsetWidth || 800) / currentOrder.length;
  };

  // Acak ulang (Shuffle)
  const handleShuffle = () => {
    sound.playClick();
    setCurrentOrder([...initialItems].sort(() => Math.random() - 0.5));
    setCheckedState(false);
    setIsSuccess(false);
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
      className={`w-full h-full flex flex-col items-center justify-between relative overflow-hidden select-none ${className}`}
    >
      {/* Header Tantangan Canva */}
      <div className="text-center max-w-2xl shrink-0 mb-1 sm:mb-2">
        <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">{displayInstructions}</p>
      </div>

      {/* Main Drag Arena (Clamped to Canvas Bounds) */}
      <div
        ref={arenaRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full flex-1 min-h-[280px] sm:min-h-[330px] md:min-h-[350px] flex items-center justify-center select-none touch-none overflow-hidden my-auto"
      >
        {/* Horizontal Card Slots Grid */}
        <div
          className={`grid ${
            currentOrder.length <= 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : currentOrder.length <= 6
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'
              : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
          } gap-3 sm:gap-4 w-full max-w-4xl h-full items-stretch relative`}
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
                className="relative w-full h-full flex flex-col items-center justify-center min-h-0"
              >
                {/* Preview Ghost Slot: Appears at hover target slot showing where card will land */}
                {draggingIdx !== null && hoverSlotIndex === index && (
                  <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-emerald-400 bg-emerald-500/10 flex flex-col items-center justify-center p-3 animate-pulse pointer-events-none z-10 shadow-inner">
                    <Sparkles size={24} className="text-emerald-600 mb-1 animate-spin" style={{ animationDuration: '4s' }} />
                    <span className="text-xs font-black text-emerald-950 tracking-wider text-center uppercase">
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
                  className="w-full h-full"
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
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
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

      {/* Validation Result Toast Indicator */}
      {checkedState && (
        <div
          className={`w-full max-w-md my-2 p-2.5 rounded-2xl border text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shrink-0 animate-in fade-in duration-200 ${
            isSuccess
              ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-sm'
              : 'bg-rose-100 border-rose-300 text-rose-900 shadow-sm'
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
              <span>Hebat! Seluruh urutan tahapan sudah 100% tepat!</span>
            </>
          ) : (
            <>
              <AlertCircle size={18} className="text-rose-700 shrink-0" />
              <span>Ada langkah yang belum tepat. Coba seret kartu yang berbingkai merah!</span>
            </>
          )}
        </div>
      )}

      {/* Action Buttons: Chunky Tablet Buttons (Min 48px Height) */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 w-full max-w-lg justify-center mt-2">
        {/* Tombol Shuffle */}
        <button
          type="button"
          onClick={handleShuffle}
          className="h-11 sm:h-12 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition"
        >
          <RotateCcw size={16} />
          <span>Acak Ulang</span>
        </button>

        {/* Tombol Check Order */}
        <button
          type="button"
          onClick={handleCheckOrder}
          className={`h-11 sm:h-12 px-6 rounded-2xl ${themeStyle.checkBtn} font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 shadow-md hover:shadow-lg cursor-pointer active:scale-95 transition`}
        >
          <CheckCircle2 size={18} />
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
            className={`h-11 sm:h-12 px-4 rounded-2xl ${
              isScientificMethod
                ? 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-2 border-teal-300'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
            } font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95`}
          >
            <Compass size={16} className={isScientificMethod ? 'text-teal-700' : 'text-emerald-700'} />
            <span>
              {showExplanation
                ? 'Tutup Protokol'
                : isScientificMethod
                ? 'Protokol Dr. Maya'
                : 'Penjelasan Kak Galih'}
            </span>
            {showExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>

      {/* PANEL PENJELASAN DR. MAYA: 5 LANGKAH METODE ILMIAH */}
      {showExplanation && isScientificMethod && (
        <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-teal-400 p-3 sm:p-5 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
          {/* Header Penjelasan dengan Avatar Dr. Maya & Tombol Tutup */}
          <div className="flex items-center justify-between gap-3 pb-2 sm:pb-3 border-b border-teal-100 shrink-0">
            <div className="flex items-center gap-3">
              <DrMayaAvatar size="sm" mood="explaining" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-teal-700">
                    Protokol Investigasi Forensik
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[9px] sm:text-[10px] font-extrabold">
                    Arahan Dr. Maya Arisandi
                  </span>
                </div>
                <h4 className="text-xs sm:text-base font-black text-slate-900 mt-0.5">
                  5 Siklus Baku Metode Ilmiah Pemecahan Kasus Reaktor
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer transition shrink-0"
            >
              <span>✕ Tutup</span>
            </button>
          </div>

          {/* 5 Kolom Ringkas Metode Ilmiah */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-1 min-h-0 py-2 my-auto overflow-hidden">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-teal-50/80 border border-teal-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">🔍</span>
                <h5 className="font-extrabold text-[11px] sm:text-xs text-teal-900 leading-tight">1. Observasi</h5>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-700 leading-snug font-medium">
                Mencatat fakta empiris anomali reaktor: perubahan warna, bau uap, dan suhu cairan.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">❓</span>
                <h5 className="font-extrabold text-[11px] sm:text-xs text-amber-900 leading-tight">2. Masalah</h5>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-700 leading-snug font-medium">
                Merumuskan pertanyaan spesifik: apa zat pemicu lonjakan asam drastis pada Unit 04?
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-2xl bg-purple-50/80 border border-purple-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">💡</span>
                <h5 className="font-extrabold text-[11px] sm:text-xs text-purple-900 leading-tight">3. Hipotesis</h5>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-700 leading-snug font-medium">
                Dugaan ilmiah sementara yang dapat diuji: kebocoran katalis asam memicu reaksi eksotermik.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-2xl bg-rose-50/80 border border-rose-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">🧪</span>
                <h5 className="font-extrabold text-[11px] sm:text-xs text-rose-900 leading-tight">4. Eksperimen</h5>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-700 leading-snug font-medium">
                Menguji hipotesis dengan variabel terkontrol, lakmus, dan titrasi penetralan terukur.
              </p>
            </div>

            <div className="p-2 sm:p-2.5 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-2xs flex flex-col justify-between overflow-hidden col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">📊</span>
                <h5 className="font-extrabold text-[11px] sm:text-xs text-blue-900 leading-tight">5. Kesimpulan</h5>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-700 leading-snug font-medium">
                Menarik konklusi objektif: hipotesis terbukti benar, data siap dilaporkan ke dewan lab.
              </p>
            </div>
          </div>

          {/* Catatan Forensik Dr. Maya */}
          <div className="p-2 sm:p-2.5 bg-teal-100/70 border border-teal-300/80 rounded-xl flex items-center gap-2 text-[11px] sm:text-xs text-teal-950 font-medium shrink-0">
            <span className="text-base shrink-0">🔬</span>
            <div className="line-clamp-2">
              <strong>Pesan Dr. Maya:</strong> Jangan pernah menarik kesimpulan hanya dari asumsi mata telanjang! Setiap temuan wajib didukung data eksperimental yang terverifikasi dan reproduktif.
            </div>
          </div>
        </div>
      )}

      {/* PANEL PENJELASAN KAK GALIH: KONDENSASI, EVAPORASI, PRESIPITASI, INFILTRASI (MODAL OVERLAY TANPA OVERFLOW) */}
      {showExplanation && isWaterCycle && (
        <div className="absolute inset-0 z-50 bg-white/98 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-emerald-300 p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
          {/* Header Penjelasan dengan Avatar Kak Galih & Tombol Tutup */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-100 shrink-0">
            <div className="flex items-center gap-3">
              <KakGalihAvatar size="sm" mood="explaining" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                    Ulasan Konsep Kunci Sains
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Kak Galih Menjelaskan
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                  Misteri Daur Air Lembah Cendrawasih Terpecahkan!
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer transition shrink-0"
            >
              <span>✕ Tutup</span>
            </button>
          </div>

          {/* 4 Kolom Penjelasan Detail: Evaporasi, Kondensasi, Presipitasi, Infiltrasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 flex-1 min-h-0 py-2.5 my-auto overflow-hidden">
            {/* 1. EVAPORASI */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">☀️</span>
                <h5 className="font-extrabold text-xs sm:text-sm text-amber-900">1. Evaporasi (Penguapan)</h5>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                <strong>Apa itu?</strong> Panas surya menguapkan air sungai, danau, dan laut. Tumbuhan juga melepaskan uap air melalui stomata daun (<em>transpirasi</em>).
              </p>
            </div>

            {/* 2. KONDENSASI */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">☁️</span>
                <h5 className="font-extrabold text-xs sm:text-sm text-blue-900">2. Kondensasi (Pengembunan)</h5>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                <strong>Apa itu?</strong> Uap air yang membubung ke atmosfer dingin mendingin dan mengembun menjadi titik-titik air pembentuk awan mendung tebal.
              </p>
            </div>

            {/* 3. PRESIPITASI */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">🌧️</span>
                <h5 className="font-extrabold text-xs sm:text-sm text-indigo-900">3. Presipitasi (Curah Hujan)</h5>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                <strong>Apa itu?</strong> Saat awan jenuh dan tak mampu lagi menahan berat air, gravitasi bumi menjatuhkannya sebagai air hujan yang menyiram bumi.
              </p>
            </div>

            {/* 4. INFILTRASI */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs flex flex-col justify-between overflow-hidden">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">🌱</span>
                <h5 className="font-extrabold text-xs sm:text-sm text-emerald-900">4. Infiltrasi (Resapan Air)</h5>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                <strong>Apa itu?</strong> Air hujan meresap ke dalam pori tanah berkat akar pohon hutan, tersaring alami menjadi cadangan mata air pegunungan jernih.
              </p>
            </div>
          </div>

          {/* Catatan Konservasi Kak Galih */}
          <div className="p-2.5 bg-emerald-100/70 border border-emerald-300/80 rounded-xl flex items-center gap-2 text-xs text-emerald-950 font-medium shrink-0">
            <span className="text-base shrink-0">💡</span>
            <div className="line-clamp-2">
              <strong>Catatan Lapangan:</strong> Hutan lindung bertindak sebagai spons raksasa alami. Akar pohon mengikat air tanah agar tidak terjadi banjir dan mata air tetap mengalir abadi.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
