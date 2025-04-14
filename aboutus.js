// Theme Toggle Functionality
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
toggleButton.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// Load Saved Theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') body.classList.add('light');

// Interactive Logo Surprise
let clickCount = 0;
const logo = document.getElementById('logo');
const clickCounter = document.getElementById('click-counter');
logo.addEventListener('click', () => {
    clickCount++;
    clickCounter.textContent = `Clicks: ${clickCount}/5`;
    if (clickCount === 5) {
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#000000', '#ffffff']
        });
        alert('🎉 Surprise! Use discount code: INKED20 for 20% off!');
        clickCount = 0;
        clickCounter.textContent = 'Clicks: 0/5';
    }
});

// Clothing Carousel
let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector('.carousel-next').addEventListener('click', showNext);
document.querySelector('.carousel-prev').addEventListener('click', showPrev);
setInterval(showNext, 5000); // Auto-slide every 5 seconds

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) updateCounter();
    }, { threshold: 0.5 });
    observer.observe(counter);
});

// GSAP Scroll-Triggered Animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
});
