import { SlideDefinition } from '@/types/presentation';
import { PANTUN_NASEHAT_SEQUENCE } from '../minigames-data';

export const slide5MenyusunBaitPantunNasehatE: SlideDefinition = {
  "id": "ttk-slide-5",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - MENYUSUN BAIT PANTUN",
  "title": "Menyusun Bait Pantun Nasehat Empat Seuntai",
  "subtitle": "Urutkan 4 larik acak menjadi bait pantun yang indah berima silang a-b-a-b:",
  "instruction": "Atur posisi larik pantun dari Sampiran 1, Sampiran 2, hingga Isi 1 dan Isi 2!",
  "explanationOnSuccess": "Indah sekali! Bait pantun nasehat berima a-b-a-b tersusun sempurna penuh hikmah!",
  "challengeKey": "pantun-seq",
  items: PANTUN_NASEHAT_SEQUENCE
};
