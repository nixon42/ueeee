/**
 * Humanities SVG Illustrations (De-monolithized Facade)
 * Each illustration component is now natively housed within its respective modular materi deck folder:
 * - src/data/presentation-decks/materi/matematika-pecahan/illustration.tsx
 * - src/data/presentation-decks/materi/sejarah-borobudur/illustration.tsx
 * - src/data/presentation-decks/materi/sejarah-proklamasi-1945/illustration.tsx
 * - src/data/presentation-decks/materi/catur-taktik-logika/illustration.tsx
 * - src/data/presentation-decks/materi/sastra-pantun-kata/illustration.tsx
 *
 * This barrel facade guarantees 100% backward compatibility for all legacy visual imports and test suites.
 */

export type { HumanitiesSvgProps } from '@/types/presentation';

export {
  GeometriPecahanIllustration,
  MatematikaPecahanIllustration,
} from '@/data/presentation-decks/materi/matematika-pecahan/illustration';

export {
  BorobudurKosmologiIllustration,
  SejarahBorobudurIllustration,
} from '@/data/presentation-decks/materi/sejarah-borobudur/illustration';

export {
  Proklamasi1945Illustration,
  SejarahProklamasiIllustration,
} from '@/data/presentation-decks/materi/sejarah-proklamasi-1945/illustration';

export {
  CaturTaktikLogikaIllustration,
  CaturLogikaIllustration,
} from '@/data/presentation-decks/materi/catur-taktik-logika/illustration';

export {
  AksaraSastraBahasaIllustration,
  SastraPantunKataIllustration,
} from '@/data/presentation-decks/materi/sastra-pantun-kata/illustration';
