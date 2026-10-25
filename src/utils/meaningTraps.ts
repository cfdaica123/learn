import { VocabularyItem } from '../types';
import { ALL_VOCABULARY } from '../data/vocabulary';

export type SemanticCategory = 
  | 'verb'
  | 'adj'
  | 'time'
  | 'place'
  | 'person_job'
  | 'family'
  | 'direction_position'
  | 'pronoun_question'
  | 'vehicle'
  | 'food_drink'
  | 'daily_object'
  | 'greeting_phrase'
  | 'other';

/**
 * Handcrafted traps for common Japanese confusing pairs, antonyms, and subtle nuances
 * Key: word or hiragana
 * Value: array of confusing Vietnamese meanings that make great deceptive distractors
 */
export const HANDCRAFTED_MEANING_TRAPS: Record<string, string[]> = {
  // --- ĐỘNG TỪ TƯƠNG HỖ / ĐỐI LẬP / DỄ NHẦM ---
  '貸します': ['mượn, vay (từ ai)', 'trả lại', 'gửi đi', 'bán'],
  '借ります': ['cho mượn, cho vay', 'mua', 'trả lại', 'nhận'],
  '教えます': ['học, được dạy (từ ai)', 'nói, kể chuyện', 'hỏi', 'giải thích'],
  '習います': ['dạy, chỉ bảo', 'học bài, ôn tập', 'hiểu', 'nghe giảng'],
  'あげます': ['nhận (từ ai)', 'cho mượn', 'gửi', 'bán'],
  'もらいます': ['tặng, cho (ai đó)', 'mua', 'cho mượn', 'vay'],
  '行きます': ['đến, tới', 'về, trở về', 'chạy', 'ra ngoài'],
  '来る': ['đi', 'về, trở về', 'vào', 'rời đi'],
  '来ます': ['đi', 'về, trở về', 'vào', 'rời đi'],
  '帰る': ['đi', 'đến, tới', 'ra ngoài', 'về đến nơi'],
  '帰ります': ['đi', 'đến, tới', 'ra ngoài', 'về đến nơi'],
  '開けます': ['đóng', 'bật (điện/máy)', 'bắt đầu', 'mở khoá'],
  '閉めます': ['mở', 'tắt (điện/máy)', 'kết thúc', 'khoá lại'],
  'つけます': ['tắt (điện/máy)', 'mở (cửa)', 'cởi ra', 'đốt'],
  '消します': ['bật (điện/máy)', 'đóng (cửa)', 'xoá', 'lau chùi'],
  '入ります': ['ra, rời khỏi', 'lên (xe)', 'bước tới', 'xuất viện'],
  '出ます': ['vào', 'xuống (xe)', 'nhập viện', 'đến nơi'],
  '乗ります': ['xuống (xe, tàu)', 'lái xe', 'đi bộ', 'chuyển tàu'],
  '降ります': ['lên (xe, tàu)', 'vào trong', 'ngồi xuống', 'dừng lại'],
  '買います': ['bán', 'cho mượn', 'mượn', 'trả tiền'],
  '売ります': ['mua', 'cho tặng', 'giảm giá', 'thuê'],
  '始めます': ['kết thúc, xong', 'tiếp tục', 'nghỉ ngơi', 'chuẩn bị'],
  '終わります': ['bắt đầu', 'tiếp tục', 'dừng lại', 'tạm nghỉ'],
  '待ちます': ['cầm, mang theo', 'gặp', 'gọi điện', 'tìm kiếm'],
  '持ちます': ['chờ, đợi', 'cầm, nắm, có', 'mang về', 'trả tiền'],
  '呼びます': ['đọc', 'hỏi', 'mời', 'nói chuyện'],
  '話します': ['nghe', 'nói, trò chuyện', 'hỏi', 'kể'],
  '聞きます': ['nói', 'nhìn', 'đọc', 'viết'],
  '見ます': ['cho xem', 'nghe', 'tìm', 'đọc'],
  '見せます': ['nhìn, xem', 'chỉ bảo', 'dạy', 'cho mượn'],
  '送ります': ['nhận', 'gửi, tiễn', 'mang đến', 'cho vay'],
  '切ります': ['dán', 'gấp', 'buộc', 'bẻ'],
  '貼ります': ['cắt', 'gấp', 'viết', 'treo'],
  '覚えます': ['quên', 'nhớ, ghi nhớ', 'học thuộc', 'suy nghĩ'],
  '忘れます': ['nhớ, ghi nhớ', 'bỏ rơi', 'để quên', 'nhầm lẫn'],
  'なくします': ['tìm thấy', 'nhặt được', 'đánh mất', 'vứt đi'],
  '払います': ['nhận tiền', 'vay tiền', 'trả tiền, thanh toán', 'đếm tiền'],
  '脱ぎます': ['mặc (áo)', 'đội (mũ)', 'đi (giày)', 'tháo (kính)'],
  '着ます': ['cởi ra', 'mặc (áo)', 'đội (mũ)', 'thay đồ'],
  '履きます': ['mặc (áo)', 'cởi ra', 'đi, xỏ (giày, quần)', 'thắt lưng'],
  'かぶります': ['cởi mũ', 'đeo kính', 'đội (mũ)', 'khoác áo'],
  'かけます': ['tháo kính', 'đeo (kính)', 'cất kính', 'lau kính'],

  // --- TÍNH TỪ ĐỐI LẬP & PHÂN BIỆT SẮC THÁI ---
  '寒い': ['lạnh (đồ ăn, nước uống, đồ vật)', 'mát mẻ', 'nóng (thời tiết)', 'ấm áp'],
  '冷たい': ['lạnh (thời tiết, không khí)', 'mát mẻ', 'nóng (đồ ăn)', 'ấm'],
  '暑い': ['nóng (đồ ăn, nước, vật thể)', 'ấm áp', 'lạnh', 'cay'],
  '熱い': ['nóng (thời tiết, khí hậu)', 'ấm áp', 'lạnh buốt', 'cháy'],
  '高い': ['thấp', 'rẻ', 'ngắn', 'nhỏ'],
  '安い': ['đắt, cao', 'thấp', 'tiện lợi', 'nghèo'],
  '低い': ['cao', 'đắt', 'ngắn', 'dày'],
  '大きい': ['nhỏ, bé', 'nhiều', 'rộng lớn', 'dài'],
  '小さい': ['to, lớn', 'ít', 'chật hẹp', 'ngắn'],
  '新しい': ['cũ', 'cổ kính', 'xấu', 'hỏng'],
  '古い': ['mới', 'hiện đại', 'trẻ tuổi', 'đẹp'],
  'いい': ['xấu, tồi', 'khó', 'nguy hiểm', 'bẩn'],
  '悪い': ['tốt, đẹp', 'dễ thương', 'an toàn', 'tiện'],
  '面白い': ['chán, buồn tẻ', 'khó hiểu', 'buồn cười', 'nguy hiểm'],
  'つまらない': ['thú vị, hay', 'hài hước', 'bận rộn', 'dễ'],
  '忙しい': ['rảnh rỗi', 'nhàn hạ', 'buồn chán', 'mệt mỏi'],
  '暇': ['bận rộn', 'vất vả', 'gấp rút', 'yên tĩnh'],
  '近い': ['xa', 'rộng', 'nhanh', 'sâu'],
  '遠い': ['gần', 'hẹp', 'chậm', 'ngắn'],
  '速い': ['chậm', 'sớm', 'muộn', 'gần'],
  '遅い': ['nhanh', 'sớm', 'xa', 'vội'],
  '早い': ['muộn, trễ', 'chậm', 'sớm', 'dài'],
  '多い': ['ít', 'nhỏ', 'hiếm', 'vắng'],
  '少ない': ['nhiều', 'lớn', 'đông đúc', 'đầy'],
  '暖かい': ['nóng', 'mát mẻ', 'lạnh buốt', 'ấm cúng'],
  '温かい': ['nóng (thời tiết)', 'lạnh (đồ uống)', 'nguội', 'mát'],
  '涼しい': ['nóng bức', 'lạnh giá', 'ấm áp', 'dễ chịu'],
  '甘い': ['cay', 'đắng', 'mặn', 'chua'],
  '辛い': ['ngọt', 'nhạt', 'bùi', 'đắng'],
  '苦い': ['ngọt', 'cay', 'chát', 'mặn'],
  '重い': ['nhẹ', 'mỏng', 'yếu', 'chậm'],
  '軽い': ['nặng', 'dày', 'mạnh', 'chắc'],
  '広い': ['chật, hẹp', 'nhỏ', 'thấp', 'nông'],
  '狭い': ['rộng rãi', 'to lớn', 'cao', 'sâu'],
  '静か': ['ồn ào, náo nhiệt', 'đông đúc', 'vui vẻ', 'nguy hiểm'],
  'にぎやか': ['yên tĩnh', 'vắng vẻ', 'buồn tẻ', 'sạch sẽ'],
  'きれい': ['bẩn, xấu', 'tối', 'hẹp', 'bừa bãi'],
  '便利': ['bất tiện', 'khó dùng', 'đắt đỏ', 'xa xôi'],
  '不便': ['tiện lợi', 'thuận tiện', 'dễ dàng', 'nhanh'],
  '簡単': ['khó, phức tạp', 'dài dòng', 'nguy hiểm', 'nặng'],
  '難しい': ['dễ, đơn giản', 'ngắn', 'tiện lợi', 'an toàn'],
  '上手': ['kém, dở', 'vụng về', 'chưa quen', 'ngại ngùng'],
  '下手': ['giỏi, khéo', 'thành thạo', 'sở trường', 'quen thuộc'],
  '好き': ['ghét', 'bình thường', 'không thích', 'sợ'],
  '嫌い': ['thích', 'yêu quý', 'khoái khẩu', 'hứng thú'],

  // --- TỪ CHỈ THỜI GIAN DỄ BỊ BẪY ---
  '昨日': ['hôm nay', 'ngày mai', 'hôm kia', 'sáng nay'],
  'きのう': ['hôm nay', 'ngày mai', 'hôm kia', 'tối qua'],
  '今日': ['hôm qua', 'ngày mai', 'hôm nay', 'bây giờ'],
  'きょう': ['hôm qua', 'ngày mai', 'hôm nay', 'bây giờ'],
  '明日': ['hôm nay', 'ngày mốt, ngày kia', 'hôm qua', 'sáng mai'],
  'あした': ['hôm nay', 'ngày mốt, ngày kia', 'hôm qua', 'tuần sau'],
  '一昨日': ['ngày mốt, ngày kia', 'hôm qua', 'tuần trước', 'hôm nay'],
  'おととい': ['ngày mốt, ngày kia', 'hôm qua', 'tuần trước', 'tháng trước'],
  '明後日': ['hôm kia', 'ngày mai', 'hôm nay', 'tuần sau'],
  'あさって': ['hôm kia', 'ngày mai', 'hôm nay', 'tháng sau'],
  '今朝': ['tối nay', 'sáng mai', 'hôm qua', 'mỗi sáng'],
  '今晩': ['sáng nay', 'tối qua', 'tối mai', 'mỗi tối'],
  '先週': ['tuần này', 'tuần sau', 'tháng trước', 'năm ngoái'],
  '今週': ['tuần trước', 'tuần sau', 'tuần này', 'tháng này'],
  '来週': ['tuần này', 'tuần sau nữa', 'tuần trước', 'tháng sau'],
  '先月': ['tháng này', 'tháng sau', 'năm ngoái', 'tuần trước'],
  '今月': ['tháng trước', 'tháng sau', 'tháng này', 'năm nay'],
  '来月': ['tháng này', 'tháng sau nữa', 'tháng trước', 'năm sau'],
  '去年': ['năm nay', 'năm sau', 'năm ngoái', 'tháng trước'],
  '今年': ['năm ngoái', 'năm sau', 'năm nay', 'bây giờ'],
  '来年': ['năm nay', 'năm sau nữa', 'năm ngoái', 'tháng sau'],
  '朝': ['buổi trưa', 'buổi tối, chiều tối', 'buổi đêm', 'sáng sớm'],
  '昼': ['buổi sáng', 'buổi tối, chiều tối', 'buổi trưa', 'nửa đêm'],
  '晩': ['buổi sáng', 'buổi trưa', 'buổi tối', 'chiều tà'],
  '夜': ['buổi sáng', 'buổi trưa', 'buổi chiều', 'buổi tối, đêm'],
  '毎朝': ['mỗi tối', 'mỗi ngày', 'mỗi tuần', 'mỗi sáng'],
  '毎晩': ['mỗi sáng', 'mỗi ngày', 'mỗi tháng', 'mỗi tối'],
  '毎日': ['mỗi tuần', 'mỗi tháng', 'mỗi năm', 'mỗi ngày'],

  // --- NGHỀ NGHIỆP & CON NGƯỜI (XƯNG HÔ) ---
  '先生': ['giáo viên (nghề nghiệp)', 'học sinh, sinh viên', 'bác sĩ', 'nhà nghiên cứu'],
  '教師': ['thầy giáo, cô giáo (xưng hô/tôn kính)', 'học sinh, sinh viên', 'bác sĩ', 'nhân viên công ty'],
  '学生': ['thầy cô giáo', 'nhà nghiên cứu', 'du học sinh', 'học sinh, sinh viên'],
  '会社員': ['nhân viên (công ty ~)', 'nhân viên ngân hàng', 'công chức', 'giám đốc'],
  '社員': ['nhân viên công ty (nói chung)', 'nhân viên ngân hàng', 'kỹ sư', 'người làm thêm'],
  '医者': ['y tá', 'dược sĩ', 'bác sĩ', 'bệnh nhân'],
  '研究者': ['giáo viên', 'học sinh', 'nhà khoa học', 'kỹ sư'],
  'あの方': ['người kia (thông thường)', 'người này', 'ai đó', 'bạn bè'],
  'あの人': ['vị kia (lịch sự)', 'người này', 'người kia', 'ai'],
  'どなた': ['ai (thông thường)', 'người nào', 'vị nào (lịch sự)', 'cái nào'],
  'だれ': ['ai (cách nói lịch sự)', 'người kia', 'ai', 'cái nào'],
  'おいくつ': ['mấy tuổi (thông thường)', 'bao nhiêu tiền', 'bao nhiêu cái', 'bao nhiêu tuổi (lịch sự)'],
  '何歳': ['bao nhiêu tuổi (lịch sự)', 'mấy giờ', 'mấy tuổi', 'năm nào'],

  // --- ĐỊA ĐIỂM & TÒA NHÀ ---
  '病院': ['hiệu thuốc', 'tiệm cắt tóc / thẩm mỹ viện', 'phòng khám', 'bệnh viện'],
  '美容院': ['bệnh viện (びょういん)', 'khách sạn', 'tiệm làm đẹp, cắt tóc', 'spa'],
  '図書館': ['bảo tàng mỹ thuật', 'nhà sách', 'bưu điện', 'thư viện'],
  '美術館': ['thư viện', 'bảo tàng lịch sử', 'rạp chiếu phim', 'bảo tàng mỹ thuật'],
  '郵便局': ['ngân hàng', 'thư viện', 'ủy ban thị xã', 'bưu điện'],
  '銀行': ['bưu điện', 'công ty', 'siêu thị', 'ngân hàng'],
  '学校': ['trường đại học', 'bệnh viện', 'công ty', 'trường học'],
  '大学': ['trường cấp 3', 'viện nghiên cứu', 'trường đại học', 'học viện'],
  '駅': ['bến xe buýt', 'sân bay', 'nhà ga', 'bến cảng'],
  '空港': ['nhà ga', 'bến tàu', 'sân bay', 'bến xe'],

  // --- PHƯƠNG TIỆN GIAO THÔNG ---
  '電車': ['tàu điện ngầm', 'tàu shinkansen', 'tàu hoả', 'xe buýt'],
  '地下鉄': ['tàu điện trên cao', 'tàu shinkansen', 'tàu điện ngầm', 'xe buýt'],
  '新幹線': ['tàu điện ngầm', 'tàu hoả thường', 'tàu cao tốc Shinkansen', 'máy bay'],
  '飛行機': ['sân bay', 'tàu thuỷ', 'máy bay', 'khinh khí cầu'],
  '船': ['tàu điện', 'máy bay', 'thuyền, tàu thuỷ', 'ca nô'],
  '自転車': ['xe máy', 'ô tô', 'xe đạp', 'xe buýt'],

  // --- ĐẠI TỪ CHỈ ĐỊNH (KORE - SORE - ARE - DORE) ---
  'これ': ['cái đó (gần người nghe)', 'cái kia (xa cả hai)', 'cái nào (nghi vấn)', 'cái này (gần người nói)'],
  'それ': ['cái này (gần người nói)', 'cái kia (xa cả hai)', 'cái nào (nghi vấn)', 'cái đó (gần người nghe)'],
  'あれ': ['cái này (gần người nói)', 'cái đó (gần người nghe)', 'cái nào (nghi vấn)', 'cái kia (xa cả hai)'],
  'どれ': ['cái này (gần người nói)', 'cái đó (gần người nghe)', 'cái kia (xa cả hai)', 'cái nào (nghi vấn)'],
  'ここ': ['chỗ đó (gần người nghe)', 'chỗ kia (xa cả hai)', 'chỗ nào (nghi vấn)', 'chỗ này (gần người nói)'],
  'そこ': ['chỗ này (gần người nói)', 'chỗ kia (xa cả hai)', 'chỗ nào (nghi vấn)', 'chỗ đó (gần người nghe)'],
  'あそこ': ['chỗ này (gần người nói)', 'chỗ đó (gần người nghe)', 'chỗ nào (nghi vấn)', 'chỗ kia (xa cả hai)'],
  'どこ': ['chỗ này', 'chỗ đó', 'chỗ kia', 'chỗ nào, ở đâu'],
  'こちら': ['phía đó', 'phía kia', 'phía nào', 'phía này, chỗ này (lịch sự)'],
  'そちら': ['phía này', 'phía kia', 'phía nào', 'phía đó, chỗ đó (lịch sự)'],
  'あちら': ['phía này', 'phía đó', 'phía nào', 'phía kia, chỗ kia (lịch sự)'],
  'どちら': ['phía này', 'phía đó', 'phía kia', 'phía nào, hướng nào (lịch sự)'],

  // --- GIA ĐÌNH & QUAN HỆ ---
  '父': ['mẹ tôi', 'bố bạn (người khác)', 'anh trai tôi', 'bố tôi'],
  '母': ['bố tôi', 'mẹ bạn (người khác)', 'chị gái tôi', 'mẹ tôi'],
  'お父さん': ['bố tôi', 'mẹ bạn (người khác)', 'ông bạn', 'bố của bạn'],
  'お母さん': ['mẹ tôi', 'bố bạn (người khác)', 'bà bạn', 'mẹ của bạn'],
  '兄': ['anh trai bạn', 'em trai tôi', 'chị gái tôi', 'anh trai tôi'],
  'お兄さん': ['anh trai tôi', 'chị gái bạn', 'em trai bạn', 'anh trai của bạn'],
  '姉': ['chị gái bạn', 'em gái tôi', 'mẹ tôi', 'chị gái tôi'],
  'お姉さん': ['chị gái tôi', 'anh trai bạn', 'em gái bạn', 'chị gái của bạn'],
  '弟': ['em trai bạn', 'anh trai tôi', 'em gái tôi', 'em trai tôi'],
  '妹': ['em gái bạn', 'chị gái tôi', 'em trai tôi', 'em gái tôi'],
  '夫': ['vợ tôi', 'chồng bạn', 'chồng tôi', 'con trai'],
  '妻': ['chồng tôi', 'vợ bạn', 'vợ tôi', 'con gái']
};

