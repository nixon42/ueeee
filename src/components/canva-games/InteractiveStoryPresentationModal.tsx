import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Compass, Lightbulb, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/sound';
import { GameStageShell, GameVictoryModal } from '@/components/game-shell';
import { CanvaSequenceGame, SequenceItem } from './CanvaSequenceGame';
import { CanvaMatchPairsGame, MatchPairItem } from './CanvaMatchPairsGame';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Data Tantangan 1: Sequence Fotosintesis
const PHOTOSYNTHESIS_SEQUENCE: SequenceItem[] = [
  {
    id: 'seq-1',
    order: 1,
    label: 'Penyerapan Energi',
    iconEmoji: '☀️',
    description: 'Klorofil daun menyerap sinar matahari dan menghirup CO2 dari udara.',
  },
  {
    id: 'seq-2',
    order: 2,
    label: 'Reaksi Kimiawi',
    iconEmoji: '🧪',
    description: 'Air (H2O) dari akar dipecah menjadi energi kimia dan oksigen.',
  },
  {
    id: 'seq-3',
    order: 3,
    label: 'Pelepasan Oksigen',
    iconEmoji: '💨',
    description: 'Oksigen (O2) dilepaskan ke udara untuk dihirup makhluk hidup.',
  },
  {
    id: 'seq-4',
    order: 4,
    label: 'Sintesis Glukosa',
    iconEmoji: '🍎',
    description: 'Gula/glukosa disimpan menjadi nutrisi buah dan rantai makanan satwa.',
  },
];

// Data Tantangan 2: Match the Pairs Peran Ekosistem
const ECOSYSTEM_PAIRS: MatchPairItem[] = [
  {
    id: 'pair-produsen',
    leftText: '🌳 Pohon Ara Raksasa',
    rightText: 'Produsen utama penghasil oksigen dan buah',
  },
  {
    id: 'pair-herbivora',
    leftText: '🦧 Orangutan Kalimantan',
    rightText: 'Konsumen herbivora dan agen penyebar biji pohon',
  },
  {
    id: 'pair-karnivora',
    leftText: '🐆 Macan Dahan',
    rightText: 'Predator karnivora pengendali keseimbangan populasi',
  },
  {
    id: 'pair-dekomposer',
    leftText: '🍄 Jamur Lapuk Kayu',
    rightText: 'Pengurai (dekomposer) yang menyuburkan kembali tanah',
  },
];

