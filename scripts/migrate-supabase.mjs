// Script to execute Supabase database schema migrations via Management API
const SUPABASE_PAT = process.env.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_PAT || '';
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || '';

const migrationSql = `
-- Enable pgcrypto if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Game Sessions & Progress Table
CREATE TABLE IF NOT EXISTS public.game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    game_id TEXT NOT NULL,
    current_slide INT DEFAULT 1,
    total_slides INT DEFAULT 7,
    completed BOOLEAN DEFAULT false,
    challenges_completed JSONB DEFAULT '[]'::jsonb,
    score INT DEFAULT 0,
    play_time_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_game_sessions_session_game ON public.game_sessions(session_id, game_id);

-- 2. User Favorites Table
CREATE TABLE IF NOT EXISTS public.user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    game_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT uq_session_game UNIQUE(session_id, game_id)
);

CREATE INDEX IF NOT EXISTS idx_user_favorites_session ON public.user_favorites(session_id);

-- 3. Game Catalog Global Statistics
CREATE TABLE IF NOT EXISTS public.game_stats (
    game_id TEXT PRIMARY KEY,
    play_count BIGINT DEFAULT 100,
    completion_count BIGINT DEFAULT 80,
    average_rating NUMERIC(3, 2) DEFAULT 4.90,
    total_play_time BIGINT DEFAULT 6000,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Teacher Notes & Classroom Reflections
CREATE TABLE IF NOT EXISTS public.teacher_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    game_id TEXT NOT NULL,
    slide_index INT DEFAULT 1,
    topic TEXT,
    reflection_notes TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_teacher_notes_session ON public.teacher_notes(session_id);

-- Enable RLS on all public tables
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_notes ENABLE ROW LEVEL SECURITY;

-- Permissive RLS policies for anonymous & authenticated guest access
DROP POLICY IF EXISTS "Allow public read for game_stats" ON public.game_stats;
CREATE POLICY "Allow public read for game_stats" ON public.game_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public update for game_stats" ON public.game_stats;
CREATE POLICY "Allow public update for game_stats" ON public.game_stats FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for game_sessions" ON public.game_sessions;
CREATE POLICY "Allow all for game_sessions" ON public.game_sessions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for user_favorites" ON public.user_favorites;
CREATE POLICY "Allow all for user_favorites" ON public.user_favorites FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for teacher_notes" ON public.teacher_notes;
CREATE POLICY "Allow all for teacher_notes" ON public.teacher_notes FOR ALL USING (true) WITH CHECK (true);

-- Seed initial game stats for all 10 games in catalogue
INSERT INTO public.game_stats (game_id, play_count, completion_count, average_rating)
VALUES
  ('ular-tangga-sains', 2480, 2190, 4.90),
  ('point-click-lab', 1820, 1610, 4.88),
  ('ular-tangga-matematika', 2150, 1940, 4.92),
  ('point-click-candi', 1670, 1480, 4.85),
  ('point-click-hutan', 1980, 1750, 4.89),
  ('ular-tangga-tatasurya', 2310, 2060, 4.93),
  ('teka-teki-kata', 1540, 1370, 4.82),
  ('ular-tangga-sejarah', 1890, 1690, 4.87),
  ('catur-taktik-logika', 2240, 1980, 4.95),
  ('presentasi-ekosistem-hutan', 3120, 2890, 4.98)
ON CONFLICT (game_id) DO NOTHING;

-- Atomic RPC function to record game play and increment stats
CREATE OR REPLACE FUNCTION public.record_game_play(p_game_id TEXT, p_completed BOOLEAN, p_duration INT)
RETURNS public.game_stats AS $$
DECLARE
    v_stat public.game_stats;
BEGIN
    INSERT INTO public.game_stats (game_id, play_count, completion_count, total_play_time, updated_at)
    VALUES (
        p_game_id,
        1,
        CASE WHEN p_completed THEN 1 ELSE 0 END,
        p_duration,
        now()
    )
    ON CONFLICT (game_id) DO UPDATE SET
        play_count = public.game_stats.play_count + 1,
        completion_count = public.game_stats.completion_count + (CASE WHEN p_completed THEN 1 ELSE 0 END),
        total_play_time = public.game_stats.total_play_time + p_duration,
        updated_at = now()
    RETURNING * INTO v_stat;
    
    RETURN v_stat;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

async function main() {
  console.log('Applying Supabase schema migrations via Management API...');
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_PAT}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: migrationSql })
  });

  const body = await res.json();
  if (!res.ok) {
    console.error('Migration failed:', body);
    process.exit(1);
  }
  console.log('Migration succeeded!', body);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
