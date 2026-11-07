import React, { useState, useEffect } from 'react';
import { FlaskConical, AlertTriangle, Sparkles, Droplets, ShieldAlert, Atom } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface AcidBaseReactorStageProps {
  activePhase: number;
  onSelectPhase: (idx: number) => void;
  isPlaying?: boolean;
  className?: string;
  slideId?: string;
}

export interface PhChemicalData {
  ph: number;
  substanceName: string;
  chemicalFormula: string;
  category: 'asam-kuat' | 'asam-lemah' | 'netral' | 'basa-lemah' | 'basa-kuat';
  categoryLabel: string;
  badgeBg: string;
  color: string;
  glowColor: string;
  hIonCount: number;
  ohIonCount: number;
  lakmusMerahColor: string;
  lakmusBiruColor: string;
  lakmusSummary: string;
  hazardBadge: string;
  hazardNote: string;
  classroomContext: string;
}

export const PH_MASTER_DATA: PhChemicalData[] = [
  {
    ph: 0,
    substanceName: 'Asam Sulfat Aki Pekat',
    chemicalFormula: 'H₂SO₄ pekat',
    category: 'asam-kuat',
    categoryLabel: 'Asam Kuat Ekstrem',
    badgeBg: 'bg-red-500 text-white',
    color: '#dc2626',
    glowColor: 'rgba(220, 38, 38, 0.45)',
    hIonCount: 16,
    ohIonCount: 0,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Kedua Lakmus MERAH',
    hazardBadge: '⚠️ KOROSIF EKSTREM',
    hazardNote: 'Menghancurkan jaringan kulit dan melarutkan logam dalam hitungan detik. Dilarang keras disentuh!',
    classroomContext: 'Bahan kimia aki kendaraan bermotor; hanya boleh ditangani di lemari asam laboratorium profesional.',
  },
  {
    ph: 1,
    substanceName: 'Asam Lambung & HCl Kerak',
    chemicalFormula: 'HCl (Asam Klorida)',
    category: 'asam-kuat',
    categoryLabel: 'Asam Kuat',
    badgeBg: 'bg-rose-500 text-white',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    hIonCount: 14,
    ohIonCount: 0,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Kedua Lakmus MERAH',
    hazardBadge: '⚠️ SANGAT KOROSIF',
    hazardNote: 'Mengikis lantai marmer dan melarutkan karat besi. Di lambung dilapisi lendir khusus mukosa agar tidak luka.',
    classroomContext: 'Asam lambung mencerna protein makanan; kelebihan asam memicu gastritis / maag.',
  },
  {
    ph: 2,
    substanceName: 'Jus Perasan Jeruk Lemon',
    chemicalFormula: 'C₆H₈O₇ (Asam Sitrat)',
    category: 'asam-lemah',
    categoryLabel: 'Asam Lemah Alami',
    badgeBg: 'bg-orange-500 text-white',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    hIonCount: 11,
    ohIonCount: 1,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Kedua Lakmus MERAH',
    hazardBadge: '🍋 ASAM KONSUMSI',
    hazardNote: 'Dapat mengikis enamel gigi jika berlebihan, namun aman dikonsumsi manusia dalam batas wajar.',
    classroomContext: 'Contoh asam organik alami; rasa masam pada buah berasal dari ion H⁺ bebas yang mengenai papila lidah.',
  },
  {
    ph: 3,
    substanceName: 'Cuka Dapur Rumah Tangga',
    chemicalFormula: 'CH₃COOH (Asam Asetat 5%)',
    category: 'asam-lemah',
    categoryLabel: 'Asam Lemah',
    badgeBg: 'bg-amber-500 text-slate-950',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    hIonCount: 9,
    ohIonCount: 1,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Kedua Lakmus MERAH',
    hazardBadge: '⚠️ IRITASI UAP',
    hazardNote: 'Aman untuk makanan, namun uap pekatnya dapat mengiritasi mata dan saluran pernapasan saat diuji di kelas.',
    classroomContext: 'Asam asetat terionisasi sebagian (~1%) di dalam air; jangan pernah mencicipi langsung dari botol kimia!',
  },
  {
    ph: 4,
    substanceName: 'Jus Tomat & Minuman Soda',
    chemicalFormula: 'H₂CO₃ (Asam Karbonat)',
    category: 'asam-lemah',
    categoryLabel: 'Asam Lemah',
    badgeBg: 'bg-amber-400 text-slate-950',
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
    hIonCount: 7,
    ohIonCount: 2,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Kedua Lakmus MERAH',
    hazardBadge: '🍅 ASAM RINGAN',
    hazardNote: 'Gas karbon dioksida terlarut membentuk asam karbonat yang memberi sensasi menggelitik pada minuman soda.',
    classroomContext: 'Kadar keasaman tomat dan soda dapat merangsang produksi asam lambung berlebih bila perut kosong.',
  },
  {
    ph: 5,
    substanceName: 'Kopi Hitam & Hujan Asam',
    chemicalFormula: 'H₂SO₄ + HNO₃ (Hujan Asam)',
    category: 'asam-lemah',
    categoryLabel: 'Asam Lemah / Polutan',
    badgeBg: 'bg-yellow-400 text-slate-950',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.45)',
    hIonCount: 6,
    ohIonCount: 3,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Kedua Lakmus MERAH',
    hazardBadge: '🌧️ DAMPAK LINGKUNGAN',
    hazardNote: 'Hujan asam (pH < 5.6) merusak patung candi batu kapur, melunturkan cat kendaraan, dan mematikan fauna sungai.',
    classroomContext: 'Polutan SO₂ dan NOₓ dari asap pabrik & kendaraan bereaksi dengan uap air awan membentuk asam sulfat.',
  },
  {
    ph: 6,
    substanceName: 'Susu Sapi Segar & Air Liur',
    chemicalFormula: 'Asam Laktat encer',
    category: 'asam-lemah',
    categoryLabel: 'Mendekati Netral',
    badgeBg: 'bg-lime-400 text-slate-950',
    color: '#84cc16',
    glowColor: 'rgba(132, 204, 22, 0.45)',
    hIonCount: 5,
    ohIonCount: 4,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#ef4444',
    lakmusSummary: 'Merah pudar / Tetap',
    hazardBadge: '🥛 AMAN BIOLOGIS',
    hazardNote: 'Bakteri fermentasi mengubah laktosa menjadi asam laktat yang perlahan menurunkan pH susu basi.',
    classroomContext: 'Air liur manusia normal berada di kisaran pH 6.2 - 7.4 untuk melindungi rongga mulut.',
  },
  {
    ph: 7,
    substanceName: 'Air Murni Distilasi',
    chemicalFormula: 'H₂O (Molekul Murni)',
    category: 'netral',
    categoryLabel: 'Titik Netral Ekuivalen',
    badgeBg: 'bg-emerald-400 text-slate-950',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    hIonCount: 4,
    ohIonCount: 4,
    lakmusMerahColor: '#ef4444',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Lakmus Merah TETAP, Biru TETAP',
    hazardBadge: '💧 NETRAL MURNI',
    hazardNote: 'Jumlah ion H⁺ sama persis dengan ion OH⁻ (10⁻⁷ M). Tidak korosif dan tidak kaustik.',
    classroomContext: 'Air murni hasil destilasi tidak menghantarkan arus listrik kuat karena konsentrasi ion bebas sangat minim.',
  },
  {
    ph: 8,
    substanceName: 'Air Laut & Putih Telur',
    chemicalFormula: 'NaHCO₃ alami',
    category: 'basa-lemah',
    categoryLabel: 'Basa Lemah Alami',
    badgeBg: 'bg-teal-400 text-slate-950',
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.45)',
    hIonCount: 3,
    ohIonCount: 6,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '🌊 PENYANGGA LAUT',
    hazardNote: 'Menjaga kestabilan biosfer laut; pengasaman laut akibat serapan CO₂ menurunkan pH ini dan merusak terumbu karang.',
    classroomContext: 'Contoh larutan penyangga (buffer) alami bumi yang menstabilkan ekosistem kehidupan perairan.',
  },
  {
    ph: 9,
    substanceName: 'Larutan Baking Soda Kue',
    chemicalFormula: 'NaHCO₃ (Natrium Bikarbonat)',
    category: 'basa-lemah',
    categoryLabel: 'Basa Lemah',
    badgeBg: 'bg-cyan-400 text-slate-950',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    hIonCount: 2,
    ohIonCount: 8,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '🧁 PENETRAL RINGAN',
    hazardNote: 'Bereaksi dengan asam membentuk gelembung gas CO₂ yang membuat adonan kue mengembang empuk.',
    classroomContext: 'Baking soda dapat digunakan di kelas untuk menetralkan tumpahan asam lemah tanpa memicu panas berbahaya.',
  },
  {
    ph: 10,
    substanceName: 'Obat Sakit Maag Antasida',
    chemicalFormula: 'Mg(OH)₂ / Al(OH)₃',
    category: 'basa-lemah',
    categoryLabel: 'Basa Obat Penawar',
    badgeBg: 'bg-sky-400 text-slate-950',
    color: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    hIonCount: 1,
    ohIonCount: 10,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '💊 PENETRAL MAAG',
    hazardNote: 'Reaksi Netralisasi: Basa Mg(OH)₂ menetralkan HCl lambung membentuk MgCl₂ dan molekul air aman H₂O.',
    classroomContext: 'Aplikasi nyata reaksi netralisasi asam-basa dalam dunia farmasi medis sehari-hari.',
  },
  {
    ph: 11,
    substanceName: 'Amonia Pembersih Kaca',
    chemicalFormula: 'NH₃ terlarut (NH₄OH)',
    category: 'basa-lemah',
    categoryLabel: 'Basa Sedang',
    badgeBg: 'bg-blue-500 text-white',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    hIonCount: 1,
    ohIonCount: 12,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '⚠️ BAU MENYENGAT',
    hazardNote: 'Aroma gas menyengat; uap amonia tidak boleh dihirup langsung dari jarak dekat saat praktikum.',
    classroomContext: 'Melarutkan lemak dan debu kaca jendela tanpa meninggalkan bekas bercak noda kerak air.',
  },
  {
    ph: 12,
    substanceName: 'Air Sabun Cuci Tangan',
    chemicalFormula: 'R-COONa + NaOH encer',
    category: 'basa-kuat',
    categoryLabel: 'Basa Kuat Encer',
    badgeBg: 'bg-indigo-500 text-white',
    color: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    hIonCount: 0,
    ohIonCount: 14,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '🧼 LICIN (SAPONIFIKASI)',
    hazardNote: 'Terasa licin di tangan karena basa bereaksi dengan minyak alami kulit memicu proses saponifikasi.',
    classroomContext: 'Sabun mengangkat kotoran minyak lewat ujung molekul hidrofobik & hidrofilik saat dibilas air.',
  },
  {
    ph: 13,
    substanceName: 'Cairan Pemutih Pakaian',
    chemicalFormula: 'NaClO (Natrium Hipoklorit)',
    category: 'basa-kuat',
    categoryLabel: 'Basa Kuat Oksidator',
    badgeBg: 'bg-purple-500 text-white',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    hIonCount: 0,
    ohIonCount: 16,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '⚠️ KAUSTIK OKSIDATOR',
    hazardNote: 'Merusak serat kain jika tidak diencerkan, menghilangkan zat warna pigmen, dan memutihkan lakmus.',
    classroomContext: 'Jangan pernah mencampur pemutih dengan asam pembersih kerak toilet karena memicu gas klorin beracun!',
  },
  {
    ph: 14,
    substanceName: 'Pembersih Pipa Mampet Padat',
    chemicalFormula: 'NaOH padat (Soda Api)',
    category: 'basa-kuat',
    categoryLabel: 'Basa Kuat Ekstrem',
    badgeBg: 'bg-fuchsia-600 text-white',
    color: '#d946ef',
    glowColor: 'rgba(217, 70, 239, 0.45)',
    hIonCount: 0,
    ohIonCount: 18,
    lakmusMerahColor: '#3b82f6',
    lakmusBiruColor: '#3b82f6',
    lakmusSummary: 'Kedua Lakmus BIRU',
    hazardBadge: '⚠️ SANGAT KAUSTIK',
    hazardNote: 'Melarutkan gumpalan rambut dan lemak pipa dengan reaksi eksotermik (sangat panas). Bahaya luka bakar kimia!',
    classroomContext: 'Larutan NaOH terurai sempurna 100% di dalam air melepaskan banjir ion Hidroksida (OH⁻).',
  },
];

