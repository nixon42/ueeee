/**
 * Session Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Manages anonymous guest and teacher sessions with persistent local identifiers.
 */

import { SessionProfile } from '../models';

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
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SESSION);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sessionId) {
          return parsed;
        }
      }
    } catch {
      // Ignore JSON parse errors and generate fresh
    }

    const newProfile: SessionProfile = {
      sessionId: 'guest_' + generateUuid(),
      role: 'guest',
      displayName: 'Penjelajah Cilik',
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newProfile));
    } catch {
      // Ignore localStorage write failure in incognito/restricted modes
    }

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
    try {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(this.currentProfile));
    } catch {
      // Ignore
    }
    return { ...this.currentProfile };
  }
}

export const sessionService = new SessionService();
