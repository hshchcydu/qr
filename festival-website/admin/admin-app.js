// ===== ADMIN PANEL APP =====

let config = {};
let hasUnsavedChanges = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    initializeApp();
    setupEventListeners();
    updateSaveStatus(true);
});

// ===== LOAD CONFIG =====
async function loadConfig() {
    try {
        const response = await fetch('../config.json');
        if (!response.ok) throw new Error('Failed to load config');
        config = await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        showToast('설정 파일을 불러오지 못했습니다', 'error');
        config = getDefaultConfig();
    }
}

// ===== INITIALIZE APP =====
function initializeApp() {
    loadFestivalData();
    loadHeroData();
    loadScheduleData();
    loadNewsData();
    loadAboutData();
    loadWeatherData();
    loadGalleryData();
    loadSocialData();
    loadFooterData();
}

// ===== LOAD FESTIVAL DATA =====
function loadFestivalData() {
    if (config.festival) {
        setValue('festivalName', config.festival.name);
        setValue('festivalNameEn', config.festival.nameEn);
        setValue('festivalTagline', config.festival.tagline);
        setValue('festivalYear', config.festival.year);
    }
}

// ===== LOAD HERO DATA =====
function loadHeroData() {
    if (config.hero) {
        setValue('heroTitle', config.hero.title);
        setValue('heroSubtitle', config.hero.subtitle);
        setValue('heroScrollText', config.hero.scrollText);
    }
}

// ===== LOAD SCHEDULE DATA =====
function loadScheduleData() {
    if (config.schedule) {
        setValue('scheduleDates', config.schedule.dates);
        renderVenues();
    }
}

function renderVenues() {
    const container = document.getElementById('venuesList');
    container.innerHTML = '';

    if (!config.schedule.venues || config.schedule.venues.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🎪</div><p class="empty-state-text">등록된 회장이 없습니다</p><p class="empty-state-subtext">+ 회장 추가 버튼을 눌러 새로운 회장을 추가하세요</p></div>';
        return;
    }

    config.schedule.venues.forEach((venue, index) => {
        const card = createItemCard({
            title: `회장 ${index + 1}`,
            fields: [
                { label: '회장 이름', value: venue.name, key: 'name' },
                { label: '위치', value: venue.location, key: 'location' },
                { label: '날짜', value: venue.dates, key: 'dates' },
                { label: '시간', value: venue.hours, key: 'hours' },
                { label: '설명', value: venue.description, key: 'description', type: 'textarea' }
            ],
            onDelete: () => deleteVenue(index),
            onChange: (key, value) => updateVenue(index, key, value)
        });
        container.appendChild(card);
    });
}

function deleteVenue(index) {
    showModal(
        '회장 삭제',
        '이 회장을 삭제하시겠습니까?',
        () => {
            config.schedule.venues.splice(index, 1);
            renderVenues();
            markAsUnsaved();
            showToast('회장이 삭제되었습니다', 'success');
        }
    );
}

function updateVenue(index, key, value) {
    config.schedule.venues[index][key] = value;
    markAsUnsaved();
}

function addVenue() {
    if (!config.schedule.venues) {
        config.schedule.venues = [];
    }

    config.schedule.venues.push({
        name: '새 회장',
        location: '위치',
        dates: '날짜',
        hours: '시간',
        description: '설명'
    });

    renderVenues();
    markAsUnsaved();
    showToast('새 회장이 추가되었습니다', 'success');
}

// ===== LOAD NEWS DATA =====
function loadNewsData() {
    renderNews();
}

function renderNews() {
    const container = document.getElementById('newsList');
    container.innerHTML = '';

    if (!config.news || config.news.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📰</div><p class="empty-state-text">등록된 소식이 없습니다</p><p class="empty-state-subtext">+ 소식 추가 버튼을 눌러 새로운 소식을 추가하세요</p></div>';
        return;
    }

    config.news.forEach((news, index) => {
        const card = createItemCard({
            title: news.title || `소식 ${index + 1}`,
            fields: [
                { label: '날짜', value: news.date, key: 'date', type: 'date' },
                { label: '제목', value: news.title, key: 'title' },
                { label: '카테고리', value: news.category, key: 'category' },
                { label: '내용', value: news.content, key: 'content', type: 'textarea' }
            ],
            onDelete: () => deleteNews(index),
            onChange: (key, value) => updateNews(index, key, value)
        });
        container.appendChild(card);
    });
}

