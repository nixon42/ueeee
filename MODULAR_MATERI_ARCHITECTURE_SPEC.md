# Spesifikasi Arsitektur Modular Materi & Slide (Platform ueeee)

Dokumen ini menjadi aturan standar (*authoritative specification*) untuk seluruh pengembangan materi pembelajaran baru di platform **ueeee** (`ueeee.my.id`). 

Dengan arsitektur ini, penambahan puluhan hingga ratusan game/materi baru di masa depan dapat dilakukan secara rapi, modular, dan terisolasi tanpa ada penumpukan berkas (*anti-monolith*).

---

## 1. Aturan Struktur Folder & Berkas

Setiap materi baru **WAJIB** dibuatkan folder tersendiri di bawah:
`src/data/presentation-decks/materi/[materi-slug]/`

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

---

## 2. Rincian Komponen Tiap Berkas

### A. `minigames-data.ts`
Menyimpan semua data statis tantangan interaktif:
- Urutan tahapan (*Put the steps in order*): `SequenceGameItem[]`
- Jodohkan pasangan (*Match the pairs*): `MatchGamePair[]`
- Kartu konsep 3D (*Flashcards*): `FlashcardItem[]`

```typescript
import { SequenceGameItem, MatchGamePair } from '@/types/presentation';

export const CONTOH_SEQUENCE: SequenceGameItem[] = [
  { id: 'c1', order: 1, label: 'Langkah 1', iconEmoji: '🌱', description: 'Penjelasan...' },
  { id: 'c2', order: 2, label: 'Langkah 2', iconEmoji: '☀️', description: 'Penjelasan...' },
];

export const CONTOH_PAIRS: MatchGamePair[] = [
  { id: 'p1', leftText: 'Istilah', rightText: 'Definisi' },
];
```

### B. `slides/slide-[n]-[slug].ts`
Setiap slide harus berada di berkas mandiri dan mengekspor objek `SlideDefinition`.

Jika slide menyematkan mini-game, **WAJIB** mengimpor konstanta dari `../minigames-data` (bukan mendeklarasikan array inline baru):

```typescript
import { SlideDefinition } from '@/types/presentation';
import { CONTOH_SEQUENCE } from '../minigames-data';

export const slide4Urutkan: SlideDefinition = {
  id: 'slug-slide-4',
  type: 'mini-game-sequence',
  chapterBadge: 'BABAK 4: TANTANGAN URUTAN',
  title: 'Urutkan Tahapan',
  subtitle: 'Geser kartu agar urutannya benar!',
  instruction: 'Tarik kartu atau gunakan panah geser.',
  challengeKey: 'contoh-seq-key',
  items: CONTOH_SEQUENCE, // Wajib menggunakan referensi yang diimpor
};
```

### C. `index.ts`
Mengimpor seluruh slide, merakit objek `PresentationDeckData`, dan mengekspornya keluar:

```typescript
import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';

import { slide1Narrative } from './slides/slide-1-narrative';
import { slide2Infografis } from './slides/slide-2-infografis';
// ... import slide lainnya ...

export const MATERI_CONTOH_DECK: PresentationDeckData = {
  gameId: 'slug-materi',
  title: 'Judul Materi',
  subtitle: 'Subjudul',
  themeColor: 'emerald',
  icon: '🌿',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'IPA / Biologi',
  mentor: {
    name: 'Nama Mentor',
    role: 'Peran Mentor',
    avatarEmoji: '🧭',
  },
  totalSlides: 7,
  slides: [
    slide1Narrative,
    slide2Infografis,
    // ...
  ],
};
```

