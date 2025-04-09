document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const productContainer = document.getElementById('productContainer');

    const cart = {};

    const products = [
        { id: 1, name: 'Classic Tee', price: 1299.99 },
        { id: 2, name: 'V-Neck Shirt', price: 1499.99 },
        { id: 3, name: 'Hoodie', price: 1499.99 },
        { id: 4, name: 'Denim Jacket', price: 1199.99 },
    ];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        const keys = Object.keys(cart);

        if (keys.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Your cart is empty</p>';
        } else {
            keys.forEach(id => {
                const item = cart[id];
                const div = document.createElement('div');
                div.className = 'flex justify-between items-start border-b pb-4';

                div.innerHTML = `
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                            Quantity: ${item.quantity} × ₹${item.price.toFixed(2)} =
                            <span class="font-semibold text-black dark:text-white">₹${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
                        <div class="flex items-center mt-2 space-x-2">
                            <button class="decrease px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white" data-id="${item.id}">−</button>
                            <span class="font-semibold">${item.quantity}</span>
                            <button class="increase px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button data-id="${item.id}" class="remove-item text-red-500 text-sm">Remove</button>
                `;

                cartItemsContainer.appendChild(div);
            });

            attachCartItemListeners();
        }
    }

    function attachCartItemListeners() {
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                delete cart[id];
                updateCartCount();
                updateCartDisplay();
            });
        });

        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                if (cart[id]) {
                    cart[id].quantity += 1;
                    updateCartCount();
                    updateCartDisplay();
                }
            });
        });

        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                if (cart[id]) {
                    if (cart[id].quantity > 1) {
                        cart[id].quantity -= 1;
                    } else {
                        delete cart[id];
                    }
                    updateCartCount();
                    updateCartDisplay();
                }
            });
        });
    }

    function updateCartCount() {
        const total = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = total;
    }

    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-gray-800 p-4 rounded shadow text-center';
            card.innerHTML = `
                <h3 class="font-bold mb-2 text-black dark:text-white">${product.name}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-2">₹${product.price.toFixed(2)}</p>
                <button class="button add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(card);
        });

        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === id);
                if (cart[id]) {
                    cart[id].quantity += 1;
                } else {
                    cart[id] = { ...product, quantity: 1 };
                }
                updateCartCount();
                updateCartDisplay();
            });
        });
    }

    // Cart modal toggle
    if (cartBtn && cartModal && closeCart) {
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
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

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // 👉 Login button redirect (NEW)
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Initial render
    renderProducts();
    updateCartDisplay();
});
