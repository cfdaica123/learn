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
  | 'demonstrative'
  | 'vehicle'
  | 'food_drink'
  | 'daily_object'
  | 'greeting_phrase'
  | 'adverb_quantity'
  | 'other';

/**
 * Sanitizes any meaning string:
 * - Strips all Japanese characters (Hiragana, Katakana, Kanji) completely
 * - Cleans up dangling brackets, empty parentheses, or dangling hyphens
 * - Ensures 100% pure Vietnamese text for the quiz options
 */
export function sanitizeMeaningOption(text: string): string {
  if (!text) return '';
  return text
    // Remove all Japanese characters (Hiragana \u3040-\u309F, Katakana \u30A0-\u30FF, Kanji \u4E00-\u9FAF)
    .replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g, '')
    // Remove parentheses or brackets that contain no letters or digits (e.g. "()", "([])", "(-)")
    .replace(/\([^a-zA-Z0-9À-ỹ]*\)/g, '')
    .replace(/\[[^a-zA-Z0-9À-ỹ]*\]/g, '')
    // Remove dangling dashes or tildes before/after parentheses
    .replace(/\(\s*[-~–]\s*/g, '(')
    .replace(/\s*[-~–]\s*\)/g, ')')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Handcrafted traps for core Minna vocabulary.
 * CRITICAL RULE: Pure Vietnamese meanings only! NEVER include any Japanese kanji/hiragana in options!
 * The distractors are ultra-sát nghĩa (closely related in nuance, opposite, or shared domain).
 */
