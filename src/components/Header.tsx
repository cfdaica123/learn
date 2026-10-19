import React, { useState } from 'react';
import { StudyMode, JLPTLevel } from '../types';
import { BookOpen, Sparkles, CheckCircle2, RotateCw, Trophy, BookMarked, Menu, X } from 'lucide-react';
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
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Right Header Section: Progress + Desktop Nav + Mobile Hamburger */}
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

              <button
                onClick={onResetProgress}
                title="Xóa toàn bộ cache, đưa ứng dụng về trạng thái ban đầu"
                className="flex items-center gap-1 text-gray-500 hover:text-rose-600 hover:bg-rose-50 p-1 sm:px-2 sm:py-1 rounded-lg transition-colors active:scale-95 text-xs font-semibold cursor-pointer"
              >
                <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500" />
                <span className="hidden lg:inline text-[11px]">Về ban đầu</span>
              </button>
            </div>

            {/* Desktop Navigation Modes (Flashcard / Quiz / Ngữ pháp / Tra cứu) */}
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

            {/* Hamburger Menu Button for Mobile & Small Screens */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-all cursor-pointer active:scale-95 border border-gray-200/70 shrink-0"
              title="Mở menu chế độ học"
              aria-label="Menu điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Hamburger Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-orange-50/40">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-rose-200 shadow-xs shrink-0 bg-white">
                  <img 
                    src={mountainLogoImg} 
                    alt="Yama Nihongo Mountain Logo" 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <div>
                  <h2 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-1">
                    <span>Yama Nihongo</span>
                    <span className="text-xs font-bold text-rose-600 font-japanese">山</span>
                  </h2>
                  <div className="text-[10px] text-gray-500 font-medium">
                    Minna no Nihongo {currentLevel}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                aria-label="Đóng menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body - Navigation & Settings */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Level Selector Block */}
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Cấp độ JLPT:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectLevel('N5');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      currentLevel === 'N5'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="block font-black text-sm">Minna N5</span>
                    <span className={`block text-[11px] ${currentLevel === 'N5' ? 'text-rose-100' : 'text-gray-500'}`}>
                      Bài 1 - 25
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectLevel('N4');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      currentLevel === 'N4'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="block font-black text-sm">Minna N4</span>
                    <span className={`block text-[11px] ${currentLevel === 'N4' ? 'text-rose-100' : 'text-gray-500'}`}>
                      Bài 26 - 50
                    </span>
                  </button>
                </div>
              </div>

              {/* Study Modes Navigation */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block px-1">
                  Chế độ học tập:
                </span>

                {/* Flashcard */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('flashcard');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                    currentMode === 'flashcard'
                      ? 'bg-rose-50/90 border-rose-300 text-rose-900 shadow-2xs ring-1 ring-rose-200'
                      : 'bg-white border-gray-200/80 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    currentMode === 'flashcard' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">Flashcard</div>
                    <div className="text-[11px] text-gray-500 truncate">Lật thẻ từ vựng & xáo trộn thứ tự</div>
                  </div>
                  {currentMode === 'flashcard' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  )}
                </button>

                {/* Quiz */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('quiz');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                    currentMode === 'quiz'
                      ? 'bg-rose-50/90 border-rose-300 text-rose-900 shadow-2xs ring-1 ring-rose-200'
                      : 'bg-white border-gray-200/80 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    currentMode === 'quiz' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">Trắc nghiệm bẫy Kanji</div>
                    <div className="text-[11px] text-gray-500 truncate">Luyện phản xạ & phân biệt chữ tương tự</div>
                  </div>
                  {currentMode === 'quiz' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  )}
                </button>

                {/* Grammar */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('grammar');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                    currentMode === 'grammar'
                      ? 'bg-rose-50/90 border-rose-300 text-rose-900 shadow-2xs ring-1 ring-rose-200'
                      : 'bg-white border-gray-200/80 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    currentMode === 'grammar' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">Ngữ pháp chi tiết</div>
                    <div className="text-[11px] text-gray-500 truncate">25 bài, công thức, ví dụ & chú ý</div>
                  </div>
                  {currentMode === 'grammar' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  )}
                </button>

                {/* List / Search */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('list');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer active:scale-98 ${
                    currentMode === 'list'
                      ? 'bg-rose-50/90 border-rose-300 text-rose-900 shadow-2xs ring-1 ring-rose-200'
                      : 'bg-white border-gray-200/80 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    currentMode === 'list' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">Tra cứu ({totalFilteredCount})</div>
                    <div className="text-[11px] text-gray-500 truncate">Sổ tay từ vựng & âm Hán Việt</div>
                  </div>
                  {currentMode === 'list' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  )}
                </button>
              </div>

              {/* Learning Progress Summary */}
              <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã thuộc:
                  </span>
                  <span>{masteredCount} / {totalVocabularyCount} từ ({percentMastered}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                    style={{ width: `${percentMastered}%` }}
                  />
                </div>
              </div>

              {/* Reset Progress Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onResetProgress();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-gray-100 hover:bg-rose-50 text-gray-700 hover:text-rose-600 font-bold text-xs transition-colors cursor-pointer border border-gray-200 active:scale-98"
                >
                  <RotateCw className="w-4 h-4 text-rose-500" />
                  <span>Về ban đầu (Xóa toàn bộ Cache)</span>
                </button>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-gray-100 text-center bg-gray-50 text-[11px] text-gray-500 font-medium">
              <span className="font-bold text-rose-700">iBeos</span> ✦ 山 ✦ cps ✦ 🥕
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
