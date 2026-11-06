# Agent Guidelines: ueeee (ueeee.my.id)

Selamat datang di proyek **ueeee** (`ueeee.my.id`). Panduan ini berisi aturan, arsitektur, konvensi kode, dan standar visual untuk agen dan developer yang berkontribusi pada repositori ini.

> 📖 **PENTING UNTUK AGENT PENERUS (JANGAN REINVENT THE WHEEL):**
> 1. **Katalog Komponen Siap Pakai:** Wajib gunakan komponen yang sudah ada di [`COMPONENTS.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/COMPONENTS.md) (`GameStageShell`, `GameQuizModal`, `GameVictoryModal`, `CanvaSequenceGame`, `CanvaMatchPairsGame`, dsb). Jangan buat wrapper modal atau dialog kuis dari nol!
> 2. **Spesifikasi Game & Batasan Kelas:** Standar rasio proyektor, target sentuh 48px, dan aturan game ada di [`GAME_SPEC.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/GAME_SPEC.md).
> 3. **Standar Animasi 60 FPS & Arsitektur Chess.com:** Wajib pelajari arsitektur 4-layer rendering, GPU-accelerated `translate3d`, dan audio synthesis di [`CHESS_ENGINE_INSIGHTS.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/CHESS_ENGINE_INSIGHTS.md) saat membangun game papan atau interaktif baru!
> 4. **Game Interaktif Canva Education & Presentasi Cerita:** Wajib pelajari format slide presentasi bercerita dan mini-game urutan/pasangan di [`CANVA_INTERACTIVE_GAMES_SPEC.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/CANVA_INTERACTIVE_GAMES_SPEC.md)!
> Wajib baca dokumen-dokumen tersebut sebelum memodifikasi atau membuat materi game baru!

---

## 1. Visi & Filosofi Produk

- **Nama Aplikasi:** ueeee
- **Domain Resmi:** `ueeee.my.id`
- **Konsep:** Platform SaaS terbuka kumpulan materi pembelajaran interaktif berbasis game (Gamified Learning Hub).
- **Zero-Barrier Access:** Tidak memerlukan pendaftaran akun atau login sama sekali. Siswa dan guru langsung dapat mengakses, memilih, dan memainkan materi edukasi dalam 1 klik.
- **Canva-Style Direct Dashboard:** Tanpa landing page pemasaran konvensional. Begitu website dibuka, pengguna langsung masuk ke dashboard visual yang interaktif, bersih, modern, flat, dan colorful layaknya dashboard Canva.
- **Target Pengguna:** Siswa & Guru K-12 di Indonesia (SD, SMP, SMA) serta umum.

---

## 2. Arsitektur & Tech Stack

| Layer | Pilihan Teknologi | Keterangan |
|---|---|---|
| **Build Tool & Framework** | Vite + React (TypeScript) | Cepat, ringan, dan sangat responsif untuk game web interaktif |
| **Styling System** | Tailwind CSS + Lucide React Icons | Utilitas modern, palet warna vibrant, custom animations |
| **Hosting Target** | GitHub Pages (`ueeee.my.id`) | Static Single Page Application (SPA) dengan custom domain CNAME |
| **Database & Cloud (Future)** | Supabase (`@supabase/supabase-js`) | Integrasi client-side tanpa backend Node.js untuk leaderboard & materi |
| **State & Local Storage** | React Hooks + LocalStorage | Menyimpan skor, riwayat permainan, dan preferensi pengguna secara lokal |
| **Audio & SFX** | Web Audio API / Howler.js | Efek suara dadu, klik tombol, kemenangan, dan feedback interaktif |

---

## 3. Desain & Estetika Visual (Standar `/impeccable`)

Desain mengacu langsung pada visual identity **Canva Dashboard**:
1. **Header Hero Section:**
   - Gradien latar belakang pastel lembut (misal: perpaduan Cyan lembut `#E0F2FE`, Lavender `#F3E8FF`, dan Pink pastel `#FCE7F3`).
   - Judul sambutan yang ramah: *"Mau belajar apa hari ini?"* dengan tipografi tebal dan bersahabat.
   - Search bar berbentuk kapsul (`rounded-full`) dengan ikon pencarian, placeholder interaktif, dan efek glow fokus.
