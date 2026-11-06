/**
 * Business Logic Layer - Barrel Export
 * src/business/
 * Encapsulates domain logic, offline-first reconciliation, and state management services.
 */

export * from './models';
export * from './services/session.service';
export * from './services/progress.service';
export * from './services/favorites.service';
export * from './services/stats.service';
export * from './services/teacher.service';
export * from './services/sync.service';
export * from '@/lib/safeStorage';
export * from './hooks/useCloudSync';
export * from './hooks/useFavorites';
export * from './hooks/useGameProgress';
export * from './hooks/useGameStats';
export * from './hooks/useTeacherNotes';
