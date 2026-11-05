---
name: ueeee
description: Platform SaaS Gamified Learning Terbuka Tanpa Perlu Login (ueeee.my.id)
colors:
  primary: "#00c4cc"
  primary-dark: "#0891b2"
  secondary: "#7d2ae8"
  accent-orange: "#f97316"
  accent-pink: "#ec4899"
  accent-emerald: "#10b981"
  neutral-bg: "#fafbff"
  surface-card: "#ffffff"
  text-primary: "#0f172a"
  text-secondary: "#475569"
  border-subtle: "#e2e8f0"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
  body:
    fontFamily: "Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  search-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    padding: "16px 24px"
---

## Overview
**ueeee** (`ueeee.my.id`) mengadopsi bahasa visual dashboard Canva yang ceria, flat, modern, dan sangat bersahabat bagi siswa serta guru di Indonesia. Antarmuka mengutamakan akses langsung tanpa registrasi/login (*guest-first*), dengan hirarki visual yang bersih dan responsif.

## Colors
- **Brand Core:** `#00c4cc` (Cyan cerah khas ueeee) dan `#7d2ae8` (Ungu modern Canva-style).
- **Surface Accents:** Gradien lembut aurora pada header (`from-sky-100 via-purple-100 to-pink-100`) memberikan kesan ramah dan tidak kaku.
- **Game Accents:** Oranye cerah untuk Ular Tangga (`#f97316`), Teal/Emerald untuk Point & Click (`#0d9488`), dan Biru terang untuk Matematika (`#2563eb`).
- **High Contrast:** Teks judul menggunakan warna solid `#0f172a` (Slate 900) dengan kontras ≥ 7:1 terhadap latar belakang kartu putih.

## Typography
- **Primary Typeface:** `Plus Jakarta Sans`, sans-serif geometris modern dengan angka tabular yang jelas untuk skor permainan.
- **Headline Tone:** Bersahabat dan mendorong eksplorasi (*"Mau belajar apa hari ini?"*).
- **Ukuran Skala:**
  - Hero Display: 3rem – 3.75rem (Font Weight 900)
  - Card Titles: 1rem – 1.125rem (Font Weight 800)
  - Meta/Badges: 0.6875rem – 0.75rem (Font Weight 800, Uppercase tracking)

## Layout
- **Direct Entry:** Tanpa landing page; pengunjung langsung berada di beranda interaktif.
- **Aurora Hero:** Banner melengkung dengan tab kapsul terpadu dan bilah pencarian sentral.
- **Horizontal Category Shelf:** Baris ikon bundar dengan scroll horizontal tanpa scrollbar mengganggu.
- **Responsive Card Grid:** 1 kolom di smartphone, 2 kolom di tablet, dan 3 kolom di desktop resolusi tinggi.

## Elevation & Depth
- **Soft Shadows:** Menghindari drop-shadow keras tanpa blur. Menggunakan bayangan bertingkat lembut (`0 4px 20px -2px rgba(125, 42, 232, 0.08)`).
- **Hover Transitions:** Efek lift vertikal halus (`hover:-translate-y-1 transition-all duration-300`) untuk memberikan umpan balik taktil.

## Shapes
- **Corner Radii:** Menggunakan sudut kurva ekstra melengkung (`rounded-3xl` / 24px pada kartu dan modal, `rounded-full` pada pills dan search bar).
- **Tile Grids:** Papan 10x10 pada Ular Tangga menggunakan petak bersudut melengkung halus dengan penanda angka yang terbaca jelas.

## Components
- **Search Pill:** Bilah pencarian kapsul putih dengan fokus ring aksen ungu dan tombol reset instan.
- **Category Bubble:** Ikon melingkar warna-warni berdiameter 60px dengan label status (*"Populer"*, *"Baru"*).
- **Interactive Modals:** Game modal dengan tombol kontrol audio, reset cepat, tombol pintasan keyboard (Spacebar roll, Escape close), dan efek kemenangan confetti.
- **Teacher Print Sheet:** Modal lembar soal cetak yang siap dicetak langsung (`window.print()`) untuk aktivitas kelas offline.

## Do's and Don'ts
- **DO:** Gunakan warna solid untuk teks judul utama demi keterbacaan proyektor kelas.
- **DO:** Berikan umpan balik audio instan melalui Web Audio API pada setiap interaksi penting.
- **DON'T:** Jangan memasukkan form pendaftaran atau modal login yang membatasi akses materi.
- **DON'T:** Hindari penggunaan efek bounce animasi yang berlebihan; gunakan transisi eksponensial yang halus.