2. **Kategori Navigasi Horizontal (Canva Icon Pills):**
   - Baris ikon melingkar dengan warna-warna cerah (Ular Tangga, Point & Click, Matematika, Sains, Bahasa, Petualangan, Teka-teki).
   - Badge status interaktif (misal: "Baru", "Populer").
3. **Banner Kartu Fitur (Feature Highlights):**
   - Card banner dengan gradien cerah dan kontras tinggi (seperti Magic Layers/Magic Eraser di Canva) yang menyorot game unggulan bulan ini.
4. **Grid & Carousel Konten (Card Deck):**
   - Kartu dengan sudut melengkung halus (`rounded-2xl` atau `rounded-3xl`), border tipis yang elegan, dan efek hover lift halus (`hover:-translate-y-1 transition-all duration-200`).
   - Tag mata pelajaran, jenjang kelas, dan durasi perkiraan bermain di setiap kartu.

---

## 4. Modul Game Interaktif

Struktur modular di bawah folder `src/games/`:

### A. Ular Tangga Edukatif (`src/games/ular-tangga/`)
- Papan permainan interaktif (Grid 10x10 atau custom layout).
- Dadu 3D/animasi roll dadu dengan fisika seru.
- Petak tantangan kuis/pertanyaan edukasi (misal jika mendarat di petak tangga atau ular, harus menjawab soal materi pembelajaran untuk naik atau menghindari turun).
- Mode Solo (melawan Bot Edu) dan Mode Berdua (Pass & Play lokal).

### B. Point and Click Adventure (`src/games/point-and-click/`)
- Eksplorasi visual interaktif (misal: Laboratorium Sains Maya, Museum Sejarah Nusantara, Tata Surya Interaktif).
- Deteksi hotspot klik untuk menemukan petunjuk, dialog interaktif, dan menyelesaikan misi pembelajaran.
- Mini-inventory atau catatan jurnal siswa selama eksplorasi.

### C. Teka-Teki Kata & Rumus Sains (`src/games/puzzle/`)
- Permainan susun huruf interaktif untuk membentuk istilah ilmiah, rumus, dan peribahasa.
- Sistem validasi instan, bantuan/penjelasan konsep, dan skor streak.

### D. Fitur Guru & Mode Kelas (`src/components/modals/TeacherSheetModal.tsx`)
- Tampilan lembar kerja dan bank soal yang dapat dicetak langsung (`window.print()`).
- Mode Proyektor Kelas dengan teks diperbesar untuk kenyamanan pandangan proyektor sekolah.

---

## 5. Struktur Direktori Proyek & Arsitektur Modular Materi

> [!IMPORTANT]
> **STANDAR MODULARISASI MATERI (ANTI 1-FILE JUMBO):**
> Rencana platform akan menampung puluhan hingga ratusan game/materi baru. DILARANG KERAS menumpuk definisi slide dan materi ke dalam satu file besar!
> Setiap materi **WAJIB** mengikuti hierarki berikut di bawah `src/data/presentation-decks/materi/`:
> 1. **1 Materi = 1 Folder Dedikasi:** Misal `materi/daur-air-cendrawasih/`, `materi/lab-kimia-maya/`.
> 2. **1 Slide = 1 File Dedikasi:** Disimpan di subfolder `slides/` (misal: `slide-1-narrative.ts`, `slide-2-infografis.ts`, dst).
> 3. **Data Mini-Game Terpisah:** Disimpan di `minigames-data.ts` (Sequence, Match Pairs, Flashcards). Slide yang memuat tantangan harus mengimpor referensi konstan dari berkas ini, BUKAN mendefinisikan array inline.
> 4. **Entry Point Deck Bersih:** Disimpan di `index.ts` folder materi yang mengekspor data deck dan re-ekspor slides serta minigames.
> 5. **Registry Barrel:** `science-decks.ts` dan `humanities-decks.ts` hanya bertindak sebagai barrel re-export registry ke `index.ts`.

