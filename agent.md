# Agent Guidelines: ueeee (ueeee.my.id)

Selamat datang di proyek **ueeee** (`ueeee.my.id`). Panduan ini berisi aturan, arsitektur, konvensi kode, dan standar visual untuk agen dan developer yang berkontribusi pada repositori ini.

> 📖 **PENTING UNTUK AGENT PENERUS (JANGAN REINVENT THE WHEEL):**
> 1. **Katalog Komponen Siap Pakai:** Wajib gunakan komponen yang sudah ada di [`COMPONENTS.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/COMPONENTS.md) (`GameStageShell`, `GameQuizModal`, `GameVictoryModal`, dsb). Jangan buat wrapper modal atau dialog kuis dari nol!
> 2. **Spesifikasi Game & Batasan Kelas:** Standar rasio proyektor, target sentuh 48px, dan aturan game ada di [`GAME_SPEC.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/GAME_SPEC.md).
> 3. **Standar Animasi 60 FPS & Arsitektur Chess.com:** Wajib pelajari arsitektur 4-layer rendering, GPU-accelerated `translate3d`, dan audio synthesis di [`CHESS_ENGINE_INSIGHTS.md`](file:///run/media/nixon/6fde869e-c24a-48e3-80a4-6e3a943a14db/Project/ueeee/CHESS_ENGINE_INSIGHTS.md) saat membangun game papan atau interaktif baru!
> Wajib baca ketiga dokumen tersebut sebelum memodifikasi atau membuat materi game baru!

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

## 5. Struktur Direktori Proyek

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
│   │   ├── dashboard/          # Canva-style header, search, category pills, banner
│   │   ├── game-card/          # Reusable card component
│   │   ├── modals/             # Game modal launcher & instructions
│   │   └── ui/                 # Buttons, badges, dialogs, tabs
│   ├── games/
│   │   ├── ular-tangga/        # Snakes & Ladders game engine
│   │   ├── point-and-click/    # Point and Click exploration engine
│   │   └── common/             # Game shell, scoring, sound managers
│   ├── data/
│   │   ├── categories.ts       # Kategori mapel & game
│   │   ├── games-catalog.ts    # Daftar katalog game dan materi
│   │   └── questions-bank.ts   # Bank soal untuk Ular Tangga dsb.
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client setup (persiapan cloud)
│   │   ├── storage.ts          # LocalStorage helpers
│   │   └── sound.ts            # Sound effects player
│   ├── types/                  # TypeScript interfaces
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind CSS imports & animations
├── agent.md                    # File ini (pedoman developer & AI agent)
├── PRODUCT.md                  # Impeccable product specification
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 6. Standar Penulisan Kode & Konvensi

1. **TypeScript First:** Semua komponen dan fungsi wajib menggunakan tipe data yang jelas (`interface` / `type`).
2. **Modular Game Contract:** Setiap game harus mengimplementasikan interface standar (`GameManifest`, `GameRunnerProps`, `GameResult`).
3. **Responsive by Default:** Setiap tampilan harus diuji baik untuk desktop (proyektor sekolah) maupun smartphone siswa.
4. **No Mandatory Login:** Jangan pernah menambahkan form otentikasi yang memblokir akses ke game. Fitur akun atau sync cloud hanya bersifat opsional di masa mendatang.
5. **Clean Commits:** Gunakan pesan commit yang deskriptif (misal: `feat(dashboard): add canva-style hero header with search`).
