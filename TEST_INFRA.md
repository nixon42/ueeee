# Test Infrastructure: Opaque-Box E2E Testing Architecture for ueeee Educational Platform

## 1. Testing Philosophy
The `ueeee` testing framework adheres strictly to **Opaque-Box, Requirement-Driven Testing**. Rather than evaluating internal component state or private helper functions, the test suite interacts solely with public interface contracts, catalog definitions, pedagogical requirements, and simulated user/student journeys.

Key Principles:
1. **Public Contract Verification**: All assertions validate publicly accessible entities (`GAMES_CATALOG`, `PresentationDeckData`, `SlideDefinition`, slide event transitions, and mini-game completion payloads).
2. **Pedagogical Integrity**: Tests verify that each educational game delivers factual Indonesian K-12 curriculum (Kurikulum Merdeka CP Fase B, C, and D), appropriate mentors, and structured narrative arcs.
3. **Dynamic Architecture**: Ensures slide counts are dynamic and flexible (5 to 8 slides) according to curriculum depth, eliminating hardcoded 6-slide constraints.
4. **Anti-Facading & Independence**: Tests run real simulation logic (e.g. sequence reordering algorithms, pair connection validators, boundary clamps, and state machines) without mock facades.

---

## 2. Feature Inventory Mapping (All 10 Games)

| # | Game ID | Subject & Domain | Target Level | Mentor Persona | Slide Count | Embedded Mini-Games | Core Pedagogical Focus |
|---|---------|------------------|--------------|----------------|-------------|---------------------|------------------------|
| 1 | `ular-tangga-sains` | Sains / IPA | SD Kelas 4-5 (Fase B/C) | Kak Galih (Penjelajah Rimba) | 7 Slides | Sequence (Hidrologi) & Match Pairs (Transformasi Energi) | Daur air alami, evaporasi hingga infiltrasi, dan fotosintesis klorofil |
| 2 | `point-click-lab` | Sains / Kimia & Fisika | SMP Kelas 7 (Fase D) | Dr. Maya Arisandi, M.Sc. | 8 Slides | Match Pairs (Simbol K3), Sequence (Metode Ilmiah), Flashcards (Uji Lakmus) | Protokol K3 lab, mikroskop, titrasi netralisasi, skala pH asam basa |
| 3 | `ular-tangga-matematika` | Matematika | SD Kelas 4-6 (Fase B/C) | Kak Arya (Arsitek Angka) | 7 Slides | Match Pairs (Pecahan Senilai), Sequence (Urutan Balok Fraksi) | Pecahan senilai, desimal, persentase, serta keliling & luas bangun datar |
| 4 | `point-click-candi` | Sejarah / Budaya | SMP Kelas 7-8 (Fase D) | Paman Dewa (Ki Hajar Dewa) | 8 Slides | Sequence (Strata Kosmologi), Match Pairs (Relief Maritim), Flashcards (Dinasti) | Kosmologi Borobudur (Kamadhatu-Arupadhatu), relief kapal cadik, teknologi andesit |
| 5 | `point-click-hutan` | Biologi / Konservasi | SD 4-6 & SMP 7 (Fase B/C/D) | Ranger Banyu (Jagawana Rimba) | 8 Slides | Match Pairs (Fauna Wallacea), Sequence (Strata Hutan), Flashcards (Adaptasi Satwa) | Garis biogeografi Wallace/Weber, 4 strata vertikal kanopi, satwa endemik |
| 6 | `ular-tangga-tatasurya` | Astronomi & Fisika | SD Kelas 6 & SMP 7 (Fase C/D) | Kapten Dirgantara (Astro-Komandan) | 8 Slides | Sequence (8 Planet Surya), Match Pairs (Karakter Benda Langit), Sequence (Gerhana) | 8 planet terestrial & jovian, gravitasi orbit, revolusi/rotasi, gerhana matahari |
| 7 | `teka-teki-kata` | Bahasa & Literasi | SD 5-6 & SMP 7-9 (Fase C/D) | Ibu Kartika (Pengampu Sastra) | 7 Slides | Match Pairs (Kata Baku KBBI), Sequence (Larik Bait Pantun) | Kaidah EYD Edisi V, kosakata serapan baku KBBI, rima sampiran-isi pantun |
| 8 | `ular-tangga-sejarah` | Sejarah Kemerdekaan | SD 5-6 & SMP 7-9 (Fase C/D) | Kak Satria (Pandu Perjuangan) | 8 Slides | Sequence (Linimasa Proklamasi), Match Pairs (Tokoh Nasional), Flashcards (Teks Klad) | Kronologi Agustus 1945, Rengasdengklok, peran Sayuti Melik, Fatmawati, Sukarni |
| 9 | `catur-taktik-logika` | Logika & Komputasional | SD 4-6 & SMP 7-9 (Fase B/C/D) | Master Utut (Pelatih Catur) | 7 Slides | Match Pairs (Motif Taktis), Sequence (Algoritma Eksekusi Skakmat) | Berpikir komputasional, dekomposisi celah, motif garpu, kuncian, skakmat koridor |
| 10 | `presentasi-ekosistem-hutan` | Sains / Ekologi Tropis | SD Kelas 4-6 (Fase B/C) | Prof. Maya Arisandi | 7 Slides | Sequence (Aliran Energi Fotosintesis), Match Pairs (Tingkat Trofik Rantai Makanan) | Tiga tingkat trofik (produsen, konsumen, dekomposer), transfer energi, siklus hara |

