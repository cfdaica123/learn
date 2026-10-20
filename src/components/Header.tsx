import React from 'react';
import { StudyMode, JLPTLevel } from '../types';
import { BookOpen, Sparkles, CheckCircle2, RotateCw, Trophy, BookMarked, HardDrive } from 'lucide-react';
import mountainLogoImg from '../assets/images/mountain_logo_1792384187876.jpg';

interface HeaderProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
  currentLevel: JLPTLevel;
  onSelectLevel: (level: JLPTLevel) => void;
  totalFilteredCount: number;
  masteredCount: number;
  totalVocabularyCount: number;
  onResetProgress: () => void;
  onOpenBackupModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  currentLevel,
  onSelectLevel,
  totalFilteredCount,
  masteredCount,
  totalVocabularyCount,
  onResetProgress,
  onOpenBackupModal,
}) => {
  const percentMastered = totalVocabularyCount > 0 
    ? Math.round((masteredCount / totalVocabularyCount) * 100) 
    : 0;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-rose-100 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & Brand & Level Selector */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0">
            {/* Mountain Themed Logo */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border-2 border-rose-200/90 shadow-sm shrink-0 bg-white ring-2 ring-rose-100">
              <img 
                src={mountainLogoImg} 
                alt="Yama Nihongo Mountain Logo" 
                className="w-full h-full object-cover object-center" 
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-xl font-black text-gray-900 tracking-tight truncate flex items-center gap-1">
                  <span>Yama Nihongo</span>
                  <span className="text-xs sm:text-sm font-bold text-rose-600 font-japanese hidden xs:inline">
                    山
                  </span>
                </h1>

                {/* Switchable JLPT Level Selector (N5 / N4) */}
                <div className="flex items-center p-0.5 bg-gray-100/90 rounded-lg border border-gray-200 shrink-0">
                  <button
                    onClick={() => onSelectLevel('N5')}
                    title="Minna no Nihongo N5 (Bài 1 - 25)"
                    className={`px-2 py-0.5 text-[11px] font-black rounded-md transition-all cursor-pointer ${
                      currentLevel === 'N5'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    N5
                  </button>
                  <button
                    onClick={() => onSelectLevel('N4')}
                    title="Minna no Nihongo N4 (Bài 26 - 50)"
                    className={`px-2 py-0.5 text-[11px] font-black rounded-md transition-all cursor-pointer ${
                      currentLevel === 'N4'
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    N4
                  </button>
                </div>
              </div>

              {/* Stylized iBeos - 山 - cps - 🥕 Capsule */}
              <div className="flex items-center gap-1 mt-0.5">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-rose-50/90 border border-rose-200/60 text-[9px] sm:text-[10px] font-bold text-rose-700 shadow-2xs">
                  <span>iBeos</span>
                  <span className="text-rose-300">•</span>
                  <span className="font-black text-rose-900">山</span>
                  <span className="text-rose-300">•</span>
                  <span>cps</span>
                  <span className="text-rose-300">•</span>
                  <span>🥕</span>
                </div>
                <span className="text-[10px] text-gray-400 hidden sm:inline">•</span>
                <span className="text-[10px] text-gray-500 font-medium hidden sm:inline">
                  {currentLevel === 'N5' ? 'Bài 1 - 25' : 'Bài 26 - 50'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Section: Progress + Navigation Modes */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mastered Progress Tracker */}
            <div className="flex items-center gap-1.5 sm:gap-3 bg-gray-50/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-gray-200/80 shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                  <span className="hidden xs:inline">Thuộc:</span>
                  <span className="text-emerald-700 font-bold">{masteredCount}</span>
                  <span className="text-gray-400">/{totalVocabularyCount}</span>
                  <span className="text-rose-600 font-bold hidden sm:inline">({percentMastered}%)</span>
                </div>
                <div className="w-14 xs:w-20 sm:w-28 h-1 sm:h-1.5 bg-gray-200 rounded-full mt-0.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                    style={{ width: `${percentMastered}%` }}
                  />
                </div>
              </div>

              {onOpenBackupModal && (
                <button
                  onClick={onOpenBackupModal}
                  title="Xuất hoặc nhập file sao lưu (backup cache) để đổi máy không mất từ vựng đã học"
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors active:scale-95 text-xs font-bold cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-[11px]">Đổi máy (Backup)</span>
                </button>
              )}

              <button
                onClick={onResetProgress}
                title="Xóa toàn bộ cache, đưa ứng dụng về trạng thái ban đầu"
                className="flex items-center gap-1 text-gray-500 hover:text-rose-600 hover:bg-rose-50 p-1 sm:px-2 sm:py-1 rounded-lg transition-colors active:scale-95 text-xs font-semibold cursor-pointer"
              >
                <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
                <span className="hidden lg:inline text-[11px]">Về ban đầu</span>
              </button>
            </div>

            {/* Navigation Modes (Flashcard / Quiz / Ngữ pháp / Tra cứu) */}
            <div className="hidden md:flex items-center bg-gray-100/90 p-1 rounded-xl border border-gray-200/70">
              <button
                onClick={() => onSelectMode('flashcard')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  currentMode === 'flashcard'
                    ? 'bg-white text-rose-700 shadow-xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Flashcard</span>
              </button>

              <button
                onClick={() => onSelectMode('quiz')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  currentMode === 'quiz'
                    ? 'bg-white text-rose-700 shadow-xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Trắc nghiệm</span>
              </button>

              <button
                onClick={() => onSelectMode('grammar')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  currentMode === 'grammar'
                    ? 'bg-white text-rose-700 shadow-xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookMarked className="w-4 h-4 text-rose-500" />
                <span>Ngữ pháp</span>
              </button>

              <button
                onClick={() => onSelectMode('list')}
                className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  currentMode === 'list'
                    ? 'bg-white text-rose-700 shadow-xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span>Tra cứu ({totalFilteredCount})</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
