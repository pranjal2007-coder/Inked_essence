// Theme Toggle Functionality
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// Load Saved Theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// Clothing Carousel
let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let autoSlide;

function showNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector('.carousel-next').addEventListener('click', () => {
    showNext();
    resetAutoSlide();
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    showPrev();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlide = setInterval(showNext, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

startAutoSlide();

// Pause carousel on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselContainer.addEventListener('mouseleave', startAutoSlide);

// Counter Animation for Stats
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 200;
    let current = 0;

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = current < target ? Math.ceil(current).toLocaleString() : target.toLocaleString();
            requestAnimationFrame(updateCounter);
        }
    };

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            updateCounter();
        }
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
            toggleActions: 'play none none reverse'
        }
    });
});