```
ueeee/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages automated deployment
├── .impeccable/
│   └── config.json             # Konfigurasi Impeccable (buildPath: comp)
├── public/
│   ├── CNAME                   # ueeee.my.id
│   └── assets/
│       ├── audio/              # Sound effects (dice roll, correct, click)
│       └── images/             # Game covers & thumbnails
├── src/
│   ├── assets/                 # SVGs, icons, illustrations
│   ├── components/
│   │   ├── canva-games/        # StoryPresentationDeckEngine, CanvaSequenceGame, dsb.
│   │   ├── dashboard/          # Canva-style header, search, category pills, banner
│   │   ├── visuals/            # KakGalihAvatar, EcosystemCanvasBackground, Svg illustrations
│   │   ├── modals/             # Game modal launcher & instructions
│   │   └── ui/                 # Buttons, badges, dialogs, tabs
│   ├── data/
│   │   ├── categories.ts       # Kategori mapel & game
│   │   ├── games-catalog.ts    # Daftar katalog game dan materi
│   │   ├── presentation-decks/ # Story Presentation Decks Architecture
│   │   │   ├── materi/         # FOLDER MODULAR PER MATERI
│   │   │   │   ├── [materi-slug]/
│   │   │   │   │   ├── minigames-data.ts  # Urutan, pasangan, kartu konsep
│   │   │   │   │   ├── slides/            # 1 FILE PER SLIDE
│   │   │   │   │   │   ├── slide-1-....ts
│   │   │   │   │   │   ├── slide-2-....ts
│   │   │   │   │   │   └── slide-N-....ts
│   │   │   │   │   └── index.ts           # Export deck & items materi
│   │   │   ├── science-decks.ts    # Barrel re-export Sains & Lab
│   │   │   ├── humanities-decks.ts # Barrel re-export Matematika, Budaya & Logika
│   │   │   └── index.ts            # Master ALL_PRESENTATION_DECKS registry
│   │   └── questions-bank.ts   # Bank soal untuk Ular Tangga dsb.
│   ├── types/                  # TypeScript interfaces (presentation, games, catalog)
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind CSS imports & animations
```

---

## 6. Standar Penulisan Kode & Konvensi