---

## 3. Four-Tier E2E Testing Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   UEEEE 4-TIER E2E TEST ARCHITECTURE                     │
├──────────────────────────────────────────────────────────────────────────┤
│ TIER 1: FEATURE & CURRICULUM COVERAGE                                    │
│   • Curriculum presence & subject depth across all 10 games              │
│   • Dedicated mentor character persona & opening dilemma                 │
│   • Dynamic slide definitions (slides > 0)                               │
│   • Structured 5-phase narrative arc                                     │
│   • Integrated mini-games replacing dry quiz modals                      │
├──────────────────────────────────────────────────────────────────────────┤
│ TIER 2: BOUNDARY & CORNER CASES                                          │
│   • Slide navigation lower bound: clamps at slide 1 (no negative index)  │
│   • Slide navigation upper bound: clamps at totalSlides                  │
│   • Variable slide counts: validates decks are NOT locked to 6           │
│   • Reshuffle & reset state preservation (card integrity)                │
│   • Non-crashing input handling (empty strings, rapid clicks, mismatch)  │
├──────────────────────────────────────────────────────────────────────────┤
│ TIER 3: CROSS-FEATURE INTERACTIONS                                       │
│   • Catalog-to-Presentation launch contract and parameter wiring         │
│   • Mini-game event verification: Sequence & Match Pairs completion flow │
│   • Progression gating: Transition to Story Resolution & Reflection      │
│   • Completion celebration trigger (GameVictoryModal contract)           │
├──────────────────────────────────────────────────────────────────────────┤
│ TIER 4: REAL-WORLD CLASSROOM APPLICATION SCENARIOS                       │
│   • Multi-slide interactive simulation for Science / IPA                 │
│   • Multi-slide interactive simulation for Mathematics / Geometri        │
│   • Multi-slide interactive simulation for History / Sejarah Nusantara   │
│   • Multi-slide interactive simulation for Language & Computational Logic│
│   • 3 HOTS discussion sparkers verified for classroom dialogue           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Tier 1: Feature Coverage (`tests/e2e/tier1-catalog-curriculum.test.ts`)
- Validates that all 10 games in `GAMES_CATALOG` contain verified Indonesian K-12 curriculum alignment.
- Confirms each game has a defined subject, category, learning goals, rules, and story prolog.
- Asserts the existence of dedicated mentor identities (e.g. Kak Galih, Dr. Maya, Kak Arya, Paman Dewa, Ranger Banyu, Kapten Dirgantara, Ibu Kartika, Kak Satria, Master Utut).
- Validates the 5-phase story presentation structure:
  1. Opening Mentor Hook (`narrative-intro`)
  2. Bite-sized Concepts (`concept-infographic`)
  3. Interactive Mini-Game (`mini-game-*`)
  4. Story Resolution (`story-resolution`)
  5. Teacher Reflection (`reflection-spark`)

