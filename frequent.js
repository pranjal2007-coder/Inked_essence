/**
 * script.js
 * Handles theme toggling (light/dark mode) and potentially other
 * interactive elements for the Inked Essence FAQ page.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Functionality ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const htmlElement = document.documentElement; // Get the <html> element

    // Function to apply theme based on preference
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            darkIcon.classList.remove('hidden'); // Show moon
            lightIcon.classList.add('hidden');   // Hide sun
        } else {
            htmlElement.classList.remove('dark');
            darkIcon.classList.add('hidden');    // Hide moon
            lightIcon.classList.remove('hidden');  // Show sun
        }
    };

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check for user's OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme: localStorage > OS preference > default (light)
    let currentTheme;
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDark) {
        currentTheme = 'dark';
    } else {
        currentTheme = 'light';
    }

    // Apply the determined theme on initial load
    applyTheme(currentTheme);

    // Add event listener for the theme toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            // Toggle the theme
            const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            // Save the new preference to localStorage
            localStorage.setItem('theme', newTheme);
        });
    } else {
        console.warn("Theme toggle button not found.");
    }


    // --- Mobile Menu Toggle (Basic Example - Needs HTML structure) ---
    const mobileMenuButton = document.querySelector('[aria-label="Open menu"]'); // Adjust selector if needed
    const mobileMenu = document.querySelector('.mobile-menu'); // Adjust selector if needed

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Toggle ARIA expanded state
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- FAQ Accordion (Native Functionality) ---
    // The <details> and <summary> elements handle the accordion
    // behavior natively. You might add JS for:
    // 1. Closing other items when one opens (optional).
    // 2. Animating the opening/closing (more complex).

    // Example: Close others when one opens
    const detailsElements = document.querySelectorAll('.faq-item'); // Use the class on <details>

    detailsElements.forEach(details => {
        details.addEventListener('toggle', (event) => {
            // If the details element was opened
            if (event.target.open) {
                // Close all other details elements
                detailsElements.forEach(otherDetails => {
                    if (otherDetails !== event.target && otherDetails.open) {
                        otherDetails.removeAttribute('open');
                    }
                });
            }
        });
    });


    console.log("FAQ page script loaded.");
}); // End DOMContentLoaded
