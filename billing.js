const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const name = form.name.value.trim();
    const address = form.address.value.trim();
    const postalCode = form.postalCode.value.trim();
    const email = form.email.value.trim();

    alert(`Thank you, ${name}! Your order has been placed and will be paid via Cash on Delivery.\n\nShipping to:\n${address}\nPostal Code: ${postalCode}\nEmail: ${email}`);
    form.reset();
});
