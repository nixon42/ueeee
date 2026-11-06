import React from 'react';
import { X, Printer, BookOpen, CheckCircle2 } from 'lucide-react';
import { QUESTIONS_BANK } from '@/data/questions-bank';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherSheetModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-purple-100 flex flex-col">
        {/* Header (No print) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shadow">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-800">
                Lembar Kerja & Bank Soal Guru (Mode Kelas)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Gunakan untuk kuis proyektor kelas atau cetak langsung lembar soal siswa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer size={15} />
              <span>Cetak Lembar Soal (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-8 print:p-0">
          {/* Header Surat Lembar Soal */}
          <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              LEMBAR KUIS PEMBELAJARAN INTERAKTIF
            </h2>
            <p className="text-sm font-semibold text-slate-600">
              Platform ueeee (ueeee.my.id) • Bahan Evaluasi Belajar Siswa
            </p>
            <div className="flex justify-between text-xs text-slate-500 pt-2 font-mono">
              <span>Mata Pelajaran: IPA, Matematika & Sejarah</span>
              <span>Nama Siswa: ______________________</span>
              <span>Kelas: _________</span>
            </div>
          </div>

          {/* List Soal per Mapel */}
          {Object.entries(QUESTIONS_BANK).map(([subject, questions]) => (
            <div key={subject} className="space-y-4">
              <h3 className="text-base font-black uppercase tracking-wider text-purple-800 border-b border-purple-200 pb-1 flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Materi: {subject}</span>
              </h3>

              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 print:bg-transparent print:border-none print:p-0">
                    <p className="font-bold text-sm text-slate-800 mb-2">
                      {idx + 1}. {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pl-4">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <span className="font-bold text-slate-500">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 print:hidden">
                      <span className="font-bold text-emerald-700">Kunci Jawaban: </span>
                      <span className="font-semibold text-slate-700">{String.fromCharCode(65 + q.correctIndex)} ({q.options[q.correctIndex]})</span>
                      <p className="mt-0.5 text-slate-600 italic">Penjelasan: {q.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
