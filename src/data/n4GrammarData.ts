import { GrammarItem } from '../types';

export interface N4VerbSummaryRow {
  form: string;
  group1: string;
  group2: string;
  group3: string;
}

export interface N4Group1SpecialRow {
  dict: string;
  potential: string;
  passive: string;
  causative: string;
}

export interface N4AdjSummaryRow {
  form: string;
  iAdj: string;
  naAdj: string;
}

export interface N4ConfusingPair {
  pair: string;
  coreDifference: string;
}

export const N4_GRAMMAR_DATA: GrammarItem[] = [
  // ================= BÀI 26 =================
  {
    id: 'g-b26-1',
    level: 'N4',
    lesson: 26,
    order: 1,
    title: '1. ～んです／～のです',
    structure: 'V thể thường (Vる / Vない / Vた / Vなかった) + んです\nAい + んです | Aな + なんです | N + なんです',
    meaning: 'Giải thích, trình bày nguyên nhân, đưa ra bối cảnh hoặc nhấn mạnh điều muốn giải thích',
    explanation:
      '～んです (dạng nói thông dụng) và ～のです (trang trọng hơn, thường gặp trong văn viết hoặc phát biểu) không đơn thuần là thêm một đuôi vào câu, mà thể hiện người nói đang đưa ra lời giải thích hoặc cho rằng có một bối cảnh cần được hiểu.',
    examples: [
      { japanese: 'どうしたんですか。', vietnamese: 'Có chuyện gì vậy?' },
      { japanese: '頭が痛いんです。', vietnamese: 'Tôi bị đau đầu đấy.' },
      { japanese: '日本語を勉強しているんです。', vietnamese: 'Tôi đang học tiếng Nhật.' },
      { japanese: '明日は休みなんです。', vietnamese: 'Ngày mai tôi được nghỉ đấy.' },
      { japanese: 'この町は静かなんです。', vietnamese: 'Thành phố này yên tĩnh đấy.' },
      { japanese: '雨が降っています。 vs 雨が降っているんです。', vietnamese: 'Trời đang mưa (thông báo sự việc) vs Trời đang mưa đấy (sắc thái giải thích, ví dụ lý do không thể ra ngoài).' },
    ],
    notes: [
      'Với danh từ (N) và tính từ な (Aな), bắt buộc phải có な trước の／んです (ví dụ: 休みなんです, 静かなんです).',
    ],
  },
  {
    id: 'g-b26-2',
    level: 'N4',
    lesson: 26,
    order: 2,
    title: '2. ～んですが、～',
    structure: 'V thể thường / Aい + んですが\nAな / N + なんですが',
    meaning: 'Đưa ra bối cảnh rồi tiếp tục hỏi, nhờ vả, xin lời khuyên hoặc mở đầu vấn đề',
    explanation:
      'Dùng ～んですが làm vế dẫn nhập nêu hoàn cảnh, lý do hoặc tình huống hiện tại để người nghe hiểu trước khi đưa ra câu hỏi, lời nhờ vả hay xin ý kiến.',
    examples: [
      { japanese: '駅へ行きたいんですが、道を教えていただけませんか。', vietnamese: 'Tôi muốn đến nhà ga, anh/chị có thể chỉ đường cho tôi được không?' },
      { japanese: 'パソコンが動かないんですが、どうしたらいいですか。', vietnamese: 'Máy tính không hoạt động, tôi nên làm thế nào?' },
      { japanese: 'ちょっとお願いがあるんですが。', vietnamese: 'Tôi có một việc muốn nhờ một chút...' },
    ],
  },
  {
    id: 'g-b26-3',
    level: 'N4',
    lesson: 26,
    order: 3,
    title: '3. ～ていただけませんか',
    structure: 'Vて + いただけませんか',
    meaning: 'Anh/chị có thể vui lòng làm gì giúp tôi được không?',
    explanation:
      'Cách nhờ vả rất lịch sự, thể hiện sự khiêm nhường và tôn trọng đối với người được nhờ.\nSo sánh mức độ lịch sự tăng dần:\n• ～てください: Hãy làm giúp tôi\n• ～てもらえませんか: Có thể làm giúp tôi không?\n• ～ていただけませんか: Có thể vui lòng làm giúp tôi không?',
    examples: [
      { japanese: 'もう一度説明していただけませんか。', vietnamese: 'Anh/chị có thể giải thích lại một lần nữa được không?' },
      { japanese: '名前を書いていただけませんか。', vietnamese: 'Anh/chị có thể viết tên giúp tôi được không?' },
    ],
  },
  {
    id: 'g-b26-4',
    level: 'N4',
    lesson: 26,
    order: 4,
    title: '4. ～たらいいですか',
    structure: 'Từ để hỏi + Vた + らいいですか',
    meaning: 'Tôi nên làm gì? Làm thế nào thì tốt?',
    explanation:
      'Dùng khi hỏi lời khuyên, xin chỉ dẫn hoặc tìm cách giải quyết một vấn đề cụ thể.',
    examples: [
      { japanese: 'どこで切符を買ったらいいですか。', vietnamese: 'Tôi nên mua vé ở đâu?' },
      { japanese: '何を持って行ったらいいですか。', vietnamese: 'Tôi nên mang theo thứ gì?' },
    ],
  },
  {
    id: 'g-b26-5',
    level: 'N4',
    lesson: 26,
    order: 5,
    title: '5. ～でしょうか',
    structure: 'V thể thường / Aい / Aな / N + でしょうか',
    meaning: 'Có lẽ...? Liệu có...? / Không biết có phải... không?',
    explanation:
      'Cách hỏi lịch sự, mềm mại và khách khí hơn ～ですか trong nhiều tình huống phỏng đoán hoặc hỏi thăm người khác.',
    examples: [
      { japanese: '明日は雨でしょうか。', vietnamese: 'Không biết ngày mai có mưa không?' },
      { japanese: '田中さんはいらっしゃるでしょうか。', vietnamese: 'Không biết anh Tanaka có ở đây không?' },
    ],
    notes: [
      'Phân biệt: 明日は雨でしょう (Có lẽ ngày mai trời mưa — phán đoán) vs 明日は雨でしょうか (Không biết ngày mai trời có mưa không? — câu hỏi mềm mại).',
    ],
  },

  // ================= BÀI 27 =================
  {
    id: 'g-b27-1',
    level: 'N4',
    lesson: 27,
    order: 1,
    title: '1. Thể khả năng (可能形)',
    structure: 'Nhóm I: đuôi う → え + る (書く → 書ける)\nNhóm II: bỏ る + られる (食べる → 食べられる)\nNhóm III: する → できる | 来る → 来られる（こられる）',
    meaning: 'Có thể làm gì, có khả năng hoặc điều kiện thực hiện hành động gì',
    explanation:
      'Quy tắc chia thể khả năng:\n• Nhóm I: 書く→書ける, 聞く→聞ける, 泳ぐ→泳げる, 話す→話せる, 待つ→待てる, 飲む→飲める, 遊ぶ→遊べる, 取る→取れる, 買う→買える\n• Nhóm II: 食べる→食べられる, 見る→見られる, 起きる→起きられる, 寝る→寝られる\n• Nhóm III: する→できる, 来る→来られる（こられる）\nTrợ từ: Đối tượng hành động thường chuyển từ を sang が; chủ thể vẫn có thể đi với は hoặc が tùy ngữ cảnh.',
    examples: [
      { japanese: '私は日本語を話します。 → 私は日本語が話せます。', vietnamese: 'Tôi nói tiếng Nhật. → Tôi có thể nói tiếng Nhật.' },
      { japanese: '魚を食べます。 → 魚が食べられます。', vietnamese: 'Ăn cá. → Có thể ăn cá.' },
    ],
    notes: [
      'Trong hội thoại, người Nhật đôi khi dùng dạng rút gọn bỏ ら (ら抜き言葉) như 食べれる／見れる. Đây là khẩu ngữ, không dùng làm chuẩn trong bài viết hay bài thi.',
      'Không nên hiểu rằng を tuyệt đối không được dùng với thể khả năng — trong tiếng Nhật thực tế, を vẫn xuất hiện trong một số cấu trúc và ngữ cảnh.',
    ],
  },
  {
    id: 'g-b27-2',
    level: 'N4',
    lesson: 27,
    order: 2,
    title: '2. 見えます và 聞こえます',
    structure: 'Đối tượng + が + 見えます / 聞こえます',
    meaning: 'Nhìn thấy (hiện ra trước mắt) / Nghe thấy (âm thanh lọt vào tai)',
    explanation:
      'Hai động từ diễn tả khả năng cảm nhận tự nhiên bằng mắt và tai, không phụ thuộc vào chủ ý hay phương tiện hỗ trợ.\nPhân biệt:\n• 見えます: Tự nhiên nhìn thấy, hình ảnh lọt vào tầm mắt vs 見られます: Có khả năng hoặc điều kiện để xem/nhìn.\n• 聞こえます: Âm thanh tự nhiên lọt vào tai vs 聞けます: Có khả năng hoặc điều kiện để nghe.',
    examples: [
      { japanese: 'ここから富士山が見えます。', vietnamese: 'Từ đây có thể nhìn thấy núi Phú Sĩ.' },
      { japanese: '隣の部屋から音楽が聞こえます。', vietnamese: 'Có thể nghe thấy nhạc từ phòng bên cạnh.' },
      { japanese: 'この映画はインターネットで見られます。', vietnamese: 'Bộ phim này có thể xem trên Internet.' },
      { japanese: '山が見えます。', vietnamese: 'Nhìn thấy núi.' },
      { japanese: 'このラジオで日本語のニュースが聞けます。', vietnamese: 'Có thể nghe tin tức tiếng Nhật trên chiếc radio này.' },
      { japanese: '外から鳥の声が聞こえます。', vietnamese: 'Nghe thấy tiếng chim từ bên ngoài.' },
    ],
  },
  {
    id: 'g-b27-3',
    level: 'N4',
    lesson: 27,
    order: 3,
    title: '3. できます',
    structure: 'N + が + できます',
    meaning: 'Có thể làm được / Hoàn thành, được tạo ra / Hình thành, xuất hiện',
    explanation:
      'Động từ できます có nhiều nghĩa tùy ngữ cảnh:\n• Có thể làm được (năng lực): 日本語ができます。\n• Hoàn thành, được tạo ra (công trình): 駅の前に新しい店ができました。\n• Hình thành, xuất hiện (mối quan hệ...): 友達ができました。',
    examples: [
      { japanese: '私は料理ができます。', vietnamese: 'Tôi biết nấu ăn.' },
      { japanese: '駅の前に大きなビルができました。', vietnamese: 'Một tòa nhà lớn đã được xây xong trước nhà ga.' },
      { japanese: '友達ができました。', vietnamese: 'Tôi đã có (kết thêm) bạn mới.' },
    ],
  },
  {
    id: 'g-b27-4',
    level: 'N4',
    lesson: 27,
    order: 4,
    title: '4. は／も với thể khả năng',
    structure: 'N + は / も + V (thể khả năng)',
    meaning: 'Đưa ra chủ đề, đối chiếu (は) / Cũng, thậm chí làm được (も)',
    explanation:
      'Trợ từ は dùng để nêu chủ đề hoặc đối chiếu hai vế tương phản; trợ từ も dùng để bổ sung thêm một khả năng tương tự (“cũng”).',
    examples: [
      { japanese: '日本語は話せますが、英語は話せません。', vietnamese: 'Tôi nói được tiếng Nhật nhưng không nói được tiếng Anh.' },
      { japanese: '漢字も読めます。', vietnamese: 'Tôi cũng đọc được Kanji.' },
    ],
  },
  {
    id: 'g-b27-5',
    level: 'N4',
    lesson: 27,
    order: 5,
    title: '5. しか～ない',
    structure: 'N + しか + Vない',
    meaning: 'Chỉ có..., ngoài ra không có gì khác (mang sắc thái ít hoặc không đủ)',
    explanation:
      'Diễn tả sự giới hạn với sắc thái ít ỏi, không đủ so với mong muốn. Điểm quan trọng nhất là しか luôn đi với vị ngữ phủ định (～ない / ～ません).',
    examples: [
      { japanese: '100円しかありません。', vietnamese: 'Tôi chỉ có 100 yên (không có thêm).' },
      { japanese: 'ひらがなしか読めません。', vietnamese: 'Tôi chỉ đọc được Hiragana.' },
      { japanese: '一人しか来ませんでした。', vietnamese: 'Chỉ có một người đến.' },
    ],
    notes: [
      'So sánh: 100円あります (Có 100 yên) vs 100円だけあります (Chỉ có 100 yên — trung tính) vs 100円しかありません (Chỉ có mỗi 100 yên, không đủ/ít ỏi).',
    ],
  },

  // ================= BÀI 28 =================
  {
    id: 'g-b28-1',
    level: 'N4',
    lesson: 28,
    order: 1,
    title: '1. ～ながら',
    structure: 'Vます (bỏ ます) + ながら + V chính',
    meaning: 'Vừa làm V1 vừa làm V2 (song song cùng lúc)',
    explanation:
      'Diễn tả hai hành động diễn ra đồng thời bởi cùng một chủ thể. Hành động đứng phía sau ながら là hành động chính của câu.',
    examples: [
      { japanese: '音楽を聞きながら勉強します。', vietnamese: 'Tôi vừa nghe nhạc vừa học.' },
      { japanese: 'ご飯を食べながらテレビを見ます。', vietnamese: 'Tôi vừa ăn cơm vừa xem TV.' },
    ],
    notes: [
      'Điều kiện bắt buộc: Hai hành động phải do cùng một chủ thể thực hiện.',
      'Ví dụ SAI: 私は音楽を聞きながら、弟は勉強します。(Không dùng được vì 2 chủ ngữ khác nhau).',
    ],
  },
  {
    id: 'g-b28-2',
    level: 'N4',
    lesson: 28,
    order: 2,
    title: '2. ～ています diễn tả thói quen',
    structure: 'Từ chỉ tần suất + Vています',
    meaning: 'Thường xuyên làm gì / Duy trì thói quen lặp lại đều đặn',
    explanation:
      'Ngoài diễn tả hành động đang diễn ra tại thời điểm nói, ～ています còn diễn tả hành động lặp đi lặp lại hoặc thói quen sinh hoạt hàng ngày.',
    examples: [
      { japanese: '毎朝ジョギングをしています。', vietnamese: 'Tôi chạy bộ mỗi sáng.' },
      { japanese: '毎日日本語を勉強しています。', vietnamese: 'Tôi học tiếng Nhật mỗi ngày.' },
    ],
    notes: [
      'So sánh: 今、勉強しています (Đang học ngay lúc này) vs 毎日、勉強しています (Đang duy trì việc học mỗi ngày).',
    ],
  },
  {
    id: 'g-b28-3',
    level: 'N4',
    lesson: 28,
    order: 3,
    title: '3. ～し、～し',
    structure: 'V thể thường / Aい + し\nAな / N + だ + し',
    meaning: 'Vừa..., vừa...; bởi vì có nhiều lý do... (liệt kê đặc điểm hoặc lý do)',
    explanation:
      'Dùng để liệt kê các tính chất tương đồng hoặc nhiều nguyên nhân, lý do dẫn đến một nhận xét hay quyết định ở cuối câu.',
    examples: [
      { japanese: 'この店は安いし、おいしいし、よく来ます。', vietnamese: 'Quán này vừa rẻ vừa ngon nên tôi thường đến.' },
      { japanese: '田中さんは親切だし、頭もいいです。', vietnamese: 'Anh Tanaka vừa tốt bụng vừa thông minh.' },
      { japanese: '雨も降っているし、今日は出かけません。', vietnamese: 'Trời lại còn đang mưa nên hôm nay tôi không ra ngoài.' },
    ],
    notes: [
      'Có thể chỉ dùng một し để nêu một lý do tiêu biểu và ngầm hiểu còn các lý do khác nữa.',
    ],
  },
  {
    id: 'g-b28-4',
    level: 'N4',
    lesson: 28,
    order: 4,
    title: '4. それに và それで',
    structure: 'Câu 1。それに、Câu 2 | Câu 1。それで、Câu 2',
    meaning: 'それに: Hơn nữa, thêm vào đó | それで: Vì thế, do đó',
    explanation:
      'Hai từ nối quan trọng trong đoạn văn và hội thoại:\n• それに: Bổ sung thêm thông tin cùng chiều với câu trước.\n• それで: Chỉ kết quả hoặc diễn biến tiếp theo từ nguyên nhân ở câu trước.',
    examples: [
      { japanese: 'この店は安いです。それに、おいしいです。', vietnamese: 'Quán này rẻ. Hơn nữa, còn ngon.' },
      { japanese: '熱がありました。それで、学校を休みました。', vietnamese: 'Tôi bị sốt. Vì thế tôi nghỉ học.' },
    ],
  },

  // ================= BÀI 29 =================
  {
    id: 'g-b29-1',
    level: 'N4',
    lesson: 29,
    order: 1,
    title: '1. Tự động từ + ～ています',
    structure: 'N が + V (tự động từ) ています',
    meaning: 'Diễn tả trạng thái hiện tại là kết quả của một sự việc đã xảy ra',
    explanation:
      'Không nhất thiết hành động đang diễn ra ngay lúc nói, mà nhấn mạnh trạng thái đang tồn tại trước mắt sau khi biến đổi đã hoàn tất.',
    examples: [
      { japanese: 'ドアが開いています。', vietnamese: 'Cửa đang mở.' },
      { japanese: '電気が消えています。', vietnamese: 'Đèn đang tắt.' },
      { japanese: '窓が閉まっています。', vietnamese: 'Cửa sổ đang đóng.' },
    ],
  },
  {
    id: 'g-b29-2',
    level: 'N4',
    lesson: 29,
    order: 2,
    title: '2. Tự động từ và Tha động từ',
    structure: 'Tha động từ (người tác động + を) vs Tự động từ (trạng thái sự vật + が)',
    meaning: 'Phân biệt cặp động từ tác động có chủ ý và động từ tự biến đổi trạng thái',
    explanation:
      'Các cặp phổ biến cần nhớ (Tha động từ ↔ Tự động từ):\n• 開ける ↔ 開く (mở)\n• 閉める ↔ 閉まる (đóng)\n• 消す ↔ 消える (tắt)\n• 壊す ↔ 壊れる (làm hỏng / bị hỏng)\n• 落とす ↔ 落ちる (làm rơi / rơi)\n• 始める ↔ 始まる (bắt đầu)',
    examples: [
      { japanese: '私がドアを開けました。', vietnamese: 'Tôi đã mở cửa (Tha động từ).' },
      { japanese: 'ドアが開きました。', vietnamese: 'Cửa đã mở (Tự động từ).' },
      { japanese: 'ドアが開いています。', vietnamese: 'Cửa đang mở (Trạng thái kết quả).' },
    ],
    notes: [
      'Tha động từ: chủ thể tác động lên đối tượng, thường đi với trợ từ を.',
      'Tự động từ: mô tả sự thay đổi/trạng thái của sự vật, thường đi với trợ từ が. Đây là xu hướng phổ biến chứ không phải quy tắc tuyệt đối cho mọi động từ.',
    ],
  },
  {
    id: 'g-b29-3',
    level: 'N4',
    lesson: 29,
    order: 3,
    title: '3. ～てしまいます (～ちゃう／～じゃう)',
    structure: 'Vて + しまいます\nKhẩu ngữ: ～てしまう → ～ちゃう | ～でしまう → ～じゃう',
    meaning: 'A. Hoàn thành hoàn toàn hành động | B. Lỡ làm gì ngoài ý muốn, gây tiếc nuối',
    explanation:
      'Mẫu câu có 2 sắc thái sử dụng chính:\nA. Hoàn thành dứt điểm toàn bộ một hành động.\nB. Hành động xảy ra ngoài ý muốn, gây hối tiếc hoặc lỡ mất.',
    examples: [
      { japanese: '宿題を全部してしまいました。', vietnamese: 'Tôi đã làm xong toàn bộ bài tập.' },
      { japanese: 'この本を読んでしまいました。', vietnamese: 'Tôi đã đọc xong cuốn sách này.' },
      { japanese: '財布をなくしてしまいました。', vietnamese: 'Tôi lỡ làm mất ví rồi.' },
      { japanese: 'ケーキを全部食べてしまいました。', vietnamese: 'Tôi lỡ ăn hết bánh mất rồi.' },
      { japanese: '食べてしまった → 食べちゃった。 / 飲んでしまった → 飲んじゃった。', vietnamese: 'Lỡ ăn mất rồi / Lỡ uống mất rồi (dạng khẩu ngữ).' },
    ],
    notes: [
      'Dạng rút gọn ～ちゃう／～じゃう mang tính khẩu ngữ, không nên dùng trong văn viết trang trọng.',
    ],
  },

  // ================= BÀI 30 =================
  {
    id: 'g-b30-1',
    level: 'N4',
    lesson: 30,
    order: 1,
    title: '1. ～てあります',
    structure: 'N が + V (tha động từ) て + あります',
    meaning: 'Sự vật đang ở trạng thái được ai đó thực hiện sẵn có chủ ý trước đó',
    explanation:
      'Nhấn mạnh trạng thái kết quả đang tồn tại của sự vật do có người chủ động chuẩn bị trước. Lưu ý: tuy dùng tha động từ nhưng đối tượng đi kèm chuyển sang trợ từ が.',
    examples: [
      { japanese: '壁にカレンダーが掛けてあります。', vietnamese: 'Trên tường có treo sẵn lịch.' },
      { japanese: '机の上に資料が置いてあります。', vietnamese: 'Tài liệu đã được đặt sẵn trên bàn.' },
      { japanese: '窓が開けてあります。', vietnamese: 'Cửa sổ đã được mở sẵn.' },
    ],
  },
  {
    id: 'g-b30-2',
    level: 'N4',
    lesson: 30,
    order: 2,
    title: '2. ～ておきます (～とく／～どく)',
    structure: 'Vて + おきます\nKhẩu ngữ: ～ておく → ～とく | ～でおく → ～どく (買っておく → 買っとく)',
    meaning: 'Làm trước, chuẩn bị trước hoặc giữ nguyên trạng thái cho mục đích sau này',
    explanation:
      'Ba cách dùng quan trọng của ～ておきます:\nA. Chuẩn bị trước cho một sự kiện sắp tới.\nB. Làm trước một việc cần thiết trước khi sự việc diễn ra.\nC. Cứ giữ nguyên trạng thái hiện tại để dùng tiếp.',
    examples: [
      { japanese: '旅行の前にホテルを予約しておきます。', vietnamese: 'Tôi sẽ đặt khách sạn trước chuyến đi.' },
      { japanese: '会議の前に資料をコピーしておきます。', vietnamese: 'Tôi sẽ photocopy tài liệu trước cuộc họp.' },
      { japanese: '窓を開けておいてください。', vietnamese: 'Hãy cứ để cửa sổ mở nhé.' },
    ],
  },
  {
    id: 'g-b30-3',
    level: 'N4',
    lesson: 30,
    order: 3,
    title: '3. Phân biệt ～ています／～てあります／～ておきます',
    structure: 'V (tự) ています vs V (tha) てあります vs V (tha) ておきます',
    meaning: 'Phân biệt trạng thái tự nhiên – trạng thái chuẩn bị sẵn – hành động chuẩn bị trước',
    explanation:
      'Đây là nhóm ngữ pháp trọng tâm của N4 cần phân biệt rõ trọng tâm:\n• ドアが開いています: Trạng thái cửa đang mở (tự động từ).\n• ドアが開けてあります: Cửa được ai đó mở sẵn có chủ ý (tha động từ).\n• ドアを開けておきます: Chủ động mở cửa trước hoặc giữ cửa mở cho việc sau.',
    examples: [
      { japanese: 'ドアが開いています。', vietnamese: 'Cửa đang mở (miêu tả trạng thái trước mắt).' },
      { japanese: 'ドアが開けてあります。', vietnamese: 'Cửa đã được mở sẵn (ai đó mở sẵn có mục đích).' },
      { japanese: 'ドアを開けておきます。', vietnamese: 'Tôi mở sẵn cửa trước / cứ để cửa mở.' },
    ],
  },

  // ================= BÀI 31 =================
  {
    id: 'g-b31-1',
    level: 'N4',
    lesson: 31,
    order: 1,
    title: '1. Thể ý chí (意向形)',
    structure: 'Nhóm I: đuôi う → お + う (書く → 書こう)\nNhóm II: bỏ る + よう (食べる → 食べよう)\nNhóm III: する → しよう | 来る → 来よう（こよう）',
    meaning: 'Rủ rê thân mật, quyết tâm hoặc tự nhủ sẽ làm gì',
    explanation:
      'Cách chia thể ý chí:\n• Nhóm I: 書く→書こう, 聞く→聞こう, 泳ぐ→泳ごう, 話す→話そう, 待つ→待とう, 飲む→飲もう, 遊ぶ→遊ぼう, 取る→取ろう, 買う→買おう\n• Nhóm II: 食べる→食べよう, 見る→見よう, 起きる→起きよう\n• Nhóm III: する→しよう, 来る→来よう（こよう）',
    examples: [
      { japanese: 'いっしょに食べよう。', vietnamese: 'Cùng ăn nào! (thân mật)' },
      { japanese: '今日から毎日運動しよう。', vietnamese: 'Từ hôm nay mình sẽ tập thể dục mỗi ngày.' },
    ],
  },
  {
    id: 'g-b31-2',
    level: 'N4',
    lesson: 31,
    order: 2,
    title: '2. ～ようと思っています',
    structure: 'V (thể ý chí) + と思っています',
    meaning: 'Đang có ý định sẽ làm gì (ý định đã hình thành và đang duy trì)',
    explanation:
      'Diễn tả dự định hoặc ý hướng đã nảy sinh trong suy nghĩ của người nói và vẫn đang được giữ cho tới hiện tại.',
    examples: [
      { japanese: '日本へ留学しようと思っています。', vietnamese: 'Tôi đang có ý định đi du học Nhật Bản.' },
      { japanese: '来年、JLPTを受けようと思っています。', vietnamese: 'Tôi đang dự định thi JLPT vào năm sau.' },
    ],
  },
  {
    id: 'g-b31-3',
    level: 'N4',
    lesson: 31,
    order: 3,
    title: '3. ～つもりです',
    structure: 'Vる / Vない + つもりです',
    meaning: 'Dự định, có ý định chắc chắn làm hoặc không làm gì',
    explanation:
      'Thể hiện dự định cá nhân tương đối rõ ràng và chắc chắn, không chỉ là ý nghĩ thoáng qua.',
    examples: [
      { japanese: '来年、日本へ行くつもりです。', vietnamese: 'Tôi dự định năm sau đi Nhật.' },
      { japanese: '今日は出かけないつもりです。', vietnamese: 'Hôm nay tôi dự định không ra ngoài.' },
    ],
  },
  {
    id: 'g-b31-4',
    level: 'N4',
    lesson: 31,
    order: 4,
    title: '4. ～予定です',
    structure: 'Vる / Vない + 予定です | N の + 予定です',
    meaning: 'Có lịch trình, kế hoạch dự kiến',
    explanation:
      'Diễn tả lịch trình, kế hoạch đã được lên sẵn (của cá nhân hoặc tổ chức).\nSo sánh 3 mẫu ý định:\n• ～ようと思っています: Đang nghĩ đến việc làm\n• ～つもりです: Có ý định cá nhân rõ ràng\n• ～予定です: Có kế hoạch/lịch trình dự kiến',
    examples: [
      { japanese: '来月、日本へ行く予定です。', vietnamese: 'Tôi dự kiến tháng sau sẽ đi Nhật.' },
      { japanese: '会議は3時に始まる予定です。', vietnamese: 'Cuộc họp dự kiến bắt đầu lúc 3 giờ.' },
      { japanese: '明日は試験の予定です。', vietnamese: 'Ngày mai dự kiến có kỳ thi.' },
    ],
  },
  {
    id: 'g-b31-5',
    level: 'N4',
    lesson: 31,
    order: 5,
    title: '5. ～ことにします／～ことになります',
    structure: 'Vる / Vない + ことにします / ことになります\nThói quen/quy định: Vる / Vない + ことにしています / ことになっています',
    meaning: 'Tự mình quyết định (ことにします) vs Được quyết định / quy định (ことになります)',
    explanation:
      'A. ～ことにします: Bản thân chủ động đưa ra quyết định.\nB. ～ことになります: Kết quả khách quan, được cấp trên/tổ chức quyết định.\nC. ～ことにしています: Tự đặt ra quy tắc cá nhân và duy trì làm.\nD. ～ことになっています: Quy định, lịch trình hoặc quyết định chung đã thiết lập.',
    examples: [
      { japanese: '毎日、日本語を勉強することにしました。', vietnamese: 'Tôi đã quyết định học tiếng Nhật mỗi ngày.' },
      { japanese: '来月、日本へ出張することになりました。', vietnamese: 'Tôi đã được quyết định sẽ đi công tác Nhật vào tháng sau.' },
      { japanese: '毎日、漢字を10個覚えることにしています。', vietnamese: 'Tôi đặt ra quy tắc học thuộc 10 chữ Kanji mỗi ngày.' },
      { japanese: 'ここでは靴を脱ぐことになっています。', vietnamese: 'Ở đây có quy định phải cởi giày.' },
    ],
  },

  // ================= BÀI 32 =================
  {
    id: 'g-b32-1',
    level: 'N4',
    lesson: 32,
    order: 1,
    title: '1. ～たほうがいいです',
    structure: 'Vた + ほうがいいです',
    meaning: 'Nên làm gì (đưa ra lời khuyên)',
    explanation:
      'Dùng thể quá khứ Vた kết hợp với ほうがいいです để khuyên ai đó nên thực hiện một hành động nào đó sẽ tốt hơn.',
    examples: [
      { japanese: '早く寝たほうがいいです。', vietnamese: 'Bạn nên ngủ sớm.' },
      { japanese: '病院へ行ったほうがいいです。', vietnamese: 'Bạn nên đến bệnh viện.' },
    ],
  },
  {
    id: 'g-b32-2',
    level: 'N4',
    lesson: 32,
    order: 2,
    title: '2. ～ないほうがいいです',
    structure: 'Vない + ほうがいいです',
    meaning: 'Không nên làm gì (khuyên can)',
    explanation:
      'Dùng thể phủ định Vない kết hợp với ほうがいいです để khuyên ai đó không nên làm một việc gì.',
    examples: [
      { japanese: 'お酒を飲まないほうがいいです。', vietnamese: 'Bạn không nên uống rượu.' },
      { japanese: '夜遅くまで起きないほうがいいです。', vietnamese: 'Bạn không nên thức khuya.' },
    ],
    notes: [
      '～たほうがいい và ～ないほうがいい thường mang sắc thái khá trực tiếp. Với người trên hoặc người không thân, nên cân nhắc cách diễn đạt mềm hơn.',
    ],
  },
  {
    id: 'g-b32-3',
    level: 'N4',
    lesson: 32,
    order: 3,
    title: '3. ～でしょう',
    structure: 'V thể thường / Aい / Aな / N + でしょう',
    meaning: 'Có lẽ, chắc là (dự đoán có cơ sở)',
    explanation:
      'Diễn tả sự suy đoán của người nói dựa trên thông tin hoặc cơ sở nhất định, với mức độ tin tưởng khá cao.',
    examples: [
      { japanese: '明日は雨が降るでしょう。', vietnamese: 'Ngày mai có lẽ trời sẽ mưa.' },
      { japanese: '彼はもう帰ったでしょう。', vietnamese: 'Chắc anh ấy đã về rồi.' },
    ],
  },
  {
    id: 'g-b32-4',
    level: 'N4',
    lesson: 32,
    order: 4,
    title: '4. ～かもしれません',
    structure: 'V thể thường / Aい / Aな / N + かもしれません',
    meaning: 'Có thể, biết đâu, có lẽ (khả năng chưa chắc chắn)',
    explanation:
      'Nêu lên một khả năng có thể xảy ra nhưng người nói chưa chắc chắn.',
    examples: [
      { japanese: '明日は雨かもしれません。', vietnamese: 'Ngày mai có thể trời mưa.' },
      { japanese: '彼は来ないかもしれません。', vietnamese: 'Có thể anh ấy sẽ không đến.' },
    ],
    notes: [
      'So sánh: ～でしょう (người nói nghiêng về dự đoán đó hơn) vs ～かもしれません (chỉ nêu một khả năng, chưa chắc chắn). Đây là khác biệt sắc thái, không phải tỷ lệ phần trăm cứng nhắc.',
    ],
  },

  // ================= BÀI 33 =================
  {
    id: 'g-b33-1',
    level: 'N4',
    lesson: 33,
    order: 1,
    title: '1. Thể mệnh lệnh (命令形)',
    structure: 'Nhóm I: đuôi う → え (書く → 書け)\nNhóm II: bỏ る + ろ (食べる → 食べろ)\nNhóm III: する → しろ | 来る → 来い（こい）',
    meaning: 'Ra lệnh mạnh mẽ (khẩu lệnh, biển báo, khẩn cấp hoặc lời nói thô)',
    explanation:
      'Cách chia thể mệnh lệnh:\n• Nhóm I: 書く→書け, 急ぐ→急げ, 話す→話せ, 待つ→待て, 飲む→飲め, 遊ぶ→遊べ, 取る→取れ, 買う→買え\n• Nhóm II: 食べる→食べろ, 見る→見ろ, 起きる→起きろ\n• Nhóm III: する→しろ, 来る→来い（こい）',
    examples: [
      { japanese: '早く書け！', vietnamese: 'Viết nhanh lên!' },
      { japanese: 'こっちへ来い！', vietnamese: 'Lại đây!' },
    ],
    notes: [
      'Thể mệnh lệnh rất mạnh và thô, thường chỉ gặp trong tình huống khẩn cấp, cổ vũ thể thao, biển báo hoặc cấp trên thân mật; không dùng trong giao tiếp lịch sự.',
    ],
  },
  {
    id: 'g-b33-2',
    level: 'N4',
    lesson: 33,
    order: 2,
    title: '2. Thể cấm đoán (Vる + な)',
    structure: 'Vる + な',
    meaning: 'Cấm, không được làm gì!',
    explanation:
      'Dùng thể từ điển Vる thêm な ở cuối để cấm đoán trực tiếp, thường thấy trên biển cảnh báo hoặc trong tình huống khẩn cấp.',
    examples: [
      { japanese: '入るな。', vietnamese: 'Không được vào!' },
      { japanese: 'ここで写真を撮るな。', vietnamese: 'Không được chụp ảnh ở đây!' },
    ],
    notes: [
      'Không dùng tùy tiện với người lớn tuổi hoặc cấp trên vì sắc thái rất thô.',
    ],
  },
  {
    id: 'g-b33-3',
    level: 'N4',
    lesson: 33,
    order: 3,
    title: '3. ～と書いてあります／～と読みます',
    structure: '「Chữ/Từ」+ と書いてあります / と読みます',
    meaning: 'Được viết là... / Được đọc là...',
    explanation:
      'Dùng để giải thích nội dung chữ viết trên biển hiệu, giấy tờ hoặc cách đọc của chữ Kanji/từ ngữ.',
    examples: [
      { japanese: 'ここに「禁煙」と書いてあります。', vietnamese: 'Ở đây có viết chữ “cấm hút thuốc”.' },
      { japanese: 'この漢字は「日本」と書いて、「にほん」と読みます。', vietnamese: 'Chữ Kanji này được viết là 日本 và đọc là にほん.' },
    ],
  },
  {
    id: 'g-b33-4',
    level: 'N4',
    lesson: 33,
    order: 4,
    title: '4. ～という意味です',
    structure: '「Cụm từ」は + Nội dung giải thích + という意味です',
    meaning: 'Có nghĩa là...',
    explanation:
      'Dùng để định nghĩa hoặc giải thích ý nghĩa của một từ vựng, ký hiệu hoặc biển báo.',
    examples: [
      { japanese: '「禁煙」はたばこを吸ってはいけないという意味です。', vietnamese: '“Cấm hút thuốc” có nghĩa là không được hút thuốc.' },
    ],
  },
  {
    id: 'g-b33-5',
    level: 'N4',
    lesson: 33,
    order: 5,
    title: '5. ～と言っていました',
    structure: 'Người nói + は + Câu thể thường + と言っていました',
    meaning: 'Ai đó đã nói rằng... (trích dẫn gián tiếp)',
    explanation:
      'Truyền đạt lại lời nói của một người thứ ba cho người nghe, dùng thể thường trước と.',
    examples: [
      { japanese: '田中さんは明日来ると言っていました。', vietnamese: 'Anh Tanaka đã nói rằng ngày mai sẽ đến.' },
    ],
  },
  {
    id: 'g-b33-6',
    level: 'N4',
    lesson: 33,
    order: 6,
    title: '6. ～と伝えていただけませんか',
    structure: 'Người nhận lời + に + Nội dung (thể thường) + と伝えていただけませんか',
    meaning: 'Anh/chị có thể chuyển lời rằng... giúp tôi được không?',
    explanation:
      'Mẫu câu nhờ người khác nhắn lại hoặc chuyển lời giùm một cách lịch sự.',
    examples: [
      { japanese: '田中さんに、明日は休むと伝えていただけませんか。', vietnamese: 'Anh/chị có thể chuyển lời với anh Tanaka rằng ngày mai tôi nghỉ được không?' },
    ],
  },

  // ================= BÀI 34 =================
  {
    id: 'g-b34-1',
    level: 'N4',
    lesson: 34,
    order: 1,
    title: '1. ～とおりに',
    structure: 'Vる / Vた + とおりに | N の + とおりに',
    meaning: 'Theo đúng như..., làm giống như...',
    explanation:
      'Diễn tả hành động vế sau được thực hiện khớp hoàn toàn theo chỉ dẫn, lời nói hoặc nội dung đã mô tả ở vế trước.',
    examples: [
      { japanese: '説明書に書いてあるとおりに使ってください。', vietnamese: 'Hãy sử dụng theo đúng như hướng dẫn.' },
      { japanese: '私が言ったとおりにしてください。', vietnamese: 'Hãy làm đúng như tôi đã nói.' },
      { japanese: '説明書のとおりに組み立てました。', vietnamese: 'Tôi đã lắp ráp theo đúng hướng dẫn.' },
    ],
  },
  {
    id: 'g-b34-2',
    level: 'N4',
    lesson: 34,
    order: 2,
    title: '2. ～あとで',
    structure: 'Vた + あとで | N の + あとで',
    meaning: 'Sau khi làm gì / Sau N',
    explanation:
      'Diễn tả trình tự thời gian: hành động hoặc sự việc vế sau diễn ra sau khi hành động/danh từ ở vế trước kết thúc. Lưu ý luôn dùng thể quá khứ Vた.',
    examples: [
      { japanese: 'ご飯を食べたあとで、勉強します。', vietnamese: 'Sau khi ăn cơm, tôi học bài.' },
      { japanese: '仕事のあとで、友達に会います。', vietnamese: 'Sau giờ làm, tôi gặp bạn.' },
    ],
  },
  {
    id: 'g-b34-3',
    level: 'N4',
    lesson: 34,
    order: 3,
    title: '3. ～ないで (và phân biệt với ～なくて)',
    structure: 'Vない (bỏ い) + で → Vないで',
    meaning: 'Không làm A mà làm B (thực hiện B trong trạng thái không làm A)',
    explanation:
      'Diễn tả việc thực hiện hành động B mà không thực hiện hành động A kèm theo (hoặc thay cho A).',
    examples: [
      { japanese: '朝ご飯を食べないで学校へ行きました。', vietnamese: 'Tôi đã đi học mà không ăn sáng.' },
      { japanese: '傘を持たないで出かけました。', vietnamese: 'Tôi đã ra ngoài mà không mang ô.' },
      { japanese: '朝ご飯を食べなくて、お腹がすきました。', vietnamese: 'Vì không ăn sáng nên tôi đói (dùng ～なくて chỉ nguyên nhân).' },
    ],
    notes: [
      'Phân biệt ～ないで vs ～なくて: ～ないで nhấn mạnh việc không làm hành động A rồi làm B; ～なくて diễn tả nguyên nhân hoặc trạng thái không có/không làm A dẫn tới hệ quả.',
    ],
  },

  // ================= BÀI 35 =================
  {
    id: 'g-b35-1',
    level: 'N4',
    lesson: 35,
    order: 1,
    title: '1. Điều kiện ～ば',
    structure: 'Nhóm I: đuôi う → え + ば (書く → 書けば)\nNhóm II: bỏ る + れば (食べる → 食べれば)\nNhóm III: する → すれば | 来る → 来れば（くれば）\nAい → Aければ (安い → 安ければ) | Aな / N + なら（ば）',
    meaning: 'Nếu..., thì... (nêu điều kiện giả định)',
    explanation:
      'Cách chia thể điều kiện ～ば:\n• Nhóm I: 書く→書けば, 聞く→聞けば, 泳ぐ→泳げば, 話す→話せば, 待つ→待てば, 飲む→飲めば, 遊ぶ→遊べば, 取る→取れば, 買う→買えば\n• Nhóm II: 食べる→食べれば, 見る→見れば\n• Nhóm III: する→すれば, 来る→来れば\n• Aい: 安い→安ければ, 高い→高ければ\n• Aな/N: 静かなら（ば）, 学生なら（ば）',
    examples: [
      { japanese: '時間があれば、映画を見ます。', vietnamese: 'Nếu có thời gian, tôi sẽ xem phim.' },
      { japanese: '安ければ、買います。', vietnamese: 'Nếu rẻ thì tôi mua.' },
    ],
  },
  {
    id: 'g-b35-2',
    level: 'N4',
    lesson: 35,
    order: 2,
    title: '2. ～なら',
    structure: 'N / Aな + なら | V / Aい (thể thường) + なら',
    meaning: 'Nếu là..., nếu nói về..., nếu xét đến...',
    explanation:
      '～なら thường dùng khi tiếp nhận một chủ đề, mong muốn hoặc thông tin từ ngữ cảnh/người đối thoại rồi đưa ra lời khuyên, ý kiến hoặc điều kiện liên quan.',
    examples: [
      { japanese: '日本へ行くなら、京都へ行きたいです。', vietnamese: 'Nếu đi Nhật thì tôi muốn đến Kyoto.' },
      { japanese: '車なら、ここに止められます。', vietnamese: 'Nếu là ô tô thì có thể đỗ ở đây.' },
    ],
  },
  {
    id: 'g-b35-3',
    level: 'N4',
    lesson: 35,
    order: 3,
    title: '3. ～ばいいです',
    structure: 'Vば + いいです',
    meaning: 'Chỉ cần..., nên..., làm thế nào thì tốt?',
    explanation:
      'Dùng để hỏi cách làm nên làm gì (～ばいいですか) hoặc đưa ra gợi ý đơn giản, nhẹ nhàng rằng chỉ cần làm vậy là được.',
    examples: [
      { japanese: 'どうすればいいですか。', vietnamese: 'Tôi nên làm thế nào?' },
      { japanese: '駅で聞けばいいです。', vietnamese: 'Bạn chỉ cần hỏi ở nhà ga.' },
    ],
  },
  {
    id: 'g-b35-4',
    level: 'N4',
    lesson: 35,
    order: 4,
    title: '4. ～ても',
    structure: 'Vて + も | Aい → Aくても | Aな / N + でも',
    meaning: 'Dù có... thì vẫn... (nhượng bộ)',
    explanation:
      'Diễn tả điều kiện nhượng bộ: cho dù vế trước có xảy ra hoặc mang tính chất nào đi nữa thì kết quả ở vế sau vẫn không thay đổi.',
    examples: [
      { japanese: '雨が降っても、行きます。', vietnamese: 'Dù trời mưa tôi vẫn đi.' },
      { japanese: '高くても、買います。', vietnamese: 'Dù đắt tôi vẫn mua.' },
      { japanese: '静かでも、勉強できません。', vietnamese: 'Dù yên tĩnh tôi vẫn không thể học.' },
    ],
  },
  {
    id: 'g-b35-5',
    level: 'N4',
    lesson: 35,
    order: 5,
    title: '5. Phân biệt と／ば／たら／なら',
    structure: 'と (quy luật) vs ば (điều kiện) vs たら (giả định/thời điểm) vs なら (tiếp nhận chủ đề)',
    meaning: 'Phân biệt 4 mẫu điều kiện cốt lõi trong tiếng Nhật',
    explanation:
      '• と: Kết quả tự nhiên, quy luật tất yếu, thao tác máy móc.\n• ば: Điều kiện chung (nếu có A thì B).\n• たら: Phạm vi sử dụng rộng nhất (nếu xảy ra hoặc sau khi A xong thì B).\n• なら: Tiếp nhận chủ đề/thông tin để gợi ý, khuyên nhủ.',
    examples: [
      { japanese: '春になると、桜が咲きます。', vietnamese: 'Cứ đến mùa xuân là hoa anh đào nở.' },
      { japanese: '時間があれば、行きます。', vietnamese: 'Nếu có thời gian, tôi sẽ đi.' },
      { japanese: '家に帰ったら、電話します。', vietnamese: 'Sau khi về nhà, tôi sẽ gọi điện.' },
      { japanese: '日本へ行くなら、京都がおすすめです。', vietnamese: 'Nếu đi Nhật thì tôi đề xuất Kyoto.' },
    ],
    notes: [
      'Bẫy: Không thể thay thế 4 mẫu này cho nhau tùy tiện; phải xét câu diễn tả quy luật, điều kiện, thời điểm hay lời khuyên dựa trên chủ đề.',
    ],
  },

  // ================= BÀI 36 =================
  {
    id: 'g-b36-1',
    level: 'N4',
    lesson: 36,
    order: 1,
    title: '1. ～ように',
    structure: 'Vる / Vない / V (thể khả năng) + ように',
    meaning: 'Để có thể..., để sao cho... (mục đích hướng tới trạng thái)',
    explanation:
      'Thường dùng với động từ thể khả năng, động từ phủ định hoặc động từ biểu thị trạng thái nhằm chỉ mục tiêu hướng tới.',
    examples: [
      { japanese: '日本語が話せるように、毎日練習しています。', vietnamese: 'Tôi luyện tập mỗi ngày để có thể nói tiếng Nhật.' },
      { japanese: '忘れないように、メモします。', vietnamese: 'Tôi ghi chú để không quên.' },
    ],
  },
  {
    id: 'g-b36-2',
    level: 'N4',
    lesson: 36,
    order: 2,
    title: '2. ～ようになります',
    structure: 'Vる / Vない / V (thể khả năng) + ようになります',
    meaning: 'Trở nên có thể, dần hình thành khả năng hoặc thay đổi trạng thái',
    explanation:
      'Diễn tả sự chuyển biến từ trạng thái “chưa thể / chưa làm” sang “có thể / làm được” (hoặc ngược lại) qua một quá trình.',
    examples: [
      { japanese: '日本語が話せるようになりました。', vietnamese: 'Tôi đã có thể nói tiếng Nhật.' },
      { japanese: '漢字が読めるようになりました。', vietnamese: 'Tôi đã có thể đọc Kanji.' },
      { japanese: '甘い物を食べないようになりました。', vietnamese: 'Tôi đã dần không còn ăn đồ ngọt.' },
    ],
  },
  {
    id: 'g-b36-3',
    level: 'N4',
    lesson: 36,
    order: 3,
    title: '3. ～ようにします',
    structure: 'Vる / Vない + ようにします',
    meaning: 'Cố gắng, chủ động tạo thói quen hoặc chú ý để làm/không làm gì',
    explanation:
      'Thể hiện sự nỗ lực, ý thức tự nhắc nhở bản thân thực hiện hoặc tránh một hành động nào đó.',
    examples: [
      { japanese: '毎日運動するようにします。', vietnamese: 'Tôi sẽ cố gắng tập thể dục mỗi ngày.' },
      { japanese: '夜遅く寝ないようにします。', vietnamese: 'Tôi sẽ cố gắng không ngủ muộn.' },
    ],
  },
  {
    id: 'g-b36-4',
    level: 'N4',
    lesson: 36,
    order: 4,
    title: '4. ～ようにしています',
    structure: 'Vる / Vない + ようにしています',
    meaning: 'Đang duy trì một thói quen hoặc nỗ lực thường xuyên',
    explanation:
      'Dạng tiếp diễn của ～ようにします, diễn tả thói quen tốt mà người nói vẫn đang cố gắng duy trì hàng ngày.',
    examples: [
      { japanese: '毎日漢字を復習するようにしています。', vietnamese: 'Tôi luôn cố gắng ôn Kanji mỗi ngày.' },
      { japanese: '野菜をたくさん食べるようにしています。', vietnamese: 'Tôi cố gắng ăn nhiều rau.' },
    ],
  },
  {
    id: 'g-b36-5',
    level: 'N4',
    lesson: 36,
    order: 5,
    title: '5. Phân biệt ～ために và ～ように',
    structure: 'Vる / Nの + ために vs V (khả năng/phủ định/trạng thái) + ように',
    meaning: 'Mục đích gắn với hành động có chủ ý (ために) vs Hướng tới trạng thái/kết quả (ように)',
    explanation:
      '• ～ために: Nhấn mạnh mục đích trực tiếp, thường gắn với hành động có chủ ý của cùng chủ thể.\n• ～ように: Để đạt được một trạng thái hay khả năng nào đó, thường đi với thể khả năng hoặc thể phủ định.',
    examples: [
      { japanese: '日本へ行くために、お金を貯めています。', vietnamese: 'Tôi đang tiết kiệm tiền để đi Nhật.' },
      { japanese: '日本語が話せるように、勉強しています。', vietnamese: 'Tôi đang học để có thể nói tiếng Nhật.' },
    ],
    notes: [
      'Không nên hiểu cứng nhắc rằng ～ために chỉ đi với động từ ý chí và ～ように chỉ đi với thể khả năng trong mọi trường hợp; cần xét nghĩa và cấu trúc thực tế.',
    ],
  },

  // ================= BÀI 37 =================
  {
    id: 'g-b37-1',
    level: 'N4',
    lesson: 37,
    order: 1,
    title: '1. Thể bị động (受身形) — Ý nghĩa',
    structure: 'Chủ thể chịu tác động + は + Người/vật gây ra + に + V (bị động)',
    meaning: 'Được... / Bị... (chủ thể chịu tác động của hành động)',
    explanation:
      'Diễn tả việc chủ thể đón nhận tác động từ hành động của người khác hoặc sự việc khác (có thể mang nghĩa tích cực “được” hoặc tiêu cực “bị”).',
    examples: [
      { japanese: '私は先生に褒められました。', vietnamese: 'Tôi được giáo viên khen.' },
      { japanese: '私は犬にかまれました。', vietnamese: 'Tôi bị chó cắn.' },
    ],
  },
  {
    id: 'g-b37-2',
    level: 'N4',
    lesson: 37,
    order: 2,
    title: '2. Cách chia thể bị động',
    structure: 'Nhóm I: đuôi う → あ + れる (りêng う → わ + れる)\nNhóm II: bỏ る + られる\nNhóm III: する → される | 来る → 来られる（こられる）',
    meaning: 'Quy tắc biến đổi động từ sang thể bị động (受身形)',
    explanation:
      '• Nhóm I: 書く→書かれる, 聞く→聞かれる, 泳ぐ→泳がれる, 話す→話される, 待つ→待たれる, 飲む→飲まれる, 遊ぶ→遊ばれる, 取る→取られる, 買う→買われる (riêng đuôi う chuyển thành わ)\n• Nhóm II: 食べる→食べられる, 見る→見られる\n• Nhóm III: する→される, 来る→来られる（こられる）',
    examples: [
      { japanese: '買う → 買われる / 待つ → 待たれる / 食べる → 食べられる', vietnamese: 'Bị mua / Bị đợi / Bị ăn (hoặc được ăn)' },
    ],
  },
  {
    id: 'g-b37-3',
    level: 'N4',
    lesson: 37,
    order: 3,
    title: '3. Bị động trực tiếp',
    structure: 'A は B に V (bị động)',
    meaning: 'A được/bị B tác động trực tiếp vào bản thân A',
    explanation:
      'Chủ thể A trực tiếp là đối tượng tiếp nhận hành động từ B.',
    examples: [
      { japanese: '私は先生に褒められました。', vietnamese: 'Tôi được giáo viên khen.' },
      { japanese: '私は友達に招待されました。', vietnamese: 'Tôi được bạn mời.' },
    ],
  },
  {
    id: 'g-b37-4',
    level: 'N4',
    lesson: 37,
    order: 4,
    title: '4. Bị động gián tiếp / bị động chịu thiệt',
    structure: 'Người chịu ảnh hưởng + は + Người/vật gây ra + に + (Đối tượng + を) + V (bị động)',
    meaning: 'Bị phiền toái, bất lợi do hành động xảy ra với người hoặc vật liên quan',
    explanation:
      'Chủ thể bị ảnh hưởng gián tiếp bởi hành động của người khác (hoặc hiện tượng thiên nhiên như mưa), thường thể hiện sự phiền toái, bất lợi hoặc chịu ảnh hưởng không mong muốn.',
    examples: [
      { japanese: '私は弟にケーキを食べられました。', vietnamese: 'Tôi bị em trai ăn mất bánh.' },
      { japanese: '私は雨に降られました。', vietnamese: 'Tôi bị mắc mưa.' },
      { japanese: '私は子どもに泣かれて、眠れませんでした。', vietnamese: 'Tôi bị đứa trẻ khóc làm cho không ngủ được.' },
    ],
  },
  {
    id: 'g-b37-5',
    level: 'N4',
    lesson: 37,
    order: 5,
    title: '5. Bị động với vật vô tri',
    structure: 'Vật/Công trình/Tác phẩm + は/が + V (bị động)',
    meaning: 'Được xây dựng, được đọc, được tổ chức... (không nhấn mạnh người thực hiện)',
    explanation:
      'Dùng khi nói về sự kiện, công trình lịch sử, tác phẩm hoặc đồ vật làm chủ ngữ mà không cần nhấn mạnh cụ thể người thực hiện là ai.',
    examples: [
      { japanese: 'この建物は100年前に建てられました。', vietnamese: 'Tòa nhà này được xây dựng cách đây 100 năm.' },
      { japanese: 'この本は多くの人に読まれています。', vietnamese: 'Cuốn sách này được nhiều người đọc.' },
    ],
  },
  {
    id: 'g-b37-6',
    level: 'N4',
    lesson: 37,
    order: 6,
    title: '6. Trợ từ trong câu bị động & によって',
    structure: 'Chủ thể chịu tác động + は/が + Tác nhân + に (hoặc によって) + Đối tượng + を + V (bị động)',
    meaning: 'Cách dùng trợ từ に, は/が, を và によって (bởi tác giả/người sáng tạo)',
    explanation:
      '• Người thực hiện hành động thường đi với に.\n• Chủ thể chịu tác động đi với は hoặc が.\n• Đối tượng của hành động vẫn giữ を.\n• [Mở rộng] によって: Thường dùng để nêu tác giả hoặc chủ thể tạo ra tác phẩm, phát minh, công trình.',
    examples: [
      { japanese: '私は先生に日本語を教えられました。', vietnamese: 'Tôi được giáo viên dạy tiếng Nhật.' },
      { japanese: 'この小説は村上春樹によって書かれました。', vietnamese: 'Cuốn tiểu thuyết này được viết bởi Murakami Haruki.' },
    ],
  },
  {
    id: 'g-b37-7',
    level: 'N4',
    lesson: 37,
    order: 7,
    title: '7. Phân biệt thể bị động và thể khả năng',
    structure: 'Động từ Nhóm II & 来る: trùng hình thức ～られる (食べられる, 見られる...)',
    meaning: 'Phân biệt nghĩa “Có thể...” (khả năng) và “Bị/Được...” (bị động)',
    explanation:
      'Ở động từ Nhóm II và 来る, thể khả năng và thể bị động có hình thức viết giống hệt nhau (ví dụ: 食べられる = có thể ăn / bị ăn; 見られる = có thể xem / bị nhìn thấy). Cần dựa vào chủ ngữ, trợ từ (に/が) và ngữ cảnh để xác định nghĩa chính xác.',
    examples: [
      { japanese: '食べられる ／ 見られる', vietnamese: 'Có thể ăn / bị ăn — Có thể xem / bị nhìn thấy (phụ thuộc ngữ cảnh & trợ từ).' },
    ],
  },

  // ================= BÀI 38 =================
  {
    id: 'g-b38-1',
    level: 'N4',
    lesson: 38,
    order: 1,
    title: '1. ～のは～',
    structure: 'V thể thường + のは + Phần nhận xét (Aい / Aな です)',
    meaning: 'Việc làm V thì...',
    explanation:
      'Trợ từ の đứng sau động từ thể thường để danh từ hóa hành động (“việc làm gì”), làm chủ đề nhận xét cho câu.',
    examples: [
      { japanese: '日本語を勉強するのは楽しいです。', vietnamese: 'Việc học tiếng Nhật rất vui.' },
      { japanese: '一人で旅行するのは危ないです。', vietnamese: 'Việc đi du lịch một mình nguy hiểm.' },
    ],
  },
  {
    id: 'g-b38-2',
    level: 'N4',
    lesson: 38,
    order: 2,
    title: '2. ～のが～',
    structure: 'V thể thường + のが + 好き / 嫌い / 上手 / 下手 / 速い / 遅い です',
    meaning: 'Thích / Ghét / Giỏi / Kém / Nhanh / Chậm trong việc làm V',
    explanation:
      'Dùng để danh từ hóa hành động làm chủ ngữ cho các tính từ biểu thị sở thích, năng lực hoặc tốc độ.',
    examples: [
      { japanese: '私は歌うのが好きです。', vietnamese: 'Tôi thích hát.' },
      { japanese: '彼は料理を作るのが上手です。', vietnamese: 'Anh ấy nấu ăn giỏi.' },
      { japanese: '私は走るのが速いです。', vietnamese: 'Tôi chạy nhanh.' },
    ],
  },
  {
    id: 'g-b38-3',
    level: 'N4',
    lesson: 38,
    order: 3,
    title: '3. ～のを～',
    structure: 'V thể thường + のを + 忘れました / 見ました / 知っています...',
    meaning: 'Quên / Nhìn thấy / Biết... việc gì đó',
    explanation:
      'Dùng khi hành động được danh từ hóa làm tân ngữ (đối tượng trực tiếp) của động từ phía sau.',
    examples: [
      { japanese: '私は彼が走るのを見ました。', vietnamese: 'Tôi đã nhìn thấy anh ấy chạy.' },
      { japanese: '宿題をするのを忘れました。', vietnamese: 'Tôi đã quên làm bài tập.' },
    ],
  },
  {
    id: 'g-b38-4',
    level: 'N4',
    lesson: 38,
    order: 4,
    title: '4. Phân biệt の và こと',
    structure: 'V thể thường + の vs V thể thường + こと',
    meaning: 'Sự khác nhau giữa hai cách danh từ hóa động từ',
    explanation:
      'Cả の và こと đều danh từ hóa động từ, nhưng không phải lúc nào cũng thay thế được cho nhau.\n[Mở rộng] の thường gắn với sự việc cụ thể, cảm nhận trực tiếp (nhìn, nghe, quên, thích); こと thường mang sắc thái khái quát hoặc trừu tượng hơn (đây là xu hướng, không phải quy tắc tuyệt đối).\nMột số cấu trúc cố định thường dùng こと: ～ことができる, ～ことにする, ～ことになる, ～ことがある.',
    examples: [
      { japanese: '日本語を勉強するのは楽しいです。', vietnamese: 'Việc học tiếng Nhật rất vui.' },
      { japanese: '日本語を勉強することは大切です。', vietnamese: 'Việc học tiếng Nhật rất quan trọng.' },
    ],
  },

  // ================= BÀI 39 =================
  {
    id: 'g-b39-1',
    level: 'N4',
    lesson: 39,
    order: 1,
    title: '1. ～て／～なくて diễn tả nguyên nhân',
    structure: 'Vて / Vなくて | Aい (bỏ い + くて) / Aな + で + Kết quả (cảm xúc, tình trạng)',
    meaning: 'Vì..., nên... (nguyên nhân dẫn đến cảm xúc hoặc trạng thái)',
    explanation:
      'Dùng thể て hoặc thể なくて để nối nguyên nhân với kết quả mang tính cảm xúc, phản ứng tự nhiên hoặc tình trạng khó khăn ở vế sau (vế sau thường không phải mệnh lệnh/ý chí).',
    examples: [
      { japanese: 'ニュースを聞いて、びっくりしました。', vietnamese: 'Nghe tin tức xong tôi đã rất ngạc nhiên.' },
      { japanese: 'お金がなくて、困っています。', vietnamese: 'Vì không có tiền nên tôi đang gặp khó khăn.' },
      { japanese: '忙しくて、行けませんでした。', vietnamese: 'Vì bận nên tôi đã không thể đi.' },
    ],
  },
  {
    id: 'g-b39-2',
    level: 'N4',
    lesson: 39,
    order: 2,
    title: '2. ～ので',
    structure: 'V thể thường / Aい + ので\nAな / N + なので',
    meaning: 'Bởi vì, do... nên... (nguyên nhân khách quan, lịch sự)',
    explanation:
      'Dùng để giải thích nguyên nhân, lý do một cách mềm mại, nhẹ nhàng và khách quan hơn ～から (rất hay dùng khi xin phép hoặc trình bày lý do lịch sự).',
    examples: [
      { japanese: '雨が降っているので、出かけません。', vietnamese: 'Vì trời đang mưa nên tôi không ra ngoài.' },
      { japanese: '静かなので、ここで勉強します。', vietnamese: 'Vì yên tĩnh nên tôi học ở đây.' },
      { japanese: '病気なので、学校を休みます。', vietnamese: 'Vì bị bệnh nên tôi nghỉ học.' },
    ],
    notes: [
      'Lưu ý với tính từ な và danh từ: phải thêm な trước ので (静かなので, 病気なので).',
    ],
  },
  {
    id: 'g-b39-3',
    level: 'N4',
    lesson: 39,
    order: 3,
    title: '3. ～のに',
    structure: 'V thể thường / Aい + のに\nAな / N + なのに',
    meaning: 'Mặc dù..., vậy mà...',
    explanation:
      'Nêu sự tương phản: kết quả ở vế sau xảy ra trái ngược hoàn toàn với kỳ vọng thông thường từ vế trước.\nSo sánh: ～ので nêu nguyên nhân thuận vs ～のに nêu sự tương phản trái kỳ vọng.',
    examples: [
      { japanese: '勉強したのに、試験に落ちました。', vietnamese: 'Mặc dù đã học nhưng vẫn trượt kỳ thi.' },
      { japanese: '安いのに、おいしいです。', vietnamese: 'Mặc dù rẻ nhưng ngon.' },
      { japanese: '日曜日なのに、仕事があります。', vietnamese: 'Dù là Chủ nhật nhưng vẫn có việc.' },
    ],
  },

  // ================= BÀI 40 =================
  {
    id: 'g-b40-1',
    level: 'N4',
    lesson: 40,
    order: 1,
    title: '1. Câu hỏi gián tiếp: ～か／～かどうか',
    structure: 'A. Có từ để hỏi: Từ để hỏi + Câu thể thường + か\nB. Câu Có/Không: Câu thể thường + かどうか',
    meaning: 'Lồng câu hỏi vào trong một câu lớn (biết/không biết/quên... làm gì hay không)',
    explanation:
      'Dùng để đưa một câu hỏi làm thành phần thông tin trong câu chính:\nA. Khi có từ để hỏi (どこ, 何, だれ...): kết thúc mệnh đề hỏi bằng か.\nB. Khi câu hỏi dạng Có/Không: kết thúc mệnh đề hỏi bằng かどうか.',
    examples: [
      { japanese: 'どこに住んでいるか知っていますか。', vietnamese: 'Bạn có biết anh ấy đang sống ở đâu không?' },
      { japanese: '何を買ったか忘れました。', vietnamese: 'Tôi quên mất đã mua gì.' },
      { japanese: '彼が来るかどうか分かりません。', vietnamese: 'Tôi không biết anh ấy có đến hay không.' },
      { japanese: '明日雨が降るかどうか知っていますか。', vietnamese: 'Bạn có biết ngày mai trời có mưa hay không?' },
    ],
    notes: [
      'Trong câu hỏi gián tiếp, phần đứng trước か／かどうか dùng thể thường (và với Aな/N bỏ だ trước か), không dùng trật tự đảo như tiếng Việt.',
    ],
  },
  {
    id: 'g-b40-2',
    level: 'N4',
    lesson: 40,
    order: 2,
    title: '2. ～てみます',
    structure: 'Vて + みます',
    meaning: 'Thử làm gì để xem kết quả thế nào',
    explanation:
      'Diễn tả hành động làm thử một việc gì đó để trải nghiệm, kiểm tra hoặc xem kết quả ra sao.',
    examples: [
      { japanese: 'この料理を食べてみます。', vietnamese: 'Tôi sẽ thử món ăn này.' },
      { japanese: '日本語で話してみます。', vietnamese: 'Tôi sẽ thử nói bằng tiếng Nhật.' },
      { japanese: 'この服を着てみてもいいですか。', vietnamese: 'Tôi thử mặc bộ đồ này được không?' },
    ],
  },
  {
    id: 'g-b40-3',
    level: 'N4',
    lesson: 40,
    order: 3,
    title: '3. ～さ (Danh từ hóa tính từ)',
    structure: 'Aい (bỏ い) + さ | Aな + さ',
    meaning: 'Biến tính từ thành danh từ chỉ mức độ, tính chất (độ cao, độ dài, trọng lượng...)',
    explanation:
      'Bỏ い ở tính từ đuôi い hoặc bỏ な ở tính từ đuôi な rồi thêm さ để tạo thành danh từ đo lường/chỉ tính chất:\n• Tính từ い: 高い→高さ (độ cao), 長い→長さ (độ dài), 重い→重さ (trọng lượng)\n• Tính từ な: 静か→静かさ (sự yên tĩnh), 便利→便利さ (sự tiện lợi)',
    examples: [
      { japanese: '富士山の高さはどのくらいですか。', vietnamese: 'Núi Phú Sĩ cao bao nhiêu?' },
      { japanese: 'この箱の重さを測ります。', vietnamese: 'Tôi đo trọng lượng chiếc hộp này.' },
    ],
  },

  // ================= BÀI 41 =================
  {
    id: 'g-b41-1',
    level: 'N4',
    lesson: 41,
    order: 1,
    title: '1. あげる／くれる／もらう (Nhắc lại cơ bản)',
    structure: 'あげる (Tôi/nhóm tôi cho) | くれる (Người khác cho tôi/nhóm tôi) | もらう (Tôi/nhóm tôi nhận)',
    meaning: 'Hệ thống 3 động từ cho – nhận đồ vật cơ bản',
    explanation:
      'Nắm chắc 3 hướng cho – nhận cơ bản để làm nền tảng cho các dạng kính ngữ/khiêm nhường ngữ ở Bài 41.',
    examples: [
      { japanese: '私は友達に本をあげました。', vietnamese: 'Tôi tặng sách cho bạn.' },
      { japanese: '友達は私に本をくれました。', vietnamese: 'Bạn tặng sách cho tôi.' },
      { japanese: '私は友達に本をもらいました。', vietnamese: 'Tôi nhận sách từ bạn.' },
    ],
  },
  {
    id: 'g-b41-2',
    level: 'N4',
    lesson: 41,
    order: 2,
    title: '2. いただく',
    structure: 'A は B に／から N をいただく',
    meaning: 'Dạng khiêm nhường của もらう (được người trên/đáng kính tặng, cho)',
    explanation:
      'Dùng khi người nhận muốn thể hiện sự kính trọng và biết ơn đối với người cho có vị thế cao hơn hoặc người ngoài đáng kính.',
    examples: [
      { japanese: '私は先生に本をいただきました。', vietnamese: 'Tôi được thầy/cô tặng sách.' },
    ],
  },
  {
    id: 'g-b41-3',
    level: 'N4',
    lesson: 41,
    order: 3,
    title: '3. くださる',
    structure: 'Người trên + が + (私に) + N をくださいます',
    meaning: 'Dạng tôn kính của くれる (người trên tặng cho tôi/nhóm tôi)',
    explanation:
      'Thể hiện sự tôn kính đối với người bề trên khi họ chủ động tặng vật gì đó cho mình.',
    examples: [
      { japanese: '先生が本をくださいました。', vietnamese: 'Thầy/cô đã tặng sách cho tôi.' },
    ],
    notes: [
      'Lưu ý chia thể ます bất quy tắc: くださる → くださいます (không phải くださります).',
    ],
  },
  {
    id: 'g-b41-4',
    level: 'N4',
    lesson: 41,
    order: 4,
    title: '4. やる',
    structure: 'Người nói + は + Trẻ nhỏ/Động vật/Cây + に + N をやる',
    meaning: 'Cho người hoặc vật có vị thế thấp hơn (trẻ nhỏ, động vật, cây cối)',
    explanation:
      'Dùng khi cho em nhỏ, thú cưng ăn hoặc tưới nước/bón phân cho cây cối. Trong giao tiếp lịch sự ngày nay, có thể dùng あげる thay thế tùy tình huống.',
    examples: [
      { japanese: '私は犬にえさをやりました。', vietnamese: 'Tôi cho chó ăn.' },
    ],
  },
  {
    id: 'g-b41-5',
    level: 'N4',
    lesson: 41,
    order: 5,
    title: '5. ～ていただく',
    structure: 'Người trên + に + Vて + いただく',
    meaning: 'Được người bề trên làm gì giúp cho mình (khiêm nhường, biết ơn)',
    explanation:
      'Dạng khiêm nhường của ～てもらう, dùng khi người nói là chủ ngữ nhận sự giúp đỡ từ thầy cô, cấp trên hoặc người đáng kính.',
    examples: [
      { japanese: '先生に日本語を教えていただきました。', vietnamese: 'Tôi được thầy/cô dạy tiếng Nhật.' },
    ],
  },
  {
    id: 'g-b41-6',
    level: 'N4',
    lesson: 41,
    order: 6,
    title: '6. ～てくださる',
    structure: 'Người trên + が + Vて + くださる',
    meaning: 'Người bề trên làm gì giúp cho tôi/nhóm tôi (tôn kính)',
    explanation:
      'Dạng tôn kính của ～てくれる, lấy người bề trên làm chủ ngữ thực hiện hành động tốt đẹp hướng về phía mình.',
    examples: [
      { japanese: '先生が説明してくださいました。', vietnamese: 'Thầy/cô đã giải thích cho tôi.' },
    ],
  },
  {
    id: 'g-b41-7',
    level: 'N4',
    lesson: 41,
    order: 7,
    title: '7. ～てやる',
    structure: 'Vて + やる',
    meaning: 'Làm gì cho người/vật ở vị thế thấp hơn (trẻ nhỏ, thú cưng)',
    explanation:
      'Dạng của ～てあげる khi hành động hướng tới trẻ nhỏ hoặc động vật.',
    examples: [
      { japanese: '子どもに本を読んでやりました。', vietnamese: 'Tôi đọc sách cho đứa trẻ.' },
    ],
  },
  {
    id: 'g-b41-8',
    level: 'N4',
    lesson: 41,
    order: 8,
    title: '8. ～てくださいませんか',
    structure: 'Vて + くださいませんか',
    meaning: 'Anh/chị có thể vui lòng làm gì giúp tôi không?',
    explanation:
      'Câu nhờ vả lịch sự xuất phát từ kính ngữ くださる, mời hoặc nhờ người khác làm gì cho mình một cách nhã nhặn.',
    examples: [
      { japanese: 'もう一度説明してくださいませんか。', vietnamese: 'Anh/chị có thể vui lòng giải thích lại một lần nữa được không?' },
    ],
  },
  {
    id: 'g-b41-9',
    level: 'N4',
    lesson: 41,
    order: 9,
    title: '9. Phân biệt ba hướng cho – nhận hành động',
    structure: '～てあげる / ～てくれる / ～てもらう / ～ていただく / ～てくださる',
    meaning: 'Tổng hợp ai làm & ai hưởng lợi trong 5 cấu trúc cho – nhận',
    explanation:
      '• ～てあげる: Tôi/nhóm tôi làm → Người khác hưởng lợi.\n• ～てくれる: Người khác làm → Tôi/nhóm tôi hưởng lợi.\n• ～てもらう: Tôi/nhóm tôi nhận từ người khác làm.\n• ～ていただく: Tôi/nhóm tôi nhận từ người trên/được kính trọng.\n• ～てくださる: Người được kính trọng làm → Tôi/nhóm tôi hưởng lợi.',
    examples: [
      { japanese: '先生が教えてくださいました。', vietnamese: 'Thầy/cô đã dạy tôi (chủ ngữ là thầy/cô).' },
      { japanese: '私は先生に教えていただきました。', vietnamese: 'Tôi được thầy/cô dạy (chủ ngữ là tôi).' },
    ],
    notes: [
      'Hai câu ví dụ diễn đạt cùng một sự việc nhưng khác góc nhìn chủ ngữ và trợ từ đi kèm.',
    ],
  },

  // ================= BÀI 42 =================
  {
    id: 'g-b42-1',
    level: 'N4',
    lesson: 42,
    order: 1,
    title: '1. ～ために (Mục đích / Lợi ích)',
    structure: 'Vる + ために | N の + ために',
    meaning: 'Để, nhằm mục đích... / Vì lợi ích của...',
    explanation:
      'Diễn tả mục đích hướng tới (với Vる) hoặc vì lợi ích của đối tượng nào đó (với Nの).',
    examples: [
      { japanese: '日本へ行くために、お金を貯めています。', vietnamese: 'Tôi đang tiết kiệm tiền để đi Nhật.' },
      { japanese: '家族のために働いています。', vietnamese: 'Tôi làm việc vì gia đình.' },
    ],
  },
  {
    id: 'g-b42-2',
    level: 'N4',
    lesson: 42,
    order: 2,
    title: '2. ～のに (Công dụng, mục đích sử dụng)',
    structure: 'Vる + のに + 使います / 便利です / いいです...',
    meaning: 'Dùng để..., tiện cho việc... (công dụng của đồ vật)',
    explanation:
      'Khác hoàn toàn với ～のに mang nghĩa “mặc dù” ở bài 39. Ở đây Vる + のに đi với các từ chỉ sự sử dụng, đánh giá như 使います, 便利です, 役に立ちます.',
    examples: [
      { japanese: 'このはさみは紙を切るのに使います。', vietnamese: 'Chiếc kéo này được dùng để cắt giấy.' },
      { japanese: 'このアプリは日本語を勉強するのに便利です。', vietnamese: 'Ứng dụng này tiện cho việc học tiếng Nhật.' },
    ],
  },
  {
    id: 'g-b42-3',
    level: 'N4',
    lesson: 42,
    order: 3,
    title: '3. ～のに (Chỉ thời gian hoặc chi phí cần thiết)',
    structure: 'Vる + のに + Thời gian / Tiền bạc + かかります / 必要です',
    meaning: 'Để làm V thì mất bao nhiêu thời gian / tiền bạc',
    explanation:
      'Dùng để biểu thị lượng thời gian, công sức hoặc chi phí cần thiết cho một hành động.',
    examples: [
      { japanese: '駅まで行くのに10分かかります。', vietnamese: 'Đi đến nhà ga mất 10 phút.' },
      { japanese: 'この仕事をするのに3時間かかりました。', vietnamese: 'Làm công việc này mất 3 tiếng.' },
    ],
  },
  {
    id: 'g-b42-4',
    level: 'N4',
    lesson: 42,
    order: 4,
    title: '4. Phân biệt ～ために／～のに',
    structure: '～ために (mục đích) vs ～のに (công dụng/chi phí) vs ～のに (mặc dù)',
    meaning: 'Tránh nhầm lẫn giữa mục đích cá nhân, công dụng và nhượng bộ',
    explanation:
      '• ～ために: Mục đích, lý do hoặc lợi ích.\n• ～のに (bài 42): Công dụng, sự tiện lợi, thời gian/chi phí cần thiết.\n• ～のに (bài 39): Mặc dù..., vậy mà...',
    examples: [
      { japanese: '勉強するために、図書館へ行きます。', vietnamese: 'Tôi đến thư viện để học (mục đích).' },
      { japanese: 'この辞書は勉強するのに便利です。', vietnamese: 'Cuốn từ điển này tiện cho việc học (công dụng).' },
      { japanese: '勉強したのに、合格できませんでした。', vietnamese: 'Mặc dù đã học nhưng vẫn không thể đỗ (mặc dù).' },
    ],
  },

  // ================= BÀI 43 =================
  {
    id: 'g-b43-1',
    level: 'N4',
    lesson: 43,
    order: 1,
    title: '1. ～そうです (Dáng vẻ: Trông có vẻ...)',
    structure: 'Aい (bỏ い) + そうです | Aな + そうです\nVます (bỏ ます) + そうです\nNgoại lệ: いい → よさそう | ない → なさそう',
    meaning: 'Trông có vẻ..., có dấu hiệu sắp...',
    explanation:
      'Dùng khi người nói nhận xét trực tiếp từ dáng vẻ bên ngoài của người/vật (với tính từ) hoặc dấu hiệu sắp xảy ra (với động từ).\n• Tính từ い: おいしい→おいしそう, 高い→高そう, 忙しい→忙しそう\n• Tính từ な: 元気→元気そう, 暇→暇そう\n• Động từ: 降ります→降りそう, 泣きます→泣きそう, 壊れます→壊れそう',
    examples: [
      { japanese: 'この料理はおいしそうです。', vietnamese: 'Món ăn này trông ngon.' },
      { japanese: '雨が降りそうです。', vietnamese: 'Có vẻ sắp mưa.' },
      { japanese: '彼は元気そうです。', vietnamese: 'Anh ấy trông có vẻ khỏe mạnh.' },
      { japanese: 'この店はよさそうです。', vietnamese: 'Quán này trông có vẻ tốt.' },
      { japanese: 'お金がなさそうです。', vietnamese: 'Có vẻ không có tiền.' },
    ],
    notes: [
      'Ngoại lệ cực kỳ quan trọng: いい → よさそう, ない → なさそう (phải chèn さ trước そう).',
    ],
  },
  {
    id: 'g-b43-2',
    level: 'N4',
    lesson: 43,
    order: 2,
    title: '2. ～て来ます',
    structure: 'Vて + 来ます',
    meaning: 'Đi làm một việc gì đó rồi quay trở lại',
    explanation:
      'Diễn tả hành động rời khỏi vị trí hiện tại để làm một việc gì đó rồi quay về lại chỗ cũ.',
    examples: [
      { japanese: 'ちょっと飲み物を買って来ます。', vietnamese: 'Tôi đi mua đồ uống một chút rồi quay lại.' },
      { japanese: '銀行へ行って来ます。', vietnamese: 'Tôi đi ngân hàng rồi quay lại.' },
      { japanese: '昼ご飯を食べて来ます。', vietnamese: 'Tôi đi ăn trưa rồi quay lại.' },
    ],
  },

  // ================= BÀI 44 =================
  {
    id: 'g-b44-1',
    level: 'N4',
    lesson: 44,
    order: 1,
    title: '1. ～すぎます',
    structure: 'Vます (bỏ ます) / Aい (bỏ い) / Aな + すぎます',
    meaning: 'Quá mức, quá... (vượt quá giới hạn bình thường)',
    explanation:
      'Ghép sau gốc động từ (bỏ ます), tính từ い (bỏ い) hoặc tính từ な (giữ nguyên gốc) để chỉ mức độ thái quá.',
    examples: [
      { japanese: '食べすぎました。', vietnamese: 'Tôi đã ăn quá nhiều.' },
      { japanese: 'この服は高すぎます。', vietnamese: 'Bộ đồ này quá đắt.' },
      { japanese: 'この部屋は静かすぎます。', vietnamese: 'Căn phòng này quá yên tĩnh.' },
    ],
  },
  {
    id: 'g-b44-2',
    level: 'N4',
    lesson: 44,
    order: 2,
    title: '2. ～やすいです',
    structure: 'Vます (bỏ ます) + やすいです',
    meaning: 'Dễ làm gì (tính chất dễ thực hiện, dễ xảy ra)',
    explanation:
      'Gắn sau Vます (bỏ ます) tạo thành tính từ đuôi い, diễn tả việc gì đó dễ làm hoặc thuận tiện.',
    examples: [
      { japanese: 'この本は読みやすいです。', vietnamese: 'Cuốn sách này dễ đọc.' },
      { japanese: 'このペンは使いやすいです。', vietnamese: 'Cây bút này dễ sử dụng.' },
    ],
  },
  {
    id: 'g-b44-3',
    level: 'N4',
    lesson: 44,
    order: 3,
    title: '3. ～にくいです',
    structure: 'Vます (bỏ ます) + にくいです',
    meaning: 'Khó làm gì (gây trở ngại khi thực hiện)',
    explanation:
      'Gắn sau Vます (bỏ ます) tạo thành tính từ đuôi い, mang nghĩa trái ngược với ～やすい, diễn tả sự khó khăn khi thực hiện.',
    examples: [
      { japanese: 'この漢字は覚えにくいです。', vietnamese: 'Chữ Kanji này khó nhớ.' },
      { japanese: 'この靴は歩きにくいです。', vietnamese: 'Đôi giày này khó đi.' },
    ],
  },
  {
    id: 'g-b44-4',
    level: 'N4',
    lesson: 44,
    order: 4,
    title: '4. ～くします／～にします',
    structure: 'Aい (bỏ い) + く + します | Aな + に + します',
    meaning: 'Làm cho một thứ trở nên như thế nào (tác động có chủ ý)',
    explanation:
      'Khác với ～くなります／～になります (tự biến đổi), ～くします／～にします diễn tả việc chủ thể chủ động thay đổi trạng thái của sự vật.',
    examples: [
      { japanese: '部屋をきれいにします。', vietnamese: 'Làm cho căn phòng sạch sẽ.' },
      { japanese: '音を小さくしてください。', vietnamese: 'Hãy giảm âm thanh nhỏ xuống.' },
      { japanese: 'テレビの音を大きくしました。', vietnamese: 'Tôi đã tăng âm lượng TV lên.' },
    ],
  },
  {
    id: 'g-b44-5',
    level: 'N4',
    lesson: 44,
    order: 5,
    title: '5. N にします (Chọn)',
    structure: 'N + にします',
    meaning: 'Chọn, quyết định lấy N (gọi món, chọn đồ...)',
    explanation:
      'Dùng khi đưa ra sự lựa chọn từ các phương án có sẵn, rất hay dùng trong nhà hàng hoặc khi mua sắm.',
    examples: [
      { japanese: 'コーヒーにします。', vietnamese: 'Tôi chọn cà phê.' },
      { japanese: '私はこの服にします。', vietnamese: 'Tôi chọn bộ đồ này.' },
    ],
    notes: [
      'Phân biệt: 部屋を静かにします (Làm cho căn phòng yên tĩnh — Aな + にします) vs コーヒーにします (Chọn cà phê — N + にします).',
    ],
  },

  // ================= BÀI 45 =================
  {
    id: 'g-b45-1',
    level: 'N4',
    lesson: 45,
    order: 1,
    title: '1. ～場合は',
    structure: 'V thể thường / Aい + 場合は\nAな + 場合は | N の + 場合は',
    meaning: 'Trong trường hợp..., nếu xảy ra trường hợp...',
    explanation:
      'Dùng để giả định một tình huống đặc biệt có thể xảy ra và đưa ra cách xử lý tương ứng ở vế sau (thường thấy trong quy định, hướng dẫn, thông báo).',
    examples: [
      { japanese: '雨が降った場合は、試合を中止します。', vietnamese: 'Trong trường hợp trời mưa, trận đấu sẽ bị hủy.' },
      { japanese: '火事の場合は、エレベーターを使わないでください。', vietnamese: 'Trong trường hợp hỏa hoạn, xin đừng sử dụng thang máy.' },
      { japanese: '分からない場合は、先生に聞いてください。', vietnamese: 'Trong trường hợp không hiểu, hãy hỏi giáo viên.' },
    ],
  },
  {
    id: 'g-b45-2',
    level: 'N4',
    lesson: 45,
    order: 2,
    title: '2. ～のに (Nhấn mạnh bất ngờ, tiếc nuối)',
    structure: 'V thể thường / Aい + のに | Aな / N + なのに',
    meaning: 'Mặc dù... (thể hiện sự bất ngờ, tiếc nuối hoặc không hài lòng)',
    explanation:
      'Tiếp tục mở rộng sắc thái của ～のに (đã học ở bài 39): ngoài nghĩa tương phản, ～のに còn bộc lộ rõ tâm trạng ngạc nhiên, thất vọng hoặc phàn nàn của người nói.',
    examples: [
      { japanese: '今日は日曜日なのに、会社へ行かなければなりません。', vietnamese: 'Mặc dù hôm nay là Chủ nhật nhưng tôi phải đi công ty.' },
      { japanese: '薬を飲んだのに、熱が下がりません。', vietnamese: 'Mặc dù đã uống thuốc nhưng vẫn không hạ sốt.' },
    ],
  },

  // ================= BÀI 46 =================
  {
    id: 'g-b46-1',
    level: 'N4',
    lesson: 46,
    order: 1,
    title: '1. ～ところです',
    structure: 'A. Vるところです (sắp sửa)\nB. Vているところです (đang ngay lúc)\nC. Vたところです (vừa mới xong)',
    meaning: 'Diễn tả đúng thời điểm của một hành động (sắp / đang / vừa mới)',
    explanation:
      'Tùy thuộc vào thể của động từ đứng trước ところです mà biểu thị 3 mốc thời điểm khác nhau của hành động:\nA. Vるところです: Chuẩn bị, sắp sửa làm ngay bây giờ.\nB. Vているところです: Đang thực hiện ngay vào đúng khoảnh khắc nói.\nC. Vたところです: Vừa mới hoàn thành xong ngay tức thì.',
    examples: [
      { japanese: '今からご飯を食べるところです。', vietnamese: 'Bây giờ tôi chuẩn bị ăn cơm.' },
      { japanese: '今、ご飯を食べているところです。', vietnamese: 'Bây giờ tôi đang ăn cơm.' },
      { japanese: '今、ご飯を食べたところです。', vietnamese: 'Tôi vừa mới ăn cơm xong.' },
    ],
  },
  {
    id: 'g-b46-2',
    level: 'N4',
    lesson: 46,
    order: 2,
    title: '2. ～たばかりです',
    structure: 'Vた + ばかりです',
    meaning: 'Vừa mới làm gì (cảm nhận chủ quan của người nói thấy còn mới)',
    explanation:
      'Diễn tả sự việc vừa xảy ra theo cảm nhận của người nói là vẫn còn mới mẻ, không bắt buộc phải mới xảy ra cách đó vài giây/phút.',
    examples: [
      { japanese: '日本へ来たばかりです。', vietnamese: 'Tôi vừa mới đến Nhật.' },
      { japanese: '仕事が終わったばかりです。', vietnamese: 'Tôi vừa mới kết thúc công việc.' },
      { japanese: 'さっき帰ったところです。 vs 先月、日本へ来たばかりです。', vietnamese: 'Vừa mới về lúc nãy (thời điểm rất gần hiện tại) vs Mới sang Nhật tháng trước (cảm nhận vẫn còn mới).' },
    ],
    notes: [
      'Phân biệt ～たところ (thời điểm thực tế rất sát hiện tại) vs ～たばかり (cảm giác sự việc còn mới, có thể đã cách vài tuần/tháng).',
    ],
  },
  {
    id: 'g-b46-3',
    level: 'N4',
    lesson: 46,
    order: 3,
    title: '3. ～はずです',
    structure: 'V thể thường / Aい + はずです\nAな + はずです | N の + はずです',
    meaning: 'Chắc chắn là..., đáng lẽ..., theo suy đoán có căn cứ thì...',
    explanation:
      'Dùng khi người nói đưa ra phán đoán chắc chắn dựa trên căn cứ logic, lịch trình hoặc thông tin đã biết.',
    examples: [
      { japanese: '彼はもう家にいるはずです。', vietnamese: 'Theo dự đoán thì anh ấy đã ở nhà rồi.' },
      { japanese: '今日は日曜日だから、銀行は休みのはずです。', vietnamese: 'Hôm nay là Chủ nhật nên chắc ngân hàng nghỉ.' },
      { japanese: 'この問題は簡単なはずです。', vietnamese: 'Bài này đáng lẽ phải dễ.' },
    ],
  },
  {
    id: 'g-b46-4',
    level: 'N4',
    lesson: 46,
    order: 4,
    title: '4. ～はずがありません & ～はずだった',
    structure: 'V thể thường / Aい / Aな / Nの + はずがありません / はずだった',
    meaning: 'Không thể nào... (はずがありません) | Đáng lẽ đã... nhưng thực tế không như vậy (はずだった)',
    explanation:
      '• ～はずがありません: Phủ định hoàn toàn một khả năng vì vô lý hoặc trái căn cứ.\n• [Mở rộng] ～はずだった (はずでした): Diễn tả điều đáng lẽ đã xảy ra theo dự tính nhưng thực tế không xảy ra hoặc kết quả khác dự kiến.',
    examples: [
      { japanese: '彼がそんなことをするはずがありません。', vietnamese: 'Không thể nào anh ấy làm chuyện như vậy.' },
      { japanese: '今日は休みのはずがありません。', vietnamese: 'Không thể nào hôm nay là ngày nghỉ.' },
      { japanese: '彼は来るはずでした。', vietnamese: 'Đáng lẽ anh ấy đã đến.' },
    ],
  },

  // ================= BÀI 47 =================
  {
    id: 'g-b47-1',
    level: 'N4',
    lesson: 47,
    order: 1,
    title: '1. ～そうです (Truyền đạt: Nghe nói rằng...)',
    structure: 'V thể thường / Aい + そうです\nAな / N + だ + そうです',
    meaning: 'Nghe nói rằng... (truyền đạt lại thông tin nghe/đọc được)',
    explanation:
      'Mẫu truyền đạt thông tin nghe được từ người khác, sách báo hoặc dự báo thời tiết. Lưu ý: Aな và N cần giữ だ trước そうです (khác hoàn toàn với ～そうです dáng vẻ ở bài 43).',
    examples: [
      { japanese: '天気予報によると、明日は雨が降るそうです。', vietnamese: 'Theo dự báo thời tiết, nghe nói ngày mai trời sẽ mưa.' },
      { japanese: '田中さんは結婚したそうです。', vietnamese: 'Nghe nói anh Tanaka đã kết hôn.' },
      { japanese: 'あの店は有名だそうです。', vietnamese: 'Nghe nói quán kia nổi tiếng.' },
    ],
  },
  {
    id: 'g-b47-2',
    level: 'N4',
    lesson: 47,
    order: 2,
    title: '2. Phân biệt hai loại ～そうです',
    structure: 'Aい (bỏ い) / Vます (bỏ ます) + そう (Dáng vẻ) vs Câu thể thường + そう (Nghe nói)',
    meaning: 'Chỉ khác một chữ nhưng ý nghĩa hoàn toàn khác nhau',
    explanation:
      '• Aい bỏ い + そう (おいしそう): Trông có vẻ ngon (nhìn bằng mắt).\n• Vます bỏ ます + そう (雨が降りそう): Sắp có vẻ xảy ra (dấu hiệu).\n• Câu thể thường + そう (おいしいそう): Nghe nói là ngon (nghe thông tin từ người khác).',
    examples: [
      { japanese: 'このケーキはおいしそうです。', vietnamese: 'Chiếc bánh này trông ngon (nhìn trực tiếp).' },
      { japanese: 'このケーキはおいしいそうです。', vietnamese: 'Nghe nói chiếc bánh này ngon (truyền đạt lại).' },
    ],
  },
  {
    id: 'g-b47-3',
    level: 'N4',
    lesson: 47,
    order: 3,
    title: '3. ～ようです',
    structure: 'V thể thường / Aい + ようです\nAな + ようです | N の + ようです',
    meaning: 'Có vẻ như..., hình như..., dường như...',
    explanation:
      'Dùng khi người nói tự suy luận chủ quan từ tình huống, dấu hiệu hoặc thông tin quan sát được bằng các giác quan.',
    examples: [
      { japanese: '彼は疲れているようです。', vietnamese: 'Có vẻ anh ấy đang mệt.' },
      { japanese: '外は寒いようです。', vietnamese: 'Hình như bên ngoài lạnh.' },
      { japanese: 'あの人は先生のようです。', vietnamese: 'Người kia có vẻ là giáo viên.' },
    ],
  },
  {
    id: 'g-b47-4',
    level: 'N4',
    lesson: 47,
    order: 4,
    title: '4. ～がします',
    structure: '匂い / 音 / 声 / 味 / 頭痛 / 気 + がします',
    meaning: 'Có cảm giác, có âm thanh, có mùi hoặc có vị',
    explanation:
      'Dùng để diễn tả hiện tượng được cảm nhận tự nhiên qua các giác quan (khứu giác, thính giác, vị giác, cảm giác cơ thể). Trợ từ が luôn đánh dấu đối tượng cảm giác được nhận thấy.',
    examples: [
      { japanese: 'いい匂いがします。', vietnamese: 'Có mùi thơm.' },
      { japanese: '変な音がします。', vietnamese: 'Có âm thanh lạ.' },
      { japanese: '頭痛がします。', vietnamese: 'Tôi cảm thấy đau đầu.' },
      { japanese: '甘い味がします。', vietnamese: 'Có vị ngọt.' },
    ],
  },

  // ================= BÀI 48 =================
  {
    id: 'g-b48-1',
    level: 'N4',
    lesson: 48,
    order: 1,
    title: '1. Thể sai khiến (使役形) — Ý nghĩa',
    structure: 'Chủ thể ra lệnh + は + Đối tượng + に/を + V (sai khiến)',
    meaning: '1. Bắt/ép ai đó làm gì | 2. Cho phép ai đó làm gì',
    explanation:
      'Thể sai khiến có hai sắc thái chính tùy vào vị thế và ngữ cảnh:\n• Bắt, yêu cầu cấp dưới/người nhỏ hơn làm gì.\n• Cho phép, để cho ai đó tự do làm điều họ muốn.',
    examples: [
      { japanese: '先生は学生に本を読ませました。', vietnamese: 'Giáo viên bắt học sinh đọc sách.' },
      { japanese: '母は子どもを遊ばせました。', vietnamese: 'Mẹ cho con chơi.' },
    ],
  },
  {
    id: 'g-b48-2',
    level: 'N4',
    lesson: 48,
    order: 2,
    title: '2. Cách chia thể sai khiến',
    structure: 'Nhóm I: đuôi う → あ + せる (riêng う → わ + せる)\nNhóm II: bỏ る + させる\nNhóm III: する → させる | 来る → 来させる（こさせる）',
    meaning: 'Quy tắc chia động từ sang thể sai khiến (使役形)',
    explanation:
      '• Nhóm I: 書く→書かせる, 聞く→聞かせる, 泳ぐ→泳がせる, 話す→話させる, 待つ→待たせる, 飲む→飲ませる, 遊ぶ→遊ばせる, 取る→取らせる, 買う→買わせる\n• Nhóm II: 食べる→食べさせる, 見る→見させる, 起きる→起きさせる\n• Nhóm III: する→させる, 来る→来させる（こさせる）',
    examples: [
      { japanese: '書く → 書かせる ／ 食べる → 食べさせる ／ する → させる', vietnamese: 'Bắt/cho viết — Bắt/cho ăn — Bắt/cho làm' },
    ],
  },
  {
    id: 'g-b48-3',
    level: 'N4',
    lesson: 48,
    order: 3,
    title: '3. Trợ từ trong câu sai khiến',
    structure: 'Tự động từ: Người bị sai khiến + を\nTha động từ: Người bị sai khiến + に + Đối tượng + を',
    meaning: 'Quy tắc dùng trợ từ を hay に cho người thực hiện hành động',
    explanation:
      'Đây là phần rất quan trọng:\n• Với tự động từ (không có tân ngữ を): chủ thể bị sai khiến thường đi với を.\n• Với tha động từ (đã có tân ngữ đi với を): chủ thể bị sai khiến chuyển sang đi với に để tránh lặp 2 trợ từ を.',
    examples: [
      { japanese: '母は子どもを学校へ行かせました。', vietnamese: 'Mẹ bắt/cho con đi học (tự động từ 行く → dùng を).' },
      { japanese: '先生は学生に本を読ませました。', vietnamese: 'Giáo viên bắt học sinh đọc sách (tha động từ 読む → dùng に).' },
    ],
  },
  {
    id: 'g-b48-4',
    level: 'N4',
    lesson: 48,
    order: 4,
    title: '4. ～させてください',
    structure: 'V (sai khiến) て + ください',
    meaning: 'Xin hãy cho phép tôi làm gì',
    explanation:
      'Dùng thể sai khiến + てください để lịch sự xin phép người khác cho mình được làm một việc gì đó.',
    examples: [
      { japanese: '今日は早く帰らせてください。', vietnamese: 'Hôm nay xin hãy cho phép tôi về sớm.' },
      { japanese: 'もう一度説明させてください。', vietnamese: 'Xin hãy cho phép tôi giải thích lại một lần nữa.' },
    ],
  },
  {
    id: 'g-b48-5',
    level: 'N4',
    lesson: 48,
    order: 5,
    title: '5. ～させてもらえませんか',
    structure: 'V (sai khiến) て + もらえませんか',
    meaning: 'Anh/chị có thể cho phép tôi làm gì được không?',
    explanation:
      'Cách xin phép mềm mại và lịch sự hơn ～させてください.',
    examples: [
      { japanese: 'ここで少し休ませてもらえませんか。', vietnamese: 'Anh/chị có thể cho phép tôi nghỉ một chút ở đây được không?' },
    ],
  },
  {
    id: 'g-b48-6',
    level: 'N4',
    lesson: 48,
    order: 6,
    title: '6. Phân biệt sai khiến, bị động và sai khiến bị động',
    structure: '読まれる (Bị động) vs 読ませる (Sai khiến) vs 読ませられる (Sai khiến bị động)',
    meaning: 'Bị làm vs Bắt/cho làm vs Bị bắt phải làm',
    explanation:
      '• 読まれる: Bị đọc (thể bị động).\n• 読ませる: Bắt/cho đọc (thể sai khiến).\n• [Mở rộng] 読ませられる: Bị bắt phải đọc (thể sai khiến bị động — kết hợp giữa sai khiến và bị động, không phải trọng tâm chính của bài 48 nhưng rất hay gặp ở cuối N4).',
    examples: [
      { japanese: '私は先生に作文を書かせられました。', vietnamese: 'Tôi bị giáo viên bắt viết bài văn.' },
    ],
  },

  // ================= BÀI 49 =================
  {
    id: 'g-b49-1',
    level: 'N4',
    lesson: 49,
    order: 1,
    title: '1. Kính ngữ tôn kính (尊敬語) — Khái niệm',
    structure: 'Nâng hành động của đối phương / người được kính trọng lên',
    meaning: 'Thể hiện sự kính trọng bằng cách nâng hành động của người nghe hoặc người được nhắc đến',
    explanation:
      '尊敬語 dùng để tôn kính người thực hiện hành động (giáo viên, giám đốc, khách hàng, người lớn tuổi...), tuyệt đối không dùng để nói về hành động của bản thân.',
    examples: [
      { japanese: '先生が来ます。 → 先生がいらっしゃいます。', vietnamese: 'Giáo viên đến (lịch sự thường) → Giáo viên đến / đang ở đây (tôn kính ngữ).' },
    ],
  },
  {
    id: 'g-b49-2',
    level: 'N4',
    lesson: 49,
    order: 2,
    title: '2. Những động từ kính ngữ đặc biệt',
    structure: '行く/来る/いる → いらっしゃる | 言う → おっしゃる | する → なさる | 食べる/飲む → 召し上がる\n見る → ご覧になる | 寝る → お休みになる | 知っている → ご存じです | くれる → くださる',
    meaning: 'Các động từ có hình thức tôn kính ngữ riêng cần học thuộc',
    explanation:
      'Bảng động từ tôn kính đặc biệt:\n• 行く・来る・いる → いらっしゃる\n• 言う → おっしゃる\n• する → なさる\n• 食べる・飲む → 召し上がる\n• 見る → ご覧になる\n• 寝る → お休みになる\n• 知っている → ご存じです\n• くれる → くださる',
    examples: [
      { japanese: '先生はもう帰られました。', vietnamese: 'Thầy/cô đã về rồi.' },
      { japanese: '社長は何を召し上がりますか。', vietnamese: 'Giám đốc muốn dùng món gì?' },
      { japanese: '先生はこの写真をご覧になりました。', vietnamese: 'Thầy/cô đã xem bức ảnh này.' },
    ],
    notes: [
      'Lưu ý chia bất quy tắc thể ます: いらっしゃる→いらっしゃいます, おっしゃる→おっしゃいます, なさる→なさいます, くださる→くださいます (không chia thành いらっしゃります / おっしゃります).',
    ],
  },
  {
    id: 'g-b49-3',
    level: 'N4',
    lesson: 49,
    order: 3,
    title: '3. お／ご～になります',
    structure: 'お + Vます (bỏ ます) + になります\nTừ Hán Nhật: ご + N (động từ nhóm III bỏ する) + になります',
    meaning: 'Cách tạo tôn kính ngữ phổ biến cho đa số động từ thông thường',
    explanation:
      'Khi động từ không có dạng tôn kính đặc biệt riêng, ta dùng khuôn mẫu お／ご～になります để tạo kính ngữ.',
    examples: [
      { japanese: '先生はもうお帰りになりました。', vietnamese: 'Thầy/cô đã về rồi.' },
      { japanese: '社長は新聞をお読みになります。', vietnamese: 'Giám đốc đọc báo.' },
      { japanese: '先生はこの資料をご覧になります。', vietnamese: 'Thầy/cô xem tài liệu này.' },
    ],
    notes: [
      'Không phải động từ nào cũng tạo bằng cách này; một số động từ có dạng kính ngữ riêng (như 見る → ご覧になる) hoặc động từ 1 âm tiết như 来る/する không ghép お～になります.',
    ],
  },
  {
    id: 'g-b49-4',
    level: 'N4',
    lesson: 49,
    order: 4,
    title: '4. Thể bị động dùng làm kính ngữ',
    structure: 'V (thể bị động) dùng như tôn kính ngữ nhẹ nhàng',
    meaning: 'Cách nói tôn kính lịch sự (nhẹ hơn お～になります một bậc)',
    explanation:
      'Một số động từ dùng thể bị động để thể hiện sự tôn kính với người thực hiện hành động. Cần phân biệt với nghĩa bị động dựa vào ngữ cảnh.',
    examples: [
      { japanese: '先生はもう帰られました。', vietnamese: 'Thầy/cô đã về rồi.' },
      { japanese: '社長は何時に来られますか。', vietnamese: 'Giám đốc sẽ đến lúc mấy giờ?' },
    ],
  },
  {
    id: 'g-b49-5',
    level: 'N4',
    lesson: 49,
    order: 5,
    title: '5. お／ご～ください',
    structure: 'お／ご + Vます (bỏ ます) + ください',
    meaning: 'Xin mời, xin vui lòng... (mời/yêu cầu lịch sự)',
    explanation:
      'Cách mời hoặc đề nghị đối phương làm gì một cách rất trang trọng, thường gặp trong dịch vụ khách hàng, văn phòng, nhà ga.',
    examples: [
      { japanese: 'こちらにお座りください。', vietnamese: 'Xin mời ngồi ở đây.' },
      { japanese: '少々お待ちください。', vietnamese: 'Xin vui lòng đợi một chút.' },
      { japanese: 'ご確認ください。', vietnamese: 'Xin vui lòng xác nhận.' },
    ],
  },
  {
    id: 'g-b49-6',
    level: 'N4',
    lesson: 49,
    order: 6,
    title: '6. Không dùng kính ngữ cho chính mình',
    structure: '❌ 私がいらっしゃいます → ✅ 私が参ります',
    meaning: 'Nguyên tắc cốt lõi: Tuyệt đối không dùng 尊敬語 cho bản thân hay người nhà/công ty mình khi nói với người ngoài',
    explanation:
      'Không dùng 尊敬語 để nâng bản thân hoặc người thuộc nhóm mình (内 - uchi) khi giao tiếp với người ngoài (外 - soto). Với hành động của bản thân, phải dùng khiêm nhường ngữ (謙譲語).',
    examples: [
      { japanese: '私がいらっしゃいます。(Sai) → 私が参ります。(Đúng)', vietnamese: 'Tôi sẽ đến (phải dùng khiêm nhường ngữ 参ります).' },
    ],
  },

  // ================= BÀI 50 =================
  {
    id: 'g-b50-1',
    level: 'N4',
    lesson: 50,
    order: 1,
    title: '1. Khiêm nhường ngữ (謙譲語) — Khái niệm',
    structure: 'Hạ thấp hành động của bản thân / nhóm mình hướng tới đối phương',
    meaning: 'Thể hiện sự kính trọng đối phương bằng cách khiêm nhường hạ hành động của bản thân',
    explanation:
      'So sánh cốt lõi:\n• 先生がいらっしゃいます (Thầy/cô đến) → Tôn kính người thực hiện.\n• 私が参ります (Tôi sẽ đến) → Khiêm nhường về hành động của bản thân.',
    examples: [
      { japanese: '先生がいらっしゃいます。 / 私が参ります。', vietnamese: 'Thầy/cô đến (tôn kính) / Tôi sẽ đến (khiêm nhường).' },
    ],
  },
  {
    id: 'g-b50-2',
    level: 'N4',
    lesson: 50,
    order: 2,
    title: '2. Các động từ khiêm nhường đặc biệt',
    structure: '行く/来る→参る | いる→おる | 言う→申す/申し上げる | する→いたす | 食べる/飲む/もらう→いただく\n見る→拝見する | 聞く/訪ねる→伺う | 会う→お目にかかる | あげる→差し上げる | 知っている→存じている',
    meaning: 'Các động từ khiêm nhường ngữ đặc biệt bắt buộc phải nhớ',
    explanation:
      '• 行く・来る → 参る\n• いる → おる\n• 言う → 申す / 申し上げる (thưa, trình bày)\n• する → いたす\n• 食べる・飲む・もらう → いただく\n• 見る → 拝見する\n• 聞く・訪ねる → 伺う\n• 会う → お目にかかる\n• あげる → 差し上げる\n• 知っている → 存じている',
    examples: [
      { japanese: '私は明日、会社へ参ります。', vietnamese: 'Ngày mai tôi sẽ đến công ty.' },
      { japanese: '私は田中と申します。', vietnamese: 'Tôi tên là Tanaka.' },
      { japanese: '資料を拝見しました。', vietnamese: 'Tôi đã xem tài liệu.' },
      { japanese: '先生に伺いたいことがあります。', vietnamese: 'Tôi có điều muốn hỏi thầy/cô.' },
      { japanese: '先生にお目にかかれて、うれしいです。', vietnamese: 'Tôi rất vui vì được gặp thầy/cô.' },
    ],
  },
  {
    id: 'g-b50-3',
    level: 'N4',
    lesson: 50,
    order: 3,
    title: '3. お／ご～します',
    structure: 'お + Vます (bỏ ます) + します\nTừ Hán Nhật: ご + N + します',
    meaning: 'Thể hiện hành động của bản thân làm cho đối phương một cách khiêm nhường',
    explanation:
      'Khuôn mẫu phổ biến để biến hành động của mình (như cầm giúp, hướng dẫn, giải thích, gửi...) thành khiêm nhường ngữ.',
    examples: [
      { japanese: '私が荷物をお持ちします。', vietnamese: 'Tôi sẽ xách hành lý giúp anh/chị.' },
      { japanese: '私がご案内します。', vietnamese: 'Tôi sẽ hướng dẫn anh/chị.' },
      { japanese: '資料をお送りします。', vietnamese: 'Tôi xin gửi tài liệu.' },
    ],
  },
  {
    id: 'g-b50-4',
    level: 'N4',
    lesson: 50,
    order: 4,
    title: '4. お／ご～いたします',
    structure: 'お／ご + Vます (bỏ ます) / N + いたします',
    meaning: 'Dạng khiêm nhường trang trọng hơn (thường dùng trong công việc, kinh doanh)',
    explanation:
      'Thay します bằng いたします (khiêm nhường của する) để tăng thêm độ lịch sự và chuyên nghiệp trong môi trường công sở.',
    examples: [
      { japanese: '後ほどご連絡いたします。', vietnamese: 'Tôi sẽ liên lạc lại sau.' },
      { japanese: '私がご説明いたします。', vietnamese: 'Tôi xin phép giải thích.' },
    ],
  },
  {
    id: 'g-b50-5',
    level: 'N4',
    lesson: 50,
    order: 5,
    title: '5. 丁寧語 – Ngôn ngữ lịch sự',
    structure: 'だ → です | V thể từ điển → Vます | ある → あります | いる → います',
    meaning: 'Cách nói lịch sự thông thường với người đối diện',
    explanation:
      '丁寧語 giúp câu nói trở nên lịch sự, nhã nhặn ở mức chuẩn mực hàng ngày mà không nhất thiết nâng đối phương hay hạ bản thân.',
    examples: [
      { japanese: 'これは本だ。 → これは本です。', vietnamese: 'Đây là sách (thể thông thường → thể lịch sự).' },
      { japanese: '学校へ行きます。 / リンゴを食べます。', vietnamese: 'Tôi đi học / Tôi ăn táo (丁寧語).' },
    ],
  },
  {
    id: 'g-b50-6',
    level: 'N4',
    lesson: 50,
    order: 6,
    title: '6. Phân biệt 尊敬語／謙譲語／丁寧語',
    structure: '尊敬語 (nâng đối phương) vs 謙譲語 (hạ bản thân) vs 丁寧語 (lịch sự chung)',
    meaning: 'Hệ thống 3 loại kính ngữ trong tiếng Nhật',
    explanation:
      '• 尊敬語 (Tôn kính ngữ): Nâng người nghe/người được nhắc đến (ví dụ: 先生がいらっしゃいます).\n• 謙譲語 (Khiêm nhường ngữ): Hạ hành động của mình để kính trọng đối phương (ví dụ: 私が参ります).\n• 丁寧語 (Lịch sự ngữ): Làm câu nói lịch sự với người nghe (ví dụ: 行きます, です).',
    examples: [
      { japanese: '先生がいらっしゃいます。(尊敬語) / 私が参ります。(謙譲語) / 行きます。(丁寧語)', vietnamese: 'Thầy đến / Tôi đến / Đi (lịch sự).' },
    ],
  },
  {
    id: 'g-b50-7',
    level: 'N4',
    lesson: 50,
    order: 7,
    title: '7. Các cặp kính ngữ cần thuộc & 謙譲語 I/II',
    structure: 'Nghĩa: Thường | Tôn kính | Khiêm nhường',
    meaning: 'Bảng đối chiếu nhanh các cặp Tôn kính – Khiêm nhường cốt lõi',
    explanation:
      '• Đi / đến: いらっしゃる | 参る\n• Ở: いらっしゃる | おる\n• Nói: おっしゃる | 申す\n• Làm: なさる | いたす\n• Ăn / uống: 召し上がる | いただく\n• Xem: ご覧になる | 拝見する\n• Biết: ご存じです | 存じています\n• Cho / nhận: くださる (cho) | いただく (nhận)\n• Gặp: — | お目にかかる',
    examples: [
      { japanese: '社長は資料をご覧になりました。私はまだ拝見していません。', vietnamese: 'Giám đốc đã xem tài liệu rồi. Tôi vẫn chưa được xem.' },
    ],
    notes: [
      '[Mở rộng] Trong tiếng Nhật công sở còn phân biệt 謙譲語 I (hướng đến đối phương như 伺う, 拝見する) và 謙譲語 II / 丁重語 (nói trang trọng lịch sự như 参る, 申す, おる) tùy cách phân loại và ngữ cảnh.',
    ],
  },
];

