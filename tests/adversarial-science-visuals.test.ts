import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  FotosintesisDaurAirIllustration,
  LaboratoriumForensikIllustration,
  SatwaEndemikHutanIllustration,
  TataSuryaAstronomiIllustration,
  ScienceSvgProps,
} from '../src/components/visuals/ScienceSvgIllustrations';
import {
  ULAR_TANGGA_SAINS_DECK,
  POINT_CLICK_LAB_DECK,
  POINT_CLICK_HUTAN_DECK,
  ULAR_TANGGA_TATASURYA_DECK,
  PRESENTASI_EKOSISTEM_HUTAN_DECK,
  SCIENCE_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
} from '../src/data/presentation-decks';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import { GameStageShell } from '../src/components/game-shell/GameStageShell';
import { PRESENTATION_THEMES } from '../src/lib/presentation-themes';
import { PresentationDeckData } from '../src/types/presentation';

/**
 * ADVERSARIAL STRESS TEST HARNESS FOR PRESENTATION ENGINE NAVIGATION
 * Simulates high-frequency and boundary state transitions
 */
class AdversarialNavigationHarness {
  totalSlides: number;
  currentSlide: number;
  isVictoryOpen: boolean = false;
  challengesState: Record<string, boolean> = {};

  constructor(slideCount: number, initialSlide: number = 1) {
    this.totalSlides = Math.max(1, slideCount);
    this.currentSlide = Math.max(1, Math.min(this.totalSlides, Math.floor(initialSlide) || 1));
  }

  goToSlide(slideNum: number) {
    const clamped = Math.max(1, Math.min(this.totalSlides, Math.floor(slideNum) || 1));
    this.currentSlide = clamped;
  }

  handleNextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    } else {
      this.isVictoryOpen = true;
    }
  }

  handlePrevSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  handleResetDeck() {
    this.currentSlide = 1;
    this.challengesState = {};
    this.isVictoryOpen = false;
  }

  recordChallenge(key: string, isSuccess: boolean) {
    this.challengesState[key] = isSuccess;
  }

  switchDeck(newTotalSlides: number) {
    this.totalSlides = Math.max(1, newTotalSlides);
    // Mimics StoryPresentationDeckEngine useEffect:
    this.currentSlide = Math.max(1, Math.min(this.totalSlides, 1));
    this.challengesState = {};
    this.isVictoryOpen = false;
  }
}

