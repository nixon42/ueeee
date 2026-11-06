/**
 * Science SVG Illustrations (De-monolithized Facade)
 * Each illustration component is now natively housed within its respective modular materi deck folder:
 * - src/data/presentation-decks/materi/daur-air-cendrawasih/illustration.tsx
 * - src/data/presentation-decks/materi/ekosistem-hutan-tropis/illustration.tsx
 * - src/data/presentation-decks/materi/lab-kimia-maya/illustration.tsx
 * - src/data/presentation-decks/materi/point-click-hutan/illustration.tsx
 * - src/data/presentation-decks/materi/astronomi-tata-surya/illustration.tsx
 *
 * This barrel facade guarantees 100% backward compatibility for all legacy visual imports and test suites.
 */

export type { ScienceSvgProps } from '@/types/presentation';

export {
  FotosintesisDaurAirIllustration,
  DaurAirIllustration,
} from '@/data/presentation-decks/materi/daur-air-cendrawasih/illustration';

export {
  EkosistemHutanTropisIllustration,
} from '@/data/presentation-decks/materi/ekosistem-hutan-tropis/illustration';

export {
  LaboratoriumForensikIllustration,
  LabKimiaIllustration,
} from '@/data/presentation-decks/materi/lab-kimia-maya/illustration';

export {
  SatwaEndemikHutanIllustration,
  PointClickHutanIllustration,
} from '@/data/presentation-decks/materi/point-click-hutan/illustration';

export {
  TataSuryaAstronomiIllustration,
  AstronomiTataSuryaIllustration,
} from '@/data/presentation-decks/materi/astronomi-tata-surya/illustration';