// PHẦN VI. BẢNG TỔNG HỢP CÁCH CHIA THỂ QUAN TRỌNG
export const N4_VERB_SUMMARY: N4VerbSummaryRow[] = [
  { form: 'Từ điển', group1: '書く', group2: '食べる', group3: 'する' },
  { form: 'ます', group1: '書きます', group2: '食べます', group3: 'します' },
  { form: 'ない', group1: '書かない', group2: '食べない', group3: 'しない' },
  { form: 'た', group1: '書いた', group2: '食べた', group3: 'した' },
  { form: 'て', group1: '書いて', group2: '食べて', group3: 'して' },
  { form: 'Khả năng', group1: '書ける', group2: '食べられる', group3: 'できる' },
  { form: 'Ý chí', group1: '書こう', group2: '食べよう', group3: 'しよう' },
  { form: 'Điều kiện ば', group1: '書けば', group2: '食べれば', group3: 'すれば' },
  { form: 'Bị động', group1: '書かれる', group2: '食べられる', group3: 'される' },
  { form: 'Sai khiến', group1: '書かせる', group2: '食べさせる', group3: 'させる' },
  { form: 'Mệnh lệnh', group1: '書け', group2: '食べろ', group3: 'しろ' },
  { form: 'Cấm đoán', group1: '書くな', group2: '食べるな', group3: 'するな' },
];

