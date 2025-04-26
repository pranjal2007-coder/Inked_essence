// Log a simple message to the console when the script is loaded.
// This is often used during development or debugging to confirm script execution.
console.log('privacy.js loaded');

// Wait for the entire DOM content to be fully loaded before executing any DOM manipulation code.
// This ensures that all elements referenced by JavaScript are available in the document.
document.addEventListener('DOMContentLoaded', () => {

  // 'htmlRoot' refers to the <html> element. It's where we apply the 'data-theme' attribute
  // which controls the active theme for the entire website.
  const htmlRoot = document.documentElement;

  // This selects the button or element responsible for toggling between light and dark modes.
  const themeToggle = document.getElementById('themeToggle');

  // 'themeIcon' is the icon that visually represents the current theme (e.g., sun or moon).
  // It's updated dynamically when the theme changes.
  const themeIcon = document.getElementById('themeIcon');

  /**
   * Function to apply a theme to the website dynamically.
   * 
   * @param {string} theme - The theme to apply ("light" or "dark").
   * It updates:
   *   - the HTML attribute 'data-theme' for CSS to react accordingly,
   *   - the theme icon based on the current theme,
   *   - and stores the selected theme in localStorage to persist it across sessions.
   */
  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);

    // Conditionally update the icon class based on the theme.
    // This assumes usage of a library like Remix Icon for sun/moon icons.
    // toggle the icon class based on the current theme.
     // This assumes usage of a library like Remix Icon for sun/moon icons.
    // This assumes usage of a library like Remix Icon for sun/moon icons.
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
    }

    // Save the selected theme in the browser's localStorage.
    // This allows the site to remember the user's preference between visits.
    localStorage.setItem('theme', theme);
  }

  // Retrieve the previously saved theme from localStorage.
  // If none exists, default to 'light'.
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Apply the saved or default theme on initial page load.
  applyTheme(savedTheme);

  // If the theme toggle button exists, attach an event listener to it.
  // When clicked, it switches between light and dark themes.
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {

      // Get the current theme from the HTML's data-theme attribute.
      const currentTheme = htmlRoot.getAttribute('data-theme');

      // Toggle the theme value.
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      // Apply the newly toggled theme.
      applyTheme(newTheme);
    });
  }
});
