// 히라가나 데이터
const hiraganaData = [
    {char: 'あ', roma: 'a', sound: '아'},
    {char: 'い', roma: 'i', sound: '이'},
    {char: 'う', roma: 'u', sound: '우'},
    {char: 'え', roma: 'e', sound: '에'},
    {char: 'お', roma: 'o', sound: '오'},
    {char: 'か', roma: 'ka', sound: '카'},
    {char: 'き', roma: 'ki', sound: '키'},
    {char: 'く', roma: 'ku', sound: '쿠'},
    {char: 'け', roma: 'ke', sound: '케'},
    {char: 'こ', roma: 'ko', sound: '코'},
    {char: 'さ', roma: 'sa', sound: '사'},
    {char: 'し', roma: 'shi', sound: '시'},
    {char: 'す', roma: 'su', sound: '스'},
    {char: 'せ', roma: 'se', sound: '세'},
    {char: 'そ', roma: 'so', sound: '소'},
    {char: 'た', roma: 'ta', sound: '타'},
    {char: 'ち', roma: 'chi', sound: '치'},
    {char: 'つ', roma: 'tsu', sound: '츠'},
    {char: 'て', roma: 'te', sound: '테'},
    {char: 'と', roma: 'to', sound: '토'},
    {char: 'な', roma: 'na', sound: '나'},
    {char: 'に', roma: 'ni', sound: '니'},
    {char: 'ぬ', roma: 'nu', sound: '누'},
    {char: 'ね', roma: 'ne', sound: '네'},
    {char: 'の', roma: 'no', sound: '노'},
    {char: 'は', roma: 'ha', sound: '하'},
    {char: 'ひ', roma: 'hi', sound: '히'},
    {char: 'ふ', roma: 'fu', sound: '후'},
    {char: 'へ', roma: 'he', sound: '헤'},
    {char: 'ほ', roma: 'ho', sound: '호'},
    {char: 'ま', roma: 'ma', sound: '마'},
    {char: 'み', roma: 'mi', sound: '미'},
    {char: 'む', roma: 'mu', sound: '무'},
    {char: 'め', roma: 'me', sound: '메'},
    {char: 'も', roma: 'mo', sound: '모'},
    {char: 'や', roma: 'ya', sound: '야'},
    {char: 'ゆ', roma: 'yu', sound: '유'},
    {char: 'よ', roma: 'yo', sound: '요'},
    {char: 'ら', roma: 'ra', sound: '라'},
    {char: 'り', roma: 'ri', sound: '리'},
    {char: 'る', roma: 'ru', sound: '루'},
    {char: 'れ', roma: 're', sound: '레'},
    {char: 'ろ', roma: 'ro', sound: '로'},
    {char: 'わ', roma: 'wa', sound: '와'},
    {char: 'を', roma: 'wo', sound: '오'},
    {char: 'ん', roma: 'n', sound: 'ㄴ'}
];

// 가타카나 데이터
const katakanaData = [
    {char: 'ア', roma: 'a', sound: '아'},
    {char: 'イ', roma: 'i', sound: '이'},
    {char: 'ウ', roma: 'u', sound: '우'},
    {char: 'エ', roma: 'e', sound: '에'},
    {char: 'オ', roma: 'o', sound: '오'},
    {char: 'カ', roma: 'ka', sound: '카'},
    {char: 'キ', roma: 'ki', sound: '키'},
    {char: 'ク', roma: 'ku', sound: '쿠'},
    {char: 'ケ', roma: 'ke', sound: '케'},
    {char: 'コ', roma: 'ko', sound: '코'},
    {char: 'サ', roma: 'sa', sound: '사'},
    {char: 'シ', roma: 'shi', sound: '시'},
    {char: 'ス', roma: 'su', sound: '스'},
    {char: 'セ', roma: 'se', sound: '세'},
    {char: 'ソ', roma: 'so', sound: '소'},
    {char: 'タ', roma: 'ta', sound: '타'},
    {char: 'チ', roma: 'chi', sound: '치'},
    {char: 'ツ', roma: 'tsu', sound: '츠'},
    {char: 'テ', roma: 'te', sound: '테'},
    {char: 'ト', roma: 'to', sound: '토'},
    {char: 'ナ', roma: 'na', sound: '나'},
    {char: 'ニ', roma: 'ni', sound: '니'},
    {char: 'ヌ', roma: 'nu', sound: '누'},
    {char: 'ネ', roma: 'ne', sound: '네'},
    {char: 'ノ', roma: 'no', sound: '노'},
    {char: 'ハ', roma: 'ha', sound: '하'},
    {char: 'ヒ', roma: 'hi', sound: '히'},
    {char: 'フ', roma: 'fu', sound: '후'},
    {char: 'ヘ', roma: 'he', sound: '헤'},
    {char: 'ホ', roma: 'ho', sound: '호'},
    {char: 'マ', roma: 'ma', sound: '마'},
    {char: 'ミ', roma: 'mi', sound: '미'},
    {char: 'ム', roma: 'mu', sound: '무'},
    {char: 'メ', roma: 'me', sound: '메'},
    {char: 'モ', roma: 'mo', sound: '모'},
    {char: 'ヤ', roma: 'ya', sound: '야'},
    {char: 'ユ', roma: 'yu', sound: '유'},
    {char: 'ヨ', roma: 'yo', sound: '요'},
    {char: 'ラ', roma: 'ra', sound: '라'},
    {char: 'リ', roma: 'ri', sound: '리'},
    {char: 'ル', roma: 'ru', sound: '루'},
    {char: 'レ', roma: 're', sound: '레'},
    {char: 'ロ', roma: 'ro', sound: '로'},
    {char: 'ワ', roma: 'wa', sound: '와'},
    {char: 'ヲ', roma: 'wo', sound: '오'},
    {char: 'ン', roma: 'n', sound: 'ㄴ'}
];

