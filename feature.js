// feature.js

document.addEventListener('DOMContentLoaded', () => {
    const overlays = document.querySelectorAll('.overlay');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.5 });
  
    overlays.forEach(section => {
      section.classList.add('hidden');
      observer.observe(section);
    });
  });

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', function () {
    if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
      mobileMenu.style.display = 'block';
    } else {
      mobileMenu.style.display = 'none';
    }
  });
});

  
