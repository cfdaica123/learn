import { GrammarItem } from '../types';

export const GRAMMAR_DATA: GrammarItem[] = [
  // ================= BÀI 1 =================
  {
    id: 'g-b1-1',
    level: 'N5',
    lesson: 1,
    order: 1,
    title: '1. N1 は N2 です',
    structure: 'N1 は N2 です',
    meaning: 'N1 là N2 (Xác định danh tính, nghề nghiệp, quốc tịch)',
    explanation: 'Dùng để giới thiệu hoặc xác định một người, một vật, nghề nghiệp, quốc tịch... N1 là chủ đề của câu, N2 là vị ngữ khẳng định mang sắc thái lịch sự.',
    examples: [
      { japanese: 'わたしは がくせいです。', vietnamese: 'Tôi là học sinh/sinh viên.' },
      { japanese: 'わたしは ベトナムじんです。', vietnamese: 'Tôi là người Việt Nam.' },
      { japanese: 'マイク・ミラーさんは かいしゃいんです。', vietnamese: 'Anh Mike Miller là nhân viên công ty.' }
    ],
    notes: [
      'Trợ từ は được viết là [ha] nhưng khi làm trợ từ chủ đề thì đọc là わ (wa).',
      'です thường được đọc gần như [des] trong giao tiếp tự nhiên.'
    ]
  },
  {
    id: 'g-b1-2',
    level: 'N5',
    lesson: 1,
    order: 2,
    title: '2. N1 は N2 じゃありません',
    structure: 'N1 は N2 じゃありません（ではありません）',
    meaning: 'N1 không phải là N2 (Câu phủ định danh từ)',
    explanation: 'Phủ định câu danh từ, nghĩa là “không phải là...”. Trong văn viết hoặc giao tiếp trang trọng, đổi じゃありません thành ではありません.',
    examples: [
      { japanese: 'わたしは せんせいじゃありません。', vietnamese: 'Tôi không phải là giáo viên.' },
      { japanese: 'わたしは いしゃではありません。', vietnamese: 'Tôi không phải là bác sĩ (trang trọng).' }
    ],
    notes: [
      'じゃありません thường dùng trong văn nói hàng ngày.',
      'ではありません trang trọng hơn, dùng trong văn viết hoặc bài phát biểu lịch sự.'
    ]
  },
  {
    id: 'g-b1-3',
    level: 'N5',
    lesson: 1,
    order: 3,
    title: '3. N1 は N2 ですか',
    structure: 'N1 は N2 ですか',
    meaning: 'N1 có phải là N2 không? (Câu hỏi xác nhận)',
    explanation: 'Đặt câu hỏi xác nhận, tương đương “Có phải... không?”. Trả lời bằng はい hoặc いいえ.',
    examples: [
      { japanese: 'あなたは がくせいですか。', vietnamese: 'Bạn là học sinh/sinh viên phải không?' },
      { japanese: 'はい、がくせいです。', vietnamese: 'Vâng, tôi là học sinh/sinh viên.' },
      { japanese: 'いいえ、がくせいじゃありません。', vietnamese: 'Không, tôi không phải học sinh/sinh viên.' }
    ]
  },
  {
    id: 'g-b1-4',
    level: 'N5',
    lesson: 1,
    order: 4,
    title: '4. N も',
    structure: 'N1 も N2 です',
    meaning: 'N1 cũng là N2 (Biểu thị sự tương đồng)',
    explanation: 'も thay cho trợ từ は khi muốn diễn đạt sự đồng nhất, tương đồng với nội dung đã nói trước đó, nghĩa là “cũng”.',
    examples: [
      { japanese: 'わたしは がくせいです。あのひとも がくせいです。', vietnamese: 'Tôi là sinh viên. Người kia cũng là sinh viên.' }
    ],
    notes: ['は nêu chủ đề mới; も nhấn mạnh sự tương đồng (“cũng”). Không dùng đồng thời は và も.']
  },
  {
    id: 'g-b1-5',
    level: 'N5',
    lesson: 1,
    order: 5,
    title: '5. N1 の N2',
    structure: 'N1 の N2',
    meaning: 'N2 của N1 (Sở hữu, tổ chức, lĩnh vực hoặc quan hệ)',
    explanation: 'Trợ từ の nối hai danh từ, thường biểu thị quan hệ sở hữu, tổ chức trực thuộc, lĩnh vực hoạt động hoặc tính chất.',
    examples: [
      { japanese: 'わたしの ほんです。', vietnamese: 'Quyển sách của tôi.' },
      { japanese: 'にほんごの せんせいです。', vietnamese: 'Giáo viên tiếng Nhật.' },
      { japanese: 'ふすあんだいがくの がくせいです。', vietnamese: 'Sinh viên Đại học Phú Xuân.' }
    ]
  },
  {
    id: 'g-b1-6',
    level: 'N5',
    lesson: 1,
    order: 6,
    title: '6. ～さん và cách xưng hô',
    structure: 'Tên người + さん',
    meaning: 'Anh/Chị/Ông/Bà ~ (Hậu tố xưng hô lịch sự)',
    explanation: 'さん là hậu tố lịch sự luôn đặt sau tên người khác để biểu thị sự tôn trọng. Tuyệt đối không dùng さん sau tên của chính mình khi tự giới thiệu.',
    examples: [
      { japanese: 'やまださん、こんにちは。', vietnamese: 'Chào anh/chị Yamada.' },
      { japanese: 'わたしは ソンです。', vietnamese: 'Tôi là Sơn (không nói ソンさん).' }
    ]
  },

  // ================= BÀI 2 =================
  {
    id: 'g-b2-1',
    level: 'N5',
    lesson: 2,
    order: 1,
    title: '1. これ・それ・あれ・どれ',
    structure: 'これ／それ／あれ／どれ + は N です',
    meaning: 'Cái này / Cái đó / Cái kia / Cái nào?',
    explanation: 'Dùng để chỉ đồ vật mà không cần lặp lại tên đồ vật. これ: gần người nói; それ: gần người nghe; あれ: xa cả hai; どれ: câu hỏi “cái nào?”.',
    examples: [
      { japanese: 'これは ほんです。', vietnamese: 'Đây là quyển sách.' },
      { japanese: 'それは なんですか。', vietnamese: 'Đó là cái gì?' },
      { japanese: 'わたしの かばんは どれですか。', vietnamese: 'Cặp của tôi là cái nào?' }
    ],
    notes: ['これ・それ・あれ đứng độc lập làm đại từ. Không đặt trực tiếp danh từ ngay sau chúng.']
  },
  {
    id: 'g-b2-2',
    level: 'N5',
    lesson: 2,
    order: 2,
    title: '2. この・その・あの・どの + Danh từ',
    structure: 'この／その／あの／どの + Danh từ + は ...',
    meaning: 'N này / N đó / N kia / N nào?',
    explanation: 'Dùng để chỉ một người hoặc vật cụ thể, bắt buộc phải đi kèm trực tiếp với danh từ ngay phía sau.',
    examples: [
      { japanese: 'この ほんは わたしのです。', vietnamese: 'Quyển sách này là của tôi.' },
      { japanese: 'あの ひとは だれですか。', vietnamese: 'Người kia là ai?' }
    ],
    notes: ['Phân biệt: これ は ほんです (Đây là sách) vs この ほん は あたらしいです (Quyển sách này mới). Không nói このはほんです.']
  },
  {
    id: 'g-b2-3',
    level: 'N5',
    lesson: 2,
    order: 3,
    title: '3. そうです・そうじゃありません',
    structure: 'はい、そうです／いいえ、そうじゃありません',
    meaning: 'Đúng vậy / Không phải vậy',
    explanation: 'Dùng để xác nhận hoặc phủ định một thông tin trong câu hỏi nghi vấn danh từ.',
    examples: [
      { japanese: 'これは じしょですか。…はい、そうです。', vietnamese: 'Đây là từ điển phải không? …Vâng, đúng vậy.' },
      { japanese: 'それは あなたの かばんですか。…いいえ、そうじゃありません。', vietnamese: 'Đó là cặp của bạn phải không? …Không, không phải vậy.' }
    ]
  },
  {
    id: 'g-b2-4',
    level: 'N5',
    lesson: 2,
    order: 4,
    title: '4. N1 ですか、N2 ですか',
    structure: 'N1 ですか、N2 ですか',
    meaning: 'Là N1 hay là N2? (Câu hỏi lựa chọn)',
    explanation: 'Đưa ra hai hoặc nhiều phương án để người nghe lựa chọn. Trả lời bằng cách chọn trực tiếp phương án đúng, không dùng はい/いいえ.',
    examples: [
      { japanese: 'これは ほんですか、ざっしですか。…ざっしです。', vietnamese: 'Đây là sách hay tạp chí? …Là tạp chí.' }
    ]
  },
  {
    id: 'g-b2-5',
    level: 'N5',
    lesson: 2,
    order: 5,
    title: '5. N1 の N2 — Sở hữu và lược bỏ danh từ',
    structure: 'N1 の [N2 đã rõ] です → N1 のです',
    meaning: 'Là của N1 (Lược bỏ danh từ phía sau đã biết)',
    explanation: 'Khi danh từ phía sau đã rõ ràng trong ngữ cảnh, có thể lược bỏ N2 và chỉ giữ lại のです để tránh lặp lại từ.',
    examples: [
      { japanese: 'これは だれの かばんですか。…わたしのです。', vietnamese: 'Đây là cặp của ai? …Là của tôi (thay cho わたしのかばんです).' }
    ]
  },
  {
    id: 'g-b2-6',
    level: 'N5',
    lesson: 2,
    order: 6,
    title: '6. そうですか',
    structure: 'そうですか',
    meaning: 'À, ra vậy! (Tiếp nhận thông tin mới)',
    explanation: 'Dùng với ngữ điệu đi xuống để phản hồi khi vừa tiếp nhận một thông tin mới từ người đối thoại.',
    examples: [
      { japanese: 'この かさは やまださんのです。…そうですか。', vietnamese: 'Cái ô này là của anh Yamada. …À, ra vậy.' }
    ]
  },

  // ================= BÀI 3 =================
  {
    id: 'g-b3-1',
    level: 'N5',
    lesson: 3,
    order: 1,
    title: '1. ここ・そこ・あそこ・どこ',
    structure: 'ここ／そこ／あそこ／どこ + は ... です',
    meaning: 'Ở đây / Ở đó / Ở đằng kia / Ở đâu?',
    explanation: 'Đại từ chỉ định địa điểm, vị trí. ここ: chỗ người nói; そこ: chỗ người nghe; あそこ: xa cả hai; どこ: từ để hỏi vị trí.',
    examples: [
      { japanese: 'ここは きょうしつです。', vietnamese: 'Đây là phòng học.' },
      { japanese: 'トイレは どこですか。', vietnamese: 'Nhà vệ sinh ở đâu?' }
    ]
  },
  {
    id: 'g-b3-2',
    level: 'N5',
    lesson: 3,
    order: 2,
    title: '2. こちら・そちら・あちら・どちら',
    structure: 'こちら／そちら／あちら／どちら',
    meaning: 'Phía này / Phía đó / Phía kia / Phía nào, ở đâu?',
    explanation: 'Cách nói lịch sự, trang trọng hơn của ここ/そこ/あそこ/どこ, dùng chỉ phương hướng, vị trí hoặc hỏi tên công ty, quốc gia.',
    examples: [
      { japanese: 'うけつけは こちらです。', vietnamese: 'Quầy tiếp tân ở phía này.' },
      { japanese: 'かいしゃは どちらですか。', vietnamese: 'Công ty của anh/chị ở đâu ạ?' }
    ]
  },
  {
    id: 'g-b3-3',
    level: 'N5',
    lesson: 3,
    order: 3,
    title: '3. N は địa điểm です',
    structure: 'N は + Địa điểm + です',
    meaning: 'N ở địa điểm đó (Nói vị trí của sự vật/địa điểm)',
    explanation: 'Dùng để chỉ vị trí của một địa điểm hoặc một cơ sở nằm ở đâu.',
    examples: [
      { japanese: 'ぎんこうは あそこです。', vietnamese: 'Ngân hàng ở đằng kia.' },
      { japanese: 'うけつけは ここです。', vietnamese: 'Quầy tiếp tân ở đây.' }
    ]
  },
  {
    id: 'g-b3-4',
    level: 'N5',
    lesson: 3,
    order: 4,
    title: '4. N は どこ／どちらですか',
    structure: 'N は どこ／どちらですか',
    meaning: 'N ở đâu / N ở phía nào?',
    explanation: 'Dùng để hỏi vị trí địa điểm của đối tượng hoặc hỏi nơi làm việc, trường học.',
    examples: [
      { japanese: 'じむしょは どこですか。', vietnamese: 'Văn phòng ở đâu?' },
      { japanese: 'おくに（国）は どちらですか。', vietnamese: 'Đất nước của bạn là nước nào ạ?' }
    ]
  },
  {
    id: 'g-b3-5',
    level: 'N5',
    lesson: 3,
    order: 5,
    title: '5. N1 の N2 — Tên tổ chức, xuất xứ',
    structure: 'N1 の N2',
    meaning: 'N2 của tổ chức N1 / N2 sản xuất tại N1',
    explanation: 'Dùng để nối tên tổ chức với bộ phận trực thuộc, hoặc quốc gia/hãng sản xuất của sản phẩm.',
    examples: [
      { japanese: 'IMCの しゃいんです。', vietnamese: 'Nhân viên của công ty IMC.' },
      { japanese: 'にほんの くるまです。', vietnamese: 'Xe hơi của Nhật Bản.' }
    ]
  },
  {
    id: 'g-b3-6',
    level: 'N5',
    lesson: 3,
    order: 6,
    title: '6. N は いくらですか',
    structure: 'N は いくらですか / N は [Giá tiền] です',
    meaning: 'N giá bao nhiêu tiền? / N giá là...',
    explanation: 'Hỏi và trả lời về giá cả hàng hóa bằng đơn vị tiền tệ (yên - えん, đồng...).',
    examples: [
      { japanese: 'この とけいは いくらですか。', vietnamese: 'Đồng hồ này bao nhiêu tiền?' },
      { japanese: 'いちまんえんです。', vietnamese: '10.000 yên.' }
    ]
  },

  // ================= BÀI 4 =================
  {
    id: 'g-b4-1',
    level: 'N5',
    lesson: 4,
    order: 1,
    title: '1. ～時・～分 — Cách nói thời gian',
    structure: '[Số] じ + [Số] ふん／ぷん',
    meaning: '... giờ ... phút',
    explanation: 'Cách diễn đạt thời gian trong tiếng Nhật. Chú ý các biến âm giờ và phút đặc biệt.',
    examples: [
      { japanese: 'いま、なんじですか。', vietnamese: 'Bây giờ là mấy giờ?' },
      { japanese: 'ごぜん ろくじ はんです。', vietnamese: 'Sáu giờ rưỡi sáng (6h30 AM).' }
    ],
    notes: [
      'Giờ đặc biệt: 4 giờ (よじ), 7 giờ (しちじ), 9 giờ (くじ).',
      'Phút biến âm: 1p (いっぷん), 3p (さんぷん), 6p (ろっぷん), 8p (はっぷん), 10p (じゅっぷん/じっぷn).'
    ]
  },
  {
    id: 'g-b4-2',
    level: 'N5',
    lesson: 4,
    order: 2,
    title: '2. Động từ thể ます (Thời & Thể lịch sự)',
    structure: 'Vます / Vません / Vました / Vませんでした',
    meaning: 'Làm / Không làm / Đã làm / Đã không làm',
    explanation: 'Thể ます biểu thị hành động thói quen ở hiện tại hoặc hành động sẽ xảy ra trong tương lai. Chia quá khứ bằng ました, phủ định bằng ません, quá khứ phủ định bằng ませんでした.',
    examples: [
      { japanese: 'まいにち べんきょうします。', vietnamese: 'Tôi học mỗi ngày.' },
      { japanese: 'きょうは べんきょうしません。', vietnamese: 'Hôm nay tôi không học.' },
      { japanese: 'きのう べんきょうしました。', vietnamese: 'Hôm qua tôi đã học.' },
      { japanese: 'きのう べんきょうしませんでした。', vietnamese: 'Hôm qua tôi đã không học.' }
    ]
  },
  {
    id: 'g-b4-3',
    level: 'N5',
    lesson: 4,
    order: 3,
    title: '3. Thời điểm cụ thể + に + V',
    structure: 'Thời điểm に + V',
    meaning: 'Làm gì vào lúc...',
    explanation: 'Trợ từ に đặt sau mốc thời gian có chứa con số cụ thể (giờ, ngày, tháng, năm) để biểu thị thời điểm hành động diễn ra.',
    examples: [
      { japanese: 'ろくじに おきます。', vietnamese: 'Tôi thức dậy lúc 6 giờ.' },
      { japanese: 'しちじはんに ねます。', vietnamese: 'Tôi đi ngủ lúc 7 giờ rưỡi.' }
    ],
    notes: ['Những từ chỉ thời gian tương đối như きょう (hôm nay), あした (ngày mai), きのう (hôm qua), まいにち (mỗi ngày) KHÔNG đi cùng に.']
  },
  {
    id: 'g-b4-4',
    level: 'N5',
    lesson: 4,
    order: 4,
    title: '4. N1 から N2 まで',
    structure: 'N1 から N2 まで',
    meaning: 'Từ N1 đến N2 (Khoảng thời gian hoặc không gian)',
    explanation: 'から biểu thị điểm bắt đầu (từ...), まで biểu thị điểm kết thúc (đến...). Có thể dùng độc lập từng từ.',
    examples: [
      { japanese: 'くじから ごじまで はたらきます。', vietnamese: 'Tôi làm việc từ 9 giờ đến 5 giờ.' },
      { japanese: 'ぎんこうは くじからです。', vietnamese: 'Ngân hàng bắt đầu từ 9 giờ.' }
    ]
  },
  {
    id: 'g-b4-5',
    level: 'N5',
    lesson: 4,
    order: 5,
    title: '5. N1 と N2',
    structure: 'N1 と N2',
    meaning: 'N1 và N2 (Nối hai danh từ)',
    explanation: 'Trợ từ と dùng để nối hai hay nhiều danh từ ngang hàng với ý nghĩa liệt kê đầy đủ.',
    examples: [
      { japanese: 'げつようびと すいようび', vietnamese: 'Thứ Hai và thứ Tư.' },
      { japanese: 'やすみは どようびと にちようびです。', vietnamese: 'Ngày nghỉ là thứ Bảy và Chủ nhật.' }
    ]
  },
  {
    id: 'g-b4-6',
    level: 'N5',
    lesson: 4,
    order: 6,
    title: '6. ～ね (Trợ từ cuối câu)',
    structure: 'Câu + ね',
    meaning: '...nhỉ, ...đúng không? (Tìm kiếm sự đồng tình)',
    explanation: 'Đặt ở cuối câu để tìm kiếm sự đồng cảm, xác nhận từ người nghe hoặc làm cho câu nói trở nên thân thiện, nhẹ nhàng hơn.',
    examples: [
      { japanese: 'まいにち いそがしいですね。', vietnamese: 'Ngày nào cũng bận nhỉ.' },
      { japanese: 'あしたは やすみですね。', vietnamese: 'Ngày mai là ngày nghỉ đúng không nhỉ.' }
    ]
  },

  // ================= BÀI 5 =================
  {
    id: 'g-b5-1',
    level: 'N5',
    lesson: 5,
    order: 1,
    title: '1. Động từ di chuyển: 行きます・来ます・帰ります',
    structure: 'いきます (Đi) / きます (Đến) / かえります (Về)',
    meaning: 'Đi / Đến / Về',
    explanation: 'Nhóm động từ di chuyển cơ bản nhất trong tiếng Nhật, diễn tả sự chuyển dịch vị trí của chủ thể.',
    examples: [
      { japanese: 'にほんへ いきます。', vietnamese: 'Tôi đi Nhật.' },
      { japanese: 'ともだちが うちへ きます。', vietnamese: 'Bạn tôi đến nhà tôi.' },
      { japanese: 'うちへ かえります。', vietnamese: 'Tôi về nhà.' }
    ]
  },
  {
    id: 'g-b5-2',
    level: 'N5',
    lesson: 5,
    order: 2,
    title: '2. Địa điểm へ 行きます／来ます／帰ります',
    structure: 'Địa điểm + へ + Động từ di chuyển',
    meaning: 'Đi / Đến / Về [địa điểm]',
    explanation: 'Trợ từ へ (viết là he nhưng đọc là [e]) chỉ hướng di chuyển hoặc đích đến của hành động.',
    examples: [
      { japanese: 'がっこうへ いきます。', vietnamese: 'Tôi đi đến trường.' },
      { japanese: 'どこへ いきますか。…どこへも いきません。', vietnamese: 'Bạn đi đâu thế? …Tôi không đi đâu cả.' }
    ]
  },
  {
    id: 'g-b5-3',
    level: 'N5',
    lesson: 5,
    order: 3,
    title: '3. Phương tiện で 行きます',
    structure: 'Phương tiện + で + Động từ di chuyển',
    meaning: 'Đi bằng phương tiện gì',
    explanation: 'Trợ từ で đứng sau phương tiện giao thông để biểu thị phương thức, công cụ di chuyển.',
    examples: [
      { japanese: 'バスで かいしゃへ いきます。', vietnamese: 'Tôi đi đến công ty bằng xe buýt.' },
      { japanese: 'あるいて いきます。', vietnamese: 'Tôi đi bộ (không dùng で khi dùng あるいて).' }
    ],
    notes: ['Nếu đi bộ, dùng あるいて mà không cần trợ từ で (không nói あるいてで).']
  },
  {
    id: 'g-b5-4',
    level: 'N5',
    lesson: 5,
    order: 4,
    title: '4. Người と 行きます (và ひとりで)',
    structure: 'Người + と + Động từ di chuyển',
    meaning: 'Đi cùng với ai (hoặc đi một mình)',
    explanation: 'Trợ từ と mang nghĩa “cùng với” khi đi kèm danh từ chỉ người/động vật. Nếu thực hiện một mình, dùng cụm cố định ひとりで (không dùng と).',
    examples: [
      { japanese: 'ともだちと にほんへ いきます。', vietnamese: 'Tôi đi Nhật cùng bạn.' },
      { japanese: 'ひとりで いきます。', vietnamese: 'Tôi đi một mình.' }
    ]
  },
  {
    id: 'g-b5-5',
    level: 'N5',
    lesson: 5,
    order: 5,
    title: '5. いつ — Từ để hỏi thời gian “Khi nào?”',
    structure: 'いつ + Động từ ...',
    meaning: 'Khi nào làm gì?',
    explanation: 'Dùng để hỏi về thời điểm xảy ra sự việc. Sau いつ thông thường không dùng trợ từ に.',
    examples: [
      { japanese: 'いつ にほんへ いきますか。', vietnamese: 'Khi nào bạn đi Nhật?' },
      { japanese: 'らいげつ いきます。', vietnamese: 'Tháng sau tôi đi.' }
    ]
  },
  {
    id: 'g-b5-6',
    level: 'N5',
    lesson: 5,
    order: 6,
    title: '6. ～曜日に — Vào thứ...',
    structure: 'Thứ trong tuần + に + V',
    meaning: 'Làm gì vào thứ mấy',
    explanation: 'Đi kèm trợ từ に sau thứ trong tuần khi nói hành động cụ thể diễn ra vào ngày đó.',
    examples: [
      { japanese: 'にちようびに べんきょうします。', vietnamese: 'Tôi học vào Chủ nhật.' },
      { japanese: 'なんようびに はたらきますか。', vietnamese: 'Bạn làm việc vào thứ mấy?' }
    ]
  },

  // ================= BÀI 6 =================
  {
    id: 'g-b6-1',
    level: 'N5',
    lesson: 6,
    order: 1,
    title: '1. N を V (Tân ngữ trực tiếp)',
    structure: 'N + を + V',
    meaning: 'Làm hành động tác động lên N',
    explanation: 'Trợ từ を (viết wo, đọc là [o]) dùng để đánh dấu tân ngữ trực tiếp chịu tác động của ngoại động từ.',
    examples: [
      { japanese: 'パンを たべます。', vietnamese: 'Tôi ăn bánh mì.' },
      { japanese: 'みずを のみます。', vietnamese: 'Tôi uống nước.' },
      { japanese: 'なにを かいますか。', vietnamese: 'Bạn mua cái gì thế?' }
    ]
  },
  {
    id: 'g-b6-2',
    level: 'N5',
    lesson: 6,
    order: 2,
    title: '2. Địa điểm で Động từ',
    structure: 'Địa điểm + で + Hành động',
    meaning: 'Làm hành động tại một địa điểm',
    explanation: 'Trợ từ で chỉ nơi chốn diễn ra hành động cụ thể.',
    examples: [
      { japanese: 'レストランで ごはんを たべます。', vietnamese: 'Tôi ăn cơm ở nhà hàng.' },
      { japanese: 'としょかんで べんきょうします。', vietnamese: 'Tôi học ở thư viện.' }
    ],
    notes: ['Phân biệt: で chỉ nơi diễn ra hành động (としょかんでべんきょうします); に chỉ nơi tồn tại sự vật (としょかんにほんがあります).']
  },
  {
    id: 'g-b6-3',
    level: 'N5',
    lesson: 6,
    order: 3,
    title: '3. Vませんか — Lời mời, rủ rê',
    structure: 'Vませんか',
    meaning: 'Bạn có muốn cùng ... không?',
    explanation: 'Dùng để đưa ra lời mời hoặc rủ ai đó cùng tham gia hoạt động một cách nhã nhặn, tôn trọng ý muốn của đối phương.',
    examples: [
      { japanese: 'いっしょに えいがを みませんか。', vietnamese: 'Cùng xem phim với tôi nhé?' },
      { japanese: 'はい、いいですね。', vietnamese: 'Vâng, hay đấy!' },
      { japanese: 'すみません、ちょっと……。', vietnamese: 'Xin lỗi, tôi hơi bận... (Cách từ chối khéo léo).' }
    ]
  },
  {
    id: 'g-b6-4',
    level: 'N5',
    lesson: 6,
    order: 4,
    title: '4. Vましょう — Cùng làm nhé!',
    structure: 'Vましょう',
    meaning: 'Cùng làm ... nào!',
    explanation: 'Dùng khi người nói chủ động đề nghị hoặc thúc đẩy mọi người cùng nhau thực hiện một hành động sau khi đã thống nhất.',
    examples: [
      { japanese: 'いっしょに べんきょうしましょう。', vietnamese: 'Chúng ta cùng học nhé!' },
      { japanese: 'ちょっと やすみましょう。', vietnamese: 'Nghỉ ngơi một chút nào!' }
    ]
  },
  {
    id: 'g-b6-5',
    level: 'N5',
    lesson: 6,
    order: 5,
    title: '5. N を します',
    structure: 'N + を + します',
    meaning: 'Chơi / Làm [hoạt động, thể thao, môn học]',
    explanation: 'Kết hợp danh từ với động từ します để biểu thị việc thực hiện một hoạt động, trò chơi, môn thể thao, bài tập...',
    examples: [
      { japanese: 'サッカーを します。', vietnamese: 'Chơi bóng đá.' },
      { japanese: 'しゅくだいを します。', vietnamese: 'Làm bài tập về nhà.' },
      { japanese: 'しごとを します。', vietnamese: 'Làm việc.' }
    ]
  },

  // ================= BÀI 7 =================
  {
    id: 'g-b7-1',
    level: 'N5',
    lesson: 7,
    order: 1,
    title: '1. Công cụ / Phương tiện + で + V',
    structure: 'Công cụ + で + V',
    meaning: 'Làm gì bằng công cụ / phương tiện nào',
    explanation: 'Trợ từ で chỉ công cụ hoặc phương tiện vật lý được dùng để thực hiện hành động.',
    examples: [
      { japanese: 'はしで ごはんを たべます。', vietnamese: 'Tôi ăn cơm bằng đũa.' },
      { japanese: 'ペンで なまえを かきます。', vietnamese: 'Tôi viết tên bằng bút mực.' }
    ]
  },
  {
    id: 'g-b7-2',
    level: 'N5',
    lesson: 7,
    order: 2,
    title: '2. Ngôn ngữ + で',
    structure: 'Ngôn ngữ + で + V',
    meaning: 'Nói / Viết bằng thứ tiếng nào',
    explanation: 'Dùng で sau tên ngôn ngữ để chỉ phương tiện giao tiếp hoặc hỏi cách dịch giữa các thứ tiếng.',
    examples: [
      { japanese: 'にほんごで はなします。', vietnamese: 'Tôi nói chuyện bằng tiếng Nhật.' },
      { japanese: '「ありがとう」は ベトナムごで なんですか。', vietnamese: '“Arigatou” trong tiếng Việt là gì?' }
    ]
  },
  {
    id: 'g-b7-3',
    level: 'N5',
    lesson: 7,
    order: 3,
    title: '3. Người に N を あげます',
    structure: 'Người nhận + に + Vật + を + あげます',
    meaning: 'Tặng / Cho ai cái gì',
    explanation: 'Người nói (hoặc người khác) tặng, cho, làm lợi cho đối tượng nhận đứng trước trợ từ に.',
    examples: [
      { japanese: 'ともだちに プレゼントを あげます。', vietnamese: 'Tôi tặng quà cho bạn.' },
      { japanese: 'ははに はなを あげました。', vietnamese: 'Tôi đã tặng hoa cho mẹ.' }
    ]
  },
  {
    id: 'g-b7-4',
    level: 'N5',
    lesson: 7,
    order: 4,
    title: '4. Người に／から N を もらいます',
    structure: 'Người trao + に／から + Vật + を + もらいます',
    meaning: 'Nhận cái gì từ ai',
    explanation: 'Diễn tả hành động nhận được một đồ vật hoặc lợi ích từ ai đó. Có thể dùng から thay cho に khi đối tượng trao tặng là tổ chức hoặc cơ quan.',
    examples: [
      { japanese: 'ともだちに ほんを もらいました。', vietnamese: 'Tôi đã nhận được sách từ bạn.' },
      { japanese: 'せんせいから じしょを もらいました。', vietnamese: 'Tôi đã nhận từ điển từ thầy giáo.' }
    ]
  },
  {
    id: 'g-b7-5',
    level: 'N5',
    lesson: 7,
    order: 5,
    title: '5. Người に N を かします／かります',
    structure: 'かします (Cho mượn) vs かります (Mượn)',
    meaning: 'Cho ai mượn / Mượn của ai',
    explanation: 'Cần phân biệt rõ theo góc nhìn chủ thể: かします là cho đối phương mượn; かります là mình mượn từ đối phương.',
    examples: [
      { japanese: 'ともだちに ほんを かします。', vietnamese: 'Tôi cho bạn mượn sách.' },
      { japanese: 'ともだちに ほんを かります。', vietnamese: 'Tôi mượn sách từ bạn.' }
    ]
  },
  {
    id: 'g-b7-6',
    level: 'N5',
    lesson: 7,
    order: 6,
    title: '6. おしえます・ならいます',
    structure: 'おしえます (Dạy) vs ならいます (Học từ ai)',
    meaning: 'Dạy cho ai / Học từ ai',
    explanation: 'おしえます là truyền đạt kiến thức cho người khác; ならいます là tiếp thu kiến thức từ một người thầy/người khác.',
    examples: [
      { japanese: 'せんせいに にほんごを ならいます。', vietnamese: 'Tôi học tiếng Nhật từ thầy cô.' }
    ]
  },
  {
    id: 'g-b7-7',
    level: 'N5',
    lesson: 7,
    order: 7,
    title: '7. もう Vました／まだです',
    structure: 'もう Vました / まだです',
    meaning: 'Đã làm rồi / Vẫn chưa làm',
    explanation: 'もう Vました diễn tả hành động đã hoàn thành trước thời điểm hiện tại. Nếu chưa hoàn thành thì trả lời bằng いいえ、まだです.',
    examples: [
      { japanese: 'もう ひるごはんを たべました。', vietnamese: 'Tôi đã ăn trưa rồi.' },
      { japanese: 'ひるごはんを たべましたか。…いいえ、まだです。', vietnamese: 'Bạn ăn trưa chưa? …Chưa, tôi vẫn chưa ăn.' }
    ]
  },

  // ================= BÀI 8 =================
  {
    id: 'g-b8-1',
    level: 'N5',
    lesson: 8,
    order: 1,
    title: '1. Hai nhóm tính từ: Đuôi い và Đuôi な',
    structure: 'Tính từ đuôi い vs Tính từ đuôi な',
    meaning: 'Phân loại tính từ trong tiếng Nhật',
    explanation: 'Tính từ い kết thúc bằng âm い (あたらしい, おおきい, たかい). Tính từ な (しずか, きれい, ゆうめい, べんり) khi bổ nghĩa danh từ cần có な.',
    examples: [
      { japanese: 'あたらしい くるま', vietnamese: 'Chiếc xe hơi mới (Tính từ い).' },
      { japanese: 'しずかな まち', vietnamese: 'Thành phố yên tĩnh (Tính từ な).' }
    ],
    notes: ['CỰC KỲ QUAN TRỌNG: きれい (đẹp/sạch) và ゆうめい (nổi tiếng) kết thúc bằng âm [i] nhưng là TÍNH TỪ ĐUÔI な!']
  },
  {
    id: 'g-b8-2',
    level: 'N5',
    lesson: 8,
    order: 2,
    title: '2. Tính từ い + です',
    structure: 'Aい + です',
    meaning: 'Tính chất ... (Khẳng định tính từ い)',
    explanation: 'Dùng để mô tả trực tiếp tính chất của chủ thể ở thể lịch sự hiện tại.',
    examples: [
      { japanese: 'この ほんは おもしろいです。', vietnamese: 'Quyển sách này thú vị.' },
      { japanese: 'この かばんは たかいです。', vietnamese: 'Cái cặp này đắt.' }
    ]
  },
  {
    id: 'g-b8-3',
    level: 'N5',
    lesson: 8,
    order: 3,
    title: '3. Tính từ な + です',
    structure: 'Aな (bỏ な) + です',
    meaning: 'Tính chất ... (Khẳng định tính từ な)',
    explanation: 'Khi tính từ な đứng cuối câu vị ngữ, bỏ chữ な rồi ghép trực tiếp với です.',
    examples: [
      { japanese: 'この まちは しずかです。', vietnamese: 'Thành phố này yên tĩnh.' },
      { japanese: 'ふすあんは ゆうめいです。', vietnamese: 'Phú Xuân rất nổi tiếng.' }
    ]
  },
  {
    id: 'g-b8-4',
    level: 'N5',
    lesson: 8,
    order: 4,
    title: '4. Phủ định của tính từ',
    structure: 'Aい → Aくないです / Aな → Aじゃありません',
    meaning: 'Không ... (Phủ định tính từ)',
    explanation: 'Tính từ い: bỏ [い] thêm [くないです]. Tính từ な: thêm [じゃありません] (hoặc ではありません).',
    examples: [
      { japanese: 'この ほんは おもしろくないです。', vietnamese: 'Quyển sách này không thú vị.' },
      { japanese: 'この へやは しずかじゃありません。', vietnamese: 'Căn phòng này không yên tĩnh.' }
    ],
    notes: ['Ngoại lệ: Tính từ いい (tốt) phủ định là よくないです (không nói いくないです).']
  },
  {
    id: 'g-b8-5',
    level: 'N5',
    lesson: 8,
    order: 5,
    title: '5. Phó từ chỉ mức độ: とても・あまり',
    structure: 'とても + A (Rất...) / あまり + Phủ định (Không... lắm)',
    meaning: 'Rất... / Không... lắm',
    explanation: 'とても đi với câu khẳng định mang nghĩa “rất”; あまり luôn đi với vị ngữ PHỦ ĐỊNH mang nghĩa “không lắm”.',
    examples: [
      { japanese: 'この まちは とても しずかです。', vietnamese: 'Thành phố này rất yên tĩnh.' },
      { japanese: 'この ほんは あまり おもしろくないです。', vietnamese: 'Quyển sách này không thú vị lắm.' }
    ]
  },
  {
    id: 'g-b8-6',
    level: 'N5',
    lesson: 8,
    order: 6,
    title: '6. N は どうですか／どんな N ですか',
    structure: 'N は どうですか / どんな N ですか',
    meaning: 'N thì thế nào? / Là N như thế nào?',
    explanation: 'どうですか hỏi về cảm nhận hoặc tình trạng hiện tại; どんな N ですか hỏi về đặc điểm, tính chất của danh từ.',
    examples: [
      { japanese: 'にほんの せいかつは どうですか。', vietnamese: 'Cuộc sống ở Nhật thế nào?' },
      { japanese: 'ふすあんは どんな まちですか。…しずかな まちです。', vietnamese: 'Huế là thành phố như thế nào? …Là thành phố yên tĩnh.' }
    ]
  },
  {
    id: 'g-b8-7',
    level: 'N5',
    lesson: 8,
    order: 7,
    title: '7. Mệnh đề 1 が、Mệnh đề 2 (Nhưng)',
    structure: 'Mệnh đề 1 + が、+ Mệnh đề 2',
    meaning: '..., nhưng mà...',
    explanation: 'Trợ từ が ở giữa hai mệnh đề mang nghĩa tương phản, nối hai câu trái ngược về mặt tính chất.',
    examples: [
      { japanese: 'この レストランは おいしいですが、たかいです。', vietnamese: 'Nhà hàng này ngon nhưng đắt.' }
    ]
  },

  // ================= BÀI 9 =================
  {
    id: 'g-b9-1',
    level: 'N5',
    lesson: 9,
    order: 1,
    title: '1. N が 好きです／嫌いです',
    structure: 'N + が + 好き／嫌い + です',
    meaning: 'Thích N / Ghét N',
    explanation: 'Đối tượng được yêu thích hoặc ghét bỏ trong tiếng Nhật luôn đi cùng trợ từ が, không đi với を.',
    examples: [
      { japanese: 'わたしは おんがくが すきです。', vietnamese: 'Tôi thích âm nhạc.' },
      { japanese: 'わたしは さかなが きらいです。', vietnamese: 'Tôi không thích cá.' }
    ]
  },
  {
    id: 'g-b9-2',
    level: 'N5',
    lesson: 9,
    order: 2,
    title: '2. N が 上手です／下手です',
    structure: 'N + が + 上手／下手 + です',
    meaning: 'Giỏi về N / Kém về N',
    explanation: 'Đánh giá năng lực hoặc kỹ năng của đối tượng đối với một lĩnh vực, đi cùng trợ từ が.',
    examples: [
      { japanese: 'たなかさんは にほんごが じょうずです。', vietnamese: 'Anh Tanaka giỏi tiếng Nhật.' },
      { japanese: 'わたしは うたが へたです。', vietnamese: 'Tôi hát không giỏi.' }
    ],
    notes: ['Khi tự nói về bản thân, để lịch sự và khiêm tốn nên dùng あまり上手じゃありません (tôi không giỏi lắm) thay vì tự nhận mình 上手.']
  },
  {
    id: 'g-b9-3',
    level: 'N5',
    lesson: 9,
    order: 3,
    title: '3. N が わかります',
    structure: 'N + が + わかります',
    meaning: 'Hiểu / Biết về N',
    explanation: 'Nội dung kiến thức, ngôn ngữ hoặc sự việc được thấu hiểu đi cùng trợ từ が.',
    examples: [
      { japanese: 'にほんごが わかります。', vietnamese: 'Tôi hiểu tiếng Nhật.' },
      { japanese: 'この ことばの いみが わかりません。', vietnamese: 'Tôi không hiểu ý nghĩa của từ này.' }
    ]
  },
  {
    id: 'g-b9-4',
    level: 'N5',
    lesson: 9,
    order: 4,
    title: '4. N が あります (Sở hữu tiền bạc, thời gian)',
    structure: 'N + が + あります',
    meaning: 'Có tiền, thời gian, cuộc hẹn...',
    explanation: 'Ngoài ý nghĩa tồn tại đồ vật, あります còn dùng để nói việc sở hữu các khái niệm trừu tượng như thời gian, tiền bạc, việc bận...',
    examples: [
      { japanese: 'おかねが あります。', vietnamese: 'Tôi có tiền.' },
      { japanese: 'じかんが ありません。', vietnamese: 'Tôi không có thời gian.' }
    ]
  },
  {
    id: 'g-b9-5',
    level: 'N5',
    lesson: 9,
    order: 5,
    title: '5. Các phó từ chỉ mức độ',
    structure: 'よく / だいたい / たくさん / 少し / あまり / 全然',
    meaning: 'Mức độ hiểu biết hoặc số lượng',
    explanation: 'よく (rất tốt/thường xuyên), だいたい (đại khái), たくさん (nhiều), すこし (một chút), あまり (không... lắm), ぜんぜん (hoàn toàn không).',
    examples: [
      { japanese: 'にほんごが すこし わかります。', vietnamese: 'Tôi hiểu một chút tiếng Nhật.' },
      { japanese: 'にほんごが ぜんぜん わかりません。', vietnamese: 'Tôi hoàn toàn không hiểu tiếng Nhật.' }
    ]
  },
  {
    id: 'g-b9-6',
    level: 'N5',
    lesson: 9,
    order: 6,
    title: '6. どうして ～か／～から',
    structure: 'どうして ～か / ～から',
    meaning: 'Tại sao? / Vì...',
    explanation: 'どうして dùng để hỏi lý do; câu trả lời kết thúc bằng から để nêu nguyên nhân, lý do.',
    examples: [
      { japanese: 'どうして にほんごを べんきょうしますか。', vietnamese: 'Tại sao bạn học tiếng Nhật?' },
      { japanese: 'にほんで はたらきたいですから。', vietnamese: 'Vì tôi muốn làm việc tại Nhật Bản.' }
    ]
  },

  // ================= BÀI 10 =================
  {
    id: 'g-b10-1',
    level: 'N5',
    lesson: 10,
    order: 1,
    title: '1. N が あります／います (Sự tồn tại)',
    structure: 'Đồ vật/Cây cối + が + あります / Người/Động vật + が + います',
    meaning: 'Có đồ vật / Có người, con vật',
    explanation: 'あります dùng cho đồ vật vô tri hoặc cây cối; います dùng cho sinh vật sống có khả năng tự di chuyển (người, động vật).',
    examples: [
      { japanese: 'つくえが あります。', vietnamese: 'Có cái bàn.' },
      { japanese: 'ねこが います。', vietnamese: 'Có con mèo.' }
    ]
  },
  {
    id: 'g-b10-2',
    level: 'N5',
    lesson: 10,
    order: 2,
    title: '2. Địa điểm に N が あります／います',
    structure: 'Địa điểm + に + N + が + あります／います',
    meaning: 'Ở địa điểm có N',
    explanation: 'Trợ từ に chỉ nơi chốn tồn tại; trợ từ が đánh dấu sự vật hoặc sinh vật tồn tại tại nơi đó.',
    examples: [
      { japanese: 'へやに つくえが あります。', vietnamese: 'Trong phòng có cái bàn.' },
      { japanese: 'にわに ねこが います。', vietnamese: 'Trong vườn có con mèo.' }
    ]
  },
  {
    id: 'g-b10-3',
    level: 'N5',
    lesson: 10,
    order: 3,
    title: '3. N は Địa điểm に あります／います',
    structure: 'N + は + Địa điểm + に + あります／います',
    meaning: 'N thì ở địa điểm',
    explanation: 'Khi đối tượng N đã được nhắc tới trước đó và đưa lên làm chủ đề của câu, dùng cấu trúc này để nói vị trí của N.',
    examples: [
      { japanese: 'ほんは つくえの うえに あります。', vietnamese: 'Quyển sách thì ở trên bàn.' },
      { japanese: 'たなかさんは じむしょに います。', vietnamese: 'Anh Tanaka thì ở văn phòng.' }
    ]
  },
  {
    id: 'g-b10-4',
    level: 'N5',
    lesson: 10,
    order: 4,
    title: '4. Từ chỉ vị trí không gian',
    structure: 'N1 の [上・下・前・後ろ・中・外・隣・近く・間] に',
    meaning: 'Ở trên/dưới/trước/sau/trong/ngoài/bên cạnh/gần/giữa N1',
    explanation: 'Các danh từ chỉ phương vị kết hợp với trợ từ の: うえ (trên), した (dưới), まえ (trước), うしろ (sau), なか (trong), そと (ngoài), となり (sát cạnh), ちかく (gần), あいだ (ở giữa).',
    examples: [
      { japanese: 'いすの したに かばんが あります。', vietnamese: 'Có cái cặp ở dưới ghế.' },
      { japanese: 'ぎんこうと ゆうびんきょくの あいだに コンビニが あります。', vietnamese: 'Có cửa hàng tiện lợi ở giữa ngân hàng và bưu điện.' }
    ]
  },
  {
    id: 'g-b10-5',
    level: 'N5',
    lesson: 10,
    order: 5,
    title: '5. N1 や N2 など',
    structure: 'N1 や N2 など',
    meaning: 'N1, N2 và những thứ tương tự (Liệt kê tiêu biểu)',
    explanation: 'Trợ từ や dùng để liệt kê một vài vật tiêu biểu (hàm ý vẫn còn những thứ khác); など mang nghĩa “vân vân, những thứ như thế”.',
    examples: [
      { japanese: 'つくえの うえに ほんや ノートなどが あります。', vietnamese: 'Trên bàn có sách, vở và những thứ tương tự.' }
    ],
    notes: ['Phân biệt: と là liệt kê toàn bộ và đầy đủ; や...など là liệt kê đại diện, không đầy đủ.']
  },

  // ================= BÀI 11 =================
  {
    id: 'g-b11-1',
    level: 'N5',
    lesson: 11,
    order: 1,
    title: '1. Lượng từ trong tiếng Nhật',
    structure: 'Số lượng + Danh từ hoặc Động từ',
    meaning: 'Đếm người, vật bằng các hậu tố lượng từ tương ứng',
    explanation: 'Tiếng Nhật dùng các đuôi đếm chuyên biệt: ～つ (đồ vật chung), ～人 (người), ～冊 (sách), ～台 (máy móc, xe cộ), ～匹 (động vật nhỏ), ～本 (vật dài hình trụ), ～枚 (vật mỏng, tờ giấy, áo).',
    examples: [
      { japanese: 'りんごを みっつ かいました。', vietnamese: 'Tôi đã mua ba quả táo.' },
      { japanese: 'ほんを さんさつ かいました。', vietnamese: 'Tôi đã mua ba quyển sách.' },
      { japanese: 'ねこが にひき います。', vietnamese: 'Có hai con mèo.' }
    ]
  },
  {
    id: 'g-b11-2',
    level: 'N5',
    lesson: 11,
    order: 2,
    title: '2. Vị trí của lượng từ trong câu',
    structure: 'N を + Số lượng + V',
    meaning: 'Làm V với số lượng N',
    explanation: 'Thông thường lượng từ đặt trực tiếp trước động từ mà không cần thêm trợ từ nào ở giữa.',
    examples: [
      { japanese: 'りんごを みっつ かいました。', vietnamese: 'Tôi đã mua ba quả táo.' },
      { japanese: 'がくせいが さんにん います。', vietnamese: 'Có ba học sinh.' }
    ]
  },
  {
    id: 'g-b11-3',
    level: 'N5',
    lesson: 11,
    order: 3,
    title: '3. Khoảng thời gian + Động từ',
    structure: 'Khoảng thời gian + V',
    meaning: 'Làm gì trong khoảng thời gian bao lâu',
    explanation: 'Diễn tả thời lượng kéo dài của một hành động. Không dùng trợ từ に sau khoảng thời gian này.',
    examples: [
      { japanese: 'まいにち にじかん べんきょうします。', vietnamese: 'Mỗi ngày tôi học 2 tiếng.' },
      { japanese: 'にほんごを さんかげつ べんきょうしました。', vietnamese: 'Tôi đã học tiếng Nhật trong 3 tháng.' }
    ],
    notes: ['Phân biệt: 6時に (vào lúc 6 giờ - thời điểm cụ thể) vs 6時間 (trong 6 tiếng đồng hồ - thời lượng).']
  },
  {
    id: 'g-b11-4',
    level: 'N5',
    lesson: 11,
    order: 4,
    title: '4. ～に ～回 (Tần suất)',
    structure: 'Khoảng thời gian + に + Số lần',
    meaning: '... lần trong một khoảng thời gian',
    explanation: 'Biểu thị tần suất thực hiện hành động trong một đơn vị thời gian (ngày, tuần, tháng, năm).',
    examples: [
      { japanese: 'いっしゅうかんに さんかい にほんごを べんきょうします。', vietnamese: 'Tôi học tiếng Nhật 3 lần một tuần.' },
      { japanese: 'いちにちに にかい くすりを のみます。', vietnamese: 'Tôi uống thuốc 2 lần một ngày.' }
    ]
  },
  {
    id: 'g-b11-5',
    level: 'N5',
    lesson: 11,
    order: 5,
    title: '5. どのくらい / ～だけ',
    structure: 'どのくらい (Bao lâu, bao nhiêu) / N + だけ (Chỉ...)',
    meaning: 'Mất bao lâu / Chỉ có...',
    explanation: 'どのくらい hỏi về thời lượng hoặc chi phí; だけ mang nghĩa “chỉ”, giới hạn phạm vi hoặc số lượng.',
    examples: [
      { japanese: 'どのくらい にほんごを べんきょうしましたか。', vietnamese: 'Bạn đã học tiếng Nhật bao lâu?' },
      { japanese: 'ひとりだけ きました。', vietnamese: 'Chỉ có một người đến.' },
      { japanese: 'えきまで どのくらい かかりますか。…じゅっぷん かかります。', vietnamese: 'Đến ga mất bao lâu? …Mất 10 phút.' }
    ]
  },

  // ================= BÀI 12 =================
  {
    id: 'g-b12-1',
    level: 'N5',
    lesson: 12,
    order: 1,
    title: '1. Quá khứ của Danh từ và Tính từ な',
    structure: 'N / Aな + でした (Khẳng định) | じゃありませんでした (Phủ định)',
    meaning: 'Đã là... / Đã không phải là...',
    explanation: 'Danh từ và tính từ đuôi な chia thời quá khứ tương tự nhau: khẳng định thêm でした, phủ định dùng じゃありませんでした.',
    examples: [
      { japanese: 'きのうは やすみでした。', vietnamese: 'Hôm qua là ngày nghỉ.' },
      { japanese: 'きのうは しずかでした。', vietnamese: 'Hôm qua thật yên tĩnh.' },
      { japanese: 'きのうは しずかじゃありませんでした。', vietnamese: 'Hôm qua không yên tĩnh.' }
    ]
  },
  {
    id: 'g-b12-2',
    level: 'N5',
    lesson: 12,
    order: 2,
    title: '2. Quá khứ của Tính từ đuôi い',
    structure: 'Aい (bỏ い) + かったです (Khẳng định) | くなかったです (Phủ định)',
    meaning: 'Đã ... / Đã không ...',
    explanation: 'Tính từ い chia quá khứ bằng cách bỏ [い] thêm [かったです]; phủ định quá khứ đổi thành [くなかったです].',
    examples: [
      { japanese: 'きのうは あつかったです。', vietnamese: 'Hôm qua trời đã rất nóng.' },
      { japanese: 'きのうは あつくなかったです。', vietnamese: 'Hôm qua trời đã không nóng.' }
    ],
    notes: ['Ngoại lệ quan trọng: いいです (tốt) chia quá khứ là よかったです (đã tốt) và よくなかったです (đã không tốt).']
  },
  {
    id: 'g-b12-3',
    level: 'N5',
    lesson: 12,
    order: 3,
    title: '3. N1 は N2 より A です (So sánh hơn)',
    structure: 'N1 は N2 より A です',
    meaning: 'N1 thì A hơn N2',
    explanation: 'Dùng so sánh hai đối tượng với nhau; より đứng sau đối tượng được lấy làm mốc chuẩn so sánh.',
    examples: [
      { japanese: 'ベトナムは にほんより あついです。', vietnamese: 'Việt Nam nóng hơn Nhật Bản.' }
    ]
  },
  {
    id: 'g-b12-4',
    level: 'N5',
    lesson: 12,
    order: 4,
    title: '4. N1 と N2 と どちらが A ですか',
    structure: 'N1 と N2 と どちらが A ですか → N1 の ほうが A です',
    meaning: 'Giữa N1 và N2 thì cái nào A hơn? → N1 thì A hơn',
    explanation: 'Dùng để hỏi so sánh lựa chọn giữa 2 đối tượng; câu trả lời dùng cụm [～の ほうが...] để chỉ phía có tính chất nổi trội hơn.',
    examples: [
      { japanese: 'にほんごと えいごと どちらが むずかしいですか。', vietnamese: 'Tiếng Nhật và tiếng Anh, tiếng nào khó hơn?' },
      { japanese: 'にほんごの ほうが むずかしいです。', vietnamese: 'Tiếng Nhật khó hơn.' }
    ]
  },
  {
    id: 'g-b12-5',
    level: 'N5',
    lesson: 12,
    order: 5,
    title: '5. Nhóm の中で N が いちばん A です (So sánh nhất)',
    structure: 'Nhóm + の中で + N + が + いちばん A です',
    meaning: 'Trong nhóm ..., N là A nhất',
    explanation: 'Diễn tả sự so sánh vượt trội nhất của một đối tượng trong một phạm vi hoặc tập hợp từ 3 đối tượng trở lên.',
    examples: [
      { japanese: 'スポーツの なかで サッカーが いちばん すきです。', vietnamese: 'Trong các môn thể thao, tôi thích bóng đá nhất.' },
      { japanese: 'くだものの なかで なにが いちばん すきですか。', vietnamese: 'Trong các loại trái cây, bạn thích loại nào nhất?' }
    ]
  },

  // ================= BÀI 13 =================
  {
    id: 'g-b13-1',
    level: 'N5',
    lesson: 13,
    order: 1,
    title: '1. N が ほしいです',
    structure: 'N + が + ほしいです',
    meaning: 'Tôi muốn có N',
    explanation: 'Dùng để diễn tả mong muốn sở hữu một đồ vật hoặc một thứ gì đó của người nói. Đối tượng mong muốn đi với trợ từ が.',
    examples: [
      { japanese: 'あたらしい パソコンが ほしいです。', vietnamese: 'Tôi muốn có một chiếc máy tính mới.' },
      { japanese: 'なにが ほしいですか。…じしょが ほしいです。', vietnamese: 'Bạn muốn có gì? …Tôi muốn có từ điển.' }
    ]
  },
  {
    id: 'g-b13-2',
    level: 'N5',
    lesson: 13,
    order: 2,
    title: '2. Vます (bỏ ます) + たいです',
    structure: 'V (bỏ ます) + たいです / たくないです',
    meaning: 'Muốn làm V / Không muốn làm V',
    explanation: 'Diễn đạt mong muốn thực hiện một hành động của người nói. Đuôi たい chia tương tự như một tính từ đuôi い.',
    examples: [
      { japanese: 'にほんへ いきたいです。', vietnamese: 'Tôi muốn đi Nhật.' },
      { japanese: 'ラーメンを たべたいです。', vietnamese: 'Tôi muốn ăn ramen.' },
      { japanese: 'きょうは はたらきたくないです。', vietnamese: 'Hôm nay tôi không muốn làm việc.' }
    ]
  },
  {
    id: 'g-b13-3',
    level: 'N5',
    lesson: 13,
    order: 3,
    title: '3. Địa điểm へ V (bỏ ます) + に 行きます／来ます／帰ります',
    structure: 'Địa điểm + へ + V (bỏ ます) / N + に + 行きます／来ます／帰ります',
    meaning: 'Đi / Đến / Về đâu để làm gì (Mục đích di chuyển)',
    explanation: 'Biểu thị mục đích của việc di chuyển; động từ bỏ ます hoặc danh từ chỉ hoạt động đặt trước trợ từ に.',
    examples: [
      { japanese: 'にほんへ にほんごを べんきょうしに いきます。', vietnamese: 'Tôi sang Nhật để học tiếng Nhật.' },
      { japanese: 'デパートへ かいものに いきます。', vietnamese: 'Tôi đi trung tâm thương mại để mua sắm.' },
      { japanese: 'ともだちの うちへ あそびに いきます。', vietnamese: 'Tôi đến nhà bạn để chơi.' }
    ]
  },

  // ================= BÀI 14 =================
  {
    id: 'g-b14-1',
    level: 'N5',
    lesson: 14,
    order: 1,
    title: '1. Cách chia động từ sang thể て',
    structure: 'Nhóm 1 (Quy tắc âm cuối) | Nhóm 2 (bỏ ます + て) | Nhóm 3 (して, きて)',
    meaning: 'Thể て của động từ (Dạng thức nền tảng)',
    explanation: 'Nhóm 1: う・つ・る → って; む・ぶ・ぬ → んで; く → いて; ぐ → いで; す → して. Nhóm 2: bỏ ます + て (たべて, みて). Nhóm 3: します → して, きます → きて.',
    examples: [
      { japanese: 'かいます → かって / のみます → のんで', vietnamese: 'Mua → Mua / Uống → Uống' },
      { japanese: 'たべます → たべて / みます → みて', vietnamese: 'Ăn → Ăn / Nhìn → Nhìn' }
    ],
    notes: ['Ngoại lệ Nhóm 1 cực kỳ quan trọng: 行きます (いきます) đổi sang thể て là 行って (いって), không phải いいて!']
  },
  {
    id: 'g-b14-2',
    level: 'N5',
    lesson: 14,
    order: 2,
    title: '2. Vて ください',
    structure: 'Vて + ください',
    meaning: 'Xin hãy làm V (Yêu cầu, nhờ vả lịch sự)',
    explanation: 'Dùng để yêu cầu, sai bảo hoặc nhờ cậy ai đó làm một việc gì một cách lịch sự.',
    examples: [
      { japanese: 'ここに なまえを かいてください。', vietnamese: 'Xin hãy viết tên vào đây.' },
      { japanese: 'ちょっと まってください。', vietnamese: 'Xin vui lòng đợi một chút.' }
    ]
  },
  {
    id: 'g-b14-3',
    level: 'N5',
    lesson: 14,
    order: 3,
    title: '3. Vて います (Hành động đang diễn ra)',
    structure: 'Vて + います',
    meaning: 'Đang làm V',
    explanation: 'Diễn tả hành động đang tiến hành tại chính thời điểm nói.',
    examples: [
      { japanese: 'いま ごはんを たべています。', vietnamese: 'Bây giờ tôi đang ăn cơm.' },
      { japanese: 'いま にほんごを べんきょうしています。', vietnamese: 'Bây giờ tôi đang học tiếng Nhật.' }
    ]
  },
  {
    id: 'g-b14-4',
    level: 'N5',
    lesson: 14,
    order: 4,
    title: '4. Vましょうか — Đề nghị làm giúp',
    structure: 'Vましょうか',
    meaning: 'Để tôi làm giúp bạn nhé?',
    explanation: 'Dùng khi người nói chủ động đề nghị làm một việc gì đó để giúp đỡ người nghe.',
    examples: [
      { japanese: 'にもつを もちましょうか。', vietnamese: 'Để tôi xách hành lý giúp bạn nhé?' },
      { japanese: 'はい、おねがいします。', vietnamese: 'Vâng, nhờ bạn giúp ạ.' },
      { japanese: 'いいえ、だいじょうぶです。', vietnamese: 'Không, tôi ổn rồi cảm ơn bạn.' }
    ]
  },

  // ================= BÀI 15 =================
  {
    id: 'g-b15-1',
    level: 'N5',
    lesson: 15,
    order: 1,
    title: '1. Vてもいいです',
    structure: 'Vて + もいいです / もいいですか',
    meaning: 'Được phép làm V / Tôi làm V có được không?',
    explanation: 'Dùng để cho phép hoặc xin phép người khác thực hiện một hành động nào đó.',
    examples: [
      { japanese: 'ここで しゃしんを とってもいいですか。', vietnamese: 'Tôi chụp ảnh ở đây có được không?' },
      { japanese: 'はい、とってもいいです。', vietnamese: 'Vâng, bạn chụp được.' }
    ]
  },
  {
    id: 'g-b15-2',
    level: 'N5',
    lesson: 15,
    order: 2,
    title: '2. Vてはいけません',
    structure: 'Vて + はいけません',
    meaning: 'Không được phép làm V (Cấm đoán)',
    explanation: 'Dùng để diễn tả một điều cấm, quy định không được phép làm.',
    examples: [
      { japanese: 'ここで たばこを すってはいけません。', vietnamese: 'Không được hút thuốc ở đây.' },
      { japanese: 'ここに はいってはいけません。', vietnamese: 'Không được vào đây.' }
    ]
  },
  {
    id: 'g-b15-3',
    level: 'N5',
    lesson: 15,
    order: 3,
    title: '3. Vています (Trạng thái kéo dài, kết quả)',
    structure: 'Vて + います',
    meaning: 'Trạng thái hiện tại sau sự thay đổi',
    explanation: 'Ngoài việc chỉ hành động đang diễn ra, Vています còn diễn tả trạng thái còn lưu lại sau một hành động (hôn nhân, nơi cư trú, nghề nghiệp, nắm giữ đồ vật).',
    examples: [
      { japanese: 'わたしは けっこんしています。', vietnamese: 'Tôi đã kết hôn (và đang ở trạng thái đã lập gia đình).' },
      { japanese: 'おおさかに すんでいます。', vietnamese: 'Tôi đang sinh sống ở Osaka.' },
      { japanese: 'たなかさんは はたらいています。', vietnamese: 'Anh Tanaka đang đi làm.' }
    ]
  },

  // ================= BÀI 16 =================
  {
    id: 'g-b16-1',
    level: 'N5',
    lesson: 16,
    order: 1,
    title: '1. Vて、Vて、～ます (Nối chuỗi hành động)',
    structure: 'V1て、V2て、... V cuối câu',
    meaning: 'Làm V1 rồi làm V2 rồi...',
    explanation: 'Dùng thể て để liên kết nhiều hành động diễn ra theo trình tự thời gian liên tiếp nhau.',
    examples: [
      { japanese: 'あさ おきて、シャワーを あびて、あさごはんを たべます。', vietnamese: 'Buổi sáng tôi thức dậy, tắm vòi sen rồi ăn sáng.' }
    ]
  },
  {
    id: 'g-b16-2',
    level: 'N5',
    lesson: 16,
    order: 2,
    title: '2. Nối tính từ và danh từ',
    structure: 'Aい (bỏ い) + くて / Aな + で / N + で',
    meaning: 'Vừa ... vừa ... / ... và ...',
    explanation: 'Tính từ い: đổi い thành くて (ひろくて, あかるい); Tính từ な: dùng で (しずかで, きれい); Danh từ: dùng で (にほんじんで, かいしゃいん).',
    examples: [
      { japanese: 'この へやは ひろくて、あかるいです。', vietnamese: 'Căn phòng này rộng và sáng sủa.' },
      { japanese: 'この まちは しずかで、きれいです。', vietnamese: 'Thành phố này yên tĩnh và đẹp.' },
      { japanese: 'たなかさんは にほんじんで、かいしゃいんです。', vietnamese: 'Anh Tanaka là người Nhật và là nhân viên công ty.' }
    ],
    notes: ['Ngoại lệ: いいです nối câu thành よくて.']
  },
  {
    id: 'g-b16-3',
    level: 'N5',
    lesson: 16,
    order: 3,
    title: '3. N1 は N2 が A です (Miêu tả đặc điểm bộ phận)',
    structure: 'N1 は N2 が A です',
    meaning: 'N1 có N2 thì A (Miêu tả đặc điểm)',
    explanation: 'N1 là chủ đề lớn của toàn câu; N2 là một bộ phận, chi tiết cụ thể mang tính chất A.',
    examples: [
      { japanese: 'わたしは かみが ながいです。', vietnamese: 'Tôi có mái tóc dài.' },
      { japanese: 'フエは たべものが おいしいです。', vietnamese: 'Huế có đồ ăn rất ngon.' }
    ]
  },
  {
    id: 'g-b16-4',
    level: 'N5',
    lesson: 16,
    order: 4,
    title: '4. Vてから、～ます',
    structure: 'V1てから、V2',
    meaning: 'Sau khi làm xong V1 thì làm V2',
    explanation: 'Nhấn mạnh hành động V1 bắt buộc phải được hoàn tất xong xuôi rồi mới tiến hành hành động V2.',
    examples: [
      { japanese: 'ごはんを たべてから、べんきょうします。', vietnamese: 'Sau khi ăn cơm xong, tôi học bài.' },
      { japanese: 'しごとが おわってから、うちへ かえります。', vietnamese: 'Sau khi công việc kết thúc, tôi về nhà.' }
    ]
  },

  // ================= BÀI 17 =================
  {
    id: 'g-b17-1',
    level: 'N5',
    lesson: 17,
    order: 1,
    title: '1. Cách chia động từ sang thể ない (Phủ định ngắn)',
    structure: 'Nhóm 1 (Đổi đuôi hàng い → hàng あ + ない) | Nhóm 2 (bỏ ます + ない) | Nhóm 3 (しない, こない)',
    meaning: 'Thể phủ định thông thường của động từ',
    explanation: 'Nhóm 1: かきます → かかない, のみます → のまない. Chú ý đuôi う đổi thành わない (かいます → かわない). Nhóm 2: たべます → たべない. Nhóm 3: します → しない, きます → こない.',
    examples: [
      { japanese: 'かきます → かかない / まちます → またない', vietnamese: 'Viết → Không viết / Đợi → Không đợi' },
      { japanese: 'かいます → かわない', vietnamese: 'Mua → Không mua (đuôi う thành わ)' }
    ]
  },
  {
    id: 'g-b17-2',
    level: 'N5',
    lesson: 17,
    order: 2,
    title: '2. Vないでください',
    structure: 'Vない + でください',
    meaning: 'Xin đừng làm V (Yêu cầu không làm)',
    explanation: 'Dùng để yêu cầu hoặc khuyên ai đó không được thực hiện một hành động nào đó.',
    examples: [
      { japanese: 'ここで たばこを すわないでください。', vietnamese: 'Xin đừng hút thuốc ở đây.' },
      { japanese: 'わすれないでください。', vietnamese: 'Xin đừng quên nhé.' }
    ]
  },
  {
    id: 'g-b17-3',
    level: 'N5',
    lesson: 17,
    order: 3,
    title: '3. Vなければなりません',
    structure: 'Vない (bỏ い) + ければなりません',
    meaning: 'Phải làm V (Diễn tả nghĩa vụ, bổn phận)',
    explanation: 'Diễn tả hành động bắt buộc phải làm, không làm không được. Trong hội thoại thân mật thường nói ngắn thành Vないと いけません.',
    examples: [
      { japanese: 'まいにち べんきょうしなければなりません。', vietnamese: 'Tôi phải học bài mỗi ngày.' },
      { japanese: 'くすりを のまなければなりません。', vietnamese: 'Tôi phải uống thuốc.' }
    ]
  },
  {
    id: 'g-b17-4',
    level: 'N5',
    lesson: 17,
    order: 4,
    title: '4. Vなくてもいいです',
    structure: 'Vない (bỏ い) + くてもいいです',
    meaning: 'Không cần làm V cũng được',
    explanation: 'Diễn tả hành động không mang tính bắt buộc, người nghe không làm cũng không sao.',
    examples: [
      { japanese: 'あした こなくてもいいです。', vietnamese: 'Ngày mai bạn không cần đến cũng được.' },
      { japanese: 'ぜんぶ たべなくてもいいです。', vietnamese: 'Không cần ăn hết cũng được.' }
    ],
    notes: ['Phân biệt: Vなければなりません (bắt buộc phải làm) vs Vなくてもいいです (không bắt buộc) vs Vてはいけません (bị cấm làm).']
  },

  // ================= BÀI 18 =================
  {
    id: 'g-b18-1',
    level: 'N5',
    lesson: 18,
    order: 1,
    title: '1. Cách chia động từ sang thể từ điển (Vる)',
    structure: 'Nhóm 1 (Đổi hàng い → hàng う) | Nhóm 2 (bỏ ます + る) | Nhóm 3 (する, くる)',
    meaning: 'Thể nguyên mẫu / Thể từ điển của động từ',
    explanation: 'Nhóm 1: かきます → かく, のみます → のむ, かいます → かう. Nhóm 2: たべます → たべる, みます → みる. Nhóm 3: します → する, きます → くる.',
    examples: [
      { japanese: 'はなします → はなす / まちます → まつ', vietnamese: 'Nói chuyện / Đợi' },
      { japanese: 'たべます → たべる / します → する', vietnamese: 'Ăn / Làm' }
    ]
  },
  {
    id: 'g-b18-2',
    level: 'N5',
    lesson: 18,
    order: 2,
    title: '2. Vることができます',
    structure: 'V thể từ điển + ことができます',
    meaning: 'Có thể làm V (Khả năng, năng lực)',
    explanation: 'Dùng để diễn tả năng lực của bản thân hoặc điều kiện cho phép có thể thực hiện được một hành động.',
    examples: [
      { japanese: 'にほんごを はなすことができます。', vietnamese: 'Tôi có thể nói tiếng Nhật.' },
      { japanese: 'ひらがなを よむことができます。', vietnamese: 'Tôi có thể đọc được chữ Hiragana.' },
      { japanese: 'およぐことができません。', vietnamese: 'Tôi không thể bơi.' }
    ]
  },
  {
    id: 'g-b18-3',
    level: 'N5',
    lesson: 18,
    order: 3,
    title: '3. Sở thích là Vることです',
    structure: 'しゅみは + V thể từ điển + ことです',
    meaning: 'Sở thích của tôi là việc làm V',
    explanation: 'こと đứng sau động từ thể từ điển để danh từ hóa hành động (nghĩa là “việc...”), giúp ghép vào vị ngữ câu.',
    examples: [
      { japanese: 'しゅみは おんがくを きくことです。', vietnamese: 'Sở thích của tôi là việc nghe nhạc.' },
      { japanese: 'しゅみは ほんを よむことです。', vietnamese: 'Sở thích của tôi là việc đọc sách.' }
    ]
  },
  {
    id: 'g-b18-4',
    level: 'N5',
    lesson: 18,
    order: 4,
    title: '4. Vる前に／Nの前に (Trước khi làm gì)',
    structure: 'V thể từ điển + 前に / Danh từ + の前に',
    meaning: 'Trước khi làm V / Trước sự kiện N',
    explanation: 'Diễn tả một hành động xảy ra trước một hành động hay sự kiện khác. Luôn dùng thể từ điển trước 前に kể cả câu ở thì quá khứ.',
    examples: [
      { japanese: 'ねるまえに、はを みがきます。', vietnamese: 'Trước khi đi ngủ, tôi đánh răng.' },
      { japanese: 'しょくじの まえに、てを あらいます。', vietnamese: 'Trước bữa ăn, tôi rửa tay.' }
    ]
  },

  // ================= BÀI 19 =================
  {
    id: 'g-b19-1',
    level: 'N5',
    lesson: 19,
    order: 1,
    title: '1. Cách chia động từ sang thể た (Thể quá khứ ngắn)',
    structure: 'Tương tự thể て (Đổi て → た, で → だ)',
    meaning: 'Thể た của động từ',
    explanation: 'Cách chia hoàn toàn giống thể て: かいて → かいた, のんで → のんだ, たべて → たべた, して → した, きて → きた. Ngoại lệ: いきます → いった.',
    examples: [
      { japanese: 'かきます → かいた / のみます → のんだ', vietnamese: 'Đã viết / Đã uống' },
      { japanese: 'いきます → いった', vietnamese: 'Đã đi (ngoại lệ)' }
    ]
  },
  {
    id: 'g-b19-2',
    level: 'N5',
    lesson: 19,
    order: 2,
    title: '2. Vたことがあります (Kinh nghiệm đã từng làm)',
    structure: 'Vた + ことがあります / ありません',
    meaning: 'Đã từng làm V / Chưa từng làm V',
    explanation: 'Dùng để nói về trải nghiệm hoặc kinh nghiệm đã từng có trong quá khứ tính đến thời điểm hiện tại.',
    examples: [
      { japanese: 'にほんへ いったことが あります。', vietnamese: 'Tôi đã từng đi Nhật Bản.' },
      { japanese: 'すしを たべたことが あります。', vietnamese: 'Tôi đã từng ăn sushi.' },
      { japanese: 'ふじさんに のぼったことが ありません。', vietnamese: 'Tôi chưa từng leo núi Phú Sĩ.' }
    ],
    notes: ['Phân biệt: Vました đơn thuần kể lại sự việc trong quá khứ; Vたことがあります nhấn mạnh vào kinh nghiệm sống đã trải qua.']
  },
  {
    id: 'g-b19-3',
    level: 'N5',
    lesson: 19,
    order: 3,
    title: '3. Vたり、Vたりします (Liệt kê hành động tiêu biểu)',
    structure: 'V1た + り、V2た + りします',
    meaning: 'Lúc thì làm V1, lúc thì làm V2...',
    explanation: 'Dùng để liệt kê một vài hoạt động tiêu biểu đại diện trong số nhiều hành động, không quan trọng thứ tự trước sau.',
    examples: [
      { japanese: 'にちようびは ほんを よんだり、おんがくを きいたりします。', vietnamese: 'Chủ nhật tôi lúc thì đọc sách, lúc thì nghe nhạc.' },
      { japanese: 'やすみのひは ねたり、ゲームを したりします。', vietnamese: 'Ngày nghỉ tôi ngủ rồi chơi game.' }
    ]
  },
  {
    id: 'g-b19-4',
    level: 'N5',
    lesson: 19,
    order: 4,
    title: '4. Biến đổi trạng thái: ～くなります / ～になります',
    structure: 'Aい (bỏ い) + くなります / Aな (bỏ な) + になります / N + になります',
    meaning: 'Trở nên ..., trở thành ...',
    explanation: 'Diễn tả sự biến đổi, chuyển biến về mặt tính chất hoặc thân phận theo thời gian.',
    examples: [
      { japanese: 'さむく なりました。', vietnamese: 'Trời đã trở nên lạnh.' },
      { japanese: 'げんきに なりました。', vietnamese: 'Tôi đã khỏe mạnh trở lại.' },
      { japanese: 'せんせいに なりました。', vietnamese: 'Tôi đã trở thành giáo viên.' }
    ]
  },

  // ================= BÀI 20 =================
  {
    id: 'g-b20-1',
    level: 'N5',
    lesson: 20,
    order: 1,
    title: '1. Thể thông thường của Động từ (Hội thoại thân mật)',
    structure: 'Hiện tại: Vる / Vない | Quá khứ: Vた / Vなかった',
    meaning: 'Dạng thông thường / thể ngắn của động từ',
    explanation: 'Dùng trong giao tiếp thân mật với bạn bè, người thân, và dùng làm thành phần phụ trong các cấu trúc ngữ pháp phức tạp.',
    examples: [
      { japanese: 'あした がっこうへ いく。', vietnamese: 'Ngày mai tôi đi học (thay cho いきます).' },
      { japanese: 'きのう がっこうへ いかなかった。', vietnamese: 'Hôm qua tôi không đi học (thay cho いきませんでした).' }
    ]
  },
  {
    id: 'g-b20-2',
    level: 'N5',
    lesson: 20,
    order: 2,
    title: '2. Thể thông thường của Tính từ い',
    structure: 'Aい / Aくない / Aかった / Aくなかった (bỏ です)',
    meaning: 'Dạng thông thường của tính từ い',
    explanation: 'Chỉ cần bỏ đuôi です ở cuối câu.',
    examples: [
      { japanese: 'この えいがは おもしろい。', vietnamese: 'Bộ phim này thú vị.' },
      { japanese: 'この えいがは おもしろくなかった。', vietnamese: 'Bộ phim này đã không thú vị.' }
    ]
  },
  {
    id: 'g-b20-3',
    level: 'N5',
    lesson: 20,
    order: 3,
    title: '3. Thể thông thường của Tính từ な và Danh từ',
    structure: 'だ (Khẳng định) | じゃない (Phủ định) | だった (Quá khứ) | じゃなかった (Quá khứ PĐ)',
    meaning: 'Dạng thông thường của danh từ và tính từ な',
    explanation: 'Thay です bằng だ; じゃありません bằng じゃない; でした bằng だった; じゃありませんでした bằng じゃなかった.',
    examples: [
      { japanese: 'この まちは しずかだ。', vietnamese: 'Thành phố này yên tĩnh.' },
      { japanese: 'きのうは やすみだった。', vietnamese: 'Hôm qua là ngày nghỉ.' }
    ],
    notes: ['Trong hội thoại thân mật giữa bạn bè, người Nhật thường lược bỏ luôn chữ だ ở cuối câu khẳng định và lên giọng nếu hỏi: いま ひま？ (Bây giờ rảnh không?).']
  },

  // ================= BÀI 21 =================
  {
    id: 'g-b21-1',
    level: 'N5',
    lesson: 21,
    order: 1,
    title: '1. Thể thông thường + と思います',
    structure: 'Mệnh đề thể thông thường + と 思います',
    meaning: 'Tôi nghĩ rằng...',
    explanation: 'Dùng để bày tỏ ý kiến, quan điểm hoặc phán đoán cá nhân. Trước と bắt buộc chia ở THỂ THÔNG THƯỜNG (Aな và Danh từ ở hiện tại khẳng định thêm だ).',
    examples: [
      { japanese: 'にほんごは おもしろいと おもいます。', vietnamese: 'Tôi nghĩ rằng tiếng Nhật rất thú vị.' },
      { japanese: 'あした あめが ふると おもいます。', vietnamese: 'Tôi nghĩ ngày mai trời sẽ mưa.' },
      { japanese: 'たなかさんは しんせつだと おもいます。', vietnamese: 'Tôi nghĩ anh Tanaka rất tốt bụng.' }
    ]
  },
  {
    id: 'g-b21-2',
    level: 'N5',
    lesson: 21,
    order: 2,
    title: '2. ～について、どう思いますか',
    structure: 'N + について、どう思いますか',
    meaning: 'Bạn nghĩ thế nào về N?',
    explanation: 'Dùng để hỏi quan điểm, đánh giá hoặc ý kiến của đối phương về một vấn đề cụ thể.',
    examples: [
      { japanese: 'にほんの せいかつについて、どう おもいますか。', vietnamese: 'Bạn nghĩ thế nào về cuộc sống ở Nhật?' },
      { japanese: 'べんりだと おもいます。', vietnamese: 'Tôi nghĩ là rất tiện lợi.' }
    ]
  },
  {
    id: 'g-b21-3',
    level: 'N5',
    lesson: 21,
    order: 3,
    title: '3. Thể thông thường + と言います (Trích dẫn lời nói)',
    structure: 'Mệnh đề + と 言いました',
    meaning: 'Ai đó đã nói rằng...',
    explanation: 'Dùng để thuật lại trực tiếp hoặc gián tiếp lời phát biểu, câu nói của một người khác.',
    examples: [
      { japanese: 'たなかさんは あした くると いいました。', vietnamese: 'Anh Tanaka đã nói rằng ngày mai anh ấy sẽ đến.' },
      { japanese: 'せんせいは しゅくだいが あると いいました。', vietnamese: 'Thầy giáo nói rằng có bài tập về nhà.' }
    ]
  },
  {
    id: 'g-b21-4',
    level: 'N5',
    lesson: 21,
    order: 4,
    title: '4. ～でしょう / Nで作ります',
    structure: 'Thể thông thường (bỏ だ) + でしょう / Chất liệu + で 作ります',
    meaning: 'Có lẽ là... / Làm bằng chất liệu gì',
    explanation: 'でしょう dùng phỏng đoán hoặc tìm kiếm sự xác nhận (lên giọng). Chất liệu + で chỉ chất liệu tạo nên đồ vật.',
    examples: [
      { japanese: 'あしたは はれるでしょう。', vietnamese: 'Có lẽ ngày mai trời sẽ nắng.' },
      { japanese: 'この つくえは きで つくりました。', vietnamese: 'Cái bàn này được làm bằng gỗ.' }
    ]
  },

  // ================= BÀI 22 =================
  {
    id: 'g-b22-1',
    level: 'N5',
    lesson: 22,
    order: 1,
    title: '1. Mệnh đề thể thông thường + Danh từ (Định ngữ)',
    structure: 'Mệnh đề (Thể thông thường) + Danh từ',
    meaning: 'Danh từ mà...',
    explanation: 'Trong tiếng Nhật, cả một mệnh đề bổ nghĩa luôn đặt ở TRƯỚC danh từ để giải thích, làm rõ danh từ đó (tương đương mệnh đề quan hệ). Mệnh đề luôn chia ở thể thông thường.',
    examples: [
      { japanese: 'これは わたしが かった ほんです。', vietnamese: 'Đây là quyển sách mà tôi đã mua.' },
      { japanese: 'あそこに いる ひとは たなかさんです。', vietnamese: 'Người đang ở đằng kia là anh Tanaka.' },
      { japanese: 'きのう みた えいがは おもしろかったです。', vietnamese: 'Bộ phim tôi xem hôm qua rất thú vị.' }
    ],
    notes: ['Chủ ngữ bên trong mệnh đề bổ nghĩa đi với trợ từ が (ví dụ: わたしが かった ほん), không dùng は.']
  },
  {
    id: 'g-b22-2',
    level: 'N5',
    lesson: 22,
    order: 2,
    title: '2. Các dạng bổ nghĩa cho danh từ',
    structure: 'Vる/Vた + N | Aい + N | Aな + な + N | N1 + の + N2',
    meaning: 'Quy tắc kết hợp khi bổ nghĩa danh từ',
    explanation: 'Động từ dùng Vる/Vた/Vない; Tính từ い giữ nguyên い; Tính từ な bắt buộc có な; Danh từ nối bằng の.',
    examples: [
      { japanese: 'にほんで はたらく ひと', vietnamese: 'Người làm việc ở Nhật.' },
      { japanese: 'しずかな まち', vietnamese: 'Thành phố yên tĩnh.' },
      { japanese: 'きのう やすみだった ひと', vietnamese: 'Người hôm qua được nghỉ.' }
    ]
  },

  // ================= BÀI 23 =================
  {
    id: 'g-b23-1',
    level: 'N5',
    lesson: 23,
    order: 1,
    title: '1. Vる／Vない + とき (Khi làm / không làm)',
    structure: 'Vる／Vない + とき',
    meaning: 'Khi làm V / Khi không làm V',
    explanation: 'とき có nghĩa là “khi, lúc”. Vる + とき diễn tả thời điểm trước hoặc trong khi hành động diễn ra.',
    examples: [
      { japanese: 'にほんへ いくとき、パスポートを もっていきます。', vietnamese: 'Khi đi Nhật, tôi mang theo hộ chiếu (chuẩn bị đi).' },
      { japanese: 'ねるとき、まどを しめます。', vietnamese: 'Khi đi ngủ, tôi đóng cửa sổ.' },
      { japanese: 'あさごはんを たべないとき、コーヒーを のみます。', vietnamese: 'Khi không ăn sáng, tôi uống cà phê.' }
    ]
  },
  {
    id: 'g-b23-2',
    level: 'N5',
    lesson: 23,
    order: 2,
    title: '2. Vた + とき (Sau khi đã hoàn tất)',
    structure: 'Vた + とき',
    meaning: 'Khi đã làm V xong',
    explanation: 'Nhấn mạnh hành động V đã được hoàn thành xong xuôi tại thời điểm được nói tới.',
    examples: [
      { japanese: 'にほんへ いったとき、すしを たべました。', vietnamese: 'Khi sang đến Nhật rồi, tôi đã ăn sushi.' },
      { japanese: 'うちへ かえったとき、でんわします。', vietnamese: 'Khi về đến nhà rồi, tôi sẽ gọi điện thoại.' }
    ],
    notes: ['So sánh: いくとき (khi đi - đang chuẩn bị hoặc trên đường) vs いったとき (khi đã đến nơi rồi).']
  },
  {
    id: 'g-b23-3',
    level: 'N5',
    lesson: 23,
    order: 3,
    title: '3. N のとき／Aな とき／Aい とき',
    structure: 'N + のとき / Aな + とき / Aい + とき',
    meaning: 'Khi là N / Khi có tính chất A',
    explanation: 'Kết hợp danh từ và tính từ với とき để chỉ thời kỳ, trạng thái hoặc hoàn cảnh.',
    examples: [
      { japanese: 'こどもの とき、よく かわで およぎました。', vietnamese: 'Khi còn là trẻ con, tôi thường bơi ở sông.' },
      { japanese: 'ひまな とき、ほんを よみます。', vietnamese: 'Khi rảnh rỗi, tôi đọc sách.' },
      { japanese: 'さむい とき、あたたかい おちゃを のみます。', vietnamese: 'Khi trời lạnh, tôi uống trà nóng.' }
    ]
  },
  {
    id: 'g-b23-4',
    level: 'N5',
    lesson: 23,
    order: 4,
    title: '4. Vると、～ (Điều kiện tất nhiên, quy luật tự nhiên)',
    structure: 'V thể từ điển + と、[Kết quả tự nhiên]',
    meaning: 'Hễ làm V thì sẽ dẫn đến kết quả...',
    explanation: 'Diễn tả mối quan hệ nhân quả tất yếu: hễ thực hiện hành động vế 1 thì vế 2 sẽ tự động xảy ra theo quy luật tự nhiên hoặc cơ chế máy móc.',
    examples: [
      { japanese: 'この ボタンを おすと、ドアが あきます。', vietnamese: 'Hễ bấm nút này thì cửa sẽ mở.' },
      { japanese: 'はるに なると、あたたかく なります。', vietnamese: 'Hễ sang mùa xuân thì trời sẽ ấm lên.' }
    ],
    notes: ['Vế sau của と tuyệt đối KHÔNG dùng cho câu mệnh lệnh, ý chí cá nhân, rủ rê hay xin phép.']
  },

  // ================= BÀI 24 =================
  {
    id: 'g-b24-1',
    level: 'N5',
    lesson: 24,
    order: 1,
    title: '1. Vてあげます (Làm việc gì cho người khác)',
    structure: 'Người nhận + に + Vてあげます',
    meaning: 'Tôi làm việc gì đó giúp cho ai',
    explanation: 'Người nói (hoặc người phía mình) làm một hành động có lợi cho người khác.',
    examples: [
      { japanese: 'ともだちに にほんごを おしえてあげました。', vietnamese: 'Tôi đã dạy tiếng Nhật cho bạn.' },
      { japanese: 'ははに りょうりを つくってあげます。', vietnamese: 'Tôi nấu ăn cho mẹ.' }
    ],
    notes: ['Tránh dùng trực tiếp Vてあげます với cấp trên hoặc người lớn tuổi hơn vì có thể mang sắc thái kể công, ban ơn.']
  },
  {
    id: 'g-b24-2',
    level: 'N5',
    lesson: 24,
    order: 2,
    title: '2. Vてくれます (Ai đó làm việc gì cho tôi)',
    structure: 'Người thực hiện + が + (わたしに) + Vてくれます',
    meaning: 'Ai đó làm giúp việc gì cho tôi',
    explanation: 'Người khác chủ động làm một việc tốt, có lợi cho người nói hoặc người trong gia đình người nói.',
    examples: [
      { japanese: 'ともだちが にほんごを おしえてくれました。', vietnamese: 'Bạn đã dạy tiếng Nhật cho tôi.' },
      { japanese: 'ははが おべんとうを つくってくれました。', vietnamese: 'Mẹ đã làm cơm hộp cho tôi.' }
    ]
  },
  {
    id: 'g-b24-3',
    level: 'N5',
    lesson: 24,
    order: 3,
    title: '3. Vてもらいます (Được ai làm giúp việc gì)',
    structure: 'Người làm giúp + に + Vてもらいます',
    meaning: 'Tôi được/nhờ ai làm giúp việc gì',
    explanation: 'Người nói là chủ ngữ, đón nhận sự giúp đỡ từ người khác hoặc chủ động nhờ cậy ai đó giúp mình.',
    examples: [
      { japanese: 'ともだちに にほんごを おしえてもらいました。', vietnamese: 'Tôi được bạn dạy tiếng Nhật cho.' },
      { japanese: 'せんせいに さくぶんを なおしてもらいました。', vietnamese: 'Tôi được thầy giáo sửa bài văn giúp.' }
    ]
  },
  {
    id: 'g-b24-4',
    level: 'N5',
    lesson: 24,
    order: 4,
    title: '4. Phân biệt あげます・くれます・もらいます',
    structure: 'Góc nhìn: Vてあげます (Tôi làm cho người) | Vてくれます (Người làm cho tôi) | Vてもらいます (Tôi nhận từ người)',
    meaning: 'Tổng kết bộ 3 cho - nhận hành động',
    explanation: 'Cùng một sự việc nhưng góc nhìn chủ ngữ và hướng lợi ích sẽ quyết định động từ cho - nhận phù hợp.',
    examples: [
      { japanese: 'わたしは ともだちに にほんごを おしえてあげました。', vietnamese: 'Tôi dạy tiếng Nhật cho bạn (Tôi là chủ ngữ làm cho bạn).' },
      { japanese: 'ともだちは わたしに にほんごを おしえてくれました。', vietnamese: 'Bạn dạy tiếng Nhật cho tôi (Bạn là chủ ngữ hướng về tôi).' },
      { japanese: 'わたしは ともだちに にほんごを おしえてもらいました。', vietnamese: 'Tôi được bạn dạy tiếng Nhật (Tôi là chủ ngữ nhận sự giúp đỡ).' }
    ]
  },

  // ================= BÀI 25 =================
  {
    id: 'g-b25-1',
    level: 'N5',
    lesson: 25,
    order: 1,
    title: '1. Vたら、～ (Điều kiện giả định “Nếu... thì...” / “Sau khi”)',
    structure: 'Vた + ら、[Kết quả]',
    meaning: 'Nếu ... thì ... / Sau khi làm V xong thì...',
    explanation: 'Dùng để diễn tả một điều kiện giả định (nếu A xảy ra thì B) hoặc diễn tả sự việc chắc chắn sẽ xảy ra trong tương lai (sau khi A xong thì làm B).',
    examples: [
      { japanese: 'あした あめが ふったら、うちに います。', vietnamese: 'Nếu ngày mai trời mưa, tôi sẽ ở nhà.' },
      { japanese: 'うちへ かえったら、でんわします。', vietnamese: 'Sau khi về đến nhà, tôi sẽ gọi điện.' }
    ]
  },
  {
    id: 'g-b25-2',
    level: 'N5',
    lesson: 25,
    order: 2,
    title: '2. Cách chia thể たら với Tính từ và Danh từ',
    structure: 'Aい → Aかったら / Aな → Aだったら / N → Nだったら',
    meaning: 'Nếu có tính chất A / Nếu là N',
    explanation: 'Lấy thể quá khứ thông thường (thể た) thêm ら: あつい → あつかったら; しずか → しずかだったら; がくせい → がくせいだったら.',
    examples: [
      { japanese: 'ひまだったら、いっしょに えいがを みませんか。', vietnamese: 'Nếu rảnh, bạn xem phim cùng tôi nhé?' },
      { japanese: 'やすかったら、かいます。', vietnamese: 'Nếu rẻ thì tôi sẽ mua.' }
    ]
  },
  {
    id: 'g-b25-3',
    level: 'N5',
    lesson: 25,
    order: 3,
    title: '3. ～ても、～ (Nhượng bộ: “Dù... thì vẫn...” / “Cho dù”)',
    structure: 'Vて + も / Aい (bỏ い) + くても / Aな & N + でも',
    meaning: 'Cho dù ... thì vẫn...',
    explanation: 'Diễn tả mối quan hệ nhượng bộ trái ngược với suy nghĩ thông thường: dù điều kiện vế 1 có xảy ra thì hành động ở vế 2 vẫn diễn ra không đổi.',
    examples: [
      { japanese: 'あめが ふっても、いきます。', vietnamese: 'Dù trời mưa, tôi vẫn đi.' },
      { japanese: 'たかくても、かいます。', vietnamese: 'Dù đắt, tôi vẫn mua.' },
      { japanese: 'にちようびでも、はたらきます。', vietnamese: 'Dù là Chủ nhật, tôi vẫn đi làm.' }
    ]
  },
  {
    id: 'g-b25-4',
    level: 'N5',
    lesson: 25,
    order: 4,
    title: '4. Phân biệt ～たら và ～ても',
    structure: '～たら (Nếu... thì...) vs ～ても (Dù... vẫn...)',
    meaning: 'Điều kiện thuận vs Điều kiện nhượng bộ',
    explanation: '～たら nêu điều kiện: nếu xảy ra thì sẽ kéo theo hành động. ～ても nhấn mạnh hành động không hề thay đổi bất chấp điều kiện xảy ra.',
    examples: [
      { japanese: 'あめが ふったら、いきません。', vietnamese: 'Nếu trời mưa thì tôi không đi.' },
      { japanese: 'あめが ふっても、いきます。', vietnamese: 'Dù trời có mưa thì tôi vẫn đi.' }
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
