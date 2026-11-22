import React, { useState, useMemo, useCallback } from 'react';
import { VERB_CONJUGATIONS, KEIGO_VERBS } from '../data/verbConjugations';
import { VerbConjugationItem, VerbGroup, VerbSubgroup } from '../types';
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
type GroupFilter = 'all' | VerbGroup | 'keigo';
type SubgroupFilter = 'all' | VerbSubgroup;
type ColumnTier = 'all' | 'basic' | 'advanced';

type ConjugationFormKey =
  | 'masu'
  | 'te'
  | 'ta'
  | 'nai'
  | 'potential'
  | 'volitional'
  | 'passive'
  | 'causative'
  | 'causativePassive'
  | 'conditional'
  | 'imperative';

type TargetForm = 'random-all' | 'random-basic' | ConjugationFormKey;

const FORM_COLUMNS: { key: ConjugationFormKey; label: string; shortLabel: string; tier: 'basic' | 'advanced' }[] = [
  { key: 'masu', label: 'Thể 〜ます', shortLabel: 'ます', tier: 'basic' },
  { key: 'te', label: 'Thể 〜て', shortLabel: '〜て', tier: 'basic' },
  { key: 'ta', label: 'Thể 〜た', shortLabel: '〜た', tier: 'basic' },
  { key: 'nai', label: 'Thể 〜ない', shortLabel: '〜ない', tier: 'basic' },
  { key: 'potential', label: 'Khả năng', shortLabel: 'Khả năng', tier: 'advanced' },
  { key: 'volitional', label: 'Ý chí', shortLabel: 'Ý chí', tier: 'advanced' },
  { key: 'passive', label: 'Bị động', shortLabel: 'Bị động', tier: 'advanced' },
  { key: 'causative', label: 'Sai khiến', shortLabel: 'Sai khiến', tier: 'advanced' },
  { key: 'causativePassive', label: 'Sai khiến bị động', shortLabel: 'SK bị động', tier: 'advanced' },
  { key: 'conditional', label: 'Điều kiện 〜ば', shortLabel: '〜ば', tier: 'advanced' },
  { key: 'imperative', label: 'Mệnh lệnh', shortLabel: 'Mệnh lệnh', tier: 'advanced' },
];

const FORM_LABEL_MAP: Record<ConjugationFormKey, string> = FORM_COLUMNS.reduce(
  (acc, col) => ({ ...acc, [col.key]: col.label }),
  {} as Record<ConjugationFormKey, string>
);

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

const SUBGROUP_LABELS: Record<VerbSubgroup, string> = {
  'u-tsu-ru': '〜う / 〜つ / 〜る',
  'mu-bu-nu': '〜む / 〜ぶ / 〜ぬ',
  'ku-gu': '〜く / 〜ぐ',
  su: '〜す',
};