export const N4_GROUP1_SPECIAL: N4Group1SpecialRow[] = [
  { dict: '買う', potential: '買える', passive: '買われる', causative: '買わせる' },
  { dict: '書く', potential: '書ける', passive: '書かれる', causative: '書かせる' },
  { dict: '泳ぐ', potential: '泳げる', passive: '泳がれる', causative: '泳がせる' },
  { dict: '話す', potential: '話せる', passive: '話される', causative: '話させる' },
  { dict: '待つ', potential: '待てる', passive: '待たれる', causative: '待たせる' },
  { dict: '飲む', potential: '飲める', passive: '飲まれる', causative: '飲ませる' },
  { dict: '遊ぶ', potential: '遊べる', passive: '遊ばれる', causative: '遊ばせる' },
  { dict: '取る', potential: '取れる', passive: '取られる', causative: '取らせる' },
];

export const N4_ADJ_SUMMARY: N4AdjSummaryRow[] = [
  { form: 'Khẳng định', iAdj: '高い', naAdj: '静かだ' },
  { form: 'Phủ định', iAdj: '高くない', naAdj: '静かではない' },
  { form: 'Quá khứ', iAdj: '高かった', naAdj: '静かだった' },
  { form: 'Quá khứ phủ định', iAdj: '高くなかった', naAdj: '静かではなかった' },
  { form: '～ので', iAdj: '高いので', naAdj: '静かなので' },
  { form: '～のに', iAdj: '高いのに', naAdj: '静かなのに' },
  { form: '～んです', iAdj: '高いんです', naAdj: '静かなんです' },
  { form: '～ば', iAdj: '高ければ', naAdj: '静かなら' },
  { form: '～すぎる', iAdj: '高すぎる', naAdj: '静かすぎる' },
  { form: '～そう (dáng vẻ)', iAdj: '高そう', naAdj: '静かそう' },
  { form: '～よう', iAdj: '高いよう', naAdj: '静かなよう' },
];

