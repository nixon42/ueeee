import { SlideDefinition } from '@/types/presentation';
import { CANDI_STRATA_SEQUENCE } from '../minigames-data';

export const slide4Urutan4StrataArsitekturKos: SlideDefinition = {
  "id": "pcc-slide-4",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - STRATA KOSMOLOGI",
  "title": "Urutan 4 Strata Arsitektur Kosmologi Candi",
  "subtitle": "Susun tingkatan filosofis candi dari kaki terbawah hingga puncak stupa tertinggi:",
  "instruction": "Urutkan strata candi mulai dari Kamadhatu hingga Stupa Induk Nirwana!",
  "explanationOnSuccess": "Sempurna! Urutan filosofis dari Kamadhatu menuju pencerahan Stupa Induk tertata akurat!",
  "challengeKey": "strata-candi",
  items: CANDI_STRATA_SEQUENCE
};
