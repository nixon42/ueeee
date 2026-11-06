import { SlideDefinition } from '@/types/presentation';
import { FRACTION_BLOCKS_SEQUENCE } from '../minigames-data';

export const slide5UrutanBalokFraksiDariTerke: SlideDefinition = {
  "id": "utm-slide-5",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 5: TANTANGAN 2 - TANGGA BALOK PECAHAN",
  "title": "Urutan Balok Fraksi dari Terkecil ke Terbesar",
  "subtitle": "Susun balok penyangga jembatan dari ketebalan paling tipis ke paling tebal:",
  "instruction": "Geser balok pecahan agar tersusun urut mulai dari nilai terkecil hingga terbesar!",
  "explanationOnSuccess": "Sempurna! Balok tersusun berurutan dari 1/5 (0.20) hingga 9/10 (0.90), fondasi jembatan kokoh!",
  "challengeKey": "frac-sequence",
  items: FRACTION_BLOCKS_SEQUENCE
};
