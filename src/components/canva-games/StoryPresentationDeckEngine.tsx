import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { GameStageShell, GameVictoryModal, GameStageTheme } from '@/components/game-shell';
import { 
  PresentationDeckData, 
  SlideDefinition,
  MiniGameBoardSlide,
  MiniGameChessSlide,
  MiniGameWordSlide
} from '@/types/presentation';
import { PRESENTATION_THEMES } from '@/lib/presentation-themes';
import { CanvaSequenceGame } from './CanvaSequenceGame';
import { CanvaMatchPairsGame } from './CanvaMatchPairsGame';
import { InteractiveFlashcards } from './InteractiveFlashcards';
import { 
  NarrativeHookSlide, 
  ConceptInfographicSlide, 
  StoryResolutionSlide, 
  ReflectionSparkSlide 
} from './slides';
import { EcosystemCanvasBackground } from './backgrounds/EcosystemCanvasBackground';
import { SpaceCanvasBackground } from './backgrounds/SpaceCanvasBackground';
import { progressService } from '@/business';

export interface StoryPresentationDeckEngineProps {
  isOpen: boolean;
  onClose: () => void;
  deck: PresentationDeckData;
  initialSlide?: number;
  onComplete?: () => void;
}

export const StoryPresentationDeckEngine: React.FC<StoryPresentationDeckEngineProps> = ({
  isOpen,
  onClose,
  deck,
  initialSlide = 1,
  onComplete,
}) => {
  // Derivasi total slide dinamis dari panjang array slides (fleksibel: 5, 7, 8, dsb.)
  const totalSlides = deck.slides.length > 0 ? deck.slides.length : 1;

  const [currentSlide, setCurrentSlide] = useState<number>(() => {
    return Math.max(1, Math.min(totalSlides, initialSlide));
  });
  const [soundOn, setSoundOn] = useState<boolean>(() => sound.isEnabled());
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [challengesState, setChallengesState] = useState<Record<string, boolean>>({});

  // Sinkronisasi jika deck atau initialSlide berubah
  useEffect(() => {
    setCurrentSlide(Math.max(1, Math.min(deck.slides.length, initialSlide)));
    setChallengesState({});
    setIsVictoryOpen(false);
  }, [deck, initialSlide]);

  const currentSlideIndex = Math.max(0, Math.min(totalSlides - 1, currentSlide - 1));
  const activeSlide: SlideDefinition = deck.slides[currentSlideIndex] || deck.slides[0];

  const themeTokens = PRESENTATION_THEMES[deck.themeColor] || PRESENTATION_THEMES.emerald;

  const isSpaceDeck =
    deck.gameId === 'ular-tangga-tatasurya' ||
    deck.themeColor === 'purple' ||
    deck.mentor?.name?.toLowerCase().includes('dirgantara');

  // Slide scene (narasi, infografis, resolusi, refleksi) mengisi seluruh kanvas sebagai scene game.
  const isSceneSlide =
    activeSlide?.type === 'narrative-intro' ||
    activeSlide?.type === 'concept-infographic' ||
    activeSlide?.type === 'story-resolution' ||
    activeSlide?.type === 'reflection-spark';

  const goToSlide = (slideNum: number) => {
    sound.playSlideTransition();
    const clamped = Math.max(1, Math.min(totalSlides, slideNum));
    setCurrentSlide(clamped);
    progressService.updateProgress(deck.gameId, { currentSlide: clamped, totalSlides }).catch(() => {});
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    } else {
      setIsVictoryOpen(true);
      progressService.updateProgress(deck.gameId, { isCompleted: true, currentSlide: totalSlides, score: 100 }).catch(() => {});
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  };

  const handleResetDeck = () => {
    sound.playClick();
    setCurrentSlide(1);
    setChallengesState({});
    setIsVictoryOpen(false);
  };

  const recordChallenge = (key: string, isSuccess: boolean) => {
    setChallengesState(prev => ({ ...prev, [key]: isSuccess }));
    if (isSuccess) {
      progressService.recordChallengeCompleted(deck.gameId, key).catch(() => {});
    }
  };

  // Keyboard navigation listener (ArrowRight / ArrowLeft / PageUp / PageDown)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika fokus sedang berada pada input atau textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide, totalSlides]);

  if (!isOpen) return null;

  // Render konten slide berdasarkan activeSlide.type
  const renderSlideContent = () => {
    if (!activeSlide) return null;

    switch (activeSlide.type) {
      case 'narrative-intro':
        return (
          <NarrativeHookSlide
            slide={activeSlide}
            mentor={deck.mentor}
            themeColor={deck.themeColor}
            onNext={handleNextSlide}
          />
        );

      case 'concept-infographic':
        return (
          <ConceptInfographicSlide
            slide={activeSlide}
            themeColor={deck.themeColor}
            gameId={deck.gameId}
            onNext={handleNextSlide}
          />
        );

      case 'mini-game-sequence':
        return (
          <div className="w-full h-full flex flex-col justify-center max-w-4xl mx-auto my-auto animate-in fade-in duration-300">
            <CanvaSequenceGame
              items={activeSlide.items}
              title={activeSlide.title}
              subtitle={activeSlide.subtitle}
              instructions={activeSlide.instruction}
              theme={deck.themeColor as any}
              onComplete={(isSuccess) => {
                const key = activeSlide.challengeKey || activeSlide.id;
                recordChallenge(key, isSuccess);
              }}
            />
          </div>
        );

      case 'mini-game-match':
        return (
          <div className="w-full h-full flex flex-col justify-center max-w-4xl mx-auto my-auto animate-in fade-in duration-300">
            <CanvaMatchPairsGame
              pairs={activeSlide.pairs}
              title={activeSlide.title}
              subtitle={activeSlide.subtitle}
              instructions={activeSlide.instruction}
              leftColumnHeader={activeSlide.columnALabel}
              rightColumnHeader={activeSlide.columnBLabel}
              theme={deck.themeColor as any}
              onComplete={(isSuccess) => {
                const key = activeSlide.challengeKey || activeSlide.id;
                recordChallenge(key, isSuccess);
              }}
            />
          </div>
        );

      case 'mini-game-flashcard':
        return (
          <div className="w-full h-full flex flex-col justify-center max-w-4xl mx-auto my-auto animate-in fade-in duration-300">
            <InteractiveFlashcards
              cards={activeSlide.cards}
              title={activeSlide.title}
              instructions={activeSlide.instruction}
              subtitle={activeSlide.subtitle}
              theme={deck.themeColor as any}
              onComplete={(mastered) => {
                const key = activeSlide.challengeKey || activeSlide.id;
                recordChallenge(key, mastered > 0);
              }}
            />
          </div>
        );

      case 'mini-game-board':
        return renderBoardSlide(activeSlide, deck.themeColor, (isDone) => {
          recordChallenge(activeSlide.challengeKey || activeSlide.id, isDone);
        });

      case 'mini-game-chess':
        return renderChessSlide(activeSlide, deck.themeColor, (isDone) => {
          recordChallenge(activeSlide.challengeKey || activeSlide.id, isDone);
        });

      case 'mini-game-word':
        return renderWordSlide(activeSlide, deck.themeColor, (isDone) => {
          recordChallenge(activeSlide.challengeKey || activeSlide.id, isDone);
        });

      case 'story-resolution':
        return (
          <StoryResolutionSlide
            slide={activeSlide}
            themeColor={deck.themeColor}
            challengesState={challengesState}
            onNext={handleNextSlide}
          />
        );

      case 'reflection-spark':
        return (
          <ReflectionSparkSlide
            slide={activeSlide}
            themeColor={deck.themeColor}
            onVictory={() => setIsVictoryOpen(true)}
          />
        );

      default:
        return (
          <div className="text-center my-auto p-8">
            <p className="text-slate-500 font-bold">Slide tipe tidak dikenal.</p>
          </div>
        );
    }
  };

  return (
    <GameStageShell
      isOpen={isOpen}
      onClose={onClose}
      title={deck.title}
      subtitle={`Slide ${currentSlide} dari ${totalSlides}: ${activeSlide.title || deck.subtitle}`}
      icon={deck.icon || deck.mentor.avatarEmoji || '📖'}
      themeColor={deck.themeColor}
      soundOn={soundOn}
      onToggleSound={() => setSoundOn(sound.toggleSound())}
      onReset={handleResetDeck}
      resetTooltip="Mulai Ulang dari Slide 1"
      contentClassName="flex-1 min-h-0 p-2 sm:p-4 flex flex-col justify-between overflow-hidden relative"
    >
      {/* ARENA SLIDE PRESENTASI DINAMIS: SINGLE UNIFIED CANVAS (STRICT NO-SCROLL NO-OVERFLOW) */}
      <div
        className={`flex-1 min-h-0 ${
          isSpaceDeck
            ? 'bg-gradient-to-b from-slate-950 via-indigo-950/80 to-purple-950/90 border-purple-500/30 shadow-2xl'
            : 'bg-gradient-to-b from-sky-50/50 via-emerald-50/30 to-slate-50/60 border-slate-200/90 shadow-md'
        } rounded-2xl sm:rounded-3xl border flex flex-col overflow-hidden relative ${
          isSceneSlide ? 'p-1.5 sm:p-2' : 'p-3 sm:p-4 md:p-6'
        }`}
      >
        {!isSceneSlide &&
          (isSpaceDeck ? (
            <SpaceCanvasBackground />
          ) : (
            <EcosystemCanvasBackground theme={deck.themeColor} />
          ))}
        <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col overflow-hidden">
          {renderSlideContent()}
        </div>
      </div>

      {/* FOOTER BAR NAVIGASI SLIDE PRESENTASI */}
      <div className="w-full flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200/80 px-2 shrink-0">
        {/* Tombol Slide Sebelumnya */}
        <button
          type="button"
          onClick={handlePrevSlide}
          disabled={currentSlide === 1}
          className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
        >
          <ChevronLeft size={16} />
          <span>Slide Sebelumnya</span>
        </button>

        {/* Indikator Titik Progress Slide Dinamis (Bervariasi per deck: 5 - 8+ slides) */}
        <div className="flex items-center gap-1.5 sm:gap-2 max-w-[50%] overflow-x-auto py-1">
          {deck.slides.map((s, idx) => {
            const slideNum = idx + 1;
            const isActive = currentSlide === slideNum;
            return (
              <button
                type="button"
                key={s.id || `slide-dot-${slideNum}`}
                onClick={() => goToSlide(slideNum)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  isActive ? `w-8 ${themeTokens.activeDot}` : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Buka Slide ${slideNum}: ${s.title}`}
              />
            );
          })}
        </div>

        {/* Tombol Slide Selanjutnya / Tutup Misi */}
        <button
          type="button"
          onClick={handleNextSlide}
          className={`py-2.5 px-5 rounded-xl ${themeTokens.btnPrimary} font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition`}
        >
          <span>{currentSlide === totalSlides ? 'Tutup Misi & Rayakan' : 'Slide Berikutnya'}</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* MODAL SELEBRASI KEMENANGAN AKHIR */}
      {isVictoryOpen && (
        <GameVictoryModal
          isOpen={isVictoryOpen}
          title={`Misi ${deck.title} Berhasil!`}
          description={
            <span>
              Seluruh kelas telah berhasil memecahkan tantangan dan menuntaskan ekspedisi pembelajaran bersama{' '}
              <strong>{deck.mentor.name}</strong>.
            </span>
          }
          score="100% Selesai"
          onPlayAgain={handleResetDeck}
          onClose={() => {
            setIsVictoryOpen(false);
            if (onComplete) onComplete();
            onClose();
          }}
          themeColor={deck.themeColor === 'amber' || deck.themeColor === 'rose' || deck.themeColor === 'indigo' || deck.themeColor === 'blue' ? 'orange' : (deck.themeColor as any)}
        />
      )}
    </GameStageShell>
  );
};

/**
 * Micro-renderer untuk Slide Stepping Board (type: 'mini-game-board')
 */
function renderBoardSlide(
  slide: MiniGameBoardSlide,
  themeColor: GameStageTheme,
  onComplete: (isDone: boolean) => void
) {
  return <BoardSlideEngine slide={slide} themeColor={themeColor} onComplete={onComplete} />;
}

const BoardSlideEngine: React.FC<{
  slide: MiniGameBoardSlide;
  themeColor: GameStageTheme;
  onComplete: (isDone: boolean) => void;
}> = ({ slide, themeColor, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isChoiceCorrect, setIsChoiceCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const themeTokens = PRESENTATION_THEMES[themeColor] || PRESENTATION_THEMES.emerald;
  const currentTile = slide.tiles[currentStepIndex] || slide.tiles[0];

  const handleSelectChoice = (choice: { id: string; isCorrect: boolean }) => {
    setSelectedChoiceId(choice.id);
    setIsChoiceCorrect(choice.isCorrect);

    if (choice.isCorrect) {
      sound.playCorrect();
      setTimeout(() => {
        if (currentStepIndex < slide.tiles.length - 1) {
          sound.playStep();
          setCurrentStepIndex(prev => prev + 1);
          setSelectedChoiceId(null);
          setIsChoiceCorrect(null);
        } else {
          sound.playLadderClimb();
          setIsFinished(true);
          onComplete(true);
        }
      }, 500);
    } else {
      sound.playWrong();
    }
  };

  const handleNextStep = () => {
    sound.playStep();
    if (currentStepIndex < slide.tiles.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedChoiceId(null);
      setIsChoiceCorrect(null);
    } else {
      sound.playLadderClimb();
      setIsFinished(true);
      onComplete(true);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentStepIndex(0);
    setSelectedChoiceId(null);
    setIsChoiceCorrect(null);
    setIsFinished(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto my-auto space-y-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{slide.title}</h2>
        {slide.subtitle && <p className="text-xs sm:text-sm text-slate-500 font-medium">{slide.subtitle}</p>}
      </div>

      {/* Stepping Trail Indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto">
        {slide.tiles.map((tile, idx) => {
          const isPassed = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div key={`tile-${idx}`} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all border-2 ${
                  isCurrent
                    ? `${themeTokens.activeDot} text-white shadow-md scale-110 border-white ring-2 ring-slate-300`
                    : isPassed
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                {tile.iconEmoji || idx + 1}
              </div>
              {idx < slide.tiles.length - 1 && (
                <div className={`h-1 w-4 sm:w-8 rounded-full ${isPassed ? 'bg-emerald-400' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Active Milestone Card */}
      {!isFinished && currentTile && (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-sm space-y-4 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Langkah {currentStepIndex + 1}: {currentTile.title}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {currentTile.eventType === 'goal' ? '🏁 Garis Akhir' : '📍 Titik Jejak'}
            </span>
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
            {currentTile.prompt}
          </p>

          {/* Interactive Choices if available */}
          {currentTile.choices && currentTile.choices.length > 0 ? (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-500">Pilih tindakan/jawaban yang tepat:</span>
              <div className="grid grid-cols-1 gap-2">
                {currentTile.choices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => handleSelectChoice(choice)}
                      className={`p-3 rounded-2xl text-left font-bold text-xs sm:text-sm border-2 transition flex items-center justify-between cursor-pointer ${
                        isSelected && choice.isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isSelected && !choice.isCorrect
                          ? 'bg-rose-100 border-rose-500 text-rose-950'
                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{choice.text}</span>
                      {isSelected && (
                        <span>{choice.isCorrect ? '✅' : '❌'}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleNextStep}
                className={`py-3 px-6 rounded-2xl ${themeTokens.btnPrimary} font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md`}
              >
                <span>{currentTile.action || 'Langkah Berikutnya'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {isChoiceCorrect === false && (
            <p className="text-xs text-rose-600 font-bold text-center">
              Pilihan belum tepat. Pikirkan kembali dan coba opsi lainnya!
            </p>
          )}
        </div>
      )}

      {isFinished && (
        <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3 max-w-md mx-auto">
          <div className="text-4xl">🏁</div>
          <h3 className="text-lg font-black text-emerald-950">Seluruh Langkah Tercapai!</h3>
          <p className="text-xs sm:text-sm text-emerald-800 font-medium">
            Misi stepping path telah tuntas dituntaskan seluruhnya.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-4 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center gap-1.5 mx-auto cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Mulai Ulang Jejak</span>
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Micro-renderer untuk Tactical Chess Logic Challenge (type: 'mini-game-chess')
 */
function renderChessSlide(
  slide: MiniGameChessSlide,
  themeColor: GameStageTheme,
  onComplete: (isDone: boolean) => void
) {
  return <ChessSlideEngine slide={slide} themeColor={themeColor} onComplete={onComplete} />;
}

const ChessSlideEngine: React.FC<{
  slide: MiniGameChessSlide;
  themeColor?: GameStageTheme;
  onComplete: (isDone: boolean) => void;
}> = ({ slide, onComplete }) => {
  const [selectedPiece, setSelectedPiece] = useState<{ col: number; row: number } | null>(null);
  const [solved, setSolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSquareClick = (col: number, row: number) => {
    if (solved) return;

    if (!selectedPiece) {
      // Cek apakah ada bidak di square ini
      const piece = slide.pieces.find(p => p.col === col && p.row === row && p.color === 'w');
      if (piece) {
        sound.playClick();
        setSelectedPiece({ col, row });
        setFeedback(null);
      }
    } else {
      // Mencoba langkah dari selectedPiece ke (col, row)
      const isCorrectMove =
        selectedPiece.col === slide.solutionMove.from.col &&
        selectedPiece.row === slide.solutionMove.from.row &&
        col === slide.solutionMove.to.col &&
        row === slide.solutionMove.to.row;

      if (isCorrectMove) {
        sound.playChessSuccess();
        setSolved(true);
        setFeedback(slide.explanation || 'Langkah taktis tepat sasaran!');
        setSelectedPiece(null);
        onComplete(true);
      } else {
        sound.playChessError();
        setFeedback('Langkah belum tepat. Coba perhatikan petak ancaman ganda!');
        setSelectedPiece(null);
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedPiece(null);
    setSolved(false);
    setFeedback(null);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto my-auto gap-6 sm:gap-8 animate-in fade-in duration-300">
      {/* Kolom Informasi Taktik */}
      <div className="flex-1 space-y-4 text-left max-w-md">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">{slide.title}</h2>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">🎯 Sasaran Taktik:</span>
          <p className="text-sm font-bold text-slate-800">{slide.objective}</p>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-2xl border text-xs sm:text-sm font-bold ${
              solved ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            {solved ? '🎉 ' : '⚠️ '}
            {feedback}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="py-2 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw size={14} />
            <span>Tata Ulang Bidak</span>
          </button>
        </div>
      </div>

      {/* Mini 8x8 Chessboard */}
      <div className="w-72 h-72 sm:w-80 sm:h-80 grid grid-cols-8 grid-rows-8 border-4 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {Array.from({ length: 64 }).map((_, idx) => {
          const col = idx % 8;
          const row = Math.floor(idx / 8);
          const isLight = (col + row) % 2 === 0;
          const piece = slide.pieces.find(p => p.col === col && p.row === row);
          const isSelected = selectedPiece?.col === col && selectedPiece?.row === row;

          return (
            <button
              key={`sq-${col}-${row}`}
              type="button"
              onClick={() => handleSquareClick(col, row)}
              className={`w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer transition select-none ${
                isSelected
                  ? 'bg-amber-300 ring-4 ring-amber-400 z-10'
                  : isLight
                  ? 'bg-amber-100 hover:bg-amber-200'
                  : 'bg-amber-800 hover:bg-amber-700 text-white'
              }`}
            >
              {piece && (
                <span>
                  {piece.type === 'knight' ? '♞' : piece.type === 'king' ? '♚' : piece.type === 'queen' ? '♛' : piece.type === 'rook' ? '♜' : '♟'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Micro-renderer untuk Word Puzzle Challenge (type: 'mini-game-word')
 */
function renderWordSlide(
  slide: MiniGameWordSlide,
  themeColor: GameStageTheme,
  onComplete: (isDone: boolean) => void
) {
  return <WordSlideEngine slide={slide} themeColor={themeColor} onComplete={onComplete} />;
}

const WordSlideEngine: React.FC<{
  slide: MiniGameWordSlide;
  themeColor?: GameStageTheme;
  onComplete: (isDone: boolean) => void;
}> = ({ slide, onComplete }) => {
  const [solved, setSolved] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = slide.options || [slide.word, 'Pilihan B', 'Pilihan C', 'Pilihan D'];

  const handleSelect = (opt: string) => {
    setSelectedOption(opt);
    if (opt.toLowerCase().trim() === slide.word.toLowerCase().trim()) {
      sound.playCorrect();
      setSolved(true);
      onComplete(true);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-2xl mx-auto my-auto space-y-5 animate-in fade-in duration-300">
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{slide.title}</h2>
        {slide.subtitle && <p className="text-xs sm:text-sm text-slate-500 font-medium">{slide.subtitle}</p>}
      </div>

      <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3 text-center">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">
          💡 Petunjuk Istilah
        </span>
        <p className="text-base sm:text-lg font-bold text-slate-800">{slide.clue}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, idx) => {
          const isCorrect = opt.toLowerCase().trim() === slide.word.toLowerCase().trim();
          const isSelected = selectedOption === opt;
          return (
            <button
              key={`opt-${idx}`}
              type="button"
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-2xl font-bold text-sm border-2 transition cursor-pointer text-left flex items-center justify-between ${
                solved && isCorrect
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                  : isSelected && !isCorrect
                  ? 'bg-rose-100 border-rose-500 text-rose-950'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span>{opt}</span>
              {solved && isCorrect && <CheckCircle2 size={18} className="text-emerald-700" />}
            </button>
          );
        })}
      </div>

      {solved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 leading-relaxed font-medium">
          <strong>Fakta PUEBI/Bahasa:</strong> {slide.explanation}
        </div>
      )}
    </div>
  );
};
