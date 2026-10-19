import React from 'react';
import { StudyMode } from '../types';
import { Sparkles, Trophy, BookOpen, BookMarked } from 'lucide-react';

interface MobileBottomNavProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
  filteredCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentMode,
  onSelectMode,
  filteredCount,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/90 shadow-lg px-2 py-1 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-4 gap-1">
        
        {/* Flashcard Tab */}
        <button
          onClick={() => onSelectMode('flashcard')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            currentMode === 'flashcard'
              ? 'text-rose-600 bg-rose-50/80 font-bold'
              : 'text-gray-500 font-medium hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Flashcard</span>
        </button>

        {/* Quiz Tab */}
        <button
          onClick={() => onSelectMode('quiz')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            currentMode === 'quiz'
              ? 'text-rose-600 bg-rose-50/80 font-bold'
              : 'text-gray-500 font-medium hover:text-gray-900'
          }`}
        >
          <Trophy className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Trắc nghiệm</span>
        </button>

        {/* Grammar Tab */}
        <button
          onClick={() => onSelectMode('grammar')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
            currentMode === 'grammar'
              ? 'text-rose-600 bg-rose-50/80 font-bold'
              : 'text-gray-500 font-medium hover:text-gray-900'
          }`}
        >
          <BookMarked className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Ngữ pháp</span>
        </button>

        {/* List Tab */}
        <button
          onClick={() => onSelectMode('list')}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all active:scale-95 relative cursor-pointer ${
            currentMode === 'list'
              ? 'text-rose-600 bg-rose-50/80 font-bold'
              : 'text-gray-500 font-medium hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Tra cứu</span>
        </button>

      </div>
    </nav>
  );
};
