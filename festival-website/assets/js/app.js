// ===== APP.JS - Festival Website Dynamic Content Loader =====

let config = {};
let currentLang = 'ko';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadConfig();
        initializeApp();
        setupEventListeners();
        hideLoadingIndicator();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        hideLoadingIndicator();
    }
});

// ===== LOAD CONFIGURATION =====
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Failed to load config');
        config = await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        // Use default config if loading fails
        config = getDefaultConfig();
    }
}

// ===== INITIALIZE APP =====
function initializeApp() {
    // Update page title
    updatePageTitle();

    // Render all sections
    renderNavigation();
    renderLanguageSelector();
    renderHero();
    renderNews();
    renderSocial();
    renderSchedule();
    renderAbout();
    renderWeather();
    renderGallery();
    renderFooter();

    // Setup scroll animations
    setupScrollAnimations();

    // Setup header scroll effect
    setupHeaderScroll();
}

// ===== UPDATE PAGE TITLE =====
function updatePageTitle() {
    if (config.festival) {
        document.title = `${config.festival.name} | ${config.festival.nameEn}`;
        document.getElementById('page-title').textContent = document.title;
    }
}

// ===== RENDER NAVIGATION =====
function renderNavigation() {
    const mainNav = document.getElementById('mainNav');
    const mobileNav = document.getElementById('mobileNav');

    if (config.navigation && config.navigation.items) {
        const navHTML = config.navigation.items.map(item =>
            `<a href="${item.link}">${item.label}</a>`
        ).join('');

        mainNav.innerHTML = navHTML;
        mobileNav.innerHTML = navHTML;
    }
}

// ===== RENDER LANGUAGE SELECTOR =====
function renderLanguageSelector() {
    const langDropdown = document.getElementById('langDropdown');
    const mobileLangOptions = document.getElementById('mobileLangOptions');

    if (config.languages) {
        const langHTML = config.languages.map(lang =>
            `<button class="lang-option" data-lang="${lang.code}">${lang.label}</button>`
        ).join('');

        langDropdown.innerHTML = langHTML;
        mobileLangOptions.innerHTML = langHTML;
    }
}

// ===== RENDER HERO SECTION =====
function renderHero() {
    const heroLogo = document.getElementById('heroLogo');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const scrollText = document.getElementById('scrollText');

    if (config.hero) {
        if (config.festival && config.festival.name) {
            heroLogo.textContent = '❄️';
            heroTitle.textContent = config.hero.title || config.festival.name;
            heroSubtitle.textContent = config.hero.subtitle || config.festival.tagline;
        }
        scrollText.textContent = config.hero.scrollText || 'Scroll';
    }
}

// ===== RENDER NEWS SECTION =====
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');

    if (config.news && config.news.length > 0) {
        const newsHTML = config.news.slice(0, 6).map(item => `
            <div class="news-card fade-in">
                <div>
                    <span class="news-date">${formatDate(item.date)}</span>
                    <span class="news-category">${item.category}</span>
                </div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-content">${item.content}</p>
            </div>
        `).join('');

        newsGrid.innerHTML = newsHTML;
    } else {
        newsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">소식이 없습니다.</p>';
    }
}

// ===== RENDER SOCIAL MEDIA =====
function renderSocial() {
    const socialButtons = document.getElementById('socialButtons');
    const footerSocial = document.getElementById('footerSocial');

    if (config.social) {
        const socialData = [
            { name: 'Twitter', icon: '𝕏', url: config.social.twitter, color: '#1DA1F2' },
            { name: 'Instagram', icon: '📷', url: config.social.instagram, color: '#E4405F' },
            { name: 'Facebook', icon: '👍', url: config.social.facebook, color: '#4267B2' },
            { name: 'YouTube', icon: '▶️', url: config.social.youtube, color: '#FF0000' }
        ];

        const socialHTML = socialData.map(social => `
            <a href="${social.url}" class="social-btn" target="_blank" rel="noopener noreferrer">
                <span class="social-icon">${social.icon}</span>
                <span>${social.name}</span>
            </a>
        `).join('');

        const footerSocialHTML = socialData.map(social => `
            <a href="${social.url}" class="footer-social-link" target="_blank" rel="noopener noreferrer">
                <span>${social.icon}</span>
            </a>
        `).join('');

        socialButtons.innerHTML = socialHTML;
        footerSocial.innerHTML = footerSocialHTML;
    }
}