function deleteNews(index) {
    showModal(
        '소식 삭제',
        '이 소식을 삭제하시겠습니까?',
        () => {
            config.news.splice(index, 1);
            renderNews();
            markAsUnsaved();
            showToast('소식이 삭제되었습니다', 'success');
        }
    );
}

function updateNews(index, key, value) {
    config.news[index][key] = value;
    if (key === 'title') {
        renderNews();
    }
    markAsUnsaved();
}

function addNews() {
    if (!config.news) {
        config.news = [];
    }

    config.news.unshift({
        date: new Date().toISOString().split('T')[0],
        title: '새 소식',
        category: '공지사항',
        content: '내용을 입력하세요'
    });

    renderNews();
    markAsUnsaved();
    showToast('새 소식이 추가되었습니다', 'success');
}

// ===== LOAD ABOUT DATA =====
function loadAboutData() {
    renderAbout();
}

function renderAbout() {
    const container = document.getElementById('aboutList');
    container.innerHTML = '';

    if (!config.about || !config.about.sections || config.about.sections.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">ℹ️</div><p class="empty-state-text">등록된 소개 섹션이 없습니다</p><p class="empty-state-subtext">+ 섹션 추가 버튼을 눌러 새로운 섹션을 추가하세요</p></div>';
        return;
    }

    config.about.sections.forEach((section, index) => {
        const card = createItemCard({
            title: section.title || `섹션 ${index + 1}`,
            fields: [
                { label: '제목', value: section.title, key: 'title' },
                { label: '내용', value: section.content, key: 'content', type: 'textarea' }
            ],
            onDelete: () => deleteAbout(index),
            onChange: (key, value) => updateAbout(index, key, value)
        });
        container.appendChild(card);
    });
}

function deleteAbout(index) {
    showModal(
        '섹션 삭제',
        '이 섹션을 삭제하시겠습니까?',
        () => {
            config.about.sections.splice(index, 1);
            renderAbout();
            markAsUnsaved();
            showToast('섹션이 삭제되었습니다', 'success');
        }
    );
}

function updateAbout(index, key, value) {
    config.about.sections[index][key] = value;
    if (key === 'title') {
        renderAbout();
    }
    markAsUnsaved();
}

function addAbout() {
    if (!config.about) {
        config.about = { sections: [] };
    }
    if (!config.about.sections) {
        config.about.sections = [];
    }

    config.about.sections.push({
        title: '새 섹션',
        content: '내용을 입력하세요',
        image: 'assets/images/about.jpg'
    });

    renderAbout();
    markAsUnsaved();
    showToast('새 섹션이 추가되었습니다', 'success');
}

// ===== LOAD WEATHER DATA =====
function loadWeatherData() {
    if (config.weather) {
        setValue('weatherTitle', config.weather.title);
        setValue('weatherDescription', config.weather.description);
        renderWeatherRec();
    }
}

function renderWeatherRec() {
    const container = document.getElementById('weatherRecList');
    container.innerHTML = '';

    if (!config.weather || !config.weather.recommendations || config.weather.recommendations.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🌤️</div><p class="empty-state-text">등록된 추천 사항이 없습니다</p></div>';
        return;
    }

    config.weather.recommendations.forEach((rec, index) => {
        const card = createSimpleItemCard(rec, () => deleteWeatherRec(index), (value) => updateWeatherRec(index, value));
        container.appendChild(card);
    });
}

function deleteWeatherRec(index) {
    config.weather.recommendations.splice(index, 1);
    renderWeatherRec();
    markAsUnsaved();
    showToast('추천 사항이 삭제되었습니다', 'success');
}

function updateWeatherRec(index, value) {
    config.weather.recommendations[index] = value;
    markAsUnsaved();
}

function addWeatherRec() {
    if (!config.weather) {
        config.weather = { recommendations: [] };
    }
    if (!config.weather.recommendations) {
        config.weather.recommendations = [];
    }

    config.weather.recommendations.push('새 추천 사항');
    renderWeatherRec();
    markAsUnsaved();
    showToast('추천 사항이 추가되었습니다', 'success');
}

