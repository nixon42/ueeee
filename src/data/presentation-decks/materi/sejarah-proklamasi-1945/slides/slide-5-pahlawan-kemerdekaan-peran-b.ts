import { SlideDefinition } from '@/types/presentation';
import { PAHLAWAN_KEMERDEKAAN_PAIRS } from '../minigames-data';

export const slide5PahlawanKemerdekaanPeranB: SlideDefinition = {
  "id": "utsj-slide-5",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - PAHLAWAN KEMERDEKAAN",
  "title": "Pahlawan Kemerdekaan & Peran Bersejarahnya",
  "subtitle": "Hubungkan tokoh pejuang di Kolom A dengan jasa pentingnya di Kolom B:",
  "columnALabel": "Tokoh Pahlawan",
  "columnBLabel": "Peran Bersejarah bagi Republik",
  "instruction": "Jodohkan setiap tokoh dengan sumbangsih besarnya saat proklamasi!",
  "explanationOnSuccess": "Sempurna! Seluruh jasa tokoh kemerdekaan di balik layar berhasil dipasangkan tepat!",
  "challengeKey": "tokoh-pairs",
  pairs: PAHLAWAN_KEMERDEKAAN_PAIRS
};
