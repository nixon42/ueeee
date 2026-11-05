# Spesifikasi & Blueprint Game: ueeee (ueeee.my.id)

> **DOKUMEN INI ADALAH PANDUAN UTAMA & ATURAN MUTLAK UNTUK AGENT / DEVELOPER.**
> Baca dokumen ini secara menyeluruh sebelum membuat, memodifikasi, atau memperluas game di platform **ueeee**. Seluruh batasan desain dan arsitektur di bawah ini bersumber langsung dari arahan pengguna dan kebutuhan riil di ruang kelas.

---

## 1. Visi Produk & Target Pengguna

- **Nama Platform:** ueeee (`ueeee.my.id`)
- **Konsep:** Platform Pembelajaran Terbuka Berbasis Game Interaktif (*Gamified Learning Hub*) untuk Kurikulum K-12 Indonesia (SD, SMP, SMA).
- **Target Audiens Utama:** **GURU DI DEPAN KELAS** yang memproyeksikan materi ke:
  - Proyektor ruang kelas (resolusi 1080p / SVGA)
  - Interactive Flat Panel (IFP) / Smartboard sentuh
  - TV layar sentuh kelas
- **Target Audiens Sekunder:** Siswa yang belajar mandiri via laptop, tablet, atau smartphone.
- **Zero-Barrier / Guest-First:** Tanpa sistem registrasi, tanpa login, tanpa form pengisian akun. Materi langsung terbuka dalam 1 klik.

---

## 2. Batasan Mutlak & Larangan Keras (STRICT DON'TS)

Setiap agent **WAJIB** mematuhi aturan berikut dan **DILARANG** melanggarnya:

| No | Hal yang DILARANG KERAS | Alasan & Solusi Benar |
|---|---|---|
| ❌ 1 | **DILARANG membuat modal pop-up melayang di tengah layar dengan backdrop gelap (`max-w-2xl max-h-[90vh] bg-black/60`).** | Membuang ~40% ruang layar proyektor kelas. **Wajib gunakan Full-Screen Stage Mode** (`fixed inset-0 w-screen h-screen bg-[#f8fafc] flex flex-col overflow-hidden`). |
| ❌ 2 | **DILARANG membuat pilihan game di dalam game ("Game inside Game" atau sub-lokasi di dalam modal).** | Membingungkan guru dan siswa. Jika ada materi atau lokasi berbeda (misal: Sains Lab vs Relief Sejarah), **pisahkan menjadi entri tersendiri di `GAMES_CATALOG`** sehingga muncul langsung di beranda dashboard. |
| ❌ 3 | **DILARANG menjejalkan "AI Slop" / badge pill bertumpuk-tumpuk tanpa fungsi.** | Jangan buat badge berulang seperti `Gratis • Tanpa Login` di setiap card atau tag ganda yang tidak informatif. Tampilan harus bersih, modern, dan fungsional seperti Canva. |
| ❌ 4 | **DILARANG mencampur jenis game ke dalam baris kategori mata pelajaran.** | Kategori lingkaran atas adalah **Mata Pelajaran Murni** (`Matematika`, `Sains Maya`, `Bahasa & Kata`, `Sejarah & Budaya`, `Teka-Teki Logika`). Jenis game (Ular Tangga, Point & Click, Puzzle) diatur pada tab switcher, bukan di kategori materi. |
| ❌ 5 | **DILARANG membuat card materi tanpa screenshot ilustrasi visual.** | Setiap kartu di beranda wajib memiliki representasi visual/screenshot SVG atau cover gambar yang menarik di atas kartu (tidak boleh hanya kotak warna kosong). |
| ❌ 6 | **DILARANG menyembunyikan tombol navigasi kembali.** | Tombol `[ ← Kembali ke Beranda ]` wajib ada di sudut kiri atas navbar panggung game agar guru bisa keluar dengan 1 klik. |

---

## 3. Arsitektur Tampilan: Full-Screen Stage Mode

Setiap game yang dibuka dari dashboard **wajib** menggunakan template Full-Screen Stage:

