import { SlideDefinition } from '@/types/presentation';
import { BOROBUDUR_RELIEF_PAIRS } from '../minigames-data';

export const slide5ArtefakCandiBuktiKemariti: SlideDefinition = {
  "id": "pcc-slide-5",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - ARTEFAK KEMARITIMAN",
  "title": "Artefak Candi & Bukti Kemaritiman Nusantara",
  "subtitle": "Hubungkan bukti peninggalan di Kolom A dengan fakta peradaban di Kolom B:",
  "columnALabel": "Bukti Peninggalan Candi",
  "columnBLabel": "Fakta Peradaban Nusantara",
  "instruction": "Jodohkan artefak arkeologis dengan signifikansi sejarahnya!",
  "explanationOnSuccess": "Luar biasa! Hubungan antara relief candi dan ketangguhan maritim bangsa terbukti kokoh!",
  "challengeKey": "relief-pairs",
  pairs: BOROBUDUR_RELIEF_PAIRS
};
