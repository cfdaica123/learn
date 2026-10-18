/**
 * Trap generators for Kanji & Hiragana distractors
 * Used in Japanese JLPT-style trick/trap quiz tests
 */

// Dictionary of visually similar Kanji (Look-alikes / Same radicals / Visual traps)
export const KANJI_LOOKALIKES: Record<string, string[]> = {
  '社': ['杜', '仕', '枉', '住', '狂', '柱'],
  '会': ['合', '全', '今', '令', '企', '傘'],
  '学': ['字', '孚', '季', '孝', '孟', '学'],
  '校': ['狡', '枝', '枚', '棟', '板', '林'],
  '先': ['洗', '失', '光', '矢', '生', '牛'],
  '生': ['牛', '午', '主', '任', '星', '先'],
  '行': ['待', '術', '街', '往', '律', '桁'],
  '見': ['貝', '具', '買', '頁', '規', '視'],
  '持': ['待', '特', '詩', '時', '侍', '寺'],
  '待': ['持', '特', '侍', '行', '律', '従'],
  '休': ['体', '保', '木', '本', '林', '休'],
  '体': ['休', '本', '休', '保', '休'],
  '買': ['貝', '員', '費', '賈', '賃', '貴'],
  '食': ['飲', '飽', '良', '飯', '館', '飼'],
  '飲': ['飯', '飼', '館', '飽', '飾', '食'],
  '車': ['東', '連', '軍', '庫', '軌', '輪'],
  '日': ['目', '白', '田', '旧', '申', '旦'],
  '目': ['日', '自', '貝', '見', '且', '直'],
  '白': ['日', '百', '自', '泊', '臼', '白'],
  '百': ['白', '自', '首', '面', '百'],
  '時': ['寺', '待', '持', '詩', '特', '侍'],
  '寺': ['時', '待', '持', '侍', '等', '詩'],
  '本': ['木', '末', '未', '休', '札', '朱'],
  '木': ['本', '林', '森', '休', '未', '末'],
  '林': ['森', '木', '本', '材', '村'],
  '森': ['林', '木', '本', '森'],
  '大': ['犬', '太', '天', '夫', '文', '矢'],
  '小': ['少', '水', '示', '木', '尖', '光'],
  '中': ['申', '巾', '甲', '央', '串', '由'],
  '国': ['団', '因', '困', '固', '圏', '園'],
  '年': ['午', '牛', '生', '毎', '手', '平'],
  '何': ['向', '河', '荷', '柯', '可', '同'],
  '誰': ['難', '準', '雄', '進', '推', '集'],
  '今': ['令', '合', '含', '会', '念', '介'],
  '分': ['八', '公', '刀', '刃', '切', '今'],
  '半': ['羊', '平', '判', '伴', '拌', '辛'],
  '月': ['目', '日', '同', '円', '丹', '用'],
  '火': ['灰', '炎', '災', '灯', '灸', '秋'],
  '水': ['氷', '永', '木', '求', '泉', '泳'],
  '金': ['全', '針', '釜', '鉄', '鉱', '銀'],
  '銀': ['金', '根', '恨', '良', '眼', '限'],
  '土': ['士', '上', '工', '王', '玉', '生'],
  '女': ['安', '好', '妥', '如', '妙', '姓'],
  '男': ['勇', '町', '界', '田', '力', '略'],
  '子': ['孔', '字', '了', '予', '孤', '孟'],
  '父': ['文', '交', '支', '反', '斤', '斧'],
  '母': ['毎', '海', '毒', '貫', '無', '舟'],
  '友': ['反', '支', '文', '抜', '发', '愛'],
  '名': ['各', '多', '石', '右', '左', '句'],
  '右': ['左', '石', '若', '友', '布', '看'],
  '左': ['右', '在', '友', '佐', '存', '工'],
  '私': ['禾', '利', '秒', '秋', '科', '和'],
  '言': ['話', '語', '詠', '信', '計', '詳'],
  '話': ['語', '活', '舌', '話', '誂', '詰'],
  '語': ['話', '誤', '悟', '梧', '詰', '論'],
  '読': ['言', '詠', '託', '訳', '詩', '続'],
  '書': ['昼', '画', '事', '筆', '津', '聿'],
  '聞': ['問', '開', '間', '閣', '閉', '関'],
  '問': ['聞', '開', '間', '門', '悶', '閃'],
  '開': ['間', '問', '聞', '閑', '閉', '関'],
  '間': ['開', '問', '聞', '門', '簡', '関'],
  '電': ['雷', '雪', '雲', '震', '霞', '霜'],
  '駅': ['訳', '尺', '駐', '駄', '騒', '駒'],
  '病': ['痛', '痴', '症', '疲', '痒', '疾'],
  '院': ['完', '宅', '官', '究', '宗', '客'],
  '医': ['矢', '匹', '区', '巨', '匝', '臣'],
  '者': ['老', '考', '孝', '著', '署', '堵'],
  '研': ['石', '破', '確', '砂', '砲', '研'],
  '究': ['穴', '空', '窄', '突', '窓', '牢'],
  '室': ['屋', '到', '堂', '窒', '家', '客'],
  '家': ['室', '塚', '蒙', '豪', '族', '稼'],
  '手': ['毛', '龵', '牛', '千', '乎', '手'],
  '紙': ['糸', '細', '線', '組', '練', '紅'],
  '花': ['化', '草', '茶', '華', '苗', '苦'],
  '切': ['刀', '分', '初', '刃', '切', '刈'],
  '送': ['关', '逆', '進', '返', '透', '過'],
  '貸': ['賃', '資', '貨', '賞', '質', '貸'],
  '借': ['昔', '惜', '錯', '措', '籍', '借'],
  '勉': ['晩', '免', '兔', '色', '急', '逸'],
  '強': ['弱', '引', '弓', '弧', '弛', '弘'],
  '旅': ['方', '施', '旋', '族', '旗', '遊'],
  '雨': ['両', '雲', '雪', '雷', '需', '零'],
  '天': ['夫', '矢', '夭', '大', '犬', '失'],
  '気': ['氛', '汽', '乞', '气', '空', '分'],
  '魚': ['漁', '鮮', '魯', '角', '亀', '鯨'],
  '肉': ['内', '丙', '納', '柄', '肉', '骨'],
  '卵': ['卯', '印', '叩', '迎', '仰', '郎'],
  '店': ['点', '府', '床', '座', '庫', '席'],
  '売': ['壳', '読', '続', '志', '声', '市'],
  '町': ['男', '界', '田', '丁', '略', '畔'],
  '道': ['導', '通', '首', '追', '進', '近'],
  '歩': ['止', '走', '足', '涉', '武', '歳'],
  '立': ['音', '産', '辛', '位', '泣', '拉'],
  '座': ['坐', '床', '底', '府', '庫', '度'],
  '出': ['山', '凸', '凹', '生', '击', '缶'],
  '入': ['人', '八', '又', '込', '内', '及'],
  '上': ['止', '正', '下', '土', '工', '卡'],
  '下': ['不', '卡', '卞', '上', '丁', '正'],
  '前': ['剪', '煎', '首', '剪', '前', '美'],
  '後': ['待', '役', '従', '復', '彼', '後'],
  '高': ['亮', '亭', '京', '豪', '商', '育'],
  '安': ['女', '妥', '宴', '字', '家', '案'],
  '新': ['親', '薪', '析', '折', '断', '斬'],
  '古': ['吉', '舌', '克', '固', '苦', '居'],
  '長': ['張', '帳', '髪', '良', '辰', '長'],
  '短': ['知', '矢', '矩', '矮', '科', '矩'],
  '黒': ['里', '墨', '黙', '点', '薫', '黒'],
  '赤': ['亦', '赦', '赫', '変', '恋', '示'],
  '青': ['情', '清', '静', '精', '晴', '春'],
};

