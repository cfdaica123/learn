import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VocabularyItem } from '../types';
import { ALL_VOCABULARY } from '../data/vocabulary';
import { generateKanjiTraps, generateHiraganaTraps } from '../utils/quizTraps';
import { generateChallengingMeaningTraps, sanitizeMeaningOption } from '../utils/meaningTraps';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Infinity as InfinityIcon,
  Layers,
  StopCircle,
  Play
} from 'lucide-react';
import { speakJapanese } from '../utils/speech';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  items: VocabularyItem[];
  scopeKey?: string;
  onMarkMastered: (id: string) => void;
}

export type QuizType = 'meaning' | 'hanViet' | 'kanjiTrap' | 'hiraganaTrap';
export type PracticeMode = 'infinite' | 'lesson';

interface PreparedQuestion {
  item: VocabularyItem;
  correctAnswer: string;
  options: string[];
}

/**
 * Helper to generate a single prepared question with accurate, challenging distractors/traps
 */
function createSingleQuestion(
  targetItem: VocabularyItem,
  pool: VocabularyItem[],
  quizType: QuizType
): PreparedQuestion {
  let correctAnswer = targetItem.meaning.trim();
  let distractors: string[] = [];

  if (quizType === 'meaning') {
    // USER REQUIREMENT:
    // - Kanji thì câu trả lời sẽ là cách đọc (Hiragana) kèm các bẫy gần giống nhau để đánh lừa
    // - Không phải Kanji thì đáp án là nghĩa tiếng Việt kèm các bẫy sát nghĩa để đánh lừa
    if (targetItem.hasKanji) {
      correctAnswer = targetItem.hiragana.trim();
      distractors = generateHiraganaTraps(targetItem.hiragana);
    } else {
      correctAnswer = sanitizeMeaningOption(targetItem.meaning);
      distractors = generateChallengingMeaningTraps(targetItem, pool)
        .map(sanitizeMeaningOption)
        .filter((d) => d && d.toLowerCase() !== correctAnswer.toLowerCase());
    }
  } else if (quizType === 'hanViet') {
    correctAnswer = targetItem.hanViet;
    distractors = pool
      .filter((it) => it.id !== targetItem.id)
      .map((it) => it.hanViet)
      .filter((val) => val && val.trim() !== correctAnswer);
  } else if (quizType === 'kanjiTrap') {
    correctAnswer = targetItem.word;
    distractors = generateKanjiTraps(targetItem.word);
    if (distractors.length < 3) {
      const fallback = pool
        .filter((it) => it.id !== targetItem.id)
        .map((it) => it.word)
        .filter((val) => val !== correctAnswer && !distractors.includes(val));
      distractors = [...distractors, ...fallback].slice(0, 3);
    }
  } else if (quizType === 'hiraganaTrap') {
    correctAnswer = targetItem.hiragana;
    distractors = generateHiraganaTraps(targetItem.hiragana);
    if (distractors.length < 3) {
      const fallback = pool
        .filter((it) => it.id !== targetItem.id)
        .map((it) => it.hiragana)
        .filter((val) => val !== correctAnswer && !distractors.includes(val));
      distractors = [...distractors, ...fallback].slice(0, 3);
    }
  }

  // Ensure unique distractors that don't duplicate correctAnswer
  const uniqueDistractors = Array.from(new Set(distractors))
    .filter((d) => d && d.trim().toLowerCase() !== correctAnswer.toLowerCase())
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Fallback if not enough distractors in the current small pool
  if (uniqueDistractors.length < 3) {
    const isTestingHiragana = (quizType === 'meaning' && targetItem.hasKanji) || quizType === 'hiraganaTrap';
    const fallbackPool = ALL_VOCABULARY
      .map((it) => (
        quizType === 'hanViet' ? it.hanViet :
        quizType === 'kanjiTrap' ? it.word :
        isTestingHiragana ? it.hiragana :
        sanitizeMeaningOption(it.meaning)
      ))
      .filter((val) => val && val.trim().toLowerCase() !== correctAnswer.toLowerCase() && !uniqueDistractors.includes(val));
    const fallbackShuffled = Array.from(new Set(fallbackPool)).sort(() => 0.5 - Math.random());
    uniqueDistractors.push(...fallbackShuffled.slice(0, 3 - uniqueDistractors.length));
  }

  // Shuffle 4 choices together and freeze permanently for this question
  const options = [...uniqueDistractors, correctAnswer].sort(() => 0.5 - Math.random());

  return {
    item: targetItem,
    correctAnswer,
    options
  };
}

