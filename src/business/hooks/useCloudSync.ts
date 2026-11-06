/**
 * React Hook: useCloudSync
 * Part of Business Logic Layer (src/business/hooks/)
 * Provides reactive cloud connectivity status, online/offline detection, and sync latency to UI components.
 */

import { useState, useEffect } from 'react';
import { syncService, SyncState } from '../services/sync.service';

export function useCloudSync(): {
  syncState: SyncState;
  isOnline: boolean;
  refreshHealthCheck: () => Promise<SyncState>;
} {
  const [syncState, setSyncState] = useState<SyncState>(() => syncService.getState());

  useEffect(() => {
    const unsubscribe = syncService.subscribe(setSyncState);
    return () => unsubscribe();
  }, []);

  return {
    syncState,
    isOnline: syncState.status === 'online',
    refreshHealthCheck: () => syncService.performHealthCheck(),
  };
}
