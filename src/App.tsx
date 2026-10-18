import { useState, useEffect, useMemo } from 'react';
import { ALL_VOCABULARY } from './data/vocabulary';
import { FilterState, StudyMode, CardOrientation } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { WordListView } from './components/WordListView';
import { MobileBottomNav } from './components/MobileBottomNav';

const STORAGE_KEY_MASTERED = 'minna_mastered_words';
const STORAGE_KEY_LEARNING = 'minna_learning_words';
const STORAGE_KEY_STARRED = 'minna_starred_words';

export default function App() {
  const [currentMode, setCurrentMode] = useState<StudyMode>('flashcard');
  const [orientation, setOrientation] = useState<CardOrientation>('ja-to-vi');

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    part: 'all',
    lesson: 'all',
    kanjiOnly: false,
    hideMastered: false,
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

  const handleResetProgress = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ các từ đã thuộc không?')) {
      setMasteredIds(new Set());
      setLearningIds(new Set());
    }
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

      // Hide Mastered Filter (Ẩn những từ đã thuộc)
      if (filter.hideMastered && masteredIds.has(item.id)) {
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
  }, [filter, masteredIds, starredIds]);

  // Statistics
  const kanjiCountInCurrentScope = useMemo(() => {
    return ALL_VOCABULARY.filter((item) => {
      if (filter.part !== 'all' && item.part !== filter.part) return false;
      if (filter.lesson !== 'all' && item.lesson !== filter.lesson) return false;
      return item.hasKanji;
    }).length;
  }, [filter.part, filter.lesson]);

  const masteredCountInCurrentScope = useMemo(() => {
    return ALL_VOCABULARY.filter((item) => {
      if (filter.part !== 'all' && item.part !== filter.part) return false;
      if (filter.lesson !== 'all' && item.lesson !== filter.lesson) return false;
      return masteredIds.has(item.id);
    }).length;
  }, [filter.part, filter.lesson, masteredIds]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 flex flex-col antialiased">
      {/* Top Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        totalFilteredCount={filteredVocabulary.length}
        masteredCount={masteredIds.size}
        totalVocabularyCount={ALL_VOCABULARY.length}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-4 py-3 sm:py-8">
        {/* Filter Controls (Part 1/2, Bài, Lọc Hán tự, Ẩn từ đã thuộc) */}
        <FilterBar
          filter={filter}
          onFilterChange={(newF) => setFilter((prev) => ({ ...prev, ...newF }))}
          orientation={orientation}
          onToggleOrientation={() =>
            setOrientation((o) => (o === 'ja-to-vi' ? 'vi-to-ja' : 'ja-to-vi'))
          }
          totalAvailable={filteredVocabulary.length}
          kanjiCount={kanjiCountInCurrentScope}
          masteredCount={masteredCountInCurrentScope}
          starredCount={starredIds.size}
        />

        {/* View Mode Switching */}
        {currentMode === 'flashcard' && (
          <FlashcardView
            items={filteredVocabulary}
            orientation={orientation}
            masteredIds={masteredIds}
            learningIds={learningIds}
            starredIds={starredIds}
            onMarkStatus={handleMarkStatus}
            onToggleStar={handleToggleStar}
            hideMastered={filter.hideMastered}
            onToggleHideMastered={() =>
              setFilter((prev) => ({ ...prev, hideMastered: !prev.hideMastered }))
            }
          />
        )}

        {currentMode === 'quiz' && (
          <QuizView
            items={filteredVocabulary}
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
    </div>
  );
}
