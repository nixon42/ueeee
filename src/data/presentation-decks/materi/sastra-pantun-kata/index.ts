import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';
export * from './illustration';

import { slide1MemulihkanNaskahEmasBahasa } from './slides/slide-1-memulihkan-naskah-emas-bahasa';
export { slide1MemulihkanNaskahEmasBahasa } from './slides/slide-1-memulihkan-naskah-emas-bahasa';
import { slide2PedomanEydVKataBakuKbbi } from './slides/slide-2-pedoman-eyd-v-kata-baku-kbbi';
export { slide2PedomanEydVKataBakuKbbi } from './slides/slide-2-pedoman-eyd-v-kata-baku-kbbi';
import { slide3ArsitekturRimaPantunEmpatS } from './slides/slide-3-arsitektur-rima-pantun-empat-s';
export { slide3ArsitekturRimaPantunEmpatS } from './slides/slide-3-arsitektur-rima-pantun-empat-s';
import { slide4KataSehariHariVsKataBaku } from './slides/slide-4-kata-sehari-hari-vs-kata-baku';
export { slide4KataSehariHariVsKataBaku } from './slides/slide-4-kata-sehari-hari-vs-kata-baku';
import { slide5MenyusunBaitPantunNasehatE } from './slides/slide-5-menyusun-bait-pantun-nasehat-e';
export { slide5MenyusunBaitPantunNasehatE } from './slides/slide-5-menyusun-bait-pantun-nasehat-e';
import { slide6NaskahEmasBahasaPersatuanK } from './slides/slide-6-naskah-emas-bahasa-persatuan-k';
export { slide6NaskahEmasBahasaPersatuanK } from './slides/slide-6-naskah-emas-bahasa-persatuan-k';
import { slide7NalarKritisKebahasaanIden } from './slides/slide-7-nalar-kritis-kebahasaan-iden';
export { slide7NalarKritisKebahasaanIden } from './slides/slide-7-nalar-kritis-kebahasaan-iden';

export const TEKA_TEKI_KATA_DECK: PresentationDeckData = {
  "gameId": "teka-teki-kata",
  "title": "Teka-Teki: Susun Kata & Kosakata Cerdas",
  "subtitle": "Cendekiawan Kata, Ejaan Baku KBBI & Sastra Nusantara",
  "themeColor": "purple",
  "icon": "📖",
  "category": "bahasa",
  "gradeLevel": "SMP",
  "subjectDetail": "Bahasa Indonesia / Ejaan Baku & Sastra Tradisional",
  "mentor": {
    "name": "Ibu Kartika",
    "role": "Pengampu Bahasa & Sastra Nusantara",
    "avatarEmoji": "📖"
  },
  "totalSlides": 7,
  slides: [
    slide1MemulihkanNaskahEmasBahasa,
    slide2PedomanEydVKataBakuKbbi,
    slide3ArsitekturRimaPantunEmpatS,
    slide4KataSehariHariVsKataBaku,
    slide5MenyusunBaitPantunNasehatE,
    slide6NaskahEmasBahasaPersatuanK,
    slide7NalarKritisKebahasaanIden,
  ],
};
