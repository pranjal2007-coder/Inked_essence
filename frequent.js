// FAQ Expand/Collapse
const questions = document.querySelectorAll('.faq-question');

questions.forEach(q => {
  q.addEventListener('click', () => {
    q.classList.toggle('active');
    q.nextElementSibling.classList.toggle('open');
  });
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
