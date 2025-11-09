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

// 기초 한자 데이터
const kanjiData = [
    {kanji: '一', reading: 'いち', meaning: '하나, 일', example: '一つ (하나)', exampleKo: '하나'},
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
    {kanji: '万', reading: 'まん', meaning: '만', example: '一万円', exampleKo: '1만엔'},
    {kanji: '日', reading: 'にち/ひ/か', meaning: '날, 해', example: '今日 (きょう)', exampleKo: '오늘'},
    {kanji: '月', reading: 'がつ/つき', meaning: '달, 월', example: '一月 (いちがつ)', exampleKo: '1월'},
    {kanji: '火', reading: 'か/ひ', meaning: '불, 화', example: '火曜日 (かようび)', exampleKo: '화요일'},
    {kanji: '水', reading: 'すい/みず', meaning: '물, 수', example: '水曜日 (すいようび)', exampleKo: '수요일'},
    {kanji: '木', reading: 'もく/き', meaning: '나무, 목', example: '木曜日 (もくようび)', exampleKo: '목요일'},
    {kanji: '金', reading: 'きん/かね', meaning: '금, 돈', example: '金曜日 (きんようび)', exampleKo: '금요일'},
    {kanji: '土', reading: 'ど/つち', meaning: '흙, 토', example: '土曜日 (どようび)', exampleKo: '토요일'}
];