// ===== LOAD GALLERY DATA =====
function loadGalleryData() {
    renderGallery();
}

function renderGallery() {
    const container = document.getElementById('galleryList');
    container.innerHTML = '';

    if (!config.gallery || !config.gallery.images || config.gallery.images.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🖼️</div><p class="empty-state-text">등록된 이미지가 없습니다</p><p class="empty-state-subtext">+ 이미지 추가 버튼을 눌러 새로운 이미지를 추가하세요</p></div>';
        return;
    }

    config.gallery.images.forEach((image, index) => {
        const card = createItemCard({
            title: image.caption || `이미지 ${index + 1}`,
            fields: [
                { label: '이미지 경로', value: image.src, key: 'src' },
                { label: '설명', value: image.caption, key: 'caption' }
            ],
            onDelete: () => deleteGalleryImage(index),
            onChange: (key, value) => updateGalleryImage(index, key, value)
        });
        container.appendChild(card);
    });
}

function deleteGalleryImage(index) {
    showModal(
        '이미지 삭제',
        '이 이미지를 삭제하시겠습니까?',
        () => {
            config.gallery.images.splice(index, 1);
            renderGallery();
            markAsUnsaved();
            showToast('이미지가 삭제되었습니다', 'success');
        }
    );
}

function updateGalleryImage(index, key, value) {
    config.gallery.images[index][key] = value;
    if (key === 'caption') {
        renderGallery();
    }
    markAsUnsaved();
}

function addGalleryImage() {
    if (!config.gallery) {
        config.gallery = { images: [] };
    }
    if (!config.gallery.images) {
        config.gallery.images = [];
    }

    config.gallery.images.push({
        src: 'assets/images/gallery.jpg',
        caption: '새 이미지'
    });

    renderGallery();
    markAsUnsaved();
    showToast('이미지가 추가되었습니다', 'success');
}

// ===== LOAD SOCIAL DATA =====
function loadSocialData() {
    if (config.social) {
        setValue('socialTwitter', config.social.twitter);
        setValue('socialInstagram', config.social.instagram);
        setValue('socialFacebook', config.social.facebook);
        setValue('socialYoutube', config.social.youtube);
    }
}

// ===== LOAD FOOTER DATA =====
function loadFooterData() {
    if (config.footer) {
        setValue('footerOrgName', config.footer.organizerName);
        setValue('footerAddress', config.footer.address);
        setValue('footerPhone', config.footer.phone);
        setValue('footerEmail', config.footer.email);
        setValue('footerCopyright', config.footer.copyright);
        renderFooterLinks();
    }
}

function renderFooterLinks() {
    const container = document.getElementById('footerLinksList');
    container.innerHTML = '';

    if (!config.footer || !config.footer.links || config.footer.links.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔗</div><p class="empty-state-text">등록된 링크가 없습니다</p></div>';
        return;
    }

    config.footer.links.forEach((link, index) => {
        const card = createItemCard({
            title: link.label || `링크 ${index + 1}`,
            fields: [
                { label: '레이블', value: link.label, key: 'label' },
                { label: 'URL', value: link.url, key: 'url' }
            ],
            onDelete: () => deleteFooterLink(index),
            onChange: (key, value) => updateFooterLink(index, key, value)
        });
        container.appendChild(card);
    });
}

function deleteFooterLink(index) {
    config.footer.links.splice(index, 1);
    renderFooterLinks();
    markAsUnsaved();
    showToast('링크가 삭제되었습니다', 'success');
}

function updateFooterLink(index, key, value) {
    config.footer.links[index][key] = value;
    if (key === 'label') {
        renderFooterLinks();
    }
    markAsUnsaved();
}

function addFooterLink() {
    if (!config.footer) {
        config.footer = { links: [] };
    }
    if (!config.footer.links) {
        config.footer.links = [];
    }

    config.footer.links.push({
        label: '새 링크',
        url: '#'
    });

    renderFooterLinks();
    markAsUnsaved();
    showToast('링크가 추가되었습니다', 'success');
}

