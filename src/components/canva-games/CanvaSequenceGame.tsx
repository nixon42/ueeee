import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, GripVertical } from 'lucide-react';
import { sound } from '@/lib/sound';

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
  tag: string;
  checkBtn: string;
  cardHover: string;
  dragOverRing: string;
}> = {
  amber: {
    container: 'bg-amber-50/40 border-amber-200/80',
    badge: 'text-amber-700 bg-amber-100',
    tag: 'text-amber-700/80 bg-amber-100/60 border-amber-200/50',
    checkBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
    cardHover: 'hover:border-amber-400',
    dragOverRing: 'ring-2 ring-dashed ring-amber-400',
  },
  emerald: {
    container: 'bg-emerald-50/40 border-emerald-200/80',
    badge: 'text-emerald-700 bg-emerald-100',
    tag: 'text-emerald-700/80 bg-emerald-100/60 border-emerald-200/50',
    checkBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200',
    cardHover: 'hover:border-emerald-400',
    dragOverRing: 'ring-2 ring-dashed ring-emerald-400',
  },
  purple: {
    container: 'bg-purple-50/40 border-purple-200/80',
    badge: 'text-purple-700 bg-purple-100',
    tag: 'text-purple-700/80 bg-purple-100/60 border-purple-200/50',
    checkBtn: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200',
    cardHover: 'hover:border-purple-400',
    dragOverRing: 'ring-2 ring-dashed ring-purple-400',
  },
  blue: {
    container: 'bg-blue-50/40 border-blue-200/80',
    badge: 'text-blue-700 bg-blue-100',
    tag: 'text-blue-700/80 bg-blue-100/60 border-blue-200/50',
    checkBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
    cardHover: 'hover:border-blue-400',
    dragOverRing: 'ring-2 ring-dashed ring-blue-400',
  },
  indigo: {
    container: 'bg-indigo-50/40 border-indigo-200/80',
    badge: 'text-indigo-700 bg-indigo-100',
    tag: 'text-indigo-700/80 bg-indigo-100/60 border-indigo-200/50',
    checkBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200',
    cardHover: 'hover:border-indigo-400',
    dragOverRing: 'ring-2 ring-dashed ring-indigo-400',
  },
  rose: {
    container: 'bg-rose-50/40 border-rose-200/80',
    badge: 'text-rose-700 bg-rose-100',
    tag: 'text-rose-700/80 bg-rose-100/60 border-rose-200/50',
    checkBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200',
    cardHover: 'hover:border-rose-400',
    dragOverRing: 'ring-2 ring-dashed ring-rose-400',
  },
  teal: {
    container: 'bg-teal-50/40 border-teal-200/80',
    badge: 'text-teal-700 bg-teal-100',
    tag: 'text-teal-700/80 bg-teal-100/60 border-teal-200/50',
    checkBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200',
    cardHover: 'hover:border-teal-400',
    dragOverRing: 'ring-2 ring-dashed ring-teal-400',
  },
  orange: {
    container: 'bg-orange-50/40 border-orange-200/80',
    badge: 'text-orange-700 bg-orange-100',
    tag: 'text-orange-700/80 bg-orange-100/60 border-orange-200/50',
    checkBtn: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200',
    cardHover: 'hover:border-orange-400',
    dragOverRing: 'ring-2 ring-dashed ring-orange-400',
  },
};