1. **TypeScript First:** Semua komponen dan fungsi wajib menggunakan tipe data yang jelas (`interface` / `type`).
2. **Modular Game Contract:** Setiap game harus mengimplementasikan interface standar (`GameManifest`, `GameRunnerProps`, `GameResult`).
3. **Responsive by Default:** Setiap tampilan harus diuji baik untuk desktop (proyektor sekolah) maupun smartphone siswa.
4. **No Mandatory Login:** Jangan pernah menambahkan form otentikasi yang memblokir akses ke game. Fitur akun atau sync cloud hanya bersifat opsional di masa mendatang.
5. **Clean Commits:** Gunakan pesan commit yang deskriptif (misal: `feat(dashboard): add canva-style hero header with search`).
6. **Larangan Pill/Badge Status Percakapan AI ('Berbicara...', dsb):** DILARANG KERAS menambahkan badge teks berkedip seperti `'Berbicara...'`, `'Sedang Menjelaskan...'`, atau indikator status percakapan AI yang redundan pada balon ucapan (*speech bubble*) karakter/mentor. Balon ucapan sudah memiliki pointer segitiga visual dan animasi mulut/napas natural. Menambahkan teks status seperti itu merusak estetika antarmuka, menambah *visual clutter*, dan terkesan artifisial (*AI slop*).
7. **Larangan Tombol Next Slide di Dalam Konten Slide:** DILARANG KERAS membuat tombol duplikat untuk lanjut ke slide berikutnya (misal: "Buka Materi Selanjutnya", "Mulai Ekspedisi", tombol CTA di dalam balon dialog karakter) di dalam body konten slide. Navigasi pergantian slide adalah tanggung jawab eksklusif **Footer Navigation Bar deck** (`[ < Slide Sebelumnya ]` dan `[ Slide Berikutnya > ]`). Menaruh tombol next di dalam slide menciptakan duplikasi kontrol navigasi, membingungkan pengguna kelas, dan mengotori tata letak materi.
8. **HARD RULE: Zero-Scroll & Anti-Overflow pada Canvas Slide:** DILARANG KERAS membiarkan canvas presentasi atau panggung game memiliki scrollbar vertikal/horizontal (`overflow-y-auto` pada container panggung dilarang). Seluruh elemen slide (infografis, diagram SVG, kartu tantangan mini-game, dan catatan guru) WAJIB terkunci rapi dan pas 100% dalam satu layar viewport (`overflow-hidden`, `flex-1 min-h-0`). Tidak boleh ada satupun elemen yang meluap (*overflow*). Jika membutuhkan ruang ulasan lebih lanjut, gunakan overlay terarah yang menutup rapi di atas canvas.
9. **HARD RULE: Larangan Switcher/Segmented Tab Kerdil di Dalam Slide — Desain UI/UX Game Tablet:** DILARANG KERAS membuat widget switcher/tab segmented kerdil (`[ Mode A | Mode B ]`) atau tombol *perbesar zoom* kecil di dalam slide. Komponen desktop seperti ini terlalu kecil, sulit dibaca, dan tidak ergonomis pada layar sentuh tablet atau smartboard interaktif di kelas. Desain slide wajib terfokus dan deterministik (jika ada infografis, tampilkan infografis langsung; jika kartu konsep, tampilkan kartu konsep langsung). Setiap tombol interaktif pada slide wajib berstandar permainan tablet: target sentuh minimal 44px–48px, sudut membulat lebar (`rounded-2xl`), tipografi tebal (`font-black`), kontras tinggi, dan efek sentuh tactile (`active:scale-95`).
10. **HARD RULE: Larangan Tombol Aksi Mini/Pill Kerdil di Dalam Canvas — Standar Chunky Tablet Buttons:** DILARANG KERAS membuat tombol aksi interaktif berukuran mini, chip tipis, atau pill kerdil (`py-0.5`, `py-1`, font < 12px) di dalam canvas presentasi atau panggung game. Tombol interaktif (hotspot tahapan, opsi langkah mini-game, dsb) adalah target aksi sentuh utama (*primary touch target*). Seluruh tombol aksi WAJIB bertaraf **Tablet & Smartboard First**: tinggi target sentuh minimal **48px–56px** (atau minimal 44px–48px pada grid padat), padding proporsional (`px-4 sm:px-5 py-2.5 sm:py-3`), sudut membulat lebar (`rounded-2xl`), tipografi tebal (`font-black text-xs sm:text-sm`), bayangan nyata (*tactile shadow*), serta efek tekan responsif (`active:scale-95 active:shadow-inner`). Hindari menaruh deretan pill mini mengambang tanpa dock aksi yang jelas.
11. **HARD RULE: Standar Chess.com Pointer Drag & Desain Kartu TCG pada Sequence Game:** DILARANG KERAS menggunakan drag-and-drop native HTML5 (`draggable`) dengan ghost transparan, header angka kaku (`:: 1`), atau tombol panah geser footer (`[ ← ] Geser [ → ]`) pada kartu Sequence. Mini-game Sequence WAJIB menggunakan engine **Pointer Events** (`setPointerCapture`) dengan batas sentuh terkunci di dalam canvas (`strictly clamped`). Kartu lain wajib bergeser otomatis membuka slot kosong (*merapat slide animation*) dan menampilkan preview gap (`Letakkan di Sini`). Desain kartu wajib bertaraf **Trading Card Game (TCG)**: visual art penuh/berbingkai indah, tanpa nomor posisi kaku, tanpa grip dots, dan mendukung tap-to-swap untuk kemudahan aksesibilitas kelas.