// 어휘 데이터
const vocabularyData = {
    beginner: [
        {japanese: 'こんにちは', reading: 'konnichiwa', meaning: '안녕하세요', example: 'こんにちは、元気ですか。', exampleKo: '안녕하세요, 잘 지내세요?'},
        {japanese: 'ありがとう', reading: 'arigatou', meaning: '감사합니다', example: 'ありがとうございます。', exampleKo: '감사합니다.'},
        {japanese: 'すみません', reading: 'sumimasen', meaning: '죄송합니다', example: 'すみません、遅れました。', exampleKo: '죄송합니다, 늦었습니다.'},
        {japanese: 'おはよう', reading: 'ohayou', meaning: '좋은 아침', example: 'おはようございます。', exampleKo: '좋은 아침입니다.'},
        {japanese: 'こんばんは', reading: 'konbanwa', meaning: '좋은 저녁', example: 'こんばんは、お元気ですか。', exampleKo: '좋은 저녁이에요, 잘 지내세요?'},
        {japanese: 'さようなら', reading: 'sayounara', meaning: '안녕히 가세요', example: 'さようなら、また明日。', exampleKo: '안녕히 가세요, 또 내일.'},
        {japanese: 'はい', reading: 'hai', meaning: '네', example: 'はい、分かりました。', exampleKo: '네, 알겠습니다.'},
        {japanese: 'いいえ', reading: 'iie', meaning: '아니오', example: 'いいえ、違います。', exampleKo: '아니요, 틀렸습니다.'},
        {japanese: 'お願いします', reading: 'onegaishimasu', meaning: '부탁합니다', example: 'お願いします。', exampleKo: '부탁합니다.'},
        {japanese: 'ごめんなさい', reading: 'gomennasai', meaning: '미안합니다', example: 'ごめんなさい。', exampleKo: '미안합니다.'},
        {japanese: '私', reading: 'watashi', meaning: '나, 저', example: '私は学生です。', exampleKo: '저는 학생입니다.'},
        {japanese: 'あなた', reading: 'anata', meaning: '당신', example: 'あなたは誰ですか。', exampleKo: '당신은 누구입니까?'},
        {japanese: '名前', reading: 'namae', meaning: '이름', example: '名前は何ですか。', exampleKo: '이름이 뭐예요?'},
        {japanese: '学生', reading: 'gakusei', meaning: '학생', example: '私は学生です。', exampleKo: '저는 학생입니다.'},
        {japanese: '先生', reading: 'sensei', meaning: '선생님', example: '先生、質問があります。', exampleKo: '선생님, 질문이 있습니다.'},
        {japanese: '友達', reading: 'tomodachi', meaning: '친구', example: '友達と遊びます。', exampleKo: '친구와 놉니다.'},
        {japanese: '家族', reading: 'kazoku', meaning: '가족', example: '家族と住んでいます。', exampleKo: '가족과 살고 있습니다.'},
        {japanese: '母', reading: 'haha', meaning: '어머니', example: '母は料理が上手です。', exampleKo: '어머니는 요리를 잘합니다.'},
        {japanese: '父', reading: 'chichi', meaning: '아버지', example: '父は会社員です。', exampleKo: '아버지는 회사원입니다.'},
        {japanese: '兄', reading: 'ani', meaning: '형, 오빠', example: '兄は大学生です。', exampleKo: '형은 대학생입니다.'},
        {japanese: '姉', reading: 'ane', meaning: '누나, 언니', example: '姉は看護師です。', exampleKo: '언니는 간호사입니다.'},
        {japanese: '弟', reading: 'otouto', meaning: '남동생', example: '弟は高校生です。', exampleKo: '남동생은 고등학생입니다.'},
        {japanese: '妹', reading: 'imouto', meaning: '여동생', example: '妹は中学生です。', exampleKo: '여동생은 중학생입니다.'},
        {japanese: '学校', reading: 'gakkou', meaning: '학교', example: '学校に行きます。', exampleKo: '학교에 갑니다.'},
        {japanese: '会社', reading: 'kaisha', meaning: '회사', example: '会社で働きます。', exampleKo: '회사에서 일합니다.'},
        {japanese: '家', reading: 'ie', meaning: '집', example: '家に帰ります。', exampleKo: '집에 돌아갑니다.'},
        {japanese: '駅', reading: 'eki', meaning: '역', example: '駅で待ちます。', exampleKo: '역에서 기다립니다.'},
        {japanese: '病院', reading: 'byouin', meaning: '병원', example: '病院に行きます。', exampleKo: '병원에 갑니다.'},
        {japanese: '銀行', reading: 'ginkou', meaning: '은행', example: '銀行でお金を下ろします。', exampleKo: '은행에서 돈을 찾습니다.'},
        {japanese: '本', reading: 'hon', meaning: '책', example: '本を読みます。', exampleKo: '책을 읽습니다.'},
        {japanese: '鉛筆', reading: 'enpitsu', meaning: '연필', example: '鉛筆で書きます。', exampleKo: '연필로 씁니다.'},
        {japanese: '机', reading: 'tsukue', meaning: '책상', example: '机の上に本があります。', exampleKo: '책상 위에 책이 있습니다.'},
        {japanese: '椅子', reading: 'isu', meaning: '의자', example: '椅子に座ります。', exampleKo: '의자에 앉습니다.'},
        {japanese: '窓', reading: 'mado', meaning: '창문', example: '窓を開けます。', exampleKo: '창문을 엽니다.'},
        {japanese: 'ドア', reading: 'doa', meaning: '문', example: 'ドアを閉めます。', exampleKo: '문을 닫습니다.'},
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
        {japanese: '買う', reading: 'kau', meaning: '사다', example: 'パンを買います。', exampleKo: '빵을 삽니다.'},
        {japanese: '売る', reading: 'uru', meaning: '팔다', example: '車を売ります。', exampleKo: '차를 팝니다.'},
        {japanese: '大きい', reading: 'ookii', meaning: '크다', example: '大きい家です。', exampleKo: '큰 집입니다.'},
        {japanese: '小さい', reading: 'chiisai', meaning: '작다', example: '小さい犬です。', exampleKo: '작은 개입니다.'},
        {japanese: '新しい', reading: 'atarashii', meaning: '새롭다', example: '新しい車です。', exampleKo: '새 차입니다.'}
    ],
    intermediate: [
        {japanese: '天気', reading: 'tenki', meaning: '날씨', example: '今日は天気がいいです。', exampleKo: '오늘은 날씨가 좋습니다.'},
        {japanese: '季節', reading: 'kisetsu', meaning: '계절', example: '好きな季節は春です。', exampleKo: '좋아하는 계절은 봄입니다.'},
        {japanese: '春', reading: 'haru', meaning: '봄', example: '春は桜が咲きます。', exampleKo: '봄에는 벚꽃이 핍니다.'},
        {japanese: '夏', reading: 'natsu', meaning: '여름', example: '夏は暑いです。', exampleKo: '여름은 덥습니다.'},
        {japanese: '秋', reading: 'aki', meaning: '가을', example: '秋は紅葉が美しいです。', exampleKo: '가을은 단풍이 아름답습니다.'},
        {japanese: '冬', reading: 'fuyu', meaning: '겨울', example: '冬は寒いです。', exampleKo: '겨울은 춥습니다.'},
        {japanese: '暑い', reading: 'atsui', meaning: '덥다', example: '今日は暑いです。', exampleKo: '오늘은 덥습니다.'},
        {japanese: '寒い', reading: 'samui', meaning: '춥다', example: '冬は寒いです。', exampleKo: '겨울은 춥습니다.'},
        {japanese: '暖かい', reading: 'atatakai', meaning: '따뜻하다', example: '春は暖かいです。', exampleKo: '봄은 따뜻합니다.'},
        {japanese: '涼しい', reading: 'suzushii', meaning: '시원하다', example: '秋は涼しいです。', exampleKo: '가을은 시원합니다.'},
        {japanese: '雨', reading: 'ame', meaning: '비', example: '雨が降ります。', exampleKo: '비가 옵니다.'},
        {japanese: '雪', reading: 'yuki', meaning: '눈', example: '雪が降ります。', exampleKo: '눈이 옵니다.'},
        {japanese: '風', reading: 'kaze', meaning: '바람', example: '風が強いです。', exampleKo: '바람이 강합니다.'},
        {japanese: '曇り', reading: 'kumori', meaning: '흐림', example: '今日は曇りです。', exampleKo: '오늘은 흐립니다.'},
        {japanese: '晴れ', reading: 'hare', meaning: '맑음', example: '明日は晴れです。', exampleKo: '내일은 맑습니다.'},
        {japanese: '旅行', reading: 'ryokou', meaning: '여행', example: '夏休みに旅行します。', exampleKo: '여름방학에 여행합니다.'},
        {japanese: '予約', reading: 'yoyaku', meaning: '예약', example: 'ホテルを予約します。', exampleKo: '호텔을 예약합니다.'},
        {japanese: '空港', reading: 'kuukou', meaning: '공항', example: '空港に行きます。', exampleKo: '공항에 갑니다.'},
        {japanese: '飛行機', reading: 'hikouki', meaning: '비행기', example: '飛行機で行きます。', exampleKo: '비행기로 갑니다.'},
        {japanese: '電車', reading: 'densha', meaning: '전철', example: '電車で通勤します。', exampleKo: '전철로 출근합니다.'},
        {japanese: 'バス', reading: 'basu', meaning: '버스', example: 'バスに乗ります。', exampleKo: '버스를 탑니다.'},
        {japanese: 'タクシー', reading: 'takushii', meaning: '택시', example: 'タクシーで行きます。', exampleKo: '택시로 갑니다.'},
        {japanese: '自転車', reading: 'jitensha', meaning: '자전거', example: '自転車に乗ります。', exampleKo: '자전거를 탑니다.'},
        {japanese: '歩く', reading: 'aruku', meaning: '걷다', example: '駅まで歩きます。', exampleKo: '역까지 걷습니다.'},
        {japanese: '走る', reading: 'hashiru', meaning: '달리다', example: '公園で走ります。', exampleKo: '공원에서 달립니다.'},
        {japanese: '泳ぐ', reading: 'oyogu', meaning: '수영하다', example: 'プールで泳ぎます。', exampleKo: '수영장에서 수영합니다.'},
        {japanese: '料理', reading: 'ryouri', meaning: '요리', example: '料理を作ります。', exampleKo: '요리를 만듭니다.'},
        {japanese: '美味しい', reading: 'oishii', meaning: '맛있다', example: 'この料理は美味しいです。', exampleKo: '이 요리는 맛있습니다.'},
        {japanese: 'まずい', reading: 'mazui', meaning: '맛없다', example: 'この料理はまずいです。', exampleKo: '이 요리는 맛없습니다.'},
        {japanese: '甘い', reading: 'amai', meaning: '달다', example: 'ケーキは甘いです。', exampleKo: '케이크는 답니다.'},
        {japanese: '辛い', reading: 'karai', meaning: '맵다', example: 'キムチは辛いです。', exampleKo: '김치는 맵습니다.'},
        {japanese: '塩辛い', reading: 'shiokarai', meaning: '짜다', example: 'スープが塩辛いです。', exampleKo: '수프가 짭니다.'},
        {japanese: '酸っぱい', reading: 'suppai', meaning: '시다', example: 'レモンは酸っぱいです。', exampleKo: '레몬은 십니다.'},
        {japanese: '苦い', reading: 'nigai', meaning: '쓰다', example: 'コーヒーは苦いです。', exampleKo: '커피는 씁니다.'},
        {japanese: '楽しい', reading: 'tanoshii', meaning: '즐겁다', example: '旅行は楽しいです。', exampleKo: '여행은 즐겁습니다.'},
        {japanese: '嬉しい', reading: 'ureshii', meaning: '기쁘다', example: 'プレゼントをもらって嬉しいです。', exampleKo: '선물을 받아서 기쁩니다.'},
        {japanese: '悲しい', reading: 'kanashii', meaning: '슬프다', example: '映画を見て悲しかったです。', exampleKo: '영화를 보고 슬펐습니다.'},
        {japanese: '怒る', reading: 'okoru', meaning: '화내다', example: '先生が怒ります。', exampleKo: '선생님이 화냅니다.'},
        {japanese: '笑う', reading: 'warau', meaning: '웃다', example: '友達と笑います。', exampleKo: '친구와 웃습니다.'},
        {japanese: '泣く', reading: 'naku', meaning: '울다', example: '赤ちゃんが泣きます。', exampleKo: '아기가 웁니다.'}
    ],
    advanced: [
        {japanese: '経済', reading: 'keizai', meaning: '경제', example: '経済が発展しています。', exampleKo: '경제가 발전하고 있습니다.'},
        {japanese: '政治', reading: 'seiji', meaning: '정치', example: '政治に興味があります。', exampleKo: '정치에 흥미가 있습니다.'},
        {japanese: '社会', reading: 'shakai', meaning: '사회', example: '社会問題について話します。', exampleKo: '사회문제에 대해 이야기합니다.'},
        {japanese: '文化', reading: 'bunka', meaning: '문화', example: '日本の文化を勉強します。', exampleKo: '일본의 문화를 공부합니다.'},
        {japanese: '歴史', reading: 'rekishi', meaning: '역사', example: '歴史を学びます。', exampleKo: '역사를 배웁니다.'},
        {japanese: '科学', reading: 'kagaku', meaning: '과학', example: '科学技術が進歩しています。', exampleKo: '과학기술이 진보하고 있습니다.'},
        {japanese: '技術', reading: 'gijutsu', meaning: '기술', example: '新しい技術を開発します。', exampleKo: '새로운 기술을 개발합니다.'},
        {japanese: '環境', reading: 'kankyou', meaning: '환경', example: '環境を保護します。', exampleKo: '환경을 보호합니다.'},
        {japanese: '教育', reading: 'kyouiku', meaning: '교육', example: '教育は大切です。', exampleKo: '교육은 중요합니다.'},
        {japanese: '健康', reading: 'kenkou', meaning: '건강', example: '健康に気をつけます。', exampleKo: '건강에 신경 씁니다.'},
        {japanese: '医療', reading: 'iryou', meaning: '의료', example: '医療技術が発展しています。', exampleKo: '의료기술이 발전하고 있습니다.'},
        {japanese: '福祉', reading: 'fukushi', meaning: '복지', example: '社会福祉を充実させます。', exampleKo: '사회복지를 충실히 합니다.'},
        {japanese: '平和', reading: 'heiwa', meaning: '평화', example: '世界平和を願います。', exampleKo: '세계평화를 바랍니다.'},
        {japanese: '戦争', reading: 'sensou', meaning: '전쟁', example: '戦争は悲しいです。', exampleKo: '전쟁은 슬픕니다.'},
        {japanese: '発展', reading: 'hatten', meaning: '발전', example: '都市が発展しています。', exampleKo: '도시가 발전하고 있습니다.'},
        {japanese: '進歩', reading: 'shinpo', meaning: '진보', example: '技術が進歩しています。', exampleKo: '기술이 진보하고 있습니다.'},
        {japanese: '改善', reading: 'kaizen', meaning: '개선', example: '状況を改善します。', exampleKo: '상황을 개선합니다.'},
        {japanese: '解決', reading: 'kaiketsu', meaning: '해결', example: '問題を解決します。', exampleKo: '문제를 해결합니다.'},
        {japanese: '実現', reading: 'jitsugen', meaning: '실현', example: '夢を実現します。', exampleKo: '꿈을 실현합니다.'},
        {japanese: '達成', reading: 'tassei', meaning: '달성', example: '目標を達成します。', exampleKo: '목표를 달성합니다.'},
        {japanese: '成功', reading: 'seikou', meaning: '성공', example: 'プロジェクトが成功しました。', exampleKo: '프로젝트가 성공했습니다.'},
        {japanese: '失敗', reading: 'shippai', meaning: '실패', example: '試験に失敗しました。', exampleKo: '시험에 실패했습니다.'},
        {japanese: '努力', reading: 'doryoku', meaning: '노력', example: '努力すれば成功します。', exampleKo: '노력하면 성공합니다.'},
        {japanese: '挑戦', reading: 'chousen', meaning: '도전', example: '新しいことに挑戦します。', exampleKo: '새로운 것에 도전합니다.'},
        {japanese: '協力', reading: 'kyouryoku', meaning: '협력', example: '皆で協力します。', exampleKo: '모두 협력합니다.'},
        {japanese: '競争', reading: 'kyousou', meaning: '경쟁', example: '会社間で競争しています。', exampleKo: '회사간 경쟁하고 있습니다.'},
        {japanese: '貢献', reading: 'kouken', meaning: '공헌', example: '社会に貢献します。', exampleKo: '사회에 공헌합니다.'},
        {japanese: '影響', reading: 'eikyou', meaning: '영향', example: '環境に影響を与えます。', exampleKo: '환경에 영향을 줍니다.'},
        {japanese: '効果', reading: 'kouka', meaning: '효과', example: '薬の効果があります。', exampleKo: '약의 효과가 있습니다.'},
        {japanese: '原因', reading: 'gen\'in', meaning: '원인', example: '事故の原因を調べます。', exampleKo: '사고의 원인을 조사합니다.'}
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
        translation: '안녕하세요, 잘 지내세요?',
        audio: 'Web Speech API 사용'
    },
    {
        text: '今日はいい天気ですね。',
        translation: '오늘은 좋은 날씨네요.',
        audio: 'Web Speech API 사용'
    },
    {
        text: '明日、一緒に映画を見ませんか。',
        translation: '내일 같이 영화 보지 않을래요?',
        audio: 'Web Speech API 사용'
    },
    {
        text: 'すみません、駅はどこですか。',
        translation: '죄송합니다, 역은 어디입니까?',
        audio: 'Web Speech API 사용'
    },
    {
        text: 'この料理はとても美味しいです。',
        translation: '이 요리는 아주 맛있습니다.',
        audio: 'Web Speech API 사용'
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

// 퀴즈 데이터
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
        question: '「私」の読み方は?',
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
        question: '「学校」の読み方は?',
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
        question: '「春」の読み方は?',
        options: ['はる', 'なつ', 'あき', 'ふゆ'],
        answer: 0
    }
];
