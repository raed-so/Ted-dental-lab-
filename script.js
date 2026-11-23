let currentLang = 'ar';
let currentCaseSlide = 0;

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    const htmlRoot = document.getElementById('html-root');
    const langBtn = document.getElementById('lang-toggle');

    htmlRoot.setAttribute('lang', currentLang);
    htmlRoot.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    langBtn.textContent = currentLang === 'ar' ? 'English' : 'العربية';

    const translatableElements = document.querySelectorAll('[data-ar][data-en]');
    translatableElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    updateCaseSliderPosition();
}

function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.remove('active');
}

// إعداد معرض الحالات السريرية المستقل (Slider)
function initCaseSlider() {
    const slides = document.querySelectorAll('.case-slide-item');
    const dotsContainer = document.getElementById('cases-slider-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.onclick = () => goToCaseSlide(idx);
        dotsContainer.appendChild(dot);
    });
}

function updateCaseSliderPosition() {
    const track = document.getElementById('cases-slider-track');
    const dots = document.querySelectorAll('.cases-slider-dots .dot');
    if (!track) return;
    
    const directionFactor = currentLang === 'ar' ? 1 : -1;
    track.style.transform = `translateX(${directionFactor * currentCaseSlide * 100}%)`;

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentCaseSlide);
    });
}

function moveCaseSlide(step) {
    const slides = document.querySelectorAll('.case-slide-item');
    if (slides.length === 0) return;
    currentCaseSlide = (currentCaseSlide + step + slides.length) % slides.length;
    updateCaseSliderPosition();
}

function goToCaseSlide(index) {
    currentCaseSlide = index;
    updateCaseSliderPosition();
}

// تكبير الصور عند النقر (Lightbox)
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCaseSlider();
});