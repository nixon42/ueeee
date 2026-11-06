import { SlideDefinition } from '@/types/presentation';
import { CANOPY_STRATA_SEQUENCE } from '../minigames-data';

export const slide54StrataVertikalKanopiHutan: SlideDefinition = {
  "id": "hutan-slide-5",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - URUTAN STRATA KANOPI",
  "title": "4 Strata Vertikal Kanopi Hutan Hujan",
  "subtitle": "Susun 4 lapisan ketinggian kanopi hutan tropis dari lapisan paling dasar hingga puncak tertinggi!",
  "instruction": "Urutkan dari ketinggian tanah (0 m) hingga pucuk pohon tertua di atas kanopi (> 30 m).",
  "challengeKey": "sequence-kanopi",
  items: CANOPY_STRATA_SEQUENCE
};