describe('Tier 5 Adversarial Hardening: Science Visual SVGs & Presentation Resilience', () => {

  // =========================================================================
  // SUITE 1: SCIENCE SVG VISUAL ILLUSTRATIONS - ADVERSARIAL RENDERING & PROPS
  // =========================================================================
  describe('Suite 1: Science Visual SVG Illustrations Deep Resilience', () => {
    const ALL_SVG_COMPONENTS = [
      { name: 'FotosintesisDaurAirIllustration', comp: FotosintesisDaurAirIllustration },
      { name: 'LaboratoriumForensikIllustration', comp: LaboratoriumForensikIllustration },
      { name: 'SatwaEndemikHutanIllustration', comp: SatwaEndemikHutanIllustration },
      { name: 'TataSuryaAstronomiIllustration', comp: TataSuryaAstronomiIllustration },
    ];

    test('1.1 Zero-props & default props render safely without throwing', () => {
      for (const { name, comp } of ALL_SVG_COMPONENTS) {
        const html = renderToString(React.createElement(comp));
        expect(html).toBeDefined();
        expect(html.length).toBeGreaterThan(500);
        expect(html).toContain('<svg');
        expect(html).toContain('viewBox="0 0 800 500"');
        expect(html).toContain('xmlns="http://www.w3.org/2000/svg"');
        expect(html).toContain('preserveAspectRatio="xMidYMid meet"');
        expect(html).toContain('pointer-events-none');
        expect(html).toContain('select-none');
      }
    });

    test('1.2 Adversarial & extreme dimension props (0, negative, gigantic, strings)', () => {
      const extremeProps: ScienceSvgProps[] = [
        { width: 0, height: 0 },
        { width: -100, height: -200 },
        { width: 99999, height: 88888 },
        { width: 0.0001, height: 0.0001 },
        { width: '100vw', height: '100vh' },
        { width: 'calc(100% - 32px)', height: 'fit-content' },
        { width: '', height: '' },
      ];

      for (const { comp } of ALL_SVG_COMPONENTS) {
        for (const props of extremeProps) {
          expect(() => {
            const html = renderToString(React.createElement(comp, props));
            expect(html).toContain('<svg');
          }).not.toThrow();
        }
      }
    });

    test('1.3 Injection & malformed className props are safely escaped by React DOM', () => {
      const maliciousClasses = [
        '"><script>alert("xss")</script><div class="',
        '"><img src="x" onerror="alert(1)">',
        'undefined null NaN [object Object]',
        '   multiple    irregular    spaces   \n\t   ',
      ];

      for (const { comp } of ALL_SVG_COMPONENTS) {
        for (const badClass of maliciousClasses) {
          const html = renderToString(React.createElement(comp, { className: badClass }));
          // Verify no executable raw script tags are introduced
          expect(html).not.toContain('<script>alert("xss")</script>');
          expect(html).not.toContain('<img src="x" onerror="alert(1)">');
          expect(html).toContain('overflow-hidden');
        }
      }
    });

    test('1.4 FotosintesisDaurAirIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(FotosintesisDaurAirIllustration));

      // Leaf Anatomy & Mesophyll
      expect(html).toContain('EPIDERMIS ATAS');
      expect(html).toContain('STOMATA (PORI DAUN)');
      expect(html).toContain('CO2 Masuk Stomata');
      expect(html).toContain('O2 Dilepas ke Udara');
      expect(html).toContain('translate(-42, -22)'); // Palisade cells translation
      expect(html).toContain('translate(42, -22)');
      expect(html).toContain('id="leafGrad"');

      // Hydrological Cycle (Daur Air)
      expect(html).toContain('ENERGI SURYA');
      expect(html).toContain('KONDENSASI AWAN');
      expect(html).toContain('Evaporasi Air');
      expect(html).toContain('id="riverGrad"');
      expect(html).toContain('id="skyGrad"');
      expect(html).toContain('id="sunGlow"');

      // HUD verification
      expect(html).toContain('DAUR AIR');
      expect(html).toContain('FOTOSINTESIS');
    });

    test('1.5 LaboratoriumForensikIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(LaboratoriumForensikIllustration));

      // Erlenmeyer Flask & Measurement Lines
      expect(html).toContain('id="flaskTeal"');
      expect(html).toMatch(/50(<!-- -->)?\s*ml/);
      expect(html).toMatch(/100(<!-- -->)?\s*ml/);
      expect(html).toMatch(/150(<!-- -->)?\s*ml/);
      expect(html).toMatch(/200(<!-- -->)?\s*ml/);

      // 0-14 pH scale & Litmus
      expect(html).toContain('SKALA DERAJAT pH (0 - 14)');
      expect(html).toContain('0 (Asam)');
      expect(html).toContain('7 (Netral)');
      expect(html).toContain('14 (Basa)');
      expect(html).toContain('id="phScaleGrad"');
      expect(html).toContain('Lakmus biru');
      expect(html).toContain('Lakmus merah');

      // K3 GHS Hazard Badges (All 4 Diamonds)
      expect(html).toContain('SIMBOL BAHAYA K3 LABORATORIUM');
      expect(html).toContain('Korosif');
      expect(html).toContain('Toksik');
      expect(html).toContain('Menyala');
      expect(html).toContain('Reaktif');
      expect(html).toContain('STANDAR KESELAMATAN GHS KEMENDIKBUD');
    });

    test('1.6 SatwaEndemikHutanIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(SatwaEndemikHutanIllustration));

      // 4 Strata Vertical Canopy Layers
      expect(html).toContain('STRATA 4: EMERGEN');
      expect(html).toContain('STRATA 3: KANOPI UTAMA');
      expect(html).toContain('STRATA 2: UNDERSTORY');
      expect(html).toContain('STRATA 1: LANTAI HUTAN');

      // Wallacea Satwa Endemik
      expect(html).toContain('Orangutan Kalimantan (Pongo pygmaeus)');
      expect(html).toContain('Komodo (Varanus komodoensis)');
      expect(html).toContain('WALLACEA EXPEDITION');
      expect(html).toContain('id="jungleNight"');
      expect(html).toContain('id="canopySunbeam"');
    });

    test('1.7 TataSuryaAstronomiIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(TataSuryaAstronomiIllustration));

      // Center Sun & Flare
      expect(html).toContain('MATAHARI');
      expect(html).toContain('id="sunCore"');

      // All 8 Planets in Order
      expect(html).toContain('Merkurius');
      expect(html).toContain('Venus');
      expect(html).toContain('Bumi');
      expect(html).toContain('Mars');
      expect(html).toContain('Jupiter');
      expect(html).toContain('Saturnus');
      expect(html).toContain('Uranus');
      expect(html).toContain('Neptunus');

      // Asteroid Belt (45 particles)
      const greyCircles = html.match(/fill="#94a3b8"/g);
      expect(greyCircles).not.toBeNull();
      expect(greyCircles?.length).toBeGreaterThanOrEqual(45);

      // Eclipse Geometry Sub-panel
      expect(html).toContain('GEOMETRI GERHANA MATAHARI TOTAL');
      expect(html).toContain('Bulan (Penghalang)');
    });
  });

  // =========================================================================
  // SUITE 2: DYNAMIC SLIDE BOUNDARY NAVIGATION (7 & 8 SLIDES)
  // =========================================================================
  describe('Suite 2: Dynamic Slide Length Boundary Navigation & Clamping', () => {
    test('2.1 Real 7-slide decks (ular-tangga-sains, presentasi-ekosistem-hutan, ular-tangga-tatasurya) slide counts', () => {
      const deck7_1 = ULAR_TANGGA_SAINS_DECK;
      const deck7_2 = PRESENTASI_EKOSISTEM_HUTAN_DECK;
      const deck7_3 = ULAR_TANGGA_TATASURYA_DECK;

      expect(deck7_1.slides.length).toBe(7);
      expect(deck7_1.totalSlides).toBe(7);

      expect(deck7_2.slides.length).toBe(7);
      expect(deck7_2.totalSlides).toBe(7);

      expect(deck7_3.slides.length).toBe(7);
      expect(deck7_3.totalSlides).toBe(7);
    });

    test('2.2 Real 8-slide decks (point-click-lab, point-click-hutan) slide counts', () => {
      const deck8_1 = POINT_CLICK_LAB_DECK;
      const deck8_2 = POINT_CLICK_HUTAN_DECK;

      expect(deck8_1.slides.length).toBe(8);
      expect(deck8_1.totalSlides).toBe(8);

      expect(deck8_2.slides.length).toBe(8);
      expect(deck8_2.totalSlides).toBe(8);
    });

    test('2.3 Lower boundary clamping: handlePrevSlide at Slide 1 never goes below 1', () => {
      const harness7 = new AdversarialNavigationHarness(7, 1);
      const harness8 = new AdversarialNavigationHarness(8, 1);

      for (let i = 0; i < 50; i++) {
        harness7.handlePrevSlide();
        expect(harness7.currentSlide).toBe(1);

        harness8.handlePrevSlide();
        expect(harness8.currentSlide).toBe(1);
      }
    });

    test('2.4 Upper boundary clamping: handleNextSlide at final slide triggers victory and never exceeds totalSlides', () => {
      const harness7 = new AdversarialNavigationHarness(7, 7);
      expect(harness7.isVictoryOpen).toBe(false);
      harness7.handleNextSlide();
      expect(harness7.currentSlide).toBe(7);
      expect(harness7.isVictoryOpen).toBe(true);

      // Repeated attempts stay clamped
      for (let i = 0; i < 20; i++) {
        harness7.handleNextSlide();
        expect(harness7.currentSlide).toBe(7);
        expect(harness7.isVictoryOpen).toBe(true);
      }

      const harness8 = new AdversarialNavigationHarness(8, 8);
      expect(harness8.isVictoryOpen).toBe(false);
      harness8.handleNextSlide();
      expect(harness8.currentSlide).toBe(8);
      expect(harness8.isVictoryOpen).toBe(true);

      for (let i = 0; i < 20; i++) {
        harness8.handleNextSlide();
        expect(harness8.currentSlide).toBe(8);
        expect(harness8.isVictoryOpen).toBe(true);
      }
    });

    test('2.5 In-flight deck switching dynamically resets and clamps slide position', () => {
      const harness = new AdversarialNavigationHarness(8, 8);
      expect(harness.currentSlide).toBe(8);

      // Switch to a 7-slide deck
      harness.switchDeck(7);
      expect(harness.totalSlides).toBe(7);
      expect(harness.currentSlide).toBe(1); // Resets safely to slide 1
      expect(harness.isVictoryOpen).toBe(false);

      // Progress to slide 7
      for (let i = 0; i < 6; i++) harness.handleNextSlide();
      expect(harness.currentSlide).toBe(7);

      // Switch to an 8-slide deck
      harness.switchDeck(8);
      expect(harness.totalSlides).toBe(8);
      expect(harness.currentSlide).toBe(1);
    });

    test('2.6 Random walk fuzzing: 5,000 arbitrary jumps maintain strict bounds [1, N]', () => {
      const testDeckSizes = [7, 8];

      for (const size of testDeckSizes) {
        const harness = new AdversarialNavigationHarness(size);

        for (let iter = 0; iter < 2500; iter++) {
          const randOp = iter % 5;
          if (randOp === 0) harness.handleNextSlide();
          else if (randOp === 1) harness.handlePrevSlide();
          else if (randOp === 2) {
            // Adversarial index: negative, zero, float, huge
            const weirdIndex = Math.sin(iter) * 50;
            harness.goToSlide(weirdIndex);
          } else if (randOp === 3) {
            harness.handleResetDeck();
          } else {
            harness.recordChallenge(`c-${iter}`, iter % 2 === 0);
          }

          expect(harness.currentSlide).toBeGreaterThanOrEqual(1);
          expect(harness.currentSlide).toBeLessThanOrEqual(size);
          expect(Number.isInteger(harness.currentSlide)).toBe(true);
        }
      }
    });
  });

  // =========================================================================
  // SUITE 3: PROGRESS BAR CALCULATIONS ACROSS 7-SLIDE & 8-SLIDE DECKS
  // =========================================================================
  describe('Suite 3: Progress Bar Calculations & Indicators (7 vs 8 Slides)', () => {
    test('3.1 Real 7-slide deck renders exactly 7 navigation dots with 1 active dot', () => {
      const deck7 = ULAR_TANGGA_SAINS_DECK;
      const activeDotClass = PRESENTATION_THEMES[deck7.themeColor]?.activeDot || 'bg-orange-600';

      for (let slideNum = 1; slideNum <= 7; slideNum++) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: deck7,
            initialSlide: slideNum,
          })
        );

        // Subtitle must reflect current slide out of 7
        expect(html).toContain(`Slide ${slideNum} dari 7`);

        // Count dot buttons rendered
        const dotButtonMatches = html.match(/title="Buka Slide \d+:/g);
        expect(dotButtonMatches).not.toBeNull();
        expect(dotButtonMatches?.length).toBe(7);

        // Active dot has w-8 class, while inactive dots have w-2.5 class
        const activeMatches = html.match(new RegExp(`w-8 ${activeDotClass}`, 'g'));
        expect(activeMatches).not.toBeNull();
        expect(activeMatches?.length).toBe(1);

        const inactiveMatches = html.match(/w-2\.5 bg-slate-300/g);
        expect(inactiveMatches).not.toBeNull();
        expect(inactiveMatches?.length).toBe(6);
      }
    });

    test('3.2 Real 8-slide deck renders exactly 8 navigation dots with 1 active dot', () => {
      const deck8 = POINT_CLICK_LAB_DECK;
      const activeDotClass = PRESENTATION_THEMES[deck8.themeColor]?.activeDot || 'bg-teal-600';

      for (let slideNum = 1; slideNum <= 8; slideNum++) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: deck8,
            initialSlide: slideNum,
          })
        );

        expect(html).toContain(`Slide ${slideNum} dari 8`);

        const dotButtonMatches = html.match(/title="Buka Slide \d+:/g);
        expect(dotButtonMatches).not.toBeNull();
        expect(dotButtonMatches?.length).toBe(8);

        // Active dot for teal theme has w-8 bg-teal-600
        const activeMatches = html.match(new RegExp(`w-8 ${activeDotClass}`, 'g'));
        expect(activeMatches).not.toBeNull();
        expect(activeMatches?.length).toBe(1);

        const inactiveMatches = html.match(/w-2\.5 bg-slate-300/g);
        expect(inactiveMatches).not.toBeNull();
        expect(inactiveMatches?.length).toBe(7);
      }
    });

    test('3.3 Button state and labels at boundaries (Slide 1 vs Slide N)', () => {
      // At Slide 1 of 7
      const html1 = renderToString(
        React.createElement(StoryPresentationDeckEngine, {
          isOpen: true,
          onClose: () => {},
          deck: ULAR_TANGGA_SAINS_DECK,
          initialSlide: 1,
        })
      );
      expect(html1).toContain('disabled=""'); // Previous button disabled
      expect(html1).toContain('Slide Berikutnya');

      // At Slide 7 of 7
      const html7 = renderToString(
        React.createElement(StoryPresentationDeckEngine, {
          isOpen: true,
          onClose: () => {},
          deck: ULAR_TANGGA_SAINS_DECK,
          initialSlide: 7,
        })
      );
      expect(html7).toContain('Tutup Misi &amp; Rayakan');
    });

    test('3.4 Progress percentage mathematical progression', () => {
      const calculateLinearProgress = (curr: number, total: number) => {
        return Math.round((curr / total) * 100);
      };

      // 7-slide progress steps
      const steps7 = [1, 2, 3, 4, 5, 6, 7].map(s => calculateLinearProgress(s, 7));
      expect(steps7).toEqual([14, 29, 43, 57, 71, 86, 100]);

      // 8-slide progress steps
      const steps8 = [1, 2, 3, 4, 5, 6, 7, 8].map(s => calculateLinearProgress(s, 8));
      expect(steps8).toEqual([13, 25, 38, 50, 63, 75, 88, 100]);
    });
  });

  // =========================================================================
  // SUITE 4: FULLSCREEN & MODAL STATE RESILIENCE
  // =========================================================================
  describe('Suite 4: Fullscreen & Modal State Resilience', () => {
    test('4.1 When isOpen = false, StoryPresentationDeckEngine returns null without DOM leakage', () => {
      const html = renderToString(
        React.createElement(StoryPresentationDeckEngine, {
          isOpen: false,
          onClose: () => {},
          deck: POINT_CLICK_HUTAN_DECK,
        })
      );
      expect(html).toBe('');
    });

    test('4.2 When isOpen = true, renders full fixed viewport shell with z-50 overlay', () => {
      const html = renderToString(
        React.createElement(StoryPresentationDeckEngine, {
          isOpen: true,
          onClose: () => {},
          deck: POINT_CLICK_HUTAN_DECK,
        })
      );

      expect(html).toContain('fixed inset-0 z-50 w-screen h-screen');
      expect(html).toContain('Kembali ke Beranda');
      expect(html).not.toContain('Mode Presentasi Guru');
    });

    test('4.3 GameStageShell provides projector fullscreen toggle button and titles', () => {
      const html = renderToString(
        React.createElement(GameStageShell, {
          isOpen: true,
          onClose: () => {},
          title: 'Uji Layar Penuh Proyektor',
          icon: '🔬',
          themeColor: 'teal',
          children: React.createElement('div', null, 'Konten Uji'),
        })
      );

      expect(html).toContain('Mode Layar Penuh');
      expect(html).toContain('Layar Penuh');
      expect(html).toContain('Tutup Game');
    });

    test('4.4 Audio sound toggle button reflects soundOn state dynamically', () => {
      // Sound ON
      const htmlSoundOn = renderToString(
        React.createElement(GameStageShell, {
          isOpen: true,
          onClose: () => {},
          title: 'Audio Test',
          icon: '🔊',
          soundOn: true,
          onToggleSound: () => {},
          children: null,
        })
      );
      expect(htmlSoundOn).toContain('title="Matikan Suara"');

      // Sound OFF
      const htmlSoundOff = renderToString(
        React.createElement(GameStageShell, {
          isOpen: true,
          onClose: () => {},
          title: 'Audio Test',
          icon: '🔇',
          soundOn: false,
          onToggleSound: () => {},
          children: null,
        })
      );
      expect(htmlSoundOff).toContain('title="Nyalakan Suara"');
    });

    test('4.5 Victory Modal theme fallback handles amber, rose, indigo, blue without crash', () => {
      const customThemes = ['amber', 'rose', 'indigo', 'blue'] as const;

      for (const theme of customThemes) {
        const syntheticDeck: PresentationDeckData = {
          gameId: `theme-test-${theme}`,
          title: `Uji Tema ${theme}`,
          subtitle: 'Pengujian Fallback Warna',
          themeColor: theme,
          mentor: { name: 'Tester', role: 'Tester', avatarEmoji: '🧪' },
          slides: [
            {
              id: 's1',
              type: 'concept-infographic',
              title: 'Slide 1',
              cards: [{ id: 'c1', title: 'Card 1', description: 'Desc 1' }],
            },
          ],
        };

        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: syntheticDeck,
            initialSlide: 1,
          })
        );

        expect(html).toBeDefined();
        expect(html).toContain(`Uji Tema ${theme}`);
      }
    });
  });

  // =========================================================================
  // SUITE 5: ALL 5 SCIENCE DECKS CROSS-VERIFICATION & BATCH PERFORMANCE
  // =========================================================================
  describe('Suite 5: Science Decks Cross-Verification & Stress Benchmark', () => {
    const SCIENCE_GAME_IDS = [
      'ular-tangga-sains',
      'point-click-lab',
      'point-click-hutan',
      'ular-tangga-tatasurya',
      'presentasi-ekosistem-hutan',
    ];

    test('5.1 Every science deck has unique slide IDs across its entire presentation', () => {
      for (const gameId of SCIENCE_GAME_IDS) {
        const deck = getPresentationDeckByGameId(gameId);
        expect(deck).toBeDefined();
        if (!deck) continue;

        const slideIds = deck.slides.map(s => s.id);
        const uniqueIds = new Set(slideIds);
        expect(uniqueIds.size).toBe(deck.slides.length);
      }
    });

    test('5.2 Every science deck has a valid mentor and valid theme', () => {
      for (const gameId of SCIENCE_GAME_IDS) {
        const deck = SCIENCE_PRESENTATION_DECKS[gameId];
        expect(deck).toBeDefined();
        expect(deck.mentor.name.length).toBeGreaterThan(0);
        expect(deck.mentor.role.length).toBeGreaterThan(0);
        expect(deck.mentor.avatarEmoji.length).toBeGreaterThan(0);
        expect(deck.themeColor).toMatch(/^(orange|teal|purple|emerald)$/);
      }
    });

    test('5.3 Batch SSR performance: Rendering 35 slide decks completes in under 500ms', () => {
      const startTime = performance.now();
      let totalBytesRendered = 0;

      for (const gameId of SCIENCE_GAME_IDS) {
        const deck = SCIENCE_PRESENTATION_DECKS[gameId];
        for (let s = 1; s <= deck.slides.length; s++) {
          const html = renderToString(
            React.createElement(StoryPresentationDeckEngine, {
              isOpen: true,
              onClose: () => {},
              deck,
              initialSlide: s,
            })
          );
          totalBytesRendered += html.length;
        }
      }

      const elapsedMs = performance.now() - startTime;
      expect(totalBytesRendered).toBeGreaterThan(100000);
      expect(elapsedMs).toBeLessThan(500); // Strict offline presentation benchmark
    });
  });
});
