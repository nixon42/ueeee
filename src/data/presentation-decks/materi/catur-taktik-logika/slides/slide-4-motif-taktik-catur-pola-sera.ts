import { SlideDefinition } from '@/types/presentation';
import { CHESS_TACTIC_PAIRS } from '../minigames-data';

export const slide4MotifTaktikCaturPolaSera: SlideDefinition = {
  "id": "ctl-slide-4",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - MOTIF TAKTIK CATUR",
  "title": "Motif Taktik Catur & Pola Serangan Geometrisnya",
  "subtitle": "Tautkan nama motif taktis di Kolom A dengan definisi polanya di Kolom B:",
  "columnALabel": "Nama Motif Taktis",
  "columnBLabel": "Karakteristik Pola Serangan",
  "instruction": "Pasangkan taktik catur dengan cara kerjanya di atas papan 64 petak!",
  "explanationOnSuccess": "Tepat sekali! Seluruh 4 motif taktis pamungkas catur telah teridentifikasi sempurna!",
  "challengeKey": "chess-tactics",
  pairs: CHESS_TACTIC_PAIRS
};
