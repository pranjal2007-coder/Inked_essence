document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Apply the theme based on user preference
  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    if (themeIcon) {
      // Change icon based on theme
      themeIcon.className = theme === 'dark' ? 'ri-moon-line text-xl' : 'ri-sun-line text-xl';
    }
    localStorage.setItem('theme', theme);
  };

  // Get the saved theme or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
});
