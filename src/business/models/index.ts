/**
 * Business Logic Layer - Domain Entities & Models
 * src/business/models/
 */

export interface SessionProfile {
  sessionId: string;
  role: 'student' | 'teacher' | 'guest';
  displayName: string;
  schoolOrClass?: string;
  createdAt: string;
}

export interface GameProgress {
  sessionId: string;
  gameId: string;
  currentSlide: number;
  totalSlides: number;
  isCompleted: boolean;
  completionPercentage: number;
  challengesCompleted: string[];
  score: number;
  playTimeSeconds: number;
  lastUpdated: string;
}

export interface GameAnalytics {
  gameId: string;
  playCount: number;
  completionCount: number;
  averageRating: number;
  totalPlayTime: number;
  updatedAt: string;
}

export interface TeacherReflectionNote {
  id: string;
  sessionId: string;
  gameId: string;
  slideIndex: number;
  topic: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type CloudSyncStatus = 'online' | 'offline' | 'syncing' | 'error';

export interface SuperadminUser {
  id: string;
  email: string;
  isSuperadmin: boolean;
  name?: string;
  avatarUrl?: string;
}

export interface SuperadminAuthState {
  user: SuperadminUser | null;
  isSuperadmin: boolean;
  isLoading: boolean;
  error: string | null;
}
