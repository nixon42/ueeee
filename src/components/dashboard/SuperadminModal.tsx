import React, { useEffect } from 'react';
import { X, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { useSuperadmin } from '@/business';
import { sound } from '@/lib/sound';
import { LogoIcon } from '@/components/common/Logo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDashboard?: () => void;
}

export const SuperadminModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNavigateToDashboard,
}) => {
  const {
    user,
    isSuperadmin,
    isLoading,
    error,
    signInWithGoogle,
    signOut,
    clearError,
  } = useSuperadmin();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    sound.playClick();
    clearError();
    const adminUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/admin`
        : undefined;
    await signInWithGoogle(adminUrl);
  };

  const handleSignOut = async () => {
    sound.playClick();
    await signOut();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-7 overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="Tutup"
        >
          <X size={18} />
        </button>

        {isSuperadmin && user ? (
          /* Profile / Already Logged In State */
          <div className="space-y-5 text-center">
            <div className="flex flex-col items-center">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || 'Pengelola'}
                  className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-sm object-cover mb-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-sm mb-3">
                  {(user.name || 'A').charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-lg font-bold text-slate-900">
                {user.name || 'Pengelola ueeee'}
              </h2>
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100">
                Akun Pengelola
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                  if (onNavigateToDashboard) onNavigateToDashboard();
                }}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition cursor-pointer"
              >
                Buka Dashboard
              </button>

              <button
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full py-2 px-4 rounded-xl font-semibold text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut size={14} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Clean Login State */
          <div className="space-y-5">
            {/* Brand & Greeting */}
            <div className="flex flex-col items-center text-center pt-1">
              <div className="mb-3.5 flex items-center justify-center">
                <LogoIcon size={44} idSuffix="login-modal" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Masuk ke ueeee
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs">
                Masuk dengan akun Google untuk mengelola konten dan materi pembelajaran.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-medium flex items-start gap-2 leading-relaxed">
                <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Google Sign In Button */}
            <div className="pt-1">
              <button
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl font-bold text-sm bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs hover:shadow transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-purple-600" />
                    <span>Menghubungkan ke Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Lanjutkan dengan Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Subtle Footer Note */}
            <p className="text-[11px] text-slate-400 text-center pt-1 leading-normal">
              Akses khusus diperuntukkan bagi tim pengelola resmi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
