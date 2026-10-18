import React, { useRef, useEffect } from 'react';
import { FilterState, WordStatusFilter } from '../types';
import { 
  Filter, 
  Search, 
  Star, 
  BookMarked,
  CheckCircle2,
  CircleDashed,
  LayoutGrid,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  totalAvailable: number;
  kanjiCount: number;
  masteredCount: number;
  unmasteredCount: number;
  hesitantCount: number;
  starredCount: number;
  onResetAllData?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  totalAvailable,
  kanjiCount,
  masteredCount,
  unmasteredCount,
  hesitantCount,
  starredCount,
  onResetAllData,
}) => {
  const lessonScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Auto-scroll active lesson into center view smoothly
  useEffect(() => {
    if (lessonScrollRef.current) {
      let targetSelector = '';
      if (filter.lesson !== 'all') {
        targetSelector = `[data-lesson="${filter.lesson}"]`;
      } else if (filter.part === 1) {
        targetSelector = `[data-scope="part1"]`;
      } else if (filter.part === 2) {
        targetSelector = `[data-scope="part2"]`;
      } else {
        targetSelector = `[data-scope="all"]`;
      }

      if (targetSelector) {
        const activeEl = lessonScrollRef.current.querySelector<HTMLElement>(targetSelector);
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }
  }, [filter.lesson, filter.part]);

  const handleWheel = (e: React.WheelEvent) => {
    if (lessonScrollRef.current && e.deltaY !== 0) {
      lessonScrollRef.current.scrollLeft += e.deltaY * 1.2;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!lessonScrollRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - lessonScrollRef.current.offsetLeft;
    scrollLeftStartRef.current = lessonScrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !lessonScrollRef.current) return;
    const x = e.pageX - lessonScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current);
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
      e.preventDefault();
      lessonScrollRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleStatusFilter = (status: WordStatusFilter) => {
    // If clicking the currently active status, toggle back to 'all'
    if (filter.statusFilter === status && status !== 'all') {
      onFilterChange({ statusFilter: 'all' });
    } else {
      onFilterChange({ statusFilter: status });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-3 sm:p-4 space-y-3 mb-4 sm:mb-6 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      
      {/* USER REQUEST 9: Bỏ mũi tên rườm rà, gộp thanh chọn bài thành 1 dải lướt ngang mượt mà, KHÔNG bôi đen */}
      <div 
        ref={lessonScrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 touch-pan-x scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing border-b border-gray-100 pb-3"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <span className="text-xs font-bold text-gray-500 whitespace-nowrap flex items-center gap-1 shrink-0 mr-1 pointer-events-none select-none">
          <BookMarked className="w-3.5 h-3.5 text-rose-500" />
          Bài:
        </span>

        {/* Option: Cả 25 Bài */}
        <button
          type="button"
          data-scope="all"
          onClick={() => {
            if (!hasDraggedRef.current) onFilterChange({ part: 'all', lesson: 'all' });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
            filter.part === 'all' && filter.lesson === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cả 25 Bài
        </button>

        {/* Option: Part 1 (1-15) */}
        <button
          type="button"
          data-scope="part1"
          onClick={() => {
            if (!hasDraggedRef.current) onFilterChange({ part: 1, lesson: 'all' });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
            filter.part === 1 && filter.lesson === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Part 1 (1-15)
        </button>

        {/* Option: Part 2 (16-25) */}
        <button
          type="button"
          data-scope="part2"
          onClick={() => {
            if (!hasDraggedRef.current) onFilterChange({ part: 2, lesson: 'all' });
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
            filter.part === 2 && filter.lesson === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Part 2 (16-25)
        </button>

        <span className="w-px h-4 bg-gray-200 mx-1 shrink-0 pointer-events-none" />

        {/* Individual Lessons 1 to 25 */}
        {Array.from({ length: 25 }, (_, i) => i + 1).map((l) => {
          const isActive = filter.lesson === l;
          return (
            <button
              key={l}
              data-lesson={l}
              type="button"
              onClick={() => {
                if (!hasDraggedRef.current) onFilterChange({ lesson: l, part: 'all' });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all shrink-0 active:scale-95 cursor-pointer select-none ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs font-bold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold'
              }`}
            >
              Bài {l}
            </button>
          );
        })}
      </div>

      {/* Row 2: BỘ LỌC TỪ (ĐÃ NHỚ, PHÂN VÂN, CHƯA NHỚ, KANJI, LƯU SAO) + TÌM KIẾM + NÚT XÓA CACHE */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        
        {/* Memory Status Filter Group */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* ALL BUTTON (Không dùng màu đen bôi đen) */}
          <button
            type="button"
            onClick={() => handleStatusFilter('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              filter.statusFilter === 'all'
                ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
            title="Xem toàn bộ từ"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Tất cả từ</span>
          </button>

          {/* USER REQUEST BUTTON 1: "TỪ ĐÃ NHỚ" */}
          <button
            type="button"
            onClick={() => handleStatusFilter('mastered')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              filter.statusFilter === 'mastered'
                ? 'bg-emerald-600 border-emerald-600 text-white ring-2 ring-emerald-300 shadow-xs'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
            title="Chỉ hiển thị các từ đã nhớ để ôn tập kiểm tra"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Từ đã nhớ</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              filter.statusFilter === 'mastered'
                ? 'bg-white text-emerald-700'
                : 'bg-emerald-200 text-emerald-900'
            }`}>
              {masteredCount}
            </span>
          </button>

          {/* USER REQUEST: BỘ LỌC "TỪ PHÂN VÂN" */}
          <button
            type="button"
            onClick={() => handleStatusFilter('hesitant')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              filter.statusFilter === 'hesitant'
                ? 'bg-amber-600 border-amber-600 text-white ring-2 ring-amber-300 shadow-xs'
                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
            title="Chỉ hiển thị các từ còn phân vân để kiểm tra lại"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Từ phân vân</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              filter.statusFilter === 'hesitant'
                ? 'bg-white text-amber-700'
                : 'bg-amber-200 text-amber-900'
            }`}>
              {hesitantCount}
            </span>
          </button>

          {/* USER REQUEST BUTTON 2: "TỪ CHƯA NHỚ" */}
          <button
            type="button"
            onClick={() => handleStatusFilter('unmastered')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              filter.statusFilter === 'unmastered'
                ? 'bg-red-600 border-red-600 text-white ring-2 ring-red-300 shadow-xs'
                : 'bg-red-50 border-red-200 text-red-800 hover:bg-red-100'
            }`}
            title="Chỉ hiển thị các từ chưa nhớ để tiếp tục học"
          >
            <CircleDashed className="w-4 h-4" />
            <span>Từ chưa nhớ</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              filter.statusFilter === 'unmastered'
                ? 'bg-white text-red-700'
                : 'bg-red-200 text-red-900'
            }`}>
              {unmasteredCount}
            </span>
          </button>

          {/* KANJI ONLY BUTTON */}
          <button
            type="button"
            onClick={() => onFilterChange({ kanjiOnly: !filter.kanjiOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
              filter.kanjiOnly
                ? 'bg-amber-500 border-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                : 'bg-amber-50/80 border-amber-200 text-amber-900 hover:bg-amber-100/80'
            }`}
            title="Lọc ra những từ có Hán tự"
          >
            <Filter className={`w-3.5 h-3.5 ${filter.kanjiOnly ? 'text-white' : 'text-amber-600'}`} />
            <span>Chỉ từ có Kanji</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              filter.kanjiOnly ? 'bg-white text-amber-900' : 'bg-amber-200 text-amber-900'
            }`}>
              {kanjiCount}
            </span>
          </button>

          {/* STARRED BUTTON */}
          <button
            type="button"
            onClick={() => onFilterChange({ starredOnly: !filter.starredOnly })}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border active:scale-95 cursor-pointer ${
              filter.starredOnly
                ? 'bg-yellow-400 border-yellow-500 text-yellow-950 shadow-xs ring-2 ring-yellow-200 font-bold'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filter.starredOnly ? 'text-yellow-900 fill-yellow-900' : 'text-gray-400'}`} />
            <span>Đã lưu ⭐ ({starredCount})</span>
          </button>

          {/* USER REQUEST 10: NÚT XÓA BỘ NHỚ CACHE VỀ BAN ĐẦU */}
          {onResetAllData && (
            <button
              type="button"
              onClick={onResetAllData}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border border-rose-200 bg-rose-50/70 text-rose-700 hover:bg-rose-100 hover:border-rose-300 active:scale-95 cursor-pointer"
              title="Xóa toàn bộ cache, đưa ứng dụng về trạng thái ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
              <span>Xóa cache ban đầu</span>
            </button>
          )}
        </div>

        {/* Right side: Active count + Search Input */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] font-semibold text-gray-400 shrink-0 hidden sm:inline">
            <span className="font-bold text-gray-800">{totalAvailable}</span> từ
          </span>
          <div className="relative w-full sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm từ, Hán Việt..."
              value={filter.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full pl-8 pr-6 py-1.5 bg-gray-50 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
            {filter.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
