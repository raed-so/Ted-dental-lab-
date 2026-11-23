// Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    const slider = document.querySelector('.slider');
    if(slider) {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto play slider every 4 seconds
setInterval(() => {
    moveSlide(1);
}, 4000);


// Language Switcher Logic (Translates general UI, keeps services lists in English)
function toggleLanguage() {
    const body = document.body;
    const currentLang = body.classList.contains('lang-ar') ? 'ar' : 'en';
    
    const elements = document.querySelectorAll('[data-en][data-ar]');
    
    if (currentLang === 'en') {
        body.classList.remove('lang-en');
        body.classList.add('lang-ar');
        body.setAttribute('dir', 'rtl');
        
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-ar');
        });
    } else {
        body.classList.remove('lang-ar');
        body.classList.add('lang-en');
        body.setAttribute('dir', 'ltr');
        
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
    }
}