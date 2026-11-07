# Project: ueeee Educational Games Refinement

## Architecture
The ueeee educational games platform is being refined from standalone disparate minigames and fixed prototype presentations into a unified, production-ready, story-driven interactive presentation slide deck platform aligned with researched Indonesian K-12 curriculum (Kurikulum Merdeka CP Fase B, C, and D).

### Core Architecture Components
1. **Dynamic Story Presentation Engine (`src/components/canva-games/`)**:
   - `StoryPresentationDeckEngine.tsx` (generalizing and powering `InteractiveStoryPresentationModal.tsx`):
     - Renders flexible slide sequences per game (5 to 8 slides, completely dynamic, not locked to 6).
     - Renders responsive slide progression indicators (dots, slide numbers, topic badges).
     - Provides standard presentation navigation controls (Prev, Next, Fullscreen, Mute/Sound toggle, Exit).
     - Automatically fires celebration modal (`GameVictoryModal`) and real-world story resolution upon reaching the end.
2. **Interactive Mini-Game Engines (Embedded Slide Components)**:
   - Replaces dry multiple-choice modals (`GameQuizModal` popups) with authentic interactive mechanics:
     - `CanvaSequenceGame.tsx`: Drag/touch-to-swap card ordering with visual feedback and sound effects.
     - `CanvaMatchPairsGame.tsx`: Dual-column connection engine with dynamic SVG rubber-band connection lines.
     - `InteractiveFlashcards.tsx`: 3D CSS flip-cards for active recall and deep conceptual reflection.
     - `InteractiveBoardStepGame.tsx`: Narrative stepping tiles with contextual event progression.
     - `TacticalLogicChessGame.tsx`: Interactive vector chess tactic challenges with instant pedagogical evaluation.
3. **Researched Curriculum Presentation Decks (`src/data/presentation-decks/`)**:
   - Factual Indonesian K-12 curriculum content, mentor character opening narrative hooks, bite-sized visual infographic concepts (with teacher speaker notes), embedded mini-games, tangible story resolutions, and 3 HOTS teacher discussion sparkers for all 10 games in `GAMES_CATALOG`.
4. **Custom Inline SVG Graphics System (`src/components/dashboard/GameIllustration.tsx` & domain SVG components)**:
   - High-contrast, scalable, zero-dependency inline SVGs preventing monotonous layouts and ensuring 100% offline projector clarity.
5. **Catalog & App Launch Integration (`src/data/games-catalog.ts`, `src/App.tsx`)**:
   - Direct launch of story presentation decks from the game catalog cards and deep-link routing (`?game=<gameId>`).

---