// JLPT N5 한자 데이터 (100자)
const kanjiData = [
    // 숫자
    {kanji: '一', reading: 'いち', meaning: '하나, 일', example: '一つ (ひとつ)', exampleKo: '하나'},
    {kanji: '二', reading: 'に', meaning: '둘, 이', example: '二つ (ふたつ)', exampleKo: '둘'},
    {kanji: '三', reading: 'さん', meaning: '셋, 삼', example: '三つ (みっつ)', exampleKo: '셋'},
    {kanji: '四', reading: 'し/よん', meaning: '넷, 사', example: '四つ (よっつ)', exampleKo: '넷'},
    {kanji: '五', reading: 'ご', meaning: '다섯, 오', example: '五つ (いつつ)', exampleKo: '다섯'},
    {kanji: '六', reading: 'ろく', meaning: '여섯, 육', example: '六つ (むっつ)', exampleKo: '여섯'},
    {kanji: '七', reading: 'しち/なな', meaning: '일곱, 칠', example: '七つ (ななつ)', exampleKo: '일곱'},
    {kanji: '八', reading: 'はち', meaning: '여덟, 팔', example: '八つ (やっつ)', exampleKo: '여덟'},
    {kanji: '九', reading: 'きゅう/く', meaning: '아홉, 구', example: '九つ (ここのつ)', exampleKo: '아홉'},
    {kanji: '十', reading: 'じゅう', meaning: '열, 십', example: '十 (じゅう)', exampleKo: '열'},
    {kanji: '百', reading: 'ひゃく', meaning: '백', example: '百円 (ひゃくえん)', exampleKo: '100엔'},
    {kanji: '千', reading: 'せん', meaning: '천', example: '千円 (せんえん)', exampleKo: '1000엔'},
    {kanji: '万', reading: 'まん', meaning: '만', example: '一万円 (いちまんえん)', exampleKo: '1만엔'},
    // 요일과 시간
    {kanji: '日', reading: 'にち/ひ/か', meaning: '날, 해', example: '今日 (きょう)', exampleKo: '오늘'},
    {kanji: '月', reading: 'がつ/つき', meaning: '달, 월', example: '一月 (いちがつ)', exampleKo: '1월'},
    {kanji: '火', reading: 'か/ひ', meaning: '불, 화', example: '火曜日 (かようび)', exampleKo: '화요일'},
    {kanji: '水', reading: 'すい/みず', meaning: '물, 수', example: '水曜日 (すいようび)', exampleKo: '수요일'},
    {kanji: '木', reading: 'もく/き', meaning: '나무, 목', example: '木曜日 (もくようび)', exampleKo: '목요일'},
    {kanji: '金', reading: 'きん/かね', meaning: '금, 돈', example: '金曜日 (きんようび)', exampleKo: '금요일'},
    {kanji: '土', reading: 'ど/つち', meaning: '흙, 토', example: '土曜日 (どようび)', exampleKo: '토요일'},
    {kanji: '年', reading: 'ねん/とし', meaning: '해, 년', example: '今年 (ことし)', exampleKo: '올해'},
    {kanji: '時', reading: 'じ/とき', meaning: '시간, 때', example: '時間 (じかん)', exampleKo: '시간'},
    {kanji: '分', reading: 'ふん/ぶん/わ', meaning: '분, 나누다', example: '十分 (じゅっぷん)', exampleKo: '10분'},
    {kanji: '午', reading: 'ご', meaning: '낮', example: '午前 (ごぜん)', exampleKo: '오전'},
    {kanji: '前', reading: 'ぜん/まえ', meaning: '앞', example: '午前 (ごぜん)', exampleKo: '오전'},
    {kanji: '後', reading: 'ご/あと/うし', meaning: '뒤', example: '午後 (ごご)', exampleKo: '오후'},
    {kanji: '今', reading: 'いま/こん', meaning: '지금', example: '今日 (きょう)', exampleKo: '오늘'},
    {kanji: '毎', reading: 'まい', meaning: '매', example: '毎日 (まいにち)', exampleKo: '매일'},
    // 사람
    {kanji: '人', reading: 'じん/にん/ひと', meaning: '사람', example: '日本人 (にほんじん)', exampleKo: '일본인'},
    {kanji: '男', reading: 'だん/おとこ', meaning: '남자', example: '男の人 (おとこのひと)', exampleKo: '남자'},
    {kanji: '女', reading: 'じょ/おんな', meaning: '여자', example: '女の人 (おんなのひと)', exampleKo: '여자'},
    {kanji: '子', reading: 'し/こ', meaning: '아이', example: '子供 (こども)', exampleKo: '아이'},
    {kanji: '母', reading: 'ぼ/はは', meaning: '어머니', example: '母 (はは)', exampleKo: '어머니'},
    {kanji: '父', reading: 'ふ/ちち', meaning: '아버지', example: '父 (ちち)', exampleKo: '아버지'},
    {kanji: '友', reading: 'ゆう/とも', meaning: '친구', example: '友達 (ともだち)', exampleKo: '친구'},
    {kanji: '先', reading: 'せん/さき', meaning: '먼저, 앞', example: '先生 (せんせい)', exampleKo: '선생님'},
    {kanji: '生', reading: 'せい/い', meaning: '살다, 생', example: '学生 (がくせい)', exampleKo: '학생'},
    {kanji: '名', reading: 'めい/な', meaning: '이름', example: '名前 (なまえ)', exampleKo: '이름'},
    // 학교
    {kanji: '学', reading: 'がく/まな', meaning: '배우다', example: '学校 (がっこう)', exampleKo: '학교'},
    {kanji: '校', reading: 'こう', meaning: '학교', example: '学校 (がっこう)', exampleKo: '학교'},
    {kanji: '高', reading: 'こう/たか', meaning: '높다', example: '高い (たかい)', exampleKo: '높다'},
    {kanji: '語', reading: 'ご/かた', meaning: '말, 언어', example: '日本語 (にほんご)', exampleKo: '일본어'},
    {kanji: '文', reading: 'ぶん/もん', meaning: '글', example: '文章 (ぶんしょう)', exampleKo: '문장'},
    {kanji: '字', reading: 'じ', meaning: '글자', example: '漢字 (かんじ)', exampleKo: '한자'},
    {kanji: '本', reading: 'ほん/もと', meaning: '책, 본', example: '本 (ほん)', exampleKo: '책'},
    {kanji: '書', reading: 'しょ/か', meaning: '쓰다', example: '書く (かく)', exampleKo: '쓰다'},
    {kanji: '読', reading: 'どく/よ', meaning: '읽다', example: '読む (よむ)', exampleKo: '읽다'},
    // 장소
    {kanji: '国', reading: 'こく/くに', meaning: '나라', example: '外国 (がいこく)', exampleKo: '외국'},
    {kanji: '外', reading: 'がい/そと', meaning: '밖', example: '外 (そと)', exampleKo: '밖'},
    {kanji: '中', reading: 'ちゅう/なか', meaning: '안, 중', example: '中 (なか)', exampleKo: '안'},
    {kanji: '上', reading: 'じょう/うえ/あ', meaning: '위', example: '上 (うえ)', exampleKo: '위'},
    {kanji: '下', reading: 'か/げ/した/さ', meaning: '아래', example: '下 (した)', exampleKo: '아래'},
    {kanji: '左', reading: 'さ/ひだり', meaning: '왼쪽', example: '左 (ひだり)', exampleKo: '왼쪽'},
    {kanji: '右', reading: 'う/ゆう/みぎ', meaning: '오른쪽', example: '右 (みぎ)', exampleKo: '오른쪽'},
    {kanji: '東', reading: 'とう/ひがし', meaning: '동쪽', example: '東京 (とうきょう)', exampleKo: '도쿄'},
    {kanji: '西', reading: 'せい/さい/にし', meaning: '서쪽', example: '西 (にし)', exampleKo: '서쪽'},
    {kanji: '南', reading: 'なん/みなみ', meaning: '남쪽', example: '南 (みなみ)', exampleKo: '남쪽'},
    {kanji: '北', reading: 'ほく/きた', meaning: '북쪽', example: '北 (きた)', exampleKo: '북쪽'},
    {kanji: '山', reading: 'さん/やま', meaning: '산', example: '山 (やま)', exampleKo: '산'},
    {kanji: '川', reading: 'せん/かわ', meaning: '강', example: '川 (かわ)', exampleKo: '강'},
    {kanji: '田', reading: 'でん/た', meaning: '논, 밭', example: '田中 (たなか)', exampleKo: '다나카'},
    {kanji: '門', reading: 'もん/かど', meaning: '문', example: '門 (もん)', exampleKo: '문'},
    {kanji: '間', reading: 'かん/ま/あいだ', meaning: '사이, 간', example: '時間 (じかん)', exampleKo: '시간'},
    {kanji: '駅', reading: 'えき', meaning: '역', example: '駅 (えき)', exampleKo: '역'},
    {kanji: '店', reading: 'てん/みせ', meaning: '가게', example: '店 (みせ)', exampleKo: '가게'},
    {kanji: '社', reading: 'しゃ/やしろ', meaning: '회사', example: '会社 (かいしゃ)', exampleKo: '회사'},
    {kanji: '会', reading: 'かい/え/あ', meaning: '만나다, 모임', example: '会社 (かいしゃ)', exampleKo: '회사'},
    // 동작
    {kanji: '行', reading: 'こう/ぎょう/い/ゆ', meaning: '가다', example: '行く (いく)', exampleKo: '가다'},
    {kanji: '来', reading: 'らい/く/き', meaning: '오다', example: '来る (くる)', exampleKo: '오다'},
    {kanji: '見', reading: 'けん/み', meaning: '보다', example: '見る (みる)', exampleKo: '보다'},
    {kanji: '聞', reading: 'ぶん/もん/き', meaning: '듣다', example: '聞く (きく)', exampleKo: '듣다'},
    {kanji: '話', reading: 'わ/はな/はなし', meaning: '말하다', example: '話す (はなす)', exampleKo: '말하다'},
    {kanji: '食', reading: 'しょく/た', meaning: '먹다', example: '食べる (たべる)', exampleKo: '먹다'},
    {kanji: '飲', reading: 'いん/の', meaning: '마시다', example: '飲む (のむ)', exampleKo: '마시다'},
    {kanji: '買', reading: 'ばい/か', meaning: '사다', example: '買う (かう)', exampleKo: '사다'},
    {kanji: '売', reading: 'ばい/う', meaning: '팔다', example: '売る (うる)', exampleKo: '팔다'},
    {kanji: '出', reading: 'しゅつ/で/だ', meaning: '나가다', example: '出る (でる)', exampleKo: '나가다'},
    {kanji: '入', reading: 'にゅう/い/はい', meaning: '들어가다', example: '入る (はいる)', exampleKo: '들어가다'},
    {kanji: '立', reading: 'りつ/た', meaning: '서다', example: '立つ (たつ)', exampleKo: '서다'},
    {kanji: '休', reading: 'きゅう/やす', meaning: '쉬다', example: '休む (やすむ)', exampleKo: '쉬다'},
    {kanji: '待', reading: 'たい/ま', meaning: '기다리다', example: '待つ (まつ)', exampleKo: '기다리다'},
    {kanji: '持', reading: 'じ/も', meaning: '가지다', example: '持つ (もつ)', exampleKo: '가지다'},
    // 신체
    {kanji: '手', reading: 'しゅ/て', meaning: '손', example: '手 (て)', exampleKo: '손'},
    {kanji: '足', reading: 'そく/あし', meaning: '발', example: '足 (あし)', exampleKo: '발'},
    {kanji: '目', reading: 'もく/め', meaning: '눈', example: '目 (め)', exampleKo: '눈'},
    {kanji: '口', reading: 'こう/くち', meaning: '입', example: '口 (くち)', exampleKo: '입'},
    {kanji: '耳', reading: 'じ/みみ', meaning: '귀', example: '耳 (みみ)', exampleKo: '귀'},
    {kanji: '力', reading: 'りょく/りき/ちから', meaning: '힘', example: '力 (ちから)', exampleKo: '힘'},
    // 형용사
    {kanji: '大', reading: 'だい/おお', meaning: '크다', example: '大きい (おおきい)', exampleKo: '크다'},
    {kanji: '小', reading: 'しょう/ちい/こ', meaning: '작다', example: '小さい (ちいさい)', exampleKo: '작다'},
    {kanji: '新', reading: 'しん/あたら', meaning: '새롭다', example: '新しい (あたらしい)', exampleKo: '새롭다'},
    {kanji: '古', reading: 'こ/ふる', meaning: '오래되다', example: '古い (ふるい)', exampleKo: '오래되다'},
    {kanji: '長', reading: 'ちょう/なが', meaning: '길다', example: '長い (ながい)', exampleKo: '길다'},
    {kanji: '短', reading: 'たん/みじか', meaning: '짧다', example: '短い (みじかい)', exampleKo: '짧다'},
    {kanji: '多', reading: 'た/おお', meaning: '많다', example: '多い (おおい)', exampleKo: '많다'},
    {kanji: '少', reading: 'しょう/すく/すこ', meaning: '적다', example: '少ない (すくない)', exampleKo: '적다'},
    {kanji: '高', reading: 'こう/たか', meaning: '높다, 비싸다', example: '高い (たかい)', exampleKo: '높다/비싸다'},
    {kanji: '安', reading: 'あん/やす', meaning: '싸다', example: '安い (やすい)', exampleKo: '싸다'},
    {kanji: '白', reading: 'はく/びゃく/しろ', meaning: '흰색', example: '白い (しろい)', exampleKo: '하얗다'},
    {kanji: '黒', reading: 'こく/くろ', meaning: '검은색', example: '黒い (くろい)', exampleKo: '검다'},
    // 기타
    {kanji: '天', reading: 'てん/あま', meaning: '하늘', example: '天気 (てんき)', exampleKo: '날씨'},
    {kanji: '気', reading: 'き/け', meaning: '기운', example: '天気 (てんき)', exampleKo: '날씨'},
    {kanji: '雨', reading: 'う/あめ', meaning: '비', example: '雨 (あめ)', exampleKo: '비'},
    {kanji: '電', reading: 'でん', meaning: '전기', example: '電車 (でんしゃ)', exampleKo: '전철'},
    {kanji: '車', reading: 'しゃ/くるま', meaning: '차', example: '車 (くるま)', exampleKo: '차'}
];

