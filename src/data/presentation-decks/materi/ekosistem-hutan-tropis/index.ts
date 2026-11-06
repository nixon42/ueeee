import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';
export * from './illustration';

import { slide1MisiPenyelamatanLembahHutan } from './slides/slide-1-misi-penyelamatan-lembah-hutan';
export { slide1MisiPenyelamatanLembahHutan } from './slides/slide-1-misi-penyelamatan-lembah-hutan';
import { slide2TigaTingkatTrofikEkosistem } from './slides/slide-2-tiga-tingkat-trofik-ekosistem';
export { slide2TigaTingkatTrofikEkosistem } from './slides/slide-2-tiga-tingkat-trofik-ekosistem';
import { slide3FotosintesisAliranEnergi } from './slides/slide-3-fotosintesis-aliran-energi';
export { slide3FotosintesisAliranEnergi } from './slides/slide-3-fotosintesis-aliran-energi';
import { slide4SiklusAliranEnergiFotosinte } from './slides/slide-4-siklus-aliran-energi-fotosinte';
export { slide4SiklusAliranEnergiFotosinte } from './slides/slide-4-siklus-aliran-energi-fotosinte';
import { slide5KomponenRantaiMakananHutan } from './slides/slide-5-komponen-rantai-makanan-hutan';
export { slide5KomponenRantaiMakananHutan } from './slides/slide-5-komponen-rantai-makanan-hutan';
import { slide6LembahKalimantanKembaliBers } from './slides/slide-6-lembah-kalimantan-kembali-bers';
export { slide6LembahKalimantanKembaliBers } from './slides/slide-6-lembah-kalimantan-kembali-bers';
import { slide7PertanyaanPemantikDiskusiSi } from './slides/slide-7-pertanyaan-pemantik-diskusi-si';
export { slide7PertanyaanPemantikDiskusiSi } from './slides/slide-7-pertanyaan-pemantik-diskusi-si';

export const FOREST_ECOSYSTEM_DECK: PresentationDeckData = {
  "gameId": "presentasi-ekosistem-hutan",
  "title": "Presentasi Interaktif: Ekspedisi Hutan Hujan Tropis",
  "subtitle": "Tiga Tingkat Trofik, Aliran Energi Fotosintesis, & Keseimbangan Alam",
  "themeColor": "emerald",
  "icon": "🌿",
  "category": "sains",
  "gradeLevel": "SD Kelas 4-6",
  "subjectDetail": "Biologi, Fotosintesis & Rantai Makanan Tropis",
  "mentor": {
    "name": "Prof. Maya Arisandi",
    "role": "Kepala Tim Riset Konservasi Alam",
    "avatarEmoji": "🌿"
  },
  "totalSlides": 7,
  slides: [
    slide1MisiPenyelamatanLembahHutan,
    slide2TigaTingkatTrofikEkosistem,
    slide3FotosintesisAliranEnergi,
    slide4SiklusAliranEnergiFotosinte,
    slide5KomponenRantaiMakananHutan,
    slide6LembahKalimantanKembaliBers,
    slide7PertanyaanPemantikDiskusiSi,
  ],
};

export const PRESENTASI_EKOSISTEM_HUTAN_DECK = FOREST_ECOSYSTEM_DECK;
