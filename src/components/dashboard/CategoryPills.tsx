import React from 'react';
import { 
  LayoutGrid, 
  Dice5, 
  Compass, 
  Calculator, 
  FlaskConical, 
  BookOpen, 
  Landmark, 
  BrainCircuit,
  LucideIcon 
} from 'lucide-react';
import { CATEGORIES, CategoryTab } from '@/data/categories';
import { SubjectCategory } from '@/types/game';
import { sound } from '@/lib/sound';

interface Props {
  selectedCategory: SubjectCategory;
  onSelectCategory: (cat: SubjectCategory) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutGrid,
  Dice5,
  Compass,
  Calculator,
  FlaskConical,
  BookOpen,
  Landmark,
  BrainCircuit,
};

export const CategoryPills: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const handleClick = (catId: SubjectCategory) => {
    sound.playClick();
    onSelectCategory(catId);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat: CategoryTab) => {
          const IconComponent = ICON_MAP[cat.iconName] || LayoutGrid;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="flex flex-col items-center gap-2 group shrink-0 focus:outline-none"
            >
              <div className="relative">
                {/* Circular Icon Bubble Canva Style */}
                <div
                  className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                    cat.iconBg
                  } ${
                    isSelected
                      ? 'ring-4 ring-purple-400 ring-offset-2 scale-105 shadow-md'
                      : 'opacity-90 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                >
                  <IconComponent size={24} className="stroke-[2.2]" />
                </div>

                {/* Badge (e.g. Populer, Baru) */}
                {cat.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm">
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-bold transition whitespace-nowrap ${
                  isSelected
                    ? 'text-purple-800'
                    : 'text-slate-600 group-hover:text-purple-600'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
