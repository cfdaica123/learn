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
  RotateCcw,
  CheckSquare,
  Check,
  X,
  HardDrive
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
  onOpenBackupModal?: () => void;
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
  onOpenBackupModal,
}) => {
  const lessonScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Active lessons selection list
  const selectedLessons = filter.selectedLessons || [];
  const hasMultiSelection = selectedLessons.length > 0;

  // Auto-scroll active lesson into center view smoothly
  useEffect(() => {
    if (lessonScrollRef.current) {
      let targetSelector = '';
      if (hasMultiSelection) {
        targetSelector = `[data-lesson="${selectedLessons[selectedLessons.length - 1]}"]`;
      } else if (filter.lesson !== 'all') {
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
  }, [filter.lesson, filter.part, selectedLessons.length, hasMultiSelection]);

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
    if (filter.statusFilter === status && status !== 'all') {
      onFilterChange({ statusFilter: 'all' });
    } else {
      onFilterChange({ statusFilter: status });
    }
  };

  // USER REQUIREMENT: Chọt trực tiếp vào bài 1, bài 2 để chọn gộp hiển thị cả 2 bài mà không cần bấm nút "Chọn nhiều bài"
  const handleLessonClick = (l: number) => {
    if (hasDraggedRef.current) return;

    let currentSelected: number[] = [];
    if (selectedLessons.length > 0) {
      currentSelected = [...selectedLessons];
    } else if (filter.lesson !== 'all') {
      currentSelected = [filter.lesson as number];
    }

    let nextSelected: number[];
    if (currentSelected.includes(l)) {
      // Bấm vào bài đang chọn -> Bỏ chọn bài đó
      nextSelected = currentSelected.filter((num) => num !== l);
    } else {
      // Bấm vào bài chưa chọn -> Thêm bài đó vào danh sách chọn gộp
      nextSelected = [...currentSelected, l].sort((a, b) => a - b);
    }

    if (nextSelected.length === 0) {
      // Khi không còn bài nào được chọn -> Tự động quay về xem cả 25 bài
      onFilterChange({ selectedLessons: [], lesson: 'all', part: 'all' });
    } else {
      onFilterChange({ selectedLessons: nextSelected, lesson: 'all', part: 'all' });
    }
  };

  // Quick preset helper
  const handleQuickPreset = (start: number, end: number) => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    onFilterChange({ selectedLessons: range, lesson: 'all', part: 'all' });
  };

  const handleSelectAllLessons = () => {
    const all: number[] = [];
    for (let i = startLesson; i <= endLesson; i++) all.push(i);
    onFilterChange({ selectedLessons: all, lesson: 'all', part: 'all' });
  };

  const handleClearSelectedLessons = () => {
    onFilterChange({ selectedLessons: [], lesson: 'all', part: 'all' });
  };

  const currentLevel = filter.level || 'N5';
  const startLesson = currentLevel === 'N5' ? 1 : 26;
  const endLesson = currentLevel === 'N5' ? 25 : 50;
  const totalLessons = 25;
  const part1Label = currentLevel === 'N5' ? 'Part 1 (1-15)' : 'Part 1 (26-37)';
  const part2Label = currentLevel === 'N5' ? 'Part 2 (16-25)' : 'Part 2 (38-50)';

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-3 sm:p-4 space-y-3 mb-4 sm:mb-6 select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      
      {/* Top Scroller: Horizontal lesson selector */}
      <div 
        ref={lessonScrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 touch-pan-x scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing border-b border-gray-100 pb-2.5"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <span className="text-xs font-bold text-gray-500 whitespace-nowrap flex items-center gap-1 shrink-0 mr-1 pointer-events-none select-none">
          <BookMarked className="w-3.5 h-3.5 text-rose-500" />
          Bài ({currentLevel}):
        </span>

        {/* Option: Cả 25 Bài */}
        <button
          type="button"
          data-scope="all"
          onClick={() => {
            if (!hasDraggedRef.current) {
              onFilterChange({ part: 'all', lesson: 'all', selectedLessons: [] });
            }
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
            !hasMultiSelection && filter.part === 'all' && filter.lesson === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cả 25 Bài ({currentLevel})
        </button>

        {/* Option: Part 1 */}
        <button
          type="button"
          data-scope="part1"
          onClick={() => {
            if (!hasDraggedRef.current) {
              onFilterChange({ part: 1, lesson: 'all', selectedLessons: [] });
            }
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
            !hasMultiSelection && filter.part === 1 && filter.lesson === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {part1Label}
        </button>

        {/* Option: Part 2 */}
        <button
          type="button"
          data-scope="part2"
          onClick={() => {
            if (!hasDraggedRef.current) {
              onFilterChange({ part: 2, lesson: 'all', selectedLessons: [] });
            }
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
            !hasMultiSelection && filter.part === 2 && filter.lesson === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {part2Label}
        </button>

        <span className="w-px h-4 bg-gray-200 mx-1 shrink-0 pointer-events-none" />

        {/* Danh sách từng bài (1 - 25): Bấm trực tiếp bài 1, bài 2 để chọn gộp tức thì */}
        {Array.from({ length: totalLessons }, (_, i) => startLesson + i).map((l) => {
          const isActive = selectedLessons.includes(l) || (selectedLessons.length === 0 && filter.lesson === l);

          return (
            <button
              key={l}
              data-lesson={l}
              type="button"
              onClick={() => handleLessonClick(l)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all shrink-0 active:scale-95 cursor-pointer select-none flex items-center gap-1 ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs font-bold ring-2 ring-rose-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold'
              }`}
            >
              {isActive && <Check className="w-3 h-3 stroke-[3]" />}
              <span>Bài {l}</span>
            </button>
          );
        })}
      </div>

      {/* THANH CHỌN NHANH COMBO BÀI HỌC */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-2 bg-gradient-to-r from-rose-50/70 via-rose-50/40 to-amber-50/40 rounded-xl border border-rose-100 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <span className="text-[11px] font-bold text-rose-900 shrink-0 flex items-center gap-1 mr-0.5">
            <CheckSquare className="w-3.5 h-3.5 text-rose-600" />
            <span>Chọn nhanh combo ({currentLevel}):</span>
          </span>

          {currentLevel === 'N5' ? (
            <>
              {/* 1 chạm chọn ngay bài 1-3 */}
              <button
                type="button"
                onClick={() => handleQuickPreset(1, 3)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs ${
                  selectedLessons.length === 3 && selectedLessons.includes(1) && selectedLessons.includes(2) && selectedLessons.includes(3)
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
                title="Chọn cùng lúc Bài 1, Bài 2, Bài 3 để học hoặc làm bài trắc nghiệm"
              >
                Bài 1 - 3
              </button>

              <button
                type="button"
                onClick={() => handleQuickPreset(1, 5)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs ${
                  selectedLessons.length === 5 && selectedLessons.includes(1) && selectedLessons.includes(5)
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Bài 1 - 5
              </button>

              <button
                type="button"
                onClick={() => handleQuickPreset(6, 10)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs ${
                  selectedLessons.length === 5 && selectedLessons.includes(6) && selectedLessons.includes(10)
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Bài 6 - 10
              </button>

              <button
                type="button"
                onClick={() => handleQuickPreset(11, 15)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs ${
                  selectedLessons.length === 5 && selectedLessons.includes(11) && selectedLessons.includes(15)
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Bài 11 - 15
              </button>

              <button
                type="button"
                onClick={() => handleQuickPreset(16, 20)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs ${
                  selectedLessons.length === 5 && selectedLessons.includes(16) && selectedLessons.includes(20)
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Bài 16 - 20
              </button>

              <button
                type="button"
                onClick={() => handleQuickPreset(21, 25)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-2xs ${
                  selectedLessons.length === 5 && selectedLessons.includes(21) && selectedLessons.includes(25)
                    ? 'bg-rose-600 text-white ring-2 ring-rose-200'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Bài 21 - 25
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleQuickPreset(26, 28)}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs"
              >
                Bài 26 - 28
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(26, 30)}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs"
              >
                Bài 26 - 30
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(31, 35)}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs"
              >
                Bài 31 - 35
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(36, 40)}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs"
              >
                Bài 36 - 40
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(41, 45)}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs"
              >
                Bài 41 - 45
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset(46, 50)}
                className="px-2.5 py-1 rounded-lg font-bold text-xs bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer shadow-2xs"
              >
                Bài 46 - 50
              </button>
            </>
          )}

          {/* Quick All / Clear buttons */}
          <button
            type="button"
            onClick={handleSelectAllLessons}
            className="px-2 py-1 rounded-lg font-semibold text-xs text-rose-700 hover:bg-rose-100/70 transition-colors cursor-pointer"
            title="Chọn tất cả các bài"
          >
            + Cả 25 bài
          </button>
        </div>

        {/* Right side of multi-select bar: Selected summary & quick clear */}
        <div className="flex items-center gap-1.5 shrink-0">
          {hasMultiSelection ? (
            <div className="flex items-center gap-1.5 bg-white/90 px-2 py-0.5 rounded-lg border border-rose-200 shadow-2xs">
              <span className="text-[11px] font-bold text-rose-700">
                Đã chọn {selectedLessons.length} bài ({selectedLessons.join(', ')})
              </span>
              <button
                type="button"
                onClick={handleClearSelectedLessons}
                className="flex items-center gap-0.5 text-xs text-rose-500 hover:text-rose-800 transition-colors cursor-pointer font-bold ml-1"
                title="Bỏ chọn"
              >
                <X className="w-3 h-3" />
                <span>Bỏ</span>
              </button>
            </div>
          ) : (
            <span className="text-[11px] text-gray-500 italic">
              Bấm trực tiếp vào các bài trên thanh để chọn gộp
            </span>
          )}
        </div>
      </div>

      {/* Row 2: BỘ LỌC TỪ + TÌM KIẾM + SAO LƯU/ĐỔI MÁY + NÚT XÓA CACHE */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        
        {/* Memory Status Filter Group */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* ALL BUTTON */}
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

          {/* BUTTON: "TỪ ĐÃ NHỚ" */}
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

          {/* BỘ LỌC "TỪ PHÂN VÂN" */}
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

          {/* BUTTON: "TỪ CHƯA NHỚ" */}
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

          {/* NÚT XUẤT / NHẬP CACHE ĐỂ ĐỔI MÁY */}
          {onOpenBackupModal && (
            <button
              type="button"
              onClick={onOpenBackupModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 active:scale-95 cursor-pointer shadow-2xs"
              title="Xuất file backup hoặc tải file backup lên để tiếp tục học trên máy mới"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
              <span>Xuất/Nhập cache (Đổi máy)</span>
            </button>
          )}

          {/* NÚT XÓA BỘ NHỚ CACHE VỀ BAN ĐẦU */}
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
            {hasMultiSelection ? (
              <span>
                Đang chọn: <strong className="text-rose-600">{selectedLessons.length} bài</strong> (<strong className="text-gray-800">{totalAvailable}</strong> từ)
              </span>
            ) : (
              <span>
                <strong className="text-gray-800">{totalAvailable}</strong> từ
              </span>
            )}
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
