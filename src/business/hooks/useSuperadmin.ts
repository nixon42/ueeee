/**
 * Superadmin Domain Hook
 * Part of Business Logic Layer (src/business/hooks/)
 * React hook binding for Superadmin authentication and authorization state.
 */

import { useState, useEffect, useCallback } from 'react';
import { superadminService } from '../services/superadmin.service';
import { SuperadminAuthState } from '../models';

export function useSuperadmin() {
  const [state, setState] = useState<SuperadminAuthState>(() =>
    superadminService.getState()
  );

  useEffect(() => {
    const unsubscribe = superadminService.subscribe((nextState) => {
      setState(nextState);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async (redirectTo?: string) => {
    return superadminService.signInWithGoogle(redirectTo);
  }, []);

  const signOut = useCallback(async () => {
    return superadminService.signOut();
  }, []);

  const clearError = useCallback(() => {
    superadminService.clearError();
  }, []);

  return {
    user: state.user,
    isSuperadmin: state.isSuperadmin,
    isLoading: state.isLoading,
    error: state.error,
    signInWithGoogle,
    signOut,
    clearError,
    superadminEmail: superadminService.getSuperadminEmail(),
  };
}