export const InteractiveStoryPresentationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [challenge1Done, setChallenge1Done] = useState<boolean>(false);
  const [challenge2Done, setChallenge2Done] = useState<boolean>(false);

  const totalSlides = 6;

  const goToSlide = (slideNum: number) => {
    sound.playClick();
    setCurrentSlide(Math.max(1, Math.min(totalSlides, slideNum)));
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    } else {
      setIsVictoryOpen(true);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  };

  const handleResetDeck = () => {
    sound.playClick();
    setCurrentSlide(1);
    setChallenge1Done(false);
    setChallenge2Done(false);
    setIsVictoryOpen(false);
  };

  if (!isOpen) return null;

  return (
    <GameStageShell
      isOpen={isOpen}
      onClose={onClose}
      title="Presentasi Interaktif: Ekspedisi Hutan Tropis"
      subtitle={`Slide ${currentSlide} dari ${totalSlides}: Cerita, Konsep Materi, & Mini-Game Canva`}
      icon="🌿"
      themeColor="emerald"
      soundOn={soundOn}
      onToggleSound={() => setSoundOn(sound.toggleSound())}
      onReset={handleResetDeck}
      resetTooltip="Mulai Ulang dari Slide 1"
      extraControls={
        <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
          <BookOpen size={14} className="text-emerald-600" />
          <span>Mode Presentasi Guru</span>
        </div>
      }
      contentClassName="flex-1 min-h-0 p-3 sm:p-6 flex flex-col justify-between overflow-hidden relative"
    >
      {/* ARENA SLIDE PRESENTASI INTERAKTIF KELAS */}
      <div className="flex-1 min-h-0 bg-white rounded-3xl border border-slate-200/90 shadow-xl flex flex-col overflow-y-auto relative p-4 sm:p-8">
        {/* SLIDE 1: CERITA & MISI PENGANTAR (NARRATIVE HOOK) */}
        {currentSlide === 1 && (
          <div className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-6 my-auto animate-in fade-in duration-300">
            {/* Visual Avatar Mentor Sains */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-emerald-200 border-4 border-white ring-4 ring-emerald-100">
                🌿
              </div>
              <span className="absolute -bottom-2 -right-2 bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-200 shadow-sm flex items-center gap-0.5">
                <Sparkles size={10} />
                <span>Misi Kelas</span>
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70 inline-block">
                BABAK 1: PANGGILAN PETUALANGAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Misi Penyelamatan Lembah Hutan Hujan
              </h2>
            </div>

            {/* Balon Dialog Karakter Guru/Mentor */}
            <div className="max-w-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 p-5 sm:p-6 rounded-3xl border border-emerald-200/80 text-left shadow-sm relative">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-200/50">
                <Compass className="text-emerald-700" size={18} />
                <span className="font-extrabold text-xs sm:text-sm text-emerald-900">
                  Prof. Maya (Kepala Tim Riset Konservasi Alam):
                </span>
              </div>
              <p className="text-xs sm:text-base leading-relaxed text-slate-700 font-medium">
                &ldquo;Halo rekan-rekan peneliti muda di kelas! Stasiun konservasi kita mendeteksi anomali di lembah hutan tropis Kalimantan. Rantai makanan terganggu dan pohon ara purba mengalami kekeringan fotosintesis. Kita membutuhkan bantuan seluruh kelas untuk merekonstruksi siklus energi dan memasangkan rantai ekosistem agar hutan ini kembali lestari. Siapkah kalian memulai misi ini?&rdquo;
              </p>
            </div>

            {/* Action Button Lanjut ke Materi */}
            <button
              onClick={handleNextSlide}
              className="py-3.5 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-200 flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <span>Buka Materi Konsep Kunci</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* SLIDE 2: KONSEP MATERI INTI (VISUAL BITE-SIZED INFOGRAPHIC) */}
        {currentSlide === 2 && (
          <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                BABAK 2: KONSEP DASAR PEMBELAJARAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Tiga Pilar Keseimbangan Ekosistem
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Pahami hubungan ketiga tingkat trofik ini sebelum menghadapi tantangan mini-game!
              </p>
            </div>

            {/* 3 Kartu Infografis Canva Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-auto">
              {/* Kartu 1: Produsen */}
              <div className="p-5 rounded-3xl bg-emerald-50/60 border-2 border-emerald-200 shadow-sm flex flex-col space-y-3">
                <span className="text-4xl">🌱</span>
                <span className="text-xs font-black uppercase text-emerald-700">Tingkat 1</span>
                <h3 className="font-extrabold text-base text-slate-900">Produsen (Autotrof)</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Tumbuhan hijau menangkap energi surya, air, dan CO2 melalui fotosintesis untuk memproduksi glukosa dan oksigen bagi seluruh ekosistem.
                </p>
              </div>

              {/* Kartu 2: Konsumen */}
              <div className="p-5 rounded-3xl bg-amber-50/60 border-2 border-amber-200 shadow-sm flex flex-col space-y-3">
                <span className="text-4xl">🦧</span>
                <span className="text-xs font-black uppercase text-amber-700">Tingkat 2</span>
                <h3 className="font-extrabold text-base text-slate-900">Konsumen (Heterotrof)</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Herbivora memakan dedaunan/buah dan menyebarkan biji pohon, sementara karnivora mengendalikan populasi agar hutan tidak over-grazing.
                </p>
              </div>

              {/* Kartu 3: Pengurai */}
              <div className="p-5 rounded-3xl bg-purple-50/60 border-2 border-purple-200 shadow-sm flex flex-col space-y-3">
                <span className="text-4xl">🍄</span>
                <span className="text-xs font-black uppercase text-purple-700">Tingkat 3</span>
                <h3 className="font-extrabold text-base text-slate-900">Dekomposer (Pengurai)</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Jamur dan mikroba tanah menguraikan jasad organisme mati menjadi humus dan unsur hara mineral yang kembali diserap akar pohon.
                </p>
              </div>
            </div>

            {/* Catatan Pembicara Guru (Teacher Proyektor Cue) */}
            <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs sm:text-sm text-slate-600">
              <Lightbulb className="text-amber-500 shrink-0" size={20} />
              <span>
                <strong>Panduan Guru di Kelas:</strong> Ajak 1-2 siswa menyebutkan contoh lain produsen dan konsumen yang ada di lingkungan sekitar sekolah sebelum masuk ke mini-game.
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 3: MINI-GAME INTERAKTIF 1 — CANVA SEQUENCE GAME */}
        {currentSlide === 3 && (
          <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto animate-in fade-in duration-300">
            <CanvaSequenceGame
              title="Tantangan 1: Urutkan Siklus Aliran Energi Fotosintesis"
              subtitle="Pohon purba membutuhkan aktivasi siklus yang benar! Geser kartu langkah agar fotosintesis berjalan sempurna."
              items={PHOTOSYNTHESIS_SEQUENCE}
              onComplete={(success) => {
                setChallenge1Done(success);
              }}
            />
          </div>
        )}

        {/* SLIDE 4: MINI-GAME INTERAKTIF 2 — CANVA MATCH PAIRS GAME */}
        {currentSlide === 4 && (
          <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto animate-in fade-in duration-300">
            <CanvaMatchPairsGame
              title="Tantangan 2: Jodohkan Peran Komponen Ekosistem Hutan"
              subtitle="Hubungkan makhluk hidup di Kolom A dengan perannya di Kolom B agar rantai ekosistem stabil!"
              pairs={ECOSYSTEM_PAIRS}
              onComplete={(success) => {
                setChallenge2Done(success);
              }}
            />
          </div>
        )}

        {/* SLIDE 5: RESOLUSI CERITA (STORY RESOLUTION) */}
        {currentSlide === 5 && (
          <div className="w-full h-full flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-6 my-auto animate-in fade-in duration-300">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-amber-200 border-4 border-white ring-4 ring-amber-100">
              🏆
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70 inline-block">
                BABAK 5: KELANJUTAN CERITA
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Lembah Kalimantan Kembali Berseri!
              </h2>
            </div>

            <div className="max-w-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 p-5 sm:p-6 rounded-3xl border border-emerald-200/80 text-left shadow-sm">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-200/50">
                <CheckCircle2 className="text-emerald-700" size={18} />
                <span className="font-extrabold text-xs sm:text-sm text-emerald-900">
                  Laporan Hasil Riset Konservasi:
                </span>
              </div>
              <p className="text-xs sm:text-base leading-relaxed text-slate-700 font-medium">
                &ldquo;Luar biasa kerja sama kelas hari ini! Berkat ketepatan kalian mengurutkan siklus energi fotosintesis dan memetakan peran satwa hutan, pohon ara purba berhasil kembali mengalirkan oksigen segar. Orangutan dan satwa endemik kini memiliki cadangan pakan yang berlimpah! Kalian resmi dinobatkan sebagai <strong>Cendekiawan Konservasi Hutan Tropis</strong>!&rdquo;
              </p>

              {/* Status Selesai Tantangan */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-emerald-200/50">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${challenge1Done ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  Tantangan 1: {challenge1Done ? '✓ Urutan Fotosintesis Selesai' : 'Urutan Terlewati'}
                </span>
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${challenge2Done ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  Tantangan 2: {challenge2Done ? '✓ Pasangan Ekosistem Selesai' : 'Pasangan Terlewati'}
                </span>
              </div>
            </div>

            <button
              onClick={handleNextSlide}
              className="py-3 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-md flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <span>Buka Lembar Diskusi Guru & Refleksi</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* SLIDE 6: LEMBAR REFLEKSI GURU & DISKUSI KELAS (TEACHER SPARK) */}
        {currentSlide === 6 && (
          <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-purple-600">
                BABAK 6: REFLEKSI & DISKUSI KELAS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pertanyaan Pemantik Diskusi Siswa
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Gunakan kartu diskusi ini untuk memancing nalar kritis siswa di akhir pembelajaran:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <h4 className="font-bold text-sm text-slate-800">Dampak Pengurai Hilang</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Apa yang akan terjadi pada tanah dan pohon jika jamur atau bakteri pengurai punah dari hutan?
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center">
                  2
                </span>
                <h4 className="font-bold text-sm text-slate-800">Peran Vital Orangutan</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Mengapa orangutan dijuluki &ldquo;petani hutan alami&rdquo; dalam penyebaran biji buah?
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <h4 className="font-bold text-sm text-slate-800">Aksi Nyata di Sekolah</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Langkah praktis apa yang bisa kita terapkan di lingkungan sekolah untuk menjaga rantai oksigen?
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setIsVictoryOpen(true)}
                className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
              >
                <span>🏆 Selesai & Rayakan Kemenangan Kelas!</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BAR NAVIGASI SLIDE PRESENTASI GAYA CANVA */}
      <div className="w-full flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200/80 px-2 shrink-0">
        {/* Tombol Slide Sebelumnya */}
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 1}
          className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
        >
          <ChevronLeft size={16} />
          <span>Slide Sebelumnya</span>
        </button>

        {/* Indikator Titik Progress Slide */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }, (_, i) => i + 1).map(slideNum => (
            <button
              key={`dot-slide-${slideNum}`}
              onClick={() => goToSlide(slideNum)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === slideNum
                  ? 'w-8 bg-emerald-600'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Buka Slide ${slideNum}`}
            />
          ))}
        </div>

        {/* Tombol Slide Selanjutnya */}
        <button
          onClick={handleNextSlide}
          className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition"
        >
          <span>{currentSlide === totalSlides ? 'Tutup Misi' : 'Slide Berikutnya'}</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* DIALOG SELEBRASI KEMENANGAN AKHIR */}
      {isVictoryOpen && (
        <GameVictoryModal
          isOpen={isVictoryOpen}
          title="Misi Ekspedisi Hutan Berhasil!"
          description="Seluruh kelas telah berhasil memecahkan misteri rantai ekosistem dan menguasai konsep fotosintesis dengan gemilang."
          score="100% Misi Selesai"
          onPlayAgain={handleResetDeck}
          onClose={onClose}
          themeColor="emerald"
        />
      )}
    </GameStageShell>
  );
};
