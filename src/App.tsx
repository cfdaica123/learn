import { useState, useEffect, useMemo } from 'react';
import { ALL_VOCABULARY } from './data/vocabulary';
import { FilterState, StudyMode, WordStatusFilter } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { WordListView } from './components/WordListView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { Check } from 'lucide-react';

const STORAGE_KEY_MASTERED = 'minna_mastered_words';
const STORAGE_KEY_LEARNING = 'minna_learning_words';
const STORAGE_KEY_STARRED = 'minna_starred_words';

export default function App() {
  const [currentMode, setCurrentMode] = useState<StudyMode>('flashcard');

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    part: 'all',
    lesson: 'all',
    kanjiOnly: false,
    statusFilter: 'all', // 'all' | 'mastered' (Từ đã nhớ) | 'unmastered' (Từ chưa nhớ)
    starredOnly: false,
    searchQuery: '',
  });

  // Persistent user learning sets
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTERED);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [learningIds, setLearningIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEARNING);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STARRED);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MASTERED, JSON.stringify(Array.from(masteredIds)));
    } catch (e) {
      console.error(e);
    }
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEARNING, JSON.stringify(Array.from(learningIds)));
    } catch (e) {
      console.error(e);
    }
  }, [learningIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STARRED, JSON.stringify(Array.from(starredIds)));
    } catch (e) {
      console.error(e);
    }
  }, [starredIds]);

  // Status handlers
  const handleMarkStatus = (id: string, status: 'mastered' | 'learning' | 'unseen') => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (status === 'mastered') {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });

    setLearningIds((prev) => {
      const next = new Set(prev);
      if (status === 'learning') {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleToggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleStar = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Reset Cache / Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleConfirmResetAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_MASTERED);
      localStorage.removeItem(STORAGE_KEY_LEARNING);
      localStorage.removeItem(STORAGE_KEY_STARRED);
    } catch (e) {
      console.error(e);
    }
    setMasteredIds(new Set());
    setLearningIds(new Set());
    setStarredIds(new Set());
    setFilter({
      part: 'all',
      lesson: 'all',
      kanjiOnly: false,
      statusFilter: 'all',
      starredOnly: false,
      searchQuery: '',
    });
    showToast('Đã xóa toàn bộ bộ nhớ cache! Ứng dụng đã trở về trạng thái ban đầu.');
  };

  // Filter application
  const filteredVocabulary = useMemo(() => {
    return ALL_VOCABULARY.filter((item) => {
      // Part Filter
      if (filter.part !== 'all' && item.part !== filter.part) {
        return false;
      }

      // Lesson Filter
      if (filter.lesson !== 'all' && item.lesson !== filter.lesson) {
        return false;
      }

      // Kanji Only Filter (Lọc ra những từ có Hán tự)
      if (filter.kanjiOnly && !item.hasKanji) {
        return false;
      }

      // USER REQUIREMENT: Hiển thị những từ đã nhớ, từ phân vân, hoặc những từ chưa nhớ
      if (filter.statusFilter === 'mastered' && !masteredIds.has(item.id)) {
        return false;
      }
      if (filter.statusFilter === 'hesitant' && !learningIds.has(item.id)) {
        return false;
      }
      if (filter.statusFilter === 'unmastered' && (masteredIds.has(item.id) || learningIds.has(item.id))) {
        return false;
      }

      // Starred Only Filter
      if (filter.starredOnly && !starredIds.has(item.id)) {
        return false;
      }

      // Search Query
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(query);
        const matchHiragana = item.hiragana.toLowerCase().includes(query);
        const matchMeaning = item.meaning.toLowerCase().includes(query);
        const matchHanViet = item.hanViet.toLowerCase().includes(query);
        if (!matchWord && !matchHiragana && !matchMeaning && !matchHanViet) {
          return false;
        }
      }

      return true;
    });
  }, [filter, masteredIds, learningIds, starredIds]);

  // Statistics in current Part / Lesson scope
  const wordsInScope = useMemo(() => {
    return ALL_VOCABULARY.filter((item) => {
      if (filter.part !== 'all' && item.part !== filter.part) return false;
      if (filter.lesson !== 'all' && item.lesson !== filter.lesson) return false;
      return true;
    });
  }, [filter.part, filter.lesson]);

  const kanjiCountInCurrentScope = useMemo(() => {
    return wordsInScope.filter((item) => item.hasKanji).length;
  }, [wordsInScope]);

  const masteredCountInCurrentScope = useMemo(() => {
    return wordsInScope.filter((item) => masteredIds.has(item.id)).length;
  }, [wordsInScope, masteredIds]);

  const hesitantCountInCurrentScope = useMemo(() => {
    return wordsInScope.filter((item) => learningIds.has(item.id)).length;
  }, [wordsInScope, learningIds]);

  const unmasteredCountInCurrentScope = useMemo(() => {
    return wordsInScope.length - masteredCountInCurrentScope - hesitantCountInCurrentScope;
  }, [wordsInScope.length, masteredCountInCurrentScope, hesitantCountInCurrentScope]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 flex flex-col antialiased">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        totalFilteredCount={filteredVocabulary.length}
        masteredCount={masteredIds.size}
        totalVocabularyCount={ALL_VOCABULARY.length}
        onResetProgress={() => setIsResetModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-4 py-3 sm:py-8">
        {/* Filter Controls (Part 1/2, Bài, Từ đã nhớ, Từ phân vân, Từ chưa nhớ, Lọc Hán tự) */}
        <FilterBar
          filter={filter}
          onFilterChange={(newF) => setFilter((prev) => ({ ...prev, ...newF }))}
          totalAvailable={filteredVocabulary.length}
          kanjiCount={kanjiCountInCurrentScope}
          masteredCount={masteredCountInCurrentScope}
          unmasteredCount={unmasteredCountInCurrentScope}
          hesitantCount={hesitantCountInCurrentScope}
          starredCount={starredIds.size}
          onResetAllData={() => setIsResetModalOpen(true)}
        />

        {/* View Mode Switching */}
        {currentMode === 'flashcard' && (
          <FlashcardView
            items={filteredVocabulary}
            masteredIds={masteredIds}
            learningIds={learningIds}
            starredIds={starredIds}
            onMarkStatus={handleMarkStatus}
            onToggleStar={handleToggleStar}
            statusFilter={filter.statusFilter}
            onSelectStatusFilter={(st) =>
              setFilter((prev) => ({ ...prev, statusFilter: st }))
            }
          />
        )}

        {currentMode === 'quiz' && (
          <QuizView
            items={filteredVocabulary}
            scopeKey={`${filter.part}_${filter.lesson}_${filter.kanjiOnly}`}
            onMarkMastered={(id) => handleMarkStatus(id, 'mastered')}
          />
        )}

        {currentMode === 'list' && (
          <WordListView
            items={filteredVocabulary}
            masteredIds={masteredIds}
            starredIds={starredIds}
            onToggleMastered={handleToggleMastered}
            onToggleStar={handleToggleStar}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        filteredCount={filteredVocabulary.length}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200/60 bg-white py-3 sm:py-4 mt-auto mb-14 md:mb-0">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs font-semibold text-gray-600">
          <span>iBeos - 山 - cps - 🥕</span>
        </div>
      </footer>

      {/* Reset Cache Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmResetAll}
        masteredCount={masteredIds.size}
        hesitantCount={learningIds.size}
        starredCount={starredIds.size}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-emerald-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
