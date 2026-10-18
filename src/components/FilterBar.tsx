import React from 'react';
import { FilterState, CardOrientation } from '../types';
import { 
  Eye,
  EyeOff, 
  Layers, 
  Filter, 
  Search, 
  Star, 
  ArrowLeftRight,
  BookMarked
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

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-3 sm:p-4 space-y-3 mb-4 sm:mb-6">
      
      {/* Row 1: Part Selection (Part 1 vs Part 2 vs Toàn bộ) & Flip Orientation */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 hidden sm:flex items-center gap-1 shrink-0">
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            Vùng học:
          </span>
          <div className="flex items-center p-0.5 bg-gray-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => onFilterChange({ part: 'all', lesson: 'all' })}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all text-xs ${
                filter.part === 'all'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cả 25 Bài
            </button>
            <button
              onClick={() => onFilterChange({ part: 1, lesson: 'all' })}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all text-xs ${
                filter.part === 1
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Part 1 (1-15)
            </button>
            <button
              onClick={() => onFilterChange({ part: 2, lesson: 'all' })}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all text-xs ${
                filter.part === 2
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Part 2 (16-25)
            </button>
          </div>
        </div>

        {/* Orientation flip */}
        <button
          onClick={onToggleOrientation}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors shrink-0 active:scale-95"
          title="Đổi chiều hỏi đáp"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-rose-600" />
          <span className="hidden xs:inline">
            {orientation === 'ja-to-vi' ? '🇯🇵 Nhật ➔ 🇻🇳 Việt' : '🇻🇳 Việt ➔ 🇯🇵 Nhật'}
          </span>
          <span className="xs:hidden">
            {orientation === 'ja-to-vi' ? '🇯🇵➔🇻🇳' : '🇻🇳➔🇯🇵'}
          </span>
        </button>
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

      {/* Row 3: Primary Toggles ALWAYS VISIBLE ON MOBILE & DESKTOP (ẨN TỪ ĐÃ NHỚ, CHỈ TỪ KANJI, ĐÃ LƯU ⭐) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100/80">
        
        <div className="flex flex-wrap items-center gap-2">
          {/* USER EMPHASIS: Nút Ẩn những từ đã nhớ */}
          <button
            onClick={() => onFilterChange({ hideMastered: !filter.hideMastered })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer shadow-xs ${
              filter.hideMastered
                ? 'bg-emerald-600 border-emerald-600 text-white ring-2 ring-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {filter.hideMastered ? (
              <EyeOff className="w-4 h-4 text-white" />
            ) : (
              <Eye className="w-4 h-4 text-emerald-600" />
            )}
            <span>
              {filter.hideMastered ? 'Đang ẩn từ đã nhớ' : 'Ẩn từ đã nhớ'}
            </span>
            {masteredCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                filter.hideMastered ? 'bg-white text-emerald-700' : 'bg-emerald-200 text-emerald-900'
              }`}>
                {filter.hideMastered ? `-${masteredCount}` : masteredCount}
              </span>
            )}
          </button>

          {/* USER REQUEST: Lọc từ có Hán tự (Kanji only) */}
          <button
            onClick={() => onFilterChange({ kanjiOnly: !filter.kanjiOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              filter.kanjiOnly
                ? 'bg-amber-500 border-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                : 'bg-amber-50/80 border-amber-200 text-amber-900 hover:bg-amber-100/80'
            }`}
          >
            <Filter className={`w-3.5 h-3.5 ${filter.kanjiOnly ? 'text-white' : 'text-amber-600'}`} />
            <span>Chỉ từ có Kanji</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              filter.kanjiOnly ? 'bg-white text-amber-900' : 'bg-amber-200 text-amber-900'
            }`}>
              {kanjiCount}
            </span>
          </button>

          {/* Starred filter */}
          <button
            onClick={() => onFilterChange({ starredOnly: !filter.starredOnly })}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border active:scale-95 cursor-pointer ${
              filter.starredOnly
                ? 'bg-yellow-400 border-yellow-500 text-yellow-950 shadow-xs ring-2 ring-yellow-200 font-bold'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filter.starredOnly ? 'text-yellow-900 fill-yellow-900' : 'text-gray-400'}`} />
            <span>Đã lưu ⭐ ({starredCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-48">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm từ vựng, Hán Việt..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-8 pr-6 py-1.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
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
