import { SlideDefinition } from '@/types/presentation';
import { BIOGEOGRAPHY_FAUNA_PAIRS } from '../minigames-data';

export const slide4SatwaEndemikZonaPersebara: SlideDefinition = {
  "id": "hutan-slide-4",
  "type": "mini-game-match",
  "chapterBadge": "BABAK 4: TANTANGAN 1 - PASANGAN FAUNA BIOGEOGRAFI",
  "title": "Satwa Endemik & Zona Persebaran Biogeografi",
  "subtitle": "Jodohkan satwa endemik di Kolom A dengan zona persebaran geografisnya di Kolom B!",
  "columnALabel": "Satwa Endemik Indonesia",
  "columnBLabel": "Zona Biogeografi & Habitat",
  "instruction": "Tarik garis penghubung antara nama satwa dengan zona habitat aslinya.",
  "challengeKey": "biogeografi-pairs",
  pairs: BIOGEOGRAPHY_FAUNA_PAIRS
};