export const HANDCRAFTED_MEANING_TRAPS: Record<string, string[]> = {
  // ================= BÀI 1 & ĐẠI TỪ / XƯNG HÔ / NGHỀ NGHIỆP =================
  '私': ['bạn, anh, chị', 'người kia', 'chúng tôi, chúng ta', 'ai đó'],
  'あなた': ['tôi', 'người kia', 'vị kia', 'ai đó'],
  'あの人': ['ngài, vị kia (lịch sự)', 'người này', 'ai đó', 'bạn bè'],
  'あの方': ['người kia (thông thường)', 'người này', 'vị nào (lịch sự)', 'ai đó'],
  '〜さん': ['bé ~ (thân mật cho trẻ em)', 'thầy, cô giáo ~', 'người nước ~', 'nghề nghiệp ~'],
  '〜ちゃん': ['anh, chị, ông, bà ~', 'thầy, cô giáo ~', 'người nước ~', 'bé trai ~'],
  '〜人': ['tiếng nước ~', 'nước, quốc gia ~', 'thành phố ~', 'dân tộc ~'],
  '先生': ['giáo viên (tự xưng nghề nghiệp)', 'học sinh, sinh viên', 'bác sĩ', 'nhà nghiên cứu'],
  '教師': ['thầy giáo, cô giáo (xưng hô tôn kính)', 'học sinh, sinh viên', 'bác sĩ', 'nhân viên công ty'],
  '学生': ['thầy cô giáo', 'nhà nghiên cứu', 'du học sinh', 'kỹ sư'],
  '会社員': ['nhân viên (công ty ~)', 'nhân viên ngân hàng', 'công chức nhà nước', 'kỹ sư'],
  '社員': ['nhân viên công ty (nói chung)', 'nhân viên ngân hàng', 'giám đốc công ty', 'người làm thêm'],
  '銀行員': ['nhân viên công ty', 'nhân viên bưu điện', 'nhân viên nhà ga', 'thủ quỹ'],
  '医者': ['y tá', 'dược sĩ', 'bệnh nhân', 'viện trưởng'],
  '研究者': ['giáo viên (nghề nghiệp)', 'học sinh, sinh viên', 'nhà khoa học, nhà nghiên cứu', 'kỹ sư'],
  '大学': ['trường học (nói chung)', 'trường cấp 3', 'viện nghiên cứu', 'thư viện'],
  '病院': ['tiệm làm đẹp, cắt tóc', 'hiệu thuốc', 'phòng khám', 'viện dưỡng lão'],
  '誰': ['ai (cách nói lịch sự)', 'người nào', 'cái nào', 'người kia'],
  'だれ': ['ai (cách nói lịch sự)', 'người nào', 'cái nào', 'người kia'],
  'どなた': ['ai (thông thường)', 'người nào', 'vị nào (lịch sự)', 'hướng nào'],
  '何歳': ['bao nhiêu tuổi (lịch sự)', 'mấy giờ', 'mấy người', 'năm nào'],
  '何才': ['bao nhiêu tuổi (lịch sự)', 'mấy giờ', 'mấy người', 'năm nào'],
  'おいくつ': ['mấy tuổi, bao nhiêu tuổi (thông thường)', 'bao nhiêu tiền', 'mấy giờ', 'bao nhiêu cái'],

  // ================= BÀI 2 & BỘ CHỈ ĐỊNH KORE / SORE / ARE / DORE & ĐỒ VẬT =================
  'これ': ['cái đó (gần người nghe)', 'cái kia (xa cả hai)', 'cái nào (nghi vấn)', 'người này'],
  'それ': ['cái này (gần người nói)', 'cái kia (xa cả hai)', 'cái nào (nghi vấn)', 'chỗ đó'],
  'あれ': ['cái này (gần người nói)', 'cái đó (gần người nghe)', 'cái nào (nghi vấn)', 'chỗ kia'],
  'どれ': ['cái này', 'cái đó', 'cái kia', 'ở đâu'],
  'この': ['~ đó (gần người nghe)', '~ kia (xa cả hai)', '~ nào', 'cái này'],
  'その': ['~ này (gần người nói)', '~ kia (xa cả hai)', '~ nào', 'cái đó'],
  'あの': ['~ này (gần người nói)', '~ đó (gần người nghe)', '~ nào', 'người kia'],
  'どの': ['~ này', '~ đó', '~ kia', 'cái nào'],
  '本': ['từ điển', 'tạp chí', 'báo, tờ báo', 'vở ghi chép'],
  '辞書': ['sách, quyển sách', 'tạp chí', 'báo, tờ báo', 'sổ tay bỏ túi'],
  '雑誌': ['báo, tờ báo', 'sách, quyển sách', 'từ điển', 'vở, tập ghi chép'],
  '新聞': ['tạp chí', 'thư, bức thư', 'sách, quyển sách', 'bản tin'],
  'ノート': ['sổ tay bỏ túi', 'từ điển', 'tạp chí', 'giấy viết'],
  '手帳': ['vở, tập ghi chép', 'danh thiếp, namecard', 'ví tiền', 'hộ chiếu'],
  '名刺': ['thẻ ngân hàng, thẻ card', 'sổ tay bỏ túi', 'vé xe', 'tem thư'],
  'カード': ['danh thiếp, namecard', 'tiền mặt', 'vé xe', 'bản đồ'],
  '鉛筆': ['bút bi', 'bút chì bấm', 'bút lông', 'thước kẻ'],
  'ボールペン': ['bút chì chuốt', 'bút chì bấm', 'bút lông', 'mực viết'],
  'シャープペンシル': ['bút bi', 'bút chì chuốt', 'bút xóa', 'thước kẻ'],
  '鍵': ['đồng hồ', 'cái ô, dù', 'ví tiền', 'cửa sổ'],
  '時計': ['kính mắt', 'máy ảnh', 'điện thoại', 'máy tính'],
  '傘': ['mũ, nón', 'áo mưa', 'áo khoác', 'cặp, túi xách'],
  '鞄': ['ví tiền', 'vali du lịch', 'ba lô', 'túi áo'],
  'かばん': ['ví tiền', 'vali du lịch', 'ba lô', 'túi áo'],
  'テレビ': ['đài radio', 'máy vi tính', 'điện thoại', 'màn hình'],
  'ラジオ': ['ti vi', 'máy nghe nhạc', 'loa phát thanh', 'máy ghi âm'],
  'カメラ': ['điện thoại', 'máy quay phim', 'kính mắt', 'đồng hồ'],
  '自動車': ['xe máy', 'xe đạp', 'xe buýt', 'tàu điện'],
  '車': ['xe máy', 'xe đạp', 'xe buýt', 'tàu hỏa'],
  '机': ['cái ghế', 'giường ngủ', 'giá sách', 'bàn ăn'],
  '椅子': ['cái bàn', 'ghế sofa', 'giường ngủ', 'bàn học'],
  'いす': ['cái bàn', 'ghế sofa', 'giường ngủ', 'bàn học'],

  // ================= BÀI 3 & NƠI CHỐN / ĐỊA ĐIỂM / TÒA NHÀ =================
  'ここ': ['chỗ đó, ở đó', 'chỗ kia, ở đằng kia', 'chỗ nào, ở đâu', 'hướng này'],
  'そこ': ['chỗ này, ở đây', 'chỗ kia, ở đằng kia', 'chỗ nào, ở đâu', 'hướng đó'],
  'あそこ': ['chỗ này, ở đây', 'chỗ đó, ở đó', 'chỗ nào, ở đâu', 'hướng kia'],
  'どこ': ['chỗ này', 'chỗ đó', 'chỗ kia', 'cái nào'],
  'こちら': ['hướng đó / chỗ đó (lịch sự)', 'hướng kia / chỗ kia (lịch sự)', 'hướng nào / chỗ nào (lịch sự)', 'chỗ này, ở đây (thông thường)'],
  'そちら': ['hướng này / chỗ này (lịch sự)', 'hướng kia / chỗ kia (lịch sự)', 'hướng nào / chỗ nào (lịch sự)', 'chỗ đó, ở đó (thông thường)'],
  'あちら': ['hướng này / chỗ này (lịch sự)', 'hướng đó / chỗ đó (lịch sự)', 'hướng nào / chỗ nào (lịch sự)', 'chỗ kia, ở đằng kia (thông thường)'],
  'どちら': ['hướng này', 'hướng đó', 'hướng kia', 'cái nào trong hai cái'],
  '教室': ['căn tin, nhà ăn', 'phòng họp', 'văn phòng làm việc', 'phòng giáo viên'],
  '食堂': ['phòng học, lớp học', 'nhà bếp', 'quán giải khát', 'văn phòng làm việc'],
  '事務所': ['phòng họp', 'quầy lễ tân, tiếp đón', 'phòng học, lớp học', 'hành lang'],
  '会議室': ['văn phòng làm việc', 'phòng tiếp khách', 'hội trường', 'phòng học, lớp học'],
  '受付': ['sảnh chờ, khu vực chờ', 'cửa ra vào', 'văn phòng làm việc', 'bàn trực bảo vệ'],
  'ロビー': ['hành lang', 'quầy lễ tân, tiếp đón', 'phòng khách', 'sân thượng'],
  '部屋': ['văn phòng làm việc', 'nhà vệ sinh', 'hành lang', 'căn hộ'],
  'トイレ': ['phòng tắm', 'phòng thay đồ', 'phòng nghỉ', 'ban công'],
  'お手洗い': ['phòng tắm', 'phòng tiếp khách', 'nhà bếp', 'nhà vệ sinh (thông thường)'],
  '階段': ['thang máy', 'thang cuốn', 'hành lang', 'lối thoát hiểm'],
  'エレベーター': ['thang cuốn', 'cầu thang bộ', 'cửa tự động', 'băng chuyền'],
  'エスカレーター': ['thang máy', 'cầu thang bộ', 'băng chuyền', 'dây chuyền'],
  '国': ['thành phố', 'quê hương', 'thủ đô', 'thế giới'],
  '会社': ['ngân hàng', 'bưu điện', 'trường học', 'nhà máy'],
  '家': ['ký túc xá', 'căn hộ', 'công ty', 'phòng trọ'],
  'うち': ['ký túc xá', 'căn hộ', 'công ty', 'phòng trọ'],
  '電話': ['thư từ', 'tin nhắn', 'máy vi tính', 'đồng hồ'],
  '靴': ['tất, vớ', 'dép đi trong nhà', 'ủng', 'quần áo'],
  'ネクタイ': ['khăn quàng cổ', 'thắt lưng', 'áo sơ mi', 'cà vạt'],
  'ワイン': ['bia', 'rượu sake', 'nước ngọt', 'trà xanh'],
  '売り場': ['quầy thu ngân', 'cửa hàng tiện lợi', 'nhà kho', 'chợ truyền thống'],
  '地下': ['tầng trệt, tầng 1', 'sân thượng', 'hầm để xe', 'tầng lửng'],
  'いくら': ['bao nhiêu cái', 'mấy giờ', 'mấy tuổi', 'ở đâu'],
  '百': ['nghìn, một ngàn', 'mười nghìn, một vạn', 'mười', 'trăm nghìn'],
  '千': ['trăm, một trăm', 'mười nghìn, một vạn', 'triệu', 'mười'],
  '万': ['nghìn, một ngàn', 'trăm, một trăm', 'triệu', 'trăm nghìn'],

  // ================= BÀI 4 & THỜI GIAN / THỨ / NGÀY =================
  '今': ['hôm nay', 'ngày mai', 'hôm qua', 'sáng nay'],
  '〜時': ['〜 phút', '〜 tiếng đồng hồ', '〜 ngày', '〜 tháng'],
  '〜分': ['〜 giờ', '〜 giây', '〜 nửa tiếng', '〜 ngày'],
  '半': ['mười lăm phút', 'bốn mươi lăm phút', 'một tiếng', 'hai mươi phút'],
  '何時': ['mấy phút', 'mấy ngày', 'mấy giờ rồi', 'bao lâu'],
  '何分': ['mấy giờ', 'bao nhiêu ngày', 'thứ mấy', 'bao lâu'],
  '午前': ['buổi chiều, tối (PM)', 'buổi trưa', 'nửa đêm', 'sáng sớm'],
  '午後': ['buổi sáng (AM)', 'buổi trưa', 'rạng sáng', 'hoàng hôn'],
  '朝': ['buổi trưa', 'buổi tối, chiều tối', 'đêm khuya', 'sáng mai'],
  '昼': ['buổi sáng', 'buổi tối, chiều tối', 'chiều tà', 'rạng sáng'],
  '晩': ['buổi sáng', 'buổi trưa', 'nửa đêm', 'sáng sớm'],
  '夜': ['buổi chiều', 'buổi sáng', 'buổi trưa', 'hoàng hôn'],
  'おととい': ['ngày mốt, ngày kia', 'hôm qua', 'hôm nay', 'tuần trước'],
  'きのう': ['hôm nay', 'ngày mai', 'hôm kia', 'tối qua'],
  '昨日': ['hôm nay', 'ngày mai', 'hôm kia', 'sáng nay'],
  'きょう': ['hôm qua', 'ngày mai', 'hôm kia', 'bây giờ'],
  '今日': ['hôm qua', 'ngày mai', 'hôm kia', 'sáng nay'],
  'あした': ['hôm nay', 'ngày mốt, ngày kia', 'hôm qua', 'tuần sau'],
  '明日': ['hôm nay', 'ngày mốt, ngày kia', 'hôm qua', 'sáng mai'],
  'あさって': ['hôm kia', 'ngày mai', 'hôm nay', 'tháng sau'],
  '明後日': ['hôm kia', 'ngày mai', 'hôm nay', 'tuần sau'],
  '今朝': ['tối nay', 'sáng mai', 'sáng hôm qua', 'mỗi sáng'],
  '今晩': ['sáng nay', 'tối qua', 'tối mai', 'đêm qua'],
  '休み': ['ngày làm việc', 'kỳ nghỉ hè', 'giờ học', 'cuối tuần'],
  '昼休み': ['kỳ nghỉ hè', 'nghỉ giải lao giữa giờ', 'nghỉ phép', 'ngày nghỉ cuối tuần'],
  '毎朝': ['mỗi tối', 'mỗi ngày', 'mỗi tuần', 'sáng mai'],
  '毎晩': ['mỗi sáng', 'mỗi ngày', 'mỗi tháng', 'tối nay'],
  '毎日': ['mỗi tuần', 'mỗi tháng', 'mỗi năm', 'mỗi sáng'],
  '月曜日': ['thứ ba', 'thứ tư', 'chủ nhật', 'thứ sáu'],
  '火曜日': ['thứ hai', 'thứ tư', 'thứ năm', 'thứ bảy'],
  '水曜日': ['thứ năm', 'thứ ba', 'thứ sáu', 'thứ hai'],
  '木曜日': ['thứ ba', 'thứ sáu', 'thứ năm', 'thứ bảy'],
  '金曜日': ['thứ năm', 'thứ bảy', 'thứ tư', 'chủ nhật'],
  '土曜日': ['chủ nhật', 'thứ sáu', 'thứ hai', 'thứ năm'],
  '日曜日': ['thứ bảy', 'thứ hai', 'thứ sáu', 'ngày lễ'],
  '何曜日': ['ngày mấy', 'mấy giờ', 'tháng mấy', 'bao nhiêu ngày'],
  '起きます': ['đi ngủ', 'nghỉ ngơi', 'thức khuya', 'đứng lên'],
  '寝ます': ['thức dậy', 'nghỉ ngơi', 'nằm xuống', 'làm việc'],
  '働きます': ['nghỉ ngơi', 'học bài', 'thất nghiệp', 'về nhà'],
  '休みます': ['làm việc', 'học bài', 'ngủ', 'đi làm'],
  '勉強します': ['dạy học', 'nghỉ ngơi', 'nghiên cứu', 'làm việc'],
  '終わります': ['bắt đầu', 'tiếp tục', 'tạm hoãn', 'chuẩn bị'],

  // ================= BÀI 5 & DI CHUYỂN / PHƯƠNG TIỆN / TUẦN - THÁNG - NĂM =================
  '行きます': ['đến, tới', 'về, trở về', 'ra ngoài', 'ở lại'],
  '来ます': ['đi', 'về, trở về', 'rời đi', 'quay lại'],
  '帰ります': ['đi', 'đến, tới', 'ra ngoài', 'ghé vào'],
  '学校': ['trường đại học', 'thư viện', 'phòng học, lớp học', 'bệnh viện'],
  'スーパー': ['cửa hàng bách hóa', 'chợ truyền thống', 'cửa hàng tiện lợi', 'hiệu thuốc'],
  '駅': ['bến xe buýt', 'sân bay', 'bến cảng', 'trạm dừng'],
  '飛行機': ['tàu cao tốc', 'tàu thủy, thuyền', 'trực thăng', 'xe buýt'],
  '船': ['tàu điện', 'máy bay', 'ca nô', 'tàu ngầm'],
  '電車': ['tàu điện ngầm', 'tàu cao tốc Shinkansen', 'xe buýt', 'xe ô tô'],
  '地下鉄': ['tàu điện trên cao', 'tàu cao tốc Shinkansen', 'xe buýt', 'tàu điện thường'],
  '新幹線': ['tàu điện ngầm', 'tàu điện thường', 'máy bay', 'xe buýt nhanh'],
  'バス': ['taxi', 'tàu điện', 'xe khách', 'xe ô tô con'],
  'タクシー': ['xe buýt', 'xe ôm', 'xe thuê', 'xe ô tô con'],
  '自転車': ['xe máy', 'xe ô tô', 'xe đạp điện', 'xe đẩy'],
  '歩いて': ['đi bằng xe hơi', 'chạy bộ', 'đi bằng tàu điện', 'đi bằng xe đạp'],
  '人': ['người đàn ông', 'người phụ nữ', 'người kia', 'bạn bè'],
  '友達': ['đồng nghiệp', 'người quen', 'người yêu', 'gia đình'],
  '彼': ['cô ấy', 'bạn thân', 'anh trai', 'người kia'],
  '彼女': ['anh ấy', 'vợ', 'chị gái', 'người phụ nữ'],
  '家族': ['họ hàng', 'bạn bè', 'người thân', 'vợ chồng'],
  '一人で': ['cùng mọi người', 'hai người', 'với gia đình', 'một mình'],
  '先週': ['tuần này', 'tuần sau', 'tháng trước', 'năm ngoái'],
  '今週': ['tuần trước', 'tuần sau', 'tháng này', 'tuần này'],
  '来週': ['tuần này', 'tuần sau nữa', 'tuần trước', 'tháng sau'],
  '先月': ['tháng này', 'tháng sau', 'năm ngoái', 'tuần trước'],
  '今月': ['tháng trước', 'tháng sau', 'tháng này', 'năm nay'],
  '来月': ['tháng này', 'tháng sau nữa', 'tháng trước', 'năm sau'],
  '去年': ['năm nay', 'năm sau', 'hai năm trước', 'tháng trước'],
  '今年': ['năm ngoái', 'năm sau', 'năm nay', 'tháng này'],
  '来年': ['năm nay', 'năm sau nữa', 'năm ngoái', 'tháng sau'],
  'いつ': ['ở đâu', 'mấy giờ', 'cái nào', 'bao lâu'],
  '誕生日': ['ngày kỷ niệm', 'ngày lễ', 'ngày cưới', 'sinh nhật'],

  // ================= BÀI 6 & ĂN UỐNG / ĐỘNG TỪ HÀNG NGÀY =================
  '食べます': ['uống', 'nấu ăn', 'mua đồ ăn', 'dọn bàn'],
  '飲みます': ['ăn', 'hút thuốc', 'rót nước', 'nuốt'],
  '吸います': ['thổi gió', 'hít thở', 'uống', 'hút (thuốc lá)'],
  '見ます': ['cho xem', 'nghe', 'tìm kiếm', 'đọc'],
  '見せます': ['nhìn, xem', 'chỉ dạy', 'cho mượn', 'trưng bày'],
  '聞きます': ['nói, kể', 'hỏi ý kiến', 'nhìn, xem', 'đọc'],
  '読みます': ['viết', 'nói chuyện', 'nghe', 'dịch bài'],
  '書きます': ['đọc', 'vẽ tranh', 'xóa đi', 'gõ máy tính'],
  '買います': ['bán', 'cho mượn', 'trả tiền', 'thuê'],
  '撮ります': ['quay phim', 'cầm lấy', 'vẽ tranh', 'chụp (ảnh)'],
  '会います': ['chia tay', 'nói chuyện', 'chờ đợi', 'gọi điện'],
  'ご飯': ['bánh mì', 'món ăn', 'gạo sống', 'bữa ăn, cơm'],
  '朝ご飯': ['bữa trưa', 'bữa tối', 'bữa ăn nhẹ, tráng miệng', 'cơm hộp'],
  '昼ご飯': ['bữa sáng', 'bữa tối', 'cơm trưa', 'điểm tâm'],
  '晩ご飯': ['bữa sáng', 'bữa trưa', 'bữa đêm', 'cơm tối'],
  'パン': ['cơm, bữa ăn', 'bánh ngọt', 'mì sợi', 'khoai tây'],
  '卵': ['thịt gà', 'sữa tươi', 'thịt bò', 'trứng gà'],
  '肉': ['cá', 'rau củ', 'thịt lợn', 'thịt'],
  '魚': ['thịt', 'tôm, cua', 'hải sản', 'cá'],
  '野菜': ['hoa quả, trái cây', 'rau xanh, củ quả', 'nấm', 'thịt'],
  '果物': ['rau củ', 'bánh kẹo', 'nước ép', 'trái cây, hoa quả'],
  '水': ['nước nóng', 'trà xanh', 'nước khoáng', 'đá lạnh'],
  'お茶': ['trà đen, hồng trà', 'cà phê', 'nước lọc', 'trà xanh'],
  '紅茶': ['trà xanh', 'cà phê', 'sữa tươi', 'nước ép'],
  '牛乳': ['sữa chua', 'nước lọc', 'sữa đậu nành', 'bơ'],
  'ジュース': ['nước khoáng', 'rượu sake', 'bia', 'nước hoa quả, nước ngọt'],
  'ビール': ['rượu sake', 'rượu vang', 'nước ngọt', 'bia lon'],
  'お酒': ['bia', 'rượu vang', 'nước lọc', 'rượu sake'],
  '写真': ['bức tranh', 'máy ảnh', 'video', 'gương soi'],
  '店': ['công ty', 'quán ăn, nhà hàng', 'siêu thị', 'cửa hàng, tiệm'],
  '庭': ['công viên', 'sân thượng', 'ban công', 'khu vườn'],
  '宿題': ['bài kiểm tra', 'bài giảng', 'báo cáo', 'bài tập về nhà'],
  '一緒に': ['một mình', 'thay phiên', 'cùng nhau', 'riêng rẽ'],
  'いつも': ['thỉnh thoảng', 'không bao giờ', 'hiếm khi', 'luôn luôn, lúc nào cũng'],
  '時々': ['luôn luôn', 'thường xuyên', 'không bao giờ', 'thỉnh thoảng, đôi khi'],

  // ================= BÀI 7 & CHO / NHẬN / CÔNG CỤ =================
  '切ります': ['dán', 'gấp lại', 'buộc dây', 'cắt, gọt'],
  '送ります': ['nhận về', 'mang tới', 'giữ lại', 'gửi, tiễn'],
  'あげます': ['nhận (từ ai)', 'cho vay', 'gửi đi', 'bán lại'],
  'もらいます': ['tặng, cho (ai đó)', 'mua', 'cho mượn', 'nhận (từ ai)'],
  '貸します': ['mượn, vay (từ ai)', 'trả lại', 'bán đi', 'cho mượn, cho vay'],
  '借ります': ['cho mượn, cho vay', 'mua đứt', 'trả nợ', 'mượn, vay (từ ai)'],
  '教えます': ['học, được dạy (từ ai)', 'hỏi ý kiến', 'giải thích', 'dạy, chỉ bảo'],
  '習います': ['dạy dỗ, chỉ bảo', 'tự học', 'nghe giảng', 'học, tập (từ ai)'],
  'かけます': ['cúp máy', 'gọi (điện thoại)', 'nghe máy', 'nhắn tin'],
  '手': ['chân, bàn chân', 'cánh tay', 'ngón tay', 'bàn tay'],
  '箸': ['thìa, muỗng', 'dĩa, nĩa', 'dao', 'đũa ăn cơm'],
  'スプーン': ['đũa', 'dĩa, nĩa', 'dao', 'thìa, muỗng'],
  'ナイフ': ['cây kéo', 'dĩa, nĩa', 'thìa, muỗng', 'con dao'],
  'フォーク': ['thìa, muỗng', 'đũa', 'dao', 'dĩa, nĩa'],
  'はさみ': ['con dao', 'kìm', 'bấm móng tay', 'cây kéo'],
  'ファクス': ['máy in', 'điện thoại', 'máy photocopy', 'máy fax'],
  'パソコン': ['máy tính bảng', 'điện thoại', 'ti vi', 'máy vi tính cá nhân'],
  '消しゴム': ['bút chì chuốt', 'bút tẩy', 'thước kẻ', 'cục tẩy, gôm'],
  '紙': ['sách, quyển sách', 'báo, tờ báo', 'thư từ', 'tờ giấy'],
  '花': ['cây cối', 'lá cây', 'cỏ', 'bông hoa'],
  'シャツ': ['áo khoác', 'quần dài', 'áo len', 'áo sơ mi'],
  'プレゼント': ['tiền mừng', 'bưu phẩm', 'đồ lưu niệm', 'quà tặng'],
  '荷物': ['bưu thiếp', 'vali du lịch', 'thư từ', 'hành lý, bưu kiện'],
  'お金': ['ví tiền', 'thẻ ngân hàng', 'hóa đơn', 'tiền bạc'],
  '切符': ['tem thư', 'thẻ căn cước', 'hộ chiếu', 'vé (tàu, xe, vé xem phim)'],
  '切手': ['vé (tàu, xe)', 'bưu thiếp', 'phong bì', 'con tem, tem thư'],
  '父': ['mẹ tôi', 'bố của bạn', 'anh trai tôi', 'bố tôi'],
  '母': ['bố tôi', 'mẹ của bạn', 'chị gái tôi', 'mẹ tôi'],
  'お父さん': ['bố tôi', 'mẹ của bạn', 'ông nội bạn', 'bố của bạn'],
  'お母さん': ['mẹ tôi', 'bố của bạn', 'bà ngoại bạn', 'mẹ của bạn'],

  // ================= BÀI 8 & TÍNH TỪ VÀ SẮC THÁI =================
  'ハンサム': ['xấu xí', 'dễ thương', 'cao ráo', 'đẹp trai, hào hoa'],
  'きれい': ['bẩn thỉu', 'xấu xí', 'bừa bộn', 'đẹp, sạch sẽ'],
  '静か': ['ồn ào, náo nhiệt', 'đông đúc', 'vui vẻ', 'yên tĩnh, thanh bình'],
  'にぎやか': ['yên tĩnh, thanh bình', 'vắng vẻ', 'buồn tẻ', 'náo nhiệt, nhộn nhịp'],
  '有名': ['vô danh, ít ai biết', 'bình thường', 'phổ biến', 'nổi tiếng'],
  '親切': ['lạnh lùng, thô lỗ', 'khắt khe', 'ích kỷ', 'tử tế, thân thiện'],
  '元気': ['mệt mỏi, ốm yếu', 'buồn bã', 'yếu ớt', 'khỏe mạnh, hoạt bát'],
  '暇': ['bận rộn, tất bật', 'gấp rút', 'vất vả', 'rảnh rỗi'],
  '便利': ['bất tiện, phiền toái', 'đắt đỏ', 'khó dùng', 'tiện lợi, thuận tiện'],
  '不便': ['tiện lợi, thuận tiện', 'rẻ', 'dễ dàng', 'bất tiện'],
  'すてき': ['kỳ quặc, lạ lùng', 'xấu xí', 'tầm thường', 'tuyệt vời, đẹp đẽ'],
  '大きい': ['nhỏ, bé', 'thấp', 'ngắn', 'to, lớn'],
  '小さい': ['to, lớn', 'cao', 'dài', 'nhỏ, bé'],
  '新しい': ['cũ kỹ', 'cổ kính', 'hỏng hóc', 'mới mẻ, tươi mới'],
  '古い': ['mới mẻ', 'hiện đại', 'trẻ trung', 'cũ, cổ'],
  'いい': ['xấu, tồi tệ', 'khó khăn', 'nguy hiểm', 'tốt, đẹp, hay'],
  '悪い': ['tốt lành, đẹp đẽ', 'an toàn', 'tiện lợi', 'xấu, tồi tệ'],
  '暑い': ['lạnh buốt (thời tiết)', 'mát mẻ', 'ấm áp', 'nóng (thời tiết, khí hậu)'],
  '熱い': ['nguội lạnh (đồ ăn)', 'lạnh buốt', 'ấm cúng', 'nóng (nước, đồ ăn, vật thể)'],
  '寒い': ['nóng bức (thời tiết)', 'ấm áp', 'mát mẻ', 'lạnh (thời tiết, khí hậu)'],
  '冷たい': ['nóng sôi (đồ ăn)', 'ấm áp', 'lạnh buốt (thời tiết)', 'lạnh, buốt (đồ ăn, nước, cảm giác sờ)'],
  '難しい': ['dễ dàng, đơn giản', 'ngắn gọn', 'tiện lợi', 'khó, phức tạp'],
  '易しい': ['khó khăn, phức tạp', 'dài dòng', 'nguy hiểm', 'dễ, đơn giản'],
  '高い': ['rẻ (giá cả) / thấp (độ cao)', 'ngắn', 'nhỏ bé', 'cao / đắt'],
  '安い': ['đắt đỏ, giá cao', 'quý hiếm', 'sang trọng', 'rẻ (giá cả)'],
  '低い': ['cao ráo, giá cao', 'dài', 'rộng lớn', 'thấp (độ cao)'],
  '面白い': ['buồn chán, tẻ nhạt', 'vô lý', 'nghiêm túc', 'thú vị, hay ho'],
  'つまらない': ['thú vị, hay ho', 'hài hước', 'bận rộn', 'buồn chán, tẻ nhạt'],
  'おいしい': ['dở tệ, khó ăn', 'nhạt nhẽo', 'đắng chát', 'ngon miệng, ngon lành'],
  '忙しい': ['rảnh rỗi, thảnh thơi', 'nhàn hạ', 'buồn chán', 'bận rộn, tất bật'],
  '楽しい': ['buồn tẻ, ủ rũ', 'đau khổ, khó chịu', 'mệt mỏi', 'vui vẻ, vui sướng'],
  '白い': ['đen', 'xám', 'đỏ', 'trắng'],
  '黒い': ['trắng', 'xanh', 'vàng', 'đen'],
  '赤い': ['xanh da trời', 'trắng', 'vàng', 'đỏ'],
  '青い': ['đỏ', 'xanh lá cây', 'vàng', 'xanh da trời, xanh nước biển'],

  // ================= BÀI 9 & SỞ THÍCH / NĂNG LỰC / VỊ TRÍ =================
  '上手': ['kém, vụng về', 'thích thú', 'chăm chỉ', 'giỏi, khéo léo'],
  '下手': ['giỏi, khéo léo', 'thành thạo', 'sở trường', 'kém, vụng về'],
  '好き': ['ghét, không thích', 'bình thường', 'thèm ăn', 'thích, yêu thích'],
  '嫌い': ['thích, yêu thích', 'khoái khẩu', 'quan tâm', 'ghét, không thích'],
  '分かります': ['quên mất', 'không biết', 'nhầm lẫn', 'hiểu, nắm rõ'],
  'あります': ['ở, có (người, động vật)', 'biến mất', 'hỏng hóc', 'có (đồ vật, sự kiện)'],
  'います': ['có (đồ vật)', 'rời đi', 'vắng mặt', 'ở, có (người, động vật)'],
  '絵': ['bức ảnh', 'chữ viết', 'bản đồ', 'bức tranh, bức vẽ'],
  '字': ['chữ Hán', 'con số', 'hình vẽ', 'chữ viết, ký tự'],
  '漢字': ['chữ Hiragana', 'chữ Katakana', 'chữ cái La-tinh', 'chữ Hán (Kanji)'],
  'ひらがな': ['chữ Kanji', 'chữ Katakana', 'chữ La-tinh', 'chữ Hiragana'],
  'かたかな': ['chữ Hiragana', 'chữ Kanji', 'chữ Nôm', 'chữ Katakana'],
  '細かいお金': ['tiền chẵn', 'tiền đô la', 'tiền giấy', 'tiền lẻ, tiền xu'],
  '時間': ['đồng hồ', 'khoảng cách', 'tốc độ', 'thời gian, giờ giấc'],
  '用事': ['công việc chính', 'bài tập', 'chuyện phiếm', 'việc bận, việc riêng'],
  '約束': ['lời hứa, cuộc hẹn', 'hợp đồng', 'kế hoạch', 'quy định'],
  'ご主人': ['vợ của bạn', 'chồng tôi', 'bố bạn', 'chồng của bạn'],
  '夫': ['chồng của bạn', 'vợ tôi', 'con trai', 'chồng tôi'],
  '奥さん': ['vợ tôi', 'chồng bạn', 'mẹ bạn', 'vợ của bạn'],
  '妻': ['vợ của bạn', 'chồng tôi', 'con gái', 'vợ tôi'],
  '子ども': ['người lớn', 'bố mẹ', 'học sinh', 'trẻ con, con cái'],
  'よく': ['hiếm khi', 'không bao giờ', 'đôi khi', 'rất rõ / thường xuyên'],
  'だいたい': ['hoàn toàn', 'tuyệt đối', 'chính xác', 'đại khái, khoảng chừng'],
  'たくさん': ['ít ỏi', 'vừa đủ', 'hiếm có', 'nhiều, rất nhiều'],
  '少し': ['rất nhiều', 'đầy đủ', 'quá mức', 'một chút, một ít'],
  '全然': ['rất nhiều', 'luôn luôn', 'thường xuyên', 'hoàn toàn không (phủ định)'],

  // ================= BÀI 10 & VỊ TRÍ TRONG KHÔNG GIAN =================
  '右': ['bên trái', 'phía trước', 'phía sau', 'ở giữa'],
  '左': ['bên phải', 'bên trên', 'bên dưới', 'ở giữa'],
  '前': ['phía sau', 'bên cạnh', 'bên trong', 'bên ngoài'],
  '後ろ': ['phía trước', 'bên ngoài', 'bên cạnh', 'ở giữa'],
  '上': ['bên dưới', 'bên trong', 'bên ngoài', 'ở giữa'],
  '下': ['bên trên', 'phía trước', 'ở giữa', 'bên cạnh'],
  '中': ['bên ngoài', 'bên cạnh', 'ở giữa', 'bên dưới'],
  '外': ['bên trong', 'phía sau', 'bên trên', 'bên cạnh'],
  '隣': ['ở giữa', 'ở xa', 'phía trước', 'bên cạnh (cùng loại)'],
  '近く': ['ở xa', 'ở giữa', 'bên trong', 'gần đó, lân cận'],
  '間': ['bên cạnh', 'bên ngoài', 'ở giữa, khoảng cách', 'phía trước']
};

