import { useState, useEffect, useMemo } from 'react';
import { ALL_VOCABULARY } from './data/vocabulary';
import { FilterState, StudyMode, WordStatusFilter, JLPTLevel } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { FlashcardView } from './components/FlashcardView';
import { QuizView } from './components/QuizView';
import { WordListView } from './components/WordListView';
import { GrammarView } from './components/GrammarView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { BackupModal } from './components/BackupModal';
import { Sparkles } from 'lucide-react';

const STORAGE_KEY_MASTERED = 'minna_mastered_words';
const STORAGE_KEY_LEARNING = 'minna_learning_words';
const STORAGE_KEY_STARRED = 'minna_starred_words';

export default function App() {
  const [currentMode, setCurrentMode] = useState<StudyMode>('flashcard');
  const [currentLevel, setCurrentLevel] = useState<JLPTLevel>('N5');

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    level: 'N5',
    part: 'all',
    lesson: 'all',
    selectedLessons: [],
    kanjiOnly: false,
    statusFilter: 'all', // 'all' | 'mastered' (Từ đã nhớ) | 'unmastered' (Từ chưa nhớ) | 'hesitant'
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

  // Level switcher handler
  const handleSelectLevel = (newLevel: JLPTLevel) => {
    if (newLevel === currentLevel) return;
    setCurrentLevel(newLevel);
    setFilter((prev) => ({
      ...prev,
      level: newLevel,
      part: 'all',
      lesson: 'all',
      selectedLessons: [],
      searchQuery: '',
    }));
    showToast(`Đã chuyển sang cấp độ Minna ${newLevel} (${newLevel === 'N5' ? 'Bài 1-25' : 'Bài 26-50'})!`);
  };

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
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleImportBackup = (
    data: { mastered: string[]; learning: string[]; starred: string[] },
    mode: 'replace' | 'merge'
  ) => {
    if (mode === 'replace') {
      setMasteredIds(new Set(data.mastered));
      setLearningIds(new Set(data.learning));
      setStarredIds(new Set(data.starred));
    } else {
      setMasteredIds((prev) => new Set([...prev, ...data.mastered]));
      setLearningIds((prev) => new Set([...prev, ...data.learning]));
      setStarredIds((prev) => new Set([...prev, ...data.starred]));
    }
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
      level: currentLevel,
      part: 'all',
      lesson: 'all',
      selectedLessons: [],
      kanjiOnly: false,
      statusFilter: 'all',
      starredOnly: false,
      searchQuery: '',
    });
    showToast('Đã xóa toàn bộ bộ nhớ cache! Ứng dụng đã trở về trạng thái ban đầu.');
  };

  // Filter application: only words matching current JLPT Level
  const levelVocabulary = useMemo(() => {
    return ALL_VOCABULARY.filter((item) => (item.level || 'N5') === currentLevel);
  }, [currentLevel]);

  const filteredVocabulary = useMemo(() => {
    return levelVocabulary.filter((item) => {
      // Multi-lesson Filter (Ưu tiên nếu có chọn tổ hợp nhiều bài)
      if (filter.selectedLessons && filter.selectedLessons.length > 0) {
        if (!filter.selectedLessons.includes(item.lesson)) {
          return false;
        }
      } else {
        // Part Filter
        if (filter.part !== 'all' && item.part !== filter.part) {
          return false;
        }

        // Single Lesson Filter
        if (filter.lesson !== 'all' && item.lesson !== filter.lesson) {
          return false;
        }
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
  }, [levelVocabulary, filter, masteredIds, learningIds, starredIds]);

  // Statistics in current Part / Lesson scope
  const wordsInScope = useMemo(() => {
    return levelVocabulary.filter((item) => {
      if (filter.selectedLessons && filter.selectedLessons.length > 0) {
        return filter.selectedLessons.includes(item.lesson);
      }
      if (filter.part !== 'all' && item.part !== filter.part) return false;
      if (filter.lesson !== 'all' && item.lesson !== filter.lesson) return false;
      return true;
    });
  }, [levelVocabulary, filter.part, filter.lesson, filter.selectedLessons]);

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
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        totalFilteredCount={filteredVocabulary.length}
        masteredCount={masteredIds.size}
        totalVocabularyCount={levelVocabulary.length}
        onResetProgress={() => setIsResetModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-4 py-3 sm:py-6">
        
        {/* Filter Controls (Shown in Flashcard, Quiz, List modes) */}
        {currentMode !== 'grammar' && (
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
            onOpenBackupModal={() => setIsBackupModalOpen(true)}
          />
        )}

        {/* View Mode Switching */}
        {currentLevel === 'N4' && levelVocabulary.length === 0 && currentMode !== 'grammar' ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xs border border-rose-100 max-w-xl mx-auto my-6 sm:my-8 space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-rose-200">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Chưa có dữ liệu từ vựng N4
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Khung chức năng Bài 26 - 50 đã sẵn sàng. Khi bạn gửi data từ vựng N4 ở các lời nhắc tiếp theo, toàn bộ thẻ flashcard và bài kiểm tra trắc nghiệm sẽ hoạt động ngay lập tức!
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleSelectLevel('N5')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>Học từ vựng N5 (Bài 1 - 25)</span>
              </button>
            </div>
          </div>
        ) : (
          <>
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
                scopeKey={`${currentLevel}_${filter.part}_${filter.lesson}_${(filter.selectedLessons || []).slice().sort((a, b) => a - b).join('-')}_${filter.kanjiOnly}`}
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
          </>
        )}

        {currentMode === 'grammar' && (
          <GrammarView
            currentLevel={currentLevel}
            selectedLessons={filter.selectedLessons}
            currentLesson={filter.lesson}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        filteredCount={filteredVocabulary.length}
      />

      {/* Footer with stylized mountain theme & iBeos capsule */}
      <footer className="border-t border-gray-200/60 bg-white py-3.5 sm:py-4 mt-auto mb-14 md:mb-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-black text-gray-900 tracking-tight flex items-center gap-1">
              <span>Yama Nihongo</span>
              <span className="text-rose-600 font-bold font-japanese">山</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-normal">Học Từ vựng & Ngữ pháp Minna (N5 - N4)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/90 border border-rose-200/70 text-[11px] font-bold text-rose-700 shadow-2xs">
            <span>iBeos</span>
            <span className="text-rose-300">•</span>
            <span className="font-black text-rose-900">山</span>
            <span className="text-rose-300">•</span>
            <span>cps</span>
            <span className="text-rose-300">•</span>
            <span>🥕</span>
          </div>
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
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Backup / Export / Import Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        masteredIds={masteredIds}
        learningIds={learningIds}
        starredIds={starredIds}
        onImportData={handleImportBackup}
        showToast={showToast}
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
