import { MiniGameMatchSlide } from '@/types/presentation';
import { ENERGY_TRANSFORMATION_PAIRS } from '../minigames-data';

export const slide5TransformasiEnergi: MiniGameMatchSlide = {
  id: 'uts-slide-5',
  type: 'mini-game-match',
  chapterBadge: 'BABAK 5: TANTANGAN 2 - TRANSFORMASI ENERGI',
  title: 'Transformasi Energi di Alam',
  subtitle: 'Hubungkan bentuk energi sumber di Kolom A dengan pemanfaatannya di Kolom B!',
  columnALabel: 'Bentuk Energi Asal',
  columnBLabel: 'Fenomena / Pemanfaatan',
  instruction: 'Klik satu kartu di kiri, lalu klik pasangannya di kanan untuk menghubungkan garis dinamis.',
  challengeKey: 'match-energi',
  pairs: ENERGY_TRANSFORMATION_PAIRS,
};