// 일본 문화 콘텐츠 데이터
const cultureData = {
    food: {
        title: '일본 요리',
        description: '일본의 대표 음식과 식사 문화를 배워봅시다.',
        vocabulary: [
            {japanese: '寿司', reading: 'すし', meaning: '초밥'},
            {japanese: 'ラーメン', reading: 'raamen', meaning: '라멘'},
            {japanese: '天ぷら', reading: 'てんぷら', meaning: '튀김'},
            {japanese: 'お好み焼き', reading: 'おこのみやき', meaning: '오코노미야키'},
            {japanese: '刺身', reading: 'さしみ', meaning: '회'},
            {japanese: 'うどん', reading: 'udon', meaning: '우동'},
            {japanese: 'そば', reading: 'soba', meaning: '메밀국수'},
            {japanese: '丼', reading: 'どん', meaning: '덮밥'},
            {japanese: '焼き鳥', reading: 'やきとり', meaning: '야키토리'},
            {japanese: '味噌汁', reading: 'みそしる', meaning: '된장국'}
        ],
        phrases: [
            {japanese: 'いただきます', meaning: '잘 먹겠습니다'},
            {japanese: 'ごちそうさまでした', meaning: '잘 먹었습니다'},
            {japanese: 'おいしいです', meaning: '맛있습니다'}
        ]
    },
    tradition: {
        title: '전통 문화',
        description: '일본의 전통 문화와 예절을 알아봅시다.',
        vocabulary: [
            {japanese: '着物', reading: 'きもの', meaning: '기모노'},
            {japanese: '茶道', reading: 'さどう', meaning: '다도'},
            {japanese: '書道', reading: 'しょどう', meaning: '서예'},
            {japanese: '華道', reading: 'かどう', meaning: '꽃꽂이'},
            {japanese: '折り紙', reading: 'おりがみ', meaning: '종이접기'},
            {japanese: '温泉', reading: 'おんせん', meaning: '온천'},
            {japanese: '神社', reading: 'じんじゃ', meaning: '신사'},
            {japanese: 'お寺', reading: 'おてら', meaning: '절'},
            {japanese: '相撲', reading: 'すもう', meaning: '스모'},
            {japanese: '武道', reading: 'ぶどう', meaning: '무도'}
        ]
    },
    festivals: {
        title: '축제와 명절',
        description: '일본의 주요 축제와 명절을 배워봅시다.',
        vocabulary: [
            {japanese: '正月', reading: 'しょうがつ', meaning: '설날'},
            {japanese: 'お盆', reading: 'おぼん', meaning: '오봉'},
            {japanese: '花見', reading: 'はなみ', meaning: '꽃구경'},
            {japanese: '花火大会', reading: 'はなびたいかい', meaning: '불꽃놀이'},
            {japanese: '祭り', reading: 'まつり', meaning: '축제'},
            {japanese: '七夕', reading: 'たなばた', meaning: '칠석'},
            {japanese: 'ひな祭り', reading: 'ひなまつり', meaning: '여자아이날'},
            {japanese: 'こどもの日', reading: 'こどものひ', meaning: '어린이날'},
            {japanese: 'クリスマス', reading: 'kurisumasu', meaning: '크리스마스'},
            {japanese: '年末年始', reading: 'ねんまつねんし', meaning: '연말연시'}
        ]
    },
    manners: {
        title: '일본 예절',
        description: '일본에서 지켜야 할 기본 예절을 배워봅시다.',
        content: [
            {situation: '인사', japanese: 'お辞儀', reading: 'おじぎ', description: '인사할 때는 허리를 숙여 절합니다.'},
            {situation: '식사', japanese: '箸のマナー', reading: 'はしのまなー', description: '젓가락을 음식에 꽂으면 안 됩니다.'},
            {situation: '대중교통', japanese: '静かに', reading: 'しずかに', description: '전철에서는 조용히 해야 합니다.'},
            {situation: '선물', japanese: '両手で', reading: 'りょうてで', description: '선물은 양손으로 주고받습니다.'},
            {situation: '신발', japanese: '靴を脱ぐ', reading: 'くつをぬぐ', description: '집에 들어갈 때는 신발을 벗습니다.'}
        ]
    }
};

