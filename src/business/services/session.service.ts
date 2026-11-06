/**
 * Session Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Manages anonymous guest and teacher sessions with persistent local identifiers.
 */

import { SessionProfile } from '../models';
import { safeStorage } from '@/lib/safeStorage';

const STORAGE_KEY_SESSION = 'ueeee_session_profile_v1';

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now().toString(36);
}

class SessionService {
  private currentProfile: SessionProfile;

  constructor() {
    this.currentProfile = this.loadOrInitProfile();
  }

  private loadOrInitProfile(): SessionProfile {
    const stored = safeStorage.getJson<SessionProfile | null>(STORAGE_KEY_SESSION, null);
    if (stored && typeof stored.sessionId === 'string' && stored.sessionId.length > 0) {
      return stored;
    }

    const newProfile: SessionProfile = {
      sessionId: 'guest_' + generateUuid(),
      role: 'guest',
      displayName: 'Penjelajah Cilik',
      createdAt: new Date().toISOString(),
    };

    safeStorage.setJson(STORAGE_KEY_SESSION, newProfile);
    return newProfile;
  }

  public getSessionId(): string {
    return this.currentProfile.sessionId;
  }

  public getProfile(): SessionProfile {
    return { ...this.currentProfile };
  }

  public updateProfile(updates: Partial<Omit<SessionProfile, 'sessionId' | 'createdAt'>>): SessionProfile {
    this.currentProfile = {
      ...this.currentProfile,
      ...updates,
    };
    safeStorage.setJson(STORAGE_KEY_SESSION, this.currentProfile);
    return { ...this.currentProfile };
  }
}

export const sessionService = new SessionService();