// ===== RENDER SCHEDULE =====
function renderSchedule() {
    const scheduleDates = document.getElementById('scheduleDates');
    const venuesGrid = document.getElementById('venuesGrid');

    if (config.schedule) {
        scheduleDates.textContent = config.schedule.dates;

        if (config.schedule.venues && config.schedule.venues.length > 0) {
            const venuesHTML = config.schedule.venues.map((venue, index) => `
                <div class="venue-card fade-in" style="animation-delay: ${index * 0.1}s">
                    <div class="venue-image">
                        ${'🎪🎡🎨🎭🎸🎯'.charAt(index % 6)}
                    </div>
                    <div class="venue-info">
                        <h3 class="venue-name">${venue.name}</h3>
                        <div class="venue-location">📍 ${venue.location}</div>
                        <div class="venue-details">
                            <div class="venue-detail">📅 ${venue.dates}</div>
                            <div class="venue-detail">🕐 ${venue.hours}</div>
                        </div>
                        <p class="venue-description">${venue.description}</p>
                    </div>
                </div>
            `).join('');

            venuesGrid.innerHTML = venuesHTML;
        }
    }
}

// ===== RENDER ABOUT SECTION =====
function renderAbout() {
    const aboutContent = document.getElementById('aboutContent');

    if (config.about && config.about.sections) {
        const aboutHTML = config.about.sections.map((section, index) => `
            <div class="about-item ${index % 2 === 0 ? 'slide-in-left' : 'slide-in-right'}">
                <div class="about-image">
                    ${'🎊🎉🎈🎆🎇✨'.charAt(index % 6)}
                </div>
                <div class="about-text">
                    <h3>${section.title}</h3>
                    <p>${section.content}</p>
                </div>
            </div>
        `).join('');

        aboutContent.innerHTML = aboutHTML;
    }
}

// ===== RENDER WEATHER =====
function renderWeather() {
    const weatherTitle = document.getElementById('weatherTitle');
    const weatherDescription = document.getElementById('weatherDescription');
    const weatherRecommendations = document.getElementById('weatherRecommendations');

    if (config.weather) {
        weatherTitle.textContent = config.weather.title;
        weatherDescription.textContent = config.weather.description;

        if (config.weather.recommendations) {
            const recommendationsHTML = config.weather.recommendations.map(rec =>
                `<li>✓ ${rec}</li>`
            ).join('');

            weatherRecommendations.innerHTML = recommendationsHTML;
        }
    }
}

// ===== RENDER GALLERY =====
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');

    if (config.gallery && config.gallery.images) {
        const galleryHTML = config.gallery.images.map((item, index) => `
            <div class="gallery-item fade-in" style="animation-delay: ${index * 0.05}s">
                ${'📸🎨🎭🎪🎡🎢🎠🎯🎸🎺'.charAt(index % 10)}
                <div class="gallery-caption">${item.caption}</div>
            </div>
        `).join('');

        galleryGrid.innerHTML = galleryHTML;
    }
}

// ===== RENDER FOOTER =====
function renderFooter() {
    if (config.footer) {
        document.getElementById('footerOrgName').textContent = config.footer.organizerName || '';
        document.getElementById('footerAddress').textContent = config.footer.address || '';
        document.getElementById('footerPhone').textContent = config.footer.phone || '';
        document.getElementById('footerEmail').textContent = config.footer.email || '';
        document.getElementById('footerCopyright').textContent = config.footer.copyright || '';

        if (config.footer.links) {
            const linksHTML = config.footer.links.map(link =>
                `<li><a href="${link.url}">${link.label}</a></li>`
            ).join('');

            document.getElementById('footerLinks').innerHTML = linksHTML;
        }
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const menuCloseBtn = document.getElementById('menuCloseBtn');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    menuCloseBtn.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Mobile nav links
    document.getElementById('mobileNav').addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
        }
    });

    // Language selector
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    langDropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-option')) {
            const lang = e.target.dataset.lang;
            document.getElementById('currentLang').textContent = e.target.textContent;
            langDropdown.classList.remove('active');
            changeLang uage(lang);
        }
    });

    // View all news button
    document.getElementById('viewAllNews').addEventListener('click', () => {
        alert('뉴스 페이지로 이동합니다.');
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== CLOSE MOBILE MENU =====
function closeMobileMenu() {
    document.getElementById('mobileMenuOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== CHANGE LANGUAGE =====
function changeLanguage(lang) {
    currentLang = lang;
    console.log('Language changed to:', lang);
    // In a real implementation, you would reload content in the selected language
}

// ===== SETUP HEADER SCROLL =====
function setupHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== SETUP SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// ===== HIDE LOADING INDICATOR =====
function hideLoadingIndicator() {
    const loader = document.getElementById('loadingIndicator');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

// ===== GET DEFAULT CONFIG =====
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
            title: '축제 일정',
            dates: '2026년 2월 4일(수) ~ 2월 11일(수)',
            venues: []
        },
        news: [],
        about: {
            sections: []
        },
        social: {
            twitter: '#',
            instagram: '#',
            facebook: '#',
            youtube: '#'
        },
        footer: {
            organizerName: '축제 조직위원회',
            copyright: '© 2026 Festival. All rights reserved.'
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

// ===== EXPORT FOR ADMIN PANEL =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { config, loadConfig };
}
