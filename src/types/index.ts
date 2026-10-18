export interface VocabularyItem {
  id: string;
  lesson: number;
  part: 1 | 2;
  word: string; // 漢字・語彙
  hiragana: string; // 平仮名
  meaning: string; // 意味
  hanViet: string; // 漢越
  hasKanji: boolean; // Có chữ Hán hay không
  note?: string; // Ghi chú thêm (ví dụ: Tên giả định, v.v.)
}

export type StudyMode = 'flashcard' | 'quiz' | 'list';

export type CardOrientation = 'ja-to-vi' | 'vi-to-ja';

export interface FilterState {
  part: 'all' | 1 | 2;
  lesson: number | 'all';
  kanjiOnly: boolean; // Lọc ra những từ có Hán tự
  hideMastered: boolean; // Ẩn những từ đã thuộc
  starredOnly: boolean; // Chỉ những từ đánh dấu sao
  searchQuery: string;
}

export type MasteryLevel = 'unseen' | 'learning' | 'mastered';
