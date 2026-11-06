import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  GeometriPecahanIllustration,
  BorobudurKosmologiIllustration,
  Proklamasi1945Illustration,
  CaturTaktikLogikaIllustration,
  HumanitiesSvgProps,
} from '../src/components/visuals/HumanitiesSvgIllustrations';
import {
  ULAR_TANGGA_MATEMATIKA_DECK,
  POINT_CLICK_CANDI_DECK,
  TEKA_TEKI_KATA_DECK,
  ULAR_TANGGA_SEJARAH_DECK,
  CATUR_TAKTIK_LOGIKA_DECK,
  HUMANITIES_PRESENTATION_DECKS,
  ALL_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
  FRACTION_DECIMAL_PAIRS,
  FRACTION_BLOCKS_SEQUENCE,
  CANDI_STRATA_SEQUENCE,
  BOROBUDUR_RELIEF_PAIRS,
  BOROBUDUR_FLASHCARDS,
  KBBI_BAKU_PAIRS,
  PANTUN_NASEHAT_SEQUENCE,
  PROKLAMASI_1945_SEQUENCE,
  PAHLAWAN_KEMERDEKAAN_PAIRS,
  PROKLAMASI_FLASHCARDS,
  CHESS_TACTIC_PAIRS,
  CHESS_CHECKMATE_SEQUENCE,
} from '../src/data/presentation-decks';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import { StoryResolutionSlide } from '../src/components/canva-games/slides/StoryResolutionSlide';
import { PRESENTATION_THEMES } from '../src/lib/presentation-themes';
import { PresentationDeckData } from '../src/types/presentation';

