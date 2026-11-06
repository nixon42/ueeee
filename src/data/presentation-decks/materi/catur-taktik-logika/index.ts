import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';

import { slide1MembukaKebuntuanTaktisDiKe } from './slides/slide-1-membuka-kebuntuan-taktis-di-ke';
export { slide1MembukaKebuntuanTaktisDiKe } from './slides/slide-1-membuka-kebuntuan-taktis-di-ke';
import { slide2EmpatMotifTaktisCaturSenj } from './slides/slide-2-empat-motif-taktis-catur-senj';
export { slide2EmpatMotifTaktisCaturSenj } from './slides/slide-2-empat-motif-taktis-catur-senj';
import { slide3PohonKeputusanKomputasional } from './slides/slide-3-pohon-keputusan-komputasional';
export { slide3PohonKeputusanKomputasional } from './slides/slide-3-pohon-keputusan-komputasional';
import { slide4MotifTaktikCaturPolaSera } from './slides/slide-4-motif-taktik-catur-pola-sera';
export { slide4MotifTaktikCaturPolaSera } from './slides/slide-4-motif-taktik-catur-pola-sera';
import { slide5AlgoritmaRantaiKombinasiEks } from './slides/slide-5-algoritma-rantai-kombinasi-eks';
export { slide5AlgoritmaRantaiKombinasiEks } from './slides/slide-5-algoritma-rantai-kombinasi-eks';
import { slide6SkakmatSempurnaMedaliEmas } from './slides/slide-6-skakmat-sempurna-medali-emas';
export { slide6SkakmatSempurnaMedaliEmas } from './slides/slide-6-skakmat-sempurna-medali-emas';
import { slide7PenerapanLogikaCaturDalamP } from './slides/slide-7-penerapan-logika-catur-dalam-p';
export { slide7PenerapanLogikaCaturDalamP } from './slides/slide-7-penerapan-logika-catur-dalam-p';

export const CATUR_TAKTIK_LOGIKA_DECK: PresentationDeckData = {
  "gameId": "catur-taktik-logika",
  "title": "Teka-Teki Catur: Taktik & Problem Solving",
  "subtitle": "Taktik Catur & Penalaran Logika Komputasional",
  "themeColor": "indigo",
  "icon": "♟️",
  "category": "logika",
  "gradeLevel": "SD Kelas 4-6",
  "subjectDetail": "Logika / Berpikir Komputasional & Taktik Catur",
  "mentor": {
    "name": "Master Utut",
    "role": "Pelatih Catur & Logika Komputasional",
    "avatarEmoji": "♟️"
  },
  "totalSlides": 7,
  slides: [
    slide1MembukaKebuntuanTaktisDiKe,
    slide2EmpatMotifTaktisCaturSenj,
    slide3PohonKeputusanKomputasional,
    slide4MotifTaktikCaturPolaSera,
    slide5AlgoritmaRantaiKombinasiEks,
    slide6SkakmatSempurnaMedaliEmas,
    slide7PenerapanLogikaCaturDalamP,
  ],
};
