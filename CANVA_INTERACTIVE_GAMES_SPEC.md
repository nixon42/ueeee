# Spesifikasi & Blueprint: Game Interaktif Canva Education & Presentasi Cerita (Story-Driven Slide Deck)

> **DOKUMEN PANDUAN UNTUK AGENT & DEVELOPER PENERUS**  
> Dibuat berdasarkan analisis fitur *Canva Education Interactive Games* ("Quiz Yourself", "Sequence", "Match the Pairs", "Flashcards") dan kebutuhan integrasi alur presentasi interaktif kelas di platform **ueeee** (`ueeee.my.id`).

---

## 1. Filosofi & Visi: "Kaya Presentasi, Ada Ceritanya, Gantiin Kuis Kering"

Di ruang kelas konvensional, terdapat kesenjangan besar antara dua format:
1. **Slide Presentasi Biasa (PowerPoint / Canva Statis):** Siswa hanya duduk pasif mendengarkan ceramah guru, layar proyektor membosankan, dan tidak ada interaktivitas langsung.
2. **Kuis Pilihan Ganda Lepas (Kahoot / Quizizz):** Soal disajikan terputus-putus tanpa konteks narasi, memicu kompetisi kecepatan yang seringkali mengabaikan pemahaman mendalam.

### Solusi Platform `ueeee`: *Story-Driven Interactive Slide Presentation*
Format baru yang menggabungkan **alur slide presentasi bercerita (*narrative story deck*)** dengan **mini-game interaktif Canva Education** di tengah alur.

> [!IMPORTANT]
> **POLA PIKIR PENGEMBANGAN: GAME ANDROID & TABLET (BUKAN WEB):**
> Setiap slide presentasi bukan halaman HTML/web document biasa, melainkan **scene game mobile native berstandar tablet/iPad/Android**:
> - 100% bebas scroll (`overflow: hidden`), terkunci rapi dalam rasio lanskap layar kelas.
> - Target sentuh chunky (minimal 48px–56px, border 2px solid, shadow 3D).
> - Gesture pointer dragging fisik terkunci di arena (Chess.com style) dengan animasi merapat.
> - Desain kartu berwujud Trading Card Game (TCG) koleksi, bukan kotak kaku bernomor.

```
┌─────────────────┐     ┌─────────────────┐     ┌───────────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     SLIDE 1     │     │     SLIDE 2     │     │        SLIDE 3        │     │     SLIDE 4     │     │     SLIDE 5     │
│  Cerita Pembuka │ ──> │   Materi Inti   │ ──> │  Mini-Game Interaktif │ ──> │ Resolusi Narasi │ ──> │  Refleksi Guru  │
│  & Misi Konteks │     │ Konsep Ringkas  │     │ (Sequence / Match A-B)│     │ Dampak Solusi   │     │ & Diskusi Kelas │
└─────────────────┘     └─────────────────┘     └───────────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 2. Taksonomi Jenis Game Canva Education

Berikut adalah 4 jenis game interaktif Canva Education beserta spesifikasi teknis dan interaksinya:

---

### A. Game Tipe 1: `Sequence` (Urutan Langkah / Linimasa Kronologi)
*Sesuai kartu Canva "Put the steps in order - Drag the cards so they exit from first to last"*

#### 1. Tujuan Pedagogis
Melatih kemampuan siswa dalam memahami **proses algoritmik, siklus alamiah, atau linimasa sejarah** yang memiliki tahapan berurutan (misal: Tahapan Fotosintesis, Metamorfosis Kupu-Kupu, Siklus Air, Kronologi Kemerdekaan RI).

#### 2. Tampilan & Interaksi (Standar Chess.com & Kartu TCG)
- **Desain Kartu TCG (Trading Card Game):** Tiap kartu berwujud kartu koleksi indah dengan border foil emas, visual art penuh (high-res SVG), badge materi, dan kotak penjelasan proses (*lore plate*). Bebas dari header angka kaku (`:: 1`), grip dots, atau tombol panah geser.
- **Dukungan Dua Cara Interaksi (Proyektor & Layar Sentuh):**
  1. *Pointer Drag (Chess.com Style):* Menyeret kartu secara real-time 60 FPS menggunakan Pointer Events (`setPointerCapture`, `translate3d`). Kartu terkunci di dalam canvas (*strictly clamped*) dan kartu lain bergeser otomatis membuka celah (*merapat slide animation*) disertai slot preview (*Letakkan di Sini*).
  2. *Tap-to-Swap:* Mengetuk kartu A lalu mengetuk kartu B untuk bertukar posisi secara instan tanpa perlu menyeret panjang di layar proyektor besar.
- **Tombol Kontrol Bawah (Tablet First):**
  - `[ 🔀 Acak Ulang (Shuffle) ]`: Mengacak ulang susunan kartu (tinggi 48px).
  - `[ ✨ Periksa Urutan (Check my order) ]`: Memvalidasi urutan saat ini (tinggi 48px).
- **Status Umpan Balik:**
  - Kartu yang sudah di posisi benar menyala border hijau emas berkilau (`border-emerald-500 shadow-emerald-200 ring-2 ring-emerald-400`).
  - Kartu yang keliru menyala border merah lembut (`border-rose-400 ring-2 ring-rose-300`).

#### 3. Schema Data TypeScript
```typescript
export interface SequenceItem {
  id: string;
  order: number; // Urutan benar (1, 2, 3, ...)
  label: string; // Teks langkah (misal: "Biji Mulai Disemai")
  iconEmoji: string; // Emoji representatif (misal: "🌱")
  description?: string; // Penjelasan ringkas tahap ini
}

