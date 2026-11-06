import React from 'react';
import {
  FotosintesisDaurAirIllustration,
  LaboratoriumForensikIllustration,
  SatwaEndemikHutanIllustration,
  TataSuryaAstronomiIllustration,
  EkosistemHutanTropisIllustration,
} from './ScienceSvgIllustrations';
import {
  GeometriPecahanIllustration,
  BorobudurKosmologiIllustration,
  Proklamasi1945Illustration,
  CaturTaktikLogikaIllustration,
  AksaraSastraBahasaIllustration,
} from './HumanitiesSvgIllustrations';

export * from './ScienceSvgIllustrations';
export * from './HumanitiesSvgIllustrations';

/**
 * 1-to-1 Mapping of all 10 Games to their respective high-resolution 800x500 academic SVG infographics.
 */
export const DECK_ILLUSTRATION_MAP: Record<string, React.FC<{ className?: string }>> = {
  'ular-tangga-sains': FotosintesisDaurAirIllustration,
  'point-click-lab': LaboratoriumForensikIllustration,
  'point-click-hutan': SatwaEndemikHutanIllustration,
  'ular-tangga-tatasurya': TataSuryaAstronomiIllustration,
  'presentasi-ekosistem-hutan': EkosistemHutanTropisIllustration,
  'ular-tangga-matematika': GeometriPecahanIllustration,
  'point-click-candi': BorobudurKosmologiIllustration,
  'ular-tangga-sejarah': Proklamasi1945Illustration,
  'catur-taktik-logika': CaturTaktikLogikaIllustration,
  'teka-teki-kata': AksaraSastraBahasaIllustration,
};

const DECK_SLUG_FALLBACK_MAP: Record<string, React.FC<{ className?: string }>> = {
  'daur-air-cendrawasih': FotosintesisDaurAirIllustration,
  'lab-kimia-maya': LaboratoriumForensikIllustration,
  'ekosistem-hutan-tropis': EkosistemHutanTropisIllustration,
  'astronomi-tata-surya': TataSuryaAstronomiIllustration,
  'matematika-pecahan': GeometriPecahanIllustration,
  'sejarah-borobudur': BorobudurKosmologiIllustration,
  'sejarah-proklamasi-1945': Proklamasi1945Illustration,
  'sastra-pantun-kata': AksaraSastraBahasaIllustration,
};

/**
 * Retrieve the high-resolution infographic component for a given game ID or deck folder slug.
 */
export function getDeckIllustration(gameId: string): React.FC<{ className?: string }> | undefined {
  return DECK_ILLUSTRATION_MAP[gameId] || DECK_SLUG_FALLBACK_MAP[gameId];
}
