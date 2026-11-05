import { useState, useMemo } from 'react';
import { Header } from '@/components/dashboard/Header';
import { CategoryPills } from '@/components/dashboard/CategoryPills';
import { FeaturedBanner } from '@/components/dashboard/FeaturedBanner';
import { GameGrid } from '@/components/dashboard/GameGrid';
import { UlarTanggaModal } from '@/games/ular-tangga/UlarTanggaModal';
import { PointAndClickModal } from '@/games/point-and-click/PointAndClickModal';
import { GAMES_CATALOG } from '@/data/games-catalog';
import { GameItem, SubjectCategory } from '@/types/game';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>('all');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Modals state
  const [isUlarTanggaOpen, setIsUlarTanggaOpen] = useState<boolean>(false);
  const [isPointAndClickOpen, setIsPointAndClickOpen] = useState<boolean>(false);

  // Filter games based on search & category
  const filteredGames = useMemo(() => {
    return GAMES_CATALOG.filter((game) => {
      const matchSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ||
        game.category === selectedCategory ||
        (selectedCategory === 'ular-tangga' && game.type === 'ular-tangga') ||
        (selectedCategory === 'point-and-click' && game.type === 'point-and-click');

      const matchTab =
        activeTab === 'all' ||
        (activeTab === 'ular-tangga' && game.type === 'ular-tangga');

      return matchSearch && matchCategory && matchTab;
    });
  }, [searchQuery, selectedCategory, activeTab]);

  const handlePlayGame = (game: GameItem) => {
    if (game.type === 'ular-tangga') {
      setIsUlarTanggaOpen(true);
    } else if (game.type === 'point-and-click') {
      setIsPointAndClickOpen(true);
    } else {
      // For other games, default to Ular Tangga or alert
      setIsUlarTanggaOpen(true);
    }
  };

  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen bg-[#fafbff] flex flex-col justify-between selection:bg-purple-100 selection:text-purple-900">
      <main className="flex-1 pb-16">
        {/* Canva-Style Header & Aurora Hero */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'ular-tangga') setSelectedCategory('ular-tangga');
            else setSelectedCategory('all');
          }}
        />

        {/* Canva Horizontal Category Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'ular-tangga') setActiveTab('ular-tangga');
            else setActiveTab('all');
          }}
        />

        {/* Canva Feature Banner Cards (Magic Layers style) */}
        {!searchQuery && selectedCategory === 'all' && (
          <FeaturedBanner
            onPlayUlarTangga={() => setIsUlarTanggaOpen(true)}
            onPlayPointAndClick={() => setIsPointAndClickOpen(true)}
          />
        )}

        {/* Games Shelves / Grid */}
        <GameGrid
          games={filteredGames}
          title={
            searchQuery
              ? `Hasil Pencarian: "${searchQuery}"`
              : selectedCategory === 'ular-tangga'
              ? 'Papan Ular Tangga Edukasi'
              : selectedCategory === 'point-and-click'
              ? 'Petualangan Point & Click'
              : 'Lanjutkan Belajar & Bermain'
          }
          onPlayGame={handlePlayGame}
          onResetFilter={handleResetFilter}
        />
      </main>

      {/* Game Modals */}
      <UlarTanggaModal
        isOpen={isUlarTanggaOpen}
        onClose={() => setIsUlarTanggaOpen(false)}
      />
      <PointAndClickModal
        isOpen={isPointAndClickOpen}
        onClose={() => setIsPointAndClickOpen(false)}
      />

      {/* Clean Canva-style Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm">ueeee</span>
            <span>•</span>
            <span className="font-semibold text-purple-700">ueeee.my.id</span>
            <span>—</span>
            <span>Platform Belajar Berbasis Game Terbuka Tanpa Login</span>
          </div>

          <div className="flex items-center gap-1 font-medium">
            <span>Dibuat dengan</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>untuk siswa & guru di Indonesia</span>
            <Sparkles size={13} className="text-amber-500 ml-1" />
          </div>
        </div>
      </footer>
    </div>
  );
}
