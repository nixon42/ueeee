import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LogOut,
  ArrowLeft,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { useSuperadmin } from '@/business';
import { GAMES_CATALOG } from '@/data/games-catalog';
import { ALL_PRESENTATION_DECKS, getPresentationDeckByGameId } from '@/data/presentation-decks';
import { checkSupabaseConnection } from '@/api/client';
import { sound } from '@/lib/sound';
import { LogoIcon } from '@/components/common/Logo';

interface Props {
  onBackToDashboard: () => void;
}

export const SuperadminDashboard: React.FC<Props> = ({ onBackToDashboard }) => {
  const { user, signOut, superadminEmail } = useSuperadmin();
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; latencyMs: number; checking: boolean }>({
    connected: true,
    latencyMs: 45,
    checking: false,
  });

  const checkConnection = async () => {
    setDbStatus((prev) => ({ ...prev, checking: true }));
    try {
      const res = await checkSupabaseConnection();
      setDbStatus({
        connected: res.connected,
        latencyMs: res.latencyMs,
        checking: false,
      });
    } catch {
      setDbStatus({ connected: false, latencyMs: 0, checking: false });
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const deckList = Object.values(ALL_PRESENTATION_DECKS);
  const totalSlides = deckList.reduce(
    (acc, deck) => acc + (deck.slides?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Superadmin Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon size={24} idSuffix="admin-header" className="rounded-lg shadow-sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base tracking-tight">ueeee</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 uppercase tracking-wider">
                Superadmin Panel
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Route: <span className="font-mono text-purple-400">/admin</span> (Khusus {superadminEmail})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToDashboard();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
            title="Kembali ke Dashboard Pembelajaran Siswa"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Kembali ke Dashboard Materi</span>
          </button>

          <button
            onClick={async () => {
              sound.playClick();
              await signOut();
              onBackToDashboard();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 transition flex items-center gap-1.5 cursor-pointer border border-rose-800/60"
            title="Keluar dari sesi Superadmin"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Profile & Status Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Superadmin Avatar"
                className="w-16 h-16 rounded-2xl border-2 border-purple-400 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg border border-purple-400/40">
                FA
              </div>
            )}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-black border border-amber-400/40 mb-1">
                <ShieldCheck size={12} className="text-amber-400" />
                <span>AKUN RESMI SUPERADMIN</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {user?.name || 'Faiz Atia'}
              </h1>
              <p className="text-xs font-mono text-purple-300">
                {user?.email || superadminEmail}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 flex-1 md:flex-initial">
              <div className={`w-3 h-3 rounded-full ${dbStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Supabase DB</p>
                <p className="text-xs font-mono font-bold text-slate-200">
                  {dbStatus.connected ? `Online (${dbStatus.latencyMs}ms)` : 'Offline'}
                </p>
              </div>
              <button
                onClick={checkConnection}
                disabled={dbStatus.checking}
                className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                title="Refresh koneksi"
              >
                <RefreshCw size={12} className={dbStatus.checking ? 'animate-spin' : ''} />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 flex-1 md:flex-initial">
              <Lock size={16} className="text-cyan-400" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Hak Akses</p>
                <p className="text-xs font-bold text-cyan-300">Strict Whitelist (1 Email)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Koleksi Game</span>
              <BookOpen size={18} className="text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">{GAMES_CATALOG.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Materi Interaktif Terdaftar</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Slide Presentasi</span>
              <Layers size={18} className="text-indigo-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">{totalSlides}</p>
            <p className="text-[11px] text-slate-400 mt-1">Slide Story-Driven Interaktif</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Akses Publik</span>
              <Sparkles size={18} className="text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">Zero-Login</p>
            <p className="text-[11px] text-slate-400 mt-1">Bebas Akses Siswa &amp; Guru</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Keamanan CSP</span>
              <CheckCircle2 size={18} className="text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">Strict</p>
            <p className="text-[11px] text-slate-400 mt-1">WSS + REST Supabase</p>
          </div>
        </div>

        {/* Master Catalog Table */}
        <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Katalog Materi &amp; Story Decks Terverifikasi
              </h2>
              <p className="text-xs text-slate-400">
                Seluruh 10 game pembelajaran aktif di platform <span className="text-purple-400">ueeee.my.id</span>
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onBackToDashboard();
              }}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Tampilan Siswa</span>
              <ExternalLink size={13} />
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Game ID</th>
                  <th className="py-3.5 px-4">Judul Materi</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Kelas</th>
                  <th className="py-3.5 px-4">Tipe Engine</th>
                  <th className="py-3.5 px-4">Slide Deck</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {GAMES_CATALOG.map((game) => {
                  const deck = getPresentationDeckByGameId(game.id);
                  return (
                    <tr key={game.id} className="hover:bg-slate-900/50 transition">
                      <td className="py-3 px-4 font-mono text-[11px] text-purple-300 font-bold">
                        {game.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        {game.title}
                      </td>
                      <td className="py-3 px-4 capitalize">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {game.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{game.gradeLevel}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{game.type}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {deck ? `${deck.slides.length} Slide` : 'N/A'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-500 py-4">
          <p>Superadmin Control Session • Otentikasi Google via Supabase Auth • Host: GitHub Pages (ueeee.my.id)</p>
        </div>
      </main>
    </div>
  );
};
