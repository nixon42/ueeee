/**
 * Supabase Authentication API Gateway
 * Part of API Layer (src/api/)
 * Direct interaction with Supabase Auth for Google OAuth and session state.
 */

import { supabase } from './client';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Initiates Google OAuth Sign-In flow via Supabase Auth.
 */
export async function apiSignInWithGoogle(
  redirectTo?: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    const targetRedirect =
      redirectTo ||
      (typeof window !== 'undefined'
        ? window.location.origin
        : 'https://ueeee.my.id');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: targetRedirect,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      return { url: null, error };
    }

    return { url: data.url, error: null };
  } catch (err) {
    return {
      url: null,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}

/**
 * Sign out active Supabase auth session.
 */
export async function apiSignOut(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return {
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}

/**
 * Retrieve current active session from Supabase.
 */
export async function apiGetCurrentSession(): Promise<AuthResponse<Session>> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) return { data: null, error };
    return { data: data.session, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}

/**
 * Retrieve current authenticated user from Supabase.
 */
export async function apiGetCurrentUser(): Promise<AuthResponse<User>> {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return { data: null, error };
    return { data: data.user, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error(String(err)),
    };
  }
}

/**
 * Subscribe to Supabase auth state changes (login, logout, token refresh).
 */
export function apiOnAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
): { unsubscribe: () => void } {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return {
    unsubscribe: () => {
      data.subscription.unsubscribe();
    },
  };
}
