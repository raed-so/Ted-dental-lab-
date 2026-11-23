let currentLang = 'ar';
let currentSlide = 0;

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

    updateSliderPosition();
}

function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.remove('active');
}

// إعداد معرض الصور (Slider)
function initSlider() {
    const slides = document.querySelectorAll('.slide-item');
    const dotsContainer = document.getElementById('slider-dots');
    dotsContainer.innerHTML = '';

    slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });
}

function updateSliderPosition() {
    const track = document.getElementById('slider-track');
    const dots = document.querySelectorAll('.dot');
    const directionFactor = currentLang === 'ar' ? 1 : -1;
    track.style.transform = `translateX(${directionFactor * currentSlide * 100}%)`;

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
}

function moveSlide(step) {
    const slides = document.querySelectorAll('.slide-item');
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    updateSliderPosition();
}

function goToSlide(index) {
    currentSlide = index;
    updateSliderPosition();
}

// تكبير الصور عند النقر (Lightbox)
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
});