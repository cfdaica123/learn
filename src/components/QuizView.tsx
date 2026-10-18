import React, { useState, useEffect, useMemo } from 'react';
import { VocabularyItem } from '../types';
import { CheckCircle2, XCircle, Volume2, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { speakJapanese } from '../utils/speech';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  items: VocabularyItem[];
  onMarkMastered: (id: string) => void;
}

type QuizType = 'meaning' | 'hanViet';

export const QuizView: React.FC<QuizViewProps> = ({ items, onMarkMastered }) => {
  const [quizType, setQuizType] = useState<QuizType>('meaning');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // If items have no Kanji and user selects hanViet, fallback to meaning
  const eligibleItems = useMemo(() => {
    if (quizType === 'hanViet') {
      return items.filter((item) => item.hanViet.trim().length > 0);
    }
    return items;
  }, [items, quizType]);

  const currentQuestion = eligibleItems[questionIndex];

  // Generate 4 randomized options
  const options = useMemo(() => {
    if (!currentQuestion || eligibleItems.length === 0) return [];

    const correctAnswer = quizType === 'hanViet' ? currentQuestion.hanViet : currentQuestion.meaning;
    
    // Pick 3 random distractors
    const otherPool = eligibleItems
      .filter((it) => it.id !== currentQuestion.id)
      .map((it) => (quizType === 'hanViet' ? it.hanViet : it.meaning))
      .filter((val) => val && val.trim() !== correctAnswer);

    // Shuffle and pick 3 unique distractors
    const shuffledPool = [...new Set(otherPool)].sort(() => 0.5 - Math.random());
    const distractors = shuffledPool.slice(0, 3);

    // Combine and shuffle
    return [...distractors, correctAnswer].sort(() => 0.5 - Math.random());
  }, [currentQuestion, eligibleItems, quizType]);

  // Reset when filter items change
  useEffect(() => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  }, [eligibleItems.length, quizType]);

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !currentQuestion) return;

    setSelectedOption(option);
    const correctAnswer = quizType === 'hanViet' ? currentQuestion.hanViet : currentQuestion.meaning;

    if (option === correctAnswer) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      onMarkMastered(currentQuestion.id);
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < eligibleItems.length && questionIndex + 1 < 20) {
      setQuestionIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 80, spread: 90 });
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
  };

  if (eligibleItems.length < 4) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm border border-gray-100 my-6">
        <p className="text-gray-600 font-medium">
          Cần ít nhất 4 từ vựng trong phạm vi lọc này để bắt đầu làm bài trắc nghiệm. Vui lòng bỏ bớt bộ lọc hoặc chọn thêm bài học!
        </p>
      </div>
    );
  }

  if (quizFinished) {
    const totalQuestions = Math.min(eligibleItems.length, 20);
    const percent = Math.round((score / totalQuestions) * 100);

    return (
      <div className="bg-white rounded-3xl p-8 text-center max-w-lg mx-auto shadow-sm border border-gray-100 my-6 space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Hoàn thành bài tập!</h3>
        <p className="text-gray-500 text-sm">
          Bạn đã trả lời đúng <span className="font-bold text-rose-600">{score}</span> / {totalQuestions} câu ({percent}%)
        </p>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện tập lại</span>
        </button>
      </div>
    );
  }

  const correctAnswer = quizType === 'hanViet' ? currentQuestion.hanViet : currentQuestion.meaning;

  return (
    <div className="max-w-xl mx-auto space-y-3 sm:space-y-4 pb-20 sm:pb-6">
      
      {/* Quiz Header & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-gray-100 rounded-xl text-[11px] sm:text-xs font-bold">
          <button
            onClick={() => setQuizType('meaning')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all ${
              quizType === 'meaning'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Đoán Nghĩa
          </button>
          <button
            onClick={() => setQuizType('hanViet')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all ${
              quizType === 'hanViet'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Đoán Âm Hán-Việt 🌟
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold text-gray-600">
          <span>
            Điểm: <strong className="text-rose-600">{score}</strong>
          </span>
          {streak > 1 && (
            <span className="flex items-center gap-0.5 text-amber-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Chuỗi {streak}
            </span>
          )}
          <span>
            {questionIndex + 1} / {Math.min(eligibleItems.length, 20)}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-200/90 shadow-xs text-center relative">
        <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg">
          Bài {currentQuestion.lesson} • Part {currentQuestion.part}
        </span>

        <div className="my-4 sm:my-6 space-y-1.5 sm:space-y-2">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-wide font-japanese break-words">
            {currentQuestion.word}
          </h2>
          <p className="text-base sm:text-lg text-rose-600 font-semibold tracking-wider">
            {currentQuestion.hiragana}
          </p>

          <button
            onClick={() => speakJapanese(currentQuestion.hiragana || currentQuestion.word)}
            className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors mt-2 active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe phát âm</span>
          </button>
        </div>

        <p className="text-xs text-gray-400 font-medium">
          {quizType === 'hanViet'
            ? 'Hãy chọn đúng âm Hán - Việt của từ trên:'
            : 'Hãy chọn nghĩa tiếng Việt chính xác:'}
        </p>
      </div>

      {/* 4 Choices */}
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
              btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={selectedOption !== null}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all active:scale-98 flex items-center justify-between text-sm sm:text-base font-semibold shadow-xs ${btnStyle}`}
            >
              <span className="flex-1">{option}</span>
              {selectedOption !== null && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
              )}
              {selectedOption !== null && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-red-600 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Question Button */}
      {selectedOption !== null && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all active:scale-95"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