/**
 * Extracts individual Kanji characters from a Japanese text string
 */
export function extractKanji(text: string): string[] {
  const kanjiRegex = /[\u4E00-\u9FAF]/g;
  const matches = text.match(kanjiRegex);
  return matches ? Array.from(new Set(matches)) : [];
}

/**
 * Finds vocabulary items in dataset that share one or more Kanji characters with the target word.
 * Returns clean Vietnamese meanings with zero Japanese characters.
 */
export function findKanjiSharingDistractors(
  targetItem: VocabularyItem,
  allVocab: VocabularyItem[]
): string[] {
  const kanjiList = extractKanji(targetItem.word);
  if (kanjiList.length === 0) return [];

  const targetMeaningClean = sanitizeMeaningOption(targetItem.meaning).toLowerCase();
  const matchedMeanings: string[] = [];

  for (const item of allVocab) {
    if (item.id === targetItem.id) continue;
    const itemMeaningClean = sanitizeMeaningOption(item.meaning);
    if (!itemMeaningClean || itemMeaningClean.toLowerCase() === targetMeaningClean) continue;

    // Check if item shares at least one Kanji character
    const sharesKanji = kanjiList.some((k) => item.word.includes(k));
    if (sharesKanji && !matchedMeanings.some((m) => m.toLowerCase() === itemMeaningClean.toLowerCase())) {
      matchedMeanings.push(itemMeaningClean);
    }
  }

  return matchedMeanings;
}