// Common kanji pool for general traps
const GENERAL_KANJI_TRAP_POOL = [
  '社', '杜', '仕', '会', '合', '全', '学', '字', '季', '校', '枝', '先', '洗', '失',
  '生', '牛', '行', '待', '街', '見', '貝', '買', '持', '時', '寺', '休', '体', '本',
  '木', '林', '食', '飲', '飯', '車', '東', '連', '日', '目', '白', '百', '大', '犬',
  '太', '小', '少', '中', '申', '国', '因', '困', '年', '午', '今', '令', '分', '刀',
  '月', '円', '火', '水', '氷', '金', '土', '士', '女', '安', '男', '子', '父', '文',
  '母', '毎', '友', '反', '名', '各', '石', '右', '左', '私', '話', '語', '読', '書',
  '聞', '問', '開', '間', '電', '雷', '駅', '訳', '病', '痛', '院', '完', '医', '矢',
  '者', '考', '研', '石', '究', '空', '室', '屋', '家', '手', '毛', '紙', '糸', '花',
  '切', '送', '貸', '借', '強', '弱', '雨', '雲', '気', '魚', '肉', '店', '町', '道',
  '歩', '立', '出', '入', '人', '上', '下', '前', '後', '高', '新', '古', '長', '短'
];

/**
 * Generate 3 tricky visually-similar Kanji distractors for a word.
 * E.g., for "会社" -> ["社会", "杜会", "会仕"]
 * E.g., for "学生" -> ["字生", "季生", "学牛"]
 * E.g., for "見る" -> ["貝る", "具る", "買る"]
 */
