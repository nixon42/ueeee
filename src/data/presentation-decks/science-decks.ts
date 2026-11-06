import { PresentationDeckData } from '@/types/presentation';

// 1. Daur Air Cendrawasih (ular-tangga-sains)
import { ULAR_TANGGA_SAINS_DECK } from './materi/daur-air-cendrawasih';
export * from './materi/daur-air-cendrawasih';

// 2. Lab Kimia Maya (point-click-lab)
import { POINT_CLICK_LAB_DECK } from './materi/lab-kimia-maya';
export * from './materi/lab-kimia-maya';

// 3. Point & Click Hutan Hujan Kalimantan (point-click-hutan)
import { POINT_CLICK_HUTAN_DECK } from './materi/point-click-hutan';
export * from './materi/point-click-hutan';

// 4. Astronomi Tata Surya (ular-tangga-tatasurya)
import { ULAR_TANGGA_TATASURYA_DECK } from './materi/astronomi-tata-surya';
export * from './materi/astronomi-tata-surya';

// 5. Ekosistem Hutan Tropis (presentasi-ekosistem-hutan)
import { PRESENTASI_EKOSISTEM_HUTAN_DECK } from './materi/ekosistem-hutan-tropis';
export * from './materi/ekosistem-hutan-tropis';

/**
 * MASTER REGISTRY EXPORT: SCIENCE_PRESENTATION_DECKS
 */
export const SCIENCE_PRESENTATION_DECKS: Record<string, PresentationDeckData> = {
  'ular-tangga-sains': ULAR_TANGGA_SAINS_DECK,
  'point-click-lab': POINT_CLICK_LAB_DECK,
  'point-click-hutan': POINT_CLICK_HUTAN_DECK,
  'ular-tangga-tatasurya': ULAR_TANGGA_TATASURYA_DECK,
  'presentasi-ekosistem-hutan': PRESENTASI_EKOSISTEM_HUTAN_DECK,
};
