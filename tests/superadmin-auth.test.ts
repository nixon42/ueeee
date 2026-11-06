import { describe, test, expect, beforeEach } from 'bun:test';
import fs from 'fs';
import path from 'path';
import { superadminService, SUPERADMIN_EMAIL } from '@/business/services/superadmin.service';
import { GAMES_CATALOG } from '@/data/games-catalog';

describe('Superadmin Authentication & Authorization Security Suite', () => {

  // =========================================================================
  // 1. Environment Configuration & Whitelist Audit
  // =========================================================================
  describe('Environment Variable & Superadmin Email Whitelist', () => {
    test('.env and .env.example contain VITE_SUPERADMIN_EMAIL=faizatia43@gmail.com', () => {
      const envPath = path.resolve(__dirname, '../.env');
      const envExamplePath = path.resolve(__dirname, '../.env.example');

      const envContent = fs.readFileSync(envPath, 'utf-8');
      const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');

      expect(envContent).toContain('VITE_SUPERADMIN_EMAIL=faizatia43@gmail.com');
      expect(envExampleContent).toContain('VITE_SUPERADMIN_EMAIL=faizatia43@gmail.com');
    });

    test('superadminService default email strictly matches faizatia43@gmail.com', () => {
      expect(SUPERADMIN_EMAIL).toBe('faizatia43@gmail.com');
      expect(superadminService.getSuperadminEmail()).toBe('faizatia43@gmail.com');
    });
  });

  // =========================================================================
  // 2. Strict Access Control Gating (Whitelist Only)
  // =========================================================================
  describe('Strict Email Whitelist Authorization', () => {
    test('strictly accepts faizatia43@gmail.com and handles case/whitespace insensitivity', () => {
      expect(superadminService.isAuthorizedSuperadmin('faizatia43@gmail.com')).toBe(true);
      expect(superadminService.isAuthorizedSuperadmin('FAIZATIA43@GMAIL.COM')).toBe(true);
      expect(superadminService.isAuthorizedSuperadmin('  faizatia43@gmail.com  ')).toBe(true);
      expect(superadminService.isAuthorizedSuperadmin('FaizAtia43@Gmail.Com')).toBe(true);
    });

    test('strictly rejects ANY other email address without exception', () => {
      // Different usernames
      expect(superadminService.isAuthorizedSuperadmin('admin@gmail.com')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('guru@sekolah.sch.id')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('faizatia4343@gmail.com')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('faiz@gmail.com')).toBe(false);

      // Different domains
      expect(superadminService.isAuthorizedSuperadmin('faizatia43@yahoo.com')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('faizatia43@outlook.com')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('faizatia43@ueeee.my.id')).toBe(false);

      // Malicious or empty inputs
      expect(superadminService.isAuthorizedSuperadmin('')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin(null)).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin(undefined)).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('   ')).toBe(false);
      expect(superadminService.isAuthorizedSuperadmin('faizatia43@gmail.com<script>')).toBe(false);
    });
  });

  // =========================================================================
  // 3. User Evaluation & Session Rejection
  // =========================================================================
  describe('User Evaluation & Immediate Session Revocation', () => {
    beforeEach(async () => {
      await superadminService.signOut();
      superadminService.clearError();
    });

    test('evaluates authorized superadmin user and grants full superadmin status', () => {
      (superadminService as any).evaluateUser({
        id: 'user_faiz_1',
        email: 'faizatia43@gmail.com',
        user_metadata: {
          full_name: 'Faiz Atia',
          avatar_url: 'https://lh3.googleusercontent.com/avatar/123',
        },
      });

      const state = superadminService.getState();
      expect(state.isSuperadmin).toBe(true);
      expect(state.user).not.toBeNull();
      expect(state.user?.email).toBe('faizatia43@gmail.com');
      expect(state.user?.name).toBe('Faiz Atia');
      expect(state.user?.avatarUrl).toBe('https://lh3.googleusercontent.com/avatar/123');
      expect(state.error).toBeNull();
    });

    test('evaluates unauthorized email, denies access, sets error and revokes privileges', () => {
      (superadminService as any).evaluateUser({
        id: 'intruder_99',
        email: 'someone_else@gmail.com',
        user_metadata: {
          full_name: 'Imposter',
        },
      });

      const state = superadminService.getState();
      expect(state.isSuperadmin).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toContain('Akses ditolak');
      expect(state.error).toContain('someone_else@gmail.com');
    });

    test('evaluates user with empty or missing email, denies immediately', () => {
      (superadminService as any).evaluateUser({
        id: 'anon_user',
        email: undefined,
      });

      const state = superadminService.getState();
      expect(state.isSuperadmin).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toContain('Akses ditolak');
    });

    test('signOut cleanly resets superadmin state back to anonymous guest', async () => {
      // First authorize
      (superadminService as any).evaluateUser({
        id: 'user_faiz_1',
        email: 'faizatia43@gmail.com',
      });
      expect(superadminService.getState().isSuperadmin).toBe(true);

      // Now sign out
      await superadminService.signOut();
      const afterState = superadminService.getState();
      expect(afterState.isSuperadmin).toBe(false);
      expect(afterState.user).toBeNull();
    });
  });

  // =========================================================================
  // 4. Dashboard View Invariance Guarantee
  // =========================================================================
  describe('Dashboard View Invariance (No Separate Dashboard Screen)', () => {
    test('GAMES_CATALOG provides all 10 learning materials equally in guest and superadmin mode', () => {
      // Requirement: "setelah login tampiln masih sama dashboard list semua mater (ga ada tampilan baru)"
      expect(GAMES_CATALOG.length).toBe(10);
      const allIds = GAMES_CATALOG.map(g => g.id);

      // Confirm all 10 flagship materials are preserved
      expect(allIds).toContain('ular-tangga-sains');
      expect(allIds).toContain('point-click-lab');
      expect(allIds).toContain('point-click-hutan');
      expect(allIds).toContain('ular-tangga-tatasurya');
      expect(allIds).toContain('presentasi-ekosistem-hutan');
      expect(allIds).toContain('ular-tangga-matematika');
      expect(allIds).toContain('point-click-candi');
      expect(allIds).toContain('ular-tangga-sejarah');
      expect(allIds).toContain('teka-teki-kata');
      expect(allIds).toContain('catur-taktik-logika');
    });
  });
});