// PHẦN VII. CÁC CẶP NGỮ PHÁP DỄ NHẦM NHẤT
export const N4_CONFUSING_PAIRS: N4ConfusingPair[] = [
  { pair: '～んです／～です', coreDifference: 'Giải thích/bối cảnh so với thông báo đơn thuần' },
  { pair: '見える／見られる', coreDifference: 'Tự nhiên nhìn thấy so với có thể xem' },
  { pair: '～ています／～てあります', coreDifference: 'Trạng thái tự nhiên so với trạng thái được chuẩn bị có chủ ý' },
  { pair: '～てしまう／～ておく', coreDifference: 'Hoàn tất/đáng tiếc so với chuẩn bị trước' },
  { pair: '～ようと思う／～つもり', coreDifference: 'Ý định đang hình thành so với dự định rõ ràng' },
  { pair: '～つもり／～予定', coreDifference: 'Ý định cá nhân so với lịch trình dự kiến' },
  { pair: '～でしょう／～かもしれない', coreDifference: 'Dự đoán có cơ sở so với khả năng chưa chắc' },
  { pair: '～と／～ば／～たら／～なら', coreDifference: 'Quy luật, điều kiện, thời điểm, tiếp nhận chủ đề' },
  { pair: '～ために／～ように', coreDifference: 'Mục đích có chủ ý so với hướng tới trạng thái/kết quả' },
  { pair: 'Bị động／Khả năng', coreDifference: 'Cùng hình thức (～られる) ở một số động từ nhưng khác ý nghĩa' },
  { pair: '～の／～こと', coreDifference: 'Danh từ hóa với khác biệt về sắc thái và cấu trúc đi kèm' },
  { pair: '～ので／～から', coreDifference: 'Cùng nêu nguyên nhân nhưng khác sắc thái (khách quan/mềm mại vs chủ quan)' },
  { pair: '～ないで／～なくて', coreDifference: 'Không làm A rồi làm B so với nguyên nhân/trạng thái' },
  { pair: '～そう (dáng vẻ)／～そう (truyền đạt)', coreDifference: 'Quan sát trực tiếp (bỏ い/ます) so với nghe thông tin (thể thường + そう)' },
  { pair: '～よう／～そう', coreDifference: 'Suy luận dựa trên dấu hiệu so với vẻ ngoài hoặc thông tin được nghe' },
  { pair: '～ところ／～たばかり', coreDifference: 'Thời điểm thực tế sát hiện tại so với cảm nhận sự việc còn mới' },
  { pair: '～てくれる／～てもらう', coreDifference: 'Khác góc nhìn chủ ngữ cho và nhận' },
  { pair: '尊敬語／謙譲語', coreDifference: 'Nâng đối phương so với hạ hành động của mình' },
];
