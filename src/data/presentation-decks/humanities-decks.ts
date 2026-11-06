import { PresentationDeckData } from '@/types/presentation';

// 1. Matematika Pecahan (ular-tangga-matematika)
import { ULAR_TANGGA_MATEMATIKA_DECK } from './materi/matematika-pecahan';
export * from './materi/matematika-pecahan';

// 2. Sejarah Borobudur (point-click-candi)
import { POINT_CLICK_CANDI_DECK } from './materi/sejarah-borobudur';
export * from './materi/sejarah-borobudur';

// 3. Sastra Pantun Kata (teka-teki-kata)
import { TEKA_TEKI_KATA_DECK } from './materi/sastra-pantun-kata';
export * from './materi/sastra-pantun-kata';

// 4. Sejarah Proklamasi 1945 (ular-tangga-sejarah)
import { ULAR_TANGGA_SEJARAH_DECK } from './materi/sejarah-proklamasi-1945';
export * from './materi/sejarah-proklamasi-1945';

// 5. Catur Taktik Logika (catur-taktik-logika)
import { CATUR_TAKTIK_LOGIKA_DECK } from './materi/catur-taktik-logika';
export * from './materi/catur-taktik-logika';

/**
 * MASTER REGISTRY EXPORT: HUMANITIES_PRESENTATION_DECKS
 */
export const HUMANITIES_PRESENTATION_DECKS: Record<string, PresentationDeckData> = {
  'ular-tangga-matematika': ULAR_TANGGA_MATEMATIKA_DECK,
  'point-click-candi': POINT_CLICK_CANDI_DECK,
  'teka-teki-kata': TEKA_TEKI_KATA_DECK,
  'ular-tangga-sejarah': ULAR_TANGGA_SEJARAH_DECK,
  'catur-taktik-logika': CATUR_TAKTIK_LOGIKA_DECK,
};
