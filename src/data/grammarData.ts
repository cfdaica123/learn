import { GrammarItem } from '../types';

export const GRAMMAR_DATA: GrammarItem[] = [
  // ================= BÀI 1 =================
  {
    id: 'g-b1-1',
    level: 'N5',
    lesson: 1,
    order: 1,
    title: '1. N1 は N2 です',
    structure: 'Danh từ 1 + は + Danh từ 2 + です',
    meaning: 'N1 là N2 (Câu khẳng định danh từ)',
    explanation: 'Trợ từ「は」(đọc là "wa") đặt sau danh từ N1 để biểu thị N1 là chủ đề của câu.「です」đặt ở cuối câu thể hiện sự phán đoán hoặc khẳng định dứt khoát, đồng thời mang sắc thái lịch sự.',
    examples: [
      {
        japanese: 'わたしは マイク・ミラーです。',
        romaji: 'Watashi wa Maiku Miraa desu.',
        vietnamese: 'Tôi là Mike Miller.'
      },
      {
        japanese: 'サントスさんは ブラジル人です。',
        romaji: 'Santosu-san wa Burajiru-jin desu.',
        vietnamese: 'Anh Santos là người Brazil.'
      },
      {
        japanese: 'わたしは 会社員です。',
        romaji: 'Watashi wa kaishain desu.',
        vietnamese: 'Tôi là nhân viên công ty.'
      }
    ],
    notes: [
      'Trợ từ は viết bằng chữ Hiragana [ha] nhưng khi làm trợ từ thì luôn phát âm là [wa].',
      'です luôn đứng cuối câu danh từ ở thể lịch sự hiện tại/tương lai.'
    ]
  },
  {
    id: 'g-b1-2',
    level: 'N5',
    lesson: 1,
    order: 2,
    title: '2. N1 は N2 じゃ（ではありません）',
    structure: 'Danh từ 1 + は + Danh từ 2 + じゃありません / ではありません',
    meaning: 'N1 không phải là N2 (Câu phủ định danh từ)',
    explanation: '「じゃありません」hoặc「ではありません」là dạng phủ định của「です」.「じゃありません」thường dùng trong văn nói hàng ngày, còn「ではありません」trang trọng hơn, dùng trong văn viết hoặc bài phát biểu lịch sự.',
    examples: [
      {
        japanese: 'サントスさんは 学生じゃありません。',
        romaji: 'Santosu-san wa gakusei ja arimasen.',
        vietnamese: 'Anh Santos không phải là sinh viên.'
      },
      {
        japanese: 'ミラーさんは 医者ではありません。',
        romaji: 'Miraa-san wa isha dewa arimasen.',
        vietnamese: 'Anh Miller không phải là bác sĩ.'
      }
    ],
    notes: [
      'Trong văn nói thân mật, じゃありません rất phổ biến.',
      'では (dewa) viết bằng [ha] nhưng phát âm là [wa].'
    ]
  },
  {
    id: 'g-b1-3',
    level: 'N5',
    lesson: 1,
    order: 3,
    title: '3. N1 は N2 ですか',
    structure: 'N1 + は + N2 + ですか',
    meaning: 'N1 có phải là N2 không? (Câu hỏi Nghi vấn Yes/No)',
    explanation: 'Trợ từ「か」đặt ở cuối câu dùng để biến câu khẳng định thành câu hỏi. Trong tiếng Nhật không cần dùng dấu chấm hỏi (?) trong văn phong chính thống, ngữ điệu lên giọng ở cuối câu.',
    examples: [
      {
        japanese: 'ミラーさんは アメリカ人ですか。',
        romaji: 'Miraa-san wa amerika-jin desu ka.',
        vietnamese: 'Anh Miller có phải là người Mỹ không?'
      },
      {
        japanese: '…はい、アメリカ人です。',
        romaji: '...Hai, amerika-jin desu.',
        vietnamese: '...Vâng, là người Mỹ.'
      },
      {
        japanese: '…いいえ、アメリカ人じゃありません。',
        romaji: '...Iie, amerika-jin ja arimasen.',
        vietnamese: '...Không, không phải người Mỹ.'
      }
    ],
    notes: [
      'Khi trả lời "Có": はい、そうです hoặc はい、[N2] です。',
      'Khi trả lời "Không": いいえ、ちがいます hoặc いいえ、[N2] じゃありません。'
    ]
  },
  {
    id: 'g-b1-4',
    level: 'N5',
    lesson: 1,
    order: 4,
    title: '4. N も',
    structure: 'Danh từ + も',
    meaning: 'Cũng... (Biểu thị sự tương đồng)',
    explanation: 'Trợ từ「も」dùng để thay thế cho trợ từ「は」khi nội dung diễn đạt về chủ đề mới có cùng đặc điểm, tính chất với đối tượng đã nói trước đó.',
    examples: [
      {
        japanese: 'ミラーさんは 会社員です。グプタさんも 会社員です。',
        romaji: 'Miraa-san wa kaishain desu. Guputa-san mo kaishain desu.',
        vietnamese: 'Anh Miller là nhân viên công ty. Anh Gupta cũng là nhân viên công ty.'
      }
    ],
    notes: [
      'も thay thế hoàn toàn cho は, không dùng đồng thời は và も cạnh nhau (không nói はも).'
    ]
  },
  {
    id: 'g-b1-5',
    level: 'N5',
    lesson: 1,
    order: 5,
    title: '5. N1 の N2',
    structure: 'Danh từ 1 + の + Danh từ 2',
    meaning: 'N2 của N1 / N2 thuộc N1 (Quan hệ sở hữu hoặc trực thuộc)',
    explanation: 'Trợ từ「の」nối hai danh từ, trong đó N1 bổ nghĩa cho N2. N1 có thể là tổ chức/quốc gia sở tại, hoặc người sở hữu N2.',
    examples: [
      {
        japanese: 'ミラーさんは IMCの 社員です。',
        romaji: 'Miraa-san wa IMC no shain desu.',
        vietnamese: 'Anh Miller là nhân viên của công ty IMC.'
      },
      {
        japanese: 'あれは わたしのお金です。',
        romaji: 'Are wa watashi no okane desu.',
        vietnamese: 'Kia là tiền của tôi.'
      }
    ]
  },

  // ================= BÀI 2 =================
  {
    id: 'g-b2-1',
    level: 'N5',
    lesson: 2,
    order: 1,
    title: '1. これ / それ / あれ は N です',
    structure: 'これ / それ / あれ + は + Danh từ + です',
    meaning: 'Cái này / Cái đó / Cái kia là N (Đại từ chỉ thị đồ vật)',
    explanation: 'これ (Cái này): Vật ở gần người nói. それ (Cái đó): Vật ở gần người nghe, xa người nói. あれ (Cái kia): Vật ở xa cả người nói lẫn người nghe.',
    examples: [
      {
        japanese: 'これは 辞書です。',
        romaji: 'Kore wa jisho desu.',
        vietnamese: 'Đây là cuốn từ điển.'
      },
      {
        japanese: 'それは 傘です。',
        romaji: 'Sore wa kasa desu.',
        vietnamese: 'Đó là cây dù (cái ô).'
      },
      {
        japanese: 'あれは 車です。',
        romaji: 'Are wa kuruma desu.',
        vietnamese: 'Kia là chiếc xe hơi.'
      }
    ]
  },
  {
    id: 'g-b2-2',
    level: 'N5',
    lesson: 2,
    order: 2,
    title: '2. この N / その N / あの N',
    structure: 'この / その / あの + Danh từ + は ... です',
    meaning: 'N này / N đó / N kia ... (Bổ nghĩa trực tiếp cho danh từ)',
    explanation: 'Khác với これ/それ/あれ (đứng độc lập như một danh từ), この/その/あの bắt buộc phải đi liền trước một danh từ cụ thể để chỉ thị danh từ đó.',
    examples: [
      {
        japanese: 'この本は わたしのです。',
        romaji: 'Kono hon wa watashi no desu.',
        vietnamese: 'Cuốn sách này là của tôi.'
      },
      {
        japanese: 'その時計は いくらですか。',
        romaji: 'Sono tokei wa ikura desu ka.',
        vietnamese: 'Chiếc đồng hồ đó giá bao nhiêu tiền?'
      }
    ]
  },
  {
    id: 'g-b2-3',
    level: 'N5',
    lesson: 2,
    order: 3,
    title: '3. だれの N ですか',
    structure: 'だれの + Danh từ + ですか',
    meaning: 'Là N của ai vậy?',
    explanation: '「だれ」(ai) kết hợp với trợ từ「の」(của) để hỏi về quyền sở hữu đối với một sự vật hay tài sản.',
    examples: [
      {
        japanese: 'これは だれの かぎですか。…佐藤さんの かぎです。',
        romaji: 'Kore wa dare no kagi desu ka. ...Satou-san no kagi desu.',
        vietnamese: 'Đây là chìa khóa của ai? ...Là chìa khóa của chị Satou.'
      }
    ]
  }
];

// Helper lấy danh sách ngữ pháp theo bài và cấp độ
export const getGrammarByLessons = (level: 'N5' | 'N4', lessons: number[]): GrammarItem[] => {
  return GRAMMAR_DATA.filter((item) => {
    if (item.level !== level) return false;
    if (lessons.length === 0) return true;
    return lessons.includes(item.lesson);
  });
};
