import React, { useState } from 'react';
import { FilterState, CardOrientation } from '../types';
import { 
  EyeOff, 
  Layers, 
  Filter, 
  Search, 
  Star, 
  ArrowLeftRight,
  BookMarked,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  orientation: CardOrientation;
  onToggleOrientation: () => void;
  totalAvailable: number;
  kanjiCount: number;
  masteredCount: number;
  starredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  orientation,
  onToggleOrientation,
  totalAvailable,
  kanjiCount,
  masteredCount,
  starredCount,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Lessons available based on selected Part
  const getLessonsForPart = () => {
    if (filter.part === 1) {
      return Array.from({ length: 15 }, (_, i) => i + 1); // Lessons 1 to 15
    } else if (filter.part === 2) {
      return Array.from({ length: 10 }, (_, i) => i + 16); // Lessons 16 to 25
    } else {
      return Array.from({ length: 25 }, (_, i) => i + 1); // Lessons 1 to 25
    }
  };

  const currentLessons = getLessonsForPart();
  const activeFiltersCount = 
    (filter.kanjiOnly ? 1 : 0) + 
    (filter.hideMastered ? 1 : 0) + 
    (filter.starredOnly ? 1 : 0) + 
    (filter.searchQuery ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-3 sm:p-4 space-y-2.5 sm:space-y-3.5 mb-4 sm:mb-6">
      
      {/* Row 1: Part Selection (Part 1 vs Part 2 vs Toàn bộ) & Flip Orientation */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            Vùng học:
          </span>
          <div className="flex items-center p-0.5 bg-gray-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => onFilterChange({ part: 'all', lesson: 'all' })}
              className={`px-2 sm:px-3 py-1.5 rounded-lg transition-all text-[11px] sm:text-xs ${
                filter.part === 'all'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cả 25 Bài
            </button>
            <button
              onClick={() => onFilterChange({ part: 1, lesson: 'all' })}
              className={`px-2 sm:px-3 py-1.5 rounded-lg transition-all text-[11px] sm:text-xs ${
                filter.part === 1
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Part 1 (1-15)
            </button>
            <button
              onClick={() => onFilterChange({ part: 2, lesson: 'all' })}
              className={`px-2 sm:px-3 py-1.5 rounded-lg transition-all text-[11px] sm:text-xs ${
                filter.part === 2
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Part 2 (16-25)
            </button>
          </div>
        </div>

        {/* Orientation flip & Mobile filter drawer toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleOrientation}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors active:scale-95"
            title="Đổi chiều hỏi đáp"
          >
            <ArrowLeftRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-600" />
            <span className="hidden xs:inline">
              {orientation === 'ja-to-vi' ? '🇯🇵 Nhật ➔ 🇻🇳 Việt' : '🇻🇳 Việt ➔ 🇯🇵 Nhật'}
            </span>
            <span className="xs:hidden">
              {orientation === 'ja-to-vi' ? '🇯🇵➔🇻🇳' : '🇻🇳➔🇯🇵'}
            </span>
          </button>

          {/* Mobile toggle button for search & quick filters */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`sm:hidden p-1.5 rounded-xl border transition-colors flex items-center gap-1 text-xs font-bold ${
              activeFiltersCount > 0
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
            title="Mở bộ lọc bổ sung"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
            {showMobileFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Row 2: Touch Horizontal Scroller for Lessons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 touch-pan-x">
        <span className="text-[11px] sm:text-xs font-semibold text-gray-400 whitespace-nowrap flex items-center gap-1 shrink-0">
          <BookMarked className="w-3 h-3" /> Bài:
        </span>
        <button
          onClick={() => onFilterChange({ lesson: 'all' })}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
            filter.lesson === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Tất cả {filter.part !== 'all' ? `P${filter.part}` : ''}
        </button>
        {currentLessons.map((l) => (
          <button
            key={l}
            onClick={() => onFilterChange({ lesson: l })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 active:scale-95 ${
              filter.lesson === l
                ? 'bg-rose-600 text-white shadow-xs font-bold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            B.{l}
          </button>
        ))}
      </div>

      {/* Row 3: Special Filters (Always visible on desktop, toggleable or compact chips on mobile) */}
      <div className={`sm:flex flex-wrap items-center justify-between gap-2.5 pt-1 ${showMobileFilters ? 'block space-y-2 sm:space-y-0' : 'hidden sm:flex'}`}>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* USER REQUEST: Lọc từ có Hán tự (Kanji only) */}
          <button
            onClick={() => onFilterChange({ kanjiOnly: !filter.kanjiOnly })}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border active:scale-95 ${
              filter.kanjiOnly
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className={`w-3.5 h-3.5 ${filter.kanjiOnly ? 'text-amber-600 fill-amber-500' : 'text-gray-400'}`} />
            <span>Chỉ từ có Kanji</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              filter.kanjiOnly ? 'bg-amber-200 text-amber-900' : 'bg-gray-100 text-gray-600'
            }`}>
              {kanjiCount}
            </span>
          </button>

          {/* USER REQUEST: Ẩn từ đã thuộc */}
          <button
            onClick={() => onFilterChange({ hideMastered: !filter.hideMastered })}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border active:scale-95 ${
              filter.hideMastered
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <EyeOff className={`w-3.5 h-3.5 ${filter.hideMastered ? 'text-emerald-600' : 'text-gray-400'}`} />
            <span>Ẩn từ đã thuộc</span>
            {masteredCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filter.hideMastered ? 'bg-emerald-200 text-emerald-900' : 'bg-gray-100 text-gray-600'
              }`}>
                -{masteredCount}
              </span>
            )}
          </button>

          {/* Starred filter */}
          <button
            onClick={() => onFilterChange({ starredOnly: !filter.starredOnly })}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border active:scale-95 ${
              filter.starredOnly
                ? 'bg-yellow-50 border-yellow-300 text-yellow-900 shadow-xs'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filter.starredOnly ? 'text-yellow-500 fill-yellow-400' : 'text-gray-400'}`} />
            <span>Đã lưu ⭐ ({starredCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-52 pt-1 sm:pt-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm Kanji, Hán-Việt, Nghĩa..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
          {filter.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
