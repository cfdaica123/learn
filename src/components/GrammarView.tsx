import React, { useState, useMemo } from 'react';
import { GrammarItem, JLPTLevel } from '../types';
import { GRAMMAR_DATA } from '../data/grammarData';
import { BookOpen, Search, Sparkles, Lightbulb, ChevronRight, CheckCircle2, Bookmark, Info } from 'lucide-react';

interface GrammarViewProps {
  currentLevel: JLPTLevel;
  selectedLessons: number[];
  currentLesson: number | 'all';
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  currentLevel,
  selectedLessons,
  currentLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabLesson, setActiveTabLesson] = useState<number | 'all'>(
    selectedLessons.length === 1 ? selectedLessons[0] : (currentLesson !== 'all' ? currentLesson : 'all')
  );

  // Available lessons based on level
  const totalLessons = currentLevel === 'N5' ? 25 : 25; // 1-25 for N5, 26-50 for N4
  const startLesson = currentLevel === 'N5' ? 1 : 26;
  const endLesson = currentLevel === 'N5' ? 25 : 50;

  // Filter grammar items
  const filteredGrammar = useMemo(() => {
    return GRAMMAR_DATA.filter((item) => {
      // Level check
      if (item.level !== currentLevel) return false;

      // Lesson filter
      if (activeTabLesson !== 'all') {
        if (item.lesson !== activeTabLesson) return false;
      } else if (selectedLessons.length > 0) {
        if (!selectedLessons.includes(item.lesson)) return false;
      } else if (currentLesson !== 'all') {
        if (item.lesson !== currentLesson) return false;
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
  }, [currentLevel, activeTabLesson, selectedLessons, currentLesson, searchQuery]);

  // Sync active lesson when parent filter changes
  React.useEffect(() => {
    if (selectedLessons.length === 1) {
      setActiveTabLesson(selectedLessons[0]);
    } else if (currentLesson !== 'all') {
      setActiveTabLesson(currentLesson);
    } else if (selectedLessons.length === 0) {
      setActiveTabLesson('all');
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

      {/* Search & Quick Lesson Selector */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-rose-100 shadow-xs space-y-3">
        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm mẫu ngữ pháp, cấu trúc (vd: から, ても, たら, ないで), từ khóa, ý nghĩa..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Horizontal Scrollable Lesson List */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <button
            onClick={() => setActiveTabLesson('all')}
            className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
              activeTabLesson === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả bài
          </button>
          {lessonList.map((lNum) => (
            <button
              key={lNum}
              onClick={() => setActiveTabLesson(lNum)}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer ${
                activeTabLesson === lNum
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bài {lNum}
            </button>
          ))}
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
              {/* Card Header */}
              <div className="bg-rose-50/60 px-4 sm:px-5 py-3 border-b border-rose-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold shrink-0">
                    Bài {item.lesson}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded-md shrink-0">
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
        /* Empty / Ready for next data prompt state */
        <div className="bg-white rounded-2xl border-2 border-dashed border-rose-200 p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-500 shadow-xs">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="text-base sm:text-lg font-bold text-gray-900">
              Sẵn Sàng Nạp Dữ Liệu Ngữ Pháp!
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Phần khung giải thích ngữ pháp đã được thiết kế hoàn thiện. Ở prompt tiếp theo khi bạn gửi nội dung ngữ pháp ({currentLevel} / Bài {activeTabLesson === 'all' ? 'tiếp theo' : activeTabLesson}), hệ thống sẽ hiển thị đầy đủ ngay lập tức!
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setActiveTabLesson(1)}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Xem mẫu Bài 1 & 2
            </button>
            <button
              onClick={() => {
                setActiveTabLesson('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all cursor-pointer"
            >
              Xóa bộ lọc
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