export interface SequenceGameData {
  title: string;
  instruction: string;
  items: SequenceItem[];
  explanationOnCorrect: string;
}
```

---

### B. Game Tipe 2: `Match A to B` / `Match the Pairs` (Jodohkan Pasangan)
*Sesuai kartu Canva "Match the Pairs - Match each formal phrase to its casual equivalent"*

#### 1. Tujuan Pedagogis
Melatih pemahaman relasi konseptual:
- **Sains:** Organ Tubuh $\leftrightarrow$ Fungsi Biologis, Satuan $\leftrightarrow$ Besaran Fisika.
- **Bahasa:** Kosakata Baku $\leftrightarrow$ Makna Kontekstual, Frasa Formal $\leftrightarrow$ Frasa Kasual.
- **Sejarah:** Tokoh Pahlawan $\leftrightarrow$ Peristiwa Bersejarah.
- **Matematika:** Rumus $\leftrightarrow$ Nama Bangun Datar.

#### 2. Tampilan & Interaksi
- **Dua Kolom Sejajar (Kolom Kiri A & Kolom Kanan B):**
  - Kolom Kiri: Butir pertanyaan / istilah (warna pastel ungu/lavender).
  - Kolom Kanan: Butir definisi / padanan (warna pastel biru/cyan).
- **Garis Penghubung Dinamis (SVG Rubber-Band Lines):**
  - Saat siswa memilih item kiri lalu mengklik item kanan, garis putus-putus beranimasi (`stroke-dasharray="6 4"`) terhubung secara visual di antara kedua kartu.
- **Validasi Pasangan:**
  - Tombol `[ ↻ Reset Garis ]`: Menghapus seluruh sambungan garis.
  - Tombol `[ ✨ Periksa Pasangan (Check my matches) ]`: Mengecek kebenaran seluruh koneksi garis secara simultan. Pasangan yang benar berubah warna menjadi hijau cerah dengan badge centang, pasangan yang salah berubah menjadi merah muda lembut.

#### 3. Schema Data TypeScript
```typescript
export interface MatchPairItem {
  id: string; // Unique pair ID (misal: 'pair-1')
  leftText: string; // Istilah / Konsep di kolom kiri
  rightText: string; // Definisi / Pasangan di kolom kanan
}

export interface MatchPairsGameData {
  title: string;
  instruction: string;
  pairs: MatchPairItem[];
  explanationOnComplete: string;
}
```

---

### C. Game Tipe 3: `Interactive 3D Flashcards` (Kartu Balik Konsep)
*Sesuai kartu Canva "Flashcards"*

#### 1. Tujuan Pedagogis
Membangun ingatan aktif (*active recall*) dan pengulangan berkala (*spaced repetition*) untuk rumus matematika, tanggal penting, atau kosakata ilmiah.

#### 2. Tampilan & Interaksi
- Menggunakan CSS 3D Transforms (`perspective: 1000px`, `transform: rotateY(180deg)` dengan `backface-visibility: hidden`).
- **Sisi Depan (Front):** Pertanyaan, gambar ikon, atau petunjuk misteri.
- **Sisi Belakang (Back):** Kunci jawaban, penjelasan konsep, dan formula matematis.
- **Tombol Rating Penguasaan Diri:**
  - `[ 🔴 Belum Paham (Ulangi Nanti) ]`
  - `[ 🟢 Sudah Paham (Lanjut) ]`

---

### D. Game Tipe 4: `Multiple Choice Arena` (Pilihan Ganda Canva Style)
*Sesuai kartu Canva "Multiple Choice - Science Quiz"*

#### 1. Tujuan Pedagogis
Mengecek pemahaman kilat seluruh kelas (*warm-up check* atau *exit ticket*).

#### 2. Tampilan & Interaksi
- Teks pertanyaan ekstra besar (font size 24px-32px) dengan kontras tajam untuk baris belakang kelas proyektor.
- Tombol pilihan kapsul `rounded-2xl` dengan tinggi minimal 56px (standar sentuhan IFP).
- Tombol submit besar berwarna magenta cerah (khas Canva `#D83F87` atau `#E11D48`).

