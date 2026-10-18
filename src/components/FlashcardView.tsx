import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VocabularyItem, CardOrientation } from '../types';
import { 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { speakJapanese } from '../utils/speech';
import confetti from 'canvas-confetti';

interface FlashcardViewProps {
  items: VocabularyItem[];
  orientation: CardOrientation;
  masteredIds: Set<string>;
  learningIds: Set<string>;
  starredIds: Set<string>;
  onMarkStatus: (id: string, status: 'mastered' | 'learning' | 'unseen') => void;
  onToggleStar: (id: string) => void;
  hideMastered: boolean;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  items,
  orientation,
  masteredIds,
  learningIds,
  starredIds,
  onMarkStatus,
  onToggleStar,
  hideMastered,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showHanVietHint, setShowHanVietHint] = useState(false);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 45; // in px

  // Keep index within bounds if list size changes
  useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
    setShowHanVietHint(false);
  }, [items.length]);

  const currentItem: VocabularyItem | undefined = items[currentIndex];
  const isMastered = currentItem ? masteredIds.has(currentItem.id) : false;
  const isLearning = currentItem ? learningIds.has(currentItem.id) : false;
  const isStarred = currentItem ? starredIds.has(currentItem.id) : false;

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    setIsFlipped(false);
    setShowHanVietHint(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    setIsFlipped(false);
    setShowHanVietHint(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handlePlayAudio = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      if (!currentItem) return;
      speakJapanese(currentItem.hiragana || currentItem.word);
    },
    [currentItem]
  );

  // Swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Auto-play feature
  useEffect(() => {
    if (!isAutoPlaying || items.length === 0) return;

    const timer = setTimeout(() => {
      if (!isFlipped) {
        setIsFlipped(true);
      } else {
        handleNext();
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, isFlipped, handleNext, items.length]);

  // Audio pronounce on card view change if Japanese front
  useEffect(() => {
    if (currentItem && orientation === 'ja-to-vi' && !isFlipped) {
      speakJapanese(currentItem.hiragana || currentItem.word);
    }
  }, [currentIndex, orientation]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        if (currentItem) onMarkStatus(currentItem.id, 'learning');
      } else if (e.key === '2') {
        if (currentItem) onMarkStatus(currentItem.id, 'unseen');
      } else if (e.key === '3') {
        if (currentItem) {
          onMarkStatus(currentItem.id, 'mastered');
          confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
          handleNext();
        }
      } else if (e.key === 's' || e.key === 'S') {
        if (currentItem) onToggleStar(currentItem.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, currentItem, onMarkStatus, onToggleStar]);

  const handleShuffle = () => {
    if (items.length <= 1) return;
    const randomIdx = Math.floor(Math.random() * items.length);
    setCurrentIndex(randomIdx);
    setIsFlipped(false);
    setShowHanVietHint(false);
  };

  const handleMarkMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentItem) return;
    onMarkStatus(currentItem.id, 'mastered');
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.75 } });
    if (hideMastered) {
      // It will disappear from active items
    } else {
      handleNext();
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-xs border border-gray-100 max-w-xl mx-auto my-6 sm:my-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 sm:mb-4">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          Tuyệt vời! Không còn thẻ nào cần học
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 leading-relaxed">
          {hideMastered
            ? 'Bạn đã thuộc toàn bộ từ vựng trong phạm vi lọc này. Hãy thử tắt "Ẩn từ đã thuộc" hoặc đổi Part/Bài để tiếp tục ôn tập!'
            : 'Không tìm thấy từ vựng nào khớp với bộ lọc hiện tại.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-3 sm:space-y-4">
      
      {/* Top progress and controls bar */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
        <div className="flex items-center gap-1.5">
          <span className="bg-rose-50 text-rose-700 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-rose-200/60 font-bold text-[11px] sm:text-xs">
            Bài {currentItem.lesson} • Part {currentItem.part}
          </span>
          {currentItem.hasKanji && (
            <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md border border-amber-200/80 font-medium text-[10px] sm:text-[11px]">
              Chữ Hán
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-gray-600 font-bold text-xs">
            {currentIndex + 1} / {items.length}
          </span>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border transition-all text-xs ${
              isAutoPlaying
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs animate-pulse'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            title="Tự động lật và chuyển thẻ"
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="text-[11px]">Auto</span>
          </button>

          <button
            onClick={handleShuffle}
            className="p-1 sm:p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
            title="Xáo trộn thứ tự thẻ"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container with Mobile Swipe detection */}
      <div 
        onClick={handleFlip}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative h-[290px] sm:h-96 w-full cursor-pointer select-none perspective-1000 group touch-pan-y"
      >
        <div 
          className={`w-full h-full relative duration-500 transform-style-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= CARD FRONT ================= */}
          <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-2 border-rose-100/90 shadow-md hover:shadow-xl hover:border-rose-200 transition-all">
            
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-rose-500 flex items-center gap-1">
                <span>🎴</span> {orientation === 'ja-to-vi' ? 'Tiếng Nhật' : 'Nghĩa tiếng Việt'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(currentItem.id);
                  }}
                  className={`p-2 rounded-xl transition-all active:scale-95 ${
                    isStarred
                      ? 'text-yellow-500 bg-yellow-50'
                      : 'text-gray-300 hover:text-yellow-500 hover:bg-gray-50'
                  }`}
                  title="Lưu từ vựng"
                >
                  <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${isStarred ? 'fill-yellow-400' : ''}`} />
                </button>
                
                <button
                  onClick={handlePlayAudio}
                  className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 active:scale-95 transition-all"
                  title="Phát âm tiếng Nhật"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Front Center Content */}
            <div className="my-auto text-center py-2 sm:py-4 px-2">
              {orientation === 'ja-to-vi' ? (
                <div>
                  <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-wide font-japanese break-words">
                    {currentItem.word}
                  </h2>
                  
                  {/* Subtle hiragana hint below word if Kanji */}
                  {currentItem.word !== currentItem.hiragana && (
                    <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2 font-medium tracking-wider">
                      {currentItem.hiragana}
                    </p>
                  )}

                  {/* Han-Viet hint button if user wants a clue */}
                  {currentItem.hanViet && (
                    <div className="mt-2.5 sm:mt-4">
                      {showHanVietHint ? (
                        <span className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] sm:text-xs font-bold rounded-lg uppercase tracking-wider animate-fade-in">
                          Âm Hán: {currentItem.hanViet}
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowHanVietHint(true);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-amber-700 bg-gray-50 hover:bg-amber-50 px-2.5 py-1 rounded-full border border-gray-200 hover:border-amber-200 transition-colors active:scale-95"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Gợi ý âm Hán-Việt</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-relaxed">
                    {currentItem.meaning}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1 sm:mt-2 font-medium">
                    Chạm để xem cách đọc và chữ viết tiếng Nhật
                  </p>
                </div>
              )}
            </div>

            {/* Front Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-2.5 sm:pt-3">
              <span className="text-[10px] sm:text-[11px] flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-rose-400" /> Chạm thẻ để lật xem đáp án
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-400">
                # {currentItem.id}
              </span>
            </div>
          </div>

          {/* ================= CARD BACK (FLIPPED) ================= */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-gradient-to-b from-white via-rose-50/20 to-rose-50/40 rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-2 border-rose-300 shadow-xl">
            
            {/* Back Header */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-emerald-600 flex items-center gap-1">
                <span>✨</span> Đáp án chi tiết
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePlayAudio}
                  className="p-2 rounded-xl text-rose-600 bg-white shadow-xs border border-rose-100 hover:bg-rose-50 active:scale-95 transition-all"
                  title="Phát âm tiếng Nhật"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Back Center Content */}
            <div className="my-auto text-center space-y-2 sm:space-y-3 py-1 sm:py-2 px-2">
              <div className="space-y-0.5 sm:space-y-1">
                <h3 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-wide font-japanese break-words">
                  {currentItem.word}
                </h3>
                <p className="text-base sm:text-lg text-rose-600 font-bold tracking-wider">
                  {currentItem.hiragana}
                </p>
              </div>

              {/* HÁN - VIỆT BADGE */}
              {currentItem.hanViet ? (
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 bg-amber-100/90 text-amber-900 border border-amber-300 rounded-xl shadow-xs">
                  <span className="text-[10px] sm:text-[11px] font-medium text-amber-700">HÁN VIỆT:</span>
                  <span className="text-xs sm:text-sm font-black tracking-wider uppercase">
                    {currentItem.hanViet}
                  </span>
                </div>
              ) : null}

              {/* Nghĩa Tiếng Việt */}
              <div className="pt-1">
                <p className="text-lg sm:text-2xl font-bold text-gray-800 leading-snug">
                  {currentItem.meaning}
                </p>
              </div>
            </div>

            {/* Back Footer Quick Indicator */}
            <div className="text-center text-[11px] text-gray-400 border-t border-rose-100/80 pt-2">
              <span>Đánh giá ghi nhớ bên dưới</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Đánh giá mức độ ghi nhớ (Ergonomic for thumbs) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-0.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (currentItem) onMarkStatus(currentItem.id, 'learning');
            handleNext();
          }}
          className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all active:scale-95 ${
            isLearning
              ? 'bg-red-50 border-red-300 text-red-700 ring-2 ring-red-400'
              : 'bg-white border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50/50 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-red-600 mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Chưa nhớ</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">Ôn lại sớm</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (currentItem) onMarkStatus(currentItem.id, 'unseen');
            handleNext();
          }}
          className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:border-amber-200 hover:bg-amber-50/50 shadow-xs transition-all active:scale-95"
        >
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-600 mb-0.5">
            <span>🤔</span>
            <span>Phân vân</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">Học tiếp</span>
        </button>

        <button
          onClick={handleMarkMastered}
          className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all active:scale-95 ${
            isMastered
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 ring-2 ring-emerald-400'
              : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-200 hover:bg-emerald-50/50 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-600 mb-0.5">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Đã thuộc</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
            {hideMastered ? 'Ẩn và qua' : 'Ghi nhớ'}
          </span>
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={items.length <= 1}
          className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-white text-gray-700 font-bold text-xs rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-95 disabled:opacity-40 transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Trước</span>
        </button>

        <button
          onClick={handleFlip}
          className="px-3 sm:px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs rounded-xl border border-rose-200 active:scale-95 transition-all"
        >
          Lật thẻ [Space]
        </button>

        <button
          onClick={handleNext}
          disabled={items.length <= 1}
          className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-white text-gray-700 font-bold text-xs rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-95 disabled:opacity-40 transition-all shadow-xs"
        >
          <span>Sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile touch hint and desktop keyboard hint */}
      <div className="text-center text-[10px] sm:text-[11px] text-gray-400 pt-1 pb-16 sm:pb-4">
        <span className="sm:hidden">
          💡 Mẹo vuốt trên điện thoại: <strong>Vuốt trái / phải</strong> để chuyển thẻ • <strong>Chạm</strong> để lật thẻ
        </span>
        <span className="hidden sm:inline">
          Phím tắt: <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">Space</kbd> Lật • 
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono ml-1">← / →</kbd> Chuyển thẻ • 
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono ml-1">1, 2, 3</kbd> Đánh giá
        </span>
      </div>

    </div>
  );
};
