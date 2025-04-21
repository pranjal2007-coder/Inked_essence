const cart = [
    { name: "Graphic Tee", price: 799, quantity: 2 },
    { name: "Denim Jacket", price: 1999, quantity: 1 }
];

const shipping = 100;

// Populate order summary
const orderItemsDiv = document.getElementById('orderItems');
let subtotal = 0;
cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'order-item';
    itemDiv.innerHTML = `<span>${item.name} x ${item.quantity}</span><span>₹${itemTotal}</span>`;
    orderItemsDiv.appendChild(itemDiv);
});

document.getElementById('subtotal').textContent = `₹${subtotal}`;
document.getElementById('totalAmount').textContent = `₹${subtotal + shipping}`;

// Form validation
const form = document.getElementById('billingForm');
const inputs = form.querySelectorAll('input, select');
const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const zipRegex = /^\d{6}$/;

inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateField(input);
    });
});

function validateField(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';

    if (input.validity.valueMissing) {
        errorElement.textContent = `${input.labels[0].textContent} is required`;
    } else if (input.id === 'email' && !emailRegex.test(input.value)) {
        errorElement.textContent = 'Please enter a valid email';
    } else if (input.id === 'phone' && !phoneRegex.test(input.value)) {
        errorElement.textContent = 'Please enter a valid 10-digit phone number';
    } else if (input.id === 'zip' && !zipRegex.test(input.value)) {
        errorElement.textContent = 'Please enter a valid 6-digit ZIP code';
    }
}

// Light/Dark Mode Toggle
const themeSwitch = document.getElementById('themeSwitch');
const toggleIcon = document.querySelector('.toggle-icon');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    toggleIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
themeSwitch.checked = savedTheme === 'light';

themeSwitch.addEventListener('change', () => {
    const newTheme = themeSwitch.checked ? 'light' : 'dark';
    setTheme(newTheme);
});

// Sticky order summary scroll effect
const orderSummary = document.querySelector('.order-summary');
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const rect = orderSummary.getBoundingClientRect();
        if (rect.top < 100) {
            orderSummary.style.transform = 'translateY(0)';
        }
    }
});

// Razorpay Payment Integration
document.getElementById('payButton').onclick = function(e) {
    e.preventDefault();
    let isValid = true;
    inputs.forEach(input => {
        validateField(input);
        if (input.nextElementSibling.textContent) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    const paymentMethod = document.getElementById('payment-method').value;
    if (paymentMethod === 'cod') {
        alert('Order placed successfully with Cash on Delivery!');
        window.location.href = 'confirmation.html'; // Replace with actual confirmation page
        return;
    }

    const options = {
        key: 'YOUR_RAZORPAY_TEST_KEY', // Replace with your Razorpay test key
        amount: (subtotal + shipping) * 100, // Amount in paise
        currency: 'INR',
        name: 'INKED ESSENCE',
        description: 'Order Payment',
        image: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
        handler: function(response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            window.location.href = 'confirmation.html'; // Replace with actual confirmation page
        },
        prefill: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('phone').value
        },
        theme: {
            color: '#ff0000'
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
};
