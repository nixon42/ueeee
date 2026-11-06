import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { CategoryPills } from '@/components/dashboard/CategoryPills';
import { FeaturedBanner } from '@/components/dashboard/FeaturedBanner';
import { GameGrid } from '@/components/dashboard/GameGrid';
import { UlarTanggaModal } from '@/games/ular-tangga/UlarTanggaModal';
import { PointAndClickModal } from '@/games/point-and-click/PointAndClickModal';
import { PuzzleModal } from '@/games/puzzle/PuzzleModal';
import { ChessPuzzleModal } from '@/games/chess-puzzle';
import { InteractiveStoryPresentationModal } from '@/components/canva-games';
import { TeacherSheetModal } from '@/components/modals/TeacherSheetModal';
import { PrologModal } from '@/components/dashboard/PrologModal';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { GAMES_CATALOG } from '@/data/games-catalog';
import { GameItem, SubjectCategory, GradeLevel } from '@/types/game';
import { getPresentationDeckByGameId } from '@/data/presentation-decks';
import { PresentationDeckData } from '@/types/presentation';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import { LogoIcon } from '@/components/common/Logo';
import { isGameMatchingSearch } from '@/lib/search';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Semua Kelas');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Favorites & History from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ueeee_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const [recentGameIds, setRecentGameIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ueeee_recent') || '[]');
    } catch {
      return [];
    }
  });

  // Game Modals state
  const [isUlarTanggaOpen, setIsUlarTanggaOpen] = useState<boolean>(false);
  const [activeUlarTanggaSubject, setActiveUlarTanggaSubject] = useState<string>('sains');
  const [isPointAndClickOpen, setIsPointAndClickOpen] = useState<boolean>(false);
  const [activePointAndClickScene, setActivePointAndClickScene] = useState<string>('lab-sains');
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [isChessOpen, setIsChessOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [activePresentationDeck, setActivePresentationDeck] = useState<PresentationDeckData | null>(null);
  const [presentationInitialSlide, setPresentationInitialSlide] = useState<number>(1);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [activePrologGame, setActivePrologGame] = useState<GameItem | null>(null);

  // Read URL query parameter for deep linking (?game=...&mode=...&slide=... or ?prolog=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get('game');
    const modeParam = params.get('mode') === 'arcade' ? 'arcade' : 'presentation';
    const slideParam = parseInt(params.get('slide') || '1', 10);

    if (gameParam) {
      const match = GAMES_CATALOG.find(g => g.id === gameParam);
      if (match) {
        launchGame(match, modeParam, isNaN(slideParam) ? 1 : slideParam);
      }
    }
    const prologParam = params.get('prolog');
    if (prologParam) {
      const match = GAMES_CATALOG.find(g => g.id === prologParam);
      if (match) {
        setActivePrologGame(match);
      }
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      localStorage.setItem('ueeee_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Record recent play
  const recordRecentPlay = (gameId: string) => {
    setRecentGameIds(prev => {
      const filtered = prev.filter(id => id !== gameId);
      const updated = [gameId, ...filtered].slice(0, 3);
      localStorage.setItem('ueeee_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const launchGame = (
    game: GameItem,
    mode: 'presentation' | 'arcade' = 'presentation',
    initialSlide: number = 1
  ) => {
    recordRecentPlay(game.id);

    // Update query string cleanly without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('game', game.id);
    if (mode === 'arcade') {
      url.searchParams.set('mode', 'arcade');
    } else {
      url.searchParams.delete('mode');
    }
    if (initialSlide > 1) {
      url.searchParams.set('slide', initialSlide.toString());
    } else {
      url.searchParams.delete('slide');
    }
    window.history.replaceState({}, '', url.toString());

    // Primary: Launch Refined Story Presentation Deck
    if (mode === 'presentation') {
      const deck = getPresentationDeckByGameId(game.id);
      if (deck) {
        setActivePresentationDeck(deck);
        setPresentationInitialSlide(initialSlide);
        setIsPresentationOpen(true);
        return;
      }
    }

    // Secondary: Legacy Arcade Mode Fallback
    if (game.id === 'catur-taktik-logika' || game.id.includes('catur') || game.id.includes('chess')) {
      setIsChessOpen(true);
    } else if (game.type === 'ular-tangga') {
      if (game.id.includes('matematika')) setActiveUlarTanggaSubject('matematika');
      else if (game.id.includes('sejarah')) setActiveUlarTanggaSubject('sejarah');
      else setActiveUlarTanggaSubject('sains');
      setIsUlarTanggaOpen(true);
    } else if (game.type === 'point-and-click') {
      if (game.id.includes('candi')) setActivePointAndClickScene('candi-sejarah');
      else if (game.id.includes('hutan')) setActivePointAndClickScene('hutan-endemik');
      else setActivePointAndClickScene('lab-sains');
      setIsPointAndClickOpen(true);
    } else if (game.type === 'puzzle') {
      setIsPuzzleOpen(true);
    } else {
      setIsUlarTanggaOpen(true);
    }
  };

  const closeGameModal = (which: 'ular' | 'point' | 'puzzle' | 'chess' | 'presentation') => {
    if (which === 'ular') setIsUlarTanggaOpen(false);
    if (which === 'point') setIsPointAndClickOpen(false);
    if (which === 'puzzle') setIsPuzzleOpen(false);
    if (which === 'chess') setIsChessOpen(false);
    if (which === 'presentation') {
      setIsPresentationOpen(false);
      setActivePresentationDeck(null);
      setPresentationInitialSlide(1);
    }

    // Clean up query param
    const url = new URL(window.location.href);
    url.searchParams.delete('game');
    url.searchParams.delete('mode');
    url.searchParams.delete('slide');
    window.history.replaceState({}, '', url.toString());
  };

  // Filter games based on search, category, tab, and grade
  const filteredGames = useMemo(() => {
    const trimmedQuery = searchQuery.trim();

    return GAMES_CATALOG.filter((game) => {
      // If user typed in search bar, match across whole catalog (unless on Favorites tab)
      if (trimmedQuery) {
        const matchesQuery = isGameMatchingSearch(game, trimmedQuery);
        if (activeTab === 'favorites') {
          return matchesQuery && favorites.includes(game.id);
        }
        return matchesQuery;
      }

      // Default category, tab, and grade filtering when not searching
      const matchCategory =
        selectedCategory === 'all' || game.category === selectedCategory;

      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'ular-tangga' && game.type === 'ular-tangga') ||
        (activeTab === 'point-and-click' && game.type === 'point-and-click') ||
        (activeTab === 'puzzle' && game.type === 'puzzle') ||
        (activeTab === 'favorites' && favorites.includes(game.id));

      const matchGrade =
        selectedGrade === 'Semua Kelas' ||
        game.gradeLevel === selectedGrade ||
        game.gradeLevel === 'Semua Kelas';

      return matchCategory && matchTab && matchGrade;
    });
  }, [searchQuery, selectedCategory, activeTab, selectedGrade, favorites]);

  const recentGames = useMemo(() => {
    return recentGameIds
      .map(id => GAMES_CATALOG.find(g => g.id === id))
      .filter((g): g is GameItem => Boolean(g));
  }, [recentGameIds]);

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGrade('Semua Kelas');
    setActiveTab('all');
  };

  const handleSurpriseMe = () => {
    const randomGame = GAMES_CATALOG[Math.floor(Math.random() * GAMES_CATALOG.length)];
    launchGame(randomGame);
  };

  return (
    <div className="min-h-screen bg-[#fafbff] flex flex-col justify-between selection:bg-purple-100 selection:text-purple-900 text-base">
      <main className="flex-1 pb-16">
        {/* Canva-Style Header & Aurora Hero */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onTabChange={setActiveTab}
          selectedGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
          onSurpriseMe={handleSurpriseMe}
        />

        {/* Canva Horizontal Category Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Canva Feature Banner Cards */}
        {!searchQuery && selectedCategory === 'all' && selectedGrade === 'Semua Kelas' && activeTab === 'all' && (
          <FeaturedBanner
            onPlayUlarTangga={() => {
              const game = GAMES_CATALOG.find(g => g.id === 'ular-tangga-sains');
              if (game) launchGame(game, 'presentation');
            }}
            onPlayPointAndClick={() => {
              const game = GAMES_CATALOG.find(g => g.id === 'point-click-lab');
              if (game) launchGame(game, 'presentation');
            }}
            onPlayPuzzle={() => {
              const game = GAMES_CATALOG.find(g => g.id === 'teka-teki-kata');
              if (game) launchGame(game, 'presentation');
            }}
          />
        )}

        {/* Games Shelves / Grid */}
        <GameGrid
          games={filteredGames}
          title={
            searchQuery
              ? `Hasil Pencarian: "${searchQuery}"`
              : activeTab === 'ular-tangga'
              ? 'Papan Ular Tangga Edukatif'
              : activeTab === 'point-and-click'
              ? 'Petualangan Point & Click'
              : activeTab === 'puzzle'
              ? 'Teka-Teki Asah Otak'
              : activeTab === 'favorites'
              ? 'Koleksi Favorit Saya'
              : selectedCategory === 'sains'
              ? 'Materi Pembelajaran Sains & Alam'
              : selectedCategory === 'matematika'
              ? 'Materi Pembelajaran Matematika'
              : selectedCategory === 'sejarah'
              ? 'Materi Sejarah & Budaya Nusantara'
              : selectedCategory === 'bahasa'
              ? 'Materi Bahasa & Kosakata'
              : selectedCategory === 'logika'
              ? 'Materi Logika & Asah Otak'
              : 'Semua Koleksi Materi Belajar'
          }
          onPlayGame={launchGame}
          onOpenProlog={setActivePrologGame}
          onResetFilter={handleResetFilter}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          recentGames={!searchQuery && selectedCategory === 'all' ? recentGames : []}
        />
      </main>

      {/* Game Modals */}
      {isUlarTanggaOpen && (
        <UlarTanggaModal
          isOpen={isUlarTanggaOpen}
          onClose={() => closeGameModal('ular')}
          defaultSubject={activeUlarTanggaSubject}
        />
      )}
      {isPointAndClickOpen && (
        <PointAndClickModal
          isOpen={isPointAndClickOpen}
          onClose={() => closeGameModal('point')}
          defaultSceneId={activePointAndClickScene}
        />
      )}
      {isPuzzleOpen && (
        <PuzzleModal
          isOpen={isPuzzleOpen}
          onClose={() => closeGameModal('puzzle')}
        />
      )}
      {isChessOpen && (
        <ChessPuzzleModal
          isOpen={isChessOpen}
          onClose={() => closeGameModal('chess')}
        />
      )}
      {isPresentationOpen && (
        <InteractiveStoryPresentationModal
          isOpen={isPresentationOpen}
          onClose={() => closeGameModal('presentation')}
          deck={activePresentationDeck || undefined}
          initialSlide={presentationInitialSlide}
        />
      )}
      <TeacherSheetModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />
      <PrologModal
        game={activePrologGame}
        isOpen={!!activePrologGame}
        onClose={() => setActivePrologGame(null)}
        onPlay={(game) => launchGame(game, 'presentation')}
        onPlayClassic={(game) => launchGame(game, 'arcade')}
      />

      {/* Clean Canva-style Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-6 mb-14 sm:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <LogoIcon size={20} idSuffix="footer" className="rounded-md" />
            <span className="font-extrabold text-slate-900 text-sm">ueeee</span>
            <span>•</span>
            <span className="font-semibold text-purple-700">ueeee.my.id</span>
            <span>—</span>
            <span>Platform Gamified Learning Terbuka</span>
            <button
              onClick={() => setIsTeacherModalOpen(true)}
              className="ml-2 font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 cursor-pointer"
            >
              <BookOpen size={12} />
              <span>Cetak Soal untuk Guru</span>
            </button>
          </div>

          <div className="flex items-center gap-1 font-medium">
            <span>Dibuat dengan</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>untuk siswa & guru di Indonesia</span>
            <Sparkles size={13} className="text-amber-500 ml-1" />
          </div>
        </div>
      </footer>

      {/* Canva-Style Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'favorites') {
            setSelectedCategory('all');
          }
        }}
        onSurpriseMe={handleSurpriseMe}
        favoritesCount={favorites.length}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onFocusSearch={() => {
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      />
    </div>
  );
}
