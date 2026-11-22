export type JLPTLevel = 'N5' | 'N4';

export interface VocabularyItem {
  id: string;
  level?: JLPTLevel; // 'N5' hoặc 'N4', mặc định là N5
  lesson: number;
  part: 1 | 2;
  word: string; // 漢字・語彙
  hiragana: string; // 平仮名
  meaning: string; // 意味
  hanViet: string; // 漢越
  hasKanji: boolean; // Có chữ Hán hay không
  note?: string; // Ghi chú thêm
}

export type StudyMode = 'flashcard' | 'quiz' | 'list' | 'grammar' | 'conjugation' | 'topics';

export interface TopicVocabularyItem {
  id: string;
  word: string;
  reading: string;
  hanViet?: string;
  meaning: string;
  note?: string;
  exampleJa?: string;
  exampleVi?: string;
}

export interface TopicSection {
  id: string;
  order: number;
  title: string;
  subtitle?: string;
  items: TopicVocabularyItem[];
}

export interface VocabularyTopic {
  id: string;
  title: string;
  japaneseTitle: string;
  description: string;
  sections: TopicSection[];
}

export type VerbGroup = 'I' | 'II' | 'III';
export type VerbSubgroup = 'u-tsu-ru' | 'mu-bu-nu' | 'ku-gu' | 'su';

export interface VerbConjugationItem {
  id: string;
  group: VerbGroup;
  subgroup?: VerbSubgroup;
  dict: string;
  hanViet?: string;
  meaning: string;
  masu: string;
  te: string;
  ta: string;
  nai: string;
  potential: string;
  volitional: string;
  passive: string;
  causative: string;
  causativePassive: string;
  conditional: string;
  imperative: string;
}

export interface KeigoVerbItem {
  id: string;
  verb: string;
  keigoType: 'Tôn kính' | 'Khiêm nhường';
  equivalent: string;
  masu: string;
  te: string;
  ta: string;
  nai: string;
  conditional: string;
  note: string;
}

export type WordStatusFilter = 'all' | 'mastered' | 'unmastered' | 'hesitant';

export interface FilterState {
  level: JLPTLevel; // Cấp độ đang chọn (N5 hoặc N4)
  part: 'all' | 1 | 2;
  lesson: number | 'all';
  selectedLessons: number[]; // e.g. [1, 2, 3] cho phép chọn nhiều bài cùng lúc
  kanjiOnly: boolean; // Lọc ra những từ có Hán tự
  statusFilter: WordStatusFilter; // 'all' | 'mastered' (Từ đã nhớ) | 'unmastered' (Từ chưa nhớ) | 'hesitant' (Phân vân)
  starredOnly: boolean; // Chỉ những từ đánh dấu sao
  searchQuery: string;
}

export type MasteryLevel = 'unseen' | 'learning' | 'mastered';

// Cấu trúc dữ liệu Ngữ pháp (Grammar)
export interface GrammarExample {
  japanese: string;
  romaji?: string;
  vietnamese: string;
}

export interface GrammarItem {
  id: string;
  level: JLPTLevel;
  lesson: number;
  order: number;
  title: string;       // Tiêu đề mẫu câu, ví dụ: "1. [Danh từ 1] は [Danh từ 2] です"
  structure: string;   // Công thức cấu trúc, ví dụ: "N1 は N2 です"
  meaning: string;     // Ý nghĩa tiếng Việt, ví dụ: "N1 là N2 (Khẳng định)"
  explanation: string; // Giải thích chi tiết ngữ cảnh, sắc thái
  examples: GrammarExample[];
  notes?: string[];    // Các lưu ý quan trọng khi dùng
}
