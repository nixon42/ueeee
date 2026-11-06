import { SlideDefinition } from '@/types/presentation';
import { LAB_K3_PAIRS } from '../minigames-data';

export const slide4SimbolBahayaK3Laboratorium: SlideDefinition = {
  "id": "lab-slide-4",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - IDENTIFIKASI SIMBOL K3",
  "title": "Simbol Bahaya K3 Laboratorium",
  "subtitle": "Jodohkan simbol bahaya piktogram di Kolom A dengan arti keselamatan resikonya di Kolom B!",
  "columnALabel": "Simbol Bahaya Lab",
  "columnBLabel": "Karakteristik Resiko",
  "instruction": "Hubungkan keempat simbol bahaya keselamatan kerja laboratorium dengan tepat.",
  "challengeKey": "k3-pairs",
  pairs: LAB_K3_PAIRS
};
