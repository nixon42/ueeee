import { SlideDefinition } from '@/types/presentation';
import { FRACTION_DECIMAL_PAIRS } from '../minigames-data';

export const slide4KesetaraanPecahanSenilaiD: SlideDefinition = {
  "id": "utm-slide-4",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - KESETARAAN PECAHAN",
  "title": "Kesetaraan Pecahan Senilai & Desimal",
  "subtitle": "Tautkan pecahan di Kolom A dengan nilai desimal setaranya di Kolom B:",
  "columnALabel": "Pecahan Biasa",
  "columnBLabel": "Bentuk Desimal",
  "instruction": "Tarik garis penghubung dari pecahan biasa ke bentuk desimal yang nilainya identik!",
  "explanationOnSuccess": "Luar biasa! Seluruh balok pecahan dan desimal berhasil dipasangkan dengan akurasi 100%!",
  "challengeKey": "frac-pairs",
  pairs: FRACTION_DECIMAL_PAIRS
};