### D. Standar Bersih UI Slide (Anti-Clutter & Anti-Duplikasi Navigasi)
1. **Larangan Tombol Next Slide di Dalam Slide:** Navigasi antarslide dipusatkan secara eksklusif pada **Footer Navigation Bar** panggung presentasi (`[ < Slide Sebelumnya ]` dan `[ Slide Berikutnya > ]`). DILARANG KERAS menempatkan tombol "Next Slide", "Mulai", atau CTA navigasi di dalam slide/balon percakapan.
2. **Larangan Pill Status AI ("Berbicara...", dsb):** DILARANG KERAS menyematkan pill teks seperti "Berbicara...", "Sedang Menjelaskan...", atau animasi ping status pada balon dialog mentor. Karakter sudah memiliki balon dialog visual terarah dan animasi SVG gerak napas/mulut natural.
3. **HARD RULE: Zero-Scroll & Anti-Overflow pada Canvas Slide:** Canvas panggung presentasi WAJIB 100% bebas scroll (`overflow: hidden`). DILARANG KERAS membiarkan ada elemen yang meluap (*overflow*) atau memicu munculnya scrollbar vertikal/horizontal. Seluruh elemen materi (infografis, diagram SVG, kartu tahapan proses, opsi jawaban) harus fit secara proporsional di dalam viewport proyektor (`flex-1 min-h-0`). Jika ada detail konsep lanjutan, tampilkan via overlay/modal terpisah dengan tombol tutup.
4. **HARD RULE: Larangan Switcher/Segmented Tab Kerdil di Dalam Slide — Desain UI/UX Game Tablet:** DILARANG KERAS membuat widget switcher/tab segmented kerdil (`[ Mode A | Mode B ]`) atau tombol *perbesar zoom* kecil di dalam slide. Komponen desktop seperti ini terlalu kecil, sulit dibaca, dan tidak ergonomis pada layar sentuh tablet atau smartboard interaktif di kelas. Desain slide wajib terfokus dan deterministik (jika ada infografis, tampilkan infografis langsung; jika kartu konsep, tampilkan kartu konsep langsung). Setiap tombol interaktif pada slide wajib berstandar permainan tablet: target sentuh minimal 44px–48px, sudut membulat lebar (`rounded-2xl`), tipografi tebal (`font-black`), kontras tinggi, dan efek sentuh tactile (`active:scale-95`).
5. **HARD RULE: Larangan Tombol Aksi Mini/Pill Kerdil di Dalam Canvas — Standar Chunky Tablet Buttons:** Seluruh tombol aksi interaktif (seperti selector tahapan daur air, tombol mini-game, dan hotspot interaktif) WAJIB bertaraf **Tablet & Smartboard First** dengan tinggi target sentuh minimal **48px–56px** (atau minimal 44px–48px pada grid padat). DILARANG KERAS membuat tombol aksi berupa chip tipis atau pill kerdil (`py-0.5`, `py-1`, teks 10px-11px) yang mengambang tanpa dock aksi yang jelas. Tombol aksi wajib memiliki affordance sentuh yang tegas: `rounded-2xl`, border 2px solid tebal, tipografi `font-black text-xs sm:text-sm`, shadow fisik, dan efek pegas sentuh (`active:scale-95`).
6. **HARD RULE: Standar Chess.com Pointer Drag & Desain Kartu TCG pada Sequence Game:** DILARANG KERAS menggunakan drag-and-drop native HTML5 (`draggable`) dengan ghost transparan, header angka kaku (`:: 1`), atau tombol panah geser footer (`[ ← ] Geser [ → ]`) pada kartu Sequence. Mini-game Sequence WAJIB menggunakan engine **Pointer Events** (`setPointerCapture`) dengan batas sentuh terkunci di dalam canvas (`strictly clamped`). Kartu lain wajib bergeser otomatis membuka slot kosong (*merapat slide animation*) dan menampilkan preview gap (`Letakkan di Sini`). Desain kartu wajib bertaraf **Trading Card Game (TCG)**: visual art penuh/berbingkai indah, tanpa nomor posisi kaku, tanpa grip dots, dan mendukung tap-to-swap untuk kemudahan aksesibilitas kelas.

---

## 3. Pendaftaran di Master Registry

Setelah folder materi siap:
1. Daftarkan di berkas barrel domain:
   - Sains & Lab: `src/data/presentation-decks/science-decks.ts` -> tambahkan ke `SCIENCE_PRESENTATION_DECKS`
   - Matematika, Budaya & Logika: `src/data/presentation-decks/humanities-decks.ts` -> tambahkan ke `HUMANITIES_PRESENTATION_DECKS`
2. `ALL_PRESENTATION_DECKS` di `src/data/presentation-decks/index.ts` akan otomatis mendaftarkannya ke seluruh pencarian katalog, URL deep linking, dan engine presentasi.

---

## 4. Daftar 10 Materi yang Sudah Dimodularisasi

| No | Folder Materi | ID Game (`gameId`) | Mentor | Jumlah Slide | Tipe Mini-Game |
|---|---|---|---|:---:|---|
| 1 | `daur-air-cendrawasih` | `ular-tangga-sains` | Kak Galih | 7 | Sequence (Daur Air) + Match (Energi) |
| 2 | `lab-kimia-maya` | `point-click-lab` | Dr. Maya Arisandi, M.Sc. | 8 | Match (K3) + Sequence (Metode) + Flashcards (Lakmus) |
| 3 | `point-click-hutan` | `point-click-hutan` | Ranger Banyu | 8 | Match (Wallace) + Sequence (Kanopi) + Flashcards (Hutan) |
| 4 | `astronomi-tata-surya` | `ular-tangga-tatasurya` | Capt. Stella | 8 | Sequence (8 Planet) + Match (Antariksa) + Sequence (Gerhana) |
| 5 | `ekosistem-hutan-tropis` | `presentasi-ekosistem-hutan` | Prof. Maya Arisandi | 7 | Sequence (Fotosintesis) + Match (Rantai Makanan) |
| 6 | `matematika-pecahan` | `ular-tangga-matematika` | Kak Arya | 7 | Match (Pecahan Desimal) + Sequence (Balok Pecahan) |
| 7 | `sejarah-borobudur` | `point-click-candi` | Bu Arkeolog Sita | 8 | Sequence (Strata Candi) + Match (Relief) + Flashcards (Borobudur) |
| 8 | `sastra-pantun-kata` | `teka-teki-kata` | Pujangga Samudra | 7 | Match (KBBI Baku) + Sequence (Pantun Nasehat) |
| 9 | `sejarah-proklamasi-1945` | `ular-tangga-sejarah` | Bung Hatta & Ki Hadjar | 8 | Sequence (Linimasa 1945) + Match (Tokoh) + Flashcards (Proklamasi) |
| 10 | `catur-taktik-logika` | `catur-taktik-logika` | Master Utut | 7 | Match (Taktik Catur) + Sequence (Skakmat Koridor) |

Total: **75 Slide Interaktif** diorganisasikan ke dalam **10 Folder Terpisah** dan **75 Berkas Slide Mandiri**.