### Tier 2: Boundary & Corner Cases (`tests/e2e/tier2-boundary-dynamicslides.test.ts`)
- **Boundary Clamping**:
  - `goToSlide(0)` or `goToSlide(-5)` clamps strictly to `1`.
  - `goToSlide(999)` clamps strictly to `totalSlides`.
  - Back navigation on slide 1 remains on slide 1.
  - Forward navigation on slide `totalSlides` opens victory state rather than crashing.
- **Dynamic Slide Counts**:
  - Confirms dynamic slide counts across the platform: games feature 7 or 8 slides based on topic depth.
  - Formally asserts that the legacy hardcoded 6-slide restriction is eliminated.
- **State Integrity on Reshuffle/Reset**:
  - Shuffling sequence items preserves length, unique item IDs, and does not lose data.
  - Match pairs reset clears active lines without corrupting pair definitions.

### Tier 3: Cross-Feature Interactions (`tests/e2e/tier3-interactive-minigames.test.ts`)
- **Catalog-to-Presentation Launch**:
  - Verifies that any catalog game card can invoke the story deck modal with correct game parameters.
- **Mini-Game State Completion**:
  - Sequence Ordering: When cards are arranged in order $[1..N]$, `isComplete` evaluates to `true`.
  - Match Pairs: When all $N$ pairs are connected $A_i \leftrightarrow B_i$, `isComplete` evaluates to `true`.
  - Partial or incorrect arrangements fail cleanly without throwing exceptions.
- **Story Resolution & Reflection Handoff**:
  - Transition from interactive gameplay to narrative resolution displays the student's real-world impact.
  - Reflection slide contains 3 HOTS questions and triggers `GameVictoryModal`.

### Tier 4: Real-World Classroom Application Scenarios (`tests/e2e/tier4-classroom-scenarios.test.ts`)
- Simulates complete classroom journeys across all 4 core curriculum areas:
  1. **Science Journey**: Student opens `ular-tangga-sains`, engages with Kak Galih, examines the water cycle, solves the sequence challenge, and restores water to Lembah Cendrawasih.
  2. **Mathematics Journey**: Student launches `ular-tangga-matematika`, engages with Kak Arya, masters fraction equivalences ($1/2 = 0.50$), solves fraction sequencing, and bridges the gorge.
  3. **History Journey**: Student launches `point-click-candi` & `ular-tangga-sejarah`, explores Borobudur's three realms, sequences the 1945 proclamation timeline, and raises the Sang Saka Merah Putih.
  4. **Language & Logic Journey**: Student launches `teka-teki-kata` & `catur-taktik-logika`, pairs formal KBBI vocabulary, sequences a 4-line traditional pantun, calculates chess tactical motifs, and earns the gold trophy.

---

## 4. Test Execution & Verification

### Running the Test Suite
All E2E test suites are executable via `bun test`:
```bash
# Run all E2E test suites
bun test tests/e2e/

# Run individual tiers
bun test tests/e2e/tier1-catalog-curriculum.test.ts
bun test tests/e2e/tier2-boundary-dynamicslides.test.ts
bun test tests/e2e/tier3-interactive-minigames.test.ts
bun test tests/e2e/tier4-classroom-scenarios.test.ts
```

### Verification Criteria
- 100% of test assertions pass.
- Zero reliance on mock facades or hardcoded always-pass stubs.
- Clean execution across Linux and all CI environments.
