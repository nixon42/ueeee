import { SlideDefinition } from '@/types/presentation';
import { SPACE_CHARACTERISTICS_PAIRS } from '../minigames-data';

export const slide5KarakteristikJulukanUnikB: SlideDefinition = {
  "id": "tatasurya-slide-5",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - JULUKAN BENDA LANGIT",
  "title": "Karakteristik & Julukan Unik Benda Antariksa",
  "subtitle": "Hubungkan benda antariksa di Kolom A dengan karakteristik uniknya di Kolom B!",
  "columnALabel": "Benda Antariksa",
  "columnBLabel": "Karakteristik Unik",
  "instruction": "Tarik garis penghubung yang sesuai antara benda langit dan fakta astronominya.",
  "challengeKey": "match-karakteristik-antariksa",
  pairs: SPACE_CHARACTERISTICS_PAIRS
};
