import { describe, expect, test } from 'bun:test';
import {
  SlideDeckSimulator,
  AUTHORITATIVE_GAMES_SPEC,
  validateSequenceOrder,
  validatePairConnections
} from './e2e-fixtures';

describe('Tier 4 E2E Test Suite: Real-World Classroom Application Scenarios', () => {
  describe('Scenario 1: Science (IPA) Classroom Journey — Daur Air & Laboratorium', () => {
    test('Simulates complete 7-slide journey for ular-tangga-sains (Siklus Hidrologi & Fotosintesis)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['ular-tangga-sains'];
      expect(spec).toBeDefined();
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Panggilan Misi Kak Galih (Lembah Cendrawasih)
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toBe('Kak Galih');

      // Slide 2: Infografis Daur Air
      sim.nextSlide();
      expect(sim.currentSlide).toBe(2);
      expect(spec.learningTopics).toContain('Siklus Air (Hidrologi)');

      // Slide 3: Infografis Fotosintesis
      sim.nextSlide();
      expect(sim.currentSlide).toBe(3);
      expect(spec.learningTopics).toContain('Fotosintesis Tumbuhan');

      // Slide 4: Interactive Sequence Game (4 Tahap Hidrologi)
      sim.nextSlide();
      expect(sim.currentSlide).toBe(4);
      const waterSequence = [
        { id: 'h1', order: 1, label: 'Evaporasi' },
        { id: 'h2', order: 2, label: 'Kondensasi' },
        { id: 'h3', order: 3, label: 'Presipitasi' },
        { id: 'h4', order: 4, label: 'Infiltrasi' }
      ];
      const isSequenceCorrect = validateSequenceOrder(waterSequence);
      expect(isSequenceCorrect).toBe(true);
      sim.setMiniGameCompleted('sequence-hidrologi', isSequenceCorrect);

      // Slide 5: Interactive Match Pairs (Transformasi Energi)
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const energyPairs = [
        { id: 'e1', leftText: 'Surya', rightText: 'Fotosintesis' },
        { id: 'e2', leftText: 'Air', rightText: 'Kincir Turbin' },
        { id: 'e3', leftText: 'Kimia', rightText: 'Otot Anak' },
        { id: 'e4', leftText: 'Kalor', rightText: 'Sirkulasi Angin' }
      ];
      const connections = { e1: 'e1', e2: 'e2', e3: 'e3', e4: 'e4' };
      const matchResult = validatePairConnections(energyPairs, connections);
      expect(matchResult.isComplete).toBe(true);
      sim.setMiniGameCompleted('match-energi', matchResult.isComplete);

      // Slide 6: Story Resolution (Air Bersih Mengalir Kembali)
      sim.nextSlide();
      expect(sim.currentSlide).toBe(6);
      expect(spec.resolutionImpact).toContain('Mata air pegunungan kembali memancar');

      // Slide 7: Teacher Reflection & HOTS Discussion
      sim.nextSlide();
      expect(sim.currentSlide).toBe(7);
      expect(spec.reflectionHotsCount).toBe(3);

      // Classroom Victory Celebration
      const finalState = sim.nextSlide();
      expect(finalState.victory).toBe(true);
      expect(sim.isAllMiniGamesCompleted()).toBe(true);
    });

    test('Simulates complete 8-slide journey for point-click-lab (Dr. Maya K3 & Asam Basa)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['point-click-lab'];
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Misi Dr. Maya
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toContain('Dr. Maya');

      // Slide 2 & 3: Infografis K3 & Skala pH
      sim.goToSlide(3);
      expect(sim.currentSlide).toBe(3);

      // Slide 4: Match Pairs Simbol Bahaya K3
      sim.nextSlide();
      expect(sim.currentSlide).toBe(4);
      const k3Pairs = [{ id: 'k1' }, { id: 'k2' }, { id: 'k3' }, { id: 'k4' }];
      const k3Conn = { k1: 'k1', k2: 'k2', k3: 'k3', k4: 'k4' };
      expect(validatePairConnections(k3Pairs, k3Conn).isComplete).toBe(true);
      sim.setMiniGameCompleted('k3-pairs', true);

      // Slide 5: Sequence Metode Ilmiah (5 langkah)
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const miSequence = [
        { id: 'm1', order: 1 },
        { id: 'm2', order: 2 },
        { id: 'm3', order: 3 },
        { id: 'm4', order: 4 },
        { id: 'm5', order: 5 }
      ];
      expect(validateSequenceOrder(miSequence)).toBe(true);
      sim.setMiniGameCompleted('metode-ilmiah', true);

      // Slide 6: 3D Flashcards Uji Lakmus
      sim.nextSlide();
      expect(sim.currentSlide).toBe(6);
      sim.setMiniGameCompleted('flashcards-lakmus', true);

      // Slide 7: Story Resolution
      sim.nextSlide();
      expect(sim.currentSlide).toBe(7);
      expect(spec.resolutionImpact).toContain('Reaktor kimia dinetralkan');

      // Slide 8: Teacher Reflection Sheet
      sim.nextSlide();
      expect(sim.currentSlide).toBe(8);
      expect(spec.reflectionHotsCount).toBe(3);

      // Victory trigger
      const victoryAction = sim.nextSlide();
      expect(victoryAction.victory).toBe(true);
      expect(sim.isAllMiniGamesCompleted()).toBe(true);
    });
  });

  describe('Scenario 2: Mathematics Classroom Journey — Pecahan Senilai & Geometri', () => {
    test('Simulates complete 7-slide journey for ular-tangga-matematika (Kak Arya)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['ular-tangga-matematika'];
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Kak Arya - Jembatan Gantung Emas
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toBe('Kak Arya');

      // Slide 2 & 3: Infografis Pecahan Senilai & Keliling-Luas
      sim.goToSlide(3);
      expect(sim.currentSlide).toBe(3);

      // Slide 4: Match Pairs Pecahan ke Desimal
      sim.nextSlide();
      expect(sim.currentSlide).toBe(4);
      const fracPairs = [
        { id: 'f1', leftText: '1/2', rightText: '0.50' },
        { id: 'f2', leftText: '3/4', rightText: '0.75' },
        { id: 'f3', leftText: '2/5', rightText: '0.40' },
        { id: 'f4', leftText: '1/8', rightText: '0.125' }
      ];
      const fracConn = { f1: 'f1', f2: 'f2', f3: 'f3', f4: 'f4' };
      expect(validatePairConnections(fracPairs, fracConn).isComplete).toBe(true);
      sim.setMiniGameCompleted('frac-pairs', true);

      // Slide 5: Sequence Tangga Balok Fraksi
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const fracOrder = [
        { id: 'b1', order: 1, label: '1/5 (0.20)' },
        { id: 'b2', order: 2, label: '1/3 (0.33)' },
        { id: 'b3', order: 3, label: '1/2 (0.50)' },
        { id: 'b4', order: 4, label: '3/4 (0.75)' },
        { id: 'b5', order: 5, label: '9/10 (0.90)' }
      ];
      expect(validateSequenceOrder(fracOrder)).toBe(true);
      sim.setMiniGameCompleted('frac-sequence', true);

      // Slide 6: Story Resolution (Jembatan Tersambung)
      sim.nextSlide();
      expect(sim.currentSlide).toBe(6);
      expect(spec.resolutionImpact).toContain('Jembatan Gantung Emas tersambung kokoh');

      // Slide 7: HOTS Discussion
      sim.nextSlide();
      expect(sim.currentSlide).toBe(7);
      expect(spec.reflectionHotsCount).toBe(3);

      // Finish journey
      const res = sim.nextSlide();
      expect(res.victory).toBe(true);
      expect(sim.isAllMiniGamesCompleted()).toBe(true);
    });
  });

  describe('Scenario 3: History & Culture Classroom Journey — Borobudur & Proklamasi 1945', () => {
    test('Simulates complete 8-slide journey for point-click-candi (Paman Dewa)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['point-click-candi'];
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Panggilan Paman Dewa
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toBe('Paman Dewa');

      // Slide 4: Sequence 4 Strata Candi (Kamadhatu -> Stupa Induk)
      sim.goToSlide(4);
      expect(sim.currentSlide).toBe(4);
      const candiStrata = [
        { id: 'c1', order: 1, label: 'Kamadhatu' },
        { id: 'c2', order: 2, label: 'Rupadhatu' },
        { id: 'c3', order: 3, label: 'Arupadhatu' },
        { id: 'c4', order: 4, label: 'Stupa Induk' }
      ];
      expect(validateSequenceOrder(candiStrata)).toBe(true);
      sim.setMiniGameCompleted('strata-candi', true);

      // Slide 5: Match Pairs Relief Perahu & Artefak
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const reliefPairs = [{ id: 'r1' }, { id: 'r2' }, { id: 'r3' }, { id: 'r4' }];
      const reliefConn = { r1: 'r1', r2: 'r2', r3: 'r3', r4: 'r4' };
      expect(validatePairConnections(reliefPairs, reliefConn).isComplete).toBe(true);
      sim.setMiniGameCompleted('relief-pairs', true);

      // Slide 7 & 8: Resolution & HOTS Reflection
      sim.goToSlide(7);
      expect(sim.currentSlide).toBe(7);
      expect(spec.resolutionImpact).toContain('UNESCO');

      sim.nextSlide();
      expect(sim.currentSlide).toBe(8);
      expect(spec.reflectionHotsCount).toBe(3);

      const celebration = sim.nextSlide();
      expect(celebration.victory).toBe(true);
    });

    test('Simulates complete 8-slide journey for ular-tangga-sejarah (Kak Satria 1945)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['ular-tangga-sejarah'];
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Kak Satria Merdeka
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toBe('Kak Satria');

      // Slide 4: Sequence 5 Tahap Proklamasi
      sim.goToSlide(4);
      expect(sim.currentSlide).toBe(4);
      const proklamasiSequence = [
        { id: 'p1', order: 1, label: 'Kekalahan Jepang' },
        { id: 'p2', order: 2, label: 'Rengasdengklok' },
        { id: 'p3', order: 3, label: 'Perumusan Naskah' },
        { id: 'p4', order: 4, label: 'Pengetikan Sayuti Melik' },
        { id: 'p5', order: 5, label: 'Pembacaan Proklamasi' }
      ];
      expect(validateSequenceOrder(proklamasiSequence)).toBe(true);
      sim.setMiniGameCompleted('proklamasi-seq', true);

      // Slide 5: Match Pairs Tokoh Pahlawan
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const tokohPairs = [{ id: 't1' }, { id: 't2' }, { id: 't3' }, { id: 't4' }];
      const tokohConn = { t1: 't1', t2: 't2', t3: 't3', t4: 't4' };
      expect(validatePairConnections(tokohPairs, tokohConn).isComplete).toBe(true);
      sim.setMiniGameCompleted('tokoh-pairs', true);

      // Slide 7: Sang Saka Merah Putih Berkibar
      sim.goToSlide(7);
      expect(sim.currentSlide).toBe(7);
      expect(spec.resolutionImpact).toContain('Sang Saka Merah Putih berkibar');

      // Slide 8: Reflection
      sim.nextSlide();
      expect(sim.currentSlide).toBe(8);
      expect(spec.reflectionHotsCount).toBe(3);

      // Victory trigger
      const finish = sim.nextSlide();
      expect(finish.victory).toBe(true);
    });
  });

  describe('Scenario 4: Language & Computational Logic Classroom Journey — Pantun & Catur', () => {
    test('Simulates complete 7-slide journey for teka-teki-kata (Ibu Kartika)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['teka-teki-kata'];
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Balai Pustaka
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toBe('Ibu Kartika');

      // Slide 4: Match Pairs Kata Baku KBBI
      sim.goToSlide(4);
      expect(sim.currentSlide).toBe(4);
      const kbbiPairs = [
        { id: 'k1', leftText: 'Apotik', rightText: 'Apotek' },
        { id: 'k2', leftText: 'Ijin', rightText: 'Izin' },
        { id: 'k3', leftText: 'Praktek', rightText: 'Praktik' },
        { id: 'k4', leftText: 'Nasehat', rightText: 'Nasihat' },
        { id: 'k5', leftText: 'Analisa', rightText: 'Analisis' }
      ];
      const kbbiConn = { k1: 'k1', k2: 'k2', k3: 'k3', k4: 'k4', k5: 'k5' };
      expect(validatePairConnections(kbbiPairs, kbbiConn).isComplete).toBe(true);
      sim.setMiniGameCompleted('kbbi-match', true);

      // Slide 5: Sequence Bait Pantun Rima a-b-a-b
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const pantunLines = [
        { id: 'pt1', order: 1, label: 'Sampiran 1' },
        { id: 'pt2', order: 2, label: 'Sampiran 2' },
        { id: 'pt3', order: 3, label: 'Isi 1' },
        { id: 'pt4', order: 4, label: 'Isi 2' }
      ];
      expect(validateSequenceOrder(pantunLines)).toBe(true);
      sim.setMiniGameCompleted('pantun-seq', true);

      // Slide 6: Naskah Emas Kembali Abadi
      sim.nextSlide();
      expect(sim.currentSlide).toBe(6);
      expect(spec.resolutionImpact).toContain('Naskah emas bahasa persatuan Balai Pustaka');

      // Slide 7: HOTS Reflection
      sim.nextSlide();
      expect(sim.currentSlide).toBe(7);
      expect(spec.reflectionHotsCount).toBe(3);

      const celebration = sim.nextSlide();
      expect(celebration.victory).toBe(true);
    });

    test('Simulates complete 7-slide journey for catur-taktik-logika (Master Utut)', () => {
      const spec = AUTHORITATIVE_GAMES_SPEC['catur-taktik-logika'];
      const sim = new SlideDeckSimulator(spec.slideCount);

      // Slide 1: Master Utut
      expect(sim.currentSlide).toBe(1);
      expect(spec.mentorName).toBe('Master Utut');

      // Slide 4: Match Pairs 4 Motif Taktik (Garpu, Kuncian, Tusukan, Skakmat Koridor)
      sim.goToSlide(4);
      expect(sim.currentSlide).toBe(4);
      const tacticPairs = [
        { id: 't1', leftText: 'Garpu (Fork)', rightText: 'Dua sasaran sekaligus' },
        { id: 't2', leftText: 'Kuncian (Pin)', rightText: 'Bidak terikat lindungi raja' },
        { id: 't3', leftText: 'Tusukan (Skewer)', rightText: 'Serang perwira depan' },
        { id: 't4', leftText: 'Skakmat Koridor', rightText: 'Baris belakang terperangkap' }
      ];
      const tacticConn = { t1: 't1', t2: 't2', t3: 't3', t4: 't4' };
      expect(validatePairConnections(tacticPairs, tacticConn).isComplete).toBe(true);
      sim.setMiniGameCompleted('chess-tactics', true);

      // Slide 5: Sequence Algoritma Skakmat
      sim.nextSlide();
      expect(sim.currentSlide).toBe(5);
      const chessAlgo = [
        { id: 'ca1', order: 1, label: 'Identifikasi Celah' },
        { id: 'ca2', order: 2, label: 'Pancingan Pengorbanan' },
        { id: 'ca3', order: 3, label: 'Penetrasi Benteng/Ratu' },
        { id: 'ca4', order: 4, label: 'Skakmat Mutlak' }
      ];
      expect(validateSequenceOrder(chessAlgo)).toBe(true);
      sim.setMiniGameCompleted('chess-algo', true);

      // Slide 6: Story Resolution (Medali Emas Sekolah)
      sim.nextSlide();
      expect(sim.currentSlide).toBe(6);
      expect(spec.resolutionImpact).toContain('medali emas');

      // Slide 7: HOTS Reflection
      sim.nextSlide();
      expect(sim.currentSlide).toBe(7);
      expect(spec.reflectionHotsCount).toBe(3);

      const celebration = sim.nextSlide();
      expect(celebration.victory).toBe(true);
    });
  });
});
