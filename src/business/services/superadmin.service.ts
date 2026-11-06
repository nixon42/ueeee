/**
 * Superadmin Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Manages Google OAuth Superadmin authentication, email authorization, and session gating.
 *
 * Strict Security Rules:
 * 1. Only the email defined in VITE_SUPERADMIN_EMAIL (default: faizatia43@gmail.com) can access Superadmin status.
 * 2. Any unauthorized email will be immediately rejected and signed out.
 * 3. Regular guests remain completely unaffected (Zero-Login platform preserved).
 */

import {
  apiSignInWithGoogle,
  apiSignOut,
  apiGetCurrentSession,
  apiOnAuthStateChange,
} from '@/api';
import { SuperadminAuthState, SuperadminUser } from '../models';

export const SUPERADMIN_EMAIL = (
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_SUPERADMIN_EMAIL) ||
  'faizatia43@gmail.com'
)
  .toLowerCase()
  .trim();

type AuthListener = (state: SuperadminAuthState) => void;

class SuperadminService {
  private state: SuperadminAuthState = {
    user: null,
    isSuperadmin: false,
    isLoading: true,
    error: null,
  };

  private listeners: Set<AuthListener> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  /**
   * Check whether a given email matches the strict Superadmin email configured in environment.
   */
  public isAuthorizedSuperadmin(email?: string | null): boolean {
    if (!email || typeof email !== 'string') return false;
    return email.toLowerCase().trim() === SUPERADMIN_EMAIL;
  }

  /**
   * Get the configured superadmin email.
   */
  public getSuperadminEmail(): string {
    return SUPERADMIN_EMAIL;
  }

  /**
   * Current authentication state snapshot.
   */
  public getState(): SuperadminAuthState {
    return { ...this.state };
  }

  /**
   * Subscribe to Superadmin auth state changes.
   */
  public subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const copy = { ...this.state };
    this.listeners.forEach((listener) => listener(copy));
  }

  /**
   * Initialize Supabase session check and set up auth state change subscriber.
   */
  public async init(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      const { data: session } = await apiGetCurrentSession();
      if (session?.user) {
        this.evaluateUser(session.user);
      } else {
        this.state = {
          user: null,
          isSuperadmin: false,
          isLoading: false,
          error: null,
        };
        this.notify();
      }
    } catch (err) {
      this.state = {
        user: null,
        isSuperadmin: false,
        isLoading: false,
        error: null,
      };
      this.notify();
    }

    // Subscribe to live auth events (e.g. callback redirect from Google OAuth)
    apiOnAuthStateChange((_event, session) => {
      if (session?.user) {
        this.evaluateUser(session.user);
      } else {
        this.state = {
          user: null,
          isSuperadmin: false,
          isLoading: false,
          error: null,
        };
        this.notify();
      }
    });
  }

  /**
   * Evaluates a Supabase user and checks strict email whitelist.
   */
  private evaluateUser(supabaseUser: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  }): void {
    const email = supabaseUser.email?.toLowerCase().trim();

    if (email && this.isAuthorizedSuperadmin(email)) {
      // Superadmin authorized!
      const user: SuperadminUser = {
        id: supabaseUser.id,
        email,
        isSuperadmin: true,
        name:
          typeof supabaseUser.user_metadata?.full_name === 'string'
            ? supabaseUser.user_metadata.full_name
            : email.split('@')[0],
        avatarUrl:
          typeof supabaseUser.user_metadata?.avatar_url === 'string'
            ? supabaseUser.user_metadata.avatar_url
            : undefined,
      };

      this.state = {
        user,
        isSuperadmin: true,
        isLoading: false,
        error: null,
      };
      this.notify();
    } else {
      // Unauthorized email! Reject immediately and revoke session
      const rejectedEmail = email || 'tidak dikenal';
      this.state = {
        user: null,
        isSuperadmin: false,
        isLoading: false,
        error: `Akses ditolak: Akun "${rejectedEmail}" tidak memiliki izin Superadmin. Hanya ${SUPERADMIN_EMAIL} yang berhak mengakses.`,
      };
      this.notify();

      // Sign out from Supabase to prevent unprivileged session lingering
      apiSignOut().catch(() => {});
    }
  }

  /**
   * Triggers Google OAuth sign-in flow.
   */
  public async signInWithGoogle(redirectTo?: string): Promise<{ success: boolean; error?: string }> {
    this.state = {
      ...this.state,
      isLoading: true,
      error: null,
    };
    this.notify();

    const { url, error } = await apiSignInWithGoogle(redirectTo);

    if (error) {
      this.state = {
        ...this.state,
        isLoading: false,
        error: error.message || 'Gagal memulai proses login Google.',
      };
      this.notify();
      return { success: false, error: error.message };
    }

    if (url && typeof window !== 'undefined') {
      window.location.href = url;
    }

    return { success: true };
  }

  /**
   * Signs out current Superadmin session and restores pure guest state.
   */
  public async signOut(): Promise<void> {
    this.state = {
      ...this.state,
      isLoading: true,
    };
    this.notify();

    await apiSignOut();

    this.state = {
      user: null,
      isSuperadmin: false,
      isLoading: false,
      error: null,
    };
    this.notify();
  }

  /**
   * Dismiss/clear any error message.
   */
  public clearError(): void {
    if (this.state.error) {
      this.state = {
        ...this.state,
        error: null,
      };
      this.notify();
    }
  }
}

export const superadminService = new SuperadminService();
