import React, { useState, useMemo, useCallback } from 'react';
import { VERB_CONJUGATIONS } from '../data/verbConjugations';
import { VerbConjugationItem, VerbGroup } from '../types';
import { speakJapanese } from '../utils/speech';
import {
  Search,
  Volume2,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';

type SubMode = 'table' | 'practice';
type GroupFilter = 'all' | VerbGroup;
type TargetForm = 'random' | 'masu' | 'te' | 'ta' | 'nai';
type ConjugationFormKey = 'masu' | 'te' | 'ta' | 'nai';

const FORM_LABELS: Record<ConjugationFormKey, string> = {
  masu: 'Thể ます',
  te: 'Thể ~て',
  ta: 'Thể ~た',
  nai: 'Thể ~ない',
};

const GROUP_STYLES: Record<VerbGroup, { label: string; textClass: string; rowTint: string }> = {
  III: {
    label: 'III',
    textClass: 'text-amber-700 bg-amber-50 border-amber-200',
    rowTint: 'bg-amber-50/25',
  },
  II: {
    label: 'II',
    textClass: 'text-rose-700 bg-rose-50 border-rose-200',
    rowTint: '',
  },
  I: {
    label: 'I',
    textClass: 'text-slate-700 bg-slate-100 border-slate-200',
    rowTint: '',
  },
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Generates realistic, tricky Japanese conjugation distractors for a given verb & target form.
 */
function generateConjugationOptions(
  verb: VerbConjugationItem,
  formKey: ConjugationFormKey,
  pool: VerbConjugationItem[]
): string[] {
  const correct = verb[formKey];
  const candidates = new Set<string>();
  const dict = verb.dict;
  const stemMinusRu = dict.endsWith('る') ? dict.slice(0, -1) : dict.slice(0, -1);
  const lastChar = dict.slice(-1);

  if (formKey === 'masu') {
    // Common mistakes: mixing Group I/II rules, wrong i-row vowel
    candidates.add(stemMinusRu + 'ます');
    candidates.add(stemMinusRu + 'ります');
    if (lastChar === 'る') {
      candidates.add(dict + 'ます');
      candidates.add(stemMinusRu + 'います');
    }
    const iRowMap: Record<string, string> = {
      う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'に', ぶ: 'び', む: 'み', る: 'り',
    };
    const eRowMap: Record<string, string> = {
      う: 'え', く: 'け', ぐ: 'げ', す: 'せ', つ: 'て', ぬ: 'ね', ぶ: 'べ', む: 'め', る: 'れ',
    };
    if (iRowMap[lastChar]) candidates.add(dict.slice(0, -1) + iRowMap[lastChar] + 'ます');
    if (eRowMap[lastChar]) candidates.add(dict.slice(0, -1) + eRowMap[lastChar] + 'ます');
    if (dict === 'くる') {
      candidates.add('くます');
      candidates.add('こます');
      candidates.add('くれます');
    }
    if (dict === 'する') {
      candidates.add('すます');
      candidates.add('さます');
      candidates.add('せます');
    }
  } else if (formKey === 'te' || formKey === 'ta') {
    const suffix = formKey === 'te' ? 'て' : 'た';
    const dSuffix = formKey === 'te' ? 'で' : 'だ';
    const masuStem = verb.masu.replace(/ます$/, '');

    // Mixing Group II (-て) vs Group I (-って/-んで/-いて/-いで/-して)
    candidates.add(stemMinusRu + suffix);
    candidates.add(masuStem + suffix);
    candidates.add(stemMinusRu + 'っ' + suffix);
    candidates.add(stemMinusRu + 'ん' + dSuffix);
    candidates.add(stemMinusRu + 'い' + suffix);
    candidates.add(stemMinusRu + 'い' + dSuffix);
    candidates.add(stemMinusRu + 'し' + suffix);
    candidates.add(stemMinusRu + 'っ' + dSuffix);

    if (lastChar === 'く') {
      candidates.add(stemMinusRu + 'い' + dSuffix);
      candidates.add(stemMinusRu + 'き' + suffix);
    }
    if (lastChar === 'ぐ') {
      candidates.add(stemMinusRu + 'い' + suffix);
      candidates.add(stemMinusRu + 'ぎ' + dSuffix);
    }
    if (lastChar === 'む' || lastChar === 'ぶ' || lastChar === 'ぬ') {
      candidates.add(stemMinusRu + 'ん' + suffix);
      candidates.add(stemMinusRu + 'っ' + suffix);
    }
    if (dict === 'くる') {
      candidates.add('く' + suffix);
      candidates.add('こ' + suffix);
      candidates.add('きっ' + suffix);
    }
    if (dict === 'する') {
      candidates.add('す' + suffix);
      candidates.add('しっ' + suffix);
      candidates.add('さ' + suffix);
    }
  } else if (formKey === 'nai') {
    const masuStem = verb.masu.replace(/ます$/, '');
    candidates.add(stemMinusRu + 'ない');
    candidates.add(masuStem + 'ない');
    candidates.add(stemMinusRu + 'らない');
    candidates.add(stemMinusRu + 'あない');
    if (lastChar === 'う') {
      candidates.add(stemMinusRu + 'あない');
      candidates.add(stemMinusRu + 'わない');
      candidates.add(stemMinusRu + 'いない');
    }
    if (lastChar === 'る') {
      candidates.add(stemMinusRu + 'らない');
      candidates.add(stemMinusRu + 'ない');
      candidates.add(dict + 'ない');
    }
    const aRowMap: Record<string, string> = {
      う: 'わ', く: 'か', ぐ: 'が', す: 'さ', つ: 'た', ぬ: 'な', ぶ: 'ば', む: 'ま', る: 'ら',
    };
    const oRowMap: Record<string, string> = {
      う: 'お', く: 'こ', ぐ: 'ご', す: 'そ', つ: 'と', ぬ: 'の', ぶ: 'ぼ', む: 'も', る: 'ろ',
    };
    if (aRowMap[lastChar]) candidates.add(dict.slice(0, -1) + aRowMap[lastChar] + 'ない');
    if (oRowMap[lastChar]) candidates.add(dict.slice(0, -1) + oRowMap[lastChar] + 'ない');
    if (dict === 'くる') {
      candidates.add('きない');
      candidates.add('くない');
      candidates.add('かいない');
    }
    if (dict === 'する') {
      candidates.add('すない');
      candidates.add('さない');
      candidates.add('せない');
    }
  }

  candidates.delete(correct);
  const distractors: string[] = [];

  for (const c of candidates) {
    if (c && c !== correct && !c.includes('undefined') && c.length >= 2) {
      distractors.push(c);
    }
    if (distractors.length >= 6) break;
  }

  // Fallback from other verbs in pool if needed
  const fallbackVerbs = shuffleArray(pool.filter((v) => v[formKey] !== correct));
  for (const fv of fallbackVerbs) {
    if (distractors.length >= 6) break;
    if (!distractors.includes(fv[formKey])) {
      distractors.push(fv[formKey]);
    }
  }

  const chosen = shuffleArray(distractors).slice(0, 3);
  return shuffleArray([correct, ...chosen]);
}

interface PracticeQuestion {
  verb: VerbConjugationItem;
  targetForm: ConjugationFormKey;
  options: string[];
}

export const VerbConjugationView: React.FC = () => {
  const [subMode, setSubMode] = useState<SubMode>('table');
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideConjugations, setHideConjugations] = useState(false);
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set());
  const [showRules, setShowRules] = useState(false);
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);

  // Practice State
  const [practiceGroup, setPracticeGroup] = useState<GroupFilter>('all');
  const [practiceForm, setPracticeForm] = useState<TargetForm>('random');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, correct: 0, streak: 0, bestStreak: 0 });

  const countsByGroup = useMemo(() => {
    return {
      all: VERB_CONJUGATIONS.length,
      III: VERB_CONJUGATIONS.filter((v) => v.group === 'III').length,
      II: VERB_CONJUGATIONS.filter((v) => v.group === 'II').length,
      I: VERB_CONJUGATIONS.filter((v) => v.group === 'I').length,
    };
  }, []);

  const filteredVerbs = useMemo(() => {
    return VERB_CONJUGATIONS.filter((item) => {
      if (groupFilter !== 'all' && item.group !== groupFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.dict.toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q) ||
          item.masu.toLowerCase().includes(q) ||
          item.te.toLowerCase().includes(q) ||
          item.ta.toLowerCase().includes(q) ||
          item.nai.toLowerCase().includes(q) ||
          item.particle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [groupFilter, searchQuery]);

  const practicePool = useMemo(() => {
    return practiceGroup === 'all'
      ? VERB_CONJUGATIONS
      : VERB_CONJUGATIONS.filter((v) => v.group === practiceGroup);
  }, [practiceGroup]);

  const buildQuestion = useCallback(
    (pool: VerbConjugationItem[], target: TargetForm): PracticeQuestion => {
      const sourcePool = pool.length > 0 ? pool : VERB_CONJUGATIONS;
      const verb = sourcePool[Math.floor(Math.random() * sourcePool.length)];
      const formKeys: ConjugationFormKey[] = ['masu', 'te', 'ta', 'nai'];
      const chosenForm =
        target === 'random'
          ? formKeys[Math.floor(Math.random() * formKeys.length)]
          : target;
      const options = generateConjugationOptions(verb, chosenForm, VERB_CONJUGATIONS);
      return { verb, targetForm: chosenForm, options };
    },
    []
  );

  const [question, setQuestion] = useState<PracticeQuestion>(() =>
    buildQuestion(VERB_CONJUGATIONS, 'random')
  );

  const handlePlayAudio = (text: string, cellKey: string) => {
    speakJapanese(text, 0.88);
    setActiveAudioKey(cellKey);
    setTimeout(() => {
      setActiveAudioKey((prev) => (prev === cellKey ? null : prev));
    }, 800);
  };

  const handleToggleHideMode = () => {
    setHideConjugations((prev) => !prev);
    setRevealedCells(new Set());
  };

  const handleCellClick = (cellKey: string, text: string, isConjugatedColumn: boolean) => {
    if (hideConjugations && isConjugatedColumn && !revealedCells.has(cellKey)) {
      setRevealedCells((prev) => {
        const next = new Set(prev);
        next.add(cellKey);
        return next;
      });
    }
    handlePlayAudio(text, cellKey);
  };

  const handleStartNewQuestion = (nextGroup: GroupFilter = practiceGroup, nextForm: TargetForm = practiceForm) => {
    const pool =
      nextGroup === 'all'
        ? VERB_CONJUGATIONS
        : VERB_CONJUGATIONS.filter((v) => v.group === nextGroup);
    setSelectedOption(null);
    setQuestion(buildQuestion(pool, nextForm));
  };

  const handleSelectAnswer = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    const isCorrect = opt === question.verb[question.targetForm];
    speakJapanese(question.verb[question.targetForm], 0.9);
    setStats((prev) => {
      const nextStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        total: prev.total + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
      };
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 pb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-2xl p-4 sm:p-6 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-rose-100 flex items-center gap-2">
              <span>Tổng hợp động từ cơ bản</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{VERB_CONJUGATIONS.length} động từ</span>
              <span aria-hidden="true">·</span>
              <span>4 thể thông dụng</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Bảng Chia Động Từ Tiếng Nhật
            </h2>
            <p className="text-xs sm:text-sm text-rose-50 max-w-2xl">
              Tra cứu nhanh trợ từ đi kèm, nghĩa tiếng Việt và 4 thể chia cơ bản (ます・て・た・ない) theo 3 nhóm động từ. Chạm vào từng từ để nghe phát âm.
            </p>
          </div>

          {/* Sub-mode switcher: Bảng tra cứu vs Luyện chia thể */}
          <div className="flex items-center gap-1 p-1 bg-black/15 backdrop-blur-sm rounded-xl self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setSubMode('table')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                subMode === 'table'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Bảng tra cứu</span>
            </button>
            <button
              type="button"
              onClick={() => setSubMode('practice')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                subMode === 'practice'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Luyện chia thể</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABLE VIEW ================= */}
      {subMode === 'table' ? (
        <div className="space-y-4">
          {/* Controls & Quick Rules Toggle */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-3 sm:p-4 space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Group Filter Segmented Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto no-scrollbar">
                {(
                  [
                    { key: 'all', label: `Tất cả (${countsByGroup.all})` },
                    { key: 'III', label: `Nhóm III (${countsByGroup.III})` },
                    { key: 'II', label: `Nhóm II (${countsByGroup.II})` },
                    { key: 'I', label: `Nhóm I (${countsByGroup.I})` },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setGroupFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer tabular-nums ${
                      groupFilter === tab.key
                        ? 'bg-white text-rose-700 shadow-2xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Right Utility Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRules((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    showRules
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Quy tắc chia nhóm I・II・III</span>
                  {showRules ? (
                    <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleHideMode}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    hideConjugations
                      ? 'bg-rose-600 border-rose-600 text-white shadow-2xs'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {hideConjugations ? (
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{hideConjugations ? 'Đang che đáp án (Chạm để mở)' : 'Che cột chia để tự ôn'}</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm động từ (vd: たべる, のんで, いかない), trợ từ (を, に), hoặc nghĩa tiếng Việt..."
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

            {/* Collapsible Quick Conjugation Rules */}
            {showRules && (
              <div className="pt-2 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                  <div className="font-black text-amber-900">Nhóm III (Bất quy tắc)</div>
                  <p className="text-amber-900/85 leading-relaxed">
                    Chỉ có 2 động từ gốc:<br />
                    • <strong className="font-japanese">くる</strong> → きます / きて / きた / <span className="font-bold text-rose-700">こない</span><br />
                    • <strong className="font-japanese">する</strong> → します / して / した / しない
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
                  <div className="font-black text-rose-900">Nhóm II (Đuôi -iru / -eru)</div>
                  <p className="text-rose-900/85 leading-relaxed">
                    Cực kỳ đơn giản — chỉ cần <strong>bỏ る</strong> rồi gắn trực tiếp đuôi:<br />
                    • <span className="font-japanese font-bold">〜ます・〜て・〜た・〜ない</span><br />
                    • Vd: <span className="font-japanese">たべ<s>る</s></span> → たべます / たべて / たべた / たべない
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-black text-slate-900">Nhóm I (Ngũ đoạn -u)</div>
                  <p className="text-slate-700 leading-relaxed">
                    • <strong>Thể ます:</strong> Đuôi hàng <strong>u → i</strong> + ます<br />
                    • <strong>Thể て / た:</strong> う・つ・る → <strong className="font-japanese">って/った</strong>｜む・ぶ・ぬ → <strong className="font-japanese">んで/んだ</strong>｜く → <strong className="font-japanese">いて/いた</strong>｜ぐ → <strong className="font-japanese">いで/いだ</strong>｜す → <strong className="font-japanese">して/した</strong><br />
                    • <strong>Thể ない:</strong> Đuôi hàng <strong>u → a</strong> + ない (riêng <strong>う → わ</strong>)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Results Count Bar */}
          <div className="flex items-center justify-between px-1 text-xs text-gray-500 font-medium">
            <span className="tabular-nums">
              Hiển thị <strong className="text-gray-900">{filteredVerbs.length}</strong> / {VERB_CONJUGATIONS.length} động từ
            </span>
            <span className="hidden sm:inline">
              Mẹo: Nhấn vào bất kỳ ô tiếng Nhật nào để nghe phát âm chuẩn
            </span>
          </div>

          {/* Conjugation Table */}
          {filteredVerbs.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto max-h-[70vh]">
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead className="sticky top-0 z-20 bg-gray-900 text-white text-xs font-bold tracking-wide">
                    <tr>
                      <th className="py-3 px-2.5 text-center w-14 border-r border-gray-800">Nhóm</th>
                      <th className="py-3 px-3 text-center w-20 border-r border-gray-800">Trợ từ</th>
                      <th className="py-3 px-3.5 sticky left-0 z-30 bg-gray-900 border-r border-gray-800">
                        Động từ
                      </th>
                      <th className="py-3 px-3.5 border-r border-gray-800">Nghĩa</th>
                      <th className="py-3 px-3.5 border-r border-gray-800">Thể ます</th>
                      <th className="py-3 px-3.5 border-r border-gray-800">~て</th>
                      <th className="py-3 px-3.5 border-r border-gray-800">~た</th>
                      <th className="py-3 px-3.5">~ない</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {filteredVerbs.map((item) => {
                      const gStyle = GROUP_STYLES[item.group];
                      const forms: { key: ConjugationFormKey; value: string }[] = [
                        { key: 'masu', value: item.masu },
                        { key: 'te', value: item.te },
                        { key: 'ta', value: item.ta },
                        { key: 'nai', value: item.nai },
                      ];

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-rose-50/40 transition-colors ${gStyle.rowTint}`}
                        >
                          {/* Group */}
                          <td className="py-2.5 px-2.5 text-center border-r border-gray-100">
                            <span
                              className={`inline-block min-w-[28px] py-0.5 px-1.5 text-[11px] font-black rounded-md border tabular-nums ${gStyle.textClass}`}
                            >
                              {gStyle.label}
                            </span>
                          </td>

                          {/* Particle */}
                          <td className="py-2.5 px-3 text-center font-japanese text-gray-600 font-medium border-r border-gray-100 whitespace-nowrap">
                            {item.particle || <span className="text-gray-300">—</span>}
                          </td>

                          {/* Dictionary Form (Sticky on mobile scroll) */}
                          <td className="py-2.5 px-3.5 sticky left-0 z-10 bg-white border-r border-gray-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)] sm:shadow-none">
                            <button
                              type="button"
                              onClick={() => handlePlayAudio(item.dict, `${item.id}-dict`)}
                              className={`group flex items-center gap-1.5 font-japanese font-bold text-gray-900 hover:text-rose-700 transition-colors cursor-pointer whitespace-nowrap ${
                                activeAudioKey === `${item.id}-dict` ? 'text-rose-600' : ''
                              }`}
                              title={`Nghe phát âm: ${item.dict}`}
                            >
                              <span>{item.dict}</span>
                              <Volume2
                                className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                                  activeAudioKey === `${item.id}-dict`
                                    ? 'opacity-100 text-rose-600'
                                    : 'opacity-0 group-hover:opacity-70 text-gray-400'
                                }`}
                              />
                            </button>
                          </td>

                          {/* Meaning */}
                          <td className="py-2.5 px-3.5 text-gray-700 font-semibold border-r border-gray-100">
                            {item.meaning}
                          </td>

                          {/* 4 Conjugated Columns */}
                          {forms.map((f) => {
                            const cellKey = `${item.id}-${f.key}`;
                            const isMasked = hideConjugations && !revealedCells.has(cellKey);
                            const isPlaying = activeAudioKey === cellKey;

                            return (
                              <td
                                key={f.key}
                                className="py-2 px-3 border-r last:border-r-0 border-gray-100"
                              >
                                <button
                                  type="button"
                                  onClick={() => handleCellClick(cellKey, f.value, true)}
                                  className={`group w-full text-left flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg font-japanese transition-all cursor-pointer whitespace-nowrap ${
                                    isMasked
                                      ? 'bg-gray-100 text-transparent hover:bg-rose-50 select-none'
                                      : isPlaying
                                      ? 'bg-rose-50 text-rose-700 font-bold'
                                      : 'text-gray-800 hover:bg-gray-50 hover:text-rose-700 font-medium'
                                  }`}
                                  title={isMasked ? 'Chạm để xem & nghe đáp án' : `Nghe: ${f.value}`}
                                >
                                  <span className={isMasked ? 'blur-[5px] select-none' : ''}>
                                    {f.value}
                                  </span>
                                  {isMasked ? (
                                    <span className="text-[10px] font-sans font-bold text-gray-400 shrink-0">
                                      Mở
                                    </span>
                                  ) : (
                                    <Volume2
                                      className={`w-3 h-3 shrink-0 transition-opacity ${
                                        isPlaying
                                          ? 'opacity-100 text-rose-600'
                                          : 'opacity-0 group-hover:opacity-60 text-gray-400'
                                      }`}
                                    />
                                  )}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-rose-200 p-10 text-center space-y-3">
              <p className="text-sm font-bold text-gray-800">
                Không tìm thấy động từ khớp với "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setGroupFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Hiện lại toàn bộ 180 động từ
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= PRACTICE DRILL VIEW ================= */
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Practice Controls & Stats */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-3.5 sm:p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-600 tabular-nums">
                <span>
                  Đúng: <strong className="text-emerald-600">{stats.correct}</strong>/{stats.total}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  Chuỗi đúng: <strong className="text-rose-600">{stats.streak}</strong>
                </span>
                {stats.bestStreak > 1 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Kỷ lục: <strong className="text-amber-600">{stats.bestStreak}</strong>
                    </span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setStats({ total: 0, correct: 0, streak: 0, bestStreak: 0 });
                  handleStartNewQuestion();
                }}
                className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm mới điểm</span>
              </button>
            </div>

            {/* Scope & Form Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 block">Phạm vi nhóm:</label>
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  {(['all', 'I', 'II', 'III'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setPracticeGroup(g);
                        handleStartNewQuestion(g, practiceForm);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        practiceGroup === g
                          ? 'bg-white text-rose-700 shadow-2xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {g === 'all' ? 'Tất cả' : `Nhóm ${g}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 block">Thể cần luyện:</label>
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  {(
                    [
                      { key: 'random', label: 'Ngẫu nhiên' },
                      { key: 'masu', label: 'ます' },
                      { key: 'te', label: '〜て' },
                      { key: 'ta', label: '〜た' },
                      { key: 'nai', label: '〜ない' },
                    ] as const
                  ).map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => {
                        setPracticeForm(f.key);
                        handleStartNewQuestion(practiceGroup, f.key);
                      }}
                      className={`flex-1 py-1.5 px-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        practiceForm === f.key
                          ? 'bg-white text-rose-700 shadow-2xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-6">
            <div className="text-center space-y-2.5">
              <div className="text-xs font-semibold text-gray-500 flex items-center justify-center gap-2">
                <span>Nhóm {question.verb.group}</span>
                {question.verb.particle && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Trợ từ: <strong className="font-japanese text-gray-800">{question.verb.particle}</strong>
                    </span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{practicePool.length} động từ trong bộ</span>
              </div>

              <div className="flex items-center justify-center gap-2.5 pt-1">
                <span className="text-3xl sm:text-4xl font-black font-japanese text-gray-900">
                  {question.verb.dict}
                </span>
                <button
                  type="button"
                  onClick={() => speakJapanese(question.verb.dict, 0.88)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Nghe từ điển"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm sm:text-base font-bold text-gray-600">
                {question.verb.meaning}
              </div>

              <div className="pt-2">
                <span className="inline-block px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold">
                  Chuyển sang {FORM_LABELS[question.targetForm]}:
                </span>
              </div>
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrectAnswer = option === question.verb[question.targetForm];
                const hasAnswered = selectedOption !== null;

                let btnClass =
                  'bg-gray-50/80 border-gray-200 text-gray-900 hover:border-rose-300 hover:bg-rose-50/40';
                if (hasAnswered) {
                  if (isCorrectAnswer) {
                    btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-50 border-rose-500 text-rose-900';
                  } else {
                    btnClass = 'bg-gray-50/50 border-gray-200/70 text-gray-400';
                  }
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => handleSelectAnswer(option)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 text-base sm:text-lg font-japanese font-bold transition-all cursor-pointer disabled:cursor-default ${btnClass}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs font-sans font-bold text-gray-400 w-5 text-left">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option}</span>
                    </span>
                    {hasAnswered && isCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Full Conjugation Row Review */}
            {selectedOption !== null && (
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs sm:text-sm font-bold">
                    {selectedOption === question.verb[question.targetForm] ? (
                      <span className="text-emerald-700">
                        Chính xác! {question.verb.dict} → {question.verb[question.targetForm]}
                      </span>
                    ) : (
                      <span className="text-rose-700">
                        Chưa đúng — Đáp án đúng là{' '}
                        <strong className="font-japanese text-base">
                          {question.verb[question.targetForm]}
                        </strong>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartNewQuestion()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mini summary of all 4 forms of this verb */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {(['masu', 'te', 'ta', 'nai'] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => speakJapanese(question.verb[k], 0.88)}
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        k === question.targetForm
                          ? 'bg-rose-50/80 border-rose-200'
                          : 'bg-gray-50 border-gray-200/80 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-gray-500 block">
                        {FORM_LABELS[k]}
                      </span>
                      <span className="text-sm font-bold font-japanese text-gray-900 mt-0.5 block">
                        {question.verb[k]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
