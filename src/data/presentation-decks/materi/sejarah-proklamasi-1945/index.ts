import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';
export * from './illustration';

import { slide1MengarungiLinimasaKedaulatan } from './slides/slide-1-mengarungi-linimasa-kedaulatan';
export { slide1MengarungiLinimasaKedaulatan } from './slides/slide-1-mengarungi-linimasa-kedaulatan';
import { slide2LinimasaEmasDetikDetikProk } from './slides/slide-2-linimasa-emas-detik-detik-prok';
export { slide2LinimasaEmasDetikDetikProk } from './slides/slide-2-linimasa-emas-detik-detik-prok';
import { slide3TokohPahlawanDiBalikLayar } from './slides/slide-3-tokoh-pahlawan-di-balik-layar';
export { slide3TokohPahlawanDiBalikLayar } from './slides/slide-3-tokoh-pahlawan-di-balik-layar';
import { slide4KronologiDetikDetikProklama } from './slides/slide-4-kronologi-detik-detik-proklama';
export { slide4KronologiDetikDetikProklama } from './slides/slide-4-kronologi-detik-detik-proklama';
import { slide5PahlawanKemerdekaanPeranB } from './slides/slide-5-pahlawan-kemerdekaan-peran-b';
export { slide5PahlawanKemerdekaanPeranB } from './slides/slide-5-pahlawan-kemerdekaan-peran-b';
import { slide6NaskahKladBungKarnoVsNask } from './slides/slide-6-naskah-klad-bung-karno-vs-nask';
export { slide6NaskahKladBungKarnoVsNask } from './slides/slide-6-naskah-klad-bung-karno-vs-nask';
import { slide7SangSakaMerahPutihBerkibar } from './slides/slide-7-sang-saka-merah-putih-berkibar';
export { slide7SangSakaMerahPutihBerkibar } from './slides/slide-7-sang-saka-merah-putih-berkibar';
import { slide8NalarKritisKebangsaanBela } from './slides/slide-8-nalar-kritis-kebangsaan-bela';
export { slide8NalarKritisKebangsaanBela } from './slides/slide-8-nalar-kritis-kebangsaan-bela';

export const ULAR_TANGGA_SEJARAH_DECK: PresentationDeckData = {
  "gameId": "ular-tangga-sejarah",
  "title": "Ular Tangga: Linimasa Sejarah Indonesia",
  "subtitle": "Lintasan Sejarah Kemerdekaan, Rengasdengklok & Proklamasi 1945",
  "themeColor": "rose",
  "icon": "🇮🇩",
  "category": "sejarah",
  "gradeLevel": "SD Kelas 4-6",
  "subjectDetail": "Sejarah / Peristiwa Sekitar Proklamasi Kemerdekaan",
  "mentor": {
    "name": "Kak Satria",
    "role": "Pandu Perjuangan Kemerdekaan",
    "avatarEmoji": "🇮🇩"
  },
  "totalSlides": 8,
  slides: [
    slide1MengarungiLinimasaKedaulatan,
    slide2LinimasaEmasDetikDetikProk,
    slide3TokohPahlawanDiBalikLayar,
    slide4KronologiDetikDetikProklama,
    slide5PahlawanKemerdekaanPeranB,
    slide6NaskahKladBungKarnoVsNask,
    slide7SangSakaMerahPutihBerkibar,
    slide8NalarKritisKebangsaanBela,
  ],
};