/**
 * Classifies a vocabulary item into a semantic domain for targeted distractors
 */
export function classifyWord(item: VocabularyItem): SemanticCategory {
  const w = item.word;
  const h = item.hiragana;
  const m = item.meaning.toLowerCase();

  // 1. Verbs: ends in ます, or common verb indicators
  if (
    h.endsWith('ます') || 
    h.endsWith('る') || 
    h.endsWith('う') || 
    h.endsWith('く') || 
    h.endsWith('ぐ') || 
    h.endsWith('す') || 
    h.endsWith('つ') || 
    h.endsWith('ぬ') || 
    h.endsWith('ぶ') || 
    h.endsWith('む') ||
    m.startsWith('đi') || 
    m.startsWith('đến') || 
    m.startsWith('ăn') || 
    m.startsWith('uống') || 
    m.startsWith('làm') ||
    m.startsWith('mua') ||
    m.startsWith('bán') ||
    m.startsWith('học') ||
    m.startsWith('dạy') ||
    m.startsWith('mượn') ||
    m.startsWith('cho mượn') ||
    m.startsWith('mở') ||
    m.startsWith('đóng') ||
    m.startsWith('bật') ||
    m.startsWith('tắt') ||
    m.startsWith('chờ') ||
    m.startsWith('gọi') ||
    m.startsWith('viết') ||
    m.startsWith('đọc') ||
    m.startsWith('nghe') ||
    m.startsWith('xem') ||
    m.startsWith('gặp')
  ) {
    // Avoid mistaking nouns like 休み (nghỉ ngơi)
    if (!m.includes('ngày nghỉ') && !m.includes('giờ nghỉ')) {
      return 'verb';
    }
  }

  // 2. Adjectives
  if (
    h.endsWith('い') || 
    item.note?.includes('tính từ') || 
    m.includes('nóng') || 
    m.includes('lạnh') || 
    m.includes('đắt') || 
    m.includes('rẻ') || 
    m.includes('to') || 
    m.includes('nhỏ') || 
    m.includes('mới') || 
    m.includes('cũ') || 
    m.includes('tốt') || 
    m.includes('xấu') || 
    m.includes('tiện lợi') || 
    m.includes('yên tĩnh') || 
    m.includes('sạch sẽ') || 
    m.includes('bận') || 
    m.includes('rảnh') ||
    m.includes('thích') ||
    m.includes('ghét') ||
    m.includes('giỏi') ||
    m.includes('kém')
  ) {
    if (!['わたし', 'あさ', 'ひる', 'よる', 'ほん'].includes(h)) {
      return 'adj';
    }
  }

  // 3. Time
  if (
    m.includes('hôm') || 
    m.includes('ngày') || 
    m.includes('tuần') || 
    m.includes('tháng') || 
    m.includes('năm') || 
    m.includes('sáng') || 
    m.includes('trưa') || 
    m.includes('tối') || 
    m.includes('đêm') || 
    m.includes('giờ') || 
    m.includes('phút') || 
    m.includes('thứ ') ||
    m.includes('bây giờ') ||
    h.includes('ようび') ||
    h.includes('まい') ||
    h.endsWith('じ') ||
    h.endsWith('ふん') ||
    h.endsWith('ぷん')
  ) {
    return 'time';
  }

  // 4. Place / Building
  if (
    m.includes('bệnh viện') || 
    m.includes('trường') || 
    m.includes('ngân hàng') || 
    m.includes('thư viện') || 
    m.includes('bưu điện') || 
    m.includes('nhà ga') || 
    m.includes('sân bay') || 
    m.includes('bảo tàng') || 
    m.includes('khách sạn') || 
    m.includes('nhà hàng') || 
    m.includes('công ty') || 
    m.includes('siêu thị') || 
    m.includes('phòng') ||
    m.includes('nhà ga') ||
    h.endsWith('かん') ||
    h.endsWith('えき') ||
    h.endsWith('いん') ||
    h.endsWith('きょく')
  ) {
    return 'place';
  }

  // 5. Family
  if (
    m.includes('bố') || 
    m.includes('mẹ') || 
    m.includes('anh') || 
    m.includes('chị') || 
    m.includes('em') || 
    m.includes('ông') || 
    m.includes('bà') || 
    m.includes('chồng') || 
    m.includes('vợ') || 
    m.includes('con') ||
    m.includes('gia đình')
  ) {
    return 'family';
  }

  // 6. Person / Job
  if (
    m.includes('giáo viên') || 
    m.includes('thầy') || 
    m.includes('học sinh') || 
    m.includes('sinh viên') || 
    m.includes('bác sĩ') || 
    m.includes('nhân viên') || 
    m.includes('nghiên cứu') || 
    m.includes('kỹ sư') || 
    m.includes('ai') || 
    m.includes('bạn') || 
    m.includes('tôi') || 
    m.includes('người')
  ) {
    return 'person_job';
  }

  // 7. Direction / Pronoun
  if (
    m.includes('cái này') || 
    m.includes('cái đó') || 
    m.includes('cái kia') || 
    m.includes('cái nào') || 
    m.includes('chỗ này') || 
    m.includes('chỗ đó') || 
    m.includes('chỗ kia') || 
    m.includes('ở đâu') || 
    m.includes('phía') || 
    m.includes('bên trên') || 
    m.includes('dưới') || 
    m.includes('trong') || 
    m.includes('ngoài') || 
    m.includes('trước') || 
    m.includes('sau')
  ) {
    return 'direction_position';
  }

  // 8. Vehicle
  if (
    m.includes('tàu') || 
    m.includes('xe') || 
    m.includes('máy bay') || 
    m.includes('thuyền')
  ) {
    return 'vehicle';
  }

  // 9. Food & Drink
  if (
    m.includes('cơm') || 
    m.includes('bánh') || 
    m.includes('thịt') || 
    m.includes('cá') || 
    m.includes('rau') || 
    m.includes('trứng') || 
    m.includes('nước') || 
    m.includes('trà') || 
    m.includes('cà phê') || 
    m.includes('rượu') || 
    m.includes('bia')
  ) {
    return 'food_drink';
  }

  // 10. Daily Object
  if (
    m.includes('sách') || 
    m.includes('bút') || 
    m.includes('từ điển') || 
    m.includes('báo') || 
    m.includes('tạp chí') || 
    m.includes('ô') || 
    m.includes('cặp') || 
    m.includes('đồng hồ') || 
    m.includes('chìa khóa') || 
    m.includes('điện thoại') || 
    m.includes('máy tính')
  ) {
    return 'daily_object';
  }

  return 'other';
}

