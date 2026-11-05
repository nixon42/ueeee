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
ueeee (ueeee.my.id) adalah platform edukasi terbuka berbasis kumpulan game interaktif (seperti Ular Tangga edukasi, Point and Click eksplorasi sains/sejarah, puzzle, dan kuis visual) yang dapat diakses secara gratis dan langsung tanpa login.

## Positioning
Berbeda dari Learning Management System (LMS) konvensional yang kaku dan mewajibkan akun login atau paywall, ueeee langsung menyambut pengunjung ke dashboard Canva-style yang vibrant, fun, dan langsung bisa dimainkan dalam 1 klik.

## Operating Context
- Web browser pada desktop, laptop, tablet, dan smartphone di ruang kelas maupun di rumah.
- Dihosting secara statis di GitHub Pages dengan custom domain ueeee.my.id.
- Akses terbuka tanpa otentikasi (guest-first), dengan arsitektur client-side yang siap berintegrasi dengan Supabase untuk leaderboard global, sync kuis, dan data materi dinamis.

## Capabilities and Constraints
- Direct Entry Dashboard: Tidak ada landing page pemasaran terpisah; pengguna langsung masuk ke dashboard visual Canva-style.
- Modul Game Interaktif:
  1. Ular Tangga Edukatif (Board game interaktif dengan dadu animasi, tantangan kuis/trivia di petak khusus, mode solo / vs bot / multiplayer lokal).
  2. Point & Click Adventure/Exploration (Eksplorasi adegan interaktif, laboratorium sains virtual, museum sejarah, tebak objek tersembunyi).
  3. Mini-Games & Puzzles (Kuis interaktif, drag & drop susun kata/formula, flashcards).
- Client-side State & Storage: Penyimpanan skor dan progres lokal via `localStorage`, dengan skema yang siap sinkronisasi ke Supabase.
- Responsive & Touch-friendly: Optimal untuk layar proyektor kelas, laptop, maupun HP siswa.

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
