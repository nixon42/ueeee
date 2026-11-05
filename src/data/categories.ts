import { SubjectCategory } from '../types/game';

export interface CategoryTab {
  id: SubjectCategory;
  name: string;
  badge?: string;
  iconBg: string;
  textColor: string;
  iconName: string;
}

export const CATEGORIES: CategoryTab[] = [
  {
    id: 'all',
    name: 'Semua Materi',
    iconBg: 'bg-gradient-to-tr from-purple-500 to-indigo-500 text-white',
    textColor: 'text-purple-700',
    iconName: 'LayoutGrid',
  },
  {
    id: 'ular-tangga',
    name: 'Ular Tangga',
    badge: 'Populer',
    iconBg: 'bg-gradient-to-tr from-orange-400 to-pink-500 text-white',
    textColor: 'text-orange-700',
    iconName: 'Dice5',
  },
  {
    id: 'point-and-click',
    name: 'Point & Click',
    badge: 'Eksplorasi',
    iconBg: 'bg-gradient-to-tr from-teal-400 to-emerald-500 text-white',
    textColor: 'text-teal-700',
    iconName: 'Compass',
  },
  {
    id: 'matematika',
    name: 'Matematika',
    iconBg: 'bg-gradient-to-tr from-blue-500 to-cyan-400 text-white',
    textColor: 'text-blue-700',
    iconName: 'Calculator',
  },
  {
    id: 'sains',
    name: 'Sains Maya',
    badge: 'Baru',
    iconBg: 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-white',
    textColor: 'text-emerald-700',
    iconName: 'FlaskConical',
  },
  {
    id: 'bahasa',
    name: 'Bahasa & Kata',
    iconBg: 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white',
    textColor: 'text-amber-700',
    iconName: 'BookOpen',
  },
  {
    id: 'sejarah',
    name: 'Sejarah & Budaya',
    iconBg: 'bg-gradient-to-tr from-rose-400 to-red-500 text-white',
    textColor: 'text-rose-700',
    iconName: 'Landmark',
  },
  {
    id: 'logika',
    name: 'Teka-Teki Logika',
    iconBg: 'bg-gradient-to-tr from-fuchsia-500 to-pink-500 text-white',
    textColor: 'text-fuchsia-700',
    iconName: 'BrainCircuit',
  },
];
