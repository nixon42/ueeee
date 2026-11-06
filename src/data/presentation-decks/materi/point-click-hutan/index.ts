import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';

import { slide1PatroliKoridorSatwaRimbaBo } from './slides/slide-1-patroli-koridor-satwa-rimba-bo';
export { slide1PatroliKoridorSatwaRimbaBo } from './slides/slide-1-patroli-koridor-satwa-rimba-bo';
import { slide2GarisBiogeografiWallaceWe } from './slides/slide-2-garis-biogeografi-wallace-we';
export { slide2GarisBiogeografiWallaceWe } from './slides/slide-2-garis-biogeografi-wallace-we';
import { slide3ZonasiKanopiHutanTropisS } from './slides/slide-3-zonasi-kanopi-hutan-tropis-s';
export { slide3ZonasiKanopiHutanTropisS } from './slides/slide-3-zonasi-kanopi-hutan-tropis-s';
import { slide4SatwaEndemikZonaPersebara } from './slides/slide-4-satwa-endemik-zona-persebara';
export { slide4SatwaEndemikZonaPersebara } from './slides/slide-4-satwa-endemik-zona-persebara';
import { slide54StrataVertikalKanopiHutan } from './slides/slide-5-4-strata-vertikal-kanopi-hutan';
export { slide54StrataVertikalKanopiHutan } from './slides/slide-5-4-strata-vertikal-kanopi-hutan';
import { slide6AdaptasiSatwaPeranOrangut } from './slides/slide-6-adaptasi-satwa-peran-orangut';
export { slide6AdaptasiSatwaPeranOrangut } from './slides/slide-6-adaptasi-satwa-peran-orangut';
import { slide7KoridorWallaceaLestariAma } from './slides/slide-7-koridor-wallacea-lestari-ama';
export { slide7KoridorWallaceaLestariAma } from './slides/slide-7-koridor-wallacea-lestari-ama';
import { slide8PertanyaanPemantikHotsBiodi } from './slides/slide-8-pertanyaan-pemantik-hots-biodi';
export { slide8PertanyaanPemantikHotsBiodi } from './slides/slide-8-pertanyaan-pemantik-hots-biodi';

export const POINT_CLICK_HUTAN_DECK: PresentationDeckData = {
  "gameId": "point-click-hutan",
  "title": "Point & Click: Misteri Hutan Hujan Kalimantan",
  "subtitle": "Ekspedisi Satwa Endemik, Garis Wallace, & Zonasi Kanopi Tropis",
  "themeColor": "emerald",
  "icon": "🦧",
  "category": "sains",
  "gradeLevel": "SD Kelas 4-6",
  "subjectDetail": "Biologi Lingkungan & Biodiversitas",
  "mentor": {
    "name": "Ranger Banyu",
    "role": "Jagawana Konservasi Rimba",
    "avatarEmoji": "🦧"
  },
  "totalSlides": 8,
  slides: [
    slide1PatroliKoridorSatwaRimbaBo,
    slide2GarisBiogeografiWallaceWe,
    slide3ZonasiKanopiHutanTropisS,
    slide4SatwaEndemikZonaPersebara,
    slide54StrataVertikalKanopiHutan,
    slide6AdaptasiSatwaPeranOrangut,
    slide7KoridorWallaceaLestariAma,
    slide8PertanyaanPemantikHotsBiodi,
  ],
};
