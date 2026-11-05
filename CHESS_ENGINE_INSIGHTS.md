# Deep Dive: Arsitektur Frontend Chess.com & Standar Animasi Game 60 FPS

> **Dokumen Insight Arsitektur untuk Developer & Agent Penerus**  
> Dibuat berdasarkan reverse-engineering dan analisis mendalam terhadap frontend engine **Chess.com** (`wc-chess-board`), **Lichess / Chessground**, serta implementasi game edukatif modern di platform **ueeee** (`ueeee.my.id`).

---

## 1. Mengapa Chess.com Terasa Begitu "Smooth" & Responsif?

Banyak developer pemula mengira game web seperti Chess.com dibuat menggunakan HTML5 `<canvas>` atau library grafis berat seperti PixiJS / Phaser. Kenyataannya: **Chess.com dan Lichess menggunakan DOM + SVG + CSS Hardware Acceleration**.

Alasan utama arsitektur ini dipilih:
1. **Ketajaman Vektor Tak Terbatas (Crisp Vector Display):** Di proyektor kelas resolusi 4K atau TV interaktif layar sentuh, grafis raster (`.png`/`.jpg`) akan pecah atau buram. SVG tetap tajam sempurna pada skala berapa pun.
2. **Nol Beban Render Loop (Zero CPU Spinning):** Berbeda dengan Canvas yang harus me-render ulang seluruh frame 60 kali per detik di thread utama, browser mengoptimalkan elemen DOM yang menggunakan CSS 3D transforms langsung di GPU (Compositor Thread).
3. **Aksesibilitas & Pointer Events:** Elemen DOM memudahkan penanganan drag-and-drop, touch gesture, klik, keyboard navigasi, dan screen reader secara native.

---

## 2. Arsitektur 4-Layer Rendering Pipeline (Chess.com Blueprint)

Chess.com membagi papan permainan menjadi **4 lapisan independen** yang ditumpuk (*stacked layers*):

```
┌────────────────────────────────────────────────────────┐
│ Layer 4: SVG Arrows, Badges & Error Icons (z-index: 40)│ <-- [X] Error badge, Panah taktik
├────────────────────────────────────────────────────────┤
│ Layer 3: Piece Layer (z-index: 30)                     │ <-- Pion & bidak (translate3d)
├────────────────────────────────────────────────────────┤
│ Layer 2: Highlights & Move Targets (z-index: 20)       │ <-- Dot valid moves, petak asal/tujuan
├────────────────────────────────────────────────────────┤
│ Layer 1: Static Board Grid (z-index: 10)               │ <-- Petak papan 8x8 / 10x10
└────────────────────────────────────────────────────────┘
```

### Karakteristik Setiap Layer:

#### A. Layer 1: Static Board Grid (Latar Belakang Papan)
- **Aturan:** *Jangan pernah me-render ulang layer ini saat bidak bergerak!*
- Dibuat dengan CSS Grid atau SVG Rect statis.
- Menggunakan palet kontras ramah mata (misal: hijau turnamen `#779956` & krem `#edeed1`, atau slate cerah).
- Koordinat file (`a-h`) dan rank (`1-8`) dicetak di sudut petak tepi dengan `pointer-events: none; user-select: none;`.

#### B. Layer 2: Highlights & Move Targets (Penanda Interaksi)
- Terdiri dari:
  1. **Last Move Highlight:** Dua petak berwarna kuning transparan (`rgba(255, 255, 0, 0.4)`) yang menandai petak asal (*from*) dan petak tujuan (*to*).
  2. **Valid Move Dots:** Lingkaran kecil transparan di tengah petak kosong (`w-3 h-3 rounded-full bg-slate-900/20`).
  3. **Capture Ring:** Lingkaran berongga tipis di sekeliling bidak lawan yang bisa dimakan (`w-full h-full rounded-full border-4 border-slate-900/20`).
  4. **Error Highlight:** Petak merah transparan (`rgba(239, 68, 68, 0.4)`) ketika langkah yang dilakukan keliru (seperti di puzzle mode).
- **Semua elemen highlight wajib memiliki:** `pointer-events: none;` agar tidak menghalangi event klik mouse/sentuhan ke bidak di bawahnya.

#### C. Layer 3: Independent Piece Layer (Lapisan Bidak GPU-Accelerated)
- **Aturan Krusial:** *Bidak TIDAK BOLEH berada di dalam DOM petak (tile div).*
  - **Kesalahan umum pemula:**
    ```html
    <!-- SALAH: Pion dihapus & dibuat ulang setiap kali posisi berubah -->
    <div class="tile square-24">
      {isPawnHere && <div class="pawn">♟</div>}
    </div>
    ```
  - **Standar Chess.com / Chessground:**
    ```html
    <!-- BENAR: Bidak tetap hidup di DOM, diposisikan via GPU Transform -->
    <div class="pieces-layer relative w-full h-full">
      <div 
        class="piece absolute" 
        style="
          width: 12.5%; 
          height: 12.5%; 
          transform: translate3d(200%, 300%, 0); 
          transition: transform 180ms cubic-bezier(0.2, 0, 0, 1);
          will-change: transform;
        "
      >
        <svg class="piece-svg">...</svg>
      </div>
    </div>
    ```
- **Mengapa Persentase (`translate3d(X%, Y%, 0)`) Lebih Unggul daripada Pixel?**
  - Jika ukuran papan berubah (misal: layar HP diputar, resize browser, fullscreen proyektor), posisi bidak **otomatis 100% presisi tanpa perlu kalkulasi ulang di JavaScript**.
  - Pada papan 8x8, tiap petak adalah `12.5%` lebar dan tinggi. Kolom 0 = `0%`, Kolom 1 = `100%`, Kolom 2 = `200%`, dst.
  - Pada papan 10x10 (seperti Ular Tangga), tiap petak adalah `10%`.

