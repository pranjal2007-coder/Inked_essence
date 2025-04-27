document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const sunIcon = 'fa-sun'; // Assumes Font Awesome class
    const moonIcon = 'fa-moon'; // Assumes Font Awesome class

    // --- Theme Handling ---
    const applyTheme = (theme) => {
        // Assumes themeToggle contains an <i> element for the icon
        const icon = themeToggle ? themeToggle.querySelector('i') : null;
        if (!icon) {
            console.warn("Theme toggle icon not found.");
            // return; // Optional: stop if icon missing
        }

        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            if (icon) {
                 icon.classList.remove(sunIcon);
                 icon.classList.add(moonIcon);
            }
            localStorage.setItem('theme', 'dark');
        } else { // Default to light
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
             if (icon) {
                icon.classList.remove(moonIcon);
                icon.classList.add(sunIcon);
            }
            localStorage.setItem('theme', 'light');
        }
    };

    // Apply initial theme
    applyTheme(currentTheme || 'light'); // Apply saved theme or default to light

    // Theme toggle button event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    } else {
        console.warn("Theme toggle button (#theme-toggle) not found.");
    }


    // --- Mobile Menu Toggle ---
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Assumes menuToggle contains an <i> element for the icon
            const menuIcon = menuToggle.querySelector('i');
            if (!menuIcon) {
                 console.warn("Menu toggle icon not found.");
                 return; // Stop if icon missing
            }

            if (mainNav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Close menu when a link inside it is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    // Reset the menu icon
                    const menuIcon = menuToggle.querySelector('i');
                     if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                     }
                }
            });
        });

    } else {
         if (!menuToggle) console.warn("Menu toggle button (#menu-toggle) not found.");
         if (!mainNav) console.warn("Main navigation element (.main-nav) not found.");
    }


    // --- Simple Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve after reveal to improve performance
                    // observer.unobserve(entry.target);
                }
                // Optional: Remove class if element scrolls out of view
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        }, {
            rootMargin: '0px', // Adjust margin (e.g., '-100px 0px' to trigger later)
            threshold: 0.1   // Trigger when 10% of the element is visible
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }


    // --- Discover Your Essence Interaction ---
    const essenceIcons = document.querySelectorAll('.essence-icon');
    const essenceResultDisplay = document.getElementById('essence-result');

    // Check if necessary elements exist
    if (essenceIcons.length > 0 && essenceResultDisplay) {
        // Assumes essenceResultDisplay contains a <p> tag
        const essenceResultText = essenceResultDisplay.querySelector('p');

        if (essenceResultText) {
            essenceIcons.forEach(icon => {
                icon.addEventListener('click', () => {
                    const essence = icon.getAttribute('data-essence');
                    if (!essence) {
                         console.warn("Clicked essence icon is missing 'data-essence' attribute.");
                         return;
                    }

                    // Hide current text before showing new one (relies on CSS transition)
                    essenceResultText.classList.remove('visible');

                    // Use setTimeout to allow fade-out before changing text and fading in
                    setTimeout(() => {
                        // *** CORRECTED LINE BELOW ***
                        essenceResultText.textContent = `Your essence is: ${essence}`; // Use backticks for template literal
                        essenceResultText.classList.add('visible'); // Add class to trigger fade-in (relies on CSS)
                    }, 200); // Timing should be less than CSS transition duration

                    // Optional: Visual feedback for the clicked icon
                    essenceIcons.forEach(i => i.style.borderColor = ''); // Reset others (or use a class)
                    icon.style.borderColor = 'var(--primary-color)'; // Highlight clicked (assumes CSS variable exists)
                });
            });
        } else {
             console.warn("Essence result paragraph tag not found inside #essence-result.");
        }

    } else {
         if (essenceIcons.length === 0) console.warn("No elements with class '.essence-icon' found.");
         if (!essenceResultDisplay) console.warn("Essence result display element (#essence-result) not found.");
    }


    // --- Easter Egg ---
    const easterEgg = document.getElementById('easter-egg');
    if (easterEgg) {
        easterEgg.addEventListener('click', () => {
            alert('You found the hidden pin! ✨ Keep expressing your unique essence!');
        });
    }
    // No warning needed if it's optional

}); // End DOMContentLoaded
