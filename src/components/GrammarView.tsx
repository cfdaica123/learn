import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GrammarItem, JLPTLevel } from '../types';
import { GRAMMAR_DATA } from '../data/grammarData';
import { BookOpen, Search, Sparkles, Lightbulb, ChevronRight, ChevronLeft, BookMarked, Info } from 'lucide-react';

interface GrammarViewProps {
  currentLevel: JLPTLevel;
  selectedLessons: number[];
  currentLesson: number | 'all';
}

type GrammarScope = 'all' | 'part1' | 'part2' | number;

/**
 * Responsive Grammar Card Title:
 * When the title overflows on small screens, continuously scrolls all the way through
 * seamlessly at a brisk readable speed (no reversing/bouncing back).
 */
const GrammarTitle: React.FC<{ title: string }> = ({ title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [overflows, setOverflows] = useState<boolean>(false);
  const [textWidth, setTextWidth] = useState<number>(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const cWidth = containerRef.current.clientWidth;
        const sWidth = textRef.current.scrollWidth;
        if (sWidth > cWidth + 4) {
          setOverflows(true);
          setTextWidth(sWidth);
        } else {
          setOverflows(false);
          setTextWidth(0);
        }
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [title]);

  if (!overflows) {
    return (
      <div ref={containerRef} className="flex-1 min-w-0 overflow-hidden py-0.5">
        <h3
          ref={textRef}
          className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap inline-block"
          title={title}
        >
          {title}
        </h3>
      </div>
    );
  }

  // Speed: ~70px per second for a brisk, smooth continuous marquee (fast enough so user doesn't wait)
  const duration = Math.max(3.5, Math.min(8, (textWidth + 48) / 70));

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-0 overflow-hidden py-0.5 relative"
      title={title}
    >
      <div
        className="flex w-max hover:[animation-play-state:paused] active:[animation-play-state:paused]"
        style={{
          animation: `marquee-continuous ${duration}s linear infinite`,
        }}
      >
        <h3
          ref={textRef}
          className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap pr-12 inline-block shrink-0"
        >
          {title}
        </h3>
        <h3
          className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap pr-12 inline-block shrink-0"
          aria-hidden="true"
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export const GrammarView: React.FC<GrammarViewProps> = ({
  currentLevel,
  selectedLessons,
  currentLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active scope: 'all' | 'part1' | 'part2' | specific lesson number
  const [activeScope, setActiveScope] = useState<GrammarScope>(() => {
    if (selectedLessons.length === 1) return selectedLessons[0];
    if (currentLesson !== 'all') return currentLesson;
    return 'all';
  });

  // Available lessons based on level
  const startLesson = currentLevel === 'N5' ? 1 : 26;
  const endLesson = currentLevel === 'N5' ? 25 : 50;
  const part1Label = currentLevel === 'N5' ? 'Part 1 (1-15)' : 'Part 1 (26-37)';
  const part2Label = currentLevel === 'N5' ? 'Part 2 (16-25)' : 'Part 2 (38-50)';

  // Mouse & Touch drag scrolling refs (identically matched to Flashcard FilterBar)
  const lessonScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // Wheel horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (lessonScrollRef.current && e.deltaY !== 0) {
      lessonScrollRef.current.scrollLeft += e.deltaY * 1.2;
    }
  };

  // Mouse drag handlers
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

  // Click scroll buttons
  const scrollLeft = () => {
    if (lessonScrollRef.current) {
      lessonScrollRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (lessonScrollRef.current) {
      lessonScrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  // Auto center active lesson button
  useEffect(() => {
    if (lessonScrollRef.current) {
      const activeEl = lessonScrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeScope]);

  // Sync active lesson when parent filter changes
  useEffect(() => {
    if (selectedLessons.length === 1) {
      setActiveScope(selectedLessons[0]);
    } else if (currentLesson !== 'all') {
      setActiveScope(currentLesson);
    } else if (selectedLessons.length === 0 && currentLesson === 'all') {
      // Keep existing scope or 'all'
    }
  }, [currentLesson, selectedLessons]);

  // Lessons list based on level
  const lessonList = useMemo(() => {
    const list: number[] = [];
    for (let i = startLesson; i <= endLesson; i++) {
      list.push(i);
    }
    return list;
  }, [startLesson, endLesson]);

  // Filter grammar items
  const filteredGrammar = useMemo(() => {
    return GRAMMAR_DATA.filter((item) => {
      // Level check
      if (item.level !== currentLevel) return false;

      // Scope filter
      if (activeScope === 'part1') {
        const isPart1 = currentLevel === 'N5' ? (item.lesson >= 1 && item.lesson <= 15) : (item.lesson >= 26 && item.lesson <= 37);
        if (!isPart1) return false;
      } else if (activeScope === 'part2') {
        const isPart2 = currentLevel === 'N5' ? (item.lesson >= 16 && item.lesson <= 25) : (item.lesson >= 38 && item.lesson <= 50);
        if (!isPart2) return false;
      } else if (typeof activeScope === 'number') {
        if (item.lesson !== activeScope) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchStructure = item.structure.toLowerCase().includes(q);
        const matchExpl = item.explanation.toLowerCase().includes(q);
        const matchExamples = item.examples.some(
          ex => ex.japanese.toLowerCase().includes(q) || ex.vietnamese.toLowerCase().includes(q)
        );
        return matchTitle || matchMeaning || matchStructure || matchExpl || matchExamples;
      }

      return true;
    });
  }, [currentLevel, activeScope, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6">
      
      {/* Top Banner / Heading */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 rounded-2xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ngữ Pháp Minna no Nihongo {currentLevel} (Bài {startLesson} - {endLesson})</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Giải Thích Ngữ Pháp Chi Tiết
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-xl">
              Tổng hợp cấu trúc, quy tắc trợ từ, ý nghĩa và câu ví dụ song ngữ Nhật - Việt giúp bạn nắm chắc bản chất câu nói.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 shrink-0 self-start sm:self-auto text-center">
            <span className="block text-[11px] text-rose-100 font-medium">Đang hiển thị</span>
            <span className="text-lg font-black">{filteredGrammar.length} mẫu câu</span>
          </div>
        </div>
      </div>

      {/* Search & Quick Lesson Selector Bar - Matched with Flashcard FilterBar */}
      <div 
        className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-3 sm:p-4 space-y-3 select-none"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm mẫu ngữ pháp, cấu trúc (vd: から, ても, たら, ないで), từ khóa, ý nghĩa..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-all select-text"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Horizontal Lesson Selector Scroller */}
        <div className="relative flex items-center pt-1 border-t border-gray-100">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={scrollLeft}
            className="hidden sm:flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 shrink-0 mr-1.5 transition-colors cursor-pointer"
            title="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Draggable & Smooth Scrollable Container */}
          <div 
            ref={lessonScrollRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 touch-pan-x scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap flex items-center gap-1 shrink-0 mr-1 pointer-events-none select-none">
              <BookMarked className="w-3.5 h-3.5 text-rose-500" />
              Bài ({currentLevel}):
            </span>

            {/* Option: Cả 25 Bài */}
            <button
              type="button"
              data-active={activeScope === 'all'}
              onClick={() => {
                if (!hasDraggedRef.current) setActiveScope('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
                activeScope === 'all'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cả 25 Bài ({currentLevel})
            </button>

            {/* Option: Part 1 */}
            <button
              type="button"
              data-active={activeScope === 'part1'}
              onClick={() => {
                if (!hasDraggedRef.current) setActiveScope('part1');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
                activeScope === 'part1'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {part1Label}
            </button>

            {/* Option: Part 2 */}
            <button
              type="button"
              data-active={activeScope === 'part2'}
              onClick={() => {
                if (!hasDraggedRef.current) setActiveScope('part2');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
                activeScope === 'part2'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {part2Label}
            </button>

            <span className="w-px h-4 bg-gray-200 mx-1 shrink-0 pointer-events-none" />

            {/* Individual Lessons: Bài 1 -> Bài 25 */}
            {lessonList.map((lNum) => (
              <button
                key={lNum}
                type="button"
                data-active={activeScope === lNum}
                onClick={() => {
                  if (!hasDraggedRef.current) setActiveScope(lNum);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
                  activeScope === lNum
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bài {lNum}
              </button>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={scrollRight}
            className="hidden sm:flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 shrink-0 ml-1.5 transition-colors cursor-pointer"
            title="Cuộn sang phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grammar Cards List */}
      {filteredGrammar.length > 0 ? (
        <div className="space-y-4">
          {filteredGrammar.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:border-rose-300 transition-all overflow-hidden"
            >
              {/* Card Header with auto-glide/marquee on small screens */}
              <div className="bg-rose-50/60 px-3.5 sm:px-5 py-3 border-b border-rose-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                  <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold shrink-0 shadow-2xs">
                    Bài {item.lesson}
                  </span>
                  <GrammarTitle title={item.title} />
                </div>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md shrink-0">
                  {item.level}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-4">
                
                {/* Structure Box */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 p-3 sm:p-3.5 rounded-xl border border-amber-200/70">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    Cấu trúc công thức:
                  </span>
                  <div className="text-sm sm:text-base font-bold text-gray-900 font-sans tracking-wide">
                    {item.structure}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-rose-700 mt-1">
                    ➜ {item.meaning}
                  </div>
                </div>

                {/* Explanation */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-900 block mb-1">💡 Giải thích cách dùng:</span>
                  <p>{item.explanation}</p>
                </div>

                {/* Examples */}
                {item.examples && item.examples.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-800 block">Ví dụ minh họa:</span>
                    <div className="space-y-2">
                      {item.examples.map((ex, exIdx) => (
                        <div 
                          key={exIdx} 
                          className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 hover:bg-rose-50/30 transition-colors"
                        >
                          <div className="text-sm sm:text-base font-bold text-gray-900 font-japanese">
                            {ex.japanese}
                          </div>
                          {ex.romaji && (
                            <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                              {ex.romaji}
                            </div>
                          )}
                          <div className="text-xs sm:text-sm text-rose-800 font-medium mt-1">
                            {ex.vietnamese}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Notes */}
                {item.notes && item.notes.length > 0 && (
                  <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Lưu ý quan trọng:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-rose-800/90">
                      {item.notes.map((note, nIdx) => (
                        <li key={nIdx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty / Not found state */
        <div className="bg-white rounded-2xl border-2 border-dashed border-rose-200 p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-500 shadow-xs">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="text-base sm:text-lg font-bold text-gray-900">
              Không tìm thấy mẫu ngữ pháp phù hợp
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {searchQuery ? `Không có mẫu ngữ pháp nào khớp với từ khóa "${searchQuery}".` : `Chưa có mẫu ngữ pháp cho lựa chọn này.`}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setActiveScope('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Xem tất cả bài
            </button>
          </div>
        </div>
      )}

      {/* Footer Info Box */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Mẹo học ngữ pháp:</span> Kết hợp luyện tập giữa Flashcard để thuộc từ vựng, Trắc nghiệm để phản xạ nhanh, và Ngữ pháp để hiểu rõ kết cấu câu trong giao tiếp tiếng Nhật.
        </div>
      </div>

    </div>
  );
};
