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
    const clearCartBtn = document.getElementById('clearCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartTotalDisplay = document.getElementById('cartTotal');
    const html = document.documentElement;
  
    const cart = {};
    // Just change these to change your actual products info
    //The price
    // images 
    // name of the products
  // also linked the pics of products
    const products = [
      { id: 1, name: 'Oversized T-Shirts', price: 1299.99, image: 'pic1.jpg' },
      { id: 2, name: 'Oversized T-Shirts', price: 1499.99, image: 'pic2.jpg' },
      { id: 3, name: 'Oversized Hoodies', price: 1499.99, image: 'pic21.jpg' },
      { id: 4, name: 'Oversized Hoodies', price: 1799.99, image: 'pic22.jpg' }
    ]; 
  
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      const keys = Object.keys(cart);
  
      if (keys.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Your cart is empty</p>';
        cartTotalDisplay.textContent = '₹0.00';
        return;
      } else {
        keys.forEach(id => {
          const item = cart[id];
          const div = document.createElement('div');
          div.className = 'flex justify-between items-start border-b pb-4 animate-fadeIn';
  
          div.innerHTML = `
            <div class="flex items-center space-x-4">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded" />
              <div>
                <p class="font-semibold">${item.name}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">₹${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <div class="flex items-center space-x-2">
                <button class="decrease px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" data-id="${item.id}">−</button>
                <input type="number" min="1" value="${item.quantity}" class="quantity-input w-12 text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white" data-id="${item.id}" />
                <button class="increase px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded" data-id="${item.id}">+</button>
              </div>
              <button data-id="${item.id}" class="remove-item text-red-500 text-sm">Remove</button>
            </div>
          `;
  
          cartItemsContainer.appendChild(div);
        });
  
        attachCartItemListeners();
        updateCartTotal();
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
  
      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', e => {
          const id = e.target.dataset.id;
          let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
          value = 1;
          e.target.value = value;
        }
        if (cart[id]) {
          cart[id].quantity = value;
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

  function updateCartTotal() {
    const totalPrice = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalDisplay.textContent = `₹${totalPrice.toFixed(2)}`;
  }

  function renderProducts() {
    productContainer.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card visible';
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

  // Clear Cart Button
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      for (const id in cart) {
        delete cart[id];
      }
      updateCartCount();
      updateCartDisplay();
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


// download-app.js

// Example: Log when someone clicks the App Store or Play Store button
document.querySelectorAll('.btn-appstore, .btn-googleplay').forEach(button => {
  button.addEventListener('click', function() {
    console.log(`Button Clicked: ${this.innerText.trim()}`);
  });
});
