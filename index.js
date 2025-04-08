document.addEventListener('DOMContentLoaded', () => {
    console.log("Document is ready!");

    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn && cartModal && closeCart) {
        cartBtn.addEventListener('click', () => {
            cartModal.classList.toggle('hidden');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });
    }

    // Login/Signup button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert("Login/Signup functionality to be implemented.");
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    const html = document.documentElement;

    const applyTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'ri-moon-line text-xl' : 'ri-sun-line text-xl';
        }
        localStorage.setItem('theme', theme);
    };

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});
