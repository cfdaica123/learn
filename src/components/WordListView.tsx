import React from 'react';
import { VocabularyItem } from '../types';
import { Volume2, Star, CheckCircle, Check } from 'lucide-react';
import { speakJapanese } from '../utils/speech';

interface WordListViewProps {
  items: VocabularyItem[];
  masteredIds: Set<string>;
  starredIds: Set<string>;
  onToggleMastered: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export const WordListView: React.FC<WordListViewProps> = ({
  items,
  masteredIds,
  starredIds,
  onToggleMastered,
  onToggleStar,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100 max-w-lg mx-auto">
        Không có từ vựng nào khớp với bộ lọc hiện tại.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 overflow-hidden mb-20 sm:mb-6">
      
      {/* Header Info */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50/80 border-b border-gray-200/70 flex items-center justify-between text-xs font-bold text-gray-600">
        <span>Danh sách từ vựng ({items.length} từ)</span>
        <span className="text-gray-400 font-medium hidden sm:inline">Bấm biểu tượng loa để nghe phát âm</span>
      </div>

      {/* List content */}
      <div className="divide-y divide-gray-100 max-h-[650px] overflow-y-auto">
        {items.map((item) => {
          const isMastered = masteredIds.has(item.id);
          const isStarred = starredIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-rose-50/20 transition-colors ${
                isMastered ? 'bg-emerald-50/30' : ''
              }`}
            >
              {/* Left col: Lesson & Words */}
              <div className="flex items-start gap-3 min-w-[200px]">
                <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                  Bài {item.lesson}
                </span>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-gray-900 font-japanese">
                      {item.word}
                    </span>
                    <button
                      onClick={() => speakJapanese(item.hiragana || item.word)}
                      className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-rose-600 font-semibold">
                    {item.hiragana}
                  </p>
                </div>
              </div>

              {/* Center col: Âm Hán Việt */}
              <div className="min-w-[130px]">
                {item.hanViet ? (
                  <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 rounded-md uppercase">
                    {item.hanViet}
                  </span>
                ) : (
                  <span className="text-xs text-gray-300 italic">—</span>
                )}
              </div>

              {/* Right col: Vietnamese Meaning */}
              <div className="flex-1 text-sm font-medium text-gray-800">
                {item.meaning}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => onToggleStar(item.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isStarred
                      ? 'text-yellow-500 bg-yellow-50'
                      : 'text-gray-300 hover:text-yellow-500 hover:bg-gray-50'
                  }`}
                  title="Đánh dấu sao"
                >
                  <Star className={`w-4 h-4 ${isStarred ? 'fill-yellow-400' : ''}`} />
                </button>

                <button
                  onClick={() => onToggleMastered(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    isMastered
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                  title="Đánh dấu đã thuộc"
                >
                  {isMastered ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Đã thuộc</span>
                    </>
                  ) : (
                    <span>Chưa thuộc</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
