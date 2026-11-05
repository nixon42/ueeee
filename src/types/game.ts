export type GameType = 'ular-tangga' | 'point-and-click' | 'quiz' | 'puzzle';

export type SubjectCategory = 
  | 'all'
  | 'ular-tangga'
  | 'point-and-click'
  | 'matematika'
  | 'sains'
  | 'bahasa'
  | 'sejarah'
  | 'logika';

export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: GameType;
  category: SubjectCategory;
  gradeLevel: string; // e.g. "SD Kelas 4-6", "SMP", "Semua Kelas"
  badge?: string; // e.g. "Baru", "Populer", "Favorit Guru"
  badgeColor?: string;
  accentColor: string; // HEX or Tailwind color for card glow/border
  gradient: string; // Tailwind gradient classes
  iconName: string;
  playTimeMinutes: number;
  featured?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
}
