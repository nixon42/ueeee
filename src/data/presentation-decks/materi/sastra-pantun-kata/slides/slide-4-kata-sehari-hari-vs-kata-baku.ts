import { SlideDefinition } from '@/types/presentation';
import { KBBI_BAKU_PAIRS } from '../minigames-data';

export const slide4KataSehariHariVsKataBaku: SlideDefinition = {
  "id": "ttk-slide-4",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - KATA BAKU KBBI",
  "title": "Kata Sehari-hari vs Kata Baku Resmi KBBI",
  "subtitle": "Pasangkan kata non-baku yang sering keliru di Kolom A dengan bentuk baku resminya di Kolom B:",
  "columnALabel": "Bentuk Non-Baku (Keliru)",
  "columnBLabel": "Bentuk Baku Resmi KBBI",
  "instruction": "Tautkan kata non-baku ke ejaan baku yang diakui dalam Kamus Besar Bahasa Indonesia!",
  "explanationOnSuccess": "Hebat! Ejaan resmi KBBI telah terpilih dengan benar, menata kerapian bahasa tertulis!",
  "challengeKey": "kbbi-match",
  pairs: KBBI_BAKU_PAIRS
};
