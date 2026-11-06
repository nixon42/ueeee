import React from 'react';
import { ScienceSvgProps } from '@/types/presentation';
import { FotosintesisDaurAirIllustration } from '../daur-air-cendrawasih/illustration';

/**
 * Ekosistem Hutan Tropis & Jaring-Jaring Makanan SVG Illustration
 * Shares core photosynthesis & energy cycle representation with tropical forest biome accents
 */
export const EkosistemHutanTropisIllustration: React.FC<ScienceSvgProps> = (props) => {
  return <FotosintesisDaurAirIllustration {...props} />;
};

export { FotosintesisDaurAirIllustration };
