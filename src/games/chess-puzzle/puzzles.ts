import { PieceType, PieceColor } from './ChessPieces';

export interface BoardPiece {
  id: string;
  type: PieceType;
  color: PieceColor;
  col: number; // 0=a, 1=b, 2=c, 3=d, 4=e, 5=f, 6=g, 7=h
  row: number; // 0=8, 1=7, 2=6, 3=5, 4=4, 5=3, 6=2, 7=1
}

export interface ChessPuzzle {
  id: string;
  title: string;
  tacticName: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  turn: 'w' | 'b';
  objective: string;
  initialPieces: BoardPiece[];
  solution: {
    from: { col: number; row: number };
    to: { col: number; row: number };
  };
  botResponse?: {
    from: { col: number; row: number };
    to: { col: number; row: number };
  };
  explanation: string;
  hint: string;
  incorrectFeedback: string;
}

/**
 * 5 Kurikulum Taktik Catur Edukatif untuk Melatih Berpikir Kritis & Logika
 */
export const CHESS_PUZZLES: ChessPuzzle[] = [
  {
    id: 'puzzle-back-rank',
    title: 'Misteri Skakmat Koridor (Back Rank Mate)',
    tacticName: 'Skakmat Koridor',
    difficulty: 'Pemula',
    turn: 'w',
    objective: 'Putih melangkah dan melakukan skakmat dalam 1 langkah!',
    // Mirip posisi di screenshot Chess.com user:
    // Black: King di b8 (col 1, row 0), pawns di a7 (col 0, row 1), b7 (col 1, row 1)
    // White: King di g1 (col 6, row 7), Queen di c1 (col 2, row 7)
    initialPieces: [
      { id: 'bk', type: 'k', color: 'b', col: 1, row: 0 }, // b8
      { id: 'bp-a7', type: 'p', color: 'b', col: 0, row: 1 }, // a7
      { id: 'bp-b7', type: 'p', color: 'b', col: 1, row: 1 }, // b7
      { id: 'wk', type: 'k', color: 'w', col: 6, row: 7 }, // g1
      { id: 'wq', type: 'q', color: 'w', col: 2, row: 7 }, // c1
    ],
    solution: {
      from: { col: 2, row: 7 }, // c1
      to: { col: 2, row: 0 },   // c8 (Skakmat Koridor!)
    },
    explanation: 'Hebat! Ratu menusuk ke petak c8. Raja hitam terjebak di belakang barisan pionnya sendiri di petak b8 tanpa jalan keluar (*back-rank checkmate*).',
    hint: 'Perhatikan baris ke-8 hitam yang terbuka tanpa penjaga. Manfaatkan jalur vertikal Ratumu!',
    incorrectFeedback: 'Langkah tersebut belum mematikan! Raja hitam masih aman jika Ratu tidak menyerang langsung ke baris ke-8.',
  },
  {
    id: 'puzzle-knight-fork',
    title: 'Taktik Garpu Kuda (Knight Fork)',
    tacticName: 'Serangan Ganda (Fork)',
    difficulty: 'Menengah',
    turn: 'w',
    objective: 'Putih melangkah: Lakukan serangan ganda yang menyerang Raja dan Ratu sekaligus!',
    initialPieces: [
      { id: 'bk', type: 'k', color: 'b', col: 6, row: 0 }, // g8
      { id: 'bq', type: 'q', color: 'b', col: 3, row: 1 }, // d7
      { id: 'bp-f7', type: 'p', color: 'b', col: 5, row: 1 }, // f7
      { id: 'bp-h7', type: 'p', color: 'b', col: 7, row: 1 }, // h7
      { id: 'wk', type: 'k', color: 'w', col: 6, row: 7 }, // g1
      { id: 'wn', type: 'n', color: 'w', col: 4, row: 4 }, // e4
    ],
    solution: {
      from: { col: 4, row: 4 }, // e4
      to: { col: 5, row: 2 },   // f6+ (Garpu Kuda!)
    },
    explanation: 'Brilian! Kuda melompat ke f6 memberikan skak sekaligus mengancam Ratu hitam. Karena Raja harus melangkah, Ratu hitam akan jatuh di langkah berikutnya!',
    hint: 'Kuda bergerak dalam pola "L". Cari petak di mana Kuda bisa mengancam Raja (skak) dan Ratu lawan secara bersamaan.',
    incorrectFeedback: 'Lompatan Kuda belum tepat. Cari petak yang menyerang dua bidak berharga sekaligus!',
  },
  {
    id: 'puzzle-absolute-pin',
    title: 'Kuncian Mutlak Sang Gajah (Absolute Pin)',
    tacticName: 'Kuncian (Pin)',
    difficulty: 'Menengah',
    turn: 'w',
    objective: 'Putih melangkah: Kunci Benteng lawan agar tidak dapat melarikan diri!',
    initialPieces: [
      { id: 'bk', type: 'k', color: 'b', col: 4, row: 0 }, // e8
      { id: 'br', type: 'r', color: 'b', col: 4, row: 3 }, // e5
      { id: 'wk', type: 'k', color: 'w', col: 0, row: 7 }, // a1
      { id: 'wb', type: 'b', color: 'w', col: 1, row: 6 }, // b2
    ],
    solution: {
      from: { col: 1, row: 6 }, // b2
      to: { col: 0, row: 4 },   // a4
    },
    botResponse: {
      from: { col: 4, row: 0 }, // e8
      to: { col: 3, row: 0 },   // d8
    },
    explanation: 'Sempurna! Gajah menembus diagonal ke Benteng dan Raja. Benteng hitam terkunci (*pinned*) dan tidak boleh bergerak karena akan memicu skak!',
    hint: 'Gajah menguasai garis diagonal. Sejajarkan Gajah dengan Benteng dan Raja lawan pada diagonal yang sama.',
    incorrectFeedback: 'Bidikan diagonal belum pas. Pastikan garis serang Gajah mengarah tepat ke Raja lawan di belakang Benteng.',
  },
  {
    id: 'puzzle-skewer',
    title: 'Tusukan Sate Benteng (Skewer Attack)',
    tacticName: 'Tusukan (Skewer)',
    difficulty: 'Lanjutan',
    turn: 'w',
    objective: 'Putih melangkah: Serang Raja di depan untuk merebut Ratu di belakangnya!',
    initialPieces: [
      { id: 'bk', type: 'k', color: 'b', col: 4, row: 2 }, // e6
      { id: 'bq', type: 'q', color: 'b', col: 4, row: 5 }, // e3
      { id: 'wk', type: 'k', color: 'w', col: 7, row: 7 }, // h1
      { id: 'wr', type: 'r', color: 'w', col: 0, row: 2 }, // a6
    ],
    solution: {
      from: { col: 0, row: 2 }, // a6
      to: { col: 4, row: 2 },   // e6 (skewer via file e)
    },
    explanation: 'Tusukan sate yang luar biasa! Benteng mengancam Raja di e6 secara horizontal. Raja terpaksa menyingkir dan Ratu di belakangnya akan kita tangkap!',
    hint: 'Lawan memiliki Raja dan Ratu pada baris atau lajur yang sama. Manfaatkan garis lurus Bentengmu!',
    incorrectFeedback: 'Langkah belum tepat. Fokus serang Raja lawan agar ia terpaksa meninggalkan Ratunya tanpa pelindung.',
  },
  {
    id: 'puzzle-battery-mate',
    title: 'Baterai Ratu & Gajah (Battery Checkmate)',
    tacticName: 'Baterai Serangan',
    difficulty: 'Pemula',
    turn: 'w',
    objective: 'Putih melangkah: Tuntaskan serangan baterai untuk skakmat instan!',
    initialPieces: [
      { id: 'bk', type: 'k', color: 'b', col: 6, row: 0 }, // g8
      { id: 'bp-f7', type: 'p', color: 'b', col: 5, row: 1 }, // f7
      { id: 'bp-g7', type: 'p', color: 'b', col: 6, row: 1 }, // g7
      { id: 'bp-h7', type: 'p', color: 'b', col: 7, row: 1 }, // h7
      { id: 'wk', type: 'k', color: 'w', col: 6, row: 7 }, // g1
      { id: 'wb', type: 'b', color: 'w', col: 2, row: 5 }, // c3
      { id: 'wq', type: 'q', color: 'w', col: 3, row: 4 }, // d4
    ],
    solution: {
      from: { col: 3, row: 4 }, // d4
      to: { col: 6, row: 1 },   // g7# (Skakmat didukung Gajah di c3!)
    },
    explanation: 'Skakmat! Ratu mendarat di g7 dengan perlindungan penuh dari Gajah di c3. Raja hitam tidak dapat memakan Ratu dan tidak memiliki petak lari!',
    hint: 'Ratu dan Gajah bekerja sama pada diagonal yang sama mengarah ke petak lemah g7!',
    incorrectFeedback: 'Baterai Ratu dan Gajah membutuhkan serangan telak ke petak g7 di depan Raja hitam!',
  },
];
