import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';
export * from './illustration';

import { slide1PeluncuranWahanaGarudaOrbit } from './slides/slide-1-peluncuran-wahana-garuda-orbit';
export { slide1PeluncuranWahanaGarudaOrbit } from './slides/slide-1-peluncuran-wahana-garuda-orbit';
import { slide28PlanetTataSuryaPembagia } from './slides/slide-2-8-planet-tata-surya-pembagia';
export { slide28PlanetTataSuryaPembagia } from './slides/slide-2-8-planet-tata-surya-pembagia';
import { slide3Urutan8PlanetBerdasarkanJa } from './slides/slide-3-urutan-8-planet-berdasarkan-ja';
export { slide3Urutan8PlanetBerdasarkanJa } from './slides/slide-3-urutan-8-planet-berdasarkan-ja';
import { slide4MekanikaOrbitGerhana } from './slides/slide-4-mekanika-orbit-gerhana';
export { slide4MekanikaOrbitGerhana } from './slides/slide-4-mekanika-orbit-gerhana';
import { slide5KarakteristikJulukanUnikB } from './slides/slide-5-karakteristik-julukan-unik-b';
export { slide5KarakteristikJulukanUnikB } from './slides/slide-5-karakteristik-julukan-unik-b';
import { slide6GeometriPosisiGerhanaMataha } from './slides/slide-6-geometri-posisi-gerhana-mataha';
export { slide6GeometriPosisiGerhanaMataha } from './slides/slide-6-geometri-posisi-gerhana-mataha';
import { slide7GarudaOrbitalMendaratDiSta } from './slides/slide-7-garuda-orbital-mendarat-di-sta';
export { slide7GarudaOrbitalMendaratDiSta } from './slides/slide-7-garuda-orbital-mendarat-di-sta';
import { slide8PertanyaanPemantikHotsAstro } from './slides/slide-8-pertanyaan-pemantik-hots-astro';
export { slide8PertanyaanPemantikHotsAstro } from './slides/slide-8-pertanyaan-pemantik-hots-astro';

export const ULAR_TANGGA_TATASURYA_DECK: PresentationDeckData = {
  "gameId": "ular-tangga-tatasurya",
  "title": "Petualangan Sains: Ekspedisi Orbit Tata Surya",
  "subtitle": "Ekspedisi Orbit 8 Planet, Sabuk Asteroid, & Mekanika Gerhana",
  "themeColor": "purple",
  "icon": "🚀",
  "category": "sains",
  "gradeLevel": "SD Kelas 4-6",
  "subjectDetail": "Tata Surya, Planet & Bintang (SD Kelas 6)",
  "mentor": {
    "name": "Kapten Dirgantara",
    "role": "Astro-Komandan Misi Dirgantara",
    "avatarEmoji": "🚀"
  },
  "totalSlides": 8,
  slides: [
    slide1PeluncuranWahanaGarudaOrbit,
    slide28PlanetTataSuryaPembagia,
    slide3Urutan8PlanetBerdasarkanJa,
    slide4MekanikaOrbitGerhana,
    slide5KarakteristikJulukanUnikB,
    slide6GeometriPosisiGerhanaMataha,
    slide7GarudaOrbitalMendaratDiSta,
    slide8PertanyaanPemantikHotsAstro,
  ],
};
