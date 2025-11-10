// GO HOKKAIDO Premium - Interactive Features
// Professional Tourism Website JavaScript

(function() {
    'use strict';

    // ============================================
    // 1. HERO SLIDER
    // ============================================
    class HeroSlider {
        constructor() {
            this.slides = document.querySelectorAll('.hero-slide');
            this.dots = document.querySelector('.slider-dots');
            this.currentSlide = 0;
            this.slideInterval = null;

            if (this.slides.length > 0) {
                this.init();
            }
        }

        init() {
            this.createDots();
            this.attachEvents();
            this.startAutoSlide();
        }

        createDots() {
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dots.appendChild(dot);
            });
        }

        attachEvents() {
            const prevBtn = document.querySelector('.slider-control.prev');
            const nextBtn = document.querySelector('.slider-control.next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prevSlide());
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.nextSlide());
            }
        }

        showSlide(index) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            const dotElements = this.dots.querySelectorAll('.dot');
            dotElements.forEach(dot => dot.classList.remove('active'));

            this.slides[index].classList.add('active');
            dotElements[index].classList.add('active');
            this.currentSlide = index;
        }

        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
            this.resetAutoSlide();
        }

        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
            this.resetAutoSlide();
        }

        goToSlide(index) {
            this.showSlide(index);
            this.resetAutoSlide();
        }

        startAutoSlide() {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, 6000);
        }

        resetAutoSlide() {
            clearInterval(this.slideInterval);
            this.startAutoSlide();
        }
    }

    // ============================================
    // 2. SEARCH OVERLAY
    // ============================================
    class SearchOverlay {
        constructor() {
            this.overlay = document.querySelector('.search-overlay');
            this.toggleBtn = document.querySelector('.search-toggle-btn');
            this.closeBtn = document.querySelector('.search-close');
            this.searchInput = document.querySelector('.search-input-main');
            this.searchBtn = document.querySelector('.search-submit');

            if (this.overlay && this.toggleBtn) {
                this.init();
            }
        }

        init() {
            this.toggleBtn.addEventListener('click', () => this.open());

            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.close());
            }

            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                    this.close();
                }
            });

            if (this.searchBtn) {
                this.searchBtn.addEventListener('click', () => this.performSearch());
            }

            if (this.searchInput) {
                this.searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.performSearch();
                    }
                });
            }
        }

        open() {
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                if (this.searchInput) {
                    this.searchInput.focus();
                }
            }, 300);
        }

        close() {
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        performSearch() {
            const query = this.searchInput.value.trim();
            if (query) {
                console.log('검색:', query);
                alert(`"${query}" 검색 중...\n\n실제 사이트에서는 검색 결과 페이지로 이동합니다.`);
            } else {
                alert('검색어를 입력해주세요.');
            }
        }
    }

    // ============================================
    // 3. REGION TABS
    // ============================================
    class RegionTabs {
        constructor() {
            this.tabs = document.querySelectorAll('.region-tab');
            this.contents = document.querySelectorAll('.region-content');

            if (this.tabs.length > 0) {
                this.init();
            }
        }

        init() {
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    this.switchTab(index);
                });
            });
        }

        switchTab(index) {
            this.tabs.forEach(tab => tab.classList.remove('active'));
            this.contents.forEach(content => content.classList.remove('active'));

            this.tabs[index].classList.add('active');
            this.contents[index].classList.add('active');
        }
    }

    // ============================================
    // 4. SCROLL TO TOP
    // ============================================
    class ScrollToTop {
        constructor() {
            this.button = document.getElementById('scrollToTop');

            if (this.button) {
                this.init();
            }
        }

        init() {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    this.button.classList.add('show');
                } else {
                    this.button.classList.remove('show');
                }
            });

            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ============================================
    // 5. SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // 6. MOBILE MENU
    // ============================================
    class MobileMenu {
        constructor() {
            this.toggle = document.querySelector('.mobile-menu-toggle');
            this.nav = document.querySelector('.main-nav');

            if (this.toggle && this.nav) {
                this.init();
            }
        }

        init() {
            this.toggle.addEventListener('click', () => {
                if (this.nav.style.display === 'block') {
                    this.nav.style.display = 'none';
                } else {
                    this.nav.style.display = 'block';
                    this.nav.style.position = 'absolute';
                    this.nav.style.top = '100%';
                    this.nav.style.left = '0';
                    this.nav.style.right = '0';
                    this.nav.style.background = 'white';
                    this.nav.style.padding = '20px';
                    this.nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.nav.style.display = '';
                    this.nav.style.position = '';
                    this.nav.style.top = '';
                    this.nav.style.left = '';
                    this.nav.style.right = '';
                    this.nav.style.background = '';
                    this.nav.style.padding = '';
                    this.nav.style.boxShadow = '';
                }
            });
        }
    }

    // ============================================
    // 7. LAZY LOADING IMAGES
    // ============================================
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px'
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ============================================
    // 8. ANIMATION ON SCROLL
    // ============================================
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.pickup-card, .theme-card, .spot-card, .news-card, .ranking-item').forEach(el => {
                el.style.opacity = '0';
                animationObserver.observe(el);
            });
        }
    }

    // ============================================
    // 9. EXTERNAL LINK HANDLER
    // ============================================
    function initExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // Add rel="noopener noreferrer" for security
                this.rel = 'noopener noreferrer';
            });
        });
    }

    // ============================================
    // 10. FONT SIZE ADJUSTER
    // ============================================
    class FontSizeAdjuster {
        constructor() {
            this.button = document.querySelector('.font-size-btn');
            this.currentSize = 16;
            this.sizes = [14, 16, 18, 20];
            this.currentIndex = 1;

            if (this.button) {
                this.init();
            }
        }

        init() {
            this.button.addEventListener('click', () => {
                this.currentIndex = (this.currentIndex + 1) % this.sizes.length;
                this.currentSize = this.sizes[this.currentIndex];
                document.body.style.fontSize = this.currentSize + 'px';

                // Save preference
                localStorage.setItem('fontSize', this.currentSize);

                // Show notification
                this.showNotification(`글자 크기: ${this.currentSize}px`);
            });

            // Load saved preference
            const savedSize = localStorage.getItem('fontSize');
            if (savedSize) {
                document.body.style.fontSize = savedSize + 'px';
            }
        }

        showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                z-index: 10000;
                font-size: 14px;
                animation: fadeIn 0.3s ease;
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
    }

    // ============================================
    // 11. CARD HOVER EFFECTS
    // ============================================
    function initCardEffects() {
        const cards = document.querySelectorAll('.pickup-card, .theme-card, .spot-card, .news-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ============================================
    // 12. INITIALIZE ALL
    // ============================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        // Initialize all components
        new HeroSlider();
        new SearchOverlay();
        new RegionTabs();
        new ScrollToTop();
        new MobileMenu();
        new FontSizeAdjuster();

        initSmoothScroll();
        initLazyLoading();
        initScrollAnimations();
        initExternalLinks();
        initCardEffects();

        // Page loaded animation
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);

        console.log('🏔️ GO HOKKAIDO Website Loaded Successfully!');
    }

    // Start initialization
    init();

})();
