// 로컬 스토리지 키
const STORAGE_KEY = 'japaneseLearningStat';

// 학습 통계 초기화
let learningStats = {
    wordsLearned: 0,
    lessonsCompleted: 0,
    studyTime: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    streak: 0,
    lastStudyDate: null
};

// 로컬 스토리지에서 데이터 로드
function loadStats() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        learningStats = JSON.parse(saved);
    }
    updateDashboard();
}

// 로컬 스토리지에 데이터 저장
function saveStats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(learningStats));
    updateDashboard();
}

// 대시보드 업데이트
function updateDashboard() {
    document.getElementById('wordsLearned').textContent = learningStats.wordsLearned;
    document.getElementById('lessonsCompleted').textContent = learningStats.lessonsCompleted;
    document.getElementById('studyTime').textContent = learningStats.studyTime;

    const accuracy = learningStats.totalQuestions > 0
        ? Math.round((learningStats.correctAnswers / learningStats.totalQuestions) * 100)
        : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('streakNumber').textContent = learningStats.streak;

    // 일일 목표 업데이트
    const wordProgress = Math.min((learningStats.wordsLearned % 10) / 10 * 100, 100);
    const lessonProgress = Math.min((learningStats.lessonsCompleted % 2) / 2 * 100, 100);
    const quizProgress = Math.min((learningStats.totalQuestions % 10) / 10 * 100, 100);

    document.getElementById('wordGoalProgress').style.width = wordProgress + '%';
    document.getElementById('wordGoalText').textContent = `${learningStats.wordsLearned % 10}/10`;

    document.getElementById('lessonGoalProgress').style.width = lessonProgress + '%';
    document.getElementById('lessonGoalText').textContent = `${learningStats.lessonsCompleted % 2}/2`;

    document.getElementById('quizGoalProgress').style.width = quizProgress + '%';
    document.getElementById('quizGoalText').textContent = `${Math.min(learningStats.totalQuestions % 10, 1)}/1`;
}

// 모달 컨테이너에 모달 추가
function showModal(html) {
    const container = document.getElementById('modalContainer');
    container.innerHTML = html;
    container.querySelector('.modal').style.display = 'block';
}

