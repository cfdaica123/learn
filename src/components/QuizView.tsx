import React, { useState, useEffect, useCallback, useRef } from 'react';
import { VocabularyItem } from '../types';
import { ALL_VOCABULARY } from '../data/vocabulary';
import { generateKanjiTraps, generateHiraganaTraps } from '../utils/quizTraps';
import { CheckCircle2, XCircle, Volume2, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { speakJapanese } from '../utils/speech';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  items: VocabularyItem[];
  scopeKey?: string;
  onMarkMastered: (id: string) => void;
}

export type QuizType = 'meaning' | 'hanViet' | 'kanjiTrap' | 'hiraganaTrap';

interface PreparedQuestion {
  item: VocabularyItem;
  correctAnswer: string;
  options: string[];
}

export const QuizView: React.FC<QuizViewProps> = ({ items, scopeKey = '', onMarkMastered }) => {
  const [quizType, setQuizType] = useState<QuizType>('meaning');
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Keep a ref of items so updating mastered status doesn't re-trigger buildQuizSession
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // Build a stable, frozen questions deck for the current quiz session
  const buildQuizSession = useCallback(() => {
    let pool = itemsRef.current;

    if (quizType === 'hanViet') {
      pool = itemsRef.current.filter((it) => it.hanViet.trim().length > 0);
    } else if (quizType === 'kanjiTrap' || quizType === 'hiraganaTrap') {
      pool = itemsRef.current.filter((it) => it.hasKanji);
      // If pool in current lesson is small (< 4), supplement with other Kanji words from ALL_VOCABULARY
      if (pool.length < 4) {
        const supplement = ALL_VOCABULARY.filter(
          (it) => it.hasKanji && !pool.some((p) => p.id === it.id)
        );
        pool = [...pool, ...supplement];
      }
    }

    if (pool.length < 4) {
      setQuestions([]);
      return;
    }

    // Shuffle pool and pick up to 20 questions
    const shuffledItems = [...pool].sort(() => 0.5 - Math.random());
    const selectedItems = shuffledItems.slice(0, Math.min(20, shuffledItems.length));

    const prepared: PreparedQuestion[] = selectedItems.map((targetItem) => {
      let correctAnswer = targetItem.meaning;
      let distractors: string[] = [];

      if (quizType === 'hanViet') {
        correctAnswer = targetItem.hanViet;
        distractors = pool
          .filter((it) => it.id !== targetItem.id)
          .map((it) => it.hanViet)
          .filter((val) => val && val.trim() !== correctAnswer);
      } else if (quizType === 'kanjiTrap') {
        // USER REQUIREMENT: Đưa ra 1 từ và chọn 1 trong 4 đáp án kanji (các chữ gần giống nhau để đánh lừa/trap)
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
        // USER REQUIREMENT: Đưa ra chữ kanji và chọn 1 trong 4 đáp án hiragana (bẫy âm đục, âm ngắt, trường âm)
        correctAnswer = targetItem.hiragana;
        distractors = generateHiraganaTraps(targetItem.hiragana);
        if (distractors.length < 3) {
          const fallback = pool
            .filter((it) => it.id !== targetItem.id)
            .map((it) => it.hiragana)
            .filter((val) => val !== correctAnswer && !distractors.includes(val));
          distractors = [...distractors, ...fallback].slice(0, 3);
        }
      } else {
        // 'meaning'
        correctAnswer = targetItem.meaning;
        distractors = pool
          .filter((it) => it.id !== targetItem.id)
          .map((it) => it.meaning)
          .filter((val) => val && val.trim() !== correctAnswer);
      }

      const uniqueDistractors = [...new Set(distractors)].sort(() => 0.5 - Math.random()).slice(0, 3);

      // Fallback if not enough distractors in the current small pool
      if (uniqueDistractors.length < 3) {
        const fallbackPool = ALL_VOCABULARY
          .map((it) => (
            quizType === 'hanViet' ? it.hanViet :
            quizType === 'kanjiTrap' ? it.word :
            quizType === 'hiraganaTrap' ? it.hiragana :
            it.meaning
          ))
          .filter((val) => val && val.trim() !== correctAnswer && !uniqueDistractors.includes(val));
        const fallbackShuffled = [...new Set(fallbackPool)].sort(() => 0.5 - Math.random());
        uniqueDistractors.push(...fallbackShuffled.slice(0, 3 - uniqueDistractors.length));
      }

      // Shuffle 4 choices together and freeze permanently for this question
      const options = [...uniqueDistractors, correctAnswer].sort(() => 0.5 - Math.random());

      return {
        item: targetItem,
        correctAnswer,
        options,
      };
    });

    setQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  }, [quizType]);

  // Rebuild quiz session ONLY when scopeKey (Part/Lesson/KanjiOnly filter) or quizType changes
  useEffect(() => {
    buildQuizSession();
  }, [scopeKey, quizType, buildQuizSession]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !currentQ) return;

    setSelectedOption(option);

    if (option === currentQ.correctAnswer) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      onMarkMastered(currentQ.item.id);
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
      speakJapanese(currentQ.item.hiragana || currentQ.item.word);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 80, spread: 90 });
    }
  };

  // Keyboard navigation support: 1,2,3,4 to select options, Space/Enter/ArrowRight to go to next question
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
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
  }, [selectedOption, currentQ, currentIndex, questions.length]);

  if (questions.length < 4) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm border border-gray-100 my-6 space-y-3">
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

  if (quizFinished) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm border border-gray-100 my-6 space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Hoàn thành bài tập!</h3>
        <p className="text-gray-600 text-sm">
          Bạn đã trả lời đúng <span className="font-bold text-rose-600">{score}</span> / {questions.length} câu ({percent}%)
        </p>

        <button
          onClick={buildQuizSession}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện tập lượt mới</span>
        </button>
      </div>
    );
  }

  const { item, correctAnswer, options } = currentQ;

  return (
    <div className="max-w-xl mx-auto space-y-3 sm:space-y-4 pb-20 sm:pb-6">
      
      {/* Quiz Header & Mode Selector with 4 tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-gray-150 shadow-xs">
        <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-gray-100 rounded-xl text-[10px] sm:text-xs font-bold overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setQuizType('meaning')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              quizType === 'meaning'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Đoán Nghĩa
          </button>
          <button
            onClick={() => setQuizType('hanViet')}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              quizType === 'hanViet'
                ? 'bg-white text-rose-700 shadow-xs'
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

        <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold text-gray-600 shrink-0">
          <span>
            Điểm: <strong className="text-rose-600">{score}</strong>
          </span>
          {streak > 1 && (
            <span className="flex items-center gap-0.5 text-amber-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Chuỗi {streak}
            </span>
          )}
          <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-700 font-bold">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Question Card: Fixed height and displays appropriate prompt according to quizType */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-xs text-center relative">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">
            Bài {item.lesson} • Part {item.part}
          </span>

          {quizType === 'kanjiTrap' ? (
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200/70 rounded-lg">
              🎯 Trap Tìm Kanji
            </span>
          ) : quizType === 'hiraganaTrap' ? (
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200/70 rounded-lg">
              🪤 Trap Cách Đọc
            </span>
          ) : item.hasKanji ? (
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/70 rounded-lg">
              Chữ Hán (Kanji)
            </span>
          ) : (
            <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 bg-gray-50 text-gray-400 rounded-lg">
              Từ thuần Kana
            </span>
          )}
        </div>

        {/* Dynamic Question Prompt */}
        <div className="my-5 sm:my-7 space-y-2 min-h-[70px] flex flex-col justify-center items-center">
          {quizType === 'kanjiTrap' ? (
            <>
              {/* Question gives Hiragana and user chooses the real Kanji among lookalikes */}
              <h2 className="text-3xl sm:text-5xl font-black text-rose-600 tracking-wider font-japanese break-words selection:bg-rose-100">
                {item.hiragana}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                Nghĩa: {item.meaning} {item.hanViet && `(Hán Việt: ${item.hanViet})`}
              </p>
            </>
          ) : (
            <>
              {/* Other modes: prioritize showing Kanji only without hiragana spoiler */}
              <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-wide font-japanese break-words selection:bg-rose-100">
                {item.word}
              </h2>
              {quizType === 'hiraganaTrap' && (
                <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                  Nghĩa: {item.meaning} {item.hanViet && `(Hán Việt: ${item.hanViet})`}
                </p>
              )}
            </>
          )}
        </div>

        <p className="text-xs text-gray-400 font-medium">
          {quizType === 'kanjiTrap'
            ? '🎯 Chọn đúng chữ Hán (Kanji) trong các chữ bẫy nét na ná nhau:'
            : quizType === 'hiraganaTrap'
            ? '🪤 Chọn đúng cách đọc Hiragana (cẩn thận bẫy âm đục, âm ngắt, trường âm!):'
            : quizType === 'hanViet'
            ? 'Chọn đúng âm Hán - Việt của từ trên:'
            : 'Chọn nghĩa tiếng Việt chính xác:'}
        </p>
      </div>

      {/* 4 Choices - GIỮ NGUYÊN VỊ TRÍ, KHÔNG BỊ NHẢY KHI CHỌN ĐÁP ÁN ĐÚNG */}
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

          // Larger font for Kanji and Hiragana traps to clearly inspect strokes & kana
          const isJapaneseText = quizType === 'kanjiTrap' || quizType === 'hiraganaTrap';

          return (
            <button
              key={`opt-${currentIndex}-${idx}`}
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

      {/* Nút Next chuyển câu - GIỮ NGUYÊN kết quả, CHỈ chuyển khi người dùng chủ động bấm 'Câu tiếp theo' */}
      {selectedOption !== null && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3">
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
                    Chưa chính xác! Đáp án đúng: <strong className="underline font-japanese">{correctAnswer}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-rose-600/25 transition-all active:scale-95 cursor-pointer ml-auto"
            >
              <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Details revealed after answer: Kanji, Hiragana, Han-Viet, Meaning & Audio */}
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
