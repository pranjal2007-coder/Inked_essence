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
  