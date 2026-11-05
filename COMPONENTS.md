# Katalog Komponen Reusable: ueeee (`ueeee.my.id`)

> **PANDUAN UNTUK AGENT & DEVELOPER:**
> Jangan membuat ulang komponen (navbar, modal fullscreen, kuis overlay, dialog kemenangan, badge, atau kartu) dari nol (*reinvent the wheel*). Gunakan katalog komponen di bawah ini. Komponen telah diuji dan dioptimalkan khusus untuk **proyektor ruang kelas, TV layar sentuh/smartboard, dan perangkat seluler**.

---

## Daftar Isi
1. [Game Shell Components (Panggung Game)](#1-game-shell-components-panggung-game)
   - [`GameStageShell`](#gamestageshell)
   - [`GameQuizModal`](#gamequizmodal)
   - [`GameVictoryModal`](#gamevictorymodal)
2. [Dashboard & Content Components](#2-dashboard--content-components)
   - [`GameCard`](#gamecard)
   - [`GameIllustration`](#gameillustration)
   - [`PrologModal`](#prologmodal)
   - [`CategoryPills`](#categorypills)
   - [`Header`](#header)
   - [`MobileBottomNav`](#mobilebottomnav)
3. [Common & Utility Modals](#3-common--utility-modals)
   - [`TeacherSheetModal`](#teachersheetmodal)
   - [`LogoIcon`](#logoicon)
4. [Hooks & Services](#4-hooks--services)
   - [`useFullscreen`](#usefullscreen)
   - [`sound`](#sound)
   - [`isGameMatchingSearch`](#isgamematchingsearch)
5. [Resep Cepat: Cara Membuat Game Baru dalam 5 Menit](#5-resep-cepat-cara-membuat-game-baru-dalam-5-menit)

---

## 1. Game Shell Components (Panggung Game)
**Lokasi Direktori:** `src/components/game-shell/`  
**Barrel Import:** `import { GameStageShell, GameQuizModal, GameVictoryModal } from '@/components/game-shell';`

---

### `GameStageShell`
**File:** [`src/components/game-shell/GameStageShell.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/game-shell/GameStageShell.tsx)

Komponen panggung satu layar penuh (*edge-to-edge* `100vw × 100vh`) yang membungkus semua game di platform. Komponen ini menghilangkan seluruh margin hitam yang membuang area proyektor.

#### Fitur Otomatis
- **Tombol Kembali:** `[ ← Kembali ke Beranda ]` di sudut kiri atas.
- **Identitas Game:** Ikon avatar dengan gradien dinamis + Judul & Subjudul kurikulum.
- **Layar Penuh Native:** Tombol `[ ⛶ Layar Penuh (Proyektor) ]` terintegrasi HTML5 Fullscreen API (`requestFullscreen()`).
- **Audio Switcher:** Tombol toggle suara (terhubung ke Web Audio API).
- **Reset Button:** Tombol mulai ulang / acak ulang game dengan tooltip kustom.
- **Escape Key Listener:** Menutup game otomatis saat tombol `Esc` ditekan.
- **Slot Kustom:** `extraControls` untuk meletakkan tombol mode (misal: `Vs Bot` | `2 Pemain`).

#### Props Interface
```typescript
interface GameStageShellProps {
  isOpen: boolean;                                     // Status modal terbuka/tertutup
  onClose: () => void;                                 // Callback keluar ke beranda
  title: string;                                       // Judul game/materi
  subtitle?: React.ReactNode;                          // Subjudul / materi kurikulum
  icon: string | React.ReactNode;                      // Emoji atau elemen ikon
  themeColor?: 'orange' | 'teal' | 'purple' | 'emerald' | 'blue' | 'indigo' | 'rose' | 'amber'; // Tema warna
  soundOn?: boolean;                                   // Status audio aktif
  onToggleSound?: () => void;                          // Callback toggle suara
  onReset?: () => void;                                // Callback mulai ulang
  resetTooltip?: string;                               // Tooltip tombol reset
  extraControls?: React.ReactNode;                     // Kontrol tambahan di navbar kanan
  contentClassName?: string;                           // Class Tailwind arena konten
  children: React.ReactNode;                           // Canvas/arena permainan
}
```

#### Contoh Penggunaan
```tsx
import { GameStageShell } from '@/components/game-shell';

export const MyNewGameModal = ({ isOpen, onClose }) => {
  const [soundOn, setSoundOn] = useState(true);

  return (
    <GameStageShell
      isOpen={isOpen}
      onClose={onClose}
      title="Petualangan Ekosistem Hutan"
      subtitle="Biologi SMA • Kelas 10 • Konservasi Keanekaragaman Hayati"
      icon="🌿"
      themeColor="emerald"
      soundOn={soundOn}
      onToggleSound={() => setSoundOn(s => !s)}
      onReset={handleResetGame}
      resetTooltip="Mulai Ulang Petualangan"
      contentClassName="flex-1 min-h-0 p-4 sm:p-6 flex flex-col overflow-hidden relative"
    >
      {/* Canvas / Arena Game Anda di Sini */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200">
        <h1>Konten Game</h1>
      </div>
    </GameStageShell>
  );
};
```

---

### `GameQuizModal`
**File:** [`src/components/game-shell/GameQuizModal.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/game-shell/GameQuizModal.tsx)

Modal dialog interaktif untuk tantangan soal kuis atau pertanyaan refleksi di tengah permainan. Teks berukuran besar dan memiliki kontras tinggi untuk kenyamanan pandangan dari barisan belakang kelas.

#### Props Interface
```typescript
interface GameQuizModalProps {
  isOpen: boolean;                                     // Status tampil
  badgeText?: string;                                  // Label kuis (misal: 'Kuis Tangga Petak 28')
  badgeVariant?: 'emerald' | 'rose' | 'amber' | 'purple' | 'teal'; // Warna badge
  topic?: string;                                      // Topik soal kurikulum
  question: string;                                    // Teks pertanyaan
  options: string[];                                   // Array pilihan jawaban
  onSelectOption: (index: number) => void;             // Callback saat siswa memilih (0-3)
  feedback?: { isCorrect: boolean; text: string } | null; // Umpan balik benar/salah
  onClose?: () => void;                                // Callback tombol tutup opsional
}
```

#### Contoh Penggunaan
```tsx
import { GameQuizModal } from '@/components/game-shell';

{activeQuiz && (
  <GameQuizModal
    isOpen={!!activeQuiz}
    badgeText="Kuis Pemahaman Konsep"
    badgeVariant="purple"
    topic="Fotosintesis"
    question="Gas apakah yang dilepaskan tumbuhan sebagai produk samping fotosintesis?"
    options={["Oksigen (O2)", "Karbondioksida (CO2)", "Nitrogen (N2)", "Metana (CH4)"]}
    onSelectOption={handleAnswerQuiz}
    feedback={quizFeedback}
  />
)}
```

---

### `GameVictoryModal`
**File:** [`src/components/game-shell/GameVictoryModal.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/game-shell/GameVictoryModal.tsx)

Dialog selebrasi kemenangan dengan ikon trofi bercahaya, partikel confetti otomatis, badge skor, serta tombol navigasi ganda: *Main Lagi* dan *Kembali ke Beranda*.

#### Props Interface
```typescript
interface GameVictoryModalProps {
  isOpen: boolean;                                     // Status tampil
  title: string;                                       // Judul selebrasi
  description: React.ReactNode;                        // Penjelasan capaian / apresiasi
  score?: number | string;                             // Total skor yang diraih
  onPlayAgain: () => void;                             // Callback ulangi permainan
  onClose: () => void;                                 // Callback keluar ke beranda
  playAgainText?: string;                              // Default: 'Main Lagi'
  closeText?: string;                                  // Default: 'Kembali ke Beranda'
  themeColor?: 'orange' | 'teal' | 'purple' | 'emerald';
  triggerConfetti?: boolean;                           // Default: true (otomatis meletuskan confetti)
}
```

#### Contoh Penggunaan
```tsx
import { GameVictoryModal } from '@/components/game-shell';

{isWinner && (
  <GameVictoryModal
    isOpen={isWinner}
    title="Hore, Kamu Berhasil Menang!"
    description="Luar biasa! Seluruh materi dan tantangan berhasil diselesaikan dengan sempurna."
    score={150}
    onPlayAgain={resetGame}
    onClose={onClose}
    themeColor="emerald"
  />
)}
```

---

## 2. Dashboard & Content Components
**Lokasi Direktori:** `src/components/dashboard/`

---

### `GameCard`
**File:** [`src/components/dashboard/GameCard.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/dashboard/GameCard.tsx)

Kartu tampilan game di beranda utama bergaya flat Canva dengan efek *hover lift*.

#### Fitur
- Screenshot ilustrasi visual di bagian atas (`GameIllustration`).
- Badge jenjang kelas (`SD`, `SMP`, `SMA`, `Semua`).
- Rating bintang dan estimasi waktu bermain.
- Judul materi & ringkasan kurikulum.
- Tombol `[ 📖 Prolog & Aturan ]` untuk membuka ringkasan kurikulum sebelum bermain.
- Tombol `[ Main Sekarang → ]` untuk langsung meluncurkan game.
- Tombol bookmark favorit (tersimpan otomatis di `localStorage`).

---

### `PrologModal`
**File:** [`src/components/dashboard/PrologModal.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/dashboard/PrologModal.tsx)

Modal edukasi Canva-style yang terbuka saat guru/siswa mengklik `Prolog & Aturan`. Menyajikan 4 tab terstruktur:
1. **Kisah & Prolog:** Pengantar naratif kontekstual materi.
2. **Materi Kurikulum:** Kompetensi pembelajaran, sub-topik, dan jenjang sasaran.
3. **Cara Bermain:** Langkah praktis memainkannya.
4. **Aturan Main:** Skor, penalti tantangan, dan kondisi kemenangan.

---

### `GameIllustration`
**File:** [`src/components/dashboard/GameIllustration.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/dashboard/GameIllustration.tsx)

Komponen ilustrasi SVG mini yang dirender di setiap kartu dashboard agar tidak ada kartu yang kosong atau hanya blok warna polos.
- **Tema:** `'lab' | 'candi' | 'hutan' | 'matematika' | 'sejarah' | 'puzzle' | 'sains'`

---

### `CategoryPills`
**File:** [`src/components/dashboard/CategoryPills.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/dashboard/CategoryPills.tsx)

Baris lingkaran kategori horizontal gaya Canva.
> ⚠️ **ATURAN MUTLAK:** Kategori ini hanya berisi **Mata Pelajaran Murni** (`Matematika`, `Sains Maya`, `Bahasa & Kata`, `Sejarah & Budaya`, `Teka-Teki Logika`). Jangan pernah memasukkan tipe game (Ular Tangga, Point & Click) ke sini!

---

## 3. Common & Utility Modals

### `TeacherSheetModal`
**File:** [`src/components/modals/TeacherSheetModal.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/modals/TeacherSheetModal.tsx)

Modal lembar kerja guru untuk mencetak bank soal dan kunci jawaban kurikulum langsung ke printer atau PDF (`window.print()`).

### `LogoIcon`
**File:** [`src/components/common/Logo.tsx`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/components/common/Logo.tsx)

Komponen logo resmi SVG **ueeee** dengan gradien cyan-to-purple dan bintang kuning.

---

## 4. Hooks & Services

### `useFullscreen`
**File:** [`src/lib/fullscreen.ts`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/lib/fullscreen.ts)
```typescript
import { useFullscreen } from '@/lib/fullscreen';

const { isFullscreen, toggleFullscreen } = useFullscreen();
```
Otomatis menangani vendor prefix (`webkitRequestFullscreen`, `webkitFullscreenElement`) dan mendengarkan event fullscreen change.

### `sound`
**File:** [`src/lib/sound.ts`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/src/lib/sound.ts)
```typescript
import { sound } from '@/lib/sound';

sound.playClick();     // Bunyi klik tombol ramah
sound.playCorrect();   // Bunyi kuis berhasil / poin bertambah
sound.playWrong();     // Bunyi kuis keliru
sound.playDiceRoll();  // Bunyi kocokan dadu
sound.toggleSound();   // Switch on/off sound effects
```
Berbasis sintetis Web Audio API tanpa perlu memuat aset file MP3 eksternal yang lambat.

---

## 5. Resep Cepat: Cara Membuat Game Baru dalam 5 Menit

Untuk menambahkan materi game baru ke platform **ueeee**:

1. **Tambahkan Soal ke Bank Soal:**
   Buka `src/data/questions-bank.ts`, tambahkan array soal baru:
   ```typescript
   export const QUESTIONS_BANK = {
     // ...
     ekosistem: [
       {
         id: 'eko-1',
         subject: 'ipa',
         grade: 'SMA',
         topic: 'Rantai Makanan',
         question: 'Konsumen tingkat pertama dalam ekosistem padang rumput adalah...',
         options: ['Herbivora', 'Karnivora', 'Pengurai', 'Produsen'],
         correctIndex: 0,
         explanation: 'Herbivora memakan langsung produsen (tumbuhan).',
       }
     ]
   };
   ```

2. **Daftarkan Entri di Katalog:**
   Buka `src/data/games-catalog.ts`, tambahkan kartu di `GAMES_CATALOG`:
   ```typescript
   {
     id: 'ekosistem-hutan-game',
     title: 'Jelajah Ekosistem Hutan',
     description: 'Eksplorasi interaktif keanekaragaman hayati dan rantai makanan tropis.',
     category: 'sains',
     type: 'point-and-click',
     gradeLevel: 'SMA',
     theme: 'hutan',
     prolog: {
       story: 'Masuki hutan hujan tropis Kalimantan...',
       learningGoals: ['Memahami interaksi biotik dan abiotik', 'Menganalisis piramida energi'],
       howToPlay: ['Sentuh flora dan fauna', 'Jawab kuis konservasi'],
       rules: ['Dapatkan artefak untuk setiap analisis benar']
     }
   }
   ```

3. **Bungkus Tampilan dengan `GameStageShell`:**
   Buat modal game baru menggunakan `GameStageShell`, `GameQuizModal`, dan `GameVictoryModal`.

4. **Verifikasi & Build:**
   ```bash
   bun test && bun run build
   ```
   Pastikan seluruh test lulus dan 0 error TypeScript sebelum commit dan push ke `main`.