---

## 3. Arsitektur Engine: `InteractiveStoryPresentationModal`

Engine ini menyatukan slide presentasi guru dan game-game di atas ke dalam satu siklus pembelajaran utuh:

### Format Struktur Slide:
1. **Slide 1: Narrative Intro (Kisah Pembuka):**
   - Menghadirkan konteks naratif petualangan / kasus (misal: Ekspedisi Hutan Amazon, Misteri Candi Kuno, Misi Roket Mars).
   - Karakter mentor (Profesor / Penjelajah) yang menyapa siswa.
2. **Slide 2: Concept Bite (Materi Inti):**
   - Infografis visual bersih bergaya Canva dengan 3 poin materi utama.
3. **Slide 3: Mini-Game Challenge (Tantangan Interaktif):**
   - Siswa maju ke depan proyektor / kelas berdiskusi bersama untuk menyelesaikan game (Sequence atau Match Pairs).
4. **Slide 4: Story Resolution (Dampak Solusi Siswa):**
   - Narasi kelanjutan: "Berkat bantuanmu mengurutkan fotosintesis, pohon purba kembali berbunga hijau dan ekosistem terselamatkan!"
5. **Slide 5: Classroom Reflection & Discussion (Catatan Guru):**
   - 2-3 pertanyaan refleksi mendalam yang bisa ditanyakan guru kepada kelas (*Discussion Sparkers*).

---

## 4. Desain Visual Canva Education: Standard Tokens

Untuk menjaga estetika Canva yang bersih, bersahabat, dan flat:
- **Sudut Lengkung:** `rounded-2xl` (16px) untuk kartu kecil, `rounded-3xl` (24px) untuk container panggung.
- **Palet Pastel Lembut:**
  - Latar slide: `#F8FAFC` atau gradien pastel lembut.
  - Aksen Sequence: Oranye hangat (`bg-amber-500`, `bg-amber-50`, border `border-amber-200`).
  - Aksen Match Pairs: Lavender ungu (`bg-purple-600`, `bg-purple-50`, border `border-purple-200`).
  - Aksen Quiz: Rose pink (`bg-pink-600`, `bg-pink-50`, border `border-pink-200`).