## Feature Inventory
Every feature identified during Survey phase is assigned to a specific milestone.

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Presentation Types & Schema | Define `PresentationDeckData`, `SlideDefinition` discriminated unions for dynamic slide counts (5-8 slides) | M1 | survey_1, survey_3 |
| 2 | Dynamic Slide Engine | Generalize presentation runner to support variable slide count and multiple slide templates | M1 | survey_1, spec |
| 3 | Embedded Mini-Game: Sequence Ordering | Refactor `CanvaSequenceGame` for multi-deck integration with touch/drag support | M1 | survey_1, survey_3 |
| 4 | Embedded Mini-Game: Match Pairs | Refactor `CanvaMatchPairsGame` with dynamic SVG connector lines and responsive re-centering | M1 | survey_1, survey_3 |
| 5 | Embedded Mini-Game: 3D Flashcards | Implement 3D flip-card component for active recall and concept verification | M1 | survey_2, spec |
| 6 | Embedded Mini-Game: Board & Tactical Logic | Implement embedded board stepping & tactical puzzle mechanics replacing dry popups | M1 | survey_1, survey_2, survey_3 |
| 7 | Science Deck 1: `ular-tangga-sains` | Fotosintesis & Daur Hidrologi deck (7 slides, Kak Galih, Sequence & Match Pairs) | M2 | survey_2 |
| 8 | Science Deck 2: `point-click-lab` | Lab Forensik K3 & Asam Basa pH deck (8 slides, Dr. Maya, Match Pairs & 3D Flashcards) | M2 | survey_2 |
| 9 | Science Deck 3: `point-click-hutan` | Satwa Endemik & Garis Wallace deck (8 slides, Ranger Banyu, Match Pairs & Sequence) | M2 | survey_2 |
| 10 | Science Deck 4: `ular-tangga-tatasurya` | Orbit 8 Planet & Gravitasi deck (7 slides, Kapten Dirgantara, Sequence & Match Pairs) | M2 | survey_2 |
| 11 | Science Deck 5: `presentasi-ekosistem-hutan` | Tingkat Trofik & Aliran Energi deck refresh (7 slides, Prof. Maya, Sequence & Match Pairs) | M2 | survey_1, survey_2 |
| 12 | Science Visual SVGs | Distinct custom inline SVGs for Science & Lab concepts (chloroplast, glassware, orbits) | M2 | survey_3 |
| 13 | Humanities Deck 1: `ular-tangga-matematika` | Pecahan, Desimal & Geometri Bangun Datar deck (7 slides, Kak Arya, Match & Sequence) | M3 | survey_2 |
| 14 | Humanities Deck 2: `point-click-candi` | Borobudur, Perahu Cadik & Kosmologi deck (8 slides, Paman Dewa, Sequence & Match) | M3 | survey_2 |
| 15 | Humanities Deck 3: `teka-teki-kata` | PUEBI/EYD & Kosakata Ilmiah deck (7 slides, Cendekiawan Kata, Word & Match) | M3 | survey_2 |
| 16 | Humanities Deck 4: `ular-tangga-sejarah` | Linimasa 1945 & Rengasdengklok deck (8 slides, Ibu Pertiwi, Sequence & Match) | M3 | survey_2 |
| 17 | Humanities Deck 5: `catur-taktik-logika` | Taktik Catur & Penalaran Komputasional deck (7 slides, GM Cilik, Tactical Logic & Steps) | M3 | survey_2 |
| 18 | Humanities & Math Visual SVGs | Distinct custom inline SVGs for Math/History/Logic (nets, stupa, flag, chessboard) | M3 | survey_3 |
| 19 | Games Catalog Integration | Update `GAMES_CATALOG` metadata to register presentation decks and subject details | M4 | survey_1 |
| 20 | App Launch Wiring & Routing | Update `App.tsx` `launchGame` to seamlessly launch story presentation decks for all 10 games | M4 | survey_1 |
| 21 | Dry Quiz Modal Deprecation | Replace all instances of `GameQuizModal` multiple-choice popups inside presentation flows | M4 | survey_1, spec |
| 22 | Audio & Theme Polishing | Verify Web Audio synthesizer cues, responsive layouts, and zero visual monotony | M4 | survey_3 |
| 23 | E2E Testing Infrastructure | Opaque-box E2E test suite covering Tiers 1-4 across all 10 games and curriculum decks | E2E Track | spec |
| 24 | Final E2E Pass (Tiers 1-4) | Achieve 100% passing tests for all test tiers | M5 | spec |
| 25 | Adversarial Hardening (Tier 5) | Challenger-driven adversarial coverage and edge case verification | M5 | spec |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Core Presentation Engine & Reusable Mini-Games | `src/types/presentation.ts`, `StoryPresentationDeckEngine.tsx`, mini-game components (`CanvaSequenceGame`, `CanvaMatchPairsGame`, `InteractiveFlashcards`, interactive puzzle mechanics) | none | DONE |
| M2 | Science & Lab Curriculum Decks (SD/SMP IPA) | Researched decks & custom inline SVGs for `ular-tangga-sains`, `point-click-lab`, `point-click-hutan`, `ular-tangga-tatasurya`, `presentasi-ekosistem-hutan` | M1 | DONE |
| M3 | Math, History, Language & Logic Decks | Researched decks & custom inline SVGs for `ular-tangga-matematika`, `point-click-candi`, `teka-teki-kata`, `ular-tangga-sejarah`, `catur-taktik-logika` | M1 | IN_PROGRESS |
| M4 | Catalog Integration & App Launch Wiring | Wire all 10 decks into `GAMES_CATALOG` and `App.tsx`, deprecate dry quiz popups, polish sound & themes | M2, M3 | PLANNED |
| M5 | Final E2E Test Suite Pass (Tiers 1-4) & Adversarial Hardening (Tier 5) | Pass 100% of E2E tests published in `TEST_READY.md`, execute Tier 5 adversarial hardening | M4, E2E Track | PLANNED |
| E2E | E2E Testing Track (Parallel) | Design requirement-driven opaque-box test runner & suites (Tiers 1-4) covering all 10 games, dynamic slide counts, and mini-game interactivity | none | DONE |

---

## Interface Contracts

### Presentation Engine ↔ Deck Data
- **File**: `src/types/presentation.ts`
- **Exported Types**:
  ```typescript
  export type SlideType = 
    | 'narrative-intro'
    | 'concept-infographic'
    | 'mini-game-sequence'
    | 'mini-game-match'
    | 'mini-game-flashcard'
    | 'mini-game-board'
    | 'mini-game-chess'
    | 'mini-game-word'
    | 'story-resolution'
    | 'reflection-spark';

  export interface PresentationDeckData {
    gameId: string;
    title: string;
    subtitle: string;
    themeColor: string;
    mentor: {
      name: string;
      role: string;
      avatarEmoji: string;
      avatarSvg?: string;
    };
    totalSlides: number; // dynamically computed from slides.length
    slides: SlideDefinition[];
  }
  ```

### Deck Registry ↔ App Launch
- **File**: `src/data/presentation-decks/index.ts`
- **Signature**:
  ```typescript
  export function getPresentationDeckByGameId(gameId: string): PresentationDeckData | undefined;
  export const ALL_PRESENTATION_DECKS: Record<string, PresentationDeckData>;
  ```

---

## Code Layout
- `src/types/presentation.ts`: Type definitions for story decks, slide union types, and mini-game props.
- `src/components/canva-games/StoryPresentationDeckEngine.tsx`: Generalized, dynamic slide deck engine.
- `src/components/canva-games/CanvaSequenceGame.tsx`: Reusable sequence ordering component.
- `src/components/canva-games/CanvaMatchPairsGame.tsx`: Reusable dual-column matching component with dynamic SVG lines.
- `src/components/canva-games/InteractiveFlashcards.tsx`: Reusable 3D active-recall flip cards.
- `src/data/presentation-decks/`:
  - `science-decks.ts`: Decks for science, lab, ecology, astronomy.
  - `humanities-decks.ts`: Decks for math, history, language, chess/logic.
  - `index.ts`: Unified deck registry and lookup functions.
- `src/components/dashboard/GameIllustration.tsx`: Custom inline SVGs for game cards and slide visuals.
- `src/data/games-catalog.ts`: Catalog metadata linking all 10 games to their presentation decks.
- `src/App.tsx`: Main routing and modal launch coordinator.
- `tests/e2e/`: Opaque-box E2E test suites (Tiers 1-4).
