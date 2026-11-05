import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Lightbulb, ChevronRight, CheckCircle2, XCircle, Shield } from 'lucide-react';
import { sound } from '@/lib/sound';
import { GameStageShell, GameVictoryModal } from '@/components/game-shell';
import { ChessPieceSvg } from './ChessPieces';
import { CHESS_PUZZLES, ChessPuzzle, BoardPiece } from './puzzles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ChessPuzzleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState<number>(0);
  const [pieces, setPieces] = useState<BoardPiece[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<{ from: { col: number; row: number }; to: { col: number; row: number } } | null>(null);
  const [incorrectMoveSquare, setIncorrectMoveSquare] = useState<{ col: number; row: number } | null>(null);
  const [puzzleStatus, setPuzzleStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isCompletedAll, setIsCompletedAll] = useState<boolean>(false);
  const [solvedCount, setSolvedCount] = useState<number>(0);

  // Dragging state
  const [draggingPieceId, setDraggingPieceId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement | null>(null);

  const puzzle: ChessPuzzle = CHESS_PUZZLES[currentPuzzleIdx] || CHESS_PUZZLES[0];

  // Inisialisasi puzzle saat modal dibuka atau index berpindah
  useEffect(() => {
    if (isOpen) {
      loadPuzzle(currentPuzzleIdx);
    }
  }, [isOpen, currentPuzzleIdx]);

  const loadPuzzle = (idx: number) => {
    const targetPuzzle = CHESS_PUZZLES[idx];
    if (!targetPuzzle) return;
    setPieces(JSON.parse(JSON.stringify(targetPuzzle.initialPieces)));
    setSelectedPieceId(null);
    setLastMove(null);
    setIncorrectMoveSquare(null);
    setPuzzleStatus('idle');
    setFeedbackText(targetPuzzle.objective);
    setShowHint(false);
  };

  const handleResetPuzzle = () => {
    sound.playClick();
    loadPuzzle(currentPuzzleIdx);
  };

  // Kalkulasi petak valid dasar (untuk visualisasi dots & tap-to-move)
  const getLegalMovesForPiece = (piece: BoardPiece): Array<{ col: number; row: number }> => {
    // Pada mode puzzle edukatif, tampilkan petak solusi + beberapa langkah logis di sekitar
    const moves: Array<{ col: number; row: number }> = [];

    // Jika bidak ini adalah bidak solusi, selalu sertakan target solusi
    if (piece.col === puzzle.solution.from.col && piece.row === puzzle.solution.from.row) {
      moves.push({ col: puzzle.solution.to.col, row: puzzle.solution.to.row });
    }

    // Tambahkan langkah gerak alami bidak catur standar
    if (piece.type === 'q') {
      // Ratu: garis lurus dan diagonal
      [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
          if (dx === 0 && dy === 0) return;
          for (let step = 1; step <= 7; step++) {
            const c = piece.col + dx * step;
            const r = piece.row + dy * step;
            if (c >= 0 && c <= 7 && r >= 0 && r <= 7) {
              moves.push({ col: c, row: r });
              // Jika ada bidak di petak ini, hentikan garis
              if (pieces.some(p => p.col === c && p.row === r)) break;
            }
          }
        });
      });
    } else if (piece.type === 'n') {
      // Kuda: pola L
      const knightOffsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1],
      ];
      knightOffsets.forEach(([dx, dy]) => {
        const c = piece.col + dx;
        const r = piece.row + dy;
        if (c >= 0 && c <= 7 && r >= 0 && r <= 7) {
          // Jangan makan bidak sendiri
          const occ = pieces.find(p => p.col === c && p.row === r);
          if (!occ || occ.color !== piece.color) {
            moves.push({ col: c, row: r });
          }
        }
      });
    } else if (piece.type === 'r') {
      // Benteng: lurus
      [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dy]) => {
        for (let step = 1; step <= 7; step++) {
          const c = piece.col + dx * step;
          const r = piece.row + dy * step;
          if (c >= 0 && c <= 7 && r >= 0 && r <= 7) {
            moves.push({ col: c, row: r });
            if (pieces.some(p => p.col === c && p.row === r)) break;
          }
        }
      });
    } else if (piece.type === 'b') {
      // Gajah: diagonal
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dx, dy]) => {
        for (let step = 1; step <= 7; step++) {
          const c = piece.col + dx * step;
          const r = piece.row + dy * step;
          if (c >= 0 && c <= 7 && r >= 0 && r <= 7) {
            moves.push({ col: c, row: r });
            if (pieces.some(p => p.col === c && p.row === r)) break;
          }
        }
      });
    }

    return moves;
  };

  const selectedPiece = pieces.find(p => p.id === selectedPieceId);
  const legalMoves = selectedPiece && selectedPiece.color === puzzle.turn ? getLegalMovesForPiece(selectedPiece) : [];

  // Eksekusi langkah
  const executeMove = (fromCol: number, fromRow: number, toCol: number, toRow: number) => {
    const isCorrect =
      fromCol === puzzle.solution.from.col &&
      fromRow === puzzle.solution.from.row &&
      toCol === puzzle.solution.to.col &&
      toRow === puzzle.solution.to.row;

    // Catat last move
    setLastMove({ from: { col: fromCol, row: fromRow }, to: { col: toCol, row: toRow } });

    // Cek apakah makan bidak
    const capturedIndex = pieces.findIndex(p => p.col === toCol && p.row === toRow);

    // Update posisi bidak
    setPieces(prev =>
      prev
        .filter((_, idx) => idx !== capturedIndex)
        .map(p => (p.col === fromCol && p.row === fromRow ? { ...p, col: toCol, row: toRow } : p))
    );

    setSelectedPieceId(null);

    if (isCorrect) {
      if (capturedIndex >= 0) sound.playChessCapture();
      else sound.playChessMove();

      // Jika ada respon balasan bot (lawan)
      if (puzzle.botResponse) {
        setTimeout(() => {
          const botResp = puzzle.botResponse!;
          sound.playChessMove();
          setPieces(curr =>
            curr.map(p =>
              p.col === botResp.from.col && p.row === botResp.from.row
                ? { ...p, col: botResp.to.col, row: botResp.to.row }
                : p
            )
          );
          setLastMove({ from: botResp.from, to: botResp.to });
        }, 400);
      }

      setPuzzleStatus('correct');
      setIncorrectMoveSquare(null);
      setFeedbackText(puzzle.explanation);
      setSolvedCount(prev => prev + 1);
      setTimeout(() => sound.playChessSuccess(), 100);
    } else {
      // Langkah salah: Persis seperti screenshot Chess.com user!
      sound.playChessError();
      setIncorrectMoveSquare({ col: toCol, row: toRow });
      setPuzzleStatus('incorrect');
      setFeedbackText(puzzle.incorrectFeedback);
    }
  };

  // Handler klik pada petak papan (Tap-to-Move)
  const handleSquareClick = (col: number, row: number) => {
    if (puzzleStatus === 'correct') return;

    const clickedPiece = pieces.find(p => p.col === col && p.row === row);

    // Jika sudah ada bidak terpilih dan kita mengklik petak tujuan
    if (selectedPiece && (selectedPiece.col !== col || selectedPiece.row !== row)) {
      executeMove(selectedPiece.col, selectedPiece.row, col, row);
      return;
    }

    // Jika mengklik bidak sendiri, seleksi bidak tersebut
    if (clickedPiece && clickedPiece.color === puzzle.turn) {
      sound.playClick();
      setSelectedPieceId(clickedPiece.id);
      setIncorrectMoveSquare(null);
      return;
    }

    // Jika mengklik sembarang petak kosong tanpa bidak terpilih
    setSelectedPieceId(null);
  };

  // Handler Drag and Drop (Pointer Events untuk Mouse + Layar Sentuh)
  const handlePointerDownPiece = (e: React.PointerEvent, piece: BoardPiece) => {
    if (puzzleStatus === 'correct' || piece.color !== puzzle.turn) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setSelectedPieceId(piece.id);
    setDraggingPieceId(piece.id);
    setIncorrectMoveSquare(null);
    setDragOffset({ x: 0, y: 0 });
    sound.playClick();
  };

  const handlePointerMovePiece = (e: React.PointerEvent) => {
    if (!draggingPieceId || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const squareSize = rect.width / 8;
    const piece = pieces.find(p => p.id === draggingPieceId);
    if (!piece) return;

    // Hitung offset piksel dari posisi petak awal
    const initialPixelX = piece.col * squareSize + squareSize / 2;
    const initialPixelY = piece.row * squareSize + squareSize / 2;
    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;

    setDragOffset({
      x: currentMouseX - initialPixelX,
      y: currentMouseY - initialPixelY,
    });
  };

  const handlePointerUpPiece = (e: React.PointerEvent) => {
    if (!draggingPieceId || !boardRef.current) {
      setDraggingPieceId(null);
      return;
    }

    const rect = boardRef.current.getBoundingClientRect();
    const squareSize = rect.width / 8;
    const piece = pieces.find(p => p.id === draggingPieceId);

    if (piece) {
      const dropPixelX = e.clientX - rect.left;
      const dropPixelY = e.clientY - rect.top;
      const targetCol = Math.max(0, Math.min(7, Math.floor(dropPixelX / squareSize)));
      const targetRow = Math.max(0, Math.min(7, Math.floor(dropPixelY / squareSize)));

      // Jika berpindah petak, jalankan langkah
      if (targetCol !== piece.col || targetRow !== piece.row) {
        executeMove(piece.col, piece.row, targetCol, targetRow);
      }
    }

    setDraggingPieceId(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleNextPuzzle = () => {
    sound.playClick();
    if (currentPuzzleIdx < CHESS_PUZZLES.length - 1) {
      setCurrentPuzzleIdx(prev => prev + 1);
    } else {
      setIsCompletedAll(true);
    }
  };

  if (!isOpen) return null;

  return (
    <GameStageShell
      isOpen={isOpen}
      onClose={onClose}
      title="Teka-Teki Catur & Taktik Logika"
      subtitle={`Taktik ${currentPuzzleIdx + 1} dari ${CHESS_PUZZLES.length}: ${puzzle.title} • Asah Logika & Geometri`}
      icon="♟️"
      themeColor="emerald"
      soundOn={soundOn}
      onToggleSound={() => setSoundOn(sound.toggleSound())}
      onReset={handleResetPuzzle}
      resetTooltip="Mulai Ulang Taktik Ini"
      contentClassName="flex-1 min-h-0 p-3 sm:p-5 flex flex-col lg:flex-row gap-4 sm:gap-6 overflow-hidden relative"
    >
      {/* ARENA PAPAN CATUR 8x8 BERBASIS ARSITEKTUR CHESS.COM */}
      <div className="flex-1 min-h-0 bg-slate-900/5 p-2 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-inner flex flex-col items-center justify-center overflow-hidden">
        {/* Header Indikator Giliran */}
        <div className="w-full max-w-[min(calc(100vh-170px),580px)] flex items-center justify-between mb-2 px-1 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white border border-slate-300 shadow-sm inline-block"></span>
            <span className="text-xs font-bold text-slate-700">Giliran Putih Melangkah</span>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
            {puzzle.difficulty}
          </span>
        </div>

        {/* CONTAINER PAPAN 8x8 UTAMA */}
        <div
          ref={boardRef}
          className="relative aspect-square w-full max-w-[min(calc(100vh-170px),580px)] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-4 border-[#5b783d] select-none touch-none"
        >
          {/* LAYER 1: STATIC BOARD GRID (8x8) */}
          <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
            {Array.from({ length: 64 }, (_, i) => {
              const col = i % 8;
              const row = Math.floor(i / 8);
              const isLight = (col + row) % 2 === 0;
              const fileLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][col];
              const rankNumber = 8 - row;

              return (
                <div
                  key={`sq-${col}-${row}`}
                  onClick={() => handleSquareClick(col, row)}
                  className={`relative w-full h-full flex flex-col justify-between p-1 transition-colors cursor-pointer ${
                    isLight ? 'bg-[#edeed1]' : 'bg-[#779956]'
                  }`}
                >
                  {/* Label Koordinat Angka (Rank) di kolom paling kiri */}
                  {col === 0 && (
                    <span
                      className={`text-[9px] sm:text-[11px] font-black leading-none pointer-events-none ${
                        isLight ? 'text-[#779956]' : 'text-[#edeed1]'
                      }`}
                    >
                      {rankNumber}
                    </span>
                  )}

                  {/* Label Koordinat Huruf (File) di baris paling bawah */}
                  {row === 7 && (
                    <span
                      className={`text-[9px] sm:text-[11px] font-black leading-none self-end mt-auto pointer-events-none ${
                        isLight ? 'text-[#779956]' : 'text-[#edeed1]'
                      }`}
                    >
                      {fileLetter}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* LAYER 2: HIGHLIGHTS & ANNOTATIONS (pointer-events: none) */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Last Move Origin & Destination */}
            {lastMove && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    left: `${lastMove.from.col * 12.5}%`,
                    top: `${lastMove.from.row * 12.5}%`,
                    width: '12.5%',
                    height: '12.5%',
                  }}
                  className="bg-yellow-300/40"
                />
                <div
                  style={{
                    position: 'absolute',
                    left: `${lastMove.to.col * 12.5}%`,
                    top: `${lastMove.to.row * 12.5}%`,
                    width: '12.5%',
                    height: '12.5%',
                  }}
                  className="bg-yellow-300/40"
                />
              </>
            )}

            {/* Selected Square Highlight */}
            {selectedPiece && (
              <div
                style={{
                  position: 'absolute',
                  left: `${selectedPiece.col * 12.5}%`,
                  top: `${selectedPiece.row * 12.5}%`,
                  width: '12.5%',
                  height: '12.5%',
                }}
                className="bg-blue-400/40 border-2 border-blue-500/80"
              />
            )}

            {/* Valid Move Dots */}
            {legalMoves.map((m, idx) => {
              const isOccupied = pieces.some(p => p.col === m.col && p.row === m.row);
              return (
                <div
                  key={`dot-${idx}`}
                  style={{
                    position: 'absolute',
                    left: `${m.col * 12.5}%`,
                    top: `${m.row * 12.5}%`,
                    width: '12.5%',
                    height: '12.5%',
                  }}
                  className="flex items-center justify-center"
                >
                  {isOccupied ? (
                    <div className="w-full h-full rounded-full border-4 border-slate-900/25 scale-90" />
                  ) : (
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-900/25" />
                  )}
                </div>
              );
            })}

            {/* Incorrect Move Highlight (Merah Transparan, Seperti Chess.com) */}
            {incorrectMoveSquare && (
              <div
                style={{
                  position: 'absolute',
                  left: `${incorrectMoveSquare.col * 12.5}%`,
                  top: `${incorrectMoveSquare.row * 12.5}%`,
                  width: '12.5%',
                  height: '12.5%',
                }}
                className="bg-rose-500/40"
              />
            )}
          </div>

          {/* LAYER 3: PIECE LAYER (GPU-Accelerated translate3d) */}
          <div className="absolute inset-0 z-20">
            {pieces.map(piece => {
              const isDragging = draggingPieceId === piece.id;
              const isSelected = selectedPieceId === piece.id;

              // Transform style: jika dragging ikuti pixel offset, jika normal pakai percentage GPU translation
              const transformStyle = isDragging
                ? `translate3d(calc(${piece.col * 100}% + ${dragOffset.x}px), calc(${piece.row * 100}% + ${dragOffset.y}px), 0) scale(1.15)`
                : `translate3d(${piece.col * 100}%, ${piece.row * 100}%, 0)`;

              return (
                <div
                  key={piece.id}
                  onPointerDown={e => handlePointerDownPiece(e, piece)}
                  onPointerMove={handlePointerMovePiece}
                  onPointerUp={handlePointerUpPiece}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '12.5%',
                    height: '12.5%',
                    transform: transformStyle,
                    transition: isDragging ? 'none' : 'transform 180ms cubic-bezier(0.2, 0, 0, 1)',
                    willChange: 'transform',
                    zIndex: isDragging ? 50 : isSelected ? 30 : 20,
                  }}
                  className="flex items-center justify-center p-1 sm:p-1.5 cursor-grab active:cursor-grabbing"
                >
                  <ChessPieceSvg type={piece.type} color={piece.color} />
                </div>
              );
            })}
          </div>

          {/* LAYER 4: SVG BADGES & ERROR ICONS (Identik dengan Screenshot Chess.com) */}
          <div className="absolute inset-0 pointer-events-none z-40">
            {/* Red (X) Badge on Incorrect Move */}
            {incorrectMoveSquare && (
              <div
                style={{
                  position: 'absolute',
                  left: `${incorrectMoveSquare.col * 12.5 + 8}%`,
                  top: `${incorrectMoveSquare.row * 12.5 + 1}%`,
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs shadow-lg ring-2 ring-white animate-bounce"
              >
                ✕
              </div>
            )}

            {/* Green (✓) Badge on Correct Move */}
            {puzzleStatus === 'correct' && (
              <div
                style={{
                  position: 'absolute',
                  left: `${puzzle.solution.to.col * 12.5 + 8}%`,
                  top: `${puzzle.solution.to.row * 12.5 + 1}%`,
                }}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-lg ring-2 ring-white"
              >
                ✓
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PANEL KONTROL & EDUKASI KANAN (GAYA CHESS.COM PUZZLES) */}
      <div className="w-full lg:w-96 flex flex-col justify-between space-y-4">
        {/* Header Puzzle & Badge Taktik */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Tema & Pola Berpikir
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">{puzzle.tacticName}</h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center text-lg font-black">
              ♟
            </div>
          </div>

          {/* Kotak Feedback Interaktif / Speech Bubble (Persis Seperti Screenshot Chess.com) */}
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
              puzzleStatus === 'correct'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : puzzleStatus === 'incorrect'
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-white border-slate-200 text-slate-800 shadow-sm'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {puzzleStatus === 'correct' ? (
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              ) : puzzleStatus === 'incorrect' ? (
                <XCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
              ) : (
                <Shield className="text-indigo-600 shrink-0 mt-0.5" size={20} />
              )}
              <div className="space-y-1">
                <span className="font-extrabold text-sm block">
                  {puzzleStatus === 'correct'
                    ? '🎉 Benar Sekali! Taktik Berhasil!'
                    : puzzleStatus === 'incorrect'
                    ? '❌ Incorrect (Langkah Belum Tepat)'
                    : 'Target Analisis Siswa'}
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                  {feedbackText}
                </p>
              </div>
            </div>
          </div>

          {/* Bantuan Petunjuk Taktik */}
          {showHint && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2">
              <Lightbulb className="text-amber-600 shrink-0 mt-0.5" size={16} />
              <div>
                <span className="font-bold block">Petunjuk Guru:</span>
                <span>{puzzle.hint}</span>
              </div>
            </div>
          )}

          {/* Tips Cara Interaksi */}
          <div className="text-[11px] text-slate-500 bg-slate-100/70 p-2.5 rounded-xl space-y-1">
            <span className="font-bold block text-slate-700">🎮 Cara Menggerakkan Bidak:</span>
            <span>• <strong>Drag & Drop:</strong> Sentuh atau tahan bidak lalu seret ke petak tujuan.</span><br />
            <span>• <strong>Click-to-Move:</strong> Klik bidak (titik bantuan akan muncul), lalu klik petak tujuan.</span>
          </div>
        </div>

        {/* Action Buttons Bawah */}
        <div className="flex items-center gap-3 pt-2">
          {/* Tombol Ulangi (Merah jika Salah, Seperti Chess.com) */}
          <button
            onClick={handleResetPuzzle}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-sm ${
              puzzleStatus === 'incorrect'
                ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/50'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
            }`}
            title="Mulai Ulang Taktik Ini"
          >
            <RotateCcw size={16} />
            <span>{puzzleStatus === 'incorrect' ? 'Coba Lagi' : 'Reset'}</span>
          </button>

          {/* Tombol Petunjuk */}
          <button
            onClick={() => {
              sound.playClick();
              setShowHint(prev => !prev);
            }}
            className="py-3 px-4 rounded-xl font-bold text-sm bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center gap-1.5 cursor-pointer transition shadow-sm"
            title="Buka Petunjuk Taktik"
          >
            <Lightbulb size={16} />
            <span>Petunjuk</span>
          </button>

          {/* Tombol Lanjut ke Taktik Berikutnya */}
          {puzzleStatus === 'correct' && (
            <button
              onClick={handleNextPuzzle}
              className="flex-1 py-3 px-4 rounded-xl font-black text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 cursor-pointer transition shadow-md animate-pulse"
            >
              <span>{currentPuzzleIdx < CHESS_PUZZLES.length - 1 ? 'Lanjut' : 'Selesai'}</span>
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* SELEBRASI KEMENANGAN SAAT MENYELESAIKAN SEMUA PUZZLE */}
      {isCompletedAll && (
        <GameVictoryModal
          isOpen={isCompletedAll}
          title="Grandmaster Taktik Logika Cilik!"
          description={`Luar biasa! Seluruh ${CHESS_PUZZLES.length} tantangan taktik catur dan logika berhasil kamu selesaikan dengan sempurna.`}
          score={`${solvedCount} Taktik Selesai`}
          onPlayAgain={() => {
            setCurrentPuzzleIdx(0);
            setIsCompletedAll(false);
            setSolvedCount(0);
          }}
          onClose={onClose}
          themeColor="emerald"
        />
      )}
    </GameStageShell>
  );
};
