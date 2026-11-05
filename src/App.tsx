import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/dashboard/Header';
import { CategoryPills } from '@/components/dashboard/CategoryPills';
import { FeaturedBanner } from '@/components/dashboard/FeaturedBanner';
import { GameGrid } from '@/components/dashboard/GameGrid';
import { UlarTanggaModal } from '@/games/ular-tangga/UlarTanggaModal';
import { PointAndClickModal } from '@/games/point-and-click/PointAndClickModal';
import { PuzzleModal } from '@/games/puzzle/PuzzleModal';
import { TeacherSheetModal } from '@/components/modals/TeacherSheetModal';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { GAMES_CATALOG } from '@/data/games-catalog';
import { GameItem, SubjectCategory, GradeLevel } from '@/types/game';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import { LogoIcon } from '@/components/common/Logo';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('Semua Kelas');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isClassroomMode, setIsClassroomMode] = useState<boolean>(() => {
    return localStorage.getItem('ueeee_classroom_mode') === 'true';
  });

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
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);

  // Read URL query parameter for deep linking (?game=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get('game');
    if (gameParam) {
      const match = GAMES_CATALOG.find(g => g.id === gameParam);
      if (match) {
        launchGame(match);
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

  // Toggle classroom mode
  const handleToggleClassroomMode = () => {
    const next = !isClassroomMode;
    setIsClassroomMode(next);
    localStorage.setItem('ueeee_classroom_mode', String(next));
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

  const launchGame = (game: GameItem) => {
    recordRecentPlay(game.id);

    // Update query string cleanly without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('game', game.id);
    window.history.replaceState({}, '', url.toString());

    if (game.type === 'ular-tangga') {
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

  const closeGameModal = (which: 'ular' | 'point' | 'puzzle') => {
    if (which === 'ular') setIsUlarTanggaOpen(false);
    if (which === 'point') setIsPointAndClickOpen(false);
    if (which === 'puzzle') setIsPuzzleOpen(false);

    // Clean up query param
    const url = new URL(window.location.href);
    url.searchParams.delete('game');
    window.history.replaceState({}, '', url.toString());
  };

  // Filter games based on search, category, tab, and grade
  const filteredGames = useMemo(() => {
    return GAMES_CATALOG.filter((game) => {
      const matchSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.subjectDetail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ||
        game.category === selectedCategory ||
        (selectedCategory === 'ular-tangga' && game.type === 'ular-tangga') ||
        (selectedCategory === 'point-and-click' && game.type === 'point-and-click');

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

      return matchSearch && matchCategory && matchTab && matchGrade;
    });
  }, [searchQuery, selectedCategory, activeTab, selectedGrade]);

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
    <div className={`min-h-screen bg-[#fafbff] flex flex-col justify-between selection:bg-purple-100 selection:text-purple-900 ${
      isClassroomMode ? 'text-lg' : 'text-base'
    }`}>
      <main className="flex-1 pb-16">
        {/* Canva-Style Header & Aurora Hero */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'ular-tangga') setSelectedCategory('ular-tangga');
            else if (tab === 'point-and-click') setSelectedCategory('point-and-click');
            else setSelectedCategory('all');
          }}
          selectedGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
          isClassroomMode={isClassroomMode}
          onToggleClassroomMode={handleToggleClassroomMode}
          onSurpriseMe={handleSurpriseMe}
        />

        {/* Canva Horizontal Category Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'ular-tangga') setActiveTab('ular-tangga');
            else if (cat === 'point-and-click') setActiveTab('point-and-click');
            else setActiveTab('all');
          }}
        />

        {/* Canva Feature Banner Cards */}
        {!searchQuery && selectedCategory === 'all' && selectedGrade === 'Semua Kelas' && (
          <FeaturedBanner
            onPlayUlarTangga={() => {
              setActiveUlarTanggaSubject('sains');
              setIsUlarTanggaOpen(true);
            }}
            onPlayPointAndClick={() => {
              setActivePointAndClickScene('lab-sains');
              setIsPointAndClickOpen(true);
            }}
            onPlayPuzzle={() => setIsPuzzleOpen(true)}
          />
        )}

        {/* Games Shelves / Grid */}
        <GameGrid
          games={filteredGames}
          title={
            searchQuery
              ? `Hasil Pencarian: "${searchQuery}"`
              : selectedCategory === 'ular-tangga'
              ? 'Papan Ular Tangga Edukatif'
              : selectedCategory === 'point-and-click'
              ? 'Petualangan Point & Click'
              : selectedCategory === 'matematika'
              ? 'Materi Pembelajaran Matematika'
              : selectedCategory === 'sains'
              ? 'Materi Pembelajaran Sains & Alam'
              : selectedCategory === 'sejarah'
              ? 'Materi Sejarah & Budaya Nusantara'
              : 'Semua Koleksi Materi Belajar'
          }
          onPlayGame={launchGame}
          onResetFilter={handleResetFilter}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          recentGames={!searchQuery && selectedCategory === 'all' ? recentGames : []}
        />
      </main>

      {/* Game Modals */}
      <UlarTanggaModal
        isOpen={isUlarTanggaOpen}
        onClose={() => closeGameModal('ular')}
        defaultSubject={activeUlarTanggaSubject}
      />
      <PointAndClickModal
        isOpen={isPointAndClickOpen}
        onClose={() => closeGameModal('point')}
        defaultSceneId={activePointAndClickScene}
      />
      <PuzzleModal
        isOpen={isPuzzleOpen}
        onClose={() => closeGameModal('puzzle')}
      />
      <TeacherSheetModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
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
            <span>Platform Gamified Learning Terbuka Tanpa Perlu Login</span>
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