/**
 * Generates super-challenging, realistic distractors for "Meaning" quiz
 * Prioritizes:
 * 1. Handcrafted confusable pairs / antonyms / traps
 * 2. Words from the exact same semantic category (verbs with verbs, time with time, places with places)
 * 3. Words from the same lesson or pool with closest structural similarity
 */
export function generateChallengingMeaningTraps(
  targetItem: VocabularyItem,
  currentPool: VocabularyItem[]
): string[] {
  const correctAnswer = targetItem.meaning.trim();
  const targetCategory = classifyWord(targetItem);
  const distractors: string[] = [];

  // Step 1: Check handcrafted dictionary (exact word or hiragana)
  const directTraps = 
    HANDCRAFTED_MEANING_TRAPS[targetItem.word] || 
    HANDCRAFTED_MEANING_TRAPS[targetItem.hiragana];

  if (directTraps && directTraps.length > 0) {
    const filteredTraps = directTraps.filter(
      (trap) => trap.toLowerCase() !== correctAnswer.toLowerCase()
    );
    distractors.push(...filteredTraps);
  }

  // Step 2: Pool items matching the SAME semantic category
  const sameCategoryFromPool = currentPool.filter((it) => {
    if (it.id === targetItem.id) return false;
    if (it.meaning.trim() === correctAnswer) return false;
    return classifyWord(it) === targetCategory;
  });

  // Shuffle and add up to needed
  const shuffledPoolCategory = [...sameCategoryFromPool]
    .map((it) => it.meaning.trim())
    .filter((m) => m !== correctAnswer && !distractors.includes(m))
    .sort(() => 0.5 - Math.random());

  distractors.push(...shuffledPoolCategory);

  // Step 3: If still < 3 distractors, look at ALL_VOCABULARY for the same semantic category
  if (distractors.length < 3) {
    const allSameCategory = ALL_VOCABULARY.filter((it) => {
      if (it.id === targetItem.id) return false;
      if (it.meaning.trim() === correctAnswer) return false;
      return classifyWord(it) === targetCategory;
    });

    const shuffledAllCategory = [...allSameCategory]
      .map((it) => it.meaning.trim())
      .filter((m) => m !== correctAnswer && !distractors.includes(m))
      .sort(() => 0.5 - Math.random());

    distractors.push(...shuffledAllCategory);
  }

  // Step 4: Fallback to same lesson pool, then ALL_VOCABULARY
  if (distractors.length < 3) {
    const poolFallback = currentPool
      .filter((it) => it.id !== targetItem.id && it.meaning.trim() !== correctAnswer)
      .map((it) => it.meaning.trim())
      .filter((m) => !distractors.includes(m))
      .sort(() => 0.5 - Math.random());

    distractors.push(...poolFallback);
  }

  if (distractors.length < 3) {
    const allFallback = ALL_VOCABULARY
      .filter((it) => it.id !== targetItem.id && it.meaning.trim() !== correctAnswer)
      .map((it) => it.meaning.trim())
      .filter((m) => !distractors.includes(m))
      .sort(() => 0.5 - Math.random());

    distractors.push(...allFallback);
  }

  // Unique and slice top 3
  const unique = Array.from(new Set(distractors)).slice(0, 3);
  return unique;
}
