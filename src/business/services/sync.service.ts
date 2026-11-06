/**
 * Cloud Synchronization & Connectivity Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Tracks real-time Supabase connection health, network status, and sync latency.
 */

import { checkSupabaseConnection, isSupabaseConfigured } from '@/api';
import { CloudSyncStatus } from '../models';

type SyncListener = (state: SyncState) => void;

export interface SyncState {
  status: CloudSyncStatus;
  isOnline: boolean;
  latencyMs: number;
  lastChecked: string;
  errorMessage?: string;
}

class SyncService {
  private state: SyncState = {
    status: 'offline',
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    latencyMs: 0,
    lastChecked: new Date().toISOString(),
  };

  private listeners: Set<SyncListener> = new Set();

  constructor() {
    this.initNetworkListeners();
    this.performHealthCheck();
  }

  private initNetworkListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.state.isOnline = true;
        this.performHealthCheck();
      });

      window.addEventListener('offline', () => {
        this.state.isOnline = false;
        this.state.status = 'offline';
        this.notifyListeners();
      });
    }
  }

  private notifyListeners(): void {
    const copy = { ...this.state };
    this.listeners.forEach(listener => listener(copy));
  }

  public subscribe(listener: SyncListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): SyncState {
    return { ...this.state };
  }

  /**
   * Ping Supabase to verify active database health.
   */
  public async performHealthCheck(): Promise<SyncState> {
    if (!isSupabaseConfigured) {
      this.state = {
        status: 'offline',
        isOnline: false,
        latencyMs: 0,
        lastChecked: new Date().toISOString(),
        errorMessage: 'Supabase credentials missing',
      };
      this.notifyListeners();
      return this.state;
    }

    if (!navigator.onLine) {
      this.state = {
        status: 'offline',
        isOnline: false,
        latencyMs: 0,
        lastChecked: new Date().toISOString(),
      };
      this.notifyListeners();
      return this.state;
    }

    this.state.status = 'syncing';
    this.notifyListeners();

    const result = await checkSupabaseConnection();

    if (result.connected) {
      this.state = {
        status: 'online',
        isOnline: true,
        latencyMs: result.latencyMs,
        lastChecked: new Date().toISOString(),
      };
    } else {
      this.state = {
        status: 'error',
        isOnline: true,
        latencyMs: result.latencyMs,
        lastChecked: new Date().toISOString(),
        errorMessage: result.error,
      };
    }

    this.notifyListeners();
    return this.state;
  }
}

export const syncService = new SyncService();
