import { MiniGameSequenceSlide } from '@/types/presentation';
import { WATER_CYCLE_SEQUENCE } from '../minigames-data';

export const slide4UrutkanHidrologi: MiniGameSequenceSlide = {
  id: 'uts-slide-4',
  type: 'mini-game-sequence',
  chapterBadge: 'BABAK 4: TANTANGAN 1 - URUTAN HIDROLOGI',
  title: 'Rekonstruksi Siklus Air Sempurna',
  subtitle: 'Susun 4 kartu tahapan daur air berikut sesuai urutan siklus alaminya di bumi!',
  instruction:
    'Tarik atau geser kartu ke posisi yang tepat dari penguapan hingga penyerapan tanah.',
  challengeKey: 'sequence-hidrologi',
  items: WATER_CYCLE_SEQUENCE,
};
