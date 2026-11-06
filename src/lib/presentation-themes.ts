import { GameStageTheme } from '@/components/game-shell';

export type PresentationThemeKey = GameStageTheme;

export interface PresentationThemeTokens {
  gradient: string;
  btnPrimary: string;
  activeDot: string;
  bgLight: string;
  borderLight: string;
  textPrimary: string;
  textBadge: string;
  bgBadge: string;
  borderBadge: string;
  shadowColor: string;
  avatarRing: string;
}

export const PRESENTATION_THEMES: Record<PresentationThemeKey, PresentationThemeTokens> = {
  emerald: {
    gradient: 'from-emerald-500 to-teal-400',
    btnPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200',
    activeDot: 'bg-emerald-600',
    bgLight: 'from-emerald-50/70',
    borderLight: 'border-emerald-200/80',
    textPrimary: 'text-emerald-700',
    textBadge: 'text-emerald-600',
    bgBadge: 'bg-emerald-50',
    borderBadge: 'border-emerald-200/70',
    shadowColor: 'shadow-emerald-200',
    avatarRing: 'ring-emerald-100 shadow-emerald-200 from-emerald-500 to-teal-400',
  },
  teal: {
    gradient: 'from-teal-500 to-cyan-400',
    btnPrimary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200',
    activeDot: 'bg-teal-600',
    bgLight: 'from-teal-50/70',
    borderLight: 'border-teal-200/80',
    textPrimary: 'text-teal-700',
    textBadge: 'text-teal-600',
    bgBadge: 'bg-teal-50',
    borderBadge: 'border-teal-200/70',
    shadowColor: 'shadow-teal-200',
    avatarRing: 'ring-teal-100 shadow-teal-200 from-teal-500 to-cyan-400',
  },
  indigo: {
    gradient: 'from-indigo-600 to-purple-500',
    btnPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200',
    activeDot: 'bg-indigo-600',
    bgLight: 'from-indigo-50/70',
    borderLight: 'border-indigo-200/80',
    textPrimary: 'text-indigo-700',
    textBadge: 'text-indigo-600',
    bgBadge: 'bg-indigo-50',
    borderBadge: 'border-indigo-200/70',
    shadowColor: 'shadow-indigo-200',
    avatarRing: 'ring-indigo-100 shadow-indigo-200 from-indigo-500 to-purple-500',
  },
  amber: {
    gradient: 'from-amber-500 to-yellow-500',
    btnPrimary: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
    activeDot: 'bg-amber-600',
    bgLight: 'from-amber-50/70',
    borderLight: 'border-amber-200/80',
    textPrimary: 'text-amber-700',
    textBadge: 'text-amber-600',
    bgBadge: 'bg-amber-50',
    borderBadge: 'border-amber-200/70',
    shadowColor: 'shadow-amber-200',
    avatarRing: 'ring-amber-100 shadow-amber-200 from-amber-500 to-yellow-500',
  },
  orange: {
    gradient: 'from-orange-500 to-pink-500',
    btnPrimary: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200',
    activeDot: 'bg-orange-600',
    bgLight: 'from-orange-50/70',
    borderLight: 'border-orange-200/80',
    textPrimary: 'text-orange-700',
    textBadge: 'text-orange-600',
    bgBadge: 'bg-orange-50',
    borderBadge: 'border-orange-200/70',
    shadowColor: 'shadow-orange-200',
    avatarRing: 'ring-orange-100 shadow-orange-200 from-orange-500 to-pink-500',
  },
  rose: {
    gradient: 'from-rose-500 to-pink-500',
    btnPrimary: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200',
    activeDot: 'bg-rose-600',
    bgLight: 'from-rose-50/70',
    borderLight: 'border-rose-200/80',
    textPrimary: 'text-rose-700',
    textBadge: 'text-rose-600',
    bgBadge: 'bg-rose-50',
    borderBadge: 'border-rose-200/70',
    shadowColor: 'shadow-rose-200',
    avatarRing: 'ring-rose-100 shadow-rose-200 from-rose-500 to-pink-500',
  },
  blue: {
    gradient: 'from-blue-500 to-indigo-500',
    btnPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
    activeDot: 'bg-blue-600',
    bgLight: 'from-blue-50/70',
    borderLight: 'border-blue-200/80',
    textPrimary: 'text-blue-700',
    textBadge: 'text-blue-600',
    bgBadge: 'bg-blue-50',
    borderBadge: 'border-blue-200/70',
    shadowColor: 'shadow-blue-200',
    avatarRing: 'ring-blue-100 shadow-blue-200 from-blue-500 to-indigo-500',
  },
  purple: {
    gradient: 'from-purple-500 to-indigo-500',
    btnPrimary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200',
    activeDot: 'bg-purple-600',
    bgLight: 'from-purple-50/70',
    borderLight: 'border-purple-200/80',
    textPrimary: 'text-purple-700',
    textBadge: 'text-purple-600',
    bgBadge: 'bg-purple-50',
    borderBadge: 'border-purple-200/70',
    shadowColor: 'shadow-purple-200',
    avatarRing: 'ring-purple-100 shadow-purple-200 from-purple-500 to-indigo-500',
  },
};