```tsx
import React from 'react';
import { ArrowLeft, Maximize2, Minimize2, Volume2, VolumeX, RotateCcw, X } from 'lucide-react';
import { useFullscreen } from '@/lib/fullscreen';
import { sound } from '@/lib/sound';

export const SampleGameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [soundOn, setSoundOn] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    // 1. Container Panggung Satu Layar Penuh (Edge-to-Edge)
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#f8fafc] flex flex-col overflow-hidden select-none animate-fadeIn">
      
      {/* 2. Top Stage Navbar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-2xs">
        
        {/* Kiri: Tombol Kembali & Identitas Game */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
            title="Kembali ke Beranda Materi"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md font-black text-xl shrink-0">
              🎮
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-slate-800 line-clamp-1">
                Judul Materi Game
              </h3>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                Mata Pelajaran • Jenjang • Deskripsi Singkat
              </p>
            </div>
          </div>
        </div>

        {/* Kanan: Kontrol Proyektor & Alat Bantu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Native Fullscreen HTML5 untuk Proyektor/Smartboard */}
          <button
            onClick={toggleFullscreen}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-slate-200 hover:border-purple-200"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (Proyektor/TV Kelas)'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden md:inline">{isFullscreen ? 'Keluar Penuh' : 'Layar Penuh (Proyektor)'}</span>
          </button>

          <button
            onClick={() => setSoundOn(sound.toggleSound())}
            className="p-2 text-slate-500 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            title="Toggle Suara"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={resetGame}
            className="p-2 text-slate-500 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            title="Mulai Ulang"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            title="Tutup Game"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* 3. Panggung Utama Game (Flex-1) */}
      <div className="flex-1 min-h-0 p-4 sm:p-6 flex flex-col overflow-hidden">
        {/* Game Canvas / Arena di sini */}
      </div>
    </div>
  );
};
```

---

## 4. Standar Ukuran Touch Target & Tampilan Kelas

Karena game dijalankan di layar sentuh besar dan proyektor:
1. **Touch Target Minimal:**
   - Tombol utama / opsi kuis: minimal tinggi `48px` hingga `56px`.
   - Huruf / Tile interaktif: minimal ukuran `48x48px` di mobile, `56x56px` hingga `64x64px` di desktop/smartboard.
2. **Keterbacaan dari Bangku Belakang (Row 4-5):**
   - Teks pertanyaan kuis: minimal `text-base` hingga `text-xl` dengan font tebal (`font-extrabold`).
   - Kontras warna tinggi (`slate-800` pada latar `white` atau `emerald-900` pada `emerald-50`).
3. **Keyboard Shortcut Wajib:**
   - `Space`: Aksi utama (misal: lempar dadu).
   - `Backspace`: Hapus huruf atau batal pilihan.
   - `A-Z`: Ketik langsung susunan kata / rumus.
   - `Escape`: Menutup kuis atau modal.

---

## 5. Sistem Prolog & Panduan Materi (`PrologModal`)

Setiap kartu game di dashboard **wajib** memiliki data prolog lengkap agar guru dapat melihat ringkasan materi sebelum memulai pembelajaran:

```typescript
// types/game.ts
export interface GameProlog {
  story: string;             // Narasi kontekstual pengantar materi
  learningGoals: string[];   // Capaian pembelajaran (Kurikulum Merdeka)
  howToPlay: string[];       // 3-4 langkah praktis cara bermain
  rules: string[];           // Aturan main, skor, dan sistem giliran
}
```

Ketika tombol `[ 📖 Prolog & Aturan ]` di card ditekan, modal `PrologModal.tsx` akan menampilkan 4 tab:
1. **Kisah & Prolog:** Pengantar naratif materi (misal: latar belakang laboratorium atau relief Nusantara).
2. **Materi Pembelajaran:** Kompetensi kurikulum, sub-topik, dan jenjang yang dicakup.
3. **Cara Bermain:** Langkah teknis (lempar dadu, sentuh objek berkilau, susun huruf).
4. **Aturan Main:** Ketentuan poin, penalti ular/jawaban salah, dan kondisi kemenangan.