// 모달 닫기
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 히라가나 차트 열기
function openHiraganaChart() {
    let html = `
        <div id="hiraganaModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('hiraganaModal')">&times;</span>
                <h3>히라가나 표</h3>
                <div class="kana-chart">
    `;

    // 5열 그리드로 배치
    for (let i = 0; i < hiraganaData.length; i += 5) {
        html += '<div class="kana-row">';
        for (let j = i; j < Math.min(i + 5, hiraganaData.length); j++) {
            const kana = hiraganaData[j];
            html += `
                <div class="kana-cell">
                    <div class="kana-char">${kana.char}</div>
                    <div class="kana-roma">${kana.roma}</div>
                    <div class="kana-sound">${kana.sound}</div>
                </div>
            `;
        }
        // 빈 셀 채우기
        for (let k = 0; k < (5 - (Math.min(i + 5, hiraganaData.length) - i)); k++) {
            html += '<div class="kana-cell empty"></div>';
        }
        html += '</div>';
    }

    html += `
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

// 가타카나 차트 열기
function openKatakanaChart() {
    let html = `
        <div id="katakanaModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('katakanaModal')">&times;</span>
                <h3>가타카나 표</h3>
                <div class="kana-chart">
    `;

    for (let i = 0; i < katakanaData.length; i += 5) {
        html += '<div class="kana-row">';
        for (let j = i; j < Math.min(i + 5, katakanaData.length); j++) {
            const kana = katakanaData[j];
            html += `
                <div class="kana-cell">
                    <div class="kana-char">${kana.char}</div>
                    <div class="kana-roma">${kana.roma}</div>
                    <div class="kana-sound">${kana.sound}</div>
                </div>
            `;
        }
        for (let k = 0; k < (5 - (Math.min(i + 5, katakanaData.length) - i)); k++) {
            html += '<div class="kana-cell empty"></div>';
        }
        html += '</div>';
    }

    html += `
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

// 한자 학습 열기
function openKanjiLessons() {
    let html = `
        <div id="kanjiModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('kanjiModal')">&times;</span>
                <h3>기초 한자 (JLPT N5)</h3>
                <div class="kanji-grid">
    `;

    kanjiData.forEach((kanji, index) => {
        html += `
            <div class="kanji-card" onclick="showKanjiDetail(${index})">
                <div class="kanji-char-big">${kanji.kanji}</div>
                <div class="kanji-reading">${kanji.reading}</div>
                <div class="kanji-meaning">${kanji.meaning}</div>
            </div>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

// 한자 상세 보기
function showKanjiDetail(index) {
    const kanji = kanjiData[index];
    alert(`${kanji.kanji}\n\n읽기: ${kanji.reading}\n의미: ${kanji.meaning}\n\n예문: ${kanji.example}\n뜻: ${kanji.exampleKo}`);
}

// 어휘 학습 열기
let currentVocabIndex = 0;
let currentVocabLevel = '';

function openVocabulary(level) {
    currentVocabLevel = level;
    currentVocabIndex = 0;
    const vocab = vocabularyData[level];

    let levelName = level === 'beginner' ? '초급' : level === 'intermediate' ? '중급' : '고급';

    let html = `
        <div id="vocabModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('vocabModal')">&times;</span>
                <h3>${levelName} 어휘</h3>
                <div class="flashcard-container">
                    <div class="flashcard" id="vocabCard" onclick="flipVocabCard()">
                        <div class="flashcard-front">
                            <div class="card-word">${vocab[0].japanese}</div>
                            <div class="card-hint">클릭하여 뒤집기</div>
                        </div>
                        <div class="flashcard-back">
                            <div class="card-meaning">${vocab[0].meaning}</div>
                            <div class="card-roma">${vocab[0].reading}</div>
                            <div class="card-example">${vocab[0].example}</div>
                            <div class="card-example-ko">${vocab[0].exampleKo}</div>
                        </div>
                    </div>
                    <div class="flashcard-controls">
                        <button class="control-btn" onclick="prevVocab()">이전</button>
                        <button class="control-btn" onclick="nextVocab()">다음</button>
                        <button class="control-btn" onclick="markAsLearned()">학습 완료</button>
                    </div>
                    <div class="flashcard-progress" id="vocabProgress">1 / ${vocab.length}</div>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

let isVocabFlipped = false;
function flipVocabCard() {
    const card = document.getElementById('vocabCard');
    isVocabFlipped = !isVocabFlipped;
    card.style.transform = isVocabFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
}

function nextVocab() {
    const vocab = vocabularyData[currentVocabLevel];
    currentVocabIndex = (currentVocabIndex + 1) % vocab.length;
    updateVocabCard();
}

function prevVocab() {
    const vocab = vocabularyData[currentVocabLevel];
    currentVocabIndex = (currentVocabIndex - 1 + vocab.length) % vocab.length;
    updateVocabCard();
}

function updateVocabCard() {
    const vocab = vocabularyData[currentVocabLevel];
    const current = vocab[currentVocabIndex];

    const card = document.getElementById('vocabCard');
    card.innerHTML = `
        <div class="flashcard-front">
            <div class="card-word">${current.japanese}</div>
            <div class="card-hint">클릭하여 뒤집기</div>
        </div>
        <div class="flashcard-back">
            <div class="card-meaning">${current.meaning}</div>
            <div class="card-roma">${current.reading}</div>
            <div class="card-example">${current.example}</div>
            <div class="card-example-ko">${current.exampleKo}</div>
        </div>
    `;

    card.style.transform = 'rotateY(0deg)';
    isVocabFlipped = false;

    document.getElementById('vocabProgress').textContent = `${currentVocabIndex + 1} / ${vocab.length}`;
}

function markAsLearned() {
    learningStats.wordsLearned++;
    learningStats.studyTime += 1;
    saveStats();
    alert('단어 학습 완료!');
}

// 문법 학습 열기
function openGrammar(type) {
    const grammar = grammarData[type];
    if (!grammar) {
        alert('해당 문법 자료가 준비 중입니다.');
        return;
    }

    let typeName = type === 'particles' ? '조사' :
                   type === 'verbs' ? '동사 활용' :
                   type === 'adjectives' ? '형용사' : '문장 구조';

    let html = `
        <div id="grammarModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('grammarModal')">&times;</span>
                <h3>문법 레슨: ${typeName}</h3>
                <div class="grammar-content">
    `;

    grammar.forEach(item => {
        html += `
            <div class="grammar-section">
                <h4>${item.title}</h4>
                <p class="grammar-explanation">${item.explanation}</p>
        `;

        item.examples.forEach(example => {
            html += `
                <div class="grammar-example">
                    <div class="example-ja">${example.ja}</div>
                    <div class="example-roma">${example.roma}</div>
                    <div class="example-ko">${example.ko}</div>
                </div>
            `;
        });

        html += `</div>`;
    });

    html += `
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button class="practice-btn" onclick="completeGrammarLesson()">레슨 완료</button>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

function completeGrammarLesson() {
    learningStats.lessonsCompleted++;
    learningStats.studyTime += 5;
    saveStats();
    alert('문법 레슨 완료!');
}

// 플래시카드 열기
function openFlashcards() {
    openVocabulary('beginner');
}

// 듣기 연습 열기
let currentListeningIndex = 0;

function openListening() {
    currentListeningIndex = 0;

    let html = `
        <div id="listeningModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('listeningModal')">&times;</span>
                <h3>듣기 연습</h3>
                <div class="listening-container">
                    <div class="listening-text" id="listeningText" style="font-size: 24px; margin: 30px 0; text-align: center; min-height: 60px;"></div>
                    <div class="listening-controls" style="text-align: center; margin: 20px 0;">
                        <button class="practice-btn" onclick="playListening()" style="margin: 0 10px;">🔊 듣기</button>
                        <button class="practice-btn" onclick="showListeningTranslation()" style="margin: 0 10px;">번역 보기</button>
                    </div>
                    <div class="listening-translation" id="listeningTranslation" style="font-size: 18px; color: #8B7355; text-align: center; min-height: 40px; margin-top: 20px;"></div>
                    <div class="listening-navigation" style="text-align: center; margin-top: 30px;">
                        <button class="control-btn" onclick="prevListening()">이전</button>
                        <button class="control-btn" onclick="nextListening()">다음</button>
                    </div>
                    <div class="listening-progress" style="text-align: center; margin-top: 20px; color: #6B6B6B;">
                        <span id="listeningProgress">1 / ${listeningData.length}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(html);
    updateListeningContent();
}

function updateListeningContent() {
    const current = listeningData[currentListeningIndex];
    document.getElementById('listeningText').textContent = current.text;
    document.getElementById('listeningTranslation').textContent = '';
    document.getElementById('listeningProgress').textContent = `${currentListeningIndex + 1} / ${listeningData.length}`;
}

function playListening() {
    const current = listeningData[currentListeningIndex];
    speakJapanese(current.text);
}

function showListeningTranslation() {
    const current = listeningData[currentListeningIndex];
    document.getElementById('listeningTranslation').textContent = current.translation;
}

function nextListening() {
    currentListeningIndex = (currentListeningIndex + 1) % listeningData.length;
    updateListeningContent();
}

function prevListening() {
    currentListeningIndex = (currentListeningIndex - 1 + listeningData.length) % listeningData.length;
    updateListeningContent();
}

// 독해 연습 열기
let currentReadingIndex = 0;

function openReading() {
    currentReadingIndex = 0;
    showReadingPassage();
}

function showReadingPassage() {
    const passage = readingData[currentReadingIndex];

    let html = `
        <div id="readingModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('readingModal')">&times;</span>
                <h3>${passage.title} (${passage.level})</h3>
                <div class="reading-container">
                    <div class="reading-text" style="background: #F5F0E8; padding: 20px; border-radius: 8px; line-height: 2; font-size: 16px; margin-bottom: 20px;">
                        ${passage.text}
                    </div>
                    <button class="practice-btn" onclick="showReadingTranslation()" style="margin-bottom: 20px;">번역 보기</button>
                    <div class="reading-translation" id="readingTranslation" style="background: #FEFDFB; padding: 15px; border-radius: 8px; border-left: 3px solid #8B7355; margin-bottom: 30px; display: none;">
                        ${passage.translation}
                    </div>
                    <h4>이해도 체크</h4>
    `;

    passage.questions.forEach((q, index) => {
        html += `
            <div class="reading-question" style="margin: 20px 0;">
                <p style="font-weight: 500; margin-bottom: 10px;">${index + 1}. ${q.question}</p>
                <div class="quiz-options">
        `;
        q.options.forEach((option, optIndex) => {
            html += `
                <button class="quiz-option" onclick="checkReadingAnswer(${index}, ${optIndex}, ${q.answer})">${option}</button>
            `;
        });
        html += `
                </div>
                <div class="quiz-feedback" id="readingFeedback${index}"></div>
            </div>
        `;
    });

    html += `
                    <div class="reading-navigation" style="text-align: center; margin-top: 30px;">
                        <button class="control-btn" onclick="prevReading()">이전 지문</button>
                        <button class="control-btn" onclick="nextReading()">다음 지문</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

function showReadingTranslation() {
    const trans = document.getElementById('readingTranslation');
    trans.style.display = trans.style.display === 'none' ? 'block' : 'none';
}

function checkReadingAnswer(questionIndex, selectedAnswer, correctAnswer) {
    const feedback = document.getElementById(`readingFeedback${questionIndex}`);
    learningStats.totalQuestions++;

    if (selectedAnswer === correctAnswer) {
        learningStats.correctAnswers++;
        feedback.innerHTML = '<div class="feedback-correct">정답입니다!</div>';
    } else {
        feedback.innerHTML = '<div class="feedback-incorrect">틀렸습니다. 다시 생각해보세요!</div>';
    }
    saveStats();

    setTimeout(() => {
        feedback.innerHTML = '';
    }, 2000);
}

function nextReading() {
    currentReadingIndex = (currentReadingIndex + 1) % readingData.length;
    showReadingPassage();
}

function prevReading() {
    currentReadingIndex = (currentReadingIndex - 1 + readingData.length) % readingData.length;
    showReadingPassage();
}

// 쓰기 연습 열기
function openWriting() {
    let html = `
        <div id="writingModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('writingModal')">&times;</span>
                <h3>쓰기 연습</h3>
                <div class="writing-container">
                    <p style="text-align: center; margin-bottom: 20px;">아래 캔버스에 히라가나를 연습해보세요!</p>
                    <div style="text-align: center; margin-bottom: 10px;">
                        <span style="font-size: 48px; font-weight: bold;" id="writingChar">あ</span>
                    </div>
                    <canvas id="writingCanvas" width="400" height="400" style="border: 2px solid #E8DED2; border-radius: 8px; display: block; margin: 0 auto; background: white; touch-action: none;"></canvas>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="control-btn" onclick="clearCanvas()">지우기</button>
                        <button class="control-btn" onclick="nextWritingChar()">다음 글자</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(html);

    setTimeout(() => {
        initCanvas();
    }, 100);
}

let writingCharIndex = 0;
let canvas, ctx;
let isDrawing = false;

function initCanvas() {
    canvas = document.getElementById('writingCanvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#3E3E3E';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // 마우스 이벤트
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // 터치 이벤트
    canvas.addEventListener('touchstart', handleTouchStart, {passive: false});
    canvas.addEventListener('touchmove', handleTouchMove, {passive: false});
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nextWritingChar() {
    writingCharIndex = (writingCharIndex + 1) % hiraganaData.length;
    document.getElementById('writingChar').textContent = hiraganaData[writingCharIndex].char;
    clearCanvas();
}

// 가타카나 쓰기 연습 열기
function openKatakanaWriting() {
    let html = `
        <div id="katakanaWritingModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('katakanaWritingModal')">&times;</span>
                <h3>가타카나 쓰기 연습</h3>
                <div class="writing-container">
                    <p style="text-align: center; margin-bottom: 20px;">아래 캔버스에 가타카나를 연습해보세요!</p>
                    <div style="text-align: center; margin-bottom: 10px;">
                        <span style="font-size: 48px; font-weight: bold;" id="katakanaWritingChar">ア</span>
                    </div>
                    <canvas id="katakanaWritingCanvas" width="400" height="400" style="border: 2px solid #E8DED2; border-radius: 8px; display: block; margin: 0 auto; background: white; touch-action: none;"></canvas>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="control-btn" onclick="clearKatakanaCanvas()">지우기</button>
                        <button class="control-btn" onclick="nextKatakanaWritingChar()">다음 글자</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(html);

    setTimeout(() => {
        initKatakanaCanvas();
    }, 100);
}

let katakanaWritingCharIndex = 0;
let katakanaCanvas, katakanaCtx;
let isKatakanaDrawing = false;

function initKatakanaCanvas() {
    katakanaCanvas = document.getElementById('katakanaWritingCanvas');
    if (!katakanaCanvas) return;

    katakanaCtx = katakanaCanvas.getContext('2d');
    katakanaCtx.strokeStyle = '#3E3E3E';
    katakanaCtx.lineWidth = 3;
    katakanaCtx.lineCap = 'round';

    // 마우스 이벤트
    katakanaCanvas.addEventListener('mousedown', startKatakanaDrawing);
    katakanaCanvas.addEventListener('mousemove', drawKatakana);
    katakanaCanvas.addEventListener('mouseup', stopKatakanaDrawing);
    katakanaCanvas.addEventListener('mouseout', stopKatakanaDrawing);

    // 터치 이벤트
    katakanaCanvas.addEventListener('touchstart', handleKatakanaTouchStart, {passive: false});
    katakanaCanvas.addEventListener('touchmove', handleKatakanaTouchMove, {passive: false});
    katakanaCanvas.addEventListener('touchend', stopKatakanaDrawing);
}

function startKatakanaDrawing(e) {
    isKatakanaDrawing = true;
    katakanaCtx.beginPath();
    const rect = katakanaCanvas.getBoundingClientRect();
    katakanaCtx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function drawKatakana(e) {
    if (!isKatakanaDrawing) return;
    const rect = katakanaCanvas.getBoundingClientRect();
    katakanaCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    katakanaCtx.stroke();
}

function stopKatakanaDrawing() {
    isKatakanaDrawing = false;
}

function handleKatakanaTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = katakanaCanvas.getBoundingClientRect();
    isKatakanaDrawing = true;
    katakanaCtx.beginPath();
    katakanaCtx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleKatakanaTouchMove(e) {
    e.preventDefault();
    if (!isKatakanaDrawing) return;
    const touch = e.touches[0];
    const rect = katakanaCanvas.getBoundingClientRect();
    katakanaCtx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    katakanaCtx.stroke();
}

function clearKatakanaCanvas() {
    katakanaCtx.clearRect(0, 0, katakanaCanvas.width, katakanaCanvas.height);
}

function nextKatakanaWritingChar() {
    katakanaWritingCharIndex = (katakanaWritingCharIndex + 1) % katakanaData.length;
    document.getElementById('katakanaWritingChar').textContent = katakanaData[katakanaWritingCharIndex].char;
    clearKatakanaCanvas();
}

// 문화 학습 열기
function openCulture(type) {
    const culture = cultureData[type];
    if (!culture) {
        alert('해당 문화 콘텐츠가 준비 중입니다.');
        return;
    }

    let html = `
        <div id="cultureModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('cultureModal')">&times;</span>
                <h3>${culture.title}</h3>
                <p style="color: #6B6B6B; margin-bottom: 30px;">${culture.description}</p>
    `;

    // 어휘가 있는 경우
    if (culture.vocabulary) {
        html += '<div class="culture-vocabulary"><h4>관련 어휘</h4><div class="culture-vocab-grid">';
        culture.vocabulary.forEach((vocab, index) => {
            html += `
                <div class="culture-vocab-card" onclick="speakJapanese('${vocab.japanese}')">
                    <div class="vocab-japanese">${vocab.japanese}</div>
                    <div class="vocab-reading">${vocab.reading}</div>
                    <div class="vocab-meaning">${vocab.meaning}</div>
                    <div class="vocab-audio">🔊</div>
                </div>
            `;
        });
        html += '</div></div>';
    }

    // 구절이 있는 경우 (음식)
    if (culture.phrases) {
        html += '<div class="culture-phrases" style="margin-top: 30px;"><h4>유용한 표현</h4>';
        culture.phrases.forEach(phrase => {
            html += `
                <div class="culture-phrase-card" style="background: #F5F0E8; padding: 15px; margin: 10px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 18px; margin-bottom: 5px;">${phrase.japanese}</div>
                        <div style="color: #6B6B6B;">${phrase.meaning}</div>
                    </div>
                    <button class="control-btn" onclick="speakJapanese('${phrase.japanese}')">🔊</button>
                </div>
            `;
        });
        html += '</div>';
    }

    // 예절 콘텐츠가 있는 경우
    if (culture.content) {
        html += '<div class="culture-manners" style="margin-top: 30px;"><h4>주요 예절</h4>';
        culture.content.forEach(item => {
            html += `
                <div class="culture-manner-card" style="background: #FEFDFB; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #8B7355;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <div>
                            <h5 style="color: #8B7355; margin: 0 0 5px 0;">${item.situation}</h5>
                            <div style="font-size: 18px; margin-bottom: 5px;">${item.japanese} (${item.reading})</div>
                        </div>
                        <button class="control-btn" onclick="speakJapanese('${item.japanese}')" style="font-size: 12px;">🔊</button>
                    </div>
                    <p style="color: #6B6B6B; margin: 0;">${item.description}</p>
                </div>
            `;
        });
        html += '</div>';
    }

    html += `
                <div style="text-align: center; margin-top: 30px;">
                    <button class="practice-btn" onclick="completeCultureLesson()">학습 완료</button>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

function completeCultureLesson() {
    learningStats.lessonsCompleted++;
    learningStats.studyTime += 3;
    saveStats();
    alert('문화 학습 완료!');
}

// 개선된 음성 합성 함수
function speakJapanese(text) {
    // 이전 음성 중지
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';

    // 음성 품질 개선 설정
    utterance.rate = 0.85;  // 속도 조절 (0.1 ~ 2.0)
    utterance.pitch = 1.0;  // 음높이 (0 ~ 2)
    utterance.volume = 1.0; // 볼륨 (0 ~ 1)

    // 일본어 음성 선택 시도
    const voices = speechSynthesis.getVoices();
    const japaneseVoice = voices.find(voice =>
        voice.lang === 'ja-JP' ||
        voice.lang.startsWith('ja') ||
        voice.name.includes('Japanese') ||
        voice.name.includes('Kyoko') ||
        voice.name.includes('Otoya')
    );

    if (japaneseVoice) {
        utterance.voice = japaneseVoice;
    }

    speechSynthesis.speak(utterance);
}

// 퀴즈 열기
let currentQuizIndex = 0;
let quizScore = 0;

function openQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizData.length) {
        showQuizResult();
        return;
    }

    const quiz = quizData[currentQuizIndex];

    let html = `
        <div id="quizModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('quizModal')">&times;</span>
                <h3>일본어 퀴즈</h3>
                <div class="quiz-container">
                    <div class="quiz-question">
                        <h4>${quiz.question}</h4>
                        <div class="quiz-options">
    `;

    quiz.options.forEach((option, index) => {
        html += `<button class="quiz-option" onclick="checkQuizAnswer(${index})">${option}</button>`;
    });

    html += `
                        </div>
                    </div>
                    <div class="quiz-feedback" id="quizFeedback"></div>
                    <div class="quiz-progress">
                        <span>문제 ${currentQuizIndex + 1}/${quizData.length}</span>
                        <span>점수: ${quizScore}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

function checkQuizAnswer(selectedIndex) {
    const quiz = quizData[currentQuizIndex];
    const feedback = document.getElementById('quizFeedback');
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(opt => opt.disabled = true);

    learningStats.totalQuestions++;

    if (selectedIndex === quiz.answer) {
        learningStats.correctAnswers++;
        quizScore++;
        options[selectedIndex].classList.add('correct');
        feedback.innerHTML = '<div class="feedback-correct">정답입니다! 🎉</div>';
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[quiz.answer].classList.add('correct');
        feedback.innerHTML = '<div class="feedback-incorrect">틀렸습니다. 정답은 ' + quiz.options[quiz.answer] + ' 입니다.</div>';
    }

    saveStats();

    setTimeout(() => {
        currentQuizIndex++;
        showQuizQuestion();
    }, 2000);
}

function showQuizResult() {
    const percentage = Math.round((quizScore / quizData.length) * 100);
    let html = `
        <div id="quizResultModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('quizResultModal')">&times;</span>
                <h3>퀴즈 완료!</h3>
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 72px; margin-bottom: 20px;">${percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '📚'}</div>
                    <div style="font-size: 48px; font-weight: 500; color: #8B7355; margin-bottom: 20px;">${quizScore} / ${quizData.length}</div>
                    <div style="font-size: 24px; margin-bottom: 30px;">정확도: ${percentage}%</div>
                    <p style="font-size: 18px; color: #6B6B6B; margin-bottom: 30px;">
                        ${percentage >= 80 ? '훌륭합니다!' : percentage >= 60 ? '잘했습니다! 조금만 더 연습해보세요.' : '더 공부가 필요합니다. 다시 도전해보세요!'}
                    </p>
                    <button class="practice-btn" onclick="openQuiz()">다시 도전</button>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

// 회화 연습 열기
let currentConversationIndex = 0;

function openConversation() {
    currentConversationIndex = 0;
    showConversation();
}

function showConversation() {
    const conv = conversationData[currentConversationIndex];

    let html = `
        <div id="conversationModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('conversationModal')">&times;</span>
                <h3>회화 연습: ${conv.situation}</h3>
                <div class="conversation-container">
    `;

    conv.dialogue.forEach((line, index) => {
        const isUser = line.speaker === 'あなた';
        html += `
            <div class="conversation-line" style="margin: 15px 0; padding: 15px; background: ${isUser ? '#F5F0E8' : '#FEFDFB'}; border-radius: 8px; border-left: 3px solid ${isUser ? '#8B7355' : '#D4C5B9'};">
                <div style="font-weight: 500; color: #8B7355; margin-bottom: 5px;">${line.speaker}</div>
                <div style="font-size: 18px; margin-bottom: 5px;">${line.text}</div>
                <div style="color: #6B6B6B; font-size: 14px;">${line.translation}</div>
                <button class="control-btn" onclick="speakConversationLine('${line.text}')" style="margin-top: 10px; font-size: 12px;">🔊 듣기</button>
            </div>
        `;
    });

    html += `
                    <div class="conversation-navigation" style="text-align: center; margin-top: 30px;">
                        <button class="control-btn" onclick="prevConversation()">이전 대화</button>
                        <button class="control-btn" onclick="nextConversation()">다음 대화</button>
                        <button class="practice-btn" onclick="completeConversation()">학습 완료</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    showModal(html);
}

function speakConversationLine(text) {
    speakJapanese(text);
}

function nextConversation() {
    currentConversationIndex = (currentConversationIndex + 1) % conversationData.length;
    showConversation();
}

function prevConversation() {
    currentConversationIndex = (currentConversationIndex - 1 + conversationData.length) % conversationData.length;
    showConversation();
}

function completeConversation() {
    learningStats.lessonsCompleted++;
    learningStats.studyTime += 5;
    saveStats();
    alert('회화 학습 완료!');
}

// 모달 외부 클릭시 닫기
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// 네비게이션 스무스 스크롤
document.addEventListener('DOMContentLoaded', function() {
    loadStats();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