const TWELVE_FORMS_GUIDE = [
  { num: 1, name: 'Thể từ điển (辞書形)', desc: 'Dạng gốc nguyên thể (taberu, kaku, suru, kuru).' },
  { num: 2, name: 'Thể 〜ます (-masu)', desc: 'Lịch sự cơ bản (tabemasu, kakimasu, shimasu, kimasu).' },
  { num: 3, name: 'Thể 〜て (-te)', desc: 'Nối vế, yêu cầu, tiếp diễn, xin phép (tabete, kaite, shite, kite).' },
  { num: 4, name: 'Thể 〜た (-ta)', desc: 'Quá khứ thân mật, trải nghiệm, lời khuyên (tabeta, kaita, shita, kita).' },
  { num: 5, name: 'Thể 〜ない (-nai)', desc: 'Phủ định thân mật, cấm nhẹ, bắt buộc (tabenai, kakanai, shinai, konai).' },
  { num: 6, name: 'Thể khả năng', desc: 'Có thể làm gì (taberareru, kakeru, dekiru, korareru).' },
  { num: 7, name: 'Thể ý chí', desc: 'Ý định, rủ rê, quyết tâm (tabeyou, kakou, shiyou, koyou).' },
  { num: 8, name: 'Thể bị động', desc: 'Chịu tác động/ảnh hưởng (taberareru, kakareru, sareru, korareru).' },
  { num: 9, name: 'Thể sai khiến', desc: 'Bắt/cho phép làm gì (tabesaseru, kakaseru, saseru, kosaseru).' },
  { num: 10, name: 'Thể sai khiến bị động', desc: 'Bị bắt phải làm gì (tabesaserareru, kakasareru, saserareru, kosaserareru).' },
  { num: 11, name: 'Thể điều kiện 〜ば (-ba)', desc: 'Điều kiện/giả định (tabereba, kakeba, sureba, kureba).' },
  { num: 12, name: 'Thể mệnh lệnh / cấm chỉ', desc: 'Ra lệnh (tabero, kake, shiro/seyo, koi) & cấm chỉ thêm な (taberu na, kaku na).' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function toSpeakableJapanese(text: string): string {
  return text.split('/')[0].trim();
}

function generateConjugationOptions(
  verb: VerbConjugationItem,
  formKey: ConjugationFormKey,
  pool: VerbConjugationItem[]
): string[] {
  const correct = verb[formKey];
  const candidates = new Set<string>();
  const dict = verb.dict;
  const isSuruCompound = dict.endsWith('する');
  const stem = isSuruCompound ? dict.slice(0, -2) : dict.slice(0, -1);
  const lastChar = dict.slice(-1);

  // Pull other forms of the SAME verb as natural confusion traps (especially potential vs passive vs causative)
  const sameVerbOtherForms: ConjugationFormKey[] = [
    'masu',
    'te',
    'ta',
    'nai',
    'potential',
    'volitional',
    'passive',
    'causative',
    'causativePassive',
    'conditional',
    'imperative',
  ];
  for (const fk of sameVerbOtherForms) {
    if (fk !== formKey && verb[fk] !== correct) {
      candidates.add(verb[fk]);
    }
  }

  if (isSuruCompound) {
    candidates.add(stem + 'します');
    candidates.add(stem + 'して');
    candidates.add(stem + 'した');
    candidates.add(stem + 'しない');
    candidates.add(stem + 'できる');
    candidates.add(stem + 'しよう');
    candidates.add(stem + 'される');
    candidates.add(stem + 'させる');
    candidates.add(stem + 'させられる');
    candidates.add(stem + 'すれば');
    candidates.add(stem + 'しろ');
    candidates.add(stem + 'すれ');
    candidates.add(stem + 'さられる');
  } else if (dict === 'くる') {
    candidates.add('きます');
    candidates.add('きて');
    candidates.add('きた');
    candidates.add('こない');
    candidates.add('きない');
    candidates.add('くない');
    candidates.add('こられる');
    candidates.add('こよう');
    candidates.add('きよう');
    candidates.add('こさせる');
    candidates.add('こさせられる');
    candidates.add('くれば');
    candidates.add('これば');
    candidates.add('こい');
    candidates.add('きろ');
  } else {
    const iRowMap: Record<string, string> = {
      う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'に', ぶ: 'び', む: 'み', る: 'り',
    };
    const eRowMap: Record<string, string> = {
      う: 'え', く: 'け', ぐ: 'げ', す: 'せ', つ: 'て', ぬ: 'ね', ぶ: 'べ', む: 'め', る: 'れ',
    };
    const aRowMap: Record<string, string> = {
      う: 'わ', く: 'か', ぐ: 'が', す: 'さ', つ: 'た', ぬ: 'な', ぶ: 'ば', む: 'ま', る: 'ら',
    };
    const oRowMap: Record<string, string> = {
      う: 'お', く: 'こ', ぐ: 'ご', す: 'そ', つ: 'と', ぬ: 'の', ぶ: 'ぼ', む: 'も', る: 'ろ',
    };

    const iChar = iRowMap[lastChar] || '';
    const eChar = eRowMap[lastChar] || '';
    const aChar = aRowMap[lastChar] || '';
    const oChar = oRowMap[lastChar] || '';

    if (formKey === 'masu') {
      candidates.add(stem + 'ます');
      candidates.add(stem + 'ります');
      if (iChar) candidates.add(stem + iChar + 'ます');
      if (eChar) candidates.add(stem + eChar + 'ます');
    } else if (formKey === 'te' || formKey === 'ta') {
      const s = formKey === 'te' ? 'て' : 'た';
      const d = formKey === 'te' ? 'で' : 'だ';
      candidates.add(stem + s);
      candidates.add(stem + 'っ' + s);
      candidates.add(stem + 'ん' + d);
      candidates.add(stem + 'い' + s);
      candidates.add(stem + 'い' + d);
      candidates.add(stem + 'し' + s);
      if (iChar) candidates.add(stem + iChar + s);
    } else if (formKey === 'nai') {
      candidates.add(stem + 'ない');
      if (aChar) candidates.add(stem + aChar + 'ない');
      if (iChar) candidates.add(stem + iChar + 'ない');
      if (oChar) candidates.add(stem + oChar + 'ない');
    } else if (formKey === 'potential') {
      if (eChar) candidates.add(stem + eChar + 'る');
      candidates.add(stem + 'られる');
      candidates.add(stem + 'れる');
      if (aChar) candidates.add(stem + aChar + 'れる');
    } else if (formKey === 'volitional') {
      candidates.add(stem + 'よう');
      if (oChar) candidates.add(stem + oChar + 'う');
      if (aChar) candidates.add(stem + aChar + 'う');
      candidates.add(stem + 'ろう');
    } else if (formKey === 'passive') {
      candidates.add(stem + 'られる');
      if (aChar) candidates.add(stem + aChar + 'れる');
      if (eChar) candidates.add(stem + eChar + 'る');
      candidates.add(stem + 'させる');
    } else if (formKey === 'causative') {
      candidates.add(stem + 'させる');
      if (aChar) candidates.add(stem + aChar + 'せる');
      candidates.add(stem + 'られる');
      if (aChar) candidates.add(stem + aChar + 'れる');
    } else if (formKey === 'causativePassive') {
      candidates.add(stem + 'させられる');
      if (aChar) candidates.add(stem + aChar + 'せられる');
      if (aChar) candidates.add(stem + aChar + 'される');
      candidates.add(stem + 'られる');
    } else if (formKey === 'conditional') {
      candidates.add(stem + 'れば');
      if (eChar) candidates.add(stem + eChar + 'ば');
      if (aChar) candidates.add(stem + aChar + 'ば');
      candidates.add(dict + 'ば');
    } else if (formKey === 'imperative') {
      candidates.add(stem + 'ろ');
      if (eChar) candidates.add(stem + eChar);
      if (iChar) candidates.add(stem + iChar);
      candidates.add(stem + 'れ');
    }
  }

  // Keep only candidates of comparable style/pattern (avoid obviously trivial mismatches when possible)
  candidates.delete(correct);
  const distractors: string[] = [];

  for (const c of candidates) {
    if (c && c !== correct && !c.includes('undefined') && c.length >= 2) {
      distractors.push(c);
    }
    if (distractors.length >= 6) break;
  }

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
  const [subgroupFilter, setSubgroupFilter] = useState<SubgroupFilter>('all');
  const [columnTier, setColumnTier] = useState<ColumnTier>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideConjugations, setHideConjugations] = useState(false);
  const [revealedCells, setRevealedCells] = useState<Set<string>>(new Set());
  const [showRules, setShowRules] = useState(false);
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);

  // Practice State
  const [practiceGroup, setPracticeGroup] = useState<'all' | VerbGroup>('all');
  const [practiceForm, setPracticeForm] = useState<TargetForm>('random-all');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, correct: 0, streak: 0, bestStreak: 0 });

  const counts = useMemo(() => {
    const g1 = VERB_CONJUGATIONS.filter((v) => v.group === 'I');
    return {
      all: VERB_CONJUGATIONS.length,
      III: VERB_CONJUGATIONS.filter((v) => v.group === 'III').length,
      II: VERB_CONJUGATIONS.filter((v) => v.group === 'II').length,
      I: g1.length,
      keigo: KEIGO_VERBS.length,
      subgroups: {
        'u-tsu-ru': g1.filter((v) => v.subgroup === 'u-tsu-ru').length,
        'mu-bu-nu': g1.filter((v) => v.subgroup === 'mu-bu-nu').length,
        'ku-gu': g1.filter((v) => v.subgroup === 'ku-gu').length,
        su: g1.filter((v) => v.subgroup === 'su').length,
      },
    };
  }, []);

  const visibleFormColumns = useMemo(() => {
    if (columnTier === 'all') return FORM_COLUMNS;
    return FORM_COLUMNS.filter((c) => c.tier === columnTier);
  }, [columnTier]);

  const filteredVerbs = useMemo(() => {
    if (groupFilter === 'keigo') return [];
    return VERB_CONJUGATIONS.filter((item) => {
      if (groupFilter !== 'all' && item.group !== groupFilter) return false;
      if (groupFilter === 'I' && subgroupFilter !== 'all' && item.subgroup !== subgroupFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.dict.toLowerCase().includes(q) ||
          (item.hanViet || '').toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q) ||
          item.masu.toLowerCase().includes(q) ||
          item.te.toLowerCase().includes(q) ||
          item.ta.toLowerCase().includes(q) ||
          item.nai.toLowerCase().includes(q) ||
          item.potential.toLowerCase().includes(q) ||
          item.volitional.toLowerCase().includes(q) ||
          item.passive.toLowerCase().includes(q) ||
          item.causative.toLowerCase().includes(q) ||
          item.causativePassive.toLowerCase().includes(q) ||
          item.conditional.toLowerCase().includes(q) ||
          item.imperative.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [groupFilter, subgroupFilter, searchQuery]);

  const filteredKeigo = useMemo(() => {
    if (groupFilter !== 'keigo') return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return KEIGO_VERBS;
    return KEIGO_VERBS.filter(
      (item) =>
        item.verb.toLowerCase().includes(q) ||
        item.keigoType.toLowerCase().includes(q) ||
        item.equivalent.toLowerCase().includes(q) ||
        item.masu.toLowerCase().includes(q) ||
        item.te.toLowerCase().includes(q) ||
        item.ta.toLowerCase().includes(q) ||
        item.nai.toLowerCase().includes(q) ||
        item.conditional.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q)
    );
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
      const basicKeys: ConjugationFormKey[] = ['masu', 'te', 'ta', 'nai'];
      const allKeys: ConjugationFormKey[] = FORM_COLUMNS.map((c) => c.key);

      let chosenForm: ConjugationFormKey;
      if (target === 'random-all') {
        chosenForm = allKeys[Math.floor(Math.random() * allKeys.length)];
      } else if (target === 'random-basic') {
        chosenForm = basicKeys[Math.floor(Math.random() * basicKeys.length)];
      } else {
        chosenForm = target;
      }

      const options = generateConjugationOptions(verb, chosenForm, VERB_CONJUGATIONS);
      return { verb, targetForm: chosenForm, options };
    },
    []
  );

  const [question, setQuestion] = useState<PracticeQuestion>(() =>
    buildQuestion(VERB_CONJUGATIONS, 'random-all')
  );

  const handlePlayAudio = (text: string, cellKey: string) => {
    speakJapanese(toSpeakableJapanese(text), 0.88);
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

  const handleSelectGroup = (g: GroupFilter) => {
    setGroupFilter(g);
    if (g !== 'I') {
      setSubgroupFilter('all');
    }
  };

  const handleStartNewQuestion = (
    nextGroup: 'all' | VerbGroup = practiceGroup,
    nextForm: TargetForm = practiceForm
  ) => {
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
    speakJapanese(toSpeakableJapanese(question.verb[question.targetForm]), 0.9);
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
            <div className="text-xs font-semibold text-rose-100 flex flex-wrap items-center gap-2">
              <span>Từ nền tảng đến cao cấp</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{counts.all} động từ (12 thể)</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{counts.keigo} kính ngữ đặc biệt</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Cẩm Nang Chia Động Từ Tiếng Nhật
            </h2>
            <p className="text-xs sm:text-sm text-rose-50 max-w-2xl">
              Đầy đủ 12 thể chia từ sơ cấp đến cao cấp (〜ます, 〜て, 〜た, 〜ない, Khả năng, Ý chí, Bị động, Sai khiến, Sai khiến bị động, Điều kiện 〜ば, Mệnh lệnh) kèm Hán Việt và bảng Kính ngữ Keigo.
            </p>
          </div>

          {/* Sub-mode switcher */}
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
          {/* Controls & Quick Handbook Toggle */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-3 sm:p-4 space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Group Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto no-scrollbar">
                {(
                  [
                    { key: 'all', label: `Tất cả (${counts.all})` },
                    { key: 'III', label: `Nhóm III (${counts.III})` },
                    { key: 'II', label: `Nhóm II (${counts.II})` },
                    { key: 'I', label: `Nhóm I (${counts.I})` },
                    { key: 'keigo', label: `Kính ngữ Keigo (${counts.keigo})` },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleSelectGroup(tab.key)}
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
                  <span>Cẩm nang 3 nhóm & 12 thể</span>
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
                  <span>
                    {hideConjugations ? 'Đang che đáp án (Chạm để mở)' : 'Che cột chia để tự ôn'}
                  </span>
                </button>
              </div>
            </div>

            {/* Nhóm I Subgroup Tabs + Column Tier Switcher */}
            {groupFilter !== 'keigo' && (
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-gray-100">
                {groupFilter === 'I' ? (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-gray-500 mr-1">Đuôi Nhóm I:</span>
                    <button
                      type="button"
                      onClick={() => setSubgroupFilter('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer tabular-nums ${
                        subgroupFilter === 'all'
                          ? 'bg-rose-600 border-rose-600 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Tất cả ({counts.I})
                    </button>
                    {(Object.keys(SUBGROUP_LABELS) as VerbSubgroup[]).map((sg) => (
                      <button
                        key={sg}
                        type="button"
                        onClick={() => setSubgroupFilter(sg)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold font-japanese border transition-colors cursor-pointer tabular-nums ${
                          subgroupFilter === sg
                            ? 'bg-rose-600 border-rose-600 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {SUBGROUP_LABELS[sg]} ({counts.subgroups[sg]})
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 font-medium">
                    Hiển thị cột chia thể:
                  </div>
                )}

                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  {(
                    [
                      { key: 'all', label: 'Đầy đủ 12 thể' },
                      { key: 'basic', label: 'Cơ bản (ます・て・た・ない)' },
                      { key: 'advanced', label: 'Trung / Cao cấp (7 thể)' },
                    ] as const
                  ).map((tier) => (
                    <button
                      key={tier.key}
                      type="button"
                      onClick={() => setColumnTier(tier.key)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        columnTier === tier.key
                          ? 'bg-white text-rose-700 shadow-2xs'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  groupFilter === 'keigo'
                    ? 'Tìm kính ngữ (いらっしゃる, いただく), động từ gốc, hoặc ghi chú...'
                    : 'Tìm động từ (食べる, 食べれば, 買わされる), Hán Việt, hoặc nghĩa tiếng Việt...'
                }
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

            {/* Collapsible Comprehensive Handbook */}
            {showRules && (
              <div className="pt-3 border-t border-gray-100 space-y-4">
                {/* 1. Phân loại 3 nhóm động từ */}
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-black text-gray-900">
                    1. Phân loại 3 nhóm động từ trong tiếng Nhật (từ thể từ điển — 辞書形)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                      <div className="font-black text-amber-900">Nhóm III (Bất quy tắc — グループ3)</div>
                      <p className="text-amber-900/90 leading-relaxed">
                        Gồm <strong className="font-japanese">する</strong> (làm) và{' '}
                        <strong className="font-japanese">くる</strong> (đến — Hán Việt: LAI), cùng các từ ghép với{' '}
                        <strong className="font-japanese">する</strong> (勉強する, 運転する, 連絡する, 貢献する, 推測する...).
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
                      <div className="font-black text-rose-900">Nhóm II (Nhóm ru — グループ2)</div>
                      <p className="text-rose-900/90 leading-relaxed">
                        Kết thúc bằng <strong className="font-japanese">〜る</strong> và âm tiết trước{' '}
                        <strong className="font-japanese">〜る</strong> ở cột <strong>い (i)</strong> hoặc{' '}
                        <strong>え (e)</strong> (食べる, 見る, 起きる, 寝る, 教える, 借りる...).
                      </p>
                      <p className="text-[11px] text-rose-800/85 bg-white/70 rounded-lg p-2 border border-rose-100 leading-relaxed">
                        <strong>Ngoại lệ Nhóm I (tận cùng 〜る nhưng chia Nhóm I):</strong> 帰る (về), 走る (chạy), 入る (vào), 切る (cắt), 知る (biết), 要る (cần), 減る (giảm), 滑る (trượt), 焦る (nôn nóng), 限る (giới hạn), 参る, 御座る...
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="font-black text-slate-900">Nhóm I (Nhóm u — グループ1)</div>
                      <p className="text-slate-700 leading-relaxed">
                        Đuôi thể từ điển kết thúc bằng 9 âm cột <strong>う (u)</strong>:{' '}
                        <strong className="font-japanese text-gray-900">
                          う、つ、る、む、ぶ、ぬ、く、ぐ、す
                        </strong>{' '}
                        (trừ Nhóm II và Nhóm III).
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        <em>Ví dụ:</em> 買う, 待つ, 作る, 飲む, 遊ぶ, 死ぬ, 書く, 泳ぐ, 話す.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Hệ thống 12 thể & dạng chia động từ cốt lõi */}
                <div className="space-y-2">
                  <h3 className="text-xs sm:text-sm font-black text-gray-900">
                    2. Hệ thống 12 thể & dạng chia động từ cốt lõi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    {TWELVE_FORMS_GUIDE.map((f) => (
                      <div
                        key={f.num}
                        className="p-2.5 rounded-xl bg-gray-50 border border-gray-200/70 space-y-0.5"
                      >
                        <div className="font-bold text-gray-900">
                          <span className="text-rose-600 mr-1">{f.num}.</span>
                          {f.name}
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-amber-900 bg-amber-50/70 border border-amber-200/70 rounded-xl px-3 py-2 leading-relaxed">
                    <strong>Lưu ý kính ngữ nâng cao:</strong> <span className="font-japanese font-bold">尊敬語</span> (tôn kính ngữ) và{' '}
                    <span className="font-japanese font-bold">謙譲語</span> (khiêm nhường ngữ) thường dùng các động từ đặc biệt như{' '}
                    <span className="font-japanese">召し上がる, いらっしゃる, いただく, 申し上げる, 伺う</span> hoặc cấu trúc{' '}
                    <span className="font-japanese">お〜になる / お〜する</span>. Chọn tab <strong>Kính ngữ Keigo</strong> để xem bảng chi tiết.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Results Count Bar */}
          <div className="flex items-center justify-between px-1 text-xs text-gray-500 font-medium">
            <span className="tabular-nums">
              {groupFilter === 'keigo' ? (
                <>
                  Hiển thị <strong className="text-gray-900">{filteredKeigo.length}</strong> /{' '}
                  {counts.keigo} động từ kính ngữ đặc biệt
                </>
              ) : (
                <>
                  Hiển thị <strong className="text-gray-900">{filteredVerbs.length}</strong> /{' '}
                  {counts.all} động từ
                </>
              )}
            </span>
            <span className="hidden sm:inline">
              Nhấn vào bất kỳ ô tiếng Nhật nào để nghe phát âm (kéo ngang bảng để xem đủ 12 thể)
            </span>
          </div>

          {/* Table Render: Keigo vs Standard Verbs */}
          {groupFilter === 'keigo' ? (
            filteredKeigo.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto max-h-[70vh]">
                  <table className="w-full text-left border-collapse min-w-[980px]">
                    <thead className="sticky top-0 z-20 bg-gray-900 text-white text-xs font-bold tracking-wide">
                      <tr>
                        <th className="py-3 px-3.5 sticky left-0 z-30 bg-gray-900 border-r border-gray-800">
                          Động từ đặc biệt
                        </th>
                        <th className="py-3 px-3 border-r border-gray-800">Loại</th>
                        <th className="py-3 px-3 border-r border-gray-800">Nghĩa tương đương</th>
                        <th className="py-3 px-3 border-r border-gray-800">Thể 〜ます</th>
                        <th className="py-3 px-3 border-r border-gray-800">Thể 〜て</th>
                        <th className="py-3 px-3 border-r border-gray-800">Thể 〜た</th>
                        <th className="py-3 px-3 border-r border-gray-800">Thể 〜ない</th>
                        <th className="py-3 px-3 border-r border-gray-800">Điều kiện 〜ば</th>
                        <th className="py-3 px-3.5">Ghi chú sử dụng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                      {filteredKeigo.map((item) => {
                        const isHonorific = item.keigoType === 'Tôn kính';
                        const keigoForms = [
                          { key: 'masu', value: item.masu },
                          { key: 'te', value: item.te },
                          { key: 'ta', value: item.ta },
                          { key: 'nai', value: item.nai },
                          { key: 'conditional', value: item.conditional },
                        ];

                        return (
                          <tr key={item.id} className="hover:bg-rose-50/35 transition-colors">
                            <td className="py-2.5 px-3.5 sticky left-0 z-10 bg-white border-r border-gray-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)] sm:shadow-none">
                              <button
                                type="button"
                                onClick={() => handlePlayAudio(item.verb, `${item.id}-root`)}
                                className={`group flex items-center gap-1.5 font-japanese font-bold text-gray-900 hover:text-rose-700 transition-colors cursor-pointer whitespace-nowrap ${
                                  activeAudioKey === `${item.id}-root` ? 'text-rose-600' : ''
                                }`}
                              >
                                <span>{item.verb}</span>
                                <Volume2
                                  className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                                    activeAudioKey === `${item.id}-root`
                                      ? 'opacity-100 text-rose-600'
                                      : 'opacity-0 group-hover:opacity-70 text-gray-400'
                                  }`}
                                />
                              </button>
                            </td>

                            <td className="py-2.5 px-3 border-r border-gray-100 whitespace-nowrap">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                                  isHonorific
                                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                                    : 'bg-rose-50 border-rose-200 text-rose-800'
                                }`}
                              >
                                {item.keigoType}
                              </span>
                            </td>

                            <td className="py-2.5 px-3 font-japanese font-semibold text-gray-700 border-r border-gray-100 whitespace-nowrap">
                              {item.equivalent}
                            </td>

                            {keigoForms.map((f) => {
                              const cellKey = `${item.id}-${f.key}`;
                              const isMasked = hideConjugations && !revealedCells.has(cellKey);
                              const isPlaying = activeAudioKey === cellKey;
                              return (
                                <td key={f.key} className="py-2 px-2.5 border-r border-gray-100">
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

                            <td className="py-2.5 px-3.5 text-xs text-gray-600 leading-relaxed min-w-[200px]">
                              {item.note}
                            </td>
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
                  Không tìm thấy kính ngữ khớp với "{searchQuery}"
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            )
          ) : filteredVerbs.length > 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto max-h-[70vh]">
                <table className="w-full text-left border-collapse min-w-[820px]">
                  <thead className="sticky top-0 z-20 bg-gray-900 text-white text-xs font-bold tracking-wide">
                    <tr>
                      <th className="py-3 px-2.5 text-center w-14 border-r border-gray-800">Nhóm</th>
                      <th className="py-3 px-3.5 sticky left-0 z-30 bg-gray-900 border-r border-gray-800">
                        Động từ gốc
                      </th>
                      <th className="py-3 px-3 border-r border-gray-800 whitespace-nowrap">Hán Việt</th>
                      <th className="py-3 px-3.5 border-r border-gray-800 whitespace-nowrap">Nghĩa</th>
                      {visibleFormColumns.map((col) => (
                        <th
                          key={col.key}
                          className="py-3 px-3 border-r last:border-r-0 border-gray-800 whitespace-nowrap"
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {filteredVerbs.map((item) => {
                      const gStyle = GROUP_STYLES[item.group];

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

                          {/* Dictionary Form (Sticky on horizontal scroll) */}
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

                          {/* Han Viet */}
                          <td className="py-2.5 px-3 text-xs font-bold text-amber-700 border-r border-gray-100 whitespace-nowrap">
                            {item.hanViet || <span className="text-gray-300 font-normal">—</span>}
                          </td>

                          {/* Meaning */}
                          <td className="py-2.5 px-3.5 text-gray-700 font-semibold border-r border-gray-100 whitespace-nowrap">
                            {item.meaning}
                          </td>

                          {/* Conjugated Columns */}
                          {visibleFormColumns.map((col) => {
                            const value = item[col.key];
                            const cellKey = `${item.id}-${col.key}`;
                            const isMasked = hideConjugations && !revealedCells.has(cellKey);
                            const isPlaying = activeAudioKey === cellKey;

                            return (
                              <td
                                key={col.key}
                                className="py-2 px-2.5 border-r last:border-r-0 border-gray-100"
                              >
                                <button
                                  type="button"
                                  onClick={() => handleCellClick(cellKey, value, true)}
                                  className={`group w-full text-left flex items-center justify-between gap-1.5 px-2 py-1 rounded-lg font-japanese transition-all cursor-pointer whitespace-nowrap ${
                                    isMasked
                                      ? 'bg-gray-100 text-transparent hover:bg-rose-50 select-none'
                                      : isPlaying
                                      ? 'bg-rose-50 text-rose-700 font-bold'
                                      : 'text-gray-800 hover:bg-gray-50 hover:text-rose-700 font-medium'
                                  }`}
                                  title={isMasked ? 'Chạm để xem & nghe đáp án' : `Nghe: ${value}`}
                                >
                                  <span className={isMasked ? 'blur-[5px] select-none' : ''}>
                                    {value}
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
                  setSubgroupFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Hiện lại toàn bộ {counts.all} động từ
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= PRACTICE DRILL VIEW ================= */
        <div className="max-w-3xl mx-auto space-y-4">
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
            <div className="space-y-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 block">Phạm vi nhóm:</label>
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  {(['all', 'III', 'II', 'I'] as const).map((g) => (
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
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPracticeForm('random-all');
                      handleStartNewQuestion(practiceGroup, 'random-all');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      practiceForm === 'random-all'
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Ngẫu nhiên (11 thể)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPracticeForm('random-basic');
                      handleStartNewQuestion(practiceGroup, 'random-basic');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      practiceForm === 'random-basic'
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Ngẫu nhiên (4 thể cơ bản)
                  </button>
                  {FORM_COLUMNS.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => {
                        setPracticeForm(f.key);
                        handleStartNewQuestion(practiceGroup, f.key);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        practiceForm === f.key
                          ? 'bg-rose-600 border-rose-600 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {f.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-6">
            <div className="text-center space-y-2.5">
              <div className="text-xs font-semibold text-gray-500 flex flex-wrap items-center justify-center gap-2">
                <span>Nhóm {question.verb.group}</span>
                {question.verb.hanViet && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-bold text-amber-700">{question.verb.hanViet}</span>
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
                  title="Nghe thể từ điển"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm sm:text-base font-bold text-gray-600">
                {question.verb.meaning}
              </div>

              <div className="pt-2">
                <span className="inline-block px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold">
                  Chuyển sang {FORM_LABEL_MAP[question.targetForm]}:
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
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 text-base sm:text-lg font-japanese font-bold transition-all cursor-pointer disabled:cursor-default text-left ${btnClass}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs font-sans font-bold text-gray-400 w-5 text-left shrink-0">
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

            {/* Feedback & Full 11-Form Conjugation Review */}
            {selectedOption !== null && (
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
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

                {/* Full Conjugation Summary of This Verb */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-1">
                  {FORM_COLUMNS.map((col) => (
                    <button
                      key={col.key}
                      type="button"
                      onClick={() =>
                        speakJapanese(toSpeakableJapanese(question.verb[col.key]), 0.88)
                      }
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        col.key === question.targetForm
                          ? 'bg-rose-50/80 border-rose-200'
                          : 'bg-gray-50 border-gray-200/80 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-gray-500 block">
                        {col.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold font-japanese text-gray-900 mt-0.5 block">
                        {question.verb[col.key]}
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