export function generateKanjiTraps(targetWord: string): string[] {
  const traps = new Set<string>();

  // If word has 2+ characters and multiple kanji
  const chars = Array.from(targetWord);
  const kanjiIndices: number[] = [];
  chars.forEach((c, idx) => {
    if (/[\u4E00-\u9FAF]/.test(c)) {
      kanjiIndices.push(idx);
    }
  });

  // Strategy 1: Invert 2 Kanji order if 2 kanji exist (e.g. 会社 -> 社会)
  if (kanjiIndices.length === 2) {
    const swapped = [...chars];
    const temp = swapped[kanjiIndices[0]];
    swapped[kanjiIndices[0]] = swapped[kanjiIndices[1]];
    swapped[kanjiIndices[1]] = temp;
    const swappedStr = swapped.join('');
    if (swappedStr !== targetWord) {
      traps.add(swappedStr);
    }
  }

  // Strategy 2: Replace individual kanji with visually similar lookalikes
  for (const idx of kanjiIndices) {
    const char = chars[idx];
    const lookalikes = KANJI_LOOKALIKES[char] || [];
    for (const alt of lookalikes) {
      if (alt !== char) {
        const copy = [...chars];
        copy[idx] = alt;
        traps.add(copy.join(''));
        if (traps.size >= 8) break;
      }
    }
  }

  // Strategy 3: Random replacement from general trap pool if still not enough
  let loopCount = 0;
  while (traps.size < 3 && loopCount < 30) {
    loopCount++;
    const randomKanji = GENERAL_KANJI_TRAP_POOL[Math.floor(Math.random() * GENERAL_KANJI_TRAP_POOL.length)];
    if (kanjiIndices.length > 0) {
      const targetIdx = kanjiIndices[Math.floor(Math.random() * kanjiIndices.length)];
      if (chars[targetIdx] !== randomKanji) {
        const copy = [...chars];
        copy[targetIdx] = randomKanji;
        traps.add(copy.join(''));
      }
    } else {
      traps.add(randomKanji);
    }
  }

  // Filter out the exact targetWord and pick 3 unique traps
  const filtered = Array.from(traps).filter((t) => t !== targetWord);
  return filtered.slice(0, 3);
}

/**
 * Japanese Phonological Trap mappings:
 * Confusing Dakuon (voicing), Sokuon (small tsu), Chouon (long vowels), Yoon (small ya/yu/yo)
 */
const DAKUON_MAP: Record<string, string[]> = {
  'か': ['が'], 'が': ['か'],
  'き': ['ぎ'], 'ぎ': ['き'],
  'く': ['ぐ'], 'ぐ': ['く'],
  'け': ['げ'], 'げ': ['け'],
  'こ': ['ご'], 'ご': ['こ'],
  'さ': ['ざ'], 'ざ': ['さ'],
  'し': ['じ', 'ち'], 'じ': ['し', 'ぢ'],
  'す': ['ず'], 'ず': ['す'],
  'せ': ['ぜ'], 'ぜ': ['せ'],
  'そ': ['ぞ'], 'ぞ': ['そ'],
  'た': ['だ'], 'だ': ['た'],
  'ち': ['ぢ', 'し'], 'ぢ': ['ち', 'じ'],
  'つ': ['づ', 'っ'], 'づ': ['つ'],
  'て': ['で'], 'で': ['て'],
  'と': ['ど'], 'ど': ['と'],
  'は': ['ば', 'ぱ'], 'ば': ['は', 'ぱ'], 'ぱ': ['は', 'ば'],
  'ひ': ['び', 'ぴ'], 'び': ['ひ', 'ぴ'], 'ぴ': ['ひ', 'び'],
  'ふ': ['ぶ', 'ぷ'], 'ぶ': ['ふ', 'ぷ'], 'ぷ': ['ふ', 'ぶ'],
  'へ': ['べ', 'ぺ'], 'べ': ['へ', 'ぺ'], 'ぺ': ['へ', 'べ'],
  'ほ': ['ぼ', 'ぽ'], 'ぼ': ['ほ', 'ぽ'], 'ぽ': ['ほ', 'ぼ'],
};

