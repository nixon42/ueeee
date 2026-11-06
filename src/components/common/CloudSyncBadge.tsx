/**
 * UI Component: CloudSyncBadge
 * Part of UI Layer (src/components/common/)
 * Displays live Supabase connectivity and offline-first status for teachers and students.
 */

import React, { useState } from 'react';
import { Cloud, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useCloudSync } from '@/business';

export const CloudSyncBadge: React.FC = () => {
  const { syncState, refreshHealthCheck } = useCloudSync();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    await refreshHealthCheck();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (syncState.status === 'online') {
    return (
      <button
        onClick={handleRefresh}
        title={`Supabase Cloud Terhubung (Latensi: ${syncState.latencyMs}ms). Klik untuk cek ulang koneksi.`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Cloud className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">Cloud Terhubung</span>
        <span className="text-[10px] text-emerald-500 font-mono">({syncState.latencyMs}ms)</span>
      </button>
    );
  }

  if (syncState.status === 'syncing' || isRefreshing) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse shadow-sm"
        title="Sedang menyinkronkan data dengan Supabase..."
      >
        <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
        <span>Sinkronisasi...</span>
      </div>
    );
  }

  if (syncState.status === 'error') {
    return (
      <button
        onClick={handleRefresh}
        title={`Koneksi Cloud Terkendala (${syncState.errorMessage || 'Jaringan'}). Klik untuk coba lagi.`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
      >
        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
        <span className="hidden sm:inline">Mode Lokal</span>
        <RefreshCw className={`w-3 h-3 text-rose-500 ${isRefreshing ? 'animate-spin' : ''}`} />
      </button>
    );
  }

  // Offline default
  return (
    <button
      onClick={handleRefresh}
      title="Perangkat dalam Mode Offline. Seluruh progres dan catatan tersimpan aman secara lokal di memori browser."
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors shadow-sm"
    >
      <CloudOff className="w-3.5 h-3.5 text-slate-500" />
      <span className="hidden sm:inline">Offline (Lokal)</span>
    </button>
  );
};
