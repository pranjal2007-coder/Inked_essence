document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;
  const loginBtn = document.getElementById('loginBtn');
  const form = document.querySelector('form');
  const successMessage = document.getElementById('successMessage');

  // 🌗 Theme Toggle Logic
  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'ri-moon-line text-xl' : 'ri-sun-line text-xl';
    }
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // 🔐 Login Redirect
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // Show success message on form submission
  if (form && successMessage) {
    form.addEventListener('submit', (e) => {
      // Show success message after form submission
      setTimeout(() => {
        successMessage.style.display = 'block';
      }, 100);
    });
  }
});
