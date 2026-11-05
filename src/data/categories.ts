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
    iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-purple-200',
    textColor: 'text-purple-700',
    iconName: 'LayoutGrid',
  },
  {
    id: 'ular-tangga',
    name: 'Ular Tangga',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-orange-200',
    textColor: 'text-orange-700',
    iconName: 'Dice5',
  },
  {
    id: 'point-and-click',
    name: 'Point & Click',
    iconBg: 'bg-gradient-to-tr from-teal-500 to-emerald-600 text-white shadow-teal-200',
    textColor: 'text-teal-700',
    iconName: 'Compass',
  },
  {
    id: 'matematika',
    name: 'Matematika',
    iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-blue-200',
    textColor: 'text-blue-700',
    iconName: 'Calculator',
  },
  {
    id: 'sains',
    name: 'Sains Maya',
    badge: 'Baru',
    iconBg: 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-emerald-200',
    textColor: 'text-emerald-700',
    iconName: 'FlaskConical',
  },
  {
    id: 'bahasa',
    name: 'Bahasa & Kata',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-pink-500 text-white shadow-amber-200',
    textColor: 'text-amber-700',
    iconName: 'BookOpen',
  },
  {
    id: 'sejarah',
    name: 'Sejarah & Budaya',
    iconBg: 'bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-rose-200',
    textColor: 'text-rose-700',
    iconName: 'Landmark',
  },
  {
    id: 'logika',
    name: 'Teka-Teki Logika',
    iconBg: 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-purple-200',
    textColor: 'text-fuchsia-700',
    iconName: 'BrainCircuit',
  },
];