export const QuizView: React.FC<QuizViewProps> = ({ items, scopeKey = '', onMarkMastered }) => {
  const [quizType, setQuizType] = useState<QuizType>('meaning');
  // USER REQUIREMENT: Cho phép mở giới hạn luyện tập vô hạn ngẫu nhiên lặp lại đến khi tắt
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('infinite');

  // Lesson fixed-questions mode state
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Infinite practice mode state
  const [infiniteQuestion, setInfiniteQuestion] = useState<PreparedQuestion | null>(null);
  const [infiniteCount, setInfiniteCount] = useState(0);
  const recentWordIdsRef = useRef<string[]>([]);

  // Common interactive state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Keep a ref of items so updating mastered status doesn't re-trigger buildQuizSession
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Filter current pool according to quizType
  const getFilteredPool = useCallback(() => {
    let pool = itemsRef.current;

    if (quizType === 'hanViet') {
      pool = itemsRef.current.filter((it) => it.hanViet.trim().length > 0);
    } else if (quizType === 'kanjiTrap' || quizType === 'hiraganaTrap') {
      pool = itemsRef.current.filter((it) => it.hasKanji);
      if (pool.length < 4) {
        const supplement = ALL_VOCABULARY.filter(
          (it) => it.hasKanji && !pool.some((p) => p.id === it.id)
        );
        pool = [...pool, ...supplement];
      }
    }
    return pool;
  }, [quizType]);

  // Pick a random question for infinite mode
  const pickNextInfiniteQuestion = useCallback((pool: VocabularyItem[]): PreparedQuestion | null => {
    if (pool.length < 4) return null;

    // Filter out words answered recently to avoid annoying immediate repetitions
    const recentThreshold = Math.min(Math.floor(pool.length * 0.6), 10);
    const recentSet = new Set(recentWordIdsRef.current.slice(-recentThreshold));
    let candidates = pool.filter((it) => !recentSet.has(it.id));
    if (candidates.length === 0) candidates = pool;

    const targetItem = candidates[Math.floor(Math.random() * candidates.length)];
    recentWordIdsRef.current = [...recentWordIdsRef.current.slice(-15), targetItem.id];

    return createSingleQuestion(targetItem, pool, quizType);
  }, [quizType]);

  // Initialize or reset session
  const buildQuizSession = useCallback(() => {
    const pool = getFilteredPool();

    if (pool.length < 4) {
      setQuestions([]);
      setInfiniteQuestion(null);
      return;
    }

    recentWordIdsRef.current = [];
    setSelectedOption(null);
    setScore(0);
    setTotalAnswered(0);
    setStreak(0);
    setMaxStreak(0);
    setQuizFinished(false);

    if (practiceMode === 'infinite') {
      const firstQ = pickNextInfiniteQuestion(pool);
      setInfiniteQuestion(firstQ);
      setInfiniteCount(1);
    } else {
      // Fixed according to number of words in selected lesson(s)
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const prepared = shuffled.map((it) => createSingleQuestion(it, pool, quizType));
      setQuestions(prepared);
      setCurrentIndex(0);
    }
  }, [getFilteredPool, practiceMode, pickNextInfiniteQuestion, quizType]);

  // Rebuild quiz session when scopeKey, quizType, or practiceMode changes
  useEffect(() => {
    buildQuizSession();
  }, [scopeKey, quizType, practiceMode, buildQuizSession]);

  // Determine current active question
  const currentQ = practiceMode === 'infinite' ? infiniteQuestion : questions[currentIndex];
  const totalQuestionsInPool = getFilteredPool().length;

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !currentQ) return;

    setSelectedOption(option);
    setTotalAnswered((t) => t + 1);

    if (option === currentQ.correctAnswer) {
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        setMaxStreak((ms) => Math.max(ms, next));
        return next;
      });
      onMarkMastered(currentQ.item.id);
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
      speakJapanese(currentQ.item.hiragana || currentQ.item.word);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (practiceMode === 'infinite') {
      const pool = getFilteredPool();
      const nextQ = pickNextInfiniteQuestion(pool);
      if (nextQ) {
        setInfiniteQuestion(nextQ);
        setInfiniteCount((c) => c + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
      }
    } else {
      // Lesson fixed mode
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
        confetti({ particleCount: 80, spread: 90 });
      }
    }
  };

  // User manually finishes/stops practice
  const handleStopQuiz = () => {
    setQuizFinished(true);
    confetti({ particleCount: 60, spread: 70 });
  };

  // Keyboard navigation support: 1,2,3,4 to select options, Space/Enter/ArrowRight to go to next question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (selectedOption === null && currentQ) {
        if (e.key === '1' && currentQ.options[0]) handleSelectOption(currentQ.options[0]);
        if (e.key === '2' && currentQ.options[1]) handleSelectOption(currentQ.options[1]);
        if (e.key === '3' && currentQ.options[2]) handleSelectOption(currentQ.options[2]);
        if (e.key === '4' && currentQ.options[3]) handleSelectOption(currentQ.options[3]);
      } else if (selectedOption !== null) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, currentQ, handleNext]);

  // Pool too small check
  if (totalQuestionsInPool < 4) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm border border-gray-150 my-6 space-y-3">
        <p className="text-gray-700 font-semibold text-base">
          Cần ít nhất 4 từ vựng trong phạm vi lọc để bắt đầu trắc nghiệm.
        </p>
        <p className="text-xs text-gray-500">
          Hãy chọn "Tất cả bài" hoặc chuyển sang Part 1 / Part 2 để có thêm từ vựng làm bài tập nhé!
        </p>
        <button
          onClick={buildQuizSession}
          className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Tải lại bộ câu hỏi</span>
        </button>
      </div>
    );
  }

  // Quiz Finished / Summary Screen
  if (quizFinished) {
    const effectiveTotal = Math.max(totalAnswered, 1);
    const percent = Math.round((score / effectiveTotal) * 100);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 text-center max-w-lg mx-auto shadow-sm border border-gray-150 my-6 space-y-5 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Trophy className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="text-2xl font-black text-gray-900">
            {practiceMode === 'infinite' ? 'Tổng kết lượt luyện tập!' : 'Hoàn thành bài tập!'}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {practiceMode === 'infinite'
              ? 'Bạn đã hoàn thành lượt luyện tập không giới hạn.'
              : 'Bạn đã hoàn thành toàn bộ câu hỏi của các bài đã chọn.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-200/80">
          <div className="p-2">
            <span className="block text-[11px] font-semibold text-gray-500">Đã làm</span>
            <span className="text-xl font-black text-gray-900">{totalAnswered} câu</span>
          </div>
          <div className="p-2 border-x border-gray-200">
            <span className="block text-[11px] font-semibold text-gray-500">Đúng</span>
            <span className="text-xl font-black text-emerald-600">{score} câu</span>
          </div>
          <div className="p-2">
            <span className="block text-[11px] font-semibold text-gray-500">Chính xác</span>
            <span className="text-xl font-black text-rose-600">{percent}%</span>
          </div>
        </div>

        {maxStreak > 1 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Chuỗi đúng liên tiếp cao nhất: <strong>{maxStreak} câu</strong></span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          {practiceMode === 'infinite' && (
            <button
              onClick={() => {
                setQuizFinished(false);
                setSelectedOption(null);
                const pool = getFilteredPool();
                const nextQ = pickNextInfiniteQuestion(pool);
                if (nextQ) setInfiniteQuestion(nextQ);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Luyện tập tiếp</span>
            </button>
          )}

          <button
            onClick={buildQuizSession}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Luyện lượt mới</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const { item, correctAnswer, options } = currentQ;

  return (
    <div className="max-w-xl mx-auto space-y-3 sm:space-y-4 pb-20 sm:pb-6">
      
      {/* Quiz Controls & Mode Selectors */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-gray-150 shadow-xs space-y-2.5">
        
        {/* Row 1: Quiz Type Tabs (4 types) */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-gray-100 rounded-xl text-[10px] sm:text-xs font-bold overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setQuizType('meaning')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              quizType === 'meaning'
                ? 'bg-white text-rose-700 shadow-xs font-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Kanji thì chọn cách đọc Hiragana, thuần Kana thì chọn nghĩa tiếng Việt"
          >
            <span>Luyện Từ Vựng</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-rose-100 text-rose-700 rounded-full font-bold">Chuẩn</span>
          </button>
          <button
            onClick={() => setQuizType('hanViet')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              quizType === 'hanViet'
                ? 'bg-white text-rose-700 shadow-xs font-bold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Đoán Hán-Việt 🌟
          </button>
          <button
            onClick={() => setQuizType('kanjiTrap')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              quizType === 'kanjiTrap'
                ? 'bg-white text-rose-700 shadow-xs font-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Đưa ra Hiragana, chọn chữ Kanji đúng giữa các chữ bẫy nét gần giống nhau"
          >
            Trap Kanji 🎯
          </button>
          <button
            onClick={() => setQuizType('hiraganaTrap')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              quizType === 'hiraganaTrap'
                ? 'bg-white text-rose-700 shadow-xs font-black'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Đưa ra chữ Kanji, chọn cách đọc Hiragana đúng giữa các bẫy âm đục, âm ngắt, trường âm"
          >
            Trap Cách đọc 🪤
          </button>
        </div>

        {/* Row 2: Practice Mode (Vô hạn vs Theo bài) + Stats + Stop Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100">
          
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setPracticeMode('infinite')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                practiceMode === 'infinite'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Lặp ngẫu nhiên vô hạn không giới hạn số câu để luyện thoải mái đến khi dừng"
            >
              <InfinityIcon className="w-3.5 h-3.5" />
              <span>Luyện vô hạn</span>
            </button>

            <button
              type="button"
              onClick={() => setPracticeMode('lesson')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                practiceMode === 'lesson'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Kiểm tra theo đúng số lượng từ trong bài đã chọn"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Theo bài ({totalQuestionsInPool} câu)</span>
            </button>
          </div>

          {/* Stats & Stop Action */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 ml-auto">
            <span>
              Điểm: <strong className="text-rose-600 font-bold">{score}</strong>
            </span>

            {streak > 1 && (
              <span className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                <Sparkles className="w-3 h-3" /> {streak}
              </span>
            )}

            {practiceMode === 'infinite' ? (
              <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-bold">
                Câu #{infiniteCount}
              </span>
            ) : (
              <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-700 font-bold">
                {currentIndex + 1} / {questions.length}
              </span>
            )}

            {/* Finish / Stop Button for practice anytime */}
            {totalAnswered > 0 && (
              <button
                type="button"
                onClick={handleStopQuiz}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-100 hover:bg-rose-100 text-gray-700 hover:text-rose-700 transition-colors cursor-pointer text-xs font-bold"
                title="Dừng luyện tập và xem kết quả"
              >
                <StopCircle className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Dừng</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Card: Form gốc hiển thị chữ Hán trực tiếp để ôn từ vựng & nhận diện Hán tự */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-xs text-center relative">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">
            Bài {item.lesson} • Part {item.part}
          </span>

          <div className="flex items-center gap-1.5">
            {quizType === 'kanjiTrap' ? (
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/70 rounded-lg">
                🎯 Trap Tìm Kanji
              </span>
            ) : quizType === 'hiraganaTrap' ? (
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200/70 rounded-lg">
                🪤 Trap Cách Đọc
              </span>
            ) : quizType === 'hanViet' ? (
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/70 rounded-lg">
                Đoán Hán-Việt 🌟
              </span>
            ) : item.hasKanji ? (
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/70 rounded-lg">
                🎯 Chọn cách đọc (Hiragana)
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/70 rounded-lg">
                🎯 Chọn nghĩa tiếng Việt
              </span>
            )}

            {/* Phân biệt rõ từ có chữ Hán hay thuần Kana */}
            {item.hasKanji ? (
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-lg">
                Chữ Hán
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-lg">
                Kana
              </span>
            )}
          </div>
        </div>

        {/* Question Prompt: Clean, prominent Kanji display */}
        <div className="my-8 sm:my-10 min-h-[70px] flex flex-col justify-center items-center">
          <h2 className="text-4xl sm:text-6xl font-black tracking-wide font-japanese break-words text-gray-900 selection:bg-rose-100">
            {quizType === 'kanjiTrap' ? item.hiragana : item.word}
          </h2>
        </div>
      </div>

      {/* 4 Choices: Deceptive, challenging options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === correctAnswer;
          let btnStyle = 'bg-white border-gray-200 text-gray-800 hover:border-rose-300 hover:bg-rose-50/30';

          if (selectedOption !== null) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-red-50 border-red-500 text-red-900 ring-2 ring-red-400 line-through';
            } else {
              btnStyle = 'bg-gray-50/80 border-gray-200/60 text-gray-400 opacity-60';
            }
          }

          const isJapaneseText = (quizType === 'meaning' && item.hasKanji) || quizType === 'kanjiTrap' || quizType === 'hiraganaTrap';

          return (
            <button
              key={`opt-${idx}-${option}`}
              onClick={() => handleSelectOption(option)}
              disabled={selectedOption !== null}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between shadow-xs ${btnStyle} ${
                selectedOption === null ? 'cursor-pointer active:scale-98' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1 pr-2">
                <span className="text-[11px] font-bold text-gray-400 bg-gray-100 rounded-md w-5 h-5 flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span
                  className={`leading-snug ${
                    isJapaneseText
                      ? quizType === 'kanjiTrap'
                        ? 'text-xl sm:text-2xl font-black font-japanese tracking-wide text-gray-900'
                        : 'text-base sm:text-lg font-bold font-japanese tracking-wider'
                      : 'text-sm sm:text-base font-semibold'
                  }`}
                >
                  {option}
                </span>
              </div>
              {selectedOption !== null && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {selectedOption !== null && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Next Action */}
      {selectedOption !== null && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm space-y-3 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Feedback Status */}
            <div>
              {selectedOption === correctAnswer ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Chính xác! (+1 điểm)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm sm:text-base">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>
                    Chưa chính xác! Đáp án đúng: <strong className="underline">{correctAnswer}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Next or Finish Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              {practiceMode === 'infinite' && (
                <button
                  type="button"
                  onClick={handleStopQuiz}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Dừng & Xem kết quả
                </button>
              )}

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-rose-600/25 transition-all active:scale-95 cursor-pointer"
              >
                <span>
                  {practiceMode === 'infinite' 
                    ? 'Câu tiếp theo' 
                    : currentIndex + 1 < questions.length 
                      ? 'Câu tiếp theo' 
                      : 'Xem kết quả'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Details revealed after answer */}
          <div className="pt-2.5 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">Chữ Hán:</span>
              <span className="font-black text-gray-900 text-sm sm:text-base font-japanese">
                {item.word}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">Cách đọc:</span>
              <span className="font-bold text-rose-600 text-sm sm:text-base font-japanese">
                {item.hiragana}
              </span>
            </div>

            {item.hanViet && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 font-medium">Hán-Việt:</span>
                <span className="font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs tracking-wider uppercase">
                  {item.hanViet}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <span className="text-gray-500 font-medium">Nghĩa:</span>
              <span className="font-bold text-gray-800">{item.meaning}</span>
            </div>

            <button
              onClick={() => speakJapanese(item.hiragana || item.word)}
              className="ml-auto inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe đọc</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
