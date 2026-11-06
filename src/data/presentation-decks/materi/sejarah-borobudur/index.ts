import { PresentationDeckData } from '@/types/presentation';
export * from './minigames-data';

import { slide1MenguakRahasiaReliefAbadKe } from './slides/slide-1-menguak-rahasia-relief-abad-ke';
export { slide1MenguakRahasiaReliefAbadKe } from './slides/slide-1-menguak-rahasia-relief-abad-ke';
import { slide2TigaStrataKosmologiBuddhis } from './slides/slide-2-tiga-strata-kosmologi-buddhis';
export { slide2TigaStrataKosmologiBuddhis } from './slides/slide-2-tiga-strata-kosmologi-buddhis';
import { slide3PerahuLayarCadikGandaPas } from './slides/slide-3-perahu-layar-cadik-ganda-pas';
export { slide3PerahuLayarCadikGandaPas } from './slides/slide-3-perahu-layar-cadik-ganda-pas';
import { slide4Urutan4StrataArsitekturKos } from './slides/slide-4-urutan-4-strata-arsitektur-kos';
export { slide4Urutan4StrataArsitekturKos } from './slides/slide-4-urutan-4-strata-arsitektur-kos';
import { slide5ArtefakCandiBuktiKemariti } from './slides/slide-5-artefak-candi-bukti-kemariti';
export { slide5ArtefakCandiBuktiKemariti } from './slides/slide-5-artefak-candi-bukti-kemariti';
import { slide6ToleransiDinastiSyailendra } from './slides/slide-6-toleransi-dinasti-syailendra';
export { slide6ToleransiDinastiSyailendra } from './slides/slide-6-toleransi-dinasti-syailendra';
import { slide7DokumentasiWarisanDuniaBoro } from './slides/slide-7-dokumentasi-warisan-dunia-boro';
export { slide7DokumentasiWarisanDuniaBoro } from './slides/slide-7-dokumentasi-warisan-dunia-boro';
import { slide8RefleksiNilaiKebudayaanTo } from './slides/slide-8-refleksi-nilai-kebudayaan-to';
export { slide8RefleksiNilaiKebudayaanTo } from './slides/slide-8-refleksi-nilai-kebudayaan-to';

export const POINT_CLICK_CANDI_DECK: PresentationDeckData = {
  "gameId": "point-click-candi",
  "title": "Point & Click: Relief Candi & Sejarah Nusantara",
  "subtitle": "Eksplorasi Kosmologi Borobudur, Perahu Cadik & Pasak Andesit",
  "themeColor": "amber",
  "icon": "🏛️",
  "category": "sejarah",
  "gradeLevel": "SMP",
  "subjectDetail": "Sejarah / Kebudayaan & Arkeologi Maritim",
  "mentor": {
    "name": "Paman Dewa",
    "role": "Kurator Arkeologi & Cagar Budaya",
    "avatarEmoji": "🏛️"
  },
  "totalSlides": 8,
  slides: [
    slide1MenguakRahasiaReliefAbadKe,
    slide2TigaStrataKosmologiBuddhis,
    slide3PerahuLayarCadikGandaPas,
    slide4Urutan4StrataArsitekturKos,
    slide5ArtefakCandiBuktiKemariti,
    slide6ToleransiDinastiSyailendra,
    slide7DokumentasiWarisanDuniaBoro,
    slide8RefleksiNilaiKebudayaanTo,
  ],
};
