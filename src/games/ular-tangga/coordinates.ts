/**
 * Menghitung koordinat tengah (x%, y%) dari petak nomor 1-100 dalam grid 10x10.
 * Mengikuti orientasi zigzag papan Ular Tangga:
 * - Petak 1 ada di baris terbawah (row=9), kolom paling kiri (col=0) -> x=5, y=95.
 * - Petak 10 di baris terbawah, kolom paling kanan (col=9) -> x=95, y=95.
 * - Petak 11 di baris ke-8 (dari atas), kolom paling kanan (col=9) -> x=95, y=85.
 * - Petak 100 ada di baris teratas (row=0), kolom paling kiri (col=0) -> x=5, y=5.
 */
export function getTileCenter(tileNum: number): { x: number; y: number } {
  const { col, row } = getTileGridPos(tileNum);
  return {
    x: col * 10 + 5,
    y: row * 10 + 5,
  };
}

/**
 * Menghitung indeks grid (col 0-9, row 0-9) untuk GPU-accelerated transform: translate3d
 * Kompatibel dengan arsitektur Chess.com / Chessground multi-layer board rendering.
 */
export function getTileGridPos(tileNum: number): { col: number; row: number } {
  const zeroIndexed = Math.max(0, Math.min(99, tileNum - 1));
  const rowFromBottom = Math.floor(zeroIndexed / 10);
  const colInRow = zeroIndexed % 10;
  const actualRow = 9 - rowFromBottom; // 0 di atas, 9 di bawah
  const actualCol = actualRow % 2 === 1 ? colInRow : 9 - colInRow; // Zigzag
  return { col: actualCol, row: actualRow };
}
