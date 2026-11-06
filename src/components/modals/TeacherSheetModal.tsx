import React, { useState } from 'react';
import { X, Printer, BookOpen, CheckCircle2, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { QUESTIONS_BANK } from '@/data/questions-bank';
import { useTeacherNotes } from '@/business';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherSheetModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notes, addNote, deleteNote } = useTeacherNotes('kelas-umum');
  const [newTopic, setNewTopic] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    setIsSubmitting(true);
    await addNote(1, newTopic.trim() || 'Evaluasi Diskusi Kelas', newContent.trim());
    setNewTopic('');
    setNewContent('');
    setIsSubmitting(false);
  };

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
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Printer size={15} />
              <span>Cetak Lembar Soal (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
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

          {/* Catatan Refleksi & Diskusi Guru (Tersinkronisasi Cloud) */}
          <div className="pt-6 border-t-2 border-purple-200 space-y-4 print:hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <span>Catatan & Evaluasi Kelas Guru (Tersinkronisasi Cloud)</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                {notes.length} Catatan Tersimpan
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Tuliskan refleksi hasil diskusi siswa atau catatan observasi kelas. Catatan ini otomatis tersimpan secara aman di Supabase Cloud dan memori lokal.
            </p>

            <form onSubmit={handleAddNote} className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Topik / Materi (misal: Fotosintesis Kelas 5B)"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl border border-purple-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 flex-1"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !newContent.trim()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>{isSubmitting ? 'Menyimpan...' : 'Tambah Catatan'}</span>
                </button>
              </div>
              <textarea
                rows={2}
                placeholder="Tuliskan catatan observasi pemahaman konsep, pertanyaan kritis siswa, atau tindak lanjut pembelajaran..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-purple-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
            </form>

            {notes.length > 0 && (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {notes.map((note) => (
                  <div key={note.id} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-purple-700">{note.topic}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(note.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 whitespace-pre-wrap">{note.notes}</p>
                    </div>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition shrink-0"
                      title="Hapus Catatan"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
