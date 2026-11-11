export type CharacterId = 'rian' | 'maya' | 'bimo';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  nickname: string;
  title: string;
  role: string;
  avatarEmoji: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  accentBg: string;
  tagline: string;
  description: string;
  specialAbility: string;
  abilityDetail: string;
  stats: {
    speed: number;       // 1 - 5 stars
    jump: number;        // 1 - 5 stars
    technique: number;   // 1 - 5 stars
  };
  physics: {
    runSpeed: number;
    jumpForce: number;
    gravity: number;
    canFloat?: boolean;
    canDoubleJump?: boolean;
  };
}

export type QuestionCategory =
  | 'pancaindra'
  | 'struktur'
  | 'kata-khusus'
  | 'kata-konkret'
  | 'majas';

export interface LinguisticQuestion {
  id: string;
  category: QuestionCategory;
  categoryLabel: string;
  prompt: string;
  passageSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'brick' | 'pipe' | 'cloud' | 'mystery';
  mysteryId?: string;
  hit?: boolean;
  question?: LinguisticQuestion;
}

export interface Coin {
  id: string;
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  bobOffset: number;
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  startX: number;
  endX: number;
  type: 'kumbang' | 'klise';
  alive: boolean;
  squished?: boolean;
  squishTimer?: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
}

export type GameStatus =
  | 'select'
  | 'playing'
  | 'quiz'
  | 'paused'
  | 'victory'
  | 'gameover';
