import React from 'react';
import {
  FotosintesisDaurAirIllustration,
  LaboratoriumForensikIllustration,
  SatwaEndemikHutanIllustration,
  TataSuryaAstronomiIllustration,
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
  'presentasi-ekosistem-hutan': FotosintesisDaurAirIllustration,
  'ular-tangga-matematika': GeometriPecahanIllustration,
  'point-click-candi': BorobudurKosmologiIllustration,
  'ular-tangga-sejarah': Proklamasi1945Illustration,
  'catur-taktik-logika': CaturTaktikLogikaIllustration,
  'teka-teki-kata': AksaraSastraBahasaIllustration,
};

/**
 * Retrieve the high-resolution infographic component for a given game ID.
 */
export function getDeckIllustration(gameId: string): React.FC<{ className?: string }> | undefined {
  return DECK_ILLUSTRATION_MAP[gameId];
}