// 계속해서 어휘 데이터를 추가합니다...

// JLPT N5 어휘 데이터 (800단어 중 일부 - 카테고리별로 구성)
const vocabularyData = {
    beginner: [
        // 인사
        {japanese: 'こんにちは', reading: 'konnichiwa', meaning: '안녕하세요', example: 'こんにちは、元気ですか。', exampleKo: '안녕하세요, 잘 지내세요?'},
        {japanese: 'おはよう', reading: 'ohayou', meaning: '좋은 아침', example: 'おはようございます。', exampleKo: '좋은 아침입니다.'},
        {japanese: 'こんばんは', reading: 'konbanwa', meaning: '좋은 저녁', example: 'こんばんは、お元気ですか。', exampleKo: '좋은 저녁이에요, 잘 지내세요?'},
        {japanese: 'さようなら', reading: 'sayounara', meaning: '안녕히 가세요', example: 'さようなら、また明日。', exampleKo: '안녕히 가세요, 또 내일.'},
        {japanese: 'ありがとう', reading: 'arigatou', meaning: '감사합니다', example: 'ありがとうございます。', exampleKo: '감사합니다.'},
        {japanese: 'すみません', reading: 'sumimasen', meaning: '죄송합니다', example: 'すみません、遅れました。', exampleKo: '죄송합니다, 늦었습니다.'},
        {japanese: 'ごめんなさい', reading: 'gomennasai', meaning: '미안합니다', example: 'ごめんなさい。', exampleKo: '미안합니다.'},
        {japanese: 'お願いします', reading: 'onegaishimasu', meaning: '부탁합니다', example: 'お願いします。', exampleKo: '부탁합니다.'},
        // 기본 단어
        {japanese: 'はい', reading: 'hai', meaning: '네', example: 'はい、分かりました。', exampleKo: '네, 알겠습니다.'},
        {japanese: 'いいえ', reading: 'iie', meaning: '아니오', example: 'いいえ、違います。', exampleKo: '아니요, 틀렸습니다.'},
        {japanese: '私', reading: 'watashi', meaning: '나, 저', example: '私は学生です。', exampleKo: '저는 학생입니다.'},
        {japanese: 'あなた', reading: 'anata', meaning: '당신', example: 'あなたは誰ですか。', exampleKo: '당신은 누구입니까?'},
        {japanese: '名前', reading: 'namae', meaning: '이름', example: '名前は何ですか。', exampleKo: '이름이 뭐예요?'},
        {japanese: '何', reading: 'nani', meaning: '무엇', example: 'これは何ですか。', exampleKo: '이것은 무엇입니까?'},
        {japanese: 'どこ', reading: 'doko', meaning: '어디', example: 'トイレはどこですか。', exampleKo: '화장실은 어디입니까?'},
        {japanese: 'いつ', reading: 'itsu', meaning: '언제', example: 'いつ来ますか。', exampleKo: '언제 옵니까?'},
        {japanese: 'だれ', reading: 'dare', meaning: '누구', example: 'だれですか。', exampleKo: '누구입니까?'},
        {japanese: 'どう', reading: 'dou', meaning: '어떻게', example: 'どうですか。', exampleKo: '어떻습니까?'},
        // 가족
        {japanese: '家族', reading: 'kazoku', meaning: '가족', example: '家族と住んでいます。', exampleKo: '가족과 살고 있습니다.'},
        {japanese: '母', reading: 'haha', meaning: '어머니', example: '母は料理が上手です。', exampleKo: '어머니는 요리를 잘합니다.'},
        {japanese: '父', reading: 'chichi', meaning: '아버지', example: '父は会社員です。', exampleKo: '아버지는 회사원입니다.'},
        {japanese: '兄', reading: 'ani', meaning: '형, 오빠', example: '兄は大学生です。', exampleKo: '형은 대학생입니다.'},
        {japanese: '姉', reading: 'ane', meaning: '누나, 언니', example: '姉は看護師です。', exampleKo: '언니는 간호사입니다.'},
        {japanese: '弟', reading: 'otouto', meaning: '남동생', example: '弟は高校生です。', exampleKo: '남동생은 고등학생입니다.'},
        {japanese: '妹', reading: 'imouto', meaning: '여동생', example: '妹は中学生です。', exampleKo: '여동생은 중학생입니다.'},
        {japanese: '友達', reading: 'tomodachi', meaning: '친구', example: '友達と遊びます。', exampleKo: '친구와 놉니다.'},
        {japanese: '先生', reading: 'sensei', meaning: '선생님', example: '先生、質問があります。', exampleKo: '선생님, 질문이 있습니다.'},
        {japanese: '学生', reading: 'gakusei', meaning: '학생', example: '私は学生です。', exampleKo: '저는 학생입니다.'},
        // 장소
        {japanese: '学校', reading: 'gakkou', meaning: '학교', example: '学校に行きます。', exampleKo: '학교에 갑니다.'},
        {japanese: '会社', reading: 'kaisha', meaning: '회사', example: '会社で働きます。', exampleKo: '회사에서 일합니다.'},
        {japanese: '家', reading: 'ie', meaning: '집', example: '家に帰ります。', exampleKo: '집에 돌아갑니다.'},
        {japanese: '駅', reading: 'eki', meaning: '역', example: '駅で待ちます。', exampleKo: '역에서 기다립니다.'},
        {japanese: '病院', reading: 'byouin', meaning: '병원', example: '病院に行きます。', exampleKo: '병원에 갑니다.'},
        {japanese: '銀行', reading: 'ginkou', meaning: '은행', example: '銀行でお金を下ろします。', exampleKo: '은행에서 돈을 찾습니다.'},
        {japanese: 'デパート', reading: 'depaato', meaning: '백화점', example: 'デパートで買い物します。', exampleKo: '백화점에서 쇼핑합니다.'},
        {japanese: 'スーパー', reading: 'suupaa', meaning: '슈퍼마켓', example: 'スーパーで買い物します。', exampleKo: '슈퍼에서 장봅니다.'},
        {japanese: 'レストラン', reading: 'resutoran', meaning: '레스토랑', example: 'レストランで食べます。', exampleKo: '레스토랑에서 먹습니다.'},
        {japanese: 'ホテル', reading: 'hoteru', meaning: '호텔', example: 'ホテルに泊まります。', exampleKo: '호텔에 묵습니다.'},
        // 물건
        {japanese: '本', reading: 'hon', meaning: '책', example: '本を読みます。', exampleKo: '책을 읽습니다.'},
        {japanese: '鉛筆', reading: 'enpitsu', meaning: '연필', example: '鉛筆で書きます。', exampleKo: '연필로 씁니다.'},
        {japanese: 'ペン', reading: 'pen', meaning: '펜', example: 'ペンで書きます。', exampleKo: '펜으로 씁니다.'},
        {japanese: 'ノート', reading: 'nooto', meaning: '노트', example: 'ノートに書きます。', exampleKo: '노트에 씁니다.'},
        {japanese: '机', reading: 'tsukue', meaning: '책상', example: '机の上に本があります。', exampleKo: '책상 위에 책이 있습니다.'},
        {japanese: '椅子', reading: 'isu', meaning: '의자', example: '椅子に座ります。', exampleKo: '의자에 앉습니다.'},
        {japanese: '窓', reading: 'mado', meaning: '창문', example: '窓を開けます。', exampleKo: '창문을 엽니다.'},
        {japanese: 'ドア', reading: 'doa', meaning: '문', example: 'ドアを閉めます。', exampleKo: '문을 닫습니다.'},
        {japanese: 'かばん', reading: 'kaban', meaning: '가방', example: 'かばんを持ちます。', exampleKo: '가방을 듭니다.'},
        {japanese: '時計', reading: 'tokei', meaning: '시계', example: '時計を見ます。', exampleKo: '시계를 봅니다.'},
        // 동사
        {japanese: '食べる', reading: 'taberu', meaning: '먹다', example: 'ご飯を食べます。', exampleKo: '밥을 먹습니다.'},
        {japanese: '飲む', reading: 'nomu', meaning: '마시다', example: '水を飲みます。', exampleKo: '물을 마십니다.'},
        {japanese: '見る', reading: 'miru', meaning: '보다', example: 'テレビを見ます。', exampleKo: 'TV를 봅니다.'},
        {japanese: '聞く', reading: 'kiku', meaning: '듣다', example: '音楽を聞きます。', exampleKo: '음악을 듣습니다.'},
        {japanese: '話す', reading: 'hanasu', meaning: '말하다', example: '日本語を話します。', exampleKo: '일본어를 말합니다.'},
        {japanese: '読む', reading: 'yomu', meaning: '읽다', example: '新聞を読みます。', exampleKo: '신문을 읽습니다.'},
        {japanese: '書く', reading: 'kaku', meaning: '쓰다', example: '手紙を書きます。', exampleKo: '편지를 씁니다.'},
        {japanese: '行く', reading: 'iku', meaning: '가다', example: '学校に行きます。', exampleKo: '학교에 갑니다.'},
        {japanese: '来る', reading: 'kuru', meaning: '오다', example: '友達が来ます。', exampleKo: '친구가 옵니다.'},
        {japanese: '帰る', reading: 'kaeru', meaning: '돌아가다', example: '家に帰ります。', exampleKo: '집에 돌아갑니다.'},
        // 형용사
        {japanese: '大きい', reading: 'ookii', meaning: '크다', example: '大きい家です。', exampleKo: '큰 집입니다.'},
        {japanese: '小さい', reading: 'chiisai', meaning: '작다', example: '小さい犬です。', exampleKo: '작은 개입니다.'},
        {japanese: '新しい', reading: 'atarashii', meaning: '새롭다', example: '新しい車です。', exampleKo: '새 차입니다.'},
        {japanese: '古い', reading: 'furui', meaning: '오래되다', example: '古い家です。', exampleKo: '오래된 집입니다.'},
        {japanese: '良い', reading: 'yoi', meaning: '좋다', example: '良い天気です。', exampleKo: '좋은 날씨입니다.'},
        {japanese: '悪い', reading: 'warui', meaning: '나쁘다', example: '悪い天気です。', exampleKo: '나쁜 날씨입니다.'}
    ],
    intermediate: [
        // 시간과 날씨
        {japanese: '天気', reading: 'tenki', meaning: '날씨', example: '今日は天気がいいです。', exampleKo: '오늘은 날씨가 좋습니다.'},
        {japanese: '雨', reading: 'ame', meaning: '비', example: '雨が降ります。', exampleKo: '비가 옵니다.'},
        {japanese: '雪', reading: 'yuki', meaning: '눈', example: '雪が降ります。', exampleKo: '눈이 옵니다.'},
        {japanese: '風', reading: 'kaze', meaning: '바람', example: '風が強いです。', exampleKo: '바람이 강합니다.'},
        {japanese: '曇り', reading: 'kumori', meaning: '흐림', example: '今日は曇りです。', exampleKo: '오늘은 흐립니다.'},
        {japanese: '晴れ', reading: 'hare', meaning: '맑음', example: '明日は晴れです。', exampleKo: '내일은 맑습니다.'},
        {japanese: '暑い', reading: 'atsui', meaning: '덥다', example: '今日は暑いです。', exampleKo: '오늘은 덥습니다.'},
        {japanese: '寒い', reading: 'samui', meaning: '춥다', example: '冬は寒いです。', exampleKo: '겨울은 춥습니다.'},
        {japanese: '暖かい', reading: 'atatakai', meaning: '따뜻하다', example: '春は暖かいです。', exampleKo: '봄은 따뜻합니다.'},
        {japanese: '涼しい', reading: 'suzushii', meaning: '시원하다', example: '秋は涼しいです。', exampleKo: '가을은 시원합니다.'},
        // 계절
        {japanese: '季節', reading: 'kisetsu', meaning: '계절', example: '好きな季節は春です。', exampleKo: '좋아하는 계절은 봄입니다.'},
        {japanese: '春', reading: 'haru', meaning: '봄', example: '春は桜が咲きます。', exampleKo: '봄에는 벚꽃이 핍니다.'},
        {japanese: '夏', reading: 'natsu', meaning: '여름', example: '夏は暑いです。', exampleKo: '여름은 덥습니다.'},
        {japanese: '秋', reading: 'aki', meaning: '가을', example: '秋は紅葉が美しいです。', exampleKo: '가을은 단풍이 아름답습니다.'},
        {japanese: '冬', reading: 'fuyu', meaning: '겨울', example: '冬は寒いです。', exampleKo: '겨울은 춥습니다.'},
        // 교통
        {japanese: '電車', reading: 'densha', meaning: '전철', example: '電車で通勤します。', exampleKo: '전철로 출근합니다.'},
        {japanese: 'バス', reading: 'basu', meaning: '버스', example: 'バスに乗ります。', exampleKo: '버스를 탑니다.'},
        {japanese: 'タクシー', reading: 'takushii', meaning: '택시', example: 'タクシーで行きます。', exampleKo: '택시로 갑니다.'},
        {japanese: '飛行機', reading: 'hikouki', meaning: '비행기', example: '飛行機で行きます。', exampleKo: '비행기로 갑니다.'},
        {japanese: '自転車', reading: 'jitensha', meaning: '자전거', example: '自転車に乗ります。', exampleKo: '자전거를 탑니다.'},
        {japanese: '車', reading: 'kuruma', meaning: '차', example: '車で行きます。', exampleKo: '차로 갑니다.'},
        {japanese: '空港', reading: 'kuukou', meaning: '공항', example: '空港に行きます。', exampleKo: '공항에 갑니다.'},
        {japanese: '駅', reading: 'eki', meaning: '역', example: '駅で降ります。', exampleKo: '역에서 내립니다.'},
        // 여행
        {japanese: '旅行', reading: 'ryokou', meaning: '여행', example: '夏休みに旅行します。', exampleKo: '여름방학에 여행합니다.'},
        {japanese: '予約', reading: 'yoyaku', meaning: '예약', example: 'ホテルを予約します。', exampleKo: '호텔을 예약합니다.'},
        {japanese: 'チケット', reading: 'chiketto', meaning: '티켓', example: 'チケットを買います。', exampleKo: '티켓을 삽니다.'},
        {japanese: '荷物', reading: 'nimotsu', meaning: '짐', example: '荷物が重いです。', exampleKo: '짐이 무겁습니다.'},
        // 음식
        {japanese: '料理', reading: 'ryouri', meaning: '요리', example: '料理を作ります。', exampleKo: '요리를 만듭니다.'},
        {japanese: '美味しい', reading: 'oishii', meaning: '맛있다', example: 'この料理は美味しいです。', exampleKo: '이 요리는 맛있습니다.'},
        {japanese: 'まずい', reading: 'mazui', meaning: '맛없다', example: 'この料理はまずいです。', exampleKo: '이 요리는 맛없습니다.'},
        {japanese: '甘い', reading: 'amai', meaning: '달다', example: 'ケーキは甘いです。', exampleKo: '케이크는 답니다.'},
        {japanese: '辛い', reading: 'karai', meaning: '맵다', example: 'キムチは辛いです。', exampleKo: '김치는 맵습니다.'},
        {japanese: '塩辛い', reading: 'shiokarai', meaning: '짜다', example: 'スープが塩辛いです。', exampleKo: '수프가 짭니다.'},
        {japanese: '酸っぱい', reading: 'suppai', meaning: '시다', example: 'レモンは酸っぱいです。', exampleKo: '레몬은 십니다.'},
        {japanese: '苦い', reading: 'nigai', meaning: '쓰다', example: 'コーヒーは苦いです。', exampleKo: '커피는 씁니다.'},
        // 감정
        {japanese: '楽しい', reading: 'tanoshii', meaning: '즐겁다', example: '旅行は楽しいです。', exampleKo: '여행은 즐겁습니다.'},
        {japanese: '嬉しい', reading: 'ureshii', meaning: '기쁘다', example: 'プレゼントをもらって嬉しいです。', exampleKo: '선물을 받아서 기쁩니다.'},
        {japanese: '悲しい', reading: 'kanashii', meaning: '슬프다', example: '映画を見て悲しかったです。', exampleKo: '영화를 보고 슬펐습니다.'},
        {japanese: '怒る', reading: 'okoru', meaning: '화내다', example: '先生が怒ります。', exampleKo: '선생님이 화냅니다.'},
        {japanese: '笑う', reading: 'warau', meaning: '웃다', example: '友達と笑います。', exampleKo: '친구와 웃습니다.'},
        {japanese: '泣く', reading: 'naku', meaning: '울다', example: '赤ちゃんが泣きます。', exampleKo: '아기가 웁니다.'}
    ],
    advanced: [
        // 더 복잡한 표현
        {japanese: '経験', reading: 'keiken', meaning: '경험', example: '面白い経験をしました。', exampleKo: '재미있는 경험을 했습니다.'},
        {japanese: '準備', reading: 'junbi', meaning: '준비', example: '旅行の準備をします。', exampleKo: '여행 준비를 합니다.'},
        {japanese: '予定', reading: 'yotei', meaning: '예정', example: '明日の予定は何ですか。', exampleKo: '내일 예정은 무엇입니까?'},
        {japanese: '約束', reading: 'yakusoku', meaning: '약속', example: '友達と約束があります。', exampleKo: '친구와 약속이 있습니다.'},
        {japanese: '連絡', reading: 'renraku', meaning: '연락', example: '連絡をください。', exampleKo: '연락 주세요.'},
        {japanese: '質問', reading: 'shitsumon', meaning: '질문', example: '質問があります。', exampleKo: '질문이 있습니다.'},
        {japanese: '答え', reading: 'kotae', meaning: '답', example: '答えを教えてください。', exampleKo: '답을 알려주세요.'},
        {japanese: '説明', reading: 'setsumei', meaning: '설명', example: '説明をお願いします。', exampleKo: '설명을 부탁합니다.'},
        {japanese: '確認', reading: 'kakunin', meaning: '확인', example: '予約を確認します。', exampleKo: '예약을 확인합니다.'},
        {japanese: '変更', reading: 'henkou', meaning: '변경', example: '予定を変更します。', exampleKo: '예정을 변경합니다.'}
    ]
};

