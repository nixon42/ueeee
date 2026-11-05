# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Vite + React + TypeScript + Tailwind CSS (Static SPA optimized for GitHub Pages, with client-side Supabase readiness)

## Users
Siswa & Guru K-12 di Indonesia (SD, SMP, SMA).
- Siswa: Mencari materi pembelajaran yang seru, interaktif, dan langsung bisa dimainkan tanpa ribet registrasi atau login.
- Guru: Mencari media pembelajaran interaktif untuk ice-breaking, kuis interaktif di kelas, atau tugas mandiri siswa.

## Product Purpose
ueeee (ueeee.my.id) adalah platform edukasi terbuka berbasis kumpulan presentasi interaktif dan game edukatif (seperti Presentasi Cerita Canva Sequence/Match Pairs, Ular Tangga edukasi GPU-accelerated, Point and Click ekspedisi sains/sejarah, Teka-Teki Catur & Taktik Logika 60 FPS, dan puzzle kata) yang dapat diakses secara gratis dan langsung tanpa login.

## Positioning & Core Philosophy ("Presentasi Bercerita + Mini-Game")
Berbeda dari Learning Management System (LMS) konvensional yang kaku dan kuis pilihan ganda terisolasi (seperti Kahoot/Quizizz kering tanpa cerita), **ueeee memadukan alur presentasi bercerita (*Story-Driven Slide Presentation*) dengan mini-game interaktif Canva Education**:
1. **Narasi Kontekstual di Awal:** Setiap materi dibuka dengan cerita, pengantar misi, dan dialog karakter mentor (bukan langsung dilempar soal kuis tiba-tiba).
2. **Mini-Game Interaktif Pengganti Kuis:** Kuis pilihan ganda yang monoton digantikan oleh mini-game aktif Canva Education:
   - *Sequence Order:* Mengurutkan proses/siklus (fotosintesis, rantai makanan, linimasa sejarah).
   - *Match A to B:* Menjodohkan konsep dua kolom via garis elastis SVG dinamis.
   - *3D Flashcards:* Kartu balik pemahaman konsep dengan CSS 3D transform.
   - *Chess Tactics & Logic:* Papan catur 60 FPS untuk mengasah logika geometri dan sebab-akibat.
3. **Resolusi Cerita & Diskusi Kelas:** Siswa melihat dampak nyata dari solusi mereka terhadap dunia cerita, diakhiri kartu refleksi pemantik diskusi untuk guru.
4. **Desain Canva-Style Langsung:** Begitu website dibuka, pengguna langsung menyambut dashboard visual yang ceria, flat, modern, dan langsung bisa dimainkan dalam 1 klik tanpa login.

## Operating Context
- **Target Utama: Guru di Depan Kelas** yang memproyeksikan materi ke:
  - Proyektor ruang kelas (resolusi 1080p / SVGA)
  - Interactive Flat Panel (IFP) / Smartboard sentuh
  - TV layar sentuh kelas
- **Target Sekunder:** Siswa yang belajar mandiri via laptop, tablet, atau smartphone.
- Dihosting secara statis di GitHub Pages dengan custom domain `ueeee.my.id`.
- Akses terbuka tanpa otentikasi (guest-first), dengan arsitektur client-side yang siap berintegrasi dengan Supabase untuk leaderboard global, sync kuis, dan data materi dinamis.

## Capabilities and Constraints
- Direct Entry Dashboard: Tidak ada landing page pemasaran terpisah; pengguna langsung masuk ke dashboard visual Canva-style.
- Modul Engine Interaktif:
  1. **Story-Driven Interactive Slide Presentation:** Shell presentasi guru dengan babak cerita, materi infografis, mini-game Sequence/Match Pairs Canva, dan diskusi kelas.
  2. **Canva Interactive Games:** Komponen `CanvaSequenceGame` (drag/tap urutkan langkah) dan `CanvaMatchPairsGame` (jodohkan dua kolom dengan garis SVG putus-putus).
  3. **Chess.com-Style 60 FPS Board Engine:** Arsitektur 4-layer (Static Grid, Highlights, GPU Piece Layer dengan `transform: translate3d`, Feedback Badges) dan sintesis Web Audio API instan.
  4. **Ular Tangga Edukatif:** Papan 100 petak dengan pion meluncur mulus via GPU transforms, tangga/ular SVG, kuis kurikulum, dan mode Vs Bot / 2 Pemain.
  5. **Point & Click Adventure/Exploration:** Adegan laboratorium sains virtual, relief candi sejarah nusantara, dan ekspedisi satwa hutan endemik.
  6. **Teka-Teki Kata & Asah Otak:** Susun kosakata ilmiah, EYD, dan sinonim kata.
- Client-side State & Storage: Penyimpanan skor, favorit, dan riwayat lokal via `localStorage`.
- Responsive & Touch-friendly: Fullscreen stage mode (`100vw × 100vh`) tanpa margin gelap yang membuang area proyektor, target sentuh minimal 48px-56px.

## Brand Commitments
- Nama Produk: ueeee
- Domain: ueeee.my.id
- Visual Identity: Canva-style dashboard; flat, colorful, modern, ceria, dan bersih.
- Core UI Elements:
  - Header gradien lembut (pastel purple/cyan).
  - Search bar melengkung dengan prompt ramah ("Mau belajar apa hari ini?").
  - Kategori pills melengkung dengan ikon warna-warni (Ular Tangga, Point & Click, Sains, Matematika, dsb.).
  - Kartu game bernuansa cover Canva dengan tag badge, thumbnail menarik, dan tombol "Mainkan Langsung".

## Evidence on Hand
- Screenshot acuan layout Canva: Top banner "What will you learn today?", search bar pill rounded, category icons bar horizontal, section "Lanjutkan Belajar" / "Game Populer".
- Screenshot banner visual Canva: Banner gradien bold dengan tag badge dan aksen visual modern.

## Product Principles
1. Zero-Friction Play: Tidak ada penghalang pendaftaran atau login; langsung klik dan mulai belajar.
2. Delightful & Colorful: Visual yang memikat dan tidak membosankan bagi siswa, terinspirasi dari estetika Canva yang modern.
3. Modular Game Engine: Setiap permainan dibangun dalam modul komponen React yang reusable dan terisolasi.
4. Fast & GitHub Pages Friendly: Arsitektur static SPA tanpa ketergantungan server runtime khusus, siap deploy ke GitHub Pages dan integrasi Supabase via client SDK.

## Accessibility & Inclusion
- Palet warna dengan kontras memadai untuk kenyamanan mata dan proyeksi ruang kelas.
- Kontrol interaksi yang mendukung keyboard, mouse click, dan touch screen di gawai mobile.
