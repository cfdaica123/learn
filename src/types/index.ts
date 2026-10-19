export interface VocabularyItem {
  id: string;
  lesson: number;
  part: 1 | 2;
  word: string; // 漢字・語彙
  hiragana: string; // 平仮名
  meaning: string; // 意味
  hanViet: string; // 漢越
  hasKanji: boolean; // Có chữ Hán hay không
  note?: string; // Ghi chú thêm
}

export type StudyMode = 'flashcard' | 'quiz' | 'list';

export type WordStatusFilter = 'all' | 'mastered' | 'unmastered' | 'hesitant';

export interface FilterState {
  part: 'all' | 1 | 2;
  lesson: number | 'all';
  selectedLessons: number[]; // e.g. [1, 2, 3] for multi-lesson selection; empty means all or controlled by lesson/part
  kanjiOnly: boolean; // Lọc ra những từ có Hán tự
  statusFilter: WordStatusFilter; // 'all' | 'mastered' (Từ đã nhớ) | 'unmastered' (Từ chưa nhớ)
  starredOnly: boolean; // Chỉ những từ đánh dấu sao
  searchQuery: string;
}

export type MasteryLevel = 'unseen' | 'learning' | 'mastered';