// 문법 데이터
const grammarData = {
    particles: [
        {
            title: 'は (wa) - 주제 표시',
            explanation: '문장의 주제를 나타냅니다. 한국어의 "~은/는"에 해당합니다.',
            examples: [
                {ja: '私は学生です。', roma: 'Watashi wa gakusei desu.', ko: '저는 학생입니다.'},
                {ja: 'これは本です。', roma: 'Kore wa hon desu.', ko: '이것은 책입니다.'}
            ]
        },
        {
            title: 'が (ga) - 주어 표시',
            explanation: '문장의 주어를 나타냅니다. 특정한 것을 강조할 때 사용합니다.',
            examples: [
                {ja: '雨が降っています。', roma: 'Ame ga futte imasu.', ko: '비가 오고 있습니다.'},
                {ja: '誰が来ますか。', roma: 'Dare ga kimasu ka.', ko: '누가 옵니까?'}
            ]
        },
        {
            title: 'を (wo/o) - 목적어 표시',
            explanation: '동작의 대상을 나타냅니다. 한국어의 "~을/를"에 해당합니다.',
            examples: [
                {ja: '本を読みます。', roma: 'Hon wo yomimasu.', ko: '책을 읽습니다.'},
                {ja: 'ご飯を食べます。', roma: 'Gohan wo tabemasu.', ko: '밥을 먹습니다.'}
            ]
        },
        {
            title: 'に (ni) - 시간, 장소, 방향',
            explanation: '시간, 존재 장소, 이동 목적지를 나타냅니다.',
            examples: [
                {ja: '東京に行きます。', roma: 'Tokyo ni ikimasu.', ko: '도쿄에 갑니다.'},
                {ja: '3時に会います。', roma: 'Sanji ni aimasu.', ko: '3시에 만납니다.'}
            ]
        },
        {
            title: 'で (de) - 수단, 장소',
            explanation: '동작의 수단이나 장소를 나타냅니다.',
            examples: [
                {ja: '電車で行きます。', roma: 'Densha de ikimasu.', ko: '전철로 갑니다.'},
                {ja: '図書館で勉強します。', roma: 'Toshokan de benkyou shimasu.', ko: '도서관에서 공부합니다.'}
            ]
        }
    ],
    verbs: [
        {
            title: 'ます형 (정중형)',
            explanation: '동사의 기본 정중형입니다. 현재와 미래를 나타냅니다.',
            examples: [
                {ja: '食べます', roma: 'tabemasu', ko: '먹습니다'},
                {ja: '行きます', roma: 'ikimasu', ko: '갑니다'},
                {ja: '見ます', roma: 'mimasu', ko: '봅니다'}
            ]
        },
        {
            title: 'て형 (연결형)',
            explanation: '동작을 연결하거나 여러 용법으로 사용됩니다.',
            examples: [
                {ja: '食べて', roma: 'tabete', ko: '먹고'},
                {ja: '行って', roma: 'itte', ko: '가고'},
                {ja: '見て', roma: 'mite', ko: '보고'}
            ]
        },
        {
            title: 'た형 (과거형)',
            explanation: '과거의 동작이나 상태를 나타냅니다.',
            examples: [
                {ja: '食べた', roma: 'tabeta', ko: '먹었다'},
                {ja: '行った', roma: 'itta', ko: '갔다'},
                {ja: '見た', roma: 'mita', ko: '봤다'}
            ]
        }
    ],
    adjectives: [
        {
            title: 'い형용사',
            explanation: 'い로 끝나는 형용사입니다. 직접 명사를 수식할 수 있습니다.',
            examples: [
                {ja: '大きい家', roma: 'ookii ie', ko: '큰 집'},
                {ja: '美味しい料理', roma: 'oishii ryouri', ko: '맛있는 요리'},
                {ja: '暑い日', roma: 'atsui hi', ko: '더운 날'}
            ]
        },
        {
            title: 'な형용사',
            explanation: '명사를 수식할 때 な를 붙여야 하는 형용사입니다.',
            examples: [
                {ja: '静かな部屋', roma: 'shizukana heya', ko: '조용한 방'},
                {ja: '綺麗な花', roma: 'kireina hana', ko: '예쁜 꽃'},
                {ja: '便利な場所', roma: 'benrina basho', ko: '편리한 장소'}
            ]
        }
    ],
    sentences: [
        {
            title: '基本文型: A は B です',
            explanation: 'A는 B입니다라는 기본 문형입니다.',
            examples: [
                {ja: '私は学生です。', roma: 'Watashi wa gakusei desu.', ko: '저는 학생입니다.'},
                {ja: 'これは本です。', roma: 'Kore wa hon desu.', ko: '이것은 책입니다.'}
            ]
        },
        {
            title: '疑問文: ～ですか',
            explanation: '의문문을 만들 때 문장 끝에 か를 붙입니다.',
            examples: [
                {ja: '学生ですか。', roma: 'Gakusei desu ka.', ko: '학생입니까?'},
                {ja: 'これは何ですか。', roma: 'Kore wa nan desu ka.', ko: '이것은 무엇입니까?'}
            ]
        }
    ]
};