/**
 * Generate 3 phonological Hiragana distractors for a reading.
 * E.g., for "びょういん" -> ["びよういん", "びょうえん", "ぼういん"]
 * E.g., for "がくせい" -> ["かくせい", "がくぜい", "がっせい"]
 * E.g., for "ぎんこう" -> ["きんこう", "ぎんごう", "きんごう"]
 * E.g., for "せんせい" -> ["せんぜい", "ぜんせい", "せんせ"]
 */
export function generateHiraganaTraps(targetHiragana: string): string[] {
  const traps = new Set<string>();

  // Rule 1: Special famous Minna / JLPT traps
  if (targetHiragana.includes('びょういん')) {
    traps.add(targetHiragana.replace('びょういん', 'びよういん'));
    traps.add(targetHiragana.replace('びょういん', 'びょうえん'));
    traps.add(targetHiragana.replace('びょういん', 'ぼういん'));
  }
  if (targetHiragana.includes('がっこう')) {
    traps.add(targetHiragana.replace('がっこう', 'がくこう'));
    traps.add(targetHiragana.replace('がっこう', 'かっこ'));
    traps.add(targetHiragana.replace('がっこう', 'がっごう'));
  }
  if (targetHiragana.includes('きって')) {
    traps.add(targetHiragana.replace('きって', 'きて'));
    traps.add(targetHiragana.replace('きって', 'ぎって'));
    traps.add(targetHiragana.replace('きって', 'きった'));
  }

  // Rule 2: Yoon traps (ゃ/ゅ/ょ ↔ や/ゆ/よ)
  const yoonMap: Record<string, string> = {
    'ゃ': 'や', 'ゅ': 'ゆ', 'ょ': 'よ',
    'や': 'ゃ', 'ゆ': 'ゅ', 'よ': 'ょ'
  };
  for (const [small, big] of Object.entries(yoonMap)) {
    if (targetHiragana.includes(small)) {
      traps.add(targetHiragana.replace(small, big));
    }
  }

  // Rule 3: Sokuon traps (っ ↔ つ or remove)
  if (targetHiragana.includes('っ')) {
    traps.add(targetHiragana.replace('っ', 'つ'));
    traps.add(targetHiragana.replace('っ', 'く'));
    traps.add(targetHiragana.replace('っ', ''));
  } else if (targetHiragana.length >= 3) {
    // Add a sokuon trap: e.g. がくせい -> がっせい
    traps.add(targetHiragana.slice(0, 1) + 'っ' + targetHiragana.slice(2));
  }

  // Rule 4: Dakuon / Handakuon (Tenten) voicing confusion
  const chars = Array.from(targetHiragana);
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (DAKUON_MAP[c]) {
      for (const alt of DAKUON_MAP[c]) {
        const copy = [...chars];
        copy[i] = alt;
        traps.add(copy.join(''));
        if (traps.size >= 8) break;
      }
    }
  }

  // Rule 5: Chouon (Long vowel) trap (add or drop terminal 'う' or 'い')
  if (targetHiragana.endsWith('う')) {
    traps.add(targetHiragana.slice(0, -1));
  } else if (targetHiragana.endsWith('い') && targetHiragana.length > 2) {
    traps.add(targetHiragana.slice(0, -1));
  } else if (targetHiragana.length >= 2) {
    traps.add(targetHiragana + 'う');
  }

  // Rule 6: Similar kana confusion
  const similarKana: Record<string, string> = {
    'れ': 'ね', 'ね': 'わ', 'わ': 'れ',
    'あ': 'お', 'お': 'あ',
    'め': 'ぬ', 'ぬ': 'め',
    'る': 'ろ', 'ろ': 'る',
    'さ': 'ち', 'ち': 'さ',
    'い': 'り', 'り': 'い',
  };
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (similarKana[c]) {
      const copy = [...chars];
      copy[i] = similarKana[c];
      traps.add(copy.join(''));
    }
  }

  // Filter out exact match and empty
  const filtered = Array.from(traps).filter((t) => t && t !== targetHiragana);

  // If still need more, introduce an extra voicing swap
  if (filtered.length < 3) {
    const extra = targetHiragana + 'ん';
    if (!filtered.includes(extra)) filtered.push(extra);
  }

  return filtered.slice(0, 3);
}