export const AcidBaseReactorStage: React.FC<AcidBaseReactorStageProps> = ({
  activePhase,
  onSelectPhase,
  isPlaying = false,
  className = '',
}) => {
  const [currentPh, setCurrentPh] = useState<number>(() => {
    if (activePhase === 0) return 1; // Asam kuat
    if (activePhase === 1) return 3; // Asam lemah
    return 7; // Netral
  });

  const [isNeutralizing, setIsNeutralizing] = useState<boolean>(false);
  const [neutralizeSuccess, setNeutralizeSuccess] = useState<boolean>(false);

  // Sync with parent active phase changes
  useEffect(() => {
    if (activePhase === 0) {
      setCurrentPh(1); // Asam Kuat (HCl)
    } else if (activePhase === 1) {
      setCurrentPh(3); // Asam Lemah (Cuka)
    } else if (activePhase === 2) {
      setCurrentPh(7); // Netralisasi (H2O)
    }
  }, [activePhase]);

  // Handle autoplay rotation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentPh((prev) => (prev >= 14 ? 0 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeData = PH_MASTER_DATA[currentPh] ?? PH_MASTER_DATA[7];

  const handleSelectPh = (ph: number) => {
    sound.playClick();
    setCurrentPh(ph);
    setNeutralizeSuccess(false);

    // Map to parent cards if applicable
    if (ph <= 2 && activePhase !== 0) {
      onSelectPhase(0);
    } else if (ph > 2 && ph <= 6 && activePhase !== 1) {
      onSelectPhase(1);
    } else if (ph === 7 && activePhase !== 2) {
      onSelectPhase(2);
    }
  };

  const handleNeutralizeAction = () => {
    sound.playClick();
    setIsNeutralizing(true);
    setNeutralizeSuccess(false);

    // Simulate titration sequence toward pH 7
    let step = currentPh;
    const interval = setInterval(() => {
      if (step < 7) {
        step += 1;
        setCurrentPh(step);
      } else if (step > 7) {
        step -= 1;
        setCurrentPh(step);
      } else {
        clearInterval(interval);
        setIsNeutralizing(false);
        setNeutralizeSuccess(true);
        sound.playCorrect();
        onSelectPhase(2);
      }
    }, 250);
  };

  const isAcid = currentPh < 7;
  const isNeutral = currentPh === 7;
  const isBase = currentPh > 7;

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-2.5 sm:p-3.5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 select-none overflow-hidden rounded-2xl border border-teal-500/30 ${className}`}
    >
      {/* ── TOP HUD HEADER: ACTIVE ANALYTE STATUS ───────────── */}
      <div className="flex items-center justify-between gap-2 shrink-0 z-10 pb-1.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-md transition-colors duration-300"
            style={{
              backgroundColor: `${activeData.color}25`,
              border: `2px solid ${activeData.color}`,
              color: activeData.color,
            }}
          >
            <FlaskConical size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-black text-white truncate">
                {activeData.substanceName}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 border border-teal-500/30">
                {activeData.chemicalFormula}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">
              {activeData.categoryLabel} • {activeData.classroomContext}
            </p>
          </div>
        </div>

        {/* Large pH Value Badge */}
        <div
          className="shrink-0 px-2.5 py-1 rounded-xl flex items-center gap-1.5 border-2 shadow-lg transition-all duration-300"
          style={{
            backgroundColor: `${activeData.color}20`,
            borderColor: activeData.color,
            boxShadow: `0 0 16px ${activeData.glowColor}`,
          }}
        >
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
            Nilai
          </span>
          <span
            className="text-base sm:text-lg font-black tracking-tight"
            style={{ color: activeData.color }}
          >
            pH {activeData.ph}
          </span>
        </div>
      </div>

      {/* ── CENTER ARENA: BEAKER + MOLECULAR IONS + LITMUS ──── */}
      <div className="flex-1 min-h-0 py-1.5 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center z-10">
        {/* Left Side (5 Cols): Litmus Strips & Safety Notice */}
        <div className="sm:col-span-5 flex flex-col justify-between h-full gap-2">
          {/* Litmus Paper Indicator Test Box */}
          <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-700/70 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              <span>Uji Kertas Lakmus</span>
              <span
                className="font-black text-[10px]"
                style={{ color: activeData.color }}
              >
                {activeData.lakmusSummary}
              </span>
            </div>

            {/* Litmus Strips Visualization (Realistic Half-Dipped Indicators) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Lakmus Merah */}
              <div className="bg-slate-950/80 rounded-lg p-1.5 border border-slate-800 flex items-center gap-2">
                <div className="w-4 h-9 rounded-sm overflow-hidden flex flex-col border border-slate-700/80 shadow shrink-0">
                  {/* Dry upper handle (Always Red) */}
                  <div className="h-[40%] w-full bg-rose-500 opacity-80" title="Bagian Kering (Merah)" />
                  {/* Wet dipped area (Dynamic reaction) */}
                  <div
                    className="h-[60%] w-full transition-colors duration-300 relative border-t border-white/30"
                    style={{ backgroundColor: activeData.lakmusMerahColor }}
                    title="Bagian Tercelup Cairan"
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                </div>
                <div className="text-[9.5px] leading-tight min-w-0">
                  <div className="text-slate-400 font-bold truncate">Lakmus Merah</div>
                  <div
                    className="font-black truncate"
                    style={{ color: activeData.lakmusMerahColor }}
                  >
                    ➔ {activeData.lakmusMerahColor === '#ef4444' ? 'TETAP MERAH' : 'JADI BIRU'}
                  </div>
                  <div className="text-[8px] text-slate-400 font-mono">
                    {activeData.lakmusMerahColor === '#ef4444' ? 'Asam / Netral' : 'Sifat Basa'}
                  </div>
                </div>
              </div>

              {/* Lakmus Biru */}
              <div className="bg-slate-950/80 rounded-lg p-1.5 border border-slate-800 flex items-center gap-2">
                <div className="w-4 h-9 rounded-sm overflow-hidden flex flex-col border border-slate-700/80 shadow shrink-0">
                  {/* Dry upper handle (Always Blue) */}
                  <div className="h-[40%] w-full bg-sky-500 opacity-80" title="Bagian Kering (Biru)" />
                  {/* Wet dipped area (Dynamic reaction) */}
                  <div
                    className="h-[60%] w-full transition-colors duration-300 relative border-t border-white/30"
                    style={{ backgroundColor: activeData.lakmusBiruColor }}
                    title="Bagian Tercelup Cairan"
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                </div>
                <div className="text-[9.5px] leading-tight min-w-0">
                  <div className="text-slate-400 font-bold truncate">Lakmus Biru</div>
                  <div
                    className="font-black truncate"
                    style={{ color: activeData.lakmusBiruColor }}
                  >
                    ➔ {activeData.lakmusBiruColor === '#ef4444' ? 'JADI MERAH' : 'TETAP BIRU'}
                  </div>
                  <div className="text-[8px] text-slate-400 font-mono">
                    {activeData.lakmusBiruColor === '#ef4444' ? 'Sifat Asam' : 'Basa / Netral'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real Classroom Hazard Card */}
          <div
            className={`rounded-xl p-2 border flex items-start gap-2 shadow-sm ${
              isAcid
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                : isNeutral
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
            }`}
          >
            {isAcid ? (
              <ShieldAlert size={18} className="shrink-0 text-rose-400 mt-0.5" />
            ) : isNeutral ? (
              <Droplets size={18} className="shrink-0 text-emerald-400 mt-0.5" />
            ) : (
              <AlertTriangle size={18} className="shrink-0 text-indigo-400 mt-0.5" />
            )}
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <span>{activeData.hazardBadge}</span>
              </div>
              <p className="text-[10.5px] leading-snug mt-0.5 font-medium text-slate-200">
                {activeData.hazardNote}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (7 Cols): Dynamic Lab Beaker & Molecular Ion Simulation */}
        <div className="sm:col-span-7 h-full flex flex-col justify-between bg-slate-950/70 rounded-xl border border-slate-800 p-2.5 relative overflow-hidden">
          {/* Beaker Header: Ion Balance Metric */}
          <div className="flex items-center justify-between text-[10px] font-mono z-10">
            <div className="flex items-center gap-1 text-rose-400 font-bold">
              <Atom size={12} />
              <span>Ion H⁺ (Asam): {activeData.hIonCount} unit</span>
            </div>
            <div className="flex items-center gap-1 text-sky-400 font-bold">
              <Atom size={12} />
              <span>Ion OH⁻ (Basa): {activeData.ohIonCount} unit</span>
            </div>
          </div>

          {/* SVG Animated Beaker Stage */}
          <div className="relative w-full h-[120px] sm:h-[135px] flex items-center justify-center my-1">
            <svg
              viewBox="0 0 340 180"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full max-h-[140px]"
            >
              <defs>
                <style>{`
                  @keyframes ionDriftA {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-8px) translateX(5px); }
                  }
                  @keyframes ionDriftB {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(6px) translateX(-6px); }
                  }
                  @keyframes bubbleRise {
                    0% { transform: translateY(20px); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: translateY(-40px); opacity: 0; }
                  }
                  .ion-anim-a { animation: ionDriftA 3.5s ease-in-out infinite; }
                  .ion-anim-b { animation: ionDriftB 4s ease-in-out infinite; }
                  .bubble-rise { animation: bubbleRise 2s linear infinite; }
                `}</style>

                {/* Liquid Fill Gradient */}
                <linearGradient id="beakerFluidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={activeData.color} stopOpacity="0.85" />
                  <stop offset="100%" stopColor={activeData.color} stopOpacity="0.45" />
                </linearGradient>

                {/* Glass Beaker Wall Gradient */}
                <linearGradient id="glassWall" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="15%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="85%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Glass Beaker Contour (Erlenmeyer / Cylinder Hybrid) */}
              <rect
                x="80"
                y="20"
                width="180"
                height="145"
                rx="18"
                fill="url(#glassWall)"
                stroke="#64748b"
                strokeWidth="2.5"
              />

              {/* Graduation Volume Marks */}
              <line x1="85" y1="50" x2="105" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="110" y="53" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                300 ml
              </text>
              <line x1="85" y1="80" x2="100" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="105" y="83" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                200 ml
              </text>
              <line x1="85" y1="110" x2="105" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="110" y="113" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                100 ml
              </text>

              {/* Fluid Solution Fill with Meniscus */}
              <path
                d="M 83 60 Q 170 65 257 60 L 257 148 Q 257 162 242 162 L 98 162 Q 83 162 83 148 Z"
                fill="url(#beakerFluidGrad)"
                className="transition-all duration-500"
              />

              {/* Neutral Water Center Molecule if pH 7 */}
              {isNeutral && (
                <g transform="translate(170, 110)">
                  <circle r="18" fill="#10b981" fillOpacity="0.3" stroke="#34d399" strokeWidth="1.5" />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ecfdf5"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    H₂O
                  </text>
                </g>
              )}

              {/* Floating H+ Acid Ions (Red Particles) */}
              {Array.from({ length: Math.min(activeData.hIonCount, 12) }).map((_, i) => {
                const px = 100 + ((i * 26) % 135);
                const py = 75 + ((i * 17) % 70);
                const isEven = i % 2 === 0;
                return (
                  <g
                    key={`h-ion-${i}`}
                    transform={`translate(${px}, ${py})`}
                    className={isEven ? 'ion-anim-a' : 'ion-anim-b'}
                  >
                    <circle r="8.5" fill="#ef4444" fillOpacity="0.85" stroke="#fecaca" strokeWidth="1" />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      H⁺
                    </text>
                  </g>
                );
              })}

              {/* Floating OH- Base Ions (Blue Particles) */}
              {Array.from({ length: Math.min(activeData.ohIonCount, 12) }).map((_, i) => {
                const px = 115 + ((i * 24 + 12) % 130);
                const py = 80 + ((i * 19 + 8) % 65);
                const isEven = i % 2 === 0;
                return (
                  <g
                    key={`oh-ion-${i}`}
                    transform={`translate(${px}, ${py})`}
                    className={isEven ? 'ion-anim-b' : 'ion-anim-a'}
                  >
                    <circle r="9" fill="#3b82f6" fillOpacity="0.85" stroke="#bfdbfe" strokeWidth="1" />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontSize="7.5"
                      fontWeight="bold"
                    >
                      OH⁻
                    </text>
                  </g>
                );
              })}

              {/* Digital pH Sensor Electrode Dipping into Solution */}
              <g transform="translate(205, 10)">
                {/* Cable to meter */}
                <path d="M 12 0 Q 25 -8 42 2" stroke="#475569" strokeWidth="2.5" fill="none" />
                {/* Probe Handle */}
                <rect x="5" y="0" width="14" height="42" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                {/* Indicator LED on Probe */}
                <circle cx="12" cy="10" r="2.5" fill={activeData.color} />
                {/* Glass Shaft Dipping into Liquid */}
                <rect x="8" y="42" width="8" height="60" rx="2" fill="#94a3b8" opacity="0.6" stroke="#cbd5e1" strokeWidth="1" />
                {/* Glass Bulb Tip with reference junction */}
                <circle cx="12" cy="102" r="6.5" fill={activeData.color} fillOpacity="0.4" stroke="#ffffff" strokeWidth="1.2" />
                {/* Digital Readout Tag */}
                <rect x="25" y="14" width="56" height="18" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
                <text x="53" y="26" textAnchor="middle" dominantBaseline="central" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  pH {currentPh}.0
                </text>
              </g>

              {/* Neutralization reaction bubbles */}
              {isNeutralizing && (
                <g className="bubble-rise">
                  <circle cx="150" cy="120" r="3" fill="#ffffff" opacity="0.8" />
                  <circle cx="180" cy="130" r="4.5" fill="#ffffff" opacity="0.7" />
                  <circle cx="200" cy="110" r="2.5" fill="#ffffff" opacity="0.9" />
                </g>
              )}
            </svg>

            {/* In-Beaker Mechanism Badge */}
            <div className="absolute bottom-1 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-700/80 text-[9.5px] font-bold text-slate-300">
              {isAcid && '🚨 Kelebihan ion H⁺ ➔ Bersifat Asam'}
              {isNeutral && '✅ Ion H⁺ seimbang dengan OH⁻ ➔ Netral'}
              {isBase && '🔵 Kelebihan ion OH⁻ ➔ Bersifat Basa'}
            </div>
          </div>

          {/* Interactive Titration Action Controls */}
          <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-800 z-10">
            {isAcid ? (
              <button
                type="button"
                onClick={handleNeutralizeAction}
                disabled={isNeutralizing}
                className="w-full py-1.5 px-3 rounded-lg font-black text-[11px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400 shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-300 animate-spin" />
                <span>
                  {isNeutralizing ? 'Sedang Titrasi Netralisasi...' : '💊 Beri Obat Maag (Netralkan ke pH 7)'}
                </span>
              </button>
            ) : isBase ? (
              <button
                type="button"
                onClick={handleNeutralizeAction}
                disabled={isNeutralizing}
                className="w-full py-1.5 px-3 rounded-lg font-black text-[11px] bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white border border-rose-400 shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Droplets size={14} className="text-white" />
                <span>
                  {isNeutralizing ? 'Sedang Titrasi Netralisasi...' : '🍋 Teteskan Asam (Netralkan ke pH 7)'}
                </span>
              </button>
            ) : (
              <div
                className={`w-full py-1 px-2.5 rounded-lg font-bold text-[10.5px] bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-center flex items-center justify-center gap-1.5 ${
                  neutralizeSuccess ? 'ring-2 ring-emerald-400 animate-pulse' : ''
                }`}
              >
                <Sparkles size={13} className="text-emerald-400" />
                <span>
                  {neutralizeSuccess ? '🎉 Netralisasi Sempurna: ' : ''}Reaksi Netralisasi: H⁺ + OH⁻ ➔ H₂O (Air Murni) + Garam
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM DOCK: RESPONSIVE HORIZONTAL pH 0-14 SELECTOR ── */}
      <div className="bg-slate-900/95 border border-teal-500/30 rounded-xl p-1.5 sm:p-2 shrink-0 z-10 shadow-lg">
        {/* Spectrum Range Legend */}
        <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider mb-1 px-1">
          <span className="text-rose-400 flex items-center gap-1">
            ◀ ASAM KUAT (0 - 2)
          </span>
          <span className="text-amber-400">ASAM LEMAH (3 - 6)</span>
          <span className="text-emerald-400 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/40">
            NETRAL (7)
          </span>
          <span className="text-sky-400">BASA LEMAH (8 - 11)</span>
          <span className="text-purple-400 flex items-center gap-1">
            BASA KUAT (12 - 14) ▶
          </span>
        </div>

        {/* 15 Horizontal Grid Chips - Explicit Inline Style Grid to Avoid Tailwind Missing Class Fallback */}
        <div
          className="w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(15, minmax(0, 1fr))',
            gap: '3px',
          }}
        >
          {PH_MASTER_DATA.map((item) => {
            const isSelected = currentPh === item.ph;
            return (
              <button
                key={`ph-chip-${item.ph}`}
                type="button"
                onClick={() => handleSelectPh(item.ph)}
                style={{
                  backgroundColor: item.color,
                }}
                className={`h-7 sm:h-8.5 rounded-lg flex flex-col items-center justify-center text-slate-950 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'ring-2 sm:ring-[3px] ring-white scale-110 -translate-y-1 z-30 shadow-[0_0_14px_white]'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                title={`pH ${item.ph}: ${item.substanceName} (${item.categoryLabel})`}
              >
                <span className="text-[10px] sm:text-[11px] font-black leading-none drop-shadow-sm">
                  {item.ph}
                </span>
                <span className="text-[7px] font-extrabold leading-none opacity-90 hidden sm:block truncate max-w-[90%]">
                  {item.ph === 7 ? 'Air' : item.ph === 1 ? 'HCl' : item.ph === 3 ? 'Cuka' : item.ph === 10 ? 'Maag' : item.ph === 12 ? 'Sabun' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
