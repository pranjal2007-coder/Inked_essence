document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Remove preload class after a short delay to allow CSS to load
    // This prevents unwanted transitions on page load
    setTimeout(() => {
        body.classList.remove('preload');
    }, 100); // Adjust delay if needed

    // --- Theme Toggling ---
    const sunIcon = 'fa-sun';
    const moonIcon = 'fa-moon';
    let currentTheme = localStorage.getItem('theme');

    // Function to apply theme
    const applyTheme = (theme) => {
        const icon = themeToggleBtn.querySelector('i');
        body.classList.remove('dark-theme', 'light-theme'); // Clear existing theme classes

        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (icon) icon.classList.replace(sunIcon, moonIcon);
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme'); // Add light-theme class explicitly if needed
            if (icon) icon.classList.replace(moonIcon, sunIcon);
            localStorage.setItem('theme', 'light');
        }
        // Update the currentTheme variable
        currentTheme = theme;
    };

    // Apply saved theme or detect system preference on load
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Event listener for theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        // Determine the new theme based on the *currently applied* theme
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
    });


    // --- Mobile Menu Toggle ---
    menuToggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggleBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu if a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggleBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });

     // Close mobile menu if clicking outside of it
     document.addEventListener('click', (event) => {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickInsideMenuToggle = menuToggleBtn.contains(event.target); // Check toggle button too

        if (!isClickInsideNav && !isClickInsideMenuToggle && navLinks.classList.contains('active')) {
             navLinks.classList.remove('active');
             menuToggleBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
});
