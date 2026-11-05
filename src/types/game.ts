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

export type GradeLevel = 'Semua Kelas' | 'SD Kelas 1-3' | 'SD Kelas 4-6' | 'SMP' | 'SMA';

export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: GameType;
  category: SubjectCategory;
  gradeLevel: GradeLevel;
  badge?: string;
  badgeColor?: string;
  accentColor: string;
  gradient: string;
  iconName: string;
  playTimeMinutes: number;
  featured?: boolean;
  subjectDetail: string;
  rating: number; // 4.8, 4.9, etc.
  playsCount: number;
  tags?: string[];
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'mudah' | 'sedang' | 'sulit';
  topic: string;
}

export interface PointAndClickHotspot {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  iconName: string;
  title: string;
  dialogue: string;
  educationalFact: string;
  itemReward?: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  puzzle?: {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
  };
}

export interface PointAndClickScene {
  id: string;
  title: string;
  subtitle: string;
  theme: 'lab' | 'candi' | 'hutan';
  accentGradient: string;
  missionDescription: string;
  mentorName: string;
  mentorRole: string;
  hotspots: PointAndClickHotspot[];
}

export interface PlayerHistory {
  gameId: string;
  playedAt: string;
  score: number;
  completed: boolean;
}