/**
 * Classifies a vocabulary item into a granular semantic domain for tightly-focused distractors
 */
export function classifyWord(item: VocabularyItem): SemanticCategory {
  const h = item.hiragana;
  const m = item.meaning.toLowerCase();

  // 1. Verbs: ends in ます, or verb indicators
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
    if (!m.includes('ngày nghỉ') && !m.includes('giờ nghỉ')) {
      return 'verb';
    }
  }

  // 2. Demonstratives & Pronouns
  if (
    ['これ', 'それ', 'あれ', 'どれ', 'この', 'その', 'あの', 'どの', 'ここ', 'そこ', 'あそこ', 'どこ', 'こちら', 'そちら', 'あちら', 'どちら'].includes(item.word) ||
    m.includes('cái này') || 
    m.includes('cái đó') || 
    m.includes('cái kia') || 
    m.includes('cái nào') || 
    m.includes('chỗ này') || 
    m.includes('chỗ đó') || 
    m.includes('chỗ kia') || 
    m.includes('phía này')
  ) {
    return 'demonstrative';
  }

  // 3. Direction & Position
  if (
    ['右', '左', '前', '後ろ', '上', '下', '中', '外', '隣', '近く', '間'].includes(item.word) ||
    m.includes('bên phải') || 
    m.includes('bên trái') || 
    m.includes('phía trước') || 
    m.includes('phía sau') || 
    m.includes('bên trên') || 
    m.includes('bên dưới') || 
    m.includes('bên trong') || 
    m.includes('bên ngoài') || 
    m.includes('bên cạnh') || 
    m.includes('ở giữa')
  ) {
    return 'direction_position';
  }

  // 4. Time & Calendar
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

  // 5. Adjectives
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
    if (!['わたし', 'あさ', 'ひる', 'よる', 'ほん', 'いま'].includes(h)) {
      return 'adj';
    }
  }

  // 6. Food & Drink & Meals
  if (
    m.includes('cơm') || 
    m.includes('bữa') || 
    m.includes('bánh') || 
    m.includes('thịt') || 
    m.includes('cá') || 
    m.includes('rau') || 
    m.includes('trứng') || 
    m.includes('nước') || 
    m.includes('trà') || 
    m.includes('cà phê') || 
    m.includes('rượu') || 
    m.includes('bia') ||
    m.includes('hoa quả') ||
    m.includes('món ăn')
  ) {
    return 'food_drink';
  }

  // 7. Family
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

  // 8. Place & Buildings
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
    h.endsWith('かん') ||
    h.endsWith('えき') ||
    h.endsWith('いん') ||
    h.endsWith('きょく')
  ) {
    return 'place';
  }

  // 9. Person & Job
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

  // 10. Vehicle
  if (
    m.includes('tàu') || 
    m.includes('xe') || 
    m.includes('máy bay') || 
    m.includes('thuyền')
  ) {
    return 'vehicle';
  }

  // 11. Daily Object
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
    m.includes('máy tính') ||
    m.includes('tiền') ||
    m.includes('vé')
  ) {
    return 'daily_object';
  }

  // 12. Adverb & Quantity
  if (
    m.includes('nhiều') || 
    m.includes('ít') || 
    m.includes('hoàn toàn') || 
    m.includes('thường xuyên') || 
    m.includes('đại khái')
  ) {
    return 'adverb_quantity';
  }

  return 'other';
}