// ===== CREATE ITEM CARD =====
function createItemCard({ title, fields, onDelete, onChange }) {
    const card = document.createElement('div');
    card.className = 'item-card';

    const header = document.createElement('div');
    header.className = 'item-header';

    const titleEl = document.createElement('div');
    titleEl.className = 'item-title';
    titleEl.textContent = title;

    const actions = document.createElement('div');
    actions.className = 'item-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'item-btn item-btn-delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.onclick = onDelete;

    actions.appendChild(deleteBtn);
    header.appendChild(titleEl);
    header.appendChild(actions);
    card.appendChild(header);

    const fieldsContainer = document.createElement('div');
    fieldsContainer.className = 'item-fields';

    fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = field.label;
        formGroup.appendChild(label);

        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 3;
        } else if (field.type === 'date') {
            input = document.createElement('input');
            input.type = 'date';
        } else {
            input = document.createElement('input');
            input.type = field.type || 'text';
        }

        input.value = field.value || '';
        input.onchange = () => onChange(field.key, input.value);
        input.oninput = () => onChange(field.key, input.value);

        formGroup.appendChild(input);
        fieldsContainer.appendChild(formGroup);
    });

    card.appendChild(fieldsContainer);
    return card;
}

// ===== CREATE SIMPLE ITEM CARD =====
function createSimpleItemCard(value, onDelete, onChange) {
    const card = document.createElement('div');
    card.className = 'item-card';

    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.gap = '10px';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.style.flex = '1';
    input.style.padding = '10px';
    input.style.border = '2px solid #e5e7eb';
    input.style.borderRadius = '6px';
    input.onchange = () => onChange(input.value);
    input.oninput = () => onChange(input.value);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'item-btn item-btn-delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.onclick = onDelete;

    content.appendChild(input);
    content.appendChild(deleteBtn);
    card.appendChild(content);

    return card;
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveConfig);

    // Preview button
    document.getElementById('previewBtn').addEventListener('click', () => {
        window.open('../index.html', '_blank');
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportConfig);

    // Import button
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', importConfig);

    // Add buttons
    document.getElementById('addVenueBtn').addEventListener('click', addVenue);
    document.getElementById('addNewsBtn').addEventListener('click', addNews);
    document.getElementById('addAboutBtn').addEventListener('click', addAbout);
    document.getElementById('addWeatherRecBtn').addEventListener('click', addWeatherRec);
    document.getElementById('addGalleryBtn').addEventListener('click', addGalleryImage);
    document.getElementById('addFooterLinkBtn').addEventListener('click', addFooterLink);

    // Form inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', handleInputChange);
    });

    // Modal
    document.getElementById('modalClose').addEventListener('click', hideModal);
    document.getElementById('modalCancel').addEventListener('click', hideModal);

    // Prevent accidental navigation away
    window.addEventListener('beforeunload', (e) => {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

// ===== SWITCH SECTION =====
function switchSection(sectionName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${sectionName}`).classList.add('active');

    // Update title
    const titles = {
        festival: '기본 정보',
        hero: '메인 화면',
        schedule: '일정 관리',
        news: '소식 관리',
        about: '소개 관리',
        weather: '날씨 정보',
        gallery: '갤러리',
        social: '소셜 미디어',
        footer: '푸터 정보'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionName] || sectionName;
}

// ===== HANDLE INPUT CHANGE =====
function handleInputChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    // Update config based on input ID
    if (id.startsWith('festival')) {
        if (!config.festival) config.festival = {};
        if (id === 'festivalName') config.festival.name = value;
        if (id === 'festivalNameEn') config.festival.nameEn = value;
        if (id === 'festivalTagline') config.festival.tagline = value;
        if (id === 'festivalYear') config.festival.year = value;
    } else if (id.startsWith('hero')) {
        if (!config.hero) config.hero = {};
        if (id === 'heroTitle') config.hero.title = value;
        if (id === 'heroSubtitle') config.hero.subtitle = value;
        if (id === 'heroScrollText') config.hero.scrollText = value;
    } else if (id.startsWith('schedule')) {
        if (!config.schedule) config.schedule = {};
        if (id === 'scheduleDates') config.schedule.dates = value;
    } else if (id.startsWith('weather')) {
        if (!config.weather) config.weather = {};
        if (id === 'weatherTitle') config.weather.title = value;
        if (id === 'weatherDescription') config.weather.description = value;
    } else if (id.startsWith('social')) {
        if (!config.social) config.social = {};
        if (id === 'socialTwitter') config.social.twitter = value;
        if (id === 'socialInstagram') config.social.instagram = value;
        if (id === 'socialFacebook') config.social.facebook = value;
        if (id === 'socialYoutube') config.social.youtube = value;
    } else if (id.startsWith('footer')) {
        if (!config.footer) config.footer = {};
        if (id === 'footerOrgName') config.footer.organizerName = value;
        if (id === 'footerAddress') config.footer.address = value;
        if (id === 'footerPhone') config.footer.phone = value;
        if (id === 'footerEmail') config.footer.email = value;
        if (id === 'footerCopyright') config.footer.copyright = value;
    }

    markAsUnsaved();
}

// ===== SAVE CONFIG =====
function saveConfig() {
    const jsonData = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    updateSaveStatus(true);
    showToast('설정이 저장되었습니다! config.json 파일을 다운로드했습니다.', 'success');
}

// ===== EXPORT CONFIG =====
function exportConfig() {
    saveConfig();
}

// ===== IMPORT CONFIG =====
function importConfig(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            config = JSON.parse(event.target.result);
            initializeApp();
            markAsUnsaved();
            showToast('설정을 불러왔습니다', 'success');
        } catch (error) {
            showToast('파일을 읽을 수 없습니다', 'error');
        }
    };
    reader.readAsText(file);

    e.target.value = '';
}

// ===== UTILITY FUNCTIONS =====
function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value || '';
    }
}

function markAsUnsaved() {
    hasUnsavedChanges = true;
    updateSaveStatus(false);
}

function updateSaveStatus(saved) {
    const status = document.getElementById('saveStatus');
    if (saved) {
        status.textContent = '저장됨';
        status.className = 'save-status saved';
        hasUnsavedChanges = false;
    } else {
        status.textContent = '저장 안됨';
        status.className = 'save-status unsaved';
    }
}

// ===== TOAST =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== MODAL =====
let modalCallback = null;

function showModal(title, body, onConfirm) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = body;
    modal.classList.add('show');
    modalCallback = onConfirm;

    document.getElementById('modalConfirm').onclick = () => {
        if (modalCallback) modalCallback();
        hideModal();
    };
}

function hideModal() {
    document.getElementById('modal').classList.remove('show');
    modalCallback = null;
}

// ===== DEFAULT CONFIG =====
function getDefaultConfig() {
    return {
        festival: {
            name: '나의 축제',
            nameEn: 'My Festival',
            tagline: '당신을 위한 특별한 축제',
            year: '2026'
        },
        navigation: {
            items: [
                { label: '소식', link: '#news' },
                { label: '축제 소개', link: '#about' },
                { label: '일정', link: '#schedule' },
                { label: '오시는 길', link: '#access' }
            ]
        },
        languages: [
            { code: 'ko', label: '한국어' },
            { code: 'en', label: 'English' }
        ],
        hero: {
            title: '나의 축제 2026',
            subtitle: '함께 만드는 특별한 순간',
            scrollText: '스크롤'
        },
        schedule: {
            dates: '2026년 2월 4일(수) ~ 2월 11일(수)',
            venues: []
        },
        news: [],
        about: {
            sections: []
        },
        social: {
            twitter: 'https://twitter.com/yourfestival',
            instagram: 'https://instagram.com/yourfestival',
            facebook: 'https://facebook.com/yourfestival',
            youtube: 'https://youtube.com/@yourfestival'
        },
        footer: {
            organizerName: '축제 조직위원회',
            address: '서울특별시 종로구 세종대로 123',
            phone: '02-1234-5678',
            email: 'info@yourfestival.com',
            copyright: '© 2026 Festival. All rights reserved.',
            links: []
        },
        weather: {
            title: '날씨 정보',
            description: '축제 기간 동안 날씨를 확인하세요.',
            recommendations: []
        },
        gallery: {
            images: []
        }
    };
}
