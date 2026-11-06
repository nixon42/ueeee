import { SlideDefinition } from '@/types/presentation';
import { FOREST_TROPHIC_PAIRS } from '../minigames-data';

export const slide5KomponenRantaiMakananHutan: SlideDefinition = {
  "id": "fe-slide-5",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - RELASI RANTAI MAKANAN",
  "title": "Komponen Rantai Makanan Hutan Hujan",
  "subtitle": "Hubungkan makhluk hidup di Kolom A dengan perannya di Kolom B agar rantai ekosistem stabil!",
  "columnALabel": "Komponen Ekosistem",
  "columnBLabel": "Peran Ekologis Tropis",
  "instruction": "Tarik garis penghubung antara organisme hutan hujan dan fungsi rantai makanannya.",
  "challengeKey": "challenge2",
  pairs: FOREST_TROPHIC_PAIRS
};