/**
 * Komponen Game Interaktif Canva Education: "Sequence / Put the steps in order"
 * Mengurutkan kartu tahapan proses, siklus alamiah, atau kronologi sejarah.
 * Mendukung interaksi ganda: Drag & Drop HTML5 native dan tombol panah tap-to-swap.
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
  const displayInstructions = instructions || subtitle || 'Geser atau gunakan tombol panah untuk menyusun tahapan dari awal hingga akhir.';
  const themeStyle = THEME_STYLES[theme] || THEME_STYLES.amber;

  // Acak urutan awal saat pertama kali dimuat atau saat initialItems berganti
  const [currentOrder, setCurrentOrder] = useState<SequenceItem[]>(() => {
    return [...initialItems].sort(() => Math.random() - 0.5);
  });
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Sinkronisasi bila props items berganti dinamis dari slide deck
  useEffect(() => {
    setCurrentOrder([...initialItems].sort(() => Math.random() - 0.5));
    setCheckedState(false);
    setIsSuccess(false);
  }, [initialItems]);

  // Geser kartu ke kiri (Tap-to-swap)
  const moveLeft = (index: number) => {
    if (index === 0) return;
    sound.playClick();
    setCurrentOrder(prev => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
    setCheckedState(false);
  };

  // Geser kartu ke kanan (Tap-to-swap)
  const moveRight = (index: number) => {
    if (index === currentOrder.length - 1) return;
    sound.playClick();
    setCurrentOrder(prev => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
    setCheckedState(false);
  };

  // HTML5 Native Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIdx(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }

    sound.playClick();
    setCurrentOrder(prev => {
      const next = [...prev];
      const [moved] = next.splice(draggedIdx, 1);
      next.splice(targetIdx, 0, moved);
      return next;
    });
    setCheckedState(false);
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  // Acak ulang (Shuffle)
  const handleShuffle = () => {
    sound.playClick();
    setCurrentOrder([...initialItems].sort(() => Math.random() - 0.5));
    setCheckedState(false);
    setIsSuccess(false);
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
    } else {
      sound.playWrong();
    }

    if (onComplete) {
      onComplete(allCorrect);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-between p-4 sm:p-6 rounded-3xl border shadow-sm relative ${themeStyle.container} ${className}`}
    >
      {/* Header Tantangan Canva */}
      <div className="text-center max-w-xl mb-4 sm:mb-6">
        <span className={`text-[11px] font-black uppercase tracking-widest block mb-1 ${themeStyle.badge} px-2.5 py-0.5 rounded-full inline-block`}>
          Tantangan Urutan Langkah
        </span>
        <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight mt-1">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">{displayInstructions}</p>
      </div>

      {/* Barisan Kartu Urutan (Horizontal Grid) */}
      <div
        className={`w-full grid ${
          currentOrder.length <= 4
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5'
        } gap-3 sm:gap-4 my-auto`}
      >
        {currentOrder.map((item, index) => {
          const isCorrectPosition = checkedState && item.order === index + 1;
          const isWrongPosition = checkedState && item.order !== index + 1;
          const isBeingDragged = draggedIdx === index;
          const isTargetedByDrag = dragOverIdx === index;

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border-2 transition-all duration-200 shadow-sm cursor-grab active:cursor-grabbing select-none ${
                isBeingDragged ? 'opacity-40 scale-95' : 'opacity-100'
              } ${isTargetedByDrag ? themeStyle.dragOverRing : ''} ${
                isCorrectPosition
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-emerald-100 ring-2 ring-emerald-300'
                  : isWrongPosition
                  ? 'border-rose-400 bg-rose-50/50 shadow-rose-100 ring-2 ring-rose-200'
                  : `border-slate-200 ${themeStyle.cardHover} hover:shadow-md`
              }`}
            >
              {/* Badge Nomor Posisi, Grip Icon & Ikon Status */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <GripVertical size={14} className="text-slate-400 hover:text-slate-600 cursor-grab" />
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                {checkedState && (
                  <span>
                    {isCorrectPosition ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : (
                      <AlertCircle size={18} className="text-rose-500" />
                    )}
                  </span>
                )}
              </div>

              {/* Konten Kartu */}
              <div className="flex flex-col items-center text-center my-2 space-y-1.5">
                <span className="text-3xl sm:text-4xl filter drop-shadow-sm select-none">{item.iconEmoji}</span>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">{item.label}</h4>
                {item.description && (
                  <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Tombol Geser Panah (Proyektor & Touchscreen Friendly) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => moveLeft(index)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-25 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Geser ke Kiri"
                >
                  <ArrowLeft size={14} />
                </button>
                <span className="text-[10px] font-bold text-slate-400">Geser</span>
                <button
                  type="button"
                  onClick={() => moveRight(index)}
                  disabled={index === currentOrder.length - 1}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-25 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Geser ke Kanan"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Umpan Balik Hasil Validasi */}
      {checkedState && (
        <div
          className={`w-full max-w-md my-4 p-3 rounded-2xl border text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 ${
            isSuccess
              ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
              : 'bg-rose-100 border-rose-300 text-rose-900'
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
              <span>Ada langkah yang belum tepat. Coba geser kartu yang berwarna merah!</span>
            </>
          )}
        </div>
      )}

      {/* Action Buttons Bawah Gaya Canva */}
      <div className="flex items-center gap-3 mt-4 w-full max-w-md justify-center">
        {/* Tombol Shuffle */}
        <button
          type="button"
          onClick={handleShuffle}
          className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
        >
          <RotateCcw size={15} />
          <span>Acak Ulang</span>
        </button>

        {/* Tombol Check Order */}
        <button
          type="button"
          onClick={handleCheckOrder}
          className={`flex-1 py-2.5 px-4 rounded-xl ${themeStyle.checkBtn} font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition`}
        >
          <CheckCircle2 size={16} />
          <span>Periksa Urutan</span>
        </button>
      </div>

      {/* Canva Activity Tag di Sudut Kanan Bawah */}
      <div className={`absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${themeStyle.tag}`}>
        <Sparkles size={11} />
        <span>Canva Sequence</span>
      </div>
    </div>
  );
};
