import React from 'react';
import { StudyMode } from '../types';
import { BookOpen, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

interface HeaderProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
  totalFilteredCount: number;
  masteredCount: number;
  totalVocabularyCount: number;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  totalFilteredCount,
  masteredCount,
  totalVocabularyCount,
  onResetProgress,
}) => {
  const percentMastered = totalVocabularyCount > 0 
    ? Math.round((masteredCount / totalVocabularyCount) * 100) 
    : 0;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-rose-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-rose-300 shadow-sm shrink-0 bg-white">
              <img 
                src={logoImg} 
                alt="iBeos Avatar" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl font-black text-gray-900 tracking-tight truncate">
                  Minna Flashcard
                </h1>
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                  N5 (1-25)
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-rose-600 font-semibold truncate">
                iBeos - 山 - cps - 🥕
              </p>
            </div>
          </div>

          {/* Mastered Progress Tracker (Compact for Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-3 bg-gray-50/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-gray-200/80 shrink-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-gray-700">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden xs:inline">Thuộc:</span>
                <span className="text-emerald-700 font-bold">{masteredCount}</span>
                <span className="text-gray-400">/{totalVocabularyCount}</span>
                <span className="text-rose-600 font-bold hidden sm:inline">({percentMastered}%)</span>
              </div>
              <div className="w-16 sm:w-36 h-1 sm:h-1.5 bg-gray-200 rounded-full mt-0.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${percentMastered}%` }}
                />
              </div>
            </div>

            <button
              onClick={onResetProgress}
              title="Xóa toàn bộ cache, đưa ứng dụng về trạng thái ban đầu"
              className="flex items-center gap-1 text-gray-500 hover:text-rose-600 hover:bg-rose-50 p-1 sm:px-2 sm:py-1 rounded-lg transition-colors active:scale-95 text-xs font-semibold cursor-pointer"
            >
              <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
              <span className="hidden md:inline text-[11px]">Về ban đầu</span>
            </button>
          </div>

          {/* Desktop Navigation Modes */}
          <div className="hidden md:flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200/70">
            <button
              onClick={() => onSelectMode('flashcard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                currentMode === 'flashcard'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Thẻ Flashcard</span>
            </button>

            <button
              onClick={() => onSelectMode('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                currentMode === 'quiz'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-xs">🎯</span>
              <span>Trắc nghiệm</span>
            </button>

            <button
              onClick={() => onSelectMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                currentMode === 'list'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-500" />
              <span>Tra cứu ({totalFilteredCount})</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
