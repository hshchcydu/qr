// 팝업 관련 함수
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}

function closePopupForDay() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
    
    // 쿠키 설정 (1일 동안 팝업 보지 않음)
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 1일
    document.cookie = "NO_popup_main=Y;expires=" + date.toUTCString() + ";path=/";
}

// 쿠키 확인 함수
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// 페이지 로드 시 팝업 표시 여부 확인
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    
    // 쿠키 확인
    if (getCookie('NO_popup_main') === 'Y') {
        popup.classList.add('hidden');
    }
    
    // 메뉴 활성화
    updateActiveMenu();
    
    // 스크롤 시 메뉴 활성화 업데이트
    window.addEventListener('scroll', updateActiveMenu);
});

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// 메뉴 활성화 업데이트
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu a, .mobile-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === '#' + current || (current === '' && href === '#doz_body')) {
            link.classList.add('active');
        }
    });
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 헤더 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