---

## 6. Jenis Game Engine yang Ada & Cara Mengembangkannya

Saat ini platform memiliki 3 engine modular di `src/games/`:

### A. Engine Ular Tangga (`src/games/ular-tangga/`)
- **Struktur:** Grid 10x10 (100 petak) dengan pola zig-zag.
- **Kalkulasi Koordinat:** `getTileCenter(tileNum)` di `coordinates.ts` memetakan petak 1-100 ke posisi SVG (x: 0-100%, y: 0-100%).
- **Mekanik Edukasi:**
  - Tangga (Hijau): Memicu kuis pemahaman materi. Jika benar, naik tangga; jika salah, tetap di bawah.
  - Ular (Merah): Memicu kuis penjinak ular. Jika benar, ular terjinakkan dan pion tidak turun; jika salah, turun ke ekor ular.
  - Bintang Bonus: Kuis tantangan poin tambahan.
- **Mode:** Melawan Bot Edukasi (`bot`) atau 2 Pemain lokal (`pvp`).

### B. Engine Point and Click (`src/games/point-and-click/`)
- **Struktur:** Panggung ilustrasi visual dengan hotspot interaktif beranimasi glow/pulse.
- **Mekanik:**
  - Siswa mengklik instrumen sains/artefak bersejarah.
  - Membuka dialog mentor edukatif (Prof. Maya, Patih Gajah Mada, Ranger Rimba).
  - Memicu tantangan analisis konsep.
  - Mengoleksi artefak ke dalam **Tas Ekspedisi Siswa** hingga seluruh instrumen terkuasai.

### C. Engine Teka-Teki Kata (`src/games/puzzle/`)
- **Struktur:** Papan anagram interaktif dengan petunjuk ilmiah & fakta edukatif.
- **Mekanik:**
  - Klik tile huruf atau ketik langsung via physical keyboard (A-Z).
  - Fitur Smart Hint (`useSmartHint`): membuka huruf pertama jika siswa kesulitan.
  - Streak bonus untuk jawaban benar beruntun.

---

## 7. Panduan Menambahkan Game / Materi Baru (Step-by-Step)

Ketika diminta menambahkan materi atau game baru:

1. **Tambahkan Soal ke Bank Soal:**
   - Buka `src/data/questions-bank.ts`.
   - Tambahkan set soal di bawah subject terkait dengan format `QuizQuestion`.

2. **Daftarkan di Katalog Utama:**
   - Buka `src/data/games-catalog.ts`.
   - Tambahkan entri baru di array `GAMES_CATALOG`.
   - **Wajib sertakan:** `id`, `title`, `description`, `subjectDetail`, `category`, `grade`, `illustration` (SVG screenshot mini), dan `prolog` lengkap (4 tab).

3. **Buat Komponen Game Stage (atau Sambungkan ke Engine yang Ada):**
   - Jika materi menggunakan engine yang ada, cukup passing props `defaultSubject` atau `defaultSceneId`.
   - Jika membuat engine baru: letakkan di `src/games/<nama-engine>/<NamaEngineModal>.tsx` dengan format **Full-Screen Stage Mode**.

4. **Verifikasi & Tes:**
   - Jalankan `bun test` untuk memastikan integritas katalog, ID unik, dan bank soal tidak ada yang rusak.
   - Jalankan `bun run build` untuk memastikan 0 error TypeScript.

---

## 8. Standar Kode, Testing, & Deployment

- **Package Manager & Runtime:** `bun`
- **Unit Test:** `bun test` (lokasi file: `tests/*.test.ts`).
- **Production Build:** `bun run build` (`tsc -b && vite build`).
- **Git Commit Convention:**
  - `feat(game): ...` untuk penambahan materi atau fitur baru.
  - `style(ui): ...` untuk penyesuaian visual, warna, atau layout.
  - `fix(engine): ...` untuk perbaikan bug mekanik permainan.
- **Deployment:** Otomatis via GitHub Actions saat push ke branch `main`. Domain live di: **https://ueeee.my.id/**.
