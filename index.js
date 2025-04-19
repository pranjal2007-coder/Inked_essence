document.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const productContainer = document.getElementById('productContainer');
  const loginBtn = document.getElementById('loginBtn');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  const cart = {};

  const products = [
    { id: 1, name: 'Oversized T-Shirts', price: 1299.99, image: 'pic1.jpg' },
    { id: 2, name: 'Oversized T-Shirts', price: 1499.99, image: 'pic2.jpg' },
    { id: 3, name: 'Hoodie', price: 1499.99, image: 'images/hoodie.jpg' },
    { id: 4, name: 'Denim Jacket', price: 1799.99, image: 'images/jacket.jpg' }
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
              <button class="decrease" data-id="${item.id}">−</button>
              <span class="font-semibold">${item.quantity}</span>
              <button class="increase" data-id="${item.id}">+</button>
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
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        delete cart[id];
        updateCartCount();
        updateCartDisplay();
      });
    });

    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        if (cart[id]) {
          cart[id].quantity += 1;
          updateCartCount();
          updateCartDisplay();
        }
      });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', e => {
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
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <button class="button add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productContainer.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', e => {
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

  // 🛒 Cart Modal Open/Close
  if (cartBtn && cartModal && closeCart) {
    cartBtn.addEventListener('click', () => {
      cartModal.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
      cartModal.querySelector('div').classList.remove('translate-x-full');
    });

    closeCart.addEventListener('click', () => {
      cartModal.classList.add('opacity-0', 'invisible', 'pointer-events-none');
      cartModal.querySelector('div').classList.add('translate-x-full');
    });
  }

  // 🌗 Theme Toggle Logic
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

  // 🔐 Login Redirect
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // 🚀 Initialize
  renderProducts();
  updateCartDisplay();
});
