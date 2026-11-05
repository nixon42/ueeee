import React, { useState } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface SequenceItem {
  id: string;
  order: number; // Urutan sebenarnya (1, 2, 3, ...)
  label: string;
  iconEmoji: string;
  description?: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  items: SequenceItem[];
  onComplete?: (isAllCorrect: boolean) => void;
  className?: string;
}

/**
 * Komponen Game Interaktif Canva Education: "Sequence / Put the steps in order"
 * Mengurutkan kartu tahapan proses, siklus alamiah, atau kronologi sejarah.
 */
export const CanvaSequenceGame: React.FC<Props> = ({
  title = 'Urutkan Langkah-Langkah Berikut',
  subtitle = 'Geser atau gunakan tombol panah untuk menyusun tahapan dari awal hingga akhir.',
  items: initialItems,
  onComplete,
  className = '',
}) => {
  // Acak urutan awal saat pertama kali dimuat
  const [currentOrder, setCurrentOrder] = useState<SequenceItem[]>(() => {
    return [...initialItems].sort(() => Math.random() - 0.5);
  });
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Geser kartu ke kiri
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

  // Geser kartu ke kanan
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
    <div className={`w-full flex flex-col items-center justify-between p-4 sm:p-6 bg-amber-50/40 rounded-3xl border border-amber-200/80 shadow-sm relative ${className}`}>
      {/* Header Tantangan Canva */}
      <div className="text-center max-w-xl mb-4 sm:mb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 block mb-1">
          Tantangan Urutan Langkah
        </span>
        <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">{subtitle}</p>
      </div>

      {/* Barisan Kartu Urutan (Horizontal Grid) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-auto">
        {currentOrder.map((item, index) => {
          const isCorrectPosition = checkedState && item.order === index + 1;
          const isWrongPosition = checkedState && item.order !== index + 1;

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border-2 transition-all duration-200 shadow-sm ${
                isCorrectPosition
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-emerald-100 ring-2 ring-emerald-300'
                  : isWrongPosition
                  ? 'border-rose-400 bg-rose-50/50 shadow-rose-100 ring-2 ring-rose-200'
                  : 'border-slate-200 hover:border-amber-400 hover:shadow-md'
              }`}
            >
              {/* Badge Nomor Posisi & Ikon Status */}
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">
                  {index + 1}
                </span>

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
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800 disabled:opacity-25 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Geser ke Kiri"
                >
                  <ArrowLeft size={14} />
                </button>
                <span className="text-[10px] font-bold text-slate-400">Pindahkan</span>
                <button
                  type="button"
                  onClick={() => moveRight(index)}
                  disabled={index === currentOrder.length - 1}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800 disabled:opacity-25 disabled:cursor-not-allowed transition cursor-pointer"
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

        {/* Tombol Check Order (Warna Oranye Hangat Khas Canva Sequence) */}
        <button
          type="button"
          onClick={handleCheckOrder}
          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition"
        >
          <CheckCircle2 size={16} />
          <span>Periksa Urutan</span>
        </button>
      </div>

      {/* AI Activity Tag di Sudut Kanan Bawah */}
      <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-bold text-amber-700/80 bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-200/50">
        <Sparkles size={11} />
        <span>Canva Sequence</span>
      </div>
    </div>
  );
};