// 듣기 연습 데이터
const listeningData = [
    {
        text: 'こんにちは、元気ですか。',
        translation: '안녕하세요, 잘 지내세요?'
    },
    {
        text: '今日はいい天気ですね。',
        translation: '오늘은 좋은 날씨네요.'
    },
    {
        text: '明日、一緒に映画を見ませんか。',
        translation: '내일 같이 영화 보지 않을래요?'
    },
    {
        text: 'すみません、駅はどこですか。',
        translation: '죄송합니다, 역은 어디입니까?'
    },
    {
        text: 'この料理はとても美味しいです。',
        translation: '이 요리는 아주 맛있습니다.'
    },
    {
        text: '日本語の勉強は楽しいです。',
        translation: '일본어 공부는 즐겁습니다.'
    },
    {
        text: '毎朝、七時に起きます。',
        translation: '매일 아침 7시에 일어납니다.'
    },
    {
        text: '週末は友達と遊びます。',
        translation: '주말에는 친구와 놉니다.'
    }
];

// 독해 연습 데이터
const readingData = [
    {
        title: '自己紹介',
        level: '초급',
        text: 'はじめまして。私は田中です。韓国から来ました。大学生です。日本語を勉強しています。趣味は音楽を聞くことです。よろしくお願いします。',
        translation: '처음 뵙겠습니다. 저는 다나카입니다. 한국에서 왔습니다. 대학생입니다. 일본어를 공부하고 있습니다. 취미는 음악 듣는 것입니다. 잘 부탁드립니다.',
        questions: [
            {
                question: '田中さんはどこから来ましたか。',
                options: ['日本', '韓国', '中国', 'アメリカ'],
                answer: 1
            },
            {
                question: '田中さんの趣味は何ですか。',
                options: ['読書', '音楽', 'スポーツ', '料理'],
                answer: 1
            }
        ]
    },
    {
        title: '週末の予定',
        level: '중급',
        text: '今週末、友達と一緒に京都に行く予定です。朝早く出発して、まず清水寺を見学します。それから、祇園で昼ご飯を食べます。午後は金閣寺に行って、夕方帰ります。とても楽しみです。',
        translation: '이번 주말에 친구와 함께 교토에 갈 예정입니다. 아침 일찍 출발해서 먼저 기요미즈데라를 견학합니다. 그리고 기온에서 점심을 먹습니다. 오후에는 킨카쿠지에 가서 저녁에 돌아옵니다. 아주 기대됩니다.',
        questions: [
            {
                question: '誰と京都に行きますか。',
                options: ['一人で', '家族と', '友達と', '先生と'],
                answer: 2
            },
            {
                question: '午後は何をしますか。',
                options: ['清水寺に行く', '昼ご飯を食べる', '金閣寺に行く', '帰る'],
                answer: 2
            }
        ]
    },
    {
        title: '日本の文化',
        level: '고급',
        text: '日本には四季があり、それぞれの季節に独特な文化があります。春には桜を見る花見、夏には花火大会や祭り、秋には紅葉狩り、冬には温泉に入る習慣があります。これらの文化は日本人の生活に深く根付いており、多くの人々が季節ごとの行事を楽しんでいます。',
        translation: '일본에는 사계절이 있고, 각각의 계절에 독특한 문화가 있습니다. 봄에는 벚꽃을 보는 하나미, 여름에는 불꽃놀이와 축제, 가을에는 단풍구경, 겨울에는 온천에 들어가는 습관이 있습니다. 이러한 문화는 일본인의 생활에 깊이 뿌리내려 있고, 많은 사람들이 계절마다의 행사를 즐기고 있습니다.',
        questions: [
            {
                question: '春の文化は何ですか。',
                options: ['花火大会', '花見', '紅葉狩り', '温泉'],
                answer: 1
            },
            {
                question: '文章によると、季節の文化はどうですか。',
                options: ['新しい', '珍しい', '深く根付いている', '少ない'],
                answer: 2
            }
        ]
    }
];

