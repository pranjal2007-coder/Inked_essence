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
