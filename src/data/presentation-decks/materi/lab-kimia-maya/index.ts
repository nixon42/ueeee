import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';
export * from './illustration';

import { slide1AnomaliReaktorKimiaForensik } from './slides/slide-1-anomali-reaktor-kimia-forensik';
export { slide1AnomaliReaktorKimiaForensik } from './slides/slide-1-anomali-reaktor-kimia-forensik';
import { slide2KeselamatanKerjaK3Instrum } from './slides/slide-2-keselamatan-kerja-k3-instrum';
export { slide2KeselamatanKerjaK3Instrum } from './slides/slide-2-keselamatan-kerja-k3-instrum';
import { slide3SkalaDerajatPhMetodeIlmi } from './slides/slide-3-skala-derajat-ph-metode-ilmi';
export { slide3SkalaDerajatPhMetodeIlmi } from './slides/slide-3-skala-derajat-ph-metode-ilmi';
import { slide4SimbolBahayaK3Laboratorium } from './slides/slide-4-simbol-bahaya-k3-laboratorium';
export { slide4SimbolBahayaK3Laboratorium } from './slides/slide-4-simbol-bahaya-k3-laboratorium';
import { slide5Urutan5LangkahMetodeIlmiah } from './slides/slide-5-urutan-5-langkah-metode-ilmiah';
export { slide5Urutan5LangkahMetodeIlmiah } from './slides/slide-5-urutan-5-langkah-metode-ilmiah';
import { slide6UjiIndikatorLakmusAsamBasa } from './slides/slide-6-uji-indikator-lakmus-asam-basa';
export { slide6UjiIndikatorLakmusAsamBasa } from './slides/slide-6-uji-indikator-lakmus-asam-basa';
import { slide7ReaktorUnit04BerhasilDinet } from './slides/slide-7-reaktor-unit-04-berhasil-dinet';
export { slide7ReaktorUnit04BerhasilDinet } from './slides/slide-7-reaktor-unit-04-berhasil-dinet';
import { slide8PertanyaanPemantikHotsLabor } from './slides/slide-8-pertanyaan-pemantik-hots-labor';
export { slide8PertanyaanPemantikHotsLabor } from './slides/slide-8-pertanyaan-pemantik-hots-labor';

export const POINT_CLICK_LAB_DECK: PresentationDeckData = {
  "gameId": "point-click-lab",
  "title": "Point & Click: Misteri Lab Sains Maya",
  "subtitle": "Eksplorasi K3, Derajat pH, & Metode Ilmiah Kimia-Biologi",
  "themeColor": "teal",
  "icon": "🔬",
  "category": "sains",
  "gradeLevel": "SMP",
  "subjectDetail": "Kimia & Biologi Eksperimental (SMP Kelas 7)",
  "mentor": {
    "name": "Dr. Maya Arisandi, M.Sc.",
    "role": "Ilmuwan Forensik Kimia-Biologi",
    "avatarEmoji": "🔬"
  },
  "totalSlides": 8,
  slides: [
    slide1AnomaliReaktorKimiaForensik,
    slide2KeselamatanKerjaK3Instrum,
    slide3SkalaDerajatPhMetodeIlmi,
    slide4SimbolBahayaK3Laboratorium,
    slide5Urutan5LangkahMetodeIlmiah,
    slide6UjiIndikatorLakmusAsamBasa,
    slide7ReaktorUnit04BerhasilDinet,
    slide8PertanyaanPemantikHotsLabor,
  ],
};
