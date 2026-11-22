import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { VOCABULARY_TOPICS } from '../data/topicVocabulary';
import { TopicVocabularyItem, VocabularyTopic } from '../types';
import { speakJapanese } from '../utils/speech';
import {
  ChevronDown,
  Search,
  Volume2,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
  Check,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  FolderOpen,
} from 'lucide-react';

type SubMode = 'browse' | 'practice';

function getTopicTotalCount(topic: VocabularyTopic): number {
  return topic.sections.reduce((acc, sec) => acc + sec.items.length, 0);
}

function getSpeechText(item: TopicVocabularyItem): string {
  const hasKana = /[\u3040-\u309F\u30A0-\u30FF]/.test(item.reading || '');
  const raw = hasKana ? item.reading : item.word;
  return raw.replace(/\[場所\]/g, 'えき');
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface TopicQuestion {
  item: TopicVocabularyItem;
  sectionTitle: string;
  options: string[];
}

export const TopicVocabularyView: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(VOCABULARY_TOPICS[0]?.id ?? '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [subMode, setSubMode] = useState<SubMode>('browse');
  const [hideMeaning, setHideMeaning] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Practice state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [stats, setStats] = useState({ total: 0, correct: 0, streak: 0 });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTopic = useMemo(() => {
    return (
      VOCABULARY_TOPICS.find((t) => t.id === selectedTopicId) || VOCABULARY_TOPICS[0]
    );
  }, [selectedTopicId]);

  const totalInTopic = useMemo(() => getTopicTotalCount(currentTopic), [currentTopic]);

  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return currentTopic.sections
      .filter((sec) => selectedSectionId === 'all' || sec.id === selectedSectionId)
      .map((sec) => {
        if (!q) return sec;
        const matchedItems = sec.items.filter((item) => {
          return (
            item.word.toLowerCase().includes(q) ||
            item.reading.toLowerCase().includes(q) ||
            (item.hanViet || '').toLowerCase().includes(q) ||
            item.meaning.toLowerCase().includes(q) ||
            (item.note || '').toLowerCase().includes(q) ||
            (item.exampleJa || '').toLowerCase().includes(q) ||
            (item.exampleVi || '').toLowerCase().includes(q)
          );
        });
        return { ...sec, items: matchedItems };
      })
      .filter((sec) => sec.items.length > 0);
  }, [currentTopic, selectedSectionId, searchQuery]);

  const totalMatched = useMemo(
    () => filteredSections.reduce((acc, s) => acc + s.items.length, 0),
    [filteredSections]
  );

  // Practice pool based on current topic & selected section
  const practicePool = useMemo(() => {
    const secs =
      selectedSectionId === 'all'
        ? currentTopic.sections
        : currentTopic.sections.filter((s) => s.id === selectedSectionId);
    const flat: { item: TopicVocabularyItem; sectionTitle: string }[] = [];
    for (const sec of secs) {
      for (const item of sec.items) {
        flat.push({ item, sectionTitle: sec.title });
      }
    }
    return flat;
  }, [currentTopic, selectedSectionId]);

  const allTopicMeanings = useMemo(() => {
    return currentTopic.sections.flatMap((s) => s.items.map((it) => it.meaning));
  }, [currentTopic]);

  const buildQuestion = useCallback(
    (pool: { item: TopicVocabularyItem; sectionTitle: string }[]): TopicQuestion | null => {
      if (pool.length === 0) return null;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      const distractorsPool = shuffleArray(
        Array.from(new Set(allTopicMeanings.filter((m) => m !== picked.item.meaning)))
      );
      const distractors = distractorsPool.slice(0, 3);
      const options = shuffleArray([picked.item.meaning, ...distractors]);
      return {
        item: picked.item,
        sectionTitle: picked.sectionTitle,
        options,
      };
    },
    [allTopicMeanings]
  );

  const [question, setQuestion] = useState<TopicQuestion | null>(() =>
    buildQuestion(practicePool)
  );

  useEffect(() => {
    setSelectedOption(null);
    setShowHint(false);
    setQuestion(buildQuestion(practicePool));
  }, [practicePool, buildQuestion]);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setSelectedSectionId('all');
    setSearchQuery('');
    setRevealedIds(new Set());
    setIsMenuOpen(false);
  };

  const handlePlayAudio = (text: string, key: string) => {
    speakJapanese(text, 0.88);
    setPlayingId(key);
    setTimeout(() => {
      setPlayingId((prev) => (prev === key ? null : prev));
    }, 800);
  };

  const handleToggleReveal = (id: string) => {
    if (!hideMeaning) return;
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null || !question) return;
    setSelectedOption(option);
    const isCorrect = option === question.item.meaning;
    speakJapanese(getSpeechText(question.item), 0.88);
    setStats((prev) => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowHint(false);
    setQuestion(buildQuestion(practicePool));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 pb-8">
      {/* Topic Selector Menu Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-3 sm:p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Interactive Menu Dropdown + Quick Topic Buttons */}
          <div className="flex flex-wrap items-center gap-2.5" ref={menuRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <FolderOpen className="w-4 h-4 shrink-0" />
                <span>Menu chủ đề</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl border border-gray-200 shadow-xl z-40 p-2 space-y-1">
                  <div className="px-2.5 py-1.5 text-[11px] font-bold text-gray-500 border-b border-gray-100">
                    Chọn chủ đề từ vựng ({VOCABULARY_TOPICS.length})
                  </div>
                  {VOCABULARY_TOPICS.map((topic) => {
                    const isSelected = topic.id === currentTopic.id;
                    const count = getTopicTotalCount(topic);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-rose-50 text-rose-800'
                            : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold truncate">
                            {topic.title}
                          </div>
                          <div className="text-[11px] text-gray-500 font-japanese mt-0.5 tabular-nums">
                            {topic.japaneseTitle} · {count} từ
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Horizontal Topic Pills for Instant 1-Click Switching */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {VOCABULARY_TOPICS.map((topic) => {
                const active = topic.id === currentTopic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => handleSelectTopic(topic.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 border transition-all cursor-pointer tabular-nums ${
                      active
                        ? 'bg-rose-50 border-rose-300 text-rose-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {topic.title} ({getTopicTotalCount(topic)})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-mode Toggle: Tra cứu vs Luyện tập */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setSubMode('browse')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                subMode === 'browse'
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Danh sách từ</span>
            </button>
            <button
              type="button"
              onClick={() => setSubMode('practice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                subMode === 'practice'
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Luyện tập chủ đề</span>
            </button>
          </div>
        </div>
      </div>

      {/* Topic Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-2xl p-4 sm:p-6 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-rose-100 flex flex-wrap items-center gap-2">
              <span className="font-japanese">{currentTopic.japaneseTitle}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{currentTopic.sections.length} nhóm nội dung</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{totalInTopic} từ & cụm từ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {currentTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-rose-50 max-w-3xl leading-relaxed">
              {currentTopic.description}
            </p>
          </div>
        </div>
      </div>

      {/* Section Filter Tabs + Search + Hide Meaning */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedSectionId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer tabular-nums ${
              selectedSectionId === 'all'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả ({totalInTopic})
          </button>
          {currentTopic.sections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setSelectedSectionId(sec.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer tabular-nums ${
                selectedSectionId === sec.id
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sec.title} ({sec.items.length})
            </button>
          ))}
        </div>

        {subMode === 'browse' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1 border-t border-gray-100">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm từ Kanji, cách đọc (あまい, サクサク), Hán Việt, hoặc nghĩa tiếng Việt..."
                className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-rose-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setHideMeaning((prev) => !prev);
                setRevealedIds(new Set());
              }}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                hideMeaning
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {hideMeaning ? (
                <Eye className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{hideMeaning ? 'Đang che nghĩa (Chạm để mở)' : 'Che nghĩa để tự ôn'}</span>
            </button>
          </div>
        )}
      </div>

      {/* ================= BROWSE MODE ================= */}
      {subMode === 'browse' ? (
        filteredSections.length > 0 ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between px-1 text-xs text-gray-500 font-medium tabular-nums">
              <span>
                Hiển thị <strong className="text-gray-900">{totalMatched}</strong> từ vựng
              </span>
              <span className="hidden sm:inline">
                Nhấn biểu tượng loa hoặc vào từ tiếng Nhật để nghe phát âm
              </span>
            </div>

            {filteredSections.map((section) => {
              const hasExamples = section.items.some(
                (it) => it.exampleJa || it.word.length > 18
              );

              return (
                <section
                  key={section.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden"
                >
                  {/* Section Heading */}
                  <div className="px-4 sm:px-5 py-3.5 bg-rose-50/60 border-b border-rose-100 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-gray-900">
                        {section.title}
                      </h3>
                      {section.subtitle && (
                        <p className="text-xs text-gray-600 mt-0.5 font-medium">
                          {section.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-bold text-rose-700 tabular-nums">
                      {section.items.length} mục
                    </span>
                  </div>

                  {/* Phrase + Example Cards (e.g. Section 6) */}
                  {hasExamples ? (
                    <div className="divide-y divide-gray-100">
                      {section.items.map((item) => {
                        const isMasked = hideMeaning && !revealedIds.has(item.id);
                        return (
                          <div
                            key={item.id}
                            className="p-4 sm:px-5 hover:bg-rose-50/20 transition-colors space-y-2"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="space-y-0.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handlePlayAudio(getSpeechText(item), item.id)
                                    }
                                    className="inline-flex items-center gap-1.5 text-base sm:text-lg font-black font-japanese text-gray-900 hover:text-rose-700 transition-colors cursor-pointer"
                                  >
                                    <span>{item.word}</span>
                                    <Volume2
                                      className={`w-4 h-4 shrink-0 ${
                                        playingId === item.id ? 'text-rose-600' : 'text-gray-400'
                                      }`}
                                    />
                                  </button>
                                  <span className="text-xs sm:text-sm font-japanese text-gray-600">
                                    （{item.reading}）
                                  </span>
                                  {item.hanViet && (
                                    <>
                                      <span className="text-gray-300" aria-hidden="true">
                                        ·
                                      </span>
                                      <span className="text-xs font-bold text-amber-700">
                                        {item.hanViet}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleToggleReveal(item.id)}
                                className={`text-sm sm:text-base font-bold text-left transition-all ${
                                  isMasked
                                    ? 'bg-gray-100 text-transparent rounded-lg px-2.5 py-0.5 blur-[4px] select-none cursor-pointer'
                                    : 'text-rose-700'
                                }`}
                              >
                                {item.meaning}
                              </button>
                            </div>

                            {item.note && (
                              <p className="text-xs text-gray-600 leading-relaxed">{item.note}</p>
                            )}

                            {item.exampleJa && (
                              <div className="bg-gray-50/90 rounded-xl p-3 border border-gray-100 flex items-start justify-between gap-3">
                                <div className="space-y-0.5">
                                  <p className="text-xs sm:text-sm font-bold font-japanese text-gray-900">
                                    {item.exampleJa}
                                  </p>
                                  {item.exampleVi && (
                                    <p className="text-xs text-gray-600">{item.exampleVi}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePlayAudio(item.exampleJa!, `${item.id}-ex`)
                                  }
                                  className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-rose-600 hover:border-rose-200 shrink-0 transition-colors cursor-pointer"
                                  title="Nghe câu ví dụ"
                                >
                                  <Volume2
                                    className={`w-3.5 h-3.5 ${
                                      playingId === `${item.id}-ex` ? 'text-rose-600' : ''
                                    }`}
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Structured Table Layout (Sections 1-5) */
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[680px]">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600">
                          <tr>
                            <th className="py-2.5 px-4">Từ vựng</th>
                            <th className="py-2.5 px-3">Cách đọc</th>
                            <th className="py-2.5 px-3">Hán Việt</th>
                            <th className="py-2.5 px-3">Nghĩa tiếng Việt</th>
                            <th className="py-2.5 px-4">Ghi chú & Ví dụ thực tế</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                          {section.items.map((item) => {
                            const isMasked = hideMeaning && !revealedIds.has(item.id);
                            return (
                              <tr
                                key={item.id}
                                className="hover:bg-rose-50/30 transition-colors"
                              >
                                <td className="py-3 px-4 font-japanese">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handlePlayAudio(getSpeechText(item), item.id)
                                    }
                                    className="group inline-flex items-center gap-1.5 font-bold text-gray-900 hover:text-rose-700 cursor-pointer whitespace-nowrap"
                                    title={`Nghe: ${item.reading}`}
                                  >
                                    <span>{item.word}</span>
                                    <Volume2
                                      className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                                        playingId === item.id
                                          ? 'opacity-100 text-rose-600'
                                          : 'opacity-40 group-hover:opacity-100 text-gray-400'
                                      }`}
                                    />
                                  </button>
                                </td>

                                <td className="py-3 px-3 font-japanese text-gray-700 whitespace-nowrap">
                                  {item.reading}
                                </td>

                                <td className="py-3 px-3 text-xs font-bold text-amber-700 whitespace-nowrap">
                                  {item.hanViet || <span className="text-gray-300 font-normal">—</span>}
                                </td>

                                <td className="py-3 px-3">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleReveal(item.id)}
                                    className={`text-left font-bold transition-all ${
                                      isMasked
                                        ? 'bg-gray-100 text-transparent rounded-md px-2 py-0.5 blur-[4px] select-none cursor-pointer'
                                        : 'text-rose-700'
                                    }`}
                                  >
                                    {item.meaning}
                                  </button>
                                </td>

                                <td className="py-3 px-4 text-xs text-gray-600 leading-relaxed">
                                  {item.note || '—'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-rose-200 p-10 text-center space-y-3">
            <p className="text-sm font-bold text-gray-800">
              Không tìm thấy từ vựng nào khớp với "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedSectionId('all');
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Xem lại toàn bộ chủ đề
            </button>
          </div>
        )
      ) : (
        /* ================= PRACTICE MODE ================= */
        question && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Score Bar */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs px-4 py-3 flex items-center justify-between gap-2 text-xs font-semibold text-gray-600 tabular-nums">
              <div className="flex items-center gap-3">
                <span>
                  Đúng: <strong className="text-emerald-600">{stats.correct}</strong>/{stats.total}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Chuỗi đúng: <strong className="text-rose-600">{stats.streak}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStats({ total: 0, correct: 0, streak: 0 });
                  handleNextQuestion();
                }}
                className="flex items-center gap-1 font-bold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-6">
              <div className="text-center space-y-2.5">
                <div className="text-xs font-semibold text-gray-500">
                  {question.sectionTitle}
                </div>

                <div className="flex items-center justify-center gap-2.5 pt-1">
                  <span
                    className={`font-black font-japanese text-gray-900 leading-snug ${
                      question.item.word.length > 14
                        ? 'text-lg sm:text-2xl'
                        : 'text-3xl sm:text-4xl'
                    }`}
                  >
                    {question.item.word}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handlePlayAudio(getSpeechText(question.item), 'quiz-q')
                    }
                    className="p-2 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Optional Reading/HanViet Hint */}
                {showHint || selectedOption !== null ? (
                  <div className="text-xs sm:text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
                    <span className="font-japanese font-bold text-gray-800">
                      {question.item.reading}
                    </span>
                    {question.item.hanViet && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-700 font-bold">
                          {question.item.hanViet}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 cursor-pointer"
                  >
                    Xem gợi ý cách đọc / Hán Việt
                  </button>
                )}
              </div>

              {/* 4 Meaning Options */}
              <div className="grid grid-cols-1 gap-2.5">
                {question.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === question.item.meaning;
                  const hasAnswered = selectedOption !== null;

                  let btnClass =
                    'bg-gray-50/80 border-gray-200 text-gray-900 hover:border-rose-300 hover:bg-rose-50/40';
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnClass = 'bg-rose-50 border-rose-500 text-rose-900';
                    } else {
                      btnClass = 'bg-gray-50/40 border-gray-200/70 text-gray-400';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 text-sm sm:text-base font-semibold text-left transition-all cursor-pointer disabled:cursor-default ${btnClass}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-gray-400 w-5">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt}</span>
                      </span>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Note */}
              {selectedOption !== null && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  {(question.item.note || question.item.exampleJa) && (
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 space-y-1">
                      {question.item.note && (
                        <div>
                          <strong>Ghi chú:</strong> {question.item.note}
                        </div>
                      )}
                      {question.item.exampleJa && (
                        <div>
                          <div className="font-japanese font-bold">
                            {question.item.exampleJa}
                          </div>
                          {question.item.exampleVi && (
                            <div className="text-amber-900/80">{question.item.exampleVi}</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