/**
 * ADVERSARIAL STRESS TEST HARNESS FOR PRESENTATION DECK NAVIGATION
 * Simulates high-frequency and extreme boundary state transitions
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
    const parsed = Math.floor(slideNum);
    const safeSlide = Number.isFinite(parsed) ? parsed : 1;
    const clamped = Math.max(1, Math.min(this.totalSlides, safeSlide));
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
    this.currentSlide = Math.max(1, Math.min(this.totalSlides, 1));
    this.challengesState = {};
    this.isVictoryOpen = false;
  }
}

describe('Adversarial Verification: Humanities Visual SVGs & Deck Navigation Resilience', () => {

  // =========================================================================
  // SUITE 1: HUMANITIES SVG VISUAL ILLUSTRATIONS - ADVERSARIAL SSR RENDERING
  // =========================================================================
  describe('Suite 1: Humanities SVG Visual Illustrations Deep Resilience', () => {
    const ALL_HUMANITIES_SVG_COMPONENTS = [
      { name: 'GeometriPecahanIllustration', comp: GeometriPecahanIllustration },
      { name: 'BorobudurKosmologiIllustration', comp: BorobudurKosmologiIllustration },
      { name: 'Proklamasi1945Illustration', comp: Proklamasi1945Illustration },
      { name: 'CaturTaktikLogikaIllustration', comp: CaturTaktikLogikaIllustration },
    ];

    test('1.1 Zero-props & default props render safely without throwing', () => {
      for (const { name, comp } of ALL_HUMANITIES_SVG_COMPONENTS) {
        const html = renderToString(React.createElement(comp));
        expect(html).toBeDefined();
        expect(html.length).toBeGreaterThan(500);
        expect(html).toContain('<svg');
        expect(html).toContain('viewBox="0 0 800 500"');
        expect(html).toContain('xmlns="http://www.w3.org/2000/svg"');
        expect(html).toContain('preserveAspectRatio="xMidYMid meet"');
        expect(html).toContain('pointer-events-none');
        expect(html).toContain('select-none');
        expect(html).toContain('relative overflow-hidden');
      }
    });

    test('1.2 Adversarial & extreme dimension props (0, negative, gigantic, strings, CSS functions)', () => {
      const extremeProps: HumanitiesSvgProps[] = [
        { width: 0, height: 0 },
        { width: -100, height: -200 },
        { width: -1, height: -1 },
        { width: 999999, height: 888888 },
        { width: 0.0001, height: 0.0001 },
        { width: '100vw', height: '100vh' },
        { width: 'calc(100% - 32px)', height: 'fit-content' },
        { width: 'min-content', height: 'max-content' },
        { width: '', height: '' },
        { width: '0%', height: '0%' },
        { width: 'auto', height: 'auto' },
      ];

      for (const { comp } of ALL_HUMANITIES_SVG_COMPONENTS) {
        for (const props of extremeProps) {
          expect(() => {
            const html = renderToString(React.createElement(comp, props));
            expect(html).toContain('<svg');
            expect(html).toContain('viewBox="0 0 800 500"');
          }).not.toThrow();
        }
      }
    });

    test('1.3 Injection & malformed className props are safely handled and sanitized', () => {
      const maliciousClasses = [
        '"><script>alert("xss")</script><div class="',
        '"><img src="x" onerror="alert(1)">',
        'undefined null NaN [object Object]',
        '   multiple    irregular    spaces   \n\t   ',
        '✨🏛️📐🇮🇩♟️\u202Ereversed\u202C',
        'a'.repeat(10000), // Stress test ultra-long className
      ];

      for (const { comp } of ALL_HUMANITIES_SVG_COMPONENTS) {
        for (const badClass of maliciousClasses) {
          const html = renderToString(React.createElement(comp, { className: badClass }));
          // Verify no executable raw script tags are introduced
          expect(html).not.toContain('<script>alert("xss")</script>');
          expect(html).not.toContain('<img src="x" onerror="alert(1)">');
          expect(html).toContain('relative overflow-hidden');
        }
      }
    });

    test('1.4 Unrecognized/hostile extra props pass through without crashing', () => {
      for (const { comp } of ALL_HUMANITIES_SVG_COMPONENTS) {
        const html = renderToString(
          React.createElement(comp as any, {
            'data-testid': 'adversarial-svg',
            'aria-hidden': 'true',
            evilProp: '<script>1</script>',
            nullProp: null,
            undefinedProp: undefined,
          })
        );
        expect(html).toContain('<svg');
        expect(html).toContain('viewBox="0 0 800 500"');
      }
    });

    test('1.5 GeometriPecahanIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(GeometriPecahanIllustration));

      // Golden suspension bridge elements
      expect(html).toContain('id="mathSkyGrad"');
      expect(html).toContain('id="bridgeGold"');
      expect(html).toContain('id="canyonGrad"');

      // 5 linear fraction stepping blocks on bridge deck
      expect(html).toContain('1/5 (0.20)');
      expect(html).toContain('1/3 (0.33)');
      expect(html).toContain('1/2 (0.50)');
      expect(html).toContain('3/4 (0.75)');
      expect(html).toContain('9/10 (0.90)');

      // Top-left panel: Hierarki Pecahan Senilai
      expect(html).toContain('HIERARKI PECAHAN SENILAI');
      expect(html).toContain('1 UTUH (1.00 = 100%)');
      expect(html).toContain('1/2 (0.50)');
      expect(html).toContain('1/4');
      expect(html).toContain('1/8');
      expect(html).toContain('1/2 = 2/4 = 4/8 = 50% = 0.50');

      // Top-right panel: Diagram Lingkaran & Persen
      expect(html).toContain('DIAGRAM LINGKARAN &amp; PERSEN');
      expect(html).toContain('1/4 = 0.25 (25%)');
      expect(html).toContain('1/2 = 0.50 (50%)');
      expect(html).toContain('3/4 = 0.75 (75%)');
      expect(html).toContain('1/8 = 0.125');

      // 3 Geometric formula cards (Persegi, Persegi Panjang, Segitiga)
      expect(html).toContain('PERSEGI');
      expect(html).toContain('Keliling = 4 × s');
      expect(html).toContain('Luas = s × s (s²)');
      expect(html).toContain('PERSEGI PANJANG');
      expect(html).toContain('K = 2 × (p + l)');
      expect(html).toContain('Luas = p × l');
      expect(html).toContain('SEGITIGA');
      expect(html).toContain('Luas = 1/2 × a × t');
      expect(html).toContain('Triple: 3² + 4² = 5²');

      // Bottom HUD status
      expect(html).toContain('ARSITEKTUR MATEMATIKA');
    });

    test('1.6 BorobudurKosmologiIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(BorobudurKosmologiIllustration));

      // Dawn sky & gradients
      expect(html).toContain('id="candiDawnSky"');
      expect(html).toContain('id="stupaAura"');

      // 3 Cosmological strata
      expect(html).toContain('ARUPADHATU (NIRWANA)');
      expect(html).toContain('RUPADHATU (BERWUJUD)');
      expect(html).toContain('KAMADHATU: KAKI CANDI TERTUTUP (160 RELIEF HUKUM KARMAPHALA)');

      // Perahu Cadik Ganda panel
      expect(html).toContain('RELIEF PERAHU CADIK GANDA');
      expect(html).toContain('Bukti Kemaritiman Nusantara Abad ke-8');
      expect(html).toContain('Jalur Kayu Manis • Samudra Hindia ke Afrika');

      // Pasak Andesit T-Joint panel
      expect(html).toContain('PASAK BATU ANDESIT T-JOINT');
      expect(html).toContain('Konstruksi Purba Tanpa Perekat Semen');
      expect(html).toContain('Batu A');
      expect(html).toContain('Batu B');
      expect(html).toContain('Fleksibel menyerap gempa &gt; 1.000 tahun');

      // HUD status
      expect(html).toContain('WARISAN CANDI BOROBUDUR');
    });

    test('1.7 Proklamasi1945Illustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(Proklamasi1945Illustration));

      // Heroic morning sky
      expect(html).toContain('id="proklamasiSky"');
      expect(html).toContain('id="flagRed"');
      expect(html).toContain('id="sunDawn"');

      // Pegangsaan Timur 56 & Shure standing mic
      expect(html).toContain('Mikrofon 17 Agustus 1945');

      // Sang Saka Merah Putih
      expect(html).toContain('SANG SAKA MERAH PUTIH');

      // Dual historical documents (Naskah Klad vs Naskah Otentik)
      expect(html).toContain('NASKAH KLAD (TULISAN TANGAN)');
      expect(html).toContain('Ditulis oleh Ir. Soekarno di Rumah Maeda');
      expect(html).toContain('Diselamatkan BM Diah dari keranjang sampah');
      expect(html).toContain('NASKAH OTENTIK (KETIKAN)');
      expect(html).toContain('Diketuk oleh Sayuti Melik dengan Mesin Tik');
      expect(html).toContain('P R O K L A M A S I');
      expect(html).toContain('Kami bangsa Indonesia dengan ini');
      expect(html).toContain('menjatakan kemerdekaan Indonesia');

      // 5-step timeline ribbon
      expect(html).toContain('14 Agt');
      expect(html).toContain('Jepang Kalah');
      expect(html).toContain('16 Agt 04:00');
      expect(html).toContain('Rengasdengklok');
      expect(html).toContain('16 Agt Malam');
      expect(html).toContain('Rumah Maeda');
      expect(html).toContain('17 Agt Pagi');
      expect(html).toContain('Sayuti Melik');
      expect(html).toContain('17 Agt 10:00');
      expect(html).toContain('Proklamasi');

      // HUD status
      expect(html).toContain('LINIMASA REVOLUSI 1945');
    });

    test('1.8 CaturTaktikLogikaIllustration pedagogical vector requirements', () => {
      const html = renderToString(React.createElement(CaturTaktikLogikaIllustration));

      // 8x8 chessboard and grid
      expect(html).toContain('id="chessDarkBg"');
      expect(html).toContain('id="tacticalCyan"');

      // Coordinates
      for (const col of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
        expect(html).toContain(`>${col}<`);
      }
      for (const row of ['1', '2', '3', '4', '5', '6', '7', '8']) {
        expect(html).toContain(`>${row}<`);
      }

      // 4 Tactics badges
      expect(html).toContain('4 MOTIF TAKTIK &amp; POHON LOGIKA');
      expect(html).toContain('1. Garpu (Fork)');
      expect(html).toContain('2. Kuncian (Pin)');
      expect(html).toContain('3. Tusukan (Skewer)');
      expect(html).toContain('4. Skakmat Koridor');
      expect(html).toContain('# MATE');

      // Computational decision tree
      expect(html).toContain('POHON KEPUTUSAN (MINIMAX SEARCH)');
      expect(html).toContain('S0');
      expect(html).toContain('c8#');
      expect(html).toContain('e6');
      expect(html).toContain('Evaluasi: +9.0 MATE');
      expect(html).toContain('Pion=1 • Kuda/Gajah=3 • Benteng=5 • Ratu=9');

      // HUD status
      expect(html).toContain('LOGIKA KOMPUTASIONAL');
    });
  });

  // =========================================================================
  // SUITE 2: DYNAMIC SLIDE BOUNDARY NAVIGATION & STATE INVARIANTS
  // =========================================================================
  describe('Suite 2: Dynamic Slide Boundary Navigation & Clamping', () => {
    test('2.1 Verified dynamic slide counts for all 5 humanities decks (7 and 8 slides)', () => {
      expect(ULAR_TANGGA_MATEMATIKA_DECK.slides.length).toBe(7);
      expect(ULAR_TANGGA_MATEMATIKA_DECK.totalSlides).toBe(7);

      expect(POINT_CLICK_CANDI_DECK.slides.length).toBe(8);
      expect(POINT_CLICK_CANDI_DECK.totalSlides).toBe(8);

      expect(TEKA_TEKI_KATA_DECK.slides.length).toBe(7);
      expect(TEKA_TEKI_KATA_DECK.totalSlides).toBe(7);

      expect(ULAR_TANGGA_SEJARAH_DECK.slides.length).toBe(8);
      expect(ULAR_TANGGA_SEJARAH_DECK.totalSlides).toBe(8);

      expect(CATUR_TAKTIK_LOGIKA_DECK.slides.length).toBe(7);
      expect(CATUR_TAKTIK_LOGIKA_DECK.totalSlides).toBe(7);
    });

    test('2.2 Lower boundary clamping: handlePrevSlide at Slide 1 never goes below 1', () => {
      const harness7 = new AdversarialNavigationHarness(7, 1);
      const harness8 = new AdversarialNavigationHarness(8, 1);

      for (let i = 0; i < 50; i++) {
        harness7.handlePrevSlide();
        expect(harness7.currentSlide).toBe(1);

        harness8.handlePrevSlide();
        expect(harness8.currentSlide).toBe(1);
      }
    });

    test('2.3 Upper boundary clamping: handleNextSlide at final slide triggers victory and stays clamped', () => {
      // 7-slide deck
      const harness7 = new AdversarialNavigationHarness(7, 7);
      expect(harness7.isVictoryOpen).toBe(false);
      harness7.handleNextSlide();
      expect(harness7.currentSlide).toBe(7);
      expect(harness7.isVictoryOpen).toBe(true);

      for (let i = 0; i < 20; i++) {
        harness7.handleNextSlide();
        expect(harness7.currentSlide).toBe(7);
        expect(harness7.isVictoryOpen).toBe(true);
      }

      // 8-slide deck
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

    test('2.4 In-flight deck switching between 7-slide and 8-slide decks resets safely', () => {
      const harness = new AdversarialNavigationHarness(8, 8);
      expect(harness.currentSlide).toBe(8);

      // Switch to a 7-slide deck
      harness.switchDeck(7);
      expect(harness.totalSlides).toBe(7);
      expect(harness.currentSlide).toBe(1);
      expect(harness.isVictoryOpen).toBe(false);

      // Advance to slide 7
      for (let i = 0; i < 6; i++) harness.handleNextSlide();
      expect(harness.currentSlide).toBe(7);

      // Switch back to 8-slide deck
      harness.switchDeck(8);
      expect(harness.totalSlides).toBe(8);
      expect(harness.currentSlide).toBe(1);
    });

    test('2.5 Random walk fuzzing: 5,000 arbitrary state transitions maintain strict bounds [1, N]', () => {
      const testDeckSizes = [7, 8];

      for (const size of testDeckSizes) {
        const harness = new AdversarialNavigationHarness(size);

        for (let iter = 0; iter < 2500; iter++) {
          const randOp = iter % 5;
          if (randOp === 0) harness.handleNextSlide();
          else if (randOp === 1) harness.handlePrevSlide();
          else if (randOp === 2) {
            // Adversarial indices: negative, zero, float, huge, NaN
            const adversarialIndices = [-10, 0, 0.5, 3.1415, 9999, -Infinity, Infinity, NaN];
            const target = adversarialIndices[iter % adversarialIndices.length];
            harness.goToSlide(target);
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

    test('2.6 Progress dots and boundary button labels across humanities decks in SSR', () => {
      // 7-slide deck (Matematika)
      for (let s = 1; s <= 7; s++) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: ULAR_TANGGA_MATEMATIKA_DECK,
            initialSlide: s,
          })
        );

        expect(html).toContain(`Slide ${s} dari 7`);
        const dotButtonMatches = html.match(/title="Buka Slide \d+:/g);
        expect(dotButtonMatches).not.toBeNull();
        expect(dotButtonMatches?.length).toBe(7);

        if (s === 1) {
          expect(html).toContain('disabled=""'); // Previous button disabled
          expect(html).toContain('Slide Berikutnya');
        } else if (s === 7) {
          expect(html).toContain('Tutup Misi &amp; Rayakan');
        }
      }

      // 8-slide deck (Candi)
      for (let s = 1; s <= 8; s++) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: POINT_CLICK_CANDI_DECK,
            initialSlide: s,
          })
        );

        expect(html).toContain(`Slide ${s} dari 8`);
        const dotButtonMatches = html.match(/title="Buka Slide \d+:/g);
        expect(dotButtonMatches).not.toBeNull();
        expect(dotButtonMatches?.length).toBe(8);

        if (s === 1) {
          expect(html).toContain('disabled=""');
          expect(html).toContain('Slide Berikutnya');
        } else if (s === 8) {
          expect(html).toContain('Tutup Misi &amp; Rayakan');
        }
      }
    });
  });

  // =========================================================================
  // SUITE 3: SLIDE ID & CATALOG COLLISION AUDIT ACROSS ALL 10 DECKS
  // =========================================================================
  describe('Suite 3: Slide ID Collision Adversarial Audit (All 10 Decks)', () => {
    test('3.1 Master catalog contains all 10 decks without duplicate keys', () => {
      const keys = Object.keys(ALL_PRESENTATION_DECKS);
      expect(keys.length).toBe(10);
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(10);
    });

    test('3.2 Every slide ID across all 10 decks (all 75 slides) is strictly unique', () => {
      const allSlideEntries: Array<{ deckId: string; slideId: string; slideIndex: number }> = [];

      for (const [deckId, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
        deck.slides.forEach((slide, idx) => {
          allSlideEntries.push({
            deckId,
            slideId: slide.id,
            slideIndex: idx + 1,
          });
        });
      }

      expect(allSlideEntries.length).toBe(75);

      const seenSlideIds = new Map<string, string>();
      const duplicates: string[] = [];

      for (const entry of allSlideEntries) {
        if (seenSlideIds.has(entry.slideId)) {
          duplicates.push(
            `Slide ID collision '${entry.slideId}' found in deck '${entry.deckId}' and previously in '${seenSlideIds.get(entry.slideId)}'`
          );
        } else {
          seenSlideIds.set(entry.slideId, entry.deckId);
        }
      }

      expect(duplicates).toEqual([]);
      expect(seenSlideIds.size).toBe(75);
    });

    test('3.3 No namespace collision between Science (uts-) and History (utsj-) slide IDs', () => {
      const scienceSnakeDeck = ALL_PRESENTATION_DECKS['ular-tangga-sains'];
      const historySnakeDeck = ALL_PRESENTATION_DECKS['ular-tangga-sejarah'];

      expect(scienceSnakeDeck).toBeDefined();
      expect(historySnakeDeck).toBeDefined();

      const scienceSlideIds = scienceSnakeDeck.slides.map(s => s.id);
      const historySlideIds = historySnakeDeck.slides.map(s => s.id);

      // Verify science IDs start with 'uts-slide-'
      for (const id of scienceSlideIds) {
        expect(id.startsWith('uts-slide-')).toBe(true);
      }

      // Verify history IDs start with 'utsj-slide-'
      for (const id of historySlideIds) {
        expect(id.startsWith('utsj-slide-')).toBe(true);
      }

      // Overlap between both arrays must be zero
      const overlap = scienceSlideIds.filter(id => historySlideIds.includes(id));
      expect(overlap).toEqual([]);
    });

    test('3.4 All card IDs, sequence item IDs, and match pair IDs are unique within each deck', () => {
      for (const [deckId, deck] of Object.entries(HUMANITIES_PRESENTATION_DECKS)) {
        const itemIds: string[] = [];

        for (const slide of deck.slides) {
          if ('cards' in slide && Array.isArray((slide as any).cards)) {
            (slide as any).cards.forEach((c: any) => itemIds.push(c.id));
          }
          if ('items' in slide && Array.isArray((slide as any).items)) {
            (slide as any).items.forEach((item: any) => itemIds.push(item.id));
          }
          if ('pairs' in slide && Array.isArray((slide as any).pairs)) {
            (slide as any).pairs.forEach((p: any) => itemIds.push(p.id));
          }
        }

        const uniqueItemIds = new Set(itemIds);
        expect(uniqueItemIds.size).toBe(itemIds.length);
      }
    });
  });

  // =========================================================================
  // SUITE 4: MINI-GAME ADVERSARIAL STATE & BOUNDARY DEFENSE
  // =========================================================================
  describe('Suite 4: Mini-Game Adversarial State & Boundary Defense', () => {
    test('4.1 StoryResolutionSlide renders safely with missing, empty, or hostile challengesState', () => {
      const testCases: Array<Record<string, boolean> | undefined> = [
        undefined,
        {},
        { challenge1: true, challenge2: false },
        { nonexistent: true, '0': false, ['__proto__' as string]: true } as any,
      ];

      for (const state of testCases) {
        const html = renderToString(
          React.createElement(StoryResolutionSlide, {
            slide: ULAR_TANGGA_MATEMATIKA_DECK.slides[5] as any,
            themeColor: 'blue',
            challengesState: state,
            onNext: () => {},
          })
        );

        expect(html).toContain('Laporan Hasil Misi Arsitektur Jembatan:');
        expect(html).not.toContain('Buka Lembar Diskusi Guru');
      }
    });

    test('4.2 Humanities sequence datasets strictly validate ordered permutations', () => {
      const sequenceDatasets = [
        { name: 'FRACTION_BLOCKS_SEQUENCE', items: FRACTION_BLOCKS_SEQUENCE },
        { name: 'CANDI_STRATA_SEQUENCE', items: CANDI_STRATA_SEQUENCE },
        { name: 'PANTUN_NASEHAT_SEQUENCE', items: PANTUN_NASEHAT_SEQUENCE },
        { name: 'PROKLAMASI_1945_SEQUENCE', items: PROKLAMASI_1945_SEQUENCE },
        { name: 'CHESS_CHECKMATE_SEQUENCE', items: CHESS_CHECKMATE_SEQUENCE },
      ];

      for (const { items } of sequenceDatasets) {
        // Natural sorted order must be 1, 2, 3...
        const isSorted = items.every((item, idx) => item.order === idx + 1);
        expect(isSorted).toBe(true);

        // Reversed items must NOT pass
        const reversed = [...items].reverse();
        const isReversedSorted = reversed.every((item, idx) => item.order === idx + 1);
        expect(isReversedSorted).toBe(false);
      }
    });

    test('4.3 Humanities match pair datasets strictly contain valid dual keys and non-empty strings', () => {
      const pairDatasets = [
        { name: 'FRACTION_DECIMAL_PAIRS', pairs: FRACTION_DECIMAL_PAIRS },
        { name: 'BOROBUDUR_RELIEF_PAIRS', pairs: BOROBUDUR_RELIEF_PAIRS },
        { name: 'KBBI_BAKU_PAIRS', pairs: KBBI_BAKU_PAIRS },
        { name: 'PAHLAWAN_KEMERDEKAAN_PAIRS', pairs: PAHLAWAN_KEMERDEKAAN_PAIRS },
        { name: 'CHESS_TACTIC_PAIRS', pairs: CHESS_TACTIC_PAIRS },
      ];

      for (const { pairs } of pairDatasets) {
        expect(pairs.length).toBeGreaterThanOrEqual(4);
        for (const p of pairs) {
          expect(p.id.length).toBeGreaterThan(0);
          expect(p.leftText.length).toBeGreaterThan(0);
          expect(p.rightText.length).toBeGreaterThan(0);
        }
      }
    });

    test('4.4 Humanities flashcard datasets contain non-empty front and back prompt pairs', () => {
      const flashcardDatasets = [
        { name: 'BOROBUDUR_FLASHCARDS', cards: BOROBUDUR_FLASHCARDS },
        { name: 'PROKLAMASI_FLASHCARDS', cards: PROKLAMASI_FLASHCARDS },
      ];

      for (const { cards } of flashcardDatasets) {
        expect(cards.length).toBeGreaterThanOrEqual(2);
        for (const c of cards) {
          expect(c.id.length).toBeGreaterThan(0);
          expect(c.frontPrompt.length).toBeGreaterThan(0);
          expect(c.backAnswer.length).toBeGreaterThan(0);
        }
      }
    });
  });

  // =========================================================================
  // SUITE 5: ALL 5 HUMANITIES DECKS BATCH SSR PERFORMANCE & THEME INTEGRITY
  // =========================================================================
  describe('Suite 5: Humanities Decks Batch SSR Benchmark & Theme Integrity', () => {
    const HUMANITIES_GAME_IDS = [
      'ular-tangga-matematika',
      'point-click-candi',
      'teka-teki-kata',
      'ular-tangga-sejarah',
      'catur-taktik-logika',
    ];

    test('5.1 Every humanities deck has a valid mentor and registered theme', () => {
      for (const gameId of HUMANITIES_GAME_IDS) {
        const deck = HUMANITIES_PRESENTATION_DECKS[gameId];
        expect(deck).toBeDefined();
        expect(deck.mentor.name.length).toBeGreaterThan(0);
        expect(deck.mentor.role.length).toBeGreaterThan(0);
        expect(deck.mentor.avatarEmoji.length).toBeGreaterThan(0);
        expect(PRESENTATION_THEMES[deck.themeColor]).toBeDefined();
      }
    });

    test('5.2 Batch SSR performance: Rendering all 37 humanities slides completes in under 500ms', () => {
      const startTime = performance.now();
      let totalBytesRendered = 0;

      for (const gameId of HUMANITIES_GAME_IDS) {
        const deck = HUMANITIES_PRESENTATION_DECKS[gameId];
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
      expect(elapsedMs).toBeLessThan(500); // Strict presentation render performance budget
    });
  });
});
