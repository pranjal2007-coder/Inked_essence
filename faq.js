const html = document.documentElement;

const applyTheme = (theme) => {
  console.log('Applying theme:', theme);
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'ri-moon-line text-xl' : 'ri-sun-line text-xl';
  }
  localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');

      // Toggle the display of the answer
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.textContent = '+';
      } else {
        answer.style.display = 'block';
        icon.textContent = '-';
      }
    });
  });

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      console.log('Theme toggle clicked');
      const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
      console.log('Current theme before toggle:', currentTheme);
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      console.log('Theme toggled to:', newTheme);
    });
  } else {
    console.log('Theme toggle button not found');
  }
});
