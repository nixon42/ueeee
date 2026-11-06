import { SlideDefinition } from '@/types/presentation';
import { CHESS_CHECKMATE_SEQUENCE } from '../minigames-data';

export const slide5AlgoritmaRantaiKombinasiEks: SlideDefinition = {
  "id": "ctl-slide-5",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - ALGORITMA SKAKMAT",
  "title": "Algoritma Rantai Kombinasi Eksekusi Skakmat",
  "subtitle": "Susun langkah algoritma logis untuk menuntaskan kombinasi skakmat presisi:",
  "instruction": "Urutkan tahapan kalkulasi serangan mulai dari analisis celah hingga skakmat mutlak!",
  "explanationOnSuccess": "Brilian! Rantai algoritma kombinasi eksekusi catur tersusun logis tanpa celah!",
  "challengeKey": "chess-algo",
  items: CHESS_CHECKMATE_SEQUENCE
};
