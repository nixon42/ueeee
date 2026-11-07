import { SlideDefinition } from '@/types/presentation';
import { LAB_K3_PAIRS } from '../minigames-data';

export const slide4SimbolBahayaK3Laboratorium: SlideDefinition = {
  "id": "lab-slide-4",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - IDENTIFIKASI SIMBOL BAHAYA",
  "title": "Simbol Bahaya K3 & Sifat Kimia Bahan",
  "subtitle": "Kenali piktogram bahaya zat kimia korosif, uap asam, dan bahan beracun saat belajar di kelas!",
  "columnALabel": "Simbol Piktogram Bahaya",
  "columnBLabel": "Karakteristik Resiko Kimia",
  "instruction": "Hubungkan keempat simbol bahaya keselamatan sains dengan resiko kimianya secara tepat.",
  "challengeKey": "k3-pairs",
  pairs: LAB_K3_PAIRS
};
