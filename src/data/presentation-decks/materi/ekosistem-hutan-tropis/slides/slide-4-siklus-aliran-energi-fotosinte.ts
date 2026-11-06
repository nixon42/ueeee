import { SlideDefinition } from '@/types/presentation';
import { PHOTOSYNTHESIS_ENERGY_SEQUENCE } from '../minigames-data';

export const slide4SiklusAliranEnergiFotosinte: SlideDefinition = {
  "id": "fe-slide-4",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - URUTAN SIKLUS ENERGI",
  "title": "Siklus Aliran Energi Fotosintesis",
  "subtitle": "Pohon purba membutuhkan aktivasi siklus yang benar! Geser kartu langkah agar fotosintesis berjalan sempurna.",
  "instruction": "Urutkan 4 tahapan fotosintesis dari penyerapan energi matahari hingga sintesis cadangan nutrisi glukosa.",
  "challengeKey": "challenge1",
  items: PHOTOSYNTHESIS_ENERGY_SEQUENCE
};