- **Larangan Pill Status Percakapan AI ("Berbicara...", dsb):** DILARANG KERAS menyematkan badge teks seperti "Berbicara...", "Sedang Bicara...", atau animasi ping status pada balon ucapan karakter mentor. Balon dialog komik dan animasi SVG karakter sudah cukup menyampaikan konteks percakapan secara natural tanpa clutter visual.
- **Larangan Tombol Next Slide di Dalam Konten Slide:** Navigasi antarslide dipusatkan secara eksklusif pada **Footer Navigation Bar panggung presentasi** (`[ < Slide Sebelumnya ]` dan `[ Slide Berikutnya > ]`). DILARANG KERAS menempatkan tombol "Next Slide", "Buka Materi Selanjutnya", atau tombol CTA pergantian slide di dalam konten slide atau di dalam balon dialog karakter. Hal tersebut menyebabkan duplikasi kontrol navigasi dan mengotori estetika layout presentasi.
- **HARD RULE: Zero-Scroll & Anti-Overflow pada Canvas Slide:** Canvas panggung presentasi WAJIB 100% bebas scroll (`overflow-hidden`). DILARANG KERAS membiarkan ada elemen yang meluap (*overflow*) atau memicu munculnya scrollbar vertikal/horizontal. Seluruh elemen materi (infografis, diagram SVG, kartu tahapan proses, opsi jawaban) harus fit secara proporsional di dalam viewport proyektor (`flex-1 min-h-0`). Jika ada detail konsep lanjutan, tampilkan via overlay/modal terpisah dengan tombol tutup.
- **HARD RULE: Larangan Switcher/Segmented Tab Kerdil di Dalam Slide — Desain UI/UX Game Tablet:** DILARANG KERAS membuat widget switcher/tab segmented kerdil (`[ Mode A | Mode B ]`) atau tombol *perbesar zoom* kecil di dalam slide. Komponen desktop seperti ini terlalu kecil, sulit dibaca, dan tidak ergonomis pada layar sentuh tablet atau smartboard interaktif di kelas. Desain slide wajib terfokus dan deterministik (jika ada infografis, tampilkan infografis langsung; jika kartu konsep, tampilkan kartu konsep langsung). Setiap tombol interaktif pada slide wajib berstandar permainan tablet: target sentuh minimal 44px–48px, sudut membulat lebar (`rounded-2xl`), tipografi tebal (`font-black`), kontras tinggi, dan efek sentuh tactile (`active:scale-95`).
- **HARD RULE: Larangan Tombol Aksi Mini/Pill Kerdil di Dalam Canvas — Standar Chunky Tablet Buttons:** Seluruh tombol aksi interaktif di dalam slide (seperti selector tahapan daur air, kontrol langkah mini-game, dan hotspot materi) WAJIB bertaraf **Tablet & Smartboard First** dengan tinggi target sentuh minimal **48px–56px** (atau minimal 44px–48px pada grid padat). DILARANG KERAS membuat tombol aksi berukuran chip tipis atau pill kerdil (`py-0.5`, `py-1`, teks 10px-11px) yang mengambang tanpa dock aksi. Tombol aksi wajib memiliki affordance sentuh yang tegas: `rounded-2xl`, border 2px solid tebal, tipografi `font-black text-xs sm:text-sm`, shadow fisik, dan efek pegas sentuh (`active:scale-95`).
- **HARD RULE: Standar Chess.com Pointer Drag & Desain Kartu TCG pada Sequence Game:** DILARANG KERAS menggunakan drag-and-drop native HTML5 (`draggable`) dengan ghost transparan, header angka kaku (`:: 1`), atau tombol panah geser footer (`[ ← ] Geser [ → ]`) pada kartu Sequence. Mini-game Sequence WAJIB menggunakan engine **Pointer Events** (`setPointerCapture`) dengan batas sentuh terkunci di dalam canvas (`strictly clamped`). Kartu lain wajib bergeser otomatis membuka slot kosong (*merapat slide animation*) dan menampilkan preview gap (`Letakkan di Sini`). Desain kartu wajib bertaraf **Trading Card Game (TCG)**: visual art penuh/berbingkai indah, tanpa nomor posisi kaku, tanpa grip dots, dan mendukung tap-to-swap untuk kemudahan aksesibilitas kelas.


---

## 5. Arsitektur File Modular Materi & Slide (Standar Wajib Anti File Menumpuk)

> [!IMPORTANT]
> **ATURAN MUTLAK MANAJEMEN BERKAS:**
> Mengingat platform akan terus bertambah dengan puluhan hingga ratusan game/materi kurikulum baru, **DILARANG KERAS** menyatukan banyak slide atau banyak materi ke dalam satu file typescript monolithic!

Setiap materi pembelajaran atau game slide deck baru **WAJIB** diorganisasikan ke dalam direktori modular di `src/data/presentation-decks/materi/[materi-slug]/`:

```
src/data/presentation-decks/materi/[materi-slug]/
├── minigames-data.ts        # Data array mini-game (Sequence items, Match pairs, Flashcards)
├── slides/                  # FOLDER BERISI 1 FILE PER SLIDE
│   ├── slide-1-narrative.ts
│   ├── slide-2-infografis.ts
│   ├── slide-3-fotosintesis.ts
│   ├── slide-4-urutkan.ts
│   ├── slide-5-jodohkan.ts
│   ├── slide-6-resolusi.ts
│   └── slide-7-refleksi.ts
└── index.ts                 # Export deck data, re-export all slides & minigames
```

### Konvensi Pembuatan Slide Baru:
1. **Pemisahan Slide Per Berkas:** Setiap slide harus mengekspor objek bertipe `SlideDefinition` dengan ID unik berawalan inisial game (misal: `uts-slide-1`, `lab-slide-2`).
2. **Integritas Referensi Mini-Game:** Jika slide memuat mini-game (`mini-game-sequence`, `mini-game-match`, atau `mini-game-flashcard`), properti `items`, `pairs`, atau `cards` **WAJIB** mengimpor konstanta dari `../minigames-data` (contoh: `items: WATER_CYCLE_SEQUENCE`). Jangan menulis array literal baru di dalam slide untuk menjaga referensi identitas data (*data identity parity*).
3. **Pendaftaran di Barrel:**
   - Masukkan materi sains ke `science-decks.ts` dan daftarkan di `SCIENCE_PRESENTATION_DECKS`.
   - Masukkan materi humaniora/matematika/bahasa ke `humanities-decks.ts` dan daftarkan di `HUMANITIES_PRESENTATION_DECKS`.
   - Master registry `ALL_PRESENTATION_DECKS` di `src/data/presentation-decks/index.ts` akan otomatis mengenali game baru tanpa duplikasi kode.