// 회화 연습 데이터
const conversationData = [
    {
        situation: '식당에서 주문하기',
        dialogue: [
            {speaker: '店員', text: 'いらっしゃいませ。ご注文をどうぞ。', translation: '어서오세요. 주문하시겠어요?'},
            {speaker: 'あなた', text: 'すみません、このラーメンをください。', translation: '죄송합니다, 이 라면 주세요.'},
            {speaker: '店員', text: '辛さはどうしますか。', translation: '맵기는 어떻게 하시겠어요?'},
            {speaker: 'あなた', text: '普通でお願いします。', translation: '보통으로 부탁합니다.'},
            {speaker: '店員', text: 'かしこまりました。少々お待ちください。', translation: '알겠습니다. 잠시 기다려주세요.'}
        ]
    },
    {
        situation: '길 물어보기',
        dialogue: [
            {speaker: 'あなた', text: 'すみません、駅はどこですか。', translation: '죄송합니다, 역은 어디입니까?'},
            {speaker: '通行人', text: 'まっすぐ行って、二つ目の信号を右に曲がってください。', translation: '똑바로 가서 두 번째 신호등에서 오른쪽으로 도세요.'},
            {speaker: 'あなた', text: 'どのくらいかかりますか。', translation: '얼마나 걸립니까?'},
            {speaker: '通行人', text: '歩いて10分ぐらいです。', translation: '걸어서 10분 정도입니다.'},
            {speaker: 'あなた', text: 'ありがとうございます。', translation: '감사합니다.'}
        ]
    },
    {
        situation: '친구와 약속잡기',
        dialogue: [
            {speaker: 'あなた', text: '明日、映画を見に行きませんか。', translation: '내일 영화 보러 가지 않을래요?'},
            {speaker: '友達', text: 'いいですね。何時にしますか。', translation: '좋네요. 몇 시로 할까요?'},
            {speaker: 'あなた', text: '午後2時はどうですか。', translation: '오후 2시는 어때요?'},
            {speaker: '友達', text: 'いいですよ。どこで会いましょうか。', translation: '좋아요. 어디서 만날까요?'},
            {speaker: 'あなた', text: '駅の前で会いましょう。', translation: '역 앞에서 만나요.'}
        ]
    }
];

