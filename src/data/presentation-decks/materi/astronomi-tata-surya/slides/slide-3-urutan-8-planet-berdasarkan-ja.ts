import { SlideDefinition } from '@/types/presentation';
import { SOLAR_PLANETS_SEQUENCE } from '../minigames-data';

export const slide3Urutan8PlanetBerdasarkanJa: SlideDefinition = {
  "id": "tatasurya-slide-3",
  "type": "mini-game-sequence",
  "chapterBadge": "BABAK 3: TANTANGAN 1 - URUTAN 8 PLANET",
  "title": "Urutan 8 Planet Berdasarkan Jarak Orbit Matahari",
  "subtitle": "Susun 8 planet tata surya berurutan mulai dari yang paling dekat hingga paling jauh dari Matahari!",
  "instruction": "Gunakan tombol panah untuk menyusun kedelapan planet sesuai urutan orbit presisi.",
  "challengeKey": "sequence-8-planet",
  items: SOLAR_PLANETS_SEQUENCE
};
