import React, { useState, useEffect } from 'react';
import { X, Check, BookOpen, Sparkles, RotateCcw } from 'lucide-react';

interface MultiLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLessons: number[];
  onApply: (lessons: number[]) => void;
}

export const MultiLessonModal: React.FC<MultiLessonModalProps> = ({
  isOpen,
  onClose,
  selectedLessons,
  onApply,
}) => {
  const [tempSelected, setTempSelected] = useState<number[]>(selectedLessons);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedLessons);
    }
  }, [isOpen, selectedLessons]);

  if (!isOpen) return null;

  const toggleLesson = (lessonNum: number) => {
    setTempSelected((prev) => {
      if (prev.includes(lessonNum)) {
        return prev.filter((l) => l !== lessonNum);
      } else {
        return [...prev, lessonNum].sort((a, b) => a - b);
      }
    });
  };

  const selectRange = (start: number, end: number) => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    setTempSelected(range);
  };

  const selectAll = () => {
    setTempSelected(Array.from({ length: 25 }, (_, i) => i + 1));
  };

  const clearAll = () => {
    setTempSelected([]);
  };

  const handleConfirm = () => {
    onApply(tempSelected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                Chọn nhiều bài học & trắc nghiệm
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Chọn tổ hợp các bài để học thẻ và làm bài test (ví dụ: Bài 1, 2, 3)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="py-3 border-b border-gray-100">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-500" />
            Chọn nhanh tổ hợp:
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => selectRange(1, 3)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer"
            >
              Bài 1 - 3
            </button>
            <button
              type="button"
              onClick={() => selectRange(1, 5)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer"
            >
              Bài 1 - 5
            </button>
            <button
              type="button"
              onClick={() => selectRange(6, 10)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer"
            >
              Bài 6 - 10
            </button>
            <button
              type="button"
              onClick={() => selectRange(11, 15)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer"
            >
              Bài 11 - 15
            </button>
            <button
              type="button"
              onClick={() => selectRange(16, 20)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer"
            >
              Bài 16 - 20
            </button>
            <button
              type="button"
              onClick={() => selectRange(21, 25)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 transition-colors cursor-pointer"
            >
              Bài 21 - 25
            </button>
            <button
              type="button"
              onClick={() => selectRange(1, 15)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Part 1 (1-15)
            </button>
            <button
              type="button"
              onClick={() => selectRange(16, 25)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Part 2 (16-25)
            </button>
            <button
              type="button"
              onClick={selectAll}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cả 25 Bài
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-100 text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        {/* 25 Lessons Grid */}
        <div className="flex-1 overflow-y-auto py-3">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Chạm vào từng bài để bật/tắt chọn:
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
            {Array.from({ length: 25 }, (_, i) => i + 1).map((l) => {
              const isSelected = tempSelected.includes(l);
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => toggleLesson(l)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl text-xs transition-all cursor-pointer border select-none active:scale-95 ${
                    isSelected
                      ? 'bg-rose-600 border-rose-600 text-white font-bold shadow-xs ring-2 ring-rose-200'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-rose-50/50 hover:border-rose-200 font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    Bài {l}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info & Apply button */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-600">
            {tempSelected.length === 0 ? (
              <span className="text-gray-400 italic">Chưa chọn bài nào (sẽ học cả 25 bài)</span>
            ) : tempSelected.length === 25 ? (
              <span className="font-bold text-gray-800">Đang chọn tất cả 25 bài</span>
            ) : (
              <span>
                Đang chọn: <strong className="text-rose-600">{tempSelected.length} bài</strong>{' '}
                <span className="text-gray-400">
                  ({tempSelected.map((n) => `B.${n}`).join(', ')})
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 sm:px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Áp dụng {tempSelected.length > 0 && tempSelected.length < 25 ? `(${tempSelected.length} bài)` : ''}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
