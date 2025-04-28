document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links'); // Original container for desktop
    const mainNav = document.querySelector('.main-nav'); // Reference to the main nav

    // --- Preload Class Removal ---
    // Remove preload class after styles are likely applied to prevent flicker
    setTimeout(() => {
        body.classList.remove('preload');
    }, 100);

    // --- Theme Toggling ---
    const sunIconClass = 'fa-sun';
    const moonIconClass = 'fa-moon';
    let currentTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        const iconElement = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
        body.classList.remove('dark-theme'); // Remove dark first

        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (iconElement) iconElement.classList.replace(sunIconClass, moonIconClass);
            localStorage.setItem('theme', 'dark');
        } else {
            // Light theme is default (no class needed or add .light-theme if desired)
            if (iconElement) iconElement.classList.replace(moonIconClass, sunIconClass);
            localStorage.setItem('theme', 'light');
        }
        currentTheme = theme;
    };

    // Initialize theme
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Check system preference if no theme is stored
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Add event listener for theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- Mobile Menu ---
    let mobileNavLinks = null; // Initialize mobile menu variable

    const setupMobileMenu = () => {
        if (!navLinksContainer) return;

        // Clone nav links for mobile menu if they don't exist
        if (!mobileNavLinks) {
            mobileNavLinks = navLinksContainer.cloneNode(true);
            mobileNavLinks.classList.remove('nav-links');
            mobileNavLinks.classList.add('nav-links-mobile');
            mobileNavLinks.style.display = 'none'; // Start hidden
             // Insert after the main nav container within the header
            if (mainNav && mainNav.parentNode) {
                 mainNav.parentNode.insertBefore(mobileNavLinks, mainNav.nextSibling);
            }

             // Add click listeners to close menu when mobile link is clicked
            mobileNavLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
        }
    };

    const openMobileMenu = () => {
         if (!mobileNavLinks) setupMobileMenu(); // Ensure it's created
         if (mobileNavLinks) {
            mobileNavLinks.style.display = 'flex'; // Make it visible for animation
            // Timeout to allow display change before adding class for transition
            setTimeout(() => {
                mobileNavLinks.classList.add('active');
                 if (menuToggleBtn) {
                    menuToggleBtn.querySelector('i')?.classList.replace('fa-bars', 'fa-times');
                    menuToggleBtn.setAttribute('aria-expanded', 'true');
                }
            }, 10);
         }
    };

     const closeMobileMenu = () => {
         if (mobileNavLinks) {
            mobileNavLinks.classList.remove('active');
             if (menuToggleBtn) {
                menuToggleBtn.querySelector('i')?.classList.replace('fa-times', 'fa-bars');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
            }
            // Optionally hide with display: none after transition ends
            // setTimeout(() => { mobileNavLinks.style.display = 'none'; }, 400); // Match CSS transition time
        }
    };

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
             setupMobileMenu(); // Make sure mobile menu DOM exists
             const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
             if (isExpanded) {
                 closeMobileMenu();
             } else {
                 openMobileMenu();
             }
        });
    }

    // Close mobile menu if window is resized to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && mobileNavLinks && mobileNavLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('[data-scroll-animation]');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observerInstance.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
            // rootMargin: '0px 0px -50px 0px' // Optional: trigger slightly before it enters viewport
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers or if IntersectionObserver is not supported
        animatedElements.forEach(el => {
            el.classList.add('animate'); // Just show them immediately
        });
    }

    // --- Footer Current Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Nav Link Highlight (Optional, CSS handles .active class) ---
    // Example: If you needed to set it dynamically based on URL
    // const currentPath = window.location.pathname.split('/').pop();
    // if (currentPath === 'blog.html' || currentPath === '') { // Adjust logic as needed
    //     document.getElementById('blog-link')?.classList.add('active');
    // }

});