// 퀴즈 데이터 (JLPT N5 수준)
const quizData = [
    {
        question: '「ありがとう」의 의미는?',
        options: ['안녕하세요', '감사합니다', '죄송합니다', '잘 먹겠습니다'],
        answer: 1
    },
    {
        question: '「おはよう」는 언제 사용하나요?',
        options: ['아침', '점심', '저녁', '밤'],
        answer: 0
    },
    {
        question: '「さようなら」의 의미는?',
        options: ['안녕', '감사합니다', '안녕히 가세요', '미안합니다'],
        answer: 2
    },
    {
        question: '「私」의 읽기는?',
        options: ['あなた', 'わたし', 'ぼく', 'かれ'],
        answer: 1
    },
    {
        question: '「食べます」의 의미는?',
        options: ['마십니다', '먹습니다', '봅니다', '읽습니다'],
        answer: 1
    },
    {
        question: '「大きい」의 반대말은?',
        options: ['小さい', '長い', '高い', '新しい'],
        answer: 0
    },
    {
        question: '「学校」의 읽기는?',
        options: ['がっこう', 'がくこう', 'かっこう', 'がくしょう'],
        answer: 0
    },
    {
        question: '「行きます」의 과거형은?',
        options: ['行く', '行った', '行って', '行きました'],
        answer: 3
    },
    {
        question: '「暑い」의 의미는?',
        options: ['춥다', '덥다', '따뜻하다', '시원하다'],
        answer: 1
    },
    {
        question: '「春」의 읽기는?',
        options: ['はる', 'なつ', 'あき', 'ふゆ'],
        answer: 0
    },
    {
        question: '日本語で「안녕하세요」는?',
        options: ['おはよう', 'こんばんは', 'こんにちは', 'さようなら'],
        answer: 2
    },
    {
        question: '「何」의 읽기는?',
        options: ['なに', 'なん', 'どれも正しい', 'どれも間違い'],
        answer: 2
    },
    {
        question: '「いいえ」의 의미는?',
        options: ['네', '아니오', '감사합니다', '죄송합니다'],
        answer: 1
    },
    {
        question: '「友達」의 의미는?',
        options: ['가족', '친구', '선생님', '학생'],
        answer: 1
    },
    {
        question: '「今日」의 읽기는?',
        options: ['きょう', 'きのう', 'あした', 'あさって'],
        answer: 0
    }
];