#### D. Layer 4: SVG Feedback & Badges
- Menampilkan elemen umpan balik instan:
  - **Error Badge (X):** Lingkaran merah menyala dengan ikon silang putih yang muncul di atas bidak yang salah melangkah (seperti di screenshot Puzzle Chess.com). Diberikan animasi pop-in mikro (`animate-scale-in`).
  - **Check / Danger Badge:** Ikon perisai atau tanda seru saat raja terancam.
  - **SVG Arrows:** Panah taktis untuk petunjuk langkah terbaik (`<svg><marker id="arrowhead">...<path d="M ... Q ...">`).

---

## 3. Matematika Animasi: Menghindari Layout Thrashing

### A. Hirarki Properti CSS Browser:
| Properti CSS | Memicu Layout (Reflow)? | Memicu Paint? | Memicu Composite? | Performa |
|---|---|---|---|---|
| `top`, `left`, `margin` | **YA (Sangat Berat)** | **YA** | **YA** | 🔴 Buruk (Janky, lag di mobile) |
| `width`, `height` | **YA** | **YA** | **YA** | 🔴 Buruk |
| `transform: translate3d()` | **TIDAK** | **TIDAK** | **YA (GPU)** | 🟢 **60-120 FPS Buttery Smooth** |
| `opacity` | **TIDAK** | **TIDAK** | **YA (GPU)** | 🟢 **Instan & Ringan** |

### B. Timing Function & Easing
- **Gerakan Bidak Normal:** `cubic-bezier(0.2, 0, 0, 1)` (durasi `150ms - 200ms`). Gerakan dimulai cepat lalu melambat lembut saat mendarat di petak sasaran (*snappy yet graceful*).
- **Gerakan Naik Tangga / Meluncur Ular:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (durasi `350ms`). Memiliki sedikit efek pantulan (*overshoot / spring bounce*) yang memuaskan secara visual.

---

## 4. Mekanisme Input Ganda: Pointer Events (Drag + Tap)

Di ruang kelas, pengguna berinteraksi melalui proyektor touchscreen (IFP), mouse guru di laptop, atau tablet siswa. Chess.com mendukung **Drag & Drop** dan **Click-to-Move** secara bersamaan:

```typescript
// Unified Pointer Event Lifecycle
function handlePointerDown(e: React.PointerEvent, pieceId: string) {
  // 1. Tangkap pointer agar event tetap masuk meski jari keluar dari area papan
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
  
  // 2. Set status dragging & naikkan z-index
  setIsDragging(true);
  setSelectedPiece(pieceId);
}

function handlePointerMove(e: React.PointerEvent) {
  if (!isDragging) return;
  // 3. Update koordinat transform langsung via CSS translate3d pixel offset
  updateDragPosition(e.clientX, e.clientY);
}

function handlePointerUp(e: React.PointerEvent) {
  // 4. Hitung petak drop target berdasarkan boundingClientRect papan
  const targetSquare = calculateSquareFromCoords(e.clientX, e.clientY);
  
  if (isLegalMove(selectedPiece, targetSquare)) {
    executeMove(selectedPiece, targetSquare); // Animasi slide ke petak
  } else {
    snapBack(selectedPiece); // Animasi pegas kembali ke petak awal
  }
  setIsDragging(false);
}
```

---

## 5. Audio Design: Zero-Latency Sound Synthesis

Chess.com menggunakan audio instan saat bidak disentuh, mendarat, atau melakukan skak. Memuat file `.mp3` dari jaringan dapat menyebabkan latensi 100-300ms yang merusak kepuasan bermain.

Solusi: **Sintesis Audio Web Audio API**:

```typescript
// Contoh Suara "Tap Kayu" Khas Chess.com
function playChessMoveSound(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
  
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}
```

- **Move Normal:** Frekuensi 320 Hz -> 80 Hz (`triangle`), durasi 80ms (bunyi *tok!* renyah).
- **Capture (Makan Bidak):** Frekuensi 180 Hz -> 50 Hz dengan gain lebih tinggi + lowpass filter (bunyi *thud!* padat).
- **Puzzle Error (Salah Langkah):** Dual-tone buzzer 140 Hz & 110 Hz (`sawtooth`), durasi 220ms (bunyi *buzz-buzz* khas Chess.com puzzle fail).
- **Puzzle Success:** Tiga nada ascending arpeggio 523.25 Hz (C5) -> 659.25 Hz (E5) -> 783.99 Hz (G5) (bunyi *ting-ting-ting!* ceria).

---

## 6. Checklist Implementasi untuk Agent Penerus

Saat Anda membuat game berbasis papan atau grid baru di repositori ini:

- [ ] **Pisahkan Lapisan Bidak dari Grid:** Bidak berada di layer terpisah dengan `position: absolute; top: 0; left: 0; transform: translate3d(...)`.
- [ ] **Gunakan Persentase untuk Posisi:** `translate3d(col * 100%, row * 100%, 0)` agar responsif terhadap segala resolusi.
- [ ] **Tambahkan Highlight Interaktif:** Tampilkan petak asal, petak tujuan, dan dot petak valid.
- [ ] **Gunakan SVG Vector untuk Aset:** Jangan gunakan gambar bitmap beresolusi rendah yang pecah di proyektor.
- [ ] **Gunakan Web Audio API:** Manfaatkan `src/lib/sound.ts` untuk respons audio instan tanpa lag.
- [ ] **Bungkus dengan `GameStageShell`:** Pertahankan standar tampilan panggung layar penuh tanpa margin gelap.
