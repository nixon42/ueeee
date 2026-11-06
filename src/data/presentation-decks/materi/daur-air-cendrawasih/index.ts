import { PresentationDeckData } from '@/types/presentation';
import { slide1Narrative } from './slides/slide-1-narrative';
import { slide2Infografis } from './slides/slide-2-infografis';
import { slide3Fotosintesis } from './slides/slide-3-fotosintesis';
import { slide4UrutkanHidrologi } from './slides/slide-4-urutkan-hidrologi';
import { slide5TransformasiEnergi } from './slides/slide-5-transformasi-energi';
import { slide6Resolusi } from './slides/slide-6-resolusi';
import { slide7Refleksi } from './slides/slide-7-refleksi';

export * from './minigames-data';
export * from './illustration';
export * from './slides/slide-1-narrative';
export * from './slides/slide-2-infografis';
export * from './slides/slide-3-fotosintesis';
export * from './slides/slide-4-urutkan-hidrologi';
export * from './slides/slide-5-transformasi-energi';
export * from './slides/slide-6-resolusi';
export * from './slides/slide-7-refleksi';

export const ULAR_TANGGA_SAINS_DECK: PresentationDeckData = {
  gameId: 'ular-tangga-sains',
  title: 'Petualangan Sains: Ekspedisi Daur Air',
  subtitle: 'Petualangan Daur Air, Fotosintesis, & Aliran Energi',
  themeColor: 'orange',
  icon: '🧭',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'IPA / Daur Air & Keseimbangan Ekosistem',
  mentor: {
    name: 'Kak Galih',
    role: 'Penjelajah Rimba',
    avatarEmoji: '🧭',
  },
  totalSlides: 7,
  slides: [
    slide1Narrative,
    slide2Infografis,
    slide3Fotosintesis,
    slide4UrutkanHidrologi,
    slide5TransformasiEnergi,
    slide6Resolusi,
    slide7Refleksi,
  ],
};
