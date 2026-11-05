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

## 3. Komponen Reusable Standar: `GameStageShell`, `GameQuizModal`, & `GameVictoryModal`

Seluruh game di platform **ueeee** **WAJIB** menggunakan komponen reusable siap pakai yang telah disediakan di `@/components/game-shell`. Jangan membuat ulang navbar, overlay fullscreen, atau modal kuis dari awal!

### A. Template Panggung Game: `<GameStageShell />`

Komponen ini membungkus game ke dalam **Full-Screen Stage Mode**, menangani HTML5 Fullscreen API secara otomatis, audio toggle, tombol kembali, dan tombol reset/close:

```tsx
import React, { useState } from 'react';
import { GameStageShell, GameQuizModal, GameVictoryModal } from '@/components/game-shell';
import { sound } from '@/lib/sound';

export const SampleGameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [winner, setWinner] = useState<boolean>(false);

  return (
    <GameStageShell
      isOpen={isOpen}
      onClose={onClose}
      title="Judul Materi Game Edukatif"
      subtitle="Mata Pelajaran • Jenjang • Deskripsi Singkat"
      icon="🎮"
      themeColor="purple" // Pilihan: 'orange' | 'teal' | 'purple' | 'emerald' | 'blue' | 'indigo' | 'rose' | 'amber'
      soundOn={soundOn}
      onToggleSound={() => setSoundOn(sound.toggleSound())}
      onReset={resetGame}
      resetTooltip="Mulai Ulang Permainan"
      extraControls={<YourCustomControls />} // Opsional: switcher mode, petunjuk, dsb.
      contentClassName="flex-1 min-h-0 p-4 sm:p-6 flex flex-col overflow-hidden relative"
    >
      {/* 1. Canvas / Arena Permainan di sini */}
      <div className="flex-1">
        ...
      </div>

      {/* 2. Reusable Modal Kuis Tantangan */}
      {activeQuiz && (
        <GameQuizModal
          isOpen={!!activeQuiz}
          badgeText="Kuis Pemahaman Konsep"
          badgeVariant="purple" // 'emerald' | 'rose' | 'amber' | 'purple' | 'teal'
          topic="Biologi Sel"
          question={activeQuiz.question}
          options={activeQuiz.options}
          onSelectOption={handleAnswerQuiz}
          feedback={quizFeedback}
          onClose={() => setActiveQuiz(null)}
        />
      )}

      {/* 3. Reusable Modal Kemenangan / Selesai */}
      {winner && (
        <GameVictoryModal
          isOpen={winner}
          title="Hore, Kamu Berhasil Menuntaskan Misi!"
          description="Kamu telah menguasai seluruh indikator pembelajaran pada materi ini."
          score={150}
          onPlayAgain={resetGame}
          onClose={onClose}
          playAgainText="Main Lagi"
          closeText="Kembali ke Beranda"
          themeColor="purple"
        />
      )}
    </GameStageShell>
  );
};
```
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

## 7. Standar Animasi 60 FPS & Arsitektur Chess.com

Seluruh game berbasis grid, papan, atau interaksi bidak/objek di platform **ueeee** **WAJIB** menerapkan arsitektur 4-lapisan (*4-Layer Pipeline*) sesuai standar Chess.com dan Chessground (lihat panduan lengkap di [`CHESS_ENGINE_INSIGHTS.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/CHESS_ENGINE_INSIGHTS.md)):

1. **Layer 1: Static Board Grid:** Rendered sekali tanpa re-render.
2. **Layer 2: Highlights Layer (`pointer-events: none`):** Asal langkah, tujuan langkah, dan dot petak valid.
3. **Layer 3: GPU Piece Layer:** Bidak TIDAK BOLEH diletakkan di dalam DOM petak. Posisikan secara absolut dengan `transform: translate3d(col * 100%, row * 100%, 0)` dan `will-change: transform`.
4. **Layer 4: SVG Feedback & Badges:** Umpan balik instan (lencana silang merah `(X)` beranimasi saat langkah salah, lencana centang hijau `(✓)` saat benar).
5. **Dukungan Input Ganda:** Wajib mendukung **Pointer Events** (`pointerdown`, `pointermove`, `pointerup` dengan `setPointerCapture`) agar Drag-and-Drop dan Click-to-Move berfungsi mulus di mouse maupun TV layar sentuh kelas.
6. **Zero-Latency Sound:** Gunakan fungsi audio sintetis di `src/lib/sound.ts` (`playChessMove`, `playChessCapture`, `playChessError`, `playChessSuccess`).

---

## 8. Panduan Menambahkan Game / Materi Baru (Step-by-Step)

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
