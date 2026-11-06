import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';
export * from './illustration';

import { slide1MenuntaskanJembatanGantungF } from './slides/slide-1-menuntaskan-jembatan-gantung-f';
export { slide1MenuntaskanJembatanGantungF } from './slides/slide-1-menuntaskan-jembatan-gantung-f';
import { slide2PecahanSenilaiDesimalPe } from './slides/slide-2-pecahan-senilai-desimal-pe';
export { slide2PecahanSenilaiDesimalPe } from './slides/slide-2-pecahan-senilai-desimal-pe';
import { slide3KelilingVsLuasBangunDatar } from './slides/slide-3-keliling-vs-luas-bangun-datar';
export { slide3KelilingVsLuasBangunDatar } from './slides/slide-3-keliling-vs-luas-bangun-datar';
import { slide4KesetaraanPecahanSenilaiD } from './slides/slide-4-kesetaraan-pecahan-senilai-d';
export { slide4KesetaraanPecahanSenilaiD } from './slides/slide-4-kesetaraan-pecahan-senilai-d';
import { slide5UrutanBalokFraksiDariTerke } from './slides/slide-5-urutan-balok-fraksi-dari-terke';
export { slide5UrutanBalokFraksiDariTerke } from './slides/slide-5-urutan-balok-fraksi-dari-terke';
import { slide6JembatanEmasTersambungKere } from './slides/slide-6-jembatan-emas-tersambung-kere';
export { slide6JembatanEmasTersambungKere } from './slides/slide-6-jembatan-emas-tersambung-kere';
import { slide7MenghubungkanMatematikaDenga } from './slides/slide-7-menghubungkan-matematika-denga';
export { slide7MenghubungkanMatematikaDenga } from './slides/slide-7-menghubungkan-matematika-denga';

export const ULAR_TANGGA_MATEMATIKA_DECK: PresentationDeckData = {
  "gameId": "ular-tangga-matematika",
  "title": "Ular Tangga: Master Berhitung Cepat",
  "subtitle": "Petualangan Pecahan, Desimal, & Geometri Bangun Datar",
  "themeColor": "blue",
  "icon": "📐",
  "category": "matematika",
  "gradeLevel": "SD Kelas 4-6",
  "subjectDetail": "Matematika / Aritmatika & Geometri",
  "mentor": {
    "name": "Kak Arya",
    "role": "Arsitek Angka & Struktur",
    "avatarEmoji": "📐"
  },
  "totalSlides": 7,
  slides: [
    slide1MenuntaskanJembatanGantungF,
    slide2PecahanSenilaiDesimalPe,
    slide3KelilingVsLuasBangunDatar,
    slide4KesetaraanPecahanSenilaiD,
    slide5UrutanBalokFraksiDariTerke,
    slide6JembatanEmasTersambungKere,
    slide7MenghubungkanMatematikaDenga,
  ],
};
