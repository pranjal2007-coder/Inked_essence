// script.js (Enhanced + Updated Navbar Logic)

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle Functionality (Updated for potentially multiple buttons) ---
  const htmlElement = document.documentElement;

  // Function to apply theme based on preference
  const applyTheme = (theme) => {
      htmlElement.classList.remove('light', 'dark'); // Remove existing classes
      htmlElement.classList.add(theme); // Add the new theme class
      htmlElement.setAttribute('data-theme', theme); // Also set data attribute if needed
  };

  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  // Check system preference if no saved theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme: saved theme > system preference > default (light)
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme); // Apply initial theme

  // Add event listener to ALL theme toggle buttons (desktop and mobile)
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn'); // Use class selector

  if (themeToggleButtons.length > 0) {
      themeToggleButtons.forEach(button => {
          button.addEventListener('click', () => {
              const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
              const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
              applyTheme(newTheme);
              localStorage.setItem('theme', newTheme);
          });
      });
  } else {
      console.warn("Theme toggle buttons not found.");
  }

  // --- Mobile Menu Toggle Functionality (Unchanged) ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
          const isMenuOpen = mobileMenu.classList.toggle('open');
          mobileMenuButton.setAttribute('aria-expanded', isMenuOpen);
          const icon = mobileMenuButton.querySelector('i');
          if (icon) {
              icon.classList.toggle('fa-bars', !isMenuOpen);
              icon.classList.toggle('fa-times', isMenuOpen);
          }
      });
  } else {
       console.warn("Mobile menu button or mobile menu container not found.");
  }

  // --- FAQ Accordion Functionality (Keep as is) ---
  const faqSection = document.getElementById('faq-section');
  if (faqSection) {
      faqSection.addEventListener('click', (event) => {
          const questionButton = event.target.closest('.faq-question');
          if (!questionButton) return;
          const faqItem = questionButton.closest('.faq-item');
          if (!faqItem) return;
          const answerPanel = faqItem.querySelector('.faq-answer');
          if (!answerPanel) return;
          const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
          questionButton.setAttribute('aria-expanded', !isExpanded);
          answerPanel.classList.toggle('open');
      });
  } else {
      console.warn("FAQ section container not found.");
  }

  // --- FAQ Search/Filter Functionality (Keep as is) ---
  const searchInput = document.getElementById('faq-search');
  const noResultsMessage = document.getElementById('no-results-message');
  if (searchInput && faqSection && noResultsMessage) {
      searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase().trim();
          let hasVisibleItems = false;
          faqSection.querySelectorAll('.faq-category').forEach(category => {
              let categoryHasVisibleItems = false;
              category.querySelectorAll('.faq-item').forEach(item => {
                  const questionText = item.querySelector('.faq-question span')?.textContent.toLowerCase() || '';
                  const answerText = item.querySelector('.faq-answer p')?.textContent.toLowerCase() || '';
                  const isMatch = questionText.includes(searchTerm) || answerText.includes(searchTerm);
                  item.classList.toggle('hidden', !isMatch);
                  if (isMatch) {
                      categoryHasVisibleItems = true;
                      hasVisibleItems = true;
                  }
              });
              const categoryTitle = category.querySelector('.category-title');
               if (categoryTitle) {
                  category.style.display = categoryHasVisibleItems ? '' : 'none';
               }
          });
          noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
      });
  } else {
      console.warn("FAQ search input, section, or no-results message not found.");
  }


  // --- Back to Top Button Functionality (Keep as is) ---
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
      window.addEventListener('scroll', () => {
          backToTopButton.classList.toggle('visible', window.scrollY > 300);
      });
      backToTopButton.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  } else {
      console.warn("Back to top button not found.");
  }

  // --- FAQ Feedback Button (Mock Interaction - Keep as is) ---
   if (faqSection) {
      faqSection.addEventListener('click', (event) => {
          const feedbackButton = event.target.closest('.feedback-btn');
          if (!feedbackButton) return;
          const feedbackContainer = feedbackButton.closest('.faq-feedback');
          if (!feedbackContainer) return;
          // Provide visual feedback
          const theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
          const accentColor = theme === 'dark' ? 'var(--accent-color-dark)' : 'var(--accent-color-light)';
          feedbackContainer.innerHTML = `<span style="font-style: italic; color: ${accentColor};">Thank you for your feedback!</span>`;
      });
  }

});