/**
 * Generates super-challenging, realistic distractors for "Meaning" quiz
 * Prioritizes:
 * 1. Handcrafted confusable traps / antonyms / subtle nuances (100% pure Vietnamese, zero Japanese text)
 * 2. Words sharing the exact Kanji root (Hán tự) with the target word
 * 3. Words from the exact same semantic category from current pool
 * 4. Words from the exact same semantic category from ALL_VOCABULARY
 */
export function generateChallengingMeaningTraps(
  targetItem: VocabularyItem,
  currentPool: VocabularyItem[]
): string[] {
  const cleanCorrect = sanitizeMeaningOption(targetItem.meaning);
  const targetCategory = classifyWord(targetItem);
  const distractors: string[] = [];

  const isDuplicateOrCorrect = (val: string) => {
    const clean = sanitizeMeaningOption(val).toLowerCase();
    if (!clean) return true;
    if (clean === cleanCorrect.toLowerCase()) return true;
    return distractors.some((d) => sanitizeMeaningOption(d).toLowerCase() === clean);
  };

  // STEP 1: Handcrafted traps (ultra sát nghĩa, 100% Vietnamese, zero Japanese characters)
  const directTraps = 
    HANDCRAFTED_MEANING_TRAPS[targetItem.word] || 
    HANDCRAFTED_MEANING_TRAPS[targetItem.hiragana];

  if (directTraps && directTraps.length > 0) {
    for (const trap of directTraps) {
      const cleanTrap = sanitizeMeaningOption(trap);
      if (!isDuplicateOrCorrect(cleanTrap)) {
        distractors.push(cleanTrap);
      }
    }
  }

  // STEP 2: Kanji-Root Sharing Distractors (Kanji compound confusion)
  // If target has Kanji, other words with the same Kanji provide deceptive challenges
  if (targetItem.hasKanji && distractors.length < 3) {
    const kanjiSharing = findKanjiSharingDistractors(targetItem, ALL_VOCABULARY);
    const shuffledKanjiTraps = [...kanjiSharing].sort(() => 0.5 - Math.random());
    for (const m of shuffledKanjiTraps) {
      const cleanM = sanitizeMeaningOption(m);
      if (!isDuplicateOrCorrect(cleanM)) {
        distractors.push(cleanM);
        if (distractors.length >= 3) break;
      }
    }
  }

  // STEP 3: Same semantic category from current pool
  if (distractors.length < 3) {
    const sameCatFromPool = currentPool
      .filter((it) => it.id !== targetItem.id && classifyWord(it) === targetCategory)
      .map((it) => sanitizeMeaningOption(it.meaning))
      .filter((m) => !isDuplicateOrCorrect(m))
      .sort(() => 0.5 - Math.random());

    for (const m of sameCatFromPool) {
      distractors.push(m);
      if (distractors.length >= 3) break;
    }
  }

  // STEP 4: Same semantic category from ALL_VOCABULARY
  if (distractors.length < 3) {
    const sameCatAll = ALL_VOCABULARY
      .filter((it) => it.id !== targetItem.id && classifyWord(it) === targetCategory)
      .map((it) => sanitizeMeaningOption(it.meaning))
      .filter((m) => !isDuplicateOrCorrect(m))
      .sort(() => 0.5 - Math.random());

    for (const m of sameCatAll) {
      distractors.push(m);
      if (distractors.length >= 3) break;
    }
  }

  // STEP 5: Fallback to current pool, then ALL_VOCABULARY
  if (distractors.length < 3) {
    const poolFallback = currentPool
      .filter((it) => it.id !== targetItem.id)
      .map((it) => sanitizeMeaningOption(it.meaning))
      .filter((m) => !isDuplicateOrCorrect(m))
      .sort(() => 0.5 - Math.random());

    for (const m of poolFallback) {
      distractors.push(m);
      if (distractors.length >= 3) break;
    }
  }

  if (distractors.length < 3) {
    const allFallback = ALL_VOCABULARY
      .filter((it) => it.id !== targetItem.id)
      .map((it) => sanitizeMeaningOption(it.meaning))
      .filter((m) => !isDuplicateOrCorrect(m))
      .sort(() => 0.5 - Math.random());

    for (const m of allFallback) {
      distractors.push(m);
      if (distractors.length >= 3) break;
    }
  }

  // Return the best 3 unique distractors, sanitized and shuffled
  const selected = distractors
    .map(sanitizeMeaningOption)
    .filter((d) => d && d.toLowerCase() !== cleanCorrect.toLowerCase())
    .slice(0, 3)
    .sort(() => 0.5 - Math.random());
  return selected;
}
