// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.slideInterval = null;

        this.init();
    }

    init() {
        // Auto slide every 5 seconds
        this.startAutoSlide();

        // Previous button
        document.querySelector('.slider-prev')?.addEventListener('click', () => {
            this.prevSlide();
        });

        // Next button
        document.querySelector('.slider-next')?.addEventListener('click', () => {
            this.nextSlide();
        });

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }

        this.currentSlide = index;
    }

    nextSlide() {
        let next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
        this.resetAutoSlide();
    }

    prevSlide() {
        let prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
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
        }, 5000);
    }

    resetAutoSlide() {
        clearInterval(this.slideInterval);
        this.startAutoSlide();
    }
}

// Season Tabs
class SeasonTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.season-tab');
        this.contents = document.querySelectorAll('.season-content');

        this.init();
    }

    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.switchTab(index);
            });
        });
    }

    switchTab(index) {
        // Remove active class from all tabs and contents
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.contents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        this.tabs[index].classList.add('active');
        this.contents[index].classList.add('active');
    }
}

// Filter Tags
class FilterTags {
    constructor() {
        this.tags = document.querySelectorAll('.filter-tag');

        this.init();
    }

    init() {
        this.tags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('active');
            });
        });
    }
}

// Search Functionality
class Search {
    constructor() {
        this.searchBtn = document.querySelector('.search-btn');
        this.searchInput = document.querySelector('.search-input');

        this.init();
    }

    init() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const query = this.searchInput.value.trim();

        if (query) {
            console.log('Searching for:', query);
            alert(`검색어: "${query}"\n\n실제 구현 시 검색 결과 페이지로 이동합니다.`);
        } else {
            alert('검색어를 입력해주세요.');
        }
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if href is just "#"
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
}

// Lazy Loading Images
class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        button.className = 'scroll-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #0066cc;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,102,204,0.3);
        `;

        document.body.appendChild(button);
        this.button = button;
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'translateY(-5px)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'translateY(0)';
        });
    }
}

// Card Animation on Scroll
class CardAnimation {
    constructor() {
        this.cards = document.querySelectorAll('.content-card, .spot-item, .event-card, .ranking-item');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });

            this.cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                cardObserver.observe(card);
            });
        }
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.createMenuButton();
        this.init();
    }

    createMenuButton() {
        const nav = document.querySelector('.main-nav');

        if (window.innerWidth <= 768) {
            const button = document.createElement('button');
            button.innerHTML = '<i class="fas fa-bars"></i>';
            button.className = 'mobile-menu-btn';
            button.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #333;
            `;

            const header = document.querySelector('.header-content');
            header.appendChild(button);
            this.button = button;

            if (window.innerWidth <= 768) {
                button.style.display = 'block';
                nav.style.display = 'none';
            }
        }
    }

    init() {
        if (this.button) {
            this.button.addEventListener('click', () => {
                const nav = document.querySelector('.main-nav');

                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                } else {
                    nav.style.display = 'none';
                }
            });
        }

        window.addEventListener('resize', () => {
            const nav = document.querySelector('.main-nav');

            if (window.innerWidth > 768) {
                nav.style.display = 'flex';
                if (this.button) {
                    this.button.style.display = 'none';
                }
            } else {
                if (this.button) {
                    this.button.style.display = 'block';
                }
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hero Slider
    new HeroSlider();

    // Initialize Season Tabs
    new SeasonTabs();

    // Initialize Filter Tags
    new FilterTags();

    // Initialize Search
    new Search();

    // Initialize Smooth Scroll
    new SmoothScroll();

    // Initialize Lazy Load
    new LazyLoad();

    // Initialize Scroll to Top
    new ScrollToTop();

    // Initialize Card Animation
    new CardAnimation();

    // Initialize Mobile Menu
    new MobileMenu();

    console.log('GO HOKKAIDO Website Initialized Successfully!');
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
