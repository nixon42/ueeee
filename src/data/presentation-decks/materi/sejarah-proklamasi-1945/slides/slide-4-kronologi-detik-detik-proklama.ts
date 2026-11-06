import { SlideDefinition } from '@/types/presentation';
import { PROKLAMASI_1945_SEQUENCE } from '../minigames-data';

export const slide4KronologiDetikDetikProklama: SlideDefinition = {
  "id": "utsj-slide-4",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - KRONOLOGI PROKLAMASI",
  "title": "Kronologi Detik-Detik Proklamasi Kemerdekaan 1945",
  "subtitle": "Urutkan 5 peristiwa revolusi kemerdekaan dari awal hingga pembacaan teks proklamasi:",
  "instruction": "Susun kartu peristiwa bersejarah sesuai urutan waktu terjadinya!",
  "explanationOnSuccess": "Luar biasa! Kronologi detik-detik kemerdekaan 17 Agustus 1945 tersusun runtut dan sempurna!",
  "challengeKey": "proklamasi-seq",
  items: PROKLAMASI_1945_SEQUENCE
};
